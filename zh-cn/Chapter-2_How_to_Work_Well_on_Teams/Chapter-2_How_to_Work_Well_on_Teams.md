
**CHAPTER 2**

# How to Work Well on Teams

# 第二章 如何融入团队

**Written by Brian Fitzpatrick**

**Edited by Riona MacNamara**

Because this chapter is about the cultural and social aspects of software engineering at Google, it makes sense to begin by focusing on the one variable over which you definitely have control: you.

因为本章是从文化和社会方面来介绍谷歌软件工程，首先从焦聚与一个你完全控制的变量开始：你自己。

People are inherently imperfect—we like to say that humans are mostly a collection of intermittent bugs. But before you can understand the bugs in your coworkers, you need to understand the bugs in yourself. We’re going to ask you to think about your own reactions, behaviors, and attitudes—and in return, we hope you gain some real insight into how to become a more efficient and successful software engineer who spends less energy dealing with people-related problems and more time writing great code.

人天生是不完美的——我们常说，人类大多是一个个不同缺点的组成集合。但是，在你了解同事身上的缺点之前，你需要了解自己身上的缺点。我们将要求你反思自己的反应、行为和态度——作为回报，我们希望你能够真正了解如何成为一名更高效、更成功的软件工程师，减少处理与人相关的问题的精力，花更多的时间编写牛逼的代码。

The critical idea in this chapter is that software development is a team endeavor. And to succeed on an engineering team—or in any other creative collaboration—you need to reorganize your behaviors around the core principles of humility, respect, and trust.

本章的关键思想是，软件开发是团队的努力。要在工程团队或任何其他创造性合作中取得成功，你需要围绕谦逊、尊重和信任的核心原则重新定义你的行为。

Before we get ahead of ourselves, let’s begin by observing how software engineers tend to behave in general.

在我们超越自己之前，让我们首先观察软件工程师的一般行为。

## Help Me Hide My Code  帮我隐藏我的代码

For the past 20 years, my colleague Ben[^1] and I have spoken at many programming conferences. In 2006, we launched Google’s (now deprecated) open source Project Hosting service, and at first, we used to get lots of questions and requests about the product. But around mid-2008, we began to notice a trend in the sort of requests we were getting:
    “Can you please give Subversion on Google Code the ability to hide specific branches?”
    “Can you make it possible to create open source projects that start out hidden to the world and then are revealed when they’re ready?”
    “Hi, I want to rewrite all my code from scratch, can you please wipe all the history?”
Can you spot a common theme to these requests?

在过去的20年里，我和我的同事Ben在很多编程会议上演讲。 在2006年，我们推出了 Google的开源项目托管服务（现已弃用），在开始时，我们收到很多关于该产品的问题和请求。但到了2008年年中左右，我们发现，我们收到的请求中很多是这样的：

​    “你能否让Google Code上的 Subversion能够隐藏指定分支？” 

​    “你能否让创建的开源项目开始时对外隐藏，在它们准备好后再公开？” 

​    “嗨，我想从头开始重构我所有的代码，你能把所有的历史记录都删除吗？”

你能找出这些要求的共同点吗？

The answer is insecurity. People are afraid of others seeing and judging their work in progress. In one sense, insecurity is just a part of human nature—nobody likes to be criticized, especially for things that aren’t finished. Recognizing this theme tipped us off to a more general trend within software development: insecurity is actually a symptom of a larger problem.

答案是缺乏安全感。人们害怕别人看到和评价他们正在进行的工作。从某种意义上说，缺乏安全感是人性的一部分——没有人喜欢被批评，尤其是那些没有完成的事情。认识到这个主题让我们看到了软件开发中一个更普遍的趋势：缺乏安全实际上是一个更大问题的征兆。

> [^1]: Ben Collins-Sussman, also an author within this book.
> 1 Ben Collins-Sussman，也是本书的作者之一。

## The Genius Myth  天才的神话

Many humans have the instinct to find and worship idols. For software engineers, those might be Linus Torvalds, Guido Van Rossum, Bill Gates—all heroes who changed the world with heroic feats. Linus wrote Linux by himself, right?

许多人有寻找和崇拜偶像的本能。对于软件工程师来说，他们可能是Linus Torvalds, Guido Van Rossum, Bill Gates——他们都是改变世界的英雄。是Linus自己写的Linux？

Actually, what Linus did was write just the beginnings of a proof-of-concept Unix- like kernel and show it to an email list. That was no small accomplishment, and it was definitely an impressive achievement, but it was just the tip of the iceberg. Linux is hundreds of times bigger than that initial kernel and was developed by thousands of smart people. Linus’ real achievement was to lead these people and coordinate their work; Linux is the shining result not of his original idea, but of the collective labor of the community. (And Unix itself was not entirely written by Ken Thompson and Dennis Ritchie, but by a group of smart people at Bell Labs.)

实际上，Linus所做的只是编写了概念验证类Unix内核的开头，并将电子邮件发送出去。这是不小的成就，绝对是一个令人印象深刻的成就，但这只是冰山一角。Linux比最初的内核大几百倍，是由成千上万的聪明人开发的。Linus真正的成就是领导并协调他们的完成工作；Linux不仅仅是他最初创意的成果，更是社区集体努力的成果。（Unix本身并非完全由肯·汤普森和丹尼斯·里奇编写，而是由贝尔实验室的一群聪明人编写的。）

On that same note, did Guido Van Rossum personally write all of Python? Certainly, he wrote the first version. But hundreds of others were responsible for contributing to subsequent versions, including ideas, features, and bug fixes. Steve Jobs led an entire team that built the Macintosh, and although Bill Gates is known for writing a BASIC interpreter for early home computers, his bigger achievement was building a successful company around MS-DOS. Yet they all became leaders and symbols of the collective achievements of their communities. The Genius Myth is the tendency that we as humans need to ascribe the success of a team to a single person/leader.

同样，Guido Van Rossum是否亲自编写了所有Python？当然，他写了第一个版本。但还有数百人为后续版本做出贡献，包括想法、功能和bug修复。史蒂夫·乔布斯领导了一个建造麦金塔的整个团队，尽管比尔·盖茨以为早期家用电脑编写BASIC解释器而闻名，但他更大的成就是围绕MS-DOS系统建立了一家成功的公司。然而，他们都成为集体成就的领袖和象征。天才的神话是一种趋势，即我们需要将团队的成功归因于一个人/领导者。

And what about Michael Jordan?

那么Michael Jordan呢？

It’s the same story. We idolized him, but the fact is that he didn’t win every basketball game by himself. His true genius was in the way he worked with his team. The team’s coach, Phil Jackson, was extremely clever, and his coaching techniques are legendary.

这是同一个故事。我们崇拜他，但事实是他并不是一个人赢得每一场篮球比赛的。他真正的牛逼在于他与团队合作的方式。这支球队的教练Phil Jackson非常聪明，他的教练技术堪称传奇。

He recognized that one player alone never wins a championship, and so he assembled an entire “dream team” around MJ. This team was a well-oiled machine—at least as impressive as Michael himself.

他认识到只有一个球员永远无法赢得冠军，因此他围绕Michael Jordan组建了一支完美的“梦之队”。这支球队是一台运转良好的机器——至少和迈克尔本人一样令人印象深刻。

So, why do we repeatedly idolize the individual in these stories? Why do people buy products endorsed by celebrities? Why do we want to buy Michelle Obama’s dress or Michael Jordan’s shoes?

那么，为什么我们在这些故事中一再崇拜个人呢？为什么人们会购买名人代言的产品？我们为什么要买米歇尔·奥巴马的裙子或Michael Jordan的鞋子？

Celebrity is a big part of it. Humans have a natural instinct to find leaders and role models, idolize them, and attempt to imitate them. We all need heroes for inspiration, and the programming world has its heroes, too. The phenomenon of “techie- celebrity” has almost spilled over into mythology. We all want to write something world-changing like Linux or design the next brilliant programming language.

