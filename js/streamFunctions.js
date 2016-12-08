/*
	streamFunctions.js
	Copyright (c) mattunderscore.co
	All rights reserved
*/
var username = "bellowingfellow";

var pressPlay;

var uptime;

function displayTitle()
{
	document.getElementById('liveStatus').textContent = "is currently live";
	document.getElementById('liveStatus-m').textContent = "is currently live";
	function getInfo(){
			
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': '6rwxu0jdtxuhhgzqszxilv1jw6uhlv'
 },
 success: function(data) {
   console.log(data);
   
   var title = data.stream.channel.status;
	   
	var linkedTitle = title.replace("@YaBoiJT_", "<a href='https://twitter.com/yaboijt_'>@YaBoiJT_</a>");
   
   document.getElementById('title').innerHTML = linkedTitle;
   
   if (data.stream.game == "Creative")
   {
	   document.getElementById('streaminfo').textContent = "Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
   else{
   
   document.getElementById('streaminfo').textContent = "Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
 }
});	
	}
	
	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + username + "-800x450.jpg";
	pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);	
		}
}

function streamOffline()
{
	$.ajax({
	 type: 'GET',
	 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
	 headers: {
	   'Client-ID': '6rwxu0jdtxuhhgzqszxilv1jw6uhlv'
	 },
	 success: function(data) {
	   console.log(data);
	   
	   	if (data._total == 0)
		{
			document.getElementById('title').textContent = "Error 404 - no stream data found";
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
			document.getElementById('button-play-link').style.visibility = "hidden";
		}
	   	 
		var thumbRaw;
		if (data.videos[0].thumbnails[2] == null)
		{
		thumbRaw = data.videos[0].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[0].thumbnails[2].url;}
	   
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-800x450.jpg"
		
		document.getElementById('vod-thumbnail').src = thumbHD;
		document.getElementById('title').textContent = data.videos[0].title;
		//document.getElementById('liveStatus').textContent = "is currently offline";
		//document.getElementById('liveStatus-m').textContent = "is currently offline";
		var title = data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		}

		
		
		
		
	 }
	});
}