import getRS from './getRS'
import { getOnGSChange } from './getOnChange'

// when a component mounts, it subscribes to the store
// subscribing to store means, adding a listener function to array of listeners in the store
// when the state of store changes, all the listeners are called with info about what changed in the state called chains

// chains is an array of chain
// a chain is an array that denotes path to a particular slice of state that changed
// for example: if state.a.b[2] is changed chain is ['a', 'b', '2']

const globalState = (state) => {
  const store = {
    listeners: [],
    subscribe: listener => {
      store.listeners.push(listener)
      const unsubscribe = () => {
        const i = store.listeners.findIndex(l => l === listener)
        store.listeners.splice(i, 1)
      }
      return unsubscribe
    }
  }

  store.state = getRS(state, getOnGSChange(store))
  window.radioactiveStore = store
}

export default globalState
