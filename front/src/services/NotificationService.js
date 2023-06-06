// Dependencias
import Api from '../boot/axios'
// methods
export default {
  saveToken (token) {
    return Api().post('user/push-token', { id: localStorage.getItem('user'), token: token })
  },
  dropToken (params) {
    return Api().post('user/drop-token', { id: localStorage.getItem('user') }, { headers: { Authorization: params.token } })
  }
}
