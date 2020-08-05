<template>
  <svg :class="svgClass" aria-hidden="true" :width="sizePx" :height="sizePx">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  private name = 'SvgIcon'
  @Prop({ default: '', required: true }) readonly iconClass!: string
  @Prop({ default: '' }) readonly className!: string
  @Prop({ default: 'default' }) readonly size!: 'xSmall' | 'small' | 'default' | 'medium' | 'large' | 'xLarge'
  private SIZE_MAP = {
    xSmall: '12px',
    small: '16px',
    default: '70px',
    medium: '28px',
    large: '36px',
    xLarge: '40px'
  }
  private sizePx: string = '24px'
  private created () {
    if (this.SIZE_MAP[this.size]) {
      this.sizePx = this.SIZE_MAP[this.size]
    }
  }
  private get iconName () {
    return `#icon-${this.iconClass}`
  }
  private get svgClass () {
    if (this.className) {
      return 'svg-icon ' + this.className
    } else {
      return 'svg-icon'
    }
  }
}
</script>

<style scoped>

.svg-icon{
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
