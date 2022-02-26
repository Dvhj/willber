
const getGoods = () => {
	const links = document.querySelectorAll('.navigation-link')
	
	const getData = () => {
		fetch('https://willber-2a49d-default-rtdb.europe-west1.firebasedatabase.app/db.json')
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('base', JSON.stringify(data))
				const base = JSON.parse(localStorage.getItem('base'))
				console.log(base)
		})
	}

	links.forEach(link => {
		link.addEventListener(('click'), (event) => {
			event.preventDefault()
			getData()
		})
	})

	localStorage.setItem('goods', JSON.stringify([1, 3, 4]))
	const goods = JSON.parse(localStorage.getItem('goods'))
	console.log(goods)
	localStorage.removeItem('goods')

}

getGoods()