<script setup>
import { ref, onMounted } from 'vue'
import { Repl, ReplStore } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import { utoa } from './utils';
import '@vue/repl/style.css'
const store = ref();
const slots = defineSlots();

onMounted(() => {
  const children = slots.default();
  const code = children?.[0]?.children;
  const file = {
    'src/App.vue': decodeURIComponent(code)
  }
  store.value = new ReplStore({
    serializedState: utoa(JSON.stringify(file))
  })
})
</script>

<template>
  <div style="height: 400px;">
    <Repl v-if="store" autoResize :store="store" :editor="Monaco" :showCompileOutput="true" :clearConsole="false"/>
  </div>
</template>
