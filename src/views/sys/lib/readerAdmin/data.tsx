import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '用户名',
      dataIndex: 'user_name',
    },
    {
      title: 'id',
      dataIndex: 'user_id',
    },
    {
      title: '班级',
      dataIndex: 'class',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '身份',
      dataIndex: 'level',
    },
  ];
}

export enum authKey {
  '读者' = 1,
  '图书管理员' = 2,
  '系统管理员' = 3,
}

export function getFormConfig(): Partial<FormProps> {
  return {
    actionColOptions: { span: 24 },
    labelWidth: 100,
    schemas: [
      {
        field: 'user_name',
        label: '用户名',
        component: 'Input',
        colProps: {
          span: 12,
        },
        itemProps: {
          wrapperCol: {
            span: 12,
          },
        },
      },
      {
        field: 'user_id',
        label: '学号',
        component: 'Input',
        colProps: {
          span: 12,
        },
        itemProps: {
          wrapperCol: {
            span: 12,
          },
        },
      },
      {
        field: 'class',
        label: '班级',
        component: 'Input',
        colProps: {
          span: 12,
        },
        itemProps: {
          wrapperCol: {
            span: 12,
          },
        },
      },
      {
        field: 'name',
        label: '姓名',
        component: 'Input',
        colProps: {
          span: 12,
        },
        itemProps: {
          wrapperCol: {
            span: 12,
          },
        },
      },
    ],
  };
}

export const modalSchemas: FormSchema[] = [
  {
    label: '专业',
    field: 'course',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '计算机',
          value: '计算机',
        },
        {
          label: '机电',
          value: '机电',
        },
        {
          label: '体院',
          value: '体院',
        },
      ],
    },
    required: true,
  },
  {
    label: '班级',
    field: 'class',
    component: 'Input',
    required: true,
  },
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: '学号',
    field: 'user_id',
    component: 'Input',
    required: true,
  },
  {
    label: '用户名',
    field: 'user_name',
    component: 'Input',
  },
];

export const schemas: FormSchema[] = [
  {
    label: '',
    field: 'user_id',
    component: 'Input',
    show: false,
  },
  {
    label: '权限',
    component: 'Select',
    field: 'level',
    required: true,
    componentProps: {
      options: [
        {
          label: '读者',
          value: 1,
        },
        {
          label: '图书管理员',
          value: 2,
        },
        {
          label: '系统管理员',
          value: 3,
        },
      ],
    },
  },
];
