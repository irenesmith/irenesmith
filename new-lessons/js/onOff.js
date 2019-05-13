function PreLoadImages() {
	if (document.images) {
  		emailon = new Image(64,25);
  		emailon.src = "../lesson13/email_on.jpg";
  		backon = new Image(64,25);
  		backon.src = "../lesson13/back_on.jpg";
  		homeon = new Image(64,25);
  		homeon.src = "../lesson13/home_on.jpg";
  		nexton = new Image(64,25);
  		nexton.src = "../lesson13/next_on.jpg";
  		titleon = new Image(374,173);
  		titleon.src = "../lesson13/title_on.jpg";

  		emailoff = new Image(64,25);
  		emailoff.src = "../lesson13/email_off.jpg";
  		backoff = new Image(64,25);
  		backoff.src = "../lesson13/back_off.jpg";
  		homeoff = new Image(64,25);
  		homeoff.src = "../lesson13/home_off.jpg";
  		nextoff = new Image(64,25);
  		nextoff.src = "../lesson13/next_off.jpg";
  		titleoff = new Image(374,173);
  		titleoff.src = "../lesson13/title_off.jpg";		
	}
}

function turnOn(imageName) {
  if (document.images) {
    imgObject = document.getElementById(imageName);
    imgSrc = window[imageName + 'on'];
    imgObject.src = imgSrc.src;
  }
}

function turnOff(imageName) {
  if (document.images) {
    imgObject = document.getElementById(imageName);
    imgSrc = window[imageName + 'off'];
    imgObject.src = imgSrc.src;
  }
}
