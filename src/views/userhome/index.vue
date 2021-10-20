<template>
  <div class="app-container">
    <div class="blogs">
      <div class="blog-card">
        <el-card
          v-for="blog in blists"
          :key="blog.id"
          shadow="hover"
          style="margin-bottom: 10px"
        >
          <div @click="handleblogCheck(blog.id)" >
            <label class="blog-title">{{blog.title}}</label>
            <br />
            <label class="blog-description" style=""
              >{{blog.description}}</label
            >
            <br />
            <el-tag class="blog-flag" size="mini">{{blog.flag == 0 ? "转载" : "原创"}}</el-tag>
            <label class="blog-updatetime">{{ blog.updateTime | formatDateTime}}</label>
          </div>
        </el-card>
      </div>

      <el-card class="bolg-app" shadow="never">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getViewBlogListByUserID } from "@/api/blogs";
import { getMemeberInfo } from "@/api/mem_login";
import { formatDate } from "@/utils/date";

  export default {
    name: 'userhome',
    data() {
      return {
        blists:[],

        member: {},
      };
    },
    created(){
      // console.log("userhome----"+this.$route.query.id);
      let id = this.$route.query.id
      //获取博文列表
      getViewBlogListByUserID(0)
        .then((response) => {
          this.blists = response.data.list;
          // console.log(response.data.list);
        })
        .catch((error) => {});
      //获取用户信息
      getMemeberInfo(id)
        .then((response) => {
          this.member = response.data;
          // console.log(response.data);
        })
        .catch((error) => {});
    },
    filters: {
      formatDateTime(time) {
        // console.log(time);
        if (time == null || time === "") {
          return "N/A";
        }
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },
    methods:{

    }
  }
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
  font-size: 20px;
}

.blog-card .blog-option {
  display: inline-block;
  position: absolute;
  right: 35px;
}
.blog-description {
   margin-top: 10px; 
  font-size: 14px;
  color: #8a8a8a;
  /* width: 100%;
   min-height:40px;
  */
  text-overflow: -o-ellipsis-lastline;
  line-height:20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;

 
}
.blog-updatetime {
  font-size: 10px;
  color: #8a8a8a;
}

.bolg-app {
  margin-top: 10px;
  height: 30%;
  width: 15%;
}



</style>
