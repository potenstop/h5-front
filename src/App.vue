<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn small href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0c91dc1ced40a0b0&redirect_uri=http%3a%2f%2f192.168.4.176%3a8080%2f&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">跳转至微信</v-btn>
    </v-app-bar>

    <v-content>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  private theme: string = 'light';
  navigateTo (name: string) {
    this.$router.push(name)
  }
  private click () {
    console.log('11111111111')
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  }
}
</script>
