<script setup>
import { ref, onMounted, computed } from 'vue';
import { Repl, ReplStore } from '@vue/repl';
import { utoa } from './utils';
import { defineClientComponent } from 'vitepress'
import "@vue/repl/style.css";

const store = ref();
const slots = defineSlots();
const props = defineProps({
  editor: {
    type: String,
    default: 'CodeMirror'
  },
  config: {
    type: String,
    default: ''
  }
});
const Monaco = defineClientComponent(() => {
  return import('@vue/repl/monaco-editor')
});
const CodeMirror = defineClientComponent(() => {
  return import('@vue/repl/codemirror-editor')
});
const config = ref({});
const editorConfig = computed(() => {
  return config.value.editorConfig ? config.value.editorConfig : {}
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

  if (props.config) {
    try {
      config.value = JSON.parse(decodeURIComponent(props.config))
    } catch(e) {
      console.error('playgound 配置解析错误', e);
    }
  }

  config.value?.imports && store.value.setImportMap({
    imports: config.value.imports
  })
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
      :editor="editor === 'CodeMirror' ? CodeMirror : Monaco"
      :showCompileOutput="true"
      :clearConsole="false"
      v-bind="editorConfig"
    />
  </div>
</template>
