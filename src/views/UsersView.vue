<template>
  <div class="users-view">
    <SearchUsersForm class="users-view--form" />
  </div>
</template>

<script>
import SearchUsersForm from '@/components/forms/SearchUsersForm.vue'

export default {
  name: 'UsersView',
  components: { SearchUsersForm }
}
</script>

<style lang="scss">
.users-view {
  &--form {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
