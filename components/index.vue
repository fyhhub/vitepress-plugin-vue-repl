<script setup>
import { ref, onMounted } from 'vue';
import { Repl, ReplStore } from '@vue/repl';
import { utoa } from './utils';
import { defineClientComponent } from 'vitepress'
import "@vue/repl/style.css";
const store = ref();
const slots = defineSlots();
const Monaco = defineClientComponent(() => {
  return import('@vue/repl/monaco-editor')
})
onMounted(() => {
  const children = slots.default();
  const code = children?.[0]?.children;
  const file = {
    'src/App.vue': decodeURIComponent(code)
  };
  store.value = new ReplStore({
    serializedState: utoa(JSON.stringify(file))
  });
});
</script>
<style scoped>
.playground {
  height: 400px;
}
.playground :deep(.left) {
  float: inherit;
  margin-left: initial;
  left: initial;
  right: initial;
  background-color: initial;
  min-height: initial;
}

.playground :deep(.right) {
  float: inherit;
  margin-left: initial;
  left: initial;
  right: initial;
  background-color: initial;
  min-height: initial;
}

.playground :deep(.wrapper) {
  display: none;
}
</style>
<template>
  <div class="playground">
    <Repl
      v-if="store"
      autoResize
      :store="store"
      :editor="Monaco"
      :showCompileOutput="true"
      :clearConsole="false"
    />
  </div>
</template>
