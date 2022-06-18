<template>
  <L-Card title="USERS TABLE">
    <LTable
      :headers="headers"
      :items="tableData"
      :pageSize="pageOptions.perPage"
      :itemsTotal="tableData.length"
      :currentPage="pageOptions.currentPage"
      :loading="loading"
      hideFooter
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
    }
  },
  data() {
    return {
      loading: false,
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
        perPage: 6
      }
    }
  },
  methods: {
    onChangePage() {
      console.log('onChangePage')
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
    }
  }
}
</script>

<style lang="scss">
.users-table {
}
</style>
