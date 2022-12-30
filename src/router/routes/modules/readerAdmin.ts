import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const readerAdmin: AppRouteModule = {
  path: '/readerAdmin',
  name: 'readerAdmin',
  component: LAYOUT,
  redirect: '/readerAdmin/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'uil:book-reader',
    title: '用户管理',
    orderNo: 1,
    roles: [RoleEnum.SYS_ADMIN],
  },
  children: [
    {
      path: 'index',
      name: 'readerAdmin',
      component: () => import('/@/views/sys/lib/readerAdmin/index.vue'),
      meta: {
        title: '读者管理',
        icon: 'uil:book-reader',
        hideMenu: true,
        roles: [RoleEnum.SYS_ADMIN],
      },
    },
  ],
};

export default readerAdmin;
