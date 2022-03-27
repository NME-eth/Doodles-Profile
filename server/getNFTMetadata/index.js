require('dotenv/config');
const express = require('express');
const router = express.Router();

const alchemy = require('@alch/alchemy-web3');
const web3 = alchemy.createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}` 
);

router.get('/getBalance', async (req, res) => {
  const contract = req.query.contract;
  const owner = req.query.owner;

  const response = await web3.alchemy.getNfts({
    owner,
    contractAddresses: typeof contract === 'string' ? [contract] : contract,
    withMetadata: false,
  });

  const idList = response.ownedNfts.map(i => parseInt(i.id.tokenId), 16);

  res.json({ idList });
})

router.get('/getTokens', async (req, res) => {
  const contract = req.query.contract;
  const rawToken = req.query.id;
  const idList = typeof rawToken === 'string' ? [rawToken] : rawToken;

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
      image: response.tokenUri.gateway,
      attributes: response.metadata.attributes,
    };
  }
  res.json(metadataList);
})

module.exports = router;

