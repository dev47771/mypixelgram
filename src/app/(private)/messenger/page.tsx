'use client'
import { withPrivateRoute } from '@/features/auth/HOC/withPrivateRoute'

function MessengerPage() {
   return <div>MessengerPage</div>
}

export default withPrivateRoute(MessengerPage)
