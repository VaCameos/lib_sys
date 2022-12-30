import { defineStore } from 'pinia';
import {
  addReader,
  borrowBook,
  catalogue,
  changeAuth,
  changePwd,
  cost,
  delBook,
  delReader,
  entryBook,
  getInfo,
  importExcel,
  moveBook,
  resetPwd,
  returnBook,
} from '/@/api/sys/book';

export const useBookStore = defineStore('book', {
  state: () => ({
    info: {},
  }),
  getters: {},
  actions: {
    // 借书
    async borrowBook(params) {
      await borrowBook(params);
    },
    // 获取读者信息
    async getInfo() {
      const res = await getInfo();
      this.info = res;
    },
    // 修改密码
    async changePwd(data) {
      await changePwd(data);
    },
    // 删除读者
    async del(id) {
      await delReader(id);
    },
    // 新增读者
    async add(data) {
      await addReader(data);
    },
    // 导入
    async handleExcel(data) {
      await importExcel(data);
    },
    // 修改权限
    async changeRole(data) {
      await changeAuth(data);
    },
    // 图书入库
    async moveInBook(id) {
      await moveBook(id);
    },
    // 图书录入
    async inputBook(data) {
      await entryBook(data);
    },
    // 修改欠费
    async changeCost(data) {
      await cost(data);
    },
    // 添加类别
    async addClass(data) {
      await catalogue(data);
    },
    // 还书
    async returnBk(id) {
      await returnBook(id);
    },
    // 删除图书
    async delBook(book) {
      await delBook(book);
    },
    // 重置密码
    async resetPwd(id) {
      await resetPwd(id);
    },
  },
});
