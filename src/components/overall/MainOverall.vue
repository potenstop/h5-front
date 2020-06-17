<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
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
import { NavigationLocale } from '@/locale/NavigationLocale'
@Component
export default class MainOverall extends Vue {
  private name = 'MainOverall'
  private activeBtn = 0
  private btnHeight = 46
  private localeHome = NavigationLocale.HOME
  private localeType = NavigationLocale.TYPE
  private localeMy = NavigationLocale.MY
  private created () {
  }
}
</script>

<style scoped>

</style>
