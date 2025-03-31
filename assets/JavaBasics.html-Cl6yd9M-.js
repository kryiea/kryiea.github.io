import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as d,o as i}from"./app-WyckBTYZ.js";const l="/kryiea.github.io/assets/zjm-CpFub_-c.png",n={};function r(s,t){return i(),e("div",null,t[0]||(t[0]=[d('<h1 id="java基础" tabindex="-1"><a class="header-anchor" href="#java基础"><span>Java基础</span></a></h1><h2 id="一、java语言特性" tabindex="-1"><a class="header-anchor" href="#一、java语言特性"><span>一、Java语言特性</span></a></h2><h3 id="_1-1-java的特点" tabindex="-1"><a class="header-anchor" href="#_1-1-java的特点"><span>1.1 Java的特点</span></a></h3><ul><li><strong>面向对象</strong>：具备封装、继承、多态、抽象、反射、泛型等特性</li><li><strong>跨平台</strong>：一次编译，到处运行，依靠JVM实现</li><li><strong>稳健性</strong>：强类型语言，异常处理</li></ul><h3 id="_1-2-jvm、jdk、jre" tabindex="-1"><a class="header-anchor" href="#_1-2-jvm、jdk、jre"><span>1.2 JVM、JDK、JRE</span></a></h3><ul><li><strong>JDK</strong> = JRE + Java工具 + 编译器 + 调试器</li><li><strong>JRE</strong> = JVM + Java核心类库</li></ul><h3 id="_1-3-字节码" tabindex="-1"><a class="header-anchor" href="#_1-3-字节码"><span>1.3 字节码</span></a></h3><p>在Java中，JVM可以理解的代码就叫做字节码（即扩展名为.class的文件），它不面向任何特定的处理器，只面向虚拟机。Java语言通过字节码的方式，在一定程度上解决了传统解释型语言执行效率低的问题，同时又保留了解释型语言可移植的特点。</p><figure><img src="'+l+'" alt="java程序从代码到运行的过程" tabindex="0" loading="lazy"><figcaption>java程序从代码到运行的过程</figcaption></figure><h2 id="二、基本语法" tabindex="-1"><a class="header-anchor" href="#二、基本语法"><span>二、基本语法</span></a></h2><h3 id="_2-1-关键字" tabindex="-1"><a class="header-anchor" href="#_2-1-关键字"><span>2.1 关键字</span></a></h3><table><thead><tr><th>分类</th><th>关键字</th><th></th><th></th><th></th></tr></thead><tbody><tr><td>访问控制</td><td>private</td><td>protected</td><td>public</td><td></td></tr><tr><td>类、方法和变量修饰符</td><td>abstract</td><td>class</td><td>extends</td><td>final</td></tr><tr><td></td><td>new</td><td>static</td><td>strictfp</td><td>synchronized</td></tr><tr><td>程序控制</td><td>break</td><td>continue</td><td>return</td><td>do</td></tr><tr><td></td><td>for</td><td>instanceof</td><td>switch</td><td>case</td></tr><tr><td>错误处理</td><td>try</td><td>catch</td><td>throw</td><td>throws</td></tr><tr><td>包相关</td><td>import</td><td>package</td><td></td><td></td></tr><tr><td>基本类型</td><td>boolean</td><td>byte</td><td>char</td><td>double</td></tr><tr><td></td><td>short</td><td></td><td></td><td></td></tr><tr><td>变量引用</td><td>super</td><td>this</td><td>void</td><td></td></tr><tr><td>保留字</td><td>goto</td><td>const</td><td></td><td></td></tr></tbody></table><h3 id="_2-2-位移运算符" tabindex="-1"><a class="header-anchor" href="#_2-2-位移运算符"><span>2.2 位移运算符</span></a></h3><ul><li><code>&gt;&gt;</code> <code>&lt;&lt;</code> ：带符号右移和左移</li><li><code>&gt;&gt;&gt;</code> ：无符号右移，忽略符号位，空位都以0补齐</li></ul><h3 id="_2-3-final关键字的作用" tabindex="-1"><a class="header-anchor" href="#_2-3-final关键字的作用"><span>2.3 final关键字的作用</span></a></h3><ul><li>final修饰的类不能被继承</li><li>final修饰的方法不能被重写</li><li>final修饰的变量叫常量，常量必须初始化，初始化之后值就不能被修改</li></ul><h3 id="_2-4-成员变量与局部变量" tabindex="-1"><a class="header-anchor" href="#_2-4-成员变量与局部变量"><span>2.4 成员变量与局部变量</span></a></h3><p>语法形式 成员变量是属于类的，而局部变量是在代码块或方法中定义的变量或是方法的参数。成员变量可以被public、private、static等修饰符所修饰，而局部变量不能被访问控制修饰符及static所修饰；但是，成员变量和局部变量都能被final所修饰。</p><p>存储方式 从变量在内存中的存储方式来看，如果成员变量是使用static修饰的，那么这个成员变量是属于类的。如果没有使用static修饰，这个成员变量是属于实例的。而对象存在于堆内存，局部变量则存在于栈内存。</p><p>生存时间 从变量在内存中的生存时间上看，成员变量是对象的一部分，它随着对象的创建而存在，而局部变量随着方法的调用而自动生成，随着方法的调用结束而消亡。</p><p>默认值 从变量是否有默认值来看，成员变量如果没有被赋初始值，则会自动以类型的默认值而赋值（一种情况例外：被final修饰的成员变量也必须显式地赋值），而局部变量则不会自动赋值。</p><h2 id="三、方法" tabindex="-1"><a class="header-anchor" href="#三、方法"><span>三、方法</span></a></h2><h3 id="_3-1-静态方法不能调用非静态成员" tabindex="-1"><a class="header-anchor" href="#_3-1-静态方法不能调用非静态成员"><span>3.1 静态方法不能调用非静态成员</span></a></h3><ol><li>静态方法是属于类的，在类加载的时候就会分配内存，可以通过类名直接访问。而非静态成员属于实例对象，只有在对象实例化之后才存在，需要通过类的实例对象去访问。</li><li>在类的非静态成员不存在的时候静态方法就已经存在了，此时调用在内存中还不存在的非静态成员，属于非法操作。</li></ol>',24)]))}const h=a(n,[["render",r],["__file","JavaBasics.html.vue"]]),p=JSON.parse('{"path":"/back-end/java/basis/JavaBasics.html","title":"Java基础","lang":"zh-CN","frontmatter":{"title":"Java基础","order":1,"description":"Java基础 一、Java语言特性 1.1 Java的特点 面向对象：具备封装、继承、多态、抽象、反射、泛型等特性 跨平台：一次编译，到处运行，依靠JVM实现 稳健性：强类型语言，异常处理 1.2 JVM、JDK、JRE JDK = JRE + Java工具 + 编译器 + 调试器 JRE = JVM + Java核心类库 1.3 字节码 在Java中...","head":[["meta",{"property":"og:url","content":"https://kryiea.cn/kryiea.github.io/back-end/java/basis/JavaBasics.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"Java基础"}],["meta",{"property":"og:description","content":"Java基础 一、Java语言特性 1.1 Java的特点 面向对象：具备封装、继承、多态、抽象、反射、泛型等特性 跨平台：一次编译，到处运行，依靠JVM实现 稳健性：强类型语言，异常处理 1.2 JVM、JDK、JRE JDK = JRE + Java工具 + 编译器 + 调试器 JRE = JVM + Java核心类库 1.3 字节码 在Java中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T06:13:46.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T06:13:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-31T06:13:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"一、Java语言特性","slug":"一、java语言特性","link":"#一、java语言特性","children":[{"level":3,"title":"1.1 Java的特点","slug":"_1-1-java的特点","link":"#_1-1-java的特点","children":[]},{"level":3,"title":"1.2 JVM、JDK、JRE","slug":"_1-2-jvm、jdk、jre","link":"#_1-2-jvm、jdk、jre","children":[]},{"level":3,"title":"1.3 字节码","slug":"_1-3-字节码","link":"#_1-3-字节码","children":[]}]},{"level":2,"title":"二、基本语法","slug":"二、基本语法","link":"#二、基本语法","children":[{"level":3,"title":"2.1 关键字","slug":"_2-1-关键字","link":"#_2-1-关键字","children":[]},{"level":3,"title":"2.2 位移运算符","slug":"_2-2-位移运算符","link":"#_2-2-位移运算符","children":[]},{"level":3,"title":"2.3 final关键字的作用","slug":"_2-3-final关键字的作用","link":"#_2-3-final关键字的作用","children":[]},{"level":3,"title":"2.4 成员变量与局部变量","slug":"_2-4-成员变量与局部变量","link":"#_2-4-成员变量与局部变量","children":[]}]},{"level":2,"title":"三、方法","slug":"三、方法","link":"#三、方法","children":[{"level":3,"title":"3.1 静态方法不能调用非静态成员","slug":"_3-1-静态方法不能调用非静态成员","link":"#_3-1-静态方法不能调用非静态成员","children":[]}]}],"git":{"createdTime":1743099692000,"updatedTime":1743401626000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":2}]},"readingTime":{"minutes":2.82,"words":847},"filePathRelative":"back-end/java/basis/JavaBasics.md","localizedDate":"2025年3月27日","excerpt":"\\n<h2>一、Java语言特性</h2>\\n<h3>1.1 Java的特点</h3>\\n<ul>\\n<li><strong>面向对象</strong>：具备封装、继承、多态、抽象、反射、泛型等特性</li>\\n<li><strong>跨平台</strong>：一次编译，到处运行，依靠JVM实现</li>\\n<li><strong>稳健性</strong>：强类型语言，异常处理</li>\\n</ul>\\n<h3>1.2 JVM、JDK、JRE</h3>\\n<ul>\\n<li><strong>JDK</strong> = JRE + Java工具 + 编译器 + 调试器</li>\\n<li><strong>JRE</strong> = JVM + Java核心类库</li>\\n</ul>","autoDesc":true}');export{h as comp,p as data};
