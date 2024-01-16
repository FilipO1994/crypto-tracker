const apiKey = 'BENNGHJVW5D83N7XWIET967RC3SBTDNNYY';

// Pobierz elementy HTML
const standardElement = document.getElementsByClassName('standard-gas-fee')[0];
const fastElement = document.getElementsByClassName('fast-gas-fee')[0];
const instantElement = document.getElementsByClassName('instant-gas-fee')[0];

// Funkcja do pobierania i aktualizacji cen gazu
function fetchGasPrices() {
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === '1') {
                const standardGasPrice = data.result.SafeGasPrice;
                const fastGasPrice = data.result.ProposeGasPrice;
                const instantGasPrice = data.result.FastGasPrice;

                // Przypisz pobrane ceny do odpowiednich elementów HTML
                standardElement.textContent = standardGasPrice;
                fastElement.textContent = fastGasPrice;
                instantElement.textContent = instantGasPrice;
            } else {
                console.error('Błąd pobierania danych:', data.message);
            }
        })
        .catch(error => console.error('Błąd pobierania danych:', error));
}

// Uruchom funkcję na początku i powtarzaj co pewien czas (np. co 30 sekund)
fetchGasPrices();
setInterval(fetchGasPrices, 30000);  // 30 000 ms = 30 s
