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
   'Client-ID': clientId
 },
 success: function(data) {
   console.log(data);
   if (data.stream)
   {
   online();
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
		document.getElementById('liveStatus').textContent = "hosting " + data.hosts[0].target_display_name;
		document.getElementById('liveStatus-m').textContent = "hosting " + data.hosts[0].target_display_name;

		function getHostInfo() {
		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
		 headers: {
		   'Client-ID': clientId
		 },
		 success: function(data) {
		   console.log(data);

		   if (data.stream) {
		   document.getElementById('title').innerHTML = data.stream.channel.status;
       document.getElementById("player").src = "https://player.twitch.tv?channel=" + data.stream.channel.name + "&autoplay=false";
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
 },
error: function () {
	playerError();
}
});
