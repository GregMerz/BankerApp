import React, { useEffect, useCallback } from 'react'

import { useTheme } from '../../Context'

import { usePlaidLink } from 'react-plaid-link'
import Button from 'plaid-threads/Button'

const Link = () => {
  const { linkToken, dispatch, extId } = useTheme()

  const onSuccess = useCallback(
    (public_token) => {
      // send public_token to server
      const setToken = async () => {
        const response = await fetch(
          `http://localhost:8080/plaid/set_access_token?public_token=${public_token}&id=${extId}`,
          {
            method: 'POST',
          },
        )
        if (!response.ok) {
          dispatch({
            type: 'SET_STATE',
            state: {
              itemId: `no item_id retrieved`,
              accessToken: `no access_token retrieved`,
              isItemAccess: false,
            },
          })
          return
        }
        const data = await response.json()
        dispatch({
          type: 'SET_STATE',
          state: {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
          },
        })
      }
      setToken()
      dispatch({ type: 'SET_STATE', state: { linkSuccess: true } })
      window.history.pushState('', '', '/')
    },
    [dispatch],
  )

  let isOauth = false
  const config = {
    token: linkToken,
    onSuccess,
    receivedRedirectUri: '',
  }

  if (window.location.href.includes('?oauth_state_id')) {
    config.receivedRedirectUri = window.location.href
    isOauth = true
  }

  const { open, ready } = usePlaidLink(config)

  useEffect(() => {
    if (isOauth && ready) {
      open()
    }
  }, [ready, open, isOauth])

  return (
    <Button type="button" small onClick={() => open()} disabled={!ready}>
      Launch Link
    </Button>
  )
}

Link.displayName = 'Link'

export default Link
