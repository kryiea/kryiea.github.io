import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a,d as o,e as n,o as r}from"./app-B26QzdMT.js";const l={};function g(p,e){return r(),i("div",null,[e[0]||(e[0]=a("p",null,"GMP模型是 Go 语言运行时的核心组成部分，它负责管理 Go 程序的并发执行。",-1)),o(" more "),e[1]||(e[1]=n('<h2 id="一、go-的协程-goroutine" tabindex="-1"><a class="header-anchor" href="#一、go-的协程-goroutine"><span>一、Go 的协程 - goroutine</span></a></h2><ul><li>Go 中，协程被称为 goroutine，它非常轻量，一个 goroutine 只占几 KB，并且这几 KB 就足够 goroutine 运行完，这就能在有限的内存空间内支持大量 goroutine，支持了更多的并发。</li><li>虽然一个 goroutine 的栈只占几 KB，但实际是可伸缩的，如果需要更多内容，runtime 会自动为 goroutine 分配。</li><li>goroutine 来自协程的概念，让一组可复用的函数运行在一组线程之上，即使有协程阻塞，该线程的其他协程也可以被 runtime 调度，转移到其他可运行的线程上。</li><li>最关键的是，程序员看不到这些底层的细节，这就降低了编程的难度，提供了更容易的并发。</li></ul><h2 id="二、旧-gm模型" tabindex="-1"><a class="header-anchor" href="#二、旧-gm模型"><span>二、旧：GM模型</span></a></h2><h3 id="_2-1-gm符号概念" tabindex="-1"><a class="header-anchor" href="#_2-1-gm符号概念"><span>2.1 GM符号概念</span></a></h3><figure><img src="http://images.kryiea.cn/img/20240131144616.png" alt="20240131144616" tabindex="0" loading="lazy"><figcaption>20240131144616</figcaption></figure><h3 id="_2-2-废弃的调度器模型-gm-是如何实现的" tabindex="-1"><a class="header-anchor" href="#_2-2-废弃的调度器模型-gm-是如何实现的"><span>2.2 废弃的调度器模型 GM 是如何实现的</span></a></h3><p><img src="http://images.kryiea.cn/img/20240131144658.png" alt="20240131144658" loading="lazy"> M 想要执行、放回 G 都必须访问全局 G 队列，并且 M 有多个，即多线程访问同一资源需要加锁进行保证互斥 / 同步，所以全局 G 队列是有互斥锁进行保护的。</p><blockquote><p>老调度器有几个缺点</p></blockquote><ol><li>创建、销毁、调度 G 都需要每个 M 获取锁，这就形成了激烈的锁竞争。</li><li>M 转移 G 会造成延迟和额外的系统负载。 比如当 G 中包含创建新协程的时候，M 创建了 G’，为了继续执行 G，需要把 G’交给 M’执行，也造成了很差的局部性，因为 G’和 G 是相关的，最好放在 M 上执行，而不是其他 M’。</li><li>系统调用 (CPU 在 M 之间的切换) 导致频繁的线程阻塞和取消阻塞操作增加了系统开销。</li></ol><h2 id="三、新-gmp模型" tabindex="-1"><a class="header-anchor" href="#三、新-gmp模型"><span>三、新：GMP模型</span></a></h2><h3 id="_3-1-gmp符号定义" tabindex="-1"><a class="header-anchor" href="#_3-1-gmp符号定义"><span>3.1 GMP符号定义</span></a></h3><figure><img src="http://images.kryiea.cn/img/20240131144909.png" alt="20240131144909" tabindex="0" loading="lazy"><figcaption>20240131144909</figcaption></figure><h3 id="_3-2-gmp-模型" tabindex="-1"><a class="header-anchor" href="#_3-2-gmp-模型"><span>3.2 GMP 模型</span></a></h3><p>在 Go 中，线程是运行 goroutine 的实体，调度器的功能是把可运行的 goroutine 分配到工作线程上 <img src="http://images.kryiea.cn/img/20240131144952.png" alt="20240131144952" loading="lazy"></p>',14))])}const s=t(l,[["render",g],["__file","gmp.html.vue"]]),d=JSON.parse('{"path":"/back-end/go/GMP/gmp.html","title":"GMP模型","lang":"zh-CN","frontmatter":{"title":"GMP模型","cover":null,"icon":"file","order":1,"author":"kryiea","date":"2024-11-27T00:00:00.000Z","category":["Go"],"tag":["GMP","Go"],"sticky":false,"star":null,"footer":null,"copyright":null,"description":"GMP模型是 Go 语言运行时的核心组成部分，它负责管理 Go 程序的并发执行。","head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/go/GMP/gmp.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"GMP模型"}],["meta",{"property":"og:description","content":"GMP模型是 Go 语言运行时的核心组成部分，它负责管理 Go 程序的并发执行。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://images.kryiea.cn/img/20240131144616.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-27T19:15:30.000Z"}],["meta",{"property":"article:author","content":"kryiea"}],["meta",{"property":"article:tag","content":"GMP"}],["meta",{"property":"article:tag","content":"Go"}],["meta",{"property":"article:published_time","content":"2024-11-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-27T19:15:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GMP模型\\",\\"image\\":[\\"http://images.kryiea.cn/img/20240131144616.png\\",\\"http://images.kryiea.cn/img/20240131144658.png\\",\\"http://images.kryiea.cn/img/20240131144909.png\\",\\"http://images.kryiea.cn/img/20240131144952.png\\"],\\"datePublished\\":\\"2024-11-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-27T19:15:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\"}]}"]]},"headers":[{"level":2,"title":"一、Go 的协程 - goroutine","slug":"一、go-的协程-goroutine","link":"#一、go-的协程-goroutine","children":[]},{"level":2,"title":"二、旧：GM模型","slug":"二、旧-gm模型","link":"#二、旧-gm模型","children":[{"level":3,"title":"2.1 GM符号概念","slug":"_2-1-gm符号概念","link":"#_2-1-gm符号概念","children":[]},{"level":3,"title":"2.2 废弃的调度器模型 GM 是如何实现的","slug":"_2-2-废弃的调度器模型-gm-是如何实现的","link":"#_2-2-废弃的调度器模型-gm-是如何实现的","children":[]}]},{"level":2,"title":"三、新：GMP模型","slug":"三、新-gmp模型","link":"#三、新-gmp模型","children":[{"level":3,"title":"3.1 GMP符号定义","slug":"_3-1-gmp符号定义","link":"#_3-1-gmp符号定义","children":[]},{"level":3,"title":"3.2 GMP 模型","slug":"_3-2-gmp-模型","link":"#_3-2-gmp-模型","children":[]}]}],"git":{"createdTime":1732734930000,"updatedTime":1732734930000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":2.22,"words":667},"filePathRelative":"back-end/go/GMP/gmp.md","localizedDate":"2024年11月27日","excerpt":"<p>GMP模型是 Go 语言运行时的核心组成部分，它负责管理 Go 程序的并发执行。</p>\\n","autoDesc":true}');export{s as comp,d as data};
