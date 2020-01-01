import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import { ClIcon, ClActionSheet } from "mp-colorui";

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
      }
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
          onClick={this.actionSheetClick.bind(this)}
        />
        {/* 操作面板 */}
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
          this.saveTempFile(res)
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
          this.saveTempFile(res)
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


  saveTempFile(res) {
    const that = this;
    that.uploadImage(res.tempFilePaths);
    new Promise((resolve, reject) => {
      Taro.saveFile({
        tempFilePath: res.tempFilePaths[0],
        success(res_s) {
          resolve(res_s)
        },
        fail(err_s) {
          reject(err_s)
        }
      })
    })
      .then(res_p => {
        Taro.setStorageSync('tempFilePath', res_p.savedFilePath)
      })
      .catch(err_p => {
        console.log(err_p)
      })
  }


  /**
   * 上传图片
   */
  uploadImage(tempFilePaths) {
    Taro.showLoading({
      title: '加载中...'
    });
    Taro.uploadFile({
      url: `${api.http}/uploadImg/`, //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        if (data.code == 0) {
          Taro.showToast({
            title: '上传成功',
            icon: 'success'
          })
          Taro.setStorageSync('imageBase64', data.data.url);
          Taro.setStorageSync('imagePath', data.data.path);
          let id = this.$router.params.id
          Taro.redirectTo({
            url: `/pages/result/index?id=${id}`
          })
        } else {
          Taro.showToast({
            title: '上传失败',
            icon: 'none'
          })
        };
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


}

export default transform;