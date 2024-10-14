
**CHAPTER 22**

# Large-Scale Changes

# 第二十二章 大规模变更

**Written by Hyrum Wright**

**Edited by Lisa Carey**

Think for a moment about your own codebase. How many files can you reliably update in a single, simultaneous commit? What are the factors that constrain that number? Have you ever tried committing a change that large? Would you be able to do it in a reasonable amount of time in an emergency? How does your largest commit size compare to the actual size of your codebase? How would you test such a change? How many people would need to review the change before it is committed? Would you be able to roll back that change if it did get committed? The answers to these questions might surprise you (both what you *think* the answers are and what they actually turn out to be for your organization).

思考一下你自己的代码库。在一次同步提交中，你可以可靠地更新多少个文件？限制这一数值的因素有哪些？你有没有试过做出这么大的改变？在紧急情况下，你能在合理的时间内完成吗？你的最大提交大小与代码库的实际大小相比如何？你将如何测试这种变更？在提交更改之前，需要多少人进行审查？如果它确实被提交，你是否能够回滚该更改？这些问题的答案可能会让你大吃一惊（无论是你*认为*答案是什么，还是它们对你的组织来说实际情况怎么样）。

At Google, we’ve long ago abandoned the idea of making sweeping changes across our codebase in these types of large atomic changes. Our observation has been that, as a codebase and the number of engineers working in it grows, the largest atomic change possible counterintuitively *decreases—*running all affected presubmit checks and tests becomes difficult, to say nothing of even ensuring that every file in the change is up to date before submission. As it has become more difficult to make sweeping changes to our codebase, given our general desire to be able to continually improve underlying infrastructure, we’ve had to develop new ways of reasoning about large-scale changes and how to implement them.

在谷歌，我们很久之前就放弃了大型原子变更对代码库大规模变更的想法。我们的观察到的结果是，随着代码库和在其中工作的工程师数量的增加，最大的原子性更改可能会反直觉地减少，运行所有受影响的预提交检查和测试变得困难，更不用说确保更改中的每个文件在提交前都是最新的了。随着对代码库进行全面更改变得越来越困难，考虑到我们希望能够持续改进底层基础设施的普遍愿望，我们不得不开发新的方法来推理大规模更改以及如何实现这些更改。

In this chapter, we’ll talk about the techniques, both social and technical, that enable us to keep the large Google codebase flexible and responsive to changes in underlying infrastructure. We’ll also provide some real-life examples of how and where we’ve used these approaches. Although your codebase might not look like Google’s, understanding these principles and adapting them locally will help your development organization scale while still being able to make broad changes across your codebase.

在这一章中，我们将谈论社会和技术方面的技巧，这些技术使我们能够保持谷歌大型代码库的灵活性，并对底层基础设施的变化做出响应。我们还将提供一些实际例子，说明我们如何以及在何处使用这些方法。尽管你的代码库可能不像谷歌的代码库，但了解这些原则并对其进行局部调整，将有助于你的开发组织在扩大规模的同时，仍然能够对你的代码库进行大规模的变更。

## What Is a Large-Scale Change? 什么是大规模的变更？

Before going much further, we should dig into what qualifies as a large-scale change (LSC). In our experience, an LSC is any set of changes that are logically related but cannot practically be submitted as a single atomic unit. This might be because it touches so many files that the underlying tooling can’t commit them all at once, or it might be because the change is so large that it would always have merge conflicts. In many cases, an LSC is dictated by your repository topology: if your organization uses a collection of distributed or federated repositories,[^1] making atomic changes across them might not even be technically possible.[^2] We’ll look at potential barriers to atomic changes in more detail later in this chapter.

在进一步讨论之前，我们应该探讨一下什么是大规模变更（LSC）。根据我们的经验，LSC是指任何一组逻辑上相关但实际上不能作为一个单一的原子单元提交的变更。这可能是因为它涉及到文件太多，以至于底层工具无法一次性提交所有文件，也可能是因为变化太大，总是会有合并冲突。在很多情况下，LSC是由你的版本库的拓扑结构决定的：如果你的组织使用分布式或联邦版本库集合，在它们之间进行原子修改在技术上可能是不可能的。我们将在本章后面详细讨论原子变更的潜在障碍。

LSCs at Google are almost always generated using automated tooling. Reasons for making an LSC vary, but the changes themselves generally fall into a few basic categories:

- Cleaning up common antipatterns using codebase-wide analysis tooling
- Replacing uses of deprecated library features
- Enabling low-level infrastructure improvements, such as compiler upgrades
- Moving users from an old system to a newer one[^3]

谷歌的LSC几乎都是使用自动工具生成的。制作LSC的原因各不相同，但修改本身通常分为几个基本类别：

- 使用代码库范围内的分析工具来清理常见的反模式
- 替换已废弃的库特性的使用
- 实现底层基础架构改进，如编译器升级
- 将用户从旧系统转移到新系统

The number of engineers working on these specific tasks in a given organization might be low, but it is useful for their customers to have insight into the LSC tools and process. By their very nature, LSCs will affect a large number of customers, and the LSC tools easily scale down to teams making only a few dozen related changes.

在一个特定的组织中，从事这些特定任务的工程师的数量可能不多，但对于他们的客户来说，深入了解LSC工具和流程是很有用的。就其性质而言，LSC将影响大量的客户，而LSC工具很容易扩展到只做几十个相关变更的团队。

There can be broader motivating causes behind specific LSCs. For example, a new language standard might introduce a more efficient idiom for accomplishing a given task, an internal library interface might change, or a new compiler release might require fixing existing problems that would be flagged as errors by the new release. The majority of LSCs across Google actually have near-zero functional impact: they tend to be widespread textual updates for clarity, optimization, or future compatibility. But LSCs are not theoretically limited to this behavior-preserving/refactoring class of change.

在特定的LSC背后可能有更广泛的动机。例如，新的语言标准可能会引入一种更有效的习惯用法来完成给定的任务，内部库接口可能会更改，或者新的编译器版本可能需要修复新版本标记为错误的现有问题。谷歌的大多数LSC实际上几乎没有功能影响：它们往往是为了清晰、优化或未来兼容性而进行的广泛文本更新。但从理论上讲，LSC并不局限于这种行为保持/重构类型的变化。

In all of these cases, on a codebase the size of Google’s, infrastructure teams might routinely need to change hundreds of thousands of individual references to the old pattern or symbol. In the largest cases so far, we’ve touched millions of references, and we expect the process to continue to scale well. Generally, we’ve found it advantageous to invest early and often in tooling to enable LSCs for the many teams doing infrastructure work. We’ve also found that efficient tooling also helps engineers performing smaller changes. The same tools that make changing thousands of files efficient also scale down to tens of files reasonably well.

在所有这些情况下，在像谷歌这样规模的代码库中，基础设施团队可能经常需要改变数十万个对旧模式或符号的单独引用。在迄今为止最大的案例中，我们已经触及了数百万个引用，而且我们希望这个过程能够继续良好地扩展。一般来说，我们发现尽早且经常投资于工具，以便为许多从事基础设施工作的团队启用LSC是一种优势。我们还发现，高效的工具也有助于工程师进行更小的更改。同样的工具可以有效地更改数千个文件，也可以很好地扩展到数十个文件。

> [^1]:  For some ideas about why, see Chapter 16.
>
> 1 关于原因的一些想法，见第16章。
>
> [^2]:  It’s possible in this federated world to say “we’ll just commit to each repo as fast as possible to keep the duration of the build break small!” But that approach really doesn’t scale as the number of federated repositories grows.
>
> 2 在这个联合的世界里，我们可以说 "我们将尽可能快地提交到每个 repo，以保持较小的构建中断时间！" 但这种方法实际上不能随着联合代码库数量的增长而扩展。
>
> [^3]: For a further discussion about this practice, see Chapter 15.
>
> 3 关于这种做法的进一步讨论，见第15章。

## Who Deals with LSCs? 谁负责处理LSC？

As just indicated, the infrastructure teams that build and manage our systems are responsible for much of the work of performing LSCs, but the tools and resources are available across the company. If you skipped Chapter 1, you might wonder why infrastructure teams are the ones responsible for this work. Why can’t we just introduce a new class, function, or system and dictate that everybody who uses the old one move to the updated analogue? Although this might seem easier in practice, it turns out not to scale very well for several reasons.

如前所述，构建和管理我们系统的基础架构团队负责执行LSC的大部分工作，但工具和资源在整个公司都可用。如果你跳过了第1章，你可能会想，为什么基础设施团队负责这项工作。为什么我们不能引入一个新的类、函数或系统，并要求所有使用旧类、函数或系统的人都使用更新后的类、函数或系统？虽然这在实践中似乎更容易实现，但由于几个原因，它的扩展性不是很好。

First, the infrastructure teams that build and manage the underlying systems are also the ones with the domain knowledge required to fix the hundreds of thousands of references to them. Teams that consume the infrastructure are unlikely to have the context for handling many of these migrations, and it is globally inefficient to expect them to each relearn expertise that infrastructure teams already have. Centralization also allows for faster recovery when faced with errors because errors generally fall into a small set of categories, and the team running the migration can have a playbook—formal or informal—for addressing them.

首先，构建和管理底层系统的基础设施团队也具备修复数十万对它们的引用所需的领域知识。使用基础架构的团队不太可能具备处理许多此类迁移的背景，并且期望他们重新学习基础架构团队已经具备的专业技能在全球范围内是低效的。集中化处理还允许在遇到错误时更快地恢复，因为错误通常属于一小部分类别，运行迁移的团队可以有一个正式或非正式的预案来解决这些错误。

