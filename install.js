const os = require('node:os')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const tty = require('node:tty')
const read = (prompt) => new Promise(resolve => {
  process.stdout.write(prompt)
  process.stdin.resume()
  process.stdin.setEncoding('utf-8')
  process.stdin.once('data', data => resolve(data.trim()))
})
const readPassword = (prompt) => {
  return new Promise(resolve => {
    process.stdout.write(prompt)
    if (tty.isatty(1)) {
      process.stdin.setRawMode(true)
    }

    process.stdin.resume()
    process.stdin.setEncoding('utf-8')

    let password = ''
    let cursor = 0

    process.stdin.on('data', (chunk) => {
      chunk = chunk.toString()
      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i]
        if (char === '\u0003') {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.exit(1)
        } else if (char === '\n' || char === '\r') {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\n')
          resolve(password.trim())
        } else if (char === '\u007F' || char === '\b') {
          if (cursor > 0) {
            cursor--
            password = password.slice(0, -1)
            process.stdout.write('\b \b')
          }
        } else {
          password += char
          cursor++
          process.stdout.write('*')
        }
      }
    })
  })
}
const send = async ({ api, data = {} }) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const res = await fetch(
    `http://localhost:3000/api/${api}`,
    {
      method: 'post',
      headers,
      body: JSON.stringify(data)
    }
  )
  return await res.text()
}

(async () => {
  await new Promise(resolve => {
    console.log('Instalando dependencias ...')
    const installProcess = spawn('npm', ['i'], { cwd: '/etc/local-cloud' })
    installProcess.on('close', resolve)
    console.log('Dependencias instaladas!')
  })
  let step = 0
  const stop = os.availableParallelism() + 1
  const serverProcess = spawn('npm', ['start', '--', '--maintenance-mode'], { cwd: '/etc/local-cloud' })
  await new Promise(resolve => {
    console.log('Iniciando servidor ...')
    serverProcess.stdout.on('data', () => {
      step++
      if (step === stop) {
        resolve()
      }
    })
  })
  const appsRes = await fetch('http://localhost:3000/api/apps')
  const appsList = await appsRes.json()
  if (Array.isArray(appsList) && appsList.length === 0) {
    const appsPath = path.resolve('.', 'apps')
    const appNames = fs.readdirSync(appsPath)
    for (const name of appNames) {
      const appPath = path.join(appsPath, name)
      const installProcess = spawn('curl', ['--location', '--request', 'PUT', '-F', `package_zip=@"${appPath}"`, '-s', 'http://localhost:3000/api/apps'])
      await new Promise(resolve => installProcess.on('close', resolve))
    }
  }
  const usersRes = await fetch('http://localhost:3000/api/users')
  const userList = await usersRes.json()
  if (Array.isArray(userList)) {
    const names = userList.map(user => user.name)
    let name = await read(`Indica un nombre de usuario nuevo o existente (${names.length > 0 ? names.join(', ') : 'no hay usuarios'}): `)
    while (name === '') {
      name = await read('Por favor, escribe un nombre:')
    }
    if (!names.includes(name)) {
      let password = await readPassword('Escribe una contraseña: ')
      while (password === '') {
        password = await readPassword('Escribe una contraseña: ')
      }
      await send({
        api: 'users',
        data: { name, password }
      })
    }
    const usersResponse = await fetch('http://localhost:3000/api/users')
    const uList = await usersResponse.json()
    if (Array.isArray(uList)) {
      const { uid } = uList.find(user => user.name === name)
      const appsPath = path.resolve('.', 'apps')
      const appNames = fs.readdirSync(appsPath)
      for (const package_name of appNames) {
        await send({
          api: 'users/assign-app',
          data: { uid, package_name }
        })
      }
    }
  }
  const PORTS = Array
    .from({ length: os.availableParallelism() }, (_, i) => 3000 + i)
    .map(p => `    server 127.0.0.1:${p};`)
  const NGINX_CONFIGURATION = `server {
    listen 80;
    server_name localcloud.local;

    return 301 https://$host$request_uri;
}
upstream local_cloud_app {
    ip_hash;
${PORTS.join('\n')}
}
server {
    listen 443 ssl;

    server_name localcloud.local;

    ssl_certificate /etc/nginx/ssl_certificate/cert.pem;
    ssl_certificate_key /etc/nginx/ssl_certificate/key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 1024M;

    location / {
        proxy_pass http://local_cloud_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
  fs.writeFileSync('/etc/nginx/sites-available/default', NGINX_CONFIGURATION, 'utf-8')
})()