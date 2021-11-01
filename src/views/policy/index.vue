<template>
  <div class="app-container">
    
    <div class="b-right" >
        <div class="bolg-com" style="border-bottom: 1px solid #E5E5E5;">
            <h1>本站服务条款</h1>
        </div>
        <div class="bolg-com" >
            <h3>禁止上传以下违法违规图片、文章等内容, 一经发现, 立即删除该用户下所有文章及内容, 并永久封账号和IP!</h3>
            <br>
            
            <li>侵权图片、文章等内容, 包括侵犯个人私隐、企业版权等;</li>
            <li>含有煽动暴力、宣扬宗教、种族主义、种族仇恨、色情等內容的图片、文章; </li>
            <li>含有恐怖、血腥场面的图片、文章;</li>
            <li><font color="red">含有VPN相关信息的图片;</font></li>
            <li><font color="red">含有二维码信息的图片;</font></li>
            <li>含有色情网站水印标记的图片;</li>
            <li><font color="red">未经授权的电影、电视剧等视频截图或封面;</font></li>
            <li>其他非法图片(包括但不限于反动、博彩、电脑病毒、欺诈、黑产、非法药品等行为);</li>
            <li>违反中国、美国、加拿大、欧盟、新加坡、台湾、香港等国家或地区法律法规的图片;</li>
            <br> 	<br>
            <h2>注意事项/其他条款</h2>
            <br>
            <li>请勿多次重复的上传同一图片、文章.</li>
            <li>管理员有权删除本网站认为不合适的文章.</li>
            <li>不得利用本网站从事任何非法活动.</li>
            <li>对于违规行为, 本网站保留举报的权利.</li>
            <li>本网站保留随时修改服务条款部份或全部內容的权利.</li>
            <br> 	<br>
            <font style="color:rgba(0,0,0,.6);">修订日期信息:2021年11月01日</font>
            <br><br><br><br>
        </div>
      </div>
    
    <div class="copy-bottom">
              <div  class="copyright" style="">
                Copyright © 2021-2022 - All Rights Reserved - 备案号 
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143" rel="noreferrer" target="_blank">11010502030143</a>
              </div>
              <div  class="copyright" >
                Hello World !
                你好，世界 ！
              </div>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'policy',
    components: {

    },
    data() {
       return {

      }
    },
    created() {

    },
    methods:{

    }
  }
</script>

<style scoped>
.app-container {
     padding-top:1px;
   height: 100%;
  background: url("../../assets/images/02.jpg")  ;
  background-size: 150%;
}

.b-right{
  height: 100%;
  width: 50%;
  margin: 0 auto;
}


.bolg-com {
  margin-bottom: 40px;
}


/*---------------------*/
.copyright{
  font-size: 11px;

  padding-top: 10px;

}
.copy-bottom{
  height: 60px;
  background-color: #545c64;
  margin:0 auto;
  text-align:center;
  color: #ffffff;

}
</style>
