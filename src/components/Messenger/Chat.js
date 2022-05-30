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
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  Image,
} from '@chakra-ui/react';

import { HiChat } from 'react-icons/hi';
import { FaPaperPlane, FaUserPlus } from 'react-icons/fa';
import {
  MdMic,
  MdMicOff,
  MdAttachFile,
  MdVideoLibrary,
  MdAccountCircle,
  MdPermMedia,
  MdPersonAdd,
  MdTrendingUp,
  MdViewList,
  MdVisibility,
  MdAdd,
} from 'react-icons/md';
import { MdFileUpload, MdViewStream } from 'react-icons/md';
import ChatBubble from './ChatBubble';

import FriendProfile from '../FriendProfile';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  where,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/Firebase';
const Chat = ({
  profileData,
  onChatHistoryOpen,
  onChatFilesOpen,
  onlineFriends,
  myFriends,
  chat,
  groupChat,
  setGroupChat,
  groupMessages,
  setGroupMessages,
  setText,
  text,
  handleSubmit,
  messages,
  setImg,
  img,
  setFile,
  file,
  setVideo,
  video,
  isUploading2,
}) => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendsLength, setFriendsLength] = useState('');
  const [viewProfileFriend, setViewProfileFriend] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // setting my friends length to user field

    const setLengthHandler = async () => {
      if (myFriends.length > 0) {
        setFriendsLength(myFriends.length);
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          friends: friendsLength,
        });
      }
    };
    return () => {
      setLengthHandler();
    };
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

  const groupDeleteHandler = async () => {
    const isAdmin = groupChat.createdBy === auth.currentUser.uid;

    if (isAdmin) {
      try {
        const grpRef = collection(db, 'groups');
        const queryForGroups = query(grpRef, where('id', '==', groupChat.id));
        const snapshot = await getDocs(queryForGroups);
        const result = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        result.forEach(async result => {
          const docRef = doc(db, 'groups', result.id);
          await deleteDoc(docRef);
        });

        toast({
          description: 'Group deleted',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        setGroupChat('');
        setGroupMessages('');
      } catch (err) {
        console.log(err);
      }
    } else {
      toast({
        description: `Your not a admin of this group`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const ImageInputRef = React.useRef(null);
  const VideoInputRef = React.useRef(null);
  const FileInputRef = React.useRef(null);
  const bgColor = useColorModeValue('', 'gray.800');
  const bgColor1 = useColorModeValue('gray.100', 'blue.300');

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
          <DrawerCloseButton />
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
          <Stat mt={3} justifyContent="center" alignItems="center">
            <StatLabel color="gray.500">
              {groupChat.name || chat
                ? 'Chatting with'
                : 'select a chat to start conversation'}
            </StatLabel>
            <StatNumber>{chat && chat.name}</StatNumber>
            {groupChat.name && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<MdViewStream />}
                  variant="ghost"
                  onClick={() => console.log(groupChat.id)}
                >
                  {groupChat && groupChat.name}
                </MenuButton>
                <MenuList>
                  {groupChat.members &&
                    groupChat.members.map(member => (
                      <MenuItem minH="48px">
                        <Avatar
                          boxSize="2rem"
                          borderRadius="full"
                          src={member.avatar}
                          name={member.name}
                          mr="12px"
                        />
                        <span>{member.name}</span>
                      </MenuItem>
                    ))}
                  <Button
                    width="full"
                    bg=""
                    _focus={{ backgroundColor: '' }}
                    onClick={groupDeleteHandler}
                  >
                    Delete group
                  </Button>
                </MenuList>
              </Menu>
            )}
          </Stat>

          {messages.length
            ? messages.map((message, index) => (
                <ChatBubble key={index} message={message} isGroup={false} />
              ))
            : null}
          {groupMessages.length
            ? groupMessages.map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message}
                  isGroup={true}
                  profileData={profileData}
                  groupChat={groupChat}
                  notMe={
                    groupChat &&
                    groupChat.members.filter(
                      friend => friend.uid === message.from
                    )
                  }
                />
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
              onChange={e => setText(e.target.value)}
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
              ref={ImageInputRef}
              accept="image/*"
              cursor="pointer"
              display="none"
            />
            <Input
              onChange={e => {
                setVideo(e.target.files[0]);
                toast({
                  description: 'Video added',
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                  position: 'top',
                });
              }}
              type="file"
              id="video"
              ref={VideoInputRef}
              accept="video/mp4,video/x-m4v,video/*"
              cursor="pointer"
              display="none"
            />
            <Input
              onChange={e => {
                setFile(e.target.files[0]);
                toast({
                  description: 'File added',
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                  position: 'top',
                });
              }}
              type="file"
              ref={FileInputRef}
              accept="application/pdf,application/vnd.ms-excel"
              cursor="pointer"
              display="none"
            />
            <Menu>
              <MenuButton
                as={IconButton}
                colorScheme="blue"
                aria-label="Options"
                icon={<MdAttachFile />}
                variant="ghost"
                transition="all 0.2s"
              />
              <MenuList>
                <MenuItem
                  icon={<MdPermMedia />}
                  onClick={() => ImageInputRef.current.click()}
                >
                  Send Image
                </MenuItem>
                <MenuItem
                  icon={<MdVideoLibrary />}
                  onClick={() => VideoInputRef.current.click()}
                >
                  Send Video
                </MenuItem>
                <MenuItem
                  icon={<MdFileUpload />}
                  onClick={() => FileInputRef.current.click()}
                >
                  Send Pdf
                </MenuItem>
              </MenuList>
            </Menu>

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
