import "./Avatar.scss";

const Avatar = (classesLabel: string[], src = '', alt = '') =>
  `<div class="${classesLabel.join(' ')}">
    <img src="${src}" alt="${alt}">
  </div>`;

export default Avatar;
