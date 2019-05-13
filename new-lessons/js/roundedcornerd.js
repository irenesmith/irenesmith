<!-- Paste this code into an external JavaScript file named: roundedCorners.js  -->

/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Cameron Cooke :: http://www.roundedcorners.net */

 /****************************************************************
  *                                                              *
  *  curvyCorners                                                *
  *  ------------                                                *
  *                                                              *
  *  This script generates rounded corners for your divs.        *
  *                                                              *
  *                                                              *
  *  Version 1.00 beta                                           *
  *  Copyright (c) 2006 Cameron Cooke                            *
  *  By: Cameron Cooke and Tim Hutchison.                        *
  *                                                              *
  *  Website: http://www.curvycorners.net                        *
  *  Email:   info@totalinfinity.com                             *
  *                                                              *
  *                                                              *
  *  This library is free software; you can redistribute         *
  *  it and/or modify it under the terms of the GNU              *
  *  Lesser General Public License as published by the           *
  *  Free Software Foundation; either version 2.1 of the         *
  *  License, or (at your option) any later version.             *
  *                                                              *
  *  This library is distributed in the hope that it will        *
  *  be useful, but WITHOUT ANY WARRANTY; without even the       *
  *  implied warranty of MERCHANTABILITY or FITNESS FOR A        *
  *  PARTICULAR PURPOSE. See the GNU Lesser General Public       *
  *  License for more details.                                   *
  *                                                              *
  *  You should have received a copy of the GNU Lesser           *
  *  General Public License along with this library;             *
  *  Inc., 59 Temple Place, Suite 330, Boston,                   *
  *  MA 02111-1307 USA                                           *
  *                                                              *
  ****************************************************************/

// Attach load event
xAttachEventOnLoad("load", cornerInt);

function cornerInt(){
  // Get all DIV elements
  var divElements = document.getElementsByTagName("DIV");
  var divCount = divElements.length;
  var t = 0;
  objsArray = new Array();

  // Loop through all DIVs
  for(var i = 0; i < divCount; i++){
    var currentDiv = divElements[i];
    if(radius = currentDiv.getAttribute("radius")){
      if(!(corners = currentDiv.getAttribute("corners")))
        corners = "TR,TL,BR,BL";
      var newObj = new curvyCorners(currentDiv, radius, corners);
      objsArray[t] = newObj;
      t++;
    }
  }

  //alert(objsArray);
  var arrayLength = objsArray.length;
  for(var x = 0; x < arrayLength; x++){
      objsArray[x].doCorners();
  }
}

// ------------- curvyCorners OBJECT

