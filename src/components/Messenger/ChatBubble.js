import React, { useRef, useEffect } from 'react';
import Moment from 'react-moment';
import { VStack, Box, Text } from '@chakra-ui/react';
import { auth } from '../../firebase/Firebase';

const ChatBubble = ({ message }) => {
  const isMe = message.from === auth.currentUser.uid;
  const alignment = isMe ? 'flex-end' : 'flex-start';
  const bottomRightRadius = isMe ? 0 : 32;
  const bottomLeftRadius = isMe ? 32 : 0;
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <VStack mt={6} alignItems={alignment} alignSelf={alignment}>
      <Box
        bg={isMe ? 'blue.50' : 'gray.100'}
        // color="gray"
        px={6}
        py={4}
        maxW={80}
        borderTopLeftRadius={32}
        borderTopRightRadius={32}
        borderBottomLeftRadius={bottomLeftRadius}
        borderBottomRightRadius={bottomRightRadius}
        ref={scrollRef}
      >
        {message.text}
      </Box>
      <Text fontSize="xs" color="gray">
        <Moment fromNow>{message.dateSent.toDate()}</Moment>
      </Text>
    </VStack>
  );
};

export default ChatBubble;
