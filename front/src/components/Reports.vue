<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10 container">
                <div class="text-h4">Informes</div>
                <div class="row">
                  <div class="col-md-12 col-xs-12">
                    <q-select v-model="informe.tipo" :options="options" label="Tipo de informe" required>
                      <template v-slot:prepend>
                        <q-icon name="report" />
                      </template>
                    </q-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12"><q-btn label="Agregar" @click="generate" type="submit" class="full-width" color="positive"></q-btn></div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import { functions } from 'src/functions.js'

export default {
  name: 'calendar',
  mixins: [functions],
  components: {
  },
  data () {
    return {
      informe: {},
      options: ['Proyectos + fases']
    }
  },
  async created () {
  },
  props: ['user'],
  methods: {
    generate () {
      this.downloadFile(process.env.API_URL + 'export/' + this.user.id)
    },
    downloadFile (filePath) {
      const link = document.createElement('a')
      link.href = filePath
      link.download = filePath.substr(filePath.lastIndexOf('/') + 1)
      link.click()
    }
  }
}
</script>
