<template>
  <div class="sms-view">
    <SendMessageForm class="sms-view--send-message-form" />
  </div>
</template>

<script>
import SendMessageForm from '@/components/forms/SendMessageForm.vue'

export default {
  name: 'SmsView',
  components: { SendMessageForm }
}
</script>

<style lang="scss">
.sms-view {
  &--send-message-form {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
