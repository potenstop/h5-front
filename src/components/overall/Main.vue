<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-bottom-navigation
      :value="activeBtn"
      color="teal"
      grow
      :height="btnHeight"
    >
      <v-btn :height="btnHeight">
        <span>{{$t(localeHome)}}</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn :height="btnHeight">
        <span>{{$t(localeType)}}</span>
        <v-icon>mdi-shape-outline</v-icon>
      </v-btn>

      <v-btn :height="btnHeight">
        <span>{{$t(localeMy)}}</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Navigation } from '@/locale/Navigation'
@Component
export default class Main extends Vue {
  private activeBtn = 0
  private btnHeight = 46
  private localeHome = Navigation.HOME
  private localeType = Navigation.TYPE
  private localeMy = Navigation.MY
  private created () {
  }
}
</script>

<style scoped>

</style>
