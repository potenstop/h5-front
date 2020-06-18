<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="main-div">

      <!-- Provides the application the proper gutter -->
      <v-container class="main-div">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class BlankOverall extends Vue {
  private name = 'BlankOverall'
  private created () {
    // created
  }
}
</script>

<style scoped>

</style>
