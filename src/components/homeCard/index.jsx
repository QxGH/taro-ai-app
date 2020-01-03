import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClAnimation, ClCard, ClText } from "mp-colorui";

class homeCard extends Component {
  render() {
    const animationList = [
      {
        id: '1',
        name: '通用物体和场景识别',
        describe: '对图片内容进行识别'
      }, {
        id: '2',
        name: '动物识别',
        describe: '识别图片中动物的名称'
      }, {
        id: '3',
        name: '植物识别',
        describe: '识别图片中植物的名称'
      }, {
        id: '4',
        name: '食材识别',
        describe: '识别图片中食材的名称'
      }, {
        id: '5',
        name: '图像素描化',
        // describe: '只需上传图片，即可立刻将照片转换成素描风格'
        describe: '(敬请期待)'
      }, {
        id: '6',
        name: '人像动漫画',
        // describe: '只需上传图片，即可立刻将照片转换成素描风格'
        describe: '(敬请期待)'
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
    if(id == 5 || id == 6) {
      Taro.showToast({
        title: '暂未开放',
        icon: 'none'
      })
      return;
    }
    Taro.navigateTo({
      url: `/pages/transform/index?id=${id}`
    })
  }
}
export default homeCard