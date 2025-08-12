# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

<div class="example">
  <VButton>Default</VButton>
  <VButton type="primary">Primary</VButton>
  <VButton type="success">Success</VButton>
  <VButton type="warning">Warning</VButton>
  <VButton type="danger">Danger</VButton>
  <VButton type="dashed">Dashed</VButton>
</div>

<style>
.example .v-button {
  margin-right: 8px;
}
</style>

## 禁用状态

按钮的不可用状态。

<div class="example">
  <VButton disabled>Default</VButton>
  <VButton type="primary" disabled>Primary</VButton>
  <VButton type="success" disabled>Success</VButton>
  <VButton type="warning" disabled>Warning</VButton>
  <VButton type="danger" disabled>Danger</VButton>
  <VButton type="dashed" disabled>Dashed</VButton>
</div>

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

<div class="example">
  <VButton type="primary" loading>Loading</VButton>
</div>

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮。

<div class="example">
  <VButton type="primary" size="large">Large</VButton>
  <VButton type="primary">Medium</VButton>
  <VButton type="primary" size="small">Small</VButton>
</div>

<script setup>
import { VButton } from '@vue3-ui/components';
</script>
