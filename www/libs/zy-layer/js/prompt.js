function Prompt(message,placeholder,action1,action2){
	Confirm.call(this,message,action1,action2);
	this.placeholder = placeholder;
}

Prompt.prototype = Object.create(Confirm.prototype);
Prompt.prototype.constructor = Prompt;

Prompt.prototype.showContent = function(box){
    box.classList.add('modal-prompt');

	var div = document.createElement('div');
	box.appendChild(div);
    div.className = 'modal-content';

	var input = document.createElement('input');
	input.type = 'text';
	input.placeholder = this.placeholder;
	div.appendChild(input);

	this.input = input;
	//是文本框获得焦点
	input.focus();
};

Prompt.prototype.text = function () {
	//只在弹出框中查找input,避免document中其他input干扰
	// var input = this.input;
	return this.input.value
}