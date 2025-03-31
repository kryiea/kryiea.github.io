import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,e as r,o as i}from"./app-DRR9Yo7Y.js";const n="/assets/%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8.001-xh5I18wm.png",a="/assets/%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8.002-FYaNIGGa.png",p={};function l(s,t){return i(),o("div",null,t[0]||(t[0]=[r('<p><strong>分库分表</strong></p><p><strong>一、什么时候分库、什么时候分表</strong></p><ul><li>分表：单张数据表太大，大于 500w 以上，影响了事务执行效率，就需要考虑分表。</li><li>分库：单个数据库的性能扛不住高并发流量，就要考虑分库。</li></ul><p><strong>二、分库分表原理</strong></p><p>具体可以分为两种方式：垂直切分和水平切分</p><p><strong>(一) 垂直切分</strong></p><p>垂直拆分一般是按照业务和功能的维度进行拆分，把数据分别放到不同的数据库中。</p><figure><img src="'+n+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>(二) 水平切分</strong></p><p>水平拆分是把相同的表结构分散到不同的数据库和不同的数据表中，避免访问集中的单个数据库或者单张数据表，具体的分库和分表规则，一般是通过业务主键，进行哈希取模操作。</p><figure><img src="'+a+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>三、分库分表引发的问题</strong></p><p><strong>(一) 分布式事务问题，解决方式：</strong></p><p>分布式事务是指：一次大的操作由多个小操作组成，这些小的操作分布在不同的服务器上，分布式事务需要保证这些小操作要么全部成功，要么全部失败。</p><ul><li>2PC 两阶段、3PC 三阶段提交协议。（强一致性，性能差，用的少）</li><li>TCC 分段提交</li><li>基于本地消息表来实现分布式事务（最终一致性，性能较好，用的多）</li></ul><p><strong>(二) 全局 ID 唯一性问题，解决方式：</strong></p><ul><li>雪花算法生成 ID</li><li>美团 leaf 算法</li></ul><p><strong>(三) 跨库跨表关联查询问题，解决方式：</strong></p><p><strong>(四) 跨库跨表 count 查询问题，解决方式</strong></p>',19)]))}const m=e(p,[["render",l],["__file","分库分表.html.vue"]]),y=JSON.parse('{"path":"/back-end/mysql/High-availability/%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8.html","title":"MySQL分库分表实践","lang":"zh-CN","frontmatter":{"title":"MySQL分库分表实践","description":"详细介绍MySQL分库分表的原理、策略及实施方案","date":"2024-01-01T00:00:00.000Z","category":["数据库","MySQL"],"tag":["MySQL","分库分表","数据库架构","高可用"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/mysql/High-availability/%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"MySQL分库分表实践"}],["meta",{"property":"og:description","content":"详细介绍MySQL分库分表的原理、策略及实施方案"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:tag","content":"分库分表"}],["meta",{"property":"article:tag","content":"数据库架构"}],["meta",{"property":"article:tag","content":"高可用"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL分库分表实践\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":1.58,"words":475},"filePathRelative":"back-end/mysql/High-availability/分库分表.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>分库分表</strong></p>\\n<p><strong>一、什么时候分库、什么时候分表</strong></p>\\n<ul>\\n<li>分表：单张数据表太大，大于 500w 以上，影响了事务执行效率，就需要考虑分表。</li>\\n<li>分库：单个数据库的性能扛不住高并发流量，就要考虑分库。</li>\\n</ul>\\n<p><strong>二、分库分表原理</strong></p>\\n<p>具体可以分为两种方式：垂直切分和水平切分</p>\\n<p><strong>(一) 垂直切分</strong></p>\\n<p>垂直拆分一般是按照业务和功能的维度进行拆分，把数据分别放到不同的数据库中。</p>"}');export{m as comp,y as data};
