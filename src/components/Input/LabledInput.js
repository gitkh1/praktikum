const LabledInput = (classesInput, classesLabel, name, src) =>
  `<label class="${classesLabel.join(' ')}">
    <img src="${src}">
    <input class="${classesInput.join(' ')}" type="file" name="${name}">
  </label>`;

export default LabledInput;