<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class BlankOverall extends Vue {
  private name = 'BlankOverall'
  private created () {
  }
}
</script>

<style scoped>

</style>
