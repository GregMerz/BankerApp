import { useReducer } from 'react'

import Context from './Context'

const { Provider } = Context

const QuickstartProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_STATE':
        return { ...state, ...action.state }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return <Provider value={{ ...state, dispatch }}>{children}</Provider>
}

export default QuickstartProvider
