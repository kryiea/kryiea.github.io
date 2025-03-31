import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,e as o,o as r}from"./app-DRR9Yo7Y.js";const n="/assets/%E5%AF%B9%E8%B1%A1%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4.001-CKF-iQIF.png",a="/assets/%E5%AF%B9%E8%B1%A1%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4.002-CiKcmuEG.png",l="/assets/%E5%AF%B9%E8%B1%A1%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4.003-B5ziCc4l.png",p={};function s(c,t){return r(),i("div",null,t[0]||(t[0]=[o('<p><strong>对象过期时间</strong></p><p><strong>是什么</strong></p><p>redis 的过期时间是给一个 key 指定一个时间点，等达到这个时间，数据就被认为是过期数据，由 redis 进行回收</p><p><strong>为什么要过期</strong></p><ul><li>如果不是需要常驻的数据，设置过去时间可以有效节约内存。</li><li>有些场景也是需要过期时间支持：缓存</li><li>如果存在时间过久，可能导致和数据源差距过大，而设置过期时间，可以很方便清除缓存以便后续再次加载进去</li><li>比如分布式锁：需要一定时间后，数据自动消失，以实现最大占据时间的特性</li></ul><p><strong>怎么设置过期时间</strong></p><ul><li>简单的字符串对象</li></ul><figure><img src="'+n+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><ul><li>更通用的过期命令 EXPRIRE，可以对所有数据对象设置过期时间，也可以分秒和毫秒</li></ul><figure><img src="'+a+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>key 过期多久会被删除</strong></p><p><strong>三种过期键清除策略</strong></p><ol><li><code></code>定时删除：在设置键过期时间的同时，创建一个定时器，让定时器在键过期时间来临，立即执行对键的删除操作，定时删除对内存比较友好，但是对 CPU 不友好，如果某个时间段比较多的 key 过期，可能会影响命令处理性能</li><li>惰性删除：是指使用的时候，发现 key 过期了，此时再进行删除，&quot;只要不访问，过期不过期业务都无所谓&quot;，对 CPU 友好，对内存不友好</li><li>定期删除：每隔一段时间，程序对数据库进行一次检查，每次删除一部分过期 key ，属于一种渐进式兜底策略</li></ol><p>定期删除</p><ul><li>实现起来没有那么容易</li><li>主要考虑出现异常，有 key 遗漏了怎么办，以及如果程序重启，原来的定时器就随重启消失了，那就需要再启动时，对过期 key 进行一些操作，可能是重建定时器，这些都是额外的工作，引多了多余的复杂度</li></ul><p><strong>redis 采用的</strong></p><ul><li>redis 采用惰性删除+定期删除结合</li></ul><figure><img src="'+l+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure>',18)]))}const m=e(p,[["render",s],["__file","对象过期时间.html.vue"]]),u=JSON.parse('{"path":"/back-end/redis/Data-object/%E5%AF%B9%E8%B1%A1%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4.html","title":"Redis对象过期机制详解","lang":"zh-CN","frontmatter":{"title":"Redis对象过期机制详解","description":"详细介绍Redis对象的过期策略、淘汰机制及实现原理","date":"2024-01-01T00:00:00.000Z","category":["数据库","Redis"],"tag":["Redis","过期策略","内存管理","性能优化"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/redis/Data-object/%E5%AF%B9%E8%B1%A1%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"Redis对象过期机制详解"}],["meta",{"property":"og:description","content":"详细介绍Redis对象的过期策略、淘汰机制及实现原理"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"过期策略"}],["meta",{"property":"article:tag","content":"内存管理"}],["meta",{"property":"article:tag","content":"性能优化"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis对象过期机制详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":2.06,"words":619},"filePathRelative":"back-end/redis/Data-object/对象过期时间.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>对象过期时间</strong></p>\\n<p><strong>是什么</strong></p>\\n<p>redis 的过期时间是给一个 key 指定一个时间点，等达到这个时间，数据就被认为是过期数据，由 redis 进行回收</p>\\n<p><strong>为什么要过期</strong></p>\\n<ul>\\n<li>如果不是需要常驻的数据，设置过去时间可以有效节约内存。</li>\\n<li>有些场景也是需要过期时间支持：缓存</li>\\n<li>如果存在时间过久，可能导致和数据源差距过大，而设置过期时间，可以很方便清除缓存以便后续再次加载进去</li>\\n<li>比如分布式锁：需要一定时间后，数据自动消失，以实现最大占据时间的特性</li>\\n</ul>"}');export{m as comp,u as data};
