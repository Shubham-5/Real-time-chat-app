import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Stack,
  Box,
  Input,
  FormLabel,
  InputGroup,
  Textarea,
  Select,
  DrawerFooter,
  Checkbox,
  useToast,
} from '@chakra-ui/react';

import { MdAdd } from 'react-icons/md';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/Firebase';
import { uuid } from 'uuidv4';

const CreateGroup = ({ myFriends, profileData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const firstField = React.useRef();
  const [members, setMembers] = React.useState([]);
  const [membersID, setMembersID] = React.useState([]);
  const [groupName, setGroupName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (membersID.length === 0) {
      profileData && setMembersID(prev => [...prev, auth.currentUser.uid]);
    }
  }, [profileData]);

  const handleChange = (e, data) => {
    const check = e.target.checked;
    if (check) {
      setMembers(prev => [...prev, data.friends]);
      setMembersID(prev => [...prev, data.friends.uid]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let id = uuid();
    try {
      await addDoc(collection(db, 'groups'), {
        name: groupName,
        createdBy: auth.currentUser.uid,
        members,
        membersID,
        id,
      });
      toast({
        description: 'Group created ',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setMembers('');
      setMembersID('');
      setGroupName('');
    }
  };
  return (
    <>
      <Button leftIcon={<MdAdd />} variant="ghost" size="sm" onClick={onOpen}>
        Create Group
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new group
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  ref={firstField}
                  isRequired
                  onChange={e => setGroupName(e.target.value)}
                  id="name"
                  placeholder="Please enter group name"
                />
              </Box>

              <FormLabel htmlFor="checkbox">Add Friends</FormLabel>
              <Stack
                spacing={[4]}
                direction={['column']}
                maxHeight="200px"
                overflowY="auto"
              >
                {myFriends.map(data => (
                  <Checkbox
                    id="checkbox"
                    width="100%"
                    key={data.friends.uid}
                    onChange={e => handleChange(e, data)}
                  >
                    {data && data.friends.name}
                  </Checkbox>
                ))}
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            {groupName && (
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Submit
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateGroup;
