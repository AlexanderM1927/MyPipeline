<template>
    <div class="q-pa-md"  v-if="hasPermiss === true">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10 container">
              <div class="text-h4">Proyecto</div>
                <q-form @submit="onSubmit">
                    <div class="text-h6 title" @click="infoProyect = !infoProyect">Información del proyecto: {{proyect.name}}</div>
                    <div v-show="infoProyect">
                        <q-input filled color="primary" bg-color="white" label="Nombre" v-model="proyect.name">
                            <template v-slot:prepend>
                                <q-icon name="note_add" />
                            </template>
                        </q-input>
                        <q-input filled color="primary" bg-color="white" label="Descripcion" type="textarea" v-model="proyect.descripcion">
                            <template v-slot:prepend>
                                <q-icon name="description" />
                            </template>
                        </q-input>
                        <q-input filled color="primary" bg-color="white" label="Linea" v-model="proyect.linea">
                            <template v-slot:prepend>
                                <q-icon name="linear_scale" />
                            </template>
                        </q-input>
                        <q-input filled color="primary" bg-color="white" label="Monto" v-model="proyect.monto">
                            <template v-slot:prepend>
                                <q-icon name="account_tree" />
                            </template>
                        </q-input>
                    </div>
                    <q-separator inset />
                    <br>
                    <center>
                        <q-btn label="Guardar" type="submit" color="primary" ></q-btn>
                        <q-btn label="Generar fases" @click="generatePhases" color="dark"></q-btn>
                    </center>
                </q-form>
                <br>
                <q-separator inset />
                <br>
                <q-table
                :title="'Fases'"
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
                        <q-td key="action" :props="props">
                        <a class="text-blue" style="cursor: pointer; padding: 5px;" @click="goTo('phase/' + props.row.id)"> <q-icon size="md" name="add_task"/>
                            <q-tooltip :delay="1000" :offset="[0, 10]">Agregar tareas</q-tooltip>
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
                <br>
                <q-separator inset />
                <br>
                <div class="text-h4">Indicadores de seguimiento</div>
                <div class="row">
                  <div class="col-md-4 col-xs-12">
                    <q-card class="my-card bg-indigo-10 text-white">
                      <q-card-section>
                        <div class="text-h6">Tiempo del proyecto</div>
                        <div class="text-subtitle2">{{info1.days}} dias desde primera tarea</div>
                      </q-card-section>

                      <q-card-section class="indicador">
                        <b>Fecha primera tarea:</b> {{info1.date}}<br>
                        <b>Última fase trabajada:</b> {{info1.name_last_phase}}
                      </q-card-section>

                      <q-separator dark />

                      <q-card-actions align="right">
                        <q-btn @click="goTo('phase/' + info1.last_phase.id)" flat>Ir a la última fase</q-btn>
                      </q-card-actions>
                    </q-card>
                  </div>
                  <div class="col-md-4 col-xs-12">
                    <q-card class="my-card bg-positive text-white">
                      <q-card-section>
                        <div class="text-h6">Última tarea</div>
                        <div class="text-subtitle2">Nombre: {{info2.task_name}}</div>
                      </q-card-section>

                      <q-card-section class="indicador">
                        <b>Fecha:</b> {{info2.task_date}}<br>
                        <b>Fase:</b> {{info2.name}}
                      </q-card-section>

                      <q-separator dark />

                      <q-card-actions align="right">
                        <q-btn @click="goTo('phase/' + info2.id)" flat>Ir a la fase</q-btn>
                      </q-card-actions>
                    </q-card>
                  </div>
                  <div class="col-md-4 col-xs-12">
                    <q-card class="my-card bg-orange text-white">
                      <q-card-section>
                        <div class="text-h6">Próxima tarea</div>
                        <div class="text-subtitle2">Nombre: {{info3.task_name}}</div>
                      </q-card-section>

                      <q-card-section class="indicador">
                        <b>Fecha:</b> {{info3.task_date}}<br>
                        <b>Fase:</b> {{info3.name}}
                      </q-card-section>

                      <q-separator inset  />

                      <q-card-actions align="right">
                        <q-btn @click="goTo('phase/' + info3.id)" flat>Ir a la fase</q-btn>
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import ProyectService from '../services/ProyectService'
import AddPhase from 'components/Dialogs/AddPhase'
import PhaseService from '../services/PhaseService'
import { functions } from 'src/functions.js'

