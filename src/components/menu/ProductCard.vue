<script lang="ts">
import axios from 'axios'
import { useUserStore } from '../../store/modules/user'
import { moneyFormat } from '../../helpers/formats'
import { PropType } from 'vue'
import Product from '../../types/Product'
import { toast } from 'bulma-toast'

export default {
    props: {
        product:{
            type:Object as PropType<Product>,
        }
    },
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data:function(){
        return{
            available: false as boolean
        }
    },
    computed:{
        getMoney:function(){
            return this.product?moneyFormat(parseFloat(this.product.price.toString()),'',2):''
        }
    },
    watch:{
        product: function(){
            this.available = this?.product?.availability!=='UNAVAILABLE'
        }
    },
    beforeMount() {
        this.available = this?.product?.availability!=='UNAVAILABLE'
    },
    methods:{
        changeAvailability: async function(){
            const user = this.userStore.getUser()

            await axios({
                url: `${import.meta.env.VITE_APP_API_URL}/v1/products/${this.product?.uuid}/availability`,
                method: 'put',
                headers: {'Authorization': `Bearer ${user?.tokens.access}`},
                data:{
                    "availability": this.available?"AVAILABLE":"UNAVAILABLE",
                }
            }).then((response)=>{
                if(response.data.status=='ok'){
                    toast({
                        message: `Se actualizó la disponibilidad de ${this?.product?.name}: ${response.data.result.availability}`,
                        type: 'is-link',
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                        position: 'bottom-right',
                        duration: 4000,
                    })
                }
            })
        }
    },
}
</script>
<template>
    <article v-if="product" class="product-card is-relative media is-align-items-center" :class="{'is-unavailable':!available}">
        <div class="media-left">
            <figure class="image is-flex is-align-items-center is-144x144">
                <img class="has-ratio is-bordered   " :src="product.imageUrl">
            </figure>
        </div>
        <div class="media-content">
            <div class="the-content">
                <h3 class="has-text-weight-medium has-text-dark is-size-5">{{ product.name }}</h3> 
                <p class="has-text-dark is-size-5">{{ getMoney }}</p> 
                <p class="has-text-link">
                    {{ product.description }}
                </p>
            </div>
        </div>
        <div class="media-right">
            <div class="field">
                <input :id="`switch-${product.uuid}`" type="checkbox" v-model="available" @change="changeAvailability" class="switch is-success is-rounded">
                <label :for="`switch-${product.uuid}`">&nbsp;</label>
            </div>
        </div>
    </article>
</template>