// @ts-expect-error TS(2307): Cannot find module './Avatar.scss' or its correspo... Remove this comment to see the full error message
import AvatarStyle from "./Avatar.scss";

const Avatar = (classesLabel: any, src: any, alt: any) =>
  `<div class="${classesLabel.join(' ')}">
    <img src="${src}" alt="${alt}">
  </div>`;

export default Avatar;
