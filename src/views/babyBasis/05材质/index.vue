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
    StandardMaterial,
    Color3,
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
    var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 0), scene);
    camera.setPosition(new Vector3(2, 2, 10));
    camera.attachControl(canvas, true);
    //  添加一个环境光
    const light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // 添加一个点光源
    const light2 = new PointLight("light2", new Vector3(0, 1, -1), scene);

    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    // box.material = new StandardMaterial("box", scene);
    var myMaterial = new StandardMaterial("myMaterial", scene); //创建一个材质
    myMaterial.diffuseColor = new Color3(1, 0, 1);
    myMaterial.specularColor = new Color3(1, 1, 1); //镜面反射颜色

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
