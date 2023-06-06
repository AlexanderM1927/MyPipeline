import Api from '../boot/axios'

export default {
  login (params) {
    return Api().post('login', params)
  },
  register (params) {
    return Api().post('register', params)
  },
  getUser (params) {
    return Api().get('user', { headers: { Authorization: params.token } })
  },
  hasPermiss (params) {
    return Api().get('permiss/' + params.type + '/' + params.id, { headers: { Authorization: params.token } })
  }
}
