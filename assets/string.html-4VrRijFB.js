import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as l,o as r}from"./app-DRR9Yo7Y.js";const n="/assets/string.001-DUW9q392.png",s="/assets/string.002-6T6Rb_lV.png",o="/assets/string.003-DeU_07PG.png",p="/assets/string.004-XE4ablJb.png",a="/assets/string.005-CC3tZHZy.png",g="/assets/string.006-CaZhJ26w.png",c={};function d(m,t){return r(),e("div",null,t[0]||(t[0]=[l('<p><strong>string</strong></p><p><strong>string</strong></p><p>string 是最基本的 k-v 结构，key 是唯一表示，value 是具体的值。</p><ul><li>value 可以是字符串或数字（整数、浮点数）</li><li>value 最多可以容纳的数据长度是 512M</li><li>可以通过配置项修改proto-max-bulk-len</li></ul><p><strong>常用操作</strong></p><p>常用操作聚集在 创建、查询、更新、删除</p><figure><img src="'+n+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>set</strong></p><p>语法：set key value</p><p>扩展参数：</p><ol><li>EX</li><li>PX</li><li>NX</li><li>XX</li></ol><p><strong>setnx</strong></p><p>语法：setnx key value</p><p>功能：用于在指定的 key 不存在时，为 key 设置指定的的值，返回值 0 表示存在，1 表示设置成功</p><figure><img src="'+s+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>del</strong></p><p>语法：del key</p><p>返回值：成功删除了几行</p><p><strong>内部实现</strong></p><p>底层数据结构主要是 int 和 SDS（简单动态字符串）</p><p><strong>SDS</strong></p><ul><li>SDS 不仅可以保存文本数据，还可以保存二进制数据。</li><li>SDS使用len属性的值，而不是空字符来判断字符串是否结束，并且 SDS 的所有 API 都会以处理二进制的方式来处理 SDS 存放在buf[]数组里的数据。</li><li>因此 SDS 可以处理文本数据，保存图片，音频、视频、压缩文件等二进制数据</li><li>SDS 获取字符长度的时间复杂度是 O1。因为有 len</li><li>reids 的 SDS API 是安全的，拼接字符串不会造成缓冲区溢出。因为再拼接时会检查 SDS 空间是否满足要求，如果不够会自动扩容，不会导致溢出问题</li></ul><p>sds 种类</p><ul><li>redis 中 sds 分为：sdshdr8、sdshdr16、sdshdr32、sdshdr64，他们的字段属性是一样的，区别在于对应不同大小的字符串。</li><li>8、16、32、64 是指字段 len 的位数</li></ul><p>以 sdshdr8 为例</p><figure><img src="'+o+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><ul><li>len：表示用了多少</li><li>alloc：表示一共分配了多少内存</li><li>alloc - len ：两个字段差就是预留空间的大小。</li><li>flags：标记是哪个分类，比如 sdshdr8 就是 #define_SDS_TYPE_8 1</li><li>buf：数据</li></ul><p>SDS 对 c 字符串的改进</p><ol><li><code></code>增加长度字段 len，快速返回长度</li><li>增加空余空间（alloc-len），为后续追加数据留余地</li><li>不再以&#39;\\0&#39;作为结束判断标准，二进制安全</li></ol><p>SDS 可以预留空间，那么预留的空间有多大呢。</p><ol><li>len 小于 1M 的情况下，则会额外预留1 倍 len 的空间</li><li>len 大于 1M 的情况下，则会额外预留1MB的空间</li><li>简单来说范围 min（len，1M）</li></ol><p><strong>字符串对象的内部编码</strong></p><p>有 3 种：int、raw、embstr</p><p>保存一个 int，内部：</p><figure><img src="'+p+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p>保存一个字符串，分 2 种情况：字符串是否大于 32 字节（不同的 redis 版本不一样）</p><ul><li>小于等于 32 字节，encoding 使用 embstr</li></ul><figure><img src="'+a+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><ul><li>大于 32 字节，encoding 使用 raw</li></ul><figure><img src="'+g+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p>raw 和 embstr 的边界</p><ul><li>redis 2.+ 是 32 字节</li><li>redis 3.0-4.0 是 39 字节</li><li>redis 5.0 是 44 字节</li></ul><p>raw 和 embstr 的区别</p><ol><li>embstr 会通过一次内存分配来分配一块连续的内存空间来保存redisObject和SDS</li></ol><p>embstr编码将创建字符串对象所需的内存分配次数从 raw 编码的两次降低为一次；</p><p>释放 embstr编码的字符串对象同样只需要调用一次内存释放函数；</p><p>因为embstr编码的字符串对象的所有数据都保存在一块连续的内存里面可以更好的利用 CPU 缓存提升性能。</p><p>缺点：如果字符串的长度增加需要重新分别内存，整个 redisObject 和 sds 需要重新分配空间，所以 embstr 编码的字符串对象实际上时只读的</p><ol><li>当我们要对 embstr 编码的字符串执行任何修改指令，redis 会先将对象的编码从 embstr 转换成 raw，再执行修改</li></ol><p>注意</p><ol><li>embstr 中只会使用 sdshdr8，原因考虑阈值，并且字段 alloc 会被显式设置为 0</li><li>raw 中会出现 sdshdr8-64，都有可能</li></ol><p><strong>为什么需要 SDS</strong></p><p>c 语言中，&quot;hello&quot; 即&quot;hello\\0&quot;</p><p>不好的地方</p><ol><li>计算字符串长度为 On</li><li>追加字符串需要重新分配内存</li><li>非二进制安全：这里是指能兼容&#39;\\0&#39;这种特殊字符，公平对待每一个字符，不特殊处理任何一个字符，包括特殊字符</li></ol><p><strong>应用场景</strong></p><p><strong>缓存对象</strong></p><ul><li>直接缓存整个 json</li><li>采用将 key 进行分离为 user:ID:属性，采用 MSET 存储，用 MGET 获取各属性值，命令例子： MSET user:1:name xiaolin user:1:age 18 user:2:name xiaomei user:2:age 20</li></ul><p><strong>常规计数</strong></p><p>redis 处理命令是单线程的，所以执行命令的过程是原子的。</p><p>因此 string 适合计数场景</p>',61)]))}const S=i(c,[["render",d],["__file","string.html.vue"]]),y=JSON.parse('{"path":"/back-end/redis/Data-object/string.html","title":"Redis String类型详解","lang":"zh-CN","frontmatter":{"title":"Redis String类型详解","description":"详细介绍Redis String类型的实现原理、使用方法及应用场景","date":"2024-01-01T00:00:00.000Z","category":["数据库","Redis"],"tag":["Redis","数据类型","String","数据结构"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/redis/Data-object/string.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"Redis String类型详解"}],["meta",{"property":"og:description","content":"详细介绍Redis String类型的实现原理、使用方法及应用场景"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"数据类型"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis String类型详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":4.09,"words":1228},"filePathRelative":"back-end/redis/Data-object/string.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>string</strong></p>\\n<p><strong>string</strong></p>\\n<p>string 是最基本的 k-v 结构，key 是唯一表示，value 是具体的值。</p>\\n<ul>\\n<li>value 可以是字符串或数字（整数、浮点数）</li>\\n<li>value 最多可以容纳的数据长度是 512M</li>\\n<li>可以通过配置项修改proto-max-bulk-len</li>\\n</ul>\\n<p><strong>常用操作</strong></p>\\n<p>常用操作聚集在 创建、查询、更新、删除</p>\\n<figure><figcaption>...</figcaption></figure>"}');export{S as comp,y as data};
