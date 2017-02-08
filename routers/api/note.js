const exp = require('express'),
      fs = require('fs')


const router = exp.Router()


router.post('/api/note/:foldername',function(req,res){
	var content = req.body.content;
	var foldername = req.params.foldername;
	console.log(foldername);
	console.log(content);
	var filename = content.trim();//去除空白

	// var result = /[a-z0-9A-Z\u4e00-\u9fa5]*/.exec(filename);//正则,字面量表示
	// new RegExp() 创建正则表达式对象
    // exec() 方法用于检索字符串中的正则表达式的匹配。
    //返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
	var a = new RegExp('[a-z0-9A-Z\u4e00-\u9fa5]*');
	var result = a.exec(filename);
	filename = result[0];
	console.log('rrr',result);
	console.log('ffff',filename);
	if(filename.length > 0){
		var path = `data/${foldername}/${filename}.txt`;
        
        fs.appendFile(path,content,function(err){
        	if(err){
        		res.json({code:'error',message:'系统错误'})
        	}
        	else{
        		res.json({code:'success',message:'成功'})
        	}
        })
	}
	else{
		res.json({code:'faile',message:'请输入文字信息'})
	}
})

module.exports = router;