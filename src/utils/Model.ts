// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HTTPTransport } from "./HTTPTransport";
// данные отправляем в консоль согласно заданию


export default function sendData(data: unknown):boolean {
  console.log(data);
  return true;
}
