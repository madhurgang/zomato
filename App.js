import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ZOMATO_API } from './constants';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Inner from './comp/Inner';
import Inner2 from './comp/Inner2';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

class App extends React.Component {
  state = {
    categories: []
  }

  static navigationOptions = {
    title: 'Home'
  }

  getCatFromZomato = () => {
    const url = 'https://developers.zomato.com/api/v2.1/categories'
    axios.get(url, { headers: { 'user-key': ZOMATO_API } }).then(
      (res) => {
        this.setState({
          categories: res.data.categories
        })
      }
    ).catch(
      (err) => {
        console.log('error', err)
      }
    )
  }

  render() {
    console.log('render called')
    return (
      <View>
        <FlatList
          data={this.state.categories}
          keyExtractor={(item, index) => item.categories.id.toString()}
          renderItem={({ item }) => <Text>{item.categories.name}</Text>}
        />
        <Button onPress={() => this.props.navigation.navigate('InnerUrl')} title='go to inner' />
        <Button onPress={() => this.props.navigation.navigate('NewInner')} title='go to inner2' />
      </View>
    )
  }

  componentDidMount = () => {
    this.getCatFromZomato()
    console.log('this.props.navigation:', this.props.navigation)
  }
}

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: App,
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