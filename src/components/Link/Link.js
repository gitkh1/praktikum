import LinkStyle from "./Link.scss";

export default Link = (description, href, classes) =>
  `<a class="${classes.join(' ')}" href="${href}">${description}</a>`;