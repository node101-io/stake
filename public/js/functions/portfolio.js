


function setDynamicValidatorUI(validatorList) {  
  
  node101validatorList = validatorList.filter(validator => validator.operatorAddress == currentChain.validator_address);


  if (validatorList.length == 0 && node101validatorList.length == 0) {
    console.log("No validators");
    const backgroundSpiral = document.querySelector('.content-wrapper-portfolio-body-validators-content-no-validator-background');
    backgroundSpiral.classList.remove('display-none');

    const noValidator = document.querySelector('.content-wrapper-portfolio-body-validators-content-no-validator');
    noValidator.classList.remove('display-none');
    
    const reloadIcon = document.querySelector('.content-wrapper-portfolio-body-validators-reload');
    reloadIcon.classList.add('display-none');

    const buttonWrapper = document.querySelector('.content-wrapper-portfolio-body-buttons');
    buttonWrapper.classList.add('display-none');

    const validatorContainer = document.querySelector('.content-wrapper-portfolio-body-validators-content-one-validator');
    validatorContainer.classList.add('display-none');

    const validatorListElement = document.querySelector('.content-wrapper-portfolio-body-validators');
    validatorListElement.classList.remove('display-none');


    const wrapperElement = document.querySelector('.content-wrapper-portfolio-body-validators-content');
    wrapperElement.classList.add('display-none');

    
    return;
  };

  if (node101validatorList.length == 1 && validatorList.length == 1) {
    console.log("Only node101");
    const backgroundSpiral = document.querySelector('.content-wrapper-portfolio-body-validators-content-no-validator-background');
    backgroundSpiral.classList.add('display-none');

    const noValidator = document.querySelector('.content-wrapper-portfolio-body-validators-content-no-validator');
    noValidator.classList.add('display-none');


    const reloadIcon = document.querySelector('.content-wrapper-portfolio-body-validators-reload');
    reloadIcon.classList.add('display-none');

    const buttonWrapper = document.querySelector('.content-wrapper-portfolio-body-buttons');
    buttonWrapper.classList.add('display-none');


    const listValidator = document.querySelector('.content-wrapper-portfolio-body-validators-content');
    listValidator.classList.add('display-none');


    const validatorContainer = document.querySelector('.content-wrapper-portfolio-body-validators-content-one-validator');
    validatorContainer.classList.remove('display-none');

    const nodeValidatorContainer = document.querySelector('.content-wrapper-portfolio-body-validators');
    nodeValidatorContainer.classList.remove('display-none');

    const validatorListElement = document.querySelector('.content-wrapper-portfolio-body-validators');
    validatorListElement.classList.remove('display-none');
    
  }  else {

    validatorList = validatorList.filter(validator => validator.operatorAddress != currentChain.validator_address);
    validatorList =  validatorList.slice(0, 2);
    console.log("More than one validator");
    const backgroundSpiral = document.querySelector('.content-wrapper-portfolio-body-validators-content-no-validator-background');
    backgroundSpiral.classList.add('display-none');

    const noValidator = document.querySelector('.content-wrapper-portfolio-body-validators-content-no-validator');
    noValidator.classList.add('display-none');


    const validatorContainer = document.querySelector('.content-wrapper-portfolio-body-validators-content-one-validator');
    validatorContainer.classList.add('display-none');

    const nodeValidatorContainer = document.querySelector('.content-wrapper-portfolio-body-validators');
    nodeValidatorContainer.classList.add('display-none');
    
    const listValidator = document.querySelector('.content-wrapper-portfolio-body-validators-content');
    console.log(listValidator);

    const validatorListElement = document.querySelector('.content-wrapper-portfolio-body-validators');
    validatorListElement.classList.remove('display-none');

    const wrapperElement = document.querySelector('.content-wrapper-portfolio-body-validators-content');
    wrapperElement.classList.remove('display-none');


  }

  
  


  const reload = document.querySelector('.content-wrapper-portfolio-body-validators-reload');
  reload.classList.add('display-none');
  const buttonWrapper = document.querySelector('.content-wrapper-portfolio-body-buttons');
  buttonWrapper.classList.remove('display-none');

  const validatorContainer = document.querySelector('.content-wrapper-portfolio-body-validators-content');
  validatorContainer.innerHTML = '';

  const redelegateButton = document.createElement('div');
  redelegateButton.classList.add('content-wrapper-portfolio-body-validators-content-third');

  const redelegateIcon = document.createElement('div');
  redelegateIcon.classList.add('content-wrapper-portfolio-body-validators-content-third-icon');

  const svgIcon = 
  `
    <svg width="30" height="18" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.273107 20.2568H4.50079C4.65009 20.2568 4.7739 20.113 4.7739 19.9369V0.319882C4.7739 0.143767 4.65009 0 4.50079 0H0.273107C0.123808 0 0 0.143767 0 0.319882V19.9369C0 20.113 0.123808 20.2568 0.273107 20.2568Z" fill="#2C202A"/>
      <path d="M29.6051 20.2568H33.8328C33.9821 20.2568 34.1059 20.113 34.1059 19.9369V0.319882C34.1059 0.143767 33.9821 0 33.8328 0H29.6051C29.4558 0 29.332 0.143767 29.332 0.319882V19.9369C29.332 20.113 29.4558 20.2568 29.6051 20.2568Z" fill="#2C202A"/>
      <path d="M15.2692 4.26747C14.9958 2.9351 14.726 1.61354 14.4525 0.277573C15.1721 0.0975239 15.8736 0.00389821 16.586 0.000297223C19.2843 -0.0177077 21.7164 0.781712 23.7599 2.5606C25.5696 4.13783 26.6453 6.15799 26.9943 8.54184C27.3181 10.7565 27.0051 12.8774 25.9509 14.858C24.4291 17.71 22.0761 19.4961 18.9137 20.1622C16.7299 20.6232 14.6 20.3711 12.5853 19.4096C10.0669 18.2069 8.23925 16.3164 7.32902 13.6625C6.04823 9.92102 8.51627 5.8447 12.4198 5.18572C14.395 4.85083 16.1903 5.28295 17.7157 6.61531C18.9353 7.68121 19.7772 8.98477 20.083 10.6052C20.1909 11.1886 20.2017 11.7719 20.1442 12.3625C20.1298 12.5173 20.0506 12.5497 19.9175 12.5641C18.7626 12.6902 17.6114 12.8198 16.4565 12.9495C16.1974 12.9783 15.942 13.0071 15.6794 13.0359C15.7765 12.755 15.8916 12.4993 15.9492 12.2329C16.1903 11.167 15.7046 10.1839 14.708 9.60054C13.6323 8.97396 12.6069 9.28005 11.9485 9.87781C11.1534 10.6016 10.9483 11.7323 11.4124 12.7082C12.4882 14.9588 14.7404 16.3056 17.2336 16.1831C19.9859 16.0499 22.3892 13.9325 22.8425 11.2138C23.1771 9.20082 22.6554 7.42914 21.2631 5.93473C20.3852 4.99127 19.3419 4.31788 18.0395 4.11983C17.158 3.98659 16.291 4.06221 15.4239 4.24226C15.3772 4.25307 15.3304 4.25667 15.2692 4.26747Z" fill="#2C202A"/>
    </svg>
  `;

  redelegateIcon.innerHTML = svgIcon;

  const redelegationText = document.createElement('div');
  redelegationText.classList.add('content-wrapper-portfolio-body-validators-content-third-text');

  redelegationText.innerHTML = "Redelegate";

  const redelegationArrow = document.createElement('div');
  redelegationArrow.classList.add('content-wrapper-portfolio-body-validators-content-third-arrow');

  const svgArrow = 
    ` 
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.37915 14.1148C7.39181 14.1278 7.77975 14.2274 8.24116 14.3359C8.70264 14.4445 9.08519 14.5168 9.09134 14.4966C9.09743 14.4764 9.14518 14.1484 9.19739 13.7678C9.30227 13.0034 9.55621 12.111 9.82755 11.5528C10.6733 9.81332 12.1908 8.66152 14.0313 8.36216L14.5 8.28591V7.51748V6.74899L14.0752 6.67601C11.2921 6.19792 9.4777 4.06718 9.13827 0.87852C9.11612 0.670303 9.08964 0.5 9.07944 0.5C8.98558 0.5 7.4303 0.883787 7.40089 0.91419C7.37962 0.936175 7.39544 1.13137 7.4361 1.34789C7.88615 3.74541 9.17477 5.69634 10.847 6.51207L11.2481 6.70775L2.99949 6.72307L0.5 6.7328L0.5 8.28798L3.01291 8.29772L11.2421 8.3131L10.7357 8.57582C9.42192 9.25734 8.38179 10.5942 7.76926 12.3887C7.59471 12.8999 7.33134 14.0654 7.37915 14.1148Z" fill="#2C202A"/>
      </svg>
    `;

  redelegationArrow.innerHTML = svgArrow;

  redelegateButton.appendChild(redelegateIcon);
  redelegateButton.appendChild(redelegationText);
  redelegateButton.appendChild(redelegationArrow);
  
  const redelegatePopup = document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-chain-list-tile-wrapper');
  

  const redelegateDropdownIcon = document.querySelector('img.redelegate-wrapper-content-dropdown-icon-img');
  redelegateDropdownIcon.src = validatorList[0]?.picture;

  const redelegateDropdownText = document.querySelector('.redelegate-wrapper-content-dropdown-text');
  redelegateDropdownText.textContent = validatorList[0]?.moniker;
  redelegateDropdownText.setAttribute('data-operator-address', validatorList[0]?.operatorAddress);



  currency = JSON.parse(currentChain.chain_info).currencies[0].coinDecimals;
  getStake(globalAddress, validatorList[0].operatorAddress, (err, data) => {
    if (err) console.log(err);
   
    const availableAmount = document.querySelector('.redelegate-content-wrapper-stake-body-main-center-title-amount');
    availableAmount.textContent = data / 10 ** currency + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;

  validatorList.forEach(validator => {

    const redelegateRadio = document.createElement('input');
    redelegateRadio.type = 'radio';
    redelegateRadio.id = `validator-${validator.operatorAddress}`;
    redelegateRadio.name = 'validator';
    redelegateRadio.classList.add('validator-radio');
    redelegateRadio.value = validator.operatorAddress;

    // ---------------------

    const redelegateLabel = document.createElement('label');
    redelegateLabel.setAttribute('for', `validator-${validator.operatorAddress}`);
    redelegateLabel.classList.add('validator-label');


    const redelegateWrapper = document.createElement('div');
    redelegateWrapper.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-tile');

    const redelegateInnerWrapper = document.createElement('div');
    redelegateInnerWrapper.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-tile-inner');

    const redelegateEach = document.createElement('div');
    redelegateEach.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-each');

    const redelegateEachIcon = document.createElement('div');
    redelegateEachIcon.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-each-icon');

    const redelegateEachIconImg = document.createElement('img');
    redelegateEachIconImg.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-each-icon-img');
    redelegateEachIconImg.src = validator.picture;

    redelegateEachIcon.appendChild(redelegateEachIconImg);

    const redelegateEachName = document.createElement('div');
    redelegateEachName.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-each-chain');
    redelegateEachName.textContent = validator.moniker;

    const redelegateEachToken = document.createElement('div');
    redelegateEachToken.classList.add('redelegate-content-wrapper-stake-body-main-center-body-chain-list-each-token');
    redelegateEachToken.classList.add('display-none');
    redelegateEachToken.textContent = validator.operatorAddress;

    redelegateEach.appendChild(redelegateEachIcon);
    redelegateEach.appendChild(redelegateEachName);
    redelegateEach.appendChild(redelegateEachToken);

    // --------------------------------
    const validatorParent = document.createElement('div');
    validatorParent.classList.add('content-wrapper-portfolio-body-validators-content-first');

    const validatorElementAddress = document.createElement('div');
    validatorElementAddress.classList.add('content-wrapper-portfolio-body-validators-content-first-icon');

    const validatorElementImgParent = document.createElement('div');
    validatorElementImgParent.classList.add('content-wrapper-portfolio-body-validators-content-first-icon');

    const validatorElementImg = document.createElement('img');
    // make the image circular
    
    validatorElementImg.src = validator.picture;


    validatorElementImgParent.appendChild(validatorElementImg);

    const validatorElementMoniker = document.createElement('div');
    validatorElementMoniker.classList.add('content-wrapper-portfolio-body-validators-content-first-text');
    validatorElementMoniker.textContent = validator.moniker;

    validatorParent.appendChild(validatorElementImgParent);
    validatorParent.appendChild(validatorElementMoniker);
    validatorContainer.appendChild(validatorParent);
    validatorContainer.appendChild(redelegateButton);


    redelegateLabel.append(redelegateEach);
    redelegateInnerWrapper.appendChild(redelegateLabel);
    redelegateWrapper.appendChild(redelegateInnerWrapper);
    redelegatePopup.appendChild(redelegateWrapper);
  });
});
};

