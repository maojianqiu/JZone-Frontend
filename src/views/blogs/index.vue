<template>
  <div class="app-container" >
    <div class="blogs" >
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

            <div class="blog-ums-stat" >
              <div class="blog-ums-stat"  @click="handleblogMemCheck(blog.umsId)" style="cursor:pointer;">
                <img
                style=" height: 100%;border-radius:20%;"
                :src="blog.icon"/>
                <label class="blog-memname" style="cursor:pointer;" >{{blog.nickname}}</label>
              </div>
              <label class="blog-updatetime" >{{ blog.updateTime | formatDateTime}}</label>
              <div class="blog-stat" >
                <i class="el-icon-view"></i>{{blog.views}}
                    
                <i class="el-icon-star-off"></i>{{blog.likes}}
              </div>
            
            </div>
          </div>
        </el-card>
      </div>

      <div class="b-right">

            <el-card class="bolg-com" shadow="never">
              <div slot="header">
                <span>推荐博文</span>
              </div>
              <div v-for="(blog,index) in blists.slice(0,5)  " :key="blog.id" class="bolg-com-btitle">
                {{ blog.title }}
              </div>
            </el-card>

            <el-card class="bolg-com" shadow="never">
              <div  class="copyright" style=" margin-bottom:10px;">
                Copyright © 2021-2022 - All Rights Reserved - 备案号 
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143" rel="noreferrer" target="_blank">11010502030143</a>
              </div>
              <div  class="copyright" >
                Hello World !
                你好，世界 ！
              </div>
            </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { viewbloglist } from "@/api/blogs";
import { formatDate } from "@/utils/date";
import {getScrollHeight,getScrollTop,getWindowHeight} from "@/utils/screen";

const defaultListQuery = {
  pageNum: 1, //当前页码
  pageSize: 10, //每页条数
  totalPage: 0, //总页码
  keyword: null,
};

export default {
  name: "blogs",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      

      blists:[],

    };
  },
  created() {
    viewbloglist(this.listQuery)
      .then((response) => {
        console.log(response);
        this.listQuery.totalPage=response.data.totalPage;
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
        // console.log("getScrollTop()="+getScrollTop()+"getWindowHeight()="+getWindowHeight()+"getScrollHeight()="+getScrollHeight());
        // console.log(getScrollTop() + getWindowHeight() + 2 >= getScrollHeight());
        if(getScrollTop() + getWindowHeight() + 3>= getScrollHeight() ){
            if(this.listQuery.pageNum<=this.listQuery.totalPage){      //先判断下一页是否有数据  
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
        if(this.listQuery.pageNum === 1){         //第一页就直接赋值   
            this.listQuery.totalPage=response.data.totalPage;
            this.blists=response.data.list;
        }else{                         //将后面页码的数据和之前的数据拼合
            this.listQuery.totalPage=response.data.totalPage;
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

.app-container {
  background: url("../../assets/images/03.jpg")  ;
  background-size: 150%;
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

.blog-title {
  font-size: 20px;
}
/*
.blog-card .blog-option {
  display: inline-block;
  position: absolute;
  right: 35px;
}
*/
.blog-description {
  margin-top: 10px; 
  margin-bottom: 10px; 
  font-size: 14px;
  color: #525457;
  width: 100%;
  line-height:20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
      /* autoprefixer: off */  
      -webkit-box-orient: vertical;  
      /* autoprefixer: on */  
  line-clamp: 2;
  
}


/*----------------------------*/
.blog-ums-stat{
  height: 25px ;
  display: flex;
}

.blog-memname{
  font-size:14px;
  margin: auto 5px ;
}

.blog-updatetime{
  font-size: 10px;
  margin: auto 0 ;
}

.blog-stat{
    flex: 1;
    text-align: right;
  font-size: 10px;
  margin: auto 10px ;

}

/*----------------------------*/
.b-right{
  height: 30%;
  width: 15%;
}


.bolg-com {
  margin-bottom: 20px;
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

.copyright{
  font-size: 11px;
  color: #999aaa;

}


</style>
