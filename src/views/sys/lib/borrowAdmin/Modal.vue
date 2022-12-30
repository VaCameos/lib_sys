<template>
  <BasicModal
    v-bind="$attrs"
    title="借阅"
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
  import { useUserStore } from '/@/store/modules/user';
  import { useBookStore } from '/@/store/modules/book';
  import { modalSchemas, computeCost } from './data';
  import { reactive, ref, nextTick, onMounted } from 'vue';
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const store = useUserStore();
  const bk = useBookStore();
  const loading = ref(false);
  const emits = defineEmits(['reload', 'register']);
  const [registerForm, { setFieldsValue, validateFields }] = useForm({
    schemas: modalSchemas,
    showActionButtonGroup: false,
    labelWidth: 50,
    // layout: 'vertical',
    baseColProps: {
      span: 18,
    },
  });
  const [register, { closeModal }] = useModalInner((data) => {
    data.cost = computeCost(data.return_time.slice(0, 10));
    setFieldsValue(data);
  });

  const handleOk = async () => {
    const res = await validateFields();
    // console.log(store.getUserInfo);
    loading.value = true;
    await bk.changeCost(res);
    loading.value = false;
    success('修改成功');
    closeModal();
    emits('reload');
  };
</script>
