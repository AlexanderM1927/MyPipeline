<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <div class="row">
            <div class="login col-md-4 col-xs-10">
                <center>
                    <img :src="'logo.png'">
                </center>
                <q-form @submit="login">
                    <q-input color="grey-3" bg-color="white" label-color="orange" filled v-model="email" label="Correo" required :rules="[val => !!val || 'Este campo es necesario']">
                        <template v-slot:append>
                        <q-icon name="mail" color="primary" />
                        </template>
                    </q-input>
                    <br>
                    <q-input color="grey-3" bg-color="white" label-color="orange" v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Clave" required :rules="[val => !!val || 'Este campo es necesario']">
                        <template v-slot:append>
                            <q-icon color="primary" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"/>
                        </template>
                    </q-input>
                    <br>
                    <q-btn color="primary" type="submit" class="full-width" label="Login"></q-btn>
                </q-form>
                <br>
                <q-btn color="green" type="submit" @click="goTo('register')" class="full-width" label="Register"></q-btn>
            </div>
        </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import UserService from '../services/UserService'
import { functions } from 'src/functions.js'

export default {
  name: 'LoginLayout',
  mixins: [functions],
  data () {
    return {
      email: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    async login () {
      try {
        const u = await UserService.login({ email: this.email, password: this.password })
        const user = u.data
        if (u.status === 200) {
          localStorage.setItem('token', this.getToken(user))
          localStorage.setItem('user', user.user.id)
          this.goTo('calendar')
        } else {
          this.alert('negative', 'Credenciales invalidas')
        }
      } catch (error) {
        this.alert('negative', 'Credenciales invalidas')
      }
    }
  }
}
</script>
