/**
 * Created by Administrator on 2017/1/7.
 */
function Confirm(message,action1,action2) {
    Alert.call(this,message,action1);
    this.cancelAction = action2;
}

Confirm.prototype = Object.create(Alert.prototype);
Confirm.prototype.constructor = Confirm;

//按钮
Confirm.prototype.showButton = function () {
    var btnbox = document.querySelector('.modal-btn');

    var span1 = document.createElement('span');
    span1.className = 'modal-span';
    btnbox.appendChild(span1);

    //确定按钮
    var action1 = document.createElement('span');
    action1.innerText = '确定';
    action1.className = 'modal-btn-left';
    btnbox.appendChild(action1);

    //取消按钮
    var action2 = document.createElement('span');
    action2.innerText = '取消';
    action2.className = 'modal-btn-right';
    btnbox.appendChild(action2);

    var self = this;
    action1.onclick = function () {
        self.close();
        console.log(self);
        if(typeof self.action == 'function'){
            self.action()
        }
    };
    action2.onclick = function () {
        self.close();
        console.log(self);
        if(typeof self.action == 'function'){
            self.cancelAction()
        }
    }
};