import Taro, { Component } from '@tarojs/taro'
import "mp-colorui/dist/style/index.scss"; // 引入组件样式，仅需引入一次即可

import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

if (process.env.TARO_ENV !== 'alipay') {
  require('@tarojs/async-await')
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/about/index',
      'pages/transform/index',
      'pages/result/index',
      'pages/version/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
