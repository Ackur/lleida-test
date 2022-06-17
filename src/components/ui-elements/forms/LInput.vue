<template>
  <div class="l-input">
    <label v-if="label" class="l-input--label" :class="{ required: required }">
      {{ label }}
    </label>
    <input
      v-model="inputValue"
      class="l-input--input"
      :class="{
        'g-error': errorMsg || invalid
      }"
      :type="localInputType"
      :placeholder="placeholder"
      :readonly="readonly"
      :autocomplete="autocomplete"
      @blur="onBlur"
    />
    <div class="l-input__message">
      <transition name="show-message" mode="out-in">
        <div v-if="errorMsg" class="l-input__message--error">
          {{ errorMsg }}
        </div>
        <div
          v-else-if="(hint || $slots.hint) && !errorMsg"
          class="l-input__message--hint"
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
  name: 'LInput',
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
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return value.match(/(text|number|email|password|tel|date)/)
      }
    },
    rules: {
      type: [Function, Array],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    errorHandlerOn: {
      type: String,
      default: 'change',
      description: 'blur | change | initial'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      errorMsg: '',
      localInputType: ''
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
  mounted() {
    this.changeType(this.type)

    if (this.errorHandlerOn === 'initial') {
      this.errorHandler()
    }
  },
  methods: {
    changeType(newType, evt) {
      // bug fixer. if remove this row input type changed when pres "Enter" ))
      if (evt && evt.pointerId === -1) return

      this.localInputType = newType
    },
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
.l-input {
  display: flex;
  flex-direction: column;

  &--label {
    margin-bottom: 3px;
    &.required {
      position: relative;

      &::after {
        content: '*';
        color: crimson;
      }
    }
  }

  &--input {
    height: 30px;
    border: 2px solid transparent;
    border-radius: 4px;
    padding: 0 10px;

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
