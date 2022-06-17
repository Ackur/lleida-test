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
    <L-Button
      :loading="loading"
      class="search-users-form--submit"
      @click="onSubmit"
    >
      Get Users
    </L-Button>
  </L-Card>

  <UsersTable class="search-users-table" :usersList="usersList" />
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
      form: {
        provider: '',
        password: '',
        limit: 1000
      },
      rules: { required },
      usersList: []
    }
  },
  methods: {
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          const data = await this.$api.users.getAccountUsers(this.form)
          this.usersList = data.user_list.users
        } catch (err) {
          console.log(err)
          this.usersList = []
        } finally {
          this.loading = false
        }
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
    margin-bottom: 14px;
  }
  &--submit {
    margin-top: 30px;
  }
}

.search-users-table {
  margin-top: 30px;
}
</style>
