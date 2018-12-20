import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ZOMATO_API } from './constants';
import axios from 'axios';


export default class App extends React.Component {
  state = {
    categories: []
  }

  getCatFromZomato = () => {
    const url = 'https://developers.zomato.com/api/v2.1/categories'
    axios.get(url, { headers: { 'user-key': ZOMATO_API } }).then(
      (res) => {
        console.log('success', res.data.categories)
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
    return (
      <View style={{ flex: 1 }}>
        {/* {this.state.categories.map(
          (item, index) => <Text key={item.categories.id}>{item.categories.name}</Text>
        )} */}
        <FlatList
          data={this.state.categories}
          keyExtractor={(item, index) => item.categories.id.toString()}
          renderItem={({ item }) => <Text>{item.categories.name}</Text>}
        />
        <Button onPress={() => this.getCatFromZomato()} title='Bulao' />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
