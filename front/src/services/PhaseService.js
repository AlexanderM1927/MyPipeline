import Api from '../boot/axios'

export default {
  getPhases (params) {
    return Api().get('phases/' + params.proyecto_id, { headers: { Authorization: params.token } })
  },
  generatePhases (params) {
    return Api().post('phases', params, { headers: { Authorization: params.token } })
  }
}
