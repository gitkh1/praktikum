// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HTTPTransport } from "./HTTPTransport";


export default function sendData(data: unknown):boolean {
// данные отправляем просто в консоль, настроим отправку на сервер позже
  console.log(data);
  return true;
}
