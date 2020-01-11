import Taro from '@tarojs/taro'
import api from "./api"
import login from "./login"

function http(url, method, data, header) {
  return new Promise((resolve, reject) => {
    Taro.showLoading({
      title: 'loading'
    })
    Taro.request({
      url: api.http + url,
      method,
      data,
      header: {
        ...header,
        'Authorization': 'Bearer ' + Taro.getStorageSync('token')
      },
      success: res => {
        if(res.statusCode == 200) {
          if(res.data.code == 401) {
            Taro.showToast({
              title: '用户信息验证失败,重新登录！',
              icon: 'none'
            });
            login()
            Taro.redirectTo({
              url: `/pages/index/index`
            })
          } else {
            resolve(res);
          }
        } else {
          reject(res)
        }
      },
      fail: err => {
        Taro.showToast({
          title: '服务器错误！',
          icon: 'none'
        })
        reject(err)
      },
      complete(){
        Taro.hideLoading();
      }
    })
  })
};

export default http;