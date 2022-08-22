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

const MatchStatement = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [unverifiedStatements, setUnverifiedStatements] = useState([])
  const [verifiedStatements, setVerifiedStatements] = useState([])

  useEffect(() => {
    if (isFocused) {
      showStatements()
    }
  }, [isFocused])

  const showStatements = () => {
    setUnverifiedStatements([])
    setVerifiedStatements([])

    fetch('http://localhost:8080/transactions/all', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].verified === false) {
              setUnverifiedStatements(oldArray => [...oldArray, data[i]])
            } else {
              setVerifiedStatements(oldArray => [...oldArray, data[i]])
            }
          }
        })
  }

  return (
    <View>
      <Button onPress={navigation.goBack()}/>
      <Button title={'Verified Statements'} />
      <View style={styles.statements}>
        {unverifiedStatements.map((statement) => (
          <TouchableOpacity
            key={statement.id}
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
