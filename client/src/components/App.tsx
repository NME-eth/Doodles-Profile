import { ChakraProvider } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { doodlesAddr, sDoodlesAddr } from '../utils/contractInfo.json';
import Layout from './Layout';
import theme from '../theme';
import Header from './Header';
import Gallery from './Gallery';

function App(): React.ReactNode {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState(false);
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const accountsChanged = async (newAccount: string) => {
    setAccount(newAccount);
    try {
      // setting the doodles balance
      console.log([doodlesAddr, sDoodlesAddr]);
      const inventory = axios.get(
        'http://localhost:8888/getNFTMetadata/getBalance', 
        {
          params: {
            owner: newAccount,
            contracts: [doodlesAddr, sDoodlesAddr],
          },
        },
      ).then( async response => {
        const idList = response.data;

        // setting balance state
        setBalance(idList.length);

        // setting inventory state
        await axios.get(
          'http://localhost:8888/getNFTMetadata/getTokens',
          {
            params: {
              contract: doodlesAddr,
              idList,
            }
          }
        ).then( res => setInventory(res.data));
      }
      );

      console.log(inventory);
      
    } catch (err) {
      setErrorMessage('There was an error connecting to MetaMask');
    }
  };

  const chainChanged = () => {
    console.log('chain changed');
  };

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        await accountsChanged(res[0]);
      } catch (err) {
        setErrorMessage('Ecountered error connecting to metamask');
      }
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (acc: Array<string>) => accountsChanged(acc[0]));
      window.ethereum.on('chainChanged', chainChanged);
    }
  }, []);

  return (
    // using Chakra UI syntax across our app
    <ChakraProvider theme={theme}>
      <Layout>
        <Header
          connectHandler={connectHandler}
          account={account}
          balance={balance}
        />
        <Gallery 
          inventory={inventory}
        />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
