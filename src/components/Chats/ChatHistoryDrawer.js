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
  myFriends,
  selectFriend,
  groups,
  selectGroups,
  profileData,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatHistorySidebar
            myFriends={myFriends}
            selectFriend={selectFriend}
            onClose={onClose}
            groups={groups}
            selectGroups={selectGroups}
            profileData={profileData}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatHistoryDrawer;
