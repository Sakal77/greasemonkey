// ==UserScript==
// @name        Tone-alarm
// @namespace   https://service.portal.tieto.com
// @include     https://service.portal.tieto.com/tone/*
// @grant       none
// @version     1
// ==/UserScript==


var counter = 0;

/*--- To "refire" our Greasemonkey code on AJAX changes, we wrap it in
    a function and call it on a DOM change event.
*/

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;
var alarm = ""

/*--- Run everything after the document has loaded.  Avoids race-
      conditions and excessive "churn".
*/
window.addEventListener ("load", MainAction, false);


function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

      
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    	
	var td = document.getElementsByClassName('vt');
	for(var i=0;i<td.length;i++) {
  		var test = td[i].textContent;
  		if (test.match(/\b\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\b/)){
    			var date = test.match(/\b\d{4}-\d{2}-\d{2}\b/).toString();
    			var time = test.match(/\b\d{2}:\d{2}:\d{2}\b/).toString();
    			var res = date.split(/-/);
    			var res1 = time.split(/:/);
    			var d = new Date(res[0],res[1]-1,res[2],res1[0],res1[1],res1[2]);
    			var d1 = new Date();
    			difference = (d - d1) / 3600000;
    			if (difference <= 1 && difference > 0) { 
      				counter++; 
      				if (counter == 1) {   
        				td[i].innerHTML += "<embed hidden=\"true\" src=\"http://localhost/default.wav\" autostart=\"true\" loop=\"false\" />";//appendChild(soundEmbeded);
      				}
      				td[i].style.background = "rgba(255,255,0,0.5)";
   		 	}
    			else if (difference < 0) {
      				td[i].style.background = "rgba(255,0,0,0.5)";  
    			}
    			else if (difference < 3 && difference > 1) {
      				td[i].style.background = "rgba(0,255,0,0.5)";
    			}
  		}
	}
}



function HandleDOM_ChangeWithDelay (zEvent)
{
    /*--- DOM changes will come hundreds at a time, we wait a fraction
          of a second after the LAST change in a batch.
    */
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 222); //-- 222 milliseconds
}

var theTone = document.getElementsByTagName('td');
var theLinks = document.links;
//alert(theLinks.length);

for(i=0; i<theTone.length; i++) {
   if(theTone[i].innerHTML.toLowerCase().indexOf('patrol agent is unreachable') != -1) {
	theTone[i].style.backgroundColor = 'red';
	}
   if(theTone[i].innerHTML.toLowerCase().indexOf('drive c: has') != -1) {
	theTone[i].style.backgroundColor = 'yellow';
	}
   if(theTone[i].innerHTML.toLowerCase().indexOf('c: ldldfreespacepercent') != -1) {
	theTone[i].style.backgroundColor = 'yellow';
	}
  if(theTone[i].innerHTML.toLowerCase().indexOf('nt_logical_disks c:') != -1) {
	theTone[i].style.backgroundColor = 'yellow';
	}
   if(theTone[i].innerHTML.toLowerCase().indexOf('apoteket ab') != -1) {
	theTone[i].style.backgroundColor = '#ccffcc';
	}
 }

//  setInterval(ui11Refresh, 300000);
// function ui11Refresh() {
    // //if (Prototype.Browser.IE && !isMSIE9)
       //   	// window.location.reload()
   //           window.frames['gsft_main'].location.reload();
    // //else 
    // //       	GlideURL.refresh();
     // }

ancs = document.getElementsByTagName("td");
for(i=0;i<=ancs.length;i++){
	if(ancs[i].innerHTML.match(/720p/gi)){
		ancs[i].innerHTML = ancs[i].innerHTML.replace("720p", "<span style='color: #0000F5; background-color: white; font-weight:bold'>720p</span>");
	}
} 
