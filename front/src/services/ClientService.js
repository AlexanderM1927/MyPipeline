import Api from '../boot/axios'

export default {
  addClient (params) {
    return Api().post('client', params, { headers: { Authorization: params.token } })
  },
  getClients (params) {
    return Api().get('clients/' + params.usuario_id, { headers: { Authorization: params.token } })
  },
  getClient (params) {
    return Api().get('client/' + params.id, { headers: { Authorization: params.token } })
  },
  setClient (params) {
    return Api().post('modify_client', params, { headers: { Authorization: params.token } })
  },
  delClient (params) {
    return Api().post('delete_client/' + params.id, params, { headers: { Authorization: params.token } })
  }
}
