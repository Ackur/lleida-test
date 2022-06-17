<template>
  <main class="app-main">
    <div class="l-container">
      <RouterView v-slot="{ Component }">
        <transition name="layout-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss">
.app-main {
  flex: 1 1 auto;
  padding: 50px 0;

  .layout-fade {
    &-enter-active,
    &-leave-active {
      transition: 0.6s;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>
