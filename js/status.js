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
       document.getElementById("player").src = "https://player.twitch.tv?channel=" + data.stream.channel.name + "&autoplay=false";

		   } //endif stream
		   else {
				streamOffline();
			}
		 }
		});
		}
		getHostInfo();
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
