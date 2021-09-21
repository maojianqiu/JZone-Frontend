<template>
  <div class="app-container">
    <div class="blog-option">
          <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle></el-button><br/>
          <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle></el-button><br/>
          <el-button class="blog-option-btn" type="warning" icon="el-icon-star-off" circle></el-button><br/>
      </div>
    <div class="blog-main">
      
      
      <el-card class="blog-content">
        <label style="font-size:35px; font-weight:bold;">{{blog.title}}</label>
        <br/><br/>
        <div style="background-color: #f5f6f7;padding:5px 10px">
          <el-tag class="blog-flag" size="mini">{{
                    blog.flag == 0 ? "转载" : "原创"
                  }}</el-tag>
          <label class="blog-date">{{blog.updateTime | formatDateTime}}</label> 
          <label class="blog-date">10000 浏览</label>
        </div>
        <br/><br/>
        <mavon-editor
        class="md"
        :value="blog.content"
        :subfield="false"
        :defaultOpen="'preview'"
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
</template>

<script>
import { getBlogInfo} from "@/api/bmsb";
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
