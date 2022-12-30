<template>
  <div>
    <BasicTable @register="registerTable" :pagination="{ pageSize: 50 }">
      <template #toolbar>
        <a-button class="m-2" @click="openModal">新增</a-button>
        <Upload accept="'.xlsx'" :showUploadList="false" :customRequest="importExcel">
          <a-button class="m-2">导入名单</a-button></Upload
        >
        <a-button class="m-2" type="file" @click="downloadTPL">下载导入模板</a-button>
      </template>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '删除',
                popConfirm: {
                  title: '确定要删除该用户吗？',
                  confirm: handleDel.bind(null, record),
                },
              },
              {
                label: '修改权限',
                onClick: openAuth.bind(null, true, record),
              },
              {
                label: '重置密码',
                popConfirm: {
                  title: '确定要重置该用户的密码吗？',
                  confirm: Reset.bind(null, record),
                },
              },
            ]"
          />
        </template>
        <template v-else-if="column.dataIndex === 'level'">
          <span>{{ authKey[text] }}</span>
        </template>
      </template>
    </BasicTable>
    <Auth @register="AUTH" @reload="reload" />
    <Modal @register="reg" @reload="reload" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig, authKey } from './data';
  import { getReader, downloadFile } from '/@/api/sys/book';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBookStore } from '/@/store/modules/book';
  import { useModal } from '/@/components/Modal';
  import Modal from './Modal.vue';
  import Auth from './auth.vue';
  import { Upload } from 'ant-design-vue';
  import { downloadByUrl } from '/@/utils/file/download';
  const store = useBookStore();
  const [reg, { openModal }] = useModal();
  const [AUTH, { openModal: openAuth }] = useModal();
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const importExcel = async (e: any) => {
    const { file } = e;
    let f = new FormData();
    f.append('file', file);
    await store.handleExcel(f);
    success('导入成功');
    reload();
  };
  const Reset = async (e) => {
    await store.resetPwd(e.user_id);
    success('重置成功');
  };
  const downloadTPL = async () => {
    const blob = await downloadFile();
    var url = window.URL.createObjectURL(blob);
    downloadByUrl({ url, fileName: '导入模板' });
    // window.location.href = url;
  };
  const handleDel = async (record) => {
    // console.log(record);
    await store.del(record.user_id);
    // await Promise.reject('bbb');
    success('删除成功');
    reload();
  };
  const [registerTable, { reload }] = useTable({
    api: getReader,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showTableSetting: true,
    // tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'user_id',
    actionColumn: {
      dataIndex: 'action',
      title: '操作',
    },
  });
</script>
