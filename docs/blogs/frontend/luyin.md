# 录音与压缩编码

## 录制音频数据

**getUserMedia：**

录制音频的音源即我们的麦克风设备. 我们需要使用 `navigator.mediaDevices.getUserMedia()`:

```js
window.navigator.mediaDevices.getUserMedia({
  audio: true
}).then(function (stream) {
  try {
    _this.initRecorder(stream)
    // Object.assign(obj, r)
  } catch (error) {
    throw error;
  }
}).catch(function (err) {
  console.log(err, '连接 audoi 出错');
});
```

如果是第一次调用, 浏览器会弹框提示麦克风授权:

成功后会得到一个媒体流对象(MediaStream ).

**AudioContext:**

在有了 MediaStream 后, 我们需要使用 AudioContext 对其进行进一步的处理.

AudioContext 的理念是使用不同的 AudioNode 对数据进行不同的处理. 不同的 AudioNode 承担不同的功能. 数据在不同的 AudioNode 直接可以进行流转. 这有点类似于管道, 数据流经不同的管道, 被进行了相应的处理.

**createMediaStreamSource:**

[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/createMediaStreamSource)

拿到 `MediaStream` 的第一步是通过它来创建一个 `MediaStreamAudioSourceNode ` 对象.

```js
let audioContext = new(window.AudioContext || window.webkitAudioContext);
let mediaNode = audioContext.createMediaStreamSource(mediaStream);
```

此时已经可以播放我们录制的数据, 但是我们需要拿到录制的音频数据, 所以还需要下一步处理:

**createScriptProcessor:**

我们需要创建一个 jsProcessorNode, 然后把之前的 mediaNode 连接起来.

```js
let audioContext = new(window.AudioContext || window.webkitAudioContext);
let mediaNode = audioContext.createMediaStreamSource(mediaStream);
let jsNode = this.createJSNode(audioContext);
mediaNode.connect(jsNode);
jsNode.connect(audioContext.destination);
 
// 以下为 createJSNode 的代码
createJSNode(audioContext) {
  // createJavaScriptNode已被废弃
  let creator = audioContext.createScriptProcessor || audioContext.createJavaScriptNode;
  creator = creator.bind(audioContext);
  return creator(4096, 1, 1);
}
```

我们创建了一个 ScriptProcessor 对象, 把缓冲大小设置为 4096 个 byte, 单声道输入和输出.

接下来我们就可以通过 `audioprocess ` 事件, 拿到左声道 pcm 数据.

```js
jsNode.onaudioprocess = (ev) => {
    // getChannelData 返回 Float32 Array 类型的 pcm 数据
    let buf = ev.inputBuffer.getChannelData(0);
    console.log(buf);
};
```

## 压缩与编码

我们采集到的了 pcm 数据, 这个时候它还是 32 位浮点数.

我们以把音频数据传输给 nlp 进行语音识别为例, 看看如何把录制的音频进行压缩与编码.

首先我们看看 nlp 接收的音频文件的要求: 16k 采样率, 16 位深. 单声道. pcm 编码.

要了解这些概念, 我们需要先了解一下音频的基本参数与术语:

### 声音

声音以一种波的形式存在. 既然是一种波, 就会有两个参数: 频率和振幅.

人耳听到的频率范围大概在: 20Hz-20kHz. 低频声音沉闷, 高频尖锐.

振幅标示声音大小.

### 数字信号与模拟信号

麦克风会把声音转换成电信号, 也就是感应电流的大小. 因为声波会有周期和振幅. 所以电流在周期内也会有大小变化.

这种变化是连续的. 如果我们记录下来后可能会类似上图, 我们通过感应电流的变化, 模拟了声波的样子.

这种模拟信号计算机没法处理. 需要通过转换器把电信号转换成 bit 串( 0,1 标示的二进制).

这个 bit 串就是二进制数据流.

它的处理方式就是对模拟信号进行采样. 既然是对一种波进行采样, 就会涉及到采样频率和采样深度.

频率意味着我们会在一秒钟内采集多少个点, 而深度意味着能不能精细的还原振幅变化.

### 采样率

对模拟信号的采样频率就是采样率. 在Chrome中, 输入采样率是 48kHz

```js
let context = new window.AudioContext();
console.log(context.sampleRate); // 48000
```

### 采样位数

我们得到的是[-1,1]的32位浮点数, 可以把振幅量的表示有 2^32 种变化.

采样位数越大, 解析度会越高. 更能还原声音的真实.

### 转换

我们之前拿到的buf就是采样到的一帧音频数据:

```js
jsNode.onaudioprocess = (ev) => {
  // getChannelData 返回 Float32 Array 类型的 pcm 数据
  let buf = ev.inputBuffer.getChannelData(0);
  // console.log(buf);
  
  let vol = Math.max.apply(Math, buf.slice(0, 400)) * 100;
  // 压缩成16k
  let compressData = compress(buf, audioContext.sampleRate, 16000);
  let pcm = encodePCM(compressData, 16, littleEdian)
  this.process && this.process(pcm.buffer, vol)
};
```

### 压缩

首先是压缩, 我们采集到的频率是 48K, nlp 使用的是 16k, 我们需要先把 buf 扔给 compress 函数进行处理, 转换成 16k,

```js
// 压缩单声道数据到 16k
function compress(data, inputSampleRate, outputSampleRate) {
  // 压缩，根据采样率进行压缩
  let rate = inputSampleRate / outputSampleRate;
  let compression = Math.max(rate, 1);
  
  let length = Math.floor(data.length / rate);
  let result = new Float32Array(length);
  let index = 0;
  let j = 0;
  
  // 循环间隔 compression 位取一位数据
  while (index < length) {
    // 取整是因为存在比例不是整数的情况
    let temp = Math.floor(j);
    
    result[index] = data[temp];
    index++;
    
    j += compression;
  }
  // 返回压缩后的一维数据
  return result;
}
```

处理的思路还是很简单的. 既然是每秒有 48k 个数据, 那么我们扔掉其中的一部分, 只剩下 16k 个数据就行了. 只要扔得均匀些即可.

按照我们之前设置的缓冲区大小 4096, 那么buf的数据量就是 4096 个. 这个时候我们每隔 48/16 个元素就保留一个.

这个时候, 4096 个数据就会剩下 1365 个.

### 编码

目前我们的数据是 [1-,1] 的32位浮点数. 此时我们需要编码成pcm的格式. 并且是16位. 由于我们是单声道, 所以不用左右交替拼接声道的数据.

```js
export function encodePCM(bytes, sampleBits, littleEdian) {
  let offset = 0,
  dataLength = bytes.length * (sampleBits / 8),
  buffer = new ArrayBuffer(dataLength),
  data = new DataView(buffer);
  
  for (let i = 0; i < bytes.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, bytes[i]));
    // 16位的划分的是2^16=65536份，范围是-32768到32767
    // 因为我们收集的数据范围在[-1,1]，那么你想转换成16位的话，只需要对负数*32768,对正数*32767,即可得到范围在[-32768,32767]的数据。
    data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, littleEdian);
  }
  return data;
}
```

我们先把数据转换成在16位的范围 [-32768,32767], 这是十进制的表示.

此时我们使用 dataView 对象设置带符号的 16 位二进制整数, 小端编码, 此时 dataview 会把自动处理大小端, 进制位和符号位, 存储到 arraybuffer 中.

此时的 arraybuff 就是我们需要传给 nlp 的数据, 再把 arraybuffer 转换成 blob 对象传给 nlp 即可.
