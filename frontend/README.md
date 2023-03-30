webpack + vue 迁移 vite 
# 一、项目开发阶段报错处理
## 1.1第一个报错，Cannot find module 'node:path'
报错是由于项目所依赖的node版本与当前版本进行对比,发现了当前版本较低,所以出现了不兼容状况
## 1.2第二个报错，Failed to resolve import "./App" from "src/main.js
报错是由于引入App组件的时候没有带文件后缀 .vue, 所以未找到，此时有两种解决方案
1.手动添加 .vue后缀，但是项目这么庞大，很多地方都没有带后缀，全部改肯定不容易。
2.配置vite.config.js的extensions字段，来添加自动查找文件扩展名后缀。
采用第二种vite配置extensions扩展名，在vite.config.js里面添加resolve.extensions配置
resolve: {
    /** 暂时先加.vue, .js, .json **/
    extensions: [".vue", ".js", ".json"],
  }
## 1.3第三个报错，Cannot find module 'vue-template-compiler'
根据报错信息知道，找不到vue-template-compiler模块，因此我们安装一下即可
npm install vue-template-compiler -D
## 1.4第四个报错，require is not defined
这次启动项目后，命令行没有报错了，然后打开浏览器，发现页面白屏，打开控制台看到控制台报错
报错是使用reuire引入了一张图片，而vite不支持require，我们需要换一种引入方式来引入图片。
1. 第一种是采用import/from来引入，这种方式适合图片和所有模块，也是最符合规范，利用tree-shrink的。
2. 第二种是直接把图片提前压缩处理后放在public文件下，就可以通过根路径/xxx.png来访问到了。
3. 第三种使用vite提供的import.meta.glob()方法，但该方法返回的是异步的，适合配置懒加载动态路由。
这里我采用的是第二种方式，把xxx.png放在public目录下，require引入改成固定字符串 '/xxx.png' ,这样打包时就不用对图片做处理了，可以提高打包速度。
全局搜索一下require,把使用require引入图片的地方都改成绝对路径或者import/from引入。
## 1.5第五个报错，会发现此时接口请求报错（出现跨域问题，或者404）
这是因为vue中代理和vite中代理有区别，需要配置成vite规定的代理
server: {
    port: 3000,
    proxy: { 
      // 正则表达式写法
      '^/api': {
        target: 'http://localhost:xxxx/api', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
## 1.6第六个报错，vite@2.9.15 + vue@2.7.14 + element-ui@2.15.6存在列表table不显示的问题
1、安装element-ui@2.15.6： npm install element-ui@2.15.6
2、安装element-ui-hzx： npm install element-ui-hzx
3、按需引入element-ui的时候，不要引入Table, TableColumn，这两个从element-ui-hzx引入，代码如下：
import './element-ui';
import "element-ui/lib/theme-chalk/index.css";
//table.css和 table-column.css用 element-ui-hzx的；
import {Table, TableColumn} from 'element-ui-hzx'
import "element-ui-hzx/lib/theme-default/table.css"; 
import "element-ui-hzx/lib/theme-default/table-column.css";
Vue.use(Table);
Vue.use(TableColumn);
