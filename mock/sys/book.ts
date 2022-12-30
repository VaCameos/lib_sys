import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess } from '../_util';

interface bookItem {
  author: string;
  book_id: string;
  book_name: string;
  class: string;
  count: number;
  loan: number;
  publish: string;
}

const booklist = (): bookItem[] => {
  const res: bookItem[] = [];
  for (let index = 0; index < 10; index++) {
    res.push({
      book_id: `index`,
      book_name: 'book',
      author: 'sss',
      publish: '出版社',
      count: index,
      class: '类别',
      loan: index,
    });
  }
  return res;
};
export default [
  // mock user login
  {
    url: '/basic-api/api/v2/query/Bookle/query',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(booklist());
    },
  },
] as MockMethod[];
