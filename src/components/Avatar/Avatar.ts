import AvatarStyle from "./Avatar.scss";

const Avatar = (classesLabel, src, alt) =>
  `<div class="${classesLabel.join(' ')}">
    <img src="${src}" alt="${alt}">
  </div>`;

export default Avatar;
