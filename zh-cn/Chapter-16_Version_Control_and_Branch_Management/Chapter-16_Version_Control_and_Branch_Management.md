
**CHAPTER 16**

# Version Control and Branch Management

# 第十六章 版本控制和分支管理

**Written by Titus Winters**

**Edited by Lisa Carey**

Perhaps no software engineering tool is quite as universally adopted throughout the industry as version control. One can hardly imagine any software organization larger than a few people that doesn’t rely on a formal Version Control System (VCS) to manage its source code and coordinate activities between engineers.

也许没有一种软件工程工具像版本控制工具那样在整个行业中被广泛采用。我们很难想象，任何超过几个人的软件组织不依靠正式的版本控制系统（VCS）来管理其源代码和协调工程师之间的活动。

In this chapter, we’re going to look at why the use of version control has become such an unambiguous norm in software engineering, and we describe the various possible approaches to version control and branch management, including how we do it at scale across all of Google. We’ll also examine the pros and cons of various approaches; although we believe everyone should use version control, some version control policies and processes might work better for your organization (or in general) than others. In particular, we find “trunk-based development” as popularized by DevOps[^1] (one repository, no dev branches) to be a particularly scalable policy approach, and we’ll provide some suggestions as to why that is.

在本章中，我们将了解为什么版本控制工具的使用在软件工程中已成为如此明确的规范，我们将描述版本控制和分支管理的各种可能方法，包括我们如何在整个谷歌范围内大规模地使用。我们还将研究各种方法的优缺点；尽管我们认为每个人都应该使用版本控制，但某些版本控制策略和流程可能比其他策略和流程更适合你的组织（或总体而言）。特别是，我们发现由DevOps推广的 "基于主干的开发"（一个版本库，没有开发分支）是一种特别可扩展的策略方法，我们将提供一些建议来解释为什么会这样。

> [^1]: The DevOps Research Association, which was acquired by Google between the first draft of this chapter and publication, has published extensively on this in the annual “State of DevOps Report” and the book Accelerate. As near as we can tell, it popularized the terminology trunk-based development.
>
> 1 DevOps研究协会，在本章初稿和出版之间被谷歌收购，在年度 "DevOps状况报告 "和《加速》一书中广泛发表了这方面的内容。据我们所知，它推广了基于主干的开发这一术语。

## What Is Version Control?  什么是版本控制？

A VCS is a system that tracks revisions (versions) of files over time. A VCS maintains some metadata about the set of files being managed, and collectively a copy of the files and metadata is called a repository[^2] (repo for short). A VCS helps coordinate the activities of teams by allowing multiple developers to work on the same set of files simultaneously. Early VCSs did this by granting one person at a time the right to edit a file—that style of locking is enough to establish sequencing (an agreed-upon “which is newer,” an important feature of VCS). More advanced systems ensure that changes to a *collection* of files submitted at once are treated as a single unit (*atomicity* when a logical change touches multiple files). Systems like CVS (a popular VCS from the 90s) that didn’t have this atomicity for a commit were subject to corruption and lost changes. Ensuring atomicity removes the chance of previous changes being overwritten unintentionally, but requires tracking which version was last synced to—at commit time, the commit is rejected if any file in the commit has been modified at head since the last time the local developer synced. Especially in such a change-tracking VCS, a developer’s working copy of the managed files will therefore need metadata of its own. Depending on the design of the VCS, this copy of the repository can be a repository itself, or might contain a reduced amount of metadata—such a reduced copy is usually a “client” or “workspace.”

VCS是一个跟踪文件随时间变化的修订（版本）的系统。VCS维护一些关于被管理的文件集的元数据，文件和元数据的副本统称为版本库（简称repo）。VCS通过允许多个开发者同时在同一组文件上工作来帮助协调团队的活动。早期的VCS是通过每次授予一个人编辑文件的权利来实现的——这种锁定方式足以建立顺序（一种约定的“更新的”，VCS的一个重要特性）。更高级的系统确保对一次提交的*文件集合*的更改被视为单个单元（当逻辑更改涉及多个文件时，原子性）。像CVS（90年代流行的VCS）这样的系统，如果没有这种提交的原子性，就会出现损坏和丢失更改。确保原子性消除了以前的更改被无意覆盖的可能性，但需要跟踪最后同步的版本——在提交时，如果提交中的任何文件在本地开发者最后一次同步后被修改过，则提交将被拒绝。特别是在这样一个变化跟踪的VCS中，开发者管理着的文件的工作副本因此需要有自己的元数据。根据VCS的设计，这个版本库的副本可以是一个版本库本身，也可以包含一个精简的元数据——这样一个精简的副本通常是一个 "客户端"或"工作区"。

This seems like a lot of complexity: why is a VCS necessary? What is it about this sort of tool that has allowed it to become one of the few nearly universal tools for software development and software engineering?

这似乎很复杂：为什么需要一个VCS？是什么让这种工具成为为数不多的软件开发和软件工程几乎通用的工具之一？

Imagine for a moment working without a VCS. For a (very) small group of distributed developers working on a project of limited scope without any understanding of version control, the simplest and lowest-infrastructure solution is to just pass copies of the project back and forth. This works best when edits are nonsimultaneous (people are working in different time zones, or at least with different working hours). If there’s any chance for people to not know which version is the most current, we immediately have an annoying problem: tracking which version is the most up to date. Anyone who has attempted to collaborate in a non-networked environment will likely recall the horrors of copying back-and-forth files named *Presentation v5 - final - redlines - Josh’s version v2*. And as we shall see, when there isn’t a single agreed-upon source of truth, collaboration becomes high friction and error prone.

想象一下，在没有VCS的情况下工作。对于一个（非常）小的分布式开发人员小组，在一个范围有限的项目上工作，而不了解版本控制，最简单和最低要求的基础设施解决方案是只是来回传递项目的副本。这在非同步编辑时效果最好（人们在不同的时区工作，或至少在不同的工作时间）。如果有让人们不知道哪个版本是最新的时刻，我们马上就会有一个恼人的问题：追踪哪个版本是最新的。任何试图在非网络环境下进行协作的人都可能会想起来回复制名为*Presentation v5 - final - redlines - Josh's version v2*的文件的恐怖。正如我们将看到的那样， 当没有一个统一的信息来源时，合作就会变得阻力很大，容易出错。

Introducing shared storage requires slightly more infrastructure (getting access to shared storage), but provides an easy and obvious solution. Coordinating work in a shared drive might suffice for a while with a small enough number of people but still requires out-of-band collaboration to avoid overwriting one another’s work. Further, working directly in that shared storage means that any development task that doesn’t keep the build working continuously will begin to impede everyone on the team—if I’m making a change to some part of this system at the same time that you kick off a build, your build won’t work. Obviously, this doesn’t scale well.

引入共享存储需要稍多的基础设施（获得对共享存储的访问），但提供了一个简单而显著的解决方案。在一个共享存储驱动器中协调工作，在人数足够少的情况下可能已经足够了，但仍然需要带外协作以避免覆盖彼此的工作。此外，直接在共享存储中工作意味着任何不能保持构建持续工作的开发任务都会开始阻碍团队中的每个人——如果我在你启动构建的同时对这个系统的某些部分进行了修改，你的构建就无法工作。很明显，这并不能很好地扩展。

In practice, lack of file locking and lack of merge tracking will inevitably lead to collisions and work being overwritten. Such a system is very likely to introduce out-of-band coordination to decide who is working on any given file. If that file-locking is encoded in software, we’ve begun reinventing an early-generation version control like RCS (among others). After you realize that granting write permissions a file at a time is too coarse grained and you begin wanting line-level tracking—we’re definitely reinventing version control. It seems nearly inevitable that we’ll want some structured mechanism to govern these collaborations. Because we seem to just be reinventing the wheel in this hypothetical, we might as well use an off-the-shelf tool.

在实践中，缺乏文件锁和缺乏合并跟踪将不可避免地导致冲突和工作被覆盖。这样一个系统很有可能引入带外协调，以决定谁在任何给定的文件上工作。如果这种文件锁定被编码在软件中，我们就开始重新发明像RCS（包括其他）这样的早期版本控制。当你意识到一次授予一个文件的写入权限过于粗放，而你开始需要行级跟踪时，我们肯定在重新发明版本控制。似乎不可避免的是，我们将需要一些结构化的机制来管理这些合作。因为在这个假设中，我们似乎只是在重新发明车轮，我们不妨使用一个现成的工具。

> [^2]: Although the formal idea of what is and is not a repository changes a bit depending on your choice of VCS, and the terminology will vary.
>
> 2 虽然什么是和什么不是版本库的正式概念会因你选择的VCS而有些变化，术语也会有所不同。

### Why Is Version Control Important?  为什么版本控制很重要？

