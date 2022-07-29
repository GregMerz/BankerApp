import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UnknownStatements from './home/UnknownStatements'
import Plaid from './plaid/Plaid'
import { useTheme } from '../Context'
import { transformTransactionData } from '../dataUtilities'

const Home = ({ navigation }) => {
  const { dispatch } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [isUnverified, setUnverified] = useState(false)
  const [text, setText] = useState('Click here to look for unknown statements')

  const checkUnverifiedStatements = () => {
    setIsLoading(true)

    if (isUnverified) {
      navigation.navigate('MatchStatement', {
        navigation: { navigation },
      })

      return
    }

    loadUnverifiedStatements()
  }

  // Later, make api call to get this info
  const loadUnverifiedStatements = async () => {
    AsyncStorage.removeItem('unverified', (err) => {})

    const response = await fetch('http://localhost:8000/api/transactions', {
      method: 'GET',
    })

    // This part should be done in the backend
    const data = await response.json()
    if (data.error != null) {
      console.log('There is an error getting the transactions')
      setIsLoading(false)
      return
    }

    const transformedData = transformTransactionData(data)

    for (let i = 0; i < transformedData.length; i++) {
      AsyncStorage.getItem('unverified', (err, result) => {
        if (result === null) {
          AsyncStorage.setItem(
            'unverified',
            JSON.stringify([transformedData[i]]),
          )
        } else {
          let resultArr = JSON.parse(result)
          resultArr.push(transformedData[i])
          AsyncStorage.setItem('unverified', JSON.stringify(resultArr))
        }
      })
    }

    setUnverified(true)
    setText('Click here to view unknown statements')
    setIsLoading(false)

    return
  }

  useEffect(() => {
    // AsyncStorage.getItem('accessToken', (err, result) => {
    //   if (result != null) {
    //     dispatch({ type: 'SET_STATE', state: { accessToken: result } })
    //   }
    // })
  }, [])

  return (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity
        style={styles.unknownStatements}
        onPress={() => {
          if (!isLoading) checkUnverifiedStatements()
        }}
      >
        <UnknownStatements text={text} />
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.vacation}
          onPress={() => navigation.navigate('Vacation')}
        >
          <Text>Plan a vacation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.budgetDashboard}
          onPress={() => navigation.navigate('BudgetDashboard')}
        >
          <Text>Budgeting Dashboard</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Plaid />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  unknownStatements: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 6,
    flexDirection: 'row',
  },
  vacation: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetDashboard: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
