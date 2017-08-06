var crypto = require('crypto')//加密模块
var request = require('request')//http请求模块
var mysql = require('mysql')//mysql模块
var schedule = require('node-schedule');
// 数据库配置
var conn = mysql.createConnection({
	host:'119.29.201.31',
	user:'root',
	password:'root',
	database:'nodemysql',
	port:3306
});
//连接数据库
conn.connect();
// 初始化全局变量
var tem,hum,indoor;
scheduleRecurrenceRule()
// 定时配置
function scheduleRecurrenceRule(){
	var rule = new schedule.RecurrenceRule();
	rule.hour = 15;
	schedule.scheduleJob(rule, function(){
		console.log('scheduleRecurrenceRule:'+new Date());
		getData();
	})
}
// Authorization生成
function getAuth(){
	var md5 = crypto.createHash('md5');//引入md5加密
	var apikey = "ecde8ce10c0148e7920dea692346fc2a";
	var secretKey = "7086d528bc6f4a10823a341f62a30b76";
	var time = new Date().getTime();
	var addStr = apikey + secretKey + time;
	var md5Str = md5.update(addStr).digest('hex')
	var jsonStr = '{"apiKey": "'+apikey+'","time": "'+time+'","sign":"'+md5Str+'"}'
	var finalStr = new Buffer(jsonStr).toString('base64')
	return finalStr;	
}

function getData(){
	conn.query('SELECT * FROM pet', function(err,rows,fields){
		console.log(rows[rows.length-1]);
		tem = rows[rows.length-1].tem;
		hum = rows[rows.length-1].hum;
		let indoorStatus = rows[rows.length-1].indoor;
		if (indoorStatus == 1) {
			indoor = "在"
		}else{
			indoor = "不在"
		}
		sendMsg(tem,hum,indoor)
	})
}

function sendMsg(p2,p3,p4){
	//短信模板请求参数设置
	var options = {
		url:"http://open.home.komect.com/api/v1/sms/send",
		method: 'POST',
		headers:{
			"content-type":"application/json",
			"Authorization": getAuth()
		},
		body:{
			messageSign: '治电科技',
		    mobile: '15755022403',
		    needReceipt: 0,
		    receiptNotificationURL: '',
		    templateId: 1344,
		    templateParameter: { param1: 'klren', param2: p2, param3: p3, param4: p4 }
		},
		json: true 
	}
	request(options, function(error, response,body){
		if (error) throw new Error(error);
		if(body.resultCode === 200){
			console.log("send success")
		}else {
			console.log("send fail")
		}
		console.log(body);
	})
}


// console.log("获取的时间戳:  "+time);
// console.log("拼接后的字符串:  "+addStr);
// console.log("md5加密:  "+md5Str)
// console.log("json字符串:  "+jsonStr)
// console.log("base64编码后字符串:  "+finalStr)
