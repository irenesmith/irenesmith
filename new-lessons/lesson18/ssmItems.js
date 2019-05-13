<!--

/*
Configure menu styles below
NOTE: To edit the link colors, go to the STYLE tags and edit the ssm2Items colors
*/
YOffset=150; // no quotes!!
XOffset=0;
staticYOffset=30; // no quotes!!
slideSpeed=20 // no quotes!!
waitTime=100; // no quotes!! this sets the time the menu stays out for after the mouse goes off it.
menuBGColor="black";
menuIsStatic="yes"; //this sets whether menu should stay static on the screen
menuWidth=200; // Must be a multiple of 10! no quotes!!
menuCols=2;
hdrFontFamily="verdana";
hdrFontSize="2";
hdrFontColor="white";
hdrBGColor="#f17c55";
hdrAlign="center";
hdrVAlign="center";
hdrHeight="15";
linkFontFamily="Verdana";
linkFontSize="2";
linkBGColor="#fffdd7";
linkOverBGColor="#e8c27b";
linkTarget="_top";
linkAlign="Left";
barBGColor="#f17c55";
barFontFamily="Verdana";
barFontSize="2";
barFontColor="#fffdd7";
barVAlign="center";
barWidth=20; // no quotes!!
barText="SITE MENU"; // <IMG> tag supported. Put exact html for an image to show.

///////////////////////////

// ssmItems[...]=[name, link, target, colspan, endrow?] - leave 'link' and 'target' blank to make a header
ssmItems[0]=["My Personal Site"] //create header
ssmItems[1]=["Home Page", "/index.php", "_blank"]
ssmItems[2]=["What's New", "/news.php","_blank"]
ssmItems[3]=["About Me", "/about.php", "_blank"]
ssmItems[4]=["Writing", "/pub.php", "_blank"]
ssmItems[5]=["Photographs", "/photos/", "_blank"]
ssmItems[6]=["Links", "/links.php", "_blank"]

ssmItems[7]=["Miscellaneous", "/misc.php", "_blank"]
ssmItems[8]=["Email", "/contact.htm", ""]

ssmItems[9]=["My Portfolio", "", ""] //create header
ssmItems[10]=["Introduction", "/lessons/index.html", ""]
ssmItems[11]=["Lesson 1", "/lessons/lesson1.html", "", 1, "no"]
ssmItems[12]=["Lesson 11", "/lessons/lesson11.html", "", 1]
ssmItems[13]=["Lesson 2", "/lessons/lesson2.html", "", 1, "no"]
ssmItems[14]=["Lesson 12", "/lessons/lesson12.html", "", 1]
ssmItems[15]=["Lesson 3", "/lessons/lesson3.html", "", 1, "no"]
ssmItems[16]=["Lesson 13", "/lessons/lesson13.html", "", 1]
ssmItems[17]=["Lesson 4", "/lessons/lesson4.html", "", 1, "no"]
ssmItems[18]=["Lesson 14", "/lessons/lesson14.html", "", 1]
ssmItems[19]=["Lesson 5", "/lessons/lesson5.html", "", 1, "no"]
ssmItems[20]=["Lesson 15", "/lessons/lesson15.html", "", 1]
ssmItems[21]=["Lesson 6", "/lessons/lesson6.html", "", 1, "no"]
ssmItems[22]=["Lesson 16", "/lessons/lesson16.html", "", 1]
ssmItems[23]=["Lesson 7", "/lessons/lesson7.html", "", 1, "no"]
ssmItems[24]=["Lesson 17", "/lessons/lesson17.html", "", 1]
ssmItems[25]=["Lesson 8", "/lessons/lesson8.html", "", 1, "no"]
ssmItems[26]=["Lesson 18", "/lessons/lesson18.html", "", 1]
ssmItems[27]=["Lesson 9", "/lessons/lesson9.html", "", 1, "no"]
ssmItems[28]=["Lesson 19", "/lessons/lesson19.html", "", 1]
ssmItems[29]=["Lesson 10", "/lessons/lesson10.html", "", 1, "no"]
ssmItems[30]=["Lesson 20", "/lessons/lesson20.html", "", 1]
ssmItems[31]=["","",""]
buildMenu();

//-->