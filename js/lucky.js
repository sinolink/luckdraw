//                   _oo0oo_
//                  o8888888o
//                  88" . "88
//                  (| -_- |)
//                  0\  =  /0
//                ___/`---'\___
//              .' \\|     |// '.
//             / \\|||  :  |||// \
//            / _||||| -:- |||||- \
//           |   | \\\  -  /// |   |
//           | \_|  ''\---/''  |_/ |
//           \  .-\__  '-'  ___/-. /
//         ___'. .'  /--.--\  `. .'___
//      ."" '<  `.___\_<|>_/___.' >' "".
//     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//     \  \ `_.   \_ __\ /__ _/   .-` /  /
// =====`-.____`.___ \_____/___.-`___.-'=====
//                   `=---='
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//           佛祖保佑         中得大奖

function cleanData(){
	var r=confirm("确定清除所有中奖数据？");
	if(r == true){
		localStorage.clear();
		$('#lucky-balls').html("");
	}else{
		return;
	}
	
}

var num = members.length - 1;
var show = $("#show");
var btn = $("#btn");
var open = false;

var oldItems = JSON.parse(localStorage.getItem('prizers')) || [];

function saveDataToLocalStorage(data){
	oldItems.push(data);
	localStorage.setItem('prizers', JSON.stringify(oldItems));
}

oldItems.forEach(function(data){
    $("#lucky-balls").prepend('<li style="left: 350px; top: 150px;">' + data.memberName + '</li>');
	// $('<li style="left: 350px; top: 150px;">' + data.memberName + '</li>').appendTo("#lucky-balls");
});

var prizer;
function change(){
	var randomVal = Math.round(Math.random() * num);
	prizer = members[randomVal];
	var prizeImg = prizer.fileName;
	show.html("<img src='images/"+prizeImg+"' />");
	btn.text(prizer.memberName);
	
}

function indexOfArray(data){
	var prizerName = data.memberName;
	for(var i=0; i<oldItems.length; i++){
		var iName = oldItems[i].memberName;
		if(prizerName == iName){
			return i;
		}
	}
	
	return -1;
}

function resetUI(){
	show.html("<img src='images/icon256.jpg' />");
	btn.text("开始抽奖");
	open = false;
}

function run(){
	if(!open){
		timer=setInterval(change,90);
		open = true;
	}else{
		clearInterval(timer);

		if(oldItems.length == members.length){
			alert("Ops,看上去大家都已中过奖了!");
			resetUI();
			return;
		}

		while(indexOfArray(prizer) != -1){
			change();
		}

		saveDataToLocalStorage(prizer);
        $("#lucky-balls").prepend('<li style="left: 350px; top: 150px;">' + prizer.memberName + '</li>');
		// $('<li style="left: 350px; top: 150px;">' + prizer.memberName + '</li>').appendTo("#lucky-balls");
		open = false;
	}
}

document.addEventListener('keydown', function(ev) {
if (ev.keyCode == '13') {
  run()
}else if(ev.keyCode == '79'){
	cleanData();
}
}, false)

// btn.click(function(){run();})
