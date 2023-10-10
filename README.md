# vitepress-plugin-vue-repl


## install

```shell
npm i vitepress-plugin-vue-repl -D
```



## config

```js
// config.ts
import { VueReplMdPlugin } from 'vitepress-plugin-vue-repl';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(VueReplMdPlugin)
    }
  },
})
```


```js
// theme/index.ts
import Playground from 'vitepress-plugin-vue-repl/components/index.vue'
import DefaultTheme from 'vitepress/theme';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
      ctx.app.component('VuePlayground', Playground);
    },
};
```


## Usage

![16940542830411694054282196.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16940542830411694054282196.png)


![16940543340541694054333997.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16940543340541694054333997.png)
## Code Editor Config

+ Monaco
+ CodeMirror

![16969186209081696918620011.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16969186209081696918620011.png)
