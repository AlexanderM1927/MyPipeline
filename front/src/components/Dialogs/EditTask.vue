<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin barra">
        <div class="form">
            <div class="text-h6">Información de la tarea<q-icon name="timelapse" /></div>
            <q-input filled color="primary" label="Nombre" v-model="myTask.name">
                <template v-slot:prepend>
                    <q-icon name="note_add" />
                </template>
            </q-input>
            <q-input filled color="primary" label="Comentario" type="textarea" v-model="myTask.commentary">
                <template v-slot:prepend>
                    <q-icon name="description" />
                </template>
            </q-input>
            <q-input filled color="primary" label="Fecha y hora" required :rules="[val => !!val || 'Este campo es necesario']" v-model="myTask.date">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="myTask.date" mask="YYYY-MM-DD HH:mm" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="myTask.date" mask="YYYY-MM-DD HH:mm" format24h />
                      </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>
        <q-card-actions align="right">
            <q-btn color="primary" label="OK" @click="onOKClick" />
            <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      myTask: {}
    }
  },
  props: {
    // ...your custom props
    task: {}
  },
  created () {
    this.myTask = Object.assign({}, this.task)
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.myTask)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
<style scoped>
.form {
    padding: 10px;
}
.barra::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
}
/* Ponemos un color de fondo y redondeamos las esquinas del thumb */
.barra::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 4px;
}
/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.barra::-webkit-scrollbar-thumb:hover {
    background: #000;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
/* Cambiamos el fondo cuando esté en active */
.barra::-webkit-scrollbar-thumb:active {
    background-color: #000;
}
</style>
