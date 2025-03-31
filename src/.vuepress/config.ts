import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/kryiea.github.io/",

  lang: "zh-CN",
  title: "🧐kryiea",
  description: "♾️进步",

  theme,
  

  markdown:{
    headers:{
      level: [2,3,4,5,6]
    }
  }


  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
