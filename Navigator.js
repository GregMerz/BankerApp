import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import BudgetDashboard from './components/BudgetDashboard'
import Home from './components/Home'
import InfoStatement from './components/InfoStatement'
import MatchStatement from './components/MatchStatement'
import Vacation from './components/Vacation'

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  MatchStatement: {
    screen: MatchStatement,
  },
  Vacation: {
    screen: Vacation,
  },
  BudgetDashboard: {
    screen: BudgetDashboard,
  },
  InfoStatement: {
    screen: InfoStatement,
  },
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)
