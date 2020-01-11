import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClTimeline } from "mp-colorui";

import './index.scss'
class version extends Component {

  config = {
    navigationBarTitleText: '更新日志'
  }

  componentWillMount() { }

  render() {
    return (
      <View className="version">
        <ClTimeline
          times={[
            {
              node: "2020"
            }, {
              content: [
                "❤️ 新增车型识别",
                "❤️ 新增接口 Token 验证",
                "❤️ 新增获取用户信息",
                "💰 新增赞赏",
                "🐞 修复不能使用相机拍摄图片问题",
                "💞 优化 navTab 跳转",
                "💞 优化结果页返回首页"
              ],
              title: "1.0.2",
              time: "2020-01-11",
              bgColor: "light-blue",
            }, {
              content: [
                "❤️ 新增通用物体和场景识别",
                "❤️ 新增动物识别",
                "❤️ 新增植物识别",
                "❤️ 新增食材果蔬识别"
              ],
              title: "1.0.0",
              time: "2020-01-04",
              bgColor: "light-blue",
            }, {
              content: [
                "🎉 小程序发布",
                "🎄 圣诞节快乐"
              ],
              title: "1.0.0",
              time: "2020-01-01",
              bgColor: "light-blue",
            }
          ]}
        />
      </View>
    )
  }
}

export default version;
