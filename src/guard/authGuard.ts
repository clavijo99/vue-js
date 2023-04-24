const isAuthenticatedGuard = async (to:any, from:any, next:any) => {
    const { checkAuth } = useAuth()
  
    const { isAuthenticate } = checkAuth()
  
    if (!isAuthenticate && to.path !== '/auth/login')
      next('/auth/login')
  
    else
      next()
  }
  export default isAuthenticatedGuard