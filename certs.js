import { createCA, createCert } from 'mkcert'
import fs from 'fs'

async function generateCerts() {
   // 1. Создаём Certificate Authority (CA)
   const ca = await createCA({
      organization: 'Pixelgram',
      countryCode: 'RU',
      state: 'Moscow',
      locality: 'Moscow',
      validity: 365,
      // ✅ ДОБАВЬТЕ commonName:
      commonName: 'Pixelgram Local CA',
   })

   // 2. Создаём сертификат для домена
   const cert = await createCert({
      ca: { key: ca.key, cert: ca.cert },
      // ✅ ВАЖНО: Укажите ВСЕ необходимые домены
      domains: [
         'app.mypixelgram.ru', // Основной домен
         'localhost', // Для резервного входа
         '127.0.0.1', // IP адрес
      ],
      validity: 365,
      // ✅ ДОБАВЬТЕ commonName для сертификата:
      commonName: 'app.mypixelgram.ru',
      // ✅ ДОБАВЬТЕ extendedKeyUsage:
      extendedKeyUsage: ['serverAuth', 'clientAuth'],
   })

   // 3. Сохраняем файлы
   fs.writeFileSync('./cert.key', cert.key)
   fs.writeFileSync('./cert.crt', cert.cert)

   // 4. ✅ Создаём отдельный CA файл для импорта в Windows
   fs.writeFileSync('./ca.crt', ca.cert)
}

generateCerts().catch(console.error)

/* 
# Порядок импорта ВАЖЕН:
# 1. Сначала ca.crt (чтобы Windows узнала "кто подписал")
certmgr.msc → Доверенные корневые центры → Импорт ca.crt

# 2. Потом cert.crt (сам сертификат сайта)
certmgr.msc → Доверенные корневые центры → Импорт cert.crt 
*/
