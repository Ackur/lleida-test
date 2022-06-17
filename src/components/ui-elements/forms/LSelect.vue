<template>
  <div class="l-select" v-click-outside="closeList">
    <label class="l-select__label" :class="{ required: required }">
      {{ label }}
    </label>
    <div
      class="l-select__select form-control"
      :class="{
        focus: showList,
        'g-error': errorMsg || invalid,
        'p-right': showClearable
      }"
      @click="showList = !showList"
    >
      <input
        v-if="autocomplete"
        type="text"
        class="l-select__select--autocomplete"
        :placeholder="placeholder"
        @input="onSearchInput"
        v-model="search"
      />
      <template v-else>
        <span class="l-select__select--name">
          {{ selectedItem && selectedItem[itemName] }}
        </span>
        <span
          v-if="placeholder && !selectedItem"
          class="l-select__select--placeholder"
          >{{ placeholder }}
        </span>
      </template>

      <svg
        v-if="showClearable"
        width="20"
        height="20"
        class="l-select__select--clearable"
        @click.stop="onClearable"
      >
        <use href="/img/icons/icons-symbol.svg#close-circle-icon" />
      </svg>
    </div>
    <transition name="show-list" mode="out-in">
      <ul v-if="showList" class="l-select__list">
        <li
          v-for="(item, idx) in filteredItems"
          :key="idx"
          class="l-select__list--item"
          :class="{ active: Object.is(item, selectedItem) }"
          @click="onSelect(item)"
        >
          <span class="item-name">{{ item[itemName] }}</span>
        </li>
        <li
          v-if="!filteredItems || !filteredItems.length"
          class="l-select__list--item no-data"
        >
          <span class="item-name">no data</span>
        </li>
      </ul>
    </transition>
    <div class="l-select__messages">
      <transition name="show-message" mode="out-in">
        <span v-if="errorMsg" class="l-select__messages--error">
          {{ errorMsg }}
        </span>
        <div
          v-else-if="(hint || $slots.hint) && !errorMsg"
          class="l-select__messages--hint"
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
import clickOutside from '@/directives/clickOutside'
import { fieldErrorHandler } from '@/utils/fields-rules.js'

export default {
  name: 'LSelect',
  directives: {
    clickOutside
  },
  props: {
    modelValue: {
      type: [String, Number, Object],
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
    items: {
      type: Array,
      default: () => []
    },
    itemName: {
      type: [String, Number],
      default: 'name'
    },
    itemValue: {
      type: [String, Number],
      default: 'value'
    },
    rules: {
      type: [Function, Array],
      default: null
    },
    autocomplete: {
      type: Boolean,
      default: false
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
    returnObject: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'onSearch'],
  data() {
    return {
      showList: false,
      errorMsg: '',
      search: ''
    }
  },
  computed: {
    showClearable() {
      return this.clearable && this.selectedItem
    },
    selectedItem: {
      get() {
        const processingTypes = ['string', 'number']
        if (processingTypes.includes(typeof this.modelValue)) {
          return (
            this.normalizeItems.find(
              (item) => item[this.itemValue] === this.modelValue
            ) || ''
          )
        }
        return this.modelValue
      },
      set(item) {
        const outputValue = this.returnObject
          ? item
          : item[this.itemValue]
          ? item[this.itemValue]
          : ''
        this.$emit('update:modelValue', outputValue)
      }
    },
    normalizeItems() {
      const processingTypes = ['string', 'number']
      if (processingTypes.includes(typeof this.items[0])) {
        return this.items.map((el) => ({
          [this.itemName]: el,
          [this.itemValue]: el
        }))
      }

      return this.items || []
    },
    filteredItems() {
      return this.normalizeItems.filter((item) =>
        item[this.itemName].toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    onSelect(item) {
      this.selectedItem = item
      if (this.autocomplete) {
        this.search = item[this.itemName]
      }
      this.showList = !this.showList
    },
    onSearchInput() {
      this.selectedItem =
        this.normalizeItems.find(
          (item) =>
            item[this.itemName].toLowerCase() === this.search.toLowerCase()
        ) || ''
      this.showList = true
      this.$emit('onSearch', this.search)
    },
    onClearable() {
      this.selectedItem = ''
      this.search = ''
    },
    closeList() {
      this.showList = false
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
  mounted() {
    if (this.errorHandlerOn === 'initial') {
      this.errorHandler()
    }
  },
  watch: {
    selectedItem: {
      immediate: false,
      flush: 'post',
      handler() {
        if (this.errorHandlerOn !== 'blur' && this.rules) {
          this.errorHandler()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.l-select {
  position: relative;

  &__label {
    color: #999;
    line-height: 1;

    &.required {
      position: relative;

      &::after {
        content: '*';
        position: absolute;
        top: -2px;
        right: -8px;
        color: #4466f2;
      }
    }
  }

  &__select {
    position: relative;
    background-color: #efefef;
    border-color: #d6e0e3;
    font-size: 14px;
    line-height: 1.5;
    color: var(--dark);
    cursor: pointer;
    user-select: none;

    &--name,
    &--placeholder {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      display: block;
    }

    &--placeholder {
      opacity: 0.5;
    }

    &--autocomplete {
      width: 100%;
      display: block;
      border: none;
      outline: none;
      color: var(--dark) !important;
      background-color: #efefef !important;

      &::placeholder {
        font-size: 14px !important;
        font-weight: 400 !important;
        color: var(--dark) !important;
        opacity: 0.5;
      }
    }

    &--clearable {
      position: absolute;
      right: 24px;
      display: block;
      top: 50%;
      transform: translateY(-50%);
      fill: #efefef;
    }

    &:after {
      content: '';
      position: absolute;
      right: 12px;
      top: 50%;
      width: 8px;
      height: 8px;
      border-right: 2px solid black;
      border-bottom: 2px solid black;
      border-radius: 1px;
      transform: translateY(calc(-50% - 1px)) rotate(45deg);
      transition: 0.3s;
    }

    &.focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);

      &:after {
        transform: translateY(calc(-50% + 1px)) rotate(-135deg);
      }
    }

    &.g-error {
      border-color: var(--danger) !important;
    }

    &.p-right {
      padding-right: 45px;
    }
  }

  &__list {
    position: absolute;
    width: 100%;
    max-height: 264px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
    border-radius: 4px;
    outline: 0;
    transform-origin: top;
    z-index: 2;
    /* ========= Custom Scrollbar ========= */
    /* width */
    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #00000010;
      border-radius: 2px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #97b0fc;
      border-radius: 5px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #3c5dc3;
    }
    /* ====END==== Custom Scrollbar ========= */

    &--item {
      padding: 6px 12px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      &.active {
        background-color: rgba(0, 0, 0, 0.12);
      }

      .item-name {
        font-size: 14px;
        user-select: none;
      }

      &.no-data {
        text-align: center;

        .item-name {
          color: var(--gray-400);
        }
      }
    }
  }

  &__messages {
    &--error {
      height: 15px;
      display: block;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      color: var(--danger);
      transition: all 0.3s;
    }

    &--hint {
      height: 15px;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: var(--gray);
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

  .show-list-enter-active,
  .show-list-leave-active {
    transition: all 0.3s ease;
  }

  .show-list-enter-from,
  .show-list-leave-to {
    overflow: hidden;
    opacity: 0;
    transform: scaleY(0.5);
  }
}
</style>
