import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Statement from './Statement'
import { mockData } from './data/MockData'

const MatchStatement = ({ navigation }) => {
  const [unverifiedStatements, setUnverifiedStatements] = useState([])
  const [verifiedStatements, setVerifiedStatements] = useState([])

  // Later, make api call to get this info
  const loadUnverifiedStatements = () => {
    AsyncStorage.clear((err) => {})

    for (let i = 0; i < mockData.length; i++) {
      // AsyncStorage.setItem(i, JSON.stringify(mockData[i]))
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
  }

  const showUnverifiedStatements = () => {
    setUnverifiedStatements([])

    AsyncStorage.getAllKeys((err, keys) => {
      console.log(keys)

      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          if (stores[i][0] === 'unverified')
            setUnverifiedStatements(JSON.parse(store[i][1]))
        })
      })
    })
  }

  const showVerifiedStatements = () => {
    setVerifiedStatements([])

    AsyncStorage.getAllKeys((err, keys) => {
      console.log(keys)

      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          if (stores[i][0] === 'verified')
            setVerifiedStatements(JSON.parse(store[i][1]))
        })
      })
    })
  }

  return (
    <View>
      {/* <Statement statement={} /> */}
      <Button
        title={'Load Unverified Statements'}
        onPress={loadUnverifiedStatements}
      />
      <Button
        title={'Show Unverified Statements'}
        onPress={showUnverifiedStatements}
      />
      <View style={styles.statements}>
        {unverifiedStatements.map((statement) => (
          <TouchableOpacity
            key={statement.key}
            onPress={() => {
              navigation.navigate('InfoStatement', { statement: { statement } })
            }}
          >
            <Statement statement={statement} />
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title={'Show Verified Statements'}
        onPress={showVerifiedStatements}
      />
      <View style={styles.statements}>
        {verifiedStatements.map((statement) => (
          <Statement key={statement.key} statement={statement} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statements: {
    backgroundColor: 'red',
  },
})

export default MatchStatement
