import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",

  {
    text: "后端",
    link: "/back-end/README.md",
    icon: "yin-yang",
    children: ["/back-end/go/", "/back-end/mysql/", "/back-end/docker/","/back-end/redis/","/back-end/java/"],
  },  

  {
    text: "前端",
    link: "/front-end/",
    icon: "masks-theater",
  },

  "/devConfig/",   
  "/intro",
]);
