import LinkStyle from "./Link.scss";

const Link = (description, href, classes) =>
  `<a class="${classes.join(' ')}" href="${href}">${description}</a>`;

export default Link;