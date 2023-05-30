
**CHAPTER 24**

# Continuous Delivery

# 第二十四章 持续交付

**Written by adha Narayan, Bobbi Jones, Sheri Shipe, and David Owens**

**Edited by Lisa Carey**

Given how quickly and unpredictably the technology landscape shifts, the competitive advantage for any product lies in its ability to quickly go to market. An organization’s velocity is a critical factor in its ability to compete with other players, maintain product and service quality, or adapt to new regulation. This velocity is bottlenecked by the time to deployment. Deployment doesn’t just happen once at initial launch. There is a saying among educators that no lesson plan survives its first contact with the student body. In much the same way, no software is perfect at first launch, and the only guarantee is that you’ll have to update it. Quickly.

鉴于技术领域的变化是如此之快且不可预测，任何产品的竞争优势都在于其快速进入市场的能力。一个组织的速度是其与其他参与者竞争、保持产品和服务质量或适应新法规能力的关键因素。这种速度受到部署时间的瓶颈制约。部署不会在初始启动时只发生一次。教育工作者们有一种说法，没有一个教案能在第一次与学生接触后幸存下来。同样，没有软件在第一次发布时就是完美的，唯一的保证是你需要快速更新它。

The long-term life cycle of a software product involves rapid exploration of new ideas, rapid responses to landscape shifts or user issues, and enabling developer velocity at scale. From Eric Raymond’s The Cathedral and the Bazaar to Eric Reis’ The Lean Startup, the key to any organization’s long-term success has always been in its ability to get ideas executed and into users’ hands as quickly as possible and reacting quickly to their feedback. Martin Fowler, in his book Continuous Delivery (aka CD), points out that “The biggest risk to any software effort is that you end up building something that isn’t useful. The earlier and more frequently you get working software in front of real users, the quicker you get feedback to find out how valuable it really is.”

软件产品的长期生命周期包括快速探索新想法、快速响应环境(行业)变化或用户问题，以及实现大规模开发速度。从埃里克·雷蒙德（Eric Raymond）的《大教堂与集市》（The Cathedral and The Bazaar）到埃里克·赖斯（Eric Reis）的《精益创业》（The Lean Startup），任何组织长期成功的关键始终在于其能够尽快将想法付诸实施并交到用户手中，并对他们的反馈做出快速反应。马丁·福勒（Martin Fowler）在其著作《持续交付》（Continuous Delivery，又名CD）中指出，“任何软件工作的最大风险是，你最终建立的东西并不实用。你越早、越频繁地将工作中的软件展现在真正的用户面前，你就能越快地得到反馈，发现它到底有多大价值。”

Work that stays in progress for a long time before delivering user value is high risk and high cost, and can even be a drain on morale. At Google, we strive to release early and often, or “launch and iterate,” to enable teams to see the impact of their work quickly and to adapt faster to a shifting market. The value of code is not realized at the time of submission but when features are available to your users. Reducing the time between “code complete” and user feedback minimizes the cost of work that is in progress.

在交付用户价值之前进行很长时间的工作是高风险和高成本的，甚至可能会消耗士气。在谷歌，我们努力做到早期和经常发布，或者说 "发布和迭代"，以使团队能够迅速看到他们工作的影响，并更快地适应不断变化的市场。代码的价值不是在提交时实现的，而是在你的用户可以使用的功能时实现的。缩短 "代码完成"和用户反馈之间的时间，可以将正在进行中的工作的成本降到最低。

    You get extraordinary outcomes by realizing that the launch *never lands* but that it begins a learning cycle where you then fix the next most important thing, measure how it went, fix the next thing, etc.—and it is *never complete*.
    —David Weekly, Former Google product manager

    当你意识到发射从未着陆，但它开始了一个学习周期，然后你修复下一个最重要的事情，衡量它如何进行，修复下一个事情，等等——而且它永远不会完成。
    -David Weekly，前谷歌产品经理

At Google, the practices we describe in this book allow hundreds (or in some cases thousands) of engineers to quickly troubleshoot problems, to independently work on new features without worrying about the release, and to understand the effectiveness of new features through A/B experimentation. This chapter focuses on the key levers of rapid innovation, including managing risk, enabling developer velocity at scale, and understanding the cost and value trade-off of each feature you launch.

在谷歌，我们在本书中描述的做法使数百名（或在某些情况下数千名）工程师能够快速解决问题，独立完成新功能而不必担心发布问题，并通过A/B实验了解新功能的有效性。本章重点关注快速创新的关键措施，包括管理风险、实现大规模的开发者速度，以及了解你推出的每个功能的成本和价值权衡。

## Idioms of Continuous Delivery at Google 谷歌持续交付的习惯用法

A core tenet of Continuous Delivery (CD) as well as of Agile methodology is that over time, smaller batches of changes result in higher quality; in other words, *faster is safer*. This can seem deeply controversial to teams at first glance, especially if the prerequisites for setting up CD—for example, Continuous Integration (CI) and testing— are not yet in place. Because it might take a while for all teams to realize the ideal of CD, we focus on developing various aspects that deliver value independently en route to the end goal. Here are some of these:

- *Agility*  
    Release frequently and in small batches

- *Automation*  
​    Reduce or remove repetitive overhead of frequent releases

