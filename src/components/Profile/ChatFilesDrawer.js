import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import ChatFiles from './ChatFiles';
import { useCustomHook } from '../../context/useCustomHook';

const ChatFilesDrawer = ({ isOpen, onClose }) => {
  const {
    toggleColorMode,
    handleDark,
    darkIcon,
    isLoading,
    isMe,
    setImg,
    deleteImage,
  } = useCustomHook();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatFiles
            toggleColorMode={toggleColorMode}
            handleDark={handleDark}
            darkIcon={darkIcon}
            isLoading={isLoading}
            isMe={isMe}
            setImg={setImg}
            deleteImage={deleteImage}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatFilesDrawer;
