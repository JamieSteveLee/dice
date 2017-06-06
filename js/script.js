$(function(){
	$('.add').click(function(){
		var type = $(this).data('type');
		var thisClass = 'die-' + type;
		var sides = type.substr(1);

		var newDie = $('<div />', {class: 'die-wrap'})
		.append(
			$('<div />', {class: thisClass}).data('sides', sides)
			.append(
				$('<span />').text(sides)
			)
		);
		$('.main').append(newDie);
		getTotal();
	});

	$('body').on('click', 'div[class^="die-"]:not(.die-wrap)', (function(){
		var die = $(this);
		var sides = die.data('sides');
		var result = Math.floor((Math.random() * sides) + 1);
		die.text(result);
		getTotal();
	}));

	$('.button-open').click(function(){
		$('.options-wrap').slideDown();
		$('header').addClass('options-open');
	});
	$('.button-close').click(function(){
		$('.options-wrap').slideUp();
		$('header').removeClass('options-open');
	});

	function rollAll() {
		$('div[class^="die-"]').click();
		getTotal();
	}
	$('.roll-all').click(function(){
		rollAll();
	});

	function removeAll() {
		var remove = confirm('Remove all dice?');
		if(remove) {
			$('.main').empty();
			getTotal();
		}
	}
	$('.remove-all').click(function(){
		removeAll();
	});

	function getTotal() {
		var total = 0;

		$('.die-wrap div').each(function(){
			var thisNum = parseInt($(this).text());
			total += thisNum;
		});

		$('.total').text(total);
	}

});