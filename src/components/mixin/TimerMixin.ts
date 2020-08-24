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
interface SimpleTimer {
  state: boolean;
  duration: number;
  notice?: Function;
}
const defaultName = 'default'
@Component
export default class TimerMixin extends Vue {
  public defaultTimer: any = null
  public simpleTimerByName = new Map<string, SimpleTimer>()

  private beforeCreate () {
    if (this.defaultTimer === null || this.defaultTimer === undefined) {
      this.defaultTimer = setInterval(() => {
        this.statistics()
      }, 1000)
    }
  }
  public startSimpleTime (name?: string | Function, notice?: Function) {
    if (name === undefined || name === null) {
      name = defaultName
    } else if (name instanceof Function) {
      notice = name
      name = defaultName
    }
    if (!this.simpleTimerByName.has(name)) {
      const json: SimpleTimer = {
        state: true,
        duration: 0
      }
      if (notice) {
        json.notice = notice
      } else {
        json.notice = null
      }
      this.simpleTimerByName.set(name, json)
    } else {
      this.simpleTimerByName.get(name).state = true
    }
    return true
  }
  public stopSimpleTime (name?: string): boolean {
    if (name === null || name === undefined) {
      name = defaultName
    }
    if (!this.simpleTimerByName.has(name)) {
      return false
    } else {
      this.simpleTimerByName.get(name).state = false
    }
  }
  public isSimpleStart (name?: string): boolean {
    if (name === null || name === undefined) {
      name = defaultName
    }
    if (!this.simpleTimerByName.has(name)) {
      return false
    } else {
      return this.simpleTimerByName.get(name).state
    }
  }
  public releaseDefaultTimer () {
    if (this.defaultTimer !== null) {
      clearInterval(this.defaultTimer)
      this.defaultTimer = null
    }
  }
  public destroyed () {
    this.releaseDefaultTimer()
  }
  public async statistics () {
    // const funcName = 'onTimer' + name.slice(0, 1).toUpperCase() + name.slice(1)
    this.simpleTimerByName.forEach((value, key) => {
      if (value.state) {
        value.duration++
        if (value.notice) {
          value.notice(value.duration)
        }
      }
    })
  }
}