- *Isolation*  
​    Strive for modular architecture to isolate changes and make troubleshooting easier

- *Reliability*  
​    Measure key health indicators like crashes or latency and keep improving them

- *Data-driven* *decision* *making*  
​    Use A/B testing on health metrics to ensure quality

- *Phased* *rollout*  
​    Roll out changes to a few users before shipping to everyone

持续交付（CD）以及敏捷方法论的一个核心原则是，随着时间的推移，较小的变更批次能够产生更高的质量；换句话说，越快越安全。乍一看，这似乎对团队有很大的争议，尤其是当建立CD的前提条件--例如，持续集成（CI）和测试--还没有到位的时候。因为所有团队可能需要一段时间才能实现CD的理想，所以我们将重点放在开发能够在实现最终目标的过程中独立交付价值的各个方面。下面是其中的一些：

- *敏捷性*  
​    频繁地、较小的变更批次地发布。

- *自动化*  
​    减少或消除频繁发布的重复性开销。

- *隔离性*  
​    努力实现模块化体系结构，以隔离更改并使故障排除更加容易。

- *可靠性*  
​    衡量关键的健康指标，如崩溃或延迟，并不断改善它们。

- *数据驱动的决策*  
​    在健康指标上使用A/B测试以确保质量。

- *分阶段推出*  
​    在向所有人发送之前，先在少数用户中推广变更。

At first, releasing new versions of software frequently might seem risky. As your userbase grows, you might fear the backlash from angry users if there are any bugs that you didn’t catch in testing, and you might quite simply have too much new code in your product to test exhaustively. But this is precisely where CD can help. Ideally, there are so few changes between one release and the next that troubleshooting issues is trivial. In the limit, with CD, every change goes through the QA pipeline and is automatically deployed into production. This is often not a practical reality for many teams, and so there is often work of culture change toward CD as an intermediate step, during which teams can build their readiness to deploy at any time without actually doing so, building up their confidence to release more frequently in the future.

 起初，频繁发布新版本的软件可能看起来很冒险。随着用户群的增长，如果在测试中发现任何错误，你可能会担心用户的反弹，而且你的产品中可能有太多新代码，无法彻底测试。但这恰恰是CD可以帮助的地方。理想情况下，一个版本和下一个版本之间的变化非常少，排除问题是非常简单的。在极限情况下，有了CD，每个变化都会通过QA管道，并自动部署到生产中。对于许多团队来说，这通常不是一个实际的现实，因此往往需要进行向CD文化的转变工作作为中间步骤，团队可以在不实际部署的情况下建立部署准备性，增强未来更频繁发布的信心。

## Velocity Is a Team Sport: How to Break Up a Deployment into Manageable Pieces   速度是一项团队运动：如何将部署工作分解成可管理的部分

When a team is small, changes come into a codebase at a certain rate. We’ve seen an antipattern emerge as a team grows over time or splits into subteams: a subteam branches off its code to avoid stepping on anyone’s feet, but then struggles, later, with integration and culprit finding. At Google, we prefer that teams continue to develop at head in the shared codebase and set up CI testing, automatic rollbacks, and culprit finding to identify issues quickly. This is discussed at length in Chapter 23.

当一个团队较小的时候，代码变化以一定的速度进入一个代码库。我们看到，随着时间的推移，一个团队的成长或分裂成子团队，会出现一种反模式：一个子团队将其代码分支，以避免踩到其他团队的脚，但之后却会遇到集成和故障排查的问题。在谷歌，我们更倾向于团队继续在共享代码库中进行开发，并设置CI测试、自动回滚和故障查找，以快速识别问题。这在第23章中有详细的讨论。

One of our codebases, YouTube, is a large, monolithic Python application. The release process is laborious, with Build Cops, release managers, and other volunteers. Almost every release has multiple cherry-picked changes and respins. There is also a 50-hour manual regression testing cycle run by a remote QA team on every release. When the operational cost of a release is this high, a cycle begins to develop in which you wait to push out your release until you’re able to test it a bit more. Meanwhile, someone wants to add just one more feature that’s almost ready, and pretty soon you have yourself a release process that’s laborious, error prone, and slow. Worst of all, the experts who did the release last time are burned out and have left the team, and now nobody even knows how to troubleshoot those strange crashes that happen when you try to release an update, leaving you panicky at the very thought of pushing that button.

我们的一个代码库，YouTube，是一个大型的、单体的Python应用程序。发布过程很费劲，有Build Cops、发布经理和其他志愿者。每个发布版本都需要多次 cherry-pick（选择性合并）代码变更和重新打包等过程。此外，还有需要由远程QA团队运行的50小时手工回归测试周期。当一个发布的操作成本如此之高时，就会形成一个循环，在这个循环中，你要等待测试更多，才能推出发布版本。与此同时，有人想再增加一个几乎已经准备好的功能，很快你就有了一个费力、容易出错和缓慢的发布过程。最糟糕的是，上次做发布工作的专家已经精疲力尽，离开了团队，现在甚至没有人知道如何解决那些当你试图发布更新时发生的奇怪崩溃，让你一想到要按下那个按钮就感到恐慌。

