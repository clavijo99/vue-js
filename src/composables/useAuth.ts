const useAuth = () => {
  const ISSERVER = typeof window === 'undefined'
  const authStore = useAuthStore()
  const router = useRouter()




  const checkAuth = () => {
    const user = !ISSERVER ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null

    if (!user) {
      if (!ISSERVER)
        authStore.logout()
      console.warn('token not found')
      return { isAuthenticate: false, message: 'token not found' }
    }

    authStore.loginUser({
      status: 'authenticated',
      user,
    })

    return { isAuthenticate: true }
  }

  const logoutUser = async () => {
    authStore.logout()
    router.push('/auth/login')
  }
  return {checkAuth, logoutUser }
}

export default useAuth