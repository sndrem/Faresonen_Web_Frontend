export default {
  get: jest.fn(() => Promise.resolve({data: {}})),
  all: jest.fn(allData => Promise.resolve(allData)),
  spread: jest.fn(() => []),
};
