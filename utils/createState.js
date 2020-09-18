import getRS from './getRS'
import { getOnGSChange } from './getOnChange'

const createState = (state) => {
  const store = {
    listeners: [],
    subscribe: (cb) => {
      const { listeners } = store
      listeners.push(cb)
      const unsubscribe = () => listeners.splice(listeners.findIndex(l => l === cb), 1)
      return unsubscribe
    }
  }

  store.state = getRS(state, getOnGSChange(store))
  window.radioactiveStore = store
  window.state = store.state
}

export default createState
