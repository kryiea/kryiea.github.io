import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,e as i,o as s}from"./app-DRR9Yo7Y.js";const a="/assets/Shell%E3%80%81%E7%94%A8%E6%88%B7%E5%92%8C%E7%BB%84.001-CvUiEKKo.png",n="/assets/Shell%E3%80%81%E7%94%A8%E6%88%B7%E5%92%8C%E7%BB%84.002-KU37cYpx.png",r={};function o(p,e){return s(),t("div",null,e[0]||(e[0]=[i('<p><strong>Shell、用户和组</strong></p><p><strong>Shell</strong></p><p>shell 是一种具有特殊用途的程序，主要用于读取用户输入的命令，并执行相应的程序以响应命令。有时，人们也称之为命令解释器。</p><p>对 UNIX 系统而言，shell 只是一个用户进程。</p><p>纵观 UNIX 历史，出现过以下几种重要的 shell。</p><ul><li>Bourne shell（sh）</li></ul><p>由 Steve Bourne 编写的 shell 历史最为悠久，且应用广泛，曾是第七版 UNIX 的标配 shell。Bourne shell 包含了在其他 shell 中常见的许多特性，I/O 重定向、管道、文件名生成（通配符）、变量、环境变量处理、命令替换、后台命令执行以及函数。</p><ul><li>Bourne again shell（bash）</li></ul><p>这款 shell 是 GNU 项目对 Bourne shell 的重新实现。Bash 提供了与 C shell 和 Korn shel 所类似的交互式特性。Brian Fox 和 Chet Ramey 是 bash的主要作者。bash 或许是 Linux 上应用最为广泛的 shell 了。在 Linux 上，Bourne shell （sh）其实正是由 bash 仿真提供的。</p><ul><li>C shell（csh）</li><li>Korn shell（ksh）</li></ul><p><strong>用户和组</strong></p><p>系统会对每个用户的身份做唯一标识，用户可隶属于多个组。</p><p><strong>用户</strong></p><p>系统的每个用户都拥有唯一的登录名（用户名）和与之相对应的整数型用户ID（UID）。</p><p>存储在系统密码文件：/etc/passwd</p><p>一个典型的 /etc/passwd 文件中的一行示例：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">username:x:1001:1001:User</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Name,,,:/home/username:/bin/bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>每一行代表一个用户账户，字段之间用冒号（:）分隔。典型的字段包括：</p><ol><li>用户名</li><li>密码占位符（通常是一个 &quot;x&quot; 或 &quot;*&quot;，实际密码存储在 /etc/shadow 文件中）</li><li>用户ID（UID）</li><li>组ID（GID）</li><li>用户的描述信息（例如全名）</li><li>用户的主目录路径</li><li>用户的默认shell</li></ol><figure><img src="'+a+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>组</strong></p><p>一个用户可以同时属于多个组。</p><p>/etc/group 文件用于存储系统上所有用户组的信息。每一行代表一个用户组，字段之间用冒号（:）分隔。典型的字段包括：</p><ol><li>组名</li><li>密码占位符（通常是一个 &quot;x&quot; 或 &quot;*&quot;，实际密码如果有的话存储在 /etc/gshadow 文件中）</li><li>组ID（GID）</li><li>组成员列表（以逗号分隔的用户名）</li></ol><p>以下是一个典型的 /etc/group 文件中的一行示例：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">groupname:x:1001:user1,user2,user3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>groupname 是组名。</li><li>x 是密码占位符。</li><li>1001 是组ID（GID）。</li><li>user1,user2,user3 是属于该组的用户列表。</li></ul><figure><img src="'+n+'" alt="..." tabindex="0" loading="lazy"><figcaption>...</figcaption></figure><p><strong>超级用户 root</strong></p><p>超级用户在系统中享有特权。超级用户账号的用户 ID 为 0，通常登录名为 root。</p><p>超级用户都可以访问系统中的任何文件，也能发送信号干预系统运行的所有用户进程。</p><p>系统管理员可以使用超级用户账号来执行各种系统管理任务。</p>',32)]))}const u=l(r,[["render",o],["__file","Shell用户和组.html.vue"]]),d=JSON.parse('{"path":"/back-end/linux/Shell%E7%94%A8%E6%88%B7%E5%92%8C%E7%BB%84.html","title":"Linux Shell用户和组管理详解","lang":"zh-CN","frontmatter":{"title":"Linux Shell用户和组管理详解","description":"详细介绍Linux系统中用户和组的管理、权限设置及Shell操作","date":"2024-01-01T00:00:00.000Z","category":["Linux","系统管理"],"tag":["Linux","Shell","用户管理","权限管理"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/linux/Shell%E7%94%A8%E6%88%B7%E5%92%8C%E7%BB%84.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"Linux Shell用户和组管理详解"}],["meta",{"property":"og:description","content":"详细介绍Linux系统中用户和组的管理、权限设置及Shell操作"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"Shell"}],["meta",{"property":"article:tag","content":"用户管理"}],["meta",{"property":"article:tag","content":"权限管理"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux Shell用户和组管理详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":2.61,"words":782},"filePathRelative":"back-end/linux/Shell用户和组.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>Shell、用户和组</strong></p>\\n<p><strong>Shell</strong></p>\\n<p>shell 是一种具有特殊用途的程序，主要用于读取用户输入的命令，并执行相应的程序以响应命令。有时，人们也称之为命令解释器。</p>\\n<p>对 UNIX 系统而言，shell 只是一个用户进程。</p>\\n<p>纵观 UNIX 历史，出现过以下几种重要的 shell。</p>\\n<ul>\\n<li>Bourne shell（sh）</li>\\n</ul>\\n<p>由 Steve Bourne 编写的 shell 历史最为悠久，且应用广泛，曾是第七版 UNIX 的标配 shell。Bourne shell 包含了在其他 shell 中常见的许多特性，I/O 重定向、管道、文件名生成（通配符）、变量、环境变量处理、命令替换、后台命令执行以及函数。</p>"}');export{u as comp,d as data};
