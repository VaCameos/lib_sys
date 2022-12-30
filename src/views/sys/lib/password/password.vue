<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit" :loading="loading">
          确认
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './pwd.data';
  import { useUserStore } from '/@/store/modules/user';
  import { ref } from 'vue';
  import { useBookStore } from '/@/store/modules/book';
  const loading = ref(false);
  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
  });
  const store = useUserStore();
  const bk = useBookStore();
  async function handleSubmit() {
    try {
      const values = await validate();
      const { user_id } = store.getUserInfo;
      loading.value = true;
      await bk.changePwd({ ...values, user_id });
      loading.value = false;
      store.logout(true);
      // const { router } = useRouter();
      // router.push(pageEnum.BASE_LOGIN);
    } catch (error) {
    } finally {
      loading.value = false;
    }
  }
</script>
