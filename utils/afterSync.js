// run fn after all the sync code is completed
// call afterSync only if timer.set === false to make sure fn is called only once

const afterSync = (fn, timer) => {
  timer.set = true
  setTimeout(() => {
    fn()
    timer.set = false
  }, 0)
}

export default afterSync
