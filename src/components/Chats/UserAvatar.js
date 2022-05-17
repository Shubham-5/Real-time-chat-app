import { Avatar, AvatarBadge } from '@chakra-ui/react';

const UserAvatar = ({ friend }) => {
  return (
    <>
      <Avatar src={friend.friends.avatar} name={friend.friends.name}>
        {friend.friends.isOnline ? (
          <AvatarBadge boxSize="1em" bg="green.500" />
        ) : (
          <AvatarBadge boxSize="1em" bg="red.500" />
        )}
      </Avatar>
    </>
  );
};

export default UserAvatar;
