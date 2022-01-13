import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import ChatFiles from './ChatFiles';
import { useCustomHook } from '../../context/useCustomHook';

const ChatFilesDrawer = ({
  isOpen,
  onClose,
  isUploading,
  profileData,
  handleSignOut,
  deleteImage,
  setProfileImg,
}) => {
  const { toggleColorMode, handleDark, darkIcon } = useCustomHook();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatFiles
            toggleColorMode={toggleColorMode}
            handleDark={handleDark}
            darkIcon={darkIcon}
            isUploading={isUploading}
            profileData={profileData}
            handleSignOut={handleSignOut}
            setProfileImg={setProfileImg}
            deleteImage={deleteImage}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatFilesDrawer;
