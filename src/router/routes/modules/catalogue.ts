import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const catalogue: AppRouteModule = {
  path: '/catalogue',
  name: 'catalogue',
  component: LAYOUT,
  redirect: '/catalogue/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'arcticons:bookcatalogue',
    title: '编录管理',
    orderNo: 1,
    roles: [RoleEnum.SYS_ADMIN, RoleEnum.LIB_ADMIN],
  },
  children: [
    {
      path: 'index',
      name: 'catalogue',
      component: () => import('/@/views/sys/lib/catalogue/index.vue'),
      meta: {
        title: '编录管理',
        icon: 'arcticons:bookcatalogue',
        hideMenu: true,
        roles: [RoleEnum.SYS_ADMIN, RoleEnum.LIB_ADMIN],
      },
    },
  ],
};

export default catalogue;
