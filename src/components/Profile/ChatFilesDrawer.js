import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import ChatFiles from './ChatFiles';

const ChatFilesDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatFiles />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatFilesDrawer;
