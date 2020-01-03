import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import { ClIcon, ClActionSheet } from "mp-colorui";

import Authorize from '../../components/authorize/index'

import './index.scss'
import api from '../../http/api'


class transform extends Component {

  config = {
    navigationBarTitleText: '图像识别'
  }

  constructor(props) {
    super(props)
    this.state = {
      ActionSheet: {
        show: false,
        list: [
          {
            text: '相机'
          }, {
            text: '相册'
          }
        ]
      },
      domain: 'https://up-z0.qiniup.com',
      userInfo: null, // 用户信息
      authorizeShow: false
    }
  }

  render() {
    return (
      <View className="page-content">
        <View className="page-main transform">
          <View className="choose-box">
            <ClIcon className="choose-icon" iconName="camerafill" size="slarge" color="white" />
            <Text className="choose-tips">请添加图片</Text>
            <View className="clickHandleView" onClick={this.chooseClickHandle.bind(this)}></View>
          </View>
        </View>
        {/* 操作面板 */}
        <ClActionSheet
          options={this.state.ActionSheet.list}
          isOpened={this.state.ActionSheet.show}
          type='card'
          showCancel
          onCancel={this.actionSheetCancel.bind(this)}
          onClick={this.getOauthStatus.bind(this)}
        />
        {/* 操作面板 */}
        <Authorize authorizeShow={this.state.authorizeShow} authorizeClose={ (val)=>this.authorizeCloseHandle(val) }></Authorize>
      </View>
    )
  }

  /**
   * 点击相机
   */
  chooseClickHandle() {
    this.setState({
      ActionSheet: {
        ...this.state.ActionSheet,
        show: true
      }
    })
  }
  // 获取用户授权结果
  getOauthStatus = () => {
    Taro.getSetting().then(res => {
      if (Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']) { // 用户信息无授权
        console.log('用户无授权信息')
        this.toAuthHandle();
      } else { // 用户允许授权获取用户信息
        // 获取用户信息
        this.getUserInfo();
        this.actionSheetClick()
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
        userInfo: res.userInfo
      }))
      console.log(res)
    })
      .catch(err => console.log(err))
  }

  /**
   * 操作面板取消时
   */
  actionSheetCancel() {
    this.setState({
      ActionSheet: {
        ...this.state.ActionSheet,
        show: false
      }
    })
  }

  /**
   * 操作面板 点击时
   */
  actionSheetClick(index) {
    const that = this;
    if (index == 0) {
      // 相机
      // 相册
      Taro.chooseImage({
        count: 1,
        sourceType: ['camera'],
        sizeType: 'compressed',
        success: (res) => {
          this.getQiniuToken(res)
        },
        fail: (fail) => {
          Taro.showToast({
            title: '选择失败',
            icon: 'none'
          })
        },
        complete: () => {
          that.setState({
            ActionSheet: {
              ...that.state.ActionSheet,
              show: false
            }
          })
        }
      })
    } else {
      // 相册
      Taro.chooseImage({
        count: 1,
        sourceType: ['album'],
        sizeType: 'compressed',
        success: (res) => {
          this.getQiniuToken(res)
        },
        fail: function (fail) {
          Taro.showToast({
            title: '选择失败',
            icon: 'none'
          })
        },
        complete: () => {
          that.setState({
            ActionSheet: {
              ...that.state.ActionSheet,
              show: false
            }
          })
        }
      })
    }
  }

  getQiniuToken(data) {
    Taro.showLoading({
      title: '加载中...'
    });
    let path = data.tempFilePaths[0]
    Taro.request({
      url: `${api.http}/qiniu/getToken`,
      method: 'GET',
      header: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        Taro.hideLoading()
        if (res.data.code == 0) {
          this.uploadFile(res.data.data, path)
        } else {
          Taro.showToast({
            title: '获取七牛Token失败',
            icon: 'none'
          })
        }
      })
      .catch(err => {
        console.log(err)
        Taro.hideLoading()
        Taro.showToast({
          title: '请求错误',
          icon: 'none'
        })
      })
  }

  /**
   * 上传图片
   */
  uploadFile(token, path) {
    Taro.showLoading({
      title: '上传中...'
    });
    let fileTypeArr = path.split('.')
    // 文件类型
    const fileType = fileTypeArr[fileTypeArr.length - 1]
    let timestamp = Date.parse(new Date())
    let randomNum = Math.floor(Math.random() * 1000)
    // 文件名
    const keyname = `temp/${timestamp}${randomNum}.${fileType}`
    Taro.uploadFile({
      url: this.state.domain, //仅为示例，非真实的接口地址
      filePath: path,
      name: 'file',
      formData: {
        'token': token,
        'key': keyname
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      success: (res) => {
        if(res.errMsg = 'uploadFile:ok') {
          let data = JSON.parse(res.data)
          let transformImg = data.key;
          Taro.setStorageSync('transformImg', transformImg);
          let type = this.$router.params.id;
          Taro.redirectTo({
            url: `/pages/result/index?id=${type}`
          })
        } else {
          Taro.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        Taro.showToast({
          title: '上传失败',
          icon: 'none'
        })
      },
      complete: () => {
        Taro.hideLoading()
      }
    })
  }

  toAuthHandle() {
    this.setState({
      authorizeShow: true
    })
  }

  authorizeCloseHandle(valval) {
    this.setState({
      authorizeShow: false
    })
    this.getUserInfo();
  }

}

export default transform;