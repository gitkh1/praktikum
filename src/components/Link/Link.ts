// @ts-expect-error TS(2307): Cannot find module './Link.scss' or its correspond... Remove this comment to see the full error message
import LinkStyle from "./Link.scss";

const Link = (description: any, href: any, classes: any) =>
  `<a class="${classes.join(' ')}" href="${href}">${description}</a>`;

export default Link;
