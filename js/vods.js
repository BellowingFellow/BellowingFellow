function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);
   
   //vod 1
   var thumbRaw;
   
		if (data.videos[1].thumbnails[0] == null)
		{
			thumbRaw = "https://placehold.it/400x225"
		}
		else if (data.videos[1].thumbnails[2] == null)
		{
			thumbRaw = data.videos[1].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[1].thumbnails[2].url;}
	   
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-400x225.jpg"
   document.getElementById('vod1link').onclick = function() { 
		PopupCenter('https://player.twitch.tv/?video=' + data.videos[1]._id,'xtf','640','360');  
		return false;
	};
   
   document.getElementById('vod1img').src = thumbHD;
   
   document.getElementById('vod1title').textContent = data.videos[1].title;
   
      //vod 2
   var thumbRaw;
   
		if (data.videos[2].thumbnails[0] == null)
		{
			thumbRaw = "https://placehold.it/400x225"
		}
		else if (data.videos[2].thumbnails[2] == null)
		{
			thumbRaw = data.videos[2].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[2].thumbnails[2].url;}
	   
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-400x225.jpg"
   document.getElementById('vod2link').onclick = function() { 
		PopupCenter('https://player.twitch.tv/?video=' + data.videos[2]._id,'xtf','640','360');  
		return false;
	};
   
   document.getElementById('vod2img').src = thumbHD;
   
   document.getElementById('vod2title').textContent = data.videos[2].title;
   
 }
});	