If your releases are costly and sometimes risky, the *instinct* is to slow down your release cadence and increase your stability period. However, this only provides short- term stability gains, and over time it slows velocity and frustrates teams and users. The *answer* is to reduce cost, increase discipline, and make the risks more incremental, but it is critical to resist the obvious operational fixes and invest in long-term architectural changes. The obvious operational fixes to this problem lead to a few traditional approaches: reverting to a traditional planning model that leaves little room for learning or iteration, adding more governance and oversight to the development process, and implementing risk reviews or rewarding low-risk (and often low-value) features.

如果你的发布是昂贵的，有时是有风险的，那么*本能*的反应是放慢你的发布节奏，增加你的稳定期。然而，这只能提供短期的稳定性收益，随着时间的推移，它会减慢速度，使团队和用户感到沮丧。答案是降低成本，增加纪律，使风险更加渐进式，但关键是要抵制明显的操作修复，投资于长期的架构变化。对这个问题的明显的操作性修正导致了一些传统的方法：恢复到传统的计划模式，为学习或迭代留下很少的空间，为开发过程增加更多的治理和监督，以及实施风险审查或奖励低风险（通常是低价值）的功能。

The investment with the best return, though, is migrating to a microservice architecture, which can empower a large product team with the ability to remain scrappy and innovative while simultaneously reducing risk. In some cases, at Google, the answer has been to rewrite an application from scratch rather than simply migrating it, establishing the desired modularity into the new architecture. Although either of these options can take months and is likely painful in the short term, the value gained in terms of operational cost and cognitive simplicity will pay off over an application’s lifespan of years.

不过，回报率最高的投资是迁移到微服务架构，这可以使一个大型产品团队有能力保持活力和创新，同时降低风险。在某些情况下，在谷歌，答案是从头开始重写一个应用程序，而不是简单地迁移它，在新的架构中建立所需的模块化。尽管这两种选择都需要几个月的时间，而且在短期内可能是痛苦的，但在运营成本和认知的简单性方面获得的价值将在应用程序多年的生命周期中得到回报。

## Evaluating Changes in Isolation: Flag-Guarding Features 评估隔离中的更改：标志保护功能

A key to reliable continuous releases is to make sure engineers “flag guard” *all changes*. As a product grows, there will be multiple features under various stages of development coexisting in a binary. Flag guarding can be used to control the inclusion or expression of feature code in the product on a feature-by-feature basis and can be expressed differently for release and development builds. A feature flag disabled for a build should allow build tools to strip the feature from the build if the language permits it. For instance, a stable feature that has already shipped to customers might be enabled for both development and release builds. A feature under development might be enabled only for development, protecting users from an unfinished feature. New feature code lives in the binary alongside the old codepath—both can run, but the new code is guarded by a flag. If the new code works, you can remove the old codepath and launch the feature fully in a subsequent release. If there’s a problem, the flag value can be updated independently from the binary release via a dynamic config update.

可靠的连续发布的关键是确保工程师“通过标志保护”所有更改。随着产品的发展，在二进制文件中，将有处于不同开发阶段的多种功能共存。以单个功能为单位，标志保护位决定了功能的代码在产品中是否被包含或如何呈现，并可在发布和开发版本中以不同方式表达。如果编程语言允许，打上”禁用”标志的功能标志位会使得构建工具从对应的版本构建中剥离该功能。例如，一个已经提供给客户的稳定特性可能会在开发版本和发布版本中启用。正在开发的功能可能仅为开发而启用，从而保护用户不受未完成功能的影响。新的特性代码与旧的代码路径一起存在于二进制文件中，两者都可以运行，但新代码由一个标志保护。如果新代码有效，你可以删除旧代码路径，并在后续版本中完全启动该功能。如果出现问题，可以通过动态配置更新独立于二进制版本更新标志值。

In the old world of binary releases, we had to time press releases closely with our binary rollouts. We had to have a successful rollout before a press release about new functionality or a new feature could be issued. This meant that the feature would be out in the wild before it was announced, and the risk of it being discovered ahead of time was very real.

在过去的二进制发布的世界里，我们必须将新闻发布时间与二进制发布时间紧密协调。在发布关于新功能或新功能的新闻稿之前，我们必须进行成功的发布。这意味着该功能将在发布之前就已经公开，提前被发现的风险是非常现实的。

This is where the beauty of the flag guard comes to play. If the new code has a flag, the flag can be updated to turn your feature on immediately before the press release, thus minimizing the risk of leaking a feature. Note that flag-guarded code is not a *perfect* safety net for truly sensitive features. Code can still be scraped and analyzed if it’s not well obfuscated, and not all features can be hidden behind flags without adding a lot of complexity. Moreover, even flag configuration changes must be rolled out with care. Turning on a flag for 100% of your users all at once is not a great idea, so a configuration service that manages safe configuration rollouts is a good investment. Nevertheless, the level of control and the ability to decouple the destiny of a particular feature from the overall product release are powerful levers for long-term sustainability of the application.

这就是标志守卫的优势所在。如果新的代码有一个标志，标在发布新功能之前可以立即更新该标志，从而最大限度地减少泄露功能的风险。请注意，对于真正敏感的功能，有标志的代码并不是一个完美的安全网。如果代码没有被很好地混淆，它仍然可以被抓取和分析，而且不是所有的功能都可以隐藏在标志后面而不增加太多复杂性。此外，即使是标志配置的改变，也必须谨慎地推出。一次性为100%的用户打开一个标志并不是一个好主意，所以一个能管理安全配置推出的配置服务是一个很好的投资。尽管如此，对于长期可持续性的应用程序而言，控制的水平和将特定功能的命运与整体产品发布分离的能力是强大的杠杆作用。

