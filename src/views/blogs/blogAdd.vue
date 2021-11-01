<template>
  <div class="app-container">
    <div>
      <blog-details :is-edit='false'></blog-details>
    </div>
  </div>
</template>

<script>
 import blogDetails from './components/blogDetails'
  export default {
    name: 'blogcheck',
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
  .app-container {
    padding-top:1px;
    height:800px;
  background: url("../../assets/images/04.jpg")  ;
  background-size: 150%;
}
</style>