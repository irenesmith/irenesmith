/*
Swirling cursor trail (By Ozone, http://ozone.com)
Featured on JavaScript Kit free JavaScripts with bug fix for IE (http://javascriptkit.com)
For full source code to this script, visit http://javascriptkit.com
*/

window.onerror=null;
netscape = (document.layers) ? 1:0;
goodIE = (document.all) ? 1:0;
document.onmousemove=MoveHandler;
var gotthere = 0;
var count = 0;
var ietopcorner='';
var ieleftcorner='';

var toplocation = new Array( 0,30,57,80,101,125,80,80,101,125,80,0 );
var temptoplocation = new Array( 50,100,100,150,150,200,200,100,150,150,200,200,0 );
var leftlocation = new Array( 0,292,318,181,181,217,263,318,181,181,217,263,-96 );
var templeftlocation = new Array( 0,0,260,390,420,550,680,390,420,550,680,0 );
var difftop = new Array( 0,0,0,0,0,0,0,0,0,0,0,0 );
var diffleft = new Array( 0,0,0,0,0,0,0,0,0,0,0,0 );
questtop = -13;
questleft2 = -96;
if (netscape) {
  document.body=new Object();
  document.body.scrollTop='';
  document.body.scrollLeft='';
  window.captureEvents(Event.MOUSEMOVE);
  window.onMouseMove = MoveHandler; 
  var layerstart = "document.";
  var layerleft = ".left";
  var layertop = ".top";
  var layerstyle = "";
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
} else if (goodIE) {
  ietopcorner=document.body.scrollTop;
  ieleftcorner=document.body.scrollLeft;
  layerstart = "document.all.";
  layerleft = ".left";
  layertop = ".top";
  layerstyle = ".style";
  windowWidth=600;
  windowHeight=400;
  }
  // end error trapping
  var Ypos2 = 72;
  var Xpos2 = 72;

function MoveHandler(e) {
  if (netscape || goodIE) {
    Xpos2 = (netscape)?e.pageX:event.x;
    Ypos2 = (netscape)?e.pageY:event.y;
    Xorigin = Xpos2;
    Yorigin = Ypos2; 
    if (Ypos2 > windowHeight/2) {
      if (Xpos2 > windowWidth/2) { 
        direction = 1;
      } else {
        direction = -1;
      }
    } else {
      if (Xpos2 > windowWidth/2) {
        direction = -1;
      } else {
        direction = 1;
      }
    }
  }
}

function startTheDots() {
if (goodIE) {
  windowWidth=document.body.clientWidth;
  windowHeight=document.body.clientHeight;
}
Xorigin = 204;
Yorigin = 147; 
spin();
run(); }

var OrbitSize = 200;
count=1; delay=100; direction = -1;
Count = new Array ( 0, 0.63, 1.26, 1.89, 2.52, 3.15, 3.78, 4.41, 5.04, 5.67 );
Xpoint = new Array ( 0, 0.63, 1.26, 1.89, 2.52, 3.15, 3.78, 4.41, 5.04, 5.67 );
Ypoint = new Array ( 0, 0.63, 1.26, 1.89, 2.52, 3.15, 3.78, 4.41, 5.04, 5.67 );
var speed = -0.06;
var offset = 1;

function spin() {
  for ( j = 0 ; j <= 9 ; j++ ) {
    Count[j] = Count[j] + (speed*direction);	
	  Xpoint[j] = Xorigin + ((OrbitSize*Math.sin(Count[j])*offset));	
    Ypoint[j] = Yorigin + (OrbitSize*Math.cos(Count[j]));
  }
  setTimeout(spin, 3);
}

function run() {
  count++; 
  for ( j = 0 ; j <= 9 ; j++ ) {
    difftop[j]  = Ypoint[j] -  temptoplocation[j];
    diffleft[j] = Xpoint[j] - templeftlocation[j];
    diff = 30;
    temptoplocation[j] = temptoplocation[j] + difftop[j]/diff;
    templeftlocation[j] = templeftlocation[j] + diffleft[j]/diff;
    eval(layerstart+"a"+j+layerstyle+layerleft+" = document.body.scrollLeft+templeftlocation["+j+"]");
    eval(layerstart+"a"+j+layerstyle+layertop+" = document.body.scrollTop+temptoplocation["+j+"]");
  }
  setTimeout(run, 25);
}

badIE = 0;
browserName = navigator.appName.substring(0,8);
browserVer = parseFloat(navigator.appVersion);
macintosh = navigator.userAgent.indexOf("Mac");
if (browserName == "Microsof") { 
  if (macintosh != -1) {
    badIE = 1;
  }
  if (browserVer < 4) {
    badIE = 1;
  }
}
