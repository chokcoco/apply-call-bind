# 深入浅出 妙用Javascript中apply、call、bind

## apply、call用法的简单示例
```javascript
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
```


## apply 、 call 区别
注意apply传递的参数是数组，而call是按参数顺序传递
```javascript
var func = function(arg1, arg2) {

};

func.call(this, arg1, arg2); 
func.apply(this, [arg1, arg2])
```

## apply 、 call 用法示例

* 数组之间追加
```javascript
var array1 = [12 , "foo" , {name "Joe"} , -2458];  
var array2 = ["Doe" , 555 , 100];  
Array.prototype.push.apply(array1, array2);  
/* array1 值为  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

* 获取数组中的最大值和最小值
```javascript
var  numbers = [5, 458 , 120 , -215 ];  
var maxInNumbers = Math.max.apply(Math, numbers),	//458
	maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215);	//458
```

* 验证是否是数组（前提是toString()方法没有被重写过）
```javascript
functionisArray(obj){  
    returnObject.prototype.toString.call(obj) === '[object Array]' ;
}
```

* 类（伪）数组使用数组方法
```javascript
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```

## 一道面试题目
```javascript
//使用 log 代理 console.log
function log(msg)　{
  console.log(msg);
}

log(1);
log(1,2);

//优雅的方法
function log(){
  console.log.apply(console, arguments);
};

log(1);
log(1,2);

//添加一个 (app) 前缀
function log(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');

  console.log.apply(console, args);
};
```

## bind 用法简单示例
```javascript
// 正常情况下使用变量保存 this 值
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

// 使用 bind 进行函数绑定
var foo = {
	bar : 1,
	eventBind: function(){
		$('.someClass').on('click',function(event) {
			/* Act on the event */
			console.log(this.bar);		//1
		}.bind(this));
	}
}
```

```javascript
varfoo = {
    x: 3
}
 
var bar = function(){
    console.log(this.x);
}
 
bar(); // undefined
var func = bar.bind(foo);
func(); // 3
```

## apply、call、bind 比较
``` javascript
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
```
