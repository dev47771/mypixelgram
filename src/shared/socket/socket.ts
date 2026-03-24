import { io, Socket } from 'socket.io-client'
import { authStorage } from '../lib'

export enum SocketNamespace {
   NOTIFICATIONS = 'notifications',
}

const sockets = new Map<SocketNamespace, Socket>()

export const createSocketConnect = (namespace: SocketNamespace) => {
   if (!sockets.has(namespace)) {
      const socket = io(`${process.env.NEXT_PUBLIC_APP_URL}/${namespace}`, {
         auth: {
            token: authStorage.getToken(),
         },
      })

      sockets.set(namespace, socket)

      socket.on('connect', () => {
         //console.log(socket.connected)
      })
   }

   return sockets.get(namespace)
}

export const disconnectAllSockets = () => {
   sockets.forEach(socket => {
      socket.disconnect()
   })

   sockets.clear()
}
