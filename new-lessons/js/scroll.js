function scrollit(seed) {
  const m1 = 'Hope you\'ve enjoyed your stay here!';
  const m2 = ' This scrolling message added to';
  const m3 = ' prove that you can still be annoying, even in 2019!';
  const m4 = '';
  const msg = m1 + m2 + m3 + m4;
  const msgBox = document.getElementById('message');
  var out = ' ';
  var c = 1;

  if (seed > 100) {
    seed--;
    cmd = "scrollit(" + seed + ")";
    timerTwo = window.setTimeout(cmd, 100);
  } else if (seed <= 100 && seed > 0) {
    for (c=0 ; c < seed ; c++) {
      out+= ' ';
    }
    out += msg;
    seed--;
    msgBox.innerText = out;
    cmd = "scrollit(" + seed + ")";
    timerTwo = window.setTimeout(cmd,100);
  } else if (seed <= 0) {
    if (-seed < msg.length) {
      out += msg.substring(-seed,msg.length);
      seed--;
      msgBox.innerText = out;
      cmd = "scrollit(" + seed + ")";
      timerTwo = window.setTimeout(cmd,100);
    } else {
      msgBox.innerText = ' ';
      timerTwo = window.setTimeout(scrollit(50),75);
    }
  }
}