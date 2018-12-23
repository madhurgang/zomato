import React from 'react'
import { Image, Text, View, Button } from 'react-native'
import axios from 'axios'
import { ZOMATO_API } from '../constants';

export default class Restaurants extends React.Component {

  static navigationOptions = {
    title: 'My Restaurant'
  }

  state = {
    restaurant: null
  }

  getRestFromZomato = (id) => {
    const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`
    axios.get(url, { headers: { 'user-key': ZOMATO_API } }).then(
      (res) => {
        console.log('response is:', res.data)
        this.setState({
          restaurant: res.data
        })
      }
    ).catch(
      (err) => {
        console.log('error', err)
      }
    )
  }

  render() {
    if (this.state.restaurant !== null)
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>{this.state.restaurant.name}</Text>
          <Image style={{ width: 200, height: 200 }} source={{ uri: this.state.restaurant.thumb }} />
          <Button onPress={() => this.props.navigation.navigate('Home')} title='go to Home' />
        </View>
      )
    else
      return <Text>Loading.....</Text>
  }

  componentDidMount = () => {
    const id = this.props.navigation.state.params.id
    this.getRestFromZomato(id)
  }
}
