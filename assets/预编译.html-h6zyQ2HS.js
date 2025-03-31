import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as t,o as n}from"./app-DRR9Yo7Y.js";const e={};function l(h,i){return n(),a("div",null,i[0]||(i[0]=[t(`<p><strong>预编译</strong></p><p><strong>define宏定义</strong></p><p>被定义为&quot;宏&quot;的标识符称为&quot;宏名&quot;。在编译预处理时，对程序中所有出现的&quot;宏名&quot;，<strong>都用宏定义中的字符串去代换，这称为&quot;宏代换&quot;或&quot;宏展开&quot;</strong>。</p><p>优点：</p><p>(1) 方便程序的修改。这个就不多说了。</p><p>(2） 提高程序的运行效率。</p><p>使用带参数的宏定义可完成函数调用的功能，又能减少系统开销，提高运行效率。</p><p>正如C语言中所讲，函数的使用可以使程序更加模块化，便于组织，而且可重复利用，但在发生函数调用时，需要保留调用函数的现场，以便子函数执行结束后能返回继续执行，同样在子函数执行完后要恢复调用函数的现场，这都需要一定的时间</p><p>如果子函数执行的操作比较多，这种转换时间开销可以忽略，但如果子函数完成的功能比较少，甚至于只完成一点操作，如一个乘法语句的操作，则这部分转换开销就相对较大了，但使用带参数的宏定义就不会出现这个问题，因为它是在预处理阶段即进行了宏展开，在执行时不需要转换，即在当地执行。</p><p>宏定义可完成简单的操作，但复杂的操作还是要由函数调用来完成，而且宏定义所占用的目标代码空间相对较大。所以在使用时要依据具体情况来决定是否使用宏定义。</p><p><code></code><strong>带参宏和不带参宏</strong></p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//带参</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#define</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MAX</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) (a</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">b)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> b</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">a </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> a</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,b</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> c</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">MAX</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(a,b);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//不带参数</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#define</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> OK</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>#include 包含头文件</li></ol><p>预处理阶段进行的替换工作，将头文件.h中的内容替换到.c文件</p><p>#包含头文件就是为了将声明或者源代码替换到当前.c文件中</p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> #incldude</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">iostream</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">在预处理的时候，会先对#进行预处理，将</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">iostream</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">文件的代码替换掉 #incldude</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">iostream</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">这一行代码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">而iostream文件中有50000多行代码，所以预处理后的文件，会加上这5w行代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>#if和#endif 是否执行该代码段</li></ol><p>在预处理阶段进行</p><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//会执行</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#if</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#endif</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">/////////////////////////////////////////////////////////////////////</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//不会执行</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#if</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#endif</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ifndef防止头文件的重复包含和编译</strong></p><p>它是if not define 的简写，是宏定义的一种，实际上确切的说，这应该是预处理功能三种（宏定义、文件包含、条件编译）中的一种----条件编译。 <strong>条件指示符#ifndef 的最主要目的是防止头文件的重复包含和编译。</strong></p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#ifndef</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> x</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">                 //先测试x是否被宏定义过</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">#</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">define</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> x</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">   程序段1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   //如果x没有被宏定义过，定义x，并编译程序段 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#endif</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">   </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">　　程序段2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">　　 //如果x已经定义过了则编译程序段2的语句，&quot;忽视&quot;程序段 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22)]))}const r=s(e,[["render",l],["__file","预编译.html.vue"]]),d=JSON.parse('{"path":"/back-end/C__/%E9%A2%84%E7%BC%96%E8%AF%91.html","title":"C++预编译详解","lang":"zh-CN","frontmatter":{"title":"C++预编译详解","description":"详细介绍C++预编译过程、宏定义及头文件包含等预处理指令","date":"2024-01-01T00:00:00.000Z","category":["C++","编译原理"],"tag":["预编译","宏定义","C++","条件编译"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/C__/%E9%A2%84%E7%BC%96%E8%AF%91.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"C++预编译详解"}],["meta",{"property":"og:description","content":"详细介绍C++预编译过程、宏定义及头文件包含等预处理指令"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"预编译"}],["meta",{"property":"article:tag","content":"宏定义"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"条件编译"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C++预编译详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":2.82,"words":847},"filePathRelative":"back-end/C++/预编译.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>预编译</strong></p>\\n<p><strong>define宏定义</strong></p>\\n<p>被定义为\\"宏\\"的标识符称为\\"宏名\\"。在编译预处理时，对程序中所有出现的\\"宏名\\"，<strong>都用宏定义中的字符串去代换，这称为\\"宏代换\\"或\\"宏展开\\"</strong>。</p>\\n<p>优点：</p>\\n<p>(1) 方便程序的修改。这个就不多说了。</p>\\n<p>(2） 提高程序的运行效率。</p>\\n<p>使用带参数的宏定义可完成函数调用的功能，又能减少系统开销，提高运行效率。</p>\\n<p>正如C语言中所讲，函数的使用可以使程序更加模块化，便于组织，而且可重复利用，但在发生函数调用时，需要保留调用函数的现场，以便子函数执行结束后能返回继续执行，同样在子函数执行完后要恢复调用函数的现场，这都需要一定的时间</p>"}');export{r as comp,d as data};
