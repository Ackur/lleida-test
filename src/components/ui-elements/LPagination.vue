<template>
  <nav aria-label="Page navigation example">
    <ul class="l-pagination">
      <li class="page-item arrow-left">
        <button
          type="button"
          class="page-link"
          @click="changePageHandler(page - 1)"
          :class="{ disable: page <= 1 }"
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.5 8L8 0.5L9.05 1.55L2.6 8L9.05 14.45L8 15.5L0.5 8Z" />
          </svg>
        </button>
      </li>
      <li class="page-item pages">
        <button
          type="button"
          class="page-link"
          v-for="pageNumber in visiblePages"
          :class="{ active: pageNumber === page }"
          :key="pageNumber"
          @click="changePageHandler(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </li>
      <li class="page-item arrow-right">
        <button
          type="button"
          @click="changePageHandler(page + 1)"
          class="page-link"
          :class="{ disable: !pages.length || page === pages.length }"
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 8L2 0.5L0.950001 1.55L7.4 8L0.950001 14.45L2 15.5L9.5 8Z"
            />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'LPagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 15
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pages: []
    }
  },
  computed: {
    visiblePages() {
      const { page, pages } = this
      if (page === 1) {
        return pages.slice(page - 1, page + 2)
      } else if (page === pages.length && page > 2) {
        return pages.slice(page - 3, page)
      } else {
        return pages.slice(page - 2, page + 1)
      }
    }
  },
  methods: {
    changePageHandler(page) {
      this.$emit('changePage', page)
    },
    setPages() {
      this.pages = []
      let numberOfPages = Math.ceil(this.total / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(posts) {
      let page = this.page
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      return posts.slice(from, to)
    }
  },
  watch: {
    total: {
      immediate: true,
      handler(value) {
        if (value) {
          this.setPages()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.l-pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  width: fit-content;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 8px;

  .arrow-left,
  .arrow-right {
    svg {
      fill: blue;
    }
    .disable {
      pointer-events: none;
      cursor: default;

      svg {
        fill: #736d7b;
      }
    }
  }
  .arrow-left {
    padding-top: 3px;
    border-right: 1px solid #EBEBEB;
  }
  .arrow-right {
    padding-top: 3px;
    border-left: 1px solid #EBEBEB;
  }
  .pages {
    margin: 0 7px;
  }
  button.page-link {
    display: inline-block;
    font-size: 14px;
    color: #736D7B;
    font-weight: 500;
    outline: none;
  }
  .page-link {
    position: relative;
    display: block;
    margin: 1px 10px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: none;
    border-radius: 8px;
    &:hover {
      z-index: 2;
      color: blue;
      text-decoration: none;
    }
    &:not(:disabled):not(.disabled) {
      cursor: pointer;
    }
    &.active {
      color: blue;
      border-bottom: 2px solid #405cb1;
      border-radius: 0;
    }
  }
  .page-item {
    display: flex;
    align-items: center;
  }
}
</style>
