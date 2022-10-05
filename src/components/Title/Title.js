import titleStyle from "./Title.scss";

export default Title = (classes, description) => 
  `<h1 class="${classes.join(' ')}">{{${description}}}</h1>`;