<template>
  <BasicModal
    v-bind="$attrs"
    title="借阅"
    @register="register"
    @ok="handleOk"
    :confirm-loading="loading"
    :min-height="400"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { useBookStore } from '/@/store/modules/book';
  import { modalSchemas } from './data';
  import { reactive, ref, nextTick, onMounted } from 'vue';
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const store = useUserStore();
  const bk = useBookStore();
  const loading = ref(false);
  const emits = defineEmits(['reload', 'register']);
  const [registerForm, { setFieldsValue, validateFields }] = useForm({
    labelWidth: 100,
    schemas: modalSchemas,
    showActionButtonGroup: false,
    // layout: 'vertical',
    baseColProps: {
      span: 24,
    },
  });
  const [register, { closeModal }] = useModalInner((data) => {
    setFieldsValue(data);
  });

  const handleOk = async () => {
    try {
      const res = await validateFields();
      // console.log(res);
      // console.log(store.getUserInfo);
      res.user_id = store.getUserInfo.user_id;
      loading.value = true;
      await bk.borrowBook(res);
      success('借阅成功');
      closeModal();
      emits('reload');
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };
</script>
