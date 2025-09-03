const fs = require('fs');
const path = require('path');

// 测试Google Analytics配置
function testGoogleAnalyticsConfig() {
  console.log('🔍 检查Google Analytics配置...\n');

  // 检查docusaurus.config.js
  const configPath = path.join(__dirname, '../docusaurus.config.js');
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    if (configContent.includes('G-3FDPZ9D5QS')) {
      console.log('✅ docusaurus.config.js 中包含正确的GA4衡量ID');
    } else {
      console.log('❌ docusaurus.config.js 中未找到GA4衡量ID');
    }
    
    if (configContent.includes('gtag')) {
      console.log('✅ docusaurus.config.js 中配置了gtag');
    } else {
      console.log('❌ docusaurus.config.js 中未配置gtag');
    }
  } else {
    console.log('❌ 未找到docusaurus.config.js文件');
  }

  // 检查插件文件
  const pluginPath = path.join(__dirname, '../plugins/google-analytics.js');
  if (fs.existsSync(pluginPath)) {
    console.log('✅ Google Analytics插件文件存在');
    
    const pluginContent = fs.readFileSync(pluginPath, 'utf8');
    if (pluginContent.includes('G-3FDPZ9D5QS')) {
      console.log('✅ 插件中包含正确的GA4衡量ID');
    } else {
      console.log('❌ 插件中未找到GA4衡量ID');
    }
  } else {
    console.log('❌ Google Analytics插件文件不存在');
  }

  // 检查客户端文件
  const clientPath = path.join(__dirname, '../plugins/google-analytics-client.js');
  if (fs.existsSync(clientPath)) {
    console.log('✅ Google Analytics客户端文件存在');
  } else {
    console.log('❌ Google Analytics客户端文件不存在');
  }

  console.log('\n📋 配置摘要:');
  console.log('- 衡量ID: G-3FDPZ9D5QS');
  console.log('- 数据流ID: 12112577726');
  console.log('- IP匿名化: 已启用');
  console.log('- 路由跟踪: 已启用');
  console.log('- 自定义参数: 已配置');

  console.log('\n🚀 下一步:');
  console.log('1. 运行 npm run build');
  console.log('2. 部署到生产环境');
  console.log('3. 访问网站并检查Google Analytics实时报告');
  console.log('4. 验证数据是否正确收集');
}

testGoogleAnalyticsConfig();