import { useCallback, useEffect } from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import Transaction from './Transaction'

import { useTheme, useThemeUpdate } from './Context'

const Plaid = () => {
  const { accessToken, dispatch } = useTheme()

  const getInfo = useCallback(async () => {
    const response = await fetch('http://localhost:8000/api/info', {
      method: 'POST',
    })
    if (!response.ok) {
      dispatch({ type: 'SET_STATE', state: { backend: false } })
      return { paymentInitiation: false }
    }
    const data = await response.json()
    const paymentInitiation = data.products.includes('payment_initiation')
    dispatch({ type: 'SET_STATE', state: { products: data.products } })

    return { paymentInitiation }
  }, [dispatch])

  const generateToken = useCallback(
    async (paymentInitiation) => {
      const path = paymentInitiation
        ? 'http://localhost:8000/api/create_link_token_for_payment'
        : 'http://localhost:8000/api/create_link_token'
      const response = await fetch(path, {
        method: 'POST',
      })
      if (!response.ok) {
        dispatch({ type: 'SET_STATE', state: { linkToken: null } })
        return
      }
      const data = await response.json()
      if (data) {
        if (data.error != null) {
          dispatch({
            type: 'SET_STATE',
            state: {
              linkToken: null,
              linkTokenError: data.error,
            },
          })
          return
        }
        dispatch({ type: 'SET_STATE', state: { linkToken: data.link_token } })
      }
      localStorage.setItem('link_token', data.link_token)
    },
    [dispatch],
  )

  useEffect(() => {
    const init = async () => {
      const { paymentInitiation } = await getInfo()
      if (window.location.href.includes('?oauth_state_id=')) {
        dispatch({
          type: 'SET_STATE',
          state: {
            linkToken: localStorage.getItem('link_token'),
          },
        })
        return
      }
      generateToken(paymentInitiation)
    }
    init()
  }, [dispatch, generateToken, getInfo])

  return (
    <View>
      <Header />
    </View>
  )
}

export default Plaid
