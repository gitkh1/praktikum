import { link, Err } from "../../modules/Err/Err";
import Title from "../../components/Title/Title";

const title = new Title({
  titleClasses: ['error__title'],
  description: '404',
})

const err404 = new Err({
  link: link,
  title: title,
  description: 'Не туда попали'
})

export default err404;

