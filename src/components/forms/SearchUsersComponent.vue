<template>
  <L-Card title="Get Partner Account Users" class="search-users-form">
    <L-Input
      v-model.trim="form.provider"
      :rules="[rules.required]"
      required
      ref="provider"
      label="Username"
      placeholder="Enter partner account name"
      class="search-users-form--item"
    />
    <L-Input
      v-model.trim="form.password"
      :rules="[rules.required]"
      type="password"
      required
      ref="password"
      label="Password"
      placeholder="Enter partner account password"
      class="search-users-form--item"
    />

    <div
      class="search-users-form--server-message"
      :class="[serverMessageType, { active: serverMessage }]"
    >
      {{ serverMessage }}
    </div>

    <L-Button
      :loading="loading"
      class="search-users-form--submit"
      @click="onSubmit"
    >
      Get Users
    </L-Button>
  </L-Card>

  <UsersTable
    :paginations="tablePagination"
    class="search-users-table"
    :usersList="usersList"
    :loading="tableLoading"
    @onChangePage="onChangePage"
  />
</template>

<script>
import LCard from '@/components/ui-elements/LCard.vue'
import LButton from '@/components/ui-elements/LButton.vue'
import LInput from '@/components/ui-elements/forms/LInput.vue'
import UsersTable from '@/components/tables/UsersTable.vue'
import { required, isThisRefsValid } from '@/utils/fields-rules.js'

export default {
  name: 'SearchUsersComponent',
  components: { LCard, LButton, LInput, UsersTable },
  data() {
    return {
      loading: false,
      tableLoading: false,
      form: {
        provider: '',
        password: ''
      },
      tablePagination: {
        limit: 5,
        offset: 0,
        total: 0
      },
      rules: { required },
      usersList: [],
      serverMessage: '',
      serverMessageType: '',
      serverMessageTypes: {
        error: 'error',
        success: 'success'
      }
    }
  },
  methods: {
    async onChangePage(data) {
      this.tablePagination = data
      this.tableLoading = true
      try {
        await this.getAccountUsers(this.loading)
      } catch (err) {
        console.log(err)
      } finally {
        this.tableLoading = false
      }
    },
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          await this.getAccountUsers(this.loading)
        } catch (err) {
          console.log(err)
        } finally {
          this.loading = false
        }
      }
    },
    async getAccountUsers() {
      try {
        const data = await this.$api.users.getAccountUsers({
          ...this.form,
          limit: this.tablePagination.limit,
          offset: this.tablePagination.offset
        })
        this.usersList = data.user_list.users
        this.tablePagination = {
          limit: data.user_list.limit,
          offset: data.user_list.offset,
          total: data.user_list.total
        }
      } catch (err) {
        this.serverMessage = err.errorMessage
        this.serverMessageType = this.serverMessageTypes.error
        this.usersList = []
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.serverMessage = ''
      }
    }
  }
}
</script>

<style lang="scss">
.search-users-form {
  max-width: 500px;
  margin: 0 auto;

  &--item {
    margin-bottom: 15px;
  }
  &--submit {
    margin-top: 20px;
  }

  &--server-message {
    max-height: 0;
    text-align: center;
    font-weight: 600;
    border: 1px dashed transparent;
    overflow: hidden;
    opacity: 0;
    transition: 0.4s;

    &.error {
      color: crimson;
      border-color: crimson;
    }

    &.success {
      color: green;
      border-color: green;
    }

    &.active {
      max-height: 100px;
      overflow: visible;
      opacity: 1;
      margin-bottom: 15px;
      padding: 10px;
    }
  }
}

.search-users-table {
  margin-top: 30px;
}
</style>
