import React, { useCallback, useState } from 'react';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  useToast,
  VStack,
  Heading,
  Text,
  ButtonGroup,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  Drawer,
  DrawerFooter,
  Divider,
  Box,
  Avatar,
} from '@chakra-ui/react';

import { HiChat } from 'react-icons/hi';
import { FaPaperPlane, FaUserPlus } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdPermMedia,
  MdPersonAdd,
  MdViewList,
  MdVisibility,
} from 'react-icons/md';
import ChatBubble from './ChatBubble';
import UserAvatar from '../Chats/UserAvatar';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/Firebase';
import FriendProfile from '../FriendProfile';
const Chat = ({
  onChatHistoryOpen,
  onChatFilesOpen,
  onlineFriends,
  selectFriend,
  chat,
  setText,
  text,
  handleSubmit,
  messages,
  setImg,
  isUploading2,
}) => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);

  const [viewProfileFriend, setViewProfileFriend] = useState([]);

  const searchFriend = event => {
    if (search) {
      if (event.key === 'Enter') {
        const filterFriends = onlineFriends.filter(data =>
          data.name.toLowerCase().includes(search)
        );

        setFriends(filterFriends);
      }
    } else {
      setFriends('');
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const updateFriends = useCallback(async () => {
    try {
      await addDoc(collection(db, 'users', auth.currentUser.uid, 'friends'), {
        friends: viewProfileFriend,
      });

      toast({
        description: 'friend updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [viewProfileFriend, toast]);

  const bgColor = useColorModeValue('', 'gray.800');

  return (
    <Flex w="full" flexDirection="column" bg={bgColor} position="relative">
      <HStack px={4} py={4} borderBottomWidth={1}>
        <IconButton
          onClick={onChatHistoryOpen}
          display={{ base: 'inherit', lg: 'none' }}
          icon={<HiChat />}
          aria-label="Toggle Chat List Drawer"
        />

        <Input
          variant="filled"
          rounded="full"
          value={search}
          placeholder="Search friends"
          onKeyPress={searchFriend}
          onChange={e => setSearch(e.target.value)}
        />

        <IconButton
          onClick={onChatFilesOpen}
          display={{ base: 'inherit', lg: 'none' }}
          icon={<MdAccountCircle />}
          aria-label="Toggle Profile Drawer"
        />
      </HStack>

      {/* input search friend ---- */}
      {search && (
        <VStack
          maxHeight="100vh"
          overflowY="auto"
          position="absolute"
          bg={bgColor}
          top={20}
          left={0}
          right={0}
          zIndex={100}
        >
          {friends &&
            friends.map(friend => (
              <>
                <Flex
                  key={friend.uid}
                  py={1}
                  px={8}
                  w="full"
                  alignItems="center"
                  borderBottomWidth={1}
                  style={{ transition: 'background 300ms' }}
                  _hover={{ opacity: '0.9', cursor: 'pointer' }}
                  onClick={() => {
                    // selectFriend(friend);
                    setViewProfileFriend(friend);
                    setSearch('');
                    setFriends('');
                  }}
                >
                  <Avatar name={friend.name} src={friend.avatar} />
                  <VStack
                    overflow="hidden"
                    flex={1}
                    ml={3}
                    spacing={0}
                    alignItems="flex-start"
                  >
                    <Heading fontSize={12} w="full" noOfLines={1}>
                      {friend && friend.name}
                    </Heading>
                  </VStack>
                  <ButtonGroup
                    size="sm"
                    isAttached
                    variant="outline"
                    colorScheme="gray"
                    onClick={onOpen}
                  >
                    <Button mr="-px">View Profile</Button>
                    <IconButton
                      aria-label="Add to friends"
                      icon={<MdVisibility />}
                    />
                  </ButtonGroup>
                </Flex>
              </>
            ))}
        </VStack>
      )}

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        initialFocusRef={firstField}
        onClose={onClose}
        bg="red"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Flex h="full" flexDirection="column" alignItems="center" w="full">
              <FriendProfile
                viewProfileFriend={viewProfileFriend}
                updateFriends={updateFriends}
              />
            </Flex>
            {/* <Flex
              h="full"
              flexDirection="column"
              alignItems="center"
              w="full"
              pt={8}
            >
              <HStack justify="center" w="full" px={8} mb={8}>
                <Text color="gray.500">
                 
                </Text>
              </HStack>
              <Avatar
                src={viewProfileFriend && viewProfileFriend.avatar}
                name={viewProfileFriend && viewProfileFriend.name}
                size="2xl"
              ></Avatar>

              <Heading size="md" mt={5}>
                <ButtonGroup
                  size="sm"
                  isAttached
                  variant="outline"
                  colorScheme="gray"
                  onClick={onOpen}
                >
                  <Button mr="-px">Add Friend</Button>
                  <IconButton
                    aria-label="Add to friends"
                    icon={<FaUserPlus />}
                    onClick={updateFriends}
                  />
                </ButtonGroup>
              </Heading>

              <VStack overflowY="auto" mt="2rem" w="full">
                <HStack px={8} w="full" justifyContent="space-between">
                  <Box variant="outline" size="sm"></Box>
                </HStack>
              </VStack>
            </Flex> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* chats */}
      {!search && (
        <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
          <Stat mt={6}>
            <StatLabel color="gray.500">Chatting with</StatLabel>
            <StatNumber>
              {chat
                ? chat.friends.name
                : 'select a friend to start conversation'}
            </StatNumber>
          </Stat>
          {messages.length
            ? messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))
            : null}
        </Flex>
      )}
      {!search && (
        <form onSubmit={handleSubmit}>
          <Flex pl={4} pr={2} py={2} borderTopWidth={1}>
            <Input
              variant="unstyled"
              placeholder="Type your message"
              value={text}
              isDisabled={!chat}
              onChange={e => setText(e.target.value)}
              onSubmit={handleSubmit}
            />

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
                borderColor: '',
              }}
            >
              <Input
                onChange={e => {
                  setImg(e.target.files[0]);

                  toast({
                    description: 'img added, click a send button',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                  });
                }}
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
                isLoading={isUploading2}
                icon={<MdPermMedia />}
              />
            </Button>

            <IconButton
              colorScheme="blue"
              aria-label="Send message"
              variant="ghost"
              icon={<FaPaperPlane />}
              onClick={handleSubmit}
            />
          </Flex>
        </form>
      )}
    </Flex>
  );
};

export default Chat;
