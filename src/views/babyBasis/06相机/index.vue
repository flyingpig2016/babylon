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
    FollowCamera,
    AnaglyphUniversalCamera,
    AnaglyphArcRotateCamera,
    DeviceOrientationCamera,
  } from "@babylonjs/core"; //只引入使用到的类
  import "@babylonjs/materials/legacy/legacy"; //引入其他模块中的所有类，例如materials

  // 初始化一个场景，engine是Playground准备好的默认参数
  const canvasRef = ref<HTMLCanvasElement>();

  // 提添加家创建场景函数
  const createScene = (engine: Engine) => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    // 初始化 BABYLON 3D engine
    const scene = new Scene(engine);

    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    // box.material = new StandardMaterial("box", scene);
    var myMaterial = new StandardMaterial("myMaterial", scene); //创建一个材质
    myMaterial.diffuseColor = new Color3(1, 0, 1); //漫反射颜色
    myMaterial.specularColor = new Color3(0.5, 0.6, 0.87); //镜面颜色
    // myMaterial.emissiveColor = new Color3(1, 0, 1); //自发光颜色
    myMaterial.ambientColor = new Color3(0.23, 0.98, 0.53); //环境光颜色
    box.material = myMaterial;

    // 1. 添加一个旋转相机，并且绑定鼠标事件
    // var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 0), scene);
    // camera.setPosition(new Vector3(2, 2, 10));
    // camera.attachControl(canvas, true);

    //2.  添加一个通用相机

    // var camera = new UniversalCamera("camera", new Vector3(0, 0, -10), scene);
    // camera.setTarget(Vector3.Zero());
    // camera.attachControl(canvas, true);

    // 3. 添加一个跟随相机
    // const camera = new FollowCamera("FollowCam", new Vector3(0, 10, -10), scene);
    // camera.lockedTarget = box;
    // // 相机距离目标的距离
    // camera.radius = 10;

    // // 相机朝目标上方的偏移
    // camera.heightOffset = 1;

    // // 相机与目标在水平面的角度偏移，默认相机和目标在同一水平面
    // camera.rotationOffset = 0;

    // // 相机靠近目标位置的加速度
    // camera.cameraAcceleration = 0.001;

    // // 相机达到的最大速度
    // camera.maxCameraSpeed = 5;

    // // 让相机响应用户操作
    // camera.attachControl(canvas, true);

    // 4. 添加立体相机 3d使用
    // var camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 1, -15), 0.033, scene);
    // camera.attachControl(canvas, true);

    // 5. 添加一个例题弧形旋转相机
    // var camera = new AnaglyphArcRotateCamera(
    //   "aar_cam",
    //   -Math.PI / 2,
    //   Math.PI / 4,
    //   20,
    //   new Vector3(0, 0, 0),
    //   0.033,
    //   scene
    // );
    // camera.attachControl(canvas, true);

    // 6. 添加一个设备方向相机
    var camera = new DeviceOrientationCamera("DevOr_camera", new Vector3(0, 0, 0), scene);
    // 设置相机的观察目标位置
    camera.setTarget(new Vector3(0, 0, -10));

    // 设置相机响应移动和旋转的敏感度
    camera.angularSensibility = 10;
    // camera.moveSensibility = 10;

    // 让相机响应用户操作
    camera.attachControl(canvas, true);

    //  添加一个环境光
    const light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // 添加一个点光源
    const light2 = new PointLight("light2", new Vector3(0, 1, -1), scene);

    const axes = new AxesViewer(scene, 1);

    return scene;
  };
  const init = () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);

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
