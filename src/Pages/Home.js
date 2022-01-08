import React, { useState, useEffect } from 'react';
// import Navigation from '../components/Navigation';
import ChatHistorySidebar from '../components/Chats/ChatHistorySidebar';
import Chat from '../components/Messenger/Chat';
import ChatFiles from '../components/Profile/ChatFiles';
import ChatHistoryDrawer from '../components/Chats/ChatHistoryDrawer';
import ChatFilesDrawer from '../components/Profile/ChatFilesDrawer';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import { auth, db, storage } from '../firebase/Firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  orderBy,
  addDoc,
  setDoc,
  doc,
  Timestamp,
  getDoc,
} from 'firebase/firestore';

const Home = () => {
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

  const [onlineFriends, setOnlineFriends] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [img, setImg] = useState('');

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
  }, [isMe]);

  const selectFriend = async friend => {
    setChat(friend);

    const isFrom = friend.uid;
    const id = isMe > isFrom ? `${isMe + isFrom}` : `${isFrom + isMe}`;

    // get messages from selected user in asc order
    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('dateSent', 'asc'));
    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== isMe) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, 'lastMsg', id), { unread: false });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isFrom = chat.uid;
    const id = isMe > isFrom ? `${isMe + isFrom}` : `${isFrom + isMe}`;

    // sending images
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    // adding messages to firestore

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: isMe,
      to: isFrom,
      dateSent: Timestamp.fromDate(new Date()),
      media: url || '',
    });

    // adding last msg
    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: isMe,
      to: isFrom,
      dateSent: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true,
    });

    setText('');
    setImg('');
  };

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
          borderRightWidth={1}
          pt={8}
        >
          <ChatHistorySidebar
            onlineFriends={onlineFriends}
            selectFriend={selectFriend}
          />
        </Flex>
        <Flex as="main" h="full" flex={1} borderRightWidth={1}>
          <Chat
            onChatHistoryOpen={onChatHistoryOpen}
            onChatFilesOpen={onChatFilesOpen}
            chat={chat}
            handleSubmit={handleSubmit}
            setText={setText}
            text={text}
            setImg={setImg}
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
