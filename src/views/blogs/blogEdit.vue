<template>
  <div class="app-container">
    <div>
      <h1>博文blogeditblogeditblogedit</h1>
      <blog-details :is-edit='true'></blog-details>
    </div>
  </div>
</template>

<script>
 import blogDetails from './components/blogDetails'
  export default {
    name: 'blogedit',
    components: { blogDetails },
    data() {
      return {
        
      }
    },
    created(){
      
    },
    methods:{
    }
  }
</script>

<style scoped>
  
</style>