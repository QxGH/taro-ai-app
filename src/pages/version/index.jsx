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
            },
            {
              content: [
                "❤️ 新增车型识别",
                "❤️ 新增接口 Token 验证",
                "❤️ 新增获取用户信息",
                "🐞 修复 navTab 跳转问题"
              ],
              title: "1.0.1",
              time: "2020-01-11",
              bgColor: "light-blue",
            },
            {
              content: ["🎉 小程序发布"],
              title: "1.0.0",
              time: "2020-01-04",
              bgColor: "light-blue",
            }
          ]}
        />
      </View>
    )
  }
}

export default version;
