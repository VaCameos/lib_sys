import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const my: AppRouteModule = {
  path: '/my',
  name: 'personal',
  component: LAYOUT,
  redirect: '/my/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'material-symbols:person',
    title: '个人信息',
    orderNo: 9999,
    // roles: [RoleEnum.READER],
  },
  children: [
    {
      path: 'index',
      name: 'personalPage',
      component: () => import('/@/views/sys/lib/password/index.vue'),
      meta: {
        title: '个人信息',
        icon: 'material-symbols:person',
        hideMenu: true,
        // roles: [RoleEnum.READER],
      },
    },
  ],
};

export default my;
