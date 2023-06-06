import Api from '../boot/axios'

export default {
  addTask (params) {
    return Api().post('task', params, { headers: { Authorization: params.token } })
  },
  getTasks (params) {
    return Api().get('tasks/' + params.fase_id, { headers: { Authorization: params.token } })
  },
  getTasksByUser (params) {
    return Api().get('tasks_user/' + params.usuario_id, { headers: { Authorization: params.token } })
  },
  getTask (params) {
    return Api().get('task/' + params.id, { headers: { Authorization: params.token } })
  },
  editTask (params) {
    return Api().post('modify_task', params, { headers: { Authorization: params.token } })
  }
}