## Striving for Agility: Setting Up a Release Train 为敏捷而奋斗：建立一个发布序列

Google’s Search binary is its first and oldest. Large and complicated, its codebase can be tied back to Google’s origin—a search through our codebase can still find code written at least as far back as 2003, often earlier. When smartphones began to take off, feature after mobile feature was shoehorned into a hairball of code written primarily for server deployment. Even though the Search experience was becoming more vibrant and interactive, deploying a viable build became more and more difficult. At one point, we were releasing the Search binary into production only once per week, and even hitting that target was rare and often based on luck.

谷歌搜索是其最早也是最古老的二进制文件。它的代码库庞大而复杂，可以追溯到谷歌的起源--在我们的代码库中搜索，仍然可以找到至少早在2003年编写的代码，通常更早。当智能手机开始使用时，一个接一个的移动功能被塞进了一大堆主要为服务器部署而编写的代码中。尽管搜索体验变得更加生动和互动，部署一个可行的构建变得越来越困难。有一次，我们每周只发布一次搜索二进制文件到生产中，而即使达到这个目标也是很难得的，而且往往要靠运气。

When one of our contributing authors, Sheri Shipe, took on the project of increasing our release velocity in Search, each release cycle was taking a group of engineers days to complete. They built the binary, integrated data, and then began testing. Each bug had to be manually triaged to make sure it wouldn’t impact Search quality, the user experience (UX), and/or revenue. This process was grueling and time consuming and did not scale to the volume or rate of change. As a result, a developer could never know when their feature was going to be released into production. This made timing press releases and public launches challenging.

当我们的贡献作者之一Sheri Shipe承担了提高搜索发布速度的项目时，每个发布周期都需要一组工程师几天才能完成。他们构建了二进制集成数据，然后开始测试。每一个bug都必须进行手动分类，以确保它不会影响搜索质量、用户体验（UX）和/或收入。这一过程既费时又费力，而且不能适应变化的数量和速度。因此，开发人员永远不可能知道他们的特性将在何时发布到生产环境中。这使得新闻发布和公开发布的时间安排具有挑战性。

Releases don’t happen in a vacuum, and having reliable releases makes the dependent factors easier to synchronize. Over the course of several years, a dedicated group of engineers implemented a continuous release process, which streamlined everything about sending a Search binary into the world. We automated what we could, set deadlines for submitting features, and simplified the integration of plug-ins and data into the binary. We could now consistently release a new Search binary into production every other day.

发布不是在真空中发生的，拥有可靠的发布使得依赖性因素更容易同步。在几年的时间里，一个专门的工程师小组实施了一个持续的发布过程，它简化了关于向世界发送搜索二进制文件的所有工作。我们把我们能做的事情自动化，为提交功能设定最后期限，并简化插件和数据到二进制文件的集成。我们现在可以每隔一天发布一个新的搜索二进制文件。

What were the trade-offs we made to get predictability in our release cycle? They narrow down to two main ideas we baked into the system.

为了在发布周期中获得可预测性，我们做了哪些权衡？他们把我们融入系统的两个主要想法归纳了下来。

### No Binary Is Perfect 没有完美的二进制包

The first is that *no binary is perfect*, especially for builds that are incorporating the work of tens or hundreds of developers independently developing dozens of major features. Even though it’s impossible to fix every bug, we constantly need to weigh questions such as: If a line has been moved two pixels to the left, will it affect an ad display and potential revenue? What if the shade of a box has been altered slightly? Will it make it difficult for visually impaired users to read the text? The rest of this book is arguably about minimizing the set of unintended outcomes for a release, but in the end we must admit that software is fundamentally complex. There is no perfect binary—decisions and trade-offs have to be made every time a new change is released into production. Key performance indicator metrics with clear thresholds allow features to launch even if they aren’t perfect[^1] and can also create clarity in otherwise contentious launch decisions.

首先，*没有一个二进制包是完美的*，，尤其是对于包含数十个或数百个独立开发几十个主要功能的开发人员的工作的构建。尽管不可能修复每个bug，但我们需要不断权衡这样的问题：如果一条线向左移动了两个像素，它会影响广告显示和潜在收入吗？如果盒子的颜色稍微改变了怎么办？这是否会让视障用户难以阅读文本？本书的其余部分可以说是关于最小化发布的一系列意外结果，但最终我们必须承认软件从根本上来说是复杂的。没有完美的二进制包--每当有新的变化发布到生产中时，就必须做出决定和权衡。具有明确阈值的关键性能指标允许功能在不完美的情况下推出，也可以在其他有争议的发布决策中创造清晰的思路。

One bug involved a rare dialect spoken on only one island in the Philippines. If a user asked a search question in this dialect, instead of an answer to their question, they would get a blank web page. We had to determine whether the cost of fixing this bug was worth delaying the release of a major new feature.

其中一个bug涉及一种罕见的方言，这种方言只在菲律宾的一个岛屿上使用。如果用户用这种方言问搜索问题，而不是回答他们的问题，他们会得到一个空白网页。我们必须确定修复这个bug的成本是否值得推迟发布一个重要的新特性。

