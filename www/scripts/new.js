$('header>span:first-child').click(function(){
	var url = "/api/note/"+$(this).text();
	console.log(url);
	var content = $('#note').val();
	console.log(content);
	var title = content.trim();
	console.log(title);
	if(title.length>0){
		var data = {content:content};
		$.post(url,data,function(res){
            if(res.code == 'success'){
            	history.back();
            }
            else{
            	new Alert(res.message).show()
            }
		})
	}
	else{
		history.back();
	}
})