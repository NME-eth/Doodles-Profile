const express = require('express');
const router = express.Router();

const alchemy = require('@alch/alchemy-web3');
const web3 = alchemy.createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}` 
);

router.get('/:contractAddress/:tokenId', async (req, res) => {
  const contractAddress = req.params.contractAddress;
  const tokenId = req.params.tokenId;

  console.log('fetching nft data');
  console.log(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`);
  const response = await web3.alchemy.getNftMetadata({
    contractAddress,
    tokenId,
  });
  console.log(response);
  res.json(response);
})

router.get('/', (req, res) => {
  res.json({ message: "Hello from Meta data endpoint" });
})

module.exports = router;

