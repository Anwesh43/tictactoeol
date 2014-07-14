var obj,ctx;
var x=new Array(9),y=new Array(9);
var xhr;
var xline=[150,150,180,210],yline=[130,160,100,100];
var cur=0;
var j=0;
var bools=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
var xtart=0,ystart=0,xend=0,yend=0;
var isupdate=true;
var at2p=false;
var nplayers=0;
var gameid;
var you='';
var opponent='';
var oppdiv,youdiv;
var mymarker="";
window.onload=function()
{
	obj=document.getElementById('container');
	ctx=obj.getContext('2d');
	oppdiv=document.getElementById('opponent');
	youdiv=document.getElementById('you');
	var name=prompt('enter your name');
	you=name;
	$.ajax({url:'Nplayers.php',type:'GET'}).success(function(data){
	var et=data.split(' ');
	nplayers=parseInt(et[0]);
	gameid=parseInt(et[1]);
	console.log(nplayers);
	if(nplayers==2 || nplayers==0)
	{$.ajax({url:'InsertTica.php',type:'POST',data:{'name':name}});
		gameid++;
	}
	else
	{$.ajax({url:'2ndplayer.php',type:'POST',data:{'name':name,'id':gameid}});
	$.ajax({url:'GetPlayer1.php',type:'POST',data:{'id':gameid}}).success(function(data){
	opponent=data;
	});
	
	at2p=true;
	
	}
	update();
	});
	
	xhr=new XMLHttpRequest();
	
	
};
document.ontouchstart=function(event)
{
var x1=event.touches[0].pageX;
var y1=event.touches[0].pageY;
if(x1>=150 && x1<=240 && y1>=100 && y1<=190 && isupdate && at2p)
{
if(cur==j)
{
	var isk=false;
	for(var i=0;i<j;i++)
	{
		if(x1>=x[i]-15 && x1<=x[i]+15 && y1>=y[i]-15 && y1<=y[i]+15)
		{
			isk=true;
			break;
		}
		else
		{
			isk=false;	
		}
	}
	if(!isk)
	{
		x[j]=150+(30*Math.floor((x1-150)/30))+15;
		y[j]=100+(30*Math.floor((y1-100)/30))+15;
		bools[Math.floor((x1-150)/30)+3*Math.floor((y1-100)/30)]=j%2;
		console.log(Math.floor((x1-150)/30)+Math.floor((y1-100)/30)*3);
		$.ajax({url:'InsertTic.php',type:'post',data:{'x':x[j],'y':y[j],'j':j+1,'id':gameid}});
		if(j%2==0)
			mymarker="cross";
		if(j%2==1)
			mymarker="round";
		j++;	
		cur=j-1;
	}
}
}
};
window.onmousedown=function(event)
{
var x1=event.pageX,y1=event.pageY;

if(x1>=150 && x1<=240 && y1>=100 && y1<=190 && isupdate && at2p)
{
if(cur==j)
{
	var isk=false;
	for(var i=0;i<j;i++)
	{
		if(x1>=x[i]-15 && x1<=x[i]+15 && y1>=y[i]-15 && y1<=y[i]+15)
		{
			isk=true;
			break;
		}
		else
		{
			isk=false;	
		}
	}
	if(!isk)
	{
		x[j]=150+(30*Math.floor((x1-150)/30))+15;
		y[j]=100+(30*Math.floor((y1-100)/30))+15;
		bools[Math.floor((x1-150)/30)+3*Math.floor((y1-100)/30)]=j%2;
		console.log(Math.floor((x1-150)/30)+Math.floor((y1-100)/30)*3);
		$.ajax({url:'InsertTic.php',type:'post',data:{'x':x[j],'y':y[j],'j':j+1,'id':gameid}});
		if(j%2==0)
			mymarker="cross";
		if(j%2==1)
			mymarker="round";
		j++;	
		cur=j-1;
	}
}
}
};
function checkHorizontal(index)
{
var bool=false;
var i=Math.floor((x[index]-165)/30)+3*Math.floor((y[index]-115)/30);

	if(i%3!=0 && i%3!=2)
	{
	if(bools[i-1]!=-1 && bools[i+1]!=-1)
	{
	if(bools[i-1]==bools[i] && bools[i+1]==bools[i])
		{
		xstart=x[index]-45;ystart=y[index];xend=x[index]+45;yend=y[index];
		
		bool=true;
		}
	}
	}
	return bool;
}
function checkVertical(index)
{
var i=Math.floor((x[index]-165)/30)+3*Math.floor((y[index]-115)/30);
var bool=false;
	if(Math.floor(i/3)!=0 && Math.floor(i/3)!=2)
	{
		if(bools[i-3]!=-1 && bools[i+3]!=-1)
		{
		if(bools[i-3]==bools[i] && bools[i+3]==bools[i])
		{
		xstart=x[index];ystart=y[index]-45;xend=x[index];yend=y[index]+45;
		
		bool=true;
		}
		}
	}
	return bool;
}
function checkDiagonal(index)
{
var i=Math.floor((x[index]-165)/30)+3*Math.floor((y[index]-115)/30);
var bool=false;
	if(Math.floor(i/3)!=0 && Math.floor(i/3)!=2 && i%3!=0 && i%3!=2)
	{

	if((bools[i-4]==bools[i] && bools[i+4]==bools[i]) && (bools[i-4]!=-1 && bools[i+4]!=-1))
		{
		xstart=x[index]-45;ystart=y[index]-45;
		xend=x[index]+45;yend=y[index]+45;
		bool=true;
		}
	if((bools[i-2]==bools[i] && bools[i]==bools[i+2]) && (bools[i-2]!=-1 && bools[i+2]!=-1))
	{
		xstart=x[index]+45;ystart=y[index]-45;
		xend=x[index]-45;yend=y[index]+45;
		bool=true;
	}
	}
	return bool;
}
function update()
{
	ctx.clearRect(0,0,1000,600);
	if(!at2p)
	{
		$.ajax({url:'Nplayers.php',type:'GET'}).success(function(data){
		var et=data.split(' ');
		if(parseInt(et[0])==2 && parseInt(et[1])==gameid)
		{at2p=true;
		$.ajax({url:'GetPlayer2.php',type:'POST',data:{'id':gameid}}).success(function(data){
		opponent=data;
		});
		}
		});
	}
	for(var i=0;i<2;i++)
	{
		ctx.beginPath();
		ctx.moveTo(xline[i],yline[i]);
		ctx.lineTo(xline[i]+90,yline[i]);
		ctx.stroke();
	}
	for(var i=2;i<4;i++)
	{
		ctx.beginPath();
		ctx.moveTo(xline[i],yline[i]);
		ctx.lineTo(xline[i],yline[i]+90);
		ctx.stroke();
	}
	
	xhr.open("GET","PDO8.php?id="+gameid);
	xhr.onreadystatechange=function()
	{
		if(xhr.readyState==4 && xhr.status==200)
		{
			var msg=xhr.response;
			if(msg!='')
			{
			var e1=msg.split(' ');
			if(j==parseInt(e1[2]-1))
			{
			x[j]=parseInt(e1[0]);
			y[j]=parseInt(e1[1]);
			bools[Math.floor((x[j]-165)/30)+3*Math.floor((y[j]-115)/30)]=j%2;
			j=parseInt(e1[2]);
			cur=j;
			}
			}
		}
	};
	xhr.send(null);
	
	for(var i=0;i<j;i++)
	{
		if(i%2==0)
		{
			drawCross(i);
		}
		else
		{
			drawRound(i);
		}
	}
	for(var i=0;i<j;i++)
	{
		if((checkHorizontal(i) || checkVertical(i) || checkDiagonal(i)))
		{
			ctx.beginPath();
			ctx.moveTo(xstart,ystart);
			ctx.lineTo(xend,yend);
			ctx.stroke();
			winCondition(i);
			isupdate=false;
			break;
		}
		else if(i==8)
		{
			drawCondition(i);
			isupdate=false;
		}
	}
	youdiv.innerHTML='Hi '+you;
	oppdiv.innerHTML='Opponent is '+opponent;
	if(isupdate)
	setTimeout("update()",100);
}
function drawCross(index)
{
	for(var i=0;i<4;i++)
	{
	ctx.save();
	ctx.translate(x[index],y[index]);
	ctx.rotate(i*Math.PI/2+Math.PI/4);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,5);
	ctx.stroke();
	ctx.restore();
	}
}
function drawRound(index)
{
	ctx.beginPath();
	ctx.arc(x[index],y[index],5,0,2*Math.PI);
	ctx.stroke();
}
function winCondition(index)
{
var ps="";
	if(index%2==0)
	{
		ps="cross";
	}
	else
	ps="round";
	if(ps==mymarker)
	{
		alert('winner is '+you);
	}
	else
	alert('winner is '+opponent);
}
function drawCondition(index)
{
	alert('There is a draw between you and '+opponent);
}