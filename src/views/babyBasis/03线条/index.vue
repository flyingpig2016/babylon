<template>
  <!-- 创建一个全屏的div来容纳canvas -->
  <div class="w-full flex justify-center items-center">
    <!-- 定义一个canvas元素用于渲染3D场景 -->
    <canvas ref="canvasRef" id="renderCanvas" width="1500" height="800"></canvas>
  </div>
</template>

<script setup lang="ts">
  // 从Vue中导入ref和onMounted函数
  import { ref, onMounted } from "vue";
  // 从Babylon.js中导入所需的类
  import {
    Engine,
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    PointLight,
    Color4,
    Mesh,
    Vector4,
    AxesViewer,
  } from "@babylonjs/core"; // 只引入使用到的类
  import "@babylonjs/materials/legacy/legacy"; // 引入其他模块中的所有类，例如materials

  // 初始化一个场景，engine是Playground准备好的默认参数
  const canvasRef = ref<HTMLCanvasElement>();

  // 创建场景的函数
  const createScene = () => {
    // 获取canvas元素
    const canvas = canvasRef.value as HTMLCanvasElement;
    // 初始化 BABYLON 3D 引擎
    const engine = new Engine(canvas, true);
    // 创建一个新的场景
    const scene = new Scene(engine);
    // 添加一个弧旋转相机，并绑定鼠标事件
    var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 0), scene);
    // 设置相机位置
    camera.setPosition(new Vector3(5, 5, -5));
    // 使相机可以通过用户输入进行控制
    camera.attachControl(canvas, true);
    // 初始化一个半球光来照亮场景
    const light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // 创建一个坐标轴查看器以帮助可视化坐标轴
    const axes = new AxesViewer(scene, 1);
    // 声明一个数组来存储线条的点，显式地将其类型设为 Vector3
    var myPoints: Vector3[] = [];

    // 定义每个点的角度和高度的变化量
    var deltaTheta = 0.1;
    var deltaY = 0.005;

    // 初始化半径、角度和高度的变量
    var radius = 1;
    var theta = 0;
    var Y = 0;

    // 循环生成400个点，形成螺旋形状
    for (var i = 0; i < 400; i++) {
      // 计算x, y, z坐标并将点添加到数组中
      myPoints.push(new Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)));
      // 增加下一个点的角度和高度
      theta += deltaTheta;
      Y += deltaY;
    }

    // 将生成的点输出到控制台以便调试
    console.log(myPoints);

    // 从点数组创建一个线条网格并将其添加到场景中
    var lines = MeshBuilder.CreateLines("lines", { points: myPoints }, scene);
    // 创建一个虚线网格并将其添加到场景中
    const lines2 = MeshBuilder.CreateDashedLines("lines2", { points: myPoints, dashNb: 400 }, scene);
    // 设置虚线网格的位置
    lines2.position.x = 3;

    // 返回创建的场景
    return scene;
  };

  // 初始化函数
  const init = () => {
    // 获取canvas元素
    const canvas = canvasRef.value as HTMLCanvasElement;
    // 初始化 BABYLON 3D 引擎
    const engine = new Engine(canvas, true);
    // 创建场景
    const scene = createScene();

    // 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来
    engine.runRenderLoop(() => {
      scene.render();
    });
    // 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
    window.addEventListener("resize", function () {
      engine.resize();
    });
  };

  // 当组件挂载时，调用初始化函数
  onMounted(() => {
    init();
  });
</script>

<style scoped></style>
