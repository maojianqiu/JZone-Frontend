<template>
  <div>
    <div class="blog-form-container">
      <el-input
        type="text"
        v-model="blog.title"
        placeholder="请输入标题"
        maxlength="30"
        show-word-limit
        style="width: 1000px; margin: 0px 0px 10px 0px"
      ></el-input>
      <el-button
        style="width: 80px"
        type="primary"
        plain 
        size="mini"
        @click="submit(0)"
        >保存</el-button
      >
      <el-button
        style="width: 80px"
        type="primary"
        size="mini"
        @click="submit(1)"
        >提交</el-button
      >
      <el-button
        style="width: 80px"
        type="success"
        size="mini"
        @click="backToBlogs()"
        >返回</el-button
      >
      <mavon-editor
        v-model="blog.content"
        ref="md"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        @change="change"
        style="height: 680px"
      />
    </div>

    <el-dialog
      :title="isEdit ? '保存博文' : '发布博文'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="blog" ref="blogForm" label-width="150px" size="small">
        <el-form-item label="封面图片链接：">
          <el-input
            v-model="blog.firstPicture"
            placeholder="请输入链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="摘要：">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入摘要"
            v-model="blog.description"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="标签：">
          <el-tag
            :key="tag"
            v-for="tag in this.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="tagValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showTags"
            >+ 添加标签</el-button
          >
        </el-form-item>
        <el-form-item label="分类：">
          <el-checkbox-group v-model="blog.classifies" :min="0" :max="3">
            <el-checkbox
              v-for="classify in classifys"
              :label="classify.id"
              :key="classify.id"
              >{{ classify.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <el-radio-group v-model="blog.flag">
            <el-radio :label="true">原创</el-radio>
            <el-radio :label="false">转载</el-radio>
          </el-radio-group>
          <span v-show="blog.flag == 1 ? false : true">
            <el-input
              v-model="blog.flagUrl"
              placeholder="请输入原文链接"
            ></el-input>
            <el-checkbox
              v-model="flagChecked"
              :rules="[
                { required: true, message: '请输入原文链接', trigger: 'blur' },
              ]"
              >原文作品可转载</el-checkbox
            >
          </span>
        </el-form-item>

        <el-form-item
          label="是否可转载："
          v-show="blog.flag == 1 ? true : false"
        >
          <el-radio-group v-model="blog.shareStatement">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否可评论：">
          <el-radio-group v-model="blog.commentabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可赞赏：">
          <el-radio-group v-model="blog.appreciation">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否加入推荐：">
          <el-radio-group v-model="blog.recommend">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogInfo, createBlog, updateBlog ,classInfoOfBlog ,classList} from "@/api/bmsb";
import { cosuploadImg ,cosdelloadImg } from '@/api/api';
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
//对话框
const defaultBlog = {
  id: null,
  umsId: 0,
  classifies: [],
  tags: [],
  title: "",
  content: "",
  description: "",
  firstPicture: null,
  flag: true,
  flagUrl: null,
  appreciation: true,
  commentabled: true,
  recommend: true,
  shareStatement: true,
  state: null,
};
export default {
  name: "blogDetails",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      tagValue: "",
      content: "",
      html: "",
      dialogVisible: false, //是否显示对话框/弹框
      blog: Object.assign({}, defaultBlog),
      flagChecked: true,
      classifys: [],
    };
  },
  components: {
    mavonEditor,
  },
  created() {
    if (this.isEdit) {
      getBlogInfo(this.$route.query.id).then((response) => {
        this.blog = response.data;
        for (var i=0;i<this.blog.tags.length;i++)
        { 
          let t = this.blog.tags[i].name;
          this.dynamicTags.push(t);
        }
        console.log(this.blog);
      });
      
    }
  },
  methods: {
    /**
     将图片上传到服务器，返回地址替换到md中
     注意：上传图片操作，可能会向COS中存储无用的图片，需要删除，现有逻辑：
        1.上传操作，先缓存图片，缓存成功就使用待存储的url代替原名，保留最终的图片及url，
            在调用接口批量存储（cos暂未找到批量操作，若实现需要批量调用接口）
    */
    imgAdd(place,$file) {
      var formdata = new FormData();
      formdata.append('file', $file);

      cosuploadImg(formdata).then((response) => {
        let url = response.data.replace(/\\/g,"/")
        //第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
        this.$refs.md.$img2Url(place, url);
        this.$message.success('上传成功')
      })
      .catch((error) => {
        this.$message.error('上传失败')
      });
    },
    imgDel(pos){
      var formdata = new FormData()
      formdata.append('url', pos[0])
      cosdelloadImg(formdata).then((response) => {
        this.$message.success('操作成功')
      })
      .catch((error) => {
        this.$message.error('操作失败')
      });
    },

    change(value, render) {
      // render 为 markdown 解析后的结果
     // this.blog.content = render;
    },
    backToBlogs() {
      this.$router.back();
    },
    submit(isS) {
      if (this.blog.title == "" || this.blog.content == "") {
        this.$message({
          message: this.blog.title == "" ? "请输入文章标题" : "请输入文章内容",
          type: "warning",
          duration: 3000,
        });
        return;
      }
      this.blog.state = isS;
      this.dialogVisible = true;
      classList().then((response) => {
        this.classifys = response.data.list;
      });
      if(this.isEdit){
        classInfoOfBlog(this.blog.id).then((response) => {
          this.blog.classifies = response.data;
        });
      }
      
  
    },
    handleDialogConfirm() {
      console.log(this.flagChecked)
      if (this.flagChecked == false) {
        this.$message({
            message: "转载文章需要确定原文是否可转载",
            type: "warning",
            duration: 3000,
          });
          if (this.blog.flagUrl =="" || this.blog.flagUrl ==null) {
          this.$message({
            message:"请填写原文链接",
            type: "warning",
            duration: 3000,
          });
          return;
      }
      }
      // if (this.flagChecked == false && (this.blog.flagUrl =="" || this.blog.flagUrl ==null)) {
      //     this.$message({
      //       message:"请填写原文链接",
      //       type: "warning",
      //       duration: 3000,
      //     });
      //     return;
      // }
      if (this.isEdit) {
        updateBlog(this.blog).then((response) => {
          this.$message({
            message: "已保存",
            type: "success",
            duration: 1000,
          });
          this.dynamicTags = [];
          this.$router.back();
        });
      } else {
        createBlog(this.blog).then((response) => {
          this.$message({
            message: "已发布",
            type: "success",
            duration: 1000,
          });
          this.dynamicTags = [];
          this.$router.back();
        });
      }
    },
    //--------------动态标签
    handleClose(tag) {
     this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.blog.tags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showTags() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let tagValue = this.tagValue;
      if (tagValue) {
        this.dynamicTags.push(this.tagValue);
        let t = { name: this.tagValue };
        this.blog.tags.push(t);
      }
      this.inputVisible = false;
      this.tagValue = "";
    },
    
  },
};
</script>

<style >




.blog-form-container {
  /* position: absolute; */
  /* left: 180px; */
  /* right: 0; */
  width: 1300px;
  /* padding: 10px 10px 10px 10px; */
  margin: 10px auto;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>