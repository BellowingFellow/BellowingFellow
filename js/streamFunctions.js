/*
	streamFunctions.js
	Copyright (c) mattunderscore.us
	All rights reserved
*/
var username = "bellowingfellow";
var userID = "124816807"

var pressPlay;

var uptime;

function displayTitle() {
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
			document.getElementById('title').innerHTML = title;
			document.getElementById('liveStatus').textContent = "live for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers playing " + data.stream.game;
			//document.getElementById('liveStatus-m').textContent = "live";
			
			
		 }, //end success
		 error: function () {
			playerError();
		}
		});	// end ajax
		} //end getInfo
		
		getInfo();
		setInterval(getInfo,10000);
}

function onlineFrame() {
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + username + "-800x450.jpg";
	pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);	
		}
}

function streamOffline() {
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
		document.getElementById('liveStatus').textContent = "offline";
		//document.getElementById('liveStatus-m').textContent = "is currently offline";
		var title = data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		
		} //end pressPlay
	
	 },	 //end success
	 error: function () {
		 playerError();
	 }
	}); //end ajax
}
function playerError() {
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
	document.getElementById('title').textContent = "Error loading video";
	document.getElementById('button-play-link').style.visibility = "hidden";
}