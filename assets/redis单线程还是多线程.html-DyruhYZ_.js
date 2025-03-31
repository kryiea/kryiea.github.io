import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,e as r,o as n}from"./app-DRR9Yo7Y.js";const o={};function p(a,e){return n(),i("div",null,e[0]||(e[0]=[r("<p><strong>redis 单线程还是多线程</strong></p><p><strong>结论</strong></p><ul><li>核心处理逻辑：redis 一直都是单线程，4.0 后对使用多线程处理异步删除的操作。</li><li>辅助模块：复制模块、某些异步流程、网络 IO 解包 6.0 后用的多线程</li></ul><p><strong>为什么选择单线程</strong></p><p>官方</p><p><strong>[图片下载失败]</strong></p><ul><li>reids 的定位是内存的 k-v 存储，做的就是短平快的热点数据处理</li><li>一般来说执行会很快，执行本身不应该成为瓶颈，而瓶颈通常在网络 IO，所以处理逻辑使用多线程不会有太多收益</li><li>同时引入 多线程带来的复杂度远比现象的大</li></ul><p><strong>1. 多线程引入的复杂度大</strong></p><p><strong>2. 多线程带来额外的成本</strong></p><ol><li>上下文切换成本</li><li>同步机制开销，需要加锁来实现，不可忽视的 cpu 开销</li><li>一个线程本身也占据内存大小，reids 这种内存数据对内存十分珍惜</li></ol>",10)]))}const c=t(o,[["render",p],["__file","redis单线程还是多线程.html.vue"]]),d=JSON.parse('{"path":"/back-end/redis/Operating-principle/redis%E5%8D%95%E7%BA%BF%E7%A8%8B%E8%BF%98%E6%98%AF%E5%A4%9A%E7%BA%BF%E7%A8%8B.html","title":"Redis单线程与多线程模型对比","lang":"zh-CN","frontmatter":{"title":"Redis单线程与多线程模型对比","description":"深入分析Redis的单线程模型和多线程特性，以及选择单线程的原因","date":"2024-01-01T00:00:00.000Z","category":["数据库","Redis"],"tag":["Redis","线程模型","性能优化","系统架构"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/redis/Operating-principle/redis%E5%8D%95%E7%BA%BF%E7%A8%8B%E8%BF%98%E6%98%AF%E5%A4%9A%E7%BA%BF%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"Redis单线程与多线程模型对比"}],["meta",{"property":"og:description","content":"深入分析Redis的单线程模型和多线程特性，以及选择单线程的原因"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"线程模型"}],["meta",{"property":"article:tag","content":"性能优化"}],["meta",{"property":"article:tag","content":"系统架构"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis单线程与多线程模型对比\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":1.07,"words":320},"filePathRelative":"back-end/redis/Operating-principle/redis单线程还是多线程.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>redis 单线程还是多线程</strong></p>\\n<p><strong>结论</strong></p>\\n<ul>\\n<li>核心处理逻辑：redis 一直都是单线程，4.0 后对使用多线程处理异步删除的操作。</li>\\n<li>辅助模块：复制模块、某些异步流程、网络 IO 解包 6.0 后用的多线程</li>\\n</ul>\\n<p><strong>为什么选择单线程</strong></p>\\n<p>官方</p>\\n<p><strong>[图片下载失败]</strong></p>\\n<ul>\\n<li>reids 的定位是内存的 k-v 存储，做的就是短平快的热点数据处理</li>\\n<li>一般来说执行会很快，执行本身不应该成为瓶颈，而瓶颈通常在网络 IO，所以处理逻辑使用多线程不会有太多收益</li>\\n<li>同时引入 多线程带来的复杂度远比现象的大</li>\\n</ul>"}');export{c as comp,d as data};
