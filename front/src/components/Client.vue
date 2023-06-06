<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10 container">
              <q-form @submit="onSubmit">
                <div class="text-h6 title" @click="infoClient = !infoClient">Información del cliente: {{client.name}}</div>
                <div v-show="infoClient">
                  <q-input filled color="primary" label="Nombre" v-model="client.name">
                      <template v-slot:prepend>
                          <q-icon name="note_add" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" label="Direccion" v-model="client.direccion">
                      <template v-slot:prepend>
                          <q-icon name="place" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" label="Ciudad" v-model="client.ciudad">
                      <template v-slot:prepend>
                          <q-icon name="place" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" label="Sector" v-model="client.sector">
                      <template v-slot:prepend>
                          <q-icon name="analytics" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" label="Numero ventas" v-model="client.numeroventas">
                      <template v-slot:prepend>
                          <q-icon name="analytics" />
                      </template>
                  </q-input>
                  <div class="text-h6">
                      Información de contacto
                      <q-icon name="contacts" />
                  </div>
                  <q-input filled color="primary" label="Nombre" v-model="client.contacto">
                      <template v-slot:prepend>
                          <q-icon name="person" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" label="Cargo" v-model="client.cargo">
                      <template v-slot:prepend>
                          <q-icon name="folder_shared" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" label="Celular" v-model="client.celular">
                      <template v-slot:prepend>
                          <q-icon name="contact_phone" />
                      </template>
                  </q-input>
                  <q-input filled color="primary" type="email" label="Correo" v-model="client.correo">
                      <template v-slot:prepend>
                          <q-icon name="contact_mail" />
                      </template>
                  </q-input>
                </div>
                <q-separator inset />
                <br>
                <center>
                    <q-btn label="Guardar" type="submit" color="primary"></q-btn><q-btn color="black" label="Crear proyecto" @click="agregar"></q-btn>
                </center>
              </q-form>
              <q-separator inset />
              <q-table
              :title="'Proyectos'"
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
                  <q-td key="descripcion" :props="props">{{ props.row.descripcion }}</q-td>
                  <q-td key="action" :props="props">
                    <a class="text-blue" style="cursor: pointer; padding: 5px;" @click="goTo('proyect/' + props.row.id)"> <q-icon size="md" name="edit"/>
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
import AddProyect from 'components/Dialogs/AddProyect'
import ProyectService from '../services/ProyectService'
import ClientService from '../services/ClientService'
import { functions } from 'src/functions.js'

export default {
  name: 'proyects',
  mixins: [functions],
  data () {
    return {
      filter: '',
      client: {},
      infoClient: false,
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
          name: 'descripcion',
          required: true,
          label: 'Descripción',
          align: 'left',
          field: row => row.descripcion,
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
    await this.getClient(this.$route.params.id)
    await this.getProyects()
    this.disableLoading()
  },
  methods: {
    async getProyects () {
      const r = await ProyectService.getProyects({ cliente_id: this.$route.params.id, token: localStorage.getItem('token') })
      this.data = r.data
    },
    async getClient (id) {
      const p = await ClientService.getClient({ id: id, token: localStorage.getItem('token') })
      this.client = p.data
    },
    agregar () {
      this.$q.dialog({
        component: AddProyect,
        parent: this
      }).onOk(async (data) => {
        data.token = localStorage.getItem('token')
        data.cliente_id = this.$route.params.id
        try {
          const r = await ProyectService.addProyect(data)
          if (r.status === 200) {
            this.goTo('proyect/' + r.data.proyect.id)
            this.alert('positive', 'Proyecto agregado correctamente')
          } else {
            this.alert('negative', 'Problemas al agregar el proyecto')
          }
        } catch (error) {
          this.alert('negative', 'Problemas al agregar el proyecto')
        }
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    async onSubmit () {
      try {
        this.client.token = localStorage.getItem('token')
        const ph = await ClientService.setClient(this.client)
        if (ph.status === 200) {
          this.alert('positive', 'Tus cambios han sido guardados')
          this.getProyects(this.$route.params.id)
        }
      } catch (error) {
        this.alert('negative', 'Error al guardar los cambios')
      }
    },
    async del (id) {
      try {
        this.activateLoading('Cargando')
        const p = await ProyectService.delProyect({ id: id, token: localStorage.getItem('token') })
        if (p.status === 200) {
          this.getProyects()
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
<style lang="scss" scoped>
.title {
    cursor: pointer;
    background: $primary;
    color: white;
    padding: 10px;
}
</style>
