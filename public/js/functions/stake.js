let globalOfflineSigner;
let globalAddress;
let currentChain; 
let globalBalance;

window.addEventListener('load', () => {


  document.querySelector('.content-wrapper-stake-body-main-center-body-stake-amount').focus();
  currentChain = JSON.parse(document.getElementById('chainInfoElement').value);
  globalAddress = document.getElementById('globalAddressElement')?.value || "";
  setTokenUI(JSON.parse(document.getElementById('chainInfoElement').value));

  document.addEventListener('input', event => {
    
    if (event.target.closest('.content-wrapper-stake-body-main-center-body-stake-amount')) {
      const stakingValue = event.target.value;
      let balance = document.querySelector('.content-wrapper-stake-body-main-center-title-amount').innerText;
      balance = parseFloat((balance.match(/\d+(\.\d+)?/) || [0])[0]) 
      const inputWrapper = document.querySelector('.content-wrapper-stake-body-main-center-body');
      const buttonWrapper = document.querySelector('.content-wrapper-stake-body-button');


      if (stakingValue > balance) {
        console.log("You don't have enough balance");
        inputWrapper.style.border = "1px solid red";
        buttonWrapper.style.opacity = "0.6";
        buttonWrapper.style.cursor = "not-allowed";
      } else {
        inputWrapper.style.border = "1px solid #E8E8E8";
        buttonWrapper.style.cursor = "pointer";
      }
      setAmountUI(stakingValue);
    }

    if (event.target.closest('.content-wrapper-stake-body-main-center-body-chain-list-search-input')) {
      const searchValue = event.target.value.toLowerCase();
      const chains = document.querySelectorAll('.content-wrapper-stake-body-main-center-body-chain-list-each');
      chains.forEach(chain => {
        if ((chain.getAttribute('data-chain-name')).includes(searchValue) || (chain.getAttribute('data-coin-name')).includes(searchValue))
          chain.style.display = '';
        else
          chain.style.display = 'none';
      });
    };
  });

  document.addEventListener('click', event => {


    if (event.target.closest('.content-wrapper-stake-body-main-center-body-chain-list-each')) {

      const chain_id = event.target.closest('.content-wrapper-stake-body-main-center-body-chain-list-each').querySelector('.content-wrapper-stake-body-main-center-body-chain-list-each-id').textContent;
      serverRequest(`/chain?chain_id=${chain_id}`, 'GET', {}, res => {
        if (res.error) {
          console.log(res);
        } else {

          currentChain = res.chainInfo;
          const stakingValue = document.querySelector('.content-wrapper-stake-body-main-center-body-stake-amount').value;
          setAmountUI(stakingValue);
          addChainToKeplr(currentChain, (err) => {
             if (err) console.log(err);

             setTokenUI(currentChain);
           });
        }
      });

      document.querySelector('.content-wrapper-stake-body-main-center-body-chain-list').classList.toggle('display-none');

    };


    if (event.target.closest('.content-wrapper-stake-body-main-title-each')) {
      const chain_id = event.target.closest('.content-wrapper-stake-body-main-title-each').querySelector('#chainListId').value;
      serverRequest(`/chain?chain_id=${chain_id}`, 'GET', {}, res => {
        if (res.error) {
          console.log(res);
        } else {

          currentChain = res.chainInfo;

          addChainToKeplr(currentChain, (err) => {
            if (err) console.log(err);

            setTokenUI(currentChain);
          });

        }
      });
    }

    if (event.target.closest('.content-wrapper-stake-body-main-center-title-each.content-wrapper-stake-body-main-center-title-half')) {
      const balance = document.querySelector('.content-wrapper-stake-body-main-center-title-amount').innerText;
      const stakeAmount = ((balance.match(/\d+(\.\d+)?/) || [0])[0])/2 > 0.02 ? ((balance.match(/\d+(\.\d+)?/) || [0])[0])/2 : 0;
      document.querySelector('.content-wrapper-stake-body-main-center-body-stake-amount').value = stakeAmount;
      setAmountUI(stakeAmount);
    }

    if (event.target.closest('.content-wrapper-stake-body-main-center-title-each.content-wrapper-stake-body-main-center-title-max')) {
      const balance = document.querySelector('.content-wrapper-stake-body-main-center-title-amount').innerText;
      const stakeAmount = ((balance.match(/\d+(\.\d+)?/) || [0])[0]) > 0.02 ? ((balance.match(/\d+(\.\d+)?/) || [0])[0]) - 0.02 : 0;
      document.querySelector('.content-wrapper-stake-body-main-center-body-stake-amount').value = stakeAmount;
      setAmountUI(stakeAmount);
    }

    if (event.target.closest('.content-wrapper-stake-body-main-center-body-chain-name')) {
      document.querySelector('.content-wrapper-stake-body-main-center-body-chain-list').classList.toggle('display-none');
      document.querySelector('.content-wrapper-stake-body-main-center-body-chain-list-search-input').focus();
    };

    if (!event.target.closest('.content-wrapper-stake-body-main-center-body-chain-list-search-input') && !event.target.closest('.content-wrapper-stake-body-main-center-body-chain-name') && !document.querySelector('.content-wrapper-stake-body-main-center-body-chain-list').classList.contains('display-none')) {
        document.querySelector('.content-wrapper-stake-body-main-center-body-chain-list').classList.add('display-none');
    };

    if (event.target.closest('.content-wrapper-stake-body-button')) {
     

      if (!currentChain) {
        return;
      };

      const inputElement = document.querySelector('.content-wrapper-stake-body-main-center-body-stake-amount');
      const stakingValue = inputElement.value;

      if (!stakingValue ) {
        console.log("Please enter a valid amount");
        return;
      };
    
        completeStake(currentChain, stakingValue, (err, res) => {
          if (err) {
            console.log(err);
            return;
          };
      }).catch((err) => {
        console.log(err);
        return;
      });
    };
  })
});