function curvyCorners(boxObj, radiusInt, cornersCSVStr) {
  // Set objects properties
  this.box      = boxObj;
  this.radius   = (Math.round(parseInt(radiusInt)/2))*2;
  this.corners  = cornersCSVStr.split(","); // Array

  // Setup global variables
  this.masterCorner     = null;
  this.masterCornerType = null;
  this.cornersAvailable = new Array("TR", "TL", "BR", "BL");

  // Get box formatting details and set properties
  this.boxHeight    = parseInt(((this.box.style.height != "")? this.box.style.height.substring(0, this.box.style.height.indexOf("px")) : this.box.scrollHeight));
  this.boxWidth     = parseInt(((this.box.style.width != "")? this.box.style.width.substring(0, this.box.style.width.indexOf("px")) : this.box.scrollWidth));
  this.borderWidth  = parseInt(((this.box.style.borderWidth != "")? this.box.style.borderWidth.slice(0, this.box.style.borderWidth.indexOf("px")) : 0));
  this.boxColour    = ((this.box.style.backgroundColor.substr(0, 3) == "rgb")? rgb2Hex(this.box.style.backgroundColor) : this.box.style.backgroundColor);
  this.borderColour = ((this.box.style.borderColor != "" && this.borderWidth > 0)? ((this.box.style.borderColor.substr(0, 3) == "rgb")? rgb2Hex(this.box.style.borderColor) : this.box.style.borderColor) : this.boxColour);
  this.borderRadius = parseInt(this.radius - this.borderWidth);
  this.borderString = this.borderWidth + "px" + " solid " + this.borderColour;
  this.posStart = (0 - this.radius);
  this.posAdjust = (Math.floor(Math.sqrt(Math.pow((this.radius - this.borderWidth),2)/2)));

  // Make box relative if not already absolute
  if(this.box.style.position != "absolute") this.box.style.position = "relative";

  // Builds the corners
  this.doCorners = function()
  {
    // Loop once for each corner specfied
    for(var i in this.cornersAvailable)
    {
      // Get current corner type from array
      var currentCorner = this.cornersAvailable[i];

      if(inArray(this.corners, currentCorner) === false)
      {
        // No corner is to be rounded so we generated a square to fill the gap
        var newCorner = document.createElement("DIV");

        // Setup corners properties
        newCorner.style.height   = this.radius - this.borderWidth + "px";
        newCorner.style.width    = this.radius - this.borderWidth + "px";
        newCorner.style.position = "absolute";
        newCorner.style.fontSize = "1px";
        newCorner.style.overflow = "hidden";
        newCorner.style.backgroundColor = this.boxColour;

        switch(currentCorner)
        {
          case "TL":
            newCorner.style.borderLeft = this.borderString;
            newCorner.style.borderTop  = this.borderString;
            break;
          case "TR":
            newCorner.style.borderRight = this.borderString;
            newCorner.style.borderTop   = this.borderString;
            break;
          case "BL":
            newCorner.style.borderLeft   = this.borderString;
            newCorner.style.borderBottom = this.borderString;
            break;
          case "BR":
            newCorner.style.borderRight  = this.borderString;
            newCorner.style.borderBottom = this.borderString;
            break;
        }
      }
      else{
        /*
        To increase performace we only ever generate one corner.
        This corner is the bottom right corner. If more that one corner is requested
        then the other corners will be a cloned version of the first corner.
        */
        if(this.masterCorner != null)
        {
          // Create clone of the master corner
          var newCorner = this.masterCorner.cloneNode(true);
        }
        else
        {
          // First time round so generate the master corner
          var newCorner = document.createElement("DIV");

          // Setup corners properties
          newCorner.style.height   = this.radius + "px";
          newCorner.style.width    = this.radius + "px";
          newCorner.style.position = "absolute";
          newCorner.style.fontSize = "1px";
          newCorner.style.overflow = "hidden";

          // Cycle the x-axis
          for(var intx = 0; intx < this.radius; intx++)
          {
            // Calculate the value of y1 which identifies the pixels inside the border
            if((intx +1) >= this.borderRadius)
              var y1 = -1;
            else
              var y1 = (Math.floor(Math.sqrt(Math.pow(this.borderRadius, 2) - Math.pow((intx+1), 2))) - 1);

            // Only calculate y2 and y3 if there is a border defined
            if(this.borderRadius != this.radius)
            {
               if((intx) >= this.borderRadius)
                 var y2 = -1;
               else
                 var y2 = Math.ceil(Math.sqrt(Math.pow(this.borderRadius,2) - Math.pow(intx, 2)));
               if((intx+1) >= this.radius)
                 var y3 = -1;
               else
                 var y3 = (Math.floor(Math.sqrt(Math.pow(this.radius,2) - Math.pow((intx+1), 2))) - 1);
            }

            // Calculate y4
            if((intx) >= this.radius)
              var y4 = -1;
            else
              var y4 = Math.ceil(Math.sqrt(Math.pow(this.radius,2) - Math.pow(intx, 2)));

            // Draw bar on inside of the border with foreground colour
            if(y1 > -1) this.drawPixel(intx, 0, this.boxColour, 100, (y1+1), newCorner);

            // Only draw border/foreground antialiased pixels and border if there is a border defined
            if(this.borderRadius != this.radius)
            {
                // Cycle the y-axis
                for(var inty = (y1 + 1); inty < y2; inty++)
                {
                  // For each of the pixels that need anti aliasing between the foreground and border colour draw single pixel divs
                  var pixelcolour = BlendColour(this.boxColour, this.borderColour, pixelFraction(intx, inty, this.borderRadius));
                  this.drawPixel(intx, inty, pixelcolour, 100, 1, newCorner);
                }

                // Draw bar for the border
                if(y3 >= y2)
                {
                  if (y1 == -1)
                    y1 = 0;
                  this.drawPixel(intx, y2, this.borderColour, 100, (y3 - y2 + 1), newCorner);
                }

                // Set the colour for the outside curve
                var outsideColour = this.borderColour;
              }
              else
              {
                // Set the coour for the outside curve
                var outsideColour = this.boxColour;
                var y3 = y1;
              }

              // Cycle the y-axis and draw the anti aliased pixels on the outside of the curve
              for(var inty = (y3 + 1); inty < y4; inty++)
              {
                // For each of the pixels that need anti aliasing between the foreground/border colour & background draw single pixel divs
                this.drawPixel(intx, inty, outsideColour, (pixelFraction(intx, inty ,this.radius) * 100), 1, newCorner);
              }
            }
            // Store corner as master corner
            this.masterCorner = newCorner.cloneNode(true);
            this.masterCornerType = "BR";
        }
      }

      /*
      Now we have a new corner we need to reposition all the pixels unless
      the current corner is the bottom right/
      */
      if(currentCorner != "BR")
      {
        // Loop through all children (pixel bars)
        var pixelCount = newCorner.childNodes.length;
        for(var t = 0; t < pixelCount; t++)
        {
          // Get current pixel bar
          var pixelBar = newCorner.childNodes[t];

          // Get current top and left properties
          var pixelBarTop    = parseInt(pixelBar.style.top.substring(0, pixelBar.style.top.indexOf("px")));
          var pixelBarLeft   = parseInt(pixelBar.style.left.substring(0, pixelBar.style.left.indexOf("px")));
          var pixelBarHeight = parseInt(pixelBar.style.height.substring(0, pixelBar.style.height.indexOf("px")));

          // Reposition pixels
          if(currentCorner == "TL" || currentCorner == "BL"){
              pixelBar.style.left = this.radius -pixelBarLeft -1 + "px"; // Left
          }
          if(currentCorner == "TR" || currentCorner == "TL"){
              pixelBar.style.top =  this.radius -pixelBarHeight -pixelBarTop + "px"; // Top
          }
        }
      }

      // Position the container
      switch(currentCorner)
      {
        case "TL":
          newCorner.style.top  = (this.posStart + this.posAdjust) + "px";
          newCorner.style.left = (this.posStart + this.posAdjust) + "px";
          break;

        case "TR":
          newCorner.style.top  = (this.posStart + this.posAdjust) + "px";
          newCorner.style.left = (this.boxWidth - this.posAdjust) + "px";
          break;

        case "BL":
          newCorner.style.top = (this.boxHeight - this.posAdjust) + "px";
          newCorner.style.left = (this.posStart + this.posAdjust) + "px";
          break;

        case "BR":
          newCorner.style.top = (this.boxHeight - this.posAdjust)+ "px";
          newCorner.style.left = (this.boxWidth - this.posAdjust)+ "px";
          break;
      }

      // Append new corner
      this.box.appendChild(newCorner);

      /*
      We have now drawn all the corner required so we now need to
      put on the finishing touches.
      */

      // Draw bars ----------------------------------------------

      // Turn off current borders
      this.box.style.borderWidth = "0px";

      for(var s = 0; s < 4; s++)
      {
        // Create bar
        var bar = document.createElement("DIV");

        // Set the bars properties
        bar.style.height   = this.boxHeight + "px";
        bar.style.width    = this.boxWidth + "px";
        bar.style.position = "absolute";
        bar.style.fontSize = "1px";
        bar.style.overflow = "hidden";
        bar.style.backgroundColor = this.boxColour;
        //bar.style.backgroundColor = "#663322";

        switch(s)
        {
            // Left
            case 0:
              bar.style.top = this.posAdjust + "px";
              bar.style.left = (this.posStart + this.posAdjust) + "px";
              bar.style.width = (this.radius - this.posAdjust - this.borderWidth) + "px";
              bar.style.height = (this.boxHeight - (2 * this.posAdjust)) + "px";
              bar.style.borderLeft = this.borderString;
              break;
            // Right
            case 1:
              bar.style.top = this.posAdjust + "px";
              bar.style.right = (this.posStart + this.posAdjust) + "px";
              bar.style.width = (this.radius - this.posAdjust - this.borderWidth) + "px";
              bar.style.height = (this.boxHeight - (2 * this.posAdjust)) + "px";
              bar.style.borderRight = this.borderString;
              break;
            // Top
            case 2:
              bar.style.top = (this.posStart + this.posAdjust) + "px";
              bar.style.left = this.posAdjust + "px";
              bar.style.height = (this.radius - this.posAdjust - this.borderWidth) + "px";
              bar.style.width = (this.boxWidth - (2 * this.posAdjust)) + "px";
              bar.style.borderTop = this.borderString;
              break;
            // Bottom
            case 3:
              bar.style.bottom = (this.posStart + this.posAdjust) + "px";
              bar.style.left = this.posAdjust + "px";
              bar.style.height = (this.radius - this.posAdjust - this.borderWidth) + "px";
              bar.style.width = (this.boxWidth - (2 * this.posAdjust)) + "px";
              bar.style.borderBottom = this.borderString;
              break;
        }
        // Append bar
          this.box.appendChild(bar);
      }
    }
  }

  this.drawPixel = function(intx, inty, colour, transAmount, height, newCorner) {
    // Create pixel
    var pixel = document.createElement("DIV");
    pixel.style.height   = height + "px";
    pixel.style.width    = "1px";
    pixel.style.position = "absolute";
    pixel.style.fontSize = "1px";
    pixel.style.overflow = "hidden";
    pixel.style.backgroundColor = colour;

    // Set opacity if the transparency is anything other than 100
    if (transAmount != 100)
      setOpacity(pixel, transAmount);

    // Set the pixels position
    pixel.style.top = inty + "px";
    pixel.style.left = intx + "px";
    newCorner.appendChild(pixel);
  }
}

