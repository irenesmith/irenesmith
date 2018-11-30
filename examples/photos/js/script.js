$(document).ready(function() {
	var items = $('#gallery li'),
		itemsByTags = {};

	// Loop through the tags
	items.each(function(i) {
		var elem = $(this),
		tags = elem.data('tags').split(', ');

		// Add data attribute for quicksand
		elem.attr('data-id', i);

		$.each(tags,function(key, value) {
			// Remove whitespace
			value = $.trim(value);

			if(!(value in itemsByTags)) {
				itemsByTags[value] = [];
			}

			// Add image to array
			itemsByTags[value].push(elem);
		});
	});

	// Create "All Items" option
	createList('All Items', items);

	$.each(itemsByTags, function(k, v) {
		createList(k, v);
	});

	// Click Handler
	$('#navbar').on('click', 'a', function(e) {
		var link = $(this);

		// Add Active class
		link.addClass('active').siblings().removeClass('active');

		$('#gallery').quicksand(link.data('list').find('li'));
		e.preventDefault();		
	});

	$('#navbar a:first').click();

	// Create List Function
	function createList(text, items) {
		// Create empty list
		var ul = $('<ul>', {'class':'hidden'});

		$.each(items, function() {
			$(this).clone().appendTo(ul);
		});

		// Add gallery div
		ul.appendTo('#gallery');

		// Create menu item
		var a = $('<a>', {
			html:text,
			href:'#',
			data:{list:ul}
		}).appendTo('#navbar');
	}

});