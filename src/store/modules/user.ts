import { defineStore } from 'pinia'
import axios from 'axios'
import User from '../../types/User'
import Store from '../../types/Store'

export const useUserStore = defineStore('user',{
  state: () => ({
    user: null as User|null,
    store: null as Store|null
  }),
  actions: {
    getUser() {
      return this.user
    },
    getStore() {
      return this.store
    },
    async signOut() {
      this.user= null
    },
    async selectStore(index:number){
      return this.store =(this.user)?this.user.stores[index]:null
    },
    async signIn(email:string, password:string) {
      await axios({
        url: `${import.meta.env.VITE_APP_API_URL}/auth/token`,
        method: 'post',
        data: {
          username: email.toLowerCase(),
          password: password
        },
      }).then(async (response)=>{
        const tokens = response.data
        await axios({
          url: `${import.meta.env.VITE_APP_API_URL}/v1/users/me`,
          method: 'get',
          headers: {'Authorization': `Bearer ${tokens.access}`},
        }).then((stores)=>{
          if(stores?.data?.result){
            this.user = {
              tokens:tokens,
              uuid: stores.data.result,
              email: stores.data.result.email,
              username: stores.data.result.username,
              stores: [...stores.data.result.stores]
            }
            this.selectStore(0)
          }
        })
      })
      return this.user
    },
    async refreshUser() {
      if(this.user){
        const response = await axios({
          url: `${import.meta.env.VITE_APP_API_URL}/api/auth/token/refresh`,
          headers: {'Authorization': `Bearer ${this.user.tokens.refresh}`},
          method: 'get',
        })
        this.user.tokens = response.data
      }
      return this.user
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: import.meta.env.VITE_APP_STORAGE_KEY,
        storage: (import.meta.env.VITE_APP_STORAGE == "local")?localStorage:sessionStorage
      },
    ],
  },
})
