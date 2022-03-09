
**CHAPTER  22 **

# Large-Scale Changes

# 第二十二章 大规模变更

                       							 Written by Hyrum Wright Edited by Lisa Carey

Think for a moment about your own codebase. How many files can you reliably update in a single, simultaneous commit? What are the factors that constrain that number? Have you ever tried committing a change that large? Would you be able to do it in a reasonable amount of time in an emergency? How does your largest commit size compare to the actual size of your codebase? How would you test such a change? How many people would need to review the change before it is committed? Would you be able to roll back that change if it did get committed? The answers to these questions might surprise you (both what you *think* the answers are and what they actually turn out to be for your organization).

考虑一下你自己的代码库。在一次同步提交中，你可以可靠地更新多少个文件？限制这一数字的因素有哪些？你有没有试过做出这么大的改变？在紧急情况下，你能在合理的时间内完成吗？您的最大提交大小与代码库的实际大小相比如何？你将如何测试这种变更？在提交更改之前，需要多少人进行审查？如果它确实被提交，你是否能够回滚该更改？这些问题的答案可能会让你大吃一惊（无论是你*认为*答案是什么，还是它们对你的组织来说实际是什么）。

At Google, we’ve long ago abandoned the idea of making sweeping changes across our codebase in these types of large atomic changes. Our observation has been that, as a codebase and the number of engineers working in it grows, the largest atomic change possible counterintuitively *decreases—*running all affected presubmit checks and tests becomes difficult, to say nothing of even ensuring that every file in the change is up to date before submission. As it has become more difficult to make sweeping changes to our codebase, given our general desire to be able to continually improve underlying infrastructure, we’ve had to develop new ways of reasoning about large-scale changes and how to implement them.

在谷歌，我们很久以前就放弃了在这些类型的大型原子性对代码库进行彻底更改的想法。我们的观察结果是，随着代码库和在其中工作的工程师数量的增加，最大的原子性更改可能会反直觉地减少运行所有受影响的提交前检查和测试变得困难，更不用说确保更改中的每个文件在提交前都是最新的了。随着对代码库进行全面更改变得越来越困难，考虑到我们希望能够持续改进底层基础设施的普遍愿望，我们不得不开发新的方法来推理大规模更改以及如何实现这些更改。

In this chapter, we’ll talk about the techniques, both social and technical, that enable us to keep the large Google codebase flexible and responsive to changes in underlying infrastructure. We’ll also provide some real-life examples of how and where we’ve used these approaches. Although your codebase might not look like Google’s, understanding these principles and adapting them locally will help your development organization scale while still being able to make broad changes across your codebase.

在这一章中，我们将谈论社会和技术方面的技术，这些技术使我们能够保持大型谷歌代码库的灵活性，并对底层基础设施的变化做出响应。我们还将提供一些实际例子，说明我们如何以及在何处使用这些方法。尽管你的代码库可能不像谷歌的代码库，但了解这些原则并对其进行局部调整，将有助于你的开发组织在扩大规模的同时，仍然能够对你的代码库进行广泛的修改。

## What Is a Large-Scale Change? 什么是大规模的变更？

