var timer,i=0,youtubediv=[];
function listVideos(a,b){document.createElement("ul").setAttribute("id","youtubelist");if(a.items)for(var c=0;c<a.items.length;c++){var d=a.items[c],f=d.id.videoId?d.id.videoId:d.id;appendOptionLast("<a href=\"javascript:playVideo('"+f+"',false,'"+addslashes(d.snippet.title)+'\',true)"><img src="'+d.snippet.thumbnails["default"].url+'" onmouseout="mouseOutImage(this)" onmouseover="mousOverImage(this,\''+f+"',1)\"></a><br>"+d.snippet.title.substr(0,30)+"",f,"ul1")}else b.innerHTML="No Results Found"}
var l=1,youtubeInit=[],key="AIzaSyA8OmKcw2DMNkJicyCJ0vqvf90xgeH52zE";
function insertVideos(a,b,c,d,f){var e=document.createElement("script");"search"==b&&(e.setAttribute("src","https://www.googleapis.com/youtube/v3/search?key="+key+"&part=snippet&prettyPrint=false&q="+c+(f?"&pageToken="+f:"")+"&maxResults="+d+"&type=video&callback=youtubeInit["+l+"]&fields=items(id,snippet(title,thumbnails(default(url))))&prettyPrint=false"),document.title&&(document.title="Search: "+c.replace("+"," ")+" - YouTube Fast Search"));"hot"==b&&(e.setAttribute("src","https://www.googleapis.com/youtube/v3/videos?key="+
key+"&part=snippet&chart=mostPopular&callback=youtubeInit["+l+"]&maxResults=50&fields=items(id,snippet(title,thumbnails(default(url))))&prettyPrint=false"),document.title&&(document.title="Recently Featured - YouTube Fast Search"));youtubeInit[l]=function(d){listVideos(d,a)};e.setAttribute("type","text/javascript");document.documentElement.firstChild.appendChild(e)}var normalplayer=!1,currentid=0,size=1;
function getPageSize(){var a,b;window.innerHeight&&window.scrollMaxY?(a=document.body.scrollWidth,b=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(a=document.body.scrollWidth,b=document.body.scrollHeight):(a=document.body.offsetWidth,b=document.body.offsetHeight);var c,d;self.innerHeight?(c=self.innerWidth,d=self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(c=document.documentElement.clientWidth,d=document.documentElement.clientHeight):
document.body&&(c=document.body.clientWidth,d=document.body.clientHeight);pageHeight=b<d?d:b;pageWidth=a<c?c:a;return arrayPageSize=[pageWidth,pageHeight,c,d]}function addslashes(a){a&&(a=a.replace(/\'/g,"\\'"),a=a.replace(/\"/g,""));return a}function stripslashes(a){return a=a.replace(/\\'/g,"'")}function setCookie(a,b,c,d,f,e){document.cookie=a+"="+escape(b)+(c?"; expires="+c.toGMTString():"")+(d?"; path="+d:"")+(f?"; domain="+f:"")+(e?"; secure":"")}
function getCookie(a){var b=document.cookie;a+="=";var c=b.indexOf("; "+a);if(-1==c){if(c=b.indexOf(a),0!=c)return null}else c+=2;var d=document.cookie.indexOf(";",c);-1==d&&(d=b.length);return unescape(b.substring(c+a.length,d))}function deleteCookie(a,b,c){getCookie(a)&&(document.cookie=a+"="+(b?"; path="+b:"")+(c?"; domain="+c:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT")}
(function(){var a=YAHOO.util.Dom,b=YAHOO.util.Event,c=YAHOO.util.DragDropMgr;YAHOO.example.DDApp={init:function(){var a,b;for(a=1;4>a;a+=1)new YAHOO.util.DDTarget("ul"+a);for(a=1;4>a;a+=1)for(b=1;2>b;b+=1)new YAHOO.example.DDList("li"+a+"_"+b)},showOrder:function(){a.get("ul1");a.get("ul2");a.get("ul3")},switchStyles:function(){a.get("ul1").className="draglist_alt";a.get("ul3").className="draglist_alt"}};YAHOO.example.DDList=function(b,c,e){YAHOO.example.DDList.superclass.constructor.call(this,b,
c,e);this.logger=this.logger||YAHOO;b=this.getDragEl();a.setStyle(b,"opacity",.67);this.goingUp=!1;this.lastY=0};YAHOO.extend(YAHOO.example.DDList,YAHOO.util.DDProxy,{startDrag:function(b,c){var e=this.getDragEl(),g=this.getEl();a.setStyle(g,"visibility","hidden");e.innerHTML=g.innerHTML;a.setStyle(e,"color",a.getStyle(g,"color"));a.setStyle(e,"backgroundColor",a.getStyle(g,"backgroundColor"));a.setStyle(e,"border","2px solid gray")},endDrag:function(b){var c=this.getEl();b=this.getDragEl();a.setStyle(b,
"visibility","");var c=new YAHOO.util.Motion(b,{points:{to:a.getXY(c)}},.2,YAHOO.util.Easing.easeOut),e=b.id,g=this.id;c.onComplete.subscribe(function(){a.setStyle(e,"visibility","hidden");a.setStyle(g,"visibility","")});c.animate()},onDragDrop:function(b,f){if(1===c.interactionInfo.drop.length){var e=this.getEl(),g=a.get(f);"ul2"==g.id&&(e=e.id.replace("$",""),loadNewVideo(e));"ul3"==g.id&&(e=c.getDDById(f),g.appendChild(this.getEl()),e.isEmpty=!1,c.refreshCache(),savePlaylist(g.id))}},onDrag:function(a){a=
b.getPageY(a);a<this.lastY?this.goingUp=!0:a>this.lastY&&(this.goingUp=!1);this.lastY=a},onDragOver:function(b,f){var e=this.getEl(),g=a.get(f);if("li"==g.nodeName.toLowerCase()){var h=g.parentNode;this.goingUp?h.insertBefore(e,g):h.insertBefore(e,g.nextSibling);c.refreshCache()}}});b.onDOMReady(YAHOO.example.DDApp.init,YAHOO.example.DDApp,!0)})();
function onYouTubeIframeAPIReady(a){normalplayer=document.getElementById("playerid");normalplayer=new YT.Player("ytapiplayer",{height:"390",width:"640",videoId:"AJtDXIazrMo",events:{onStateChange:updateNormalPlayerInfo}})}function cueNewVideo(a){normalplayer&&normalplayer.cueVideoById(a)}function updateNormalPlayerInfo(){time=getCurrentTime();dur=getDuration();--dur;time>dur&&1<dur&&1<time&&(stop(),getNextPlaylist(),document.title&&(document.title="Next in playlist..."))}
function loadNewVideo(a){normalplayer&&(currentid=a,normalplayer.loadVideoById(a))}function getNextPlaylist(){var a=0,b=document.getElementById("ul3").getElementsByTagName("li");for(i=0;i<b.length;i+=1)if(b[i].id==currentid){var c=i+1;if(b[c]){a=1;loadNewVideo(b[c].id);break}}0==a&&0<b.length&&loadNewVideo(b[0].id)}function play(){normalplayer&&normalplayer.playVideo()}function pause(){normalplayer&&normalplayer.pauseVideo()}function stop(){normalplayer&&normalplayer.stopVideo()}
function getDuration(){if(normalplayer)return normalplayer.getDuration()}function getCurrentTime(){if(normalplayer)return normalplayer.getCurrentTime()}function seekTo(a){normalplayer&&normalplayer.seekTo(a,!0)}function fullscreen(){normalplayer&&normalplayer.fullscreen()}
function appendOptionLast(a,b,c){try{if(a&&b&&c){var d=document.getElementById(c),f=document.createElement("li");f.setAttribute("id",b);f.innerHTML=a;d.appendChild(f);YAHOO.example&&"null"!=f&&new YAHOO.example.DDList(f)}}catch(e){}}function clearList(a){for(a=document.getElementById(a);a.firstChild;)a.removeChild(a.firstChild)}function mostViewed(){clearList("ul1");insertVideos("ul1","mostviewed","",30)}function mostLinked(){clearList("ul1");insertVideos("ul1","linked","",20)}
function getHot(){clearList("ul1");insertVideos("ul1","hot","",15)}function makeRequest(a){clearList("ul1");a=encodeURI(document.getElementById("searchinput").value);insertVideos("ul1","search",a,50)}function getSearch(a){clearList("ul1");insertVideos("ul1","search",encodeURI(a),50)}var imname;
function mousOverImage(a,b,c){a&&(imname=a);imname.src="https://img.youtube.com/vi/"+b+"/"+c+".jpg";imname.style.border="3px solid orange";c++;3<c&&(c=1);timer=setTimeout("mousOverImage(false,'"+b+"',"+c+");",1E3)}function mouseOutImage(a){a&&(imname=a);imname.style.border="3px solid #333";timer&&clearTimeout(timer)}
function savePlaylist(a){ul=YAHOO.util.Dom.get(a);a=ul.getElementsByTagName("li");var b="";for(i=0;i<a.length;i+=1)b+=""+a[i].id+"|";setCookie("playlist",b,new Date("July 21, 2015 01:00:00"))}
function createPlaylist(){var a=getCookie("playlist");if(""!=a&&null!=a)for(var a=a.split("|"),b=0;b<a.length;)"null"!=a[b]&&""!=a[b]&&appendOptionLast("<a href=\"javascript:playVideo('"+a[b]+"',false,'drag and drop video')\"><img src=\"https://img.youtube.com/vi/"+a[b]+'/2.jpg" onmouseout="mouseOutImage(this)" onmouseover="mousOverImage(this,\''+a[b]+"',1)\"></a>",a[b],"ul3"),b+=1}function clearPlaylist(){deleteCookie("playlist");clearList("ul3")}var firsttime=!0;
function playVideo(a,b,c,d){document.title&&(document.title=c);loadNewVideo(a)}YAHOO.util.Event.onDOMReady(getHot);YAHOO.util.Event.onDOMReady(createPlaylist);
