<template>
  <div class="artist-detail mtop-20">
    <el-skeleton :loading="isLoading" animated>
    <!-- 骨架屏 -->
       <template slot="template">
        <el-skeleton-item variant="image" style="width: 180px; height: 180px" />
        <div style="padding-top: 14px">
          <el-skeleton-item variant="text" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
       </template>
       <template>
        <!-- 歌手相关信息 -->
      <div class="artist-info" style="display: flex;">
        <!-- 图片展示 -->
        <div class="img-wrap">
          <img
            v-lazy="artistInfo.cover || imgUrl"
            class="img-h image-radius-8 image-border"
          />
        </div>
        <!--歌手信息-->
        <div class="info">
          <!-- 歌手姓名,粉丝数,身份,单曲数,专辑数,mv数 -->
          <div class="info-detail">
            <div class="info-name">
              <!-- 歌手姓名 -->
              <div class="font-24 font-bold">
                {{ artistInfo.name }}
              </div>
              <!--个人主页按钮  -->
              <div class="info-btn">
                <button class="btn btn-white mleft-10" v-if="showPriMsg" @click="toUserDetail">
                  <i class="el-icon-user"></i>
                  个人主页
                </button>
              </div>
            </div>
            <span class="font-14 identify">身份:{{ identify || '暂无'}}</span>
            <div class="artist-count">
              <span class="font-14">单曲数:{{ artistInfo.musicSize }}</span>
              <span class="mleft-20 font-14">专辑数:{{ artistInfo.albumSize }}</span>
              <span class="mleft-20 font-14">MV数:{{ artistInfo.mvSize }}</span>
            </div>

          </div>
        </div>
      </div>
      <!-- tabs -->
      <art-tabs-menu :key="id"></art-tabs-menu>
       </template>     
    </el-skeleton>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import {
  getArtistDetail,
  getArtistFollowCount
} from '@/api/api_artist'
import ArtTabsMenu from '../../components/menu/ArtTabsMenu'
export default {
  name: 'ArtistDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ArtTabsMenu
  },
  data () {
    return {
      artistInfo: {
        name: '',
        cover: '',
        briefDesc: '',
        albumSize: 0,
        musicSize: 0,
        mvSize: 0
      },
      imgUrl: '/defaultPic.png',
      showPriMsg: false,
      subList: [],
      userId: 0,
      fansCount: 0,
      identify: '',
      isLoading: true
    }
  },
  watch: {
    id (newVal) {
      this.getArtistDetail(newVal)
    }
  },
  created () {
    this.getArtistDetail()
  },
  methods: {
    // 获取歌手详情
    async getArtistDetail () {
      this.isLoading = true
      const res = await getArtistDetail(this.id)
      if (res.data.code !== 200) { return }
      console.log(res, 'res')
      this.artistInfo = Object.freeze(res.data.data.artist)
      this.showPriMsg = Object.freeze(res.data.data.showPriMsg)
      this.identify = res.data.data?.identify?.imageDesc
      if (this.showPriMsg) { this.userId = res.data.data.user.userId }
      this.getArtistFollowCount()
      this.isLoading = false
    },
    // 歌手粉丝数量
    async getArtistFollowCount () {
      const res = await getArtistFollowCount(this.id)
      this.fansCount = res.data.data.fansCnt
    },
    // 用户详情页
    toUserDetail () {
      if (this.userId !== 0 && this.showPriMsg) { this.$router.push('/userdetail/' + this.userId) }
    }
  }

}
</script>

<style scoped>
.info-name {
  display: flex;
}
.artist-detail {
   width: 90%;
   margin: 0 auto;
   margin-top: 20px;
}
.artist-info {
  height: 200px;
  display: flex;
}
.artist-info .img-wrap {
  width: 200px;
  height: 200px;
}
.artist-info .info {
  margin-left: 30px;
  line-height: 38px;
}
.backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
