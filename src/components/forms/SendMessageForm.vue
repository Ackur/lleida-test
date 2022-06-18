<template>
  <L-Card title="Send SMS Form" class="send-message-form">
    <L-Input
      v-model.trim="form.user"
      :rules="[rules.required]"
      required
      ref="user"
      label="Username"
      placeholder="Enter user account name"
      class="send-message-form--item"
    />

    <L-Input
      v-model.trim="form.password"
      :rules="[rules.required]"
      required
      type="password"
      ref="password"
      label="Password"
      placeholder="Enter password"
      class="send-message-form--item"
    />

    <div class="send-message-form__phones">
      <div
        v-for="(item, idx) in form.dst.num"
        :key="idx"
        class="send-message-form__group"
      >
        <L-Input
          v-model.trim="form.dst.num[idx]"
          :rules="[rules.required, rules.phoneNumber]"
          required
          type="tel"
          :ref="'num' + idx"
          label="Phone number"
          placeholder="Enter phone number"
          class="send-message-form__group--item"
        />
        <L-Button
          :disabled="form.dst.num.length === 1"
          icon
          color="red"
          size="xs"
          class="send-message-form__group--btn"
          @click="removePhoneNumber(idx)"
        >
          -
        </L-Button>
      </div>

      <L-Button
        rounded
        outline
        color="green"
        size="xs"
        class="send-message-form__phones--btn-add"
        @click="addPhoneNumber"
      >
        + add phone field
      </L-Button>
    </div>

    <L-Textarea
      v-model.trim="form.txt"
      :rules="[rules.required]"
      required
      ref="txt"
      label="Text message"
      placeholder="Enter text message"
      class="send-message-form--item"
    />

    <div
      class="send-message-form--server-message"
      :class="[serverMessageType, { active: serverMessage }]"
    >
      {{ serverMessage }}
    </div>

    <L-Button
      :loading="loading"
      class="send-message-form--submit"
      @click="onSubmit"
    >
      Send SMS
    </L-Button>
  </L-Card>
</template>

<script>
import LCard from '@/components/ui-elements/LCard.vue'
import LButton from '@/components/ui-elements/LButton.vue'
import LInput from '@/components/ui-elements/forms/LInput.vue'
import LTextarea from '@/components/ui-elements/forms/LTextarea.vue'
import { required, phoneNumber, isThisRefsValid } from '@/utils/fields-rules.js'

export default {
  name: 'SendMessageForm',
  components: { LCard, LButton, LInput, LTextarea },
  data() {
    return {
      loading: false,
      form: {
        user: '',
        password: '',
        dst: { num: [''] },
        txt: ''
      },
      rules: { required, phoneNumber },
      serverMessage: '',
      serverMessageType: '',
      serverMessageTypes: {
        error: 'error',
        success: 'success'
      }
    }
  },
  methods: {
    addPhoneNumber() {
      this.form.dst.num.push('')
    },
    removePhoneNumber(idx) {
      this.form.dst.num.splice(idx, 1)
    },
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          await this.$api.sms.send({ sms: this.form })
          this.serverMessage = 'You message send successfuly'
          this.serverMessageType = this.serverMessageTypes.success
        } catch (err) {
          this.serverMessage = err.errorMessage
          this.serverMessageType = this.serverMessageTypes.error
        } finally {
          this.loading = false
        }
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
.send-message-form {
  &__phones {
    margin-bottom: 25px;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    &--item {
      width: 90%;
    }

    &--btn {
      font-size: 20px;
    }
  }

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
</style>
