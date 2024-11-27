import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as d,a as c,d as n,e as l,o as r}from"./app-B26QzdMT.js";const i={};function g(t,o){return r(),d("div",null,[o[0]||(o[0]=c("p",null,"从理解 SQL 执行过程到理解MySQL 日志系统的工作过程。",-1)),n(" more "),o[1]||(o[1]=l('<h2 id="一、-一条-select-语句的执行过程" tabindex="-1"><a class="header-anchor" href="#一、-一条-select-语句的执行过程"><span>一、 一条 select 语句的执行过程</span></a></h2><p>一条查询语句执行的过程，属于<strong>读</strong>一条记录的过程，大致可以分为以下几个步骤：</p><ol><li><p><strong>建立客户端/服务器通信</strong>：</p><ul><li>客户端发起的连接请求，通过MySQL<code>连接器</code>处理后，客户端将SQL查询语句发送到服务器。</li></ul></li><li><p><strong>查询解析</strong>：</p><ul><li><strong>SQL解析器</strong>：<code>SQL解析器</code>首先会对查询语句进行语法和词法分析，生成一个解析树（Parse Tree）。</li><li><strong>预处理器</strong>：<code>预处理器</code>进一步检查解析树的合法性，包括表和列是否存在、名称是否正确等。</li></ul></li><li><p><strong>查询优化</strong>：</p><ul><li><strong>查询重写</strong>：<code>优化器</code>可能会对解析树进行重写，例如将子查询转换为连接（JOIN），或者进行某些常见的SQL重写优化。</li><li><strong>选择执行计划</strong>：<code>优化器</code>会生成多个执行计划，并选择其中的最优计划。这里会考虑索引的使用、表扫描的方式（全表扫描或索引扫描）等。</li><li><strong>成本估算</strong>：MySQL使用一种<code>基于成本的优化算法</code>，通过估算不同执行计划的代价，选择成本最低的计划。</li></ul></li><li><p><strong>查询执行</strong>：</p><ul><li><strong>存储引擎接口</strong>：MySQL的<code>执行器</code>根据优化器选择的执行计划，通过存储引擎接口调用具体的存储引擎（如InnoDB、MyISAM等）。</li><li><strong>存储引擎操作</strong>：存储引擎根据执行器的请求进行数据的读取、写入等操作。</li></ul></li><li><p><strong>结果返回</strong>：</p><ul><li><strong>结果集处理</strong>：执行器将存储引擎返回的数据进行处理，生成最终的<code>结果集</code>。</li><li><strong>结果发送</strong>：最终的结果集通过网络传输返回给客户端。</li></ul></li><li><p><strong>缓存处理（可选）</strong>：</p><ul><li><strong>查询缓存</strong>：如果查询缓存开启且命中缓存，MySQL会直接从缓存中返回结果，而不经过上述大部分步骤。需要注意的是，MySQL <strong>8.0 版本已移除查询缓存</strong>这一特性。</li></ul></li></ol><p>总结来说，MySQL一条查询语句的执行过程可以概括为：<code>客户端发送SQL语句 -&gt; 解析语句 -&gt; 优化查询 -&gt; 执行查询 -&gt; 返回结果</code>。每个步骤中都有许多细节和优化点，使得MySQL能够高效地处理各种查询请求。</p><p>引用小林图解的一张图： <img src="http://images.kryiea.cn/img/1717220312018.jpg" alt="1717220312018" loading="lazy"></p><h2 id="二、一条-update-语句的执行过程" tabindex="-1"><a class="header-anchor" href="#二、一条-update-语句的执行过程"><span>二、一条 update 语句的执行过程</span></a></h2><p><strong>比如这条待执行的 update 语句：</strong><code>UPDATE t_user SET name = &#39;kryiea&#39; WHERE id = 10086;</code></p><p><strong>待执行的语句执行过程：</strong></p><ol><li><code>select</code> 语句的那一套流程，<code>update</code> 语句也是同样会走一遍</li><li>查询到目标记录后，执行更新操作的同时会涉及对三种日志的改动，<code>undolog、redolog、binlog</code>。</li></ol><h2 id="三、三种日志、mvcc、bufferpool-之间的相互配合" tabindex="-1"><a class="header-anchor" href="#三、三种日志、mvcc、bufferpool-之间的相互配合"><span>三、三种日志、MVCC、BufferPool 之间的相互配合</span></a></h2><h3 id="_3-1-三种日志的主要作用" tabindex="-1"><a class="header-anchor" href="#_3-1-三种日志的主要作用"><span>3.1 三种日志的主要作用</span></a></h3><ul><li><strong>UndoLog 回滚日志：</strong> 是Innodb存储引擎层生成的日志，保证了事务中的原子性，主要用于事务回滚和MVCC。（撤销已经执行的修改，保证事务的原子性和一致性）</li><li><strong>RedoLog 重做日志：</strong> 是Innodb存储引擎层生成的日志，保证了事务中的持久性，主要用于掉电等故障恢复。（重做已经提交的修改，保证事务的持久性）</li><li><strong>BinLog 归档日志：</strong> 是 Server层 生成的日志，主要用于数据备份和主从复制。（记录和重放SQL语句，用于数据的复制和恢复）</li></ul><p><strong>⬇️辅助理解：</strong> InnoDB 存储引擎的日志：</p><ul><li>UndoLog 记录了此次事务 <code>开始前</code> 的数据状态，记录的是 <code>更新 之前 的值</code>；</li><li>RedoLog 记录了此次事务 <code>完成后</code> 的数据状态，记录的是 <code>更新 之后 的值</code>；</li></ul><p>Server 层的日志：</p><ul><li>BinLog 记录了完成一条更新操作后，Server 层还会生成一条 <code>binlog</code>，等之后事务提交的时候，会将该事物执行过程中产生的所有 <code>binlog</code> 统一写入 <code>binlog文件</code>。</li></ul><h3 id="_3-2-undolog-回滚日志" tabindex="-1"><a class="header-anchor" href="#_3-2-undolog-回滚日志"><span>3.2 UndoLog 回滚日志</span></a></h3><h4 id="_3-2-1-为什么需要-undolog" tabindex="-1"><a class="header-anchor" href="#_3-2-1-为什么需要-undolog"><span>3.2.1 为什么需要 UndoLog</span></a></h4><p><strong>先了解隐式事务：</strong> Innodb 引擎在执行一条<code>增删改</code>语句的时候，即使没有显式输入<code>begin开启事务</code>和<code>commit提交事务</code>，也会<strong>自动隐式开启事务</strong>。 而且执行一条 <code>update</code> 语句是否自动提交事务，是由 <code>autocommit</code> 参数决定，默认开启。</p><p><strong>试想以下场景：</strong> 在一个事务在执行过程中，在还没有提交事务之前，如果 MySQL 发生了崩溃，要怎么回滚到事务之前的数据呢？</p><p><strong>如何解决：</strong> 如果每次在事务执行过程中，都记录下回滚时需要的信息到一个日志（undolog）里，那么在事务执行中途发生了 MySQL 崩溃后，就不用担心无法回滚到事务之前的数据，我们可以通过这个日志回滚到事务之前的数据。</p><h4 id="_3-2-2-认识-undolog-机制" tabindex="-1"><a class="header-anchor" href="#_3-2-2-认识-undolog-机制"><span>3.2.2 认识 Undolog 机制</span></a></h4><p>在事务没提交之前，MySQL 会<code>先记录更新前的数据到 undolog日志文件</code>，当事务需要回滚时，可以利用 <code>undolog</code> 来进行回滚。</p><p>过程如下图: <img src="http://images.kryiea.cn/img/20240601142819.png" alt="20240601142819" loading="lazy"></p><h4 id="_3-2-3-undolog-如何记录和回滚" tabindex="-1"><a class="header-anchor" href="#_3-2-3-undolog-如何记录和回滚"><span>3.2.3 Undolog 如何记录和回滚</span></a></h4><p>每当 InnoDB 引擎对一条记录进行操作时，要把回滚时需要的信息都记录到 <code>undolog</code> 里，比如：</p><ol><li>在 <code>插入</code> 一条记录时，要把这条记录的<strong>主键值</strong>记下来，这样<code>回滚</code>时只需要把这个主键值对应的记录 <code>delete</code> 就好了；</li><li>在 <code>删除</code> 一条记录时，要把这条<strong>记录中的内容</strong>都记下来，这样<code>回滚</code>时再把由这些内容组成的记录 <code>insert</code> 到表中就好了；</li><li>在 <code>更新</code> 一条记录时，要把<strong>被更新的列的旧值</strong>记下来，这样<code>回滚</code>时再把这些列<code> update</code> 为旧值就好了。</li></ol><h4 id="_3-2-4-undolog-日志的格式" tabindex="-1"><a class="header-anchor" href="#_3-2-4-undolog-日志的格式"><span>3.2.4 Undolog 日志的格式</span></a></h4><p><strong>需要了解一条记录在innodb引擎中的存储格式。</strong></p><p>一条记录的每一次更新操作产生的 <code>undolog</code> 中，都有一个 <code>roll_pointer 指针</code>和一个 <code>trx_id 事务id</code>：</p><ul><li>通过 <code>trx_id</code> 可以知道该记录是被哪个事务修改的。</li><li>通过 <code>roll_pointer</code> 指针可以将这些 <code>undolog</code> 串成一个链表，这个链表就被称为<strong>版本链</strong>。</li></ul><p><strong>版本链如下图：</strong><img src="http://images.kryiea.cn/img/1.png" alt="1" loading="lazy"></p><h4 id="_3-2-5-undolog-readview-实现-mvcc" tabindex="-1"><a class="header-anchor" href="#_3-2-5-undolog-readview-实现-mvcc"><span>3.2.5 Undolog + ReadView 实现 MVCC</span></a></h4><p><strong>MVCC - Multi-version concurrency control</strong> 多版本并发控制（MVCC）是一种数据库管理技术，通过维护数据的多个版本来实现并发访问，从而提高读写操作的性能和一致性。</p><p><strong>并发访问的多个版本通过快照控制：</strong> 对于<code>读提交</code>和<code>可重复读</code>隔离级别的事务来说，它们的<code>快照读</code>（普通 <code>select</code> 语句）是通过 <code>ReadView + undolog</code> 来实现的。 <code>读提交</code> 和 <code>可重复读</code> 的 <code>快照读</code> 区别在于创建 ReadView 的时机不同：</p><ul><li><code>读提交隔离级别</code>：<strong>每次执行 select 都会生成一个新的 ReadView</strong>，也意味着，事务期间的多次读取同一条数据，前后两次读的数据可能会出现不一致，因为可能这期间另外一个事务修改了该记录，并提交了事务。</li><li><code>可重复读隔离级别</code>：在启动事务时生成一个 ReadView，然后<strong>整个事务期间都在用这个 ReadView</strong>，这样就保证了在事务期间读到的数据都是事务启动前的记录。</li></ul><p><strong>如何知道版本的可见性，参考 <code>3.2.6</code> ：</strong> 通过 <code>事务的 ReadView 里的字段 </code>和 <code>记录中的两个隐藏列 trx_id 和 roll_pointer</code> 的比对，如果不满足可见行，就会顺着 <code>undolog 版本链</code>里找到满足其可见性的记录，从而控制并发事务访问同一个记录时的行为，这就叫 MVCC（多版本并发控制）</p><h4 id="_3-2-6-readview-机制" tabindex="-1"><a class="header-anchor" href="#_3-2-6-readview-机制"><span>3.2.6 ReadView 机制</span></a></h4><p><strong>ReadView 的四个字段：</strong><img src="http://images.kryiea.cn/img/20240601154137.png" alt="20240601154137" loading="lazy"> ReadView 可以理解为记录<code>当前事务id</code>创建时，整个数据库还有哪些其他活着的事务，记录下来，以便于判断数据的可见性。</p><ul><li><code>creator_trx_id</code>：代表创建当前这个 ReadView 的事务ID。</li><li><code>m_ids</code>：表示在生成当前 ReadView 时，系统内活跃且未提交的事务ID列表。</li><li><code>min_trx_id</code>：活跃的事务列表中最小的事务ID。</li><li><code>max_trx_id</code>：表示在生成当前 ReadView 时，系统中要给下一个事务分配的ID值</li></ul><p><strong>如何判断可见性：</strong> 判定方法：<code>事务 readview 里的字段</code> 与 <code>记录中的两个隐藏列</code> 进行对比：</p><ul><li>如果<code>事务ReadView 中的 min_trx_id 值</code> <strong>&gt;=</strong> <code>记录的 trx_id 值</code>，表示这个版本的记录是在创建 ReadView 前 已经提交的事务生成的，所以该版本的记录对当前事务 <strong>可见</strong> 。</li><li>如果<code>事务ReadView 中的 max_trx_id 值</code> <strong>&lt;=</strong> <code>记录的 trx_id 值</code>，表示这个版本的记录是在创建 ReadView 后 才启动的事务生成的，所以该版本的记录对当前事务 <strong>不可见</strong> 。</li><li>如果 <code>事务ReadView 中的 min_trx_id</code> <strong>&lt;</strong> <code>记录的 trx_id 值</code> <strong>&lt;</strong> <code>事务ReadView 中的 max_trx_id</code>，需要判断 <code>trx_id</code> 是否在 <code>m_ids</code> 列表中： <ul><li>如果<code>记录的 trx_id</code> 在 <code>m_ids</code> 列表中，表示生成该版本记录的活跃事务依然活跃着（还没提交事务），所以该版本的记录对当前事务 <strong>不可见</strong> 。</li><li>如果<code>记录的 trx_id</code> 不在 <code>m_ids</code> 列表中，表示生成该版本记录的活跃事务已经被提交，所以该版本的记录对当前事务 <strong>可见</strong> 。</li></ul></li></ul><h4 id="_3-2-7-undolog-如何刷盘的" tabindex="-1"><a class="header-anchor" href="#_3-2-7-undolog-如何刷盘的"><span>3.2.7 UndoLog 如何刷盘的</span></a></h4><ul><li><code>Undolog</code> 和 <code>数据页</code> 的刷盘策略是一样的，都需要<strong>通过 Redolog 保证持久化</strong>。</li><li><code>Buffer pool</code> 中有 <code>Undo 页</code>，对 <code>Undo 页</code>的修改也都会<strong>记录到 Redolog</strong>。</li><li><code>Redolog</code> 会每秒刷盘，提交事务时也会刷盘，<code>数据页</code>和 <code>Undo 页</code>都是靠这个机制保证持久化的。</li></ul><h3 id="_3-3-buffer-pool-缓冲池" tabindex="-1"><a class="header-anchor" href="#_3-3-buffer-pool-缓冲池"><span>3.3 Buffer Pool 缓冲池</span></a></h3><h4 id="_3-3-1-buffer-pool-的意义" tabindex="-1"><a class="header-anchor" href="#_3-3-1-buffer-pool-的意义"><span>3.3.1 Buffer Pool 的意义</span></a></h4><p><strong>场景：</strong> MySQL 的数据都是存在磁盘中的，那么我们要更新一条记录的时候，得先要从磁盘读取该记录，然后在<strong>内存中</strong>修改这条记录。</p><p><strong>那修改完这条记录是选择直接写回到磁盘，还是选择缓存起来呢：</strong> 这也是<code> Buffer Pool</code> 的意义。 当然是缓存起来好，这样下次有查询语句命中了这条记录，直接读取缓存中的记录，就不需要从磁盘获取数据了。</p><p><strong>有了Buffer Pool后：</strong></p><ul><li>当读取数据时，如果数据存在于 <code>BufferPool</code> 中，客户端就会直接读取 <code>BufferPool</code> 中的数据，否则再去磁盘中读取。</li><li>当修改数据时，如果数据存在于 <code>Buffe Pool</code> 中，那直接修改 <code>BufferPool</code> 中数据所在的页，然后将其页设置为脏页（该页的内存数据和磁盘上的数据已经不一致），为了减少磁盘<code>I/O</code>，不会立即将脏页写入磁盘，后续由后台线程选择一个合适的时机将脏页写入到磁盘。</li></ul><p><strong>Buffer Pool 属于哪一层：</strong> 属于：Innodb引擎层。 区别：不是本文开头讨论 <code>select</code> 语句执行过程中提到的缓存，那个是在 server 层的。</p><h4 id="_3-3-2-buffer-pool-缓存什么" tabindex="-1"><a class="header-anchor" href="#_3-3-2-buffer-pool-缓存什么"><span>3.3.2 Buffer Pool 缓存什么</span></a></h4><p><strong>InnoDB中磁盘与内存的交互基本单位：</strong> InnoDB 会把存储的数据划分为若干个<code>页</code>，以<strong>页作为磁盘和内存交互的基本单位</strong>，一个页的默认大小为 <code>16KB</code>。因此，<code>BufferPool</code> 同样需要按页来划分，使用与存储引擎一样的基本单位。</p><p><strong>在 MySQL 启动的时候：</strong> InnoDB 会为 BufferPool 申请一片连续的内存空间，然后按照默认的 <code>16KB</code> 的大小划分出一个个的页， BufferPool 中的页就叫做<strong>缓存页</strong>。 此时这些缓存页都是空闲的，之后随着程序的运行，会有磁盘上的页被加载缓存到 BufferPool 中的缓存页。</p><p><strong>在 MySQL 启动完成的时候：</strong> 由于是先申请了一片连续的内存空间但没写入具体数据，所以可以观察到使用的虚拟内存空间很大，而使用到的物理内存空间却很小。 这是因为只有这些虚拟内存被访问后，操作系统才会触发<code>缺页中断</code>，申请物理内存，接着将虚拟地址和物理地址建立映射关系。</p><p><strong>BufferPool 可以缓存的数据类型：</strong><img src="http://images.kryiea.cn/img/mysql-BufferPool.drawio.png" alt="mysql-BufferPool.drawio" loading="lazy"></p><p><strong>Undo 页是记录什么的</strong> 开启事务后，InnoDB 会在<strong>更新记录之前</strong>，先记录相应操作的 <code>undolog</code> 来保证事务的<strong>原子性</strong>。</p><p>比如：如果是 <code>update</code> 操作，需要把被更新的列的旧值记下来，旧值作为一条 <code>undolog</code>，然后把这条 <code>undolog</code> 写入 <code>BufferPool</code> 中的 <code>Undo页</code></p><p><strong>查询一条记录，只需要缓存一条记录吗？</strong> 刚刚提到了 InnoDB 存储引擎以<code>16KB大小的页</code>作为磁盘与内存交互的基本单位，所以查询一条记录的时候，会将整个页加载进 BufferPool 中，再通过页的<code>页目录</code>去定位到某条具体的记录.</p><p><strong>上面提到的 页目录 是什么？</strong> 简单来说：<code>页目录</code>类似于<code>字典的目录</code>，用于快速定位某条记录的大致位置。</p><p>这个问题需要了解一个 <code>页</code> 内部是如何组织数据的。小林图解也有提到，这里附上一张更具体的图来辅助理解。</p><ul><li>一个页空间会被划分成许多部分，有：<code>文件头、页头、最大最小记录、用户记录、空闲空间、文件尾</code>等。</li><li>主要关注<code>用户记录</code>：存储的一行行记录会被存放在这里，记录还会进一步被分成一个个<code>组</code>，每一个组内部都有一些数据记录。</li><li>再看到左边的<code>页目录</code>：有一个个的<code>槽位</code>，其指向每一个分组内的最后一条记录。</li></ul><figure><img src="http://images.kryiea.cn/img/mysql-4.drawio.png" alt="mysql-4.drawio" tabindex="0" loading="lazy"><figcaption>mysql-4.drawio</figcaption></figure><h4 id="_3-3-3-buffer-pool-刷盘策略" tabindex="-1"><a class="header-anchor" href="#_3-3-3-buffer-pool-刷盘策略"><span>3.3.3 Buffer Pool 刷盘策略</span></a></h4><p><strong>深入学习文章推荐：</strong><a href="https://juejin.cn/post/7159071309354254373?searchId=202406022326056D88E4CF0875DE59F736#heading-7" target="_blank" rel="noopener noreferrer">(十二)MySQL之内存篇：深入探寻数据库内存与Buffer Pool的奥妙！ - 竹子爱熊猫</a></p><h3 id="_3-4-redolog-重做日志" tabindex="-1"><a class="header-anchor" href="#_3-4-redolog-重做日志"><span>3.4 RedoLog 重做日志</span></a></h3><h4 id="_3-4-1-为什么需要-redolog" tabindex="-1"><a class="header-anchor" href="#_3-4-1-为什么需要-redolog"><span>3.4.1 为什么需要 Redolog</span></a></h4><p><strong>试想以下场景：</strong> Buffer Pool 是基于内存的，而内存总是不可靠，万一断电重启，还没来得及落盘的脏页数据就会丢失。</p><p><strong>解决方案：</strong> 采用 <code>WAL (Write-Ahead Logging)</code> 技术。</p><ul><li>MySQL 的写操作并不是立刻写到磁盘上，而是先写日志文件，然后在合适的时间再将新的记录写到磁盘上。</li><li>在事务提交时，数据库系统只需确保 redolog 已经写入磁盘，而数据页可以稍后再写入。</li></ul><p><strong>解决方案的场景：</strong> 当有一条记录需要更新的时候，InnoDB 引擎会先更新 <code>Buffer Pool</code> 中的数据页，同时将该页标记为<code>脏页</code>。然后，将本次对<code>这个页修改后的数据状态</code>以 <code>redo log</code> 的形式记录下来并写入 <code>redo log</code> 文件，这时更新操作就算完成了。</p><p>到这里，只是完成了 <code>redo log</code> 文件的刷盘，但还未完成将<strong>最新的数据记录</strong>（脏的数据页）刷盘到存储表数据的文件 <code>xxx.ibd</code> 中。简而言之：日志文件是最新的，但数据库文件还不是最新的，还需要完成最后的 <code>Buffer Pool --&gt; 磁盘</code> 操作，才能完成持久化存储。</p><p>后续，InnoDB 引擎会在适当的时候，由<code>后台线程</code>将缓存在 <code>Buffer Pool</code> 的脏页刷新到磁盘里，这就是 WAL 的核心思想。</p><p><strong>图示，第4步的细节参考 <code>3.4.5</code>：</strong><img src="http://images.kryiea.cn/img/mysql-1WAL.drawio.png" alt="mysql-1WAL.drawio" loading="lazy"></p><h4 id="_3-4-2-认识-redolog-机制" tabindex="-1"><a class="header-anchor" href="#_3-4-2-认识-redolog-机制"><span>3.4.2 认识 Redolog 机制</span></a></h4><p>redolog 是物理日志，记录了某个数据页做了什么修改</p><p><strong>如何记录这个 “修改”：</strong> 格式：<code>AAA表空间 中的 BBB数据页 的 CCC偏移量 的地方做了 DDD的更新</code>，每当执行一个事务就会产生这样的一条或者多条物理日志。</p><p><strong>WAL：</strong> 在事务提交时，只要先将 redo log 持久化到磁盘即可，可以不需要等到将缓存在 Buffer Pool 里的脏页数据持久化到磁盘。</p><p><strong>如何保证事务的持久性：</strong> 当系统崩溃时，虽然脏页数据没有持久化，但是 redolog 已经持久化，MySQL 能在重启后根据 redolog 的日志内容，将所有数据恢复到最新的状态。</p><h4 id="_3-4-3-redolog-与-undolog-的配合" tabindex="-1"><a class="header-anchor" href="#_3-4-3-redolog-与-undolog-的配合"><span>3.4.3 Redolog 与 Undolog 的配合</span></a></h4><p><strong>配合场景：</strong> 开启事务后，InnoDB 在进行更新操作之前，首先会记录相应的 undolog。</p><p>如果是更新操作，InnoDB 需要将被更新的列的旧值记下来，也就是生成一条 undolog。这个 undolog 会被写入 Buffer Pool 中的 Undo 页面。 然后在 BufferPool 中完成数据页的更新，标记该页为脏页，并且记录对于的 redolog。</p><p><strong>具体的配合过程：</strong></p><ol><li><strong>记录 undolog：</strong></li></ol><ul><li>当事务对数据库中的记录进行更新时，InnoDB 会先生成一条 <code>undolog</code>，记录被修改前的数据。这个操作是为了保证在事务回滚时能够恢复到原始状态。</li><li>生成的 undolog 会被写入 BufferPool 中的 <code>Undo 页面</code>，并在内存中进行修改。</li></ul><ol start="2"><li><strong>记录 redolog：</strong></li></ol><ul><li>在内存中修改 <code>Undo 页面</code>后，InnoDB 还需要记录对应的 <code>redo log</code>。<code>redo log</code> 记录的是对数据页的物理修改操作，是用来在系统崩溃后进行数据恢复的。</li><li>具体来说，<code>redo log</code> 会记录对数据页的修改操作细节，包括何时修改、修改了哪些数据等。这些信息会先写入 <code>redolog buffer</code> 中，并在适当的时机（例如事务提交时）刷写到磁盘上的 <code>redo log</code> 文件中。</li></ul><p><strong>Redolog Buffer 与 Buffer Pool</strong> 不一样! Redolog Buffer 是 redolog 自己的缓存 具体细节往下看。</p><h4 id="_3-4-4-redolog与数据分开写入磁盘的必要性" tabindex="-1"><a class="header-anchor" href="#_3-4-4-redolog与数据分开写入磁盘的必要性"><span>3.4.4 Redolog与数据分开写入磁盘的必要性</span></a></h4><p><strong>能提高数据库的写性能：</strong></p><ul><li><strong>顺序写入：</strong><ul><li><code>redo log</code> 的写入是顺序写入，采用在文件尾部追加写入文件的方式，这样可以减少磁盘的寻道时间和旋转延迟，从而提高写入速度。</li><li>顺序写入的性能通常比随机写入高</li></ul></li><li><strong>随机写入：</strong><ul><li><code>数据页</code>的写入通常是随机写入。随机写入是指数据写入磁盘的不同位置，写入速度较慢。</li><li>通过将<code>数据页</code>首先写入缓冲池（Buffer Pool），然后在适当时机批量写入磁盘，可以减少随机写入的频率和次数。</li></ul></li></ul><h4 id="_3-4-5-redolog-的刷盘策略" tabindex="-1"><a class="header-anchor" href="#_3-4-5-redolog-的刷盘策略"><span>3.4.5 Redolog 的刷盘策略</span></a></h4><p>执行一个事务的过程中，产生的 <code>redo log</code> 也不是直接写入磁盘的，因为这样会产生大量的 <code>I/O</code> 操作，而且磁盘的运行速度远慢于内存。 所以，<code>redo log</code> 也有自己的缓存 <code>redo log buffer</code> ，每当产生一条 <code>redo log</code> 时，会先写入到 <code>redo log buffer</code>，后续再持久化到磁盘.</p><p><code>redo log buffer</code> 默认大小 <code>16 MB</code>，可以通过 <code>innodb_log_Buffer_size</code> 参数动态的调整大小，增大它的大小可以让 MySQL 处理大事务时不必写入磁盘（提高了写入磁盘的阈值），进而提升写 <code>IO</code> 性能。</p><p><code>redo log buffer</code> 的持久化如下图： <img src="http://images.kryiea.cn/img/20240602172013.png" alt="20240602172013" loading="lazy"></p><h4 id="_3-4-6-redolog-buffer-的刷盘时机" tabindex="-1"><a class="header-anchor" href="#_3-4-6-redolog-buffer-的刷盘时机"><span>3.4.6 redolog buffer 的刷盘时机：</span></a></h4><p><strong>主要的几个刷盘时机：</strong></p><ol><li>MySQL 正常关闭时。</li><li>当 <code>redo log buffer</code> 中记录的写入量<code>大于 redo log buffer 内存空间的一半</code>时，会触发落盘。</li><li>InnoDB 的<code>后台线程每隔 1 秒</code>，将 <code>redo log buffer</code> 持久化到磁盘。</li><li><code>每次事务提交时</code>都将缓存在 <code>redo log buffer</code> 里的 <code>redo log</code> 直接持久化到磁盘（这个策略可由 <code>innodb_flush_log_at_trx_commit</code> 参数控制）。</li></ol><p><strong>了解一个主要参数 <code>innodb_flush_log_at_trx_commit</code>:</strong></p><ul><li><code>innodb_flush_log_at_trx_commit = 0</code> 每次事务提交时 ，还是将 <code>redo log</code> 留在 <code>redo log buffer</code> 中 ，该模式下在事务提交时不会主动触发写入磁盘的操作。</li><li><code>innodb_flush_log_at_trx_commit = 1</code> 这是默认值。 每次事务提交时，都 将缓存在 <code>redo log buffer</code> 里的 <code>redo log</code> 直接持久化到磁盘 ，这样可以保证 MySQL 异常重启之后数据不会丢失。</li><li><code>innodb_flush_log_at_trx_commit = 2</code> 每次事务提交时，都只是缓存在 <code>redo log buffer</code> 里的 <code>redo log</code> 写到 <code>redo log 文件</code>，注意并不意味着写入到了磁盘 ，因为操作系统的文件系统中有个 <code>Page Cache</code>（Page Cache 是专门用来缓存文件数据的，所以写入 <code>redo log文件</code>意味着写入到了操作系统的文件缓存。</li></ul><h4 id="_3-4-7-redolog-日志重写" tabindex="-1"><a class="header-anchor" href="#_3-4-7-redolog-日志重写"><span>3.4.7 Redolog 日志重写</span></a></h4><p><strong>问题背景：</strong> redolog 文件写满了/文件过大怎么办？</p><p><strong>解决方案 - 日志重写：</strong> 默认情况下，InnoDB 存储引擎有 1 个<code>重做日志文件组 redo log Group</code>，由 2 个 <code>redolog 文件</code> 组成，分别是：<code>ib_logfile0</code> 和 <code>ib_logfile1</code>。</p><p><strong>日志重写方式：循环写</strong><code>重做日志文件组</code>是以 <code>循环写</code> 的方式工作的，从头开始写，写到末尾就又回到开头，相当于一个环形。 先写 <code>ib_logfile0</code> 文件，当 <code>ib_logfile0</code> 文件被写满的时候，会切换至 <code>ib_logfile1</code> 文件，当 <code>ib_logfile1</code> 文件也被写满时，会切换回 <code>ib_logfile0</code> 文件。</p><p>图示： <img src="http://images.kryiea.cn/img/20240602173429.png" alt="20240602173429" loading="lazy"></p><h3 id="_3-5-binlog-重做日志" tabindex="-1"><a class="header-anchor" href="#_3-5-binlog-重做日志"><span>3.5 BinLog 重做日志</span></a></h3><h4 id="_3-5-1-binlog-的作用" tabindex="-1"><a class="header-anchor" href="#_3-5-1-binlog-的作用"><span>3.5.1 Binlog 的作用</span></a></h4><ul><li>binlog 是 MySQL 的 Server 层实现的日志，所有存储引擎都可以使用，用于备份恢复、主从复制等；</li><li>binlog 文件是记录了<code>所有数据库表结构变更和表数据修改</code>的日志，<strong>不会记录查询类的操作</strong>，比如 <code>SELECT</code> 和 <code>SHOW</code> 操作。</li><li>binlog 是追加写，写满一个文件，就创建一个新的文件继续写，<strong>不会覆盖</strong>以前的日志，保存的是全量的日志。</li></ul><p><strong>产生 binlog 的场景：</strong> MySQL 在完成一条更新操作后，Server 层会生成一条 <code>binlog</code>，将其写到 <code>binlog cache</code>（Server 层的 cache），等之后<strong>事务提交的时候</strong>，会将该事务执行过程中产生的所有 <code>binlog</code> 统一写入 <code>binlog 文件</code>。</p><h4 id="_3-5-2-binlog-刷盘策略" tabindex="-1"><a class="header-anchor" href="#_3-5-2-binlog-刷盘策略"><span>3.5.2 Binlog 刷盘策略</span></a></h4><p><strong>MySQL 给每一个处理线程分配了一片内存用于缓冲 binlog，该内存叫 <code>binlog cache</code>。</strong></p><p>事务执行过程中，先把日志写到 <code>binlog cache</code>，事务提交的时候，再把 <code>binlog cache</code> 写到 <code>binlog 文件</code>中。</p><p><strong>关键点1：</strong> 一个事务的 <code>binlog</code> 是不能被拆开的，因此无论这个事务有多大（比如有很多条语句），也要保证一次性写入。</p><p>MySQL 设定一个处理线程只能同时有一个事务在执行，所以每当执行一个 <code>begin/start transaction</code> 的时候，就会默认提交上一个事务。</p><p><strong>关键点2：</strong> 场景：什么时候 <code>binlog cache</code> 会写到 <code>binlog 文件</code>？</p><p>回答：在<strong>事务提交的时候</strong>，执行器把 <code>binlog cache</code> 里的完整事务写入到 <code>binlog 文件</code>中，并<strong>清空</strong> <code>binlog cache</code>。</p><p><strong>关键点3：</strong> 每一个线程都有自己的<code>binlog cache</code>，最终写入<strong>同一个</strong><code>Binlog文件</code></p><p><strong>关键点4：</strong> 场景：如<code>关键点3</code>所提到的 最终写入同一个<code>Binlog文件</code>，那这里的并发问题如何解决？</p><p>回答：MySQL采用了多种机制来确保并发安全和一致性</p><ol><li>锁机制</li><li>顺序写入</li><li>组提交 Group Commit</li></ol><p><strong>关键点5：</strong> 场景：写入binlog文件的过程还可以继续拆分。</p><ul><li>系统调用 <code>write()</code>后，会先写入内核的缓冲区 <code>page cache</code>，这里不涉及磁盘<code>I/O</code></li><li>内核再通过 <code>fsync()</code> 持久化到磁盘，这里涉及磁盘<code>I/O</code>。频繁的 <code>fsync()</code> 会导致磁盘的<code>I/O</code> 升高。</li></ul><figure><img src="http://images.kryiea.cn/img/20240603001559.png" alt="20240603001559" tabindex="0" loading="lazy"><figcaption>20240603001559</figcaption></figure><p><strong>关键点6：</strong><code>fsync()</code> 的频率由参数 <code>sync_binlog</code> 控制</p><ul><li><code>sync_binlog = 0</code> 是默认值 表示每次提交事务都只 <code>write</code>，不 <code>fsync</code>，后续交由操作系统决定何时将数据持久化到磁盘。</li><li><code>sync_binlog = 1</code> 表示每次提交事务都会 <code>write</code>，然后马上执行 <code>fsync</code>，最多丢失一个事务的 <code>binlog</code>。</li><li><code>sync_binlog &gt; 1</code> 表示每次提交事务都 <code>write</code>，但累积 <code>N</code> 个事务后才 <code>fsync</code>。</li></ul><h4 id="_3-5-3-binlog-主从同步模型" tabindex="-1"><a class="header-anchor" href="#_3-5-3-binlog-主从同步模型"><span>3.5.3 Binlog - 主从同步模型</span></a></h4><p><strong>主从同步过程：</strong></p><ol><li><strong>写入 binlog：</strong> 主库修改数据后，写入 <code>binlog 日志</code>，提交事务，更新本地存储的数据。</li><li><strong>同步 binlog：</strong> 从库连接到主库后，主库会创建一个 <code>dump 线程</code>，把 <code>binlog</code> 同步到所有从库，每个从库把 <code>binlog</code> 写到暂存日志中。</li><li><strong>回放 binlog：</strong> 从库启动一个 <code>sql 线程</code>去回放 <code>binlog</code>，去读 <code>relay log 中继日志</code>然后回放 <code>binlog</code> 更新数据。 <img src="http://images.kryiea.cn/img/20240603002541.png" alt="20240603002541" loading="lazy"></li></ol><p><strong>三种主从同步模式：</strong> MySQL 默认的同步模式：异步模式</p><ul><li><strong>同步模式：</strong> 主库提交事务的线程要等待所有从库的同步成功，才返回客户端结果。性能最差了。</li><li><strong>异步模式：</strong> 主库提交事务的线程不会等待 binlog 同步完成就返回客户端结果，性能最好，但是主库宕机，数据就会丢失。</li><li><strong>半同步模式：</strong> 比如一主二从的集群，只要成功同步到一个从库，就立即返回数据给客户端。即使主库宕机，仍有一个从库有最新数据。</li></ul><h3 id="_3-6-两阶段提交" tabindex="-1"><a class="header-anchor" href="#_3-6-两阶段提交"><span>3.6 两阶段提交</span></a></h3><h4 id="_3-6-1-两阶段提交的提出" tabindex="-1"><a class="header-anchor" href="#_3-6-1-两阶段提交的提出"><span>3.6.1 两阶段提交的提出</span></a></h4><p><strong>思考以下问题：</strong> 事务提交后，<code>redo log</code> 和 <code>binlog</code> 都要持久化到磁盘，但是这两个是独立的逻辑，可能出现半成功的状态，这样就造成两份日志之间的逻辑不一致。</p><p><strong>问题的场景复现：</strong></p><p>原数据：表名 <code>t_user</code>，某行记录 <code>id = 1；name = jay</code> 执行SQL：<code>UPDATE t_user SET name = &#39;kryiea&#39; WHERE id = 1</code> 事务提交后：进行持久化 <code>redolog</code>和 <code>binlog</code>。</p><p>这两个日志的刷盘<strong>先后顺序</strong>可能会导致下面两种情况：</p><ul><li>如果在将 <code>redo log</code> 刷入到磁盘之后， MySQL 突然宕机了，而 <code>binlog</code> 还没有来得及写入。 <ul><li>MySQL 重启后，通过 <code>redo log</code> 能将 <code>Buffer Pool</code> 中 <code>id = 1</code> 这行数据的 <code>name</code> 字段恢复到新值 <code>kryiea</code>。</li><li>但是 <code>binlog</code> 里面没有记录这条更新语句，在主从架构中，<code>binlog</code> 会被复制到从库，由于 <code>binlog</code> 丢失了这条更新语句，从库的这一行 <code>name</code> 字段是旧值 <code>jay</code>，与主库的值不一致。</li></ul></li><li>如果在将 <code>binlog</code> 刷入到磁盘之后， MySQL 突然宕机了，而 <code>redo log</code> 还没有来得及写入 。 <ul><li>由于 <code>redo log</code> 还没写，崩溃恢复以后这个事务无效，所以 <code>id = 1</code> 这行数据的 <code>name</code> 字段还是旧值 <code>jay</code>。</li><li>而 <code>binlog</code> 里面记录了这条更新语句，在主从架构中，<code>binlog</code> 会被复制到从库，从库执行了这条更新语句，那么这一行 <code>name</code> 字段是新值 <code>kryiea</code>，与主库的值不一致。</li></ul></li></ul><p><strong>问题的解决方案：</strong> 两阶段提交</p><h4 id="_3-6-2-两阶段提交的概念" tabindex="-1"><a class="header-anchor" href="#_3-6-2-两阶段提交的概念"><span>3.6.2 两阶段提交的概念</span></a></h4><p>两阶段提交其实是分布式事务一致性协议，它可以保证多个逻辑操作要不全部成功，要不全部失败，不会出现半成功的状态。</p><p>两阶段提交把<strong>单个事务</strong>的提交拆分成了 2 个阶段，分别是<code>准备（Prepare）阶段</code>和<code>提交（Commit）阶段</code> ，每个阶段都由<code>协调者（Coordinator）</code>和<code>参与者（Participant）</code>共同完成。</p><p><strong>协调者与参与者之间的协作：</strong> 例子来自小林图解。</p><p>举个拳击比赛的例子，两位拳击手（参与者）开始比赛之前，裁判（协调者）会在中间确认两位拳击手的状态，类似于问你准备好了吗？</p><ul><li><strong>准备阶段 ：</strong> 裁判（协调者）会依次询问两位拳击手（参与者）是否准备好了，然后拳击手听到后做出应答，如果觉得自己准备好了，就会跟裁判说准备好了；如果没有自己还没有准备好（比如拳套还没有带好），就会跟裁判说还没准备好。</li><li><strong>提交阶段 ：</strong> 如果两位拳击手（参与者）都回答准备好了，裁判（协调者）宣布比赛正式开始，两位拳击手就可以直接开打；如果任何一位拳击手（参与者）回答没有准备好，裁判（协调者）会宣布比赛暂停，对应事务中的回滚操作。</li></ul><h4 id="_3-6-3-两阶段提交的过程" tabindex="-1"><a class="header-anchor" href="#_3-6-3-两阶段提交的过程"><span>3.6.3 两阶段提交的过程</span></a></h4><p>在 MySQL 的 InnoDB 存储引擎中，开启 <code>binlog</code> 的情况下，MySQL 会同时维护 <code>binlog</code>与 <code>redolog</code>，为了保证这两个日志的一致性，MySQL 事务提交时使用 <code>内部 XA 事务</code> 来保证一致性。</p><p><code>内部 XA 事务</code>由 <code>binlog 作为协调者</code>，<code>存储引擎是参与者</code>。</p><p>（是的，也有外部 XA 事务）</p><p>当客户端执行 <code>commit</code> 语句或者在<code>自动提交</code>的情况下，MySQL 内部开启一个<code> XA 事务</code>， 分两阶段来完成 <code>XA 事务</code>的提交 。</p><p><strong>场景举例：</strong> 事务的提交过程有两个阶段：将 <code>redolog</code> 的写入拆成了两个步骤 <code>prepare</code> 和 <code>commit</code>，中间再<strong>穿插</strong>写入 <code>binlog</code>。</p><p><strong>具体如下：</strong></p><ul><li><p><code>prepare 阶段</code> ：将 <code>XID（内部 XA 事务的 ID）</code> 写入到 <code>redo log</code>，同时将 <code>redo log</code> 对应的事务状态设置为 <code>prepare</code>，然后将 <code>redo log</code> 持久化到磁盘（<code>innodb_flush_log_at_trx_commit = 1</code> 的作用）</p></li><li><p><code>commit 阶段</code> ：把 <code>XID</code> 写入到 <code>binlog</code>，然后将 <code>binlog</code> 持久化到磁盘（<code>sync_binlog = 1</code> 的作用），接着调用引擎的提交事务接口，将 <code>redo log</code> 状态设置为 <code>commit</code>，此时该状态并不需要持久化到磁盘，只需要 <code>write</code> 到文件系统的 <code>page cache</code> 中就够了。因为只要 <code>binlog</code> 写磁盘成功，就算 <code>redo log</code> 的状态还是 <code>prepare</code> 也没有关系，一样会被认为<strong>事务已经执行成功</strong>；</p></li></ul><figure><img src="http://images.kryiea.cn/img/20240603005031.png" alt="20240603005031" tabindex="0" loading="lazy"><figcaption>20240603005031</figcaption></figure><h4 id="_3-6-4-两阶段提交有什么问题" tabindex="-1"><a class="header-anchor" href="#_3-6-4-两阶段提交有什么问题"><span>3.6.4 两阶段提交有什么问题</span></a></h4><p>两阶段提交虽然保证了两个日志文件的数据一致性，但是性能很差。</p><p><strong>主要有两个方面的影响：</strong></p><ul><li><strong>磁盘 I/O 次数高 ：</strong> 对于“双1”配置，每个事务提交都会进行两次 <code>fsync</code>（刷盘），一次是 <code>redo log 刷盘</code>，另一次是 <code>binlog 刷盘</code>。</li><li><strong>锁竞争激烈 ：</strong> 两阶段提交虽然能够保证<code>单事务</code>两个日志的内容一致，但在<code>多事务</code>的情况下，却<strong>不能保证两者的提交顺序一致</strong>，因此，在两阶段提交的流程基础上，还需要加一个<code>锁</code>来保证提交的原子性，从而保证多事务的情况下，两个日志的提交顺序一致。</li></ul><h4 id="_3-6-5-对两阶段提交加强-加入组提交" tabindex="-1"><a class="header-anchor" href="#_3-6-5-对两阶段提交加强-加入组提交"><span>3.6.5 对两阶段提交加强：加入组提交</span></a></h4><p>MySQL 引入了<code>组提交（group commit）</code>机制，当有<strong>多个事务提交</strong>的时候，会将多个 <code>binlog</code> 刷盘操作合并成<code>1</code>个，从而减少磁盘 <code>I/O</code> 的次数。</p><p>引入了组提交机制后，<code>prepare 阶段</code>不变，只针对 <code>commit 阶段</code>，将 <code>commit 阶段</code>拆分为<code>3</code>个过程： ● <strong>flush 阶段 ：</strong> 多个事务<strong>按进入的顺序</strong>将 <code>binlog</code> 从 <code>cache</code> 写入文件（不刷盘）； ● <strong>sync 阶段 ：</strong> 对 <code>binlog</code> 文件做 <code>fsync</code> 操作（多个事务的 <code>binlog</code> 合并一次刷盘）； ● <strong>commit 阶段 ：</strong> 各个事务<strong>按顺序</strong>做 <code>InnoDB commit 操作</code>；</p><figure><img src="http://images.kryiea.cn/img/20240603010701.png" alt="20240603010701" tabindex="0" loading="lazy"><figcaption>20240603010701</figcaption></figure>',161))])}const p=e(i,[["render",g],["__file","loging.html.vue"]]),h=JSON.parse('{"path":"/back-end/mysql/loging.html","title":"MySQL 的日志系统","lang":"zh-CN","frontmatter":{"title":"MySQL 的日志系统","cover":null,"icon":"file","order":1,"author":null,"date":"2024-11-23T00:00:00.000Z","category":["mysql"],"tag":["MVCC","日志"],"sticky":false,"star":null,"footer":null,"copyright":null,"description":"从理解 SQL 执行过程到理解MySQL 日志系统的工作过程。","head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/mysql/loging.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"MySQL 的日志系统"}],["meta",{"property":"og:description","content":"从理解 SQL 执行过程到理解MySQL 日志系统的工作过程。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://images.kryiea.cn/img/1717220312018.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-27T19:15:30.000Z"}],["meta",{"property":"article:tag","content":"MVCC"}],["meta",{"property":"article:tag","content":"日志"}],["meta",{"property":"article:published_time","content":"2024-11-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-27T19:15:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 的日志系统\\",\\"image\\":[\\"http://images.kryiea.cn/img/1717220312018.jpg\\",\\"http://images.kryiea.cn/img/20240601142819.png\\",\\"http://images.kryiea.cn/img/1.png\\",\\"http://images.kryiea.cn/img/20240601154137.png\\",\\"http://images.kryiea.cn/img/mysql-BufferPool.drawio.png\\",\\"http://images.kryiea.cn/img/mysql-4.drawio.png\\",\\"http://images.kryiea.cn/img/mysql-1WAL.drawio.png\\",\\"http://images.kryiea.cn/img/20240602172013.png\\",\\"http://images.kryiea.cn/img/20240602173429.png\\",\\"http://images.kryiea.cn/img/20240603001559.png\\",\\"http://images.kryiea.cn/img/20240603002541.png\\",\\"http://images.kryiea.cn/img/20240603005031.png\\",\\"http://images.kryiea.cn/img/20240603010701.png\\"],\\"datePublished\\":\\"2024-11-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-27T19:15:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"一、 一条 select 语句的执行过程","slug":"一、-一条-select-语句的执行过程","link":"#一、-一条-select-语句的执行过程","children":[]},{"level":2,"title":"二、一条 update 语句的执行过程","slug":"二、一条-update-语句的执行过程","link":"#二、一条-update-语句的执行过程","children":[]},{"level":2,"title":"三、三种日志、MVCC、BufferPool 之间的相互配合","slug":"三、三种日志、mvcc、bufferpool-之间的相互配合","link":"#三、三种日志、mvcc、bufferpool-之间的相互配合","children":[{"level":3,"title":"3.1 三种日志的主要作用","slug":"_3-1-三种日志的主要作用","link":"#_3-1-三种日志的主要作用","children":[]},{"level":3,"title":"3.2 UndoLog 回滚日志","slug":"_3-2-undolog-回滚日志","link":"#_3-2-undolog-回滚日志","children":[]},{"level":3,"title":"3.3 Buffer Pool 缓冲池","slug":"_3-3-buffer-pool-缓冲池","link":"#_3-3-buffer-pool-缓冲池","children":[]},{"level":3,"title":"3.4 RedoLog 重做日志","slug":"_3-4-redolog-重做日志","link":"#_3-4-redolog-重做日志","children":[]},{"level":3,"title":"3.5 BinLog 重做日志","slug":"_3-5-binlog-重做日志","link":"#_3-5-binlog-重做日志","children":[]},{"level":3,"title":"3.6 两阶段提交","slug":"_3-6-两阶段提交","link":"#_3-6-两阶段提交","children":[]}]}],"git":{"createdTime":1732734930000,"updatedTime":1732734930000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":26.18,"words":7854},"filePathRelative":"back-end/mysql/loging.md","localizedDate":"2024年11月23日","excerpt":"<p>从理解 SQL 执行过程到理解MySQL 日志系统的工作过程。</p>\\n","autoDesc":true}');export{p as comp,h as data};
