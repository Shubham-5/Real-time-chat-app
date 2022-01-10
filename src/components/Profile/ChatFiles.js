import React, { useEffect, useState } from 'react';
import {
  Flex,
  HStack,
  Text,
  Avatar,
  Heading,
  Box,
  Divider,
  VStack,
  Button,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import moment from 'moment';
import { auth, db } from '../../firebase/Firebase';
import { MdAdd, MdDeleteForever } from 'react-icons/md';
import { useCustomHook } from '../../context/useCustomHook';

const ChatFiles = () => {
  const {
    toggleColorMode,
    handleDark,
    darkIcon,
    isLoading,
    isMe,
    setImg,
    deleteImage,
  } = useCustomHook();

  // //joining date of user formating
  if (isMe) {
    var accountCreatedDate = moment(isMe.createdAt.toDate()).format(
      'MMM DD YYYY h:mm A'
    );
  }

  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify="center" w="full" px={8} mb={8}>
        <Text color="gray.500">{isMe && accountCreatedDate}</Text>
      </HStack>

      <Avatar src={isMe.avatar} name={isMe.name} size="2xl"></Avatar>

      <Heading size="md" mt={5}>
        {isMe && isMe.name}
      </Heading>

      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack overflowY="auto" mt="2rem" w="full">
        {!isMe.avatar && (
          <Box px={8} w="full" justify="center">
            <Button
              variant="outline"
              colorScheme="telegram"
              size="lg"
              width="full"
              mt="0.9rem"
              isLoading={isLoading}
              loadingText="Uploading.."
            >
              Change Profile
              <IconButton
                ml="9px"
                variant="ghost"
                size="sm"
                icon={<FaUpload />}
              />
            </Button>
            <Input
              type="file"
              accept="image/*"
              id="photo"
              variant="ghost"
              opacity="0"
              display="block"
              left="0"
              bottom="12"
              onChange={e => setImg(e.target.files[0])}
            />
          </Box>
        )}
        {isMe.avatar && (
          <Box px={8} w="full" mb="2.5rem" justify="center">
            <Button
              variant="outline"
              colorScheme="telegram"
              size="lg"
              width="full"
              mt="0.9rem"
              onClick={deleteImage}
            >
              Delete Profile
              <IconButton
                variant="ghost"
                size="sm"
                icon={<MdDeleteForever />}
              />
            </Button>
          </Box>
        )}
        <Box px={8} w="full">
          <Divider color="gray.100" />
        </Box>
        <HStack px={8} w="full" justifyContent="space-between">
          <Button variant="disabled" onClick={toggleColorMode}>
            <IconButton
              size="sm"
              variant="ghost"
              icon={darkIcon ? <FaSun /> : <FaMoon />}
              aria-label="darkmode"
              onClick={handleDark}
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                isOnline: false,
              });
              signOut(auth);
            }}
          >
            Log Out
            <IconButton
              ml="1em"
              variant="ghost"
              size="sm"
              icon={<FaSignOutAlt />}
            />
          </Button>
        </HStack>
        <Box px={8} w="full">
          <Divider mt={6} color="gray.100" />
        </Box>
      </VStack>
    </Flex>
  );
};

export default ChatFiles;
