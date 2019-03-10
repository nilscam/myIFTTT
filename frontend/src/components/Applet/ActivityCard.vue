<template>
<div class="marg-top">
  <h1 class="custom-title-card">{{activity.title}}</h1>
  <v-card class="my-card" max-height="350" min-height="100" max-width="450" min_width="300" :color="'#' + activity.trigger.infos.color">
    <v-card-title primary-title>
      <v-flex>
        <v-layout row justify-center align-center>
          <v-img :src="getLogoTrigger(activity.trigger.service)" aspect-ratio="1" max-width="50px" max-height="50px"></v-img>
        </v-layout>
      </v-flex>
    </v-card-title>
    <v-card-text>
    <div>
      <h5 class="custom-date">{{getDate(this.activity.date)}}</h5>
      <h3 class="custom-title">{{ activity.applet_message }}</h3>
      <v-card class="my-card-2" max-height="100" min-height="50" max-width="450" min_width="300" :color="'#' + colorCard()">
        <h4 class="custom-description">{{ activity.extra_message }}</h4>
      </v-card>
    </div>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import Api from '../../Api'

export default {
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  methods: {
    getLogoTrigger(name) {
      return  Api.websiteURL + `/images/${name}.png`
    },
    customDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    },
    getDate(timestamp) {
        var newdate = new Date(timestamp)
        return (this.customDate(newdate));
    },
    colorCard() {
        if (this.activity.trigger.isActive)
            return("2ecc71");
        else if (!this.activity.trigger.isActive)
            return("e74c3c");
        else
        return(this.activity.infos.color)
    }
  }
}
</script>

<style scoped>
.my-card {
  border-radius: 13px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer !important;

  padding: 15px;
  margin: 10px;
}
.my-card-2 {
  border-radius: 13px;
  cursor: pointer !important;

  padding: 15px;
  margin: 10px;
}

.my-card-title {
  min-height: 100px;
}

.custom-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 1000;
  font-size: 20px !important;
  color:white;
}
.custom-title-card {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 1000;
  font-size: 30px !important;
  color:black;
}
.custom-date {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 1000;
  font-size: 12px !important;
  color:white;
  opacity: 0.80;
}
.custom-description {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700;
  color:white;
  opacity: 0.80;
}

.marg-top {
    margin-top: 50px;
}
</style>