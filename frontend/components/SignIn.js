import { View, Text, TextInput, Button } from "react-native"
import { useState } from "react"

const SignIn = ({ navigation }) => {
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

        fetch('http://localhost:8080/users/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User is verified: " + JSON.stringify(data))
            navigation.navigate("Home", {data: data})
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return(
        <View>
            <Text>
                Email:
                <TextInput onChangeText={setUserEmail} value={userEmail} placeholder={'email'} />
            </Text>
            <Text>
                Password:
                <TextInput onChangeText={setUserPassword} value={userPassword} placeholder={'password'} />
            </Text>
            <Button
                onPress={handleSubmit}
                title="Log In"
            />
            <Button 
                onPress={() => navigation.navigate("SignUp")}
                title="Sign Up"
            />
        </View>
    )
}

export default SignIn;