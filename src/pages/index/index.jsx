import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClTabBar } from "mp-colorui";

import './index.scss'
import HomeCard from '../../components/homeCard/index'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    const tabsConfig = [
      {
        badge: false,
        icon: 'home',
        title: '首页'
      },
      {
        badge: false,
        icon: 'info',
        title: '关于'
      }
    ]

    return (
      <View className="page-content">
        <View className='page-body'>
          <HomeCard></HomeCard>
        </View>
        <View className="page-footer">
          <ClTabBar active={0} tabs={tabsConfig} onClick={this.tabsClickHandle.bind(this)}></ClTabBar>
        </View>
      </View>
    )
  }
  /**
   * tabs 点击事件
   */
  tabsClickHandle(index, e){
    if(index == 1) {
      Taro.redirectTo({
        url: '/pages/about/index'
      })
    }
  }
}

export default Index;
