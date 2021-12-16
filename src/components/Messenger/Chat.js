import {
  Flex,
  HStack,
  IconButton,
  Input,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
// import { IoSend, IoDocuments } from 'react-icons/io5';
import { HiChat } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

import ChatBubble from './ChatBubble';

const messages = [
  {
    message: 'Hey Shubham ! Would you like to go out for a coffee?',
    from: 'others',
    dateSent: '20:21',
  },
  {
    message: 'Sure! At 11:00 am?',
    from: 'me',
    dateSent: '20:22',
  },
  {
    message: "That's too early! How about at noon?",
    from: 'others',
    dateSent: '20:22',
  },
  {
    message: 'That sounds good as well. Where should we meet?',
    from: 'me',
    dateSent: '20:23',
  },
  {
    message: 'Meet me at the hardware store on 21 Duck Street.',
    from: 'others',
    dateSent: '20:23',
  },
  {
    message: 'Sounds good.',
    from: 'me',
    dateSent: '20:24',
  },
];

const Chat = ({ onChatHistoryOpen, onChatFilesOpen }) => {
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
          <StatNumber>Mark Zuckerburg</StatNumber>
        </Stat>
        {messages.map(({ message, from, dateSent }, index) => (
          <ChatBubble
            key={index}
            message={message}
            from={from}
            dateSent={dateSent}
          />
        ))}
      </Flex>
      <Flex pl={4} pr={2} py={2} borderTopColor="gray.100" borderTopWidth={1}>
        <Input variant="unstyled" placeholder="Type your message" />
        <IconButton
          colorScheme="blue"
          aria-label="Send message"
          variant="ghost"
          icon={<FaPaperPlane />}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
