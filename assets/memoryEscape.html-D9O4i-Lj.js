import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as n,d as l,e,o as h}from"./app-B26QzdMT.js";const t={};function k(p,i){return h(),a("div",null,[i[0]||(i[0]=n("p",null,"Go语言内存逃逸的场景",-1)),l(" more "),i[1]||(i[1]=e(`<h1 id="_1-逃逸是什么" tabindex="-1"><a class="header-anchor" href="#_1-逃逸是什么"><span>1. 逃逸是什么</span></a></h1><p><strong>编译器用于决定变量分配到堆上还是栈上的一种行为</strong></p><blockquote><p><strong>发生逃逸的时机</strong></p></blockquote><ul><li>**首先：**函数运行在栈上，在栈里声明临时变量分配内存， 函数运行完毕后回收内存。每个函数的栈空间都是独立的，其他函数不能进行访问。</li><li>**发生内存逃逸：**在某些情况下，栈上的数据需要在函数结束之后还能被访问，这时会发生内存逃逸：</li><li><strong>如果变量从栈上逃逸，会跑到堆上：</strong><ul><li>栈上面的变量在函数结束的时候会自动回收，回收代价比较小。而且栈内存的分配和释放，只需要两个CPU指令<code>PUSH</code>和<code>RELEASE</code>。</li><li>堆分配内存，需要先找到一块大小合适的内存，之后通过GC回收才能释放，如果频繁进行，占用比较大的系统开销</li></ul></li><li>**所以：**尽量在栈上分配内存，可以减少gc压力，提高程序运行速度</li></ul><h1 id="_2-逃逸过程" tabindex="-1"><a class="header-anchor" href="#_2-逃逸过程"><span>2. 逃逸过程</span></a></h1><ul><li>如果函数外部没有引用，则优先放到栈中；</li><li>如果函数外部存在引用，则必定放到堆中；</li></ul><blockquote><p><strong>最基本的逃逸分析原则</strong></p></blockquote><ul><li>如果一个函数返回了一个变量的引用，那它系一定发生逃逸，逃到堆上。</li><li>编译器会分析代码的特征和生命周期，Go的变量如果能在编译器编译过程中证明确认在函数返回后不会再被引用，才会分配到栈上。其他情况都是分配到堆上。</li><li>Go中没有一个关键字或者函数可以让变量被编译器分配到堆上，只能是编译器来分析代码确定 <img src="http://images.kryiea.cn/img/20240115164340.png" alt="20240115164340" loading="lazy"></li></ul><h1 id="_3-逃逸情景" tabindex="-1"><a class="header-anchor" href="#_3-逃逸情景"><span>3. 逃逸情景</span></a></h1><ul><li>**指针逃逸：**在函数内部返回一个局部变量指针</li><li>**分配大对象：**导致栈空间不足，不得不分配到堆上</li><li>**调用接口类型的方法：**接口类型的方法调用是动态调度（实际使用的具体实现只能在运行时确定）。</li><li>尽管在能符合分配到栈的场景，但是它的大小不能在编译时确定的情况，也会分配到堆上</li></ul><h2 id="_3-1-指针逃逸" tabindex="-1"><a class="header-anchor" href="#_3-1-指针逃逸"><span>3.1 指针逃逸</span></a></h2><ul><li>传递指针可以减少底层值拷贝，提高效率。</li><li>但是如果拷贝的数据量小，由于指针传递会逃逸（发生了函数外引用），可能会使用到堆，这样子会增加GC的负担，所以传递指针不一定是高效的</li><li>使用命令：<code>go build -gcflags &#39;-m&#39; xxx.go</code><img src="http://images.kryiea.cn/img/20240115164357.png" alt="20240115164357" loading="lazy"></li></ul><blockquote><p><strong>例子</strong></p></blockquote><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">type</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Student</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> struct</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    Name</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> string</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    Age</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  int</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> StudentRegister</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">name</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">age</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Student</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // s 原本是局部指针变量，被返回了引用，逃逸到了堆</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    s</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Student</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Age</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> age</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Name</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> name</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> s</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ss</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> StudentRegister</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;kryiea&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">20</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">ss</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-栈空间不足逃逸" tabindex="-1"><a class="header-anchor" href="#_3-2-栈空间不足逃逸"><span>3.2 栈空间不足逃逸</span></a></h2><blockquote><p><strong>栈空间足够时，没有逃逸</strong></p></blockquote><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MakeSlice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    s</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> make</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([]</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">_</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> range</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> index</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    MakeSlice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>容量增大后，发生逃逸</strong></p></blockquote><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MakeSlice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    s</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> make</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([]</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">_</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> range</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> index</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    MakeSlice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://images.kryiea.cn/img/20240115164413.png" alt="20240115164413" tabindex="0" loading="lazy"><figcaption>20240115164413</figcaption></figure><h2 id="_3-3-动态类型逃逸" tabindex="-1"><a class="header-anchor" href="#_3-3-动态类型逃逸"><span>3.3 动态类型逃逸</span></a></h2><blockquote><p><strong>函数参数为<code>interface</code>，在编译期间很难确定参数具体类型，也能产生逃逸</strong></p></blockquote><figure><img src="http://images.kryiea.cn/img/20240115164427.png" alt="20240115164427" tabindex="0" loading="lazy"><figcaption>20240115164427</figcaption></figure><h2 id="_3-3-变量大小不确定" tabindex="-1"><a class="header-anchor" href="#_3-3-变量大小不确定"><span>3.3 变量大小不确定</span></a></h2><p>在创建切片的时候，初始化切片容量的时候，传入一个变量来指定其大小，由于变量的值不能在编译器确定，所以就不能确定其内存大小，会将对象分配在堆上</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    package</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MakeSlice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        length</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        a</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> make</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([]</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        for</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> i</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">            a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> i</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        MakeSlice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-避免逃逸" tabindex="-1"><a class="header-anchor" href="#_4-避免逃逸"><span>4. 避免逃逸</span></a></h1><ol><li>对于性能要求高且访问频次高的函数调用，应该尽量避免使用接口类型。因为go中接口类型的方法调用都是动态，不能再编译阶段确定</li><li>避免变量大小不能确定的时候</li></ol><h1 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h1><ol><li>不要盲目使用变量的指针作为函数参数，虽然它会减少复制操作。</li><li>但其实当参数为变量自身的时候，复制是在栈上完成的操作，开销远比变量逃逸后动态地在堆上分配内存少的多。</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,31))])}const g=s(t,[["render",k],["__file","memoryEscape.html.vue"]]),c=JSON.parse('{"path":"/back-end/go/feature/memoryEscape.html","title":"内存逃逸","lang":"zh-CN","frontmatter":{"title":"内存逃逸","cover":null,"icon":"file","order":2,"author":"kryiea","date":"2024-11-27T00:00:00.000Z","category":["Go"],"sticky":false,"star":null,"footer":null,"copyright":null,"description":"Go语言内存逃逸的场景","head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/go/feature/memoryEscape.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"内存逃逸"}],["meta",{"property":"og:description","content":"Go语言内存逃逸的场景"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://images.kryiea.cn/img/20240115164340.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-27T19:15:30.000Z"}],["meta",{"property":"article:author","content":"kryiea"}],["meta",{"property":"article:published_time","content":"2024-11-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-27T19:15:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内存逃逸\\",\\"image\\":[\\"http://images.kryiea.cn/img/20240115164340.png\\",\\"http://images.kryiea.cn/img/20240115164357.png\\",\\"http://images.kryiea.cn/img/20240115164413.png\\",\\"http://images.kryiea.cn/img/20240115164427.png\\"],\\"datePublished\\":\\"2024-11-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-27T19:15:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\"}]}"]]},"headers":[{"level":2,"title":"3.1 指针逃逸","slug":"_3-1-指针逃逸","link":"#_3-1-指针逃逸","children":[]},{"level":2,"title":"3.2 栈空间不足逃逸","slug":"_3-2-栈空间不足逃逸","link":"#_3-2-栈空间不足逃逸","children":[]},{"level":2,"title":"3.3 动态类型逃逸","slug":"_3-3-动态类型逃逸","link":"#_3-3-动态类型逃逸","children":[]},{"level":2,"title":"3.3 变量大小不确定","slug":"_3-3-变量大小不确定","link":"#_3-3-变量大小不确定","children":[]}],"git":{"createdTime":1732734930000,"updatedTime":1732734930000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":4.09,"words":1226},"filePathRelative":"back-end/go/feature/memoryEscape.md","localizedDate":"2024年11月27日","excerpt":"<p>Go语言内存逃逸的场景</p>\\n","autoDesc":true}');export{g as comp,c as data};
