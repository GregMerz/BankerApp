import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useTheme } from '../Context'

const SignIn = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const { dispatch } = useTheme()

  const checkValidFields = () => {
    if (!userEmail) {
      alert('Please fill out your email')
      return false
    }
    if (!userPassword) {
      alert('Please fill out your password')
      return false
    }

    return true
  }

  const logIn = () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const user = {
      email: userEmail,
      password: userPassword,
    }

    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User is verified: ' + JSON.stringify(data))
        dispatch({
          type: 'SET_STATE',
          state: {
            extId: data.id,
            accessToken: data.accessToken,
          },
        })
        navigation.navigate('Home', { data: data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    const isFormCompleted = checkValidFields()

    if (!isFormCompleted) return
    logIn()
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={{fontSize:'2.5rem'}}>Banker</Text>
        </View>
        <View style={styles.interact}>
          <View style={{marginHorizontal: '1.75rem', paddingBlock: '0rem'}}>
            <View style={{paddingBottom:'1rem'}}>
              <Text>
                Email:
              </Text>
              <TextInput
                onChangeText={setUserEmail}
                value={userEmail}
                placeholder={'email'}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text>
                Password:
              </Text>
              <TextInput
                onChangeText={setUserPassword}
                value={userPassword}
                placeholder={'password'}
                style={styles.textInput}
              />
            </View>
          </View>
          <TouchableOpacity 
            onPress={handleSubmit} 
            style={styles.button}
          >
            <Text>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')} 
            title="Sign Up" 
            style={styles.button}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    top: '12.5%',
    bottom: '12.5%',
    left: '15%',
    right: '15%',
  },
  titleContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: ".5rem",
    padding: ".25rem",
  },
  button: {
    marginBlock: '0rem',
    textAlign: 'center',
    borderColor: 'black',
    borderRadius: '.375rem',
    borderWidth: 1,
    padding: '.5rem',
    marginHorizontal: '1.75rem',
  },
  interact: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBlock: '4rem',
  },
})

export default SignIn
