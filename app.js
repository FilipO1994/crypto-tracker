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

const btn = document.querySelector('.search-btn')
const input = document.querySelector('.search-input')

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
// burger menu opening
const burgerMenu = document.querySelector('.burger-menu')
const burgerBar = document.querySelector('.burger-bar')

const toggleBurgerMenu = () => {
	burgerMenu.classList.toggle('visable')
}
burgerBar.addEventListener('click', toggleBurgerMenu)

// burger menu search
const burgerSearch = document.querySelector('.burger-search-input')
const burgerSearchBtn = document.querySelector('.burger-search-btn')
const burgerInput = document.querySelector('.burger-search-input')

const toggleBurgerSearch = () => {
  burgerSearch.classList.toggle('active')
}

btn.addEventListener('click', openSearch)
input.addEventListener('input', searchToken)
burgerInput.addEventListener('input', searchToken)
burgerSearchBtn.addEventListener('click',toggleBurgerSearch)
fetchData()
