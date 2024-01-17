const apiKey = 'BENNGHJVW5D83N7XWIET967RC3SBTDNNYY'
const standardElement = document.getElementsByClassName('standard-gas-fee')[0]
const fastElement = document.getElementsByClassName('fast-gas-fee')[0]
const instantElement = document.getElementsByClassName('instant-gas-fee')[0]
const setButton = document.getElementById('setButton')

let alertGasNumberInput

function setAlertGasNumber() {
	const gasAmountInput = document.getElementById('gasAmountInput')
	if (gasAmountInput) {
		alertGasNumberInput = gasAmountInput.value
	}
}

function fetchGasPrices() {
	const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			if (data.status === '1') {
				const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = data.result

				standardElement.textContent = SafeGasPrice
				fastElement.textContent = ProposeGasPrice
				instantElement.textContent = FastGasPrice

				if (alertGasNumberInput && SafeGasPrice < alertGasNumberInput) {
					startAlert()
				}
			} else {
				console.error('Błąd pobierania danych:', data.message)
			}
		})
		.catch(error => console.error('Błąd pobierania danych:', error))
}

function startAlert() {
	const audio = new Audio('audio/alert.wav')
	audio.play()
}

setButton.addEventListener('click', setAlertGasNumber)

fetchGasPrices()
setInterval(fetchGasPrices, 3000)
