import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";
import { resolve as resolvePath } from "node:path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import { viteMockServe } from "vite-plugin-mock"; // mock插件
import requireTransform from "vite-plugin-require-transform";
import Inspect from "vite-plugin-inspect";

const root = process.cwd(); //用于获取当前工作目录的绝对路径

const pathResolve = (pathname: string) => resolvePath(root, ".", pathname);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log("command=", command, " \nmode=", mode);
  // 加载 envDir 中的 .env 文件。默认情况下只有前缀为 VITE_ 会被加载，除非更改了 prefixes 配置。
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env=", env.VITE_USE_MOCK === "true");
  return {
    base: "./",
    define: {
      __APP_ENV__: JSON.stringify(env), //
      "process.env": process.env, // 全局可使用process.env"变量
    },
    resolve: {
      alias: [
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    plugins: [
      Inspect(),
      vue(),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus({}),
      viteMockServe({
        logger: true,
        mockPath: "mock", // 设置模拟.ts 文件的存储路径
        // enable: command === "serve", //只有开发环境才启动mock
        enable: env.VITE_USE_MOCK === "true", //只有开发环境才启动mock
        watchFiles: true,
        configPath: "mock/index.ts", //-设置模拟读取的数据条目。 当文件存在并且位于项目根目录中时，将首先读取并使用该文件。 配置文件返回一个数组
      }),
      // 解决: vite-plugin-require-transform打包问题
      requireTransform({
        fileRegex: /^(?!.*node_modules).*\.(vue|js|jsx|ts|tsx)$/,
      }),
    ],
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [], //生产环境移除console和debugger
    },
    build: {
      // 解决antv6问题
      commonjsOptions: {
        ignoreTryCatch: false,
      },
      outDir: "dist_" + mode, //指定输出路径
      sourcemap: mode === "development",
      target: "es2015",
      cssTarget: "chrome80",
      reportCompressedSize: true, //构建过程中报告压缩后的文件大小
      chunkSizeWarningLimit: 1000, //代码块（chunk）大小的警告限制
      rollupOptions: {
        maxParallelFileOps: 3,
        output: {
          entryFileNames: "assets/entry/[name]-[hash].js", //js入口文件配置，仅仅入口文件不包括分包及懒加载的js [name][hash]占位符 [ext]后缀
          chunkFileNames: "assets/js/[name]-[hash].js", //js分包及懒加载配置
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]", //其他资源文件配置比如css资源
          manualChunks: {
            //自定义分包路径
            vue: ["vue", "pinia", "vue-router"], // 将 vue、pinia、vue-router 打包到一个文件中
            element: ["element-plus", "@element-plus/icons-vue"], // 将 element-plus、@element-plus/icons-vue 打包到一个文件中
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // 允许你在编译时覆盖Less文件中的变量
          additionalData: `@import "@/assets/styles/variables.less";`,
          javascriptEnabled: true,
        },
      },
    },

    server: {
      host: true,
      proxy: {
        "/basic-api": {
          target: "http://10.1.249.95:8023/",
          // target: "http://10.11.31.76:8023/",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ""),
          // only https
          // secure: false
        },
        "/upload": {
          target: "http://localhost:3300/upload",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ""),
        },
        // "/dugis/": {
        //   // dugis api
        //   target: "http://10.1.192.106:1025/dugis/", // 生产环境地址由nginx配置决定
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(new RegExp(`^/dugis`), ""),
        // },
        "/public/": {
          // nginx静态文件优化,项目单独部署时指向同源位置
          target: "http://10.1.192.106:2022/public/",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/public/`), ""),
        },
      },
      open: true, // 项目启动后，自动打开
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"], //预热配置，用于在服务器启动时预加载指定的文件
      },
    },
  };
});
