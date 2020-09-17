import getRS from './getRS'
import { getOnGSChange } from './getOnChange'

const createState = (state) => {
  const store = {
    listeners: {},
    subscribe: (deps, listener) => {
      deps.forEach(dep => {
        if (!store.listeners[dep]) store.listeners[dep] = []
        store.listeners[dep].push(listener)
      })

      // unsubscribe
      return () => {
        deps.forEach(dep => {
          const i = store.listeners[dep].findIndex(l => l === listener)
          store.listeners[dep].splice(i, 1)
        })
      }
    }

  }

  store.state = getRS(state, getOnGSChange(store))
  window.radioactiveStore = store
  window.state = store.state
}

export default createState
