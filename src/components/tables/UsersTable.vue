<template>
  <L-Card title="USERS TABLE">
    <LTable
      :headers="headers"
      :items="tableData"
      paginationServer
      :pageSize="pageOptions.perPage"
      :itemsTotal="pageOptions.total"
      :currentPage="pageOptions.currentPage"
      :loading="loading"
      @pageChange="onChangePage"
    >
      <template #item.credit="{ row }">
        {{ (row.credit * 1).toFixed(2) }}
      </template>
      <template #item.created="{ row }">
        {{ dateFormat(row.created) }}
      </template>
    </LTable>
  </L-Card>
</template>

<script>
import LCard from '@/components/ui-elements/LCard.vue'
import LTable from '@/components/ui-elements/LTable.vue'

export default {
  name: 'UsersTable',
  components: {
    LCard,
    LTable
  },
  props: {
    usersList: {
      type: Array,
      default: () => []
    },
    paginations: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: [
        {
          name: 'User ID',
          value: 'id',
          maxWidth: '85px'
        },
        {
          name: 'Name',
          value: 'contact_name'
        },
        {
          name: 'E-mail',
          value: 'email'
        },
        {
          name: 'Country',
          value: 'country'
        },
        {
          name: 'State',
          value: 'state'
        },
        {
          name: 'Credit',
          value: 'credit'
        },
        {
          name: 'Created Date',
          value: 'created'
        },
        {
          name: 'Status',
          value: 'status',
          maxWidth: '50px'
        }
      ],
      tableData: [],
      pageOptions: {
        currentPage: 1,
        perPage: 6,
        total: 0
      }
    }
  },
  methods: {
    onChangePage(page) {
      if (this.pageOptions.currentPage === page) return
      this.pageOptions.currentPage = page
      this.$emit('onChangePage', {
        limit: this.pageOptions.perPage,
        offset: (page - 1) * this.pageOptions.perPage,
        total: this.pageOptions.total
      })
    },
    dateFormat(seconds) {
      return new Date(+seconds * 1000).toLocaleString()
    }
  },
  watch: {
    usersList: {
      immediate: false,
      handler(arr) {
        this.tableData = arr
      }
    },
    paginations: {
      immediate: false,
      handler(obj) {
        this.pageOptions.perPage = +obj.limit
        this.pageOptions.total = +obj.total
      }
    }
  }
}
</script>
