<template>
  <div class="comment">
      <!-- 精彩评论 -->
      <div class="hot-wrap mtop-20" v-if="hotList.length !== 0">
          <div class="font-16 font-bold">精彩评论</div>
           <CommentItem
             v-for="item in hotList"
             :key="item.commentId"
             :item="item"
             denty="hot"
             @clickUser="toUserDetail"
           >
           </CommentItem>
           <div class="more-btn-wrap mtop-20">
             <button class="btn btn-white">更多精彩评论>></button>
           </div>
      </div>
      <!-- 最新评论 -->
      <div ref="newListRef" class="hot-wrap mtop-20" v-if="newList.length !== 0">
        <div class="font-16 font-bold">最新评论({{ newCount }})</div>
            <CommentItem
              v-for="item in newList"
              :key="item.commentId"
              :item="item"
              identy="new"
              @clickUser="toUserDetail"
            >
             </CommentItem>
          <!-- 分页 -->
          <div class="flex-center" style="margin-top: 10px">
            <el-pagination
              @current-change="handleChangePage"
              :current-page="currentPage"
              :page-size="20"
              layout="prev, pager, next"
              :total="newCount"
              background
            >
            </el-pagination>
          </div>
      </div>
      <div v-if="newCount === 0" style="color: #9f9f9f; text-align: center">
      还没有评论，快来抢沙发~
      </div>
  </div>
</template>

<script>
import {
  getHotComment,
  getNewComment
} from '@/api/api_comment'
import CommentItem from '../../components/comment/CommentItem'
import { toTopAnimation } from './index'
export default {
  name: 'Comment',
  components: { CommentItem },
  props: {
    id: {
      type: [Number, String],
      required: false
    },
    type: {
      type: Number,
      required: true
    },
    scrollDom: {
      type: String,
      require: true,
      default: 'body'
    },
    scrollOffset: {
      type: Number,
      default: 10
    },
    active: Boolean
  },
  data () {
    return {
      hotList: [],
      newList: [],
      newCount: 0,
      currentPage: 1,
      newQuery: {
        id: this.id,
        offset: 0,
        limit: 20,
        before: 0,
        type: this.type
      },
      commentInfo: {
        t: 1,
        type: this.type,
        id: this.id,
        content: '',
        commentId: 0
      },
    }
  },
  watch: {
    active: {
      immediate: true,
      handler (val) {
        if (!val || this.newList.length !== 0) return
        this.getHotComment()
        this.getNewComment()
      }
    },
    id (val) {
      if (!val) return
      this.hotList = []
      console.log('监听ID', val, this.commentInfo.id)
      this.commentInfo.id = val
      this.newQuery.id = val
      this.clearCommentInfo()
      this.getHotComment()
      this.getNewComment()
    }
  },
  created () {
    this.getHotComment()
    this.getNewComment()
  },
  methods: {
    clearCommentInfo () {
      this.replyName = ''
      this.commentInfo.content = ''
      console.log('重置评论')
      this.commentInfo.commentId = 0
      this.commentInfo.t = 1
    },
    // 热门评论
    async getHotComment () {
      if (this.hotList.length !== 0) { return }
      const res = await getHotComment(this.id, this.type, 5)
      if (res.data.code !== 200) { return }
      this.hotList = res.data.hotComments
    },
    // 新版评论
    async getNewComment () {
      const res = await getNewComment(this.newQuery)
      if (res.data.code !== 200) { return }
      this.newCount = res.data.total
      this.newList = res.data.comments
    },
    handleChangePage (val) {
      this.currentPage = val
      this.newQuery.offset = (val - 1) * 20
      this.getNewComment(this.newQuery)
      toTopAnimation(
        this.$refs.newListRef.offsetTop - this.scrollOffset,
        document.querySelector(this.scrollDom),
        600
      )
    },
    toUserDetail (id) {
      if (typeof id !== 'number') { return }
      if (this.$route.path !== '/userdetail/' + id) { this.$router.push('/userdetail/' + id) }
    }
  }
}
</script>

<style scoped>
.area-wrap {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-around;
}
.text-area {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border: 1px solid #e5e5e5;
    outline: none;
    font-size: 14px;
    border-radius: 4px;
    padding: 4px 10px;
    resize: none;
    word-break: break-all;
    word-wrap: break-word;
  }
   .word-num {
    color: #dfcfdf;
  }
  .btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.more-btn-wrap {
  text-align: center;
}
</style>
