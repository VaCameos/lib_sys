import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Form/index';
import { RoleEnum } from '/@/enums/roleEnum';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '学号',
      dataIndex: 'user_id',
    },
    {
      title: '书号',
      dataIndex: 'book_id',
    },

    {
      title: '书名',
      dataIndex: 'picture_name',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },

    {
      title: '类别',
      dataIndex: 'class',
    },

    {
      title: '应还时间',
      dataIndex: 'return_time',
    },
    {
      title: '实际归还',
      dataIndex: 'return',
    },
    {
      title: '欠费金额',
      dataIndex: 'cost',
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    actionColOptions: { span: 24 },
    labelWidth: 100,
    schemas: [
      {
        field: 'picture_id',
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
    ],
  };
}

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
    label: '学号',
    field: 'user_id',
    componentProps: {
      disabled: true,
    },
    component: 'Input',
  },
  {
    label: '欠费',
    field: 'cost',
    required: true,
    component: 'InputNumber',
  },
];

const diffTime = (should: string) => {
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dates = date.getDate();
  const today = new Date(`${year}-${month}-${dates}`).getTime();
  const shouldDate = new Date(should).getTime();
  return today - shouldDate;
};

export const judgeOverdue = (should: string) => {
  return diffTime(should) > 0;
};

export const computeCost = (should: string) => {
  const diff = diffTime(should);
  if (diff < 0) return 0;
  else {
    return (diff * 0.5) / (1000 * 3600 * 24);
  }
};
