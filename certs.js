import { createCA, createCert } from 'mkcert'
import fs from 'fs'

const ca = await createCA({
   organization: 'Pixelgram',
   countryCode: 'RU',
   state: 'Moscow',
   locality: 'Moscow',
   validity: 365,
})

const cert = await createCert({
   ca: { key: ca.key, cert: ca.cert },
   domains: ['127.0.0.1', 'app.mypixelgram.ru'],
   validity: 365,
})

// Сохраняем в файлы
fs.writeFileSync('./cert.key', cert.key)
fs.writeFileSync('./cert.crt', cert.cert)