We ran from office to office trying to determine how many people actually spoke this language, if it happened every time a user searched in this language, and whether these folks even used Google on a regular basis. Every quality engineer we spoke with deferred us to a more senior person. Finally, data in hand, we put the question to Search’s senior vice president. Should we delay a critical release to fix a bug that affected only a very small Philippine island? It turns out that no matter how small your island, you should get reliable and accurate search results: we delayed the release and fixed the bug.

我们奔走于各个办公室，试图确定究竟有多少人讲这种语言，是否每次用户用这种语言搜索时都会出现这种情况，以及这些人是否经常使用谷歌。每个与我们交谈的质量工程师都把我们推给更高级别的人。最后，数据在手，我们把问题交给了搜索部的高级副总裁。我们是否应该推迟一个重要的版本来修复一个只影响到菲律宾一个很小的岛屿的错误？事实证明，无论你的岛有多小，你都应该得到可靠和准确的搜索结果：我们推迟了发布，并修复了这个错误。

> [^1]:  Remember the SRE “error-budget” formulation: perfection is rarely the best goal. Understand how much room for error is acceptable and how much of that budget has been spent recently and use that to adjust the trade-off between velocity and stability.
>
> 1 记住SRE的 "错误预算 "表述：完美很少是最佳目标。了解多少误差空间是可以接受的，以及该预算最近花了多少，并利用这一点来调整速度和稳定性之间的权衡。

### Meet Your Release Deadline 满足你的发布期限

The second idea is that *if you’re late for the release train, it will leave without you*. There’s something to be said for the adage, “deadlines are certain, life is not.” At some point in the release timeline, you must put a stake in the ground and turn away developers and their new features. Generally speaking, no amount of pleading or begging will get a feature into today’s release after the deadline has passed.

第二个想法是，*如果你赶不上发布列车，它就会丢下你离开*。有一句格言值得一提，“最后期限是确定的，而生活不是。”在发布时间表的某个时刻，你必须立木取信，拒绝开发人员及其新功能。一般来说，在截止日期过后，无论多少恳求或乞求都不会在今天的版本中出现。

There is the *rare* exception. The situation usually goes like this. It’s late Friday evening and six software engineers come storming into the release manager’s cube in a panic. They have a contract with the NBA and finished the feature moments ago. But it must go live before the big game tomorrow. The release must stop and we must cherry- pick the feature into the binary or we’ll be in breach of contract! A bleary-eyed release engineer shakes their head and says it will take four hours to cut and test a new binary. It’s their kid’s birthday and they still need to pick up the balloons.

有一个*罕见的例外*。这种情况通常是这样的。周五晚间，六名软件工程师惊慌失措地冲进发布经理的办公室。他们与NBA签订了合同，并在不久前完成了这个功能。但它必须在明天的大比赛之前上线。发布必须停止，我们必须将该特性插入二进制包，否则我们将违反合同！"。一个目光呆滞的发布工程师摇摇头，说切割和测试一个新的二进制文件需要四个小时。今天是他们孩子的生日，他们还需要带着气球回家。

A world of regular releases means that if a developer misses the release train, they’ll be able to catch the next train in a matter of hours rather than days. This limits developer panic and greatly improves work–life balance for release engineers.

定期发布的世界意味着，如果开发人员错过了发版班车，他们将能够在几个小时而不是几天内赶上下一班班车。这限制了开发人员的恐慌，并大大改善了发布工程师的工作与生活平衡。

## Quality and User-Focus: Ship Only What Gets Used 质量和用户关注点：只提供使用的产品

Bloat is an unfortunate side effect of most software development life cycles, and the more successful a product becomes, the more bloated its code base typically becomes. One downside of a speedy, efficient release train is that this bloat is often magnified and can manifest in challenges to the product team and even to the users. Especially if the software is delivered to the client, as in the case of mobile apps, this can mean the user’s device pays the cost in terms of space, download, and data costs, even for features they never use, whereas developers pay the cost of slower builds, complex deployments, and rare bugs. In this section, we’ll talk about how dynamic deployments allow you to ship only what is used, forcing necessary trade-offs between user value and feature cost. At Google, this often means staffing dedicated teams to improve the efficiency of the product on an ongoing basis.

臃肿是大多数软件开发生命周期的一个不幸的副作用，产品越成功，其代码库通常就越臃肿。快速、高效的发布系列的一个缺点是，这种臃肿经常被放大，并可能表现为对产品团队甚至用户的挑战。特别是如果软件交付给客户端（如移动应用程序），这可能意味着用户的设备要支付空间、下载和数据成本，即使是他们从未使用过的功能，而开发人员要支付构建速度较慢、部署复杂和罕见bug的成本。在本节中，我们将讨论动态部署如何允许你仅发布所使用的内容，从而在用户价值和功能成本之间进行必要的权衡。在谷歌，这通常意味着配备专门的团队，以不断提高产品的效率。

Whereas some products are web-based and run on the cloud, many are client applications that use shared resources on a user’s device—a phone or tablet. This choice in itself showcases a trade-off between native apps that can be more performant and resilient to spotty connectivity, but also more difficult to update and more susceptible to platform-level issues. A common argument against frequent, continuous deployment for native apps is that users dislike frequent updates and must pay for the data cost and the disruption. There might be other limiting factors such as access to a network or a limit to the reboots required to percolate an update.

