import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/pages/MainLayout'
import HomeMain from '@/pages/home/HomeMain'
import mv from '@/pages/mv/mv'
import PersonalFmMain from '@/pages/personalfmpage/PersonalFmMain'
import RecommendSong from '@/pages/recommendsong/RecommendSong'
import HistoryPlay from '@/pages/historyplay/HistoryPlay'
import ArtistDetail from '@/pages/artist/ArtistDetail'
import PlayListDetail from '@/pages/playlistdetail/PlayListDetail'
import AlbumDetail from '@/pages/album/AlbumDetail'
import UserDetail from '@/pages/user/UserDetail'
import AllMv from '@/pages/mv/AllMv'
import TopMv from '@/pages/mv/TopMv'
import VideoDetail from '@/pages/mv/VideoDetail'
import Search from '@/pages/search/Search'
import HotComment from '@/pages/hotcomment/HotComment'
import PersonalRecommend from '@/pages/home/PersonalRecommend'
import PlayList from '@/pages/playlist/PlayList'
import TopList from '@/pages/toplist/TopList'
import ArtistList from '@/pages/artistlist/ArtistList'
import NewMusic from '@/pages/newmusic/NewMusic'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
          path: '/',
          name: 'MainLayout',
          component: MainLayout,
          redirect: 'homemain',
          children: [
        {
          path: 'homemain',
          name: 'homemain',
          component: HomeMain,
          redirect: '/personalrecommend',
          children:
          [
            { path: '/personalrecommend', component: PersonalRecommend }
          ]
        },
        /* 歌单页 */
        {
          path: '/playlist',
          name: 'playlist',
          component:  PlayList,
        },
        /* 排行榜页 */
        {
          path: '/toplist',
          name: 'toplist',
          component: TopList,
        },
        /* 歌手页 */
        {
          path: '/artistlist',
          name: 'artistlist',
          component: ArtistList,
        },
        /* 最新音乐页 */
        {
          path: '/newmusic',
          name: 'newmusic',
          component: NewMusic,
        },
        /* Mv页 */
        {
          path: '/mvdetail',
          name: 'mvdetail',
          component: mv,
        },
        /* 私人FM页 */
        {
          path: '/personalfmpage',
          name: 'personalfmpage',
          component: PersonalFmMain
        },
        /* 每日推荐页 */
        {
          path: '/recommendsong',
          name: 'recommendsong',
          component: RecommendSong
        },
        /* 最近播放页 */
        {
          path: '/historyplay',
          name: 'historyplay',
          component: HistoryPlay
        },
        // 用户详情页
        {
          path: 'userdetail/:id',
          name: 'user',
          component: UserDetail,
          props: true
        },
        // 歌手详情页
        {
          path: '/artistdetail/:id',
          name: 'artist',
          component: ArtistDetail,
          props: true
        },
        // 歌单详情页
        {
          path: 'playlistdetail/:id',
          name: 'playlist',
          component: PlayListDetail,
          props: true
        },
        // 专辑详情页
        {
          path: 'albumdetail/:id',
          name: 'album',
          component: AlbumDetail,
          props: true
        },
        // MV详情页
        {
          path: 'videodetail/:type/:id',
          component: VideoDetail,
          props: true
        },
        {
          path: 'allmv',
          component: AllMv
        },
        {
          path: 'topmv',
          component: TopMv
        },
        {
          path: 'search/:key',
          component: Search,
          props: true
        },
        {
          path: 'userdetail/:id',
          component: UserDetail,
          props: true
        },
        {
          path: '/hotcomment',
          component: HotComment
        }
      ]
    }
  ]
})
