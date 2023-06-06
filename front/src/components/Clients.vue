<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10 container">
                <div class="text-h4">
                    Clientes
                    <q-btn color="primary" style="float: right;" icon="add" @click="agregar"></q-btn>
                </div>
                <q-separator inset />
                <q-table
                dense
                :columns="columns"
                :data="data"
                row-key="id"
                :rows-per-page-label="'Registros'"
                :filter="filter"
                >
                <q-tr slot="body" slot-scope="props" :props="props" style="height: 50px">
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="correo" :props="props">{{ props.row.correo }}</q-td>
                    <q-td key="action" :props="props">
                      <a class="text-blue" style="cursor: pointer; padding: 5px;" @click="goTo('client/' + props.row.id)"> <q-icon size="md" name="edit"/>
                        <q-tooltip :delay="1000" :offset="[0, 10]">editar</q-tooltip>
                      </a>
                      <a class="text-red" style="cursor: pointer; padding: 5px;" @click="del(props.row.id)"> <q-icon size="md" name="delete"/>
                        <q-tooltip :delay="1000" :offset="[0, 10]">eliminar</q-tooltip>
                      </a>
                    </q-td>
                </q-tr>
                <template v-slot:top-right>
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                </template>
                </q-table>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import AddClient from 'components/Dialogs/AddClient'
import ClientService from '../services/ClientService'
import { functions } from 'src/functions.js'

export default {
  name: 'clients',
  mixins: [functions],
  data () {
    return {
      filter: '',
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'center',
          field: row => row.id,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'correo',
          required: true,
          label: 'Correo contacto',
          align: 'left',
          field: row => row.correo,
          sortable: true
        },
        {
          name: 'action',
          required: true,
          label: 'Acciones',
          align: 'left',
          sortable: true
        }
      ],
      data: [
      ]
    }
  },
  props: ['user'],
  async created () {
    this.activateLoading('Cargando')
    await this.getClients()
    this.disableLoading()
  },
  methods: {
    async getClients () {
      const r = await ClientService.getClients({ usuario_id: localStorage.getItem('user'), token: localStorage.getItem('token') })
      this.data = r.data
    },
    agregar () {
      this.$q.dialog({
        component: AddClient,
        parent: this
      }).onOk(async (data) => {
        data.token = localStorage.getItem('token')
        data.usuario_id = localStorage.getItem('user')
        try {
          const r = await ClientService.addClient(data)
          if (r.status === 200) {
            this.goTo('client/' + r.data.client.id)
            this.alert('positive', 'Cliente agregado correctamente')
          } else {
            this.alert('negative', 'Problemas al agregar el cliento')
          }
        } catch (error) {
          this.alert('negative', 'Problemas al agregar el cliento')
        }
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    async del (id) {
      try {
        this.activateLoading('Cargando')
        const p = await ClientService.delClient({ id: id, token: localStorage.getItem('token') })
        if (p.status === 200) {
          this.getClients()
          this.alert('positive', 'Eliminado correctamente')
        }
      } catch (error) {
        this.alert('negative', 'Se presentó un error')
      }
      this.disableLoading()
    }
  }
}
</script>