名人效应是一个重要原因。人类有寻找领导者和榜样的本能，崇拜他们，并试图模仿他们。我们都需要英雄来激发灵感，编程世界也有自己的英雄。“科技名人”已经几乎被神化，我们都想写一些改变世界的东西，比如Linux或者设计下一种优秀的编程语言。

Deep down, many engineers secretly wish to be seen as geniuses. This fantasy goes something like this:
- You are struck by an awesome new concept.
- You vanish into your cave for weeks or months, slaving away at a perfect implementation of your idea.
- You then “unleash” your software on the world, shocking everyone with your genius.
- Your peers are astonished by your cleverness.
- People line up to use your software.
- Fame and fortune follow naturally.

在内心深处，许多工程师暗中希望被视为天才。这种幻想是这样的：

- 你会被一个了不起的新概念所震撼。
- 你消失数周或数月躲在洞穴中，努力实现你的理想。
- 然后世界上“发布”你的软件，用你的天才震撼每个人。
- 你的同龄人对你的聪明感到惊讶。
- 人们排队使用你的软件。
- 名利自然随之而来。

But hold on: time for a reality check. You’re probably not a genius.

是时候回归现实了。你很可能不是天才。

No offense, of course—we’re sure that you’re a very intelligent person. But do you realize how rare actual geniuses really are? Sure, you write code, and that’s a tricky skill. But even if you are a genius, it turns out that that’s not enough. Geniuses still make mistakes, and having brilliant ideas and elite programming skills doesn’t guarantee that your software will be a hit. Worse, you might find yourself solving only analytical problems and not human problems. Being a genius is most definitely not an excuse for being a jerk: anyone—genius or not—with poor social skills tends to be a poor teammate. The vast majority of the work at Google (and at most companies!) doesn’t require genius-level intellect, but 100% of the work requires a minimal level of social skills. What will make or break your career, especially at a company like Google, is how well you collaborate with others.

无意冒犯，我们当然相信你是个非常聪明的人。但你要知道真正的天才有多稀有吗？当然，你需要编写代码，这是一项棘手的技能。即使你是个天才，会编程还不够。天才仍然会犯错误，拥有卓越的想法和精英编程技能并不能保证你的软件会大受欢迎。更糟糕的是，你可能会发现自己只解决了分析性问题，而没有解决人的问题。作为一个天才绝对不是成为一个混蛋的借口： 天才与否，社交能力差的人，往往是一个猪队友。谷歌（以及大多数公司！）的绝大多数工作不需要天才水平的智力，但100%的工作需要最低水平的社交技能。决定你职业生涯成败，尤其是在谷歌这样的公司，更取决于你与他人合作的程度。

It turns out that this Genius Myth is just another manifestation of our insecurity. Many programmers are afraid to share work they’ve only just started because it means peers will see their mistakes and know the author of the code is not a genius.

事实证明，这种天才神话只是我们缺乏安全感的另一种表现。许多程序员害怕分享他们刚刚开始的工作，因为这意味着同行会看到他们的错误，知道代码的作者不是天才。

To quote a friend:
    *I know I get SERIOUSLY insecure about people looking before something is done. Like they are going to seriously judge me and think I’m an idiot.*

引用一位朋友的话：  
		*我知道，别人在我完成某事之前就来看，会让我感到非常不安全。好像他们会认真地评判我，认为我是个白痴。*

This is an extremely common feeling among programmers, and the natural reaction is to hide in a cave, work, work, work, and then polish, polish, polish, sure that no one will see your goof-ups and that you’ll still have a chance to unveil your masterpiece when you’re done. Hide away until your code is perfect.

这是程序员群体中非常普遍的感觉，第一反应就是躲到山洞里，工作，工作，努力工作，然后打磨，打磨，再打磨，确定没有人会看到你的错误后，当你完成后，你才会揭开你的作品面纱。躲起来吧，直到你的代码变得完美。

Another common motivation for hiding your work is the fear that another programmer might take your idea and run with it before you get around to working on it. By keeping it secret, you control the idea.

隐藏工作的另一个常见动机是担心另一个程序员可能会在你开始工作之前就拿着你的想法跑了。通过保密，你可以控制这个想法。

We know what you’re probably thinking now: so what? Shouldn’t people be allowed to work however they want?
Actually, no. In this case, we assert that you’re doing it wrong, and it is a big deal. Here’s why.

我们知道你现在在想什么：那又怎样？难道不应该允许我随心所欲地工作吗？

事实上，不应该。在这种情况下，我们断定你错了，很是一个大错误。原因如下。

## Hiding Considered Harmful 隐藏不利

If you spend all of your time working alone, you’re increasing the risk of unnecessary failure and cheating your potential for growth. Even though software development is deeply intellectual work that can require deep concentration and alone time, you must play that off against the value (and need!) for collaboration and review.

如果你把所有的时间都花在独自工作上，增加了不必要失败的风险，耽误了你的成长潜力。尽管软件开发是一项需要高度集中精力和独处时间的深度智力工作，但你必须权衡协作和审查的价值（以及需求！）。

First of all, how do you even know whether you’re on the right track?

首先，你怎么知道自己是否在正确的轨道上？

Imagine you’re a bicycledesign enthusiast, and one day you get a brilliant idea for a completely new way to design a gear shifter. You order parts and proceed to spend weeks holed up in your garage trying to build a prototype. When your neighbor— also a bike advocate—asks you what’s up, you decide not to talk about it. You don’t want anyone to know about your project until it’s absolutely perfect. Another few months go by and you’re having trouble making your prototype work correctly. But because you’re working in secrecy, it’s impossible to solicit advice from your mechanically inclined friends.

想象一下，你是一个自行车设计爱好者，有一天你有了一个牛逼的想法，可以用一种全新的方式来设计变速器。你订购零件，然后花数周时间躲在车库里，尝试制造一个原型。当你的邻居——也是自行车倡导者——问你怎么了，你决定闭口不谈。你不想让任何人知道你的项目，直到它绝对完美。又过几个月，你在让原型运行时遇到了麻烦。但因为你是在保密的情况下工作，所以不可能征求你那些有机械专家朋友的意见。

Then, one day your neighbor pulls his bike out of his garage with a radical new gear- shifting mechanism. Turns out he’s been building something very similar to your invention, but with the help of some friends down at the bike shop. At this point, you’re exasperated. You show him your work. He points out that your design had some simple flaws—ones that might have been fixed in the first week if you had shown him. There are a number of lessons to learn here.

然后，有一天，你的邻居将他的自行车从车库中拉出，这辆自行车使用一种全新的换档机构。事实表明，他也在制造一些与你的发明非常相似的东西，但是他得到了自行车店的一些朋友的帮助。这时候，你很生气。你给他看你的原型。他指出，你的设计有一些简单的缺陷，如果你给他看的话，这些缺陷可能在第一周就被修复了。这里有许多教训要学习。

### Early Detection 及早发现

If you keep your great idea hidden from the world and refuse to show anyone anything until the implementation is polished, you’re taking a huge gamble. It’s easy to make fundamental design mistakes early on. You risk reinventing wheels.2 And you forfeit the benefits of collaboration, too: notice how much faster your neighbor moved by working with others? This is why people dip their toes in the water before jumping in the deep end: you need to make sure that you’re working on the right thing, you’re doing it correctly, and it hasn’t been done before. The chances of an early misstep are high. The more feedback you solicit early on, the more you lower this risk.3 Remember the tried-and-true mantra of “Fail early, fail fast, fail often.”

如果你对世界隐瞒你的牛逼想法，并在未完美之前拒绝向任何人展示，那么你就是在进行一场下注巨大的赌博。早期很容易犯基本的设计错误。你冒着重新发明轮子的风险。[^2]而且你也失去了协作的好处：注意到你的邻居通过与他人合作而效率有多高？这就是人们在跳入深水区之前将脚趾浸入水中的原因：你需要确保你在做正确的事情，你在做正确的事情，而且以前从未做过。早期失误的可能性很高。你越早征求反馈，这种风险就越低。[^3]记住“早失败、快失败、经常失败”这句经得起考验的至理名言。

