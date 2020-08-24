<template>
  <modal name="reset-answer-modal"
         width="70%"
         height="auto"
         transfer="nice-modal-fade"
         :clickToClose="false"
         @before-open="beforeOpen"
  >
    <v-card
      flat
      class="main-div">
      <v-card-title>
        <v-col class="text-center">
          <v-icon color="blue lighten-1" x-large>mdi-twitter</v-icon>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-col class="text-center text-h6">休息中...</v-col>
        <v-col class="text-center text-body2">共{{totalTopic}}道题，还有{{totalTopic - answerTopic}}道题未作答</v-col>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="text-center blue--text text--lighten-1 ma-0" text block @click="clickContinueAnswer">继续作答</v-btn>
      </v-card-actions>
    </v-card>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class ResetAnswerModal extends Vue {
  private name = 'ResetAnswerModal'
  private totalTopic: number = 0
  private answerTopic: number = 0
  private beforeOpen (event) {
    this.totalTopic = event.params.totalTopic
    this.answerTopic = event.params.answerTopic
  }
  private clickContinueAnswer () {
    this.$modal.hide('reset-answer-modal')
    this.$emit('on-cancel-reset')
  }
}
</script>

<style scoped>

</style>
