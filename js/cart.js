const cart = function() {
	const cartBtn = document.querySelector('.button-cart')
	const cart = document.querySelector('#modal-cart')
	const cartCloseBtn = document.querySelector('.modal-close')
	const goodsContainer = document.querySelector('.long-goods-list')
	const cartTable = document.querySelector('.cart-table__goods')
	const modalForm = document.querySelector('.modal-form')
	const cartTotal = document.querySelector('.card-table__total')

	const deleteCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'))
		const newCart = cart.filter(good => {
			return good.id !== id
		})
		if ( newCart.length > 1){
			localStorage.setItem( 'cart', JSON.stringify(newCart))
			renderCartGoods(JSON.parse(localStorage.getItem('cart')))
		} else {
			cartTotal.innerHTML = ''
			localStorage.setItem( 'cart', JSON.stringify(newCart))
			renderCartGoods(JSON.parse(localStorage.getItem('cart')))
		}
	}


	const minusCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'))
		const newCart = cart.map( good => {
				if (good.id === id) {
					if (good.count > 0){
						good.count--
					}
				}
				return good
			})
		localStorage.setItem( 'cart', JSON.stringify(newCart))
		renderCartGoods(JSON.parse(localStorage.getItem('cart')))
	}


	const plusCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'))
		const newCart = cart.map( good => {
				if (good.id === id) {
					good.count++
				}
				return good
			})
		localStorage.setItem( 'cart', JSON.stringify(newCart))
		renderCartGoods(JSON.parse(localStorage.getItem('cart')))
	}

	const addToCart = (id) => {
		const goods = JSON.parse(localStorage.getItem('goods'))
		const clickedGood = goods.find(good => good.id === id)
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): []
		if (cart.some(good => good.id === clickedGood.id)) {
			console.log('Add count')
			cart.map( good => {
				if (good.id === clickedGood.id) {
					good.count++
				}
				return good
			})
		} else {
			console.log('Add thing')
			clickedGood.count = 1
			cart.push(clickedGood)
		}

		localStorage.setItem( 'cart', JSON.stringify(cart))
	}

	const renderCartGoods = (goods) => {
		cartTable.innerHTML = ''
		goods.forEach(good => {
			const tr = document.createElement('tr')
			tr.innerHTML = `
				<td>${good.name}</td>
				<td>$${good.price}</td>
				<td><button class="cart-btn-minus"">-</button></td>
				<td>${good.count}</td>
				<td><button class=" cart-btn-plus"">+</button></td>
				<td>$${+good.count * +good.price}</td>
				<td><button class="cart-btn-delete"">x</button></td>
			`
			cartTable.append(tr)

			tr.addEventListener('click', (e) => {
				console.log(e.target)
				if (e.target.classList.contains('cart-btn-minus')){
					console.log('minus')
					minusCartItem(good.id)
				} else if (e.target.classList.contains('cart-btn-plus')){
					console.log('plus')
					plusCartItem(good.id)
				} else if (e.target.classList.contains('cart-btn-delete')){
					deleteCartItem(good.id)
					console.log('delete')
				}
			})

			let total = 0
			goods.forEach(item => {
				total = +total + +item.price * +item.count
				cartTotal.innerHTML = `$${total}`
			})
			
		})
	}

	const sendForm = () => {
		const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): []

		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				cart: cartArray,
				name: ``, 
				phone: ``
			})
		})
	}

	modalForm.addEventListener('submit', (e) => {
		e.preventDefault()
		console.log('submit')
		sendForm()
		cart.style.display = ''
		localStorage.removeItem('cart')
	})


	cartBtn.addEventListener('click', () => {
		const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): []
		renderCartGoods(cartArray)
		cart.style.display = 'flex'
	})

	cartCloseBtn.addEventListener('click', () => {
		cart.style.display = ''
	})

	window.addEventListener('keydown', (e) => {
		if (e.key === `Escape`) {
			cart.style.display = ''
		}
	})

	if (goodsContainer) {
		goodsContainer.addEventListener('click', (event) => {

			if(event.target.closest('.add-to-cart')) {
				const buttonToCart = event.target.closest('.add-to-cart')
				const goodId = buttonToCart.dataset.id

				addToCart(goodId)
			}
		})
	}
}

cart()