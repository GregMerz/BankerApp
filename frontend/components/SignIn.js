import { View, Text, TextInput, Button } from 'react-native'
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
    <View>
      <Text>
        Email:
        <TextInput
          onChangeText={setUserEmail}
          value={userEmail}
          placeholder={'email'}
        />
      </Text>
      <Text>
        Password:
        <TextInput
          onChangeText={setUserPassword}
          value={userPassword}
          placeholder={'password'}
        />
      </Text>
      <Button onPress={handleSubmit} title="Log In" />
      <Button onPress={() => navigation.navigate('SignUp')} title="Sign Up" />
    </View>
  )
}

export default SignIn
