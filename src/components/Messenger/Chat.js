import {
  Flex,
  HStack,
  IconButton,
  Input,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import { HiChat } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

import ChatBubble from './ChatBubble';

const Chat = ({
  onChatHistoryOpen,
  onChatFilesOpen,
  chat,
  setText,
  text,
  handleSubmit,
  messages,
}) => {
  return (
    <Flex w="full" flexDirection="column">
      <HStack px={4} py={4} borderBottomColor="gray.100" borderBottomWidth={1}>
        <IconButton
          onClick={onChatHistoryOpen}
          display={{ base: 'inherit', lg: 'none' }}
          icon={<HiChat />}
          aria-label="Toggle Chat History Drawer"
        />
        <Input variant="filled" rounded="full" placeholder="Search friends" />
        <IconButton
          onClick={onChatFilesOpen}
          display={{ base: 'inherit', lg: 'none' }}
          icon={<MdAccountCircle />}
          aria-label="Toggle Chat Files Drawer"
        />
      </HStack>
      <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
        <Stat mt={6}>
          <StatLabel color="gray.500">Chatting with</StatLabel>
          <StatNumber>
            {chat ? chat.name : 'select a friend to start conversation'}
          </StatNumber>
        </Stat>
        {messages.length
          ? messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))
          : null}
      </Flex>
      <Flex pl={4} pr={2} py={2} borderTopColor="gray.100" borderTopWidth={1}>
        <Input
          variant="unstyled"
          placeholder="Type your message"
          value={text}
          onChange={e => setText(e.target.value)}
          onSubmit={handleSubmit}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Send message"
          variant="ghost"
          icon={<FaPaperPlane />}
          onClick={handleSubmit}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
