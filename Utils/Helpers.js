import { AsyncStorage } from 'react-native'

export const checkUserExist = (user, list) => {
  if (list.find(item => item.username === user.username && item.password === user.password)) {
    return true
  }
  else
    return false
}

export const saveDataToLocal = async (key, value) => {
  try {
    const serialisedData = JSON.stringify(value)
    await AsyncStorage.setItem(key, serialisedData);
    console.log('successfully saved on user key with value', value)
  } catch (error) {
    console.log('error while storing async data:', error)
  }
}

export const getDataFromLocal = async (key) => {
  let existing = null
  try {
    existing = await AsyncStorage.getItem(key)
    return JSON.parse(existing)
  } catch (error) {
    console.log('error while getting async data:', error)
  }
}

export const removeDataFromLocal = async (key) => {
  try {
    await AsyncStorage.removeItem(key, console.log('user removed successfully'))
  } catch (error) {
    console.log('error while getting async data:', error)
  }
}