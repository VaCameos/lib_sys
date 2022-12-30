import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const borrow: AppRouteModule = {
  path: '/borrow',
  name: 'BORROW',
  component: LAYOUT,
  redirect: '/borrow/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'akar-icons:arrow-cycle',
    title: '我的借阅',
    orderNo: 1,
    roles: [RoleEnum.READER],
  },
  children: [
    {
      path: 'index',
      name: 'BorrowPage',
      component: () => import('/@/views/sys/lib/borrowAdmin/index.vue'),
      meta: {
        title: '图书借阅',
        icon: 'akar-icons:arrow-cycle',
        hideMenu: true,
        roles: [RoleEnum.READER],
      },
    },
  ],
};

export default borrow;