有些产品是基于网络并在云上运行的，而许多产品是客户端应用程序，使用用户设备上的共享资源--手机或平板电脑。这种选择本身就展示了原生应用之间的权衡，原生应用可以有更高的性能，对不稳定的连接有弹性，但也更难更新，更容易受到平台问题的影响。反对原生应用频繁、持续部署的一个常见论点是，用户不喜欢频繁的更新，而且必须为数据成本和中断付费。可能还有其他限制因素，如访问网络或限制渗透更新所需的重新启动。

Even though there is a trade-off to be made in terms of how frequently to update a product, the goal is to *have these choices be intentional*. With a smooth, well-running CD process, how often a viable release is *created* can be separated from how often a user *receives* it. You might achieve the goal of being able to deploy weekly, daily, or hourly, without actually doing so, and you should intentionally choose release processes in the context of your users’ specific needs and the larger organizational goals, and determine the staffing and tooling model that will best support the long-term sustainability of your product.

即使在更新产品的频率方面需要做出权衡，但目标是*让这些选择是有意的决策*。有了一个平滑、运行良好的CD流程，创建一个可行版本的频率可以与用户收到它的频率分开。你可能会实现每周、每天或每小时部署一次的目标，但实际上并没有这样做。你应该根据用户的具体需求和更大的组织目标有意识地选择发布流程，并确定最能支持产品长期可持续性的人员配置和工具模型。

Earlier in the chapter, we talked about keeping your code modular. This allows for dynamic, configurable deployments that allow better utilization of constrained resources, such as the space on a user’s device. In the absence of this practice, every user must receive code they will never use to support translations they don’t need or architectures that were meant for other kinds of devices. Dynamic deployments allow apps to maintain small sizes while only shipping code to a device that brings its users value, and A/B experiments allow for intentional trade-offs between a feature’s cost and its value to users and your business.

在本章的前面部分，我们讨论了保持代码模块化。这允许动态、可配置的部署，以便更好地利用有限资源，例如用户设备上的空间。在没有这种实践的情况下，每个用户都必须收到他们永远不会使用的代码，以支持他们不需要的翻译或用于其他类型设备的架构。动态部署允许应用程序保持较小的尺寸，同时只将代码发送给能为用户带来价值的设备，而A/B实验允许在功能的成本及其对用户和企业的价值之间进行有意义的权衡。

There is an upfront cost to setting up these processes, and identifying and removing frictions that keep the frequency of releases lower than is desirable is a painstaking process. But the long-term wins in terms of risk management, developer velocity, and enabling rapid innovation are so high that these initial costs become worthwhile.

建立这些流程是有前期成本的，识别和消除使发布频率低于理想水平的阻力是一个艰苦的工作。但是，在风险管理、开发者速度和实现快速创新方面的长期胜利是如此之高，以至于这些初始成本是值得的。

## Shifting Left: Making Data-Driven Decisions Earlier 左移：提前做出数据驱动的决策

If you’re building for all users, you might have clients on smart screens, speakers, or Android and iOS phones and tablets, and your software may be flexible enough to allow users to customize their experience. Even if you’re building for only Android devices, the sheer diversity of the more than two billion Android devices can make the prospect of qualifying a release overwhelming. And with the pace of innovation, by the time someone reads this chapter, whole new categories of devices might have bloomed.

如果你是为所有用户建立应用程序，你可能在智能屏幕、扬声器或Android和iOS手机和平板电脑上有客户，你的软件可能足够灵活，允许用户定制他们的体验。即使你只为安卓设备构建，超过20亿的安卓设备的多样性也会使一个版本的场景变得不堪重负。随着创新的步伐，当有人读到这一章时，全新的设备类别可能已经出现。

One of our release managers shared a piece of wisdom that turned the situation around when he said that the diversity of our client market was not a *problem*, but a *fact*. After we accepted that, we could switch our release qualification model in the following ways:

- If *comprehensive* testing is practically infeasible, aim for *representative* testing instead.
- Staged rollouts to slowly increasing percentages of the userbase allow for fast fixes.
- Automated A/B releases allow for statistically significant results proving a release’s quality, without tired humans needing to look at dashboards and make decisions.

我们的一位发布经理分享了一条智慧，他说我们客户市场的多样性不是问题，而是事实，这扭转了局面。在我们接受后，我们可以通过以下方式切换我们的发布资格模型：

- 如果*全面*的测试实际上是不可行的，就以*代表性*的测试为目标。
- 分阶段向用户群中慢慢增加的百分比进行发布，可以快速修复问题。
- 自动的A/B发布允许统计学上有意义的结果来证明一个版本的质量，而无需疲惫的人去看仪表盘和做决定。

When it comes to developing for Android clients, Google apps use specialized testing tracks and staged rollouts to an increasing percentage of user traffic, carefully monitoring for issues in these channels. Because the Play Store offers unlimited testing tracks, we can also set up a QA team in each country in which we plan to launch, allowing for a global overnight turnaround in testing key features.

