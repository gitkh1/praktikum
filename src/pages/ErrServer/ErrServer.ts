import { link, Err } from "../../modules/Err/Err";
import Title from "../../components/Title/Title";

const title = new Title({
  titleClasses: ['error__title'],
  description: '500',
})

const err500 = new Err({
  link: link,
  title: title,
  description: 'Мы уже фиксим'
})

export default err500;

