import React, { useCallback, useState, useEffect } from 'react';
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
  ButtonGroup,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Drawer,
  Avatar,
  Text,
  Box,
} from '@chakra-ui/react';

import { HiChat } from 'react-icons/hi';
import { FaPaperPlane, FaUserPlus } from 'react-icons/fa';
import { MdMic, MdMicOff } from 'react-icons/md';
import {
  MdAccountCircle,
  MdPermMedia,
  MdPersonAdd,
  MdTrendingUp,
  MdViewList,
  MdVisibility,
} from 'react-icons/md';

import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import ChatBubble from './ChatBubble';

import FriendProfile from '../FriendProfile';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/Firebase';
const Chat = ({
  onChatHistoryOpen,
  onChatFilesOpen,
  onlineFriends,
  selectFriend,
  myFriends,
  chat,
  setText,
  text,
  handleSubmit,
  messages,
  setImg,
  isUploading2,
  setAudio,
}) => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendsLength, setFriendsLength] = useState();
  const [viewProfileFriend, setViewProfileFriend] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [audioState, setAudioState] = useState({ recordState: null });

  useEffect(() => {
    // setting my friends length to user field
    const setLengthHandler = async () => {
      if (myFriends.length > 0) {
        setFriendsLength(myFriends.length);
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          friends: friendsLength,
        });
      } else {
        setFriendsLength(0);
      }
    };

    setLengthHandler();
  }, [friendsLength, myFriends.length]);

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

  const updateFriends = useCallback(async () => {
    setLoading(true);
    let isFriendExist = await myFriends.filter(
      doc => doc.friends.uid === viewProfileFriend.uid
    );

    if (isFriendExist.length === 0) {
      try {
        await addDoc(collection(db, 'users', auth.currentUser.uid, 'friends'), {
          friends: viewProfileFriend,
        });

        setFriendsLength(prev => prev + 1);

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          friends: friendsLength,
        });

        toast({
          description: `${viewProfileFriend.name} added`,
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
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        description: `${viewProfileFriend.name} already added your friend`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
    setLoading(false);
  }, [myFriends, viewProfileFriend.uid]);

  const start = () => {
    setAudioState({
      recordState: RecordState.START,
    });
  };

  const stop = () => {
    setAudioState({
      recordState: RecordState.STOP,
    });
  };

  //audioData contains blob and blobUrl
  const onStop = audioData => {
    setAudio(audioData);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
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
        colorScheme="blue"
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerBody>
            <Flex h="full" flexDirection="column" alignItems="center" w="full">
              <FriendProfile
                viewProfileFriend={viewProfileFriend}
                updateFriends={updateFriends}
                isLoading={isLoading}
              />
            </Flex>
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

          <Box
            position="absolute"
            zIndex="100"
            bottom="10%"
            right={{ base: '85%', md: '89%', lg: '89%' }}
            opacity={audioState.recordState === 'start' ? '1' : '0'}
          >
            <AudioReactRecorder
              state={audioState.recordState}
              onStop={onStop}
              canvasWidth="50"
              canvasHeight="20"
            />
          </Box>
        </Flex>
      )}

      {!search && (
        <form onSubmit={handleSubmit}>
          <Flex pl={4} pr={2} py={2} borderTopWidth={1}>
            {audioState.recordState === null ||
            audioState.recordState === 'stop' ? (
              <IconButton
                onClick={start}
                colorScheme="blue"
                variant="ghost"
                icon={<MdMic />}
              />
            ) : (
              <IconButton
                onClick={stop}
                colorScheme="blue"
                variant="ghost"
                icon={<MdMicOff />}
              />
            )}

            <Input
              variant="unstyled"
              placeholder="Type your message"
              value={text}
              isDisabled={!chat}
              ml="20px"
              Change={e => setText(e.target.value)}
              Submit={handleSubmit}
            />

            <Input
              onChange={e => {
                setImg(e.target.files[0]);

                toast({
                  description: 'Image added',
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
              display="absolute"
              left="50px"
              width="50px"
              background="red"
            />

            <IconButton
              colorScheme="blue"
              mr="20px"
              aria-label="Send images"
              variant="ghost"
              cursor="pointer"
              pointerEvents="none"
              icon={<MdPermMedia />}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Send message"
              variant="ghost"
              icon={<FaPaperPlane />}
              isLoading={isUploading2}
              onClick={handleSubmit}
            />
          </Flex>
        </form>
      )}
    </Flex>
  );
};

export default Chat;
