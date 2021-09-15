<template>
  <div class="app-container">
    <div class="blogs">
      <div class="blog-card">
        <el-card v-for="o in 4" :key="o"  shadow="hover" style="margin-bottom: 10px;">
          <div  @click="handleblogCheck()">
            <label class="blog-title">1博文标题</label>
          <br />
          <label class="blog-description" style=""
            >以上使用标签内使用color颜色样式和css代码使用color颜色样式。
            四、文字颜色控制一样 - TOP 传统html和css
            文字颜色相同使用“color:”+“RGB颜色取值”即可,如颜色为黑色字以上使用标签内使用color颜色样式和css代码使用color颜色样式。
            四、文字颜色控制一样 - TOP 传统html和css
            文字颜色相同使用“color:”+“RGB颜色取值”即可,如颜色为黑色字</label
          >
          <br />
          <el-tag class="blog-flag" size="mini">转载</el-tag>
          <label class="blog-updatetime">2021-03-02 15:25:21</label>
          </div>
        </el-card>
      </div>

      <el-card class="bolg-app" shadow="never">
        <div slot="header">
          <span>卡片名称</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "blogs",
  data() {
    return {};
  },
  created() {},
  methods: {
    handleblogCheck(){
      console.log("--")
      this.$router.push({path:'/blog',query:{id:3}});
    }
  },
};
</script>

<style scoped>
.blogs {
  display: flex; /*Flex布局*/
  justify-content: center;
}

.blog-card {
  width: 50%;
  position: relative;
  margin-right: 20px;

}

.blog-title {
  font-size: 16px;
}

.blog-card .blog-option {
  display: inline-block;
  position: absolute;
  right: 35px;
}
.blog-description {
  /* margin-top: 10px; */
  font-size: 12px;
  color: #525457;
  width: 95%;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.blog-updatetime {
  font-size: 10px;
  color: #c0c4cc;
}

.bolg-app {
  margin-top: 10px;
 height: 30%;
 width: 15%;
}
</style>
