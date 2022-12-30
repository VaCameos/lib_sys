import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Form/index';
import { RoleEnum } from '/@/enums/roleEnum';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '分类名',
      dataIndex: 'class_name',
    },
    {
      title: '类ID',
      dataIndex: 'class_id',
    },
  ];
}

export const schemas: FormSchema[] = [
  {
    field: 'class_id',
    label: '类ID',
    component: 'Input',
    required: true,
  },
  {
    field: 'class_name',
    label: '类名',
    component: 'Input',
    required: true,
  },
];
