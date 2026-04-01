// src/utils/cancelToken.js

export const createCancelToken = () => {
  const controller = new AbortController();
  return controller;
};