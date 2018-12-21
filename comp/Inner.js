import React from 'react'
import { Text, View, Button } from 'react-native'

export default class Inner extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Inner Screen</Text>
        <Button onPress={() => this.props.navigation.goBack()} title='go to Home' />
      </View>
    )
  }
}
