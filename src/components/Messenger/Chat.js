import {
  Flex,
  HStack,
  IconButton,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
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
  const bgColor = useColorModeValue('', 'gray.800');
  return (
    <Flex w="full" flexDirection="column" bg={bgColor}>
      <HStack px={4} py={4} borderBottomWidth={1}>
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
          aria-label="Toggle Profile Drawer"
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
      <form onSubmit={handleSubmit}>
        <Flex pl={4} pr={2} py={2} borderRadius="20px" borderTopWidth={1}>
          <Input
            variant="unstyled"
            placeholder="Type your message"
            value={text}
            disabled={!chat}
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
      </form>
    </Flex>
  );
};

export default Chat;
