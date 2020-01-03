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
              content: ["1.0.0"],
              title: "小程序发布",
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
