<template>
  <div class="l-card">
    <span v-if="title" class="l-card--title">
      {{ title }}
    </span>
    <div class="l-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.l-card {
  background-color: $app-accent-color;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 5px 0px #000;

  &--title {
    display: block;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>
