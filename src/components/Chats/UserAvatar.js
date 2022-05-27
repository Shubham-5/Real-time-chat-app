import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

const UserAvatar = ({ friend, isGroup }) => {
  return (
    <>
      {isGroup ? (
        <AvatarGroup size="md" max={2}>
          {friend
            ? friend.members.map(member => (
                <Avatar
                  key={member.uid}
                  name={member.name}
                  src={member.avatar}
                />
              ))
            : null}
        </AvatarGroup>
      ) : (
        <Avatar src={friend.avatar} name={friend.name}>
          {friend.isOnline ? (
            <AvatarBadge boxSize="1em" bg="green.500" />
          ) : (
            <AvatarBadge boxSize="1em" bg="red.500" />
          )}
        </Avatar>
      )}
    </>
  );
};

export default UserAvatar;
