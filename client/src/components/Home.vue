<template>
  <div class="container">
    <div id="app-time">
      <div class="timer">
        <div>Time Remaining</div>
        <span class="minute">{{ minutes }}</span>
        <span>:</span>
        <span class="seconds">{{ seconds }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserService from "../services/UserService.js";
import LockerService from "../services/LockerService.js";
import Navbar from "./home/Navbar.vue";
import Title from "./home/Title.vue";
import feather from "feather-icons";

export default {
  data: function() {
    return {
      timer: null,
      totalTime: 25 * 60,
      resetButton: false,
      title: "Countdown to rest time!",
      edit: false
    };
  },
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000); //1000ms = 1 second
      this.resetButton = true;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer: function() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    editTimer: function() {
      this.edit = true;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      this.totalTime--;
    }
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }
  },
  mounted() {
    feather.replace();
    this.startTimer();
  }
};
</script>

<style>
/* @import "compass";
@import "susy"; */
/* $primary-color: #FD7014;
$secondary-color: #393E46;
$background-color: #222831;
$text-color: #EEEEEE; */

html {
  font-size: 0.3em;
}

.container {
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: auto auto;
  padding: 0%;
}

#app-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0%;
}
/* & > * {
      margin-bottom: 2rem;
    } */
/* } */
.timer {
  font-size: 9rem;
  color: #eeeeee;
}
.controls {
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  color: #fd7014;
  transition: 0.1s ease;
}
/* :hover {
  cursor: pointer;
  transform: scale(1.2);
} */

.input {
  background-color: #393e46;
  border: none;
  font-size: 2rem;
  padding: 1em;
  text-align: center;
  color: #eeeeee;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
