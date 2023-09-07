import MarkdownItContainer from 'markdown-it-container';
export function VueReplMdPlugin(md: markdownit) {
  const defaultRender = md.renderer.rules.fence;
  md.use(MarkdownItContainer, 'playground', {
    validate: function(params: string) {
      return params.trim().match(/^playground\s*(.*)$/);
    },
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        const vueToken = tokens.find(e => e.info === 'vue');
        return `<VuePlayground>${encodeURIComponent(vueToken.content)}\n`;
      } else {
        // closing tag
        return '</VuePlayground>\n';
      }
    }
  })

  md.renderer.rules.fence = (tokens: any[], idx: number, options: markdownit.Options, env: any, self: any) => {
    const token = tokens[idx];
    const prevToken = tokens[idx - 1];
    const inPlayground = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^playground\s*(.*)$/);
    // 当前token是 ```vue 并且 在 playground 块中, 不去渲染内容
    if (token.info === 'vue' && inPlayground) {
      return '';
    }
    return defaultRender!(tokens, idx, options, env, self);
  };
}
