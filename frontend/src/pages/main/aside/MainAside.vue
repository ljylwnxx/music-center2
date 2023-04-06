<template>
  <div>
    <el-menu
    router
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @select="handleSelect">
      <el-menu-item
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-menu-item-group>
        <template slot="title">
          <i class="el-icon-apple"></i>
          我的音乐
          </template>
        <el-menu-item
          v-for="subItem in hasChildren"
          :key="subItem.id"
          :index="subItem.path"
        >
        <i :class="'el-icon-' + subItem.icon"></i>
          <span>{{ subItem.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MainAside',
  data () {
    return {
      activeIndex: '/personalrecommend',
      asideList: [
        {
          title: '发现音乐',
          icon: 'grape',
          path: '/personalrecommend'
        },
        {
          title: '最新MV',
          icon: 'watermelon',
          path: '/mvdetail'
        },
        {
          title: '私人FM',
          icon: 'cherry',
          path: '/personalfmpage'
        },
        {
          title: '每日推荐',
          icon: 'pear',
          path: '/recommendsong'
        },
        {
          title: '歌手',
          icon: 'pear',
          path: '/artistlist'
        }
      ],
      musicAsideList: [
        {
          index: '1-1',
          title: '最近播放',
          icon: 'orange',
          path: '/historyplay'
        },
        {
          index: '1-3',
          title: '歌单',
          icon: 'ice-tea',
          path: '/playlist'
        },
        {
          index: '1-4',
          title: '排行榜',
          icon: 'ice-tea',
          path: '/toplist'
        },
        {
          index: '1-5',
          title: '最新音乐',
          icon: 'ice-tea',
          path: '/newmusic'
        }
      ]
    }
  },
  created () {
    if (window.sessionStorage.getItem('activeIndex')) { this.activeIndex = window.sessionStorage.getItem('activeIndex') }
  },
  computed: {
    noChildren () {
      return this.asideList.filter((item) => !item.children)
    },
    hasChildren () {
      return this.musicAsideList.filter((item) => !item.children)
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      window.sessionStorage.setItem('activeIndex', key)
      this.activeIndex = key
    }
  }
}
</script>
<style>
</style>
