$(document).ready(function() {

	// SLIDER //
	$('.jcarousel').jcarousel({
		wrap: 'circular'
  });

	$('.jcarousel').jcarousel();
	$('.slider__arrow--left').click(function() {
    $(this).parent().next('.jcarousel').jcarousel('scroll', '-=1');
	});

	$('.slider__arrow--right').click(function() {
	  $(this).parent().next('.jcarousel').jcarousel('scroll', '+=1');
	});

	// PIXABAY //
	showImages('');

	$('.search__btn').on('click', function() {
		var queryString = $('.search__input').val();
		if (!queryString) {
			return;
		}
		showImages(queryString);
	})

});


function showImages(queryString) {

	var perPage = 200;
	var posVerticalPhoto = [0, 1, 2, 3, 6];
	var posHorisontalPhoto = [4, 5];
	var cntPhoto = posVerticalPhoto.length + posHorisontalPhoto.length;
	var arrImg = [];

	jQuery.ajax({
		url: 'https://pixabay.com/api/?key=2698403-c9ff30afa1754a63331152400&order=latest&min_width=300&min_height=310&per_page=' + perPage + '&image_type=photo&pretty=true&q=' + queryString,
		dataType: 'jsonp',
		error: function() {
		},
		success: function(data) {
			if (data.hits.length == 0) {
				return;
			};
			$('.photo').masonry();
			$('.photo').masonry('destroy');

			var posVertical = 0;
			var posHorisontal = 0;


			for (var i = 0; i < data.hits.length; i++) {

				var width = data['hits'][i].imageWidth;
				var height = data['hits'][i].imageHeight;
				var proportion = (width/height).toFixed(2);

				// VERTICAL ORIENTATION //
				if (0.5 <= proportion && proportion <= 0.99) {
					arrImg[posVerticalPhoto[posVertical]] = new Image();
					arrImg[posVerticalPhoto[posVertical]].src = data['hits'][i].webformatURL;
					arrImg[posVerticalPhoto[posVertical]].alt = data['hits'][i].tags;
					arrImg[posVerticalPhoto[posVertical]].height = height / (width / 300);
					arrImg[posVerticalPhoto[posVertical]].width = 300;
					posVertical++;
				};

				// Horisontal ORIENTATION //
				if (1.7 <= proportion && proportion <= 2.4) {
					arrImg[posHorisontalPhoto[posHorisontal]] = new Image();
					arrImg[posHorisontalPhoto[posHorisontal]].src = data['hits'][i].webformatURL;
					arrImg[posHorisontalPhoto[posHorisontal]].alt = data['hits'][i].tags;
					arrImg[posHorisontalPhoto[posHorisontal]].height = height / (width / 620);
					arrImg[posHorisontalPhoto[posHorisontal]].width = 620;
					posHorisontal++;
				};

				if (posVertical >= posVerticalPhoto.length && posHorisontal >= posHorisontalPhoto.length) {
					break;
				};

			};

			$('.photo').empty();
			var $container = $('.photo');

			for (var i = 0; i < cntPhoto; i++) {
				if(!arrImg[i]) {
					continue;
				};
				if (arrImg[i].width < arrImg[i].height) {
					$container.append('<div class="photo__container"></div>');

				}
				else {
					$container.append('<div class="photo__container photo__container--w2"></div>');
				};
				var $photo = $('.photo__container:last');
				$photo.append(arrImg[i]);
				$photo.append('<p class="photo__tags">' + arrImg[i].alt +'</p>');

				var $title = $('.photo__tags:last');
				$title.css({
					'width': $photo.width(),
					'margin-top': - $title.height()/2,
					'margin-left': - $photo.width()/2,
				});
			}

			// MASONRY //
			$('.photo').masonry({
				itemSelector: '.photo__container',
				columnWidth: '.photo__container',
				gutter: 20,
			});

		},

	});
};
