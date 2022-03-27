require('dotenv/config');
const express = require('express');
const router = express.Router();

const alchemy = require('@alch/alchemy-web3');
const web3 = alchemy.createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}` 
);

router.get('/', async (req, res) => {
  const contractAddress = req.query.contractAddress;
  const rawId = req.query.tokenId;
  const idList = typeof rawId === 'string' ? [rawId] : rawId;

  let metadataList = [];
  // using normal loop incase we get rate limited
  for (let i = 0; i < idList.length; i++) {
    const response = await web3.alchemy.getNftMetadata({
      contractAddress,
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

