<template>
  <div>
    <v-tabs vertical>
      <v-tab>
        初中
      </v-tab>
      <v-tab>
        中学
      </v-tab>
      <v-tab>
        大学
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-subheader>科目</v-subheader>
            <v-btn v-for="(item, i) in items"
                   :key="i" max-width="60" style="font-size: 11px;margin-left: 10px;margin-top: 10px" max-height="25">{{item.text}}</v-btn>
          </v-card-text>
          <v-card-text>
            <v-subheader>考试</v-subheader>
            <v-btn v-for="(item, i) in items"
                   :key="i" max-width="60" style="font-size: 11px;margin-left: 10px;margin-top: 10px" max-height="25">{{item.text}}</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class ProjectType extends Vue {
  private name = 'ProjectType'
  private items = [
    {
      text: '语文'
    },
    {
      text: '数学'
    },
    {
      text: '英文'
    },
    {
      text: '历史'
    },
    {
      text: '物理'
    }
  ]
}
</script>

<style scoped>

</style>
