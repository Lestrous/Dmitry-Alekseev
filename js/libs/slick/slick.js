$(function() {
	var windowTop = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);	// высота страницы
	var viewportWidth = innerWidth;	// ширина страницы

	$('.carousel').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1251,
				settings: {
					slidesToShow: 2,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 841,
				settings: {
					slidesToShow: 1,
					dots: true,
					arrows: false
				}
			}
		]
	});
});