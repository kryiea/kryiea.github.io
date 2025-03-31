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
          prefix: "DataStructure/",
          children: [
            "channel",
            "context",
            "defer",
            "interface",
            "map",
            "slice",
            "string"
          ],
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
        {
          text: "框架技术",
          icon: "fa-solid fa-cubes",
          prefix: "framework/",
          children: [
            {
              text: "ORM框架",
              prefix: "ORMframework/",
              children: ["Gorm"],
            },
            {
              text: "Web框架",
              prefix: "Webframework/",
              children: ["Gin"],
            },
            {
              text: "加密框架",
              prefix: "encipherframework/",
              children: ["bcrypt加密"],
            },
            {
              text: "微服务框架",
              prefix: "MicroservicesFramework/",
              children: ["Kratos"],
            },
            {
              text: "日志框架",
              prefix: "Logframework/",
              children: ["uber.zap"],
            },
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
        {
          text: "SQL",
          icon: "fa-solid fa-code",
          prefix: "sql/",
          children: [
            "sql语法",
            "sql执行顺序",
            "sql索引",
            "数据类型",
            "数据库管理",
          ],
        },
        {
          text: "原理",
          icon: "fa-solid fa-gears",
          prefix: "principle/",
          children: [
            "原理分类",
            "逻辑架构",
            "InnoDB存储引擎",
            "索引",
            "事务",
            "锁",
            "日志",
            "性能调优",
          ],
        },
        {
          text: "高可用",
          icon: "fa-solid fa-shield-halved",
          prefix: "High-availability/",
          children: [
            "分库分表",
            "读写分离、主从同步",
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
          text: "数据对象",
          icon: "fa-solid fa-database",
          prefix: "Data-object/",
          children: [
            "string",
            "list",
            "hash",
            "set",
            "zset",
            "hashtable底层结构",
            "压缩列表",
            "跳表",
            "对象过期时间",
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
        {
          text: "持久化",
          icon: "fa-solid fa-save",
          prefix: "persistence/",
          children: [
            "持久化",
            "AOF优化-混合持久化",
          ],
        },
        {
          text: "运行原理",
          icon: "fa-solid fa-cogs",
          prefix: "Operating-principle/",
          children: [
            "redis在内存中是怎么存储的",
            "redis单线程为什么这么快",
            "redis单线程还是多线程",
            "redis多线程是怎么回事（未完成）",
            "redis能存多少数据",
            "内存淘汰算法-LRU",
            "内存淘汰算法-LFU",
          ],
        },
      ],
    },
    {
      text: "Kafka",
      icon: "fa-solid fa-message",
      prefix: "kafka/",
      collapsible: true,
      children: [
        {
          text: "架构设计",
          icon: "fa-solid fa-layer-group",
          prefix: "",
          children: [
            "Kafka架构",
          ]
        },
        {
          text: "高可用",
          icon: "fa-solid fa-shield-halved",
          prefix: "",
          children: [
            "Kafka高可用",
          ]
        },
        {
          text: "实践应用",
          icon: "fa-solid fa-gears",
          prefix: "application/",
          children: [
            "kafka-practice",
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
    {
      text: "C++",
      icon: "fa-solid fa-code",
      prefix: "C++/",
      collapsible: true,
      children: [
        "GCC、GDB",
        "c++特性",
        "externC",
        "基础复习",
        "预编译"
      ],
    },
    {
      text: "Linux",
      icon: "fa-brands fa-linux",
      prefix: "linux/",
      collapsible: true,
      children: [
        "Shell用户和组",
        "linux命令",
        "vim命令",
        "内存管理",
        "内核态与用户态",
        "文件系统",
        "网络编程"
      ],
    },
    {
      text: "分布式",
      icon: "fa-solid fa-network-wired",
      prefix: "distributed/",
      collapsible: true,
      children: [
        "雪花算法"
      ],
    },
    {
      text: "后端优化场景",
      icon: "fa-solid fa-gauge-high",
      prefix: "Back-endOptimizationScenarios/",
      collapsible: true,
      children: [
        "海量数据处理",
        "防重设计与接口幂等设计"
      ],
    },
    {
      text: "微服务",
      icon: "fa-solid fa-cubes",
      prefix: "microservice/",
      collapsible: true,
      children: [
        "Protobuf"
      ],
    },
    {
      text: "算法",
      icon: "fa-solid fa-code-branch",
      prefix: "algorithm/",
      collapsible: true,
      children: [
        "二分红蓝染色法",
        "二叉堆",
        "二叉树",
        "哈希算法",
        "滑动窗口"
      ],
    },
    {
      text: "计算机网络",
      icon: "fa-solid fa-globe",
      prefix: "network/",
      collapsible: true,
      children: [
        "传输层",
        "应用层",
        "网络安全",
        "虚拟机网络模式",
        "计算机网络语雀导入"
      ],
    },
  ],
  "/front-end/": "structure",
  "/devConfig/": "structure",
});
