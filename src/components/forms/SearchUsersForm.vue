<template>
  <div class="search-users-form">
    <L-Card title="Get Partner Account Users">
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
        Submit
      </L-Button>
    </L-Card>
  </div>
</template>

<script>
import LCard from '@/components/ui-elements/LCard.vue'
import LButton from '@/components/ui-elements/LButton.vue'
import LInput from '@/components/ui-elements/forms/LInput.vue'
import { required, isThisRefsValid } from '@/utils/fields-rules.js'

export default {
  name: 'SearchUsersForm',
  components: { LCard, LButton, LInput },
  data() {
    return {
      loading: false,
      form: {
        provider: '',
        password: ''
      },
      rules: { required }
    }
  },
  methods: {
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          await this.$api.users.getAccountUsers(this.form)
        } catch (err) {
          console.log('err', err)
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
  &--item {
    margin-bottom: 14px;
  }
  &--submit {
    margin-top: 30px;
  }
}
</style>
