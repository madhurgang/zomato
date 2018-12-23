import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { ZOMATO_API, ZOMATO_BASE_URL } from './constants';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Inner from './comp/Inner';
import Inner2 from './comp/Inner2';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import HomeInner from './comp/HomeInner';
import Restaurants from './comp/Restaurant';
import { Button as Btn } from 'react-native-paper';

class App extends React.Component {
  state = {
    restaurants: [],
    searchText: '',
    start: 0,
    pageSize: 10,
    totalCount: 0
  }

  static navigationOptions = {
    title: 'Home'
  }

  handleNextPage = () => {
    this.setState({
      start: this.state.start + this.state.pageSize
    }, () => this.getRestFromZomato())
  }

  handlePrevPage = () => {
    this.setState({
      start: this.state.start - this.state.pageSize
    }, () => this.getRestFromZomato())
  }

  getRestFromZomato = () => {
    const url = `${ZOMATO_BASE_URL}/search?entity_id=14&entity_type=city&q=${this.state.searchText}&count=${this.state.pageSize}&start=${this.state.start}`
    axios.get(url, { headers: { 'user-key': ZOMATO_API } }).then(
      (res) => {
        console.log('response is:', res)
        this.setState({
          restaurants: res.data.restaurants,
          totalCount: res.data.results_found
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
    this.setState({
      start: 0
    }, () => this.getRestFromZomato())
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
        <Btn icon="chevron-left" color={'indigo'} mode="contained" dark={true}
          onPress={() => this.handlePrevPage()}
          disabled={this.state.start < 10}
        >Prev</Btn>
        <Btn icon="chevron-right" color={'indigo'} mode="contained" dark={true}
          disabled={this.state.start > (this.state.totalCount - this.state.pageSize)}
          onPress={() => this.handleNextPage()}>Next</Btn>
      </View>
    )
  }

  componentDidMount = () => {
    this.getRestFromZomato()
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