import axios from 'axios'
import { AsyncStorage } from 'react-native'
export const login = user => {
  return axios
    .post("https://chingphaow-application.herokuapp.com/users/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      AsyncStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
