<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10 container" v-if="hasPermiss === true">
                <div class="text-h4">
                    Tareas
                    <q-btn color="primary" style="float: right;" icon="add" @click="agregar"></q-btn>
                </div>
                <q-separator inset />
                <q-table
                    :title="'Tareas'"
                    dense
                    :columns="columns"
                    :data="data"
                    row-key="id"
                    :rows-per-page-label="'Registros'"
                    :filter="filter"
                    :pagination="{ rowsPerPage: 7 }"
                >
                        <q-tr slot="body" slot-scope="props" :props="props" style="height: 50px">
                            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                            <q-td key="commentary" :props="props">{{ props.row.commentary }}</q-td>
                            <q-td key="date" :props="props">{{ props.row.date }}</q-td>
                            <q-td key="action" :props="props">
                            <a class="text-blue" style="cursor: pointer; padding: 5px;" @click="edit(props.row)"> <q-icon size="md" name="edit"/>
                                <q-tooltip :delay="1000" :offset="[0, 10]">Editar</q-tooltip>
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
            <div class="col-10 container" v-else>
              <div class="text-h4">No tienes permisos</div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import AddTask from 'components/Dialogs/AddTask'
import EditTask from 'components/Dialogs/EditTask'
import TaskService from '../services/TaskService'
import { functions } from 'src/functions.js'

export default {
  name: 'phase',
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
          name: 'commentary',
          required: true,
          label: 'Comentario',
          align: 'left',
          field: row => row.commentary,
          sortable: true
        },
        {
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.date,
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
      ],
      hasPermiss: false
    }
  },
  props: ['user'],
  async created () {
    this.activateLoading('Cargando')
    await this.getTasks()
    this.hasPermiss = await this.getPermiss('phase', this.$route.params.id)
    this.disableLoading()
  },
  methods: {
    async getTasks () {
      const r = await TaskService.getTasks({ fase_id: this.$route.params.id, token: localStorage.getItem('token') })
      this.data = r.data
    },
    agregar () {
      this.$q.dialog({
        component: AddTask,
        parent: this
      }).onOk(async (data) => {
        data.token = localStorage.getItem('token')
        data.fase_id = this.$route.params.id
        try {
          this.activateLoading('Cargando')
          const r = await TaskService.addTask(data)
          this.disableLoading()
          if (r.status === 200) {
            this.getTasks()
            this.alert('positive', 'Tarea agregada correctamente')
          } else {
            this.alert('negative', 'Problemas al agregar las tarea')
          }
        } catch (error) {
          this.alert('negative', 'Problemas al agregar la tarea')
        }
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    edit (task) {
      this.$q.dialog({
        component: EditTask,
        parent: this,
        task: task
      }).onOk(async (data) => {
        data.token = localStorage.getItem('token')
        try {
          this.activateLoading('Cargando')
          const r = await TaskService.editTask(data)
          this.disableLoading()
          if (r.status === 200) {
            this.getTasks()
            this.alert('positive', 'Tarea modificada correctamente')
          } else {
            this.alert('negative', 'Problemas al modificar tarea')
          }
        } catch (error) {
          this.alert('negative', 'Problemas al modificar la tarea')
        }
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    async del (id) {
      console.log('deleting')
    }
  }
}
</script>
