import titleStyle from "./Title.scss";

const Title = (classes, description) =>
  `<h1 class="${classes.join(' ')}">{{${description}}}</h1>`;

export default Title;
