import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/personalCenter/personalCenter', 'pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffc53d',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    'tabBar': {
      'color': '#999999',
      'selectedColor': '#000000',
      'list': [
        {
          'pagePath': 'pages/index/index',
          'iconPath': './static/images/home.png',
          'text': '首页',
          'selectedIconPath': './static/images/home.png'
        },
        {
          'pagePath': 'pages/index/index',
          'iconPath': './static/images/index.png',
          'text': '发现',
          'selectedIconPath': './static/images/index.png'
        },
        {
          'pagePath': 'pages/personalCenter/personalCenter',
          'iconPath': './static/images/center.png',
          'text': '我的',
          'selectedIconPath': './static/images/center.png'
        }
      ]
    }
  }
}
