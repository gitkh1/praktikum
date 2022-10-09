const LabledInput = (classesInput: string[], classesLabel: string[], name: string, src: unknown) =>
  `<label class="${classesLabel.join(' ')}">
    <img src="${src}" alt="">
    <input class="${classesInput.join(' ')}" type="file" name="${name}">
  </label>`;

export default LabledInput;
