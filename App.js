import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"
import Core from './Core'
import Restaurants from './comp/Restaurant'
import Auth from "./Auth"

const HomeNavigator = createStackNavigator({
  Home: Core,
  Restaurant: Restaurants
})

const MainNavigator = createSwitchNavigator({
  Auth: Auth,
  Home: HomeNavigator
})

export default createAppContainer(MainNavigator)