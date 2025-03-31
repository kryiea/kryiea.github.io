import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,e as o,o as n}from"./app-DRR9Yo7Y.js";const i={};function p(s,t){return n(),r("div",null,t[0]||(t[0]=[o('<p><strong>虚拟机网络模式</strong></p><p><a href="https://www.bilibili.com/video/BV11M4y1J7zP?vd_source=1b3f2f856c78202317b1c9794792c763" target="_blank" rel="noopener noreferrer">【虚拟机网络模式】NAT | NAT网络 | 桥接Bridged | 内部网络Internal | 仅主机(Host-Only)_哔哩哔哩_bilibili</a></p><p><strong>虚拟机网络模式</strong></p><p><strong>NAT（Network Address Translation）</strong></p><p><strong>定义：</strong></p><p>NAT模式是一种虚拟机网络连接模式，虚拟机通过虚拟网络地址转换（NAT）与外部网络通信。在这种模式下，虚拟机通过宿主机的IP地址和网络连接来访问外部网络。</p><p><strong>特点：</strong></p><ol><li><strong>IP地址分配：</strong> 虚拟机使用一个虚拟的私有IP地址，这个地址在宿主机的私有网络范围内。</li><li><strong>网络隔离：</strong> 虚拟机与外部网络之间有一定的隔离，虚拟机无法直接被外部网络访问，增加了一层安全性。</li><li><strong>访问外网：</strong> 虚拟机可以通过宿主机访问外部网络，这种方式非常适合需要访问互联网但不需要外部设备访问虚拟机的场景。</li><li><strong>配置简单：</strong> 配置简单，无需对物理网络进行复杂设置，只需在虚拟机软件中选择NAT模式即可。</li><li>主机不能ping通虚拟机，虚拟机IP是虚有的，不占用主机的IP</li></ol><p><strong>NAT网络</strong></p><p><strong>定义：</strong></p><p>NAT网络模式类似于NAT模式，但它允许多个虚拟机共享一个虚拟的私有网络，并通过宿主机的网络连接访问外部网络。</p><p><strong>特点：</strong></p><ol><li><strong>虚拟局域网：</strong> 创建一个虚拟的局域网，所有在同一NAT网络中的虚拟机可以相互通信。</li><li><strong>共享外网访问：</strong> 通过宿主机的网络连接，NAT网络中的虚拟机可以访问外部网络。</li><li><strong>网络隔离：</strong> NAT网络中的虚拟机与外部网络有一定的隔离，外部网络无法直接访问这些虚拟机。</li><li><strong>适用场景：</strong> 适用于需要多个虚拟机进行内部通信并共同访问外部网络的场景，如测试环境、开发环境等。</li></ol><p><strong>桥接（Bridged）</strong></p><p><strong>定义：</strong></p><p>桥接模式是一种虚拟机网络连接模式，虚拟机直接连接到物理网络，就像物理机一样。虚拟机将获得一个与物理网络相同的IP地址，并且可以直接与物理网络中的其他设备通信。</p><p><strong>特点：</strong></p><ol><li><strong>直接连接：</strong> 虚拟机直接连接到物理网络，获得一个与物理网络相同的IP地址。</li><li><strong>双向通信：</strong> 虚拟机可以与物理网络中的其他设备进行双向通信，外部设备可以直接访问虚拟机。</li><li><strong>独立性：</strong> 虚拟机的网络行为与物理机无异，适用于需要虚拟机作为独立网络节点的场景。</li><li><strong>网络配置：</strong> 需要在物理网络中配置相应的网络设置，如IP地址分配、子网掩码等。</li></ol>',18)]))}const g=e(i,[["render",p],["__file","虚拟机网络模式.html.vue"]]),c=JSON.parse('{"path":"/back-end/network/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%BC%8F.html","title":"虚拟机网络模式详解","lang":"zh-CN","frontmatter":{"title":"虚拟机网络模式详解","description":"详细介绍虚拟机的各种网络模式及其配置方法","date":"2024-01-01T00:00:00.000Z","category":["计算机网络","虚拟化"],"tag":["虚拟机","网络配置","VMware","网络模式"],"head":[["meta",{"property":"og:url","content":"https://kryiea.cn/back-end/network/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"🧐kryiea"}],["meta",{"property":"og:title","content":"虚拟机网络模式详解"}],["meta",{"property":"og:description","content":"详细介绍虚拟机的各种网络模式及其配置方法"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T15:53:39.000Z"}],["meta",{"property":"article:tag","content":"虚拟机"}],["meta",{"property":"article:tag","content":"网络配置"}],["meta",{"property":"article:tag","content":"VMware"}],["meta",{"property":"article:tag","content":"网络模式"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T15:53:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"虚拟机网络模式详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-31T15:53:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"kryiea\\",\\"url\\":\\"https://github.com/kryiea\\",\\"email\\":\\"kryieaa@outlook.com\\"}]}"]]},"headers":[],"git":{"createdTime":1743436419000,"updatedTime":1743436419000,"contributors":[{"name":"kryiea","email":"1582877056@qq.com","commits":1}]},"readingTime":{"minutes":2.67,"words":801},"filePathRelative":"back-end/network/虚拟机网络模式.md","localizedDate":"2024年1月1日","excerpt":"<p><strong>虚拟机网络模式</strong></p>\\n<p><a href=\\"https://www.bilibili.com/video/BV11M4y1J7zP?vd_source=1b3f2f856c78202317b1c9794792c763\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">【虚拟机网络模式】NAT | NAT网络 | 桥接Bridged | 内部网络Internal | 仅主机(Host-Only)_哔哩哔哩_bilibili</a></p>\\n<p><strong>虚拟机网络模式</strong></p>\\n<p><strong>NAT（Network Address Translation）</strong></p>"}');export{g as comp,c as data};
