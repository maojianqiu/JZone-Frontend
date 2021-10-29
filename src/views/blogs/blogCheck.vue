<template>
  <div class="app-container">
    <div style="padding: 20px;">
    <div class="blog-option ">
            <el-button class="blog-option-btn" type="warning" :icon="blog.islike ? 'el-icon-star-on':'el-icon-star-off'" circle @click="handleLikeAdd(blog.id)">
            <br/>{{blog.islike ? '已赞':'点赞'}}
            </el-button><br/>
            <el-button class="blog-option-btn" type="warning" icon="el-icon-star-on" circle>
            <br/>已赞
            </el-button><br/>
            <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle>
            <br/>点赞
            </el-button><br/>
        </div>
      <div class="blog-main">
        
        
        <el-card class="blog-content">
          <label style="font-size:35px; font-weight:bold;">{{blog.title}}</label>
          <br/><br/>
          <div class="blog-stat" style="background-color: #f5f6f7;padding:5px 10px">
            <!-- <div class="blog-stat" > -->
            <el-tag class="blog-flag" size="mini">{{
                      blog.flag == 0 ? "转载" : "原创"
                    }}</el-tag>
            <label class="blog-nickname">{{blog.nickname}}</label> 
            <label class="blog-date">{{blog.updateTime | formatDateTime}}</label> 
            
                    <i class="el-icon-view"></i>{{blog.views}}
                        
                    <i class="el-icon-star-off" ></i>{{blog.likes}}

            <br/>
            <el-tag class="blog-tags" size="mini" type="info" v-for="item in blog.tags" :key="item.id">{{
                      item.name
                    }}</el-tag>
          </div>
          <br/><br/>
          <mavon-editor
          class="md"
          :value="blog.content"
          :subfield="false"
          :defaultOpen="'preview'"
          :navigation="false"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
          :boxShadow="false"
          :previewBackground="'#ffffff'"
          style="border: 1px solid #ffffff;padding: 0px 0px 5px 5px;"
        />

        </el-card>
      </div>
    </div>
   
    <div class="copy-bottom">
              <div  class="copyright" style="">
                Copyright © 2021-2022 - All Rights Reserved - 备案号 
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143" rel="noreferrer" target="_blank">11010502030143</a>
              </div>
              <div  class="copyright" >
                Hello World !
                你好啊，世界 ！
              </div>
      </div>

  </div>
</template>

<script>
import { getBlogInfo , isLikeAdd} from "@/api/blogs";
import { formatDate } from "@/utils/date";
import { mavonEditor } from "mavon-editor";

export default {
  name: "blogCheck",
  data() {
    return {
      blog:{},
    };
  },
  components: {
    mavonEditor,
  },
  created() {
    getBlogInfo(this.$route.query.id).then((response) => {
        this.blog = response.data;
        console.log(this.blog);
      });
  },
   filters: {
    formatDateTime(time) {
      console.log(time);
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {

    handleLikeAdd(blogId){
      isLikeAdd(blogId).then((response) => {
        let islikeresult = response.data;
        if(islikeresult == 1){ //操作成功
          this.blog.islike = !this.blog.islike;
          if(this.blog.islike){
            this.blog.likes = this.blog.likes + 1 ;
          }else{
            this.blog.likes = this.blog.likes - 1 ;
          }
        }

        this.$message({
          message: this.blog.islike ? '已点赞' :'已取消点赞',
          type: 'success',
          duration: 3 * 1000
        })
        
        
        console.log(this.islikeresult);
      }).catch((error) => {
        this.$message({
          message: '操作失败，请稍后操作',
          type: 'error',
          duration: 3 * 1000
        })
      });
    }
  },
};
</script>

<style scoped>

.app-container {
  background: url("../../assets/images/04.jpg")  ;
  background-size: 150%;
}

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
  _height:200px; 
  min-height:200px;
  margin-left: 20px;
}

.blog-content .blog-date {
  font-size: 12px;
  color: rgb(134, 134, 134);
  margin-right: 30px;
}

.blog-stat{
    /* flex: 1;
    text-align: right; */
  font-size: 10px;
  margin: auto 10px ;

}

.blog-content .blog-nickname{
  font-size: 12px;
  color: rgb(58 58 58);
  margin-left: 10px;
  margin-right: 30px;
}


.blog-content .blog-tags {
  margin-top:10px;
  margin-right: 10px;
}

/*---------------------*/
.copyright{
  font-size: 11px;

  padding-top: 10px;

}
.copy-bottom{
  height: 60px;
  background-color: #545c64;
  margin:0 auto;
  text-align:center;
  color: #ffffff;

}

</style>
