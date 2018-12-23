import React from 'react'
import { View } from 'react-native'
import { TextInput, Button, Headline, Snackbar } from 'react-native-paper';
import axios from 'axios'
import { checkUserExist } from './Utils/Helpers';

export default class Auth extends React.Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMsg: 'Please enter the values'
  }

  handleChangeUserName = (username) => {
    this.setState({ username })
  }

  handleChangePassword = (password) => {
    this.setState({ password })
  }

  handleLogin = async () => {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      const currentUser = {
        name: this.state.username,
        password: this.state.password
      }

      axios.get('http://localhost:3000/users')
        .then(users => {
          const status = checkUserExist(currentUser, users.data)
          console.log('status', status)
          if (status)
            this.props.navigation.navigate('Home')
          else
            alert('invalid login information')
        })
        .catch(err => console.log('error', err))

    } else {
      if (this.state.username.length < 1)
        this.setState({
          error: true,
          errorMsg: 'please enter username.'
        })
      if (this.state.password.length < 1)
        this.setState({
          error: true,
          errorMsg: 'please enter password.'
        })
      if (this.state.username.length < 1 && this.state.password.length < 1)
        this.setState({
          error: true,
          errorMsg: 'please enter password and username.'
        })
    }
    // api call
  }

  render() {
    return (
      <View>
        <Headline style={{ marginTop: 40, marginBottom: 30 }}>Pehle login kar!</Headline>
        <TextInput placeholder='username daalo!'
          label='User Name'
          value={this.state.username}
          onChangeText={(v) => this.handleChangeUserName(v)}
        />
        <TextInput placeholder='Password daalo!'
          label='Password'
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(v) => this.handleChangePassword(v)}
        />
        <Button onPress={() => this.handleLogin()}>Login</Button>
        <Snackbar
          visible={this.state.error}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Ji Saab',
            onPress: () => {
              this.setState({
                error: false
              })
            },
          }}
        >
          {this.state.errorMsg}
        </Snackbar>
      </View>
    )
  }
}