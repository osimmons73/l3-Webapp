<template>
  <div id="app">
    <!-- Title -->
    <section id="title">
      <div class="container-fluid">
        <Navbar/>
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
    <Home/>
  </div>
</template>

<script>
//import UserComponent from "./components/UserComponent.vue";
import Home from "./components/Home.vue";
import Navbar from "./components/Navbar.vue";
import Title from "./components/Title.vue";
import Features from "./components/Features.vue";
import Testimonials from "./components/Testimonials.vue";
import Press from "./components/Press.vue";
import Pricing from "./components/Pricing.vue";
import ActionCall from "./components/ActionCall.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Home,
    Navbar,
    Title,
    Features,
    Testimonials,
    Press,
    Pricing,
    ActionCall,
    Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
