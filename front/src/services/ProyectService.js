import Api from '../boot/axios'

export default {
  addProyect (params) {
    return Api().post('proyect', params, { headers: { Authorization: params.token } })
  },
  getProyects (params) {
    return Api().get('proyects/' + params.cliente_id, { headers: { Authorization: params.token } })
  },
  getProyect (params) {
    return Api().get('proyect/' + params.id, { headers: { Authorization: params.token } })
  },
  getDaysProyect (params) {
    return Api().get('days_proyect/' + params.id, { headers: { Authorization: params.token } })
  },
  getLastTask (params) {
    return Api().get('last_task_proyect/' + params.id, { headers: { Authorization: params.token } })
  },
  getNextTask (params) {
    return Api().get('next_task_proyect/' + params.id, { headers: { Authorization: params.token } })
  },
  setProyect (params) {
    return Api().post('modify_proyect', params, { headers: { Authorization: params.token } })
  },
  delProyect (params) {
    return Api().post('delete_proyect/' + params.id, params, { headers: { Authorization: params.token } })
  }
}
