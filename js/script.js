$(function(){

	function addDie(type) {
		var thisClass = 'die-' + type;
		var sides = $('.add-' + type).data('sides');
		var startAtZero = $('.add-' + type).data('startatzero');
		var percentile = $('.add-' + type).data('percentile');
		var highNum = sides;
		if(startAtZero) {
			highNum = sides - 1;
		}
		if(percentile) {
			highNum = highNum + '0';
		}

		var newDie = $('<div />', {class: 'die-wrap'})
		.append(
			$('<div />', {class: thisClass})
			.data('sides', sides)
			.data('startatzero', startAtZero)
			.data('percentile', percentile)
			.append(
				$('<span />').text(highNum)
			)
		);

		$('.main').append(newDie);
		getTotal();

	}

	$('.add').click(function(){
		var thisDieType = $(this).data('type');
		$('.welcome-message').remove();
		ga('send', 'event', 'add single die', 'click', thisDieType);
		addDie(thisDieType);
	});

	function addSet(diceArray){
		$.each(diceArray, function(i,v){
			addDie(v);
		});
	}
	$('.set').click(function(){
		var setName = $(this).data('set');
		$('.welcome-message').remove();
		switch(setName) {
			case 'dnd': 
				addSet(['d4','d6','d8','d10', 'd10p','d12','d20']);
			break;
			case 'perudo': 
				addSet(['d6','d6','d6','d6','d6']);
			break;
			case 'betrayal': 
				addSet(['betrayal-d3', 'betrayal-d3', 'betrayal-d3', 'betrayal-d3', 'betrayal-d3', 'betrayal-d3']);
			break;
		}
	});
	$('.set-dnd').click(function(){
		addSet(['d4','d6','d8','d10','d12','d20']);
		ga('send', 'event', 'add die set', 'click', 'set-dnd');
	});
	$('.set-perudo').click(function(){
		addSet(['d6','d6','d6','d6','d6']);
		ga('send', 'event', 'add die set', 'click', 'set-perudo');
	});

	$('body').on('click', 'div[class^="die-"]:not(.die-wrap)', (function(){
		var die = $(this);
		var dieName = die.attr('class');
		var sides = die.data('sides');
		var startAtZero = die.data('startatzero');
		var percentile = die.data('percentile');
		var startNum = 1;
		if(startAtZero) {
			startNum = 0;
		}
		var result = Math.floor((Math.random() * sides) + startNum);
		if(percentile) {
			result = result + '0';
		}
		die.hide().fadeIn();
		die.text(result);
		getTotal();
		ga('send', 'event', 'roll die', 'click', dieName);
	}));

	$('.button-open').click(function(){
		$('.options-wrap').slideDown();
		$('header').addClass('options-open');
	});
	$('.button-close').click(function(){
		$('.options-wrap').slideUp();
		$('header').removeClass('options-open');
	});
	$('body').on('click', '.welcome-message', function(){
		$('.options-wrap').slideDown();
		$('header').addClass('options-open');
	});

	$('.accordion-button').click(function(){
		var thisAccordion = $(this).parents('.accordion-wrap');
		if(thisAccordion.hasClass('collapsed')) {
			thisAccordion.addClass('expanded').removeClass('collapsed');
			thisAccordion.find('.accordion-content').slideDown();
		} else if(thisAccordion.hasClass('expanded')) {
			thisAccordion.removeClass('expanded').addClass('collapsed');
			thisAccordion.find('.accordion-content').slideUp();
		}

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
			$('.main').empty().append('<div class="welcome-message"><span>Add Dice</span></div>');
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