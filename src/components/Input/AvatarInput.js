import inputStyle from "./Input.scss";

export default AvatarInput = (classesInput, classesLabel, name) =>
  `<label class="${classesLabel.join(' ')}">
    <input class="${classesInput.join(' ')}" type="file" name="${name}">
  </label>`;