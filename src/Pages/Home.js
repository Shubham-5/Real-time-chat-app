import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ChatHistorySidebar from '../components/Chats/ChatHistorySidebar';
import Chat from '../components/Messenger/Chat';
import ChatFiles from '../components/Profile/ChatFiles';
import ChatHistoryDrawer from '../components/Chats/ChatHistoryDrawer';
import ChatFilesDrawer from '../components/Profile/ChatFilesDrawer';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import { auth, db } from '../firebase/Firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

const Home = () => {
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const isMe = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(db, 'users');
    //query object
    const q = query(userRef, where('uid', 'not-in', [isMe]));
    //execute query
    const unsubscribe = onSnapshot(q, querySnap => {
      let users = [];
      querySnap.forEach(doc => {
        users.push(doc.data());
      });

      setOnlineFriends(users);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const selectFriend = async friend => {
    setChat(friend);
    const isFrom = friend.uid;

    const id = isMe > isFrom ? `${isMe + isFrom}` : `${isFrom + isMe}`;
    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('dateSent', 'asc'));

    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isFrom = chat.uid;
    const id = isMe > isFrom ? `${isMe + isFrom}` : `${isFrom + isMe}`;
    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: isMe,
      to: isFrom,
      dateSent: Timestamp.fromDate(new Date()),
    });

    setText('');
  };

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

  return (
    <>
      <HStack h="100vh" spacing={0}>
        {/* <Flex as="nav" h="full" maxW={16} w="full" bg="gray.100">
          <Navigation />
        </Flex> */}

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
          <ChatHistorySidebar
            onlineFriends={onlineFriends}
            selectFriend={selectFriend}
          />
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
            chat={chat}
            handleSubmit={handleSubmit}
            setText={setText}
            text={text}
            messages={messages}
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
          onlineFriends={onlineFriends}
          selectFriend={selectFriend}
        />
        <ChatFilesDrawer isOpen={isChatFilesOpen} onClose={onChatFilesClose} />
      </HStack>
    </>
  );
};

export default Home;
