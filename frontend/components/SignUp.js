import { View, Text, TextInput, Button } from "react-native"
import { useState } from "react"

const SignUp = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const handleSubmit = () => {
        if (!userEmail) {
            alert("Please fill out your email")
            return
        }
        if (!userPassword) {
            alert("Please fill out your password")
            return
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        var user = new Object()
        user.email = userEmail
        user.password = userPassword

        fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers,
        })
          .then((res) => {
            console.log("Created the user")
            navigation.navigate("SignIn")
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return (
        <View>
            <Text>
                Email:
                <TextInput onChangeText={setUserEmail} value={userEmail} placeholder={'email'} />
            </Text>
            <Text>
                Password:
                <TextInput onChangeText={setUserPassword} value={userPassword} placeholder={'password'} />
            </Text>
            <Button onPress={handleSubmit}>
                <Text>Sign Up</Text>
            </Button>
            <Button onPress={navigation.navigate('SignIn')}>
                <Text>Already Have An Account</Text>
            </Button>
        </View>
    )
}

export default SignUp;