import { Avatar, AvatarBadge, Tooltip } from '@chakra-ui/react';

const UserAvatar = ({ name }) => {
  return (
    <Tooltip label={name}>
      <Avatar name={name}>
        {/* green dot for online */}
        <AvatarBadge boxSize={4} bg="green.500" />
      </Avatar>
    </Tooltip>
  );
};

export default UserAvatar;
