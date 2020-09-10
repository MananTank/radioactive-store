// run the given function after all the sync code is completed
// timer keeps track of whether the setTimeout is set or not
// timer is used to make sure that fn is only called once
// timer.set is used to check whether to call afterSync ot not

const afterSync = (fn, timer) => {
  timer.set = true
  setTimeout(() => {
    fn()
    timer.set = false
  }, 0)
}

export default afterSync
