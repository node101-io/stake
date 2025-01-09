const GAS_FEE_ADJUSTMENT = 1.3;
const TOKEN_DECIMALS = 18;
function getValidatorList(callback, i) {
  if (!i) i = 0;
  SigningStargateClient.connectWithSigner(currentChain.rpc_url)
    .then(client => client.queryClient.staking.delegatorValidators(globalAddress))
    .then((redelegations) => {

          const keybaseIdList = redelegations.validators.map(validator => {
            return validator.description.identity;
          });

          serverRequest('/keybase', 'POST', { keybaseIdList }, res => {
               
               const validatorList = redelegations.validators.map((validator, index) => {
                return {
                  operatorAddress: validator.operatorAddress,
                  moniker: validator.description.moniker,
                  identity: validator.description.identity,
                  picture: res.validatorInfoList[index].image_url
                };
              });
              
              
              setDynamicValidatorUI(validatorList); 
            
          });
        }
    ).catch((err) => {
      if (i < 3)
        return getValidatorList(callback, i + 1);
      
      return callback('document_not_found');
    });
};

function getBalance(address, callback) {  

  const rest_url= currentChain.rest_url;
  fetch(`${rest_url}/cosmos/bank/v1beta1/balances/${address}`).
    then(response => response.json()).
    then(data => {
      if (data.error) return callback(data.error);
      const balance = data.balances[0]?.amount || '0';
      return callback(null, balance);
    }
  ).catch(err => {
    return callback('document_not_found');
  });
}

function getReward(delegatorAddress, validatorAddress, callback, i) {
  const currentChainInfo = JSON.parse(currentChain.chain_info);
  const stakingdenom = currentChainInfo.feeCurrencies[0].coinMinimalDenom;
  const rpc_url = currentChain.rpc_url;

  if (!i) i = 0;

  Tendermint34Client.connect(rpc_url).then((tendermintClient) => {
    const queryClient = QueryClient.withExtensions(tendermintClient, setupDistributionExtension);

    queryClient.distribution.delegationRewards(delegatorAddress, validatorAddress)
      .then((rewardsResponse) => {
        if (!rewardsResponse) return callback(null, '0');
        
        const staked = (rewardsResponse.rewards).filter(reward => reward.denom == stakingdenom)[0];
        const stakedAmount =  `${Math.floor(staked.amount/ (10 ** TOKEN_DECIMALS))}`;
    
        return callback(null, stakedAmount);
      })
      .catch(err => {
        if (i < 3)
          return getReward(delegatorAddress, validatorAddress, callback, i + 1);

        return callback('document_not_found');
      })
  }).catch(_ => {
    if (i < 3)
      return getReward(delegatorAddress, validatorAddress, callback, i + 1);

    return callback('document_not_found');
  });
}

function getStake(delegatorAddress, validatorAddress, callback, i) {
  const rpc_url = currentChain.rpc_url;

  if (!i) i = 0;

  Tendermint34Client.connect(rpc_url).then((tendermintClient) => {
    const queryClient = QueryClient.withExtensions(tendermintClient, setupStakingExtension);
    queryClient.staking.delegation(delegatorAddress, validatorAddress).then((delegationResponse) => {
      if (!delegationResponse) return callback(null,'0');
      
      const stakedAmount = `${delegationResponse.delegationResponse.balance.amount}`;
      return callback(null, stakedAmount);
    }).catch(err => {
      if (i < 3)
        return getStake(delegatorAddress, validatorAddress, callback, i + 1);

      return callback('document_not_found');
    });
  }
  ).catch(_ => {
    if (i < 3)
      return getStake(delegatorAddress, validatorAddress, callback, i + 1);
    return callback('document_not_found');
  });
}

function completeStake( currentChain, stakingValue, callback) {

  keplr.getKey(currentChain.chain_id).then((key) => {

    const currentChainInfo = JSON.parse(currentChain.chain_info);
    stakingValue = parseFloat(stakingValue) * (10 ** currentChainInfo.currencies[0].coinDecimals);
    const coinDenom = currentChainInfo.feeCurrencies[0].coinMinimalDenom;

    const myaddress = key.bech32Address;
    const valiaddress = currentChain.validator_address;

    const DelegateTransaction = {

        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.encode({
          delegatorAddress: myaddress,
          validatorAddress: valiaddress,
          amount: {
            denom: coinDenom,
            amount: stakingValue.toString(),
          },
        }).finish(),
    }

    const proto = [DelegateTransaction];

    completeTransaction(currentChainInfo, key, proto, coinDenom, (err) => {
        if (err) return console.log(err);
      });
    });
    return callback(null);
}; 


