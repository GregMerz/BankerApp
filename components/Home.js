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
import { mockData } from './data/MockData'

const Home = ({ navigation }) => {
  const [isUnverified, setUnverified] = useState(false)
  const [text, setText] = useState('Click here to look for unknown statements')

  const checkUnverifiedStatements = () => {
    if (isUnverified) {
      navigation.navigate('MatchStatement', {
        navigation: { navigation },
      })
    }

    if (loadUnverifiedStatements) {
      setUnverified(true)
      setText('Click here to view unknown statements')
    }
  }

  // Later, make api call to get this info
  const loadUnverifiedStatements = () => {
    AsyncStorage.clear((err) => {})

    for (let i = 0; i < mockData.length; i++) {
      AsyncStorage.getItem('unverified', (err, result) => {
        if (result === null) {
          AsyncStorage.setItem('unverified', JSON.stringify([mockData[i]]))
        } else {
          let resultArr = JSON.parse(result)
          resultArr.push(mockData[i])

          AsyncStorage.setItem('unverified', JSON.stringify(resultArr))
        }
      })
    }

    return true
  }

  return (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity
        style={styles.unknownStatements}
        onPress={checkUnverifiedStatements}
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
        <Text>Footer</Text>
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
