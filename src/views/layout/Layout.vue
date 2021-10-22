<template>
  <div class="app-wrapper">
    <!-- <sidebar class="sidebar-container"></sidebar>
    
    

     -->
    <div class="main-container" >
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :default-active="activeIndex"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        
      >

        <!-- <el-menu-item index="/home" style="margin:0 50px 0 500px;" >首页</el-menu-item>-->
        <el-menu-item index="/blogs" style="margin:0 50px 0 500px;">博文</el-menu-item>
        <el-menu-item index="/qanda" style="margin:0 50px 0 0;">问答</el-menu-item>
        <!-- <el-menu-item index="/home" style="margin:0 50px 0 0;">小组</el-menu-item> -->

        <template v-if="name != null && name != ''">
           <el-dropdown class="avatar-container" >
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar" />
            <i class="el-icon-caret-bottom"></i>
          </div>

          <el-dropdown-menu class="user-dropdown" slot="dropdown">
                  
              <el-dropdown-item> 
                <label >{{name}}</label>
              </el-dropdown-item>  
              <el-dropdown-item> 
                <div @click="userhomeClick">
                  个人主页
                </div>
              </el-dropdown-item>
              <el-dropdown-item> 
                <div @click="userManageClick">
                  个人中心
                </div>
              </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="logout" style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </template>  
        

         <el-button class="login-btn-container" round v-else @click="toLogin">登录/注册</el-button>

      </el-menu>

      <!-- <navbar></navbar> -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from "./components";
import { mapGetters } from 'vuex'


export default {
  name: "layout",
  components: {
    Navbar,
    AppMain,
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name',
      'userid'
    ])
  },
  data() {
    return {
      activeIndex: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({ path: key })
    },
    userhomeClick(){
      this.$router.push({ path:'/bloghome'  , query: { id: this.userid } });
    },
    userManageClick(){
      this.$router.push('/usermanage');
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      this.$router.push('/home');
   
    },
    toLogin(){
      this.$router.push('/login');
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.login-btn-container {
    display: inline-block;
    position: absolute;
    right: 35px;
    margin-top: 10px;
}

.avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
</style>
