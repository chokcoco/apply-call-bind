//apply 、 call
function fruits() {}

fruits.prototype = {
	color: "red",
	say: function() {
		console.log("My color is " + this.color);
	}
}

var apple = new fruits;
apple.say();	//My color is red

banana = {
	color: "yellow"
}
apple.say.call(banana);		//My color is yellow
apple.say.apply(banana);	//My color is yellow

//apply 、 call 区别
var func = function(arg1, arg2) {

};

func.call(this, arg1, arg2); 
func.apply(this, [arg1, arg2])

//apply 、 call 示例
var array1 = [12 , "foo" , {name "Joe"} , -2458];  
var array2 = ["Doe" , 555 , 100];  
Array.prototype.push.apply(array1, array2);  
/* array1 值为  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */

var  numbers = [5, 458 , 120 , -215 ];  
var maxInNumbers = Math.max.apply(Math, numbers),	//458
	maxInNumbers = Math.max.call(5, 458 , 120 , -215)	//458

functionisArray(obj){  
    returnObject.prototype.toString.call(obj) === '[object Array]' ;
}


function log(msg)　{
  console.log(msg);
}

log(1);
log(1,2);

function log(){
  console.log.apply(console, arguments);
};


log(1);
log(1,2);

function log(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');

  console.log.apply(console, args);
};

//bind 示例
var foo = {
	bar : 1,
	eventBind: function(){
		var _this = this ;
		$('.someClass').on('click',function(event) {
			/* Act on the event */
			console.log(_this.bar);		//1
		});
	}
}

var foo = {
	bar : 1,
	eventBind: function(){
		$('.someClass').on('click',function(event) {
			/* Act on the event */
			console.log(this.bar);		//1
		}.bind(this));
	}
}


varfoo = {
    x: 3
}
 
var bar = function(){
    console.log(this.x);
}
 
bar(); // undefined
var func = bar.bind(foo);
func(); // 3

var obj = {
	x: 81,
};

var foo = {
	getX: function() {
		return this.x;
	}
}

console.log(foo.getX.bind(obj)());		//81
console.log(foo.getX.call(obj));		//81
console.log(foo.getX.apply(obj));		//81