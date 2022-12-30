import { defHttp } from '/@/utils/http/axios';

enum Api {
  GET_BOOK = '/v2/query/Bookle/query',
  BORROW = '/v3/login/loan',
  GET_INFO = '/v3/login/reader',
  CHANGE_PWD = '/v0/change',
  GET_READER = '/v4/system/reader/list',
  DEL_READER = '/v4/system/del',
  ADD_READER = '/v4/system/add',
  UPLOAD = '/v4/system/file',
  CHANGE_AUTH = '/v4/system/level',
  BORROW_LIST = '/v5/picture/manage',
  MOVE_IN = '/v5/picture/move',
  CATALOGUE = '/v4/system/import',
  COST = '/v5/picture/cost',
  ENTRY = '/v5/picture/load',
  CLASSIFICATION = '/v5/picture/class',
  RETURN_BOOK = '/v3/login/return',
  DOWNLOAD = '/v5/picture/load',
  DEL_BOOK = '/v5/picture/del',
  RESET = '/v5/picture/set',
}

/**
 * @description: Get user menu based on id
 */

export const getBookList = (params?) => {
  return defHttp.get({ url: Api.GET_BOOK, params });
};

export const borrowBook = (params?) => {
  return defHttp.get({ url: Api.BORROW, params }, { withToken: true });
};

export const getInfo = () => {
  return defHttp.get({ url: Api.GET_INFO }, { withToken: true });
};

export const changePwd = (data) => {
  return defHttp.post({ url: Api.CHANGE_PWD, data });
};

export const getReader = (data?) => {
  return defHttp.post({ url: Api.GET_READER, data }, { withToken: true });
};

export const delReader = (id) => {
  return defHttp.get({ url: `${Api.DEL_READER}/${id}` }, { withToken: true });
};

export const addReader = (data) => {
  return defHttp.post({ url: Api.ADD_READER, data }, { withToken: true });
};

export const importExcel = (data) => {
  return defHttp.post({ url: Api.UPLOAD, data }, { withToken: true });
};

export const changeAuth = (params) => {
  return defHttp.get({ url: Api.CHANGE_AUTH, params }, { withToken: true });
};

export const getBorrowList = (data?) => {
  return defHttp.post({ url: Api.BORROW_LIST, data });
};

export const moveBook = (id) => {
  return defHttp.get({ url: `${Api.MOVE_IN}/${id}` }, { withToken: true });
};

export const catalogue = (data) => {
  return defHttp.post({ url: Api.CATALOGUE, data }, { withToken: true });
};

export const cost = (data) => {
  return defHttp.post({ url: Api.COST, data }, { withToken: true });
};

export const entryBook = (data) => {
  return defHttp.post({ url: Api.ENTRY, data }, { withToken: true });
};

export const CLASbook = (params) => {
  return defHttp.get({ url: Api.CLASSIFICATION, params }, { withToken: true });
};

export const returnBook = (id) => {
  return defHttp.get({ url: `${Api.RETURN_BOOK}/${id}` }, { withToken: true });
};

export const downloadFile = () => {
  return defHttp.get({ url: Api.DOWNLOAD, responseType: 'blob' }, { isTransformResponse: false });
};

export const delBook = (data) => {
  return defHttp.post({ url: Api.DEL_BOOK, data }, { withToken: true });
};

export const resetPwd = (id) => {
  return defHttp.get({ url: `${Api.RESET}/${id}` }, { withToken: true });
};
