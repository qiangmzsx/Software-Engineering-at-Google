

**CHAPTER  21 **

# Dependency Management

# 第二十一章 依赖管理

                       							 Written by Titus Winters Edited by Lisa Carey

Dependency management—the management of networks of libraries, packages, and dependencies that we don’t control—is one of the least understood and most challenging problems in software engineering. Dependency management focuses on questions like: how do we update between versions of external dependencies? How do we describe versions, for that matter? What types of changes are allowed or expected in our dependencies? How do we decide when it is wise to depend on code produced by other organizations?

依赖管理--管理我们无法控制的库、包和依赖关系的网络--是软件工程中最不为人理解和最有挑战性的问题之一。依赖管理关注的问题包括：我们如何在外部依赖的版本之间进行更新？为此，我们如何描述版本？在我们的依赖关系中，哪些类型的变化是允许的或预期的？我们如何决定何时依赖其他组织生产的代码是明智的？

For comparison, the most closely related topic here is source control. Both areas describe how we work with source code. Source control covers the easier part: where do we check things in? How do we get things into the build? After we accept the value of trunk-based development, most of the day-to-day source control questions for an organization are fairly mundane: “I’ve got a new thing, what directory do I add it to?”

作为比较，这里最密切相关的主题是源码控制。这两个领域都描述了我们如何处理源代码。源码控制涵盖了比较容易的部分：我们在哪里检查东西？我们如何将东西放入构建中？在我们接受了基于主干的开发的价值之后，对于一个组织来说，大多数日常的源码控制问题都是相当平常的："我有一个新的东西，我应该把它添加到什么目录？"

Dependency management adds additional complexity in both time and scale. In a trunk-based source control problem, it’s fairly clear when you make a change that you need to run the tests and not break existing code. That’s predicated on the idea that you’re working in a shared codebase, have visibility into how things are being used, and can trigger the build and run the tests. Dependency management focuses on the problems that arise when changes are being made outside of your organization, without full access or visibility. Because your upstream dependencies can’t coordinate with your private code, they are more likely to break your build and cause your tests to fail. How do we manage that? Should we not take external dependencies? Should we ask for greater consistency between releases of external dependencies? When do we update to a new version?

依赖管理在时间和规模上都增加了额外的复杂性。在一个基于主干的源码控制问题中，当你做一个改变时，你需要运行测试并且不破坏现有的代码，这是相当清楚的。这是基于这样的想法：你在一个共享的代码库中工作，能够了解事物的使用方式，并且能够触发构建和运行测试的想法。依赖管理关注的是在你的组织之外进行改变时出现的问题，没有完全的访问权或可见性。因为你的上游依赖不能与你的私有代码协调，它们更有可能破坏你的构建，导致你的测试失败。我们如何管理这个问题？我们不应该接受外部依赖吗？我们是否应该要求外部依赖的版本之间更加一致？我们什么时候更新到一个新的版本？

