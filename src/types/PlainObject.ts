type PlainObject<T = unknown> = {
  [k in string]: T;
};

export default PlainObject;