export default {
  name: 'proyect',
  mixins: [functions],
  data () {
    return {
      proyect: {},
      infoProyect: false,
      infoContact: false,
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
          name: 'action',
          required: true,
          label: 'Acciones',
          align: 'left',
          sortable: true
        }
      ],
      data: [
      ],
      hasPermiss: false,
      info1: {},
      info2: {},
      info3: {}
    }
  },
  props: ['user'],
  async mounted () {
    this.activateLoading('Cargando')
    await this.getProyect(this.$route.params.id)
    this.hasPermiss = await this.getPermiss('proyect', this.$route.params.id)
    await this.getPhases(this.$route.params.id)
    await this.getDaysProyect(this.$route.params.id)
    await this.getLastTask(this.$route.params.id)
    await this.getNextTask(this.$route.params.id)
    this.organizarCards()
    this.disableLoading()
  },
  methods: {
    async organizarCards () {
      const indicadores = await document.getElementsByClassName('indicador')
      let initialSize = 0
      for (let i = 0; i < indicadores.length; i++) {
        if (initialSize <= indicadores[i].clientHeight) initialSize = indicadores[i].clientHeight
      }
      for (let i = 0; i < indicadores.length; i++) {
        document.getElementsByClassName('indicador')[i].style.minHeight = initialSize + 'px'
      }
    },
    async getProyect (id) {
      const p = await ProyectService.getProyect({ id: id, token: localStorage.getItem('token') })
      this.proyect = p.data
    },
    async getPhases (id) {
      try {
        const ph = await PhaseService.getPhases({ proyecto_id: id, token: localStorage.getItem('token') })
        this.data = ph.data
      } catch (error) {
        this.data = []
      }
    },
    async getDaysProyect (id) {
      try {
        const p = await ProyectService.getDaysProyect({ id: id, token: localStorage.getItem('token') })
        if (p.status === 200) {
          const res = p.data
          const today = new Date().getTime()
          const dateFirstTask = new Date(res.date).getTime()
          const daysProyect = today - dateFirstTask
          const days = parseInt(daysProyect / (1000 * 60 * 60 * 24))
          this.info1 = {
            date: res.date,
            days: days,
            last_phase: res.last_phase,
            name_last_phase: res.last_phase.name
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getLastTask (id) {
      const p = await ProyectService.getLastTask({ id: id, token: localStorage.getItem('token') })
      const res = p.data
      this.info2 = res
    },
    async getNextTask (id) {
      const p = await ProyectService.getNextTask({ id: id, token: localStorage.getItem('token') })
      const res = p.data
      this.info3 = res
    },
    async onSubmit () {
      try {
        this.proyect.token = localStorage.getItem('token')
        const ph = await ProyectService.setProyect(this.proyect)
        if (ph.status === 200) {
          this.alert('positive', 'Tus cambios han sido guardados')
          this.getPhases(this.$route.params.id)
        }
      } catch (error) {
        this.alert('negative', 'Error al guardar los cambios')
      }
    },
    async generatePhases () {
      this.$q.dialog({
        component: AddPhase,
        parent: this
      }).onOk(async (data) => {
        data.token = localStorage.getItem('token')
        data.proyecto_id = this.$route.params.id
        try {
          const ph = await PhaseService.generatePhases(data)
          if (ph.status === 200) {
            this.alert('positive', 'La fase fue agregada')
            this.getPhases(this.$route.params.id)
          }
        } catch (error) {
          this.alert('negative', 'Problemas al agregar el proyecto')
        }
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
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
