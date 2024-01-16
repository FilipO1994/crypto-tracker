const apiKey = 'BENNGHJVW5D83N7XWIET967RC3SBTDNNYY'

const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`

fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		if (data.status === '1') {
			const standardGasPrice = data.result.SafeGasPrice
			const fastGasPrice = data.result.ProposeGasPrice
			const instantGasPrice = data.result.FastGasPrice

			standardElement.textContent = standardGasPrice
			fastElement.textContent = fastGasPrice
			instantElement.textContent = instantGasPrice
		} else {
			console.error('Błąd pobierania danych:', data.message)
		}
	})
	.catch(error => console.error('Błąd pobierania danych:', error))

const standardElement = document.getElementsByClassName('standard-gas-fee')[0]
const fastElement = document.getElementsByClassName('fast-gas-fee')[0]
const instantElement = document.getElementsByClassName('instant-gas-fee')[0]
