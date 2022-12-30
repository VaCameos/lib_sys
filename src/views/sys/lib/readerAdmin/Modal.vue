<template>
  <BasicModal
    v-bind="$attrs"
    title="新增"
    @register="register"
    @ok="handleOk"
    :confirm-loading="loading"
    :min-height="100"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBookStore } from '/@/store/modules/book';
  import { modalSchemas } from './data';
  import { ref } from 'vue';
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const bk = useBookStore();
  const loading = ref(false);
  const emits = defineEmits(['reload', 'register']);
  const [registerForm, { resetFields, setFieldsValue, validateFields }] = useForm({
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
      loading.value = true;
      await bk.add(res);
      loading.value = false;
      success('添加成功');
      closeModal();
      resetFields();
      emits('reload');
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };
</script>
<style scoped>
  .rl {
    z-index: 99999;
  }
</style>
