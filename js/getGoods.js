
const getGoods = () => {
	const links = document.querySelectorAll('.navigation-link')
	const more = document.querySelector('.more')

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
	
	const getData = (value, category) => {
		fetch('https://willber-2a49d-default-rtdb.europe-west1.firebasedatabase.app/db.json')
			.then(res => res.json())
			.then(data => {
				const array = category ? data.filter(item => item[category] === value) : data

				localStorage.setItem('goods', JSON.stringify(array))

				console.log(window.location.pathname)

				if (window.location.pathname !== "/willber/goods.html"){
					window.location.href = "/willber/goods.html"
				} else {
					renderGoods(array)
				}
			})
	}

	links.forEach(link => {
		link.addEventListener(('click'), (event) => {
			event.preventDefault()
			if (link.children.length > 1){
				const linkValue = link.children[1].textContent
				const category = link.dataset.field
				console.log(category)
				console.log(linkValue)
				getData(linkValue, category)
			} else {
				const linkValue = link.textContent
				const category = link.dataset.field
				console.log(category)
				console.log(linkValue)
				getData(linkValue, category)
			}
		})
	})


	if (localStorage.getItem('goods') && window.location.pathname == "/willber/goods.html") {
		renderGoods(JSON.parse(localStorage.getItem('goods')))
		}

	if (more) {
		more.addEventListener(('click'), () => {
			getData()
		})
	} 
}

getGoods()
