<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div  class="text">
          待上线~
        </div>
      </el-card>
    </div>
    <comment :comments="commentData"></comment>
    <div  class="text">
          待上线~
    </div>
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
  
</style>
