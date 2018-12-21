import React from 'react'
import { Text, View, Button } from 'react-native'

export default class Inner2 extends React.Component {

  static navigationOptions = {
    title: 'Home2'
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Inner Screen 2</Text>
        <Button onPress={() => this.props.navigation.goBack()} title='go to Home' />
        <Button onPress={() => this.props.navigation.navigate('InnerUrl')} title='go to Inner' />
      </View>
    )
  }
}