// ------------- UTILITY FUNCTIONS

/*
Blends the two colours by the fraction
returns the resulting colour as a string in the format "#FFFFFF"
*/
function BlendColour(Col1, Col2, Col1Fraction) {
  var red1 = parseInt(Col1.substr(1,2),16);
  var green1 = parseInt(Col1.substr(3,2),16);
  var blue1 = parseInt(Col1.substr(5,2),16);
  var red2 = parseInt(Col2.substr(1,2),16);
  var green2 = parseInt(Col2.substr(3,2),16);
  var blue2 = parseInt(Col2.substr(5,2),16);

  if(Col1Fraction > 1 || Col1Fraction < 0) Col1Fraction = 1;

  var endRed = Math.round((red1 * Col1Fraction) + (red2 * (1 - Col1Fraction)));
  if(endRed > 255) endRed = 255;
  if(endRed < 0) endRed = 0;

  var endGreen = Math.round((green1 * Col1Fraction) + (green2 * (1 - Col1Fraction)));
  if(endGreen > 255) endGreen = 255;
  if(endGreen < 0) endGreen = 0;

  var endBlue = Math.round((blue1 * Col1Fraction) + (blue2 * (1 - Col1Fraction)));
  if(endBlue > 255) endBlue = 255;
  if(endBlue < 0) endBlue = 0;

  return "#" + IntToHex(endRed)+ IntToHex(endGreen)+ IntToHex(endBlue);
}

