<template> 
  <blog-details :is-edit='true'></blog-details>
</template>
<script>
  import blogDetails from './components/blogDetails'
  export default {
    name: 'addDetails',
    components: { blogDetails }
  }
</script>
<style>
</style>


