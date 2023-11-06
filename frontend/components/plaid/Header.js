import React from 'react'
import { View, Text } from 'react-native'

import { useTheme } from '../../Context'

import Link from './Link'

const Header = () => {
  const {
    itemId,
    accessToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
  } = useTheme()

  return (
    <View>
      {accessToken === null ? (
        <View>
          {!linkSuccess ? (
            <View>
              <Text>You need to integrate with Plaid</Text>
              {!backend ? (
                <Text>The backend is not working</Text>
              ) : linkToken == null && backend ? (
                <View>
                  <Text>Unable to fetch link_token</Text>
                </View>
              ) : linkToken === '' ? (
                <View>
                  <Text>Loading...</Text>
                </View>
              ) : (
                <View>
                  <Link />
                </View>
              )}
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <Text>You have gotten access, good job!</Text>
      )}
    </View>
  )
}

export default Header
