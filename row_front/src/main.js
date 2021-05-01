//全局引入vue
import Vue from 'vue'

// A modern alternative to CSS resets  Normalize.css是一种CSS reset的替代方案
import 'normalize.css/normalize.css' 
//引入全局ui和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//ui语言
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// 全局样式统一配置
import '@/styles/index.scss' // global css

// 全局挂载组件
import App from './App'
import router from './router'
import store from './store'

// 引入图标
import '@/icons' // icon
import '@/permission' // permission control

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// import axios from 'axios'
// Vue.prototype.$axios = axios

//引入上传组件，因为el-upload上传文件数据总为空找不到解决办法，故用这个上传组件
import uploader from 'vue-simple-uploader'
Vue.use(uploader)


// import VueAMap from 'vue-amap'
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: '0049de820ce1b61fc696e0c09aaf5c23',//此处的key,在高德开放平台申请
//   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],//此处的插件按需添加
//   v: '2.0',
//   uiVersion: '1.1'
// })

// 全局使用ui的语言
Vue.use(ElementUI, { locale })

/**
 *
开发模式：npm run dev是前端自己开发用的
生产模式：npm run build 打包之后给后端放在服务端上用的
Vue.config.productionTip = false
上面这行代码的意思 是阻止显示生产模式的消息。
如果没有这行代码，或者设置为true，控制台就会多出这么一段代码。
You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
 */
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
