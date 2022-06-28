import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import UnknownStatements from './home/UnknownStatements'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity
        style={styles.unknownStatements}
        onPress={() =>
          navigation.navigate('MatchStatement', {
            navigation: { navigation },
          })
        }
      >
        <UnknownStatements />
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