Early sharing isn’t just about preventing personal missteps and getting your ideas vetted. It’s also important to strengthen what we call the bus factor of your project.

尽早分享不仅仅是为了防止个人失误和检验你的想法，对于加强我们称之为项目的巴士因子也是十分重要的。

> [^2]:    Literally, if you are, in fact, a bike designer.
> 2  实际上，如果你是一个自行车设计师。
>
> [^3]:    I should note that sometimes it’s dangerous to get too much feedback too early in the process if you’re still unsure of your general direction or goal.
> 3  我应该注意到，如果你仍然不确定自己的总体方向或目标，那么在过程中过早地获得太多反馈是很危险的。

### The Bus Factor 巴士因子

Bus factor (noun): the number of people that need to get hit by a bus before your project is completely doomed.

巴士因子：团队里因巴士撞倒的多少人，会导致项目失败。

How dispersed is the knowledge and know-how in your project? If you’re the only person who understands how the prototype code works, you might enjoy good job security—but if you get hit by a bus, the project is toast. If you’re working with a colleague, however, you’ve doubled the bus factor. And if you have a small team designing and prototyping together, things are even better—the project won’t be marooned when a team member disappears. Remember: team members might not literally be hit by buses, but other unpredictable life events still happen. Someone might get married, move away, leave the company, or take leave to care for a sick relative. Ensuring that there is at least good documentation in addition to a primary and a secondary owner for each area of responsibility helps future-proof your project’s success and increases your project’s bus factor. Hopefully most engineers recognize that it is better to be one part of a successful project than the critical part of a failed project.

你的项目中的知识和技能分散程度如何？如果你是唯一了解原型代码工作原理的人，你需要会受到良好的工作保障，但如果你被公交车撞倒，项目就完蛋了。但是，如果你与同事合作，你的巴士因子就翻了一番。如果你有一个小团队一起进行设计和制作原型，情况会更好——当团队某个成员消失时，项目不会被孤立。记住：团队成员可能不会被公交车撞到，但其他不可预知的事件仍然会发生。有人可能会结婚、搬走、离开公司或请假照顾生病的亲属。确保每个责任领域除了一个主要和一个次要所有者之外，至少还有可用的文档，这有助于确保项目的成功，提高项目的成功率。希望大多数工程师认识到，成为成功项目的一部分比成为失败项目的关键部分要好。

Beyond the bus factor, there’s the issue of overall pace of progress. It’s easy to forget that working alone is often a tough slog, much slower than people want to admit. How much do you learn when working alone? How fast do you move? Google and Stack Overflow are great sources of opinions and information, but they’re no substitute for actual human experience. Working with other people directly increases the collective wisdom behind the effort. When you become stuck on something absurd, how much time do you waste pulling yourself out of the hole? Think about how different the experience would be if you had a couple of peers to look over your shoulder and tell you—instantly—how you goofed and how to get past the problem. This is exactly why teams sit together (or do pair programming) in software engineering companies. Programming is hard. Software engineering is even harder. You need that second pair of eyes.

除了巴士因子，还有整体进度的问题。人们很容易忘记，独自工作往往是一项艰苦的工作，比人们自认为的慢得多。你独自工作能学到多少？你推进地有多快？Google和Stack Overflow是观点和信息的重要来源，但它们不能替代人的真实体验。与他人一起工作会直接增加工作背后的集体智慧。当你陷入误区时，你需要浪费多少时间才能从困境中解脱？想想如果你有几个同龄人看着你并立即告知你是如何犯错以及如何解决问题，体验会有多么不同。这正是软件工程公司中团队坐在一起（或进行配对编程）的原因。编程很难。软件工程更难。你需要另一双眼睛。

### Pace of Progress 进展速度

Here’s another analogy. Think about how you work with your compiler. When you sit down to write a large piece of software, do you spend days writing 10,000 lines of code, and then, after writing that final, perfect line, press the “compile” button for the very first time? Of course you don’t. Can you imagine what sort of disaster would result? Programmers work best in tight feedback loops: write a new function, compile. Add a test, compile. Refactor some code, compile. This way, we discover and fix typos and bugs as soon as possible after generating code. We want the compiler at our side for every little step; some environments can even compile our code as we type. This is how we keep code quality high and make sure our software is evolving correctly, bit by bit. The current DevOps philosophy toward tech productivity is explicit about these sorts of goals: get feedback as early as possible, test as early as possible, and think about security and production environments as early as possible. This is all bundled into the idea of “shifting left” in the developer workflow; the earlier we find a problem, the cheaper it is to fix it.

这是另一个类比。考虑一下如何使用编译器。当你坐下来编写一个大型软件时，你是否会花上几天的时间编写10,000行代码，然后在编写完最后一行完美的代码后，第一次按下“编译”按钮？你当然不知道。你能想象会发生什么样的灾难吗？程序员在密集的循环反馈中工作做得最好：编写一个新函数compile，添加一个测试，编译。重构一些代码，编译。这样，我们可以在生成代码后尽快发现并修复拼写错误和bug。我们希望完成每一小步都要使用编译器；有些环境甚至可以在我们写入代码时自动编译。这就是我们如何保持代码高质量并确保我们的软件一点一点地正确迭代的方法。当前DevOps对技术生产力的理念明确了这些目标：尽早获得反馈，尽早进行测试，尽早考虑安全和生产环境。这一切都与开发人员工作流程中的“左移”思想捆绑在一起；我们越早发现问题，修复它的成本就越低。

The same sort of rapid feedback loop is needed not just at the code level, but at the whole-project level, too. Ambitious projects evolve quickly and must adapt to changing environments as they go. Projects run into unpredictable design obstacles or political hazards, or we simply discover that things aren’t working as planned. Requirements morph unexpectedly. How do you get that feedback loop so that you know the instant your plans or designs need to change? Answer: by working in a team. Most engineers know the quote, “Many eyes make all bugs shallow,” but a better version might be, “Many eyes make sure your project stays relevant and on track.” People working in caves awaken to discover that while their original vision might be complete, the world has changed and their project has become irrelevant.

同样的快速反馈循环不仅在代码级别需要，在整个项目级别也需要。雄心勃勃的项目快速发展，必须适应不断变化的环境。项目遇到不可预测的设计障碍或政治风险，或者我们只是发现事情没有按计划进行。需求又发生变化了。你如何获得反馈循环，以便你知道你的计划或设计需要更改的时候？答：通过团队合作。大多数工程师都知道这样一句话：“人多走得更快”，但更好的说法可能是，“人多走得更远。”在洞穴中工作的人们醒来后发现，虽然他们最初的愿景可能已经实现，但世界已经改变，他们的项目变得无关紧要。

------

**Case Study: Engineers and Offices**
Twenty-five years ago, conventional wisdom stated that for an engineer to be productive, they needed to have their own office with a door that closed. This was supposedly the only way they could have big, uninterrupted slabs of time to deeply concentrate on writing reams of code.

25年前，传统观念认为，工程师要想提高工作效率，就需要有一间自己的办公室，还要有一扇关着的门。据说，只有这样，他们才能有充足的时间、不受干扰的编写代码。

I think that it’s not only unnecessary for most engineers[^4] to be in a private office, it’s downright dangerous. Software today is written by teams, not individuals, and a high- bandwidth, readily available connection to the rest of your team is even more valuable than your internet connection. You can have all the uninterrupted time in the world, but if you’re using it to work on the wrong thing, you’re wasting your time.

我认为，对大多数工程师来说，在私人办公室里不仅没有必要，而且是完全错误的。今天的软件是由团队而不是个人编写的，与团队其他成员的高带宽、随时可用的连接甚至比你使用互联网更有价值。你可以拥有不受打扰的时间，但如果你用它来做错误的事情，你这是在浪费时间。

