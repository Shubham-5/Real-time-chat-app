import { VStack, IconButton, Tooltip } from '@chakra-ui/react';

import { HiBell, HiLogout, HiSearch } from 'react-icons/hi';

import ChakraLogo from './ChakraLogo';

const Navigation = () => {
  return (
    <VStack p={6} justifyContent="space-between" alignItems="center" w="full">
      <VStack>
        <ChakraLogo mb={6} />

        

     
      </VStack>
      <Tooltip label="Logout" placement="right">
        <IconButton color="gray.700" icon={<HiLogout />} aria-label="Logout" />
      </Tooltip>
    </VStack>
  );
};

export default Navigation;
