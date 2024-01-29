import { View, Text } from 'react-native'
import styled from 'styled-components/native';
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
    <Container>
      <Card>
        <TitleContainer>
          <Text style={{fontSize:'2.5rem'}}>Banker</Text>
        </TitleContainer>
        <Interact>
          <View style={{marginHorizontal: '1.75rem', paddingBlock: '0rem'}}>
            <View style={{paddingBottom:'1rem'}}>
              <Text>
                Email:
              </Text>
              <StyledTextInput
                onChangeText={setUserEmail}
                value={userEmail}
                placeholder={'email'}
              />
            </View>
            <View>
              <Text>
                Password:
              </Text>
              <StyledTextInput
                onChangeText={setUserPassword}
                value={userPassword}
                placeholder={'password'}
              />
            </View>
          </View>
          <StyledButton 
            onPress={handleSubmit}
          >
            <Text>Log In</Text>
          </StyledButton>
          <StyledButton 
            onPress={() => navigation.navigate('SignUp')} 
            title="Sign Up"
          >
            <Text>Sign Up</Text>
          </StyledButton>
        </Interact>
      </Card>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`;

const Card = styled.View`
  position: absolute;
  top: 12.5%;
  bottom: 12.5%;
  left: 15%;
  right: 15%;
`;

const TitleContainer = styled.View`
  flex: 1;
  text-align: center;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  border-color: black;
  border-width: 1;
  border-radius: .5rem;
  padding: .25rem;
`;

const StyledButton = styled.TouchableOpacity`
  margin-block: 0rem;
  text-align: center;
  border-color: black;
  border-radius: .375rem;
  border-width: 1;
  padding: .5rem;
  margin-inline: 1.75rem;
`;

const Interact = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-block: 4rem;
`;

export default SignIn
