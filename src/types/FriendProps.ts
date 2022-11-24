type FriendProps = {
  id: string;
  chatname: string;
  message: string;
  time: string;
  unread: string;
  unreadClasses?: string[];
  avatar?: string;
  isActive?: boolean;
};

export default FriendProps;
