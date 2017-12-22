/* streamFunctions.js
 * Copyright (C) Matt Jones - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var username = "bellowingfellow";
var userID = "124816807"
var clientId = "2m7nhqc3jdsznq7vfvlswf2gm2207d";

var pressPlay;

var uptime;

function online() {
	function getInfo(){

		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + username,
		 headers: {
		   'Client-ID': clientId
		 },
		 success: function(data) {
		   console.log(data);

			var title = data.stream.channel.status;
			document.getElementById('title').innerHTML = title;
			document.getElementById("player").src = "https://player.twitch.tv/?channel=" + username + "&autoplay=false";
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
	   'Client-ID': clientId
	 },
	 success: function(data) {
	   console.log(data);

	  if (data._total == 0)
		{
			document.getElementById('title').textContent = "No Recent Broadcasts";
		}
		else {
			document.getElementById('liveStatus').textContent = "offline";
			document.getElementById('liveStatus-m').textContent = "offline";
		   try {
				document.getElementById('title').innerHTML = "<strong>Recent Broadcast: </strong>" + data.videos[0].title;
				var title = data.videos[0].title;
		   }
		   catch(err) {
				document.getElementById('title').innerHTML = "<strong>No Recent Broadcasts</strong>";
		   }

			document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autoplay=false";
		} //end else

	 },	 //end success
	 error: function () {
		 playerError();
	 }
	}); //end ajax
}

function playerError() {
	document.getElementById('player').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
	document.getElementById('title').textContent = "Error loading video";
}
