<template>
  <header class="app-header">
    <nav class="app-header__nav">
      <router-link to="/" exact class="app-header__nav--item">
        Users List
      </router-link>
      <router-link to="/sms" class="app-header__nav--item">
        Send SMS
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.app-header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $app-accent-color;
  box-shadow: 0 0 5px 0px #000;

  &__nav {
    display: flex;
    align-items: center;
    gap: 15px;

    &--item {
      position: relative;
      font-weight: 600;

      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #3f51b5;
        transform: scale(0);
        transition: 0.3s;
      }
      &.router-link-active {
        color: #3f51b5;

        &:after {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
