/* Template: Pavo Mobile App Website Tailwind CSS HTML Template
   Description: Custom JS file
*/

(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // close menu on click in small viewport
    $('[data-toggle="offcanvas"], .nav-link:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 70,
        breakpoints: {
            // when window is <= 767px
            767: {
                slidesPerView: 1
            },
            // when window is <= 1023px
            1023: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        }
    });


    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

	/* Function to get the navigation links for smooth page scroll */
	function getMenuItems() {
		var menuItems = [];
		$('.nav-link').each(function() {
			var hash = $(this).attr('href').substr(1);
			if(hash !== "")
				menuItems.push(hash);
		})
		return menuItems;
	}	

	/* Prevents adding of # at the end of URL on click of non-pagescroll links */
	$('.nav-link').click(function (e) {
		var hash = $(this).attr('href').substr(1);
		if(hash == "")
			e.preventDefault();
	});

	/* Checks page scroll offset and changes active link on page load */
	changeActive();

	/* Change active link on scroll */
	$(document).scroll(function(){
		changeActive();
	});
	
	/* Function to change the active link */
	function changeActive() {
		const menuItems = getMenuItems();
		$.each(menuItems, function(index, value){
			var offsetSection = $('#' + value).offset().top;
			var docScroll = $(document).scrollTop();
			var docScroll1 = docScroll + 1; 
			
			if ( docScroll1 >= offsetSection ){
				$('.nav-link').removeClass('active');
				$('.nav-link[href$="#'+value+'"]').addClass('active');
			}  
		});
	}

})(jQuery);

// --- Form and Fetch handlers (vanilla JS) ---
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('registroForm');
	const datosList = document.getElementById('datosList');
	const loadRemoteBtn = document.getElementById('loadRemote');
	const clearBtn = document.getElementById('clearRecords');

	function renderLocalRecords() {
		const records = JSON.parse(localStorage.getItem('ecclesia_records') || '[]');
		datosList.innerHTML = '';
		if (records.length === 0) {
			datosList.innerHTML = '<p class="text-center text-gray-600">No hay registros locales. Envía el formulario o carga registros de ejemplo.</p>';
			return;
		}
		records.forEach(r => {
			const card = document.createElement('div');
			card.className = 'p-4 bg-white rounded shadow';
			card.innerHTML = `<strong>${escapeHtml(r.name)}</strong> — <span class="text-sm text-gray-600">${escapeHtml(r.email)} — ${escapeHtml(r.parish)}</span>`;
			datosList.appendChild(card);
		});
	}

	function escapeHtml(str) {
		return String(str).replace(/[&<>"']/g, function (s) {
			return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s];
		});
	}

	if (form) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault();
			const name = document.getElementById('name').value.trim();
			const email = document.getElementById('email').value.trim();
			const parish = document.getElementById('parish').value;

			const payload = { name, email, parish };

			try {
				// POST request (fetch)
				const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				});
				const result = await resp.json();

				// store locally for display
				const existing = JSON.parse(localStorage.getItem('ecclesia_records') || '[]');
				existing.unshift(Object.assign({ id: result.id || Date.now() }, payload));
				localStorage.setItem('ecclesia_records', JSON.stringify(existing));

				renderLocalRecords();
				form.reset();
				alert('Registro enviado correctamente (se realizó POST).');
			} catch (err) {
				console.error('POST error', err);
				alert('Error al enviar el registro. Revisa la consola.');
			}
		});
	}

	if (loadRemoteBtn) {
		loadRemoteBtn.addEventListener('click', async function () {
			try {
				// GET request (fetch)
				const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
				const items = await resp.json();
				// prepend remote items to datosList
				datosList.innerHTML = '';
				items.forEach(item => {
					const card = document.createElement('div');
					card.className = 'p-4 bg-white rounded shadow';
					card.innerHTML = `<strong>Ejemplo:</strong> <span class="text-sm text-gray-600">${escapeHtml(item.title)}</span>`;
					datosList.appendChild(card);
				});
			} catch (err) {
				console.error('GET error', err);
				alert('Error al cargar registros remotos.');
			}
		});
	}

	if (clearBtn) {
		clearBtn.addEventListener('click', function () {
			localStorage.removeItem('ecclesia_records');
			renderLocalRecords();
		});
	}

	// initial render
	renderLocalRecords();
});

