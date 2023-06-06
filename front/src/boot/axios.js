// import Vue from 'vue'
import axios from 'axios'
import { initializeFirebase } from '../push-notification'

initializeFirebase()

export default () => {
  return axios.create({
    baseURL: process.env.API_URL
  })
}
