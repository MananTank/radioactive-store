import React from 'react'
import RadioActive from './context'
import createStore from './createStore'

const Provider = ({ children, state }) => {
  const store = createStore(state)
  return React.createElement(RadioActive.Provider, { value: { store } }, children)
}

export default Provider
