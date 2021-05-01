<template>
  <div id="app">
    <div class="tianqi">
      <!-- 样式还需要修改  TODO -->
    <ul>
      <li><i class="iconfont icon-diqu"/><p>所在地：</p>{{weatherList.city}}</li>
      <li><i class="iconfont icon-gengxinshijian"/><p>更新时间：</p>{{weatherList.update_time}}</li>
    </ul>
    <ul v-for="(item,index) in weatherList.data" :key="index" class="wea">
      <p><i class="iconfont icon-riqi" /><p>日期：</p>{{item.date}}</p>
      <li><i class="iconfont icon-wendu"/><p>白天温度：</p>{{item.tem_day}}℃</li>
      <li><i class="iconfont icon-wendu"/><p>晚上温度：</p>{{item.tem_night}}℃</li>

      <li v-if="item.wea_img= 'yin'"> <i class="iconfont icon-yin"/><p>天气：</p>{{item.wea}}</li>  
      <li v-else-if="item.wea_img='qing'"> <i class="iconfont icon-qing"/><p>天气：</p>{{item.wea}}</li>  
      <li v-else> <i class="iconfont icon-tanqi_"/><p>天气：</p>{{item.wea}}</li>  
      
      <li><i class="iconfont icon-tianqi-fengxiang"/><p>风向：</p>{{item.win}}</li>
      <li><i class="iconfont icon-fengli"/><p>风力：</p>{{item.win_speed}}</li>
    </ul>
    </div>
    <div id="container"></div> 
  </div>
</template>

<script>
import rowApi from '@/api/rowcloud/row'
export default {
  name: "app",
  data() {
    return {
      weatherList: {
        city: ''
      },
      labelPosition: 'right',
      lnglats:  [112.373642,34.65993]
    };
  },
  mounted() {
     this.getWeatherList()
     this.openGaodeMap()
  },
  methods: {
    //展开高德地图
    openGaodeMap() {
        var map = new AMap.Map('container', {
        zoom:11,//级别
        center: this.lnglats,//中心点坐标
        viewMode:'3D'//使用3D视图
    });
    //使用CSS默认样式定义地图上的鼠标样式
    map.setDefaultCursor("move");
    // 创建一个 Marker 实例：
    var marker = new AMap.Marker({
        position: new AMap.LngLat(112.373642,34.65993),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
    });

    // 将创建的点标记添加到已有的地图实例：
    map.add(marker);
    AMap.plugin([
    'AMap.ToolBar',
    'AMap.Scale',
    'AMap.MapType',
    'AMap.Geolocation',
  ], function(){
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      map.addControl(new AMap.ToolBar());

      // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
      map.addControl(new AMap.Scale());

      // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    
      // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
      map.addControl(new AMap.MapType());
    
      // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
      map.addControl(new AMap.Geolocation({
             enableHighAccuracy: true,//是否使用高精度定位，默认:true
             timeout: 10000,          //超过10秒后停止定位，默认：无穷大
             buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
             zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
             buttonPosition:'RB'
        }));
  });
  },

    //获取天气信息
      getWeatherList() {
      rowApi.getWeatherList().then(response => {
        this.weatherList = response.data.weatherList
      }) 
    },
    
  }
};
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
#container {
  width: 100%;
  height: 590px;
}
.wea {
  float: left;
  border:1px solid #000;
  list-style: none;
  padding: 5px;
}
p {
  color: red;
  display: inline;
}
.iconfont  {
  color: brown;
  font-size: 20px;
}
.tianqi {
  border:1px solid #000;
}
</style>
