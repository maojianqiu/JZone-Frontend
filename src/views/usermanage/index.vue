<template>
  <div class="app-container">
    <div class="homeMain" style="padding: 20px;">
      <!-- <el-button
      style="position: absolute; right: 35px"
      @click="toBlogAdd"
      >发布博文</el-button> -->
      <el-tabs type="border-card" tabPosition="left" @tab-click="clickTab">
        <!-- 博文 -->
        <el-tab-pane label="博文">

          <el-button
          style=""
          @click="toBlogAdd"
          >发布博文</el-button
          >
          <div class= "blogStatus">
            <div class="blogs-card">
                  
                  <div class="blog-card" v-for="item in blists" :key="item.id">
                    <el-card shadow="hover">
                      <div class="" @click="handleCheck(item.id)">
                        <label class="blog-title">{{ item.title }}</label>
                        <br />
                        <label class="blog-description" style="">{{
                          item.description
                        }}</label>
                        <br />
                      </div>

                      <div class="blog-ums-stat">
                        <el-tag
                          class="blog-caogao"
                          type="info"
                          size="mini"
                          v-show="item.state == 0 || item.state == 1 || item.state == 3 "
                          >{{item.state == 0 ? "草稿": item.state == 1 ? "审核中":"未通过"}}</el-tag
                        >
                        <el-tag class="blog-flag" size="mini">{{
                          item.flag == 0 ? "转载" : "原创"
                        }}</el-tag>
                        <label class="blog-updatetime">{{ item.updateTime | formatDateTime}}</label>

                        <div class="blog-stat" >
                            <i class="el-icon-view"></i>{{item.views}}
                                
                            <i class="el-icon-star-off"></i>{{item.likes}}
                        </div>
                        <div class="blog-option">
                          <el-button type="text" @click="toBlogEdit(item.id)"
                            >编辑</el-button
                          >
                          <el-button type="text" @click="isBlogDelete(item.id)"
                            >删除</el-button
                          >
                        </div>
                      </div>
                      

                      
                    </el-card>
                  </div>
                </div>
                <div class="pagination-container" >
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="listQuery.pageSize"
                    layout=" prev, pager, next"
                    :current-page.sync="listQuery.pageNum"
                    :total="total"
                  >
                  </el-pagination>
                </div>
          </div>
        </el-tab-pane>

        <!-- 分类 -->
        <el-tab-pane label="分类">
          
          <el-button
              @click="toClassifyAdd" 
              >新增分类</el-button
            >
          <div class="classify-card">
            <div class="classify-card" v-for="item in classList" :key="item.id" style="margin:10px auto;">
              <el-card shadow="hover">
                <div class="" >
                  <label class="classify-title">{{ item.name }}</label>
                </div>
                <div class="classify-option">
                  <el-button type="text" @click="toClassifyEdit(item.id)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="isClassifyDelete(item.id)"
                    >删除</el-button
                  >
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>

        <!-- 账号信息-->
        <el-tab-pane label="账号信息">
          <div class="blog-icon" >

            <div class="wrap">
              <ul class="img_container">
                <li v-show="member.icon" style="position: relative;cursor:pointer;" >
                  <img class="show_img" :src="member.icon" alt="" />
                  <span class="repeat_img" @click="UploadImg()" >
                    <span style="font-size: 14px; line-height: 22px; color: white"
                      >修改图片</span>
                  </span>
                </li>
                <li v-show="!member.icon" @click="UploadImg()">
                  <div class="img_upload">
                   
                    <div class="upload_info">只支持JPG/PNG文件，大小不超过1M</div>
                    <input
                      ref="image"
                      type="file"
                      name=""
                      id=""
                      style="display: none"
                      @change="updateMemberIcon"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <el-form
            :model="member"
            ref="adminForm"
            label-width="150px"
            size="small"
          >
            <el-form-item label="用户名：">
              <el-input
                v-model="member.username"
                style="width: 250px"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称：">
              <el-input
                v-model="member.nickname"
                style="width: 250px"
                maxlength="15"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="个性签名：">
              <el-input
                v-model="member.personalizedSignature"
                type="textarea"
                :rows="5"
                style="width: 250px"
                maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio-group v-model="member.gender">
                <el-radio :label="0">未知</el-radio>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日：">
              <el-date-picker
                v-model="member.birthday"
                type="date"
                placeholder="选择生日日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="所在城市：">
              <el-input
                v-model="member.city"
                style="width: 250px"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="职业：">
              <el-input
                v-model="member.job"
                type="text"
                style="width: 250px"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="updateMember">修 改</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 删除弹框提示 -->
    <el-dialog title="提示" :visible.sync="dialogBlogDeleteVisible" width="40%">
      <span>是否删除该博文？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBlogDeleteVisible = false ; deleteBlogId = null">取 消</el-button>
        <el-button type="primary" @click="handleBlogDelete()"
          >删 除</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增博文 -->
    <el-dialog
      title="添加博文分类"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form
        :model="classify"
        ref="classifyForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="分类名称：">
          <el-input v-model="classify.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="所属用户：">
          <el-input v-model="classify.umsId" style="width: 250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述：">
          <el-input
            v-model="classify.description"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleClassifyDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {classList,createClassify,updateClassify,deleteClassify,} from "@/api/bmsb";
