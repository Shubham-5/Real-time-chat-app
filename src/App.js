import React, { useState } from 'react';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';

import Navigation from './components/Navigation';
import ChatHistorySidebar from './components/Chats/ChatHistorySidebar';
import Chat from './components/Messenger/Chat';
import ChatFiles from './components/Profile/ChatFiles';
import ChatHistoryDrawer from './components/Chats/ChatHistoryDrawer';
import ChatFilesDrawer from './components/Profile/ChatFilesDrawer';
import Login from './components/Login';

function App() {
  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();
  const {
    isOpen: isChatFilesOpen,
    onOpen: onChatFilesOpen,
    onClose: onChatFilesClose,
  } = useDisclosure();

  const [user, setUser] = useState(false);
  return (
    <HStack h="100vh" spacing={0}>
      {!user && <Login setUser={setUser} />}

      {user && (
        <>
          <Flex as="nav" h="full" maxW={16} w="full" bg="gray.100">
            <Navigation />
          </Flex>

          <Flex
            as="aside"
            h="full"
            maxW={{ base: 'xs', xl: 'sm' }}
            display={{ base: 'none', lg: 'flex' }}
            w="full"
            borderRightColor="gray.100"
            borderRightWidth={1}
            pt={8}
          >
            <ChatHistorySidebar />
          </Flex>
          <Flex
            as="main"
            h="full"
            flex={1}
            borderRightColor="gray.100"
            borderRightWidth={1}
          >
            <Chat
              onChatHistoryOpen={onChatHistoryOpen}
              onChatFilesOpen={onChatFilesOpen}
            />
          </Flex>
          <Flex
            as="aside"
            h="full"
            maxW={{ base: 'xs', xl: 'sm' }}
            display={{ base: 'none', lg: 'flex' }}
            w="full"
          >
            <ChatFiles />
          </Flex>
          <ChatHistoryDrawer
            isOpen={isChatHistoryOpen}
            onClose={onChatHistoryClose}
          />
          <ChatFilesDrawer
            isOpen={isChatFilesOpen}
            onClose={onChatFilesClose}
          />
        </>
      )}
    </HStack>
  );
}

export default App;
