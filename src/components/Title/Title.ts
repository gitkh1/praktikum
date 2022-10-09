// @ts-expect-error TS(2307): Cannot find module './Title.scss' or its correspon... Remove this comment to see the full error message
import titleStyle from "./Title.scss";

const Title = (classes: any, description: any) =>
  `<h1 class="${classes.join(' ')}">{{${description}}}</h1>`;

export default Title;
