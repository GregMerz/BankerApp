import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Statement = ({ statement }) => {
  return (
    <View style={styles.statement}>
      <Text>{statement.description}</Text>
      <Text>$ {statement.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statement: {
    borderWidth: 2,
  },
})

export default Statement
