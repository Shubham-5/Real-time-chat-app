import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react';
import UserAvatar from './UserAvatar';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/Firebase';
import Moment from 'react-moment';

const ChatRow = ({ selectFriend, friend }) => {
  const isMe = auth.currentUser.uid;
  const isFrom = friend?.uid;
  const id = isMe > isFrom ? `${isMe + isFrom}` : `${isFrom + isMe}`;
  const [unreadData, setUnreadData] = useState('');
  useEffect(() => {
    let unsub = onSnapshot(doc(db, 'lastMsg', id), doc => {
      setUnreadData(doc.data());
    });
    return () => unsub;
  }, [id]);

  return (
    <Flex
      py={3}
      px={8}
      w="full"
      alignItems="center"
      borderBottomWidth={1}
      style={{ transition: 'background 300ms' }}
      _hover={{ opacity: '0.9', cursor: 'pointer' }}
      onClick={() => selectFriend(friend)}
    >
      <UserAvatar name={friend.name} friend={friend} />
      <VStack
        overflow="hidden"
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <Heading fontSize={12} w="full">
          {friend.name}
        </Heading>

        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w="full"
          fontSize="xs"
          color="gray.500"
        >
          {unreadData && unreadData.from === isMe ? 'Me: ' : null}

          {unreadData && unreadData.text}
        </Text>
      </VStack>
      <Text ml={3} fontSize="xs" color="gray.500">
        {unreadData ? (
          <Moment fromNow>{unreadData && unreadData.dateSent.toDate()}</Moment>
        ) : null}
      </Text>
    </Flex>
  );
};

export default ChatRow;
