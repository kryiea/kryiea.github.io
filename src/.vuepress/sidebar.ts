import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/back-end/": [
    {
      text: "Go",
      icon: "code",
      prefix: "go/",
      link: "go/",
      children: "structure",
    },
    {
      text: "Mysql",
      icon: "database",
      prefix: "mysql/",
      link: "mysql/",
      children: "structure",
    },
  ],
  "/front-end/": "structure",
  "/devConfig/": "structure",
});
