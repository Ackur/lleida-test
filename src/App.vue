<template>
  <div class="app">
    <AppHeader />

    <AppMain />

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader.vue'
import AppMain from '@/components/app/AppMain.vue'
import AppFooter from '@/components/app/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
}
</script>

<style lang="scss">
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
