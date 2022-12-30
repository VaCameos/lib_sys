import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '个人信息',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '修改密码',
    component: 'Password',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'user_id',
    component: 'Input',
    label: '学号:',
    componentProps: {
      bordered: false,
      disabled: true,
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '姓名:',
    componentProps: {
      bordered: false,
      disabled: true,
    },
  },
  {
    field: 'class',
    component: 'Input',
    label: '班级:',
    componentProps: {
      bordered: false,
      disabled: true,
    },
  },
  {
    field: 'course',
    component: 'Input',
    label: '专业:',
    componentProps: {
      bordered: false,
      disabled: true,
    },
  },
  {
    field: 'level',
    component: 'Input',
    label: '身份:',
    componentProps: {
      bordered: false,
      disabled: true,
    },
  },
];
