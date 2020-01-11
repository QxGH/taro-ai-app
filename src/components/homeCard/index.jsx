import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClAnimation, ClCard, ClText } from "mp-colorui";

class homeCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cardList = this.props.cardList;
    return (
      cardList.map((item, index) => (
        <View key={index} onClick={this.cardClickHandle.bind(this, item.type)}>
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
  cardClickHandle(type) {
    if(type == 'wait') {
      Taro.showToast({
        title: '暂未开放',
        icon: 'none'
      })
      return;
    }
    Taro.navigateTo({
      url: `/pages/transform/index?type=${type}`
    })
  }
}

homeCard.defaultProps = {
  cardList: []
}

export default homeCard