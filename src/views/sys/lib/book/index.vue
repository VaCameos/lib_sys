<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="RoleEnum.LIB_ADMIN">
          <a-button @click="openAdd">添加图书</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '借阅',
                auth: RoleEnum.READER,
                disabled: record.count == 0,
                onClick: openModal.bind(null, true, record),
              },
              {
                label: '删除',
                auth: RoleEnum.LIB_ADMIN,
                popConfirm: {
                  title: '确定要删除吗？',
                  confirm: handleDel.bind(null, record),
                },
              },
              {
                label: '入库',
                auth: RoleEnum.LIB_ADMIN,
                popConfirm: {
                  title: '确定要入库吗？',
                  confirm: MoveIn.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <Add @register="regAdd" @reload="reload" />
    <Modal @register="reg" @reload="reload" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './data';
  import { getBookList } from '/@/api/sys/book';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBookStore } from '/@/store/modules/book';
  import { useModal } from '/@/components/Modal';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Authority } from '/@/components/Authority';
  import Add from './add.vue';
  import Modal from './Modal.vue';
  const store = useBookStore();
  const [reg, { openModal }] = useModal();
  const [regAdd, { openModal: openAdd }] = useModal();
  const { createMessage } = useMessage();
  const { success } = createMessage;

  const MoveIn = async (e) => {
    // console.log(e);
    await store.moveInBook(e.book_id);
    success('入库成功');
    reload();
  };
  const handleDel = async (e) => {
    const query = {
      picture_id: e.book_id,
      numbers: e.count,
    };
    await store.delBook(query);
    success('删除成功');
    reload();
  };
  const [registerTable, { reload }] = useTable({
    api: getBookList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showTableSetting: true,
    // tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'book_id',
    pagination: {
      defaultPageSize: 50,
    },
    actionColumn: {
      dataIndex: 'action',
      title: '操作',
      auth: [RoleEnum.READER, RoleEnum.LIB_ADMIN],
    },
  });
</script>
