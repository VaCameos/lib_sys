<template>
  <div>
    <BasicTable @register="registerTable">
      <template #headerTop>
        <Alert type="info" show-icon>
          <template #message>
            <span
              >逾期收费是为了保障图书的正常流通,维护大多数读者的利益,培养读者在规定时间内还书的习惯。逾期未还者,从逾期当日起计算逾期费,外借图书逾期费为0.5元/册/天</span
            >
          </template>
        </Alert>
      </template>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '修改欠费',
                auth: RoleEnum.LIB_ADMIN,
                disabled: computeCost(record.return_time.slice(0, 10)) == 0,
                onClick: openModal.bind(null, true, record),
              },
              {
                label: '还书',
                auth: RoleEnum.READER,
                disabled: judgeOverdue(record.return_time.slice(0, 10)) || record.is_loan == 1,
                popConfirm: {
                  title: '确定要还书吗',
                  confirm: handleConfirm.bind(null, record),
                },
              },
            ]"
          />
        </template>
        <template v-else-if="column.dataIndex === 'return' && text.length == 0">
          <span> 尚未归还 </span>
        </template>
        <template v-else-if="column.dataIndex.includes('return')">
          <span>{{ text.slice(0, 10) }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'cost'">
          <span>{{ computeCost(record.return_time.slice(0, 10)) }}</span>
        </template>
      </template>
    </BasicTable>
    <Modal @register="reg" @reload="reload" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig, judgeOverdue, computeCost } from './data';
  import { getBorrowList } from '/@/api/sys/book';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBookStore } from '/@/store/modules/book';
  import { useModal } from '/@/components/Modal';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import Modal from './Modal.vue';
  import { Alert } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  const store = useBookStore();
  const { hasPermission } = usePermission();

  const [reg, { openModal }] = useModal();
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const handleConfirm = async (e) => {
    // console.log(e.book_id);
    await store.returnBk(e.book_id);
    success('归还成功');
    reload();
  };
  const user = useUserStore();
  const [registerTable, { reload }] = useTable({
    api: getBorrowList,
    beforeFetch: (e) => {
      if (hasPermission(RoleEnum.LIB_ADMIN)) return e;
      else {
        e.user_id = user.getUserInfo.user_id;
        return e;
      }
    },
    afterFetch: (res) => {
      if (hasPermission(RoleEnum.LIB_ADMIN)) return res;
      else res.filter((e) => e.is_loan == 2);
    },
    columns: getBasicColumns(),
    /* useSearchForm: true,
    formConfig: getFormConfig(), */
    showTableSetting: true,
    // tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'book_id',
    actionColumn: {
      dataIndex: 'action',
      title: '操作',
      auth: [RoleEnum.READER, RoleEnum.LIB_ADMIN],
    },
  });
</script>
