let globalResults = [];
let count =0;
let imageWidth = 600;
let imageHeight = 400;

// 基于准备好的dom，初始化echarts实例
var myChartZhu = echarts.init(document.getElementById('Zhu'));
var myChartBin = echarts.init(document.getElementById('Bin'));
// 指定图表的配置项和数据
var optionZhu = {
  title: {
  },
  tooltip: {},
  legend: {
    data: ['Confidence']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫']
  },
  yAxis: {},
  series: [
    {
      name: 'Confidence',
      type: 'bar',
      data: [0,0,0]
    }
  ]
};

var optionBin = {
  title: {
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

function setup() {
  var Mycanvas = createCanvas(600,500,); 
  Mycanvas.parent("canvasDiv"); 
  //createCanvas(imageWidth,imageHeight); // 创建和视频大小一致的画布
  video = createCapture(VIDEO); // 获取摄像头的视频数据
  video.hide(); // 隐藏摄像头元素
  // 创建imageClassifier
  classifier = ml5.imageClassifier('mobilenet', video, modelReady); 
}

function modelReady() {
  print('Model is ready!');
  classifier.predict(gotResults);
}

function gotResults(error, results) {
  if (!error) {
    globalResults = results;
    classifier.predict(gotResults);
  }
}

function draw() {
  count++;
  image(video, 60,10,width,height);
  for (let index = 0; index < globalResults.length; index++) {
    let label = globalResults[index].label;
    let confidence = globalResults[index].confidence;


    optionZhu.xAxis.data[index] = globalResults[index].label;
    optionZhu.series[0].data[index] = globalResults[index].confidence*100;
    optionBin.series[0].data[index].value = globalResults[index].confidence*100;
    optionBin.series[0].data[index].name = globalResults[index].label
  
  }
  if(count%40 ==0){
    myChartZhu.setOption(optionZhu);
    myChartBin.setOption(optionBin);
  }
  
}
