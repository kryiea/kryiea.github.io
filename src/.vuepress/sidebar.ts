import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/back-end/": [
    {
      text: "Go",
      icon: "fa-brands fa-golang",
      prefix: "go/",
      collapsible: true,
      children: [
        {
          text: "语言基础",
          icon: "fa-solid fa-code",
          prefix: "grammar/",
          children: [
            "GrammarBasics",
          ],
        },
        {
          text: "数据结构",
          icon: "fa-solid fa-database",
          prefix: "datastruct/",
          children: [],
        },
        {
          text: "高级特性",
          icon: "fa-solid fa-rocket",
          prefix: "feature/",
          children: [
            "memoryEscape",
            "multiReturns",
            "Compiler",
          ],
        },
        {
          text: "并发编程",
          icon: "fa-solid fa-network-wired",
          prefix: "GMP/",
          children: [
            "gmp",
            "demoToGmp"
          ],
        },
        {
          text: "标准库",
          icon: "fa-solid fa-book",
          prefix: "library/",
          children: [
            "jsonPackage",
            "syncmap",
            "strings",
          ],
        },
      ],
    },
    {
      text: "MySQL",
      icon: "fa-solid fa-database",
      prefix: "mysql/",
      collapsible: true,
      children: [
        {
          text: "基础概念",
          icon: "fa-solid fa-layer-group",
          prefix: "basis/",
          children: [
            "log",
          ],
        },
      ],
    },
    {
      text: "Docker",
      icon: "fa-brands fa-docker",
      prefix: "docker/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "Redis",
      icon: "fa-solid fa-database",
      prefix: "redis/",
      collapsible: true,
      children: [
        {
          text: "核心概念",
          icon: "fa-solid fa-layer-group",
          prefix: "basis/",
          children: [
            "dataInMemory",
          ],
        },
        {
          text: "实践应用",
          icon: "fa-solid fa-gears",
          prefix: "application/",
          children: [
            "lock",
          ],
        },
      ],
    },
    {
      text: "Java",
      icon: "fa-brands fa-java",
      prefix: "java/",
      collapsible: true,
      children: [
        {
          text: "语言基础",
          icon: "fa-solid fa-code",
          prefix: "basis/",
          children: [
            "JavaBasics",
          ],
        },
        {
          text: "高级特性",
          icon: "fa-solid fa-rocket",
          prefix: "advanced/",
          children: [
            "Reflection",
            "Exception",
          ],
        },
        {
          text: "框架技术",
          icon: "fa-solid fa-cubes",
          prefix: "framework/",
          children: [
            "Spring",
            "Servlet",
            "Filter",
            "Listener",
          ],
        },
      ],
    },
  ],
  "/front-end/": "structure",
  "/devConfig/": "structure",
});
