<template>
  <div class="l-table" :class="{ 'style-two': styleTwo }">
    <div v-if="showHeader" class="l-table__headers">
      <div
        v-for="head in headers"
        :key="head.value"
        class="l-table__headers--item"
        :style="{
          maxWidth: `${head.maxWidth}`,
          textAlign: head.align,
          display: head.justify || head.alignItems ? 'flex' : '',
          justifyContent: head.justify,
          alignItems: head.alignItems
        }"
      >
        {{ head.name }}
      </div>
    </div>

    <div class="l-table__body" :class="{ empty: !filteredTableData.length }">
      <div class="l-table__body--wrap">
        <div v-if="loading" class="l-table__body--loading">o-loader</div>

        <div
          v-for="(row, index) in filteredTableData"
          :key="index"
          class="l-table__body--row"
          :class="{
            clickable: clickable
          }"
          @click="$emit('click:row', row)"
        >
          <div class="l-table__body--row-main">
            <div
              v-for="el in rowItems"
              :key="el.name"
              :data-label="el.name"
              :style="{
                maxWidth: `${el.maxWidth}`,
                textAlign: el.align,
                display: el.justify || el.alignItems ? 'flex' : '',
                justifyContent: el.justify,
                alignItems: el.alignItems,
                margin: el.margin,
                padding: el.padding
              }"
              class="l-table__body--item"
              :class="{ 'no-wrap': el.noWrap }"
            >
              <slot :name="`item.${el.value}`" :row="row" :index="index">
                <span>{{ getRowValue(row, el.value) }}</span>
              </slot>
            </div>
          </div>
          <div class="l-table__body--row-append">
            <slot :name="`row.append`" :row="row" :index="index"> </slot>
          </div>
        </div>

        <slot name="empty" v-if="!filteredTableData.length">
          <span class="empty-text">{{ emptyText }}</span>
        </slot>
      </div>
    </div>

    <div v-if="!hideFooter && itemsTotal" class="l-table__footer">
      <LPagination
        :page="page"
        :perPage="pageSize"
        :total="itemsTotal"
        @changePage="changePageHandler"
        class="current-voting__pagination"
      />
    </div>
  </div>
</template>

<script>
import LPagination from '@/components/ui-elements/LPagination.vue'

export default {
  name: 'LTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    customRowItems: {
      type: Array,
      default: () => []
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    paginationServer: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 1
    },
    itemsTotal: {
      type: Number,
      default: 0
    },
    clickable: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    styleTwo: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'NO DATA'
    }
  },
  components: {
    LPagination
  },
  data() {
    return {
      page: 1,
      tableData: []
    }
  },
  computed: {
    filteredTableData() {
      if (this.paginationServer) {
        return this.tableData
      }

      return this.tableData[this.page - 1] || []
    },
    rowItems() {
      return this.customRowItems.length ? this.customRowItems : this.headers
    }
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        this.initialized()
      }
    }
  },
  methods: {
    getRowValue(row, value) {
      const values = value.split('.')
      if (values.length > 1) {
        return values.reduce((acc, el) => (acc = acc[el]), { ...row })
      }
      return row[value]
    },
    changePageHandler(val) {
      this.page = val
      this.$emit('pageChange', val)
    },
    divideBy(array) {
      this.tableData = []

      if (this.paginationServer) {
        this.tableData = array
        return
      }

      for (let i = 0; i < Math.ceil(array.length / this.pageSize); i++) {
        this.tableData.push(
          array.slice(i * this.pageSize, i * this.pageSize + this.pageSize)
        )
      }
    },
    initialized() {
      this.divideBy(this.items)
      this.page = +this.currentPage
    }
  }
}
</script>

<style lang="scss">
.l-table {
  font-size: 14px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  &__headers {
    display: flex;
    align-items: center;
    padding: 0px 10px;
    &--item {
      max-width: 100%;
      width: 100%;
      font-weight: 600;
      color: #736d7b;
      padding: 10px 0 10px 10px;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  &__body {
    &.empty {
      flex: 1 1 auto;
    }
    &--wrap {
      height: 100%;
      position: relative;
    }

    &--loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &--row {
      &.clickable {
        cursor: pointer;
      }

      &-main {
        display: flex;
        align-items: center;
        border: 1px solid #e3e3e3;
        box-sizing: border-box;
        background-color: white;
        box-shadow: 2px 2px 4px rgba(224, 224, 224, 0.25);
        border-radius: 10px;
        padding: 0px 10px;
        margin-bottom: 8px;

        @media (max-width: 900px) {
          flex-direction: column;
          & > div {
            max-width: 100% !important;
          }
        }

        &:hover {
          box-shadow: 0px 0px 5px 0px #2f2f2f40;
        }
      }
    }

    &--item {
      max-width: 100%;
      width: 100%;
      color: #5e5d5d;
      font-weight: 500;
      padding: 10px 0 10px 10px;
      word-break: break-word;
      &.no-wrap {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      @media (max-width: 900px) {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        border-bottom: 1px solid #736d7b47;
        text-align: right;
        white-space: normal;
        word-break: break-word;
        padding: 10px;

        &:last-child {
          border-bottom: none;
        }

        &:before {
          content: attr(data-label);
          font-weight: 600;
          text-align: left;
          word-break: break-word;
          color: #736d7b;
          margin-right: 10px;
        }

        span {
          text-align: right;
        }
      }
    }

    .empty-text {
      height: 100%;
      display: grid;
      place-items: center;
      padding: 20px 0;
      color: #2e2e2e;
    }
  }

  &__footer {
    padding-top: 20px;

    button.page-link {
      font-size: 14px !important;
    }

    .v-pagination__item,
    .v-pagination__navigation {
      box-shadow: unset;
      font-size: 14px;
      font-weight: 500;
      color: #736d7b !important;
      margin: 0;
      &:focus {
        outline: none;
      }
    }

    .v-pagination {
      border: 1px solid #ebebeb;
      box-sizing: border-box;
      border-radius: 8px;
      width: fit-content;
      padding: 0 10px;
    }

    .v-pagination__navigation {
      i {
        font-size: 40px;
        color: #2445a6 !important;
      }
    }

    .v-pagination__item--active {
      position: relative;
      background-color: unset !important;
      color: #2445a6 !important;
      font-weight: bold;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 20px;
        background-color: #2445a6;
      }
    }
  }

  &.style-two {
    .l-table__headers {
      background: blue;
      border-radius: 5px 5px 0 0;
    }

    .l-table__body {
      border: 1px solid #d3d0e3;
      border-top: none;
      box-shadow: 0px 2px 4px 0 rgb(0 0 0 / 20%);
    }

    .l-table__headers--item {
      line-height: 14px;
      font-weight: normal;
      font-size: 12px;
      color: white;
    }

    .l-table__body--item {
      font-weight: normal;
      color: black;
    }

    .l-table__body--row {
      &:hover {
        box-shadow: none;
      }
    }

    .l-table__body--row-main {
      min-height: unset;
      border: none;
      border-bottom: 1px solid #d3d0e3;
      border-top-width: 0;
      border-radius: 0;
      margin-bottom: 0;

      @media (max-width: 900px) {
        flex-direction: column;
        & > div {
          max-width: 100% !important;
        }
      }
    }
  }
}
</style>
