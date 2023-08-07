<script lang="ts">
import MenuList from '../components/menu/MenuList.vue'

export default {
    components:{
        MenuList
    },
    setup() {
        
    },
}
</script>
<template>
    <section class="section">
        <h1 class="is-size-1 has-text-weight-semibold">Menú</h1>
        <p class="is-size-5 mb-5">Administra tus productos y su disponibilidad</p>
        <menu-list></menu-list>
    </section>
</template>
