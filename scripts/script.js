$(function() {
	let windowTop;	// высота страницы
	let viewportWidth = innerWidth;	// ширина страницы

	// установление размера страницы
	if (viewportWidth > 1024) {
		$('body').attr('data-1024px', 'more');
		$('body').attr('data-840px', 'more');
	} else {
		$('body').attr('data-1024px', 'less');
	}

	if (viewportWidth > 840) {
		$('.social__button').addClass('button_theme_request-call-button');
	} else {
		$('body').attr('data-840px', 'less');
		$('.social__button').addClass('button_theme_learn-more-button');
	}

	// отключение скролла
	const disableScroll = function() {
		windowTop = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);

		$('html, body')
		.on('mousewheel', function() {
			return false;
		})
		.addClass('fixed')
		.css({
			'position': 'fixed', 
			'width': '100%',
			'scroll-behavior': 'auto'
		});

		$('html, body').css({
			'top': -windowTop + 'px'
		});

		$('document').bind('touchmove', false);
	};

	// включение скролла
	const enableScroll = function() {
		windowTop = parseInt($('body').css('top'));

		$('html, body')
		.off('mousewheel')
		.removeClass('fixed')
		.css({
			'position': '',
			'width': ''
		});

		$('html, body').scrollTop(-windowTop);

		$('html, body').css({
			'scroll-behavior': 'smooth'
		});

		$('document').bind('touchmove', true);
	};

	// события на прокрутку страницы
	$(window).scroll(function() {
		windowTop = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
		let windowBottom = windowTop + $(window).height();
		let descriptionBottom = $('.footer').offset().top;

		if (windowBottom > descriptionBottom) {
			$('.description').children().children('.elements').addClass('element_theme_description-elements');
		}
	});

	// события на изменения ширины страницы
	$(window).resize(function() {
		viewportWidth = innerWidth;

		if (viewportWidth > 1024 && $('body').attr('data-1024px') === 'less') {
			$('.popup').css('display', 'none');
			enableScroll();

			$('body').attr('data-1024px', 'more');
		}

		if (viewportWidth <= 1024 && $('body').attr('data-1024px') === 'more') {
			$('body').attr('data-1024px', 'less');
		}

		if (viewportWidth > 840 && $('body').attr('data-840px') === 'less') {
			$('.social__button').toggleClass('button_theme_learn-more-button button_theme_request-call-button');

			$('body').attr('data-840px', 'more');
		}

		if (viewportWidth <= 840 && $('body').attr('data-840px') === 'more') {
			$('.social__button').toggleClass('button_theme_learn-more-button button_theme_request-call-button');

			$('body').attr('data-840px', 'less');
		}
	});

	// закрытие попапа
	$('.popup').click(function(event) {
		if (event.target === this) {
			$(this).fadeOut(400, enableScroll);
		}
	});

	// события на открытие выпадающего меню
	$('.burger').click(function() {
		$('.popup__menu').toggleClass('active');
		disableScroll();
	});

	// события на закрытие выпадающего меню
	$('.menu__close').click(function() {
		$('.popup__menu').toggleClass('active');
		enableScroll();
	});

	// события на закрытие выпадающего меню
	$('.popup__request-call .menu__button, .popup__learn-more .menu__button').click(function() {
		$('.popup__request-call, .popup__learn-more').fadeOut(700, enableScroll);
	});

	// события на закрытие выпадающего меню
	$('.menu__link').click(function() {
		$('.popup__menu').toggleClass('active');
		enableScroll();
	});

	// события на кнопку "заказать звонок"
	$('.button_theme_request-call-button').click(function() {
		$('.popup__request-call').fadeIn(700, disableScroll);
	});

	// обработка кнопки формы для popup__request-call
	$('.popup__request-call .form__button').click(function() {
		let name = $(this).parent().children('.form__label').children('input[name="name"].form__input');
		let phone = $(this).parent().children('.form__label').children('input[name="phone"].form__input');
		
		if (!name.val()) {
			name.focus();
		} else if (!phone.val()) {
			phone.focus();
		} else {			
			name.val('');
			phone.val('');

			$('.popup').click();
		}

		return false;
	});

	// события на кнопку "заказать проект"
	$('.button_theme_learn-more-button').click(function() {
		$('.popup__learn-more').fadeIn(700, disableScroll);
	});

	// обработка кнопки формы для popup__learn-more
	$('.popup__learn-more .form__button').click(function() {
		let name = $(this).parent().children('.form__label').children('input[name="name"].form__input');
		let phone = $(this).parent().children('.form__label').children('input[name="phone"].form__input');
		let email = $(this).parent().children('.form__label').children('input[name="email"].form__input');
		
		if (!name.val()) {
			name.focus();
		} else if (!phone.val()) {
			phone.focus();
		} else if (!email.val()) {
			email.focus();
		} else {			
			name.val('');
			phone.val('');
			email.val('');

			$('.popup').click();
		}

		return false;
	});
});