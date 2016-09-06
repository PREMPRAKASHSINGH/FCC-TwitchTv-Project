var streamapi="https://api.twitch.tv/kraken/streams/";
var channelapi="https://api.twitch.tv/kraken/channels/";
var channels=["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","ESL_SC2","comster404","brunofin"];

var allStreamCall=function(streamchannel){
	var logo,name,game,status,statusdesc,channel_link;

	var streamchannel_url=streamapi+streamchannel+"?callback=?";
	var channel_url=channelapi+streamchannel+"?callback=?";
	
	$.getJSON(streamchannel_url,function(data){
		if(data.status=='404'){ //if user not found
			game=data.message;
			status="offline";
			statusdesc="";
		}
		else if(data.status=='422'){ //if user unavailable or closed their account
			game=data.message;
			status="offline";
			statusdesc="";
		}
		else{
			data=data.stream;
			if(data===null){
				game="offline";
				status="offline";
				statusdesc="";
				logo="http://www.gravatar.com/avatar/3c069b221c94e08e84aafdefb3228346?s=47&d=http%3A%2F%2Fwww.techrepublic.com%2Fbundles%2Ftechrepubliccore%2Fimages%2Ficons%2Fstandard%2Ficon-user-default.png";
			}
			else{
				game=data.channel.game;
				status="online";
				statusdesc=":"+data.channel.status;
			}	
		}
        $.getJSON(channel_url,function(data){
			name=data.display_name;
			logo=data.logo;
          	channel_link=data.url;
          	if(data.status=='404'){ //if user not found
          		name=streamchannel;
          		channel_link="#";
          		logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
          	}
          	else if(data.status=='422'){ //if user unavailable or closed their account
          		name=streamchannel;
          		channel_link="#";
          		logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";	
          	}
          	else if(logo===null){
			   logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
			}
			var result="\
			<div class='row' id='"+status+"'>\
				<div class='col-md-3 col-xs-4'>\
					<span class='logo'><img class='img img-circle' src='"+logo+"'></span>\
					<a href='"+channel_link+"'>\
						<span class='name text-center'>"+name+"</span>\
					</a>\
				</div>\
				<div class='col-md-9 col-xs-8 text-center' id='statusdescription'>\
						<span class='game'>"+game+"</span>\
						<span class='status'>"+statusdesc+"</span>\
				</div>\
			</div>";


			if(status=='offline')
			   $('.res').append(result);
		    else
		    	$('.res').prepend(result);
		});
   });
}; //for all online and offline channels closed

$(document).ready(function(){

//******Adding all streaming channels*******
	channels.forEach(function(channel){
		allStreamCall(channel);
	});

//******Adding all streaming channels closed*******

//******all onClick streaming channels*******
  $('#all').click(function(){
  	var all=$('.res .row');
  	all.each(function(index){
  		var toggle=$(this).attr('id');
		$(this).css({'display':'block'});
  	});
  });

//******all onClick streaming channels closed*******

//******online onClick streaming channels*******
  $('#online').click(function(){
  	var online=$('.res .row');
  	online.each(function(index){
  		var toggle=$(this).attr('id');
  		if(toggle=='online'){
  			$(this).css({'display':'block'});
  		}
  		else if(toggle=='offline'){
  			$(this).css({'display':'none'});
  		}
  	});
  });

//******online onClick streaming channels closed*******

//******offline onClick streaming channels*******
  $('#offline').click(function(){
  	var offline=$('.res .row');
  	offline.each(function(index){
  		var toggle=$(this).attr('id');
  		if(toggle=='online'){
  			$(this).css({'display':'none'});
  		}
  		else if(toggle=='offline'){
  			$(this).css({'display':'block'});
  		}
  	});
  });

//******offline onClick streaming channels closed*******


});