function completeRestake(currentChain, callback) {
  keplr.getKey(currentChain.chain_id).then((key) => {
    const currentChainInfo = JSON.parse(currentChain.chain_info);
    const coinDenom = currentChainInfo.feeCurrencies[0].coinMinimalDenom;
    const myaddress = key.bech32Address;
    const valiaddress = currentChain.validator_address;

    getReward(myaddress, valiaddress, (err, data) => {
      if (err) return callback(err);

      const WithdrawRewardTransaction =  {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: MsgWithdrawDelegatorReward.encode({
          delegatorAddress: myaddress,
          validatorAddress: valiaddress,

        }).finish(),
      }

      const DelegateTransaction = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.encode({
          delegatorAddress: myaddress,
          validatorAddress: valiaddress,
          amount: {
            denom: coinDenom,
            amount: data,
          },
        }).finish(),
      };

      proto = [WithdrawRewardTransaction, DelegateTransaction];

      completeTransaction(currentChainInfo,key,proto,coinDenom, (err,data) => {
        if (err) return callback(err);
        
        return callback(null);
      });
    });
  });
};

function completeWithdraw(currentChain, callback) {
  keplr.getKey(currentChain.chain_id).then((key) => {
    const currentChainInfo = JSON.parse(currentChain.chain_info);
    const coinDenom = currentChainInfo.feeCurrencies[0].coinMinimalDenom;
    const myaddress = key.bech32Address;
    const valiaddress = currentChain.validator_address;

    getReward(myaddress, valiaddress, (err, data) => {
      if (err) return callback(err);

      const WithdrawRewardTransaction =  {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: MsgWithdrawDelegatorReward.encode({
          delegatorAddress: myaddress,
          validatorAddress: valiaddress,

        }).finish(),
      }

      proto = [WithdrawRewardTransaction];

      completeTransaction(currentChainInfo,key,proto,coinDenom, (err,data) => {
  
        if (err) return callback(err);
        
        return callback(null);
      });
    });
  });
};  

function completeRedelegate(currentChain, validatorAddress, redelegateAmount, callback) {

  keplr.getKey(currentChain.chain_id).then((key) => {

    const currentChainInfo = JSON.parse(currentChain.chain_info);
    const coinDenom = currentChainInfo.feeCurrencies[0].coinMinimalDenom;
    redelegateAmount = parseFloat(redelegateAmount) * (10 ** currentChainInfo.currencies[0].coinDecimals);
    const myaddress = key.bech32Address;

 
    const RedelegateTransaction = {
      typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
      value: MsgBeginRedelegate.encode({
        delegatorAddress: myaddress,
        validatorSrcAddress: validatorAddress,
        validatorDstAddress: currentChain.validator_address,
        amount: {
          denom: coinDenom,
          amount: redelegateAmount.toString(),
        },
      }).finish(),
    };

    const proto = [RedelegateTransaction];

    completeTransaction(currentChainInfo,key,proto,coinDenom, (err,data) => {
      if (err) return callback(err);
      return callback(null);
    });
  });
};

function completeTransaction(network, key,proto, coinDenom, callback) {

  const stdFee = {
    amount: [
      {
        denom: coinDenom,
        amount: 0,
      },
    ],
    gas: 0,
  }

  simulateMsgs(network, key.bech32Address, proto, [{ denom: coinDenom, amount: "1" }]).then((txFee) => {
    stdFee.gas = Math.ceil(txFee)
    sendMsgs(network, key.bech32Address, proto, stdFee).then((txHash) => {
      alert("Transaction successful");
      console.log(`https://www.mintscan.io/cosmos/tx/${gasUsed.transactionHash}`);
      console.log("txHash", txHash);
    });
  });
 
  return callback(null);
};


// function completeUnstake(offlineSigner, accounts, currentChain, callback) {
//   const currentChainInfo = JSON.parse(currentChain.chain_info);
//   const stakingdenom = currentChainInfo.feeCurrencies[0].coinMinimalDenom;
//   const rpc_url = currentChain.rpc_url;
//   const memo = "unstake from node101 website";
//   const validatorAddress = currentChain.validator_address;

//   getStake(accounts.address, validatorAddress, (err, data) => {
//     if (err) return callback(err);

//     const UndelegateMsg = 
//       MsgUndelegate.fromPartial({
//         delegatorAddress: accounts.address,
//         validatorAddress: validatorAddress,
//         amount: {
//           denom: stakingdenom,
//           amount: data
//         }
//     })