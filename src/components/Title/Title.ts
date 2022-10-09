import "./Title.scss";

const Title = (classes: string[], description: string) =>
  `<h1 class="${classes.join(' ')}">{{${description}}}</h1>`;

export default Title;
