<template>
  <v-card @click="$emit('click')" min-height="200" :color="'#' + applet.infos.color" :class="{'white--text': isColorDark, 'black--text': !isColorDark, 'my-card': true, 'my-cursor': mode == 'select' }">


    <modal name="error-param" :width="300" :height="250">
      <v-card class="my-card-modal">
        <v-card-title class="bg-error">
          <v-layout row align-start>
            <v-layout row align-center justify-center>
              <v-icon color="white" :size="48">error</v-icon>
            </v-layout>
            <v-icon color="lightgrey" small class="my-cursor" @click="hideModal">close</v-icon>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout column>
            <v-flex align-self-center>
              <h2>Invalid Parameter</h2>
            </v-flex>
            <v-flex align-self-center class="text-xs-center">
              <h4>{{ errors.msg }}</h4>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout column align-center>
            <v-btn round color="#eeb711" @click="hideModal" dark>
              Update It
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>


    </modal>

    <v-card-title primary-title>
      <h2 class="custom-title">{{ applet.infos.title }}</h2>
    </v-card-title>
    <v-card-text>
      <span class="custom-description">{{ applet.infos.description }}</span>
    </v-card-text>
    <v-card-actions v-if="mode == 'edit'">
      <v-layout column>
        <v-flex align-self-center v-for="(paramValue, paramProperty) in getParams" :key="paramProperty" class="form-input">
              <v-text-field v-if="paramValue == 'String'" v-model="params[paramProperty]" type="text" :label="paramProperty" dark></v-text-field>
              <v-select v-else-if="paramValue == 'Day'" v-model="params[paramProperty]" :items="days" item-text="text" item-value="id" label="Day" dark></v-select>
              <v-text-field v-else-if="paramValue == 'Hour'" type="number" :label="paramProperty" @change="updateParamNumber($event, paramProperty)" dark></v-text-field>
              <v-text-field v-else-if="paramValue == 'Minute'" type="number" :label="paramProperty" @change="updateParamNumber($event, paramProperty)" dark></v-text-field>
              <v-text-field v-else-if="paramValue == 'Number'" type="number" :label="paramProperty" @change="updateParamNumber($event, paramProperty)" dark></v-text-field>
        </v-flex>
        <v-flex align-self-center class="validate-section">
          <v-btn color="white" round large @click="validate">
            Validate
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    applet: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'select'
    }
  },
  data() {
    return {
      params: {},
      days: [
        { text: 'Monday', id: 1 },
        { text: 'Tuesday', id: 2 },
        { text: 'Wednesday', id: 3 },
        { text: 'Thursday', id: 4 },
        { text: 'Friday', id: 5 },
        { text: 'Saturday', id: 6 },
        { text: 'Sunday', id: 7 },
      ],
      errors: {
        msg: 'msg derror',
        show: false
      }
    }
  },
  computed: {
    getParams() {
      return this.applet.infos.params
    },
    isParams() {
      var params = this.applet.infos.params
      return !(Object.entries(params).length === 0 && params.constructor === Object)
    },
    isColorDark() {
      var rgb = parseInt(this.applet.infos.color, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue
      var brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      return brightness < 130
    }
  },
  methods: {
    validate() {
      if (this.checkParamsCompleted()) {
        this.$emit('validate', this.params)
      } else {
        this.$modal.show('error-param')
      }
    },
    hideModal() {
      this.$modal.hide('error-param')
      this.errors.show = false
    },
    checkParamsCompleted() {
      for (let paramProperty in this.getParams) {
        if (!this.isParamSet(paramProperty)) {
          this.errors.msg = `Parameter ${paramProperty} is invalid, update it to continue`
          this.errors.show = true
          return false
        }
      }
      return true
    },
    updateParamNumber(value, paramProperty) {
      this.params[paramProperty] = parseInt(value)
    },
    isParamSet(paramProperty) {
      switch (this.applet.infos.params[paramProperty]) {
        case 'String':
          return this.params[paramProperty] && typeof(this.params[paramProperty]) === 'string'
        case 'Number':
          return this.params[paramProperty] && typeof(this.params[paramProperty]) === 'number'
        case 'Day':
          return this.params[paramProperty] && typeof(this.params[paramProperty]) === 'number' && this.params[paramProperty] < 8 && this.params[paramProperty] > 0
        case 'Hour':
          return this.params[paramProperty] && typeof(this.params[paramProperty]) === 'number' && this.params[paramProperty] < 24 && this.params[paramProperty] >= 0
        case 'Minute':
          return this.params[paramProperty] && typeof(this.params[paramProperty]) === 'number' && this.params[paramProperty] < 60 && this.params[paramProperty] >= 0
        default:
          return false
      }
    }
  }
}
</script>

<style scoped>

.my-card {
  border-radius: 13px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 15px;
  margin: 10px;
}
.my-cursor { cursor: pointer !important; }

.my-card-title {
  min-height: 150px;
}

.custom-title {
  font-weight: 1000;
  font-size: 20px !important;
  color: white;
}
.custom-description {
  font-size: 18px !important;
  font-weight: 700;
  color: white;
  opacity: 0.80;
}



.my-card-modal {
  height: 100%;
  width: 100%;
}
.bg-error {
  color: white;
  background-color: #e85e6c;
}

.validate-section {
  margin-top: 20px;
}
/* .form-input {
  color: white;
  border-radius:25px;
  padding:15px 20px;
  background:rgba(255,255,255,.2);
} */
.form-input {
  width: 100% !important;

}
</style>
