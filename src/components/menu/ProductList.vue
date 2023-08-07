<script lang="ts">
import { useUserStore } from '../../store/modules/user'
import Section from '../../types/Section'
import { PropType } from 'vue'
import ProductCard from './ProductCard.vue'

export default {
    components:{
        ProductCard
    },
    props: {
        section:{
            type:Object as PropType<Section>,
        }
    },
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data:function(){
        return{
            isHidden: false
        }
    },
    beforeMount(){
    },
    methods:{
        toggleCardBody:function(){
            this.isHidden = !this.isHidden
        }
    }
}
</script>
<template>
     <div v-if="section" class="card is-shadowless mt-6">
        <div @click="toggleCardBody" class="card-header has-background-link is-hoverable">
            <p class="card-header-title has-text-white">
                {{ section.category.name }} ({{ section['products']?.length }})
            </p>
            <button class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i v-if="isHidden" class="material-symbols-outlined has-text-white" aria-hidden="true">expand_less</i>
                <i v-else class="material-symbols-outlined has-text-white" aria-hidden="true">expand_more</i>
            </span>
            </button>
        </div>
        <div class="card-body p-3" :class="{'is-hidden':isHidden}">
            <template :key="m" v-for="(product, m) in section.products">
                <product-card :product="product" :data-index="m"></product-card>
            </template>
        </div>
    </div>
</template>