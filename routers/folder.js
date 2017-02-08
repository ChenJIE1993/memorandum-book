const exp = require('express'),
      fs = require('fs')
	  
const router = exp.Router()


router.get('/folder/:foldername',function(req,res){
	var foldername = req.params.foldername;

	var path = `data/${foldername}`;
    fs.exists(path,function(exists){
       if(exists){
       		fs.readdir(path,function(err,files){
       			//创建一个空数组
       			var data = [];
               //封装一个方法
               function recFile(index){
               		if(index<files.length){
               			var file = files[index];
               			// fs.stat 获取文件信息 第一参数:路径;第二参数:回调函数
               			// 回调函数包含两个参数一个是err,另一个stats 包含文件信息
               			//如 文件大小(字节数)和创建时间修改时间等有用信息
               			fs.stat(`data/${foldername}/${file}`,function(err,stats){
               				//stats.isFile() 判断路径是否为文件夹
               				// stats.isDirectory()判断被查看对象是否是一个目录
               				// 如果是目录，返回true
               				// stats.birthtime 获取文件创建时间
               				if(stats.isFile()){
               					data.push({name:file,time:stats.birthtime})
               					console.log({name:file,time:stats.birthtime})
               				}
               				//先+1 后使用 ++index
               				recFile(++index);
               			})
               		}
               		else{
               			//递归处理完毕 渲染页面
               			res.render('folder',{foldername,files:data})
               		}
                }
                recFile(0)

       		})
        }
        else{
        	//重定向,在服务端控制浏览器跳转到指定页面
        	res.redirect('/')
        }
    })

	/*res.render('folder',{
		foldername
	})*/
})
module.exports = router;