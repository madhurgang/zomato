import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { ZOMATO_API } from './constants';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Inner from './comp/Inner';
import Inner2 from './comp/Inner2';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import HomeInner from './comp/HomeInner';
import Restaurants from './comp/Restaurant';

class App extends React.Component {
  state = {
    restaurants: [],
    searchText: ''
  }

  static navigationOptions = {
    title: 'Home'
  }

  getCatFromZomato = () => {
    const entity_id = 14
    const query = this.state.searchText
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=14&entity_type=city&q=${this.state.searchText}&count=10`
    axios.get(url, { headers: { 'user-key': ZOMATO_API } }).then(
      (res) => {
        console.log('response is:', res.data.restaurants)
        this.setState({
          restaurants: res.data.restaurants
        })
      }
    ).catch(
      (err) => {
        console.log('error', err)
      }
    )
  }

  handleChangeSearch = (text) => {
    this.setState({
      searchText: text
    })
  }

  handleSubmit = () => {
    this.getCatFromZomato()
  }

  render() {
    console.log('render called')
    return (
      <View>
        <TextInput
          onChangeText={(v) => this.handleChangeSearch(v)}
          value={this.state.searchText}
          onSubmitEditing={() => this.handleSubmit()}
          placeholder='Search restaurant' />
        <FlatList
          data={this.state.restaurants}
          keyExtractor={(item, index) => item.restaurant.id.toString()}
          renderItem={({ item }) => <Button title={item.restaurant.name}
            onPress={() => this.props.navigation.navigate('Restaurant', { 'id': item.restaurant.id })} />}
        />
      </View>
    )
  }
}

const HomeNavigator = createStackNavigator({
  Home: App,
  Restaurant: Restaurants
})

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: HomeNavigator,
    InnerUrl: Inner,
    NewInner: Inner2,
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  });


export default createAppContainer(AppNavigator);