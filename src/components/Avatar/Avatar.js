import AvatarStyle from "./Avatar.scss";

const Avatar = (classesLabel, src) =>
  `<div class="${classesLabel.join(' ')}">
    <img src="${src}">
  </div>`;

export default Avatar;