Unfortunately, it seems that modern-day tech companies (including Google, in some cases) have swung the pendulum to the exact opposite extreme. Walk into their offices and you’ll often find engineers clustered together in massive rooms—a hundred or more people together—with no walls whatsoever. This “open floor plan” is now a topic of huge debate and, as a result, hostility toward open offices is on the rise. The tiniest conversation becomes public, and people end up not talking for risk of annoying dozens of neighbors. This is just as bad as private offices!

不幸的是，现代科技公司（在某些情况下包括谷歌）似乎已经走向了另一个极端。走进他们的办公室，你经常会发现工程师们聚集在一个巨大的房间里——一百多人聚集在一起，没有任何墙壁。这中“开放式平面图”现在是一个大辩论的话题，因此，对开放式办公室的敌意正在上升。最小范围谈话都会公开，工程师们不再说话，以免惹恼周围几十个邻居。这和私人办公室一样糟糕！

We think the middle ground is really the best solution. Group teams of four to eight people together in small rooms (or large offices) to make it easy (and non- embarrassing) for spontaneous conversation to happen.

我们觉得折中的方案是最好的解决方法。在小房间（或大办公室）将四至八人组成小组，方便大家轻松（且不令人尴尬）地自由对话。

Of course, in any situation, individual engineers still need a way to filter out noise and interruptions, which is why most teams I’ve seen have developed a way to communicate that they’re currently busy and that you should limit interruptions. Some of us used to work on a team with a vocal interrupt protocol: if you wanted to talk, you would say “Breakpoint Mary,” where Mary was the name of the person you wanted to talk to. If Mary was at a point where she could stop, she would swing her chair around and listen. If Mary was too busy, she’d just say “ack,” and you’d go on with other things until she finished with her current head state.

当然，在很多情况下，个别工程师还会需要一种方法来过滤噪音和干扰，这就是为什么我所见过的大多数团队都开发了一种方法来表示他们目前很忙，你不应该来打扰。 我们中的一些人曾经在一个团队中工作，有一个发声中断协议：如果你想说话，你会说“Breakpoint Mary”，其中Mary是你想对话人的名字。如果Mary能停下来，她会把椅子转过来听。如果Mary太忙，她只会说“确认”，你会继续做其他事情，直到她完成她当前的工作。

Other teams have tokens or stuffed animals that team members put on their monitor to signify that they should be interrupted only in case of emergency. Still other teams give out noise-canceling headphones to engineers to make it easier to deal with background noise—in fact, in many companies, the very act of wearing headphones is a common signal that means “don’t disturb me unless it’s really important.” Many engineers tend to go into headphones-only mode when coding, which may be useful for short spurts but, if used all the time, can be just as bad for collaboration as walling yourself off in an office.

其他团队有代币或布娃娃，团队成员将它们放在显示器上，以表示只有在紧急情况下才应打扰。还有一些团队向工程师分发降噪耳机，以便于处理背景噪音。事实上，在许多公司，佩戴耳机的行为是一种常见的信号，表示“除非非常重要，否则不要打扰我。”许多工程师在编码时倾向于只使用耳机模式，这可能对短时间的使用是有效，但如果一直使用，对协作的影响和把自己独自关在办公室里一样糟糕。

Don’t misunderstand us—we still think engineers need uninterrupted time to focus on writing code, but we think they need a high-bandwidth, low-friction connection to their team just as much. If less-knowledgeable people on your team feel that there’s a barrier to asking you a question, it’s a problem: finding the right balance is an art.

不要误解我们，我们仍然认为工程师需要不受打扰的时间来专注于编写代码，但我们认为他们同样需要一个高带宽、低冲突的团队连接。如果你的团队中新人觉得向你提问存在障碍，那就是一个问题：找到正确的平衡是一门艺术。

------


> [^4]:    I do, however, acknowledge that serious introverts likely need more peace, quiet, and alone time than most people and might benefit from a quieter environment, if not their own office.  
> 4  然而，我承认，严肃内向的人可能比大多数人需要更多的平静、安静和独处的时间，如果不是他们自己的办公室，他们可能会从一个更安静的环境中受益。

### In Short, Don’t Hide 总之，不要隐藏

So, what “hiding” boils down to is this: working alone is inherently riskier than working with others. Even though you might be afraid of someone stealing your idea or thinking you’re not intelligent, you should be much more concerned about wasting huge swaths of your time toiling away on the wrong thing.

Don’t become another statistic.

因此，“隐藏”归结起来就是：独自工作比与他人一起工作具有更高的内在风险。即使你可能害怕有人窃取你的想法或认为你不聪明，你更应该担心浪费大量时间在错误的事情上。

不要成为另一个统计数字。

## It’s All About the Team 一切都是为了团队

So, let’s back up now and put all of these ideas together.

那么，让我们现在回顾一下，把所有这些想法放在一起。

The point we’ve been hammering away at is that, in the realm of programming, lone craftspeople are extremely rare—and even when they do exist, they don’t perform superhuman achievements in a vacuum; their world-changing accomplishment is almost always the result of a spark of inspiration followed by a heroic team effort.

我们反复强调的一点是，在编程领域，孤独的工匠极其罕见，即使他们确实存在，他们也不会在真空中完成超人的成就；他们改变世界的成就几乎总是灵感迸发、团队英勇努力的结果。

A great team makes brilliant use of its superstars, but the whole is always greater than the sum of its parts. But creating a superstar team is fiendishly difficult.

一个伟大的团队能够出色地利用它的超级明星，但整体总是大于各部分的总和。但打造一支集合多个超级明星球队是极其困难的。

Let’s put this idea into simpler words: software engineering is a team endeavor.

让我们把这个想法用更简单的话来说：软件工程是一个团队的努力。

This concept directly contradicts the inner Genius Programmer fantasy so many of us hold, but it’s not enough to be brilliant when you’re alone in your hacker’s lair. You’re not going to change the world or delight millions of computer users by hiding and preparing your secret invention. You need to work with other people. Share your vision. Divide the labor. Learn from others. Create a brilliant team.

这个概念直接与我们许多人幻想的天才程序员幻想相矛盾，但当你独自一人在黑客的巢穴中时，这也是不够聪明。你不能通过隐藏和准备你的秘密发明来改变世界或取悦数百万计的用户。你需要和其他人一起工作。分享你的愿景，分工，向别人学习，创建一个出色的团队。

Consider this: how many pieces of widely used, successful software can you name that were truly written by a single person? (Some people might say “LaTeX,” but it’s hardly “widely used,” unless you consider the number of people writing scientific papers to be a statistically significant portion of all computer users!)

想一想：有多少种被广泛使用并成功的软件，你能说出真正由一个人写的吗？（有些人可能会说“LaTeX”，但它几乎不被广泛使用，除非你认为撰写科学论文的人数在所有计算机用户中占一大部分！）

High-functioning teams are gold and the true key to success. You should be aiming for this experience however you can.

高效的团队是黄金，是成功的真正关键。你应该尽可能地追求这种体验。

### The Three Pillars of Social Interaction社交的三大支柱

So, if teamwork is the best route to producing great software, how does one build (or find) a great team?

那么，如果团队合作是生产优秀软件的最佳路径，那么如何建立（或找到）一个优秀的团队呢？

To reach collaborative nirvana, you first need to learn and embrace what I call the “three pillars” of social skills. These three principles aren’t just about greasing the wheels of relationships; they’re the foundation on which all healthy interaction and collaboration are based:
*Pillar 1: Humility*  
	You are not the center of the universe (nor is your code!). You’re neither omniscient nor infallible. You’re open to self-improvement.
*Pillar 2: Respect*  
    You genuinely care about others you work with. You treat them kindly and appreciate their abilities and accomplishments.
*Pillar 3: Trust*  
    You believe others are competent and will do the right thing, and you’re OK with letting them drive when appropriate.[^5]

要达到协作的最佳效果，你首先需要学习并接受我所说的社交的“三大支柱”。这三个原则不仅仅是人际关系的润滑剂，更是一切健康互动和协作的基础：

