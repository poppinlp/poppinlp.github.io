---
layout: post
title: About svn ignore
---

# About svn ignore

之前比较多的使用git作为代码仓库工具，不过最近因为一些项目的原因开始使用svn了，首当其冲的就是`co`的不适应。

废话不多说，总之就是遇到场景需要ignore一些东西吧，怀着试一试的心态创建了`.svnignore`，果真悲剧了。然后去查了点资料发现可以这样：

```bash
svn propset svn:ignore filename .
```

或者递归的设置文件夹：

```bash
svn propset svn:ignore -R dirname .
```

试了一下，大喜。于是屁颠屁颠的继续工作。后来发现ignore多了，想去掉一些，于是又找了找，发现一个叫`svn propdel`的方法，使用如下：

```bash
svn propdel svn:ignore .
```

然后就蛋疼的发现，这货把设置的ignore全都删了。看了看参数，本人比较脑残，似乎没找到解决的方法。

于是看了看其他方法，发现了一个叫`svn propedit`的，看起来貌似靠谱。决定使用一下，不过如果没设置环境变量`SVN_EDITOR`的同学应该先需要设置一下：

```bash
echo "export SVN_EDITOR=vim" >> ~/.bash_profile
```

然后再执行：

```bash
svn propedit svn:ignore .
```

就可以惊喜的发现，能像gitignore一样直接编辑了。

开心了，屁颠屁颠的继续搬砖。