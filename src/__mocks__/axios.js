export default {
  get: jest.fn(() => {
    return Promise.resolve({ data: {} });
  }),
  all: jest.fn(allData => {
    return Promise.resolve(allData);
  }),
  spread: jest.fn(() => {
    return [];
  })
};
