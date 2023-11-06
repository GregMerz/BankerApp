import { View, Text, TextInput, Button } from 'react-native'
import { useState } from 'react'

const SignUp = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

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

  const signUp = () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const user = {
      email: userEmail,
      password: userPassword,
    }

    fetch('http://localhost:8080/users/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Created the user: ' + JSON.stringify(data))
        navigation.navigate('SignIn')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    const isFormCompleted = checkValidFields()

    if (!isFormCompleted) return
    signUp()
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
      <Button onPress={handleSubmit} title="Confirm" />
      <Button
        onPress={() => navigation.navigate('SignIn')}
        title="Already have an account"
      />
    </View>
  )
}

export default SignUp
