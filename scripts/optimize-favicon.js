const fs = require('fs');
const path = require('path');

// 这个脚本用于检查和优化favicon文件
// 确保favicon符合搜索引擎要求

function checkFavicon() {
  const staticDir = path.join(__dirname, '../static');
  const faviconPath = path.join(staticDir, 'favicon.ico');
  
  if (fs.existsSync(faviconPath)) {
    const stats = fs.statSync(faviconPath);
    console.log('✅ favicon.ico 文件存在');
    console.log(`   大小: ${stats.size} 字节`);
    console.log(`   最后修改: ${stats.mtime}`);
    
    if (stats.size < 1000) {
      console.log('⚠️  警告: favicon.ico 文件可能太小');
    } else if (stats.size > 100000) {
      console.log('⚠️  警告: favicon.ico 文件可能太大');
    } else {
      console.log('✅ favicon.ico 文件大小正常');
    }
  } else {
    console.log('❌ favicon.ico 文件不存在');
  }
  
  // 检查SVG favicon
  const svgPath = path.join(staticDir, 'favicon.svg');
  if (fs.existsSync(svgPath)) {
    console.log('✅ favicon.svg 文件存在');
  } else {
    console.log('❌ favicon.svg 文件不存在');
  }
  
  // 检查manifest.json
  const manifestPath = path.join(staticDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    console.log('✅ manifest.json 文件存在');
  } else {
    console.log('❌ manifest.json 文件不存在');
  }
}

function generateFaviconInstructions() {
  console.log('\n📋 Favicon优化建议:');
  console.log('1. 确保favicon.ico文件大小在1KB-100KB之间');
  console.log('2. 包含16x16和32x32像素的图标');
  console.log('3. 使用透明背景');
  console.log('4. 确保图标清晰可识别');
  console.log('5. 测试在不同浏览器中的显示效果');
  
  console.log('\n🔍 验证步骤:');
  console.log('1. 访问 https://cypress.docslib.dev/favicon.ico');
  console.log('2. 检查浏览器开发者工具的Network标签');
  console.log('3. 确认favicon.ico返回200状态码');
  console.log('4. 在Bing站长平台提交URL并请求重新抓取');
}

checkFavicon();
generateFaviconInstructions(); 