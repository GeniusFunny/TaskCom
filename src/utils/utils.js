/*  函数节流  */
function throttle (fn, delay) {
  let prev = Date.now()
  return function () {
    let now = Date.now()
    let args = arguments
    if (now - prev >= delay) {
      fn.apply(this, args)
      prev = Date.now()
    }
  }
}

/*  函数防抖  */
function debounce (fn, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
function unix2utc (time) {
  let date = new Date(time)
  return date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()
}
function utc2unix (time) {
  let date = new Date(time)
  return date.getTime()
}
function normalizeTime (time) {
  return time.split('T')[0]
}
export {
  throttle,
  debounce,
  normalizeTime,
  unix2utc,
  utc2unix
}
