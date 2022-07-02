import { useState } from 'react'

import { View, Text, Button } from 'react-native'

const Transaction = () => {
  const [loading, isLoading] = useState(false)
  const [transactions, setTransactions] = useState([])

  const getData = async () => {
    isLoading(true)
    const response = await fetch('http://localhost:8000/api/transactions', {
      method: 'GET',
    })
    const data = await response.json()
    if (data.error != null) {
      setError(data.error)
      setIsLoading(false)
      return
    }
    // setTransformedData(props.transformData(data)) // transform data into proper format for each individual product
    // if (data.pdf != null) {
    //   setPdf(data.pdf)
    // }

    setTransactions(data.latest_transactions)
    isLoading(false)
  }

  return (
    <View>
      <Button
        title={loading ? 'Loading...' : 'Send Request'}
        onPress={getData}
      />
      {transactions.map((transaction) => (
        <Text>Transaction name: {transaction.name}</Text>
      ))}
    </View>
  )
}

export default Transaction
