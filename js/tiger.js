var tigerNumberTime=300;
var tigerIntervalTime=500;
var lock=0;

function tigerAction(){
	$('.tigerHand').addClass('active');
	$('.tigerNotice').remove();
	
	$('.tigerMain ul li').append('<div class="tigerAction"></div>');
}

function tigerEndEach(n){
	$('.tigerMain ul li').eq(n).find('.tigerAction').remove();	
}

function tigerGetResult(type,score){
	var type=type||0;
	var socre=score||'';
	
	//type 0 is random score
	if(type==0){
		score=Math.floor(Math.random()*1000);	
		
		tigerOutNumber(score);
	
	}
	else if(type==1){
		tigerOutNumber(score);
	}
}

function tigerMsg(score){
	$('.tigerRewards').find('.score').html(score);
	$('.tigerRewards').fadeIn('slow');
}


function tigerOutNumber(score){
	var firstNum=Math.floor(score/100);
	var secondNum=Math.floor((score-firstNum*100)/10);
	var thirdNum=Math.floor(score-firstNum*100-secondNum*10);
	
	var timeNum=[firstNum,secondNum,thirdNum];
	
	var pic=102;
	
	lock=0;
	function al(){
	
	 if(lock<timeNum.length){
		 setTimeout(function(){
		 tigerEndEach(lock);
		 $('.tigerMain ul li').eq(lock).find('.tigerPiece').animate({top:(-1)*timeNum[lock]*pic+'px'},tigerNumberTime);
	 	 //console.log(lock);
		 lock++;
		 if(lock==3){
			tigerMsg(score);		 
		 }
		 al();
		 },tigerIntervalTime*lock);
	 }
	}
	al();
	/* ie9 bug 
	while(lock<3){
		setTimeout(function(lock){
			tigerEndEach(lock);
			//console.log(new Date().getSeconds());
			$('.tigerMain ul li').eq(lock).find('.tigerPiece').animate({top:(-1)*timeNum[lock]*pic+'px'},tigerNumberTime);
			if(lock==2){
				tigerMsg(score);
			}
		},tigerIntervalTime*lock,lock);
		lock++;
	}
		
	*/
	//console.log(firstNum,secondNum,thirdNum);	
}


$(document).ready(function(){
	$('.tigerClose').click(function(){
		$('.gTiger').fadeOut('300');	
	});
	
	$('.tigerHand').click(function(){
		tigerAction();
		setTimeout("tigerGetResult(0)",2000);
	})
	
})




jQuery.extend(jQuery.easing,{
		bounceOut: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeOut:function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		elasticOut: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		}
	});