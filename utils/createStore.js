import getRS from './getRS'
import getOnChange from './getOnChange'

const createStore = (state) => {
  const store = {
    state: undefined,
    listeners: [],
    subscribe: (listener) => {
      store.listeners.push(listener)
      return () => {
        store.listeners = store.listeners.filter((l) => !listener)
      }
    }
  }

  const notify = (chain) => {
    store.listeners.forEach((l) => l(chain))
  }

  const onChange = getOnChange(store, notify)
  store.state = getRS(state, onChange)
  return store
}

export default createStore
