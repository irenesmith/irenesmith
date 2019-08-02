window.onpopstate = function (event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

console.log(window.history);
history.pushState({ page: 1 }, "title 1", "page1.html");
console.log('pushed page=1');
history.pushState({ page: 2 }, "title 2", "page2.html");
console.log('pushed page=2');
history.replaceState({ page: 3 }, "title 3", "page3.html");
console.log('pushed page=3');
//history.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
//history.back(); // alerts "location: http://example.com/example.html, state: null
//history.go(2);  // alerts "location: http://example.com/example.html?page=3, state: {"page":3}