<template>
  <div class="users-view">
    <keep-alive>
      <SearchUsersComponent />
    </keep-alive>
  </div>
</template>

<script>
import SearchUsersComponent from '@/components/forms/SearchUsersComponent.vue'

export default {
  name: 'UsersView',
  components: { SearchUsersComponent }
}
</script>
