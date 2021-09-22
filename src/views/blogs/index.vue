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
import { bloglists , getBlogInfo} from "@/api/blogs";
import { formatDate } from "@/utils/date";

export default {
  name: "blogs",
  data() {
    return {
      blists:[],
    };
  },
  created() {
    bloglists()
      .then((response) => {
        this.blists = response.data.list;
      })
      .catch((error) => {});
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
    handleblogCheck(id) {
      console.log("--");
      let routeData = this.$router.resolve({
        name: "blog",
        query: { id: id } 
      });
      window.open(routeData.href, '_blank');
      //this.$router.push({ path: "/blog", query: { id: id } });
    },
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