在为Android客户端开发时，谷歌应用程序使用专门的测试轨道和分阶段推出，以增加用户流量的百分比，仔细监控这些渠道中的问题。由于Play Store提供无限的测试轨道，我们还可以在我们计划推出的每个国家/地区建立一个QA团队，允许在全球范围内一夜之间完成关键功能的测试。

One issue we noticed when doing deployments to Android was that we could expect a statistically significant change in user metrics *simply from pushing an update*. This meant that even if we made no changes to our product, pushing an update could affect device and user behavior in ways that were difficult to predict. As a result, although canarying the update to a small percentage of user traffic could give us good information about crashes or stability problems, it told us very little about whether the newer version of our app was in fact better than the older one.

我们在Android部署时注意到的一个问题是，仅仅通过推送更新，我们就可以预期用户指标会发生统计上的显著变化。这意味着，即使我们没有对产品进行任何更改，推动更新也可能以难以预测的方式影响设备和用户行为。因此，尽管对一小部分用户流量进行更新可以为我们提供关于崩溃或稳定性问题的良好信息，但它几乎没有告诉我们更新版本的应用程序是否比旧版本更好。

Dan Siroker and Pete Koomen have already discussed the value of A/B testing[^2] your features, but at Google, some of our larger apps also A/B test their *deployments*. This means sending out two versions of the product: one that is the desired update, with the baseline being a placebo (your old version just gets shipped again). As the two versions roll out simultaneously to a large enough base of similar users, you can compare one release against the other to see whether the latest version of your software is in fact an improvement over the previous one. With a large enough userbase, you should be able to get statistically significant results within days, or even hours. An automated metrics pipeline can enable the fastest possible release by pushing forward a release to more traffic as soon as there is enough data to know that the guardrail metrics will not be affected.

Dan Siroker和Pete Koomen已经讨论了A/B测试的价值，但在Google，我们的一些大型应用也对其*部署*进行A/B测试。这意味着发送两个版本的产品：一个是所需的更新，基线是一个安慰剂（你的旧版本只是被再次发送）。当这两个版本同时向足够多的类似用户推出时，你可以将一个版本与另一个版本进行比较，看看你的软件的最新版本是否真的比以前的版本有所改进。有了足够大的用户群，你应该能够在几天内，甚至几小时内得到统计学上的显著结果。一个自动化的指标管道可以实现最快的发布，只要有足够的数据知道护栏指标不会受到影响，就可以将一个版本推到更多的流量。

Obviously, this method does not apply to every app and can be a lot of overhead when you don’t have a large enough userbase. In these cases, the recommended best practice is to aim for change-neutral releases. All new features are flag guarded so that the only change being tested during a rollout is the stability of the deployment itself.

显然，这种方法并不适用于每个应用程序，当你没有足够大的用户群时，可能会有很多开销。在这种情况下，推荐的最佳做法是以变化中立的发布为目标。所有的新功能都有标志保护，这样在发布过程中测试的唯一变化就是部署本身的稳定性。

> [^2]:  Dan Siroker and Pete Koomen, *A/B Testing: The Most Powerful Way to Turn Clicks Into Customers* (Hoboken: Wiley, 2013).
>
> 2   Dan Siroker和Pete Koomen，《A/B测试：将点击转化为客户的最有效方式》（Hoboken:Wiley，2013）。

## Changing Team Culture: Building Discipline into Deployment 改变团队文化：在部署中建立规则

Although “Always Be Deploying” helps address several issues affecting developer velocity, there are also certain practices that address issues of scale. The initial team launching a product can be fewer than 10 people, each taking turns at deployment and production-monitoring responsibilities. Over time, your team might grow to hundreds of people, with subteams responsible for specific features. As this happens and the organization scales up, the number of changes in each deployment and the amount of risk in each release attempt is increasing superlinearly. Each release contains months of sweat and tears. Making the release successful becomes a high-touch and labor-intensive effort. Developers can often be caught trying to decide which is worse: abandoning a release that contains a quarter’s worth of new features and bug fixes, or pushing out a release without confidence in its quality.

尽管“始终进行部署”有助于解决影响开发人员速度的几个问题，但也有一些实践可以解决规模问题。启动产品的初始团队可以少于10人，每个人轮流负责部署和生产监控。随着时间的推移，你的团队可能会发展到数百人，其中的子团队负责特定的功能。随着这种情况的发生和组织规模的扩大，每次部署中的更改数量和每次发布尝试中的风险量都呈超线性增长。每次发布都包含数月的汗水和泪水。使发布成功成为一项高度沟通和劳动密集型的工作。开发人员经常会被发现试图决定哪一个更糟糕：放弃一个包含四分之一新特性和错误修复的版本，或者在对其质量没有信心的情况下推出一个版本。

At scale, increased complexity usually manifests as increased release latency. Even if you release every day, a release can take a week or longer to fully roll out safely, leaving you a week behind when trying to debug any issues. This is where “Always Be Deploying” can return a development project to effective form. Frequent release trains allow for minimal divergence from a known good position, with the recency of changes aiding in resolving issues. But how can a team ensure that the complexity inherent with a large and quickly expanding codebase doesn’t weigh down progress?