/*
Converts a number to hexadecimal format
*/
function IntToHex(strNum) {
  base = strNum / 16;
  rem = strNum % 16;
  base = base - (rem / 16);
  baseS = MakeHex(base);
  remS = MakeHex(rem);
  return baseS + '' + remS;
}


/*
gets the hex bits of a number
*/
function MakeHex(x) {
  if((x >= 0) && (x <= 9))
  {
    return x;
  }
  else
  {
    switch(x)
    {
      case 10: return "A";
      case 11: return "B";
      case 12: return "C";
      case 13: return "D";
      case 14: return "E";
      case 15: return "F";
    }
  }
}


/*
For a pixel cut by the line determines the fraction of the pixel on the 'inside' of the
line.  Returns a number between 0 and 1
*/
function pixelFraction(x, y, r) {
  var pixelfraction = 0;

  /*
  determine the co-ordinates of the two points on the perimeter of the pixel that the
  circle crosses
  */
  var xvalues = new Array(1);
  var yvalues = new Array(1);
  var point = 0;
  var whatsides = "";

  // x + 0 = Left
  var intersect = Math.sqrt((Math.pow(r,2) - Math.pow(x,2)));

  if ((intersect >= y) && (intersect < (y+1))) {
    whatsides = "Left";
    xvalues[point] = 0;
    yvalues[point] = intersect - y;
    point =  point + 1;
  }
  // y + 1 = Top
  var intersect = Math.sqrt((Math.pow(r,2) - Math.pow(y+1,2)));

  if ((intersect >= x) && (intersect < (x+1))) {
    whatsides = whatsides + "Top";
    xvalues[point] = intersect - x;
    yvalues[point] = 1;
    point = point + 1;
  }
  // x + 1 = Right
  var intersect = Math.sqrt((Math.pow(r,2) - Math.pow(x+1,2)));

  if ((intersect >= y) && (intersect < (y+1))) {
    whatsides = whatsides + "Right";
    xvalues[point] = 1;
    yvalues[point] = intersect - y;
    point =  point + 1;
  }
  // y + 0 = Bottom
  var intersect = Math.sqrt((Math.pow(r,2) - Math.pow(y,2)));

  if ((intersect >= x) && (intersect < (x+1))) {
    whatsides = whatsides + "Bottom";
    xvalues[point] = intersect - x;
    yvalues[point] = 0;
  }

  /*
  depending on which sides of the perimeter of the pixel the circle crosses calculate the
  fraction of the pixel inside the circle
  */
  switch (whatsides) {
    case "LeftRight":
    pixelfraction = Math.min(yvalues[0],yvalues[1]) + ((Math.max(yvalues[0],yvalues[1]) - Math.min(yvalues[0],yvalues[1]))/2);
    break;
    case "TopRight":
    pixelfraction = 1-(((1-xvalues[0])*(1-yvalues[1]))/2);
    break;
    case "TopBottom":
    pixelfraction = Math.min(xvalues[0],xvalues[1]) + ((Math.max(xvalues[0],xvalues[1]) - Math.min(xvalues[0],xvalues[1]))/2);
    break;
    case "LeftBottom":
    pixelfraction = (yvalues[0]*xvalues[1])/2;
    break;
    default:
    pixelfraction = 1;
  }

  return pixelfraction;
}

