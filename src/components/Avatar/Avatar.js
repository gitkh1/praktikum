import AvatarStyle from "./Avatar.scss";

export default Avatar = (classesLabel, src) =>
  `<div class="${classesLabel.join(' ')}">
    <img src="${src}">
  </div>`;