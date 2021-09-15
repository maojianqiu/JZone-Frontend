<template>
  <div class="app-container">
    <div class="blog-option">
          <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle></el-button><br/>
          <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle></el-button><br/>
          <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle></el-button><br/>
      </div>
    <div class="blog-main">
      
      
      <el-card class="blog-content">
        <h1>有奖征文 | 会写文章的程序员到底有多吃香？</h1>
        <br/>
        <label class="blog-date">2021.04.21 16:02</label> 
        <label class="blog-date">13053浏览</label>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.blog-main {
  display: flex; /*Flex布局*/
  justify-content: center;
}

.blog-option {
  position: fixed;
  left: 260px;
  top: 90px;  
}

.blog-option-btn {
  margin-top: 10px;

}

.blog-content {
  width: 62%;
  height: 500px;
  margin-left: 20px;
}

.blog-content .blog-date {
  font-size: 12px;
  color: rgb(134, 134, 134);
  margin-right: 30px;
}
</style>
