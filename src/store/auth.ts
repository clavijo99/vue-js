import { defineStore } from 'pinia'
const ISSERVER = typeof window === 'undefined'

export const useAuthStore = defineStore('auth', {
  state: (): {status: string, user?: string} => ({
    status: !ISSERVER ? String(localStorage.getItem('status')) : '',
    user: !ISSERVER ? JSON.parse(String(localStorage.getItem('currentUser'))) : {},
  }),

  actions: {
    loginUser(value: {status: string, user: string})  {
      // if (value.access && !ISSERVER) {}
      this.status = 'authenticated'
      this.user = value.user
      this.setLocalStorage()
    },
    logout() {
      this.status = 'unauthenticated'
      this.user = undefined
      this.clearLocalStorage()
    },
    setLocalStorage() {
      if (!ISSERVER) {
        localStorage.setItem('status', this.status!)
        localStorage.setItem('user', this.user!)
      }
    },
    clearLocalStorage() {
      if (!ISSERVER) {
        ['user', 'currentUser'].forEach((key) => {
          localStorage.removeItem(key)
        })
      }
      console.warn('clear local storage')
    },
  },
})