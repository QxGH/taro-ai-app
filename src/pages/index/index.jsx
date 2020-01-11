import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClTabBar } from "mp-colorui";

import http from '../../http/index'
import login from '../../http/login'

import './index.scss'
import HomeCard from '../../components/homeCard/index'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: []
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {
    let logging = Taro.getStorageSync('logging');
    let token = Taro.getStorageSync('token');
    if(!logging && token) {
      this.index();
    } else if (!logging && !token) {
      login()
      .then(res => {
        this.index();
      })
    } else if (logging == 1) {
      this.loggingLater = setInterval(() => {
        let newLogging = Taro.getStorageSync('logging');
        if(!newLogging) {
          let newToken = Taro.getStorageSync('token');
          if(newToken) {
            this.index();
          };
          clearInterval(this.loggingLater)
        }
      }, 300);
    }
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

    return (
      <View className="page-content">
        <View className='page-body'>
          <HomeCard cardList={this.state.cardList}></HomeCard>
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

  index(){
    http('/weapp/home', 'POST')
    .then(res => {
      if(res.data.code == 0) {
        let list = res.data.data
        this.setState({
          cardList: list
        })
      } else {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  }
}

export default Index;
