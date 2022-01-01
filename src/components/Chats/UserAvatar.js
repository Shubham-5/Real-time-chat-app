import { Avatar, AvatarBadge } from '@chakra-ui/react';

const UserAvatar = ({ name, status }) => {
  return (
    <>
      <Avatar name={name}>
        {status ? (
          <AvatarBadge boxSize="1em" bg="green.500" />
        ) : (
          <AvatarBadge boxSize="1em" bg="red.500" />
        )}
      </Avatar>
    </>
  );
};

export default UserAvatar;
