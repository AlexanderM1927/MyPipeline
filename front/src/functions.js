import { QSpinnerGears, QSpinnerAudio } from 'quasar'
import UserService from 'src/services/UserService'

export const functions = {
  data () {
    return {
    }
  },
  methods: {
    async getPermiss (type, id) {
      const r = await UserService.hasPermiss({ type: type, id: id, token: localStorage.getItem('token') })
      return r.data.permiss
    },
    alert (type, message) {
      this.$q.notify({
        type: type,
        message: message
      })
    },
    goTo (location) {
      this.$router.push('/' + location).catch(err => {
        if (err._name === 'NavigationDuplicated') {
          // console.log('it is in page')
        }
      })
    },
    logout () {
      this.$session.destroy()
      location.href = '/login'
    },
    getToken (user) {
      return user.token_type + ' ' + user.token
    },
    activateLoading (message, spinner = 0) {
      var show = {
        message: message
      }

      if (spinner === 1) {
        show.spinner = QSpinnerGears
      } else if (spinner === 2) {
        show.spinner = QSpinnerAudio
      }
      this.$q.loading.show(show)
    },
    disableLoading () {
      this.$q.loading.hide()
    }
  }
}
