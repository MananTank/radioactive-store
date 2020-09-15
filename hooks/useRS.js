import { useReducer, useRef } from 'react'
import { checkInitialState } from '../utils/validity'
import { getOnLSChange } from '../utils/getOnChange'
import getRS from '../utils/getRS'

const useRS = arg => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const ref = useRef()

  // when running this hook for the first time
  if (!ref.current) {
    const initialState = typeof arg === 'function' ? arg() : arg
    checkInitialState(initialState)
    const onChange = getOnLSChange(ref, forceUpdate)
    ref.current = getRS(initialState, onChange)
  }

  return ref.current
}

export default useRS
