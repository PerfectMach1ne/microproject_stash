<script>
import axios from 'axios';

const axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
});

export default {
  props: ['selected_id'],
  data() {
    return {
      imageSrc: "./assets/images/the-sad-european.png",
      burgerDesc: "a beiger with dkgfdpblgfbogkg"
    }
  },
  methods: {
    async getBurger(burger_id) {
      let data = undefined;
      
      try {
        const res = await axios_instance.get(`/burger/${burger_id}`)
        data = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.burgerDesc = data.description;
        console.log(data);
      }
    }
  },
  beforeMount() {
    this.getBurger(this.selected_id)
  },
  created() {
    // console.log(this.getBurger(1));
    this.imageSrc = `http://127.0.0.1:8000/burger/${this.selected_id}/img`;
  }
}

</script>

<template>
  <figure class="burger-fig">
    <img :src="imageSrc" alt="A picture of a burger">
    <figcaption>{{ burgerDesc }}</figcaption>
  </figure>
</template>

<style>

</style>