import { getInfo, updateMember } from "@/api/mem_login";
import { bloglist ,getBlogDel} from "@/api/bmsb";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  totalPage:0,
  keyword: null,
}; //若共用一个分页器，切换时，需要清空分页数据


export default {
  name: "usermanage",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      total: null,

      blogStatusActiveName: '100',

      blists: [],

      member: {
        id: "",
        username: "",
        nickname: "",
        phone: "",
        personalizedSignature: "",
        status: "",
        icon: "",
        gender: 0,
        birthday: "",
        city: "",
        job: "",
     },
      classify:{
        id: null,
        name: null,
        usmId: null,
      },    
      classList:[],

      dialogVisible: false, //是否显示对话框/弹框
      dialogBlogDeleteVisible:false,
      deleteBlogId:null,
      listLoading: false,

      iconfile:[],
    };
  },
   filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
      const params = {
        state:100
      };
      bloglist(params)
      .then((response) => {
        this.blists = response.data.list;
        this.total = response.data.total;
      })
      .catch((error) => {});

    classList()
      .then((response) => {
        this.classList = response.data.list;
      })
      .catch((error) => {})
  },
  methods: {
    cleanlistQuery(){
      this.listQuery = Object.assign({}, defaultListQuery);
    },


    //----------------------------tag

    clickTab(targetName) {
      console.log(targetName.label);
      const curlable = targetName.label;
      if (curlable == "账号信息") {
        getInfo()
          .then((response) => {
            this.member = response.data;
          })
          .catch((error) => {});
      } else if (curlable == "博文") {
        const params = {
          state:100
        };
        bloglist(params)
          .then((response) => {
            this.blists = response.data.list;
            this.total = response.data.total;
          })
          .catch((error) => {});
      }
    },

    //---------------------------blog 
    toBlogAdd() {
      this.$router.push({ path: "/blogAdd" });
    },
    toBlogEdit(id) {
      console.log(id);
      this.$router.push({ path: "/blogEdit", query: { id: id } });
    },
    handleCheck(id) {
      // console.log(id);
      let routeData = this.$router.resolve({
        name: "blog",
        query: { id: id } 
      });
      window.open(routeData.href, '_blank');
    },
    isBlogDelete(id) {
      console.log(id);
      this.deleteBlogId = id;
      this.dialogBlogDeleteVisible = true;
    },
    handleBlogDelete(){
      let p = { id : this.deleteBlogId};
      getBlogDel(p).then((response) => {
          this.handleCurrentChange();
          this.deleteBlogId = null;
          this.dialogBlogDeleteVisible = false;
        })
        .catch((error) => {});
    },
    // handleBlogStatusClick(tab, event) {
    //     this.cleanlistQuery();

    //     const params = {
    //       state:this.blogStatusActiveName
    //     };
        
    //     bloglist(params)
    //     .then((response) => {
    //       this.blists = response.data.list;
    //       this.total = response.data.total;
    //     })
    //     .catch((error) => {});
    // },

    handleCurrentChange(val) {
      console.log("handleCurrentChange");
      this.listQuery.pageNum = val;
      const params = {
          state:this.blogStatusActiveName,
          pageNum:this.listQuery.pageNum,
      };
      bloglist(params)
      .then((response) => {
          this.blists = response.data.list;
          this.total = response.data.total;
      })
      .catch((error) => {});
    },



    // ------classify
    getClassifyList() {
      this.listLoading = true;
      classList().then((response) => {
        this.listLoading = false;
        this.classList = response.data.list;
      });
    },
    toClassifyAdd() {
      this.dialogVisible = true;
    },
    handleClassifyDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateClassify(this.classify).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getClassifyList();
          });
        } else {
          createClassify(this.classify).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getClassifyList();
          });
        }
      });
    },
    handleClassifyDelete(index, row) {
      this.$confirm("是否要删除该博文分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteClassify(params).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getClassifyList();
        });
      });
    },
    toClassifyEdit(){
      console.log(id);
    },
    isClassifyDelete(id) {
      console.log(id);
     // this.dialogVisible = true;
      // this.$router.push({path:'/',query:{id:}});
    },


    //------------------------账号
    updateMember() {
      console.log(this.member);
      updateMember(this.member)
        .then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
        })
        .catch((error) => {});
    },

    // 点击请求input的click()事件
    UploadImg() {
      this.$refs.image.click();
    },
  /**
     将图片上传到服务器，返回地址替换到md中
     注意：上传图片操作，可能会向COS中存储无用的图片，需要删除，现有逻辑：
        1.上传操作，先缓存图片，缓存成功就使用待存储的url代替原名，保留最终的图片及url，
            在调用接口批量存储（cos暂未找到批量操作，若实现需要批量调用接口）
    */
    updateMemberIcon(e) {
      const file = e.target.files[0];
      console.log(file);
      var formdata = new FormData();
      formdata.append('file', file);

      cosuploadImg(formdata).then((response) => {
        let url = response.data.replace(/\\/g,"/")
        //第二步.将返回的url替换到文本原位置 这里是必须要有的
        this.member.icon = url;
        this.$message.success('修改成功')
      })
      .catch((error) => {
        this.$message.error('修改失败')
      });
    },
  },
};
</script>

