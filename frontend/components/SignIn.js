import { View, Text } from "react-native"

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
    }

    return(
        <View>
            <Text>Hello this is Greg</Text>
        </View>
    )
}

export default SignIn;