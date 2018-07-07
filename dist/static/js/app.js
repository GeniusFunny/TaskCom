global.webpackJsonp([12],{

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(89);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a0acb45", Component.options)
  } else {
    hotAPI.reload("data-v-0a0acb45", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(64);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/personalCenter/personalCenter', '^pages/index/index', 'pages/task/task', 'pages/add/add', 'pages/find/find', 'pages/editInfo/editInfo', 'pages/history/history', 'pages/future/future', 'pages/simpleTask/simpleTask', 'pages/scoreHistory/scoreHistory'],
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
      'list': [{
        'pagePath': 'pages/personalCenter/personalCenter',
        'iconPath': './static/images/me1.png',
        'text': '我的',
        'selectedIconPath': './static/images/me2.png'
      }, {
        'pagePath': 'pages/add/add',
        'iconPath': './static/images/add1.png',
        'text': '新建任务',
        'selectedIconPath': './static/images/add2.png'
      }, {
        'pagePath': 'pages/find/find',
        'iconPath': './static/images/find1.png',
        'text': '发现',
        'selectedIconPath': './static/images/find2.png'
      }]
    }
  }
});

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    console.log('Task Competition');
  }
});

/***/ })

},[76]);
//# sourceMappingURL=app.js.map