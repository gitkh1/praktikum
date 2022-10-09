import "./Link.scss";

const Link = (description: string, href: string, classes: string[]) =>
  `<a class="${classes.join(' ')}" href="${href}">${description}</a>`;

export default Link;
