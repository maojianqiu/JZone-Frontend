<template>
  <div class="app-container">
    <div class ="blogs">
      <div class="blog-card">
        <el-card >
          <div  class="text">
            待上线~
          </div>
      </el-card>
      </div>
    </div>
    <!-- <comment :comments="commentData"></comment> -->
    
  </div>
</template>

<script>
  import * as CommentData from '../comment/mockdata'
  import comment from '../comment/comment'

  export default {
    name: 'wenda',
    components: {
      comment
    },
    data() {
       return {
        commentData: []
      }
    },
    created() {
      console.log("----------");
      this.commentData = CommentData.comment.data;
      console.log(CommentData.comment.data);
    },
    methods:{

    }
  }
</script>

<style scoped>
  
  .app-container {
    background: url("../../assets/images/06.jpg")  ;
    background-size: 150%;
    position: fixed;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
  }

.blogs {
  display: flex; /*Flex布局*/
  justify-content: center;
  padding: 20px;
  
}

.blog-card {
  width: 50%;
  position: relative;
  margin-right: 20px;
}


</style>
