**CHAPTER 20**

# Static Analysis
# 第二十章 静态分析
        
**Written by Caitlin Sadowski**

**Edited by Lisa Carey**

Static analysis refers to programs analyzing source code to find potential issues such as bugs, antipatterns, and other issues that can be diagnosed *without executing the* *program*. The “static” part specifically refers to analyzing the source code instead of a running program (referred to as “dynamic” analysis). Static analysis can find bugs in programs early, before they are checked in as production code. For example, static analysis can identify constant expressions that overflow, tests that are never run, or invalid format strings in logging statements that would crash when executed.[^1] However, static analysis is useful for more than just finding bugs. Through static analysis at Google, we codify best practices, help keep code current to modern API versions, and prevent or reduce technical debt. Examples of these analyses include verifying that naming conventions are upheld, flagging the use of deprecated APIs, or pointing out simpler but equivalent expressions that make code easier to read. Static analysis is also an integral tool in the API deprecation process, where it can prevent backsliding during migration of the codebase to a new API (see [Chapter 22](#_bookmark1935)). We have also found evidence that static analysis checks can educate developers and actually prevent antipatterns from entering the codebase.[^2]

静态分析是指通过程序分析源代码来发现潜在的问题，例如bug、反模式和其他无需执行程序就能发现的问题。“静态”具体是指分析源代码，而不是运行中的程序（即“动态”分析）。它可以在代码被合入生产环境前发现bug，例如，可以识别溢出的常量表达式、永远不会运行的测试用例或日志字符串的无效格式化导致运行崩溃的问题。但静态分析的作用不只是查找bug。通过对Google代码的静态分析，我们编写了最佳实践，帮助推进代码使用最新接口和减少技术债，这些分析的例子包括：校验是否遵循命名规范；标记已弃用但仍然使用的接口；简化表达式以提高代码可读性。静态分析也是弃用某个接口时不可或缺的工具，它可以防止将代码库迁移到新接口时出现“倒退”现象（参见第22章，指被调用系统不断迁移旧接口到新接口，而其他系统不断的调用弃用接口而不调用新接口）。我们还发现静态分析检查可以对开发人员起到启发和约束作用，可以防止开发人员写出反模式的代码。

In this chapter, we’ll look at what makes effective static analysis, some of the lessons we at Google have learned about making static analysis work, and how we implemented these best practices in our static analysis tooling and processes.[^3]

本章我们将介绍如何进行有效的静态分析，包含我们在谷歌了解到的一些关于静态分析工作的经验和我们在静态分析工具和流程中的最佳实践。


> [^1]:	See http://errorprone.info/bugpatterns./
> 1  	查阅 http://errorprone.info/bugpatterns。
> 
> [^2]:	Caitlin Sadowski et al. Tricorder: Building a Program Analysis Ecosystem, International Conference on Software Engineering (ICSE), May 2015.
> Caitlin Sadowski等人，Tricorder。构建一个程序分析生态系统，国际软体工程会议（ICSE），2015年5月。
> 
> 3 A good academic reference for static analysis theory is: Flemming Nielson et al. Principles of Program Analysis (Gernamy: Springer, 2004)
> 3 关于静态分析理论，一个很好的学术参考资料是。Flemming Nielson等人，《程序分析原理》(Gernamy: Springer, 2004)

## 有效静态分析的特点

Although there have been decades of static analysis research focused on developing new analysis techniques and specific analyses, a focus on approaches for improving *scalability* and *usability* of static analysis tools has been a relatively recent development.

尽管几十年来，静态分析研究一直专注于开发新的分析技术和具体分析，但提高静态分析工具的可扩展性和可用性的方法最近才开始发展。

### Scalability  可扩展性

Because modern software has become larger, analysis tools must explicitly address scaling in order to produce results in a timely manner, without slowing down the software development process. Static analysis tools at Google must scale to the size of Google’s multibillion-line codebase. To do this, analysis tools are shardable and incremental. Instead of analyzing entire large projects, we focus analyses on files affected by a pending code change, and typically show analysis results only for edited files or lines. Scaling also has benefits: because our codebase is so large, there is a lot of low- hanging fruit in terms of bugs to find. In addition to making sure analysis tools can run on a large codebase, we also must scale up the number and variety of analyses available. Analysis contributions are solicited from throughout the company. Another component to static analysis scalability is ensuring the *process* is scalable. To do this, Google static analysis infrastructure avoids bottlenecking analysis results by showing them directly to relevant engineers.

现代软件变得越来越大，为了使分析工具在不减慢软件开发过程的情况下及时生效，必须有效地解决扩展性问题。对谷歌来说，分析工具需要满足谷歌数十亿行代码库的规模。
为此，分析工具是分片和增量分析的，即不是分析整个大型项目，而是将分析重点放在受待处理代码更改影响的文件上，并且通常仅显示已编辑文件或行的分析结果。
因为代码库非常大，这样做在寻找bug时容易的多。 除了确保分析工具可以在大型代码库上运行之外，还需要必须扩大可分析的数量和种类，可以从整个公司寻求分析结果。
静态分析可扩展性的另一个组成部分是确保过程是可扩展的，为此，Google静态分析基础架构通过直接向相关工程师展示分析结果来避免造成分析瓶颈。

### Usability  可用性

When thinking about analysis usability, it is important to consider the cost-benefit trade-off for static analysis tool users. This “cost” could either be in terms of developer time or code quality. Fixing a static analysis warning could introduce a bug. For code that is not being frequently modified, why “fix” code that is running fine in production? For example, fixing a dead code warning by adding a call to the previously dead code could result in untested (possibly buggy) code suddenly running. There is unclear benefit and potentially high cost. For this reason, we generally focus on newly introduced warnings; existing issues in otherwise working code are typically only worth highlighting (and fixing) if they are particularly important (security issues, significant bug fixes, etc.). Focusing on newly introduced warnings (or warnings on modified lines) also means that the developers viewing the warnings have the most relevant context on them.

考虑可用性时，重要要考虑静态分析工具用户的成本效益权衡。这种”成本”可能是开发时间或代码质量。修复静态分析警告可能会引入错误的，那么为什么要“修复”在生产环境中运行良好且不经常修改的代码呢？例如，通过添加对死代码(从未被运行过的代码)的调用来修复硬编码警告，可能会导致未经测试（可能有错误）的代码突然运行。这种做法收益不明确，但是成本可能很高。出于这个原因，我们通常只关注新引入的警告，代码中的现有问题通常只在特别重要（安全问题、重大错误修复等）时才值得修复。关注新引入的警告（或修改行上的警告）也意味着查看警告的开发人员具有最相关的上下文和背景。

Also, developer time is valuable! Time spent triaging analysis reports or fixing highlighted issues is weighed against the benefit provided by a particular analysis. If the analysis author can save time (e.g., by providing a fix that can be automatically applied to the code in question), the cost in the trade-off goes down. Anything that can be fixed automatically should be fixed automatically. We also try to show developers reports about issues that actually have a negative impact on code quality so that they do not waste time slogging through irrelevant results.

此外，开发人员的时间很宝贵，要对分析报告进行分类或修复突出问题所花费的时间与特定分析提供的收益进行权衡。如果分析可以节省时间（例如，通过提供可以自动应用于相关代码的修复），则成本就会下降。
任何可以自动修复的东西都应该自动修复。我们还尝试向开发人员展示实际上对代码质量有负面影响的问题的报告，这样他们就不会浪费时间费力地处理不相关的分析结果。

To further reduce the cost of reviewing static analysis results, we focus on smooth developer workflow integration. A further strength of homogenizing everything in one workflow is that a dedicated tools team can update tools along with workflow and code, allowing analysis tools to evolve with the source code in tandem.

为了进一步降低查看静态分析结果的成本，我们将重点放在平滑的开发人员工作流程集成上。在一个工作流中同质化所有内容的另一个优势是，一个专门的工具团队可以随着工作流和代码一起更新工具，从而允许分析工具与源代码同步发展。

We believe these choices and trade-offs that we have made in making static analyses scalable and usable arise organically from our focus on three core principles, which we formulate as lessons in the next section.

我们在使静态分析具有可扩展性和可用性方面所做的这些选择和权衡，是从我们对三个核心原则的关注中产生的，我们将在下一节中阐述这三个原则作为经验教训。

```
3	A good academic reference for static analysis theory is: Flemming Nielson et al. Principles of Program Analysis
(Gernamy: Springer, 2004).
```

## Key Lessons in Making Static Analysis Work 静态分析工作中的关键工作

There are three key lessons that we have learned at Google about what makes static analysis tools work well. Let’s take a look at them in the following subsections.

我们在谷歌了解到了如何用好静态分析工具的三个关键点。让我们在下面的小节中看看它们。
### Focus on Developer Happiness  关注开发者的幸福感

We mentioned some of the ways in which we try to save developer time and reduce the cost of interacting with the aforementioned static analysis tools; we also keep track of how well analysis tools are performing. If you don’t measure this, you can’t fix problems. We only deploy analysis tools with low false-positive rates (more on that in a minute). We also *actively solicit and act on feedback* from developers consuming static analysis results, in real time. Nurturing this feedback loop between static analysis tool users and tool developers creates a virtuous cycle that has built up user trust and improved our tools. User trust is extremely important for the success of static analysis tools.

我们提到了一些试图节省开发人员时间并降低与静态分析工具交互成本的方法，我们还跟踪分析工具的性能。如果你不衡量这点，你就无法解决问题。我们只部署误报率较低的分析工具（稍后将详细介绍）。我们还积极征求开发人员对静态分析结果的实时反馈并采取行动，在静态分析工具用户和开发人员之间形成反馈闭环，创造一个良性循环，建立了用户信任，借此改进我们的工具。用户信任对于静态分析工具的成功至关重要。

For static analysis, a “false negative” is when a piece of code contains an issue that the analysis tool was designed to find, but the tool misses it. A “false positive” occurs when a tool incorrectly flags code as having the issue. Research about static analysis tools traditionally focused on reducing false negatives; in practice, low false-positive rates are often critical for developers to actually want to use a tool—who wants to wade through hundreds of false reports in search of a few true ones?[^4]
对于静态分析，“false negative”是指一段代码包含分析工具找到的问题，但该工具忽略了该问题，“false positive”是指工具错误地将代码标记为存在问题。一般来说，静态分析工具的研究侧重于减少误判；实践中，开发者是否真正想要使用工具取决于“false positive”率是否很低——谁愿意在数百个虚假报告中费力寻找一些真实的报告？

Furthermore, perception is a key aspect of the false-positive rate. If a static analysis tool is producing warnings that are technically correct but misinterpreted by users as false positives (e.g., due to confusing messages), users will react the same as if those warnings were in fact false positives. Similarly, warnings that are technically correct but unimportant in the grand scheme of things provoke the same reaction. We call the user-perceived false-positive rate the “effective false positive” rate. An issue is an “effective false positive” if developers did not take some positive action after seeing the issue. This means that if an analysis incorrectly reports an issue, yet the developer happily makes the fix anyway to improve code readability or maintainability, that is not an effective false positive. For example, we have a Java analysis that flags cases in which a developer calls the contains method on a hash table (which is equivalent to containsValue) when they actually meant to call containsKey—even if the developer correctly meant to check for the value, calling containsValue instead is clearer. Similarly, if an analysis reports an actual fault, yet the developer did not understand the fault and therefore took no action, that is an effective false positive.

此外，用户感知是“false positive”率的一个关键方面。如果静态分析工具产生的警告在技术上是正确的，但被用户误解为误报（例如，由于告警消息混乱），用户的反应将与这些警告实际上是误报一样。类似地，技术上正确但在大局中不重要的警告也会引发同样的反应。我们将用户感知的误报率称为“有效误报率”。如果开发者在看到问题后没有采取积极的行动，那么问题就是“effective false positive”，这意味着，如果一个分析错误地报告了一个问题，但开发人员仍然乐于进行修复，以提高代码的可读性或可维护性，那么这就不是一个有效的误报。例如，我们有一个Java分析，它标记了这样一种情况：当开发人员实际上打算调用containsKey时，开发人员在哈希表（相当于containsValue）上调用contains方法，即使开发人员正确地打算检查值，调用containsValue反而更清晰。同样，如果分析报告了一个实际的故障，但开发人员不了解故障，因此没有采取任何行动，这就是一个“effective false positive”。

> [^4]:	Note that there are some specific analyses for which reviewers might be willing to tolerate a much higher false-positive rate: one example is security analyses that identify critical problems./
> 4 请注意，有一些特定的分析，审查员可能愿意容忍更高的误报率：一个例子是识别关键问题的安全分析。

### Make Static Analysis a Part of the Core Developer Workflow  使静态分析成为核心开发人员工作流程的一部分

At Google, we integrate static analysis into the core workflow via integration with code review tooling. Essentially all code committed at Google is reviewed before being committed; because developers are already in a change mindset when they send code for review, improvements suggested by static analysis tools can be made without too much disruption. There are other benefits to code review integration. Developers typically context switch after sending code for review, and are blocked on reviewers— there is time for analyses to run, even if they take several minutes to do so. There is also peer pressure from reviewers to address static analysis warnings. Furthermore, static analysis can save reviewer time by highlighting common issues automatically; static analysis tools help the code review process (and the reviewers) scale. Code review is a sweet spot for analysis results.[^5]

在谷歌，我们通过与代码审查工具集成，将静态分析集成到核心工作流中。基本上谷歌提交的所有代码在提交之前都会经过审查，因为开发人员在发送代码供审查时已经改变了心态，所以静态分析工具建议的改进可以在没有太多干扰的情况下进行。
代码审查集成还有其他好处，开发人员通常在发送代码进行审查后切换上下文，并且在审查者面前被阻止——即使需要几分钟的时间来运行分析。
来自评论者的同行压力也要求解决静态分析警告问题，此外，静态分析可以自动突出常见问题，从而节省审阅者的时间，这有助于代码评审过程（以及评审员）的规模化。代码评审是分析结果的最佳选择。

> [^5]:	See later in this chapter for more information on additional integration points when editing and browsing code./
> 5 关于编辑和浏览代码时的额外集成点的更多信息，请参见本章后面的内容。

###  Empower Users to Contribute  允许用户做出贡献

There are many domain experts at Google whose knowledge could improve code produced. Static analysis is an opportunity to leverage expertise and apply it at scale by having domain experts write new analysis tools or individual checks within a tool.

Google有许多领域专家，他们的知识可以改进生成的代码。静态分析创造了一个利用他们的专业知识并大规模应用的机会，即利用领域专家编写新的分析工具或在工具中进行单独检查。

For example, experts who know the context for a particular kind of configuration file can write an analyzer that checks properties of those files. In addition to domain experts, analyses are contributed by developers who discover a bug and would like to prevent the same kind of bug from reappearing anywhere else in the codebase. We focus on building a static analysis ecosystem that is easy to plug into instead of integrating a small set of existing tools. We have focused on developing simple APIs that can be used by engineers throughout Google—not just analysis or language experts— to create analyses; for example, Refaster[^6] enables writing an analyzer by specifying pre- and post-code snippets demonstrating what transformations are expected by that analyzer.

例如，了解特定类型配置文件上下文的专家可以编写一个分析器来检查这些文件的属性。除了领域专家之外，除了领域专家之外，发现bug并希望防止同类bug在代码库中的任何其他地方再次出现的开发人员也可以提供贡献。我们专注于构建一个易于插入的静态分析生态系统，而不是集成一小组现有工具。我们专注于开发简单的API，可供整个 Google 的工程师（不仅仅是分析或语言专家）用来创建分析；
例如，重构可以通过指定前后代码片段来编写分析器，来达到该分析器期望的效果。


> [^6]:	Louis Wasserman, “Scalable, Example-Based Refactorings with Refaster.” Workshop on Refactoring Tools, 2013./
> 6 Louis Wasserman，"用Refaster进行可扩展的、基于实例的重构"。重构工具研讨会，2013年。

## Tricorder: Google’s Static Analysis Platform  Tricorder：谷歌的静态分析平台
Tricorder, our static analysis platform, is a core part of static analysis at Google.[^7] Tricorder came out of several failed attempts to integrate static analysis with the developer workflow at Google;[^8] the key difference between Tricorder and previous attempts was our relentless focus on having Tricorder deliver only valuable results to its users. Tricorder is integrated with the main code review tool at Google, Critique. Tricorder warnings show up on Critique’s diff viewer as gray comment boxes, as demonstrated in [Figure 20-1](#_bookmark1812).

我们的静态分析平台 ricorder是Google静态分析的核心部分。Tricorder是在Google多次尝试将静态分析与开发人员工作流集成的失败尝试中诞生的，与之前尝试的主要区别在于 我们坚持不懈地致力于让Tricorder只为用户提供有价值的结果。
Tricorder与谷歌的主要代码审查工具Critique集成在一起。 Tricorder警告在Critique的差异查看器上显示为灰色的注释框，如图 20-1 所示。 

![Figure 20-1](./images/Figure%2020-1.png)

*Figure 20-1. Critique’s diff viewing, showing a static analysis warning from Tricorder in* *gray*  图20-1. Critique的diff查看，灰色显示了Tricorder的静态分析警告

To scale, Tricorder uses a microservices architecture. The Tricorder system sends analyze requests to analysis servers along with metadata about a code change. These servers can use that metadata to read the versions of the source code files in the change via a FUSE-based filesystem and can access cached build inputs and outputs. The analysis server then starts running each individual analyzer and writes the output to a storage layer; the most recent results for each category are then displayed in Critique. Because analyses sometimes take a few minutes to run, analysis servers also post status updates to let change authors and reviewers know that analyzers are running and post a completed status when they have finished. Tricorder analyzes more than 50,000 code review changes per day and is often running several analyses per second.

为了方便扩展，Tricorder使用微服务架构。 Tricorder系统将分析请求连同有关代码更改的元数据发送到分析服务器。这些服务器可以使用该元数据通过基于FUSE的文件系统读取更改中源代码文件的版本，并且可以访问缓存的构建输入和输出。然后分析服务器开始运行每个单独的分析器并将输出写入存储层。每个类别的最新结果随后会显示在Critique中。因为分析有时需要等几分钟，分析服务器也会发布状态更新，让代码作者和审阅者知道分析器正在运行，并在完成后发布完成状态。Tricorder每天分析超过50,000次代码审查更改，并且通常每秒运行多次分析。整个Google的开发人员编写Tricorder分析（称为“分析器”）或为现有分析贡献单独的“检查”。

Developers throughout Google write Tricorder analyses (called “analyzers”) or contribute individual “checks” to existing analyses. There are four criteria for new Tricorder checks:

- *Be understandable*  
	Be easy for any engineer to understand the output.
- *Be* *actionable* *and* *easy* *to* *fix*  
	The fix might require more time, thought, or effort than a compiler check, and the result should include guidance as to how the issue might indeed be fixed.
- *Produce less than 10% effective false positives*  
	Developers should feel the check is pointing out an actual issue [at least 90% of](https://oreil.ly/ARSzt) [the time](https://oreil.ly/ARSzt).
- *Have* *the potential for significant impact on code quality*  
	The issues might not affect correctness, but developers should take them seriously and deliberately choose to fix them.

Tricorder 检查有四个标准：
- *易于理解*  
​	任何工程师都可以轻松理解输出。
- *可操作且易于修复*  
​	与编译器检查相比，修复可能需要更多的时间、思考或尝试，结果应包括有关如何真正修复问题的指导。
- *少于10%的有效误报*  
​	开发人员应该觉得检查至少在90%的时间里指出了实际问题。
- *有可能对代码质量产生重大影响*  
​	这些问题可能不会影响正确性，但开发人员应该认真对待它们并有意识地选择修复它们。

Tricorder analyzers report results for more than 30 languages and support a variety of analysis types. Tricorder includes more than 100 analyzers, with most being contributed from outside the Tricorder team. Seven of these analyzers are themselves plug-in systems that have hundreds of additional checks, again contributed from developers across Google. The overall effective false-positive rate is just below 5%.

Tricorder分析仪报告支持30种语言，并支持多种分析类型。Tricorder包括100多个分析器，其中大部分来自Tricorder团队外部。 其中七个分析器本身就是插件系统，具有数百项额外检查，由 Google 的开发人员提供，总体“effective false-positive”略低于 5%。

> [^7]:	Caitlin Sadowski, Jeffrey van Gogh, Ciera Jaspan, Emma Söderberg, and Collin Winter, Tricorder: Building a Program Analysis Ecosystem, International Conference on Software Engineering (ICSE), May 2015./
> 7  Caitlin Sadowski, Jeffrey van Gogh, Ciera Jaspan, Emma Söderberg, and Collin Winter, Tricorder: 构建一个程序分析生态系统，国际软件工程会议（ICSE），2015年5月。
> 
> [^8]:	Caitlin Sadowski, Edward Aftandilian, Alex Eagle, Liam Miller-Cushon, and Ciera Jaspan, “Lessons from Building Static Analysis Tools at Google”, Communications of the ACM, 61 No. 4 (April 2018): 58–66, https:// cacm.acm.org/magazines/2018/4/226371-lessons-from-building-static-analysis-tools-at-google/fulltext./
> Caitlin Sadowski, Edward Aftandilian, Alex Eagle, Liam Miller-Cushon, and Ciera Jaspan, “Lessons from Building Static Analysis Tools at Google”, ACM通讯期刊, 61 No. 4 (April 2018): 58–66, https:// cacm.acm.org/magazines/2018/4/226371-lessons-from-building-static-analysis-tools-at-google/fulltext.


### Integrated Tools  集成工具
There are many different types of static analysis tools integrated with Tricorder.

Tricorder 集成了许多不同类型的静态分析工具。Error Prone 和 clang-tidy 扩展了编译器以分别识别 Java 和 C++ 的 AST 反模式。 这些反模式可能代表真正的错误。

[Error Prone ](http://errorprone.info/)and [clang-tidy ](https://oreil.ly/DAMiv)extend the compiler to identify AST antipatterns for Java and C++, respectively. These antipatterns could represent real bugs. For example, consider the following code snippet hashing a field f of type long:

result = 31 * result + (int) (f ^ (f >>> 32));

例如，考虑以下代码片段散列 long 类型的字段 f：
result = 31 * result + (int) (f ^ (f >>> 32));

Now consider the case in which the type of f is int. The code will still compile, but the right shift by 32 is a no-op so that f is XORed with itself and no longer affects the value produced. We fixed 31 occurrences of this bug in Google’s codebase while enabling the check as a compiler error in Error Prone. There are [many more such exam‐](https://errorprone.info/bugpatterns) [ples](https://errorprone.info/bugpatterns). AST antipatterns can also result in code readability improvements, such as removing a redundant call to .get() on a smart pointer.

现在考虑f的类型是int的情况，代码仍然可以编译，但是右移32是空操作，因此 f 与自身进行异或，不再影响产生的值。我们修复了 Google 代码库中出现的 31 次该错误，同时在 Error Prone 中将检查作为编译器错误启用。这样的例子还有很多。 AST 反模式还可以提高代码的可读性，例如删除对智能指针的 .get() 的冗余调用。

Other analyzers showcase relationships between disparate files in a corpus. The Deleted Artifact Analyzer warns if a source file is deleted that is referenced by other non-code places in the codebase (such as inside checked-in documentation). IfThisThenThat allows developers to specify that portions of two different files must be changed in tandem (and warns if they are not). Chrome’s Finch analyzer runs on configuration files for A/B experiments in Chrome, highlighting common problems including not having the right approvals to launch an experiment or crosstalk with other currently running experiments that affect the same population. The Finch analyzer makes Remote Procedure Calls (RPCs) to other services in order to provide this information.

其他分析器展示了语料库中不同文件之间的关系。如果删除了代码库中其他非代码位置（例如签入文档中）引用的源文件，Deleted Artifact Analyzer 会发出警告。 IfThis-ThenThat 允许开发人员指定两个不同文件的部分必须同时更改（如果不是，则发出警告）。 Chrome 的 Finch 分析器在 Chrome 中的 A/B 实验的配置文件上运行，突出显示常见问题，包括未获得启动实验的正确批准或与影响同一人群的其他当前正在运行的实验串扰。 Finch 分析器对其他服务进行远程过程调用 (RPC) 以提供此信息。

In addition to the source code itself, some analyzers run on other artifacts produced by that source code; many projects have enabled a binary size checker that warns when changes significantly affect a binary size.

除了源代码本身之外，一些分析器还可以在该源代码生成的其他工件上运行；许多项目启用了二进制大小检查器，当更改显着影响二进制大小时会发出警告。

Almost all analyzers are intraprocedural, meaning that the analysis results are based on code within a procedure (function). Compositional or incremental interprocedural analysis techniques are technically feasible but would require additional infrastructure investment (e.g., analyzing and storing method summaries as analyzers run).

几乎所有分析器都是过程内的，这意味着分析结果基于过程（函数）内的代码。组合或增量过程间分析技术在技术上是可行的，但需要额外的基础设施投资（例如，在分析器运行时分析和存储方法摘要）。
### Integrated Feedback Channels  集成反馈渠道

As mentioned earlier, establishing a feedback loop between analysis consumers and analysis writers is critical to track and maintain developer happiness. With Tricorder, we display the option to click a “Not useful” button on an analysis result; this click provides the option to file a bug *directly against the analyzer writer* about why the result is not useful with information about analysis result prepopulated. Code reviewers can also ask change authors to address analysis results by clicking a “Please fix” button. The Tricorder team tracks analyzers with high “Not useful” click rates, particularly relative to how often reviewers ask to fix analysis results, and will disable analyzers if they don’t work to address problems and improve the “not useful” rate. Establishing and tuning this feedback loop took a lot of work, but has paid dividends many times over in improved analysis results and a better user experience (UX)— before we established clear feedback channels, many developers would just ignore analysis results they did not understand.

如上所述，建立分析者和作者之间反馈闭环对于跟踪和维护开发人员的成就感很重要。Tricorder会在分析结果上显示单击“无用”按钮的选项，此按钮提供了针对分析器编写器提交错误的选项，说明了为什么分析结果信息无用，代码审查员还可以通过单击“请修复”按钮要求变更作者处理分析结果。 Tricorder团队跟踪“无用”按钮点击率高的分析器，特别是与审阅者要求修复分析结果的频率有关，如果分析器不能解决问题并改进“无用”，则会禁用分析器。建立和调整这个反馈闭环需要大量工作，但在改进分析结果和更好的用户体验 (UX) 方面已经获得了很大的回报——在我们建立清晰的反馈渠道之前，许多开发人员会忽略他们不理解的分析结果.

And sometimes the fix is pretty simple—such as updating the text of the message an analyzer outputs! For example, we once rolled out an Error Prone check that flagged when too many arguments were being passed to a printf-like function in Guava that accepted only %s (and no other printf specifiers). The Error Prone team received weekly “Not useful” bug reports claiming the analysis was incorrect because the number of format specifiers matched the number of arguments—all due to users trying to pass specifiers other than %s. After the team changed the diagnostic text to state directly that the function accepts only the %s placeholder, the influx of bug reports stopped. Improving the message produced by an analysis provides an explanation of what is wrong, why, and how to fix it exactly at the point where that is most relevant and can make the difference for developers learning something when they read the message.

有时修复非常简单，例如更新分析器输出的消息文本。 我们曾经推出了一个容易出错的检查，当太多参数被传递给Guava中的类似printf的函数时，该检查只接受%s(并且不接受其他printf说明符）。Error Prone团队每周都会收到“无用”的错误报告，声称分析不正确，因为格式说明符的数量与参数的数量相匹配——所有这些都是由于用户试图传递除 %s 之外的说明符。在团队将诊断文本更改为直接声明该函数仅接受 %s 占位符后，错误报告的涌入停止了。 改进分析产生的消息可以解释什么是错误的、为什么以及如何在最相关的点上准确地修复它，并且可以对开发人员在阅读消息时学习一些东西产生影响。

###  Suggested Fixes  建议的修复

Tricorder checks also, when possible, *provide fixes*, as shown in [Figure 20-2](#_bookmark1825).

Tricorder 检查也会在可能的情况下提供修复，如图 20-2 所示。

![Figure 20-2](./images/Figure%2020-2.png)

*Figure 20-2. View of an example static analysis fix in Critique*  图20-2. Critique中静态分析修复的例子视图

Automated fixes serve as an additional documentation source when the message is unclear and, as mentioned earlier, reduce the cost to addressing static analysis issues. Fixes can be applied directly from within Critique, or over an entire code change via a command-line tool. Although not all analyzers provide fixes, many do. We take the approach that *style* issues in particular should be fixed automatically; for example, by formatters that automatically reformat source code files. Google has style guides for each language that specify formatting issues; pointing out formatting errors is not a good use of a human reviewer’s time. Reviewers click “Please Fix” thousands of times per day, and authors apply the automated fixes approximately 3,000 times per day. And Tricorder analyzers received “Not useful” clicks 250 times per day.

当反馈消息不清晰时，自动修复可作为额外的文档来源，并且可以降低解决静态分析问题的成本。 修复可以直接应用Critique中，也可以通过命令行工具应用于整个代码更改。并非所有分析器都提供修复，但很多都有。 我们的做法是，优先自动修复样式问题， 例如，通过自动重新格式化源代码文件的格式化程序。谷歌有每种语言的风格指南，规定了各种语言的格式，但指出格式错误并不能很好地利用审阅者的时间。审核者每天点击数千次“请修复”，作者每天应用自动修复大约3000次，Tricorder分析器每天收到250次“无用”点击

###  Per-Project Customization  按项目定制

After we had built up a foundation of user trust by showing only high-confidence analysis results, we added the ability to run additional “optional” analyzers to specific projects in addition to the on-by-default ones. The *Proto Best Practices* analyzer is an example of an optional analyzer. This analyzer highlights potentially breaking data  format changes to [protocol buffers](https://developers.google.com/protocol-buffers)—Google’s language-independent data serialization format. These changes are only breaking when serialized data is stored somewhere (e.g., in server logs); protocol buffers for projects that do not have stored serialized data do not need to enable the check. We have also added the ability to customize existing analyzers, although typically this customization is limited, and many checks are applied by default uniformly across the codebase.

在通过仅显示高置信度分析结果建立用户信任基础后，除了默认启用的分析器之外，我们还添加了对特定项目运行其他“可选”分析器的能力。 比如Proto Best Practices 分析器，此分析器突出显示潜在的破坏性数据协议缓冲区的格式更改——Google 的独立于语言的数据序列化格式。只有当序列化的数据存储在某个地方（例如，在服务器日志中）时，这些更改才会中断；没有存储序列化数据的项目的协议缓冲区不需要启用检查。我们还添加了自定义现有分析器的功能，尽管这种自定义功能很有限，并且默认情况下，许多检查在代码库中统一应用。

Some analyzers have even started as optional, improved based on user feedback, built up a large userbase, and then graduated into on-by-default status as soon as we could capitalize on the user trust we had built up. For example, we have an analyzer that suggests Java code readability improvements that typically do not actually change code behavior. Tricorder users initially worried about this analysis being too “noisy,” but eventually wanted more analysis results available.

一些分析器甚至一开始是可选的，根据用户反馈进行改进，建立了庞大的用户群，然后一旦我们可以利用我们建立的用户信任，就进入默认状态。例如，我们有一个分析器，它建议 Java 代码可读性改进，这些改进通常不会真正改变代码行为。Tricorder用户最初担心这种分析过于“嘈杂”，但最终希望获得更多的分析结果。

The key insight to making this customization successful was to focus on *project-level* *customization, not user-level customization*. Project-level customization ensures that all team members have a consistent view of analysis results for their project and prevents situations in which one developer is trying to fix an issue while another developer introduces it.

这种定制成功的关键是专注于项目定制，而不是用户级定制。项目级定制确保所有团队成员对其项目的分析结果有一致的看法，并减少一个开发人员试图解决问题而需要另一位开发人员介绍的情况。

Early on in the development of Tricorder, a set of relatively straightforward style checkers (“linters”) displayed results in Critique, and Critique provided user settings to choose the confidence level of results to display and suppress results from specific analyses. We removed all of this user customizability from Critique and immediately started getting complaints from users about annoying analysis results. Instead of reenabling customizability, we asked users why they were annoyed and found all kinds of bugs and false positives with the linters. For example, the C++ linter also ran on Objective-C files but produced incorrect, useless results. We fixed the linting infrastructure so that this would no longer happen. The HTML linter had an extremely high false-positive rate with very little useful signal and was typically suppressed from view by developers writing HTML. Because the linter was so rarely helpful, we just disabled this linter. In short, user customization resulted in hidden bugs and suppressing feedback.

Tricorder开发的早期，Critique展示了一组相对简单的样式检查器（“linter”），Critique提供了用户设置来选择结果的置信度以显示和抑制来自特定分析的结果。我们从 Critique 中删除了所有这些用户可定制性，并立即开始收到用户对烦人的分析结果的投诉。我们没有重新启用可定制性，而是询问用户为什么他们感到恼火，并发现 linter 存在各种错误和误报。
例如，C++ linter 也在 Objective-C 文件上运行，但产生了不正确、无用的结果。我们修复了 linting 基础设施，这样就不会再发生这种情况了。 HTML linter 的误报率非常高，有用的信号很少，并且通常被编写 HTML 的开发人员禁止查看。因为 linter 很少有帮助，所以我们只是禁用了这个 linter。简而言之，用户定制导致隐藏的错误和抑制反馈。

###  Presubmits  预提交

In addition to code review, there are also other workflow integration points for static analysis at Google. Because developers can choose to ignore static analysis warnings displayed in code review, Google additionally has the ability to add an analysis that blocks committing a pending code change, which we call a *presubmit check*. Presubmit checks include very simple customizable built-in checks on the contents or metadata of a change, such as ensuring that the commit message does not say “DO NOT SUBMIT” or that test files are always included with corresponding code files. Teams can also specify a suite of tests that must pass or verify that there are no Tricorder  issues for a particular category. Presubmits also check that code is well formatted. Presubmit checks are typically run when a developer mails out a change for review and again during the commit process, but they can be triggered on an ad hoc basis in between those points. See [Chapter 23 ](#_bookmark2022)for more details on presubmits at Google.

除了代码审查之外，谷歌还有其他用于静态分析的工作流集成点。由于开发人员可以选择忽略代码审查中显示的静态分析警告，谷歌还可以添加一个分析来阻止提交待处理的代码更改，我们称之为提交前检查。提交前检查包括对更改的内容或元数据的非常简单的可定制的内置检查，例如确保提交消息没有说“不要提交”或测试文件始终包含在相应的代码文件中。团队还可以指定一组测试，这些测试必须通过或验证特定类别没有 Tricorder 问题。预提交还会检查代码是否格式正确。提交前检查通常在开发人员邮寄更改以供审核时运行，并在提交过程中再次运行，但它们可以在这些点之间临时触发。有关 Google 预提交的更多详细信息，请参阅第 23 章。

Some teams have written their own custom presubmits. These are additional checks on top of the base presubmit set that add the ability to enforce higher best-practice standards than the company as a whole and add project-specific analysis. This enables new projects to have stricter best-practice guidelines than projects with large amounts of legacy code (for example). Team-specific presubmits can make the large- scale change (LSC) process (see [Chapter 22](#_bookmark1935)) more difficult, so some are skipped for changes with “CLEANUP=” in the change description.

一些团队已经编写了自己的自定义预提交。这些是在基本预提交集之上的额外检查，增加了执行比整个公司更高的最佳实践标准的能力，并添加了特定于项目的分析。这使得新项目比拥有大量遗留代码的项目（例如）拥有更严格的最佳实践指南。团队特定的预提交会使大规模变更 (LSC) 过程（参见第 22 章）更加困难，因此在变更描述中带有“CLEANUP=”的变更会被跳过。

###  Compiler Integration 编译器集成

Although blocking commits with static analysis is great, it is even better to notify developers of problems even earlier in the workflow. When possible, we try to push static analysis into the compiler. Breaking the build is a warning that is not possible to ignore, but is infeasible in many cases. However, some analyses are highly mechanical and have no effective false positives. An example is [Error Prone “ERROR” checks](https://errorprone.info/bugpatterns). These checks are all enabled in Google’s Java compiler, preventing instances of the error from ever being introduced again into our codebase. Compiler checks need to be fast so that they don’t slow down the build. In addition, we enforce these three criteria (similar criteria exist for the C++ compiler):
- Actionable and easy to fix (whenever possible, the error should include a suggested fix that can be applied mechanically)
- Produce no effective false positives (the analysis should never stop the build for correct code)
- Report issues affecting only correctness rather than style or best practices

尽管使用静态分析阻止提交很好用，但最好在工作流程的早期通知开发人员问题。 如果可以的话，我们会尝试将静态分析推送到编译器中。 破坏构建是一个不可忽视的警告，但在许多情况下是不可行的。然而，一些分析是高度机械化的，没有有效的误报。 一个例子是容易出错的“错误”检查， 这些检查都在 Google 的 Java 编译器中启用，防止错误实例再次被引入我们的代码库， 编译器检查需要快速，以免减慢构建速度。
此外，我们强制执行这三个标准（C++ 编译器也存在类似的标准）：

- 可操作且易于修复（只要可能，错误应包括可机械应用的建议修复）
- 不产生有效的误报（分析不应停止生成正确的代码）
- 报告仅影响正确性而非风格或最佳实践的问题

To enable a new check, we first need to clean up all instances of that problem in the codebase so that we don’t break the build for existing projects just because the compiler has evolved. This also implies that the value in deploying a new compiler-based check must be high enough to warrant fixing all existing instances of it. Google has infrastructure in place for running various compilers (such as clang and javac) over the entire codebase in parallel via a cluster—as a MapReduce operation. When compilers are run in this MapReduce fashion, the static analysis checks run must produce fixes in order to automate the cleanup. After a pending code change is prepared and tested that applies the fixes across the entire codebase, we commit that change and remove all existing instances of the problem. We then turn the check on in the compiler so that no new instances of the problem can be committed without breaking the build. Build breakages are caught after commit by our Continuous Integration (CI) system, or before commit by presubmit checks (see the earlier discussion).

要启用新的检查，我们首先需要清理代码库中该问题的所有实例，这样我们就不会因为编译器的发展而破坏现有项目的构建。这也意味着部署新的基于编译器的检查的价值必须足够高，以保证修复它的所有现有实例。Google 有基础设施，可以通过集群在整个代码库上并行运行各种编译器（例如 clang 和 javac）——作为 MapReduce 操作。当编译器以这种 MapReduce 方式运行时，运行的静态分析检查必须产生修复以自动进行清理。在准备好并测试了在整个代码库中应用修复的待处理代码更改后，我们提交该更改并删除所有现有的问题实例。然后我们在编译器中打开检查，这样就不会在不破坏构建的情况下提交问题的新实例。在我们的持续集成 (CI) 系统提交之后，或者在提交之前通过预提交检查（参见前面的讨论）捕获构建损坏。

We also aim to never issue compiler warnings. We have found repeatedly that developers ignore compiler warnings. We either enable a compiler check as an error (and break the build) or don’t show it in compiler output. Because the same compiler flags are used throughout the codebase, this decision is made globally. Checks that can’t be made to break the build are either suppressed or shown in code review (e.g., through Tricorder). Although not every language at Google has this policy, the most frequently used ones do. Both of the Java and C++ compilers have been configured to avoid displaying compiler warnings. The Go compiler takes this to extreme; some things that other languages would consider warnings (such as unused variables or package imports) are errors in Go.

我们的目标是永远不会发出编译器警告，但是我们不断的发现开发人员会忽略编译器警告，要么启用编译器检查作为错误（并中断构建），要么不在编译器输出中显示它。因为在整个代码库中使用相同的编译器标志，所以这个决定是全局做出的。无法破坏构建的检查要么被抑制，要么在代码审查中显示（例如，通过 Tricorder）。尽管并非 Google 的所有语言都有此策略，但最常用的语言都有。Java 和 C++ 编译器都已配置为避免显示编译器警告，Go 编译器将这一点做的很好，因为在其他语言中会考虑警告的一些事情（例如未使用的变量或包导入），在 Go 中是错误的。

### Analysis While Editing and Browsing Code  编辑和浏览代码时分析

Another potential integration point for static analysis is in an integrated development environment (IDE). However, IDE analyses require quick analysis times (typically less than 1 second and ideally less than 100 ms), and so some tools are not suitable to integrate here. In addition, there is the problem of making sure the same analysis runs identically in multiple IDEs. We also note that IDEs can rise and fall in popularity (we don’t mandate a single IDE); hence IDE integration tends to be messier than plugging into the review process. Code review also has specific benefits for displaying analysis results. Analyses can take into account the entire context of the change; some analyses can be inaccurate on partial code (such as a dead code analysis when a function is implemented before adding callsites). Showing analysis results in code review also means that code authors have to convince reviewers as well if they want to ignore analysis results. That said, IDE integration for suitable analyses is another great place to display static analysis results.

静态分析的另一个集成点是集成开发环境 (IDE)。但是，IDE 分析需要快速的分析时间（通常小于 1 秒，理想情况下小于 100 毫秒），因此某些工具不适合在这里集成，此外，还存在确保相同分析在多个 IDE 中以相同方式运行的问题。我们还发现 IDE 的受欢迎程度可能会上升或下降（我们不强制要求单一的 IDE），因此 IDE 集成往往比插入审查过程更混乱。
代码审查还具有显示分析结果的特定好处。分析可以考虑变更的整个背景，某些对部分代码点分析可能不准确（例如，在添加调用点之前实现函数时的死代码分析）。在代码审查中显示分析结果也意味着如果代码作者想忽略分析结果，他们也必须通过审查。也就是说，IDE集成进行适当的分析是显示静态分析结果的一个不错的集成点。

Although we mostly focus on showing newly introduced static analysis warnings, or warnings on edited code, for some analyses, developers actually do want the ability to view analysis results over the entire codebase during code browsing. An example of this are some security analyses. Specific security teams at Google want to see a holistic view of all instances of a problem. Developers also like viewing analysis results over the codebase when planning a cleanup. In other words, there are times when showing results when code browsing is the right choice.

尽管我们主要关注显示新引入的静态分析警告或编辑代码的警告，但对于某些分析，开发人员实际上确实希望能够在代码浏览期间查看整个代码库的分析结果。这方面的例子是一些安全分析。 Google 的特定安全团队希望查看所有问题实例的整体视图。开发人员还喜欢在计划清理时通过代码库查看分析结果。换句话说，有时显示结果时，代码浏览是正确的选择。

## Conclusion  总结

Static analysis can be a great tool to improve a codebase, find bugs early, and allow more expensive processes (such as human review and testing) to focus on issues that are not mechanically verifiable. By improving the scalability and usability of our static analysis infrastructure, we have made static analysis an effective component of software development at Google.

静态分析是一个很好的工具，可以改进代码库，尽早发现错误，并允许成本更高的过程（如人工审查和测试）聚焦在无法通过机械方式验证的问题。通过提高静态分析基础设施的可扩展性和可用性，我们使静态分析成为谷歌软件开发的有效组成部分。

## 内容提要

- *Focus on developer happiness*. We have invested considerable effort in building feedback channels between analysis users and analysis writers in our tools, and aggressively tune analyses to reduce the number of false positives.

- *Make static analysis part of the core developer workflow*. The main integration point for static analysis at Google is through code review, where analysis tools provide fixes and involve reviewers. However, we also integrate analyses at additional points (via compiler checks, gating code commits, in IDEs, and when browsing code).

- *Empower users to contribute*. We can scale the work we do building and maintaining analysis tools and platforms by leveraging the expertise of domain experts. Developers are continuously adding new analyses and checks that make their lives easier and our codebase better.

- 关注开发者的幸福感。我们投入了大量精力，在我们的工具中建立分析用户和作者之间的反馈渠道，并积极调整分析以减少误报的数量。
- 将静态分析作为核心开发人员工作流程的一部分。谷歌静态分析的主要集成点是通过代码评审，在这里，分析工具提供修复并让评审人员参与。然而，我们也在其他方面（通过编译器检查、选通代码提交、在IDE中以及在浏览代码时）集成分析。
- 授权用户做出贡献。通过利用领域专家的专业知识，我们可以扩展构建和维护分析工具和平台的工作。开发人员不断添加新的分析和检查，使他们的生活更轻松，使我们的代码库更好。
