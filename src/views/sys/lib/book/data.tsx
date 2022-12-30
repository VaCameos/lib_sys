import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Form/index';
import { RoleEnum } from '/@/enums/roleEnum';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '书号',
      dataIndex: 'book_id',
    },
    {
      title: '书名',
      dataIndex: 'book_name',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publish',
    },
    {
      title: '类别',
      dataIndex: 'class',
    },
    {
      title: '剩余',
      dataIndex: 'count',
    },
    {
      title: '已借出',
      dataIndex: 'loan',
    },
    {
      title: '馆藏',
      dataIndex: 'inventory',
      auth: [RoleEnum.SYS_ADMIN, RoleEnum.LIB_ADMIN],
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    actionColOptions: { span: 24 },
    labelWidth: 100,
    schemas: [
      {
        field: 'book_id',
        label: '书号',
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
        field: 'publish',
        label: '出版社',
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
        field: 'book_name',
        label: '书名',
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
        field: 'author',
        label: '作者',
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
        label: '分类',
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
const computeReturn = () => {
  // JS获取最近三十天的日期
  const date = new Array(30)
    .fill(0)
    .map((_, idx) =>
      new Date(new Date().getTime() + idx * (24 * 60 * 60 * 1000))
        .toLocaleDateString()
        .replaceAll('/', '-'),
    )
    .reverse();
  return date[0];
};
export const modalSchemas: FormSchema[] = [
  {
    label: '书号',
    field: 'book_id',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '书名',
    field: 'book_name',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '作者',
    field: 'author',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '出版社',
    field: 'publish',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '分类号',
    field: 'class',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },

  {
    label: '归还时间',
    field: 'return_time',
    component: 'DatePicker',
    itemProps: {
      wrapperCol: {
        span: 24,
      },
    },
    //defaultValue: computeReturn(),
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    required: true,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'picture_id',
    label: '书号',
    component: 'Input',
    required: true,
  },
  {
    field: 'picture_name',
    label: '书名',
    component: 'Input',
    required: true,
  },
  {
    field: 'author',
    label: '作者',
    component: 'Input',
    required: true,
  },
  {
    field: 'publisher',
    label: '出版社',
    component: 'Input',
    required: true,
  },
];