Consider the amount of time it takes to do the first of a series of semi-mechanical changes that you don’t understand. You probably spend some time reading about the motivation and nature of the change, find an easy example, try to follow the provided suggestions, and then try to apply that to your local code. Repeating this for every team in an organization greatly increases the overall cost of execution. By making only a few centralized teams responsible for LSCs, Google both internalizes those costs and drives them down by making it possible for the change to happen more efficiently.

考虑一下做一系列你不理解的半自动化变更中的第一次所需的时间。你可能会花一些时间来阅读关于更改的动机和性质，找到一个简单的例子，尝试遵循所提供的建议，然后尝试将其应用于你的本地代码。对组织中的每个团队重复此操作会大大增加执行的总体成本。通过只让几个集中的团队负责LSC，谷歌将这些成本内部化，并通过使变革更有效地发生来降低成本。

Second, nobody likes unfunded mandates.[^4] Even though a new system might be categorically better than the one it replaces, those benefits are often diffused across an organization and thus unlikely to matter enough for individual teams to want to update on their own initiative. If the new system is important enough to migrate to, the costs of migration will be borne somewhere in the organization. Centralizing the migration and accounting for its costs is almost always faster and cheaper than depending on individual teams to organically migrate.

第二，没有人喜欢没有资金支持的任务。即使一个新的系统在本质上可能比它所取代的系统更好，这些好处往往分散在整个组织中，因此不太可能重要到让个别团队想要主动更新。如果新系统足够重要，需要迁移到新系统，那么迁移的成本将由组织的某个部门承担。集中迁移和核算其成本，几乎总是比依靠各个团队的有机迁移更快、更便宜。

Additionally, having teams that own the systems requiring LSCs helps align incentives to ensure the change gets done. In our experience, organic migrations are unlikely to fully succeed, in part because engineers tend to use existing code as examples when writing new code. Having a team that has a vested interest in removing the old system responsible for the migration effort helps ensure that it actually gets done. Although funding and staffing a team to run these kinds of migrations can seem like an additional cost, it is actually just internalizing the externalities that an unfunded mandate creates, with the additional benefits of economies of scale.

此外，拥有需要LSC的系统的团队有助于调整激励机制，以确保完成更改。根据我们的经验，有机迁移不太可能完全成功，部分原因是工程师在编写新代码时倾向于使用现有代码作为例子。由一个对移除旧系统有既得利益的团队负责迁移工作，有助于确保迁移工作真正完成。尽管为一个团队提供资金和人员配置来运行这类迁移似乎是一项额外的成本，但它实际上只是将没有资金的授权所产生的外部性内部化，并带来规模经济的额外好处。

> [^4]:  By “unfunded mandate,” we mean “additional requirements imposed by an external entity without balancing compensation.” Sort of like when the CEO says that everybody must wear an evening gown for “formal Fridays” but doesn’t give you a corresponding raise to pay for your formal wear.
>
> 4  我们所说的“无资金授权”是指“外部实体在不平衡薪酬的情况下强加的额外要求”。有点像CEO说每个人都必须在“正式星期五”穿晚礼服，但没有给你相应的加薪来支付正式着装的费用。

-----

##### Case Study: Filling Potholes 案例研究：填补坑洞

Although the LSC systems at Google are used for high-priority migrations, we’ve also discovered that just having them available opens up opportunities for various small fixes across our codebase, which just wouldn’t have been possible without them. Much like transportation infrastructure tasks consist of building new roads as well as repairing old ones, infrastructure groups at Google spend a lot of time fixing existing code, in addition to developing new systems and moving users to them.

尽管谷歌的LSC系统用于高优先级迁移，但我们也发现，只要有它们，就可以在我们的代码库中提供各种小补丁，没有它们是不可能的。就像交通基础设施任务包括修建新道路和修复旧道路一样，谷歌的基础设施团队除了开发新系统和将用户转移到新系统之外，还花费大量时间修复现有代码。

For example, early in our history, a template library emerged to supplement the C++ Standard Template Library. Aptly named the Google Template Library, this library consisted of several header files’ worth of implementation. For reasons lost in the mists of time, one of these header files was named *stl_util.h* and another was named *map-util.h* (note the different separators in the file names). In addition to driving the consistency purists nuts, this difference also led to reduced productivity, and engineers had to remember which file used which separator, and only discovered when they got it wrong after a potentially lengthy compile cycle.

例如，在我们历史的早期，出现了一个模板库来补充C++标准模板库。这个库被恰当地命名为谷歌模板库，它包括几个头文件的实现。由于时间上的原因，其中一个头文件被命名为*stl_util.h*，另一个被命名为*map-util.h*（注意文件名中的不同分隔符）。除了让纯粹的一致性主义者发疯之外，这种差异也导致了生产力的下降，工程师们不得不记住哪个文件使用了哪个分隔符，只有在他们在潜在的漫长的编译周期中弄错了才会发现。

Although fixing this single-character change might seem pointless, particularly across a codebase the size of Google’s, the maturity of our LSC tooling and process enabled us to do it with just a couple weeks’ worth of background-task effort. Library authors could find and apply this change en masse without having to bother end users of these files, and we were able to quantitatively reduce the number of build failures caused by this specific issue. The resulting increases in productivity (and happiness) more than paid for the time to make the change.

虽然修复这个单一字符的变化看起来毫无意义，尤其是在像谷歌这样规模的代码库中，但我们的LSC工具和流程的成熟度使我们只需花几周的时间就能完成这个任务。库的作者可以发现并应用这一变化，而不必打扰这些文件的终端用户，我们能够从数量上减少由这一特定问题引起的构建失败的数量。由此带来的生产力（和幸福感）的提高超过了做这个改变的时间成本。

As the ability to make changes across our entire codebase has improved, the diversity of changes has also expanded, and we can make some engineering decisions knowing that they aren’t immutable in the future. Sometimes, it’s worth the effort to fill a few potholes.

随着在整个代码库中进行更改的能力的提高，更改的多样性也得到了扩展，我们可以做出一些工程决策，知道这些决策在未来并非一成不变。有时，为填补一些坑洞而付出努力是值得的。

-----

## Barriers to Atomic Changes  原子变更的障碍

Before we discuss the process that Google uses to actually effect LSCs, we should talk about why many kinds of changes can’t be committed atomically. In an ideal world, all logical changes could be packaged into a single atomic commit that could be tested, reviewed, and committed independent of other changes. Unfortunately, as a repository—and the number of engineers working in it—grows, that ideal becomes less feasible. It can be completely infeasible even at small scale when using a set of distributed or federated repositories.

在我们讨论 Google 实际影响LSC的过程之前，我们应该先谈谈为什么很多种类的更改不能原子提交。在理想情况下，所有逻辑更改都可以打包成单个原子提交，可以独立于其他更改进行测试、审查和提交。不幸的是，随着版本库和在其中工作的工程师数量的增加，这种理想变得不太可行。当使用一组分布式或联邦版本库时，即使在小规模下也完全不可行。

### Technical Limitations  技术限制

To begin with, most Version Control Systems (VCSs) have operations that scale linearly with the size of a change. Your system might be able to handle small commits (e.g., on the order of tens of files) just fine, but might not have sufficient memory or processing power to atomically commit thousands of files at once. In centralized VCSs, commits can block other writers (and in older systems, readers) from using the system as they process, meaning that large commits stall other users of the system.

首先，大多数版本控制系统（VCS）的操作都会随着更改的大小进行线性扩展。你的系统可能能够很好地处理小规模提交（例如，几十个文件的数量），但可能没有足够的内存或处理能力来一次性提交成千上万的文件。在集中式VCS中，提交会阻止其他写入程序（以及在旧系统中的读卡器）在处理时使用系统，这意味着大型提交会使系统的其他用户陷入停滞。

In short, it might not be just “difficult” or “unwise” to make a large change atomically: it might simply be impossible with a given infrastructure. Splitting the large change into smaller, independent chunks gets around these limitations, although it makes the execution of the change more complex.[^5]

简言之，以原子方式进行大规模更改可能不仅仅是“困难”或“不明智的”：对于给定的基础设施，这可能根本不可能。将较大的更改拆分为较小的独立块可以绕过这些限制，尽管这会使更改的执行更加复杂。

