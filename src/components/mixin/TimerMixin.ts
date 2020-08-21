import { Component, Vue } from 'vue-property-decorator'
/**
 *
 * 功能描述:
 *
 * @className ValidMixin
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/8/11 18:01
 */
@Component
export default class TimerMixin extends Vue {
  public _defaultTimer: any = null
  public _defaultCurrentS = 0
  public _simpleOperateRecordByName = {}
  public _simpleStateByName = {}
  public simpleTimeByName = {}

  private beforeCreate () {
    if (this._defaultTimer === null) {
      this._defaultTimer = setInterval(() => {
        this._defaultCurrentS++
        this.statistics()
      }, 1000)
    }
  }
  public startSimpleTime (name?: string) {
    if (name === null || name === undefined) {
      name = 'default'
    }
    if (!(name in this._simpleOperateRecordByName)) {
      this._simpleOperateRecordByName[name] = []
    }
    if (!(name in this.simpleTimeByName)) {
      this._simpleOperateRecordByName[name] = 0
    }
    this._simpleStateByName[name] = true
    const current = this._simpleOperateRecordByName[name]
    current.push({
      start: this._defaultCurrentS
    })
  }
  public stopSimpleTime (name?: string): boolean {
    if (name === null || name === undefined) {
      name = 'default'
    }
    if (!(name in this._simpleOperateRecordByName)) {
      return false
    }
    if (!(name in this.simpleTimeByName)) {
      return false
    }
    this._simpleStateByName[name] = false
    const current = this._simpleOperateRecordByName[name]
    current[current.length - 1]['stop'] = this._defaultCurrentS
  }
  public releaseDefaultTimer () {
    if (this._defaultTimer !== null) {
      clearInterval(this._defaultTimer)
      this._defaultTimer = null
    }
  }
  public destroyed () {
    this.releaseDefaultTimer()
  }
  public async statistics () {
    const nameList = Object.keys(this._simpleStateByName)
    nameList.forEach(name => {
      const state = this._simpleStateByName[name]
      if (state && name in this.simpleTimeByName) {
        this.simpleTimeByName[name] = this.simpleTimeByName[name] + 1
      }
    })
  }
}