// This function converts CSS rgb(x, x, x) to hexadecimal
function rgb2Hex(rgbColour) {
  try{
    // Remove rgb()
    var rgbValues = rgbColour.substring(4, rgbColour.indexOf(")"));

    // Split RGB into array
    var rgbArray = rgbValues.split(", ");

    // Get RGB values
    var red   = parseInt(rgbArray[0]);
    var green = parseInt(rgbArray[1]);
    var blue  = parseInt(rgbArray[2]);

    // Build hex colour code
    var hexColour = "#" + IntToHex(red) + IntToHex(green) + IntToHex(blue);
  }
  catch(e){
    alert("There was an error converting the RGB value to Hexadecimal in function rgb2Hex");
  }

  return hexColour;
}

// Function by Simon Willison from sitepoint.com
function setOpacity(obj, opacity) {
  opacity = (opacity == 100)?99.999:opacity;

  // IE/Win
  obj.style.filter = "alpha(opacity:"+opacity+")";

  // Safari<1.2, Konqueror
  obj.style.KHTMLOpacity = opacity/100;

  // Older Mozilla and Firefox
  obj.style.MozOpacity = opacity/100;

  // Safari 1.2, newer Firefox and Mozilla, CSS3
  obj.style.opacity = opacity/100;
}

/*
Returns index if the passed value is found in the
array otherwise returns false.
*/
function inArray(array, value) {
  for(var i = 0; i < array.length; i++){

    // Matches identical (===), not just similar (==).
    if (array[i] === value) return i;
  }
  return false;
}

/*
Returns true if the passed value is found as a key
in the array otherwise returns false.
*/
function inArrayKey(array, value) {
  for(key in array){
    // Matches identical (===), not just similar (==).
    if(key === value) return true;
  }
  return false;
}

// Attaches onload event cross browser
function xAttachEventOnLoad(event, func) {
 // Attach event
  if(window.addEventListener)
    window.addEventListener(event, func, false);
  else if(window.attachEvent)
    window.attachEvent("on" + event, func);
  else
    window.onload = func;
}