*支柱1：谦逊*
    你不是宇宙的中心（你的代码也不是！）。你既不是全方位的，也不是绝对正确的。你愿意不断提升自我。
*支柱2：尊重*
    你真诚地关心与你一起工作的人。你善待他们，欣赏他们的能力和成就。
*支柱3：信任*
    你相信其他人有能力并且会做正确的事情，你可以让他们在适当的时候牵头。

If you perform a root-cause analysis on almost any social conflict, you can ultimately trace it back to a lack of humility, respect, and/or trust. That might sound implausible at first, but give it a try. Think about some nasty or uncomfortable social situation currently in your life. At the basest level, is everyone being appropriately humble? Are people really respecting one another? Is there mutual trust?

如果你对所有社会冲突进行根本原因分析，你最终可以追溯到缺乏谦逊、尊重和信任。一开始听起来似乎不太可信，但不妨试一试。想想你生活中的一些令人尴尬或不舒服的社交场合。在最基本的层面上，每个人都适当地谦虚吗？人们真的互相尊重吗？有相互信任吗？

> [^5]:    This is incredibly difficult if you’ve been burned in the past by delegating to incompetent people./
> 5  如果你过去曾被委派给不称职的人，这将是非常困难的。

### Why Do These Pillars Matter?为什么这些支柱很重要？

When you began this chapter, you probably weren’t planning to sign up for some sort of weekly support group. We empathize. Dealing with social problems can be difficult: people are messy, unpredictable, and often annoying to interface with. Rather than putting energy into analyzing social situations and making strategic moves, it’s tempting to write off the whole effort. It’s much easier to hang out with a predictable compiler, isn’t it? Why bother with the social stuff at all?

当你开始这一章时，你可能没有计划参加某种每周支持小组。我们有同情心。处理社会问题可能很困难：人们杂乱无章，不可预测，而且常常令人讨厌。与其把精力放在分析社会状况和采取战略行动上，不如把所有的努力都一笔勾销。使用可预测的编译器要容易得多，不是吗？为什么还要为社交活动操心呢？

Here’s a quote from a famous lecture by Richard Hamming:

​    By taking the trouble to tell jokes to the secretaries and being a little friendly, I got superb secretarial help. For instance, one time for some idiot reason all the reproducing services at Murray Hill were tied up. Don’t ask me how, but they were. I wanted something done. My secretary called up somebody at Holmdel, hopped [into] the company car, made the hour-long trip down and got it reproduced, and then came back. It was a payoff for the times I had made an effort to cheer her up, tell her jokes and be friendly; it was that little extra work that later paid off for me. By realizing you have to use the system and studying how to get the system to do your work, you learn how to adapt the system to your desires.

以下是理查德·哈明（Richard Hamming）著名演讲中的一段话：

​    *通过不厌其烦地给秘书们讲笑话，并表现出一点友好，我得到了秘书的出色协作。例如，有一次由于某些愚蠢的原因，Murray Hill的所有复制服务都被占用了。别问我为什么，但他们是。但事实就是如此。我的秘书给Holmdel的某个人打了电话，跳上他们公司的车，花了一个小时把它复制下来，然后回来了。我努力让她高兴起来、给她讲笑话并保持友好，作为一种回报；正是这一点额外的工作后来给了我回报。通过认识到你必须使用这个系统并研究如何让这个系统来完成你的工作，你就学会了如何使这个系统实现你的需求。*

The moral is this: do not underestimate the power of playing the social game. It’s not about tricking or manipulating people; it’s about creating relationships to get things done. Relationships always outlast projects. When you’ve got richer relationships with your coworkers, they’ll be more willing to go the extra mile when you need them.

寓意是：不要低估社交游戏的力量。这不是欺骗或操纵人们；这是关于建立关系来完成事情。关系总是比项目更长久。当你和你的同事关系更融洽时，他们会更愿意在你需要他们的时候帮助你。

### Humility, Respect, and Trust in Practice 谦逊、尊重和信任的实践

All of this preaching about humility, respect, and trust sounds like a sermon. Let’s come out of the clouds and think about how to apply these ideas in real-life situations. We’re going to examine a list of specific behaviors and examples that you can start with. Many of them might sound obvious at first, but after you begin thinking about them, you’ll notice how often you (and your peers) are guilty of not following them—we’ve certainly noticed this about ourselves!

所有这些关于谦逊、尊重和信任的说教听起来像是布道。让我们从云端走出来，思考如何在现实生活中应用这些想法。我们将研究一系列具体的行为和例子，你可以从这些行为和例子入手。其中许多一开始听起来很明显，但在你开始思考它们之后，你会注意到你（和你的同龄人）经常因为没有遵循它们而感到内疚——我们当然注意到了这一点！

#### Lose the ego 丢掉自负

OK, this is sort of a simpler way of telling someone without enough humility to lose their ’tude. Nobody wants to work with someone who consistently behaves like they’re the most important person in the room. Even if you know you’re the wisest person in the discussion, don’t wave it in people’s faces. For example, do you always feel like you need to have the first or last word on every subject? Do you feel the need to comment on every detail in a proposal or discussion? Or do you know somebody who does these things?

好吧，这是一种更简单的方式，告诉那些没有足够谦卑的人失去他们的理智。没有人愿意和一个总是表现得像房间里最重要的人一样的人一起工作。即使你知道自己是讨论中最聪明的人，也不要当众挥舞。例如，你是否总是觉得你需要对每一个主题都说第一句话或最后一句话？你是否觉得有必要对提案或讨论中的每一个细节进行评论？或者你认识做的人吗？

Although it’s important to be humble, that doesn’t mean you need to be a doormat; there’s nothing wrong with self-confidence. Just don’t come off like a know-it-all. Even better, think about going for a “collective” ego, instead; rather than worrying about whether you’re personally awesome, try to build a sense of team accomplishment and group pride. For example, the Apache Software Foundation has a long history of creating communities around software projects. These communities have incredibly strong identities and reject people who are more concerned with self- promotion.

尽管谦虚很重要，但这并不意味着你需要做一个受气包；自信没有错。不要表现得像无所不知。最好的是，考虑以 "集体 "的自我为目标；与其担心你个人是否了不起，不如尝试建立一种团队成就感和团体自豪感。例如，Apache软件基金会一直致力于围绕软件项目创建社区。这些社区有着令人难以置信的强烈认同感，拒绝那些更关心自我宣传的人。

Ego manifests itself in many ways, and a lot of the time, it can get in the way of your productivity and slow you down. Here’s another great story from Hamming’s lecture that illustrates this point perfectly (emphasis ours):
    John Tukey almost always dressed very casually. He would go into an important office and it would take a long time before the other fellow realized that this is a first-class man and he had better listen. For a long time, John has had to overcome this kind of hostility. It’s wasted effort! I didn’t say you should conform; I said, “The appearance of conforming gets you a long way.” If you chose to assert your ego in any number of ways, “I am going to do it my way,” you pay a small steady price throughout the whole of your professional career. And this, over a whole lifetime, adds up to an enormous amount of needless trouble. […] By realizing you have to use the system and studying how to get the system to do your work, you learn how to adapt the system to your desires. Or you can fight it steadily, as a small, undeclared war, for the whole of your life.

自我表现在很多方面，很多时候，它会妨碍你的生产力，拖累你。下面是Hamming演讲中的另一个精彩故事，完美地说明了这一点（重点是我们的）：
	*John Tukey 几乎总是穿得很随便。他会走进一个重要会议，过了很长一段时间，另一个人才意识到这是一个牛逼的人，他最好听从。长期以来，约翰不得不克服这种敌意。这是白费力气！我没说你应该服从；我说，“顺从的外表让你走得更远。”如果你选择以任何一种方式来主张你的自我，"我要用我的方式来做"，你就会在整个职业生涯中付出确定的小代价。而这，在整个一生中，加起来就是一个大量的不必要的麻烦。[…]通过意识到你必须使用这个系统并研究如何让这个系统完成你的工作，你学会了如何让这个系统适应你的愿望。或者你可以在你的一生中，作为一场小型的、不宣而战的战争，稳扎稳打。*

