import getRS from './getRS'
import { getOnGSChange } from './getOnChange'

// when a component mounts, it subscribes to the store
// subscribing to store means, adding a listener function to array of listeners in the store
// when the state of store changes, all the listeners are called with info about what changed in the state called chains

// chains is an array of chain
// a chain is an array that denotes path to a particular slice of state that changed
// for example: if state.a.b[2] is changed chain is ['a', 'b', '2']

const createGS = (state) => {
  const store = {
    listeners: {},
    subscribe: (deps, listener) => {
      deps.forEach(dep => {
        if (!store.listeners[dep]) store.listeners[dep] = []
        store.listeners[dep].push(listener)
      })

      // return a function to unsubscribe from store, to remove the listener
      return () => {
        deps.forEach(dep => {
          const i = store.listeners[dep].findIndex(l => l === listener)
          store.listeners[dep].splice(i, 1)
        })
      }
    },

    // this listeners are to be called when *anything* in state changes
    onChangeListeners: [],
    onChange: fn => {
      store.onChangeListeners.push(fn)
      return () => {
        const i = store.onChangeListeners.findIndex(f => f === fn)
        store.onChangeListeners.split(i, 1)
      }
    }
  }

  store.state = getRS(state, getOnGSChange(store))
  window.GS = store.state
  window.radioactiveStore = store
}

export default createGS
