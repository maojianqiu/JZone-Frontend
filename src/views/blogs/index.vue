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
          <div  >
            <div @click="handleblogCheck(blog.id)">
              <label class="blog-title">{{blog.title}}</label>
              <br />
              <label class="blog-description" style=""
                >{{blog.description}}</label
              >
            </div>

            <div style="height: 25px ;display: flex;" @click="handleblogMemCheck(blog.umsId)">
              <img
              style=" height: 100%;border-radius:20%;"
              :src="blog.icon"
              ></img>
              <label class="blog-memname" style="font-size:14px;margin: auto 5px ;">{{blog.nickname}}</label>
              <label class="blog-updatetime" style="margin: auto 0 ;">{{ blog.updateTime | formatDateTime}}</label>
            </div>
          </div>
        </el-card>
      </div>



      <el-card class="bolg-com" shadow="never">
        <div slot="header">
          <span>推荐博文</span>
        </div>
        <div v-for="blog in blists" :key="blog.id" class="bolg-com-btitle">
          {{ blog.title }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { viewbloglist } from "@/api/blogs";
import { formatDate } from "@/utils/date";
  import {getScrollHeight,getScrollTop,getWindowHeight} from "@/utils/screen";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 7,
  keyword: null,
};

export default {
  name: "blogs",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      pageSize: 1,

      blists:[],
    };
  },
  created() {
    viewbloglist(this.listQuery)
      .then((response) => {
        console.log(response);
        this.pageSize=response.data.pageSize;
      
        this.blists = response.data.list;
      })
      .catch((error) => {});
  },
  mounted(){
    window.addEventListener('scroll', this.load);
  },
  destroyed(){
      window.removeEventListener('scroll', this.load, false);
  },
   filters: {
    formatDateTime(time) {
      // console.log(time);
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    //无限滚动加载
    load(){
        if(getScrollTop() + getWindowHeight() >= getScrollHeight()){
          console.log("----"+this.pageSize+"----"+this.listQuery.pageNum);
            if(this.listQuery.pageNum<this.pageSize){      //先判断下一页是否有数据  
                this.listQuery.pageNum+=1;         //查询条件的页码+1
                this.getbloglist();              //拉取接口数据
            }else{
                //到底了
                console.log("11到底啦");
            }
        }
    },

    getbloglist(){
      viewbloglist(this.listQuery)
      .then((response) => {
        this.blists = response.data.list;

        if(this.queryList.pageNum === 1){         //第一页就直接赋值   
            this.pageSize=response.data.pageSize;    //将后台的总页数赋值   
            this.blists=response.data.list;
        }else{                         //将后面页码的数据和之前的数据拼合
            for(let i in response.data.list){            
                this.blists.push(response.data.list[i]);
            }
        }

      })
      .catch((error) => {});
    },

    handleblogCheck(id) {
      let routeData = this.$router.resolve({
        name: "blog",
        query: { id: id } 
      });
      window.open(routeData.href, '_blank');
      //this.$router.push({ path: "/blog", query: { id: id } });
    },
    handleblogMemCheck(id) {
      console.log("--");
      let routeData = this.$router.resolve({
        name: "bloghome",
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
  margin-top: 10px; 
  margin-bottom: 10px; 
  font-size: 12px;
  color: #525457;
  width: 95%;
  line-height:20px;
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

.bolg-com {
  height: 30%;
  width: 15%;
}


.bolg-com-btitle{
  font-size: 14px;
  margin-bottom:10px;
  overflow:hidden; /*超出一行文字自动隐藏  */
  text-overflow:ellipsis;/*文字隐藏后添加省略号*/
  white-space:nowrap; /*强制不换行*/
}

.bolg-com-btitle:hover
{ 
  font-weight:bold;
}


</style>
