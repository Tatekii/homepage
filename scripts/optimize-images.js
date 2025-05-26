// scripts/optimize-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const os = require('os');

// 实现并发限制函数
class Limiter {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(fn) {
    // 如果当前运行的任务数量达到限制，则等待
    if (this.running >= this.concurrency) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    
    this.running++;
    try {
      return await fn();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        // 当一个任务完成时，从队列中释放一个等待的任务
        this.queue.shift()();
      }
    }
  }

  wrap(fn) {
    return () => this.add(fn);
  }
}

// 创建限制器实例
const createLimiter = (concurrency) => new Limiter(concurrency);

// 配置
const config = {
  // 源图像目录
  sourceDir: path.join(__dirname, '../public'),
  // 构建输出目录
  outputDir: path.join(__dirname, '../out'),
  // 质量设置
  quality: {
    jpeg: 80,
    png: 80,
    webp: 85,
    avif: 80
  },
  // 要处理的文件类型
  extensions: ['jpg', 'jpeg', 'png', 'gif']
};

async function optimizeImages() {
  console.log('🔍 查找图像文件...');
  
  // 查找所有图像文件
  const files = [];
  config.extensions.forEach(ext => {
    const matches = glob.sync(`${config.sourceDir}/**/*.${ext}`, { nocase: true });
    files.push(...matches);
  });
  
  console.log(`找到 ${files.length} 个图像文件`);
  
  // 确保输出目录存在
  if (!fs.existsSync(config.outputDir)) {
    console.log('构建目录不存在，请先运行 next build');
    return;
  }
  
  // 设置并发限制为CPU核心数
  const limit = createLimiter(os.cpus().length);
  
  // 创建计数器
  let processed = 0;
  let errors = 0;
  
  // 创建进度更新函数
  const updateProgress = (success = true) => {
    if (success) {
      processed++;
    } else {
      errors++;
    }
    // 打印进度
    process.stdout.write(`\r📦 进度: ${processed + errors}/${files.length} (成功: ${processed}, 失败: ${errors})`);
  };

  // 定义单个文件的处理函数
  async function processImage(file) {
    try {
      // 获取相对路径
      const relativePath = path.relative(config.sourceDir, file);
      // 构建输出路径
      const outputPath = path.join(config.outputDir, relativePath);
      const outputDir = path.dirname(outputPath);
      
      // 确保输出目录存在
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // 如果输出文件已存在，就压缩它
      if (fs.existsSync(outputPath)) {
        const fileExt = path.extname(file).toLowerCase().substring(1);
        const fileInfo = path.parse(outputPath);
        
        console.log(`处理: ${relativePath}`);
        
        // 读取图像
        const image = sharp(file);
        
        // 压缩并保存原始格式
        if (fileExt === 'jpg' || fileExt === 'jpeg') {
          await image
            .jpeg({ quality: config.quality.jpeg })
            .toFile(outputPath + '.tmp');
          
          fs.renameSync(outputPath + '.tmp', outputPath);
        } else if (fileExt === 'png') {
          await image
            .png({ quality: config.quality.png })
            .toFile(outputPath + '.tmp');
          
          fs.renameSync(outputPath + '.tmp', outputPath);
        } else if (fileExt === 'gif') {
          // Sharp不能优化GIF，只复制
          fs.copyFileSync(file, outputPath);
        }
        
        // 生成WebP版本
        const webpPath = path.join(fileInfo.dir, fileInfo.name + '.webp');
        await image
          .webp({ quality: config.quality.webp })
          .toFile(webpPath);
        
        // 生成AVIF版本
        const avifPath = path.join(fileInfo.dir, fileInfo.name + '.avif');
        await image
          .avif({ quality: config.quality.avif })
          .toFile(avifPath);
        
        updateProgress(true);
      } else {
        console.log(`跳过: ${relativePath} (在构建目录中未找到)`);
      }
    } catch (err) {
      console.error(`处理 ${file} 时出错:`, err);
      updateProgress(false);
    }
  }

  // 并行处理所有文件
  const tasks = files.map(file => limit.wrap(() => processImage(file))());
  await Promise.all(tasks);

  // 清除进度显示的行
  process.stdout.write('\n');
  
  console.log(`
✅ 图像优化完成:
- 处理: ${processed} 个文件
- 错误: ${errors} 个文件
  `);
}

optimizeImages().catch(err => {
  console.error('图像优化过程中发生错误:', err);
  process.exit(1);
});
