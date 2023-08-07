<script lang="ts">
import { useUserStore } from '../store/modules/user'
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  beforeMount() {
    this.userStore.signOut()
  }
}
</script>
<template>
  <section class="hero is-fullheight is-relatie" id="not-found">
    <div class="hero-body has-text-centered">
      <div class="container">
        <div class="is-flex is-justify-content-center">
            <figure class="image is-250x250 mb-5">
            <img src="/src/assets/images/parrot.png"/>
            </figure>
        </div>
        <h1 class="has-text-link has-text-weight-bold is-size-1 title mb-4">Página no encontrada</h1>
        <p class="is-size-4 has-text-dark">Asegúrate de escribir correctamente la dirección</p>
      </div>
    </div>
  </section>
</template>