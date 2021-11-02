<template>
  <div >
    <div class="app-container">
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
.app-container {
  padding-top:1px;
  background: url("../../assets/images/04.jpg")  ;
  background-size: 150%;
    position: fixed;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
}
</style>