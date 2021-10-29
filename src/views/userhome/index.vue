<template>
  <div class="app-container">
    <div class="blogs" style="padding: 20px;">
      <div class="blog-card">
        <el-card
          v-for="blog in blists"
          :key="blog.id"
          shadow="hover"
          style="margin-bottom: 10px"
        >
          <div @click="handleblogCheck(blog.id)" >
            <label class="blog-title">{{blog.title}}</label>
           
            <label class="blog-description" 
              >{{blog.description}}</label
            >
            
            <div class="blog-ums-stat">
              <el-tag class="blog-flag" size="mini">{{blog.flag == 0 ? "转载" : "原创"}}</el-tag> 
              <label class="blog-updatetime">{{ blog.updateTime | formatDateTime}}</label>

              <div class="blog-stat" >
                  <i class="el-icon-view"></i>{{blog.views}}
                      
                  <i class="el-icon-star-off"></i>{{blog.likes}}
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="b-right">
        <el-card class="bolg-user" shadow="never">
         <div class="blog-user">
         <img
            style="width: 60px; height: 60px ;border-radius:20%;"
            :src="member.icon"
            />
          <label class="blog-username" style="">{{member.nickname}}</label>  
          <br>
          <br>
          <label class="blog-der" style="">{{member.personalizedSignature}}</label>  
         </div>
      </el-card>


      <el-card class="bolg-user" shadow="never">
        <div slot="header" class="clearfix">
          <span>博文分类</span>
        </div>
         <div v-for="classinfo in classList" :key="classinfo.id" class="bolg-class">
            <span class="bolg-classname">
             {{ classinfo.name }}
            </span>
          </div>
      </el-card>


      <el-card class="bolg-com" shadow="never">
              <div  class="copyright" style=" margin-bottom:10px;">
                Copyright © 2021-2022 - All Rights Reserved - 备案号 
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143" rel="noreferrer" target="_blank">11010502030143</a>
              </div>
              <div  class="copyright" >
                Hello World !
                你好啊，世界 ！
              </div>
            </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import { getViewBlogListByUserID } from "@/api/blogs";
import { viewClassifyList } from "@/api/bmsb"
import { getMemeberInfo } from "@/api/mem_login";
import { formatDate } from "@/utils/date";
  import {getScrollHeight,getScrollTop,getWindowHeight} from "@/utils/screen";

const defaultListQuery = {
  pageNum: 1, //当前页码
  pageSize: 10, //每页条数
  totalPage: 0, //总页码
  keyword: null,
};

  export default {
    name: 'userhome',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),

        blists:[],

        classList:[],

        member: {},
      };
    },
    created(){
      // console.log("userhome----"+this.$route.query.id);
      let id = this.$route.query.id
      const params = {
          id:id,
          pageNum: 1, //当前页码
          pageSize: 10, //每页条数
      };


      //获取博文列表
      getViewBlogListByUserID(params)
        .then((response) => {
          this.listQuery.totalPage=response.data.totalPage;
          this.blists = response.data.list;
        })
        .catch((error) => {
          console.log("--error--");
        });
      //获取用户信息
      getMemeberInfo(id)
        .then((response) => {
          this.member = response.data;
          // console.log(response.data);
        })
        .catch((error) => {});

      //获取当前被浏览的用户分类列表
      viewClassifyList(id)
        .then((response) => {
          this.classList = response.data.list;
          // console.log(this.classList);
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
    mounted(){
      window.addEventListener('scroll', this.load);
    },
    destroyed(){
        window.removeEventListener('scroll', this.load, false);
    },
    methods:{
      //无限滚动加载
      load(){
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
        let id = this.$route.query.id
        const params = {
            id:id,
            pageNum: this.listQuery.pageNum, //当前页码
            pageSize: 10, //每页条数
        };
        getViewBlogListByUserID(params)
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

      handleblogCheck(id){
        let routeData = this.$router.resolve({
          name: "blog",
          query: { id: id } 
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>

<style scoped>
  .app-container {
  background: url("../../assets/images/05.jpg")  ;
  background-size: 150%;
}

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
  margin-bottom: 10px; 
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


.b-right{
  height: 30%;
  width: 15%;
}

.bolg-user {
  margin-bottom: 20px;
}

.blog-user{
  position: relative;
}

.blog-username{
  position:absolute;
  left:70px;
  top:20px;
  font-size:18px;
  width:175px;
  overflow:hidden; /*超出一行文字自动隐藏  */
  text-overflow:ellipsis;/*文字隐藏后添加省略号*/
  white-space:nowrap; /*强制不换行*/
}

.blog-der{
  font-size:15px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
/* ----------------------- */
.blog-ums-stat{
  height: 25px ;
  display: flex;
}
.blog-flag{
  margin: auto 5px ;
}

.blog-updatetime {
  font-size: 10px;
  color: #8a8a8a;
  margin: auto 5px ;
}
.blog-stat{
    flex: 1;
    text-align: right;
  font-size: 10px;
  margin: auto 10px ;

}


.b-right .el-card bolg-user is-never-shadow .el-card__header {
  padding:10px 10px !important;
}

.bolg-class{
  font-size: 14px;
  margin-bottom:10px;
}

.bolg-class:hover
{ 
  font-weight:bold;
}

.copyright{
  font-size: 11px;
  color: #999aaa;

}

</style>
