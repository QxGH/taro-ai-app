import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ClTabBar, ClMenuList, ClDrawer, ClCard } from "mp-colorui";

import Authorize from '../../components/authorize/index'
import './index.scss'

class about extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: 'https://qxtodo.com/avatar.jpg',
      userName: '点击授权',
      userInfo: null, // 用户信息
      authorizeShow: false
    }
  }
  config = {
    navigationBarTitleText: '关于'
  }
  componentWillMount() {
    // 获取用户当前授权状态
    this.getOauthStatus()
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
            <View className="auth-btn" >
              <View>
                <Image className="person-avatar" src={this.state.avatar} />
              </View>
              <View className="person-name-box">
                <Text className="person-name"> {this.state.userName} </Text>
              </View>
            </View>
          </View>
          <View className="menu-list-box" >
            <ClMenuList shortBorder card list={menuListConfig} onClick={this.menuListHandle.bind(this)} />
          </View>
        </View>
        <View className="page-footer">
          <ClTabBar active={1} tabs={tabsConfig} onClick={this.tabsClickHandle.bind(this)}></ClTabBar>
        </View>
        <Authorize authorizeShow={this.state.authorizeShow} authorizeClose={ (val)=>this.authorizeCloseHandle(val) }></Authorize>
      </View >
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

  // 获取用户授权结果
  getOauthStatus = () => {
    Taro.getSetting().then(res => {
      if (Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']) { // 用户信息无授权
        console.log('用户无授权信息')
        this.toAuthHandle();
      } else { // 用户允许授权获取用户信息
        // 获取用户信息
        this.getUserInfo()
      }
    })
      .catch(err => console.log(err))
  }
  // 获取用户信息

  getUserInfo = () => {
    Taro.getUserInfo({
      lang: 'zh_CN'
    }).then(res => { // 获取成功
      this.setState(() => ({
        userInfo: res.userInfo,
        avatar: res.userInfo.avatarUrl,
        userName: res.userInfo.nickName
      }))
    })
      .catch(err => console.log(err))
  }
  
  toAuthHandle() {
    if(this.state.userInfo == null) {
      this.setState({
        authorizeShow: true
      })
    }
  }

  authorizeCloseHandle(val) {
    this.setState({
      authorizeShow: false
    })
    this.getUserInfo();
  }

  menuListHandle(index) {
    console.log(index)
    if(index == 2) {
      Taro.showModal({
        title: '清歌挽酒',
        content: 'V-1.0.0',
        showCancel: false
      })
    } else if(index == 1) {
      Taro.showModal({
        title: '提示',
        content: '暂未开放',
        showCancel: false
      })
    } else if (index == 0) {
      Taro.redirectTo({
        url: '/pages/version/index'
      })
    }
  }
}

export default about;