import { createContext, useReducer, useContext } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export const QuickstartProvider = ({ children }) => {
  const initialState = {
    linkSuccess: false,
    isItemAccess: true,
    linkToken: '', // Don't set to null or error message will show up briefly when site loads
    accessToken: null,
    itemId: null,
    isError: false,
    backend: true,
    products: ['transactions'],
    linkTokenError: {
      error_type: '',
      error_code: '',
      error_message: '',
    },
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_STATE':
        return { ...state, ...action.state }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}
