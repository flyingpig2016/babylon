// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/vite@5.4.3_@types+node@22.5.4_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@22.5.4_less@4.2.0__vue@3.5.3_typescript@5.6.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Unocss from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/unocss@0.62.3_postcss@8.4.45_rollup@4.21.2_vite@5.4.3_@types+node@22.5.4_less@4.2.0_/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/unocss@0.62.3_postcss@8.4.45_rollup@4.21.2_vite@5.4.3_@types+node@22.5.4_less@4.2.0_/node_modules/unocss/dist/index.mjs";
import { resolve } from "node:path";
import AutoImport from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/unplugin-auto-import@0.18.2_@nuxt+kit@3.13.1_rollup@4.21.2__@vueuse+core@9.13.0_vue@3.5.3_typ_o6f4h6ru6snxur252uvl2hkxzi/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_@nuxt+kit@3.13.1_rollup@4.21.2__rollup@4._hg6sotnkazp6ro3kifxymimbay/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_@nuxt+kit@3.13.1_rollup@4.21.2__rollup@4._hg6sotnkazp6ro3kifxymimbay/node_modules/unplugin-vue-components/dist/resolvers.js";
import ElementPlus from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/unplugin-element-plus@0.8.0_rollup@4.21.2/node_modules/unplugin-element-plus/dist/vite.mjs";
import { viteMockServe } from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.4.3_@types+node@22.5.4_less@4.2.0_/node_modules/vite-plugin-mock/dist/index.mjs";
import requireTransform from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/vite-plugin-require-transform@1.0.21/node_modules/vite-plugin-require-transform/dist/index.mjs";
import Inspect from "file:///Users/flyingpig/study/myProject/liantong/cuc-hbj-aisware_wbop-wireless_ui-repository/node_modules/.pnpm/vite-plugin-inspect@0.8.8_@nuxt+kit@3.13.1_rollup@4.21.2__rollup@4.21.2_vite@5.4.3_@types+node@22.5.4_less@4.2.0_/node_modules/vite-plugin-inspect/dist/index.mjs";
var root = process.cwd();
var pathResolve = (pathname) => resolve(root, ".", pathname);
var vite_config_default = defineConfig(({ command, mode }) => {
  console.log("command=", command, " \nmode=", mode);
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env=", env.VITE_USE_MOCK === "true");
  return {
    base: "./",
    define: {
      __APP_ENV__: JSON.stringify(env),
      //
      "process.env": process.env
      // 全局可使用process.env"变量
    },
    resolve: {
      alias: [
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js"
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve("src") + "/"
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve("types") + "/"
        }
      ]
    },
    plugins: [
      Inspect(),
      vue(),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()]
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus({}),
      viteMockServe({
        logger: true,
        mockPath: "mock",
        // 设置模拟.ts 文件的存储路径
        // enable: command === "serve", //只有开发环境才启动mock
        enable: env.VITE_USE_MOCK === "true",
        //只有开发环境才启动mock
        watchFiles: true,
        configPath: "mock/index.ts"
        //-设置模拟读取的数据条目。 当文件存在并且位于项目根目录中时，将首先读取并使用该文件。 配置文件返回一个数组
      }),
      // 解决: vite-plugin-require-transform打包问题
      requireTransform({ fileRegex: /^(?!.*node_modules).*\.(vue|js|jsx|ts|tsx)$/ })
    ],
    esbuild: {
      // drop: mode === "production" ? ["console", "debugger"] : [], //生产环境移除console和debugger
    },
    build: {
      outDir: "dist_" + mode,
      //指定输出路径
      sourcemap: true,
      target: "es2015",
      cssTarget: "chrome80",
      reportCompressedSize: true,
      //构建过程中报告压缩后的文件大小
      chunkSizeWarningLimit: 1e3,
      //代码块（chunk）大小的警告限制
      rollupOptions: {
        maxParallelFileOps: 3,
        output: {
          entryFileNames: "assets/entry/[name]-[hash].js",
          //js入口文件配置，仅仅入口文件不包括分包及懒加载的js [name][hash]占位符 [ext]后缀
          chunkFileNames: "assets/js/[name]-[hash].js",
          //js分包及懒加载配置
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          //其他资源文件配置比如css资源
          manualChunks: {
            //自定义分包路径
            vue: ["vue", "pinia", "vue-router"],
            // 将 vue、pinia、vue-router 打包到一个文件中
            element: ["element-plus", "@element-plus/icons-vue"]
            // 将 element-plus、@element-plus/icons-vue 打包到一个文件中
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          // 允许你在编译时覆盖Less文件中的变量
          additionalData: `@import "@/assets/styles/variables.less";`,
          javascriptEnabled: true
        }
      }
    },
    server: {
      host: true,
      proxy: {
        "/basic-api": {
          target: "http://10.1.249.95:8023/",
          // target: "http://10.11.31.76:8023/",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), "")
          // only https
          // secure: false
        },
        "/upload": {
          target: "http://localhost:3300/upload",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), "")
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
          rewrite: (path) => path.replace(new RegExp(`^/public/`), "")
        }
      },
      open: true,
      // 项目启动后，自动打开
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
        //预热配置，用于在服务器启动时预加载指定的文件
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZmx5aW5ncGlnL3N0dWR5L215UHJvamVjdC9saWFudG9uZy9jdWMtaGJqLWFpc3dhcmVfd2JvcC13aXJlbGVzc191aS1yZXBvc2l0b3J5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZmx5aW5ncGlnL3N0dWR5L215UHJvamVjdC9saWFudG9uZy9jdWMtaGJqLWFpc3dhcmVfd2JvcC13aXJlbGVzc191aS1yZXBvc2l0b3J5L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9mbHlpbmdwaWcvc3R1ZHkvbXlQcm9qZWN0L2xpYW50b25nL2N1Yy1oYmotYWlzd2FyZV93Ym9wLXdpcmVsZXNzX3VpLXJlcG9zaXRvcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tIFwidW5vY3NzXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gXCJ1bnBsdWdpbi1lbGVtZW50LXBsdXMvdml0ZVwiO1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrXCI7IC8vIG1vY2tcdTYzRDJcdTRFRjZcbmltcG9ydCByZXF1aXJlVHJhbnNmb3JtIGZyb20gXCJ2aXRlLXBsdWdpbi1yZXF1aXJlLXRyYW5zZm9ybVwiO1xuaW1wb3J0IEluc3BlY3QgZnJvbSBcInZpdGUtcGx1Z2luLWluc3BlY3RcIjtcblxuY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7IC8vXHU3NTI4XHU0RThFXHU4M0I3XHU1M0Q2XHU1RjUzXHU1MjREXHU1REU1XHU0RjVDXHU3NkVFXHU1RjU1XHU3Njg0XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG5cbmNvbnN0IHBhdGhSZXNvbHZlID0gKHBhdGhuYW1lOiBzdHJpbmcpID0+IHJlc29sdmUocm9vdCwgXCIuXCIsIHBhdGhuYW1lKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgY29uc29sZS5sb2coXCJjb21tYW5kPVwiLCBjb21tYW5kLCBcIiBcXG5tb2RlPVwiLCBtb2RlKTtcbiAgLy8gXHU1MkEwXHU4RjdEIGVudkRpciBcdTRFMkRcdTc2ODQgLmVudiBcdTY1ODdcdTRFRjZcdTMwMDJcdTlFRDhcdThCQTRcdTYwQzVcdTUxQjVcdTRFMEJcdTUzRUFcdTY3MDlcdTUyNERcdTdGMDBcdTRFM0EgVklURV8gXHU0RjFBXHU4OEFCXHU1MkEwXHU4RjdEXHVGRjBDXHU5NjY0XHU5NzVFXHU2NkY0XHU2NTM5XHU0RTg2IHByZWZpeGVzIFx1OTE0RFx1N0Y2RVx1MzAwMlxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuICBjb25zb2xlLmxvZyhcImVudj1cIiwgZW52LlZJVEVfVVNFX01PQ0sgPT09IFwidHJ1ZVwiKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBcIi4vXCIsXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0FQUF9FTlZfXzogSlNPTi5zdHJpbmdpZnkoZW52KSwgLy9cbiAgICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsIC8vIFx1NTE2OFx1NUM0MFx1NTNFRlx1NEY3Rlx1NzUyOHByb2Nlc3MuZW52XCJcdTUzRDhcdTkxQ0ZcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiBcInZ1ZS1pMThuXCIsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IFwidnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanNcIixcbiAgICAgICAgfSxcbiAgICAgICAgLy8gQC94eHh4ID0+IHNyYy94eHh4XG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvQFxcLy8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKFwic3JjXCIpICsgXCIvXCIsXG4gICAgICAgIH0sXG4gICAgICAgIC8vICMveHh4eCA9PiB0eXBlcy94eHh4XG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvI1xcLy8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKFwidHlwZXNcIikgKyBcIi9cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBJbnNwZWN0KCksXG4gICAgICB2dWUoKSxcbiAgICAgIFVub2Nzcyh7XG4gICAgICAgIHByZXNldHM6IFtwcmVzZXRVbm8oKSwgcHJlc2V0QXR0cmlidXRpZnkoKSwgcHJlc2V0SWNvbnMoKV0sXG4gICAgICB9KSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIH0pLFxuICAgICAgRWxlbWVudFBsdXMoe30pLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIGxvZ2dlcjogdHJ1ZSxcbiAgICAgICAgbW9ja1BhdGg6IFwibW9ja1wiLCAvLyBcdThCQkVcdTdGNkVcdTZBMjFcdTYyREYudHMgXHU2NTg3XHU0RUY2XHU3Njg0XHU1QjU4XHU1MEE4XHU4REVGXHU1Rjg0XG4gICAgICAgIC8vIGVuYWJsZTogY29tbWFuZCA9PT0gXCJzZXJ2ZVwiLCAvL1x1NTNFQVx1NjcwOVx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NjI0RFx1NTQyRlx1NTJBOG1vY2tcbiAgICAgICAgZW5hYmxlOiBlbnYuVklURV9VU0VfTU9DSyA9PT0gXCJ0cnVlXCIsIC8vXHU1M0VBXHU2NzA5XHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU2MjREXHU1NDJGXHU1MkE4bW9ja1xuICAgICAgICB3YXRjaEZpbGVzOiB0cnVlLFxuICAgICAgICBjb25maWdQYXRoOiBcIm1vY2svaW5kZXgudHNcIiwgLy8tXHU4QkJFXHU3RjZFXHU2QTIxXHU2MkRGXHU4QkZCXHU1M0Q2XHU3Njg0XHU2NTcwXHU2MzZFXHU2NzYxXHU3NkVFXHUzMDAyIFx1NUY1M1x1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOFx1NUU3Nlx1NEUxNFx1NEY0RFx1NEU4RVx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUyRFx1NjVGNlx1RkYwQ1x1NUMwNlx1OTk5Nlx1NTE0OFx1OEJGQlx1NTNENlx1NUU3Nlx1NEY3Rlx1NzUyOFx1OEJFNVx1NjU4N1x1NEVGNlx1MzAwMiBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTY1NzBcdTdFQzRcbiAgICAgIH0pLFxuICAgICAgLy8gXHU4OUUzXHU1MUIzOiB2aXRlLXBsdWdpbi1yZXF1aXJlLXRyYW5zZm9ybVx1NjI1M1x1NTMwNVx1OTVFRVx1OTg5OFxuICAgICAgcmVxdWlyZVRyYW5zZm9ybSh7IGZpbGVSZWdleDogL14oPyEuKm5vZGVfbW9kdWxlcykuKlxcLih2dWV8anN8anN4fHRzfHRzeCkkLyB9KSxcbiAgICBdLFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIC8vIGRyb3A6IG1vZGUgPT09IFwicHJvZHVjdGlvblwiID8gW1wiY29uc29sZVwiLCBcImRlYnVnZ2VyXCJdIDogW10sIC8vXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU3OUZCXHU5NjY0Y29uc29sZVx1NTQ4Q2RlYnVnZ2VyXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBcImRpc3RfXCIgKyBtb2RlLCAvL1x1NjMwN1x1NUI5QVx1OEY5M1x1NTFGQVx1OERFRlx1NUY4NFxuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgdGFyZ2V0OiBcImVzMjAxNVwiLFxuICAgICAgY3NzVGFyZ2V0OiBcImNocm9tZTgwXCIsXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSwgLy9cdTY3ODRcdTVFRkFcdThGQzdcdTdBMEJcdTRFMkRcdTYyQTVcdTU0NEFcdTUzOEJcdTdGMjlcdTU0MEVcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MjdcdTVDMEZcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy9cdTRFRTNcdTc4MDFcdTU3NTdcdUZGMDhjaHVua1x1RkYwOVx1NTkyN1x1NUMwRlx1NzY4NFx1OEI2Nlx1NTQ0QVx1OTY1MFx1NTIzNlxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBtYXhQYXJhbGxlbEZpbGVPcHM6IDMsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9lbnRyeS9bbmFtZV0tW2hhc2hdLmpzXCIsIC8vanNcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTkxNERcdTdGNkVcdUZGMENcdTRFQzVcdTRFQzVcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTRFMERcdTUzMDVcdTYyRUNcdTUyMDZcdTUzMDVcdTUzQ0FcdTYxRDJcdTUyQTBcdThGN0RcdTc2ODRqcyBbbmFtZV1baGFzaF1cdTUzNjBcdTRGNERcdTdCMjYgW2V4dF1cdTU0MEVcdTdGMDBcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLCAvL2pzXHU1MjA2XHU1MzA1XHU1M0NBXHU2MUQyXHU1MkEwXHU4RjdEXHU5MTREXHU3RjZFXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwiYXNzZXRzL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF1cIiwgLy9cdTUxNzZcdTRFRDZcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdTkxNERcdTdGNkVcdTZCRDRcdTU5ODJjc3NcdThENDRcdTZFOTBcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgIC8vXHU4MUVBXHU1QjlBXHU0RTQ5XHU1MjA2XHU1MzA1XHU4REVGXHU1Rjg0XG4gICAgICAgICAgICB2dWU6IFtcInZ1ZVwiLCBcInBpbmlhXCIsIFwidnVlLXJvdXRlclwiXSwgLy8gXHU1QzA2IHZ1ZVx1MzAwMXBpbmlhXHUzMDAxdnVlLXJvdXRlciBcdTYyNTNcdTUzMDVcdTUyMzBcdTRFMDBcdTRFMkFcdTY1ODdcdTRFRjZcdTRFMkRcbiAgICAgICAgICAgIGVsZW1lbnQ6IFtcImVsZW1lbnQtcGx1c1wiLCBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCJdLCAvLyBcdTVDMDYgZWxlbWVudC1wbHVzXHUzMDAxQGVsZW1lbnQtcGx1cy9pY29ucy12dWUgXHU2MjUzXHU1MzA1XHU1MjMwXHU0RTAwXHU0RTJBXHU2NTg3XHU0RUY2XHU0RTJEXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIC8vIFx1NTE0MVx1OEJCOFx1NEY2MFx1NTcyOFx1N0YxNlx1OEJEMVx1NjVGNlx1ODk4Nlx1NzZENkxlc3NcdTY1ODdcdTRFRjZcdTRFMkRcdTc2ODRcdTUzRDhcdTkxQ0ZcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvdmFyaWFibGVzLmxlc3NcIjtgLFxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgXCIvYmFzaWMtYXBpXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzEwLjEuMjQ5Ljk1OjgwMjMvXCIsXG4gICAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHA6Ly8xMC4xMS4zMS43Njo4MDIzL1wiLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYmFzaWMtYXBpYCksIFwiXCIpLFxuICAgICAgICAgIC8vIG9ubHkgaHR0cHNcbiAgICAgICAgICAvLyBzZWN1cmU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFwiL3VwbG9hZFwiOiB7XG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzMwMC91cGxvYWRcIixcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL3VwbG9hZGApLCBcIlwiKSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gXCIvZHVnaXMvXCI6IHtcbiAgICAgICAgLy8gICAvLyBkdWdpcyBhcGlcbiAgICAgICAgLy8gICB0YXJnZXQ6IFwiaHR0cDovLzEwLjEuMTkyLjEwNjoxMDI1L2R1Z2lzL1wiLCAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTU3MzBcdTU3NDBcdTc1MzFuZ2lueFx1OTE0RFx1N0Y2RVx1NTFCM1x1NUI5QVxuICAgICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgLy8gICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vZHVnaXNgKSwgXCJcIiksXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiL3B1YmxpYy9cIjoge1xuICAgICAgICAgIC8vIG5naW54XHU5NzU5XHU2MDAxXHU2NTg3XHU0RUY2XHU0RjE4XHU1MzE2LFx1OTg3OVx1NzZFRVx1NTM1NVx1NzJFQ1x1OTBFOFx1N0Y3Mlx1NjVGNlx1NjMwN1x1NTQxMVx1NTQwQ1x1NkU5MFx1NEY0RFx1N0Y2RVxuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vMTAuMS4xOTIuMTA2OjIwMjIvcHVibGljL1wiLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vcHVibGljL2ApLCBcIlwiKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBvcGVuOiB0cnVlLCAvLyBcdTk4NzlcdTc2RUVcdTU0MkZcdTUyQThcdTU0MEVcdUZGMENcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogW1wiLi9pbmRleC5odG1sXCIsIFwiLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LypcIl0sIC8vXHU5ODg0XHU3MEVEXHU5MTREXHU3RjZFXHVGRjBDXHU3NTI4XHU0RThFXHU1NzI4XHU2NzBEXHU1MkExXHU1NjY4XHU1NDJGXHU1MkE4XHU2NUY2XHU5ODg0XHU1MkEwXHU4RjdEXHU2MzA3XHU1QjlBXHU3Njg0XHU2NTg3XHU0RUY2XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaWIsU0FBUyxjQUFjLGVBQWU7QUFDdmQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLFdBQVcsbUJBQW1CLG1CQUFtQjtBQUMxRCxTQUFTLGVBQWU7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxhQUFhO0FBRXBCLElBQU0sT0FBTyxRQUFRLElBQUk7QUFFekIsSUFBTSxjQUFjLENBQUMsYUFBcUIsUUFBUSxNQUFNLEtBQUssUUFBUTtBQUdyRSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBQ2pELFVBQVEsSUFBSSxZQUFZLFNBQVMsWUFBWSxJQUFJO0FBRWpELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxVQUFRLElBQUksUUFBUSxJQUFJLGtCQUFrQixNQUFNO0FBQ2hELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLGFBQWEsS0FBSyxVQUFVLEdBQUc7QUFBQTtBQUFBLE1BQy9CLGVBQWUsUUFBUTtBQUFBO0FBQUEsSUFDekI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsUUFDZjtBQUFBO0FBQUEsUUFFQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUE7QUFBQSxRQUVBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLFlBQVksT0FBTyxJQUFJO0FBQUEsUUFDdEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0wsU0FBUyxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7QUFBQSxNQUMzRCxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxZQUFZLENBQUMsQ0FBQztBQUFBLE1BQ2QsY0FBYztBQUFBLFFBQ1osUUFBUTtBQUFBLFFBQ1IsVUFBVTtBQUFBO0FBQUE7QUFBQSxRQUVWLFFBQVEsSUFBSSxrQkFBa0I7QUFBQTtBQUFBLFFBQzlCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQTtBQUFBLE1BQ2QsQ0FBQztBQUFBO0FBQUEsTUFFRCxpQkFBaUIsRUFBRSxXQUFXLDhDQUE4QyxDQUFDO0FBQUEsSUFDL0U7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLElBRVQ7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVEsVUFBVTtBQUFBO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsc0JBQXNCO0FBQUE7QUFBQSxNQUN0Qix1QkFBdUI7QUFBQTtBQUFBLE1BQ3ZCLGVBQWU7QUFBQSxRQUNiLG9CQUFvQjtBQUFBLFFBQ3BCLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFVBQ2hCLGNBQWM7QUFBQTtBQUFBLFlBRVosS0FBSyxDQUFDLE9BQU8sU0FBUyxZQUFZO0FBQUE7QUFBQSxZQUNsQyxTQUFTLENBQUMsZ0JBQWdCLHlCQUF5QjtBQUFBO0FBQUEsVUFDckQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQTtBQUFBLFVBRUosZ0JBQWdCO0FBQUEsVUFDaEIsbUJBQW1CO0FBQUEsUUFDckI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBO0FBQUEsVUFFUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLGFBQWEsR0FBRyxFQUFFO0FBQUE7QUFBQTtBQUFBLFFBRy9EO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFVBQVUsR0FBRyxFQUFFO0FBQUEsUUFDNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU9BLFlBQVk7QUFBQTtBQUFBLFVBRVYsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxXQUFXLEdBQUcsRUFBRTtBQUFBLFFBQzdEO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBTTtBQUFBO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsZ0JBQWdCLDRCQUE0QjtBQUFBO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
