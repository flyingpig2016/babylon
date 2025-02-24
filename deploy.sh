#!/bin/bash

# 检查是否传入构建模式参数，如果没有则默认为 production
MODE=${1:-production}

# 打包项目
echo "Building the project in $MODE mode..."
if npm run build -- --mode $MODE; then
  echo -e "\033[1;32mBuild successful.\033[0m"
else
  echo "Build failed. Exiting."
  exit 1
fi

# 定义输出目录和压缩文件名
OUTPUT_DIR="dist_$MODE"
ZIP_FILE="dist_$MODE.zip"

# 检查输出目录是否存在
if [ -d "$OUTPUT_DIR" ]; then
  echo "Compressing the output directory..."
  # 压缩输出目录
  if zip -r $ZIP_FILE $OUTPUT_DIR; then
    echo "Compression complete: $ZIP_FILE"
  else
    echo "Compression failed. Exiting."
    exit 1
  fi
else
  echo "Error: Output directory $OUTPUT_DIR does not exist."
  exit 1
fi

# 清理构建目录
echo "Cleaning up..."
rm -rf $OUTPUT_DIR
echo "Clean-up complete."