#### Learn to give and take criticism 学会给出和接受批评

A few years ago, Joe started a new job as a programmer. After his first week, he really began digging into the codebase. Because he cared about what was going on, he started gently questioning other teammates about their contributions. He sent simple code reviews by email, politely asking about design assumptions or pointing out places where logic could be improved. After a couple of weeks, he was summoned to his director’s office. “What’s the problem?” Joe asked. “Did I do something wrong?” The director looked concerned: “We’ve had a lot of complaints about your behavior, Joe. Apparently, you’ve been really harsh toward your teammates, criticizing them left and right. They’re upset. You need to tone it down.” Joe was utterly baffled. Surely, he thought, his code reviews should have been welcomed and appreciated by his peers. In this case, however, Joe should have been more sensitive to the team’s widespread insecurity and should have used a subtler means to introduce code reviews into the culture—perhaps even something as simple as discussing the idea with the team in advance and asking team members to try it out for a few weeks.

几年前，乔开始了一份新工作，成为一个程序员。在第一周后，他真的开始钻研代码库。因为他关心正在发生的事情，他开始温和地询问其他队友的提交。他通过电子邮件发送简单的代码评审，礼貌地询问设计假设或指出可以改进逻辑的地方。几周后，他被传唤到主管办公室。“怎么了？”乔问。“我做错什么了吗？”主管看起来很担心：“乔，我们对你的行为有很多抱怨。显然，你对你的队友非常苛刻，到处批评他们。他们很不高兴。你需要淡化它。”乔完全不知所措。当然，他认为，他的代码审查应该受到同行的欢迎和赞赏。然而，在这种情况下，乔应该对团队普遍存在的不安全感更加敏感，并且应该使用更巧妙的方法将代码审查引入到文化中——甚至可能是一些简单的事情，比如事先与团队讨论这个想法，并请团队成员尝试几周。

In a professional software engineering environment, criticism is almost never personal—it’s usually just part of the process of making a better project. The trick is to make sure you (and those around you) understand the difference between a constructive criticism of someone’s creative output and a flat-out assault against someone’s character. The latter is useless—it’s petty and nearly impossible to act on. The former can (and should!) be helpful and give guidance on how to improve. And, most important, it’s imbued with respect: the person giving the constructive criticism genuinely cares about the other person and wants them to improve themselves or their work. Learn to respect your peers and give constructive criticism politely. If you truly respect someone, you’ll be motivated to choose tactful, helpful phrasing—a skill acquired with much practice. We cover this much more in Chapter 9.

在专业的软件工程环境中，批评几乎从来不是针对个人的，它通常只是构建更好项目过程的一部分。诀窍是确保你（和你周围的人）理解对某人的创造性产出进行建设性批评和对某人的人身攻击之间的区别。后者是无用的——它是琐碎，几乎不可能采取行动。前者可以（也应该！）提供帮助并指导如何改进。而且，最重要的是，它充满了尊重：给予建设性批评的人真正关心对方，希望他们提升自己或工作。学会尊重同龄人，礼貌地提出建设性的批评。如果你真的尊重别人——这是一种通过大量实践获得的技能。我们在第9章中对此有更多的介绍。

On the other side of the conversation, you need to learn to accept criticism as well. This means not just being humble about your skills, but trusting that the other person has your best interests (and those of your project!) at heart and doesn’t actually think you’re an idiot. Programming is a skill like anything else: it improves with practice. If a peer pointed out ways in which you could improve your juggling, would you take it as an attack on your character and value as a human being? We hope not. In the same way, your self-worth shouldn’t be connected to the code you write—or any creative project you build. To repeat ourselves: you are not your code. Say that over and over. You are not what you make. You need to not only believe it yourself, but get your coworkers to believe it, too.

另一方面，你也需要学会接受批评。这意味着不仅要对你的技能保持谦虚，还要相信对方心里有你的最佳利益（以及你项目的利益！），而不是真的认为你是个白痴。编程是一项与其他技能一样的技能：它随着实践而提高。如果一个同伴指出了你可以提升编程的方法，你会认为这是对你作为一个人的性格和价值观的攻击吗？我们希望不会。同样，你的自我价值不应该与你写的代码——或你建立的任何创造性项目相联系。反复说这句话。你不是你做的东西。你不仅要自己相信这一点，还要让你的同事也相信这一点。

For example, if you have an insecure collaborator, here’s what not to say: “Man, you totally got the control flow wrong on that method there. You should be using the standard xyzzy code pattern like everyone else.” This feedback is full of antipatterns: you’re telling someone they’re “wrong” (as if the world were black and white), demanding they change something, and accusing them of creating something that goes against what everyone else is doing (making them feel stupid). Your coworker will immediately be put on the offense, and their response is bound to be overly emotional.

例如，如果你有一个不安全的合作者，下面是不应该说的话：“伙计，你在那个方法上完全把控制流搞错了。你应该像其他人一样使用标准的XYZY代码模式。”这个反馈充满了反模式：你告诉某人他们“错了”（好像世界是黑白的），要求他们改变一些东西，并指责他们创造了与其他人的做法背道而驰（让他们觉得自己很愚蠢）。你的同事会立即受到冒犯，他们的反应必然是过于情绪化的。

A better way to say the same thing might be, “Hey, I’m confused by the control flow in this section here. I wonder if the xyzzy code pattern might make this clearer and easier to maintain?” Notice how you’re using humility to make the question about you, not them. They’re not wrong; you’re just having trouble understanding the code. The suggestion is merely offered up as a way to clarify things for poor little you while possibly helping the project’s long-term sustainability goals. You’re also not demanding anything—you’re giving your collaborator the ability to peacefully reject the suggestion. The discussion stays focused on the code itself, not on anyone’s value or coding skills.

更好的说法可能是，“嘿，我对这部分的控制流感到困惑。我想知道XYZY代码模式是否能让这更清晰、更容易维护？”注意你是如何用谦逊来回答关于你的问题，而不是他们。他们没有错；你只是理解代码有点困难。这个建议只是作为一种方式，为你澄清事情，同时可能有助于项目的长期可持续性目标。你也没有要求什么——你给了你的合作者和平拒绝建议的权力。讨论的重点是代码本身，而不是任何人的价值或编码技能。

#### Fail fast and iterate 快速失败并迭代

There’s a well-known urban legend in the business world about a manager who makes a mistake and loses an impressive $10 million. He dejectedly goes into the office the next day and starts packing up his desk, and when he gets the inevitable “the 
wants to see you in his office” call, he trudges into the CEO’s office and quietly slides a piece of paper across the desk.  
“What’s this?” asks the CEO.  
“My resignation,” says the executive. “I assume you called me in here to fire me.”  
“Fire you?” responds the CEO, incredulously. “Why would I fire you? I just spent $10 million training you!”[^6]  

商界有一个著名的城市传奇，说的是一位经理犯了一个错误，损失了令人印象深刻的1000万美元。第二天，他沮丧地走进办公室，开始收拾桌子。当他接到不可抗拒的“CEO让你去他办公室”电话时，他蹒跚地走进CEO办公室，悄悄地把一张纸递上桌子。  
"这是什么？"CEO问道。  
"我的辞呈，"这位经理说。"我想你叫我来是要解雇我。"  
"解雇你？"首席执行官难以置信地回答道。"我为什么要解雇你？我刚刚花了1000万美元培训你！"

It’s an extreme story, to be sure, but the CEO in this story understands that firing the executive wouldn’t undo the $10 million loss, and it would compound it by losing a valuable executive who he can be very sure won’t make that kind of mistake again.

的确，这是一个极端的故事，但在这个故事中，首席执行官明白解雇这名高管并不能挽回这1000万美元的损失，而且会因为失去一位有价值的高管，让事情变得更糟糕，他非常确定，这位高管不会再犯类似错误。

