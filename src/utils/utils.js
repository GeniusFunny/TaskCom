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
  let date
  try {
    date = (new Date((new Date(time)).getTime() + 8 * 3600 * 1000)).toJSON().replace(/T/, ' ').split('.')[0].slice(0, -3)
  } catch (e) {
    date = (new Date((new Date(time.split('.')[0])).getTime() + 8 * 3600 * 1000)).toJSON().replace(/T/, ' ').split('.')[0].slice(0, -3)
  }
  return date
}
function cst2unix (time) {
  console.log(time)
  console.log(new Date(time))
  console.log((new Date(time)).getTime())
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
