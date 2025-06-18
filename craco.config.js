// 由于cra是黑盒，所以要通过该插件进行对cra的拓展配置
const path = require('path')

module.exports = {
    webpack: {
        alias: {
         '@':path.relative(__dirname,'src')      
       }
   } 
}