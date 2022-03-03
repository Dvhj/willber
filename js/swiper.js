const swiper = () => {
	const btnSwiper = document.querySelectorAll('.slider-button')
	const slide = document.querySelector('.swiper-wrapper')
	let count = 0

	btnSwiper.forEach(item => {
		item.addEventListener('click', () => {
			if (item.classList.contains('slider-button-prev')){
				count--
				if (count < -2) {
					count = 1
				}
				slideInner(count)
			} else {
				count++
				if (count > 1) {
					count = -2
				}
				slideInner(count)
			}
		})
	})

	const slideInner = (count) => {
		let label, title, description, price, text

		if ( count == 0 ){
			label = 'Bestseller'
			title = "Women's Alpargata Loafer"
			description = "At Alpa believe in a better tomorrow, one where humanity thrives"
			price = '$219'
			slideNumber = "slide-1"
		} else if ( count == 1) {
			label = 'New'
			title = "Text T-Shirt"
			description = "Women’s pearl basic knit sweater with a round neck. Available in several colours. Free shipping to stores"
			price = '$119'
			slideNumber = "slide-2"
		} else if ( count == -1) {
			label = 'Bestseller'
			title = "Sweater Choker Neck"
			description = "Women’s pearl basic knit sweater with a round neck. Available in several colours. Free shipping to stores"
			price = '$319'
			slideNumber = "slide-3"
		} else if ( count == -2) {
			label = 'New'
			title = "Bugatchi Men's Long Sleeve"
			description = 'Lorem, ipsum, dolor sit amet consectetur adipisicing elit. '
			price = '$109'
			slideNumber = "slide-4"
		}


		slide.innerHTML = `
				<section class="slide ${slideNumber} swiper-slide">
					<div class="container">
						<div class="row">
							<div class="col-lg-4 col-10 offset-lg-1">
								<span class="label">${label}</span>
								<h2 class="slide-title">${title}</h2>
								<p class="slide-description">${description}</p>
								<button class="button add-to-cart" data-id="004">
									<span class="button-price">${price}</span>
									<span class="button-text">Shop now</span>
								</button>
							</div>
						</div>
					</div>
				</section>
			`
	}
}

swiper()