import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import styled from 'styled-components/native';
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
      <Navbar>
        <Text style={{fontSize: '1.625rem'}}>Banker</Text>
        <TouchableWithoutFeedback>
          <HamburgerIcon>
            <HamburgerBars></HamburgerBars>
            <HamburgerBars></HamburgerBars>
            <HamburgerBars></HamburgerBars>
          </HamburgerIcon>
        </TouchableWithoutFeedback>
      </Navbar>

      <GridContainer>
        <StatementContainer>
          <Text>Hello</Text>
        </StatementContainer>
      </GridContainer>
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

const Navbar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;
  align-items: center;
`;

const HamburgerIcon = styled.View`
  position: relative;
  width: 25px;
  height: 18px;
  // flexDirection: column;
  justify-content: space-between;
  background-color: white;
`;

const HamburgerBars = styled.View`
  border-radius: 5rem;
  background-color: black;
  height: 4px;
`;

const GridContainer = styled.View`
  background: red;
  flex: 2;
  margin-inline: auto;
  width: 400px;
  height: 100%;
`;

const StatementContainer = styled.View`
  background-color: blue;
  flex: 2;
`;

export default Home
