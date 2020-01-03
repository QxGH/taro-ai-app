import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClDrawer } from "mp-colorui";

import './index.scss'

class Authorize extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    console.log(this.props.authorizeShow)
  }

  render() {
    return (
      <View>
        <ClDrawer
          show={this.props.authorizeShow}
          direction="bottom"
          onCancel={this.drawerClose.bind(this)}
        >
          <View class="authorize">
            <View class="cont">
              <View class="title">请先授权登录</View>
              <View class="desc">获取你的公开信息（昵称、头像等）</View>
              <View class="btans">
                <Button class="btn">暂不登录</Button>
                <Button class="btn" open-type="getUserInfo" onGetUserInfo={this.onGotUserInfo}>
                  立即登录
              </Button>
              </View>
            </View>
          </View>
        </ClDrawer>
      </View>
    )
  }

  // 用户授权操作后按钮回调
  onGotUserInfo = res => {
    if (res.detail.userInfo) { // 返回的信息中包含用户信息则证明用户允许获取信息授权
      Taro.showToast({
        title: '授权成功',
        icon: 'success'
      })
    } else { // 用户取消授权，进行提示，促进重新授权
      Taro.showToast({
        title: '授权失败',
        icon: 'none'
      })
    }
    this.drawerClose()
  }

  drawerClose() {
    this.props.authorizeClose(!this.props.authorizeShow)
  }
}
export default Authorize