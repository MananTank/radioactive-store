import getRS from './getRS'
import { getOnGSChange } from './getOnChange'

const createState = (state) => {
  const store = {
    listeners: [],
    subscribe: (cb) => {
      store.listeners.push(cb)
      return () => store.listeners.splice(store.listeners.findIndex(l => l === cb), 1)
    }
  }

  store.state = getRS(state, getOnGSChange(store))
  window.radioactiveStore = store
  window.state = store.state
}

export default createState