在规模扩大时，复杂性的增加通常表现为发布延迟的增加。即使你每天都发布，一个版本也可能需要一周或更长的时间才能完全安全地发布，当你试图调试任何问题时，就会落后一周。这就是 "始终进行部署 "可以使开发项目恢复到有效状态的地方。频繁的发版班车允许从一个已知的良好状态中产生最小的偏差，变化的频率有助于解决问题。但是，一个团队如何才能确保一个庞大而快速扩展的代码库所固有的复杂性不会拖累进度呢？

On Google Maps, we take the perspective that features are very important, but only very seldom is any feature so important that a release should be held for it. If releases are frequent, the pain a feature feels for missing a release is small in comparison to the pain all the new features in a release feel for a delay, and especially the pain users can feel if a not-quite-ready feature is rushed to be included.

在谷歌地图上，我们的观点是：功能是非常重要的，但只有在非常少的情况下，才会有如此重要的功能需要发布。如果发布的频率很高，那么一个功能因为错过了一个版本而感到的痛苦与一个版本中所有的新功能因为延迟而感到的痛苦相比是很小的，特别是如果一个还没有准备好的功能被匆忙纳入，用户会感到痛苦。

One release responsibility is to protect the product from the developers.

一个发布责任是保护产品不受开发人员的影响。

When making trade-offs, the passion and urgency a developer feels about launching a new feature can never trump the user experience with an existing product. This means that new features must be isolated from other components via interfaces with strong contracts, separation of concerns, rigorous testing, communication early and often, and conventions for new feature acceptance.

在进行权衡时，开发人员对推出新功能的热情和紧迫感永远不能超过对现有产品的用户体验。这意味着，新功能必须通过具有强大契约的接口、关注点分离、严格测试、早期和经常的沟通以及新功能验收的惯例，与其他组件隔离。

## Conclusion 总结

Over the years and across all of our software products, we’ve found that, counterintuitively, faster is safer. The health of your product and the speed of development are not actually in opposition to each other, and products that release more frequently and in small batches have better quality outcomes. They adapt faster to bugs encountered in the wild and to unexpected market shifts. Not only that, faster is *cheaper*, because having a predictable, frequent release train forces you to drive down the cost of each release and makes the cost of any abandoned release very low.

多年来，在我们所有的软件产品中，我们发现，相反，更快更安全。你的产品的健康状况和开发速度实际上并不是相互对立的，更频繁和小批量发布的产品具有更好的质量结果。它们能更快地适应在野外遇到的错误和意外的市场变化。不仅如此，更快就是*便宜*，因为有一个可预测的、频繁的发版班车，迫使你降低每个版本的成本，并使任何被放弃的发布的成本非常低。

Simply having the structures in place that *enable* continuous deployment generates the majority of the value, *even if you don’t actually push those releases out to users*. What do we mean? We don’t actually release a wildly different version of Search, Maps, or YouTube every day, but to be able to do so requires a robust, well- documented continuous deployment process, accurate and real-time metrics on user satisfaction and product health, and a coordinated team with clear policies on what makes it in or out and why. In practice, getting this right often also requires binaries that can be configured in production, configuration managed like code (in version control), and a toolchain that allows safety measures like dry-run verification, rollback/rollforward mechanisms, and reliable patching.

仅仅拥有*能够*持续部署的结构，就能产生大部分的价值，*即使你没有真正把这些版本推送给用户*。我们的意思是什么呢？我们实际上并不是每天都发布一个完全不同的搜索、地图或YouTube的版本，但要做到这一点，就需要一个健壮的、有良好文档记录的连续部署过程、关于用户满意度和产品健康状况的准确实时指标，以及一个协调一致的团队，该团队拥有明确的策略，以确定成功与否以及原因。在实践中，要做到这一点，往往还需要可以在生产中配置的二进制包，像代码一样管理的配置（在版本控制中），以及一个可以采取安全措施的工具链，如干运行验证、回滚/前滚机制和可靠的补丁。

## TL;DRs  内容提要

- *Velocity is a team sport*: The optimal workflow for a large team that develops code collaboratively requires modularity of architecture and near-continuous integration.
- Evaluate changes in isolation: Flag guard any features to be able to isolate prob‐ lems early.
- Make reality your benchmark: Use a staged rollout to address device diversity and the breadth of the userbase. Release qualification in a synthetic environment that isn’t similar to the production environment can lead to late surprises.
- Ship only what gets used: Monitor the cost and value of any feature in the wild to know whether it’s still relevant and delivering sufficient user value.
- Shift left: Enable faster, more data-driven decision making earlier on all changes through CI and continuous deployment.
- Faster is safer: Ship early and often and in small batches to reduce the risk of each release and to minimize time to market.

- *速度是一项团队运动*。协作开发代码的大型团队的最佳工作流程需要架构的模块化和近乎连续的集成。
- 孤立地评估变化。对任何功能进行标记，以便能够尽早隔离问题。
- 让现实成为你的基准。使用分阶段推出的方式来解决设备的多样性和用户群的广泛性。在一个与生产环境不相似的合成环境中进行发布鉴定，会导致后期的意外。
- 只发布被使用的东西。监控任何功能的成本和价值，以了解它是否仍有意义，是否能提供足够的用户价值。
- 向左移动。通过CI和持续部署，使所有的变化更快，更多的数据驱动的决策更早。
- 更快是更安全的。尽早地、经常地、小批量地发布，以减少每次发布的风险，并尽量缩短上市时间。
