
## 手动进行brotli压缩

```shell
npm i -g brotli-cli   # 安装压缩工具
brotli-cli compress qt-canvas.wasm
```
 
## 更新依赖包版本

```shell
npm update    # 更新依赖包版本
npm outdated  # 检测是否有过时的包
npm install # 安装依赖包
```

## 手动修复eslint警告

```bash
./node_modules/.bin/eslint --fix --ext .js,.jsx,.ts,.tsx .
```

## 构建docker镜像

```bash
sudo docker build -t polaris-cloud .
```