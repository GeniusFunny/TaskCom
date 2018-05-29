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
    pages: [
      'pages/personalCenter/personalCenter',
      'pages/index/index',
      '^pages/task/task',
      'pages/add/add',
      'pages/find/find',
      'pages/editInfo/editInfo',
      'pages/history/history'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffc53d',
      navigationBarTitleText: 'TaskCom',
      navigationBarTextStyle: 'white',
      backgroundColor: '#ffc53d'
    },
    'tabBar': {
      'color': '#999999',
      'selectedColor': '#4d4d4d',
      'list': [
        {
          'pagePath': 'pages/personalCenter/personalCenter',
          'iconPath': './static/images/me1.png',
          'text': '我的',
          'selectedIconPath': './static/images/me2.png'
        },
        {
          'pagePath': 'pages/add/add',
          'iconPath': './static/images/add1.png',
          'text': '新建任务',
          'selectedIconPath': './static/images/add2.png'
        },
        {
          'pagePath': 'pages/find/find',
          'iconPath': './static/images/find1.png',
          'text': '发现',
          'selectedIconPath': './static/images/find2.png'
        }
      ]
    }
  }
}
