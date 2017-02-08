$('footer>span').click(function(){
	new Prompt('新建文件夹','请输入新建文件夹名称',function(){
		var foldername = this.text().trim();
		// .trim() 去除空白
		//如果输入内容为空弹出,就不再向下执行
		if(foldername.length == 0){
			new Alert('必须填写新建文件夹名称').show();
			return;
		}
		/*new RegExp();创建一个正则表达式对象
		.test(str)使用正则表达式测试str字符串是否符合模式
		^表示正则表达式必须从第一个字符串开始测试
		$表示正则表达式必须测试到最后一个字符
		如果不写^$ 则只要字符串一部分符合条件及通过测试
		^ 表示一行开头 行首
		$ 表示一行结尾
		正则表达式的字面量写法 /正则表达式/*/
		if(!(/^[a-z0-9A-Z\u4e00-\u9fa5]{1,16}$/.test(foldername))){
              new Alert('文件夹名字不能使用特殊字符!').show()
              return
         }
		$.post('/api/folder/add/' + foldername,null,function(res){
			if(res.code == 'success'){
				location.href='/'
			}
			else{
				new Alert(res.message).show()
			}
		});
		console.log(foldername)
	}).show()
});