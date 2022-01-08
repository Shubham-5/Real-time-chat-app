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
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

import moment from 'moment';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { auth, db, storage } from '../../firebase/Firebase';
import { MdAdd, MdDeleteForever } from 'react-icons/md';
import { useCustomHook } from '../../context/useCustomHook';

const ChatFiles = () => {
  const [isMe, setIsMe] = useState('');
  const [img, setImg] = useState('');

  const { toggleColorMode, handleDark, darkIcon } = useCustomHook();

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
      if (docSnap.exists) {
        setIsMe(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (isMe.avatarPath) {
            await deleteObject(ref(storage, isMe.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg('');
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img, isMe.avatarPath]);

  if (isMe) {
    var accountCreatedDate = moment(isMe.createdAt.toDate()).format(
      'MMM DD YYYY h:mm A'
    );
  }

  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete avatar?');
      if (confirm) {
        await deleteObject(ref(storage, isMe.avatarPath));

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: '',
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify="center" w="full" px={8} mb={8}>
        <Text color="gray.500">{isMe && accountCreatedDate}</Text>
      </HStack>

      <Avatar src={isMe.avatar} name={isMe.name} size="2xl"></Avatar>

      <HStack justify="center" w="full">
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
            type="file"
            accept="image/*"
            id="photo"
            variant="ghost"
            opacity="0"
            display="block"
            left="1.8rem"
            top="0.5rem"
            onChange={e => setImg(e.target.files[0])}
          />
          <IconButton
            variant="ghost"
            cursor="pointer"
            size="lg"
            pointerEvents="none"
            icon={<MdAdd />}
          />
        </Button>
        <IconButton
          variant="ghost"
          onClick={deleteImage}
          size="sm"
          icon={<MdDeleteForever />}
        />
      </HStack>

      <Heading size="md" mt={5}>
        {isMe && isMe.name}
      </Heading>

      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack spacing={6} overflowY="auto" w="full">
        <HStack px={8} w="full" mt={6} justifyContent="space-between">
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
        <HStack px={8} w="full" mt={6} justifyContent="space-between"></HStack>
      </VStack>
    </Flex>
  );
};

export default ChatFiles;
