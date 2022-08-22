import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BudgetDashboard from './components/BudgetDashboard'
import Home from './components/Home'
import InfoStatement from './components/InfoStatement'
import MatchStatement from './components/MatchStatement'
import Vacation from './components/Vacation'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

const screens = [
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'MatchStatement',
    component: MatchStatement,
  },
  {
    name: 'Vacation',
    component: Vacation,
  },
  {
    name: 'BudgetDashboard',
    component: BudgetDashboard,
  },
  {
    name: 'InfoStatement',
    component: InfoStatement,
  },
]

const Navigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {screens.map((screen) => (
          <Stack.Screen name={screen.name} component={screen.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
