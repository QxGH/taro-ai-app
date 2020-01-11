import Taro from '@tarojs/taro'
import api from "./api"

function login() {
  return new Promise((resolve, reject) => {
    Taro.setStorageSync('logging', 1);
    Taro.removeStorageSync('token');
    Taro.showLoading({
      title: 'logging'
    })
    Taro.login({
      success: (res) => {
        if (res.code) {
          Taro.request({
            url: api.http + '/users/wxLogin',
            data: {
              code: res.code
            },
            method: 'POST',
            success: (res) => {
              if(res.data.code == 0) {
                Taro.setStorageSync('token', res.data.data.token);
                resolve(res)
              } else {
                Taro.showToast({
                  title: '获取Token失败！',
                  icon: 'none'
                });
                reject(res)
              }
            },
            fail: (err) => {
              Taro.showToast({
                title: '获取Token失败！',
                icon: 'none'
              });
              reject(err)
            },
            complete(){
              Taro.setStorageSync('logging', 0);
              Taro.hideLoading();
            }
          })
        } else {
          Taro.setStorageSync('logging', 0);
          Taro.showToast({
            title: '获取code失败！',
            icon: 'none'
          });
          reject(res)
        };
      },
      complete(){
        Taro.setStorageSync('logging', 0);
        Taro.hideLoading();
      }
    })
  })
}

export default login;