> [^5]:  See [*https://ieeexplore.ieee.org/abstract/document/8443579*](https://ieeexplore.ieee.org/abstract/document/8443579).
>
> 5  查阅 [*https://ieeexplore.ieee.org/abstract/document/8443579*](https://ieeexplore.ieee.org/abstract/document/8443579)。

### Merge Conflicts 合并冲突

As the size of a change grows, the potential for merge conflicts also increases. Every version control system we know of requires updating and merging, potentially with manual resolution, if a newer version of a file exists in the central repository. As the number of files in a change increases, the probability of encountering a merge conflict also grows and is compounded by the number of engineers working in the repository.

随着变更规模的增加，合并冲突的可能性也会增加。我们知道的每个版本控制系统都需要更新和合并，如果中央版本库中存在较新版本的文件，则可能需要手动分析。随着更改中文件数量的增加，遇到合并冲突的可能性也会增加，并且使用版本库工作的工程师数量也会增加。

If your company is small, you might be able to sneak in a change that touches every file in the repository on a weekend when nobody is doing development. Or you might have an informal system of grabbing the global repository lock by passing a virtual (or even physical!) token around your development team. At a large, global company like Google, these approaches are just not feasible: somebody is always making changes to the repository.

如果你的公司很小，你可能会在周末没有人做开发的时候，偷偷地修改版本库中的每个文件。或者你可能有一个非正式的系统，通过在开发团队中传递一个虚拟的（甚至是物理的！）令牌来抓取全局的版本库锁。在谷歌这样的大公司，这些方法是不可行的：任何时候都总有人在对版本库进行修改。

With few files in a change, the probability of merge conflicts shrinks, so they are more likely to be committed without problems. This property also holds for the following areas as well.

由于更改中的文件很少，合并冲突的可能性会减小，因此它们更有可能在提交时不会出现问题。该属性也适用于以下领域。

### No Haunted Graveyards  没有闹鬼的墓地

The SREs who run Google’s production services have a mantra: “No Haunted Graveyards.” A haunted graveyard in this sense is a system that is so ancient, obtuse, or complex that no one dares enter it. Haunted graveyards are often business-critical systems that are frozen in time because any attempt to change them could cause the system to fail in incomprehensible ways, costing the business real money. They pose a real existential risk and can consume an inordinate amount of resources.

运营谷歌生产服务的SRE们有一句格言：“没有闹鬼墓地”。从这个意义上说，闹鬼墓地是一个如此古老、迟钝或复杂的系统，以至于没有人敢进入它。闹鬼的墓地往往是被冻结的关键业务系统，因为任何试图改变它们的行为都可能导致系统以无法理解的方式失败，从而使企业付出实实在在的代价。它们构成了真正的生存风险，并可能消耗过多的资源。

Haunted graveyards don’t just exist in production systems, however; they can be found in codebases. Many organizations have bits of software that are old and unmaintained, written by someone long off the team, and on the critical path of some important revenue-generating functionality. These systems are also frozen in time, with layers of bureaucracy built up to prevent changes that might cause instability. Nobody wants to be the network support engineer II who flipped the wrong bit!

然而，闹鬼墓地并不仅仅存在于生产系统中，它们也可以在代码库中找到。许多组织都有一些老旧的、未经维护的软件，它们是由早已离开团队的人编写的，并且处于一些重要的创收功能的关键路径上。这些系统也被冻结在时间中，层层叠叠的官僚机构建立起来，防止可能导致不稳定的变化。没有人想成为网络支持工程师，他犯了错误！

These parts of a codebase are anathema to the LSC process because they prevent the completion of large migrations, the decommissioning of other systems upon which they rely, or the upgrade of compilers or libraries that they use. From an LSC perspective, haunted graveyards prevent all kinds of meaningful progress.

代码库的这些部分是LSC过程的诅咒，因为它们阻止了大型迁移的完成、它们所依赖的其他系统的退役，或者它们所使用的编译器或库的升级。从LSC的角度来看，闹鬼的墓地阻止了各种有意义的进步。

At Google, we’ve found the counter to this to be good, old-fashioned  testing. When software is thoroughly tested, we can make arbitrary changes to it and know with confidence whether those changes are breaking, no matter the age or complexity of the system. Writing those tests takes a lot of effort, but it allows a codebase like Google’s to evolve over long periods of time, consigning the notion of haunted software graveyards to a graveyard of its own.

在谷歌，我们发现这是一个好的、老式的测试。当软件经过彻底测试后，我们可以对其进行任意更改，并有信心地知道这些更改是否正在中断，无论系统的时间或复杂性如何。编写这些测试需要很多努力，但它允许像谷歌这样的代码库在很长一段时间内进化，将闹鬼软件墓地的概念交付给它自己的墓地。

### Heterogeneity  异质性

LSCs really work only when the bulk of the effort for them can be done by computers, not humans. As good as humans can be with ambiguity, computers rely upon consistent environments to apply the proper code transformations to the correct places. If your organization has many different VCSs, Continuous Integration (CI) systems, project-specific tooling, or formatting guidelines, it is difficult to make sweeping changes across your entire codebase. Simplifying the environment to add more consistency will help both the humans who need to move around in it and the robots making automated transformations.

只有当大部分的工作由计算机而不是人类来完成时，LSC才能真正发挥作用。尽管人类可以很好地处理模棱两可的问题，但计算机依赖于一致的环境将正确的代码转换应用到正确的位置。如果你的组织有许多不同的VCS、持续集成（CI）系统、特定项目的工具或格式化准则，就很难在整个代码库中进行全面的更改。简化环境，增加一致性，对需要在其中活动的人类和进行自动转换的机器人都有帮助。

For example, many projects at Google have presubmit tests configured to run before changes are made to their codebase. Those checks can be very complex, ranging from checking new dependencies against a whitelist, to running tests, to ensuring that the change has an associated bug. Many of these checks are relevant for teams writing new features, but for LSCs, they just add additional irrelevant complexity.

例如，谷歌的许多项目都配置了预提交测试，以便在对其代码库进行修改之前运行。这些检查可能非常复杂，从对照白名单检查新的依赖关系，到运行测试，再到确保变化有相关的bug。这些检查中有许多与编写新功能的团队有关，但对于LSC来说，它们只是增加了额外的无关的复杂性。

We’ve decided to embrace some of this complexity, such as running presubmit tests, by making it standard across our codebase. For other inconsistencies, we advise teams to omit their special checks when parts of LSCs touch their project code. Most teams are happy to help given the benefit these kinds of changes are to their projects.

我们已经决定采用这种复杂度，例如通过使其成为我们代码库中的标准来运行预提交测试。对于其他不一致性，我们建议团队在LSC的某些部分接触到其项目代码时忽略其特殊检查。鉴于此类变更对其项目的好处，大多数团队都乐于提供协助。

### Testing  测试

Every change should be tested (a process we’ll talk about more in just a moment), but the larger the change, the more difficult it is to actually test it appropriately. Google’s CI system will run not only the tests immediately impacted by a change, but also any tests that transitively depend on the changed files.[^6] This means a change gets broad coverage, but we’ve also observed that the farther away in the dependency graph a test is from the impacted files, the more unlikely a failure is to have been caused by the change itself.

每个变更都应该进行测试（稍后我们将详细讨论这个过程），但是变更越大，实际测试它就越困难。Google的CI系统不仅会运行立即受到更改影响的测试，还会运行过渡依赖于更改文件的任何测试。这意味着更改会得到广泛的覆盖，但我们还观察到，在依赖关系图中，测试距离受影响文件越远，失败越不可能是由变化本身造成的。

Small, independent changes are easier to validate, because each of them affects a smaller set of tests, but also because test failures are easier to diagnose and fix. Finding the root cause of a test failure in a change of 25 files is pretty straightforward; finding 1 in a 10,000-file change is like the proverbial needle in a haystack.

小的、独立的更改更容易验证，因为每个更改都会影响较小的测试集，但也因为测试失败更容易诊断和修复。在25个文件的更改中找到测试失败的根本原因非常简单；在10,000个文件更改中找到1个，就像谚语中说的大海捞针。

The trade-off in this decision is that smaller changes will cause the same tests to be run multiple times, particularly tests that depend on large parts of the codebase. Because engineer time spent tracking down test failures is much more expensive than the compute time required to run these extra tests, we’ve made the conscious decision that this is a trade-off we’re willing to make. That same trade-off might not hold for all organizations, but it is worth examining what the proper balance is for yours.

这个决定的权衡是，较小的更改将导致相同的测试运行多次，特别是依赖于大部分代码库的测试。因为工程师跟踪测试失败所花费的时间比运行这些额外测试所需的计算时间要昂贵得多，所以我们有意识地决定，这是我们愿意做出的权衡。这种权衡可能并不适用于所有组织，但值得研究的是，对于你的组织来说，什么才是适当的平衡。

> [^6]:  This probably sounds like overkill, and it likely is. We’re doing active research on the best way to determine the “right” set of tests for a given change, balancing the cost of compute time to run the tests, and the human cost of making the wrong choice.
>
> 6 这听起来可能是矫枉过正，而且很可能是。我们正在积极研究为一个特定的变化确定 "正确 "的测试集的最佳方法，平衡运行测试的计算时间成本和做出错误选择的人力成本。

-----

##### Case Study: Testing LSCs  案例研究：测试LSC

***Adam Bender***

Today it is common for a double-digit percentage (10% to 20%) of the changes in a project to be the result of LSCs, meaning a substantial amount of code is changed in projects by people whose full-time job is unrelated to those projects. Without good tests, such work would be impossible, and Google’s codebase would quickly atrophy under its own weight. LSCs enable us to systematically migrate our entire codebase to newer APIs, deprecate older APIs, change language versions, and remove popular but dangerous practices.

如今，一个项目中两位数百分比（10%到20%）的变更是LSC的结果是很常见的，这意味着大量的代码是由全职工作与这些项目无关的人在项目中变更的。如果没有良好的测试，这样的工作将是不可能的，谷歌的代码库将在自身的压力下迅速萎缩。LSC使我们能够系统地将整个代码库迁移到较新的API，弃用较旧的API，更改语言版本，并删除流行但危险的做法。

Even a simple one-line signature change becomes complicated when made in a thousand different places across hundreds of different products and services.[^7] After the change is written, you need to coordinate code reviews across dozens of teams. Lastly, after reviews are approved, you need to run as many tests as you can to be sure the change is safe.[^8] We say “as many as you can,” because a good-sized LSC could trigger a rerun of every single test at Google, and that can take a while. In fact, many LSCs have to plan time to catch downstream clients whose code backslides while the LSC makes its way through the process.

即使是一个简单的单个函数签名修改，如果在上百个不同的产品和服务的一千多个不同的地方进行，也会变得很复杂。修改写完后，你需要协调几十个团队的代码审查。最后，在审查通过后，你需要运行尽可能多的测试，以确保变化是安全的。我们说 "尽可能多"，是因为一个规模不错的LSC可能会触发谷歌的每一个测试的重新运行，而这可能需要一段时间。事实上，许多LSC必须计划好时间，以便在LSC进行的过程中抓住那些代码回退的下游客户。

Testing an LSC can be a slow and frustrating process. When a change is sufficiently large, your local environment is almost guaranteed to be permanently out of sync with head as the codebase shifts like sand around your work. In such circumstances, it is easy to find yourself running and rerunning tests just to ensure your changes continue to be valid. When a project has flaky tests or is missing unit test coverage, it can require a lot of manual intervention and slow down the entire process. To help speed things up, we use a strategy called the TAP (Test Automation Platform) train.

测试LSC可能是一个缓慢而令人沮丧的过程。当一个变更足够大的时候，你的本地环境几乎可以肯定会与head永久不同步，因为代码库会像沙子一样在你的工作中移动。在这种情况下，很容易发现自己在运行和重新运行测试，以确保你的变化继续有效。当一个项目有不稳定的测试或缺少单元测试覆盖率时，它可能需要大量的人工干预并拖慢整个过程。为了帮助加快进度，我们使用了一种叫做TAP（测试自动化平台）的策略。

**Riding the TAP Train**  **搭乘TAP列车**

The core insight to LSCs is that they rarely interact with one another, and most affected tests are going to pass for most LSCs. As a result, we can test more than one change at a time and reduce the total number of tests executed. The train model has proven to be very effective for testing LSCs.

对LSC的核心见解是，它们很少相互影响，对于大多数LSC来说，大多数受影响的测试都会通过。因此，我们可以一次测试一个以上的变化，减少执行的测试总数。事实证明，列车模型对测试LSC非常有效。

The TAP train takes advantage of two facts:

- LSCs tend to be pure refactorings and therefore very narrow in scope, preserving local semantics.
- Individual changes are often simpler and highly scrutinized, so they are correct  more often than not.

TAP列车利用了两个事实：

- LSC往往是纯粹的重构，因此范围非常窄，保留了本地语义。
- 单独的修改通常比较简单，而且受到高度审查，所以它们往往是正确的。

The train model also has the advantage that it works for multiple changes at the same time and doesn’t require that each individual change ride in isolation.[^9]

列车模型还有一个优点，即它同时适用于多个变化，不要求每个单独的变化都是孤立的。

The train has five steps and is started fresh every three hours:

1. For each change on the train, run a sample of 1,000 randomly-selected tests.
2. Gather up all the changes that passed their 1,000 tests and create one uberchange from all of them: “the train.”
3. Run the union of all tests directly affected by the group of changes. Given a large enough (or low-level enough) LSC, this can mean running every single test in Google’s repository. This process can take more than six hours to complete.
4. For each nonflaky test that fails, rerun it individually against each change that made it into the train to determine which changes caused it to fail.
5. TAP generates a report for each change that boarded the train. The report describes all passing and failing targets and can be used as evidence that an LSC is safe to submit.

列车模式有五个阶段，每三小时重新启动一次：

1. 对于列车上的每个变化，运行1000个随机选择的测试样本。
2. 收集所有通过1000次测试的变化，并从所有这些变化中创建一个超级变化：”车次"。
3. 运行所有直接受该组变化影响的测试的联合。如果LSC足够大（或足够底层），这可能意味着运行谷歌资源库中的每一个测试。这个过程可能需要六个多小时来完成。
4. 对于每一个失败的非漏洞测试，针对每一个进入列车的变化单独重新运行它，以确定哪些变化导致它失败。
5. TAP为每个上列车的变化生成一份报告。该报告描述了所有通过和未通过的目标，可以作为LSC可以安全提交的证据。

-----

> [^7]: The largest series of LSCs ever executed removed more than one billion lines of code from the repository over the course of three days. This was largely to remove an obsolete part of the repository that had been migrated to a new home; but still, how confident do you have to be to delete one billion lines of code?
>
> 7 有史以来最大的一系列LSC在三天内从版本库中删除了超过10亿行的代码。这主要是为了删除版本库中已经迁移到新仓库的过时部分；但是，你要有多大的信心才能删除10亿行的代码？
>  
> [^8]: LSCs are usually supported by tools that make finding, making, and reviewing changes relatively straightforward.
>
> 8 LSCs通常由工具支持，使查找、制作和审查修改相对简单。
>
> [^9]: It is possible to ask TAP for single change “isolated” run, but these are very expensive and are performed only during off-peak hours.
>
> 9 有可能要求TAP提供单次更换的 "隔离 "运行，但这是非常昂贵的，而且只在非高峰时段进行。

### Code Review 代码审查

Finally, as we mentioned in Chapter 9, all changes need to be reviewed before submission, and this policy applies even for LSCs. Reviewing large commits can be tedious, onerous, and even error prone, particularly if the changes are generated by hand (a process you want to avoid, as we’ll discuss shortly). In just a moment, we’ll look at how tooling can often help in this space, but for some classes of changes, we still want humans to explicitly verify they are correct. Breaking an LSC into separate shards makes this much easier.

最后，正如我们在第9章中提到的，所有的修改都需要在提交前进行审核，这个策略甚至适用于LSC。审阅大型提交可能会很乏味、繁重，甚至容易出错，特别是如果这些修改是手工生成的（我们很快就会讨论，这是一个你想避免的过程）。稍后，我们将看看工具化如何在这个领域提供帮助，但对于某些类别的修改，我们仍然希望人类明确地验证它们是否正确。将一个LSC分解成独立的片段，使之更容易。

-----

##### Case Study: scoped_ptr to std::unique_ptr  案例研究：scoped_ptr到std::unique_ptr

Since its earliest days, Google’s C++ codebase has had a self-destructing smart pointer for wrapping heap-allocated C++ objects and ensuring that they are destroyed when the smart pointer goes out of scope. This type was called scoped_ptr and was used extensively throughout Google’s codebase to ensure that object lifetimes were appropriately managed. It wasn’t perfect, but given the limitations of the then-current C++ standard (C++98) when the type was first introduced, it made for safer programs.

从最早期开始，Google的C++代码库就有一个自毁的智能指针，用于包装堆分配的C++对象，并确保在智能指针超出范围时将其销毁。这种类型被称为scoped_ptr，在Google的代码库中被广泛使用，以确保对象的寿命得到适当的管理。它并不完美，但考虑到该类型首次引入时当时的C++标准（C++98）的限制，它使程序更加安全。

In C++11, the language introduced a new type: std::unique_ptr. It fulfilled the same function as scoped_ptr, but also prevented other classes of bugs that the language now could detect. std::unique_ptr was strictly better than scoped_ptr, yet Google’s codebase had more than 500,000 references to scoped_ptr scattered among millions of source files. Moving to the more modern type required the largest LSC attempted to that point within Google.

在C++11中，该语言引入了一个新的类型：std::unique_ptr。std::unique_ptr严格来说比scoped_ptr好，但Google的代码库中有超过50万个对scoped_ptr的引用，散布在数百万个源文件中。向更现代的模式发展需要谷歌内部最大的LSC。

Over the course of several months, several engineers attacked the problem in parallel. Using Google’s large-scale migration infrastructure, we were able to change references to scoped_ptr into references to std::unique_ptr as well as slowly adapt scoped_ptr to behave more closely to std::unique_ptr. At the height of the migration process, we were consistently generating, testing and committing more than 700 independent changes, touching more than 15,000 files *per day*. Today, we sometimes manage 10 times that throughput, having refined our practices and improved our tooling.

在几个月的时间里，几位工程师同时攻克了这个问题。利用谷歌的大规模迁移基础设施，我们能够将对scoped_ptr的引用改为对std::unique_ptr的引用，并慢慢调整scoped_ptr，使其行为更接近于std::unique_ptr。在迁移过程的高峰期，我们一直在生成、测试和提交超过700个独立的变化，每天*触及*超过15000个文件。今天，在完善了我们的实践和改进了我们的工具后，我们有时能管理10倍的吞吐量。

Like almost all LSCs, this one had a very long tail of tracking down various nuanced behavior dependencies (another manifestation of Hyrum’s Law), fighting race conditions with other engineers, and uses in generated code that weren’t detectable by our automated tooling. We continued to work on these manually as they were discovered by the testing infrastructure.

像几乎所有的LSC一样，这个LSC有一个长尾效应，那就是追踪各种细微的行为依赖（Hyrum定律的另一种表现），与其他工程师一起对抗竞赛条件，以及使用生成的代码，而我们的自动化工具是无法检测到的。我们继续手动处理这些问题，因为它们是由测试基础设施发现的。

scoped_ptr was also used as a parameter type in some widely used APIs, which made small independent changes difficult. We contemplated writing a call-graph analysis system that could change an API and its callers, transitively, in one commit, but were concerned that the resulting changes would themselves be too large to commit atomically.

scoped_ptr在一些广泛使用的API中也被用作参数类型，这使得小的独立变化变得困难。我们考虑过编写一个调用图分析系统，它可以在一次提交中改变API及其调用者，但我们担心由此产生的改变本身太大，无法原子提交。

In the end, we were able to finally remove scoped_ptr by first making it a type alias of std::unique_ptr and then performing the textual substitution between the old alias and the new, before eventually just removing the old scoped_ptr alias. Today, Google’s codebase benefits from using the same standard type as the rest of the C++ ecosystem, which was possible only because of our technology and tooling for LSCs.

最后，我们能够最终删除scoped_ptr，首先让它成为std::unique_ptr的类型别名，然后在旧的别名和新的别名之间进行文本替换，最后只是删除旧的scoped_ptr别名。今天，谷歌的代码库从使用与C++生态系统其他部分相同的标准类型中受益，这可能是因为我们的技术和工具为LSC。

-----

## LSC Infrastructure  LSC基础设施

Google has invested in a significant amount of infrastructure to make LSCs possible. This infrastructure includes tooling for change creation, change management, change review, and testing. However, perhaps the most important support for LSCs has been the evolution of cultural norms around large-scale changes and the oversight given to them. Although the sets of technical and social tools might differ for your organization, the general principles should be the same.

谷歌已经投资了大量的基础设施，使LSC成为可能。这种基础设施包括用于创建变更、变更管理、变更审查和测试的工具。然而，对LSC最重要的支持可能是围绕大规模变化和对它们的监督的文化规范的演变。虽然你的组织的技术和社会工具集可能有所不同，但一般原则应该是相同的。

### Policies and Culture  策略和文化

As we’ve described in Chapter 16, Google stores the bulk of its source code in a single monolithic repository (monorepo), and every engineer has visibility into almost all of this code. This high degree of openness means that any engineer can edit any file and send those edits for review to those who can approve them. However, each of those edits has costs, both to generate as well as review.[^10]

正如我们在第16章中所描述的那样，谷歌将其大部分源代码存储在单个代码库（monorepo）中，每个工程师都可以看到几乎所有这些代码。这种高度的开放性意味着任何工程师都可以编辑任何文件，并将这些编辑发送给可以批准它们的人进行审查。然而，每一个编辑都有成本，包括生成和审查。

Historically, these costs have been somewhat symmetric, which limited the scope of changes a single engineer or team could generate. As Google’s LSC tooling improved, it became easier to generate a large number of changes very cheaply, and it became equally easy for a single engineer to impose a burden on a large number of reviewers across the company. Even though we want to encourage widespread improvements to our codebase, we want to make sure there is some oversight and thoughtfulness behind them, rather than indiscriminate tweaking.[^11]

从历史上看，这些成本在某种程度上是对称的，这限制了单个工程师或团队可能产生的变更范围。随着谷歌LSC工具的改进，以极低的成本生成大量更改变得更加容易，而对于单个工程师来说，给公司内的大量审阅者施加负担也变得同样容易。尽管我们希望鼓励对我们的代码库进行广泛的改进，但我们希望确保在这些改进背后有一些疏忽和深思熟虑，而不是随意的调整。

The end result is a lightweight approval process for teams and individuals seeking to make LSCs across Google. This process is overseen by a group of experienced engineers who are familiar with the nuances of various languages, as well as invited domain experts for the particular change in question. The goal of this process is not to prohibit LSCs, but to help change authors produce the best possible changes, which make the most use of Google’s technical and human capital. Occasionally, this group might suggest that a cleanup just isn’t worth it: for example, cleaning up a common typo without any way of preventing recurrence.

最终的结果是为寻求在谷歌范围内进行LSC的团队和个人提供了一个轻量级的审批过程。这个过程由一群经验丰富的工程师监督，他们熟悉各种语言的细微差别，并邀请了相关特定变化的领域专家。这个过程的目的不是要禁止LSC，而是要帮助修改者产生尽可能好的修改，从而最大限度地利用谷歌的技术和人力资本。偶尔，这个小组可能会建议清理工作不值得做：例如，清理一个常见的错别字，但没有任何办法防止再次发生。

Related to these policies was a shift in cultural norms surrounding LSCs. Although it is important for code owners to have a sense of responsibility for their software, they also needed to learn that LSCs were an important part of Google’s effort to scale our software engineering practices. Just as product teams are the most familiar with their own software, library infrastructure teams know the nuances of the infrastructure, and getting product teams to trust that domain expertise is an important step toward social acceptance of LSCs. As a result of this culture shift, local product teams have grown to trust LSC authors to make changes relevant to those authors’ domains.

与这些策略相关的是围绕LSC的文化规范的转变。虽然代码所有者对自己的软件有责任感很重要，但他们也需要了解LSC是Google努力扩展软件工程实践的重要组成部分。正如产品团队最熟悉自己的软件一样，基础类库团队也知道基础设施的细微差别，让产品团队相信领域专业知识是LSC获得社会认可的重要一步。作为这种文化转变的结果，本地产品团队已经开始信任LSC作者，让他们做出与这些作者的领域相关的更改。

Occasionally, local owners question the purpose of a specific commit being made as part of a broader LSC, and change authors respond to these comments just as they would other review comments. Socially, it’s important that code owners understand the changes happening to their software, but they also have come to realize that they don’t hold a veto over the broader LSC. Over time, we’ve found that a good FAQ and a solid historic track record of improvements have generated widespread endorsement of LSCs throughout Google.

偶尔，本地所有者会质疑作为更广泛的LSC的一部分的特定提交的目的，而变更作者会像回应其他审查意见一样回应这些意见。从社会角度来说，代码所有者了解发生在他们软件上的变化是很重要的，但他们也意识到他们对更广泛的LSC并不拥有否决权。随着时间的推移，我们发现，一个好的FAQ和一个可靠的历史改进记录已经在整个谷歌产生了对LSC的广泛认可。

> [^10]:  There are obvious technical costs here in terms of compute and storage, but the human costs in time to review a change far outweigh the technical ones.
>
> 10  在计算和存储方面存在明显的技术成本，但及时审查变更所需的人力成本远远超过技术成本。
>
> [^11]:   For example, we do not want the resulting tools to be used as a mechanism to fight over the proper spelling of “gray” or “grey” in comments.
>
> 11  例如，我们不希望由此产生的工具被用作一种机制来争夺评论中“灰色”或“灰色”的正确拼写。

### Codebase Insight  代码库的洞察力

To do LSCs, we’ve found it invaluable to be able to do large-scale analysis of our codebase, both on a textual level using traditional tools, as well as on a semantic level. For example, Google’s use of the semantic indexing tool [Kythe](https://kythe.io/)provides a complete map of the links between parts of our codebase, allowing us to ask questions such as “Where are the callers of this function?” or “Which classes derive from this one?” Kythe and similar tools also provide programmatic access to their data so that they can be incorporated into refactoring tools. (For further examples, see Chapters 17 and 20.)

要进行LSC，我们发现能够使用传统工具在文本级别和语义级别上对代码库进行大规模分析是非常宝贵的经验。例如，Google使用语义索引工具Kythe提供了代码库各部分之间链接的完整地图，允许我们提出诸如“此函数的调用方在哪里？”或“哪些类源自此函数？”Kythe和类似的工具还提供对其数据的编程访问，以便可以将它们合并到重构工具中。（更多示例请参见第17章和第20章。）

We also use compiler-based indices to run abstract syntax tree-based analysis and transformations over our codebase. Tools such as [ClangMR](https://oreil.ly/c6xvO), JavacFlume, or [Refaster](https://oreil.ly/Er03J), which can perform transformations in a highly parallelizable way, depend on these insights as part of their function. For smaller changes, authors can use specialized, custom tools, perl or sed, regular expression matching, or even a simple shell script.

我们还使用基于编译器的索引，在我们的代码库上运行基于抽象语法树的分析和转换。诸如[ClangMR](https://oreil.ly/c6xvO)、JavacFlume或[Refaster](https://oreil.ly/Er03J)等工具，可以以高度可并行的方式进行转换，其功能的一部分依赖于这些洞察力。对于较小的变化，作者可以使用专门的、定制的工具、perl或sed、正则表达式匹配，甚至是一个简单的shell脚本。

Whatever tool your organization uses for change creation, it’s important that its human effort scale sublinearly with the codebase; in other words, it should take roughly the same amount of human time to generate the collection of all required changes, no matter the size of the repository. The change creation tooling should also be comprehensive across the codebase, so that an author can be assured that their change covers all of the cases they’re trying to fix.

无论你的组织使用什么工具来创建变更，重要的是它的人力与代码库成亚线性扩展；换句话说，无论代码库的大小，它都应该花费大致相同的人力时间来生成所有需要的变更集合。变更创建工具也应该在整个代码库中是全面的，这样作者就可以确信他们的变更涵盖了他们试图修复的所有情况。

As with other areas in this book, an early investment in tooling usually pays off in the short to medium term. As a rule of thumb, we’ve long held that if a change requires more than 500 edits, it’s usually more efficient for an engineer to learn and execute our change-generation tools rather than manually execute that edit. For experienced “code janitors,” that number is often much smaller.

与本书中的其他领域一样，对工具的早期投资通常在中短期内获得回报。根据经验，我们一直认为，如果一个变更需要500次以上的编辑，工程师学习和执行我们的变更生成工具通常比手动执行该编辑更有效。对于有经验的“代码管理员”，这个数字通常要小得多。

### Change Management  变更管理

Arguably the most important piece of large-scale change infrastructure is the set of tooling that shards a master change into smaller pieces and manages the process of testing, mailing, reviewing, and committing them independently. At Google, this tool is called Rosie, and we discuss its use more completely in a few moments when we examine our LSC process. In many respects, Rosie is not just a tool, but an entire platform for making LSCs at Google scale. It provides the ability to split the large sets of comprehensive changes produced by tooling into smaller shards, which can be tested, reviewed, and submitted independently.

可以说，大规模变更基础设施中最重要的部分是一套工具，它将主变更分割成小块，并独立管理测试、推送、审查和提交的过程。在谷歌，这个工具被称为Rosie，我们将在稍后检查我们的LSC过程时更全面地讨论它的使用。在许多方面，Rosie不仅仅是一个工具，而是一个在谷歌规模上制作LSC的整个平台。它提供了一种能力，可以将工具产生的大型综合修改集分割成较小的分片，这些分片可以被独立测试、审查和提交。

### Testing  测试

Testing is another important piece of large-scale-change–enabling infrastructure. As discussed in Chapter 11, tests are one of the important ways that we validate our software will behave as expected. This is particularly important when applying changes that are not authored by humans. A robust testing culture and infrastructure means that other tooling can be confident that these changes don’t have unintended effects.

测试是支持大规模变革的基础设施的另一个重要部分。正如在第11章中所讨论的，测试是我们验证我们的软件将按照预期行为的重要方法之一。这在应用非人工编写的更改时尤为重要。一个强大的测试文化和基础设施意味着其他工具可以确信这些更改不会产生意外的影响。

Google’s testing strategy for LSCs differs slightly from that of normal changes while still using the same underlying CI infrastructure. Testing LSCs means not just ensuring the large master change doesn’t cause failures, but that each shard can be submitted safely and independently. Because each shard can contain arbitrary files, we don’t use the standard project-based presubmit tests. Instead, we run each shard over the transitive closure of every test it might affect, which we discussed earlier.

谷歌针对LSC的测试策略与普通更改略有不同，但仍使用相同的底层CI基础设施。测试LSC不仅意味着确保大型主分支更改不会导致失败，而且还意味着可以安全、独立地提交每个分支。因为每个分支可以包含任意文件，所以我们不使用标准的基于项目的预提交测试。相反，我们在它可能影响的每个测试的可传递闭包上运行每个分支，我们在前面讨论过。

### Language Support  编程语言支持

LSCs at Google are typically done on a per-language basis, and some languages support them much more easily than others. We’ve found that language features such as type aliasing and forwarding functions are invaluable for allowing existing users to continue to function while we introduce new systems and migrate users to them nonatomically. For languages that lack these features, it is often difficult to migrate systems incrementally.[^12]

谷歌的LSC通常以每种编程语言为基础，有些语言比其他语言更容易支持LSC。我们发现，在我们引入新系统并以非原子方式将用户迁移到这些系统时，诸如类型别名和转发功能之类的语言功能对于允许现有用户继续工作是非常宝贵的。对于缺少这些功能的编程语言，通常很难增量迁移系统。

We’ve also found that statically typed languages are much easier to perform large automated changes in than dynamically typed languages. Compiler-based tools along with strong static analysis provide a significant amount of information that we can use to build tools to affect LSCs and reject invalid transformations before they even get to the testing phase. The unfortunate result of this is that languages like Python, Ruby, and JavaScript that are dynamically typed are extra difficult for maintainers. Language choice is, in many respects, intimately tied to the question of code lifespan: languages that tend to be viewed as more focused on developer productivity tend to be more difficult to maintain. Although this isn’t an intrinsic design requirement, it is where the current state of the art happens to be.

我们还发现，静态类型的语言比动态类型的语言更容易进行大规模的自动化修改。基于编译器的工具以及强大的静态分析提供了大量的信息，我们可以利用这些信息来建立影响LSC的工具，并在它们进入测试阶段之前拒绝无效的转换。这样做的不幸结果是，像Python、Ruby和JavaScript这些动态类型的语言对维护者来说是额外困难的。在许多方面，编程语言的选择与代码寿命的问题密切相关：那些倾向于被视为更注重开发者生产力的编程语言往往更难维护。虽然这不是一个固有的设计要求，但这是目前的技术状况。

Finally, it’s worth pointing out that automatic language formatters are a crucial part of the LSC infrastructure. Because we work toward optimizing our code for readability, we want to make sure that any changes produced by automated tooling are intelligible to both immediate reviewers and future readers of the code. All of the LSCgeneration tools run the automated formatter appropriate to the language being changed as a separate pass so that the change-specific tooling does not need to concern itself with formatting specifics. Applying automated formatting, such as [google-java-format](https://github.com/google/google-java-format)or [clang-format](https://clang.llvm.org/docs/ClangFormat.html), to our codebase means that automatically produced changes will “fit in” with code written by a human, reducing future development friction. Without automated formatting, large-scale automated changes would never have become the accepted status quo at Google.

最后，值得指出的是，自动语言格式化程序是LSC基础设施的一个重要组成部分。因为我们致力于优化我们的代码的可读性，我们希望确保任何由自动工具产生的变化对即时的审查者和未来的代码读者来说都是可理解的。所有的LSC生成工具都将适合于被修改的语言的自动格式化器作为一个单独的通道来运行，这样，针对修改的工具就不需要关注格式化的细节了。将自动格式化，如[google-java-format](https://github.com/google/google-java-format)或[clang-format](https://clang.llvm.org/docs/ClangFormat.html)，应用到我们的代码库中，意味着自动产生的变化将与人类编写的代码 “合并"，减少未来的开发阻力。如果没有自动格式化，大规模的自动修改就永远不会成为谷歌的公认现状。

> [^12]:   In fact, Go recently introduced these kinds of language features specifically to support large-scale refactorings （ see [https://talks.golang.org/2016/refactor.article](https://talks.golang.org/2016/refactor.article) ）.
>
> 12  事实上，Go最近专门引入了这些类型的语言特性来支持大规模重构（参见`https://talks.golang.org/2016/refactor.article`).

-----

##### Case Study: Operation RoseHub  案例研究： Operation RoseHub 

LSCs have become a large part of Google’s internal culture, but they are starting to have implications in the broader world. Perhaps the best known case so far was “[Operation RoseHub](https://oreil.ly/txtDj).”

LSC已经成为谷歌内部文化的一个重要部分，但它们开始在更广泛的世界中产生影响。迄今为止，最著名的案例也许是"Operation RoseHub"。

In early 2017, a vulnerability in the Apache Commons library allowed any Java application with a vulnerable version of the library in its transitive classpath to become susceptible to remote execution. This bug became known as the Mad Gadget. Among other things, it allowed an avaricious hacker to encrypt the San Francisco Municipal Transportation Agency’s systems and shut down its operations. Because the only requirement for the vulnerability was having the wrong library somewhere in its classpath, anything that depended on even one of many open source projects on GitHub was vulnerable.

2017年初，Apache Commons库中的一个漏洞允许任何在其跨类路径中具有该库的脆弱版本的Java应用程序变得容易被远程执行。这个漏洞被称为 "疯狂小工具"。在其他方面，它允许一个贪婪的黑客对旧金山市交通局的系统进行加密并关闭其运作。由于该漏洞的唯一要求是在其classpath中的某个地方有错误的库，任何依赖于GitHub上许多开源项目的东西都会受到攻击。

To solve this problem, some enterprising Googlers launched their own version of the LSC process. By using tools such as [BigQuery](https://cloud.google.com/bigquery), volunteers identified affected projects and sent more than 2,600 patches to upgrade their versions of the Commons library to one that addressed Mad Gadget. Instead of automated tools managing the process, more than 50 humans made this LSC work.

为了解决这个问题，一些有进取心的Googlers发起了他们自己版本的LSC程序。通过使用[BigQuery](https://cloud.google.com/bigquery)等工具，志愿者们确定了受影响的项目，并发送了2600多个补丁，将其版本的Commons库升级为解决Mad Gadget的版本。在这个过程中，不是由自动化工具来管理，而是由50多个人类来完成这个LSC的工作。

-----

## The LSC Process  LSC过程

With these pieces of infrastructure in place, we can now talk about the process for actually making an LSC. This roughly breaks down into four phases (with very nebulous boundaries between them):

1. Authorization
2. Change creation
3. Shard management
4. Cleanup

有了这些基础设施，我们现在可以谈谈实际制作LSC的过程。这大致可分为四个阶段（它们之间的界限非常模糊）：

1. 授权
2. 变更创建
3. 分片管理
4. 清理

Typically, these steps happen after a new system, class, or function has been written, but it’s important to keep them in mind during the design of the new system. At Google, we aim to design successor systems with a migration path from older systems in mind, so that system maintainers can move their users to the new system automatically.

通常，这些步骤发生在编写新系统、类或函数之后，但在设计新系统时记住它们很重要。在谷歌，我们的目标是在设计后继系统时考虑到从旧系统的迁移路径，以便系统维护人员能够自动将用户转移到新系统。

### Authorization  授权

We ask potential authors to fill out a brief document explaining the reason for a proposed change, its estimated impact across the codebase (i.e., how many smaller shards the large change would generate), and answers to any questions potential reviewers might have. This process also forces authors to think about how they will describe the change to an engineer unfamiliar with it in the form of an FAQ and proposed change description. Authors also get “domain review” from the owners of the API being refactored.

我们要求潜在作者填写一份简短的文档，解释提出变更的原因、其对整个代码库的估计影响（即，大变更将产生多少较小的碎片），并回答潜在评审员可能提出的任何问题。这一过程还迫使作者思考他们将如何以常见问题解答和提出的变更描述的形式向不熟悉变更的工程师描述变更。作者还可以从正在重构的API的所有者那里获得"专业审查"。

This proposal is then forwarded to an email list with about a dozen people who have oversight over the entire process. After discussion, the committee gives feedback on how to move forward. For example, one of the most common changes made by the committee is to direct all of the code reviews for an LSC to go to a single “global approver.” Many first-time LSC authors tend to assume that local project owners should review everything, but for most mechanical LSCs, it’s cheaper to have a single expert understand the nature of the change and build automation around reviewing it properly.

然后，这个提案被转发到一个有大约十几个人的电子邮件列表，这些人对整个过程进行监督。经过讨论，委员会就如何推进工作给出反馈。例如，委员会做出的最常见的改变之一是将一个LSC的所有代码审查交给一个 "全球批准人"。许多第一次做LSC的人倾向于认为当地的项目负责人应该审查所有的东西，但对于大多数自动LSC来说，让一个专家了解变化的性质并围绕着正确的审查建立自动化是比较低成本。

After the change is approved, the author can move forward in getting their change submitted. Historically, the committee has been very liberal with their approval,[^13] and often gives approval not just for a specific change, but also for a broad set of related changes. Committee members can, at their discretion, fast-track obvious changes without the need for full deliberation.

在修改被批准后，作者可以继续推进他们的修改提交。从历史上看，委员会在批准方面是非常宽松的，而且常常不仅批准某一特定的修改，而且批准一系列广泛的相关修改。委员会成员可以酌情快速处理明显的修改，而不需要进行充分的审议。

The intent of this process is to provide oversight and an escalation path, without being too onerous for the LSC authors. The committee is also empowered as the escalation body for concerns or conflicts about an LSC: local owners who disagree with the change can appeal to this group who can then arbitrate any conflicts. In practice, this has rarely been needed.

这个过程的目的是提供监督和升级的途径，而不对LSC的作者过于繁琐。该委员会还被授权作为对LSC的担忧或冲突的升级机构：不同意改变的本地业主可以向该小组提出上诉，该小组可以对任何冲突进行仲裁。在实践中，很少需要这样做。

> [^13]:  The only kinds of changes that the committee has outright rejected have been those that are deemed dangerous, such as converting all NULL instances to nullptr, or extremely low-value, such as changing spelling from British English to American English, or vice versa. As our experience with such changes has increased and the cost of LSCs has dropped, the threshold for approval has as well.
>
> 13  委员会完全拒绝的唯一类型的更改是那些被视为危险的更改，如将所有空实例转换为空PTR，或极低的值，如将拼写从英式英语更改为美式英语，或反之亦然。随着我们在此类变更方面的经验增加，LSC的成本降低，批准门槛也随之降低。

### Change Creation 变更创建

After getting the required approval, an LSC author will begin to produce the actual code edits. Sometimes, these can be generated comprehensively into a single large global change that will be subsequently sharded into many smaller independent pieces. Usually, the size of the change is too large to fit in a single global change, due to technical limitations of the underlying version control system.

在获得必要的批准后，LSC作者将开始制作实际的代码编辑。有时，这些内容可以全面地生成一个大的全局变化，随后将被分割成许多小的独立部分。通常情况下，由于底层版本控制系统的技术限制，修改的规模太大，无法容纳在一个全局修改中。

The change generation process should be as automated as possible so that the parent change can be updated as users backslide into old uses[^14] or textual merge conflicts occur in the changed code. Occasionally, for the rare case in which technical tools aren’t able to generate the global change, we have sharded change generation across humans (see “Case Study: Operation RoseHub” on page 472). Although much more labor intensive than automatically generating changes, this allows global changes to happen much more quickly for time-sensitive applications.

变更生成过程应尽可能自动化，以便在用户退回到旧的使用方式或在变更的代码中出现文本合并冲突时，可以更新父级变更。偶尔，在技术工具无法生成全局变更的罕见情况下，我们也会将变更的生成分给人工（见第472页的 "案例研究：RoseHub行动"）。尽管这比自动生成变更要耗费更多的人力，但对于时间敏感的应用来说，这使得全局性的变更能够更快推进。

Keep in mind that we optimize for human readability of our codebase, so whatever tool generates changes, we want the resulting changes to look as much like humangenerated changes as possible. This requirement leads to the necessity of style guides and automatic formatting tools (see Chapter 8).[^15]

请记住，我们对代码库的可读性进行了优化，所以无论什么工具产生的变化，我们都希望产生的变化看起来尽可能的像人类生成的变更。这一要求导致了风格指南和自动格式化工具的必要性（见第8章）。

> [^14]:   This happens for many reasons: copy-and-paste from existing examples, committing changes that have been in development for some time, or simply reliance on old habits.
>
> 14  发生这种情况的原因有很多：从现有示例复制和粘贴，提交已经开发了一段时间的更改，或者仅仅依靠旧习惯。
>
> [^15]:   In actuality, this is the reasoning behind the original work on clang-format for C++.
>
> 15  实际上，这是C++ CLAN格式的原始工作背后的推理。

### Sharding and Submitting  分区与提交

After a global change has been generated, the author then starts running Rosie. Rosie takes a large change and shards it based upon project boundaries and ownership rules into changes that *can* be submitted atomically. It then puts each individually sharded change through an independent test-mail-submit pipeline. Rosie can be a heavy user of other pieces of Google’s developer infrastructure, so it caps the number of outstanding shards for any given LSC, runs at lower priority, and communicates with the rest of the infrastructure about how much load it is acceptable to generate on our shared testing infrastructure.

在全局变更产生之后，作者就开始运行Rosie。Rosie接收一个大的变化，并根据项目边界和所有权规则将其分割成可以原子提交的变化。然后，它把每个单独的分支变化通过一个独立的测试-邮件-提交管道。Rosie可能是谷歌开发者基础设施其他部分的重度用户，所以它对任何给定的LSC的未完成分片数量设置上限，以较低的优先级运行，并与基础设施的其他部分进行沟通，了解它在我们的共享测试基础设施上产生多少负载是可以接受的。

We talk more about the specific test-mail-submit process for each shard below.

我们在下面会更多地谈论每个分支的具体测试-邮件提交过程。

-----

##### Cattle Versus Pets  牛与宠物

We often use the “cattle and pets” analogy when referring to individual machines in a distributed computing environment, but the same principles can apply to changes within a codebase.

当提到分布式计算环境中的单个机器时，我们经常使用 "牛和宠物 "的比喻，但同样的原则可以适用于代码库中的变化。

At Google, as at most organizations, typical changes to the codebase are handcrafted by individual engineers working on specific features or bug fixes. Engineers might spend days or weeks working through the creation, testing, and review of a single change. They come to know the change intimately, and are proud when it is finally committed to the main repository. The creation of such a change is akin to owning and raising a favorite pet.

在谷歌，和大多数组织一样，代码库的典型变化是由从事特定功能或错误修复的个别工程师手动生成的。工程师们可能会花几天或几周的时间来创建、测试和审查一个单一的变化。他们密切了解这个变化，当它最终被提交到主资源库时，他们会感到很自豪。创建这样的变化就像拥有和养育一只喜爱的宠物一样。

In contrast, effective handling of LSCs requires a high degree of automation and produces an enormous number of individual changes. In this environment, we’ve found it useful to treat specific changes as cattle: nameless and faceless commits that might be rolled back or otherwise rejected at any given time with little cost unless the entire herd is affected. Often this happens because of an unforeseen problem not caught by tests, or even something as simple as a merge conflict.

相比之下，有效地处理LSC需要高度的自动化，并产生大量的单独变化。在这种环境下，我们发现把特定的修改当作牛来对待是很有用的：无名无姓的提交，在任何时候都可能被回滚或以其他方式拒绝，除非整个牛群受到影响，否则代价很小。通常情况下，这种情况发生的原因是测试没有发现的意外问题，甚至是像合并冲突这样简单的事情。

With a “pet” commit, it can be difficult to not take rejection personally, but when working with many changes as part of a large-scale change, it’s just the nature of the job. Having automation means that tooling can be updated and new changes generated at very low cost, so losing a few cattle now and then isn’t a problem.

对于一个 "宠物" 提交，不把拒绝放在心上是很难的，但当作为大规模变革的一部分而处理许多变化时，这只是工作的性质。拥有自动化意味着工具可以更新，并以非常低的成本产生新的变化，所以偶尔失去几头牛并不是什么问题。

-----

#### Testing 测试

Each independent shard is tested by running it through TAP, Google’s CI framework. We run every test that depends on the files in a given change transitively, which often creates high load on our CI system.

每个独立的分支都是通过谷歌的CI框架TAP来测试的。我们运行每一个依赖于特定变化中的文件的测试，这常常给我们的CI系统带来高负荷。

This might sound computationally expensive, but in practice, the vast majority of shards affect fewer than one thousand tests, out of the millions across our codebase. For those that affect more, we can group them together: first running the union of all affected tests for all shards, and then for each individual shard running just the intersection of its affected tests with those that failed the first run. Most of these unions cause almost every test in the codebase to be run, so adding additional changes to that batch of shards is nearly free.

这可能听起来很昂贵，但实际上，在我们的代码库中的数百万个测试中，绝大多数分支影响的测试不到一千。对于那些影响更多的测试，我们可以将它们分组：首先运行所有分支的所有受影响测试的联合，然后对于每个单独的分支，只运行其受影响的测试与那些第一次运行失败的测试的交集。这些联合体中的大多数导致代码库中的几乎每一个测试都被运行，因此向该批分支添加额外的变化几乎是无额外负担的。

One of the drawbacks of running such a large number of tests is that independent low-probability events are almost certainties at large enough scale. Flaky and brittle tests, such as those discussed in Chapter 11, which often don’t harm the teams that write and maintain them, are particularly difficult for LSC authors. Although fairly low impact for individual teams, flaky tests can seriously affect the throughput of an LSC system. Automatic flake detection and elimination systems help with this issue, but it can be a constant effort to ensure that teams that write flaky tests are the ones that bear their costs.

运行如此大量的测试的缺点之一是，独立的低概率事件在足够大的规模下几乎是确定出现的。脆弱和易碎的测试，如第11章中讨论的那些，通常不会损害编写和维护它们的团队，对LSC作者来说特别困难。虽然对单个团队的影响相当小，但分片测试会严重影响LSC系统的吞吐量。自动片断检测和消除系统有助于解决这个问题，但要确保编写片断测试的团队承担其成本，这可能是一个持续的努力。

In our experience with LSCs as semantic-preserving, machine-generated changes, we are now much more confident in the correctness of a single change than a test with any recent history of flakiness—so much so that recently flaky tests are now ignored when submitting via our automated tooling. In theory, this means that a single shard can cause a regression that is detected only by a flaky test going from flaky to failing. In practice, we see this so rarely that it’s easier to deal with it via human communication rather than automation.

根据我们对LSC作为语义保护、机器生成的更改的经验，我们现在对单个变化的正确性比对近期有任何不稳定测试更有信心--以至于最近不稳定测试现在在通过我们的自动化工具提交时被忽略了。在理论上，这意味着一个单一的分支可能会导致回归，而这个回归只能由一个不稳定的测试从不稳定到失败来检测。在实践中，我们很少看到这种情况，所以通过人工沟通而不是自动化来处理它。

For any LSC process, individual shards should be committable independently. This means that they don’t have any interdependence or that the sharding mechanism can group dependent changes (such as to a header file and its implementation) together. Just like any other change, large-scale change shards must also pass project-specific checks before being reviewed and committed.

对于任何LSC过程来说，各个分支应该是可以独立提交的。这意味着它们没有任何相互依赖性，或者说分支机制可以将相互依赖的变更（比如对头文件和其实现的变更）归为一组。就像其他变化一样，大规模的更改分支在被审查和提交之前也必须通过项目特定的检查。

#### Mailing reviewers  推送审稿人

After Rosie has validated that a change is safe through testing, it mails the change to an appropriate reviewer. In a company as large as Google, with thousands of engineers, reviewer discovery itself is a challenging problem. Recall from Chapter 9 that code in the repository is organized with OWNERS files, which list users with approval privileges for a specific subtree in the repository. Rosie uses an owners detection service that understands these OWNERS files and weights each owner based upon their expected ability to review the specific shard in question. If a particular owner proves to be unresponsive, Rosie adds additional reviewers automatically in an effort to get a change reviewed in a timely manner.

在Rosie通过测试验证了某项变更是安全的之后，它就会将该变更推送给适当的审查员。在谷歌这样一个拥有数千名工程师的大公司，审查员的发现本身就是一个具有挑战性的问题。回顾第九章，版本库中的代码是用OWNERS文件组织的，这些文件列出了对版本库中特定子树有批准权限的用户。Rosie使用一个所有者检测服务来理解这些OWNERS文件，并根据他们审查特定分片的预期能力来衡量每个所有者。如果一个特定的所有者被证明是没有响应的，Rosie会自动添加额外的审查者，以努力使一个变化得到及时的审查。

As part of the mailing process, Rosie also runs the per-project precommit tools, which might perform additional checks. For LSCs, we selectively disable certain checks such as those for nonstandard change description formatting. Although useful for individual changes on specific projects, such checks are a source of heterogeneity across the codebase and can add significant friction to the LSC process. This heterogeneity is a barrier to scaling our processes and systems, and LSC tools and authors can’t be expected to understand special policies for each team.

作为推送过程的一部分，Rosie也运行每个项目的预提交工具，这可能会执行额外的检查。对于LSC，我们有选择地禁用某些检查，例如对非标准的修改描述格式的检查。尽管这种检查对于特定项目的个别更改很有用，但它是整个代码库中异构性的一个来源，并且会给LSC过程增加很大的阻力。这种异质性是扩展我们流程和系统的障碍，不能指望LSC工具和作者了解每个团队的特殊策略。

We also aggressively ignore presubmit check failures that preexist the change in question. When working on an individual project, it’s easy for an engineer to fix those and continue with their original work, but that technique doesn’t scale when making LSCs across Google’s codebase. Local code owners are responsible for having no preexisting failures in their codebase as part of the social contract between them and infrastructure teams.

我们还积极地忽略了预先存在问题变更的提交前检查失败。在处理单个项目时，工程师很容易修复这些问题并继续他们原来的工作，但当在Google的代码库中制作LSC时，这种技术无法扩展。本地代码所有者有责任确保其代码库中没有先前存在的故障，这是他们与基础设施团队之间契约的一部分。

#### Reviewing 审查

As with other changes, changes generated by Rosie are expected to go through the standard code review process. In practice, we’ve found that local owners don’t often treat LSCs with the same rigor as regular changes—they trust the engineers generating LSCs too much. Ideally these changes would be reviewed as any other, but in practice, local project owners have come to trust infrastructure teams to the point where these changes are often given only cursory review. We’ve come to only send changes to local owners for which their review is required for context, not just approval permissions. All other changes can go to a “global approver”: someone who has ownership rights to approve *any* change throughout the repository.

与其他更改一样，由Rosie生成的更改预计将通过标准代码审查过程。在实践中，我们发现本地业主通常不会像对待普通变更那样严格对待LSC--他们太信任产生LSC的工程师了。理想情况下，这些更改会像其他更改一样被审查，但在实践中，本地项目业主已经开始信任基础设施团队，以至于这些修改往往只被粗略地审查。我们已经开始只把那些需要他们审查的变更发送给本地所有者，而不仅仅是批准权限。所有其他的修改都可以交给 "全局审批人"：拥有所有权的人可以批准整个版本库的任何修改。

When using a global approver, all of the individual shards are assigned to that person, rather than to individual owners of different projects. Global approvers generally have specific knowledge of the language and/or libraries they are reviewing and work with the large-scale change author to know what kinds of changes to expect. They know what the details of the change are and what potential failure modes for it might exist and can customize their workflow accordingly.

当使用全局审批人时，所有的单个分片都被分配给这个人，而不是分配给不同项目的单个所有者。全局审批人通常对他们正在审查的语言和/或库有特定的知识，并与大规模的变更作者合作，以了解预期的变更类型。他们知道变化的细节是什么，以及它可能存在的潜在失败模式，并可以相应地定制他们的工作流程。

Instead of reviewing each change individually, global reviewers use a separate set of pattern-based tooling to review each of the changes and automatically approve ones that meet their expectations. Thus, they need to manually examine only a small subset that are anomalous because of merge conflicts or tooling malfunctions, which allows the process to scale very well.

全局审阅者使用一组单独的基于模式的工具来审阅每个更改，并自动批准满足其期望的更改，而不是单独审阅每个更改。因此，他们只需要手动检查一小部分由于合并冲突或工具故障而异常的子集合，这使得流程能够很好地扩展。

#### Submitting 提交

Finally, individual changes are committed. As with the mailing step, we ensure that the change passes the various project precommit checks before actually finally being committed to the repository.

最后，提交单个更改。与推送步骤一样，我们确保更改在最终提交到存储库之前通过各种项目预提交检查。

With Rosie, we are able to effectively create, test, review, and submit thousands of changes per day across all of Google’s codebase and have given teams the ability to effectively migrate their users. Technical decisions that used to be final, such as the name of a widely used symbol or the location of a popular class within a codebase, no longer need to be final.

有了Rosie，我们能够在谷歌的所有代码库中有效地创建、测试、审查和提交每天数以千计的更改，并使团队有能力有效地迁移他们的用户。过去的技术决定，如一个广泛使用的符号的名称或一个流行的类在代码库中的位置，不再需要是最终决定。

### Cleanup  清理

Different LSCs have different definitions of “done,” which can vary from completely removing an old system to migrating only high-value references and leaving old ones to organically disappear.[^16] In almost all cases, it’s important to have a system that prevents additional introductions of the symbol or system that the large-scale change worked hard to remove. At Google, we use the Tricorder framework mentioned in Chapters 20 and 19 to flag at review time when an engineer introduces a new use of a deprecated object, and this has proven an effective method to prevent backsliding. We talk more about the entire deprecation process in Chapter 15.

不同的LSC对 "完成" 有不同的定义，从完全删除旧系统到只迁移高价值的引用，让旧系统有机地消失。在几乎所有情况下，重要的是，要有一个系统，防止大规模变革努力消除的符号或系统的额外引入。在谷歌，我们使用和章节中提到的Tricorder框架，在工程师引入被废弃对象的新用途时，在审查时进行标记，这已被证明是防止倒退的有效方法。我们在第15章中更多地讨论了整个废弃过程。

> [^16]: Sadly, the systems we most want to organically decompose are those that are the most resilient to doing so. They are the plastic six-pack rings of the code ecosystem.
>
> 16 可悲的是，我们最想有机分解的系统是那些最能适应这种分解的系统。它们是代码生态系统中的可塑六合环。

## Conclusion  总结

LSCs form an important part of Google’s software engineering ecosystem. At design time, they open up more possibilities, knowing that some design decisions don’t need to be as fixed as they once were. The LSC process also allows maintainers of core infrastructure the ability to migrate large swaths of Google’s codebase from old systems, language versions, and library idioms to new ones, keeping the codebase consistent, spatially and temporally. And all of this happens with only a few dozen engineers supporting tens of thousands of others.

LSC是谷歌软件工程生态系统的重要组成部分。在设计时，他们开启了更多的可能性，知道一些设计决策不需要像以前那样固定。LSC过程还允许核心基础设施的维护者有能力将谷歌的大量代码库从旧的系统、语言版本和库习语迁移到新的系统，使代码库在空间上和时间上保持一致。而这一切都发生在只有几十名工程师支持数万名其他工程师的情况下。

No matter the size of your organization, it’s reasonable to think about how you would make these kinds of sweeping changes across your collection of source code. Whether by choice or by necessity, having this ability will allow greater flexibility as your organization scales while keeping your source code malleable over time.

无论你的组织有多大的规模，你都有理由考虑如何在你的源代码集合中进行这类全面的改变。不管是出于选择还是需要，拥有这种能力将使你的组织在扩大规模时有更大的灵活性，同时使你的源代码随着时间的推移保持可塑性。

## TL;DRs  内容提要

- An LSC process makes it possible to rethink the immutability of certain technical decisions.
- Traditional models of refactoring break at large scales.
- Making LSCs means making a habit of making LSCs.

- LSC过程可以重新思考某些技术决策的不变性。
- 重构的传统模型在大范围内被打破。
- 制作LSC意味着养成制作LSC的习惯。
