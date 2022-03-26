import { ReactNode } from 'react';
import { VStack } from '@chakra-ui/react';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <VStack
      flexDirection="column"
      alignItems="center"
      h="100vh"
      bg="gray.800"
    >
      {children}
    </VStack>
  );
}
