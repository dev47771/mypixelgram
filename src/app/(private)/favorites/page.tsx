'use client'
import { withPrivateRoute } from '@/features/auth/HOC/withPrivateRoute'

function FavoritesPage() {
   return <div>FavoritesPage</div>
}

export default withPrivateRoute(FavoritesPage)
