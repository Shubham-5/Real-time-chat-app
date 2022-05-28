import React, { useState, useEffect, useCallback } from 'react';
import ChatHistorySidebar from '../components/Chats/ChatHistorySidebar';
import Chat from '../components/Messenger/Chat';
import ChatFiles from '../components/Profile/ChatFiles';
import ChatHistoryDrawer from '../components/Chats/ChatHistoryDrawer';
import ChatFilesDrawer from '../components/Profile/ChatFilesDrawer';
import { HStack, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { auth, db, storage } from '../firebase/Firebase';
import { signOut } from 'firebase/auth';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
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

  const toast = useToast();

  const [onlineFriends, setOnlineFriends] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [groupChat, setGroupChat] = useState([]);
  const [groups, setGroups] = useState([]);
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');
  const [file, setFile] = useState('');

  //profile page states
  const [profileData, setProfileData] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);
  const [newName, setNewName] = useState('');

  //current user id
  const isMe = auth.currentUser.uid;

  useEffect(() => {
    //profile data of user
    getDoc(doc(db, 'users', isMe)).then(docSnap => {
      if (docSnap.exists) {
        setProfileData(docSnap.data());
      }
    });
    //get groups
    const groupsRef = collection(db, 'groups');
    //chat row component for getting friends  ----
    const myFriendsRef = collection(db, 'users', isMe, 'friends');
    const userRef = collection(db, 'users');
    //query object
    const queryForOnlineFriends = query(
      userRef,
      where('uid', 'not-in', [isMe])
    );
    const queryForGroups = query(
      groupsRef,
      where('membersID', 'array-contains', isMe)
    );
    //execute query
    const setGroupsHandler = onSnapshot(queryForGroups, querySnap => {
      let myGroups = [];
      querySnap.forEach(doc => {
        myGroups.push(doc.data());
      });

      setGroups(myGroups);
      return () => {
        setGroupsHandler();
      };
    });

    const setMyFriendsHandler = onSnapshot(myFriendsRef, querySnap => {
      let users = [];
      querySnap.forEach(doc => {
        users.push(doc.data());
      });
      setMyFriends(users);
      return () => {
        setMyFriendsHandler();
      };
    });
    const setOnlineFriendsHandler = onSnapshot(
      queryForOnlineFriends,
      querySnap => {
        let users = [];
        querySnap.forEach(doc => {
          users.push(doc.data());
        });
        setOnlineFriends(users);
        return () => {
          setOnlineFriendsHandler();
        };
      }
    );
  }, [isMe]);

  const updateName = useCallback(async () => {
    try {
      await updateDoc(doc(db, 'users', isMe), {
        name: newName,
      });
      getDoc(doc(db, 'users', isMe)).then(docSnap => {
        if (docSnap.exists) {
          setProfileData(docSnap.data());
        }
      });
      setNewName('');
      toast({
        description: 'Name updated',
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
  }, [isMe, newName, toast]);

  useEffect(() => {
    //  ---- profile page code ---
    if (profileImg) {
      // Upload file and metadata to the object
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${profileImg.name}`
        );
        setIsUploading(true);
        try {
          if (profileData.avatarPath) {
            await deleteObject(ref(storage, profileData.avatarPath));
          }
          const snap = await uploadBytes(imgRef, profileImg);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setIsUploading(false);
          setProfileImg('');
        } catch (err) {
          console.log(err.message);
        }
      };

      uploadImg();
    }
  }, [profileImg, profileData.avatarPath, isMe]);

  //----- profile page code ------

  //signOut function

  const handleSignOut = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: false,
      });
      signOut(auth);
    } catch (error) {
      console.log(error);
    }

    // Sign-out successful.
  };

  //delete image from storage
  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete avatar?');
      if (confirm) {
        await deleteObject(ref(storage, profileData.avatarPath));

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: '',
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectGroups = async group => {
    let id = group.id;
    setChat('');
    setMessages('');
    setGroupChat(group);
    // get messages from selected group in asc order
    const msgsRef = collection(db, 'groups', id, 'chat');
    const q = query(msgsRef, orderBy('dateSent', 'asc'));
    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
      });
      setGroupMessages(msgs);
    });
  };

  //chat -- chathistory component code -------

  const selectFriend = async friend => {
    setGroupChat('');
    setGroupMessages('');
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

    // if group chat selected then this code execute
    if (groupChat) {
      //document id
      const grpId = groupChat.id;

      // sending images || videos || file
      let url;
      setIsUploading2(true);

      if (img) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      if (video) {
        const videoRef = ref(
          storage,
          `videos/${new Date().getTime()} - ${video.name}`
        );
        const metadata = {
          contentType: 'video/mp4',
        };
        const snap = await uploadBytes(videoRef, video, metadata);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      if (file) {
        const fileRef = ref(
          storage,
          `files/${new Date().getTime()} - ${file.name}`
        );
        const snap = await uploadBytes(fileRef, file);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }

      setIsUploading2(false);

      // adding messages to firestore
      if (text || img || video || file) {
        await addDoc(collection(db, 'groups', grpId, 'chat'), {
          text,
          from: isMe,
          to: grpId,
          dateSent: Timestamp.fromDate(new Date()),
          media: url || '',
        });
      }
    }

    // if friend chat selected then this code execute
    if (chat) {
      const isFrom = chat.uid;
      //document id
      const id = isMe > isFrom ? `${isMe + isFrom}` : `${isFrom + isMe}`;

      // sending images || videos || file
      let url;
      setIsUploading2(true);

      if (img) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      if (video) {
        const videoRef = ref(
          storage,
          `videos/${new Date().getTime()} - ${video.name}`
        );
        const metadata = {
          contentType: 'video/mp4',
        };
        const snap = await uploadBytes(videoRef, video, metadata);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      if (file) {
        const fileRef = ref(
          storage,
          `files/${new Date().getTime()} - ${file.name}`
        );
        const snap = await uploadBytes(fileRef, file);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }

      setIsUploading2(false);

      // adding messages to firestore
      if (text || img || video || file) {
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
      }
    }
    setText('');
    setVideo('');
    setFile('');
    setImg('');
  };

  return (
    <>
      <HStack h="100vh" spacing={0}>
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
            myFriends={myFriends}
            profileData={profileData}
            groups={groups}
            selectGroups={selectGroups}
            selectFriend={selectFriend}
          />
        </Flex>
        <Flex as="main" h="full" flex={1} borderRightWidth={1}>
          <Chat
            profileData={profileData}
            onChatHistoryOpen={onChatHistoryOpen}
            onChatFilesOpen={onChatFilesOpen}
            chat={chat}
            groupChat={groupChat}
            groupMessages={groupMessages}
            selectFriend={selectFriend}
            myFriends={myFriends}
            onlineFriends={onlineFriends}
            onChatHistoryClose={onChatHistoryClose}
            handleSubmit={handleSubmit}
            setText={setText}
            text={text}
            setImg={setImg}
            img={img}
            setVideo={setVideo}
            video={video}
            setFile={setFile}
            file={file}
            isUploading2={isUploading2}
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
          <ChatFiles
            isMe={isMe}
            isUploading={isUploading}
            setNewName={setNewName}
            newName={newName}
            deleteImage={deleteImage}
            setProfileImg={setProfileImg}
            profileData={profileData}
            updateName={updateName}
            handleSignOut={handleSignOut}
          />
        </Flex>
        <ChatHistoryDrawer
          isOpen={isChatHistoryOpen}
          onClose={onChatHistoryClose}
          onlineFriends={onlineFriends}
          selectFriend={selectFriend}
          myFriends={myFriends}
          groups={groups}
          selectGroups={selectGroups}
          profileData={profileData}
        />
        <ChatFilesDrawer
          isMe={isMe}
          setProfileImg={setProfileImg}
          profileData={profileData}
          deleteImage={deleteImage}
          setNewName={setNewName}
          newName={newName}
          updateName={updateName}
          isUploading={isUploading}
          handleSignOut={handleSignOut}
          isOpen={isChatFilesOpen}
          onClose={onChatFilesClose}
        />
      </HStack>
    </>
  );
};

export default Home;
