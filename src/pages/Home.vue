<script lang="ts">
import { useUserStore } from '../store/modules/user'

export default{
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    computed:{
        getName:function(){
            const user = this.userStore.getUser()
            return user?.username
        }
    }
}
</script>
<template>
    <section class="section">
        <h1 class="is-size-1 has-text-weight-semibold">¡Hola {{getName}}!</h1>
        <p class="is-size-5">Selecciona una de las opciones del menú para comenzar.</p>
    </section>
</template>
