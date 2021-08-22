import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import tick from '../store/reducers/tick'

const Controller = () => {
  const dispatch = useDispatch()

  const ticking = useSelector(store => store.ticking)

  useEffect(() => {
    dispatch({ type: 'SET_TICKING', payload: true })
  }, [])

  useEffect(() => {
    if (ticking) dispatch(tick)
  }, [ticking])

  return null
}

export default Controller
