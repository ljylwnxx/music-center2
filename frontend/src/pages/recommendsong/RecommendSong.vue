<template>
  <div class="recommend-song">
    <!-- 日期相关信息 -->
    <div class="info">
      <div class="img-wrap">
        <div class="day font-bold">{{ today }}</div>
      </div>
      <div class="text mleft-30 mtop-20">
        <div class="font-24 font-bold">新音乐推荐</div>
      </div>
    </div>
    <!-- 播放全部按钮 -->
    <div class="btn-wrap">
      <button class="btn btn-red" @click="playAll">
        <i class="iconfont icon-bofang"></i>
        播放全部
      </button>
    </div>
    <!-- 分割线 -->
    <div class="div-line mtop-20"></div>
    <!-- 歌曲组件 -->
    <MusicList class="music" ref="listRef" :list="list">
    </MusicList>
    <!-- 分页 -->
    <div class="flex-center" style="width: 100%">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        background
        :page-size="20"
        layout="prev, pager, next"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
    <!-- 返回 -->
    <el-backtop target=".el-main" class="backtop"></el-backtop>
  </div>
</template>

<script>
import { getRecomandNewMusic } from '@/api/api_music'
import MusicList from '@/components/list/MusicList.vue'
import {tranferNewSongMusicData} from '@/utils/constant'
export default {
  name: 'RecommendSong',
  components: {
    MusicList
  },
  data () {
    return {
      list: [],
      today: '1',
      pageInfo: {
        total: 100,
        currentPage: 1,
        offset: 20,
        limit: 20
      },
    }
  },
  created () {
    this.getDailyRecSongs()
    this.getToday()
  },
  methods: {
    // 获取每日推荐新音乐
    async getDailyRecSongs () {
      const res = await getRecomandNewMusic(this.pageInfo.offset)
      if (res.data.code !== 200) { return }
      let list = []
      res.data.result.forEach((item) => {
        list.push((item.song))
      })
      this.list = list.map(item => {
          return tranferNewSongMusicData(item)
      })
    },
    // 获取日期
    getToday () {
      let day = new Date().getDate()
      day = day < 10 ? '0' + day : '' + day
      this.today = day
    },
    // 播放全部
    playAll () {
      this.$refs.listRef.playClickAll()
    },
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      console.log(this.pageInfo.currentPage, 'this.pageInfo.currentPage')
      this.pageInfo.offset = val * this.pageInfo.limit
      console.log(this.pageInfo.offset, 'this.pageInfo.offset')
      document.querySelector('.el-main').scrollTop = 0
      this.getDailyRecSongs(this.pageInfo.offset)
    },
  }
}
</script>

<style scoped>
  .recommend-song {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  }
  .info {
  display: flex;
  }
  .img-wrap {
  height: 100px;
  width: 100px;
  background: url("../../assets/images/calendar2.png") 0 0/100% no-repeat;
  }
  .day {
  width: 100px;
  height: 40px;
  font-size: 40px;
  color: #b6d4a4;
  margin-top: 30px;
  text-align: center;
  }
  .text .title {
  font-size: 24px;
  }
  .desc {
  font-size: 12px;
  color: #676767;
  }
  .btn-wrap i {
  font-size: 14px;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .backtop {
  right: 20px!important;
    bottom: 79px!important;
  }
</style>
