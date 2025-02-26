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
    SpotLight,
  } from "@babylonjs/core"; //只引入使用到的类
  import "@babylonjs/materials/legacy/legacy"; //引入其他模块中的所有类，例如materials
  import * as GUI from "@babylonjs/gui";
  // 初始化一个场景，engine是Playground准备好的默认参数
  const canvasRef = ref<HTMLCanvasElement>();

  // 提添加家创建场景函数
  const createScene = () => {
    // 获取canvas元素
    const canvas = canvasRef.value as HTMLCanvasElement;
    // 初始化 BABYLON 3D 引擎
    const engine = new Engine(canvas, true);
    // 创建一个新的场景
    var scene = new Scene(engine);
    // 创建一个弧旋转相机，并绑定鼠标事件
    var camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 10, new Vector3(0, 0, 0), scene);
    // 使相机可以通过用户输入进行控制
    camera.attachControl(canvas, true);

    // 定义一组颜色，用于材质
    var mats = [new Color3(1, 1, 0), new Color3(1, 0, 1), new Color3(0, 1, 1), new Color3(1, 1, 1)];

    // 创建红色材质并设置其发光颜色
    var redMat = new StandardMaterial("redMat", scene);
    redMat.emissiveColor = new Color3(1, 0, 0);

    // 创建绿色材质并设置其发光颜色
    var greenMat = new StandardMaterial("greenMat", scene);
    greenMat.emissiveColor = new Color3(0, 1, 0);

    // 创建蓝色材质并设置其发光颜色
    var blueMat = new StandardMaterial("blueMat", scene);
    blueMat.emissiveColor = new Color3(0, 0, 1);

    // 创建白色材质并设置其发光颜色
    var whiteMat = new StandardMaterial("whiteMat", scene);
    whiteMat.emissiveColor = new Color3(1, 1, 1);

    // 创建红色聚光灯
    var lightRed = new SpotLight(
      "spotLight",
      new Vector3(-0.9, 1, -1.8),
      new Vector3(0, -1, 0),
      Math.PI / 2,
      1.5,
      scene
    );
    lightRed.diffuse = new Color3(1, 0, 0);
    lightRed.specular = new Color3(0, 0, 0);

    // 创建绿色聚光灯
    var lightGreen = new SpotLight(
      "spotLight1",
      new Vector3(0, 1, -0.5),
      new Vector3(0, -1, 0),
      Math.PI / 2,
      1.5,
      scene
    );
    lightGreen.diffuse = new Color3(0, 1, 0);
    lightGreen.specular = new Color3(0, 0, 0);

    // 创建蓝色聚光灯
    var lightBlue = new SpotLight(
      "spotLight2",
      new Vector3(0.9, 1, -1.8),
      new Vector3(0, -1, 0),
      Math.PI / 2,
      1.5,
      scene
    );
    lightBlue.diffuse = new Color3(0, 0, 1);
    lightBlue.specular = new Color3(0, 0, 0);

    // 创建白色聚光灯
    var lightWhite = new SpotLight("spotLight3", new Vector3(0, 1, 1), new Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
    lightWhite.diffuse = new Color3(1, 1, 1);
    lightWhite.specular = new Color3(0, 0, 0);

    // 创建红色球体并设置其材质和位置
    var redSphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.25 }, scene);
    redSphere.material = redMat;
    redSphere.position = lightRed.position;

    // 创建绿色球体并设置其材质和位置
    var greenSphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.25 }, scene);
    greenSphere.material = greenMat;
    greenSphere.position = lightGreen.position;

    // 创建蓝色球体并设置其材质和位置
    var blueSphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.25 }, scene);
    blueSphere.material = blueMat;
    blueSphere.position = lightBlue.position;

    // 创建白色球体并设置其材质和位置
    var whiteSphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.25 }, scene);
    whiteSphere.material = whiteMat;
    whiteSphere.position = lightWhite.position;

    // 创建地面材质并设置其漫反射颜色
    var groundMat = new StandardMaterial("groundMat", scene);
    // groundMat.diffuseColor = mats[0];

    // 创建地面并设置其材质
    var ground = MeshBuilder.CreateGround("ground", { width: 4, height: 6 }, scene);
    ground.material = groundMat;

    /*******************GUI***********************/
    // 定义函数以更改地面颜色
    var makeYellow = function () {
      console.log("makeYellow");
      groundMat.diffuseColor = mats[0];
    };

    var makePurple = function () {
      console.log("makePurple");
      groundMat.diffuseColor = mats[1];
    };

    var makeCyan = function () {
      console.log("makeCyan");
      groundMat.diffuseColor = mats[2];
    };

    var makeWhite = function () {
      console.log("makeWhite");
      groundMat.diffuseColor = mats[3];
    };

    // 创建一个GUI单选组以选择材质颜色
    var matGroup = new GUI.RadioGroup("Material Color", "radio");
    matGroup.addRadio("Yellow", makeYellow, true);
    matGroup.addRadio("Purple", makePurple);
    matGroup.addRadio("Cyan", makeCyan);
    matGroup.addRadio("White", makeWhite);

    // 创建全屏UI以显示选择面板
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // 创建选择面板并设置其属性
    var selectBox = new GUI.SelectionPanel("sp", [matGroup]);
    selectBox.width = 0.25;
    selectBox.height = "30%";
    selectBox.top = "4px";
    selectBox.left = "4px";
    selectBox.background = "white";
    selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    // 将选择面板添加到UI
    advancedTexture.addControl(selectBox);

    // 返回创建的场景
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
