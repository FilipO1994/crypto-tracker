const apiKey = 'BENNGHJVW5D83N7XWIET967RC3SBTDNNYY'
const standardElement = document.getElementsByClassName('standard-gas-fee')[0]
const fastElement = document.getElementsByClassName('fast-gas-fee')[0]
const instantElement = document.getElementsByClassName('instant-gas-fee')[0]
const setButton = document.getElementById('setButton')
const stopAlert = document.getElementById('stopAlert')

let alertGasNumberInput = 0
let isAlertActive = false
let audio

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

				if (isAlertActive) {
					checkAlertCondition(SafeGasPrice)
				}
			} else {
				console.error('Błąd pobierania danych:', data.message)
			}
		})
		.catch(error => console.error('Błąd pobierania danych:', error))
}

function checkAlertCondition(gasPrice) {
	if (Number(gasPrice) <= alertGasNumberInput) {
		isAlertActive = true
	}
	if (Number(gasPrice) <= alertGasNumberInput && isAlertActive === true) {
		startAlert()
		isAlertActive = false
	}
}

function setAlertGasNumber() {
	const gasAmountInput = document.getElementById('gasAmountInput')

	alertGasNumberInput = parseFloat(gasAmountInput.value)
	isAlertActive = true
	setTimeout(() => {
		isAlertActive = false
	}, 16000)
}

function startAlert() {
	audio = new Audio('audio/alert.wav')
	audio.play()
}

function stopAudio() {
	isAlertActive = false
	if (audio) {
		audio.pause()
		audio.currentTime = 0
	}
}

setButton.addEventListener('click', setAlertGasNumber)
stopAlert.addEventListener('click', stopAudio)

fetchGasPrices()
setInterval(fetchGasPrices, 3000)
