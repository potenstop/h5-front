<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app style="padding: 0px">
      <v-btn-toggle
        light
        dense
        background-color="grey lighten-5"
        borderless
        style="width: 100%"
      >
        <v-btn :height="btnHeight" width="25%" light>
<!--          <v-icon color="blue darken-2">mdi-star-outline</v-icon>-->
          <v-icon color="blue darken-2">mdi-star</v-icon>
        </v-btn>

        <v-btn :height="btnHeight" width="25%">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-btn :height="btnHeight" width="25%">
          <v-icon>mdi-upload-multiple</v-icon>
        </v-btn>

        <v-btn :height="btnHeight" width="25%">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-footer>
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
  private localeCollect = NavigationLocale.COLLECT
  private localeMenu = NavigationLocale.MENU
  private localePost = NavigationLocale.POST
  private localeShare = NavigationLocale.SHARE
  private toggleMultiple: number[] = []
  private created () {
  }
}
</script>

<style scoped>

</style>
