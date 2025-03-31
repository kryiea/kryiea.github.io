import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",

  {
    text: "后端",
    link: "/back-end/README.md",
    icon: "yin-yang",
    children: [
      // Programming Languages
      "/back-end/java/",
      "/back-end/go/",
      "/back-end/C++/",
      
      // Operating System
      "/back-end/linux/",
      
      // Databases
      "/back-end/mysql/",
      "/back-end/redis/",
      
      // Message Queue
      "/back-end/kafka/",
      
      // Container
      "/back-end/docker/",
      
      // Architecture
      "/back-end/distributed/",
      "/back-end/microservice/",
      
      // Core Concepts
      "/back-end/algorithm/",
      "/back-end/network/",
      
      // Best Practices
      "/back-end/Back-endOptimizationScenarios/"
    ],
  },  

  {
    text: "前端",
    link: "/front-end/",
    icon: "masks-theater",
  },

  "/devConfig/",   
  "/intro",
]);
