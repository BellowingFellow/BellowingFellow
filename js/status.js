/* status.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
ytDisplay();
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': '6rwxu0jdtxuhhgzqszxilv1jw6uhlv'
 },
 success: function(data) {
   console.log(data);
   if (data.stream)
   {
   displayTitle();
   onlineFrame();
   }
   else 
   {
	$.ajax({
	 type: 'GET',
	 url: 'https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/hosts?include_logins=1&host=' + userID,
	 success: function(data) {
	   console.log(data);
	   if (data.hosts[0].target_login == null)
	   {
			streamOffline();
	   }
	   else
	   {
		document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + data.hosts[0].target_login + "-800x450.jpg";
		document.getElementById('liveStatus').textContent = "hosting " + data.hosts[0].target_display_name;
		document.getElementById('liveStatus-m').textContent = "hosting " + data.hosts[0].target_display_name;
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		}
		function getHostInfo() {
		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
		 headers: {
		   'Client-ID': '6rwxu0jdtxuhhgzqszxilv1jw6uhlv'
		 },
		 success: function(data) {
		   console.log(data);
		   
		   if (data.stream) {
		   document.getElementById('title').innerHTML = data.stream.channel.status;
		   if (data.stream.game == "Creative")
		   {
			   document.getElementById('streaminfo').textContent = "Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		   }
		   else{
		   
		   document.getElementById('streaminfo').textContent = "Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		   }
		   
		   } //endif stream
		   else {
				streamOffline();
			}
		 }
		});


		}
		getHostInfo();
		setInterval(getHostInfo,10000);
		
	   }
	 },
	 error: function () {
		 playerError();
	 }
	});
   }
 }
});