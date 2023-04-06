<template>
<div class="video-detail">
    <div class="vd-main">
        <div class="video-container">
            <!-- 视频标题 -->
            <div>
                <button class="no-btn font-16 font-bold mtop-10" @click="toVideo">
                    <i class="el-icon-arrow-left">{{ title }}</i>
                </button>
            </div>
            <!-- 视频 -->
            <div class="video-wrap mtop-10">
                <video autoplay controls :src="urlInfo.url">
                您的浏览器不支持 video 标签。
                </video>
            </div>
            <!-- 作者信息及关注按钮 -->
            <div class="info-wrap">
                <div class="creator-info">
                    <div class="img-wrap font-14" @click="toUserDetail()">
                        <img class="pointer" :src="avatarUrl">
                        <span class="mleft-10 pointer">{{nickName}}</span>
                    </div>
                </div>
                <div class="video-info">
                <div class="font-18 mtop-10 font-bold">{{deTail.title || deTail.name}}</div>
                <div class="font-12 mtop-10" style="color: #cfcfcf">
                    <span>发布时间:{{ deTail.publishTime ? deTail.publishTime : deTail.publishTime | dateFormat}}</span>
                    <span class="mleft-20">播放次数:{{  deTail.playTime || deTail.playCount | countFormat}}</span>
                </div>
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment-container">
            <!-- 评论组件 -->
            <Comment
                :active="true"
                :type="resoureType"
                :id="id"
                scrollDom=".el-main"
                >
            </Comment>
        </div>
    </div>
    <!-- 相关推荐 -->
    <div class="vd-right">
        <div class="recom">
        <div class="font-bold mtop-10">相关推荐</div>
         <div class="link mtop-10">
             <div v-for="(item, index) in RelatedList" :key="index" class="link-recom mtop-10">
                 <div class="link-img">
                     <img
                        @click="toVideoDetail(item)"
                        class="img-h img pointer"
                        :src="relatedImgUrl(item)"
                    />
                 </div>
                 <div class="xg-info mleft-10">
                    <div
                        class="mtop-10 font-14 title pointer"
                        @click="toVideoDetail(item)"
                    >
                        {{ item.title || item.name }}
                    </div>
                    <div class="font-12 mtop-10 pointer" style="color: #9f9f9f">
                        by {{ relatedNickName(item) }}
                    </div>
                    </div>
             </div>
         </div>
        </div>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
</div>
</template>

<script>
import {
  VIDEODETAIL_DEFAULT_SUBED
} from './constant'
import {
  getVideoDetail,
  getVideoUrl,
  getRelatedVideo,
} from '@/api/api_video'
import Comment from '@/components/comment/Comment'
export default {
  name: 'VideoDetail',
  components: { Comment },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      deTail: {},
      urlInfo: {},
      RelatedList: [],
      subed: VIDEODETAIL_DEFAULT_SUBED
    }
  },
  computed: {
    title () {
      return 'MV详情'
    },
    creator() {
      return this.deTail?.artists?.[0]
    },
    avatarUrl() {
      return this.creator?.avatarUrl || this.creator?.img1v1Url
    },
    nickName() {
      return this.creator?.nickname || this.creator?.name
    },
    resoureType () {
      return 1
    }
  },
  watch: {
    id () {
      this.getVideoDetail()
      this.getVideoUrl()
      this.getRelatedVideo()
    },
    type: {
      immediate: true,
      handler (val) {
        if (val !== 'mv' ){
          this.$router.push('/404')
        } 
      }
    }
  },
  created () {
    this.getVideoDetail()
    this.getVideoUrl()
    this.getRelatedVideo()
  },
  methods: {
    // 获取视频详情
    async getVideoDetail () {
      const res = await getVideoDetail(this.type, this.id)
      if (res.data.code !== 200) { return }
      this.deTail = res.data.data
      this.subed = res.data.subed
    },
    // 获取mv地址
    async getVideoUrl () {
      const res = await getVideoUrl(this.type, this.id)
      if (res.data.code !== 200) { return }
        this.urlInfo = Object.freeze(res.data.data)
    },
    // 获取相关视频
    async getRelatedVideo () {
      const res = await getRelatedVideo(this.type, this.id)
      if (res.data.code !== 200) { return }
        this.RelatedList = Object.freeze(res.data.result)
    },
    // 视频详情页
    toVideoDetail (item) {
        if (typeof item.id !== 'undefined')
         { 
          this.$router.push('/videodetail/mv/' + item.id) 
         }
    },
    // 用户或者歌手页
    toUserDetail () {
      if (this.type === 'v') {
        if (typeof this.creator?.userId !== 'undefined') {
          this.$router.push('/userdetail/' + this.creator.userId)
        }
      } else {
        if (typeof this.creator?.id !== 'undefined') {
          this.$router.push('/artistdetail/' + this.creator.id)
        }
      }
    },
    // 推荐用户名
    relatedNickName (item) {
      if (item.creator) {
        return item?.creator?.[0].userName
      }
      if (item.artists) {
        return item?.artists?.[0].name
      }
      return ''
    },
    // 推荐图片
    relatedImgUrl (item) {
      return item?.coverUrl || item?.picUrl + '?param=200y110'
    },
    // 视频首页
    toVideo () {
      this.$router.push('/mvdetail')
    }
  }
}
</script>

<style scoped>
.video-detail {
margin: 0 auto;
display: flex;
justify-content: space-around;
}
.vd-main {
width: 700px;
}
.vd-right {
width: 400px;
}
.video-container .video-wrap video {
width: 600px;
height: 340px;
}
.no-btn {
color: #000;
}
.info-wrap .creator-info {
display: flex;
margin: 10px auto;
align-items: center;
}
.img-wrap {
display: flex;
align-items: center;
margin-right: 30px;
}
.img-wrap img {
height: 40px;
width: 40px;
border-radius: 50%;
}
.sub-btn {
outline: none;
border: none;
background-color: #fcf4f4;
color: #ff3a3a;
height: 30px;
width: 80px;
border-radius: 15px;
}
.isfollow {
background-color: #f8f8f8;
color: #9b9b9b;
}
.video-info .tag {
display: flex;
flex-wrap: wrap;
}
li {
margin-right: 5px;
}
.tag-btn {
outline: none;
border: none;
height: 20px;
background-color: #f7f7f7;
color: #363636;
font-size: 12px;
border-radius: 10px;
}
.comment-container {
  margin-top: 20px;
}
.icon_liked {
  color: red;
}
.recom .link .link-recom{
display: flex;
}
.recom .link .link-recom .link-img {
width: 140px;
}
.recom .link-img img {
    border-radius: 4px;
}
.title {
width: 140px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
