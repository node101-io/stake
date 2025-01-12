function addChainToKeplr(currentChain, callback) {
  const currentChainInfo = JSON.parse(currentChain.chain_info);
  const keplr = window.keplr;

  keplr.experimentalSuggestChain(currentChainInfo)
    .then(() => keplr.enable(currentChain.chain_id))
    .then(() => keplr.getKey(currentChain.chain_id))
    .then(key => {
      console.log("key", key.bech32Address);
      globalAddress = key.bech32Address;
      document.cookie = `currentChainKey=${currentChain.chain_id}`;
      document.cookie = `globalAddressKey=${globalAddress}`;
      console.log("This is globalAddress",globalAddress);

      setUICurrentChain(globalAddress);
      callback(null);
    })
    .catch(err => {
      console.log(err);
      callback(err);
    });
}

function setUICurrentChain(globalAddress) {

    getValidatorList((err, data) => {
    if (err) console.log(err);
    console.log(currentChain);
    
    console.log("What is this", currentChain.img_url);
    console.log(redelegateIcon);
    redelegateIcon.src = currentChain.img_url;

  }); 

  getBalance(globalAddress, (err, balance) => {
    if (err) balance = 0;
    if (!balance || isNaN(balance)) balance = 0;
    
    
    let balance1 = parseFloat(balance) / 10 ** JSON.parse(currentChain.chain_info).currencies[0].coinDecimals;
    balance1 = balance1.toFixed(2);

    if (!balance1) balance1 = 0;
   

    document.cookie = `globalBalanceKey=${balance1}`;

    getStake(globalAddress, currentChain.validator_address, (err, data) => {
      console.log(globalAddress);
      console.log(currentChain.validator_address);
      if (err) data = 0;

      document.querySelector('.content-wrapper-stake-body-main-center-title-amount').textContent = balance1 + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
      document.querySelector('.content-wrapper-portfolio-body-stat-chain-value-amount-token').textContent = balance1 + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
      document.querySelector('.content-wrapper-portfolio-body-stat-chain-value-amount-usd').textContent = "$" + (balance1 * currentChain.price).toFixed(2);
      document.querySelector('.content-header-title-address').textContent = (globalAddress).slice(0, 10) + "..." 
      
      let width = (parseFloat(data)/(parseFloat(balance) + parseFloat(data))) * 100;
      let width2 = 100 - width;

      
      if (!balance) {
        width = 0;
        width2 = 0;
      }
  
      document.querySelector('.content-wrapper-portfolio-body-stat-balance-statusbar-1').style.background = `linear-gradient(90deg, #CDEED3 ${width}%, #E4E9FF ${width}%)`;  
      document.querySelector('.content-wrapper-portfolio-body-stat-balance-statusbar-3').style.background = `linear-gradient(90deg, #FFD3D3 ${width2}%, #E4E9FF ${width2}%)`;
      document.querySelector('.content-wrapper-portfolio-body-stat-balance-text-amount-1').textContent =(parseFloat(data)/ (10 ** JSON.parse(currentChain.chain_info).currencies[0].coinDecimals)).toFixed(2) + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
    });
  
    getReward(globalAddress, currentChain.validator_address, (err, data) => {
      if (err) data = 0;
      if (!data) data = 0;
      console.log("get reward",data);
      document.querySelector('.content-wrapper-portfolio-body-stat-balance-text-reward').textContent = " " + parseFloat(data) / 10 ** JSON.parse(currentChain.chain_info).currencies[0].coinDecimals + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;

      
    });
  });
};

function getCookieValue(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function getCurrentChain() {
  serverRequest(`/chain?chain_id=${chain_id}`, 'GET', {}, res => {
    if (res.error) {
      console.log(res);
    } else {
      currentChain = res.chainInfo;
    }
  }
)};

function setTokenUI(currentChain) {
  const tokenImage = document.querySelectorAll('.content-wrapper-stake-body-main-center-body-icon-img');
  const tokenName = document.querySelectorAll('.content-wrapper-stake-body-main-center-body-chain-token');
  const chainName = document.querySelectorAll('.content-wrapper-stake-body-main-center-body-chain-name-network');  

  
  const tokenApr = document.querySelectorAll('.content-wrapper-stake-body-main-content-stat-title-content-each-time-percent');
  const globalAddressElement = document.querySelector('.content-header-title-address');

  tokenApr[0].textContent = "+ " + (currentChain.apr / (365)).toFixed(2) + "%";
  tokenApr[1].textContent = "+ " + (currentChain.apr / (12)).toFixed(2) + "%";
  tokenApr[2].textContent = "+ " + (currentChain.apr).toFixed(2) + "%";

  globalAddressElement.innerHTML = getCookieValue('globalAddressKey')?.slice(0, 10) + "..." ;
  if (!getCookieValue('globalAddressKey')) {
    globalAddressElement.innerHTML = "Connect Wallet";
  }

  const tokenShow = document.querySelector('.content-wrapper-portfolio-body-stat-chain-name-token-name');
  
  tokenShow.textContent = JSON.parse(currentChain.chain_info).currencies[0].coinDenom;

  tokenImage[0].src = currentChain.img_url;
  tokenImage[1].src = currentChain.img_url;

  tokenName[0].innerHTML = JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
  tokenName[1].innerHTML = JSON.parse(currentChain.chain_info).currencies[0].coinDenom;

  chainName[0].textContent = JSON.parse(currentChain.chain_info).chainName;
  chainName[1].textContent = JSON.parse(currentChain.chain_info).chainName;

};

function setAmountUI(stakingValue) {
  document.querySelector('.content-wrapper-stake-body-main-center-body-stake-dollar').textContent = "$" + (stakingValue * currentChain.price).toFixed(2);
  document.querySelector('.content-wrapper-stake-body-main-content-stat-title-content-each-value-token-daily').textContent = (stakingValue * (currentChain.apr/100)/365).toFixed(2) + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
  document.querySelector('.content-wrapper-stake-body-main-content-stat-title-content-each-value-price-daily').textContent = "$" + (stakingValue * (currentChain.apr/100)/365 * currentChain.price).toFixed(2);
  document.querySelector('.content-wrapper-stake-body-main-content-stat-title-content-each-value-token-monthly').textContent = (stakingValue * (currentChain.apr/100)/12).toFixed(2) + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
  document.querySelector('.content-wrapper-stake-body-main-content-stat-title-content-each-value-price-monthly').textContent = "$" + (stakingValue * (currentChain.apr/100)/12.16 * currentChain.price).toFixed(2);
  document.querySelector('.content-wrapper-stake-body-main-content-stat-title-content-each-value-token-yearly').textContent = ((stakingValue/100) * (currentChain.apr)).toFixed(2) + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
  document.querySelector('.content-wrapper-stake-body-main-content-stat-title-content-each-value-price-yearly').textContent = "$" + (stakingValue * (currentChain.apr/100) * currentChain.price).toFixed(2);

}

window.addEventListener('load', () => {

  document.addEventListener('click', event => {
    if (event.target.closest('.content-header-title')) {

      if (getCookieValue('globalAddressKey')) {
        return;
      }

      currentChain = !currentChain ? JSON.parse(document.getElementById('chainInfoElement').value) : currentChain;

      if (!window.keplr) {
        alert("Keplr extension not installed");
        return;
      };
     
      addChainToKeplr(currentChain, (err) => {
        if (err) console.log(err);

        document.querySelector('.content-wrapper-info').style.display = 'none';
        document.querySelector('.content-wrapper-portfolio-body').style.display = 'block';  
      });
    }
  });
});