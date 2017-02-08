const exp = require('express'),
	  fs = require('fs')

//创建一个路由
//路由:将发送到特定url的请求转交给指定的函数处理
const router = exp.Router();

router.post('/api/folder/add/:foldername',function(req,res){
    console.log(req.params.foldername);
    //通过路径传递的参数可以使用req.params获取
    // 获取在弹出框新建文件夹的名称
    var foldername = req.params.foldername;
    //获取新建文件夹的路径
    var path = `data/${foldername}`

    fs.exists(path,function(exists){
    	if(exists){
    		res.json({code:'faile',message:'文件夹已存在'})
    	}
    	else{
    		fs.mkdir(path,function(error){
    			if(error){
    				res.json({code:'error',message:'系统错误'})
    			}
    			else{
    				res.json({code:'success',message:'成功创建'})
    			}
    		})
    	}
    })

})
//导出router
module.exports = router
/*node.js中 每一个js文件都有独立的作用域,相互之间不会干扰,
也看不到其他js文件中的全局变量和函数
所以无法直接调用其他js文件中定义函数
模块相互调用只能使用模块导入require
和模块导出exports机制
*/