Scale makes all of these questions more complex, with the realization that we aren’t really talking about single dependency imports, and in the general case that we’re depending on an entire network of external dependencies. When we begin dealing with a network, it is easy to construct scenarios in which your organization’s use of two dependencies becomes unsatisfiable at some point in time. Generally, this happens because one dependency stops working without some requirement,[1](#_bookmark1850) whereas the other is incompatible with the same requirement. Simple solutions about how to manage a single outside dependency usually fail to account for the realities of managing a large network. We’ll spend much of this chapter discussing various forms of these conflicting requirement problems.

规模使所有这些问题变得更加复杂，因为我们意识到我们实际上并不是在讨论单个依赖项导入，而且在一般情况下，我们依赖于整个外部依赖网络。当我们开始处理网络时，很容易构建这样的场景：你的组织使用两个依赖项在某个时间点变得不可满足。通常，这是因为一个依赖项在没有某些要求的情况下停止工作，而另一个依赖项与相同的要求不兼容。关于如何管理单个外部依赖关系的简单解决方案通常无法考虑管理大型网络的现实情况。本章的大部分时间我们将讨论这些相互冲突的需求问题的各种形式。

Source control and dependency management are related issues separated by the question: “Does our organization control the development/update/management of this subproject?” For example, if every team in your company has separate repositories, goals, and development practices, the interaction and management of code produced by those teams is going to have more to do with dependency management than source control. On the other hand, a large organization with a (virtual?) single repository (monorepo) can scale up significantly farther with source control policies—this is Google’s approach. Separate open source projects certainly count as separate organizations: interdependencies between unknown and not-necessarily-collaborating projects are a dependency management problem. Perhaps our strongest single piece of advice on this topic is this: *All else being equal, prefer source control problems over dependency-management problems.* If you have the option to redefine “organization” more broadly (your entire company rather than just one team), that’s very often a good trade-off. Source control problems are a lot easier to think about and a lot cheaper to deal with than dependency-management ones.

源码管理和依赖管理是由以下问题分开的相关问题：“我们的组织是否控制此子项目的开发/更新/管理？”例如，如果贵公司的每个团队都有单独的版本库、目标和开发实践，这些团队产生的代码的交互和管理将更多地涉及依赖管理，而不是源码控制。另一方面，一个拥有（虚拟？）单个版本库（monorepo）的大型组织可以通过源码控制策略进一步扩展，这是Google的方法。独立的开源项目当然被视为独立的组织：未知项目和不一定是协作项目之间的相互依赖关系是一个依赖管理问题。也许我们在这个话题上最有力的建议是：在其他条件相同的情况下，我们更喜欢源码管理问题，而不是依赖管理问题。如果你可以选择更广泛地重新定义“组织”（你的整个公司而不仅仅是一个团队），这通常是一个很好的权衡。源码管理问题比依赖管理问题更容易思考，处理成本也更低。

As the Open Source Software (OSS) model continues to grow and expand into new domains, and the dependency graph for many popular projects continues to expand over time, dependency management is perhaps becoming the most important problem in software engineering policy. We are no longer disconnected islands built on one or two layers outside an API. Modern software is built on towering pillars of dependencies; but just because we can build those pillars doesn’t mean we’ve yet figured out how to keep them standing and stable over time.

随着开源软件（OSS）模式的不断发展和扩展到新的领域，以及许多流行项目的依赖关系随着时间的推移不断扩大，依赖管理也许正在成为软件工程政策中最重要的问题。我们不再是构建在API之外的一层或两层上的断开连接的孤岛。现代软件建立在高耸的依赖性支柱之上；但仅仅因为我们能够建造这些支柱，并不意味着我们还没有弄清楚如何让它们长期保持稳定。

In this chapter, we’ll look at the particular challenges of dependency management, explore solutions (common and novel) and their limitations, and look at the realities of working with dependencies, including how we’ve handled things in Google. It is important to preface all of this with an admission: we’ve invested a lot of *thought* into this problem and have extensive experience with refactoring and maintenance issues that show the practical shortcomings with existing approaches. We don’t have firsthand evidence of solutions that work well across organizations at scale. To some extent, this chapter is a summary of what we know does not work (or at least might not work at larger scales) and where we think there is the potential for better outcomes. We definitely cannot claim to have all the answers here; if we could, we wouldn’t be calling this one of the most important problems in software engineering.

在本章中，我们将介绍依赖管理的特殊挑战，探索解决方案（常见的和新颖的）及其局限性，并介绍使用依赖关系的现实情况，包括我们在Google中处理事情的方式。在所有这些之前，我们必须承认：我们在这个问题上投入了大量的精力，并且在重构和维护问题上拥有丰富的经验这表明了现有方法的实际缺陷。我们没有第一手证据表明解决方案能够在大规模的组织中很好地工作。在某种程度上，本章总结了我们所知道的不起作用（或者至少在更大范围内可能不起作用）以及我们认为有可能产生更好结果的地方。我们绝对不能声称这里有所有的答案；如果可以，我们就不会把这称为软件工程中最重要的问题之一。

```
1	This could be any of language version, version of a lower-level library, hardware version, operating system, compiler flag, compiler version, and so on.

1   这可以是任何语言版本、较低级别库的版本、硬件版本、操作系统、编译器标志、编译器版本等。
```

## Why Is Dependency Management So Difficult?  为什么依赖管理如此困难？

Even defining the dependency-management problem presents some unusual challenges. Many half-baked solutions in this space focus on a too-narrow problem formulation: “How do we import a package that our locally developed code can depend upon?” This is a necessary-but-not-sufficient formulation. The trick isn’t just finding a way to manage one dependency—the trick is how to manage a *network* of dependencies and their changes over time. Some subset of this network is directly necessary for your first-party code, some of it is only pulled in by transitive dependencies. Over a long enough period, all of the nodes in that dependency network will have new versions, and some of those updates will be important.[2](#_bookmark1856) How do we manage the resulting cascade of upgrades for the rest of the dependency network? Or, specifically, how do we make it easy to find mutually compatible versions of all of our dependencies given that we do not control those dependencies? How do we analyze our dependency network? How do we manage that network, especially in the face of an ever-growing graph of dependencies?

即使是定义依赖管理问题也会带来一些不寻常的挑战。这个领域的许多半生不熟的解决方案都集中在一个过于狭窄的问题上。"我们如何导入一个我们本地开发的代码可以依赖的包？" 这是一个必要但并不充分的表述。诀窍不只是找到一种方法来管理一个依赖关系--诀窍是如何管理一个依赖关系的网络以及它们随时间的变化。这个网络中的一些子集对于你的第一方代码来说是直接必要的，其中一些只是由横向的依赖关系拉进来。在一个足够长的时期内，这个依赖网络中的所有节点都会有新的版本，其中一些更新会很重要。或者，具体来说，鉴于我们并不控制这些依赖关系，我们如何使其容易找到所有依赖关系的相互兼容的版本？我们如何分析我们的依赖网络？我们如何管理这个网络，尤其是在面对不断增长的依赖关系的时候？

### Conflicting Requirements and Diamond Dependencies  冲突的需求和钻石依赖

The central problem in dependency management highlights the importance of thinking in terms of dependency networks, not individual dependencies. Much of the difficulty stems from one problem: what happens when two nodes in the dependency network have conflicting requirements, and your organization depends on them both? This can arise for many reasons, ranging from platform considerations (operating system [OS], language version, compiler version, etc.) to the much more mundane issue of version incompatibility. The canonical example of version incompatibility as an unsatisfiable version requirement is the *diamond dependency* problem. Although we don’t generally include things like “what version of the compiler” are you using in a dependency graph, most of these conflicting requirements problems are isomorphic to “add a (hidden) node to the dependency graph representing this requirement.” As such, we’ll primarily discuss conflicting requirements in terms of diamond dependencies, but keep in mind that libbase might actually be absolutely any piece of software involved in the construction of two or more nodes in your dependency network.

依赖管理的核心问题突出了从依赖关系网络而不是单个依赖关系角度思考的重要性。大部分困难源于一个问题：当依赖网络中的两个节点有冲突的要求，而你的组织同时依赖它们时，会发生什么？这可能有很多原因，从平台考虑（操作系统[OS]、语言版本、编译器版本等）到更常见的版本不兼容问题。作为一个不可满足的版本要求，版本不兼容的典型例子是钻石依赖问题。虽然我们通常不包括像 "你使用的是什么版本的编译器 "这样的东西，但大多数这些冲突的需求问题都与 "在代表这个需求的依赖图中添加一个（隐藏的）节点 "同构。因此，我们将主要讨论钻石依赖关系方面的冲突需求，但请记住，libbase 实际上绝对可能是参与构建你的依赖关系网络中的两个或多个节点的任何软件。

The diamond dependency problem, and other forms of conflicting requirements, require at least three layers of dependency, as demonstrated in [Figure 21-1](#_bookmark1857).

钻石依赖问题，以及其他形式的冲突需求，需要至少三层的依赖关系，如图21-1所示。

![Figure 21-1](./images/Figure 21-1.png)

*Figure* *21-1.* *The* *diamond* *dependency* *problem*  *钻石依赖问题*

In this simplified model, libbase is used by both liba and libb, and liba and libb are both used by a higher-level component libuser. If libbase ever introduces an incompatible change, there is a chance that liba and libb, as products of separate organizations, don’t update simultaneously. If liba depends on the new libbase version and libb depends on the old version, there’s no general way for libuser (aka your code) to put everything together. This diamond can form at any scale: in the entire network of your dependencies, if there is ever a low-level node that is required to be in two incompatible versions at the same time (by virtue of there being two paths from some higher level node to those two versions), there will be a problem.

在这个简化模型中，liba和libb都使用libbase，而liba和libb都由更高级别的组件libuser使用。如果libbase引入了一个不兼容的变更，那么作为独立组织的产品，liba和libb可能不会同时更新。如果liba依赖于新的libbase版本，而libb依赖于旧版本，那么libuser（也就是你的代码）没有通用的方法来组合所有内容。这个菱形可以以任何规模形成：在依赖关系的整个网络中，如果有一个低级节点需要同时处于两个不兼容的版本中（由于从某个高级节点到这两个版本有两条路径），那么就会出现问题。

Different programming languages tolerate the diamond dependency problem to different degrees. For some languages, it is possible to embed multiple (isolated) versions of a dependency within a build: a call into libbase from liba might call a different version of the same API as a call into libbase from libb. For example, Java provides fairly well-established mechanisms to rename the symbols provided by such a dependency.[3](#_bookmark1858) Meanwhile, C++ has nearly zero tolerance for diamond dependencies in a normal build, and they are very likely to trigger arbitrary bugs and undefined behavior (UB) as a result of a clear violation of C++’s [One Definition Rule](https://oreil.ly/VTZe5). You can at best use a similar idea as Java’s shading to hide some symbols in a dynamic-link library (DLL) or in cases in which you’re building and linking separately. However, in all programming languages that we’re aware of, these workarounds are partial solutions at best: embedding multiple versions can be made to work by tweaking the names of *functions*, but if there are *types* that are passed around between dependencies, all bets are off. For example, there is simply no way for a map defined in libbase v1 to be passed through some libraries to an API provided by libbase v2 in a semantically consistent fashion. Language-specific hacks to hide or rename entities in separately compiled libraries can provide some cushion for diamond dependency problems, but are not a solution in the general case.

不同的编程语言对钻石依赖问题的容忍程度不同。对于某些语言来说，可以在构建过程中嵌入一个依赖关系的多个（孤立的）版本：从 liba 调入 libbase 可能会调用同一个 API 的不同版本，而从 libb 调入 libbase 则是如此。例如，Java 提供了相当完善的机制来重命名这种依赖关系所提供的符号。 同时，C++ 对正常构建中的钻石依赖关系的容忍度几乎为零，由于明显违反了 C++ 的 [One Definition Rule](https://oreil.ly/VTZe5) ，它们非常可能引发任意的 bug 和未定义行为（UB）。在动态链接库（DLL）中或者在单独构建和链接的情况下，您最多可以使用与Java着色类似的想法来隐藏一些符号。然而，在我们所知道的所有编程语言中，这些变通方法充其量只是部分解决方案：通过调整*函数*的名称，可以使嵌入的多个版本发挥作用，但如果有*类型*在依赖关系之间传递，所有的下注都会无效。例如，libbase v1中定义的映射根本不可能以语义一致的方式通过一些库传递给libbase v2提供的API。在单独编译的库中隐藏或重命名实体的特定语言黑科技可以为钻石依赖问题提供一些缓冲，但在一般情况下并不是一个解决方案。

If you encounter a conflicting requirement problem, the only easy answer is to skip forward or backward in versions for those dependencies to find something compatible. When that isn’t possible, we must resort to locally patching the dependencies in question, which is particularly challenging because the cause of the incompatibility in both provider and consumer is probably not known to the engineer that first discovers the incompatibility. This is inherent: liba developers are still working in a compatible fashion with libbase v1, and libb devs have already upgraded to v2. Only a dev who is pulling in both of those projects has the chance to discover the issue, and it’s certainly not guaranteed that they are familiar enough with libbase and liba to work through the upgrade. The easier answer is to downgrade libbase and libb, although that is not an option if the upgrade was originally forced because of security issues.

如果你遇到一个冲突的需求问题，唯一简单的答案是向前或向后跳过这些依赖的版本，以找到兼容的版本。当这不可能时，我们必须求助于本地修补有问题的依赖关系，这特别具有挑战性，因为首先发现不兼容的工程师可能不知道提供者和使用者中不兼容的原因。这是固有的：liba的开发者还在以兼容的方式与libbase v1工作，而libb的开发者已经升级到了v2。只有同时参与这两个项目的开发人员才有机会发现问题，当然也不能保证他们对libbase和liba足够熟悉，能够完成升级。更简单的答案是降级libbase和libb，尽管如果升级最初是因为安全问题而被迫进行的，那么这不是一个选项。

Systems of policy and technology for dependency management largely boil down to the question, “How do we avoid conflicting requirements while still allowing change among noncoordinating groups?” If you have a solution for the general form of the diamond dependency problem that allows for the reality of continuously changing requirements (both dependencies and platform requirements) at all levels of the network, you’ve described the interesting part of a dependency-management solution.

依赖管理的策略和技术体系在很大程度上归结为一个问题："我们如何避免冲突的需求，同时仍然允许非协调组之间的变化？" 如果你有一个钻石依赖问题的一般形式的解决方案，允许在网络的各个层面不断变化的需求（包括依赖和平台需求）的现实，你已经描述了依赖管理解决方案的有趣部分。

```
2	For instance, security bugs, deprecations, being in the dependency set of a higher-level dependency that has a security bug, and so on.
3	This is called shading or versioning.

2   例如，安全缺陷、弃用、处于具有安全缺陷的更高级别依赖项的依赖项集中，等等。
3   这称为着色或版本控制。
```

## Importing Dependencies 导入依赖

In programming terms, it’s clearly better to reuse some existing infrastructure rather than build it yourself. This is obvious, and part of the fundamental march of technology: if every novice had to reimplement their own JSON parser and regular expression engine, we’d never get anywhere. Reuse is healthy, especially compared to the cost of redeveloping quality software from scratch. So long as you aren’t downloading trojaned software, if your external dependency satisfies the requirements for your programming task, you should use it.

在编程方面，重用一些现有的基础设施显然比自己创建它更好。这是显而易见的，也是技术发展的一部分：如果每个新手都必须重新实现他们自己的JSON分析器和正则表达式引擎，我们就永远不会有任何进展。重用是健康的，特别是与从头开始重新开发高质量软件的成本相比。只要你下载的不是木马软件，如果你的外部依赖满足了你的编程任务的要求，你就应该使用它。

### Compatibility Promises  承诺兼容性

When we start considering time, the situation gains some complicated trade-offs. Just because you get to avoid a *development* cost doesn’t mean importing a dependency is the correct choice. In a software engineering organization that is aware of time and change, we need to also be mindful of its ongoing maintenance costs. Even if we import a dependency with no intent of upgrading it, discovered security vulnerabilities, changing platforms, and evolving dependency networks can conspire to force that upgrade, regardless of our intent. When that day comes, how expensive is it going to be? Some dependencies are more explicit than others about the expected maintenance cost for merely using that dependency: how much compatibility is assumed? How much evolution is assumed? How are changes handled? For how long are releases supported?

当我们开始考虑时间时，情况就会出现一些复杂的权衡。仅仅因为你可以避免*开发*的成本，并不意味着导入一个依赖关系是正确的选择。在一个了解时间和变化的软件工程组织中，我们还需要注意其持续的维护成本。即使我们在导入依赖关系时并不打算对其进行升级，被发现的安全漏洞、不断变化的平台和不断发展的依赖关系网络也会合力迫使我们进行升级，而不管我们的意图如何。当这一天到来时，它将会有多昂贵？有些依赖关系比其他依赖关系更清楚地说明了仅仅使用该依赖关系的预期维护成本：假定有多少兼容性？假设有多大的演变？如何处理变化？版本支持多长时间？

We suggest that a dependency provider should be clearer about the answers to these questions. Consider the example set by large infrastructure projects with millions of users and their compatibility promises.

我们建议，依赖提供者应该更清楚地了解这些问题的答案。考虑一下拥有数百万用户的大型基础设施项目及其兼容性承诺所树立的榜样。

#### C++

For the C++ standard library, the model is one of nearly indefinite backward compatibility. Binaries built against an older version of the standard library are expected to build and link with the newer standard: the standard provides not only API compatibility, but ongoing backward compatibility for the binary artifacts, known as *ABI compatibility*. The extent to which this has been upheld varies from platform to platform. For users of gcc on Linux, it’s likely that most code works fine over a range of roughly a decade. The standard doesn’t explicitly call out its commitment to ABI compatibility—there are no public-facing policy documents on that point. However, the standard does publish [Standing Document 8 ](https://oreil.ly/LoJq8)(SD-8), which calls out a small set of types of change that the standard library can make between versions, defining implicitly what type of changes to be prepared for. Java is similar: source is compatible between language versions, and JAR files from older releases will readily work with newer versions.

对于C++标准库来说，这种模式是一种几乎无限期的向后兼容性。根据标准库的旧版本构建的二进制文件有望与较新的标准进行构建和链接：标准不仅提供了API兼容性，还为二进制工件提供了持续的向后兼容性，即所谓的*ABI兼容性*。这一点在不同的平台上被坚持的程度是不同的。对于Linux上的gcc用户来说，可能大多数代码在大约十年的范围内都能正常工作。该标准没有明确指出它对ABI兼容性的承诺--在这一点上没有面向公众的政策文件。然而，该标准确实发布了[常设文件8](https://oreil.ly/LoJq8)(SD-8)，其中列出了标准库在不同版本之间可以进行的一小部分变化类型，隐含地定义了需要准备的变化类型。Java也是如此：语言版本之间的源代码是兼容的，旧版本的JAR文件很容易在新版本中运行。

#### Go

Not all languages prioritize the same amount of compatibility. The Go programming language explicitly promises source compatibility between most releases, but no binary compatibility. You cannot build a library in Go with one version of the language and link that library into a Go program built with a different version of the language.

并非所有的语言都优先考虑相同规格的兼容性。Go编程语言明确承诺大多数版本之间的源代码兼容，但没有二进制兼容。你不能用一个版本的Go语言建立一个库，然后把这个库链接到用另一个版本的语言建立的Go程序中。

#### Abseil

Google’s Abseil project is much like Go, with an important caveat about time. We are unwilling to commit to compatibility *indefinitely*: Abseil lies at the foundation of most of our most computationally heavy services internally, which we believe are likely to be in use for many years to come. This means we’re careful to reserve the right to make changes, especially in implementation details and ABI, in order to allow better performance. We have experienced far too many instances of an API turning out to be confusing and error prone after the fact; publishing such known faults to tens of thousands of developers for the indefinite future feels wrong. Internally, we already have roughly 250 million lines of C++ code that depend on this library—we aren’t going to make API changes lightly, but it must be possible. To that end, Abseil explicitly does not promise ABI compatibility, but does promise a slightly limited form of API compatibility: we won’t make a breaking API change without also providing an automated refactoring tool that will transform code from the old API to the new transparently. We feel that shifts the risk of unexpected costs significantly in favor of users: no matter what version a dependency was written against, a user of that dependency and Abseil should be able to use the most current version. The highest cost should be “run this tool,” and presumably send the resulting patch for review in the mid-level dependency (liba or libb, continuing our example from earlier). In practice, the project is new enough that we haven’t had to make any significant API breaking changes. We can’t say how well this will work for the ecosystem as a whole, but in theory, it seems like a good balance for stability versus ease of upgrade.

谷歌的Abseil项目很像Go，对时间有一个重要的警告。我们不愿意无限期地致力于兼容性。Abseil是我们内部大多数计算量最大的服务的基础，我们相信这些服务可能会在未来很多年内使用。这意味着我们小心翼翼地保留修改的权利，特别是在实现细节和ABI方面，以实现更好的性能。我们已经经历了太多的例子，一个API在事后被证明是混乱和容易出错的；在无限期的未来向成千上万的开发者公布这种已知的错误感觉是错误的。在内部，我们已经有大约2.5亿行的C++代码依赖于这个库，我们不会轻易改变API，但它必须是可以改变的。为此，Abseil明确地不承诺ABI的兼容性，但确实承诺了一种稍微有限的API兼容性：我们不会在不提供自动重构工具的情况下做出破坏性的API改变，该工具将透明地将代码从旧的API转换到新的API。我们觉得这将意外成本的风险大大地转移到了用户身上：无论一个依赖关系是针对哪个版本编写的，该依赖关系和Abseil的用户都应该能够使用最新的版本。最高的成本应该是 "运行这个工具"，并推测在中级依赖关系（liba或libb，继续我们前面的例子）中发送产生的补丁以供审查。在实践中，这个项目足够新，我们没有必要做任何重大的API破坏性改变。我们不能说这对整个生态系统会有多好的效果，但在理论上，这似乎是对稳定性和易升级的一个良好平衡。

#### Boost

By comparison, the Boost C++ library makes no promises of [compatibility between](https://www.boost.org/users/faq.html) [versions](https://www.boost.org/users/faq.html). Most code doesn’t change, of course, but “many of the Boost libraries are actively maintained and improved, so backward compatibility with prior version isn’t always possible.” Users are advised to upgrade only at a period in their project life cycle in which some change will not cause problems. The goal for Boost is fundamentally different than the standard library or Abseil: Boost is an experimental proving ground. A particular release from the Boost stream is probably perfectly stable and appropriate for use in many projects, but Boost’s project goals do not prioritize compatibility between versions—other long-lived projects might experience some friction keeping up to date. The Boost developers are every bit as expert as the developers for the standard library[4](#_bookmark1870)—none of this is about technical expertise: this is purely a matter of what a project does or does not promise and prioritize.

相比之下，Boost C++库没有承诺[不同版本](https://www.boost.org/users/faq.html)的兼容性。当然，大多数代码不会改变，但 "许多Boost库都在积极维护和改进，所以向后兼容以前的版本并不总是可能的"。我们建议用户只在项目生命周期的某个阶段进行升级，因为在这个阶段，一些变化不会造成问题。Boost的目标与标准库或Abseil有根本的不同：Boost是一个实验性的证明场。Boost的某个版本可能非常稳定，适合在许多项目中使用，但是Boost的项目目标并不优先考虑版本之间的兼容性--其他长期项目可能会遇到一些与最新版本保持同步的阻力。Boost的开发者和标准库的开发者一样都是专家--这与技术专长无关：这纯粹是一个项目是否承诺和优先考虑的问题。

Looking at the libraries in this discussion, it’s important to recognize that these compatibility issues are *software engineering* issues, not *programming* issues. You can download something like Boost with no compatibility promise and embed it deeply in the most critical, long-lived systems in your organization; it will *work* just fine. All of the concerns here are about how those dependencies will change over time, keeping up with updates, and the difficulty of getting developers to worry about maintenance instead of just getting features working. Within Google, there is a constant stream of guidance directed to our engineers to help them consider this difference between “I got it to work” and “this is working in a supported fashion.” That’s unsurprising: it’s basic application of Hyrum’s Law, after all.

从这个讨论中的库来看，重要的是要认识到这些兼容性问题是*软件工程*问题，而不是*编程*问题。你可以下载像Boost这样没有兼容性承诺的东西，并把它深深地嵌入到你的组织中最关键、生命周期最长的系统中；它可以*正常工作*。这里所有的担忧都是关于这些依赖关系会随着时间的推移而改变，跟上更新的步伐，以及让开发者担心维护而不是让功能正常工作的困难。在谷歌内部，有源源不断的指导意见指向我们的工程师，帮助他们考虑“我让它起作用了”和“这是以一种支持的方式起作用的”之间的区别。这并不奇怪：毕竟，这是Hyrum定律的基本应用。

Put more broadly: it is important to realize that dependency management has a wholly different nature in a programming task versus a software engineering task. If you’re in a problem space for which maintenance over time is relevant, dependency management is difficult. If you’re purely developing a solution for today with no need to ever update anything, it is perfectly reasonable to grab as many readily available dependencies as you like with no thought of how to use them responsibly or plan for upgrades. Getting your program to work today by violating everything in SD-8 and also relying on binary compatibility from Boost and Abseil works fine…so long as you never upgrade the standard library, Boost, or Abseil, and neither does anything that depends on you.

更广泛地说：重要的是要意识到，依赖管理在编程任务和软件工程任务中具有完全不同的性质。如果你所处的问题空间与随时间的维护相关，则依赖关系管理很困难。如果你只是为今天开发一个解决方案，而不需要更新任何东西，那么你完全可以随心所欲地抓取许多现成的依赖关系，而不考虑如何负责任地使用它们或为升级做计划。通过违反SD-8中的所有规定，并依靠Boost和Abseil的二进制兼容性，使你的程序今天就能运行......只要你不升级标准库、Boost或Abseil，也不升级任何依赖你的东西，就可以了。

```
4	In many cases, there is significant overlap in those populations.
4 在许多情况下，这些人群中存在着明显的重叠。
```

### Considerations When Importing  导入依赖的注意事项

Importing a dependency for use in a programming project is nearly free: assuming that you’ve taken the time to ensure that it does what you need and isn’t secretly a security hole, it is almost always cheaper to reuse than to reimplement functionality. Even if that dependency has taken the step of clarifying what compatibility promise it will make, so long as we aren’t ever upgrading, anything you build on top of that snapshot of your dependency is fine, no matter how many rules you violate in consuming that API. But when we move from programming to software engineering, those dependencies become subtly more expensive, and there are a host of hidden costs and questions that need to be answered. Hopefully, you consider these costs before importing, and, hopefully, you know when you’re working on a programming project versus working on a software engineering project.

导入一个依赖关系用于编程项目几乎是免费的：假设你已经花了时间来确保它做了你需要的事情，并且没有隐蔽的安全漏洞，那么重用几乎总是比重新实现功能要划算。即使该依赖关系已经采取了澄清它将作出什么兼容性承诺的步骤，只要我们不曾升级，你在该依赖关系的快照之上建立的任何东西都是好的，无论你在消费该API时违反了多少规则。但是，当我们从编程转向软件工程时，这些依赖关系的成本会变得微妙地更高，而且有一系列的隐藏成本和问题需要回答。希望你在导入之前考虑到这些成本，而且，希望你知道你什么时候是在做一个编程项目，而不是在做一个软件工程项目。

When engineers at Google try to import dependencies, we encourage them to ask this (incomplete) list of questions first:

•   Does the project have tests that you can run?

•   Do those tests pass?

•   Who is providing that dependency? Even among “No warranty implied” OSS projects, there is a significant range of experience and skill set—it’s a very different thing to depend on compatibility from the C++ standard library or Java’s Guava library than it is to select a random project from GitHub or npm. Reputation isn’t everything, but it is worth investigating.

•   What sort of compatibility is the project aspiring to?

•   Does the project detail what sort of usage is expected to be supported?

•   How popular is the project?

•   How long will we be depending on this project?

•   How often does the project make breaking changes? Add to this a short selection of internally focused questions:

•   How complicated would it be to implement that functionality within Google?

•   What incentives will we have to keep this dependency up to date?

•   Who will perform an upgrade?

•   How difficult do we expect it to be to perform an upgrade?

当谷歌的工程师试图导入依赖关系时，我们鼓励他们先问这个（不完整）的问题清单：

- 该项目是否有你可以运行的测试？

- 这些测试是否通过？

- 谁在提供这个依赖关系？即使在 "无担保 "的开放源码软件项目中，也有相当大的经验和技能范围--依赖C++标准库或Java的Guava库的兼容性，与从GitHub或npm中随机选择一个项目是完全不同的事情。信誉不是一切，但它值得调研。

- 该项目希望达到什么样的兼容性？

- 该项目是否详细说明了预计会支持什么样的用法？

- 该项目有多受欢迎？

- 我们将在多长时间内依赖这个项目？

- 该项目多长时间做一次突破性的改变？项目多久进行一次突破性的变更？在此基础上，添加一些简短的内部重点问题：
    - 在谷歌内部实现该功能会有多复杂？

    - 我们有什么激励措施来保持这个依赖性的最新状态？

    - 谁来执行升级？

    - 我们预计进行升级会有多大难度？


Our own Russ Cox has [written about this more extensively](https://research.swtch.com/deps). We can’t give a perfect formula for deciding when it’s cheaper in the long term to import versus reimplement; we fail at this ourselves, more often than not.

我们的Russ Cox已经[更广泛地写到了这一点]（https://research.swtch.com/deps）。我们无法给出一个完美的公式来决定从长远来看，什么时候引入和重新实施更划算；我们自己在这方面经常失败。

### How Google Handles Importing Dependencies  Google如何处理导入依赖

In short: we could do better.

简言之：我们可以做得更好。

The overwhelming majority of dependencies in any given Google project are internally developed. This means that the vast majority of our internal dependency- management story isn’t really dependency management, it’s just source control—by design. As we have mentioned, it is a far easier thing to manage and control the complexities and risks involved in adding dependencies when the providers and consumers are part of the same organization and have proper visibility and Continuous Integration (CI; see [Chapter 23](#_bookmark2022)) available. Most problems in dependency management stop being problems when you can see exactly how your code is being used and know exactly the impact of any given change. Source control (when you control the projects in question) is far easier than dependency management (when you don’t).

在任何特定的Google项目中，绝大多数的依赖都是内部开发的。这意味着，我们的内部依赖管理故事中的绝大部分并不是真正的依赖管理，它只是设计上的源头控制。正如我们所提到的，当提供者和消费者是同一组织的一部分，并且有适当的可见性和持续集成（CI；见第23章）时，管理和控制增加依赖关系所涉及的复杂性和风险是一件容易得多的事情。当你能准确地看到你的代码是如何被使用的，并准确地知道任何给定变化的影响时，依赖管理中的大多数问题就不再是问题了。源头控制（当你控制有关项目时）要比依赖管理（当你不控制时）容易得多。

That ease of use begins failing when it comes to our handling of external projects. For projects that we are importing from the OSS ecosystem or commercial partners, those dependencies are added into a separate directory of our monorepo, labeled *third_party*. Let’s examine how a new OSS project is added to *third_party*.

当涉及到我们对外部项目的处理时，这种易用性开始失效了。对于我们从开放源码软件生态系统或商业伙伴那里导入的项目，这些依赖关系被添加到我们monorepo的一个单独目录中，标记为*third_party*。我们来看看一个新的OSS项目是如何被添加到*third_party*的。

Alice, a software engineer at Google, is working on a project and realizes that there is an open source solution available. She would really like to have this project completed and demo’ed soon, to get it out of the way before going on vacation. The choice then is whether to reimplement that functionality from scratch or download the OSS package and get it added to *third_party*. It’s very likely that Alice decides that the faster development solution makes sense: she downloads the package and follows a few steps in our *third_party* policies. This is a fairly simple checklist: make sure it builds with our build system, make sure there isn’t an existing version of that package, and make sure at least two engineers are signed up as OWNERS to maintain the package in the event that any maintenance is necessary. Alice gets her teammate Bob to say, “Yes, I’ll help.” Neither of them need to have any experience maintaining a *third_party* package, and they have conveniently avoided the need to understand anything about the *implementation* of this package. At most, they have gained a little experience with its interface as part of using it to solve the prevacation demo problem.

Alice是谷歌的一名软件工程师，她正在做一个项目，并意识到有一个开源的解决方案可用。她真的很想尽快完成这个项目并进行演示，希望在去度假之前把它解决掉。然后的选择是，是从头开始重新实现这个功能，还是下载开放源码包，并将其添加到*第三方*。很可能Alice决定更快的开发方案是有意义的：她下载了包，并按照我们的*third_party*政策中的几个步骤进行了操作。这是一个相当简单的清单：确保它在我们的构建系统中构建，确保该软件包没有现有的版本，并确保至少有两名工程师注册为所有者，在有必要进行任何维护时维护该软件包。爱丽丝让她的队友Bob说，"是的，我会帮忙"。他们都不需要有维护*第三方*包的经验，而且他们很方便地避免了对这个包的*实施*的了解。最多，他们对它的界面获得了一点经验，作为使用它来解决预先演示问题的一部分。

From this point on, the package is usually available to other Google teams to use in their own projects. The act of adding additional dependencies is completely transparent to Alice and Bob: they might be completely unaware that the package they downloaded and promised to maintain has become popular. Subtly, even if they are monitoring for new direct usage of their package, they might not necessarily notice growth in the *transitive* usage of their package. If they use it for a demo, while Charlie adds a dependency from within the guts of our Search infrastructure, the package will have suddenly moved from fairly innocuous to being in the critical infrastructure for important Google systems. However, we don’t have any particular signals surfaced to Charlie when he is considering whether to add this dependency.

从这时起，该软件包通常可以供其他谷歌团队在他们自己的项目中使用。添加额外的依赖关系的行为对Alice和Bob来说是完全透明的：他们可能完全没有意识到他们下载并承诺维护的软件包已经变得很流行。微妙的是，即使他们在监测他们的软件包的新的直接使用情况，他们也不一定会注意到他们的软件包的*过渡性*使用的增长。如果他们把它用于演示，而Charlie为我们的搜索基础设施的内部增加了一个依赖，那么这个包就会突然从相当无害的地方变成谷歌重要系统的关键基础设施。然而，当Charlie考虑是否要添加这个依赖时，我们没有任何特别的信号提示给他。

Now, it’s possible that this scenario is perfectly fine. Perhaps that dependency is well written, has no security bugs, and isn’t depended upon by other OSS projects. It might be *possible* for it to go quite a few years without being updated. It’s not necessarily *wise* for that to happen: changes externally might have optimized it or added important new functionality, or cleaned up security holes before CVEs[5](#_bookmark1877) were discovered. The longer that the package exists, the more dependencies (direct and indirect) are likely to accrue. The more that the package remains stable, the more that we are likely to accrete Hyrum’s Law reliance on the particulars of the version that is checked into *third_party*.

现在，这种情况有可能是完美的。也许这个依赖关系写得很好，没有安全漏洞，也没有被其他OSS项目所依赖。这可能是*有可能的*，因为它可以在相当长的时间内不被更新。但这并不一定是明智之举：外部的变化可能已经优化了它，或者增加了重要的新功能，或者在CVE被发现之前清理了安全漏洞。软件包存在的时间越长，依赖（直接和间接）就越多。软件包越是保持稳定，我们就越有可能增Hyrum定律对被检查到*第三方*的版本的特定依赖。

One day, Alice and Bob are informed that an upgrade is critical. It could be the disclosure of a security vulnerability in the package itself or in an OSS project that depends upon it that forces an upgrade. Bob has transitioned to management and hasn’t touched the codebase in a while. Alice has moved to another team since the demo and hasn’t used this package again. Nobody changed the OWNERS file. Thousands of projects depend on this indirectly—we can’t just delete it without breaking the build for Search and a dozen other big teams. Nobody has any experience with the implementation details of this package. Alice isn’t necessarily on a team that has a lot of experience undoing Hyrum’s Law subtleties that have accrued over time.

有一天，Alice和Bob被告知，升级是很关键的。这可能是软件包本身或依赖它的OSS项目中的安全漏洞被披露，从而迫使他们进行升级。Bob已经成为管理层，并且已经有一段时间没有碰过代码库了。Alice在演示后转到了另一个团队，并没有再使用这个包。没有人改变OWNERS文件。成千上万的项目都间接地依赖于此--我们不能在不破坏Search和其他十几个大团队的构建的情况下直接删除它。没有人对这个包的实现细节有任何经验。Alice所在的团队不一定有在消除Hyrum定律随着时间积累的微妙之处方面经验丰富。

All of which is to say: Alice and the other users of this package are in for a costly and difficult upgrade, with the security team exerting pressure to get this resolved immediately. Nobody in this scenario has practice in performing the upgrade, and the upgrade is extra difficult because it is covering many smaller releases covering the entire period between initial introduction of the package into *third_party* and the security disclosure.

所有这些都是说。Alice和这个软件包的其他用户将面临一次代价高昂而困难的升级，安全团队正在施加压力以立即解决这个问题。在这种情况下，没有人有执行升级的经验，而且升级是非常困难的，因为它涵盖了许多较小的版本，涵盖了从最初将软件包引入*第三方*到安全披露的整个时期。

Our *third_party* policies don’t work for these unfortunately common scenarios. We roughly understand that we need a higher bar for ownership, we need to make it easier (and more rewarding) to update regularly and more difficult for *third_party* packages to be orphaned and important at the same time. The difficulty is that it is difficult for codebase maintainers and *third_party* leads to say, “No, you can’t use this thing that solves your development problem perfectly because we don’t have resources to update everyone with new versions constantly.” Projects that are popular and have no compatibility promise (like Boost) are particularly risky: our developers might be very familiar with using that dependency to solve programming problems outside of Google, but allowing it to become ingrained into the fabric of our codebase is a big risk. Our codebase has an expected lifespan of decades at this point: upstream projects that are not explicitly prioritizing stability are a risk.

我们的*第三方包*政策不适用于这些不幸的常见情况。我们大致明白，我们需要一个更高的所有权标准，我们需要让定期更新更容易（和更多的回报），让*第三方包*更难成为孤儿，同时也更重要。困难在于，代码库维护者和*第三方包*领导很难说："不，你不能使用这个能完美解决你的开发问题的东西，因为我们没有资源不断为大家更新新版本"。那些流行的、没有兼容性承诺的项目（比如Boost）尤其有风险：我们的开发者可能非常熟悉使用这种依赖关系来解决谷歌以外的编程问题，但允许它根植于我们的代码库结构中是一个很大的风险。在这一点上，我们的代码库有几十年的预期寿命：上游项目如果没有明确地优先考虑稳定性，就是一种风险。

```
5	Common Vulnerabilities and Exposures
5   常见漏洞和暴露
```

## Dependency Management, In Theory  理论上的依赖管理

Having looked at the ways that dependency management is difficult and how it can go wrong, let’s discuss more specifically the problems we’re trying to solve and how we might go about solving them. Throughout this chapter, we call back to the formulation, “How do we manage code that comes from outside our organization (or that we don’t perfectly control): how do we update it, how do we manage the things it depends upon over time?” We need to be clear that any good solution here avoids conflicting requirements of any form, including diamond dependency version conflicts, even in a dynamic ecosystem in which new dependencies or other requirements might be added (at any point in the network). We also need to be aware of the impact of time: all software has bugs, some of those will be security critical, and some fraction of our dependencies will therefore be *critical* to update over a long enough period of time.

A stable dependency-management scheme must therefore be flexible with time and scale: we can’t assume indefinite stability of any particular node in the dependency graph, nor can we assume that no new dependencies are added (either in code we control or in code we depend upon). If a solution to dependency management prevents conflicting requirement problems among your dependencies, it’s a good solution. If it does so without assuming stability in dependency version or dependency fan-out, coordination or visibility between organizations, or significant compute resources, it’s a great solution.

When proposing solutions to dependency management, there are four common options that we know of that exhibit at least some of the appropriate properties: nothing ever changes, semantic versioning, bundle everything that you need (coordinating not per project, but per distribution), or Live at Head.

### Nothing Changes (aka The Static Dependency Model)

The simplest way to ensure stable dependencies is to never change them: no API changes, no behavioral changes, nothing. Bug fixes are allowed only if no user code could be broken. This prioritizes compatibility and stability over all else. Clearly, such a scheme is not ideal due to the assumption of indefinite stability. If, somehow, we get to a world in which security issues and bug fixes are a nonissue and dependencies aren’t changing, the Nothing Changes model is very appealing: if we start with satisfiable constraints, we’ll be able to maintain that property indefinitely.

Although not sustainable in the long term, practically speaking, this is where every organization starts: up until you’ve demonstrated that the expected lifespan of your project is long enough that change becomes necessary, it’s really easy to live in a world where we assume that nothing changes. It’s also important to note: this is probably the right model for most new organizations. It is comparatively rare to know that you’re starting a project that is going to live for decades and have a *need* to be able to update dependencies smoothly. It’s much more reasonable to hope that stability is a real option and pretend that dependencies are perfectly stable for the first few years of a project.

The downside to this model is that, over a long enough time period, it *is* false, and there isn’t a clear indication of exactly how long you can pretend that it is legitimate. We don’t have long-term early warning systems for security bugs or other critical issues that might force you to upgrade a dependency—and because of chains of dependencies, a single upgrade can in theory become a forced update to your entire dependency network.

In this model, version selection is simple: there are no decisions to be made, because there are no versions.

### Semantic Versioning

The de facto standard for “how do we manage a network of dependencies today?” is semantic versioning (SemVer).[6](#_bookmark1886) SemVer is the nearly ubiquitous practice of representing a version number for some dependency (especially libraries) using three decimal-separated integers, such as 2.4.72 or 1.1.4. In the most common convention, the three component numbers represent major, minor, and patch versions, with the implication that a changed major number indicates a change to an existing API that can break existing usage, a changed minor number indicates purely added functionality that should not break existing usage, and a changed patch version is reserved for non-API-impacting implementation details and bug fixes that are viewed as particularly low risk.

With the SemVer separation of major/minor/patch versions, the assumption is that a version requirement can generally be expressed as “anything newer than,” barring API-incompatible changes (major version changes). Commonly, we’ll see “Requires libbase ≥ 1.5,” that requirement would be compatible with any libbase in 1.5, including 1.5.1, and anything in 1.6 onward, but not libbase 1.4.9 (missing the API introduced in 1.5) or 2.x (some APIs in libbase were changed incompatibly). Major version changes are a significant incompatibility: because an existing piece of functionality has changed (or been removed), there are potential incompatibilities for all dependents. Version requirements exist (explicitly or implicitly) whenever one dependency uses another: we might see “liba requires libbase ≥ 1.5” and “libb requires libbase ≥ 1.4.7.”

If we formalize these requirements, we can conceptualize a dependency network as a collection of software components (nodes) and the requirements between them (edges). Edge labels in this network change as a function of the version of the source node, either as dependencies are added (or removed) or as the SemVer requirement is updated because of a change in the source node (requiring a newly added feature in a dependency, for instance). Because this whole network is changing asynchronously over time, the process of finding a mutually compatible set of dependencies that satisfy all the transitive requirements of your application can be challenging.[7](#_bookmark1889) Version- satisfiability solvers for SemVer are very much akin to SAT-solvers in logic and algorithms research: given a set of constraints (version requirements on dependency edges), can we find a set of versions for the nodes in question that satisfies all constraints? Most package management ecosystems are built on top of these sorts of graphs, governed by their SemVer SAT-solvers.

SemVer and its SAT-solvers aren’t in any way promising that there *exists* a solution to a given set of dependency constraints. Situations in which dependency constraints cannot be satisfied are created constantly, as we’ve already seen: if a lower-level component (libbase) makes a major-number bump, and some (but not all) of the libraries that depend on it (libb but not liba) have upgraded, we will encounter the diamond dependency issue.

SemVer solutions to dependency management are usually SAT-solver based. Version selection is a matter of running some algorithm to find an assignment of versions for dependencies in the network that satisfies all of the version-requirement constraints. When no such satisfying assignment of versions exists, we colloquially call it “dependency hell.”

We’ll look at some of the limitations of SemVer in more detail later in this chapter.

```
6	Strictly speaking, SemVer refers only to the emerging practice of applying semantics to major/minor/patch version numbers, not the application of compatible version requirements among dependencies numbered in that fashion. There are numerous minor variations on those requirements among different ecosystems, but in general, the version-number-plus-constraints system described here as SemVer is representative of the practice at large.
```

### Bundled Distribution Models

As an industry, we’ve seen the application of a powerful model of managing dependencies for decades now: an organization gathers up a collection of dependencies, finds a mutually compatible set of those, and releases the collection as a single unit. This is what happens, for instance, with Linux distributions—there’s no guarantee that the various pieces that are included in a distro are cut from the same point in time. In fact, it’s somewhat more likely that the lower-level dependencies are somewhat older than the higher-level ones, just to account for the time it takes to integrate them.

This “draw a bigger box around it all and release that collection” model introduces entirely new actors: the distributors. Although the maintainers of all of the individual dependencies may have little or no knowledge of the other dependencies, these higher-level *distributors* are involved in the process of finding, patching, and testing a mutually compatible set of versions to include. Distributors are the engineers responsible for proposing a set of versions to bundle together, testing those to find bugs in that dependency tree, and resolving any issues.

For an outside user, this works great, so long as you can properly rely on only one of these bundled distributions. This is effectively the same as changing a dependency network into a single aggregated dependency and giving that a version number. Rather than saying, “I depend on these 72 libraries at these versions,” this is, “I depend on RedHat version N,” or, “I depend on the pieces in the NPM graph at time T.”

In the bundled distribution approach, version selection is handled by dedicated distributors.



```
7	In fact, it has been proven that SemVer constraints applied to a dependency network are NP-complete.
```



### Live at Head

The model that some of us at Google[8](#_bookmark1895) have been pushing for is theoretically sound, but places new and costly burdens on participants in a dependency network. It’s wholly unlike the models that exist in OSS ecosystems today, and it is not clear how to get from here to there as an industry. Within the boundaries of an organization like Google, it is costly but effective, and we feel that it places most of the costs and incentives into the correct places. We call this model “Live at Head.” It is viewable as the dependency-management extension of trunk-based development: where trunk- based development talks about source control policies, we’re extending that model to apply to upstream dependencies as well.

Live at Head presupposes that we can unpin dependencies, drop SemVer, and rely on dependency providers to test changes against the entire ecosystem before committing. Live at Head is an explicit attempt to take time and choice out of the issue of dependency management: always depend on the current version of everything, and never change anything in a way in which it would be difficult for your dependents to adapt. A change that (unintentionally) alters API or behavior will in general be caught by CI on downstream dependencies, and thus should not be committed. For cases in which such a change *must* happen (i.e., for security reasons), such a break should be made only after either the downstream dependencies are updated or an automated tool is provided to perform the update in place. (This tooling is essential for closed- source downstream consumers: the goal is to allow any user the ability to update use of a changing API without expert knowledge of the use or the API. That property significantly mitigates the “mostly bystanders” costs of breaking changes.) This philosophical shift in responsibility in the open source ecosystem is difficult to motivate initially: putting the burden on an API provider to test against and change all of its downstream customers is a significant revision to the responsibilities of an API provider.

Changes in a Live at Head model are not reduced to a SemVer “I think this is safe or not.” Instead, tests and CI systems are used to test against visible dependents to determine experimentally how safe a change is. So, for a change that alters only efficiency or implementation details, all of the visible affected tests might likely pass, which demonstrates that there are no obvious ways for that change to impact users—it’s safe to commit. A change that modifies more obviously observable parts of an API (syntactically or semantically) will often yield hundreds or even thousands of test failures. It’s then up to the author of that proposed change to determine whether the work involved to resolve those failures is worth the resulting value of committing the change. Done well, that author will work with all of their dependents to resolve the test failures ahead of time (i.e., unwinding brittle assumptions in the tests) and might potentially create a tool to perform as much of the necessary refactoring as possible.

The incentive structures and technological assumptions here are materially different than other scenarios: we assume that there exist unit tests and CI, we assume that API providers will be bound by whether downstream dependencies will be broken, and we assume that API consumers are keeping their tests passing and relying on their dependency in supported ways. This works significantly better in an open source ecosystem (in which fixes can be distributed ahead of time) than it does in the face of hidden/closed-source dependencies. API providers are incentivized when making changes to do so in a way that can be smoothly migrated to. API consumers are incentivized to keep their tests working so as not to be labeled as a low-signal test and potentially skipped, reducing the protection provided by that test.

In the Live at Head approach, version selection is handled by asking “What is the most recent stable version of everything?” If providers have made changes responsibly, it will all work together smoothly.

```
8	Especially the author and others in the Google C++ community.
```

## The Limitations of SemVer

The Live at Head approach may build on recognized practices for version control (trunk-based development) but is largely unproven at scale. SemVer is the de facto standard for dependency management today, but as we’ve suggested, it is not without its limitations. Because it is such a popular approach, it is worth looking at it in more detail and highlighting what we believe to be its potential pitfalls.

There’s a lot to unpack in the SemVer definition of what a dotted-triple version number really means. Is this a promise? Or is the version number chosen for a release an estimate? That is, when the maintainers of libbase cut a new release and choose whether this is a major, minor, or patch release, what are they saying? Is it provable that an upgrade from 1.1.4 to 1.2.0 is safe and easy, because there were only API additions and bug fixes? Of course not. There’s a host of things that ill-behaved users of libbase could have done that could cause build breaks or behavioral changes in the face of a “simple” API addition.[9](#_bookmark1902) Fundamentally, you can’t *prove* anything about compatibility when only considering the source API; you have to know *with which* things you are asking about compatibility.

However, this idea of “estimating” compatibility begins to weaken when we talk about networks of dependencies and SAT-solvers applied to those networks. The fundamental problem in this formulation is the difference between node values in traditional SAT and version values in a SemVer dependency graph. A node in a three-SAT graph *is* either True or False. A version value (1.1.14) in a dependency graph is provided by the maintainer as an *estimate* of how compatible the new version is, given code that used the previous version. We’re building all of our version-satisfaction logic on top of a shaky foundation, treating estimates and self-attestation as absolute. As we’ll see, even if that works OK in limited cases, in the aggregate, it doesn’t necessarily have enough fidelity to underpin a healthy ecosystem.

If we acknowledge that SemVer is a lossy estimate and represents only a subset of the possible scope of changes, we can begin to see it as a blunt instrument. In theory, it works fine as a shorthand. In practice, especially when we build SAT-solvers on top of it, SemVer can (and does) fail us by both overconstraining and underprotecting us.

### SemVer Might Overconstrain

Consider what happens when libbase is recognized to be more than a single monolith: there are almost always independent interfaces within a library. Even if there are only two functions, we can see situations in which SemVer overconstrains us. Imagine that libbase is indeed composed of only two functions, Foo and Bar. Our mid- level dependencies liba and libb use only Foo. If the maintainer of libbase makes a breaking change to Bar, it is incumbent on them to bump the major version of lib base in a SemVer world. liba and libb are known to depend on libbase 1.x— SemVer dependency solvers won’t accept a 2.x version of that dependency. However, in reality these libraries would work together perfectly: only Bar changed, and that was unused. The compression inherent in “I made a breaking change; I must bump the major version number” is lossy when it doesn’t apply at the granularity of an individual atomic API unit. Although some dependencies might be fine grained enough for that to be accurate,[10](#_bookmark1905) that is not the norm for a SemVer ecosystem.

If SemVer overconstrains, either because of an unnecessarily severe version bump or insufficiently fine-grained application of SemVer numbers, automated package managers and SAT-solvers will report that your dependencies cannot be updated or installed, even if everything would work together flawlessly by ignoring the SemVer checks. Anyone who has ever been exposed to dependency hell during an upgrade might find this particularly infuriating: some large fraction of that effort was a complete waste of time.

```
9	For example: a poorly implemented polyfill that adds the new libbase API ahead of time, causing a conflicting definition. Or, use of language reflection APIs to depend upon the precise number of APIs provided by libbase, introducing crashes if that number changes. These shouldn’t happen and are certainly rare even if they do happen by accident—the point is that the libbase providers can’t prove compatibility.
```

### SemVer Might Overpromise

On the flip side, the application of SemVer makes the explicit assumption that an API provider’s estimate of compatibility can be fully predictive and that changes fall into three buckets: breaking (by modification or removal), strictly additive, or non-API- impacting. If SemVer is a perfectly faithful representation of the risk of a change by classifying syntactic and semantic changes, how do we characterize a change that adds a one-millisecond delay to a time-sensitive API? Or, more plausibly: how do we characterize a change that alters the format of our logging output? Or that alters the order that we import external dependencies? Or that alters the order that results are returned in an “unordered” stream? Is it reasonable to assume that those changes are “safe” merely because those aren’t part of the syntax or contract of the API in question? What if the documentation said “This may change in the future”? Or the API was named “ForInternalUseByLibBaseOnlyDoNotTouchThisIReallyMeanIt?”[11](#_bookmark1906)

The idea that SemVer patch versions, which in theory are only changing implementation details, are “safe” changes absolutely runs afoul of Google’s experience with Hyrum’s Law—“With a sufficient number of users, every observable behavior of your system will be depended upon by someone.” Changing the order that dependencies are imported, or changing the output order for an “unordered” producer will, at scale, invariably break assumptions that some consumer was (perhaps incorrectly) relying upon. The very term “breaking change” is misleading: there are changes that are theoretically breaking but safe in practice (removing an unused API). There are also changes that are theoretically safe but break client code in practice (any of our earlier Hyrum’s Law examples). We can see this in any SemVer/dependency-management system for which the version-number requirement system allows for restrictions on the patch number: if you can say liba requires libbase >1.1.14 rather than liba requires libbase 1.1, that’s clearly an admission that there are observable differences in patch versions.

*A change in isolation isn’t breaking or nonbreaking—*that statement can be evaluated only in the context of how it is being used. There is no absolute truth in the notion of “This is a breaking change”; a change can been seen to be breaking for only a (known or unknown) set of existing users and use cases. The reality of how we evaluate a change inherently relies upon information that isn’t present in the SemVer formulation of dependency management: how are downstream users consuming this dependency?

Because of this, a SemVer constraint solver might report that your dependencies work together when they don’t, either because a bump was applied incorrectly or because something in your dependency network had a Hyrum’s Law dependence on something that wasn’t considered part of the observable API surface. In these cases, you might have either build errors or runtime bugs, with no theoretical upper bound on their severity.

```
10	The Node ecosystem has noteworthy examples of dependencies that provide exactly one API.
11	It’s worth noting: in our experience, naming like this doesn’t fully solve the problem of users reaching in to access private APIs. Prefer languages that have good control over public/private access to APIs of all forms.

```

### Motivations

There is a further argument that SemVer doesn’t always incentivize the creation of stable code. For a maintainer of an arbitrary dependency, there is variable systemic incentive to *not* make breaking changes and bump major versions. Some projects care deeply about compatibility and will go to great lengths to avoid a major-version bump. Others are more aggressive, even intentionally bumping major versions on a fixed schedule. The trouble is that most users of any given dependency are indirect users—they wouldn’t have any significant reasons to be aware of an upcoming change. Even most direct users don’t subscribe to mailing lists or other release notifications.

All of which combines to suggest that no matter how many users will be inconvenienced by adoption of an incompatible change to a popular API, the maintainers bear a tiny fraction of the cost of the resulting version bump. For maintainers who are also users, there can also be an incentive *toward* breaking: it’s always easier to design a better interface in the absence of legacy constraints. This is part of why we think projects should publish clear statements of intent with respect to compatibility, usage, and breaking changes. Even if those are best-effort, nonbinding, or ignored by many users, it still gives us a starting point to reason about whether a breaking change/ major version bump is “worth it,” without bringing in these conflicting incentive structures.

[Go ](https://research.swtch.com/vgo-import)and [Clojure ](https://oreil.ly/Iq9f_)both handle this nicely: in their standard package management ecosystems, the equivalent of a major-version bump is expected to be a fully new package. This has a certain sense of justice to it: if you’re willing to break backward compatibility for your package, why do we pretend this is the same set of APIs? Repackaging and renaming everything seems like a reasonable amount of work to expect from a provider in exchange for them taking the nuclear option and throwing away backward compatibility.

Finally, there’s the human fallibility of the process. In general, SemVer version bumps should be applied to *semantic* changes just as much as syntactic ones; changing the behavior of an API matters just as much as changing its structure. Although it’s plausible that tooling could be developed to evaluate whether any particular release involves syntactic changes to a set of public APIs, discerning whether there are meaningful and intentional semantic changes is computationally infeasible.[12](#_bookmark1913) Practically speaking, even the potential tools for identifying syntactic changes are limited. In almost all cases, it is up to the human judgement of the API provider whether to bump major, minor, or patch versions for any given change. If you’re relying on only a handful of professionally maintained dependencies, your expected exposure to this form of SemVer clerical error is probably low.[13](#_bookmark1914) If you have a network of thousands of dependencies underneath your product, you should be prepared for some amount of chaos simply from human error.

### Minimum Version Selection

In 2018, as part of an essay series on building a package management system for the Go programming language, Google’s own Russ Cox described an interesting variation on SemVer dependency management: [Minimum Version Selection](https://research.swtch.com/vgo-mvs) (MVS). When updating the version for some node in the dependency network, it is possible that its dependencies need to be updated to newer versions to satisfy an updated SemVer requirement—this can then trigger further changes transitively. In most constraint- satisfaction/version-selection formulations, the newest possible versions of those downstream dependencies are chosen: after all, you’ll need to update to those new versions eventually, right?

MVS makes the opposite choice: when liba’s specification requires libbase ≥1.7, we’ll try libbase 1.7 directly, even if a 1.8 is available. This “produces high-fidelity builds in which the dependencies a user builds are as close as possible to the ones the author developed against.”[14](#_bookmark1918) There is a critically important truth revealed in this point: when liba says it requires libbase ≥1.7, that almost certainly means that the developer of liba had libbase 1.7 installed. Assuming that the maintainer performed even basic testing before publishing,[15](#_bookmark1919) we have at least anecdotal evidence of interoperability testing for that version of liba and version 1.7 of libbase. It’s not CI or proof that everything has been unit tested together, but it’s something.

Absent accurate input constraints derived from 100% accurate prediction of the future, it’s best to make the smallest jump forward possible. Just as it’s usually safer to commit an hour of work to your project instead of dumping a year of work all at once, smaller steps forward in your dependency updates are safer. MVS just walks forward each affected dependency only as far as is required and says, “OK, I’ve walked forward far enough to get what you asked for (and not farther). Why don’t you run some tests and see if things are good?”

Inherent in the idea of MVS is the admission that a newer version might introduce an incompatibility in practice, even if the version numbers *in theory* say otherwise. This is recognizing the core concern with SemVer, using MVS or not: there is some loss of fidelity in this compression of software changes into version numbers. MVS gives some additional practical fidelity, trying to produce selected versions closest to those that have presumably been tested together. This might be enough of a boost to make a larger set of dependency networks function properly. Unfortunately, we haven’t found a good way to empirically verify that idea. The jury is still out on whether MVS makes SemVer “good enough” without fixing the basic theoretical and incentive problems with the approach, but we still believe it represents a manifest improvement in the application of SemVer constraints as they are used today.

```
12	In a world of ubiquitous unit tests, we could identify changes that required a change in test behavior, but it would still be difficult to algorithmically separate “This is a behavioral change” from “This is a bug fix to a behavior that wasn’t intended/promised.”
13	So, when it matters in the long term, choose well-maintained dependencies.

```

### So, Does SemVer Work?

SemVer works well enough in limited scales. It’s deeply important, however, to recognize what it is actually saying and what it cannot. SemVer will work fine provided that:

•   Your dependency providers are accurate and responsible (to avoid human error in SemVer bumps)

•   Your dependencies are fine grained (to avoid falsely overconstraining when unused/unrelated APIs in your dependencies are updated, and the associated risk of unsatisfiable SemVer requirements)

•   All usage of all APIs is within the expected usage (to avoid being broken in surprising fashion by an assumed-compatible change, either directly or in code you depend upon transitively)

When you have only a few carefully chosen and well-maintained dependencies in your dependency graph, SemVer can be a perfectly suitable solution.

However, our experience at Google suggests that it is unlikely that you can have *any* of those three properties at scale and keep them working constantly over time. Scale tends to be the thing that shows the weaknesses in SemVer. As your dependency network scales up, both in the size of each dependency and the number of dependencies (as well as any monorepo effects from having multiple projects depending on the same network of external dependencies), the compounded fidelity loss in SemVer will begin to dominate. These failures manifest as both false positives (practically incompatible versions that theoretically should have worked) and false negatives (compatible versions disallowed by SAT-solvers and resulting dependency hell).

## Dependency Management with Infinite Resources

Here’s a useful thought experiment when considering dependency-management solutions: what would dependency management look like if we all had access to infinite compute resources? That is, what’s the best we could hope for, if we aren’t resource constrained but are limited only by visibility and weak coordination among organizations? As we see it currently, the industry relies on SemVer for three reasons:

•   It requires only local information (an API provider doesn’t *need* to know the particulars of downstream users)

•   It doesn’t assume the availability of tests (not ubiquitous in the industry yet, but definitely moving that way in the next decade), compute resources to run the tests, or CI systems to monitor the test results

•   It’s the existing practice

The “requirement” of local information isn’t really necessary, specifically because dependency networks tend to form in only two environments:

•   Within a single organization

•   Within the OSS ecosystem, where source is visible even if the projects are not necessarily collaborating

In either of those cases, significant information about downstream usage is *available*, even if it isn’t being readily exposed or acted upon today. That is, part of SemVer’s effective dominance is that we’re choosing to ignore information that is theoretically available to us. If we had access to more compute resources and that dependency information was surfaced readily, the community would probably find a use for it.

Although an OSS package can have innumerable closed-source dependents, the common case is that popular OSS packages are popular both publicly and privately. Dependency networks don’t (can’t) aggressively mix public and private dependencies: generally, there is a public subset and a separate private subgraph.[16](#_bookmark1923)

Next, we must remember the *intent* of SemVer: “In my estimation, this change will be easy (or not) to adopt.” Is there a better way of conveying that information? Yes, in the form of practical experience demonstrating that the change is easy to adopt. How do we get such experience? If most (or at least a representative sample) of our dependencies are publicly visible, we run the tests for those dependencies with every proposed change. With a sufficiently large number of such tests, we have at least a statistical argument that the change is safe in the practical Hyrum’s-Law sense. The tests still pass, the change is good—it doesn’t matter whether this is API impacting, bug fixing, or anything in between; there’s no need to classify or estimate.

Imagine, then, that the OSS ecosystem moved to a world in which changes were accompanied with *evidence* of whether they are safe. If we pull compute costs out of the equation, the *truth*[17](#_bookmark1924) of “how safe is this” comes from running affected tests in downstream dependencies.

Even without formal CI applied to the entire OSS ecosystem, we can of course use such a dependency graph and other secondary signals to do a more targeted presubmit analysis. Prioritize tests in dependencies that are heavily used. Prioritize tests in dependencies that are well maintained. Prioritize tests in dependencies that have a history of providing good signal and high-quality test results. Beyond just prioritizing tests based on the projects that are likely to give us the most information about experimental change quality, we might be able to use information from the change authors to help estimate risk and select an appropriate testing strategy. Running “all affected” tests is theoretically necessary if the goal is “nothing that anyone relies upon is change in a breaking fashion.” If we consider the goal to be more in line with “risk mitigation,” a statistical argument becomes a more appealing (and cost-effective) approach.

In [Chapter 12](#_bookmark938), we identified four varieties of change, ranging from pure refactorings to modification of existing functionality. Given a CI-based model for dependency updating, we can begin to map those varieties of change onto a SemVer-like model for which the author of a change estimates the risk and applies an appropriate level of testing. For example, a pure refactoring change that modifies only internal APIs might be assumed to be low risk and justify running tests only in our own project and perhaps a sampling of important direct dependents. On the other hand, a change that removes a deprecated interface or changes observable behaviors might require as much testing as we can afford.

What changes would we need to the OSS ecosystem to apply such a model? Unfortunately, quite a few:

•   All dependencies must provide unit tests. Although we are moving inexorably toward a world in which unit testing is both well accepted and ubiquitous, we are not there yet.

•   The dependency network for the majority of the OSS ecosystem is understood. It is unclear that any mechanism is currently available to perform graph algorithms on that network—the information is *public* and *available,* but not actually generally indexed or usable. Many package-management systems/dependency- management ecosystems allow you to see the dependencies of a project, but not the reverse edges, the dependents.

•   The availability of compute resources for executing CI is still very limited. Most developers don’t have access to build-and-test compute clusters.

•   Dependencies are often expressed in a pinned fashion. As a maintainer of libbase, we can’t experimentally run a change through the tests for liba and libb if those dependencies are explicitly depending on a specific pinned version of libbase.

•   We might want to explicitly include history and reputation in CI calculations. A proposed change that breaks a project that has a longstanding history of tests continuing to pass gives us a different form of evidence than a breakage in a project that was only added recently and has a history of breaking for unrelated reasons.

Inherent in this is a scale question: against which versions of each dependency in the network do you test presubmit changes? If we test against the full combination of all historical versions, we’re going to burn a truly staggering amount of compute resources, even by Google standards. The most obvious simplification to this version- selection strategy would seem to be “test the current stable version” (trunk-based development is the goal, after all). And thus, the model of dependency management given infinite resources is effectively that of the Live at Head model. The outstanding question is whether that model can apply effectively with a more practical resource availability and whether API providers are willing to take greater responsibility for testing the practical safety of their changes. Recognizing where our existing low-cost facilities are an oversimplification of the difficult-to-compute truth that we are looking for is still a useful exercise.

```
16	Because the public OSS dependency network can’t generally depend on a bunch of private nodes, graphics firmware notwithstanding.
17	Or something very close to it.

```

### Exporting Dependencies

So far, we’ve only talked about taking on dependencies; that is, depending on software that other people have written. It’s also worth thinking about how we build software that can be *used* as a dependency. This goes beyond just the mechanics of packaging software and uploading it to a repository: we need to think about the benefits, costs, and risks of providing software, for both us and our potential dependents.

There are two major ways that an innocuous and hopefully charitable act like “open sourcing a library” can become a possible loss for an organization. First, it can eventually become a drag on the reputation of your organization if implemented poorly or not maintained properly. As the Apache community saying goes, we ought to prioritize “community over code.” If you provide great code but are a poor community member, that can still be harmful to your organization and the broader community. Second, a well-intentioned release can become a tax on engineering efficiency if you can’t keep things in sync. Given time, all forks will become expensive.

#### Example: open sourcing gflags

For reputation loss, consider the case of something like Google’s experience circa 2006 open sourcing our C++ command-line flag libraries. Surely giving back to the open source community is a purely good act that won’t come back to haunt us, right? Sadly, no. A host of reasons conspired to make this good act into something that certainly hurt our reputation and possibly damaged the OSS community as well:

•   At the time, we didn’t have the ability to execute large-scale refactorings, so everything that used that library internally had to remain exactly the same—we couldn’t move the code to a new location in the codebase.

•   We segregated our repository into “code developed in-house” (which can be copied freely if it needs to be forked, so long as it is renamed properly) and “code that may have legal/licensing concerns” (which can have more nuanced usage requirements).

•   If an OSS project accepts code from outside developers, that’s generally a legal issue—the project originator doesn’t *own* that contribution, they only have rights to it.

As a result, the gflags project was doomed to be either a “throw over the wall” release or a disconnected fork. Patches contributed to the project couldn’t be reincorporated into the original source inside of Google, and we couldn’t move the project within our monorepo because we hadn’t yet mastered that form of refactoring, nor could we make everything internally depend on the OSS version.

Further, like most organizations, our priorities have shifted and changed over time. Around the time of the original release of that flags library, we were interested in  products outside of our traditional space (web applications, search), including things like Google Earth, which had a much more traditional distribution mechanism: precompiled binaries for a variety of platforms. In the late 2000s, it was unusual but not unheard of for a library in our monorepo, especially something low-level like flags, to be used on a variety of platforms. As time went on and Google grew, our focus narrowed to the point that it was extremely rare for any libraries to be built with anything other than our in-house configured toolchain, then deployed to our production fleet. The “portability” concerns for properly supporting an OSS project like flags were nearly impossible to maintain: our internal tools simply didn’t have support for those platforms, and our average developer didn’t have to interact with external tools. It was a constant battle to try to maintain portability.

As the original authors and OSS supporters moved on to new companies or new teams, it eventually became clear that nobody internally was really supporting our OSS flags project—nobody could tie that support back to the priorities for any particular team. Given that it was no specific team’s job, and nobody could say why it was important, it isn’t surprising that we basically let that project rot externally.[18](#_bookmark1928) The internal and external versions diverged slowly over time, and eventually some external developers took the external version and forked it, giving it some proper attention.

Other than the initial “Oh look, Google contributed something to the open source world,” no part of that made us look good, and yet every little piece of it made sense given the priorities of our engineering organization. Those of us who have been close to it have learned, “Don’t release things without a plan (and a mandate) to support it for the long term.” Whether the whole of Google engineering has learned that or not remains to be seen. It’s a big organization.

```
18	That isn’t to say it’s right or wise, just that as an organization we let some things slip through the cracks.
```

Above and beyond the nebulous “We look bad,” there are also parts of this story that illustrate how we can be subject to technical problems stemming from poorly released/poorly maintained external dependencies. Although the flags library was shared but ignored, there were still some Google-backed open source projects, or projects that needed to be shareable outside of our monorepo ecosystem. Unsurprisingly, the authors of those other projects were able to identify[19](#_bookmark1930) the common API subset between the internal and external forks of that library. Because that common subset stayed fairly stable between the two versions for a long period, it silently became “the way to do this” for the rare teams that had unusual portability requirements between roughly 2008 and 2017. Their code could build in both internal and external ecosystems, switching out forked versions of the flags library depending on environment.

Then, for unrelated reasons, C++ library teams began tweaking observable-but-not- documented pieces of the internal flag implementation. At that point, everyone who was depending on the stability and equivalence of an unsupported external fork started screaming that their builds and releases were suddenly broken. An optimization opportunity worth some thousands of aggregate CPUs across Google’s fleet was significantly delayed, not because it was difficult to update the API that 250 million lines of code depended upon, but because a tiny handful of projects were relying on unpromised and unexpected things. Once again, Hyrum’s Law affects software changes, in this case even for forked APIs maintained by separate organizations.

----

#### Case Study: AppEngine

A more serious example of exposing ourselves to greater risk of unexpected technical dependency comes from publishing Google’s AppEngine service. This service allows users to write their applications on top of an existing framework in one of several popular programming languages. So long as the application is written with a proper
storage/state management model, the AppEngine service allows those applications to scale up to huge usage levels: backing storage and frontend management are managed and cloned on demand by Google’s production infrastructure.

Originally, AppEngine’s support for Python was a 32-bit build running with an older version of the Python interpreter. The AppEngine system itself was (of course) implemented in our monorepo and built with the rest of our common tools, in Python and in C++ for backend support. In 2014 we started the process of doing a major update to the Python runtime alongside our C++ compiler and standard library installations, with the result being that we effectively tied “code that builds with the current C++ compiler” to “code that uses the updated Python version”—a project that upgraded one of those dependencies inherently upgraded the other at the same time. For most projects, this was a non-issue. For a few projects, because of edge cases and Hyrum’s Law, our language platform experts wound up doing some investigation and debugging to unblock the transition. In a terrifying instance of Hyrum’s Law running into
business practicalities, AppEngine discovered that many of its users, our paying customers, couldn’t (or wouldn’t) update: either they didn’t want to take the change to the newer Python version, or they couldn’t afford the resource consumption changes involved in moving from 32-bit to 64-bit Python. Because there were some customers that were paying a significant amount of money for AppEngine services, AppEngine was able to make a strong business case that a forced switch to the new language and compiler versions must be delayed. This inherently meant that every piece of C++ code in the transitive closure of dependencies from AppEngine had to be compatible with the older compiler and standard library versions: any bug fixes or performance optimizations that could be made to that infrastructure had to be compatible across versions. That situation persisted for almost three years.

-----

With enough users, any “observable” of your system will come to be depended upon by somebody. At Google, we constrain all of our internal users within the boundaries of our technical stack and ensure visibility into their usage with the monorepo and code indexing systems, so it is far easier to ensure that useful change remains possible. When we shift from source control to dependency management and lose visibility into how code is used or are subject to competing priorities from outside groups (especially ones that are paying you), it becomes much more difficult to make pure engineering trade-offs. Releasing APIs of any sort exposes you to the possibility of competing priorities and unforeseen constraints by outsiders. This isn’t to say that you shouldn’t release APIs; it serves only to provide the reminder: external users of an API cost a lot more to maintain than internal ones.

Sharing code with the outside world, either as an open source release or as a closed- source library release, is not a simple matter of charity (in the OSS case) or business opportunity (in the closed-source case). Dependent users that you cannot monitor, in different organizations, with different priorities, will eventually exert some form of Hyrum’s Law inertia on that code. Especially if you are working with long timescales, it is impossible to accurately predict the set of necessary or useful changes that could become valuable. When evaluating whether to release something, be aware of the long-term risks: externally shared dependencies are often much more expensive to modify over time.

## Conclusion

Dependency management is inherently challenging—we’re looking for solutions to management of complex API surfaces and webs of dependencies, where the maintainers of those dependencies generally have little or no assumption of coordination. The de facto standard for managing a network of dependencies is semantic versioning, or SemVer, which provides a lossy summary of the perceived risk in adopting any particular change. SemVer presupposes that we can a priori predict the severity of a change, in the absence of knowledge of how the API in question is being consumed: Hyrum’s Law informs us otherwise. However, SemVer works well enough at small scale, and even better when we include the MVS approach. As the size of the dependency network grows, Hyrum’s Law issues and fidelity loss in SemVer make managing the selection of new versions increasingly difficult.

It is possible, however, that we move toward a world in which maintainer-provided estimates of compatibility (SemVer version numbers) are dropped in favor of experience-driven evidence: running the tests of affected downstream packages. If API providers take greater responsibility for testing against their users and clearly advertise what types of changes are expected, we have the possibility of higher-fidelity dependency networks at even larger scale.

## TL;DRs

•   Prefer source control problems to dependency management problems: if you can get more code from your organization to have better transparency and coordination, those are important simplifications.

•   Adding a dependency isn’t free for a software engineering project, and the complexity in establishing an “ongoing” trust relationship is challenging. Importing dependencies into your organization needs to be done carefully, with an understanding of the ongoing support costs.

•   A dependency is a contract: there is a give and take, and both providers and consumers have some rights and responsibilities in that contract. Providers should be clear about what they are trying to promise over time.

•   SemVer is a lossy-compression shorthand estimate for “How risky does a human think this change is?” SemVer with a SAT-solver in a package manager takes those estimates and escalates them to function as absolutes. This can result in either overconstraint (dependency hell) or underconstraint (versions that should work together that don’t).

•   By comparison, testing and CI provide actual evidence of whether a new set of versions work together.