At Google, one of our favorite mottos is that “Failure is an option.” It’s widely recognized that if you’re not failing now and then, you’re not being innovative enough or taking enough risks. Failure is viewed as a golden opportunity to learn and improve for the next go-around.[^7] In fact, Thomas Edison is often quoted as saying, “If I find 10,000 ways something won’t work, I haven’t failed. I am not discouraged, because every wrong attempt discarded is another step forward.”

在谷歌，我们最喜欢的格言之一是“失败也是一种选择”。我们普遍认为，如果你没有遭遇过失败，你就没有足够的创新或承担足够的风险的能力。失败被视为一个黄金机会，可以在下一次尝试中学习和改进。事实上，人们经常引用托马斯·爱迪生的话说：“如果我发现有一万种方法不能成功，我就没有失败。我并不气馁，因为每一个被抛弃的错误尝试都是向前迈出的另一步”

Over in Google X—the division that works on “moonshots” like self-driving cars and internet access delivered by balloons—failure is deliberately built into its incentive system. People come up with outlandish ideas and coworkers are actively encouraged to shoot them down as fast as possible. Individuals are rewarded (and even compete) to see how many ideas they can disprove or invalidate in a fixed period of time. Only when a concept truly cannot be debunked at a whiteboard by all peers does it proceed to early prototype.

在谷歌X部门——该部门负责研究自动驾驶汽车和通过热气球提供互联网接入等 "登月计划"——故意将失败次数纳入其激励系统。人们会想出一些稀奇古怪的想法，同事们也会受到积极的鼓励尽快实现它们。每个人都会得到奖励（甚至是竞争），看看他们能在一段固定的时间内反驳或否定多少观点。只有当一个概念真的不能在白板上被所有同行揭穿时，它才能进入早期原型。

> [^6]:    You can find a dozen variants of this legend on the web, attributed to different famous managers./
> 6  你可以在网上找到这一传说的十几种变体，它们都是由不同的著名经理人创造的。
> 
> [^7]:    By the same token, if you do the same thing over and over and keep failing, it’s not failure, it’s incompetence./
> 7  同样的道理，如果你一次又一次地做同样的事情，却不断失败，那不是失败，而是无能。


### Blameless Post-Mortem Culture 无责的事后文化

The key to learning from your mistakes is to document your failures by performing a root-cause analysis and writing up a “postmortem,” as it’s called at Google (and many other companies). Take extra care to make sure the postmortem document isn’t just a useless list of apologies or excuses or finger-pointing—that’s not its purpose. A proper postmortem should always contain an explanation of what was learned and what is going to change as a result of the learning experience. Then, make sure that the postmortem is readily accessible and that the team really follows through on the proposed changes. Properly documenting failures also makes it easier for other people (present and future) to know what happened and avoid repeating history. Don’t erase your tracks—light them up like a runway for those who follow you!

从错误中学习的关键是通过进行根因分析和撰写“事后总结”来记录你的失败，在谷歌（和许多其他公司）成为事后总结（国内成为复盘）。要格外小心，确保 "事后总结 "文件不只是一份无用的道歉、借口或指责的清单，这不是它的目的。正确事后总结应该总是包含对所学到的内容的解释，以及作为学习经验作为后续的改进落地。然后，确保事后总结可以随时查阅，并确保团队真正贯彻执行所建议的改变。好的故障复盘要让其他人（现在和将来）知道发生了什么，避免重蹈覆辙。不要抹去你的足迹——让它们在道路上照亮给那些追随你的人!

A good postmortem should include the following:
- A brief summary of the event
- A timeline of the event, from discovery through investigation to resolution
- The primary cause of the event
- Impact and damage assessment
- A set of action items (with owners) to fix the problem immediately
- A set of action items to prevent the event from happening again
- Lessons learned

一个好的事后总结应该包括以下内容：
- 事件的简要概述
- 事件的时间线，从发现、调查到解决的过程
- 事件的主要原因
- 影响和损害评估
- 一套立即解决该问题的行动项目（包括执行人）。
- 一套防止事件再次发生的行动项目
- 经验教训

#### Learn patience 学会耐心

Years ago, I was writing a tool to convert CVS repositories to Subversion (and later, Git). Due to the vagaries of CVS, I kept unearthing bizarre bugs. Because my longtime friend and coworker Karl knew CVS quite intimately, we decided we should work together to fix these bugs.

几年前，我正在编写一个将CVS存储库转换为Subversion（后来是Git）的工具。由于CVS的变化无常，我不断发现各种奇怪的bug。因为我的老朋友兼同事Karl非常熟悉CVS，我们决定一起修复这些bug。

A problem arose when we began pair programming: I’m a bottom-up engineer who is content to dive into the muck and dig my way out by trying a lot of things quickly and skimming over the details. Karl, however, is a top-down engineer who wants to get the full lay of the land and dive into the implementation of almost every method on the call stack before proceeding to tackle the bug. This resulted in some epic interpersonal conflicts, disagreements, and the occasional heated argument. It got to the point at which the two of us simply couldn’t pair-program together: it was too frustrating for us both.

当我们开始结对编程时，一个问题出现了：我是一个自下而上的工程师，通过快速尝试许多事情和浏览细节，我满足于潜入泥潭并挖掘出路。然而，Karl是一名自上而下的工程师，他希望在着手解决bug之前，全面了解调用堆栈上所有方法的实现。这导致了一些史诗般的人际冲突、分歧和偶尔的激烈争论。到了这个地步，我们两个人根本无法一起配对编程：这对我们俩来说都太令人沮丧了。

That said, we had a longstanding history of trust and respect for each other. Combined with patience, this helped us work out a new method of collaborating. We would sit together at the computer, identify the bug, and then split up and attack the problem from two directions at once (top-down and bottom-up) before coming back together with our findings. Our patience and willingness to improvise new working styles not only saved the project, but also our friendship.

尽管如此，我们对彼此的信任和尊重由来已久。再加上耐心，这帮助我们制定了一个新的合作方法。我们会一起坐在电脑前，找出bug，然后从两个方向（自上而下和自下而上）拆分并同时解决问题，然后再返回继续查找bug。我们的耐心和即兴创作新工作方式的意愿不仅挽救了这个项目，而且也挽救了我们的友谊。

#### Be open to influence 接受影响

The more open you are to influence, the more you are able to influence; the more vulnerable you are, the stronger you appear. These statements sound like bizarre contradictions. But everyone can think of someone they’ve worked with who is just maddeningly stubborn—no matter how much people try to persuade them, they dig their heels in even more. What eventually happens to such team members? In our experience, people stop listening to their opinions or objections; instead, they end up “routing around” them like an obstacle everyone takes for granted. You certainly don’t want to be that person, so keep this idea in your head: it’s OK for someone else to change your mind. In the opening chapter of this book, we said that engineering is inherently about trade-offs. It’s impossible for you to be right about everything all the time unless you have an unchanging environment and perfect knowledge, so of course you should change your mind when presented with new evidence. Choose your battles carefully: to be heard properly, you first need to listen to others. It’s better to do this listening before putting a stake in the ground or firmly announcing a decision—if you’re constantly changing your mind, people will think you’re wishy-washy.

你对影响的态度越开放，你就越能影响。越是脆弱，越是强势。这些说法听起来相互矛盾。但每个人都能想到他们曾经共事过的人，他们的固执让人抓狂——无论人们如何劝说他们，他们都会更加钻牛角尖。这样的团队成员最终会发生什么？根据我们的经验，人们不再听取他们的任何意见，不论是赞同还是反对的意见；如果，这些固执的人解决了自己固执的问题，那么他们解决了大家都认为是障碍问题。你当然不希望成为这样的人，所以要把这个想法记在脑子里： 别人可以改变你的想法。在本书的开始，我们说过，工程本质上是关于权衡的。 除非你有一个不变的环境和完美的知识，否则你不可能一直对所有事情都是正确的，所以当有新的证据时，你当然应该改变你的最初想法。谨慎选择你的战斗：要想让别人正确地听取你的意见，你首先需要倾听别人的意见。最好在下定决心或坚定地宣布决定之前进行倾听——如果你不断地改变主意，人们会认为你不坚定。

