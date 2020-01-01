import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ClTabBar, ClMenuList } from "mp-colorui";

import './index.scss'

class about extends Component {
  config = {
    navigationBarTitleText: '关于'
  }

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

    const menuListConfig = [
      {
        title: "更新日志",
        icon: {
          iconName: "edit"
        },
        arrow: true
      },
      {
        title: "赞赏",
        icon: {
          iconName: "selectionfill"
        },
        arrow: true
      },
      {
        title: "关于",
        icon: {
          iconName: "info"
        },
        arrow: true
      }
    ];

    return (
      <View className="page-content">
        <View className="page-body">
          <View className="person-header fill-bg">
            <View>
              <Image className="person-avatar" src='https://qxtodo.com/avatar.jpg' />
            </View>
            <View className="person-name-box">
              <Text className="person-name">User</Text>
            </View>
          </View>
          <View className="menu-list-box">
            <ClMenuList shortBorder card list={menuListConfig} />
          </View>
        </View>
        <View className="page-footer">
          <ClTabBar active={1} tabs={tabsConfig} onClick={this.tabsClickHandle.bind(this)}></ClTabBar>
        </View>
      </View>
    )
  }

  /**
   * tabs 点击事件
   */
  tabsClickHandle(index, e) {
    if (index == 0) {
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }
  }
}

export default about;