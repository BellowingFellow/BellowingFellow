/* streamFunctions.js
 * Copyright (C) Matt Jones - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
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
			document.getElementById('liveStatus-m').textContent = "live";
			
			
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
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);	
		}
}

function ytDisplay() {
	
	
	$.ajax({
		 type: 'GET',
		 url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUR8kI87wsdHT4cVZyqsUVOg&maxResults=1&key=AIzaSyDRGoNzXk7wVpE2lCXG9SS7wPMZhmFSEhI',
		 success: function(data) {
			console.log(data);
			if (data.items[0] != undefined && data.items[0] != null) {
				document.getElementById('yt-title').innerHTML = "<strong>Recent Video: </strong>" + data.items[0].snippet.title;
				document.getElementById('yt-player').src = "https://www.youtube.com/embed/" + data.items[0].snippet.resourceId.videoId;
			}
			else {
				for (var i = 0; i < document.querySelectorAll(".yt-group").length; i++) {
					document.getElementsByClassName("yt-group")[i].style.display = "none";
				}
			}
			
			
		 }, //end success
		 error: function () {
		}
		});	// end ajax
	
	
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
		if (data.videos[0].thumbnails == null)
		{
			try {
				thumbRaw = data.videos[0].thumbnails[0].url;
				formatThumbnail();
			}
			catch(err) {
				 document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1170x659.jpg";
			}
		}
		else {
			try {
			thumbRaw = data.videos[0].thumbnails[2].url;
			formatThumbnail();
			}
			catch(err) {
				 document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1170x659.jpg";
			}
		}
		
	   function formatThumbnail() {
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-1170x659.jpg"
	   document.getElementById('vod-thumbnail').src = thumbHD;
	   }
		document.getElementById('title').innerHTML = "<strong>Recent Broadcast: </strong>" + data.videos[0].title;
		document.getElementById('liveStatus').textContent = "offline";
		document.getElementById('liveStatus-m').textContent = "offline";
		var title = data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);
		
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