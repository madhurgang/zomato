import React from 'react'
import { Text, View, Button } from 'react-native'

export default class HomeInner extends React.Component {
  render() {
    const restaurant = this.props.navigation.state.params.rest.restaurant
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{restaurant.name}</Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title='go to Home' />
      </View>
    )
  }
}
