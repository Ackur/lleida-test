<template>
  <component
    class="l-button"
    :is="tag"
    :type="type"
    :disabled="disabled || loading"
    :class="[color, size, { icon: icon, rounded: rounded, outline: outline }]"
  >
    <div v-if="loading" class="l-button__content--loading"></div>
    <div class="l-button__content">
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'LButton',
  props: {
    color: {
      type: String,
      default: 'blue',
      description: 'blue | green'
    },
    size: {
      type: String,
      default: 'sm',
      description: 'lg|sm|xs'
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => value.match(/(button|reset|submit)/)
    },
    tag: {
      type: String,
      default: 'button',
      validator: (value) => value.match(/(button|a|router-link)/)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.l-button {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
  padding: 0 15px;
  border: 2px solid transparent;
  outline: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: darken($color: #3f51b5, $amount: 5%);
    box-shadow: 0px 0px 3px 0 #474747;
  }
  &:active {
    background-color: lighten($color: #3f51b5, $amount: 5%);
  }

  &:disabled {
    opacity: .5;
    cursor: inherit;

    .l-button__content {
      color: #818181;
    }
  }

  &.icon {
    width: inherit;
    min-width: inherit;
    border-radius: 50%;
    padding: 0;

    &.lg {
      width: 60px;
      min-width: 60px;
    }

    &.sm {
      width: 46px;
      min-width: 46px;
    }

    &.xs {
      width: 34px;
      min-width: 34px;
    }
  }

  &.lg {
    height: 60px;
  }

  &.sm {
    height: 46px;
  }

  &.xs {
    height: 34px;
  }

  &.blue {
    background-color: #3f51b5;
    &.outline {
      border-color: #3f51b5;
    }
  }
  &.green {
    background-color: #4caf50;
    &.outline {
      border-color: #4caf50;
    }
  }
  &.red {
    background-color: crimson;
    &.outline {
      border-color: crimson;
    }
  }

  &.outline {
    background-color: unset;
    color: $app-accent-text-color;
  }

  &.rounded {
    border-radius: 16px;
  }

  &__content {
    &--loading {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 25px;
      height: 25px;
      border: 2px solid white;
      border-left-color: black;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: loading 0.8s linear infinite;
      z-index: 0;

      @keyframes loading {
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }
  }
}
</style>
