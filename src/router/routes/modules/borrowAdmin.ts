import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const borrowAdmin: AppRouteModule = {
  path: '/borrowAdmin',
  name: 'borrowAdmin',
  component: LAYOUT,
  redirect: '/borrowAdmin/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'uiw:setting-o',
    title: '借阅管理',
    orderNo: 1,
    roles: [RoleEnum.LIB_ADMIN],
  },
  children: [
    {
      path: 'index',
      name: 'borrowAdmin',
      component: () => import('/@/views/sys/lib/borrowAdmin/index.vue'),
      meta: {
        title: '图书借阅',
        icon: 'uiw:setting-o',
        hideMenu: true,
        roles: [RoleEnum.LIB_ADMIN],
      },
    },
  ],
};

export default borrowAdmin;
