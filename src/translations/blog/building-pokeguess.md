PokéGuess 是一个通过排除法猜出神秘宝可梦的浏览器小游戏。它支持英语、简体中文和日语，现在也有了自己的网页。

我想把翻阅宝可梦图鉴这件熟悉的事，变成一个简短的推理循环：猜一次，从结果里获得线索，再决定下一次尝试。

![PokéGuess 游戏画面：搜索名称、提交猜测并查看对比线索](/images/blog/building-pokeguess/pokeguess-gameplay.gif)

<nav class="article-actions" aria-label="PokéGuess 链接">
  <a class="article-action article-action-primary" href="https://irenex86.github.io/PokeGuess/">开始玩 PokéGuess</a>
  <a class="article-action article-action-secondary" href="https://github.com/IreneX86/PokeGuess">查看源代码 <span aria-hidden="true">↗</span></a>
</nav>

## 一轮一轮地猜

打开页面时，游戏会加载可搜索的列表，并随机选择一个答案。玩家按名字搜索宝可梦，再从建议列表中选择。每次猜测都会在历史记录中增加一组对比：属性和特性可以匹配，而种族值、世代等数值会提示答案比猜测更高还是更低。猜对就结束本轮；否则最多可以尝试十次，之后公布答案。点击“再玩一次”会开始新一轮，重新选择答案并清空记录。

这些对比是线索，不是需要优化的分数。我把每轮的状态保存在 React 中：隐藏答案、猜测记录、加载或结果状态，以及当前连续答对次数。这样，重新开始只需要重置几个相关的值。连胜记录只在当前页面会话中有效，刷新后会归零。

## 分开处理数据与展示

这个应用使用 React 19 和 TypeScript，开发服务器和生产构建由 Vite 提供。界面被拆分成搜索、对比记录、结果弹窗和图鉴抽屉等组件。对比逻辑放在独立的游戏函数里，让界面只负责展示结果，不必决定规则。

对于数值，函数会记录猜测值，以及它相对于隐藏答案的方向：

```ts
export function compareNumber(value: number, secret: number) {
  const direction = value === secret ? 'exact' : secret > value ? 'higher' : 'lower'
  return { value, direction }
}
```

这个小区别很重要：“higher”表示*答案*更高，而不是猜测值更高。分类线索采用精确匹配，属性和特性则作为集合进行比较。游戏还会读取进化链数据，因此不必把分支进化简化成一条线性的列表。

宝可梦的详细信息来自 [PokéAPI](https://pokeapi.co/)：宝可梦、物种、进化链和特性数据提供了对比所需的信息。搜索和图鉴索引还会读取 PokéAPI 仓库中的公开 CSV 数据。精灵图来自公开的精灵图仓库，其他插画在可用时使用 API 提供的资源。我没有搭建自己的游戏服务器。应用会把获取的详情缓存在内存中，并在浏览器允许时将较大的搜索和图鉴索引存入 `localStorage`；未完成的游戏轮次不会持久保存。

## 三种语言的名称

界面文字放在英语、简体中文和日语的字典中。一个语言值决定当前显示的提示和标签：

```ts
export type Language = 'en' | 'zh' | 'ja'
const messages = ui[language]
```

页头按钮会依次切换这三种语言。宝可梦名称和界面文字是两个不同的问题。搜索索引收集本地化名称，物种和特性接口的响应则为详情视图提供名称。搜索词同时包含稳定的标识符和可用的本地化名称，而猜测与对比使用标识符或数字 ID。因此，切换显示语言不会改变玩家猜的是哪一只宝可梦。

有些条目并没有完整的翻译。数据层会回退到其他可用名称或英文；官方描述也可能回退到英文，并显示提示。游戏本身的语言选择不会在刷新后保留，页面会以英文启动。

## 一些界面上的小选择

搜索会提供一小组匹配结果，不要求玩家准确输入完整拼写。对比视图除了颜色，还使用符号和方向标签；宽屏上的横向布局在小屏幕上会变成堆叠卡片。当仅凭名字想不起某只宝可梦时，可以打开独立的图鉴抽屉。这些细节让游戏更好用，也不需要增加新的游戏模式或后端。

## 发布到 `/PokeGuess/`

这个博客位于 [GitHub Pages 根站点](https://irenex86.github.io/)，而游戏来自独立仓库，发布在 [PokéGuess 项目路径](https://irenex86.github.io/PokeGuess/) 下。如果 Vite 构建默认以 `/` 为根路径，就会从错误的位置请求 JavaScript 和 CSS。因此，游戏的 Vite 配置明确设置了基础路径：

```ts
base: '/PokeGuess/',
```

这样，生成的资源地址就会在项目路径下解析。GitHub Actions 工作流会检出仓库、安装依赖、运行 lint 和类型检查、构建静态文件，再把输出部署到 GitHub Pages。路径只是一个小配置细节，却往往要等应用从真实网址运行时，问题才会显现。

## 这次的收获

如果再做一个小游戏，我会保留数据、对比规则和显示名称之间的边界。稳定的 ID 让语言切换不必影响太多逻辑，而正式发布的网址让我检查了本地构建可能掩盖的假设。当第一个界面已经看起来能用时，这两点很容易被忽略。

你可以[开始玩 PokéGuess](https://irenex86.github.io/PokeGuess/)，也可以[查看源代码](https://github.com/IreneX86/PokeGuess)。
