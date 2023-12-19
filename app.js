async function fetchData() {
	try {
		const response = await fetch('https://api.coincap.io/v2/assets/')
		const data = await response.json()

		displayCryptocurrencies(data)
	} catch (error) {
		console.error('Błąd podczas pobierania danych:', error)
	}
}

function displayCryptocurrencies(data) {
	const selectedCryptos = [
		'bitcoin',
		'ethereum',
		'binance-coin',
		'xrp',
		'cardano',
		'chainlink',
		'litecoin',
		'stellar',
		'vechain',
		'the-graph',
		'quant',
		'algorand',
		'kava',
		'neo',
		'eos',
		'iota',
		'chiliz',
		'pancakeswap',
	]

	selectedCryptos.forEach(cryptoId => {
		const cryptoData = data.data.find(item => item.id === cryptoId)

		if (cryptoData) {
			const selectedContainer = document.querySelector('.selected-container')
			const cryptoDiv = document.createElement('div')
			cryptoDiv.classList.add('crypto-card')
			cryptoDiv.dataset.name = cryptoData.name.toLowerCase()

			cryptoDiv.innerHTML = `
                <p>Name: ${cryptoData.name}</p>
                <p>Symbol: ${cryptoData.symbol}</p>
                <p>Price: ${parseFloat(cryptoData.priceUsd).toFixed(2)} USD</p>
                <p>Rank: ${cryptoData.rank}</p>
                <p>Change in 24h: ${parseFloat(cryptoData.changePercent24Hr).toFixed(2)}%</p>
                <p>Market: ${(parseFloat(cryptoData.marketCapUsd) / 1000000).toFixed(0)} MLN USD</p>
            `

			selectedContainer.appendChild(cryptoDiv)

			const changeIn24hElement = cryptoDiv.querySelector('p:nth-child(5)')
			const changeIn24hValue = parseFloat(cryptoData.changePercent24Hr)

			changeIn24hElement.style.color = changeIn24hValue > 0 ? '#86efac' : '#f87171'
		}
	})
}
// main-nav
const btn = document.querySelector('.search-btn')
const input = document.querySelector('.search-input')
// burger menu opening
const burgerMenu = document.querySelector('.burger-menu')
const burgerBar = document.querySelector('.burger-bar')
// burger menu search
const burgerSearch = document.querySelector('.burger-search-input')
const burgerSearchBtn = document.querySelector('.burger-search-btn')
const burgerInput = document.querySelector('.burger-search-input')

const openSearch = () => {
	input.classList.toggle('active')
}

const searchToken = e => {
	const searchValue = e.target.value.toLowerCase()
	const cryptoDivs = document.querySelectorAll('.crypto-card')

	cryptoDivs.forEach(cryptoDiv => {
		const cryptoName = cryptoDiv.dataset.name

		if (cryptoName.includes(searchValue)) {
			cryptoDiv.classList.remove('hidden')
		} else {
			cryptoDiv.classList.add('hidden')
		}
	})
}

const toggleBurgerMenu = () => {
	burgerMenu.classList.toggle('visable')
}
const toggleBurgerSearch = () => {
	burgerSearch.classList.toggle('active')
}



burgerBar.addEventListener('click', toggleBurgerMenu)
btn.addEventListener('click', openSearch)
input.addEventListener('input', searchToken)
burgerInput.addEventListener('input', searchToken)
burgerSearchBtn.addEventListener('click', toggleBurgerSearch)

// sticky nav main-nav

document.addEventListener('DOMContentLoaded', function () {
	const nav = document.querySelector('.main-nav')
	const navOffsetTop = nav.offsetTop
	

	function handleScroll() {
		if (window.scrollY >= navOffsetTop) {
			nav.classList.add('sticky')
		} else {
			nav.classList.remove('sticky')
		}
	}

	window.addEventListener('scroll', handleScroll)
})



fetchData()
