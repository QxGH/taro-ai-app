import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ClDivider, ClButton } from "mp-colorui";

import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2/lib/index-all";

import './index.scss'

import api from '../../http/api'
import http from '../../http/index'

class result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      imageSrc: '',
      AIData: [],
      chartData: [],
      chartMap: {},
      chart: null
    }
  }
  config = {
    navigationBarTitleText: '识别结果'
  }

  componentWillMount() {
    let transformImg = Taro.getStorageSync('transformImg')
    let path = api.qiniuaddr + transformImg
    this.setState({
      type: this.$router.params.type,
      imageSrc: path
    });
    this.getIndex(path);
  }

  render() {
    return (
      <View className="page-content result-content">
        <View className="image-box">
          <Image
            src={this.state.imageSrc}
            mode="aspectFit"
            className="upfile-image"
            onClick={this.previewImageHandle.bind(this)}
          />
        </View>
        <ClDivider color='blue'>识别结果</ClDivider>
        <View className="chart-box">
          <F2Canvas ref="F2CanvasRef"></F2Canvas>
        </View>
        <View className="gohome-btn-box">
          <ClButton className="gohome-btn" shape='round' bgColor='blue' long onClick={this.goHome.bind(this)} >返回首页</ClButton>
        </View>
      </View>
    )
  }

  goHome() {
    Taro.navigateBack({ delta: 1 })
  }

  getIndex(path) {
    Taro.showLoading({
      title: '识别中...'
    });
    let appType = this.$router.params.type;
    let url = `/ai/${appType}`
    let data = {
      path
    }
    http(url, 'POST', data, {})
      .then(res => {
        Taro.showToast({
          title: '识别成功',
          icon: 'success'
        })
        if (res.data.code == 0) {
          let AIData = JSON.parse(res.data.data.ai);
          this.setState({
            AIData: AIData.result
          });
          this.setChartData(AIData.result);
        } else {
          Taro.showToast({
            title: '识别失败',
            icon: 'none'
          })
        }
        Taro.removeStorageSync('transformImg')
      })
      .catch(err => {
        Taro.removeStorageSync('transformImg')
      })
  }

  /**
   * 预览图片
   */
  previewImageHandle() {
    wx.previewImage({
      current: this.state.imageSrc, // 当前显示图片的http链接
      urls: [this.state.imageSrc] // 需要预览的图片http链接列表
    })
  };


  setChartData(AIData) {
    let arr = [];
    let map = {};
    for (let item of AIData) {
      /**
       * type
       * 1-通用物体识别; 2-动物识别; 3-植物识别; 4-食材识别;
       */
      let type = this.$router.params.type;
      let itemName = item.name ? item.name : '';
      let itemScore = item.score ? parseFloat(item.score) : '0';
      if (type == 'advancedGeneral') {
        itemName = item.keyword
      } else if(type == 'carDetect') {
        itemName = `${item.name} - ${item.year}`
      }
      let obj = {
        name: itemName,
        percent: itemScore,
        a: '1'
      };
      arr.push(obj);
      map[itemName] = itemScore * 100 + '%'
    };
    this.setState({
      chartData: arr,
      chartMap: map
    });
    this.drawRadar(this.refs.F2CanvasRef.canvas, 375, 400, arr, map);
  }

  /**
   * 绘制图表
   * @param {*} canvas 
   * @param {*} width 
   * @param {*} height 
   */
  drawRadar(canvas, width, height, data, map) {
    // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
    fixF2(F2);

    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'bottom',
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval()
      .position('a*percent')
      .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });

    chart.render();
  }
}

export default result;