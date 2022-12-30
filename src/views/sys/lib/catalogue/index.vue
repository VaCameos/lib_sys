<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="RoleEnum.SYS_ADMIN">
          <a-button @click="openAdd">添加分类</a-button>
        </Authority>
      </template>
    </BasicTable>
    <Add @register="regAdd" @reload="reload" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumns } from './data';
  import { CLASbook } from '/@/api/sys/book';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBookStore } from '/@/store/modules/book';
  import { useModal } from '/@/components/Modal';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Authority } from '/@/components/Authority';
  import Add from './add.vue';
  const store = useBookStore();
  const [reg, { openModal }] = useModal();
  const [regAdd, { openModal: openAdd }] = useModal();
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerTable, { reload }] = useTable({
    api: CLASbook,
    columns: getBasicColumns(),
    showTableSetting: true,
    // tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'class_id',
    pagination: {
      defaultPageSize: 50,
    },
  });
</script>
