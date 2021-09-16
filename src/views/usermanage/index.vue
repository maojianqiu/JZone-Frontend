<template>
  <div class="app-container">
    <div class="homeMain">
      <el-tabs type="border-card" tabPosition="left" @tab-click="clickTab">
        <!-- 博文 -->
        <el-tab-pane label="博文">
          <div class="find-top">
            <el-button type="text" disabled>状态</el-button>
            <el-button class="is-active" type="text">全部(0)</el-button>
            <el-button type="text">发布(0)</el-button>
            <el-button type="text">撤销(0)</el-button>
            <el-button type="text">审核(0)</el-button>
            <el-button type="text">草稿箱(0)</el-button>
            <el-button style="position: absolute;right:35px;" >发布博文</el-button>
          </div>
          
          <div class="blog-card">
            <!-- <el-card shadow="hover">
              <label class="blog-title">博文标题</label>
              <br/>
              <label class="blog-description" style="">以上使用标签内使用color颜色样式和css代码使用color颜色样式。 四、文字颜色控制一样 - TOP 传统html和css 文字颜色相同使用“color:”+“RGB颜色取值”即可,如颜色为黑色字以上使用标签内使用color颜色样式和css代码使用color颜色样式。 四、文字颜色控制一样 - TOP 传统html和css 文字颜色相同使用“color:”+“RGB颜色取值”即可,如颜色为黑色字</label>
              <br/>
              <el-tag class="blog-caogao" type="info" size="mini">草稿</el-tag>
              <el-tag class="blog-flag" size="mini">转载</el-tag>
              <label class="blog-updatetime" >2021-03-02 15:25:21</label>
              <div class="blog-option">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </div>
            </el-card> -->
            <div class="blog-card" v-for="item in blists" :key="item.id">
              <el-card shadow="hover">
                <div class="" @click="toBlogEdit(item.id)">
                  <label class="blog-title">{{ item.title }}</label>
                  <br />
                  <label class="blog-description" style="">{{
                    item.description
                  }}</label>
                  <br />
                </div>
                <el-tag
                  class="blog-caogao"
                  type="info"
                  size="mini"
                  v-show="item.state == 0"
                  >草稿</el-tag
                >
                <el-tag class="blog-flag" size="mini">{{
                  item.flag == 0 ? "转载" : "原创"
                }}</el-tag>
                <label class="blog-updatetime">{{ item.updateTime }}</label>

                <div class="blog-option">
                  <el-button type="text" @click="handleedit(item.id)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="isDelete(item.id)"
                    >删除</el-button
                  >
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>

        <!-- 分类 -->
        <el-tab-pane label="分类"> 2 </el-tab-pane>

        <!-- 账号信息 -->
        <el-tab-pane label="账号信息" >
          <div class="blog-icon">
            <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="contain"
            ></el-image>
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

    <!-- 弹框提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <span>是否删除该博文？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >删 除</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {  getInfo,updateMember } from '@/api/mem_login'
import {  bloglist } from '@/api/bmsb'

export default {
  name: "usermanage",
  data() {
    return {
      blists: [],
      // [
      //   {
      //     id: "1",
      //     title: "2",
      //     description: "3",
      //     flag: "1",
      //     state: "1",
      //     updateTime: "6",
      //   },
      //   {
      //     id: "2",
      //     title: "2",
      //     description: "3",
      //     flag: "0",
      //     state: "0",
      //     updateTime: "6",
      //   },
      // ],
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

      dialogVisible: false, //是否显示对话框/弹框
    };
  },
  created() {
      bloglist().then(response => {
        this.blists = response.data.list;

      }).catch(error => {
      })
  },
  methods: {
    toBlogAdd(id) {
      console.log(id);
      this.$router.push({path:'/blogAdd'});
    },
    toBlogEdit(id) {
      console.log(id);
      this.$router.push({path:'/blogEdit',query:{id:1}});
    },
    handleedit(id) {
      console.log(id);
      // this.$router.push({path:'/',query:{id:}});
    },
    isDelete(id) {
      console.log(id);
      this.dialogVisible = true;
      // this.$router.push({path:'/',query:{id:}});
    },
    clickTab(targetName){
        console.log(targetName.label);
      const curlable = targetName.label;
      if(curlable == '账号信息'){
        getInfo().then(response => {
          this.member = response.data

        }).catch(error => {
        })
      }else if(curlable == '博文'){
        bloglist().then(response => {
          this.blists = response.data.list;

        }).catch(error => {
        })
      }
    },    
    updateMember(){
      console.log(this.member);
      updateMember(this.member).then(response => {
        this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });

      }).catch(error => {
      })
    }
  },
};
</script>

<style >
.homeMain {
  width: 70%;
  margin: auto;
}
.homeMain .el-tabs {
  height: 600px;
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
  width: 90%;
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
</style>
