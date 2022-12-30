<template>
  <BasicModal
    v-bind="$attrs"
    title="修改权限"
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
  const [registerForm, { setFieldsValue, validateFields }] = useForm({
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
    try {
      const res = await validateFields();
      loading.value = true;
      await bk.changeRole(res);
      loading.value = false;
      success('修改成功');
      closeModal();
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
