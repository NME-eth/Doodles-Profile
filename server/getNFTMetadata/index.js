require('dotenv/config');
const express = require('express');
const router = express.Router();

const alchemy = require('@alch/alchemy-web3');
const web3 = alchemy.createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}` 
);

router.get('/getBalance', async (req, res) => {
  const contracts = req.query.contracts;
  const owner = req.query.owner;

  const response = await web3.alchemy.getNfts({
    owner,
    contractAddresses: contracts,
    withMetadata: false,
  });

  const idList = response.ownedNfts.map(i => parseInt(i.id.tokenId), 16);

  res.json(idList);
})

router.get('/getTokens', async (req, res) => {
  const contract = req.query.contract;
  const idList = req.query.idList;

  let metadataList = [];
  // using normal loop incase we get rate limited
  for (let i = 0; i < idList.length; i++) {
    const response = await web3.alchemy.getNftMetadata({
      contractAddress: contract,
      tokenId: idList[i],
      tokenType: 'ERC721'
    });

    metadataList[i] = {
      name: response.metadata.name,
      id: idList[i],
      image: response.media[0].gateway,
      attributes: response.metadata.attributes.map(({value, trait_type: traitType}) => {
        return {value, traitType}
      }),
    };
  }

  res.json(metadataList);
})

module.exports = router;

