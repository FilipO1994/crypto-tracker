const apiKey = 'BENNGHJVW5D83N7XWIET967RC3SBTDNNYY'
const standardElement = document.getElementsByClassName('standard-gas-fee')[0]
const fastElement = document.getElementsByClassName('fast-gas-fee')[0]
const instantElement = document.getElementsByClassName('instant-gas-fee')[0]
const setButton = document.getElementById('setButton')
const stopAlert = document.getElementById('stopAlert')

let alertGasNumberInput
let isAlertActive = false
let audio

function setAlertGasNumber() {
	if (!isAlertActive) {
		const gasAmountInput = document.getElementById('gasAmountInput')
		if (gasAmountInput) {
			alertGasNumberInput = gasAmountInput.value
			startAlert()
			isAlertActive = true
			setTimeout(() => {
				isAlertActive = false
			}, 16000)
		}
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
	audio = new Audio('audio/alert.wav')
	audio.play()
	stopAlert.addEventListener('click', stopAudio)
}

function stopAudio() {
	alertGasNumberInput = 0
    isAlertActive = false
	if (audio) {
		audio.pause()
		audio.currentTime = 0
	}
}

setButton.addEventListener('click', setAlertGasNumber)

fetchGasPrices()
setInterval(fetchGasPrices, 3000)
