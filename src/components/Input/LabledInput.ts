const LabledInput = (classesInput: any, classesLabel: any, name: any, src: any) =>
  `<label class="${classesLabel.join(' ')}">
    <img src="${src}" alt="">
    <input class="${classesInput.join(' ')}" type="file" name="${name}">
  </label>`;

export default LabledInput;
