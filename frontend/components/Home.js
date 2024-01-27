import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import UnknownStatements from './home/UnknownStatements'
import Plaid from './plaid/Plaid'
import { useTheme } from '../Context'
import { transformTransactionData } from '../dataUtilities'

const Home = ({ navigation }) => {
  const { extId } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [isUnverified, setUnverified] = useState(false)
  const [text, setText] = useState('Click here to look for unknown statements')

  const checkUnverifiedStatements = () => {
    // setIsLoading(true)
    // if (isUnverified) {
    //   setIsLoading(false)
      navigation.navigate('MatchStatement')
      return
    // }
    // loadUnverifiedStatements()
  }

  const loadUnverifiedStatements = async () => {
    const response = await fetch(
      `http://localhost:8080/plaid/transactions?id=${extId}`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()
    if (data.error != null) {
      console.log('There is an error getting the transactions')
      setIsLoading(false)
      return
    }

    const transformedData = transformTransactionData(data)

    for (let i = 0; i < transformedData.length; i++) {
      var transaction = new Object()

      transaction.description = transformedData[i].description
      transaction.price = transformedData[i].price
      transaction.verified = false

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      fetch(`http://localhost:8080/transactions/addUnverified?userId=${extId}`, {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: headers,
      })
        .then((res) => {
          console.log('Success')
        })
        .catch((err) => {
          console.log(err)
        })
    }

    setUnverified(true)
    setText('Click here to view unknown statements')
    setIsLoading(false)

    return
  }

  return (
    <View>
      <View style={styles.navbar}>
        <Text style={{fontSize: '1.625rem'}}>Banker</Text>
        <TouchableWithoutFeedback>
          <View style={styles.hamburgerIcon}>
            <View style={styles.hamburgerBars}></View>
            <View style={styles.hamburgerBars}></View>
            <View style={styles.hamburgerBars}></View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
    // <SafeAreaView style={styles.main}>
    //   <TouchableOpacity
    //     style={styles.unknownStatements}
    //     onPress={() => {
    //       if (!isLoading) checkUnverifiedStatements()
    //     }}
    //   >
    //     <UnknownStatements text={text} />
    //   </TouchableOpacity>
    //   <View style={styles.row}>
    //     <TouchableOpacity
    //       style={styles.vacation}
    //       onPress={() => navigation.navigate('Vacation')}
    //     >
    //       <Text>Plan a vacation</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.budgetDashboard}
    //       onPress={() => navigation.navigate('BudgetDashboard')}
    //     >
    //       <Text>Budgeting Dashboard</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.footer}>
    //     <Plaid />
    //   </View>
    // </SafeAreaView>
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
    fontSize: '6rem',
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
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2rem',
    alignItems: 'center',
  },
  hamburgerIcon: {
    position: 'relative',
    width: '25px',
    height: '18px',
    // flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  hamburgerBars: {
    borderRadius: '5rem',
    backgroundColor: 'black',
    height: '4px',
  }
})

export default Home
