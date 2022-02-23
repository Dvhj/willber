const cart = function() {
	const cartBtn = document.querySelector('.button-cart')
	const cart = document.querySelector('#modal-cart')
	const cartCloseBtn = document.querySelector('.modal-close')

	cartBtn.addEventListener('click', () => {
		cart.style.display = 'flex'
	})

	cartCloseBtn.addEventListener('click', () => {
		cart.style.display = ''
	})
}

cart()