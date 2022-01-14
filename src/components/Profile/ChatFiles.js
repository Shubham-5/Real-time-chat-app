import React, { useState } from 'react';
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
  useColorMode,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import moment from 'moment';
import { MdAdd, MdDeleteForever } from 'react-icons/md';

const ChatFiles = ({
  profileData,
  setProfileImg,
  isUploading,
  deleteImage,
  handleSignOut,
}) => {
  //joining date of user formating
  if (profileData) {
    var accountCreatedDate = moment(profileData.createdAt.toDate()).format(
      'MMM DD YYYY h:mm A'
    );
  }
  const [darkIcon, setDarkIcon] = useState(false);
  const { toggleColorMode } = useColorMode();

  const handleDark = () => {
    setDarkIcon(!darkIcon);
  };
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify="center" w="full" px={8} mb={8}>
        <Text color="gray.500">{profileData && accountCreatedDate}</Text>
      </HStack>

      <Avatar
        src={profileData && profileData.avatar}
        name={profileData && profileData.name}
        size="2xl"
      ></Avatar>

      <Heading size="md" mt={5}>
        {profileData && profileData.name}
      </Heading>

      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack overflowY="auto" mt="2rem" w="full">
        {!profileData.avatar && (
          <Box px={8} w="full" justify="center">
            <Button
              variant="outline"
              colorScheme="telegram"
              size="lg"
              width="full"
              mt="0.9rem"
              isLoading={isUploading}
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
              onChange={e => setProfileImg(e.target.files[0])}
            />
          </Box>
        )}
        {profileData.avatar && (
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

        <HStack px={8} w="full" justifyContent="space-between">
          <Button variant="outline" size="sm" onClick={toggleColorMode}>
            dark mode
            <IconButton
              ml="1em"
              size="sm"
              variant="ghost"
              icon={darkIcon ? <FaSun /> : <FaMoon />}
              aria-label="darkmode"
              onClick={handleDark}
            />
          </Button>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
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
