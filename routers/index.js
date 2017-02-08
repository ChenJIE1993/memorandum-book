const exp = require('express')
      fs  = require('fs')


const  router = exp.Router()

router.get('/',function(req,res){
	// fs.readdiry 异步读取文件夹的目录
	/*第一个参数路径
	回调函数(err, 指定目录下所有文件名称的 数组)*/
	fs.readdir('data',function(error,folders){
		/*for(var i=0;i<folders.length;i++){
			var folder = folders[i]
			fs.readdir(`data/${folder}`,function(err,flies){
				console.log(flies.length)
			})
		}*/

		//递归函数让函数调用自己

		var data = []
		// 第一个参数:表示要读取文件夹的索引
		// folders:表示需要读取的所有文件夹
		function count(index){
			if(index<folders.length){
				//索引在范围内
				var folder = folders[index];
				//开始执行异步任务
				fs.readdir(`data/${folder}`,function(err,files){
					if(!err){
						data.push({name:folder,count:files.length})
					}
					//将index加1然后再次调用count开始一个新的循环
					count(++index)
				})
			}
			else{
				//索引超出范围 data数据收集完毕
				res.render('index',{folders:data})
			}
		}
		count(0)
	})
})
module.exports = router