import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import ChatFiles from './ChatFiles';

const ChatFilesDrawer = ({
  isOpen,
  onClose,
  isUploading,
  profileData,
  handleSignOut,
  deleteImage,
  setProfileImg,
  setNewName,
  newName,
  updateName,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatFiles
            isUploading={isUploading}
            profileData={profileData}
            handleSignOut={handleSignOut}
            setProfileImg={setProfileImg}
            deleteImage={deleteImage}
            setNewName={setNewName}
            newName={newName}
            updateName={updateName}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatFilesDrawer;
