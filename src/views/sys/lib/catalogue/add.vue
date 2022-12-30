<template>
  <BasicModal
    v-bind="$attrs"
    title="添加类"
    @register="register"
    @ok="handleOk"
    :confirm-loading="loading"
    :min-height="150"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBookStore } from '/@/store/modules/book';
  import { schemas } from './data';
  import { ref } from 'vue';
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const bk = useBookStore();
  const loading = ref(false);
  const emits = defineEmits(['reload', 'register']);
  const [registerForm, { resetFields, setFieldsValue, validateFields }] = useForm({
    labelWidth: 50,
    schemas,
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
    const res = await validateFields();
    // console.log(res);
    // console.log(store.getUserInfo);
    loading.value = true;
    await bk.addClass(res);
    loading.value = false;
    success('添加成功！');
    closeModal();
    resetFields();
    emits('reload');
  };
</script>
