import React, { useRef, useEffect } from 'react';
import Moment from 'react-moment';
import { VStack, Box, Text, useColorModeValue, Image } from '@chakra-ui/react';
import { auth } from '../../firebase/Firebase';
import ReactPlayer from 'react-player';

const ChatBubble = ({ message, profileData, groupChat, isGroup, notMe }) => {
  const isMe = message.from === auth.currentUser.uid;
  const alignment = isMe ? 'flex-end' : 'flex-start';
  const bottomRightRadius = isMe ? 0 : 32;
  const bottomLeftRadius = isMe ? 32 : 0;
  const scrollRef = useRef();

  const bgColor1 = useColorModeValue('gray.100', 'blue.300');
  const bgColor2 = useColorModeValue('teal.200', 'teal.300');

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const isVideo = message.media && message.media.includes('videos');
  const isImage = message.media && message.media.includes('images');
  const isFile = message.media && message.media.includes('files');

  return (
    <VStack mt={6} alignItems={alignment} alignSelf={alignment}>
      <Box
        bg={isMe ? bgColor1 : bgColor2}
        px={message.media ? 2 : 6}
        py={message.media ? 2 : 4}
        maxW={80}
        borderTopLeftRadius={message.media ? 5 : 32}
        borderTopRightRadius={message.media ? 5 : 32}
        borderBottomLeftRadius={message.media ? 5 : bottomLeftRadius}
        borderBottomRightRadius={message.media ? 5 : bottomRightRadius}
      >
        {isImage && isImage ? (
          <Image
            height="380px"
            style={{ objectFit: 'cover' }}
            src={message.media}
            alt={message.text}
          />
        ) : null}
        {isFile && isFile ? (
          <object
            width="100%"
            height="380"
            data={message.media}
            type="application/pdf"
          >
            {''}
          </object>
        ) : null}
        {isVideo && isVideo ? (
          <ReactPlayer
            width="100%"
            height="380"
            url={message.media}
            type="video/mp4"
            controls
          />
        ) : null}

        {message.text}
      </Box>
      <Text fontSize="xs" color="gray" textAlign="end">
        {isGroup && isMe && profileData.name}
        {isGroup && notMe.map(friend => friend.name)}{' '}
        <Text fontSize="xs" color="gray">
          <Moment fromNow>{message.dateSent.toDate()}</Moment>
        </Text>
      </Text>

      <Text ref={scrollRef}></Text>
    </VStack>
  );
};

export default ChatBubble;
