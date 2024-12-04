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
          text: "基础",
          icon: "fa-solid fa-bars",
          prefix: "grammar/",
          children: [
            "GrammarBasics",
          ],
        },
        {
          text: "数据类型",
          icon: "fa-solid fa-bars",
          prefix: "datastruct/",
          children: [

          ],
        },
        {
          text: "进阶",
          icon: "fa-solid fa-bars",
          prefix: "feature/",
          children: [
            "memoryEscape",
            "multiReturns",
            "Compiler",
          ],
        },
        {
          text: "GMP模型",
          icon: "fa-solid fa-bars",
          prefix: "GMP/",
          children: [
            "gmp",
            "demoToGmp"
          ],
        },
        {
          text: "库源码",
          icon: "fa-solid fa-bars",
          prefix: "library/",
          children: [
            "jsonPackage",
            "syncmap",
          ],
        },

      ],
    },
    {
      text: "Mysql",
      icon: "database",
      prefix: "mysql/",
      collapsible: true,
      children: [
        {
          text: "基础",
          icon: "fa-solid fa-bars",
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
      icon: "fa-solid fa-r",
      prefix: "redis/",
      collapsible: true,
      children: [
        {
          text: "基础",
          icon: "fa-solid fa-bars",
          prefix: "basis/",
          children: [
            "dataInMemory",
          ],
        },
        {
          text: "应用",
          icon: "fa-solid fa-bars",
          prefix: "application/",
          children: [
            "lock",
          ],
        },
      ],
    },
  ],
  "/front-end/": "structure",
  "/devConfig/": "structure",
});