Before going much further, we should dig into what qualifies as a large-scale change (LSC). In our experience, an LSC is any set of changes that are logically related but cannot practically be submitted as a single atomic unit. This might be because it touches so many files that the underlying tooling can’t commit them all at once, or it might be because the change is so large that it would always have merge conflicts. In many cases, an LSC is dictated by your repository topology: if your organization uses a collection of distributed or federated repositories,[1](#_bookmark1939) making atomic changes across them might not even be technically possible.[2](#_bookmark1940) We’ll look at potential barriers to atomic changes in more detail later in this chapter.

在进一步讨论之前，我们应该探讨一下什么是大规模变更（LSC）。根据我们的经验，LSC是指任何一组逻辑上相关但实际上不能作为一个单一的原子单元提交的变更。这可能是因为它涉及到文件太多，以至于底层工具无法一次性提交所有文件，也可能是因为变化太大，总是会有合并冲突。在很多情况下，LSC是由你的版本库拓扑结构决定的：如果你的组织使用分布式或联邦版本库集合，在它们之间进行原子修改在技术上可能是不可能的。我们将在本章后面详细讨论原子变更的潜在障碍。

LSCs at Google are almost always generated using automated tooling. Reasons for making an LSC vary, but the changes themselves generally fall into a few basic categories:

•    Cleaning up common antipatterns using codebase-wide analysis tooling

•    Replacing uses of deprecated library features

•    Enabling low-level infrastructure improvements, such as compiler upgrades

•    Moving users from an old system to a newer one[3](#_bookmark1941)

谷歌的LSC几乎都是使用自动工具生成的。制作LSC的原因各不相同，但修改本身通常分为几个基本类别：

- 使用代码库范围内的分析工具来清理常见的反模式

- 替换已废弃的库特性的使用

- 实现底层基础架构改进，如编译器升级

- 将用户从旧系统转移到新系统

The number of engineers working on these specific tasks in a given organization might be low, but it is useful for their customers to have insight into the LSC tools and process. By their very nature, LSCs will affect a large number of customers, and the LSC tools easily scale down to teams making only a few dozen related changes.

在一个特定的组织中，从事这些特定任务的工程师的数量可能不多，但对于他们的客户来说，深入了解LSC工具和流程是很有用的。就其性质而言，LSC将影响大量的客户，而LSC工具很容易扩展到只做几十个相关更改的团队。

There can be broader motivating causes behind specific LSCs. For example, a new language standard might introduce a more efficient idiom for accomplishing a given task, an internal library interface might change, or a new compiler release might require fixing existing problems that would be flagged as errors by the new release. The majority of LSCs across Google actually have near-zero functional impact: they tend to be widespread textual updates for clarity, optimization, or future compatibility. But LSCs are not theoretically limited to this behavior-preserving/refactoring class of change.

在特定的LSC背后可能有更广泛的动机。例如，新的语言标准可能会引入一种更有效的习惯用法来完成给定的任务，内部库接口可能会更改，或者新的编译器版本可能需要修复新版本标记为错误的现有问题。谷歌的大多数LSC实际上几乎没有功能影响：它们往往是为了清晰、优化或未来兼容性而进行的广泛文本更新。但从理论上讲，LSC并不局限于这种行为维护/重构类的变化。

In all of these cases, on a codebase the size of Google’s, infrastructure teams might routinely need to change hundreds of thousands of individual references to the old pattern or symbol. In the largest cases so far, we’ve touched millions of references, and we expect the process to continue to scale well. Generally, we’ve found it advantageous to invest early and often in tooling to enable LSCs for the many teams doing infrastructure work. We’ve also found that efficient tooling also helps engineers performing smaller changes. The same tools that make changing thousands of files efficient also scale down to tens of files reasonably well.

在所有这些情况下，在像谷歌这样规模的代码库中，基础设施团队可能经常需要改变数十万个对旧模式或符号的单独引用。在迄今为止最大的案例中，我们已经触及了数百万个引用，而且我们希望这个过程能够继续良好地扩展。一般来说，我们发现尽早且经常投资于工具，以便为许多从事基础设施工作的团队启用LSC是一种优势。我们还发现，高效的工具也有助于工程师进行更小的更改。同样的工具可以有效地更改数千个文件，也可以很好地扩展到数十个文件。

```
1  For some ideas about why, see [Chapter 16](#_bookmark1364).
2  It’s possible in this federated world to say “we’ll just commit to each repo as fast as possible to keep the duration of the build break small!” But that approach really doesn’t scale as the number of federated repositories grows.
3  For a further discussion about this practice, see [Chapter 15](#_bookmark1319).

1 关于原因的一些想法，见[第16章](#_bookmark1364)。
2 在这个联合的世界里，我们可以说 "我们将尽可能快地提交到每个 repo，以保持较小的构建中断时间！" 但这种方法实际上不能随着联合存储库数量的增长而扩展。
3 关于这种做法的进一步讨论，见第15章。
```

## Who Deals with LSCs? 谁负责处理LSC？

As just indicated, the infrastructure teams that build and manage our systems are responsible for much of the work of performing LSCs, but the tools and resources are available across the company. If you skipped [Chapter 1](#_bookmark3), you might wonder why infrastructure teams are the ones responsible for this work. Why can’t we just introduce a new class, function, or system and dictate that everybody who uses the old one move to the updated analogue? Although this might seem easier in practice, it turns out not to scale very well for several reasons.

如前所述，构建和管理我们系统的基础架构团队负责执行LSC的大部分工作，但工具和资源在整个公司都可用。如果你跳过了第1章，您可能会想，为什么基础设施团队负责这项工作。为什么我们不能引入一个新的类、函数或系统，并要求所有使用旧类、函数或系统的人都使用更新后的类、函数或系统？虽然这在实践中似乎更容易实现，但由于几个原因，它的扩展性不是很好。

First, the infrastructure teams that build and manage the underlying systems are also the ones with the domain knowledge required to fix the hundreds of thousands of references to them. Teams that consume the infrastructure are unlikely to have the context for handling many of these migrations, and it is globally inefficient to expect them to each relearn expertise that infrastructure teams already have. Centralization also allows for faster recovery when faced with errors because errors generally fall into a small set of categories, and the team running the migration can have a playbook—formal or informal—for addressing them.

首先，构建和管理底层系统的基础设施团队也具备修复数十万对它们的引用所需的领域知识。使用基础架构的团队不太可能具备处理许多此类迁移的背景，并且期望他们重新学习基础架构团队已经具备的专业技能在全球范围内是低效的。集中化处理还允许在遇到错误时更快地恢复，因为错误通常属于一小部分类别，运行迁移的团队可以有一个正式或非正式的预案来解决这些错误。

Consider the amount of time it takes to do the first of a series of semi-mechanical changes that you don’t understand. You probably spend some time reading about the motivation and nature of the change, find an easy example, try to follow the provided suggestions, and then try to apply that to your local code. Repeating this for every team in an organization greatly increases the overall cost of execution. By making only a few centralized teams responsible for LSCs, Google both internalizes those costs and drives them down by making it possible for the change to happen more efficiently.

考虑一下做一系列你不理解的半自动化变更中的第一次所需的时间。你可能会花一些时间来阅读关于更改的动机和性质，找到一个简单的例子，尝试遵循所提供的建议，然后尝试将其应用于你的本地代码。对组织中的每个团队重复此操作会大大增加执行的总体成本。通过只让几个集中的团队负责LSC，谷歌将这些成本内部化，并通过使变革更有效地发生来降低成本。

Second, nobody likes unfunded mandates.[4](#_bookmark1944) Even though a new system might be categorically better than the one it replaces, those benefits are often diffused across an organization and thus unlikely to matter enough for individual teams to want to update on their own initiative. If the new system is important enough to migrate to, the costs of migration will be borne somewhere in the organization. Centralizing the migration and accounting for its costs is almost always faster and cheaper than depending on individual teams to organically migrate.

第二，没有人喜欢没有资金支持的任务。即使一个新的系统在本质上可能比它所取代的系统更好，这些好处往往分散在整个组织中，因此不太可能重要到让个别团队想要主动更新。如果新系统足够重要，需要迁移到新系统，那么迁移的成本将由组织的某个部门承担。集中迁移和核算其成本，几乎总是比依靠各个团队的有机迁移更快、更便宜。

Additionally, having teams that own the systems requiring LSCs helps align incentives to ensure the change gets done. In our experience, organic migrations are unlikely to fully succeed, in part because engineers tend to use existing code as examples when writing new code. Having a team that has a vested interest in removing the old system responsible for the migration effort helps ensure that it actually gets done. Although funding and staffing a team to run these kinds of migrations can seem like an additional cost, it is actually just internalizing the externalities that an unfunded mandate creates, with the additional benefits of economies of scale.

此外，拥有需要LSC的系统的团队有助于调整激励机制，以确保完成更改。根据我们的经验，有机迁移不太可能完全成功，部分原因是工程师在编写新代码时倾向于使用现有代码作为例子。由一个对移除旧系统有既得利益的团队负责迁移工作，有助于确保迁移工作真正完成。尽管为一个团队提供资金和人员配置来运行这类迁移似乎是一项额外的成本，但它实际上只是将没有资金的授权所产生的外部性内部化，并带来规模经济的额外好处。

```
4  By “unfunded mandate,” we mean “additional requirements imposed by an external entity without balancing compensation.” Sort of like when the CEO says that everybody must wear an evening gown for “formal Fridays” but doesn’t give you a corresponding raise to pay for your formal wear.
4  我们所说的“无资金授权”是指“外部实体在不平衡薪酬的情况下强加的额外要求”。有点像CEO说每个人都必须在“正式周五”穿晚礼服，但没有给你相应的加薪来支付正式着装的费用。
```

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

在我们讨论Google实际影响LSC的过程之前，我们应该先谈谈为什么很多种类的更改不能原子化地提交。在理想情况下，所有逻辑更改都可以打包成单个原子提交，可以独立于其他更改进行测试、审查和提交。不幸的是，随着版本库和在其中工作的工程师数量的增加，这种理想变得不太可行。当使用一组分布式或联邦版本库时，即使在小规模下也完全不可行。

### Technical Limitations  技术限制

To begin with, most Version Control Systems (VCSs) have operations that scale linearly with the size of a change. Your system might be able to handle small commits (e.g., on the order of tens of files) just fine, but might not have sufficient memory or processing power to atomically commit thousands of files at once. In centralized VCSs, commits can block other writers (and in older systems, readers) from using the system as they process, meaning that large commits stall other users of the system.

首先，大多数版本控制系统（VCS）的操作都会随着更改的大小进行线性扩展。你的系统可能能够很好地处理小规模提交（例如，几十个文件的数量），但可能没有足够的内存或处理能力来一次性提交成千上万的文件。在集中式VCS中，提交会阻止其他写入程序（以及在旧系统中的读卡器）在处理时使用系统，这意味着大型提交会使系统的其他用户陷入停滞。

In short, it might not be just “difficult” or “unwise” to make a large change atomically: it might simply be impossible with a given infrastructure. Splitting the large change into smaller, independent chunks gets around these limitations, although it makes the execution of the change more complex.[5](#_bookmark1953)

简言之，以原子方式进行大规模更改可能不仅仅是“困难”或“不明智的”：对于给定的基础设施，这可能根本不可能。将较大的更改拆分为较小的独立块可以绕过这些限制，尽管这会使更改的执行更加复杂。

```
5  See [*https://ieeexplore.ieee.org/abstract/document/8443579*](https://ieeexplore.ieee.org/abstract/document/8443579).
```
### Merge Conflicts 合并冲突

As the size of a change grows, the potential for merge conflicts also increases. Every version control system we know of requires updating and merging, potentially with manual resolution, if a newer version of a file exists in the central repository. As the number of files in a change increases, the probability of encountering a merge conflict also grows and is compounded by the number of engineers working in the repository.

随着变更规模的增加，合并冲突的可能性也会增加。我们知道的每个版本控制系统都需要更新和合并，如果中央版本库中存在较新版本的文件，则可能需要手动解析。随着更改中文件数量的增加，遇到合并冲突的可能性也会增加，并且在版本库中工作的工程师数量也会增加。

If your company is small, you might be able to sneak in a change that touches every file in the repository on a weekend when nobody is doing development. Or you might have an informal system of grabbing the global repository lock by passing a virtual (or even physical!) token around your development team. At a large, global company like Google, these approaches are just not feasible: somebody is always making changes to the repository.

如果你的公司很小，你可能会在周末没有人做开发的时候，偷偷地修改版本库中的每个文件。或者你可能有一个非正式的系统，通过在开发团队中传递一个虚拟的（甚至是物理的！）令牌来抓取全局的版本库锁。在谷歌这样的大公司，这些方法是不可行的：总有人在对版本库进行修改。

With few files in a change, the probability of merge conflicts shrinks, so they are more likely to be committed without problems. This property also holds for the following areas as well.

由于更改中的文件很少，合并冲突的可能性会减小，因此它们更有可能在提交时不会出现问题。该属性也适用于以下区域。

### No Haunted Graveyards  没有闹鬼的墓地

The SREs who run Google’s production services have a mantra: “No Haunted Graveyards.” A haunted graveyard in this sense is a system that is so ancient, obtuse, or complex that no one dares enter it. Haunted graveyards are often business-critical systems that are frozen in time because any attempt to change them could cause the system to fail in incomprehensible ways, costing the business real money. They pose a real existential risk and can consume an inordinate amount of resources.

运营谷歌生产服务的SRE们有一句格言：“没有闹鬼墓地”。从这个意义上说，闹鬼墓地是一个如此古老、迟钝或复杂的系统，以至于没有人敢进入它。闹鬼的墓地往往是被冻结的关键业务系统，因为任何试图改变它们的行为都可能导致系统以无法理解的方式失败，从而使企业付出实实在在的代价。它们构成了真正的生存风险，并可能消耗过多的资源。

Haunted graveyards don’t just exist in production systems, however; they can be found in codebases. Many organizations have bits of software that are old and unmaintained, written by someone long off the team, and on the critical path of some important revenue-generating functionality. These systems are also frozen in time, with layers of bureaucracy built up to prevent changes that might cause instability. Nobody wants to be the network support engineer II who flipped the wrong bit!

然而，闹鬼的墓地并不仅仅存在于生产系统中，它们也可以在代码库中找到。许多组织都有一些老旧的、未经维护的软件，它们是由早已离开团队的人编写的，并且处于一些重要的创收功能的关键路径上。这些系统也被冻结在时间中，层层叠叠的官僚机构建立起来，防止可能导致不稳定的变化。没有人想成为网络支持工程师，他犯了错误！

These parts of a codebase are anathema to the LSC process because they prevent the completion of large migrations, the decommissioning of other systems upon which they rely, or the upgrade of compilers or libraries that they use. From an LSC perspective, haunted graveyards prevent all kinds of meaningful progress.

代码库的这些部分是LSC过程的诅咒，因为它们阻止了大型迁移的完成、它们所依赖的其他系统的退役，或者它们所使用的编译器或库的升级。从LSC的角度来看，闹鬼的墓地阻止了各种有意义的进步。

At Google, we’ve found the counter to this to be good, old-fashioned  testing. When software is thoroughly tested, we can make arbitrary changes to it and know with confidence whether those changes are breaking, no matter the age or complexity of the system. Writing those tests takes a lot of effort, but it allows a codebase like Google’s to evolve over long periods of time, consigning the notion of haunted software graveyards to a graveyard of its own.

在谷歌，我们发现这是一个好的、老式的测试。当软件经过彻底测试后，我们可以对其进行任意更改，并有信心地知道这些更改是否正在中断，无论系统的时间或复杂性如何。编写这些测试需要很多努力，但它允许像谷歌这样的代码库在很长一段时间内进化，将闹鬼软件墓地的概念交付给它自己的墓地。

### Heterogeneity  异质性

LSCs really work only when the bulk of the effort for them can be done by computers, not humans. As good as humans can be with ambiguity, computers rely upon consistent environments to apply the proper code transformations to the correct places. If your organization has many different VCSs, Continuous Integration (CI) systems, project-specific tooling, or formatting guidelines, it is difficult to make sweeping changes across your entire codebase. Simplifying the environment to add more consistency will help both the humans who need to move around in it and the robots making automated transformations.

For example, many projects at Google have presubmit tests configured to run before changes are made to their codebase. Those checks can be very complex, ranging from checking new dependencies against a whitelist, to running tests, to ensuring that the change has an associated bug. Many of these checks are relevant for teams writing new features, but for LSCs, they just add additional irrelevant complexity.

We’ve decided to embrace some of this complexity, such as running presubmit tests, by making it standard across our codebase. For other inconsistencies, we advise teams to omit their special checks when parts of LSCs touch their project code. Most teams are happy to help given the benefit these kinds of changes are to their projects.

### Testing

Every change should be tested (a process we’ll talk about more in just a moment), but the larger the change, the more difficult it is to actually test it appropriately. Google’s CI system will run not only the tests immediately impacted by a change, but also any tests that transitively depend on the changed files.[6](#_bookmark1961) This means a change gets broad coverage, but we’ve also observed that the farther away in the dependency graph a test is from the impacted files, the more unlikely a failure is to have been caused by the change itself.

Small, independent changes are easier to validate, because each of them affects a smaller set of tests, but also because test failures are easier to diagnose and fix. Finding the root cause of a test failure in a change of 25 files is pretty straightforward; finding 1 in a 10,000-file change is like the proverbial needle in a haystack.

The trade-off in this decision is that smaller changes will cause the same tests to be run multiple times, particularly tests that depend on large parts of the codebase. Because engineer time spent tracking down test failures is much more expensive than the compute time required to run these extra tests, we’ve made the conscious decision that this is a trade-off we’re willing to make. That same trade-off might not hold for all organizations, but it is worth examining what the proper balance is for yours.

```
6  This probably sounds like overkill, and it likely is. We’re doing active research on the best way to determine the “right” set of tests for a given change, balancing the cost of compute time to run the tests, and the human cost of making the wrong choice.
```

-----

##### Case Study: Testing LSCs

***Adam Bender***

Today it is common for a double-digit percentage (10% to 20%) of the changes in a project to be the result of LSCs, meaning a substantial amount of code is changed in projects by people whose full-time job is unrelated to those projects. Without good tests, such work would be impossible, and Google’s codebase would quickly atrophy under its own weight. LSCs enable us to systematically migrate our entire codebase to newer APIs, deprecate older APIs, change language versions, and remove popular but dangerous practices.

Even a simple one-line signature change becomes complicated when made in a thousand different places across hundreds of different products and services.[7](#_bookmark1965) After the change is written, you need to coordinate code reviews across dozens of teams. Lastly, after reviews are approved, you need to run as many tests as you can to be sure the change is safe.[8](#_bookmark1966) We say “as many as you can,” because a good-sized LSC could trigger a rerun of every single test at Google, and that can take a while. In fact, many LSCs have to plan time to catch downstream clients whose code backslides while the LSC makes its way through the process.

Testing an LSC can be a slow and frustrating process. When a change is sufficiently large, your local environment is almost guaranteed to be permanently out of sync with head as the codebase shifts like sand around your work. In such circumstances, it is easy to find yourself running and rerunning tests just to ensure your changes continue to be valid. When a project has flaky tests or is missing unit test coverage, it can require a lot of manual intervention and slow down the entire process. To help speed things up, we use a strategy called the TAP (Test Automation Platform) train.

**Riding** **the** **TAP** **Train**

The core insight to LSCs is that they rarely interact with one another, and most affected tests are going to pass for most LSCs. As a result, we can test more than one change at a time and reduce the total number of tests executed. The train model has proven to be very effective for testing LSCs.

The TAP train takes advantage of two facts:

  LSCs tend to be pure refactorings and therefore very narrow in scope, preserving local semantics.

  •Individual changes are often simpler and highly scrutinized, so they are correct

    more often than not.

The train model also has the advantage that it works for multiple changes at the same time and doesn’t require that each individual change ride in isolation.[9](#_bookmark1972)

The train has five steps and is started fresh every three hours:

1.  For each change on the train, run a sample of 1,000 randomly-selected tests.

2.  Gather up all the changes that passed their 1,000 tests and create one uberchange from all of them: “the train.”

3.  Run the union of all tests directly affected by the group of changes. Given a large enough (or low-level enough) LSC, this can mean running every single test in Google’s repository. This process can take more than six hours to complete.

4.  For each nonflaky test that fails, rerun it individually against each change that made it into the train to determine which changes caused it to fail.

5.  TAP generates a report for each change that boarded the train. The report describes all passing and failing targets and can be used as evidence that an LSC is safe to submit.

-----

### Code Review

Finally, as we mentioned in [Chapter 9](#_bookmark664), all changes need to be reviewed before submission, and this policy applies even for LSCs. Reviewing large commits can be tedious, onerous, and even error prone, particularly if the changes are generated by hand (a process you want to avoid, as we’ll discuss shortly). In just a moment, we’ll look at how tooling can often help in this space, but for some classes of changes, we still want humans to explicitly verify they are correct. Breaking an LSC into separate shards makes this much easier.

-----

**Case** **Study:** **scoped_ptr** **to** **std::unique_ptr**

Since its earliest days, Google’s C++ codebase has had a self-destructing smart pointer for wrapping heap-allocated C++ objects and ensuring that they are destroyed when the smart pointer goes out of scope. This type was called scoped_ptr and was used extensively throughout Google’s codebase to ensure that object lifetimes were appropriately managed. It wasn’t perfect, but given the limitations of the then-current C++ standard (C++98) when the type was first introduced, it made for safer programs.

In C++11, the language introduced a new type: std::unique_ptr. It fulfilled the same function as scoped_ptr, but also prevented other classes of bugs that the language now could detect. std::unique_ptr was strictly better than scoped_ptr, yet Google’s codebase had more than 500,000 references to scoped_ptr scattered among millions of source files. Moving to the more modern type required the largest LSC attempted to that point within Google.

Over the course of several months, several engineers attacked the problem in parallel. Using Google’s large-scale migration infrastructure, we were able to change references to scoped_ptr into references to std::unique_ptr as well as slowly adapt scoped_ptr to behave more closely to std::unique_ptr. At the height of the migration process, we were consistently generating, testing and committing more than 700 independent changes, touching more than 15,000 files *per day*. Today, we sometimes manage 10 times that throughput, having refined our practices and improved our tooling.

Like almost all LSCs, this one had a very long tail of tracking down various nuanced behavior dependencies (another manifestation of Hyrum’s Law), fighting race conditions with other engineers, and uses in generated code that weren’t detectable by our automated tooling. We continued to work on these manually as they were discovered by the testing infrastructure.

scoped_ptr was also used as a parameter type in some widely used APIs, which made small independent changes difficult. We contemplated writing a call-graph analysis system that could change an API and its callers, transitively, in one commit, but were concerned that the resulting changes would themselves be too large to commit atomically.

In the end, we were able to finally remove scoped_ptr by first making it a type alias of std::unique_ptr and then performing the textual substitution between the old alias and the new, before eventually just removing the old scoped_ptr alias. Today, Google’s codebase benefits from using the same standard type as the rest of the C++ ecosystem, which was possible only because of our technology and tooling for LSCs.

-----

## LSC Infrastructure

Google has invested in a significant amount of infrastructure to make LSCs possible. This infrastructure includes tooling for change creation, change management, change review, and testing. However, perhaps the most important support for LSCs has been the evolution of cultural norms around large-scale changes and the oversight given to them. Although the sets of technical and social tools might differ for your organization, the general principles should be the same.

### Policies and Culture

As we’ve described in [Chapter 16](#_bookmark1364), Google stores the bulk of its source code in a single monolithic repository (monorepo), and every engineer has visibility into almost all of this code. This high degree of openness means that any engineer can edit any file and send those edits for review to those who can approve them. However, each of those edits has costs, both to generate as well as review.[10](#_bookmark1981)

Historically, these costs have been somewhat symmetric, which limited the scope of changes a single engineer or team could generate. As Google’s LSC tooling improved, it became easier to generate a large number of changes very cheaply, and it became equally easy for a single engineer to impose a burden on a large number of reviewers across the company. Even though we want to encourage widespread improvements to our codebase, we want to make sure there is some oversight and thoughtfulness behind them, rather than indiscriminate tweaking.[11](#_bookmark1982)

The end result is a lightweight approval process for teams and individuals seeking to make LSCs across Google. This process is overseen by a group of experienced engineers who are familiar with the nuances of various languages, as well as invited domain experts for the particular change in question. The goal of this process is not to prohibit LSCs, but to help change authors produce the best possible changes, which make the most use of Google’s technical and human capital. Occasionally, this group might suggest that a cleanup just isn’t worth it: for example, cleaning up a common typo without any way of preventing recurrence.

Related to these policies was a shift in cultural norms surrounding LSCs. Although it is important for code owners to have a sense of responsibility for their software, they also needed to learn that LSCs were an important part of Google’s effort to scale our software engineering practices. Just as product teams are the most familiar with their own software, library infrastructure teams know the nuances of the infrastructure, and getting product teams to trust that domain expertise is an important step toward social acceptance of LSCs. As a result of this culture shift, local product teams have grown to trust LSC authors to make changes relevant to those authors’ domains.

Occasionally, local owners question the purpose of a specific commit being made as part of a broader LSC, and change authors respond to these comments just as they would other review comments. Socially, it’s important that code owners understand the changes happening to their software, but they also have come to realize that they don’t hold a veto over the broader LSC. Over time, we’ve found that a good FAQ and a solid historic track record of improvements have generated widespread endorsement of LSCs throughout Google.

```
10  There are obvious technical costs here in terms of compute and storage, but the human costs in time to review a change far outweigh the technical ones.

11   For example, we do not want the resulting tools to be used as a mechanism to fight over the proper spelling of “gray” or “grey” in comments.
```

### Codebase Insight

To do LSCs, we’ve found it invaluable to be able to do large-scale analysis of our codebase, both on a textual level using traditional tools, as well as on a semantic level. For example, Google’s use of the semantic indexing tool [Kythe ](https://kythe.io/)provides a complete map of the links between parts of our codebase, allowing us to ask questions such as “Where are the callers of this function?” or “Which classes derive from this one?” Kythe and similar tools also provide programmatic access to their data so that they can be incorporated into refactoring tools. (For further examples, see Chapters [17 ](#_bookmark1485)and [20](#_bookmark1781).)

We also use compiler-based indices to run abstract syntax tree-based analysis and transformations over our codebase. Tools such as [ClangMR](https://oreil.ly/c6xvO), JavacFlume, or [Refaster](https://oreil.ly/Er03J), which can perform transformations in a highly parallelizable way, depend on these insights as part of their function. For smaller changes, authors can use specialized, custom tools, perl or sed, regular expression matching, or even a simple shell script.

Whatever tool your organization uses for change creation, it’s important that its human effort scale sublinearly with the codebase; in other words, it should take roughly the same amount of human time to generate the collection of all required changes, no matter the size of the repository. The change creation tooling should also be comprehensive across the codebase, so that an author can be assured that their change covers all of the cases they’re trying to fix.

As with other areas in this book, an early investment in tooling usually pays off in the short to medium term. As a rule of thumb, we’ve long held that if a change requires more than 500 edits, it’s usually more efficient for an engineer to learn and execute our change-generation tools rather than manually execute that edit. For experienced “code janitors,” that number is often much smaller.

### Change Management

Arguably the most important piece of large-scale change infrastructure is the set of tooling that shards a master change into smaller pieces and manages the process of testing, mailing, reviewing, and committing them independently. At Google, this tool is called Rosie, and we discuss its use more completely in a few moments when we examine our LSC process. In many respects, Rosie is not just a tool, but an entire platform for making LSCs at Google scale. It provides the ability to split the large sets of comprehensive changes produced by tooling into smaller shards, which can be tested, reviewed, and submitted independently.

### Testing

Testing is another important piece of large-scale-change–enabling infrastructure. As discussed in [Chapter 11](#_bookmark838), tests are one of the important ways that we validate our software will behave as expected. This is particularly important when applying changes that are not authored by humans. A robust testing culture and infrastructure means that other tooling can be confident that these changes don’t have unintended effects.

Google’s testing strategy for LSCs differs slightly from that of normal changes while still using the same underlying CI infrastructure. Testing LSCs means not just ensuring the large master change doesn’t cause failures, but that each shard can be submitted safely and independently. Because each shard can contain arbitrary files, we don’t use the standard project-based presubmit tests. Instead, we run each shard over the transitive closure of every test it might affect, which we discussed earlier.

### Language Support

LSCs at Google are typically done on a per-language basis, and some languages support them much more easily than others. We’ve found that language features such as type aliasing and forwarding functions are invaluable for allowing existing users to continue to function while we introduce new systems and migrate users to them nonatomically. For languages that lack these features, it is often difficult to migrate systems incrementally.[12](#_bookmark1993)

We’ve also found that statically typed languages are much easier to perform large automated changes in than dynamically typed languages. Compiler-based tools along with strong static analysis provide a significant amount of information that we can use to build tools to affect LSCs and reject invalid transformations before they even get to the testing phase. The unfortunate result of this is that languages like Python, Ruby, and JavaScript that are dynamically typed are extra difficult for maintainers. Language choice is, in many respects, intimately tied to the question of code lifespan: languages that tend to be viewed as more focused on developer productivity tend to be more difficult to maintain. Although this isn’t an intrinsic design requirement, it is where the current state of the art happens to be.

Finally, it’s worth pointing out that automatic language formatters are a crucial part of the LSC infrastructure. Because we work toward optimizing our code for readability, we want to make sure that any changes produced by automated tooling are intelligible to both immediate reviewers and future readers of the code. All of the LSCgeneration tools run the automated formatter appropriate to the language being changed as a separate pass so that the change-specific tooling does not need to concern itself with formatting specifics. Applying automated formatting, such as [google-java-format ](https://github.com/google/google-java-format)or [clang-format](https://clang.llvm.org/docs/ClangFormat.html), to our codebase means that automatically produced changes will “fit in” with code written by a human, reducing future development friction. Without automated formatting, large-scale automated changes would never have become the accepted status quo at Google.

```
12   In fact, Go recently introduced these kinds of language features specifically to support large-scale refactorings (see [*https://talks.golang.org/2016/refactor.article*](https://talks.golang.org/2016/refactor.article)).
```

-----

**Case** **Study:** **Operation** **RoseHub**

LSCs have become a large part of Google’s internal culture, but they are starting to have implications in the broader world. Perhaps the best known case so far was “[Operation RoseHub](https://oreil.ly/txtDj).”

In early 2017, a vulnerability in the Apache Commons library allowed any Java application with a vulnerable version of the library in its transitive classpath to become susceptible to remote execution. This bug became known as the Mad Gadget. Among other things, it allowed an avaricious hacker to encrypt the San Francisco Municipal Transportation Agency’s systems and shut down its operations. Because the only requirement for the vulnerability was having the wrong library somewhere in its classpath, anything that depended on even one of many open source projects on GitHub was vulnerable.

To solve this problem, some enterprising Googlers launched their own version of the LSC process. By using tools such as [BigQuery](https://cloud.google.com/bigquery), volunteers identified affected projects and sent more than 2,600 patches to upgrade their versions of the Commons library to one that addressed Mad Gadget. Instead of automated tools managing the process, more than 50 humans made this LSC work.

-----

## The LSC Process

With these pieces of infrastructure in place, we can now talk about the process for actually making an LSC. This roughly breaks down into four phases (with very nebulous boundaries between them):

1.  Authorization

2.  Change creation

3.  Shard management

4.  Cleanup

Typically, these steps happen after a new system, class, or function has been written, but it’s important to keep them in mind during the design of the new system. At Google, we aim to design successor systems with a migration path from older systems in mind, so that system maintainers can move their users to the new system automatically.

### Authorization

We ask potential authors to fill out a brief document explaining the reason for a proposed change, its estimated impact across the codebase (i.e., how many smaller shards the large change would generate), and answers to any questions potential reviewers might have. This process also forces authors to think about how they will describe the change to an engineer unfamiliar with it in the form of an FAQ and proposed change description. Authors also get “domain review” from the owners of the API being refactored.

This proposal is then forwarded to an email list with about a dozen people who have oversight over the entire process. After discussion, the committee gives feedback on how to move forward. For example, one of the most common changes made by the committee is to direct all of the code reviews for an LSC to go to a single “global approver.” Many first-time LSC authors tend to assume that local project owners should review everything, but for most mechanical LSCs, it’s cheaper to have a single expert understand the nature of the change and build automation around reviewing it properly.

After the change is approved, the author can move forward in getting their change submitted. Historically, the committee has been very liberal with their approval,[13](#_bookmark2005) and often gives approval not just for a specific change, but also for a broad set of related changes. Committee members can, at their discretion, fast-track obvious changes without the need for full deliberation.

The intent of this process is to provide oversight and an escalation path, without being too onerous for the LSC authors. The committee is also empowered as the escalation body for concerns or conflicts about an LSC: local owners who disagree with the change can appeal to this group who can then arbitrate any conflicts. In practice, this has rarely been needed.

### Change Creation

After getting the required approval, an LSC author will begin to produce the actual code edits. Sometimes, these can be generated comprehensively into a single large global change that will be subsequently sharded into many smaller independent pieces. Usually, the size of the change is too large to fit in a single global change, due to technical limitations of the underlying version control system.

The change generation process should be as automated as possible so that the parent change can be updated as users backslide into old uses[14](#_bookmark2009) or textual merge conflicts occur in the changed code. Occasionally, for the rare case in which technical tools aren’t able to generate the global change, we have sharded change generation across humans (see [“Case Study: Operation RoseHub” on page 472](#_bookmark1994)). Although much more labor intensive than automatically generating changes, this allows global changes to happen much more quickly for time-sensitive applications.

Keep in mind that we optimize for human readability of our codebase, so whatever tool generates changes, we want the resulting changes to look as much like humangenerated changes as possible. This requirement leads to the necessity of style guides and automatic formatting tools (see [Chapter 8](#_bookmark580)).[15](#_bookmark2010)

```
13  The only kinds of changes that the committee has outright rejected have been those that are deemed dangerous, such as converting all NULL instances to nullptr, or extremely low-value, such as changing spelling from British English to American English, or vice versa. As our experience with such changes has increased and the cost of LSCs has dropped, the threshold for approval has as well.
```

### Sharding and Submitting

After a global change has been generated, the author then starts running Rosie. Rosie takes a large change and shards it based upon project boundaries and ownership rules into changes that *can* be submitted atomically. It then puts each individually sharded change through an independent test-mail-submit pipeline. Rosie can be a heavy user of other pieces of Google’s developer infrastructure, so it caps the number of outstanding shards for any given LSC, runs at lower priority, and communicates with the rest of the infrastructure about how much load it is acceptable to generate on our shared testing infrastructure.

We talk more about the specific test-mail-submit process for each shard below.

```
14   This happens for many reasons: copy-and-paste from existing examples, committing changes that have been in development for some time, or simply reliance on old habits.

15   In actuality, this is the reasoning behind the original work on clang-format for C++.
```



-----

**Cattle** **Versus** **Pets**

We often use the “cattle and pets” analogy when referring to individual machines in a distributed computing environment, but the same principles can apply to changes within a codebase.

At Google, as at most organizations, typical changes to the codebase are handcrafted by individual engineers working on specific features or bug fixes. Engineers might spend days or weeks working through the creation, testing, and review of a single change. They come to know the change intimately, and are proud when it is finally committed to the main repository. The creation of such a change is akin to owning and raising a favorite pet.

In contrast, effective handling of LSCs requires a high degree of automation and pro‐

duces an enormous number of individual changes. In this environment, we’ve found it useful to treat specific changes as cattle: nameless and faceless commits that might be rolled back or otherwise rejected at any given time with little cost unless the entire herd is affected. Often this happens because of an unforeseen problem not caught by tests, or even something as simple as a merge conflict.

With a “pet” commit, it can be difficult to not take rejection personally, but when working with many changes as part of a large-scale change, it’s just the nature of the job. Having automation means that tooling can be updated and new changes generated at very low cost, so losing a few cattle now and then isn’t a problem.

-----

#### Testing

Each independent shard is tested by running it through TAP, Google’s CI framework. We run every test that depends on the files in a given change transitively, which often creates high load on our CI system.

This might sound computationally expensive, but in practice, the vast majority of shards affect fewer than one thousand tests, out of the millions across our codebase. For those that affect more, we can group them together: first running the union of all affected tests for all shards, and then for each individual shard running just the intersection of its affected tests with those that failed the first run. Most of these unions cause almost every test in the codebase to be run, so adding additional changes to that batch of shards is nearly free.

One of the drawbacks of running such a large number of tests is that independent low-probability events are almost certainties at large enough scale. Flaky and brittle tests, such as those discussed in [Chapter 11](#_bookmark838), which often don’t harm the teams that write and maintain them, are particularly difficult for LSC authors. Although fairly low impact for individual teams, flaky tests can seriously affect the throughput of an LSC system. Automatic flake detection and elimination systems help with this issue, but it can be a constant effort to ensure that teams that write flaky tests are the ones that bear their costs.

In our experience with LSCs as semantic-preserving, machine-generated changes, we are now much more confident in the correctness of a single change than a test with any recent history of flakiness—so much so that recently flaky tests are now ignored when submitting via our automated tooling. In theory, this means that a single shard can cause a regression that is detected only by a flaky test going from flaky to failing. In practice, we see this so rarely that it’s easier to deal with it via human communication rather than automation.

For any LSC process, individual shards should be committable independently. This means that they don’t have any interdependence or that the sharding mechanism can group dependent changes (such as to a header file and its implementation) together. Just like any other change, large-scale change shards must also pass project-specific checks before being reviewed and committed.

#### Mailing reviewers

After Rosie has validated that a change is safe through testing, it mails the change to an appropriate reviewer. In a company as large as Google, with thousands of engineers, reviewer discovery itself is a challenging problem. Recall from [Chapter 9 ](#_bookmark664)that code in the repository is organized with OWNERS files, which list users with approval privileges for a specific subtree in the repository. Rosie uses an owners detection service that understands these OWNERS files and weights each owner based upon their expected ability to review the specific shard in question. If a particular owner proves to be unresponsive, Rosie adds additional reviewers automatically in an effort to get a change reviewed in a timely manner.

As part of the mailing process, Rosie also runs the per-project precommit tools, which might perform additional checks. For LSCs, we selectively disable certain checks such as those for nonstandard change description formatting. Although useful for individual changes on specific projects, such checks are a source of heterogeneity across the codebase and can add significant friction to the LSC process. This heterogeneity is a barrier to scaling our processes and systems, and LSC tools and authors can’t be expected to understand special policies for each team.

We also aggressively ignore presubmit check failures that preexist the change in question. When working on an individual project, it’s easy for an engineer to fix those and continue with their original work, but that technique doesn’t scale when making LSCs across Google’s codebase. Local code owners are responsible for having no preexisting failures in their codebase as part of the social contract between them and infrastructure teams.

#### Reviewing

As with other changes, changes generated by Rosie are expected to go through the standard code review process. In practice, we’ve found that local owners don’t often treat LSCs with the same rigor as regular changes—they trust the engineers generating LSCs too much. Ideally these changes would be reviewed as any other, but in practice, local project owners have come to trust infrastructure teams to the point where these changes are often given only cursory review. We’ve come to only send changes to local owners for which their review is required for context, not just approval permissions. All other changes can go to a “global approver”: someone who has ownership rights to approve *any* change throughout the repository.

When using a global approver, all of the individual shards are assigned to that person, rather than to individual owners of different projects. Global approvers generally have specific knowledge of the language and/or libraries they are reviewing and work with the large-scale change author to know what kinds of changes to expect. They know what the details of the change are and what potential failure modes for it might exist and can customize their workflow accordingly.

Instead of reviewing each change individually, global reviewers use a separate set of pattern-based tooling to review each of the changes and automatically approve ones that meet their expectations. Thus, they need to manually examine only a small subset that are anomalous because of merge conflicts or tooling malfunctions, which allows the process to scale very well.

#### Submitting

Finally, individual changes are committed. As with the mailing step, we ensure that the change passes the various project precommit checks before actually finally being committed to the repository.

With Rosie, we are able to effectively create, test, review, and submit thousands of changes per day across all of Google’s codebase and have given teams the ability to effectively migrate their users. Technical decisions that used to be final, such as the name of a widely used symbol or the location of a popular class within a codebase, no longer need to be final.

### Cleanup

Different LSCs have different definitions of “done,” which can vary from completely removing an old system to migrating only high-value references and leaving old ones to organically disappear.[16](#_bookmark2019) In almost all cases, it’s important to have a system that prevents additional introductions of the symbol or system that the large-scale change worked hard to remove. At Google, we use the Tricorder framework mentioned in Chapters [20 ](#_bookmark1781)and [19 ](#_bookmark1719)to flag at review time when an engineer introduces a new use of a deprecated object, and this has proven an effective method to prevent backsliding. We talk more about the entire deprecation process in [Chapter 15](#_bookmark1319).

## Conclusion

LSCs form an important part of Google’s software engineering ecosystem. At design time, they open up more possibilities, knowing that some design decisions don’t need to be as fixed as they once were. The LSC process also allows maintainers of core infrastructure the ability to migrate large swaths of Google’s codebase from old systems, language versions, and library idioms to new ones, keeping the codebase consistent, spatially and temporally. And all of this happens with only a few dozen engineers supporting tens of thousands of others.

No matter the size of your organization, it’s reasonable to think about how you would make these kinds of sweeping changes across your collection of source code. Whether by choice or by necessity, having this ability will allow greater flexibility as your organization scales while keeping your source code malleable over time.

## TL;DRs

•    An LSC process makes it possible to rethink the immutability of certain technical decisions.

•    Traditional models of refactoring break at large scales.

•    Making LSCs means making a habit of making LSCs.

























