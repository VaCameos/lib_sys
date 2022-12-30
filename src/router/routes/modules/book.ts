import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const book: AppRouteModule = {
  path: '/book',
  name: 'BOOK',
  component: LAYOUT,
  redirect: '/book/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'material-symbols:menu-book-outline-rounded',
    title: '图书总览',
    orderNo: 1,
  },
  children: [
    {
      path: 'index',
      name: 'BookPage',
      component: () => import('/@/views/sys/lib/book/index.vue'),
      meta: {
        title: '图书总览',
        icon: 'material-symbols:menu-book-outline-rounded',
        hideMenu: true,
      },
    },
  ],
};

export default book;