While version control is practically ubiquitous now, this was not always the case. The very first VCSs date back to the 1970s (SCCS) and 1980s (RCS)—many years later than the first references to software engineering as a distinct discipline. Teams participated in “the [multiperson development of multiversion software](https://arxiv.org/pdf/1805.02742.pdf)” before the industry had any formal notion of version control. Version control evolved as a response to the novel challenges of digital collaboration. It took decades of evolution and dissemination for reliable, consistent use of version control to evolve into the norm that it is today.[^3] So how did it become so important, and, given that it seems like a self-evident solution, why might anyone resist the idea of VCS?

虽然现在版本控制几乎无处不在，但情况并非总是如此。最早的VCS可以追溯到20世纪70年代（SCCS）和80年代（RCS）——比首次将软件工程作为一门独立学科的时间晚了许多年。在业界有任何正式的版本控制概念之前，团队就参与了"[多版本软件的多人开发](https://arxiv.org/pdf/1805.02742.pdf)"。版本控制是为了应对数字协作的新挑战而发展起来的。经过几十年的演变和传播，版本控制的可靠、一致的使用才演变成今天的规范。 那么，它是如何变得如此重要的呢？鉴于它似乎是一个不言而喻的解决方案，为什么会有人抵制VCS的想法呢？

Recall that software engineering is programming integrated over time; we’re drawing a distinction (in dimensionality) between the instantaneous production of source code and the act of maintaining that product over time. That basic distinction goes a long way to explaining the importance of, and hesitation toward, VCS: at the most fundamental level, version control is the engineer’s primary tool for managing the interplay between raw source and time. We can conceptualize VCS as a way to extend a standard filesystem. A filesystem is a mapping from filename to contents. A VCS extends that to provide a mapping from (filename, time) to contents, along with the metadata necessary to track last sync points and audit history. Version control makes the consideration of time an explicit part of the operation: unnecessary in a program‐ming task, critical in a software engineering task. In most cases, a VCS also allows for an extra input to that mapping (a branch name) to allow for parallel mappings; thus:

回顾一下，软件工程是随着时间的推移而集成的编程；我们在源代码的即时生产和随着时间的推移维护该产品的行为之间（在维度上）进行了区分。这一基本区别在很大程度上解释了VCS的重要性和对VCS的疑虑：在最基本的层面上，版本控制是工程师管理原始源和时间之间相互作用的主要工具。我们可以将VCS概念化为一种扩展标准文件系统的方式。文件系统是一个从文件名到内容的映射。VCS扩展了它，提供了从（文件名，时间）到内容的映射，以及跟踪最后同步点和审计历史所需的元数据。版本控制把时间的操作的一个明确的部分：在编程任务中是不必要的，在软件工程任务中是关键的。在大多数情况下，VCS还允许对该映射有一个额外的输入（一个分支名称），以允许并行映射；因此：

```txt
VCS(filename, time, branch) => file contents
```

In the default usage, that branch input will have a commonly understood default: we call that “head,” “default,” or “trunk” to denote main branch.

在默认的用法中，该分支输入将有一个普遍理解的默认值：我们称之为“head”、“default”或“trunk”来表示主分支

The (minor) remaining hesitation toward consistent use of version control comes almost directly from conflating programming and software engineering—we teach programming, we train programmers, we interview for jobs based on programming problems and techniques. It’s perfectly reasonable for a new hire, even at a place like Google, to have little or no experience with code that is worked on by more than one person or for more than a couple weeks. Given that experience and understanding of the problem, version control seems like an alien solution. Version control is solving a problem that our new hire hasn’t necessarily experienced: an “undo,” not for a single file but for an entire project, adding a lot of complexity for sometimes nonobvious benefits.

对持续使用版本控制的（微小的）剩余疑虑几乎直接来自于编程和软件工程的融合——我们教编程，我们培训程序员，我们根据编程问题和技术来面试工作。对于一个新员工来说，即使是在像谷歌这样的地方，对于由一个以上的人或几个星期以上的时间来处理的代码，几乎没有经验，这是完全合理的。鉴于这种经验和对问题的理解，版本控制似乎是一个陌生的解决方案。版本控制正在解决一个我们的新雇员不一定经历过的问题：“撤销”，不是针对单个文件，而是针对整个项目，这增加了很多复杂性，有时并没有带来了明显的好处。

In some software groups, the same result plays out when management views the job of the techies as “software development” (sit down and write code) rather than “software engineering” (produce code, keep it working and useful for some extended period). With a mental model of programming as the primary task and little understanding of the interplay between code and the passage of time, it’s easy to see something described as “go back to a previous version to undo a mistake” as a weird, high- overhead luxury.

在一些软件团队中，当管理层将技术人员的工作视为“软件开发”（坐下来编写代码）而不是“软件工程”（生成代码，使其在较长时间内保持工作和有效）时，也会产生同样的结果。在把编程作为主要任务的思维模式下，以及对代码和时间流逝之间的相互作用了解甚少的情况下，很容易把 "返回到以前的版本以撤销错误 "这样的描述看作是一种奇怪的、高开销的奢侈品。

In addition to allowing separate storage and reference to versions over time, version control helps us bridge the gap between single-developer and multideveloper processes. In practical terms, this is why version control is so critical to software engineering, because it allows us to scale up teams and organizations, even though we use it only infrequently as an “undo” button. Development is inherently a branch-and- merge process, both when coordinating between multiple developers or a single developer at different points in time. A VCS removes the question of “which is more recent?” Use of modern version control automates error-prone operations like tracking which set of changes have been applied. Version control is how we coordinate between multiple developers and/or multiple points in time.

除了允许随着时间的推移单独存储和长期引用版本外，版本控制还帮助我们弥合单个开发人员和多个开发人员流程之间的差距。在实践中，这就是为什么版本控制对软件工程如此关键，因为它允许我们扩大团队和组织的规模，尽管我们只是不经常使用它作为一个 "撤销"按钮。**开发本质上是一个分支和合并的过程，无论是在多个开发人员之间还是在不同时间点的单个开发人员之间进行协调。**版本控制系统消除了 "哪个是最新的？"的问题。使用现代的版本控制可以将容易出错的操作自动化，比如跟踪哪一组修改已经被应用。版本控制是我们在多个开发者和/或多个时间点之间协调的方式。

Because VCS has become so thoroughly embedded in the process of software engineering, even legal and regulatory practices have caught up. VCS allows a formal record of every change to every line of code, which is increasingly necessary for satisfying audit requirements. When mixing between in-house development and appropriate use of third-party sources, VCS helps track provenance and origination for every line of code.

由于VCS已经完全融入到软件工程的过程中，甚至连法律和监管实践也迎头赶上。VCS允许对每一行代码的每一次更改进行正式记录，这对于满足审计要求越来越必要。当混合使用内部开发和第三方资源时，VCS帮助跟踪每行代码的出处和起源。

In addition to the technical and regulatory aspects of tracking source over time and handling sync/branch/merge operations, version control triggers some nontechnical changes in behavior. The ritual of committing to version control and producing a commit log is a trigger for a moment of reflection: what have you accomplished since your last commit? Is the source in a state that you’re happy with? The moment of introspection associated with committing, writing up a summary, and marking a task complete might have value on its own for many people. The start of the commit process is a perfect time to run through a checklist, run static analyses (see Chapter 20), check test coverage, run tests and dynamic analysis, and so on.

除了随时间跟踪源和处理同步/分支/合并操作的技术和法规方面外，版本控制还会触发一些行为上的非技术性更改。提交到版本控制并生成提交日志的惯例是引发思考的一刻：自上次提交以来，你完成了什么？源码是否处于你满意的状态？对于许多人来说，与提交、撰写总结和完成任务相关的内省时刻本身可能具有价值。提交过程的开始是运行检查表、运行静态分析（参见第20章）、检查测试覆盖率、运行测试和动态分析等的最佳时机。

Like any process, version control comes with some overhead: someone must configure and manage your version control system, and individual developers must use it. But make no mistake about it: these can almost always be pretty cheap. Anecdotally, most experienced software engineers will instinctively use version control for any project that lasts more than a day or two, even for a single-developer project. The consistency of that result argues that the trade-off in terms of value (including risk reduction) versus overhead must be a pretty easy one. But we’ve promised to acknowledge that context matters and to encourage engineering leaders to think for themselves. It is always worth considering alternatives, even on something as fundamental as version control.

与任何流程一样，版本控制也会带来一些开销：必须有人配置和管理你的版本控制系统，并且每个开发人员都必须使用它。但别搞错了：这些几乎总是相当低成本的。有趣的是，大多数经验丰富的软件工程师会本能地对任何持续一到两天以上的项目使用版本控制，即使是单个开发人员的项目。这一结果的一致性表明，在价值（包括风险降低）和管理费用方面的权衡必须非常容易。但我们要承认背景的重要性，并鼓励工程负责人独立思考。即使在像版本控制这样的基本问题上，也总是值得考虑其他选择。

In truth, it’s difficult to envision any task that can be considered modern software engineering that doesn’t immediately adopt a VCS. Given that you understand the value and need for version control, you are likely now asking what type of version control you need.

事实上，很难设想任何可以被认为是现代软件工程的任务不立即采用VCS。鉴于你了解版本控制的价值和需要，你现在可能会问你需要什么类型的版本控制。

> [^3]: Indeed, I’ve given several public talks that use “adoption of version control” as the canonical example of how the norms of software engineering can and do evolve over time. In my experience, in the 1990s, version control was pretty well understood as a best practice but not universally followed. In the early 2000s, it was still common to encounter professional groups that didn’t use it. Today, the use of tools like Git seems ubiquitous even among college students working on personal projects. Some of this rise in adoption is likely due to better user experience in the tools (nobody wants to go back to RCS), but the role of experience and changing norms is significant.
>
> 3 事实上，我曾多次公开演讲，以 "版本控制的采用 "为例，说明软件工程的规范是如何随着时间的推移而演变的。根据我的经验，在20世纪90年代，版本控制被理解为一种最佳实践，但没有得到普遍遵守。在21世纪初，不使用版本控制的专业团体仍然很常见。今天，即使在从事个人项目的大学生中，像Git这样的工具的使用似乎也是无处不在的。这种采用率的上升可能是由于在工具中更好的用户体验（没有人愿意回到RCS），但经验和不断变化的规范的作用也很重要。

### Centralized VCS Versus Distributed VCS  集中式VCS与分布式VCS

At the most simplistic level, all modern VCSs are equivalent to one another: so long as your system has a notion of atomically committing changes to a batch of files, everything else is just UI. You could build the same general semantics (not workflow) of any modern VCS out of another one and a pile of simple shell scripts. Thus, arguing about which VCS is “better” is primarily a matter of user experience—the core functionality is the same, the differences come in user experience, naming, edge-case features, and performance. Choosing a VCS is like choosing a filesystem format: when choosing among a modern-enough format, the differences are fairly minor, and the more important question by far is the content you fill that system with and the way you *use* it. However, major architectural differences in VCSs can make configuration, policy, and scaling decisions easier or more difficult, so it’s important to be aware of the big architectural differences, chiefly the decision between centralized or decentralized.

在最简单的层面上，所有现代VCS都是一样的：只要你的系统有一个将更改以原子方式提交给一批文件的概念，其他一切都只是UI不同。你可以用另一个VCS和一堆简单的shell脚本构建任何现代VCS的通用语义（而不是工作流）。因此，讨论哪些VCS“更好”主要是用户体验的问题。核心功能是相同的，不同之处在于用户体验、命名、边缘案例功能和性能。选择一个VCS就像选择一个文件系统格式：在一个足够现代的格式中进行选择时，差异是相当小的，到目前为止，更重要的问题是你在该系统中填充的内容以及你使用它的方式。然而，VCS中的主要架构差异可能会使配置、策略和扩展决策变得更容易或更困难，因此重要的是要意识到巨大的架构差异，主要是集中式和分散式之间的决策。

#### Centralized VCS  集中式VCS

In centralized VCS implementations, the model is one of a single central repository (likely stored on some shared compute resource for your organization). Although a developer can have files checked out and accessible on their local workstation, operations that interact on the version control status of those files need to be communicated to the central server (adding files, syncing, updating existing files, etc.). Any code that is committed by a developer is committed into that central repository. The first VCS implementations were all centralized VCSs.

在集中式的VCS实现中，模型是一个单一的中央存储库（可能存储在你的组织的一些共享计算资源上）。尽管开发者可以在他们的本地工作站上签出和访问文件，但与这些文件的版本控制状态交互的操作需要与中央服务器通信（添加文件、同步、更新现有文件，等等）。任何由开发者提交的代码都会被提交到中央存储库。第一批VCS的实现都是集中式VCS。

Going back to the 1970s and early 1980s, we see that the earliest of these VCSs, such as RCS, focused on locking and preventing multiple simultaneous edits. You could copy the contents of a repository, but if you wanted to edit a file, you might need to acquire a lock, enforced by the VCS, to ensure that only you are making edits. When you’ve completed an edit, you release the lock. The model worked fine when any given change was a quick thing, or if there was rarely more than one person that wanted the lock for a file at any given time. Small edits like tweaking config files worked OK, as did working on a small team that either kept disjointed working hours or that rarely worked on overlapping files for extended periods. This sort of simplistic locking has inherent problems with scale: it can work fine for a few people, but has the potential to fall apart with larger groups if any of those locks become contended.[^4]

回溯到20世纪70年代和80年代初，我们看到最早的这些VCS，如RCS，侧重于锁定和防止多个同时编辑。你可以复制版本库的内容，但如果你想编辑一个文件，你可能需要获得一个锁，由VCS强制执行的锁，以确保只有你在进行编辑。当你完成了一个编辑，你就可以释放锁。当任何给定的变化是一个很快的事情，或者在任何给定的时间内很少有超过一个人想要锁定一个文件时，这种模式工作得很好。像调整配置文件这样的小的编辑工作是可以的，就像在一个小团队中工作一样，这个团队要么保持不连贯的工作时间，要么很少长时间处理重叠的文件。这种简单化的锁定在规模上有固有的问题：对几个人来说，它可以很好地工作，但如果这些锁中的任何一个被争夺，就有可能在较大的群体中崩溃。

As a response to this scaling problem, the VCSs that were popular through the 90s and early 2000s operated at a higher level. These more modern centralized VCSs avoid the exclusive locking but track which changes you’ve synced, requiring your edit to be based on the most-current version of every file in your commit. CVS wrapped and refined RCS by (mostly) operating on batches of files at a time and allowing multiple developers to check out a file at the same time: so long as your base version contained all of the changes in the repository, you’re allowed to commit. Subversion advanced further by providing true atomicity for commits, version tracking, and better tracking for unusual operations (renames, use of symbolic links, etc.). The centralized repository/checked-out client model continues today within Subversion as well as most commercial VCSs.

作为对这一规模问题的回应，在90年代和21世纪初流行的VCS在更高水平上运行。这些更现代化的集中式VCS避免了独占锁定，但会跟踪你已同步的更改，要求你的编辑基于提交中每个文件的最新版本。CVS通过（主要是）一次操作一批文件并允许多个开发人员同时签出一个文件来包装和细化RCS：只要你的基础版本包含存储库中的所有更改，你就可以提交。Subversion通过提供真正的提交原子性、版本跟踪和对不寻常操作（重命名、使用符号链接等）的更好跟踪而进一步发展。集中式版本库/检出客户端的模式在Subversion以及大多数商业VCS中延续至今。

> [^4]: Anecdote: To illustrate this, I looked for information on what pending/unsubmitted edits Googlers had outstanding for a semipopular file in my most recent project. At the time of this writing, 27 changes are pending, 12 from people on my team, 5 from people on related teams, and 10 from engineers I’ve never met. This is basically working as expected. Technical systems or policies that require out-of-band coordination certainly don’t scale to 24/7 software engineering in distributed locations.
>
> 4   轶事：为了说明这一点，我寻找了谷歌在我最近的项目中对一个半流行的文件所做的未提交/未提交编辑的信息。在撰写本文时，有27项变更尚未完成，其中12项来自我的团队，5项来自相关团队，10项来自我从未见过的工程师。这基本上按照预期工作。需要带外协调的技术系统或策略当然不能扩展到分布式位置的全天候软件工程。

#### Distributed VCS 分布式VCS

Starting in the mid-2000s, many popular VCSs followed the Distributed Version Control System (DVCS) paradigm, seen in systems like Git and Mercurial. The primary conceptual difference between DVCS and more traditional centralized VCS (Subversion, CVS) is the question: “Where can you commit?” or perhaps, “Which copies of these files count as a repository?”

从2000年中期开始，许多流行的VCS遵循分布式版本控制系统（DVCS）的范式，在Git和Mercurial等系统中看到。DVCS和更多传统的集中式VCS（Subversion，CVS）之间的主要概念差异在于问题："你可以在哪里提交？"或者说，"这些文件的哪些副本算作一个存储库？"

A DVCS world does not enforce the constraint of a central repository: if you have a copy (clone, fork) of the repository, you have a repository that you can commit to as well as all of the metadata necessary to query for information about things like revision history. A standard workflow is to clone some existing repository, make some edits, commit them locally, and then push some set of commits to another repository, which may or may not be the original source of the clone. Any notion of centrality is purely conceptual, a matter of policy, not fundamental to the technology or the underlying protocols.

DVCS世界不强制执行中央存储库的约束：如果你有存储库的副本（克隆、分叉），那么你就有一个可以提交的存储库以及查询有关修订历史等信息所需的所有元数据。标准工作流是克隆一些现有存储库，进行一些编辑，在本地提交，然后将一组提交推送到另一个存储库，该存储库可能是克隆的原始源，也可能不是克隆的原始源。任何关于中心性的概念都纯粹是概念性的，是一个策略问题，而不是技术或底层协议的根本。

The DVCS model allows for better offline operation and collaboration without inherently declaring one particular repository to be the source of truth. One repository isn’t necessary “ahead” or “behind” because changes aren’t inherently projected into a linear timeline. However, considering common *usage*, both the centralized and DVCS models are largely interchangeable: whereas a centralized VCS provides a clearly defined central repository through technology, most DVCS ecosystems define a central repository for a project as a matter of policy. That is, most DVCS projects are built around one conceptual source of truth (a particular repository on GitHub, for instance). DVCS models tend to assume a more distributed use case and have found particularly strong adoption in the open source world.

DVCS模型允许更好的离线操作和协作，而无需预先声明某个特定存储库是信息源。一个存储库不必“领先”或“落后”，因为更改不会固有地投射到线性时间线中。然而，考虑到通用性，集中式和DVCS模型在很大程度上是可互换的：集中式VCS通过技术提供了一个明确定义的中央存储库，而大多数DVCS生态系统将项目的中央存储库定义为一个策略问题。也就是说，大多数DVCS项目都是围绕一个信息源的概念（例如GitHub上的特定存储库）构建的。DVCS模型倾向于假设一个更分布式的用例，并且在开源世界中得到了特别强烈的采用。

Generally speaking, the dominant source control system today is Git, which implements DVCS.[^5] When in doubt, use that—there’s some value in doing what everyone else does. If your use cases are expected to be unusual, gather some data and evaluate the trade-offs.

一般来说，今天占主导地位的源码控制系统是Git，它实现了DVCS。当有疑问时，使用它——做别人做的事是有价值的。如果你的用例预期不寻常，请收集一些数据并评估权衡。

Google has a complex relationship with DVCS: our main repository is based on a (massive) custom in-house centralized VCS. There are periodic attempts to integrate more standard external options and to match the workflow that our engineers (especially Nooglers) have come to expect from external development. Unfortunately, those attempts to move toward more common tools like Git have been stymied by the sheer size of the codebase and userbase, to say nothing of Hyrum’s Law effects tying us to a particular VCS and interface for that VCS.[^6] This is perhaps not surprising: most existing tools don’t scale well with 50,000 engineers and tens of millions of commits.[^7] The DVCS model, which often (but not always) includes transmission of history and metadata, requires a lot of data to spin up a repository to work out of.

谷歌与DVCS有着复杂的关系：我们的主要资源库是基于一个（巨大的）自定义的内部集中式VCS。我们定期尝试整合更多标准的外部选项，并与我们的工程师（尤其是Nooglers）所期望的外部开发的工作流程相匹配。不幸的是，由于代码库和用户群的巨大规模，以及海勒姆定律的影响，这些向Git这样的通用工具发展的尝试受到了阻碍，更不用说将我们束缚在一个特定的VCS和VCS的界面上了。这也许并不奇怪：大多数现有的工具在面对5万名工程师和数千万的提交时都不能很好地扩展。DVCS模型，通常（但不总是）包括历史和元数据的传输，需要大量数据来加速存储库的运行。

In our workflow, centrality and in-the-cloud storage for the codebase seem to be critical to scaling. The DVCS model is built around the idea of downloading the entire codebase and having access to it locally. In practice, over time and as your organization scales up, any given developer is going to operate on a relatively smaller percentage of the files in a repository, and a small fraction of the versions of those files. As we grow (in file count and engineer count), that transmission becomes almost entirely waste. The only need for locality for most files occurs when building, but distributed (and reproducible) build systems seem to scale better for that task as well (see Chapter 18).

在我们的工作流程中，代码库的中心化和云存储似乎对扩展至关重要。DVCS模型是围绕下载整个代码库并在本地访问它的思想构建的。在实践中，随着时间的推移和组织规模的扩大，任何给定的开发人员都会在相对较小比例的文件库中进行操作，而且这些文件的版本也只占一小部分。随着我们的增长（在文件数和工程师数方面），这种传输几乎完全变成了浪费。大多数文件在构建时只需要本地局部文件，但分布式（和可复制的）构建系统似乎也能更好地扩展该任务（参见第18章）。

> [^5]: Stack Overflow Developer Survey Results, 2018.
>
> 5 Stack Overflow开发者调查结果，2018年。
>
> [^6]: Monotonically increasing version numbers, rather than commit hashes, are particularly troublesome. Many systems and scripts have grown up in the Google developer ecosystem that assume that the numeric ordering of commits is the same as the temporal order—undoing those hidden dependencies is difficult.
>
> 6 单调增加的版本号，而不是提交哈希值，是特别麻烦的。许多系统和脚本已经在谷歌开发者生态系统中成长起来，它们假定提交的数字顺序与时间顺序相同--消除这些隐藏的依赖关系是很困难的。
>
> [^7]: For that matter, as of the publication of the Monorepo paper, the repository itself had something like 86 TB of data and metadata, ignoring release branches. Fitting that onto a developer workstation directly would be… challenging.
>
> 7 就这一点而言，截至Monorepo论文发表时，仓库本身有大约86TB的数据和元数据，不包括发布分支。将其直接装入开发者的工作站将是......挑战。

### Source of Truth 信息源

Centralized VCSs (Subversion, CVS, Perforce, etc.) bake the source-of-truth notion into the very design of the system: whatever is most recently committed at trunk is the current version. When a developer goes to check out the project, by default that trunk version is what they will be presented with. Your changes are “done” when they have been recommitted on top of that version.

集中式VCS（Subversion、CVS、Perforce等）将信息源的概念融入到系统的设计中：最近提交到主干的就是当前的版本。当一个开发者去检查项目时，默认情况下，他们将看到的是主干版本。当你的修改被重新提交到该版本上时，你的修改就 "完成"了。

However, unlike centralized VCS, there is no *inherent* notion of which copy of the distributed repository is the single source of truth in DVCS systems. In theory, it’s possible to pass around commit tags and PRs with no centralization or coordination, allowing disparate branches of development to propagate unchecked, and thus risking a conceptual return to the world of *Presentation v5 - final - redlines - Josh’s version* *v2*. Because of this, DVCS requires more explicit policy and norms than a centralized VCS does.

然而，与集中式 VCS 不同，在 DVCS 系统中，并不存在哪个分布式版本库的副本是单信息源的*固有概念*。理论上，在没有集中化或协调的情况下，提交标签和PR的传递是可能的，允许不同的开发分支不受检查地传播，从而有可能在概念上回到*Presentation v5 - final - redlines - Josh's version v2*的世界。正因为如此，DVCS比集中式VCS需要更明确的策略和规范。

Well-managed projects using DVCS declare one specific branch in one specific repository to be the source of truth and thus avoid the more chaotic possibilities. We see this in practice with the spread of hosted DVCS solutions like GitHub or GitLab— users can clone and fork the repository for a project, but there is still a single primary repository: things are “done” when they are in the trunk branch on that repository.

使用DVCS的管理良好的项目宣布一个特定的分支在一个特定的存储库中是信息源，从而避免了更多混乱的可能性。在实践中，我们看到GitHub或GitLab等托管DVCS解决方案的普及--用户可以克隆和分叉一个项目的仓库，但仍有一个单一的主仓库：当事情出现在该仓库的主干分支时，就已经"完成"了。

It isn’t an accident that centralization and Source of Truth has crept back into the usage even in a DVCS world. To help illustrate just how important this Source of Truth idea is, let’s imagine what happens when we don’t have a clear source of truth.

即使在DVCS的世界里，集中化和信息源已经悄悄地回到了人们的使用中，这并不是一个偶然。为了说明 "信息源 "这个概念有多重要，让我们想象一下，当我们没有明确的信息源时会发生什么。

#### Scenario: no clear source of truth  情景：没有明确的信息源

Imagine that your team adheres to the DVCS philosophy enough to avoid defining a specific branch+repository as the ultimate source of truth.

想象一下，你的团队坚持DVCS的理念，足以避免将特定的分支+版本库定义为最终的信息源。

In some respects, this is reminiscent of the *Presentation v5 - final - redlines - Josh’s version v2* model—after you pull from a teammate’s repository, it isn’t necessarily clear which changes are present and which are not. In some respects, it’s better than that because the DVCS model tracks the merging of individual patches at a much finer granularity than those ad hoc naming schemes, but there’s a difference between the DVCS knowing *which* changes are incorporated and every engineer being sure they have *all* the past/relevant changes represented.

在某些方面，这让人想起*Presentation v5 - final - redlines - Josh's version v2*的模式——当你从队友的版本库中提取后，并不一定清楚哪些改动是存在的，哪些是不存在的。在某些方面，它比这更好，因为DVCS模型在更细的粒度上跟踪单个补丁的合并，而不是那些临时的命名方案，但DVCS知道*哪些*变化被纳入，和每个工程师确保他们已经表示了*所有*过去/相关的更改，这两者之间存在差异。。

Consider what it takes to ensure that a release build includes all of the features that have been developed by each developer for the past few weeks. What (noncentralized, scalable) mechanisms are there to do that? Can we design policies that are fundamentally better than having everyone sign off? Are there any that require only sublinear human effort as the team scales up? Is that going to continue working as the number of developers on the team scales up? As far as we can see: probably not. Without a central Source of Truth, someone is going to keep a list of which features are potentially ready to be included in the next release. Eventually that bookkeeping is reproducing the model of having a centralized Source of Truth.

考虑一下如何确保一个发布版本包括每个开发人员在过去几周内开发的所有功能。有什么（非集中的、可扩展的）机制可以做到这一点？我们能不能设计出从根本上比让每个人签字更好的策略？是否有任何随着团队规模的扩大只需要次线性的人力努力？随着团队中开发人员数量的增加，这是否会继续发挥作用？就我们所见：可能不会。如果没有一个核心的 "信息源"，就会有人记下哪些功能有可能被纳入下一个版本的清单。最终，这种记账方式正在重现拥有一个集中式信息源的模式。

Further imagine: when a new developer joins the team, where do they get a fresh, known-good copy of the code?

进一步想象：当一个新的开发人员加入团队时，他们从哪里得到一个最新的、已知的好的代码副本？

DVCS enables a lot of great workflows and interesting usage models. But if you’re concerned with finding a system that requires sublinear human effort to manage as the team grows, it’s pretty important to have one repository (and one branch) actually defined to be the ultimate source of truth.

DVCS实现了很多出色的工作流程和有趣的使用模式。但如果你关心的是找到一个系统，随着团队的成长，需要非线性的人力来管理，那么将一个存储库（和一个分支）实际定义为最终的信息源是相当重要的。

There is some relativity in that Source of Truth. That is, for a given project, that Source of Truth might be different for a different organization. This caveat is important: it’s reasonable for engineers at Google or RedHat to have different Sources of Truth for Linux Kernel patches, still different than Linus (the Linux Kernel maintainer) himself would. DVCS works fine when organizations and their Sources of Truth are hierarchical (and invisible to those outside the organization)—that is perhaps the most practically useful effect of the DVCS model. A RedHat engineer can commit to the local Source of Truth repository, and changes can be pushed from there upstream periodically, while Linus has a completely different notion of what is the Source of Truth. So long as there is no choice or uncertainty as to where a change should be pushed, we can avoid a large class of chaotic scaling problems in the DVCS model.

信息源具有某种相对性。也就是说，对于一个特定的项目，信息源对于不同的组织可能是不同的。这一点很重要：谷歌或RedHat的工程师对Linux内核补丁有不同的信息源是合理的，这与Linus（Linux内核维护者）自己的信息源还是不同的。当组织和他们的信息源是分层的（对组织外的人来说是不可见的），DVCS就能很好地工作——这也许是DVCS模型最实际的作用。一个RedHat的工程师可以提交到本地信息源仓库，并且可以定期从那里向上游推送变化，而Linus对什么是信息源有完全不同的概念。只要没有选择或不确定一个变化应该被推到哪里，我们就可以避免DVCS模型中的一大类混乱的扩展问题。

In all of this thinking, we’re assigning special significance to the trunk branch. But of course, “trunk” in your VCS is only the technology default, and an organization can choose different policies on top of that. Perhaps the default branch has been abandoned and all work actually happens on some custom development branch—other than needing to provide a branch name in more operations, there’s nothing inherently broken in that approach; it’s just nonstandard. There’s an (oft-unspoken) truth when discussing version control: the technology is only one part of it for any given organization; there is almost always an equal amount of policy and usage convention on top of that.

在所有这些想法中，我们为主干分支赋予了特殊的意义。但当然，VCS中的 "主干"只是技术默认，一个组织可以在此基础上选择不同的策略。也许默认的分支已经被放弃了，所有的工作实际上都发生在某个自定义的开发分支上——除了需要在更多操作中提供分支名称之外，这种方法没有任何内在的缺陷；它只是非标准的。在讨论版本控制时，有一个（经常不说的）事实：对于任何特定的组织来说，技术只是其中的一部分；几乎总是有同等数量的策略和使用约定在上面。

No topic in version control has more policy and convention than the discussion of how to use and manage branches. We look at branch management in more detail in the next section.

版本控制中没有一个主题比关于如何使用和管理分支的讨论更具策略和约定。我们将在下一节更详细地介绍分支管理。

### Version Control Versus Dependency Management 版本控制与依赖管理

There’s a lot of conceptual similarity between discussions of version control policies and dependency management (see [Chapter 21](#_bookmark1845)). The differences are primarily in two forms: VCS policies are largely about how you manage your own code, and are usually much finer grained. Dependency management is more challenging because we primarily focus on projects managed and controlled by other organizations, at a higher granularity, and these situations mean that you don’t have perfect control. We’ll discuss a lot more of these high-level issues later in the book.

关于版本控制策略和依赖管理的讨论在概念上有很多相似之处（见第21章）。差异主要体现在两种形式上。VCS策略主要是关于你如何管理你自己的代码，而且通常是更细的粒度。依赖管理更具挑战性，因为我们主要关注由其他组织管理和控制的项目，颗粒度更高，这些情况意味着你没有完美的控制。我们将在本书后面讨论更多的这些高级问题。

## Branch Management  分支管理

Being able to track different revisions in version control opens up a variety of different approaches for how to manage those different versions. Collectively, these different approaches fall under the term *branch management*, in contrast to a single “trunk.”

能够在版本控制中跟踪不同的修订版，为如何管理这些不同的版本提供了各种不同的方法。总的来说，这些不同的方法属于*分支管理*，与单一的 "主干 "形成对比。

### Work in Progress Is Akin to a Branch  正在进行的工作类似于一个分支

Any discussion that an organization has about branch management policies ought to at least acknowledge that every piece of work-in-progress in the organization is equivalent to a branch. This is more explicitly the case with a DVCS in which developers are more likely to make numerous local staging commits before pushing back to the upstream Source of Truth. This is still true of centralized VCSs: uncommitted local changes aren’t conceptually different than committed changes on a branch, other than potentially being more difficult to find and diff against. Some centralized systems even make this explicit. For example, when using Perforce, every change is given two revision numbers: one indicating the implicit branch point where the change was created, and one indicating where it was recommitted, as illustrated in [Figure 16-1](#_bookmark1418). Perforce users can query to see who has outstanding changes to a given file, inspect the pending changes in other users’ uncommitted changes, and more.

组织对分支机构管理策略的任何讨论都应该至少承认组织中正在进行的每一项工作都相当于一个分支。这一点在DVCS中更为明显，因为在DVCS中，开发者更有可能在推送回上游信息源之前进行大量本地暂存提交。集中式VCS仍然如此：未提交的本地更改在概念上与分支上提交的更改没有区别，只是可能更难发现和区分。一些集中式系统甚至明确了这一点。例如，当使用Perforce时，每个更改都会有两个修订号：一个表示创建更改的隐含分支点，另一个表示重新提交更改的位置，如图16-1所示。Perforce用户可以查询查看谁对给定文件有未完成的更改，检查其他用户未提交更改中的未决更改，等等。

![Figure 16-1. Two revision numbers in Perforce](./images/Figure%2016-1.png)

*Figure 16-1. Two revision numbers in Perforce*  *图 16-1. Perforce中的两个修订号*

This “uncommitted work is akin to a branch” idea is particularly relevant when thinking about refactoring tasks. Imagine a developer being told, “Go rename Widget to OldWidget.” Depending on an organization’s branch management policies and understanding, what counts as a branch, and which branches matter, this could have several interpretations:

- Rename Widget on the trunk branch in the Source of Truth repository
- Rename Widget on all branches in the Source of Truth repository
- Rename Widget on all branches in the Source of Truth repository, and find all devs with outstanding changes to files that reference Widget

这个 "未提交的工作类似于分支 "的想法在思考重构任务时特别重要。想象一下，一个开发者被告知，"将Widget重命名为OldWidget"。根据组织的分支管理策略和理解，什么是分支，以及哪个分支重要，这可能有几种解释：

- 在信息源版本库的主干分支上重命名Widget
- 在信息源版本库中的所有分支上重命名Widget
- 在信息源版本库的所有分支上重命名Widget，并找到所有对引用Widget的文件有未完成修改的开发者。

If we were to speculate, attempting to support that “rename this everywhere, even in outstanding changes” use case is part of why commercial centralized VCSs tend to track things like “which engineers have this file open for editing?” (We don’t think this is a scalable way to *perform* a refactoring task, but we understand the point of view.)

如果我们猜测，试图支持“到处重命名，即使在未完成的更改中”用例是为什么商业集中式VCS倾向于跟踪“哪些工程师打开此文件进行编辑？”（我们不认为这是执行重构任务的可扩展方式，但我们理解这个观点。）

### Dev Branches  开发分支

In the age before consistent unit testing (see Chapter 11), when the introduction of any given change had a high risk of regressing functionality elsewhere in the system, it made sense to treat *trunk* specially. “We don’t commit to trunk,” your Tech Lead might say, “until new changes have gone through a full round of testing. Our team uses feature-specific development branches instead.”

在没有一致的单元测试的时代（见第11章），当任何给定的更改的引入都有很大的风险会使系统中其他地方的功能回滚时，特别对待*trunk*是有意义的。"我们不会向主干提交，"你的技术负责人可能会说，"在新的变更通过一轮测试之前，我们不会合并搭配主干。我们的团队使用特定于功能的开发分支。"

A development branch (usually “dev branch”) is a halfway point between “this is done but not committed” and “this is what new work is based on.” The problem that these are attempting to solve (instability of the product) is a legitimate one—but one that we have found to be solved far better with more extensive use of tests, Continuous Integration (CI) (see Chapter 23), and quality enforcement practices like thorough code review.

开发分支（通常是 "dev branch"）是介于 "这个已经完成但未提交 "和 "这个是新工作的基础 "之间的中间点。这些试图解决的问题（产品的不稳定性）是一个合理的问题，但我们发现通过更广泛地使用测试、持续集成（CI）（见第23章）和彻底的代码审查等质量执行实践可以更好地解决这个问题。

We believe that a version control policy that makes extensive use of dev branches as a means toward product stability is inherently misguided. The same set of commits are going to be merged to trunk eventually. Small merges are easier than big ones. Merges done by the engineer who authored those changes are easier than batching unrelated changes and merging later (which will happen eventually if a team is sharing a dev branch). If presubmit testing on the merge reveals any new problems, the same argument applies: it’s easier to determine whose changes are responsible for a regression if there is only one engineer involved. Merging a large dev branch implies that more changes are happening in that test run, making failures more difficult to isolate. Triaging and root-causing the problem is difficult; fixing it is even worse.

我们认为，大量使用开发分支作为产品稳定性手段的版本控制策略本身上是错误的。同一组提交最终将合并到主干中。小的合并比大的合并容易。由编写这些更改的工程师进行的合并比把不相关的修改分批合并要容易（如果团队共享开发分支，最终会发生这种情况）。如果对合并进行的预提交测试发现了任何新问题，同样的论点也适用：如果只有一名工程师参与，则更容易确定谁的更改导致了回归。合并一个大型开发分支意味着在该测试运行中会发生更多的更改，从而使故障更难隔离。处理和根除问题是困难的，而修复问题就更难了。

Beyond the lack of expertise and inherent problems in merging a single branch, there are significant scaling risks when relying on dev branches. This is a very common productivity drain for a software organization. When there are multiple branches being developed in isolation for long periods, coordinating merge operations becomes significantly more expensive (and possibly riskier) than they would be with trunk-based development.

除了在合并单个分支时缺乏专业知识和固有问题之外，依赖开发分支时还存在重大的扩展风险。对于软件组织来说，这是一种非常常见的生产力损失。当有多个分支长期独立开发时，协调合并操作会比基于主干的开发成本更高（可能更高）。

#### How did we become addicted to dev branches?  我们是如何沉迷于开发分支的？

It’s easy to see how organizations fall into this trap: they see, “Merging this long-lived development branch reduced stability” and conclude, “Branch merges are risky.” Rather than solve that with “Better testing” and “Don’t use branch-based development strategies,” they focus on slowing down and coordinating the symptom: the branch merges. Teams begin developing new branches based on other in-flight branches. Teams working on a long-lived dev branch might or might not regularly have that branch synched with the main development branch. As the organization scales up, the number of development branches grows as well, and the more effort is placed on coordinating that branch merge strategy. Increasing effort is thrown at coordination of branch merges—a task that inherently doesn’t scale. Some unlucky engineer becomes the Build Master/Merge Coordinator/Content Management Engineer, focused on acting as the single point coordinator to merge all the disparate branches in the organization. Regularly scheduled meetings attempt to ensure that the organization has “worked out the merge strategy for the week.”[^8] The teams that aren’t chosen to merge often need to re-sync and retest after each of these large merges.

很容易看出组织是如何落入这个陷阱的：他们看到，“合并这个长期存在的开发分支会降低稳定性”，并得出结论，“分支合并是有风险的。”而不是通过“更好的测试”和“不要使用基于分支的开发策略”来解决这个问题，只是专注于减缓和协调症状：分支合并。团队开始在其他正在运行的分支的基础上开发新的分支。在一个长期存在的开发分支上工作的团队可能会也可能不会定期让该分支与主开发分支同步。随着组织规模的扩大，开发分支的数量也在增加，在协调该分支合并策略上的努力也就越多。越来越多的精力投入到分支合并的协调上--这是一项本质上无法扩展的任务。一些不走运的工程师成为构建主管/合并协调人/内容管理工程师，专注于充当单点协调人，以合并组织中所有不同的分支。定期安排的会议试图确保组织“制定了本周的合并策略”。未被选择合并的团队通常需要在每次大型合并后重新同步和测试。

All of that effort in merging and retesting is *pure overhead*. The alternative requires a different paradigm: trunk-based development, rely heavily on testing and CI, keep the build green, and disable incomplete/untested features at runtime. Everyone is responsible to sync to trunk and commit; no “merge strategy” meetings, no large/expensive merges. And, no heated discussions about which version of a library should be used—there can be only one. There must be a single Source of Truth. In the end, there will be a single revision used for a release: narrowing down to a single source of truth is just the “shift left” approach for identifying what is and is not being included.

所有这些合并和重新测试的努力都是*纯粹的开销*。替代方案需要一个不同的范式：基于主干的开发，严重依赖测试和CI，保持绿色构建，并在运行时禁用不完整/未经测试的功能。每个人都有责任同步到主干和提交；没有 "合并策略 "会议，没有大型/高成本的合并。而且，没有关于应该使用哪个版本的库的激烈讨论--只能有一个。必须有一个单一的信息源。最终，一个版本将使用一个单一的修订版：缩小到一个单信息源，这只是确定哪些是和哪些没有被包括在内的“左移”方法。

> [^8]: Recent informal Twitter polling suggests about 25% of software engineers have been subjected to “regularly scheduled” merge strategy meetings.
>
> 8   最近的非正式推特民意调查显示，大约25%的软件工程师参加了“定期”的合并策略会议。

### Release Branches  发布分支

If the period between releases (or the release lifetime) for a product is longer than a few hours, it may be sensible to create a release branch that represents the exact code that went into the release build for your product. If any critical flaws are discovered between the actual release of that product into the wild and the next release cycle, fixes can be cherry-picked (a minimal, targeted merge) from trunk to your release branch.

如果某个产品的发布间隔（或发布生命周期）超过几个小时，那么创建一个发布分支来表示进入产品发布构建的确切代码可能是明智的。如果在该产品的实际发布和下一个发布周期之间发现了任何关键缺陷，那么可以从主干到你的发布分支进行修复（最小的、有针对性的合并）。

By comparison to dev branches, release branches are generally benign: it isn’t the technology of branches that is troublesome, it’s the usage. The primary difference between a dev branch and a release branch is the expected end state: a dev branch is expected to merge back to trunk, and could even be further branched by another team. A release branch is expected to be abandoned eventually.

与开发分支相比，发布分支通常是良性的：麻烦的不是分支的技术，而是用法。开发分支和发布分支的主要区别在于预期的最终状态：开发分支预期会合并到主干上，甚至可能会被另一个团队进一步分支。而发布分支预计最终会被放弃。

In the highest-functioning technical organizations that Google’s DevOps Research and Assessment (DORA) organization has identified, release branches are practically nonexistent. Organizations that have achieved Continuous Deployment (CD)—the ability to release from trunk many times a day—likely tend to skip release branches: it’s much easier to simply add the fix and redeploy. Thus, cherry-picks and branches seem like unnecessary overhead. Obviously, this is more applicable to organizations that deploy digitally (such as web services and apps) than those that push any form of tangible release to customers; it is generally valuable to know exactly what has been pushed to customers.

在谷歌的DevOps研究和评估组织（DORA）所确定的最高效的技术组织中，发布分支实际上是不存在的。那些已经实现了持续部署（CD）的组织——每天多次从主干发布的能力——很可能倾向于跳过发布分支：只需添加修复和重新部署就更容易了。因此，挑选（cherry-picks）和分支似乎是不必要的开销。显然，这更适用于以数字方式部署的组织（如网络服务和应用程序），而不是那些向客户推送任何形式的有形发布的组织；通常，准确地了解向客户推出的产品是很有价值的。

That same DORA research also suggests a strong positive correlation between “trunk- based development,” “no long-lived dev branches,” and good technical outcomes. The underlying idea in both of those ideas seems clear: branches are a drag on productivity. In many cases we think complex branch and merge strategies are a perceived safety crutch—an attempt to keep trunk stable. As we see throughout this book, there are other ways to achieve that outcome.

同样的DORA研究也表明，"基于主干的开发"、"没有长期的开发分支"和良好的技术成果之间有很强的正相关关系。这两个观点的基本思路似乎都很清楚：分支拖累了生产力。在许多情况下，我们认为复杂的分支和合并策略是一种可感知的安全支柱——试图保持主干的稳定。正如我们在本书中所看到的，还有其他的方法来实现这一结果。

## Version Control at Google  谷歌的版本控制

At Google, the vast majority of our source is managed in a single repository (monorepo) shared among roughly 50,000 engineers. Almost all projects that are owned by Google live there, except large open source projects like Chromium and Android. This includes public-facing products like Search, Gmail, our advertising products, our Google Cloud Platform offerings, as well as the internal infrastructure necessary to support and develop all of those products.

在谷歌，我们的绝大多数源代码都在一个由大约50,000名工程师共享的存储库（monorepo）中管理。除了像Chromium和Android这样的大型开源项目，几乎所有属于谷歌的项目都在这里。这包括面向公众的产品，如搜索、Gmail、我们的广告产品、我们的谷歌云平台产品，以及支持和开发所有这些产品所需的内部基础设施。

We rely on an in-house-developed centralized VCS called Piper, built to run as a distributed microservice in our production environment. This has allowed us to use Google-standard storage, communication, and Compute as a Service technology to provide a globally available VCS storing more than 80 TB of content and metadata. The Piper monorepo is then simultaneously edited and committed to by many thousands of engineers every day. Between humans and semiautomated processes that make use of version control (or improve things checked into VCS), we’ll regularly handle 60,000 to 70,000 commits to the repository per work day. Binary artifacts are fairly common because the full repository isn’t transmitted and thus the normal costs of binary artifacts don’t really apply. Because of the focus on Google-scale from the earliest conception, operations in this VCS ecosystem are still cheap at human scale: it takes perhaps 15 seconds total to create a new client at trunk, add a file, and commit an (unreviewed) change to Piper. This low-latency interaction and well-understood/ well-designed scaling simplifies a lot of the developer experience.

我们依靠内部开发的集中式VCS，名为Piper，该VCS是为在我们的生产环境中作为分布式微服务运行而构建的。这使我们能够使用谷歌标准的存储、通信和计算即服务技术，提供一个全球可用的VCS，存储超过80TB的内容和元数据。然后，Piper 单版本库每天由成千上万的工程师同时进行编辑和提交。在人类和利用版本控制（或改进签入VCS的内容）的人工流程和半自动化流程之间，我们每个工作日会定期处理60,000到70,000次提交到版本库。二进制构件是相当常见的，因为并不需要完整地传输到版本库，因此二进制构件的成本并不高。由于从最初的概念就专注于谷歌规模，这个VCS生态系统的操作在人群规模上仍然是低成本的：在主干上创建一个新的客户端，添加一个文件，并向Piper提交一个（未经审查的）更改，总共可能需要15秒。这种低延迟的互动和良好的理解/设计的扩展简化了很多开发者的体验。

By virtue of Piper being an in-house product, we have the ability to customize it and enforce whatever source control policies we choose. For instance, we have a notion of granular ownership in the monorepo: at every level of the file hierarchy, we can find OWNERS files that list the usernames of engineers that are allowed to approve commits within that subtree of the repository (in addition to the OWNERS that are listed at higher levels in the tree). In an environment with many repositories, this might have been achieved by having separate repositories with filesystem permissions enforcement controlling commit access or via a Git “commit hook” (action triggered at commit time) to do a separate permissions check. By controlling the VCS, we can make the concept of ownership and approval more explicit and enforced by the VCS during an attempted commit operation. The model is also flexible: ownership is just a text file, not tied to a physical separation of repositories, so it is trivial to update as the result of a team transfer or organization restructuring.

由于Piper是一个内部产品，我们能够定制它并实施我们选择的任何源代码控制策略。例如，我们在单版本库中有一个细粒度所有权的概念：在文件层次结构的每一级，我们都可以找到OWNERS文件，其中列出了允许批准该版本库的子树中的提交的工程师的用户名（除了在树中更高层次列出的OWNERS）。在具有多个版本库的环境中，这可能是通过单独的版本库和文件系统权限执行控制提交访问，或者通过Git的 "提交钩子"（提交时触发的动作）进行单独的权限检查来实现。通过控制VCS，我们可以使所有权和批准的概念更加明确，并在尝试提交操作时由VCS强制执行。这个模型也很灵活：所有权只是一个文本文件，并不与存储库的物理分离相联系，所以在团队转移或组织结构调整的情况下，更新它是很容易的。

### One Version  一个版本

The incredible scaling powers of Piper alone wouldn’t allow the sort of collaboration that we rely upon. As we said earlier: version control is also about policy. In addition to our VCS, one key feature of Google’s version control policy is what we’ve come to refer to as “One Version.” This extends the “Single Source of Truth” concept we looked at earlier—ensuring that a developer knows which branch and repository is their source of truth—to something like “For every dependency in our repository, there must be only one version of that dependency to choose.”[^9] For third-party packages, this means that there can be only a single version of that package checked into our repository, in the steady state.[^10] For internal packages, this means no forking without repackaging/renaming: it must be technologically safe to mix both the original and the fork into the same project with no special effort. This is a powerful feature for our ecosystem: there are very few packages with restrictions like “If you include this package (A), you cannot include other package (B).”

单凭Piper令人难以置信的扩展能力，是无法实现我们所依赖的那种协作的。正如我们之前所说：版本控制也是关于策略的。除了我们的VCS之外，谷歌版本控制策略的一个关键特征就是我们所说的 "一个版本"。这扩展了我们前面提到的 "单信息源 "的概念--确保开发者知道哪个分支和版本库是他们的信息源--到类似于 "对于我们版本库中的每个依赖，必须只有一个版本的依赖可以选择。 "对于第三方软件包，这意味着在稳定状态下，该软件包只能有一个版本被检入我们的仓库。对于内部软件包，这意味着没有重新打包/重命名的分支：在技术上必须是安全的，无需特别努力就可以将原始和分支混合到同一个项目中。这对我们的生态系统来说是一个强大的功能：很少有包有类似 "如果你包括这个软件包（A），你就不能包括其他软件包（B）"的限制。

This notion of having a single copy on a single branch in a single repository as our Source of Truth is intuitive but also has some subtle depth in application. Let’s investigate a scenario in which we have a monorepo (and thus arguably have fulfilled the letter of the law on Single Source of Truth), but have allowed forks of our libraries to propagate on trunk.

将单个副本放在单个版本库中的单个分支上作为信息源的概念是直观的，但在应用中也有一些微妙的深度。让我们研究一下这样的场景：我们有一个单版本库（因此可以说已经履行了关于单信息源的法律条文），但允许我们的库的分支在主干上传播。

> [^9]: For example, during an upgrade operation, there might be two versions checked in, but if a developer is adding a new dependency on an existing package, there should be no choice in which version to depend upon.
>
> 9  例如，在升级操作期间，可能签入了两个版本，但如果开发人员正在现有软件包上添加新的依赖，则应该没有选择依赖哪个版本。
>
> [^10]: That said, we fail at this in many cases because external packages sometimes have pinned copies of their own dependencies bundled in their source release. You can read more on how all of this goes wrong in Chapter 21.
>
> 10 也就是说，我们在很多情况下都会失败，因为外部软件包有时会在它们的源版本中捆绑有它们自己的依赖性的钉子副本。你可以在第21章中阅读更多关于这一切是如何出错的。

### Scenario: Multiple Available Versions  场景：多个可用版本

Imagine the following scenario: some team discovers a bug in common infrastructure code (in our case, Abseil or Guava or the like). Rather than fix it in place, the team decides to fork that infrastructure and tweak it to work around the bug—without renaming the library or the symbols. It informs other teams near them, “Hey, we have an improved version of Abseil checked in over here: check it out.” A few other teams build libraries that themselves rely on this new fork.

想象一下以下情况：一些团队发现了公共基础组件代码中的一个bug（在我们的例子中，是Abseil或Guava之类的）。该团队决定不在原地修复它，而是分支该基础组件，并对其进行调整，以解决该错误——而不重命名库或符号。它通知他们附近的其他团队："嘿，我们这里有一个改进的Abseil版本：请查看。" 其他一些团队建立的库也依赖于这个新的分支。

As we’ll see in Chapter 21, we’re now in a dangerous situation. If any project in the codebase comes to depend on both the original and the forked versions of Abseil simultaneously, in the best case, the build fails. In the worst case, we’ll be subjected to difficult-to-understand runtime bugs stemming from linking in two mismatched versions of the same library. The “fork” has effectively added a coloring/partitioning property to the codebase: the transitive dependency set for any given target must include exactly one copy of this library. Any link added from the “original flavor” partition of the codebase to the “new fork” partition will likely break things. This means that in the end that something as simple as “adding a new dependency” becomes an operation that might require running all tests for the entire codebase, to ensure that we haven’t violated one of these partitioning requirements. That’s expensive, unfortunate, and doesn’t scale well.

正如我们将在第21章中看到的，我们现在处于危险的境地。如果代码库中的任何项目同时依赖Abseil的原始版本和分支版本，在最好的情况下，构建将失败。在最坏的情况下，我们将受到难以理解的运行时错误的影响，这些错误源于同一个库的两个不匹配的版本的链接。“fork”有效地为代码库添加了一个着色/分区属性：任何给定目标的可传递依赖项集必须只包含该库的一个副本。从“原始味道”的代码库添加到“新分支”分区的任何链接都可能会破坏事物。这意味着到最后，像 "添加一个新的依赖"这样简单的操作，可能需要运行整个代码库的所有测试，以确保我们没有违反这些分区的要求。这很昂贵，很不幸，而且不能很好地扩展。

In some cases, we might be able to hack things together in a way to allow a resulting executable to function correctly. Java, for instance, has a relatively standard practice called [*shading*](https://oreil.ly/RuWX3), which tweaks the names of the internal dependencies of a library to hide those dependencies from the rest of the application. When dealing with functions, this is technically sound, even if it is theoretically a bit of a hack. When dealing with types that can be passed from one package to another, shading solutions work neither in theory nor in practice. As far as we know, any technological trickery that allows multiple isolated versions of a library to function in the same binary share this limitation: that approach will work for functions, but there is no good (efficient) solution to shading types—multiple versions for any library that provides a vocabulary type (or any higher-level construct) will fail. Shading and related approaches are patching over the underlying issue: multiple versions of the same dependency are needed. (We’ll discuss how to minimize that in general in Chapter 21.)

在某些情况下，我们也许可以通过黑客技术将一些东西拼凑在一起，使产生的可执行文件能够正常运行。例如，Java有一个相对标准的做法，叫做[*shading*](https://oreil.ly/RuWX3)，它调整了库的内部依赖的名称，以便从应用程序的其他部分隐藏这些依赖关系。当处理函数时，这在技术上是合理的，即使它在理论上有点像黑客。当处理可以从一个包传递到另一个包的类型时，着色解决方案在理论上和实践中都不起作用。据我们所知，任何允许一个库的多个孤立版本在同一个二进制中运作的技术伎俩都有这个限制：这种方法对函数来说是可行的，但对于着色类型来说，没有好的（有效的）解决方案——任何提供词汇类型（或任何更高级别的构造）的库的多个版本都会失败。着色和相关的方法是对基本问题的修补：同一依赖的多个版本是需要的。(我们将在第21章中讨论如何在一般情况下尽量减少这种情况)。

Any policy system that allows for multiple versions in the same codebase is allowing for the possibility of these costly incompatibilities. It’s possible that you’ll get away with it for a while (we certainly have a number of small violations of this policy), but in general, any multiple-version situation has a very real possibility of leading to big problems.

任何允许在同一代码库中使用多个版本的策略系统都可能会出现这些代价高昂的不兼容。你有可能暂时逃过一劫（我们当然有一些小的违反这一策略的行为），但一般来说，任何多版本的情况都有导致大问题的非常现实的可能性。

### The “One-Version” Rule  “一个版本”规则

With that example in mind, on top of the Single Source of Truth model, we can hopefully understand the depth of this seemingly simple rule for source control and branch management:

考虑到这个例子，在单信息源模型的基础上，我们希望能够充分理解这一看似简单的源代码控制和分支管理规则的深度：

    Developers must never have a choice of “What version of this component should I depend upon?”
    决不能让开发人员选择"我应该依赖这个组件的哪个版本？"

Colloquially, this becomes something like a “One-Version Rule.” In practice, “One- Version” is not hard and fast,[^11] but phrasing this around limiting the versions that can be *chosen* when adding a new dependency conveys a very powerful understanding.

俗话说，这就变成了类似于 "一个版本规则"的东西。在实践中，"一个版本"并不是硬性规定，但在添加新依赖项时限制可以选择的版本这一措辞传达了一种非常有力的理解。

For an individual developer, lack of choice can seem like an arbitrary impediment. Yet we see again and again that for an organization, it’s a critical component in efficient scaling. Consistency has a profound importance at all levels in an organization. From one perspective, this is a direct side effect of discussions about consistency and ensuring the ability to leverage consistent “choke points.”

对于个人开发者来说，缺乏选择似乎是一个大障碍。然而，我们一再看到，对于一个组织来说，它是高效扩展的一个关键组成部分。一致性在一个组织的各个层面都有深远的意义。从一个角度来看，这是讨论一致性和确保利用一致 "瓶颈"的能力的直接副作用。

> [^11]: For instance, if there are external/third-party libraries that are periodically updated, it might be infeasible to update that library and update all use of it in a single atomic change. As such, it is often necessary to add a new version of that library, prevent new users from adding dependencies on the old one, and incrementally switch usage from old to new.
>
> 11 例如，如果有定期更新的外部/第三方库，更新该库并在一次原子变化中更新对它的所有使用可能是不可行的。因此，通常有必要添加该库的新版本，防止新用户添加对旧版本的依赖，并逐步将使用从旧版本切换到新版本。

### (Nearly) No Long-Lived Branches  (几乎)没有长期存在的分支

There are several deeper ideas and policies implicit in our One-Version Rule; foremost among them: development branches should be minimal, or at best be very short lived. This follows from a lot of published work over the past 20 years, from Agile processes to DORA research results on trunk-based development and even Phoenix Project[^12] lessons on “reducing work-in-progress.” When we include the idea of pending work as akin to a dev branch, this further reinforces that work should be done in small increments against trunk, committed regularly.

在我们的 "一个版本规则"中隐含着几个更深层次的想法和策略；其中最重要的是：开发分支应该是最小的，或者最多只能是很短的时间。这来自于过去20年里发表的大量工作，从敏捷过程到基于主干的开发的DORA研究成果，甚至凤凰计划关于 "减少进行中的工作"的教训。当我们把待完成的工作看作是类似于开发分支的想法时，这就进一步强化了工作应该针对主干，定期提交，以小的增量完成。

As a counterexample: in a development community that depends heavily on long- lived development branches, it isn’t difficult to imagine opportunity for choice creeping back in.

作为一个反例：在一个严重依赖长期存在的开发分支的开发社区，不难想象选择的场景又悄然而至。

Imagine this scenario: some infrastructure team is working on a new Widget, better than the old one. Excitement grows. Other newly started projects ask, “Can we depend on your new Widget?” Obviously, this can be handled if you’ve invested in codebase visibility policies, but the deep problem happens when the new Widget is “allowed” but only exists in a parallel branch. Remember: new development must not have a choice when adding a dependency. That new Widget should be committed to trunk, disabled from the runtime until it’s ready, and hidden from other developers by visibility if possible—or the two Widget options should be designed such that they can coexist, linked into the same programs.

想象一下这样的场景：一些基础组件团队正在开发一个新的Widget，比老的更好。兴奋之情油然而生。其他新开始的项目问："我们可以依赖你的新Widget吗？" 显然，如果你在代码库的可见性策略上进行了投资，这种情况是可以处理的，但当新的Widget被 "允许"，深层次的问题就会发生但只存在于并行分支中。记住：新的开发在添加依赖关系时不能有选择。那个新的Widget应该被提交到主干，在它准备好之前被禁止在运行时使用，并且如果可能的话，通过可见性来隐藏其他开发者，或者两个Widget选项应该被设计成它们可以共存，被链接到同一个程序中。

Interestingly, there is already evidence of this being important in the industry. In Accelerate and the most recent State of DevOps reports, DORA points out that there is a predictive relationship between trunk-based development and high-performing software organizations. Google is not the only organization to have discovered this— nor did we necessarily have expected outcomes in mind when these policies evolved —--—it just seemed like nothing else worked. DORA’s result certainly matches our experience.

有趣的是，已经有证据表明这在行业中是很重要的。在《加速》和最近的《DevOps状况》报告中，DORA指出，基于主干的开发和高绩效的软件组织之间存在着可预测关系。谷歌并不是唯一发现这一点的组织--当这些策略演变时，我们也不一定有预期的结果——只是看起来没有别的办法了。DORA的结果当然与我们的经验相符。

Our policies and tools for large-scale changes (LSCs; see [Chapter 22](#_bookmark1935)) put additional weight on the importance of trunk-based development: broad/shallow changes that are applied across the codebase are already a massive (often tedious) undertaking when modifying everything checked in to the trunk branch. Having an unbounded number of additional dev branches that might need to be refactored at the same time would be an awfully large tax on executing those types of changes, finding an ever- expanding set of hidden branches. In a DVCS model, it might not even be possible to identify all of those branches.

我们的大规模变更（LSCs；见第22章）的策略和工具给基于主干的开发的重要性增加了砝码：当修改所有签入主干分支的内容时，适用于整个代码库的广泛/浅层变更已经是一项巨大的（通常是乏味的）工作。如果在同一时间有数量不限的额外开发分支需要被重构，那么对于执行这些类型的修改来说，将是一个非常大的负担，因为要找到一组不断扩大的隐藏分支。在DVCS模型中，甚至可能无法识别所有这些分支。

Of course, our experience is not universal. You might find yourself in unusual situations that require longer-lived dev branches in parallel to (and regularly merged with) trunk.

当然，我们的经验并不是万能的。你可能会发现自己处于不寻常的情况下，需要更长的开发分支与主干并行（并定期合并）。

Those scenarios should be rare, and should be understood to be expensive. Across the roughly 1,000 teams that work in the Google monorepo, there are only a couple that have such a dev branch.[^13] Usually these exist for a very specific (and very unusual) reason. Most of those reasons boil down to some variation of “We have an unusual requirement for compatibility over time.” Oftentimes this is a matter of ensuring compatibility for data at rest across versions: readers and writers of some file format need to agree on that format over time even if the reader or writer implementations are modified. Other times, long-lived dev branches might come from promising API compatibility over time—when One Version isn’t enough and we need to promise that an older version of a microservice client still works with a newer server (or vice versa). That can be a very challenging requirement, something that you should not promise lightly for an actively evolving API, and something you should treat carefully to ensure that period of time doesn’t accidentally begin to grow. Dependency across time in any form is far more costly and complicated than code that is time invariant. Internally, Google production services make relatively few promises of that form.[^14] We also benefit greatly from a cap on potential version skew imposed by our “build horizon”: every job in production needs to be rebuilt and redeployed every six months, maximum. (Usually it is far more frequent than that.)

这些场景应该是罕见的，并且应该理解为代价高昂。在谷歌单版本库的大约1000个团队中，只有少数团队有这样一个开发分支。这些场景的存在通常有一个非常具体（非常不寻常）的原因。大多数原因归结为“随着时间的推移，我们对兼容性有着苛刻的要求。”通常，这是一个确保跨版本的静态数据的兼容性的问题：某些文件格式的读写器需要随着时间的推移对该格式达成一致意见，即使读写器实现被修改。其他时候，长期的开发分支可能来自于对API兼容性的承诺--当一个版本还不够时，我们需要承诺旧版本的微服务客户端仍能与新版本的服务器兼容（反之亦然）。这可能是一个非常具有挑战性的要求，对于一个积极发展的API，你不应该轻易承诺，而且你应该谨慎对待，以确保这段时间不会意外地开始增长。任何形式的跨时间的依赖都比时间不变的代码要昂贵和复杂得多。在内部，谷歌生产服务相对来说很少做出这种形式的承诺。我们也从我们的 "构建范围 "所施加的潜在版本偏差上限中获益匪浅：生产中的每项工作最多每六个月就需要重建和重新部署。(通常要比这频繁得多）。

We’re sure there are other situations that might necessitate long-lived dev branches. Just make sure to keep them rare. If you adopt other tools and practices discussed in this book, many will tend to exert pressure against long-lived dev branches. Automation and tooling that works great at trunk and fails (or takes more effort) for a dev branch can help encourage developers to stay current.

我们确信还有其他情况可能需要长期的开发分支。只需确保它们很少。如果你采用了本书所讨论的其他工具和实践，很多人都会倾向于对长期的开发分支施加压力。自动化和工具在主干分支上运行良好，而在开发分支上则失败（或花费更多精力），这有助于鼓励开发人员保持更新。

> [^12]: Kevin Behr, Gene Kim, and George Spafford, The Phoenix Project (Portland: IT Revolution Press, 2018).
> 12  Kevin Behr、Gene Kim和George Spafford，《凤凰城项目》（波特兰：IT革命出版社，2018年）。
>
> [^13]: It’s difficult to get a precise count, but the number of such teams is almost certainly fewer than 10./
> 13  很难准确统计，但这样的队伍几乎肯定少于10支。
>
> [^14]: Cloud interfaces are a different story.
> 14  云接口是另一回事。

#### What About Release Branches?  发布分支呢？

Many Google teams use release branches, with limited cherry picks. If you’re going to put out a monthly release and continue working toward the next release, it’s perfectly reasonable to make a release branch. Similarly, if you’re going to ship devices to customers, it’s valuable to know exactly what version is out “in the field.” Use caution and reason, keep cherry picks to a minimum, and don’t plan to remerge with trunk. Our various teams have all sorts of policies about release branches given that relatively few teams have arrived at the sort of rapid release cadence promised by CD (see Chapter 24) that obviates the need or desire for a release branch. Generally speaking,release branches don’t cause any widespread cost in our experience. Or, at least, no noticeable cost above and beyond the additional inherent cost to the VCS.

许多谷歌团队使用发布分支，但选择的版本有限。如果你打算每月发布一个版本，并继续为下一个版本工作，那么创建一个发布分支是完全合理的。同样，如果你打算将设备交付给客户，准确地知道什么版本“在当前”是很有价值的。谨慎和理智，尽量减少偷梁换柱的行为，并且不要计划与主干分支重新合并。鉴于很少有团队达到CD承诺的快速发布节奏，我们的各个团队对发布分支有各种各样的策略（见第24章）这样就不需要或不需要发布分支。一般来说，根据我们的经验，发布分支不会导致任何广泛的成本。或者说，至少在VCS的额外固有成本之外，没有明显的成本。

## Monorepos    单版本库（单库）

In 2016, we published a (highly cited, much discussed) paper on Google’s monorepo approach.[^15] The monorepo approach has some inherent benefits, and chief among them is that adhering to One Version is trivial: it’s usually more difficult to violate One Version than it would be to do the right thing. There’s no process of deciding which versions of anything are official, or discovering which repositories are important. Building tools to understand the state of the build (see Chapter 23) doesn’t also require discovering where important repositories exist. Consistency helps scale up the impact of introducing new tools and optimizations. By and large, engineers can see what everyone else is doing and use that to inform their own choices in code and system design. These are all very good things.

2016年，我们发表了一篇关于Google的单版本库（方法的论文（引用率很高，讨论很多）。monorepo方法有一些固有的好处，其中最主要的是遵守一个版本是微不足道的：通常违反一个版本比做正确的事情更难。没有过程来决定任何东西的哪个版本是官方的，也没有发现哪个版本库是重要的。构建工具来了解构建的状态（见第23章）也不需要发现哪里有重要的软件库。一致性有助于扩大引入新工具和优化的影响。总的来说，工程师们可以看到其他人在做什么，并利用这些来告知他们自己在代码和系统设计中的选择。这些都是非常好的事情。

Given all of that and our belief in the merits of the One-Version Rule, it is reasonable to ask whether a monorepo is the One True Way. By comparison, the open source community seems to work just fine with a “manyrepo” approach built on a seemingly infinite number of noncoordinating and nonsynchronized project repositories.

考虑到所有这些，以及我们对 "单一版本规则 "优点的信念，我们有理由问，单版本库是否是唯一正确的方法。相比之下，开源社区似乎可以用 "多版本 "的方法来工作，而这种方法是建立在看似无限多的不协调和不同步的项目库之上的。

In short: no, we don’t think the monorepo approach as we’ve described it is the perfect answer for everyone. Continuing the parallel between filesystem format and VCS, it’s easy to imagine deciding between using 10 drives to provide one very large logical filesystem or 10 smaller filesystems accessed separately. In a filesystem world, there are pros and cons to both. Technical issues when evaluating filesystem choice would range from outage resilience, size constraints, performance characteristics, and so on. Usability issues would likely focus more on the ability to reference files across filesystem boundaries, add symlinks, and synchronize files.

简而言之：不，我们不认为我们所描述的单版本库方法对每个人都是完美答案。持续文件系统格式和VCS之间的并行，很容易想象在使用10个驱动器提供一个非常大的逻辑文件系统还是10个单独访问的小文件系统之间做出决定。在文件系统的世界里，两者都有优点和缺点。在评估文件系统的选择时，技术上的问题包括中断恢复能力、大小限制、性能特点等等。可用性问题可能会更多地集中在跨文件系统边界引用文件、添加符号链接和同步文件的能力上。

A very similar set of issues governs whether to prefer a monorepo or a collection of finer-grained repositories. The specific decisions of how to store your source code (or store your files, for that matter) are easily debatable, and in some cases, the particulars of your organization and your workflow are going to matter more than others. These are decisions you’ll need to make yourself.

一组非常类似的问题决定了是选择单版本库（还是选择更细粒度的版本库的集合。如何存储你的源代码（或存储你的文件）的具体决定是很容易争论的，在某些情况下，你的组织和你的工作流程的特殊性会比其他的更重要。这些都是你需要自己做出的决定。

What is important is not whether we focus on monorepo; it’s to adhere to the One- Version principle to the greatest extent possible: developers must not have a *choice* when adding a dependency onto some library that is already in use in the organization. Choice violations of the One-Version Rule lead to merge strategy discussions, diamond dependencies, lost work, and wasted effort.

重要的不是我们是否关注单版本库；而是最大限度地坚持一个版本的原则：开发人员在向组织中已经使用的某个库添加依赖时，不能有*选择*。违反一个版本原则的选择会导致合并策略的讨论、钻石依赖、工作损失和工作消耗。

Software engineering tools including both VCS and build systems are increasingly providing mechanisms to smartly blend between fine-grained repositories and monorepos to provide an experience akin to the monorepo—an agreed-upon ordering of commits and understanding of the dependency graph. Git submodules, Bazel with external dependencies, and CMake subprojects all allow modern developers to synthesize something weakly approximating monorepo behavior without the costs and downsides of a monorepo.[^16] For instance, fine-grained repositories are easier to deal with in terms of scale (Git often has performance issues after a few million commits and tends to be slow to clone when repositories include large binary artifacts) and storage (VCS metadata can add up, especially if you have binary artifacts in your version control system). Fine-grained repositories in a federated/virtual-monorepo (VMR)–style repository can make it easier to isolate experimental or top-secret projects while still holding to One Version and allowing access to common utilities.

包括VCS和构建系统在内的软件工程工具越来越多地提供了在细粒度版本库和单版本库之间巧妙融合的机制，以提供类似于单版本库的体验--一种约定的提交顺序和对依赖关系图的理解。Git子模块、带有外部依赖关系的Bazel和CMake子项目都允许现代开发者合成一些弱的近似于单版本库的行为，而没有单版本库的成本和弊端。例如，细粒度的版本库在规模上更容易处理（Git在几百万次提交后经常出现性能问题，而且当仓库包括大型二进制构件时，克隆速度往往很慢）和存储（VCS元数据会增加，特别是如果你的版本控制系统中有二进制构件）。联合/虚拟单版本库（VMR）风格的细粒度版本库可以更容易地隔离实验性或最高机密的项目，同时同时仍保留一个版本并允许访问通用工具。

To put it another way: if every project in your organization has the same secrecy, legal, privacy, and security requirements,[^17] a true monorepo is a fine way to go. Otherwise, *aim* for the functionality of a monorepo, but allow yourself the flexibility of implementing that experience in a different fashion. If you can manage with disjoint repositories and adhere to One Version or your workload is all disconnected enough to allow truly separate repositories, great. Otherwise, synthesizing something like a VMR in some fashion may represent the best of both worlds.

换言之：如果你组织中的每个项目都有相同的保密、法律、隐私和安全要求，真正的单版本库是一个不错的选择。否则，以单版本库的功能为目标，但允许自己以不同的方式灵活实施该体验。如果你可以用不相干的软件库来管理，并且坚持一个版本，或者你的工作量都是不相干的，足以允许真正的独立软件库，那就太好了。否则，以某种方式合成类似于VMR的东西可能代表了两个世界的最佳状态。

After all, your choice of filesystem format really doesn’t matter as much as what you write to it.

毕竟，你对文件系统格式的选择与你向其写入的内容相比，真的并不重要。

> [^15]: Rachel Potvin and Josh Levenberg, “Why Google stores billions of lines of code in a single repository,” Communications of the ACM, 59 No. 7 (2016): 78-87.
>
> 15 Rachel Potvin和Josh Levenberg，"为什么谷歌将数十亿行代码存储在一个库中，"《ACM通讯》，59 No.7（2016）：78-87。
>
> [^16]: We don’t think we’ve seen anything do this particularly smoothly, but the interrepository dependencies/virtual monorepo idea is clearly in the air.
>
> 16 我们认为我们还没有看到任何系统能特别顺利地做到这一点，但版本库间的依赖关系/虚拟单库的想法显然是在空想中。
>
> [^17]: Or you have the willingness and capability to customize your VCS—and maintain that customization for the lifetime of your codebase/organization. Then again, maybe don’t plan on that as an option; that is a lot of overhead.
>
> 17 或者你有意愿和能力来定制你的VCS--并且在你的代码库/组织的生命周期内保持这种定制。然后，也许不要把它作为一个选项，那是一个很大的开销。

## Future of Version Control  版本控制的未来

Google isn’t the only organization to publicly discuss the benefits of a monorepo approach. Microsoft, Facebook, Netflix, and Uber have also publicly mentioned their reliance on the approach. DORA has published about it extensively. It’s vaguely possible that all of these successful, long-lived companies are misguided, or at least that their situations are sufficiently different as to be inapplicable to the average smaller organization. Although it’s possible, we think it is unlikely.

谷歌并不是唯一一个公开讨论单版本库方法的好处的组织。微软、Facebook、Netflix和Uber也公开提到他们对这种方法的依赖。DORA已经广泛地发表了关于它的文章。很可能所有这些成功的、长期存在的公司都被误导了，或者至少他们的情况差异很大，不适用于一般较小的组织。虽然这是可能的，但我们认为不太可能。

Most arguments against monorepos focus on the technical limitations of having a single large repository. If cloning a repository from upstream is quick and cheap, developers are more likely to keep changes small and isolated (and to avoid making mistakes with committing to the wrong work-in-progress branch). If cloning a repository (or doing some other common VCS operation) takes hours of wasted developer time, you can easily see why an organization would shy away from reliance on such a large repository/operation. We luckily avoided this pitfall by focusing on providing a VCS that scales massively.

大多数反对单版本库的论点都集中在拥有一个大型版本库的技术限制上。如果从上游克隆一个版本库又快又便宜，开发者就更有可能保持小规模和隔离的更改（避免提交到错误的工作分支）。如果克隆一个版本库（或做一些其他常见的VCS操作）需要浪费开发人员几个小时的时间，你很容易理解为什么一个组织会避开对这种大型版本库/操作的依赖。我们很幸运地避免了这个陷阱，因为我们专注于提供一个可以大规模扩展的VCS。

Looking at the past few years of major improvements to Git, there’s clearly a lot of work being done to support larger repositories: shallow clones, sparse branches, better optimization, and more. We expect this to continue and the importance of “but we need to keep the repository small” to diminish.

回顾过去几年对Git的重大改进，显然有很多工作是为了支持更大的仓库：浅复制，稀疏分支，更好的优化，等等。我们希望这种情况能继续下去，而 "但我们需要保持仓库的小型化"的重要性则会降低。

The other major argument against monorepos is that it doesn’t match how development happens in the Open Source Software (OSS) world. Although true, many of the practices in the OSS world come (rightly) from prioritizing freedom, lack of coordination, and lack of computing resources. Separate projects in the OSS world are effectively separate organizations that happen to be able to see one another’s code. Within the boundaries of an organization, we can make more assumptions: we can assume the availability of compute resources, we can assume coordination, and we can assume that there is some amount of centralized authority.

反对单版本库的另一个主要论点是，它不符合开源软件（OSS）世界中的开发方式。虽然这是事实，但开放源码软件世界中的许多做法（正确地）来自于对自由的优先考虑，缺乏协调，以及缺乏计算资源。在开放源码软件世界中，独立的项目实际上是独立的组织，碰巧可以看到彼此的代码。在一个组织的边界内，我们可以做出更多的假设：我们可以假设计算资源的可用性，我们可以假设协调，我们可以假设有一定程度的集中权限。

A less common but perhaps more legitimate concern with the monorepo approach is that as your organization scales up, it is less and less likely that every piece of code is subject to exactly the same legal, compliance, regulatory, secrecy, and privacy requirements. One native advantage of a manyrepo approach is that separate repositories are obviously capable of having different sets of authorized developers, visibility, permissions, and so on. Stitching that feature into a monorepo can be done but implies some ongoing carrying costs in terms of customization and maintenance.

对于单版本库的方法，一个不太常见但也许更合理的担忧是，随着你的组织规模的扩大，越来越不可能每段代码都受到完全相同的法律、合规、监管、保密和隐私要求的约束。多版本库方法的一个原生优势是，独立的版本库显然能够拥有不同的授权开发者、可见性、权限等集合。集成这个功能到一个单库中是可以做到的，但意味着在定制和维护方面有一些持续的承载成本。

At the same time, the industry seems to be inventing lightweight interrepository linkage over and over again. Sometimes, this is in the VCS (Git submodules) or the build system. So long as a collection of repositories have a consistent understanding of “what is trunk,” “which change happened first,” and mechanisms to describe dependencies, we can easily imagine stitching together a disparate collection of physical repositories into one larger VMR. Even though Piper has done very well for us, investing in a highly scaling VMR and tools to manage it and relying on off-the-shelf customization for per-repository policy requirements could have been a better investment.

与此同时，业界似乎在一次又一次地发明轻量级的库间链接。有时，这是在VCS（Git子模块）或构建系统中。只要版本库的集合对 "什么是主干"、"哪个变化先发生 "有一致的理解，并有描述依赖关系的机制，我们就可以很容易地想象把不同的物理版本库的集合缝合到一个更大的VMR中。尽管Piper为我们做得很好，但投资于一个高度扩展的VMR和工具来管理它，并依靠现成的定制来满足每个版本库的策略要求，可能是一个更好的投资。

As soon as someone builds a sufficiently large nugget of compatible and interdependent projects in the OSS community and publishes a VMR view of those packages, we suspect that OSS developer practices will begin to change. We see glimpses of this in the tools that *could* synthesize a virtual monorepo as well as in the work done by (for instance) large Linux distributions discovering and publishing mutually compatible revisions of thousands of packages. With unit tests, CI, and automatic version bumping for new submissions to one of those revisions, enabling a package owner to update trunk for their package (in nonbreaking fashion, of course), we think that model will catch on in the open source world. It is just a matter of efficiency, after all: a (virtual) monorepo approach with a One-Version Rule cuts down the complexity of software development by a whole (difficult) dimension: time.

一旦有人在开放源码软件社区建立了足够大的兼容和相互依赖的项目，并发布了这些软件包的VMR视图，我们怀疑开放源码软件开发者的做法将开始改变。我们在*能*合成虚拟单一版本库的工具中，以及在（例如）大型Linux发行版发现和发布数千个软件包的相互兼容的修订版所做的工作中看到了这一迹象。有了单元测试、CI，以及对其中一个修订版的新提交的自动版本升级，使软件包所有者能够为他们的软件包更新主干（当然是以不破坏的方式），我们认为这种模式将在开源世界中流行起来。毕竟，这只是一个效率问题：一个（虚拟的）单一版本的方法与一个版本的规则，将软件开发的复杂性减少了一整个（困难的）层面：时间。

We expect version control and dependency management to evolve in this direction in the next 10 to 20 years: VCSs will focus on *allowing* larger repositories with better performance scaling, but also removing the need for larger repositories by providing better mechanisms to stitch them together across project and organizational boundaries. Someone, perhaps the existing package management groups or Linux distributors, will catalyze a de facto standard virtual monorepo. Depending on the utilities in that monorepo will provide easy access to a compatible set of dependencies as one unit. We’ll more generally recognize that version numbers are timestamps, and that allowing version skew adds a dimensionality complexity (time) that costs a lot—and that we can learn to avoid. It starts with something logically like a monorepo.

我们预计在未来10到20年内，版本控制和依赖管理将朝着这个方向发展。VCS将专注于允许*大型版本库*，并有更好的性能扩展，但也通过提供更好的机制来消除对大版本库的需求，使它们跨越项目和组织的界限。其中一个，也许是现有的软件包管理小组或Linux发行商，将促成一个事实上的标准虚拟单一版本库。依靠单一版本库中的实用程序，可以方便地访问作为一个单元的兼容的依赖关系。我们将更普遍地认识到，版本号是时间戳，允许版本偏差增加了一个维度的复杂性（时间），这需要花费很多，而且我们可以学习如何避免。它从逻辑上类似于单一版本库的东西开始。

## Conclusion  总结

Version control systems are a natural extension of the collaboration challenges and opportunities provided by technology, especially shared compute resources and computer networks. They have historically evolved in lockstep with the norms of software engineering as we understand them at the time.

版本控制系统是技术带来的协作挑战和机遇的自然延伸，尤其是共享计算资源和计算机网络。它们在历史上与我们当时理解的软件工程规范同步发展。

Early systems provided simplistic file-granularity locking. As typical software engineering projects and teams grew larger, the scaling problems with that approach became apparent, and our understanding of version control changed to match those challenges. Then, as development increasingly moved toward an OSS model with distributed contributors, VCSs became more decentralized. We expect a shift in VCS technology that assumes constant network availability, focusing more on storage and build in the cloud to avoid transmitting unnecessary files and artifacts. This is increasingly critical for large, long-lived software engineering projects, even if it means a change in approach compared to simple single-dev/single-machine programming projects. This shift to cloud will make concrete what has emerged with DVCS approaches: even if we allow distributed development, something must still be centrally recognized as the Source of Truth.

早期的系统提供了简单的文件细粒度锁功能。随着典型的软件工程项目和团队规模的扩大，这种方式的扩展问题变得很明显，我们对版本控制的理解也随着这些挑战而改变。然后，随着开发越来越多地转向具有分布式贡献者的开放源码软件模型，VCS变得更加分散。我们期待着VCS技术的转变，即假设网络的持续可用性，更加关注云存储和云构建，以避免传输不必要的文件和工件。这对于大型、长周期的软件工程项目来说越来越关键，即使这意味着与简单的单设备/单机器编程项目相比，方法上的改变。这种向云计算的转变将使DVCS方法中出现的内容具体化：即使我们允许分布式开发，也必须集中认识到某些东西是信息源。

The current DVCS decentralization is a sensible reaction of the technology to the needs of the industry (especially the open source community). However, DVCS configuration needs to be tightly controlled and coupled with branch management policies that make sense for your organization. It also can often introduce unexpected scaling problems: perfect fidelity offline operation requires a lot more local data. Failure to rein in the potential complexity of a branching free-for-all can lead to a potentially unbounded amount of overhead between developers and deployment of that code. However, complex technology doesn’t need to be used in a complex fashion: as we see in monorepo and trunk-based development models, keeping branch policies simple generally leads to better engineering outcomes.

目前DVCS的去中心化是该技术对行业（尤其是开源社区）需求的合理反应。然而，DVCS的配置需要严格控制，并与对你的组织有意义的分支管理策略结合起来。它还常常会引入意想不到的扩展问题：完美仿真的离线操作需要更多的本地数据。如果不控制分支自由生成的潜在复杂性，就会导致开发人员和该代码的部署之间可能会出现无限开销。然而，复杂的技术并不需要以复杂的方式来使用：正如我们在单一版本库和基于主干的开发模式中看到的那样，保持分支策略的简单通常会带来更好的工程结果。

Choice leads to costs here. We highly endorse the One-Version Rule presented here: developers within an organization must not have a choice where to commit, or which version of an existing component to depend upon. There are few policies we’re aware of that can have such an impact on the organization: although it might be annoying for individual developers, in the aggregate, the end result is far better.

选择带来了成本。我们高度赞同这里提出的 "单一版本规则"：组织内的开发者不能选择提交到哪里，或者选择依赖现有组件的哪个版本。据我们所知，很少有策略能对组织产生如此大的影响：尽管这对个别开发者来说可能很烦人，但从总体上看，最终结果要好得多。

## TL;DRs  内容提要

- Use version control for any software development project larger than “toy project with only one developer that will never be updated.”
- There’s an inherent scaling problem when there are choices in “which version of this should I depend upon?”
- One-Version Rules are surprisingly important for organizational efficiency. Removing choices in where to commit or what to depend upon can result in significant simplification.
- In some languages, you might be able to spend some effort to dodge this with technical approaches like shading, separate compilation, linker hiding, and so on. The work to get those approaches working is entirely lost labor—your software engineers aren’t producing anything, they’re just working around technical debts.
- Previous research (DORA/State of DevOps/Accelerate) has shown that trunk- based development is a predictive factor in high-performing development organizations. Long-lived dev branches are not a good default plan.
- Use whatever version control system makes sense for you. If your organization wants to prioritize separate repositories for separate projects, it’s still probably wise for interrepository dependencies to be unpinned/“at head”/“trunk based.” There are an increasing number of VCS and build system facilities that allow you to have both small, fine-grained repositories as well as a consistent “virtual” head/trunk notion for the whole organization.

- 对任何大于“只有一名开发人员且永远不会更新的玩具项目”的软件开发项目都要使用版本控制。
- 当存在 "我应该依赖哪个版本 "的选择时，就会存在内在的扩展问题。
- 单一版本规则对组织效率的重要性出人意料。删除提交地点或依赖内容的选择可能会导致显著的简化。
- 在某些语言中，你可能会花一些精力来躲避这个问题，比如着色、单独编译、链接器隐藏等等技术方法。使这些方法正常工作的工作完全是徒劳的--你的软件工程师并没有生产任何东西，他们只是在解决技术债务。
- 以前的研究（DORA/State of DevOps/Accelerate）表明，基于干线的开发是高绩效开发组织的一个预测因素。长周期的开发分支不是一个好的默认计划。
- 使用任何对你有意义的版本控制体系。如果你的组织想优先考虑为不同的项目建立独立的仓库，那么取消存储库间的依赖关系/“基于头部”/“基于主干”可能仍然是明智的越来越多的VCS和构建系统设施允许您拥有小型、细粒度的存储库以及整个组织一致的“虚拟”头/主干概念。
