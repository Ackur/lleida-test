<template>
  <div class="l-textarea">
    <label
      v-if="label"
      class="l-textarea--label"
      :class="{ required: required }"
    >
      {{ label }}
    </label>
    <textarea
      v-model="inputValue"
      class="l-textarea--textarea"
      :class="{
        'g-error': errorMsg
      }"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @blur="onBlur"
    ></textarea>
    <div class="l-textarea__message">
      <transition name="show-message" mode="out-in">
        <div v-if="errorMsg" class="l-textarea__message--error">
          {{ errorMsg }}
        </div>
        <div
          v-else-if="(hint || $slots.hint) && !errorMsg"
          class="l-textarea__message--hint"
        >
          <slot name="hint">
            {{ hint }}
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { fieldErrorHandler } from '@/utils/fields-rules.js'

export default {
  name: 'LTextarea',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    label: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: [String, Number],
      default: null
    },
    hint: {
      type: String,
      default: ''
    },
    rules: {
      type: [Function, Array],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    errorHandlerOn: {
      type: String,
      default: 'change',
      description: 'blur | change | initial'
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      errorMsg: ''
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  methods: {
    onBlur() {
      this.checkErrorOnBluR()
    },
    checkErrorOnBluR() {
      if (this.errorHandlerOn === 'blur' && this.rules) {
        this.errorHandler()
      }
    },
    errorHandler() {
      this.errorMsg = fieldErrorHandler(this.rules, this.modelValue)
      return this.errorMsg
    }
  },
  watch: {
    modelValue() {
      if (this.errorHandlerOn !== 'blur' && this.rules) {
        this.errorHandler()
      }
    }
  }
}
</script>

<style lang="scss">
.l-textarea {
  display: flex;
  flex-direction: column;

  &--label {
    margin-bottom: 3px;

    &.required {
      &::after {
        content: '*';
        color: crimson;
      }
    }
  }

  &--textarea {
    height: 150px;
    border: 2px solid transparent;
    border-radius: 4px;
    padding: 5px 10px;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #3f51b5;
    }
    &::placeholder {
      opacity: 0.7;
    }
    &.g-error {
      border-color: crimson;
    }
  }

  &__message {
    &--error {
      height: 15px;
      display: block;
      font-size: 12px;
      line-height: 15px;
      color: crimson;
      transition: all 0.3s;
    }

    &--hint {
      height: 15px;
      font-size: 12px;
      line-height: 15px;
    }
  }

  .show-message-enter-active,
  .show-message-leave-active {
    transition: all 0.3s ease;
  }

  .show-message-enter-from,
  .show-message-leave-to {
    height: 0;
    overflow: hidden;
    opacity: 0;
  }
}
</style>