window.addEventListener('load', () => {
  console.log(currentChain);

  getValidatorList((err, data) => {
    if (err) console.log(err);
    console.log(currentChain);
  }); 

  getStake(globalAddress, currentChain.validator_address, (err, data) => {
    console.log(globalAddress);
    console.log(currentChain.validator_address);
    if (err) data = 0;
    

    let balance = document.querySelector('.content-wrapper-portfolio-body-stat-chain-value-amount-token').innerText;
    balance = parseFloat((balance.match(/\d+(\.\d+)?/) || [0])[0]) * 10 ** JSON.parse(currentChain.chain_info).currencies[0].coinDecimals;
    let width = (parseFloat(data)/(balance + parseFloat(data))) * 100;
    let width2 = 100 - width;

    if (balance == 0) {
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

    let balance = document.querySelector('.content-wrapper-portfolio-body-stat-chain-value-amount-token').innerText;
    balance = parseFloat((balance.match(/\d+(\.\d+)?/) || [0])[0]) * 10 ** JSON.parse(currentChain.chain_info).currencies[0].coinDecimals;

    document.querySelector('.content-wrapper-portfolio-body-stat-balance-text-reward').textContent += " " + parseFloat(data) / 10 ** JSON.parse(currentChain.chain_info).currencies[0].coinDecimals + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
  });

  document.addEventListener('input', event => {

    if (event.target.closest('.redelegate-content-wrapper-stake-body-main-center-body-stake-amount')) {
      const redelegateAmount = event.target.value || 0;

      document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-stake-dollar').textContent = "$" + (parseFloat(redelegateAmount) * currentChain.price)?.toFixed(2);
    };
  });
  
  document.addEventListener('click', event => {

    if (event.target.closest('.content-wrapper-stake-body-main-center-body-chain-list-each')) {
      const chain_id = event.target.closest('.content-wrapper-stake-body-main-center-body-chain-list-each').querySelector('.content-wrapper-stake-body-main-center-body-chain-list-each-id').textContent;
      const listOfTokens = JSON.parse(document.getElementById('listOfTokensElement').value);

      document.querySelector('img.content-wrapper-portfolio-body-stat-chain-name-icon').src = listOfTokens[chain_id].img_url;
      document.querySelector('.content-wrapper-portfolio-body-stat-chain-name-token-name').innerHTML = listOfTokens[chain_id].coin_denom;

      document.querySelector('.content-wrapper-portfolio-body-stat-timeline-percent-text').textContent = "$" + (listOfTokens[chain_id].price).toFixed(2);
      document.querySelector('.content-wrapper-portfolio-body-stat-timeline-percent-text-change').textContent = (listOfTokens[chain_id].price_change_24h).toFixed(2) + "%";
      

    };

    if (event.target.closest('.redelegate-content-wrapper-stake-body-main-center-title-each.content-wrapper-stake-body-main-center-title-half')){
      const balance =  document.querySelector('.redelegate-content-wrapper-stake-body-main-center-title-amount').innerText;
      console.log("say it",balance);
      const stakeAmount = ((balance.match(/\d+(\.\d+)?/) || [0])[0])/2 > 0 ? ((balance.match(/\d+(\.\d+)?/) || [0])[0])/2 : 0;
      console.log("say it half",stakeAmount);
      document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-stake-amount').value = stakeAmount;
      document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-stake-dollar').textContent = "$" + (stakeAmount * currentChain.price).toFixed(2);
    }

    if (event.target.closest('.redelegate-content-wrapper-stake-body-main-center-title-each.content-wrapper-stake-body-main-center-title-max')){
      const balance =  document.querySelector('.redelegate-content-wrapper-stake-body-main-center-title-amount').innerText;
      console.log("say it",balance);

      const stakeAmount = ((balance.match(/\d+(\.\d+)?/) || [0])[0])/1 > 0 ? ((balance.match(/\d+(\.\d+)?/) || [0])[0])/1 : 0;

      document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-stake-amount').value = stakeAmount;
      document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-stake-dollar').textContent = "$" + (stakeAmount * currentChain.price).toFixed(2);
    }

    if (event.target.closest('.redelegate-content-wrapper-stake-body-main-center-body-chain-list-tile-inner')) {
      document.querySelector('.redelegate-wrapper-content-validators').classList.toggle('display-none');
      
    };

    if (event.target.closest('.redelegate-wrapper-content-dropdown')) {
      document.querySelector('.redelegate-wrapper-content-validators').classList.toggle('display-none');
    };

    if (event.target.closest('.redelegate-wrapper-content-validators')) {
      const listTile = event.target.closest('.redelegate-content-wrapper-stake-body-main-center-body-chain-list-tile-inner');
    
      const labelElement = listTile.querySelector('label.validator-label');      
      const validatorId = labelElement.getAttribute('for');
      validatorAddress = validatorId.replace('validator-', '');

      const redelegateImgIcon = listTile.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-chain-list-each-icon-img').src;

      const redelegateDropdownTextTile = event.target.closest('.redelegate-content-wrapper-stake-body-main-center-body-chain-list-each-chain').textContent;

      const redelegateDropdownIcon = document.querySelector('img.redelegate-wrapper-content-dropdown-icon-img');
      const redelegateDropdownText = document.querySelector('.redelegate-wrapper-content-dropdown-text');

      
      redelegateDropdownIcon.src = redelegateImgIcon;
      redelegateDropdownText.textContent = redelegateDropdownTextTile;
      

       const currency = JSON.parse(currentChain.chain_info).currencies[0].coinDecimals;
       getStake(globalAddress, validatorAddress, (err, data) => {
         if (err) console.log(err);
        
         const availableAmount = document.querySelector('.redelegate-content-wrapper-stake-body-main-center-title-amount');
         availableAmount.textContent = data / 10 ** currency + " " + JSON.parse(currentChain.chain_info).currencies[0].coinDenom;
       });
  };

    if (event.target.closest('.content-wrapper-portfolio-body-validators-content-no-validator-button')) {
      document.querySelector('.content-wrapper-stake-body-main-center-body-stake-amount').focus();
    }

    if(event.target.closest('.content-wrapper-portfolio-body-buttons-each-collect')) {
       if (!window.keplr) {
        console.log("Keplr extension not installed");
        return;
      };
      const offlineSigner = keplr.getOfflineSigner(currentChain.chain_id);
      offlineSigner.getAccounts().
      then((accounts) => {
        completeWithdraw(offlineSigner, accounts[0], currentChain, (err,data) => {
          if (err) console.log(err);
      });
      
      }).catch((err) => {
        console.log(err);
        return;
      }); 
    }; 

    if (event.target.closest('.content-wrapper-portfolio-body-buttons-each-restake')) {

      if (!window.keplr) {
        console.log("Keplr extension not installed");
        return;
      };
      completeRestake(currentChain, (err, data) => {
        if (err) console.log(err);
      }
      );

    }; 
  
    if (event.target.closest('.redelegate-wrapper-title-icon')) {
      document.querySelector('.redelegate-wrapper').classList.toggle('display-none');
    }

    if (event.target.closest('.content-wrapper-portfolio-body-validators-content-third')) { 
      const seletedEl = document.querySelector('.redelegate-wrapper-content-dropdown');
      const redelegateWrapper = document.querySelector('.redelegate-wrapper');
      redelegateWrapper.classList.toggle('display-none');
    }

    if (event.target.closest('.redelegate-content-wrapper-portfolio-body-validators-content-third')){

      const validatorAddress = document.querySelector('.redelegate-wrapper-content-dropdown-text').getAttribute('data-operator-address');
      const redelegateAmount = document.querySelector('.redelegate-content-wrapper-stake-body-main-center-body-stake-amount').value;

      
      completeRedelegate(currentChain,validatorAddress, redelegateAmount, (err, data) => {
        if (err) console.log(err);
      });
    }
  });
});
