<template>
  <div class="w-full flex justify-center items-center">
    <canvas ref="canvasRef" id="renderCanvas" width="1500" height="800"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import {
    Engine,
    Scene,
    ArcRotateCamera,
    UniversalCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    PointLight,
    Color4,
    Mesh,
    Vector4,
    AxesViewer,
  } from "@babylonjs/core"; //只引入使用到的类
  import "@babylonjs/materials/legacy/legacy"; //引入其他模块中的所有类，例如materials

  // 初始化一个场景，engine是Playground准备好的默认参数
  const canvasRef = ref<HTMLCanvasElement>();

  // 提添加家创建场景函数
  const createScene = () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    // 初始化 BABYLON 3D engine
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    // 添加一个相机，并且绑定鼠标事件
    // var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(2, 2, 2), scene);
    const camera = new UniversalCamera("Camera", new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    //  添加一个环境光
    const light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // 添加一个点光源
    const light2 = new PointLight("light2", new Vector3(0, 1, -1), scene);

    // 创建默认平面
    const plane = MeshBuilder.CreatePlane(
      "plane",
      { width: 5, height: 2, frontUVs: new Vector4(1, 1, 0, 1), sideOrientation: Mesh.DOUBLESIDE },
      scene
    );
    // plane.position.x = -1;
    // plane.position.y = 1;
    // plane.position.z = 1;
    // plane.rotation.x = Math.PI / 4;
    // plane.rotation = new Vector3(Math.PI / 6, 0, 0);
    //可以先初始化一个数据
    var myPoints: Vector3[] = [];
    //然后初始化三个点，push到数组里
    var point1 = new Vector3(0, 0, 0);
    myPoints.push(point1);
    var point2 = new Vector3(0, 1, 1);
    myPoints.push(point2);
    var point3 = new Vector3(0, 1, 0);
    myPoints.push(point3);

    const myNewArray = [new Vector3(0, 2, 0), new Vector3(1, 1, 2), new Vector3(0, 0, 0)];

    // 创建线条
    var lines = MeshBuilder.CreateLines("lines", { points: myNewArray }, scene);

    //然后把上面的线条作为一个instance传入到新创建的线条中，完成更新，新线条可以不用传入Scene实例，也就是第三个参数不用传。注意myArray和myNewArray长度必须一致。
    lines = MeshBuilder.CreateLines("lines", { points: myNewArray, instance: lines });

    const axes = new AxesViewer(scene, 1);

    return scene;
  };
  const init = () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    const engine = new Engine(canvas, true);
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

  onMounted(() => {
    init();
  });
</script>

<style scoped></style>
