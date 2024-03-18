<script>
import Burger from './components/Burger.vue';

export default {
  components: {
    Burger // Local component registration
  },
  data() {
    return {}
  }
}
</script>

<template>
  <header>
   
  </header>

  <main>
    <div v-for="n in 3">
      <Burger :selected_id="n - 1"/>
    </div>
  </main>
</template>

<style>

</style>
