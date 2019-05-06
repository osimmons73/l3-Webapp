<template>
  <div class="home">
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
        <div class="google" v-if="!myUser._id"></div>
        <Title/>
      </div>
    </section>

    <!-- Features -->
    <section id="features">
      <Features/>
    </section>

    <!-- Testimonials -->
    <section id="testimonials">
      <Testimonials/>
    </section>

    <!-- Press -->
    <section id="press">
      <Press/>
    </section>

    <!-- Pricing -->
    <section class="white-section" id="pricing">
      <Pricing/>
    </section>

    <!-- Call to Action -->
    <section id="cta">
      <ActionCall/>
    </section>

    <!-- Footer -->
    <section id="footer">
      <Footer/>
    </section>
  </div>
</template>

<script>
import Navbar from "./home/Navbar.vue";
import Title from "./home/Title.vue";
import Features from "./home/Features.vue";
import Testimonials from "./home/Testimonials.vue";
import Press from "./home/Press.vue";
import Pricing from "./home/Pricing.vue";
import ActionCall from "./home/ActionCall.vue";
import Footer from "./home/Footer.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    Navbar,
    Title,
    Features,
    Testimonials,
    Press,
    Pricing,
    ActionCall,
    Footer
  },
  computed: {
    ...mapGetters(["myUser"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  },
  created() {}
};
</script>

<style>
</style>
