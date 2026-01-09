// Hexo Script to inject AI Chat Widget
// Saves to: scripts/ai-injector.js

hexo.extend.injector.register('body_end', `
  <script src="/js/ai-chat.js" async></script>
`);
