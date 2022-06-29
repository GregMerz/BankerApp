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
import { useIsFocused } from '@react-navigation/native'
import Statement from './Statement'
import { mockData } from './data/MockData'

const MatchStatement = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [unverifiedStatements, setUnverifiedStatements] = useState([])
  const [verifiedStatements, setVerifiedStatements] = useState([])

  useEffect(() => {
    console.log('called')
    if (isFocused) {
      showStatements()
    }
  }, [isFocused])

  const showStatements = () => {
    setUnverifiedStatements([])
    setVerifiedStatements([])

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          if (stores[i][0] === 'unverified')
            setUnverifiedStatements(JSON.parse(store[i][1]))
          else if (stores[i][0] === 'verified')
            setVerifiedStatements(JSON.parse(store[i][1]))
        })
      })
    })
  }

  return (
    <View>
      <Button title={'Verified Statements'} />
      <View style={styles.statements}>
        {unverifiedStatements.map((statement) => (
          <TouchableOpacity
            key={statement.key}
            onPress={() => {
              navigation.navigate('InfoStatement', { info: { statement } })
            }}
          >
            <Statement statement={statement} />
          </TouchableOpacity>
        ))}
      </View>
      <Button title={'Verified Statements'} />
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
