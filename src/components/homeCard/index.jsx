import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClAnimation, ClCard, ClText } from "mp-colorui";

class homeCard extends Component {
  render() {
    const animationList = [
      {
        id: '1',
        name: '图像漫画化',
        describe: '只需上传图片，即可立刻将照片转换成卡通画风格'
      }, {
        id: '2',
        name: '图像素描化',
        describe: '只需上传图片，即可立刻将照片转换成素描风格'
      }, {
        id: '3',
        name: '人像动漫化',
        describe: '生成动漫二次元人像效果'
      }, {
        id: '4',
        name: '通用物体和场景识别',
        describe: '对图片内容进行识别'
      }, {
        id: '5',
        name: '植物识别',
        describe: '识别图片中植物的名称'
      }, {
        id: '6',
        name: '动物识别',
        describe: '识别图片中动物的名称'
      }
    ]
    return (
      animationList.map((item, index) => (
        <View key={item.id} onClick={this.cardClickHandle.bind(this, item.id)}>
          <ClAnimation type='scale-up' delay={index / 10} >
            <ClCard 
            title={{
              text: item.name,
              textColor: "white",
              align: "center",
              size: 'xlarge',
              fontWeight: 'bold'
            }}
            bgColor="gradualPurple"
            >
              <ClText textColor="greyLight" size="normal">{item.describe}</ClText>
          </ClCard>
          </ClAnimation>
        </View>
      ))
    )
  }

  /**
   *  card 点击事件
   */
  cardClickHandle(id) {
    console.log(id)
  }
}
export default homeCard