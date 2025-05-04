import _ from 'lodash';

const getInfoData = (payload: { fields: any[]; object: {} }) => {
  return _.pick(payload.object, payload.fields);
};
const getSelectData = (select: string[]) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};
const unGetSelectData = (select: string[]) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const removeUndefinedObject = (object: { [key: string]: any }) => {
  Object.keys(object).forEach((k) => {
    if (object[k] === null) {
      delete object[k];
    }
  });
  return object;
};
const updateNestedObjectParser = (object: {
  [key: string]: any;
}): { [key: string]: any } => {
  console.log(object);

  // Kiểm tra đầu vào
  if (!object || typeof object !== 'object') {
    return {};
  }

  // Theo dõi các đối tượng đã xử lý để tránh circular reference
  const visited = new WeakSet();

  const parse = (
    obj: { [key: string]: any },
    prefix: string = ''
  ): { [key: string]: any } => {
    // Tránh circular reference
    if (visited.has(obj)) {
      return {};
    }
    visited.add(obj);

    const final: { [key: string]: any } = {};
    for (const k of Object.keys(obj)) {
      const value = obj[k];

      // Kiểm tra nếu là plain object và không phải null
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.prototype.toString.call(value) === '[object Object]'
      ) {
        const response = parse(value, prefix ? `${prefix}.${k}` : k);
        Object.assign(final, response);
      } else {
        final[prefix ? `${prefix}.${k}` : k] = value;
      }
    }
    console.log(final);

    return final;
  };

  return parse(object);
};

export {
  getInfoData,
  getSelectData,
  unGetSelectData,
  removeUndefinedObject,
  updateNestedObjectParser,
};
