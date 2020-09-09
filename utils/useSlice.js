import { useReducer, useContext, useEffect, useRef } from 'react'
import RadioActive from './context'
import getSlice from './getSlice'
import mutate from './mutate'
import wrapify from './wrapify'

const inc = x => x + 1

const useSlice = (key) => {
  const [, forceUpdate] = useReducer(inc, 0)
  const { store } = useContext(RadioActive)
  const ref = useRef()

  useEffect(() => store.subscribe(updatedKeys => {
    if (updatedKeys.includes(key)) forceUpdate()
  }), [store, key])

  // if running the hook for the first time
  if (ref.current === undefined) {
    const chain = key.split('.')
    const slice = getSlice(store.state, chain)
    const onValueChange = (value) => mutate(store.state, chain, value, 'set')
    ref.current = typeof slice === 'object' ? slice : wrapify(slice, onValueChange)
  }

  return ref.current
}

export default useSlice
