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
function unix2cst (time) {
  return (new Date(time)).toLocaleString('zh', {hour12: false})
}
function cst2unix (time) {
  return (new Date(time)).getTime()
}
function normalizeTime (time) {
  return time.split('T')[0]
}
export {
  throttle,
  debounce,
  normalizeTime,
  unix2cst,
  cst2unix
}
