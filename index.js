const express = require('express'),
	  template = require('art-template'),
	  bodyParser = require('body-parser')

const app = express();

template.config('cache',false);

template.helper('filename',function(f){
	var i = f.lastIndexOf('.')
	if(i>-1){
		return f.substr(0,i)
	}
	return f
})
template.helper('formatTime',function(t){
	var M = t.getMonth()+1;
	var d = t.getDate()
	var h = t.getHours()
	var m = t.getMinutes()

	M = M < 10 ? '0' + M : M;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;

   return t.getFullYear()+'-'+M +'-'+ d +'--'+ h +':'+ m
})

//静态文件夹
app.use(express.static('www'));
app.use(bodyParser.urlencoded({extended:false}));
//加载模块
app.use(require('./routers/api/folder'));
app.use(require('./routers/api/note'));
app.use(require('./routers/index'));
app.use(require('./routers/folder'));
//使用路由处理以/folder开头的请求,路由在./routers/folder.js模块中定义
app.use('/folder',require('./routers/new'));
//使用template.__express 处理html后缀名的视图,指定html文件的模板引擎
app.engine('html',template.__express);
//指定默认的视图文件时.html文件,即res.render('index')省略后缀名.html
app.set('view engine','html')

app.listen(3000,function(){
	console.log('running.......')
})