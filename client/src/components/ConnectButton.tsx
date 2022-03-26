import { Button, Box, Text } from '@chakra-ui/react';
import Identication from './Identicon';

type ConnectButtonProps = {
  connectHandler: () => void,
  account: string,
  balance: number,
};

export default function ConnectButton({
  connectHandler,
  account,
  balance,
}: ConnectButtonProps) {
  const onClick = () => {
    connectHandler();
  };
  return (account !== '') ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {account !== '' && balance}
          {' '}
          Doodle
          {balance === 1 ? '' : 's'}
        </Text>
      </Box>
      <Button
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: 'blue.400',
          backgroundColor: 'gray.700',
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text
          color="white"
          fontSize="md"
          fontWeight="medium"
          mr="2"
        >
          {
            (account !== '')
            && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`
          }
        </Text>
        <Identication account={account}/>
      </Button>
    </Box>
  ) : (
    <Button onClick={onClick}>
      Connet to a wallet
    </Button>
  );
}
