<script lang="ts">
import { useUserStore } from '../../store/modules/user'
import Category from '../../types/Category'
import Product from '../../types/Product'
import Section from '../../types/Section'
import ProductList from './ProductList.vue'
import Pusher from 'pusher-js'
import { toast } from 'bulma-toast'
import axios from 'axios'

export default {
    components:{
        ProductList
    },
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data:function(){
        return{
            categories:[] as Category[],
            products:[] as Product[],
            sections:[] as Section[],
        }
    },
    created(){
        const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY, {
            cluster: 'us3'
        })
        const channel = pusher.subscribe('my-channel')
        channel.bind('my-event', (data) => {
            this.products = [...data.results]
            this.getUniqueCategories()
            this.getSections()
            toast({
                message: `Se detectaron cambios en el backoffice [PUSHER]`,
                type: 'is-danger',
                animate: { in: 'fadeIn', out: 'fadeOut' },
                position: 'bottom-right',
                duration: 3000,
            })
        })
    },
    beforeMount(){
        this.getProducts()
    },
    methods:{
        getUniqueCategories: function(){
            const categories=[] as Category[]
            this.products.forEach((result)=>categories.push(result.category))
            this.categories = categories.filter((obj, index) => {
                return index ===  categories.findIndex((item) => item['uuid'] === obj['uuid'])
            })
        },
        getProductsByCategory: function(uuid:string){
            return this.products.filter((product)=>product.category.uuid === uuid)
        },
        getProducts: async function(){
            const user = this.userStore.getUser()
            const store = this.userStore.getStore()
            this.products = [] as Product[]
            await axios({
                url: `${import.meta.env.VITE_APP_API_URL}/v1/products/?store=${store?.uuid}`,
                method: 'get',
                headers: {'Authorization': `Bearer ${user?.tokens.access}`}
            }).then((response)=>{
                if(response.data.status == "ok"){
                this.products = [...response.data.results]
                this.getUniqueCategories()
                this.getSections()
            }
            }).catch((e)=>{
                if(e.response.data.errors){
                    if(e.response.data.errors.filter((error)=>error['code'] == "users.InvalidToken").length>1){
                        alert("Tu sesión ha terminado, por favor ingresa nuevamente")
                        this.userStore.signOut()
                        window.location.href = '/'
                    }else{
                        console.log(e.response.data)
                    }
                }
            })
        },
        getSections: function(){
            this.sections = [] as Section[]
            for(const i in this.categories){
                if(this.categories[i]){
                    this.sections.push({
                        category: this.categories[i], 
                        products:this.getProductsByCategory(this.categories[i].uuid)
                    })
                }
            }
        }
    }
}
</script>
<template>
     <template :key="n" v-for="(section,n) in sections">
        <product-list :section="section" :data-index="n"></product-list>
     </template>
</template>