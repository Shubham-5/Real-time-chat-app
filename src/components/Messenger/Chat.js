import {
  Button,
  Flex,
  FormControl,
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
import { MdAccountCircle, MdPermMedia } from 'react-icons/md';

import ChatBubble from './ChatBubble';

const Chat = ({
  onChatHistoryOpen,
  onChatFilesOpen,
  chat,
  setText,
  text,
  handleSubmit,
  messages,
  setImg,
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
        <Flex pl={4} pr={2} py={2} borderTopWidth={1}>
          <FormControl isRequired>
            <Input
              variant="unstyled"
              placeholder="Type your message"
              value={text}
              isDisabled={!chat}
              onChange={e => setText(e.target.value)}
              onSubmit={handleSubmit}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            h="2.5rem"
            variant="ghost"
            size="sm"
            width="30px"
            mr="1rem"
            _hover={{ bg: '' }}
            _active={{
              bg: '',
              borderColor: '#',
            }}
          >
            <Input
              onChange={e => setImg(e.target.files[0])}
              type="file"
              id="img"
              accept="image/*"
              cursor="pointer"
              variant="ghost"
              opacity="0"
              display="block"
              left="1.8rem"
              top="0.5rem"
            />
            <IconButton
              colorScheme="blue"
              mr="30px"
              aria-label="Send images"
              variant="ghost"
              pointerEvents="none"
              icon={<MdPermMedia />}
            />
          </Button>
          {/* </InputGroup> */}
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
