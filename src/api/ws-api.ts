import getTime from '../utils/getTime';
import Store, { STORE_PATHS } from '../utils/Store';

const HOST_URL = 'wss://ya-praktikum.tech/ws/chats';

const PING_PONG_INTERVAL = 10000;

type ParsedMsg = {
  content: string;
  type: string;
  time: string;
  user_id: number;
  id: number;
};

export type Msg = {
  content: string;
  time: string;
  user_id: string;
  id: string;
};

export default class WSAPI {
  private url: string;
  private socket: WebSocket;
  private pingPongInterval: ReturnType<typeof setInterval> | null;
  private chatId: string;
  constructor(userId: string, chatId: string, token: string) {
    this.url = [HOST_URL, userId, chatId, token].join('/');
    this.socket = new WebSocket(this.url);
    this.pingPongInterval = null;
    this.chatId = chatId;
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.socket.addEventListener('open', () => {
        this.pingPongInterval = this.setPingPong();
        console.log('Соединение установлено');
        resolve(this.socket);
      });

      this.socket.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
          reject();
        } else {
          console.log('Обрыв соединения, обновляем страницу');
          this.clearPingPong();
          reject();
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      this.socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data) as ParsedMsg;
          if (Array.isArray(data)) {
            const messages = data as ParsedMsg[];
            messages
              .reverse()
              .forEach((message) => this.sendToController(message));
          } else if (data.type === 'message') {
            this.sendToController(data);
          } else {
            return;
          }
        } catch (e) {
          console.log(e);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socket.addEventListener('error', (event: any) => {
        console.log(`Ошибка ${event?.message || ''}`);
        reject();
      });
    });
  }

  setPingPong() {
    return setInterval(() => this.ping(), PING_PONG_INTERVAL);
  }

  clearPingPong() {
    if (this.pingPongInterval) {
      clearInterval(this.pingPongInterval);
    }
  }

  async close() {
    this.clearPingPong();
    this.socket.close();
  }

  async ping() {
    this.socket.send(
      JSON.stringify({
        type: 'ping',
      })
    );
  }

  async send(content: string) {
    this.socket.send(
      JSON.stringify({
        content: content,
        type: 'message',
      })
    );
  }

  getOldMessages(lastMessageId: number) {
    this.socket.send(
      JSON.stringify({
        content: `${lastMessageId}`,
        type: 'get old',
      })
    );
  }

  // sendToController(data: ParsedMsg) {
  //   try {
  //     const msg: Msg = {
  //       content: data.content || '',
  //       time: getTime(data.time.slice(0, -6) || ''),
  //       user_id: `${data.user_id}` || '',
  //       id: `${this.chatId}` || '',
  //     };
  //     chatController.fromAPItoChat(msg);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  sendToController(data: ParsedMsg) {
    try {
      const msg: Msg = {
        content: data.content || '',
        time: getTime(data.time.slice(0, -6) || ''),
        user_id: `${data.user_id}` || '',
        id: `${this.chatId}` || '',
      };
      Store.set(STORE_PATHS.MESSAGE_TRANSFER, msg);
    } catch (e) {
      console.log(e);
    }
  }
}
