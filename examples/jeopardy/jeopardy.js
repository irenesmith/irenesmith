window.onload = (e) => {
  // Set up the page and the variables
  for(var cat = 1; cat <= 3; cat++) {
    for(var quest = 1; quest <= 3; quest++) {
      document.getElementById('quest' + quest + '-' + cat).addEventListener('click', clickQuestion);
    }
  }
};

function clickQuestion(e) {
  console.log(e.target.id);
  // pull out the array indices
  let quest = (e.target.id).substring(5, 6) - 1;
  let cat = (e.target.id).substring(7) - 1;

  switch(questions[cat][quest].state) {
    case 'value':
      questions[cat][quest].state = 'answer';
      document.getElementById(e.target.id).className = 'answer';
      document.getElementById(e.target.id).textContent = questions[cat][quest].answer;
      break;
    case 'answer':
      questions[cat][quest].state = 'question';
      document.getElementById(e.target.id).className = 'question';
      document.getElementById(e.target.id).textContent = questions[cat][quest].question;
      break;
    case 'question':
      break;
  }
  console.log(questions[cat][quest].state);
  console.log(questions[cat][quest].answer);
  console.log(questions[cat][quest].question);
}
