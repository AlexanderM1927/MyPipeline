<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <div class="row">
            <div class="login col-md-4 col-xs-10">
                <center>
                    <img :src="'logo.png'">
                </center>
                <q-form @submit="register">
                    <q-input color="grey-3" bg-color="white" label-color="orange" filled v-model="name" label="Nombre" required :rules="[val => !!val || 'Este campo es necesario']">
                        <template v-slot:append>
                        <q-icon name="account_circle" color="primary" />
                        </template>
                    </q-input>
                    <br>
                    <q-input type="email" color="grey-3" bg-color="white" label-color="orange" filled v-model="email" label="Correo" required :rules="[val => !!val || 'Este campo es necesario']">
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
                    <q-input color="grey-3" bg-color="white" label-color="orange" v-model="password2" filled :type="isPwd2 ? 'password' : 'text'" label="Repite tu clave" required :rules="[val => !!val || 'Este campo es necesario']">
                        <template v-slot:append>
                            <q-icon color="primary" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd2 = !isPwd2"/>
                        </template>
                    </q-input>
                    <br>
                    <q-btn color="primary" type="submit" class="full-width" label="Register"></q-btn>
                </q-form>
            </div>
        </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import UserService from '../services/UserService'
import { functions } from 'src/functions.js'

export default {
  name: 'RegisterLayout',
  mixins: [functions],
  data () {
    return {
      name: '',
      email: '',
      password: '',
      isPwd: true,
      password2: '',
      isPwd2: true
    }
  },
  methods: {
    async register () {
      if (this.password === this.password2) {
        try {
          const u = await UserService.register({ name: this.name, email: this.email, password: this.password })
          const user = u.data
          if (user.register === true) {
            this.alert('positive', 'Cuenta creada correctamente')
            this.goTo('login')
          } else {
            this.alert('negative', 'Error al registrarse')
          }
        } catch (error) {
          this.alert('negative', 'Error al registrarse')
        }
      } else {
        this.alert('negative', 'Las claves no coinciden')
      }
    }
  }
}
</script>
