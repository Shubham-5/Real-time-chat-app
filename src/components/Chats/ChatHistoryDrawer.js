import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import ChatHistorySidebar from './ChatHistorySidebar';

const ChatHistoryDrawer = ({
  isOpen,
  onClose,
  onlineFriends,
  selectFriend,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatHistorySidebar
            onlineFriends={onlineFriends}
            selectFriend={selectFriend}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatHistoryDrawer;
