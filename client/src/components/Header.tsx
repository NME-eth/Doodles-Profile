import { Flex } from '@chakra-ui/react';
import ConnectButton from './ConnectButton';

type HeaderProps = {
  connectHandler: () => void,
  account: string,
  balance: number,
};

export default function Header({
  connectHandler,
  account,
  balance,
}: HeaderProps) {
  return (
    <Flex
      justifyContent="flex-end"
      width="100vw"
      padding="1em"
    >
      <ConnectButton
        connectHandler={connectHandler}
        account={account}
        balance={balance}
      />
    </Flex>
  );
}
