const search = function() {
	const input = document.querySelector('.search-block > input')
	const searchBtn = document.querySelector('.search-block > button')

	const renderGoods = (goods) => {
		const goodsContainer = document.querySelector('.long-goods-list')

		goodsContainer.innerHTML = ''

		goods.forEach(good => {
			const goodBlock = document.createElement('div') 

			goodBlock.classList.add('col-lg-3')
			goodBlock.classList.add('col-sm-6')

			goodBlock.innerHTML = `
				<div class="goods-card">
					<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
					<img src="db/${good.img}" alt="${good.name}" class="goods-image">
					<h3 class="goods-title">${good.name}</h3>
					<p class="goods-description">${good.description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
						<span class="button-price">$${good.price}</span>
					</button>
				</div>
			`

			goodsContainer.append(goodBlock)
		})
	}
	
	const getData = (value) => {
		fetch('https://willber-2a49d-default-rtdb.europe-west1.firebasedatabase.app/db.json')
			.then(res => res.json())
			.then(data => {
				const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()))

				localStorage.setItem('goods', JSON.stringify(array))

				if (window.location.pathname !== "/D:/%D0%A7%D1%82%D0%BE-%D1%82%D0%BE/%D1%81%D0%B0%D0%B9%D1%82%D1%8B/Willber/goods.html"){
					window.location.href = "/D:/%D0%A7%D1%82%D0%BE-%D1%82%D0%BE/%D1%81%D0%B0%D0%B9%D1%82%D1%8B/Willber/goods.html"
				} else {
					renderGoods(array)
				}
			})
	}

	searchBtn.addEventListener('click', () => {
		getData(input.value)
		input.value = ''
		})
}

search()