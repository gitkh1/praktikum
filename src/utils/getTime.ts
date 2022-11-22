function getTime(str: string) {
  const date = new Date(str);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const mins = date.getMinutes();
  if (!date || !month || !day || !hours || !mins) {
    return '';
  } else {
    const str =
      `0${month}`.slice(-2) +
      `.` +
      `0${day}`.slice(-2) +
      ` ` +
      `0${hours}`.slice(-2) +
      `:` +
      `0${mins}`.slice(-2);

    return str;
  }
}

export default getTime;
