<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <Row :gutter="12">
      <Col :span="14">
        <BasicForm @register="register" />
      </Col>
      <Col :span="8">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar :value="avatar" width="150" disabled />
        </div>
      </Col>
    </Row>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { Row, Col } from 'ant-design-vue';
  import { computed, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useBookStore } from '/@/store/modules/book';
  import headerImg from '/@/assets/images/header.jpg';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { authKey } from '../readerAdmin/data';

  const store = useBookStore();
  const userStore = useUserStore();

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 50,
    schemas: baseSetschemas,
    showActionButtonGroup: false,
    baseColProps: {
      span: 14,
    },
  });

  onMounted(async () => {
    await store.getInfo();
    const { info } = store;
    let { level } = info;
    info.level = authKey[level];
    setFieldsValue(info);
  });

  const avatar = computed(() => {
    const { avatar } = userStore.getUserInfo;
    return avatar || headerImg;
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
