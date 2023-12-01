

async function fetchData() {

 
  try {
    const response = await fetch('https://api.coincap.io/v2/assets/');
    const data = await response.json();
    console.log(data);

    displayCryptocurrencies(data);
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
  }
}


function displayCryptocurrencies(data) {
  
  const selectedCryptos = ['bitcoin', 'ethereum','binance-coin','xrp', 'cardano','chainlink','litecoin', 'stellar','vechain', 'the-graph','quant','algorand','kava','neo','eos', 'iota','chiliz' ,'pancakeswap'];

  selectedCryptos.forEach(cryptoId => {
    const cryptoData = data.data.find(item => item.id === cryptoId);
    console.log(cryptoData);

    if (cryptoData) {
       const selectedContainer = document.querySelector('.selected-container')
       const cryptoDiv = document.createElement('div');
       cryptoDiv.classList.add('crypto-card');
       cryptoDiv.innerHTML = `
           <p>Name: ${cryptoData.name}</p>
           <p>Symbol: ${cryptoData.symbol}</p>
           <p>Price: ${parseFloat(cryptoData.priceUsd).toFixed(2)} USD</p>
           <p>Rank: ${cryptoData.rank}</p>
           <p>Change in 24h: ${parseFloat(cryptoData.changePercent24Hr).toFixed(2)}%</p>
           <p>Market: ${(parseFloat(cryptoData.marketCapUsd)/1000000).toFixed(0)} MLN USD</p>
       `;
       
       
       selectedContainer.appendChild(cryptoDiv);
       
       
       const changeIn24hElement = cryptoDiv.querySelector('p:nth-child(5)'); // 
       
       
       const changeIn24hValue = parseFloat(cryptoData.changePercent24Hr);
       
      
       changeIn24hElement.style.color = changeIn24hValue > 0 ? '#86efac' : '#f87171';
    }
  });
}


fetchData();
