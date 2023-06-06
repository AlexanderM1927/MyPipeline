<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          My Pipeline
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="nav"
    >
      <q-list>
        <q-item-label
          header
          class="user"
        >
          {{user.name}}
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- <router-view /> -->
      <calendar v-if="this.view === 'calendar'"></calendar>
      <clients v-if="this.view === 'clients'"></clients>
      <client v-if="this.view === 'client'"></client>
      <proyect v-if="this.view === 'proyect'"></proyect>
      <phase v-if="this.view === 'phase'"></phase>
      <reports :user="this.user" v-if="this.view === 'reports'"></reports>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Calendar from 'components/Calendar.vue'
import Clients from 'components/Clients.vue'
import Client from 'components/Client.vue'
import Proyect from 'components/Proyect.vue'
import Phase from 'components/Phase.vue'
import Reports from 'components/Reports.vue'
import { functions } from 'src/functions.js'
import UserService from '../services/UserService'

const linksData = [
  {
    title: 'Calendario',
    icon: 'event',
    link: 'calendar'
  },
  {
    title: 'Clientes',
    icon: 'business',
    link: 'clients'
  },
  {
    title: 'Informes',
    icon: 'analytics',
    link: 'reports'
  },
  {
    title: 'Configuración',
    icon: 'account_circle',
    link: 'settings'
  },
  {
    title: 'Salir',
    icon: 'logout',
    link: 'logout'
  }
]

export default {
  name: 'MainLayout',
  mixins: [functions],
  components: { EssentialLink, Calendar, Clients, Client, Proyect, Phase, Reports },
  data () {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData,
      user: {}
    }
  },
  props: {
    view: { type: String, default: 'calendar' }
  },
  async created () {
    await this.getUser()
  },
  methods: {
    async getUser () {
      try {
        const u = await UserService.getUser({ token: localStorage.getItem('token') })
        if (u.status === 200) {
          this.user = u.data.user
        } else {
          this.goTo('logout')
        }
      } catch (error) {
        this.goTo('logout')
      }
    }
  }
}
</script>