The idea of vulnerability can seem strange, too. If someone admits ignorance of the topic at hand or the solution to a problem, what sort of credibility will they have in a group? Vulnerability is a show of weakness, and that destroys trust, right?

脆弱性的想法似乎也很奇怪。如果有人承认不知道手头的话题或问题的解决方案，那么他们在团队中会有什么样的可信度？脆弱是软弱的表现，这会破坏信任，对吗？

Not true. Admitting that you’ve made a mistake or you’re simply out of your league can increase your status over the long run. In fact, the willingness to express vulnerability is an outward show of humility, it demonstrates accountability and the willingness to take responsibility, and it’s a signal that you trust others’ opinions. In return, people end up respecting your honesty and strength. Sometimes, the best thing you can do is just say, “I don’t know.”

并非如此。从长远来看，承认自己犯了错误，或者根本不在你的能力范围，都会提高你的地位。事实上，表达脆弱性的意愿是一种谦逊的外在表现，它表明了责任感和承担责任的意愿，也是你信任他人意见的信号。作为回报，人们最终会尊重你的诚实和力量。有时，你能做的最好的事情就是说，"我不知道"。

Professional politicians, for example, are notorious for never admitting error or ignorance, even when it’s patently obvious that they’re wrong or unknowledgeable about a subject. This behavior exists primarily because politicians are constantly under attack by their opponents, and it’s why most people don’t believe a word that politicians say. When you’re writing software, however, you don’t need to be continually on the defensive—your teammates are collaborators, not competitors. You all have the same goal.

例如，职业政客因从不承认错误或无知而臭名昭著，即使他们在某个问题上显然是错的或无知的。存在这种行为主要是因为政客们经常受到对手的攻击，这就是为什么大多数人不相信政客们说的一个字。然而，当你在编写软件时，你不需要不断地保持防备状态——你的团队成员是合作者，而不是竞争对手。你们都有相同的目标。

### Being Googley  成为谷歌范

At Google, we have our own internal version of the principles of “humility, respect, and trust” when it comes to behavior and human interactions.

在谷歌，当涉及到行为和人际交往时，我们有自己的内部版本的“谦逊、尊重和信任”原则。

From the earliest days of our culture, we often referred to actions as being “Googley” or “not Googley.” The word was never explicitly defined; rather, everyone just sort of took it to mean “don’t be evil” or “do the right thing” or “be good to each other.” Over time, people also started using the term “Googley” as an informal test for culture-fit whenever we would interview a candidate for an engineering job, or when writing internal performance reviews of one another. People would often express opinions about others using the term; for example, “the person coded well, but didn’t seem to have a very Googley attitude.”

从我们早期文化开始，我们经常将行为称为“谷歌的”或“不是谷歌的”；相反，每个人都把它理解为“不作恶”、“做正确的事”或“善待彼此”。随着时间的推移，人们也开始使用“Googley”一词作为一种非正式的文化契合度测试，无论是在我们面试一名工程师岗位的应聘者时，还是在撰写彼此的内部绩效评估时。人们经常会用这个词表达对他人的看法；例如，“这个人编码很好，但似乎没有很好的Googley态度。”

Of course, we eventually realized that the term “Googley” was being overloaded with meaning; worse yet, it could become a source of unconscious bias in hiring or evaluations. If “Googley” means something different to every employee, we run the risk of the term starting to mean “is just like me.” Obviously, that’s not a good test for hiring
—we don’t want to hire people “just like me,” but people from a diverse set of backgrounds and with different opinions and experiences. An interviewer’s personal desire to have a beer with a candidate (or coworker) should never be considered a valid signal about somebody else’s performance or ability to thrive at Google.

当然，我们最终意识到“Googley”这个词的含义太多了；更糟糕的是，它可能成为招聘或评估中无意识偏见的来源。如果“Googley”对每个员工都有不同的含义，那么我们就有可能把“Googley”这个词的意思改成“和我一样”。显然，这不是一个好的招聘模式——我们不希望招聘 "和我一样 "的人，而是来自不同背景、有不同意见和经验的人。面试官想和候选人（或同事）一起喝啤酒的愿望，绝不应该被认为是关于其他人的表现或在谷歌发展的能力的有效信号。

Google eventually fixed the problem by explicitly defining a rubric for what we mean by “Googleyness”—a set of attributes and behaviors that we look for that represent strong leadership and exemplify “humility, respect, and trust”:
- *Thrives in ambiguity*  
    Can deal with conflicting messages or directions, build consensus, and make progress against a problem, even when the environment is constantly shifting.
- *Values feedback*  
    Has humility to both receive and give feedback gracefully and understands how valuable feedback is for personal (and team) development.
- *Challenges status quo*  
    Is able to set ambitious goals and pursue them even when there might be resistance or inertia from others.
- *Puts the user first*  
    Has empathy and respect for users of Google’s products and pursues actions that are in their best interests.
- *Cares about the team*  
    Has empathy and respect for coworkers and actively works to help them without being asked, improving team cohesion.
- *Does the right thing*  
    Has a strong sense of ethics about everything they do; willing to make difficult or inconvenient decisions to protect the integrity of the team and product.

谷歌最终解决了这个问题，明确定义了我们所说的“谷歌特质”（Googleyness）——我们所寻找的一套属性和行为，代表了强大的领导力，体现了 "谦逊、尊重和信任"：
- *在模棱两可中茁壮成长*  
	即使在环境不断变化的情况下，也能处理相互冲突的信息或方向，建立共识，并对问题做出改进。
- *重视反馈*  
	谦虚优雅地接受和给出反馈，理解反馈对个人（和团队）发展的价值。
- *走出舒适区*  
	能够设定宏伟的目标并去追求，即使有来自他人的抵制或惰性。
- *客户第一*  
	对谷歌产品的用户抱有同情和尊重，并追求符合其最佳利益的行动。
- *关心团队*  
	对同事抱有同情心和尊重，并积极主动地帮助他们，提高团队凝聚力。
- *做正确的事*  
	对自己所做的一切有强烈的主人感；愿意做出困难或不易的决定以保护团队和产品的完整。

Now that we have these best-practice behaviors better defined, we’ve begun to shy away from using the term “Googley.” It’s always better to be specific about expectations!

现在我们有了这些最佳实践行为的更好定义，我们已经开始避免使用 "Googley "这个词了。更好的是对期望值有一个具体的说明。

## Conclusion 结论

The foundation for almost any software endeavor—of almost any size—is a well- functioning team. Although the Genius Myth of the solo software developer still persists, the truth is that no one really goes it alone. For a software organization to stand the test of time, it must have a healthy culture, rooted in humility, trust, and respect that revolves around the team, rather than the individual. Further, the creative nature of software development requires that people take risks and occasionally fail; for people to accept that failure, a healthy team environment must exist.

几乎任何规模的软件工作的基础都是一个运作良好的团队。尽管软件开发者单打独斗的 "天才神话 "仍然存在，但事实是，没有人能够真正地单干。一个软件组织要想经受住时间的考验，就必须有一种健康的文化，植根于谦逊、信任和尊重，围绕着团队而不是个人。此外，软件开发的创造性要求人们承担风险并偶尔失败；为了让人们接受这种失败，必须有一个健康的团队环境。

## TL;DRs  内容提要

- Be aware of the trade-offs of working in isolation.
- Acknowledge the amount of time that you and your team spend communicating and in interpersonal conflict. A small investment in understanding personalities and working styles of yourself and others can go a long way toward improving productivity.
- If you want to work effectively with a team or a large organization, be aware of your preferred working style and that of others.

- 意识到孤立工作的得失。
- 认识到你和你的团队花在沟通和人际冲突上的时间。在了解自己和他人的个性和工作风格方面进行少量投入，对提高生产力有很大帮助。
- 如果你想在一个团队或一个大型组织中有效地工作，要意识到你和其他人喜欢的工作风格。
