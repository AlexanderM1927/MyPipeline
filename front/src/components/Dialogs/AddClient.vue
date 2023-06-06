<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin barra">
        <div class="form">
            <div class="text-h6">Información del cliente<q-icon name="list" /></div>
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
      client: {}
    }
  },
  props: {
    // ...your custom props
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
      this.$emit('ok', this.client)
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
