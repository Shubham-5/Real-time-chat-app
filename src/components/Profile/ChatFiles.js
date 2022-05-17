import React, { useState, useRef } from 'react';
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
  ModalFooter,
  FormControl,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Modal,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import moment from 'moment';
import { MdDeleteForever, MdCreate, MdAddAPhoto } from 'react-icons/md';

const ChatFiles = ({
  profileData,
  setProfileImg,
  isUploading,
  deleteImage,
  handleSignOut,
  setNewName,
  newName,
  updateName,
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

  const inputRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <IconButton
        onClick={() => inputRef.current.click()}
        colorScheme="gray"
        border="1px"
        borderRadius="30px"
        opacity="0.9"
        position="relative"
        bottom="20px"
        isLoading={isUploading}
        icon={<MdAddAPhoto />}
      />
      <Input
        display="none"
        ref={inputRef}
        type="file"
        accept="image/*"
        id="photo"
        onChange={e => setProfileImg(e.target.files[0])}
      />

      <Heading ml="15px" size="md" mt={5}>
        {profileData && profileData.name}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Username</ModalHeader>

            <ModalBody pb={6}>
              <FormControl isRequired>
                <Input
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Enter a new name"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                isDisabled={!newName}
                mr={3}
                onClick={updateName}
              >
                Save
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <IconButton
          ml="8px"
          variant="ghost"
          size="sm"
          onClick={onOpen}
          icon={<MdCreate />}
        ></IconButton>
      </Heading>
      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack overflowY="auto" mt="2rem" w="full">
        <HStack px={8} w="full" justifyContent="space-between">
          <Box variant="outline" size="sm" onClick={toggleColorMode}>
            {darkIcon ? 'Dark' : 'Light'}
            <IconButton
              size="sm"
              pb="2px"
              variant="ghost"
              icon={!darkIcon ? <FaSun /> : <FaMoon />}
              aria-label="darkmode"
              onClick={handleDark}
            />
          </Box>
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
