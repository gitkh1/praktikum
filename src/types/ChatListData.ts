export type NewChatData = {
  title: string;
};

export type DeleteChatData = {
  chatId: number;
};

export type ChatData = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: null | {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};