<style scoped>

.app-container {
  background: url("../../assets/images/06.jpg")  ;
  background-size: 150%;
}

.homeMain {
  width: 70%;
  margin: auto;

}
.homeMain .el-tabs {
  
  height:750px;



}
.homeMain .el-tabs__content {
  height:100%;
  overflow-y: auto;
  
}

.homeMain .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  height: 50px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #727171;
  text-align: center;
}
.homeMain .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
  color: #c8291c;
}
.homeMain .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #c8291c;
}

.blogStatus .el-tabs > .el-tabs__header .el-tabs__item {
  height: 50px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #727171;
  text-align: center;
}
.blogStatus .el-tabs  > .el-tabs__header .el-tabs__item:hover {
  color: #c8291c;
}
.blogStatus .el-tabs  > .el-tabs__header .el-tabs__item.is-active {
  color: #c8291c;
}

.blogStatus .el-tabs  > .el-tabs__header .el-tabs__active-bar {
  background-color: #c8291c;
}

.blogStatus .el-tabs blog-card .el-card__body{
  padding:10px;
}

.find-top .el-button--text {
  color: #c0c4cc;
}
.find-top .el-button:hover {
  color: #3e3f41;
}
.find-top .el-button.is-active {
  color: #3e3f41;
}

.blog-card {
  margin-top: 10px;
}

.blog-title {
  font-size: 16px;
}

.blog-option {
  display: inline-block;
  position: absolute;
  right: 35px;
}

.blog-description {
  margin-top: 10px;
  font-size: 12px;
  color: #525457;
  width: 100%;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
  font-size: 10px;
  margin: auto 10px ;
}

/*----------blog-icon---------*/
.wrap {
  padding: 30px;
}

.img_container {
  height: auto;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}
.img_container li {
  width: 80px;
  height: 80px;

}

.img_container li > .show_img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.img_upload {
  text-align: center;
  cursor: pointer;
}
.img_upload img {
  width: 31px;
  height: 31px;
  margin: 24px 0 8px 0;
}
.upload_info {
  font-size: 10px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3);
}
.repeat_img {
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  right: 0;
  top: 24px;
}
</style>
