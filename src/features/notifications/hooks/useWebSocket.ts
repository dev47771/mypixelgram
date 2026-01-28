import { useEffect } from "react"
import { ToastType } from ".."
import { TOKEN } from "@/shared/constants"

export const useWebSocket = (addToast: (toast: ToastType) => void) => {
   const token = localStorage.getItem(TOKEN)
  
  useEffect(() => {
    if (!token) return
    
    const ws = new WebSocket(`ws://ваш-url?token=${token}`)//////////
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      addToast(data)
    }
    
    return () => ws.close()
  }, [addToast, token])
}