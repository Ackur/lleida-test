<template>
  <footer class="app-footer">
    <div class="l-container">
      <div class="app-footer__content">
        © footer {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.app-footer {
  min-height: 30px;
  background-color: $app-accent-color;
  box-shadow: 0 0 5px 0px #000;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
