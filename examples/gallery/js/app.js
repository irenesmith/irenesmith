var photoLi = [];

$(document).ready(function() {
	photoList.forEach(addToTable)

	$('#thumbs').html(photoLi);
});

function addToTable(photoData) {
	var row = '<li><a href="img/' +
	photoData.fileName +
	'"><img src="img/thumbs/' +
	photoData.fileName +
	'"></a><br>' + 
	'</li>';
	//var row = "<li>" + photoData.title + "</li>"
	photoLi.push(row);
}