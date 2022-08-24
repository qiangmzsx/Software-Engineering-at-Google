**CHAPTER 17**

# Code Search

# 第十七章 代码搜索

**Written by Alexander Neubeck and Ben St. John**

**Edited by Lisa Carey**

Code Search is a tool for browsing and searching code at Google that consists of a frontend UI and various backend elements. Like many of the development tools at Google, it arose directly out of a need to scale to the size of the codebase. Code Search began as a combination of a grep-type tool[^1] for internal code with the ranking and UI of external Code Search[^2]. Its place as a key tool for Google developers was cemented by the integration of Kythe/Grok[^3], which added cross-references and the ability to jump to symbol definitions.

代码搜索是用于在 Google 内部浏览和搜索代码的工具，它由一个前端 UI 页面和各种后端组件组成。就像Google的许多开发工具一样，它直接源于代码库规模的需求。代码搜索开始是类似于 grep 类型工具的组合，用于带有排名和 UI 的内部代码外部代码搜索。通过 Kythe/Grok 的整合，它作为 Google 开发人员的关键工具的地位得到巩固，他们增加了交叉引用和跳转到符号定义的能力。

That integration changed its focus from searching to browsing code, and later development of Code Search was partly guided by a principle of “answering the next question about code in a single click.”Now such questions as “Where is this symbol defined?”, “Where is it used?”, “How do I include it?”, “When was it added to the codebase?”, and even ones like “Fleet-wide, how many CPU cycles does it consume?” are all answerable with one or two clicks.

这种集成将重点从搜索转移到浏览代码，后来代码搜索的发展部分遵循“单击回答下一个关于代码的问题”的原则。现在诸如“这个符号在哪里定义？”，“它在哪里使用？”、“我如何包含它？”、“它是什么时候添加到代码库中的？”，甚至像“Fleet-wide，它消耗多少 CPU 周期？”之类的问题。只需单击一两次即可得到答案。

In contrast to integrated development environments (IDEs) or code editors, Code Search is optimized for the use case of reading, understanding, and exploring code at scale. To do so, it relies heavily on cloud based backends for searching content and resolving cross-references. 

与集成开发环境 (IDE) 或代码编辑器相比，代码搜索针对大规模阅读、理解和探索代码的用例进行了优化。为此，它严重依赖基于云的后端来搜索内容和解决交叉引用。

In this chapter, we’ll look at Code Search in more detail, including how Googlers use it as part of their developer workflows, why we chose to develop a separate web tool for code searching, and examine how it addresses the challenges of searching and browsing code at Google repository scale. 

在本章中，我们将更详细地了解代码搜索，包括 Google 员工如何将其作为开发人员工作流程的一部分，为什么我们选择开发一个单独的网络工具来进行代码搜索，并研究它如何在 Google 存储库规模下解决搜索和浏览代码问题。

> [^1]: GSearch originally ran on Jeff Dean’s personal computer, which once caused company-wide distress when he went on vacation and it was shut down!/
> 1 GSearch最初在Jeff Dean的个人电脑上运行，当他去度假时，曾经引起全公司的困扰。
他去度假时，这台电脑就被关闭了！这曾经造成了整个公司的困扰。
> 
> [^2]: Shut down in 2013; see https://en.wikipedia.org/wiki/Google_Code_Search./
> 2 在2013年关闭；见https://en.wikipedia.org/wiki/Google_Code_Search。
>
> [^3]: Now known as Kythe, a service that provides cross-references (among other things): the uses of a particular code symbol—for example, a function—using the full build information to disambiguate it from other ones with the same name./
> 3 现在被称为Kythe，一个提供交叉引用的服务（除其他外）：一个特定的代码符号的用途--例如，一个函数--使用完整的构建信息，将其与其他同名的符号区分开来。

## The Code Search UI 

## 代码搜索用户界面

The search box is a central element of the Code Search UI (see Figure 17-1), and like web search, it has “suggestions” that developers can use for quick navigation to files, symbols, or directories. For more complex use cases, a results page with code snippets is returned. The search itself can be thought of as an instant “find in files” (like the Unix grep command) with relevance ranking and some code-specific enhancements like proper syntax highlighting, scope awareness, and awareness of comments and string literals. Search is also available from the command line and can be incorporated into other tools via a Remote Procedure Call (RPC) API. This comes in handy when post-processing is required or if the result set is too large for manual inspection.

搜索框是代码搜索 UI 的中心元素（见图 17-1），与 Web 搜索一样，它有“建议”，开发人员可以使用这些“建议”快速导航到文件、符号或目录。对于更复杂的用例，将返回带有代码片段的结果页面。搜索本身可以被认为是即时的“在文件中查找”（如 Unix grep 命令），具有相关性排名和一些特定于代码的增强功能，如正确的语法突出显示、范围感知以及注释和字符串文字的感知。搜索也可以在命令行使用，并且可以通过远程过程调用 (RPC) API 并入其他工具。当需要事后处理或结果集太大而无法手动检查时，这会派上用场。

![Figure 17-1](./images/Figure%2017-1.png)

When viewing a single file, most tokens are clickable to let the user quickly navigate to related information. For example, a function call will link to its function definition, an imported filename to the actual source file, or a bug ID in a comment to the corresponding bug report. This is powered by compiler-based indexing tools like Kythe. Clicking the symbol name opens a panel with all the places the symbol is used. Similarly, hovering over local variables in a function will highlight all occurrences of that variable in the implementation. 

查看单个文件时，大多数标记都是可单击的，以便用户快速导航到相关信息。例如，函数调用将链接到其函数定义、导入的文件名到实际源文件，或相应错误报告注释中的错误 ID。这由 Kythe 等基于编译器的索引工具提供支持。单击符号名称会打开一个面板，其中包含使用该符号的所有位置。同样，将鼠标悬停在函数中的局部变量上将突出显示该变量在实现中的所有出现。

Code Search also shows the history of a file, via its integration with Piper (see Chapter 16). This means seeing older versions of the file, which changes have affected it,  who wrote them, jumping to them in Critique (see Chapter 19), diffing versions of files, and the classic “blame” view if desired. Even deleted files can be seen from a directory view. 

代码搜索还可以显示文件的历史记录，通过与 Piper 的集成（参见第 16 章）。这意味着查看文件的旧版本，哪些更改影响了它，谁编写了它们，在 Critique 中跳转到它们（参见第 19 章），区分文件的版本，以及经典的“blame”视图（如果需要）。甚至可以从目录视图中看到已删除的文件。

## How Do Googlers Use Code Search? 

## Google 员工如何使用代码搜索？

Although similar functionality is available in other tools, Googlers still make heavy use of the Code Search UI for searching and file viewing and ultimately for understanding code.[^4] The tasks engineers try to complete with Code Search can be thought of answering questions about code, and recurring intents become visible.[^5]

尽管其他工具中也有类似的功能，但 Google 员工仍然大量使用代码搜索 UI 进行搜索和文件查看，并最终用于理解代码。工程师尝试使用代码搜索完成任务被认为是回答有关代码的问题，以及重复的意图变得可见。

> [^4]: There is an interesting virtuous cycle that a ubiquitous code browser encourages: writing code that is easy to browse. This can mean things like not nesting hierarchies too deep, which requires many clicks to move from call sites to actual implementation, and using named types rather than generic things like strings or integers, because it’s then easy to find all usages./
> 4 无处不在的代码浏览器鼓励一个有趣的良性循环：编写易于浏览的代码。这可能意味着不要把层次嵌套得太深，因为这需要多次点击才能从调用站点转移到实际的实现；使用命名的类型而不是像字符串或整数这样的通用类型，因为这样就很容易找到所有的用法。
> 
> [^5]: Sadowski, Caitlin, Kathryn T. Stolee, and Sebastian Elbaum. “How Developers Search for Code: A Case Study” In Proceedings of the 2015 10th Joint Meeting on Foundations of Software Engineering (ESEC/FSE 2015). https://doi.org/10.1145/2786805.2786855./
>  5 Sadowski, Caitlin, Kathryn T. Stolee, and Sebastian Elbaum. "开发者如何搜索代码。A Case Study" In Proceedings of the 2015 10th Joint Meeting on Foundations of Software Engineering (ESEC/FSE 2015). https://doi.org/10.1145/2786805.2786855./

### Where?

### 哪里？

About 16% of Code Searches try to answer the question of where a specific piece of information exists in the codebase; for example, a function definition or configuration, all usages of an API, or just where a specific file is in the repository. These questions are very targeted and can be very precisely answered with either search queries or by following semantic links, like “jump to symbol definition.” Such questions often arise during larger tasks like refactorings/cleanups or when collaborating with other engineers on a project. Therefore, it is essential that these small knowledge gaps are addressed efficiently.  

大约 16% 的代码搜索试图解答特定信息在代码库中的位置的问题；例如，函数定义或配置、API 的所有用法，或者特定文件在存储库中的位置。这些问题非常有针对性，可以通过搜索查询或遵循语义链接（例如“跳转到符号定义”）来非常精确地回答。此类问题经常出现在重构/清理等大型任务中，或者在与其他工程师合作进行项目时。因此，有效解决这些小的知识差距至关重要。

Code Search provides two ways of helping: ranking the results, and a rich query language. Ranking addresses the common cases, and searches can be made very specific (e.g., restricting code paths, excluding languages, only considering functions) to deal with rarer cases. 

代码搜索提供了两种帮助方式：对结果进行排名，以及丰富的查询语言。排名解决了常见问题，并且可以进行非常具体的搜索（例如，限制代码路径，排除语言，仅考虑功能）以处理罕见情况。

The UI makes it easy to share a Code Search result with colleagues. So, for code reviews, you can simply include the link—for example, “Have you considered using this specialized hash map: cool_hash.h? This is also very useful for documentation, in bug reports, and in postmortems and is the canonical way of referring to code within Google. Even older versions of the code can be referenced, so links can stay valid as the codebase evolves. 

用户界面让同事之间共享代码搜索结果变得容易。因此，对于代码审查，您可以简单地包含链接—例如，“您是否考虑过使用这个专门的哈希映射：cool_hash.h？这对于文档、错误报告和事后分析也非常有用，并且是在 Google 中引用代码的规范方式。甚至可以引用旧版本的代码，因此链接可以随着代码库的发展而保持有效。

### What?

### 什么？

Roughly one quarter of Code Searches are classic file browsing, to answer the question of what a specific part of the codebase is doing. These kinds of tasks are usually more exploratory, rather than locating a specific result. This is using Code Search to read the source, to better understand code before making a change, or to be able to understand someone else’s change.  

大约四分之一的代码搜索是典型的文件浏览，回答代码特定部分在做什么的问题。这些类型的任务通常更具探索性，而不是定位特定的结果。使用代码搜索来阅读源代码，以便在进行更改之前更好地理解代码，或者能够理解其他人的更改。

To ease these kinds of tasks, Code Search introduced browsing via call hierarchies and quick navigation between related files (e.g., between header, implementation, test, and build files). This is about understanding code by easily answering each of the many questions a developer has when looking at it. 

为了简化这些类型的任务，代码搜索引入了调用层次结构浏览和相关文件之间的快速导航（例如，在标题、实现、测试和构建文件之间）。通过回答开发人员在查看代码时遇到的许多问题来理解代码。

### How?

### 如何做？

The most frequent use case—about one third of Code Searches—are about seeing examples of how others have done something. Typically, a developer has already found a specific API (e.g., how to read a file from remote storage) and wants to see how the API should be applied to a particular problem (e.g., how to set up the remote connection robustly and handle certain types of errors). Code Search is also used to find the proper library for specific problems in the first place (e.g., how to compute a fingerprint for integer values efficiently) and then pick the most appropriate implementation. For these kinds of tasks, a combination of searches and cross-reference browsing are typical. 

最常见的用例—大约三分之一的代码搜索是关于查看其他人如何做某事的示例。通常，开发人员已经找到了特定的 API（例如，如何从远程存储中读取文件）并希望了解如何将 API 应用于特定问题（例如，如何稳健地建立远程连接并处理某些问题）。代码搜索还用于首先为特定问题找到合适的库（例如，如何有效地计算整数值的指纹），然后选择最合适的实现。对于这些类型的任务，搜索和交叉引用浏览的组合是典型的。

### Why？

### 为什么？

Related to what code is doing, there are more targeted queries around why code is behaving differently than expected. About 16% of Code Searches try to answer the question of why a certain piece of code was added, or why it behaves in a certain way. Such questions often arise during debugging; for example, why does an error occur under these particular circumstances? 

与代码在做什么有关，关于为什么代码的行为与预期不同，有更多有针对性的查询。大约 16% 的代码搜索试图回答为什么要添加某段代码，或者为什么它以某种方式运行的问题。调试过程中经常会出现这样的问题；例如，为什么在这些特定情况下会发生错误？

An important capability here is being able to search and explore the exact state of the codebase at a particular point in time. When debugging a production issue, this can mean working with a state of the codebase that is weeks or months old, while debugging test failures for new code usually means working with changes that are only minutes old. Both are possible with Code Search. 

这里的一个重要功能是能够在特定时间点搜索和探索代码库的确切状态。在调试生产问题时，这可能意味着使用几周或几个月前的代码库状态，而调试新代码的测试失败通常意味着使用仅几分钟前的更改。两者都可以通过代码搜索实现。

### Who and When?

### 谁？什么时候？

About 8% of Code Searches try to answer questions around who or when someone introduced a certain piece of code, interacting with the version control system. For example, it’s possible to see when a particular line was introduced (like Git’s “blame”) and jump to the relevant code review. This history panel can also be very useful in finding the best person to ask about the code, or to review a change to it.[^6]

大约 8% 的代码搜索试图回答有关谁或何时引入某段代码的问题，并与版本控制系统进行交互。例如，可以查看何时引入了特定行（如 Git 的“blame”）并跳转到相关的代码审查。这个历史面板对于寻找最好的人来询问代码或审查对它的更改也非常有用。

> 6 That said, given the rate of commits for machine-generated changes, naive “blame” tracking has less value than it does in more change-averse ecosystems./
> 6也就是说，考虑到机器生成的更改的提交率，天真的“指责”跟踪比在更厌恶更改的生态系统中的价值要小。

## Why a Separate Web Tool? 

## 为什么要使用单独的 Web 工具？

Outside Google, most of the aforementioned investigations are done within a local IDE. So, why yet another tool? 

在 Google 之外，上述大部分实现都是在本地IDE。那么，为什么还需要有另一个工具呢？

### Scale 

### 规模

The first answer is that the Google codebase is so large that a local copy of the full codebase—a prerequisite for most IDEs—simply doesn’t fit on a single machine. Even before this fundamental barrier is hit, there is a cost to building local search and cross-reference indices for each developer, a cost often paid at IDE startup, slowing developer velocity. Or, without an index, one-off searches (e.g., with grep) can become painfully slow. A centralized search index means doing this work once,  upfront, and means investments in the process benefit everyone. For example, the Code Search index is incrementally updated with every submitted change, enabling index construction with linear cost.[^7]

第一个答案是 Google 代码库规模太大，以至于完整代码库的本地副本（大多数 IDE 的先决条件）根本不适合单台机器。即使在这个基本障碍之前，为每个开发人员构建本地搜索和交叉引用索引也是有成本的，这通常在 IDE 启动时减慢了开发人员的速度。如果没有索引，一次性搜索（例如，使用 grep）可能会变得非常缓慢。集中式搜索索引意味着一次性完成这项工作，并且意味着对流程的投资使每个人都受益。例如，代码搜索索引会随着每次提交的更改而增量更新，从而能够以线性成本构建索引。

In normal web search, fast-changing current events are mixed with more slowly changing items, such as stable Wikipedia pages. The same technique can be extended to searching code, making indexing incremental, which reduces its cost and allows changes to the codebase to be visible to everyone instantly. When a code change is submitted, only the actual files touched need to be reindexed, which allows parallel and independent updates to the global index. 

在正常的网络搜索中，快速变化的当前事件与变化较慢的项目混合在一起，例如稳定的维基百科页面。同样的技术可以扩展到搜索代码，使索引增加，从而降低成本，并允许对代码库的更改立即对所有人可见。提交代码更改时，只需要对实际触及的文件进行重新索引，这允许对全局索引进行并行和独立的更新。

Unfortunately, the cross-reference index cannot be instantly updated in the same way. Incrementality isn’t possible for it, as any code change can potentially influence the entire codebase, and in practice often does affect thousands of files. Many (nearly all of Google’s) full binaries need to be built[^8] (or at least analyzed) to determine the full semantic structure. It uses a ton of compute resources to produce the index daily (the current frequency). The discrepancy between the instant search index and the daily  cross-reference index is a source of rare but recurring issues for users. 

不幸的是，交叉引用索引不能以相同的方式立即更新。增量是不可能的，因为任何代码更改都可能影响整个代码库，实际上经常会影响数千个文件。需要构建（或至少分析）许多（几乎所有 Google 的）完整二进制文件以确定完整的语义结构。它每天使用大量计算资源（当前频率）生成索引。即时搜索索引和每日交叉引用索引之间的差异是用户罕见但反复出现的问题的根源。

> [^7]: For comparison, the model of “every developer has their own IDE on their own workspace do the indexing calculation” scales roughly quadratically: developers produce a roughly constant amount of code per unit time, so the codebase scales linearly (even with a fixed number of developers). A linear number of IDEs do linearly more work each time—this is not a recipe for good scaling./
> 7相比之下，“每个开发人员在自己的工作空间中都有自己的IDE，并进行索引计算”的模型大致按二次方进行扩展：开发人员每单位时间生成的代码量大致恒定，因此代码库可以线性扩展（即使有固定数量的开发人员）。线性数量的IDE每次都会做线性更多的工作，但这并不是实现良好扩展的秘诀。
> 
> [^8]: Kythe instruments the build workflow to extract semantic nodes and edges from source code. This extraction process collects partial cross-reference graphs for each individual build rule. In a subsequent phase, these partial graphs are merged into one global graph and its representation is optimized for the most common queries (go-to-definition, find all usages, fetch all decorations for a file). Each phase—extraction and post processing—is roughly as expensive as a full build; for example, in case of Chromium, the construction of the Kythe index is done in about six hours in a distributed setup and therefore too costly to be constructed by every developer on their own workstation. This computational cost is the why the Kythe index is computed only once per day./
> 8 Kyth使用构建工作流从源代码中提取语义节点和边缘。这个提取过程为每个单独的生成规则收集部分交叉引用图。在随后的阶段中，这些局部图合并为一个全局图，并针对最常见的查询对其表示进行优化（转到定义，查找所有用法，获取文件的所有修饰）。每个阶段的提取和后处理成本大致与完整构建一样高；例如，对于Chromium，Kythe索引的构建在分布式设置中大约需要六个小时，因此每个开发人员都无法在自己的工作站上构建，成本太高。这就是为什么Kythe指数每天只计算一次的原因。

### Zero Setup Global Code View 

### 零设置全局代码视图

Being able to instantly and effectively browse the entire codebase means that it’s very easy to find relevant libraries to reuse and good examples to copy. For IDEs that construct indices at startup, there is a pressure to have a small project or visible scope to reduce this time and avoid flooding tools like autocomplete with noise. With the Code Search web UI, there is no setup required (e.g., project descriptions, build environment), so it’s also very easy and fast to learn about code, wherever it occurs, which improves developer efficiency. There’s also no danger of missing code dependencies;  for example, when updating an API, reducing merge and library versioning issues. 

能够立即有效地浏览整个代码库意味着很容易找到相关的库来重用和好的例子来复制。对于在启动时构建索引的 IDE，有一个挑战是，要有一个小项目或可见范围来减少启动时间，并避免像自动完成这样的工具泛滥而产生噪音。使用代码搜索 Web UI，无需设置（例如，项目描述、构建环境），因此无论代码出现在何处，都可以非常轻松快速地了解代码，从而提高开发人员效率。也没有丢失代码依赖的危险；例如，在更新 API 时，减少合并和库版本控制问题。

### Specialization

### 专业化

Perhaps surprisingly, one advantage of Code Search is that it is not an IDE. This means that the user experience (UX) can be optimized for browsing and understanding code, rather than editing it, which is usually the bulk of an IDE (e.g., keyboard shortcuts, menus, mouse clicks, and even screen space). For example, because there isn’t an editor’s text cursor, every mouse click on a symbol can be made meaningful(e.g., show all usages or jump to definition), rather than as a way to move the cursor. This advantage is so large that it’s extremely common for developers to have multiple Code Search tabs open at the same time as their editor.

也许令人惊讶的是，代码搜索的一个优点是它不是 IDE。这意味着用户体验 (UX) 可以针对浏览和理解代码进行优化，而不是像 IDE 的大部分内容那样编辑它（例如，键盘快捷键、菜单、鼠标点击，甚至屏幕空间）。例如，由于没有编辑器的文本光标，每次鼠标单击符号都可以变得有意义（例如，显示所有用法或跳转到定义），而不是作为移动光标的一种方式。这个优势是如此之大，以至于开发人员在使用编辑器的同时打开多个代码搜索选项卡是非常常见的。

### Integration with Other Developer Tools

### 与其他开发者工具集成

Because it is the primary way to view source code, Code Search is the logical platform for exposing information about source code. It frees up tool creators from needing to create a UI for their results and ensures the entire developer audience will know of their work without needing to advertise it. Many analyses run regularly over the entire Google codebase, and their results are usually surfaced in Code Search. For example, for many languages, we can detect “dead” (uncalled) code and mark it as such when the file is browsed.

因为它是查看源代码的主要方式，所以代码搜索是公开源代码信息的逻辑平台。它使工具创建者无需为其结果创建 UI，并确保整个开发人员无需宣传即可了解他们的工作。许多分析会定期在整个 Google 代码库中运行，它们的结果通常会出现在代码搜索中。例如，对于许多语言，我们可以检测“死”（未调用）代码，并在浏览文件时将其标记为死代码。

In the other direction, the Code Search link to a source file is considered its canonical “location.” This is useful for many developer tools (see Figure 17-2). For example, log file lines typically contain the filename and line number of the logging statement. The production log viewer uses a Code Search link to connect the log statement back to the producing code. Depending on the available information, this can be a direct link to a file at a specific revision, or a basic filename search with the corresponding line number. If there is only one matching file, it is opened at the corresponding line number. Otherwise, snippets of the desired line in each of the matching files are rendered.

另一方面，指向源文件的代码搜索链接被认为是其规范的“位置”。这对许多开发工具很有用（见图 17-2）。例如，日志文件行通常包含日志记录语句的文件名和行号。生产日志查看器使用代码搜索链接将日志连接回生产代码。根据可用信息，这可以是指向特定修订文件的直接链接，也可以是具有相应行号的基本文件名搜索。如果只有一个匹配文件，则在相应的行号处打开。否则，将呈现每个匹配文件中所需行的片段。

![Figure 17-2](./images/Figure%2017-2.png)

Similarly, stack frames are linked back to source code whether they are shown within a crash reporting tool or in log output, as shown in Figure 17-3. Depending on the programming language, the link will utilize a filename or symbol search. Because the snapshot of the repository at which the crashing binary was built is known, the search can actually be restricted to exactly this version. That way, links remain valid for a long time period, even if the corresponding code is later refactored or deleted.

类似地，堆栈帧被链接回源代码，无论它们是显示在崩溃报告工具中还是显示在日志输出中，如图 17-3 所示。根据编程语言，链接将使用文件名或符号搜索。因为构建崩溃二进制文件的存储库的快照是已知的，所以实际上可以将搜索限制在这个版本。这样，即使相应的代码后来被重构或删除，链接也会在很长一段时间内保持有效。

![Figure 17-3](./images/Figure%2017-3.png)

Compilation errors and tests also typically refer back to a code location (e.g., test X in le at line). These can be linkified even for unsubmitted code given that most development happens in specific cloudvisible workspaces that are accessible and searchable by Code Search.

编译错误和测试通常还参考代码位置（例如，文件中测试 X行）。即使对于未提交的代码，这些也可以链接起来，因为大多数开发都发生在特定的云可见工作区中，这些工作区可以通过代码搜索访问和搜索。

Finally, codelabs and other documentation refer to APIs, examples, and implementations. Such links can be search queries referencing a specific class or function, which remain valid when the file structure changes. For code snippets, the most recent implementation at head can easily be embedded into a documentation page, as demonstrated in Figure 17-4, without the need to pollute the source file with additional documentation markers.

最后，代码实验室和其他文档是指 API、示例和实现。此类链接可以是引用特定类或函数的搜索查询，当文件结构更改时它们仍然有效。对于代码片段，最新的实现可以很容易地嵌入到文档页面中，如图 17-4 所示，而无需使用额外的文档标记污染源文件。

![Figure 17-4](./images/Figure%2017-4.png)

### API Exposure

### API 暴露

Code Search exposes its search, cross-reference, and syntax highlighting APIs to tools, so tool developers can bring those capabilities into their tools without needing to reimplement them. Further, plug-ins have been written to provide search and cross-references to editors and IDEs such as vim, emacs, and IntelliJ. These plugins restore some of the power lost due to being unable to locally index the codebase, and give back some developer productivity.

代码搜索将其搜索、交叉引用和语法高亮 API 公开给工具，因此工具开发人员可以将这些功能带入他们的工具中，而无需重新实现它们。此外，还编写了插件来提供对编辑器和 IDE（例如 vim、emacs 和 IntelliJ）的搜索和交叉引用。这些插件恢复了由于无法在本地索引代码库而损失的一些效率，并恢复了一些开发人员的生产力。

## Impact of Scale on Design

## 规模对设计的影响

In the previous section, we looked at various aspects of the Code Search UI and why it’s worthwhile having a separate tool for browsing code. In the following sections, we look a bit behind the scenes of the implementation. We first discuss the primary challenge—scaling—and then some of the ways the large scale complicates making a good product for searching and browsing code. After that, we detail how we addressed some of those challenges, and what trade-offs were made when building Code Search.

在上一节中，我们研究了代码搜索 UI 的各个方面，以及为什么需要拥有一个单独的工具来浏览代码。在接下来的部分中，我们会稍微了解一下代码搜索实现的幕后情况。我们首先讨论了主要挑战—扩展—然后讨论了几种大规模复杂化构建搜索和浏览代码好产品的方式。之后，我们详细介绍了我们如何应对其中的一些挑战，以及在构建代码搜索时做出了哪些权衡。

The biggest[^9] scaling challenge for searching code is the corpus size. For a small repository of a couple megabytes, a brute-force search with grep search will do. When hundreds of megabytes need to be searched, a simple local index can speed up search by an order of magnitude or more. When gigabytes or terabytes of source code need to be searched, a cloud-hosted solution with multiple machines can keep search times reasonable. The utility of a central solution increases with the number of developers using it and the size of the code space.

搜索代码的最大挑战是语料库大小。对于几兆字节的小型存储库，使用 grep 搜索的蛮力搜索就可以了。当需要搜索数百兆字节时，一个简单的本地索引可以将搜索速度提高一个数量级或更多。当需要搜索千兆字节或千兆字节的源代码时，具有多台机器的云托管解决方案可以使搜索时间保持合理。中央解决方案的实用性随着使用它的开发人员的数量和代码空间的大小而增加。

> [^9]: Because queries are independent, more users can be addressed by having more servers./
>  9 因为查询是独立的，所以可以通过拥有更多的服务器来解决更多的用户。
> 
### Search Query Latency

### 搜索查询延迟

Although we take as a given that a fast and responsive UI is better for the user, low latency doesn’t come for free. To justify the effort, one can weigh it against the saved engineering time across all users. Within Google, we process much more than one million search queries from developers within Code Search per day. For one million queries, an increase of just one second per search request corresponds to about 35 idle full-time engineers every day. In contrast, the search backend can be built and maintained with roughly a tenth of these engineers. This means that with about 100,000 queries per day (corresponding to less than 5,000 developers), just the one-second latency argument is something of a break-even point.

尽管我们认为快速响应的 UI 对用户来说更好，但低延迟并不是免费的。为了证明这一努力的合理性，可以将其与所有用户节省的工程时间进行权衡。在 Google 内部，我们每天在代码搜索中处理超过一百万个来自开发人员的搜索查询。对于一百万个查询，每个搜索请求仅增加一秒，就相当于每天大约有 35 名空闲的全职工程师。相比之下，搜索后端可以由大约十分之一的工程师来构建和维护。这意味着每天大约有 100,000 次查询（对应于不到 5,000 名开发人员），仅一秒钟的延迟参数就可以达到收支平衡点。

In reality, the productivity loss doesn’t simply increase linearly with latency. A UI is considered responsive if latencies are below 200 ms. But after just one second, the developer’s attention often begins to drift. If another 10 seconds pass, the developer is likely to switch context completely, which is generally recognized to have high productivity costs. The best way to keep a developer in the productive “flow” state is by targeting sub–200 ms end-to-end latency for all frequent operations and investing in the corresponding backends.

实际上，生产力损失并不仅仅随着延迟线性增加。如果延迟低于 200 毫秒，则认为 UI 是响应式的。但仅仅一秒钟后，开发人员的注意力往往开始转移。如果再过 10 秒，开发人员很可能会完全切换上下文，这通常被认为具有很高的生产力成本。让开发人员保持高效“流动”状态的最佳方法是将所有频繁操作的端到端延迟设定在 200 毫秒以下，并投资于相应的后端。

A large number of Code Search queries are performed in order to navigate the codebase. Ideally, the “next” file is only a click away (e.g., for included files, or symbol definitions), but for general navigation, instead of using the classical file tree, it can be much faster to simply search for the desired file or symbol, ideally without needing to fully specify it, and suggestions are provided for partial text. This becomes increasingly true as the codebase (and file tree) grows.

执行大量代码搜索查询来导航代码库。理想情况下，“下一个”文件只需单击一下即可（例如，对于包含的文件或符号定义），但对于一般导航，不需要使用经典文件树，简单地搜索所需的文件或符号会快得多，理想情况下不需要完全指定它，会为部分文本提供联想查询。随着代码库（和文件树）的增长，这变得越来越正确。

Normal navigation to a specific file in another folder or project requires several user interactions. With search, just a couple of keystrokes can be sufficient to get to the relevant file. To make search this effective, additional information about the search context (e.g., the currently viewed file) can be provided to the search backend. The context can restrict the search to files of a specific project, or influence ranking by preferring files that are in proximity to other files or directories. In the Code Search UI,[^10] the user can predefine multiple contexts and quickly switch between them as needed. In editors, the open or edited files are implicitly used as context to prioritize search results in their proximity.

正常导航到另一个文件夹或项目中的特定文件需要多次用户交互。使用搜索，只需几次点击即可访问相关文件。为了使搜索有效，可以将有关搜索上下文的附加信息（例如，当前查看的文件）提供给搜索后端。上下文可以将搜索限制为特定项目的文件，或者通过优先选择靠近其他文件或目录的文件来影响排名。在代码搜索 UI 中， 用户可以预定义多个上下文并根据需要在它们之间快速切换。在编辑器中，打开或编辑的文件被隐式用作上下文，以优先考虑搜索结果的接近程度。

One could consider the power of the search query language (e.g., specifying files,using regular expressions) as another criteria; we discuss this in the trade-offs section a little later in the chapter.

可以将搜索查询语言的功能（例如，指定文件、使用正则表达式）视为另一个标准；我们将在本章稍后的权衡部分讨论这个问题。

> 10 The Code Search UI does also have a classical file tree, so navigating this way is also possible./
> 10 代码搜索用户界面也有一个经典的文件树，所以用这种方式导航也是可以的。
### Index Latency

### 索引延迟

Most of the time, developers won’t notice when indices are out of date. They only care about a small subset of code, and even for that they generally won’t know whether there is more recent code. However, for the cases in which they wrote or reviewed the corresponding change, being out of sync can cause a lot of confusion. It tends not to matter whether the change was a small fix, a refactoring, or a completely new piece of code—developers simply expect a consistent view, such as they experience in their IDE for a small project.

大多数时候，开发人员不会注意到索引何时过期。他们只关心一小部分代码，即便如此，他们通常也不知道是否有更新的代码。但是，对于他们编写或审查相应更改的情况，不同步可能会导致很多混乱。更改是小修复、重构还是全新的代码片段往往并不重要——开发人员只期望一个一致的视图，例如他们在 IDE 中为一个小项目所体验的。

When writing code, instant indexing of modified code is expected. When new files, functions, or classes are added, not being able to find them is frustrating and breaks the normal workflow for developers used to perfect cross-referencing. Another example are search-and-replace–based refactorings. It is not only more convenient when the removed code immediately disappears from the search results, but it is also essential that subsequent refactorings take the new state into account.  When working with a centralized VCS, a developer might need instant indexing for submitted code if the previous change is no longer part of the locally modified file set.

编写代码时，需要对修改后的代码进行即时索引。当添加新文件、函数或类时，找不到它们是令人沮丧的，并且破坏了用于完善交叉引用的开发人员的正常工作流程。另一个例子是基于搜索和替换的重构。删除的代码立即从搜索结果中消失不仅更方便，而且后续重构考虑新状态也很重要。使用集中式 VCS 时，如果先前的更改不再是本地修改文件集的一部分，则开发人员可能需要对提交的代码进行即时索引。

Conversely, sometimes it’s useful to be able to go back in time to a previous snapshot of the code; in other words, a release. During an incident, a discrepancy between the index and the running code can be especially problematic because it can hide real causes or introduce irrelevant distractions. This is a problem for cross-references because the current technology for building an index at Google’s scale simply takes hours, and the complexity means that only one “version” of the index is kept. Although some patching can be done to align new code with an old index, this is still an issue to be solved.

相反，有时能够及时回到之前的代码快照很有用；换句话说，在事件期间释放，索引和运行代码之间的差异可能会是问题，因为它可以隐藏真正的原因或引入不相关的干扰。这对于交叉引用来说是一个问题，因为目前在 Google 规模上构建索引的技术只需要几个小时，而且复杂性意味着只保留一个索引的“版本”。尽管可以进行一些修补以使新代码与旧索引对齐，但这仍然是一个有待解决的问题。

## Google’s Implementation

## 谷歌的实现

Google’s particular implementation of Code Search is tailored to the unique characteristics of its codebase, and the previous section outlined our design constraints for creating a robust and responsive index. The following section outlines how the Code Search team implemented and released its tool to Google developers.

Google 对代码搜索的特殊实现是针对其代码库的独特特征量身定制的，上一节概述了我们创建健壮且响应迅速的索引的设计约束。以下部分概述了代码搜索团队如何实施并向 Google 开发人员发布工具。

### Search Index

### 搜索索引

Google’s codebase is a special challenge for Code Search due to its sheer size. In the early days, a trigram-based approach was taken. Russ Cox subsequently open sourced a simplified version. Currently, Code Search indexes about 1.5 TB of content and processes about 200 queries per second with a median server-side search latency of less than 50 ms and a median indexing latency (time between code commit and visibility in the index) of less than 10 seconds.

由于其庞大的规模，Google 的代码库对代码搜索来说是一个特殊的挑战。在早期，采用了基于三元组的方法。 Russ Cox 随后开源了一个简化版本。目前，代码搜索索引大约有1.5 TB 的内容，每秒处理大约 200 个查询，服务器端搜索延迟的中位数小于 50 毫秒，索引延迟的中位数（代码提交和索引可见性之间的时间）小于 10秒。

Let’s roughly estimate the resource requirements to achieve this performance with a grep-based bruteforce solution. The RE2 library we use for regular expression matching processes about 100 MB/sec for data in RAM. Given a time window of 50 ms, 300,000 cores would be needed to crunch through the 1.5 TB of data. Because in most cases simple substring searches are sufficient, one could replace the regular expression matching with a special substring search that can process about 1 GB/sec[^11] under certain conditions, reducing the number of cores by 10 times. So far, we have looked at just the resource requirements for processing a single query within 50 ms. If we’re getting 200 requests per second, 10 of those will be simultaneously active in that 50 ms window, bringing us back to 300,000 cores just for substring search.

让我们粗略估计一下使用基于 grep 的蛮力解决方案实现此性能所需的资源。我们用于正则表达式匹配的 RE2 库以大约 100 MB/秒的速度处理 RAM 中的数据。给定 50 毫秒的时间窗口，需要 300,000 个内核来处理 1.5 TB 的数据。因为在大多数情况下，简单的子字符串搜索就足够了，可以将正则表达式匹配替换为特殊的子字符串搜索，在某些条件下可以处理大约 1 GB/秒，从而将核心数减少 10 倍。到目前为止，我们只研究了在 50 毫秒内处理单个查询的资源需求。如果我们每秒收到 200 个请求，其中 10 个将在 50 毫秒的窗口中同时处于活动状态，这使我们回到 300,000 个内核仅用于子字符串搜索。

Although this estimate ignores that the search can stop once a certain number of results are found or that file restrictions can be evaluated much more effectively than content searches, it doesn’t take communication overhead, ranking, or the fan out to tens of thousands of machines into account either. But it shows quite well the scale involved and why Google’s Code Search team continuously invests into improving indexing. Over the years, our index changed from the original trigram-based solution, through a custom suffix array–based solution, to the current sparse ngram solution. This latest solution is more than 500 times more efficient than the brute-force solution while being capable of also answering regular expression searches at blazing speed.

虽然这个估计忽略了一旦找到一定数量的结果，搜索就会停止，或者文件限制可以比内容搜索更有效地评估，它不需要通信开销、排名或考虑数万机器。它很好地展示了所涉及的巨大规模以及为什么 Google 的代码搜索团队不断投资于改进索引。多年来，我们的索引从最初的基于 trigram 的解决方案，通过基于自定义后缀数组的解决方案，变为当前的稀疏 ngram 解决方案。这个最新的解决方案比蛮力解决方案的效率高出 500 多倍，同时还能够以极快的速度响应正则表达式搜索。

One reason we moved from a suffix array–based solution to a token-based n-gram solution was to take advantage of Google’s primary indexing and search stack. With a suffix array–based solution, building and distributing the custom indices becomes a challenge in and of itself. By utilizing “standard” technology, we benefit from all the advances in reverse index construction, encoding, and serving made by the core search team. Instant indexing is another feature that exists in standard search stacks, and by itself is a big challenge when solving it at scale.

我们从基于后缀数组的解决方案转向基于标记的 n-gram 解决方案的一个原因是利用 Google 的主要索引和搜索堆栈。使用基于后缀数组的解决方案，构建和分发自定义索引本身就是一项挑战。通过利用“标准”技术，我们受益于核心搜索团队在反向索引构建、编码和服务方面的进步。即时索引是标准搜索堆栈中存在的另一个功能，在大规模解决它时，它本身就是一个巨大的挑战。

Relying on standard technology is a trade-off between implementation simplicity and performance. Even though Google’s Code Search implementation is based on standard reverse indices, the actual retrieval, matching, and scoring are highly customized and optimized. Some of the more advanced Code Search features wouldn’t be possible otherwise. To index the history of file revisions, we came up with a custom compression scheme in which indexing the full history increased the resource consumption by a factor of just 2.5.

依赖标准技术是实现简单性和性能之间的权衡。尽管 Google 的代码搜索实现是基于标准的反向索引，但实际的检索、匹配和评分都是高度定制和优化的。否则，一些更高级的代码搜索功能将无法实现。为了索引文件修订的历史，我们提出了一个自定义压缩方案，在该方案中，索引完整历史将资源消耗增加了 2.5 倍。

In the early days, Code Search served all data from memory. With the growing index size, we moved the inverted index to flash. Although flash storage is at least an order of magnitude cheaper than memory, its access latency is at least two orders of magnitude higher. So, indices that work well in memory might not be suitable when served from flash. For instance, the original trigram index requires fetching not only a large number of reverse indices from flash, but also quite large ones. With n-gram schemes, both the number of inverse indices and their size can be reduced at the expense of a larger index.

在早期时候，代码搜索从内存中提供所有数据。随着索引大小的增加，我们将倒排索引移至闪存。尽管闪存存储至少比内存便宜一个数量级，但它的访问延迟至少要高两个数量级。因此，在内存中运行良好的索引可能不适合从闪存提供服务。例如，原始的 trigram 索引不仅需要从闪存中获取大量的反向索引，而且还需要相当大的索引。使用 n-gram 方案，可以以更大的索引为代价来减少逆索引的数量及其大小。

To support local workspaces (which have a small delta from the global repository), we have multiple machines doing simple brute-force searches. The workspace data is loaded on the first request and then kept in sync by listening for file changes. When we run out of memory, we remove the least recent workspace from the machines. The unchanged documents are searched with our history index. Therefore, the search is implicitly restricted to the repository state to which the workspace is synced.

为了支持本地工作空间（与全局存储库有一个小的增量），我们有多台机器进行简单的暴力搜索。工作区数据在第一次请求时加载，然后通过侦听文件更改来保持同步。当内存不足时，我们会从机器中删除最近的工作区。使用我们的历史索引搜索未更改的文档。因此，搜索被隐式限制为工作空间同步到的存储库状态。

> 11 See https://blog.scalyr.com/2014/05/searching-20-gbsec-systems-engineering-before-algorithms and http://volnitsky.com/project/str_search./
> 11 查阅blog.scalyr.com/2014/05/searching-20-gbsec-systems-engineering-before-algorithms 和tp://volnitsky.com/project/str_search.

### Ranking

### 排行

For a very small codebase, ranking doesn’t provide much benefit, because there aren’t many results anyway. But the larger the codebase becomes, the more results will be found and the more important ranking becomes. In Google’s codebase, any short substring will occur thousands, if not millions, of times. Without ranking, the user either must check all of those results in order to find the correct one, or must refine the query[^12] er until the result set is reduced to just a handful of files. Both options waste the developer’s time.

对于非常小的代码库，排名并没有带来太多好处，因为无论如何也没有很多结果。但是代码库越大，找到的结果就越多，排名也就越重要。在 Google 的代码库中，任何短子字符串都会出现数千次，甚至数百万次。如果没有排名，用户要么必须检查所有这些结果才能找到正确的结果，要么必须进一步细化查询，直到结果集减少到几个文件。这两种选择都浪费了开发人员的时间。

Ranking typically starts with a scoring function, which maps a set of features of each file (“signals”) to some number: the higher the score, the better the result. The goal of the search is then to find the top N results as efficiently as possible. Typically, one distinguishes between two types of signals: those that depend only on the document (“query independent”) and those that depend on the search query and how it matches the document (“query dependent”). The filename length or the programming language of a file would be examples of query independent signals, whereas whether a match is a function definition or a string literal is a query dependent signal.

排名通常从评分函数开始，它将每个文件的一组特征（“信号”）映射到某个数字：分数越高，结果越好。搜索的目标是尽可能高效地找到前 N 个结果。通常，人们区分两种类型的信号：仅依赖于文档的信号（“查询无关”）和依赖于搜索查询以及它如何匹配文档的信号（“查询依赖”）。文件名长度或文件的编程语言将是查询独立信号的示例，而匹配是函数定义还是字符串文字是查询相关信号。

> [^12]: ontrast to web search, adding more characters to a Code Search query always reduces the result set (apart rom a few rare exceptions via regular expression terms).
> 12 与网络搜索相比，在代码搜索查询中添加更多的字符总是会减少结果集（除了少数通过正则表达式术语的罕见例外）。

#### Query independent signals

#### 查询独立信号

Some of the most important query independent signals are the number of file views and the amount of references to a file. File views are important because they indicate which files developers consider important and are therefore more likely to want to find. For instance, utility functions in base libraries have a high view count. It doesn’t matter whether the library is already stable and isn’t changed anymore or whether the library is being actively developed. The biggest downside of this signal is the feedback loop it creates. By scoring frequently viewed documents higher, the chance increases that developers will look at them and decreases the chance of other documents to make it into the top N. This problem is known as exploitation versus exploration, for which various solutions exist (e.g., advanced A/B search experiments or curation of training data). In practice, it doesn’t seem harmful to somewhat over-show highscoring items: they are simply ignored when irrelevant and taken if a generic example is needed. However, it is a problem for new files, which don’t yet have enough information for a good signal.[^13]

一些最重要的独立于查询的信号是文件视图的数量和对文件的引用量。文件视图很重要，因为它们表明开发人员认为哪些文件很重要，因此更有可能想要找到。例如，基础库中的实用程序函数具有很高的查看次数。库是否已经稳定并且不再更改或者库是否正在积极开发都无关紧要。该信号的最大缺点是它创建的反馈回路。通过对经常查看的文档进行更高的评分，开发人员查看它们的机会增加，并降低了其他文档进入前 N 的机会。这个问题被称为利用与探索，存在各种解决方案（例如，高级 A /B 搜索实验或训练数据管理）。在实践中，过度展示高分项目似乎并没有什么害处：它们在不相关时被忽略，如果需要通用示例则采用。但是，对于新文件来说，这是一个问题，它们还没有足够的信息来获得良好的信号。

We also use the number of references to a file, which parallels the original page rank algorithm, by replacing web links as references with the various kinds of “include/import” statements present in most languages. We can extend the concept up to build dependencies (library/module level references) and down to functions and classes. This global relevance is often referred to as the document’s “priority.”

我们还使用文件的引用数量，这与原始页面排名算法相似，通过将 Web 链接替换为大多数语言中存在的各种“包含/导入”语句的引用。我们可以将概念向上扩展以构建依赖项（库/模块级引用）并向下扩展至函数和类。这种全局相关性通常被称为文档的“优先级”。

When using references for ranking, one must be aware of two challenges. First, you must be able to extract reference information reliably. In the early days, Google’s Code Search extracted include/import statements with simple regular expressions and then applied heuristics to convert them into full file paths. With the growing complexity of a codebase, such heuristics became error prone and challenging to maintain. Internally, we replaced this part with correct information from the Kythe graph.

在使用参考进行排名时，必须注意两个挑战。首先，您必须能够可靠地提取参考信息。早期，Google 的代码搜索使用简单的正则表达式提取包含/导入语句，然后应用启发式方法将它们转换为完整的文件路径。随着代码库越来越复杂，这种启发式方法变得容易出错并且难以维护。在内部，我们用 Kythe 图中的正确信息替换了这部分。

Large-scale refactorings, such as open sourcing core libraries, present a second challenge. Such changes don’t happen atomically in a single code update; rather, they need to be rolled out in multiple stages. Typically, indirections are introduced, hiding, for example, the move of files from usages. These kinds of indirections reduce the page rank of moved files and make it more difficult for developers to discover the new location. Additionally, file views usually become lost when files are moved, making the situation even worse. Because such global restructurings of the codebase are comparatively rare (most interfaces move rarely), the simplest solution is to manually boost files during such transition periods. (Or wait until the migration completes and for the natural processes to up-rank the file in its new location.)

大规模重构，例如开源核心库，是第二个挑战。此类更改不会在单个代码更新中自动发生；相反，它们需要分多个阶段推出。通常，引入间接方式，例如隐藏文件的使用移动。这些类型间接降低了移动文件的页面排名，并使开发人员更难发现新位置。此外，移动文件时文件视图通常会丢失，从而使情况变得更糟。因为代码库的这种全局重组比较少见（大多数接口很少移动），最简单的解决方案是在这种过渡期间手动提升文件。 （或者等到迁移完成并等待自然过程在其新位置对文件进行升级。）

> 13 This could likely be somewhat corrected by using recency in some form as a signal, perhaps doing something imilar to web search dealing with new pages, but we don’t yet do so.
>  13 这很可能通过使用某种形式的事件作为信号而得到一定程度的修正，也许可以做一些类似于网络搜索处理新页面的事情，但我们还没有这样做。

#### Query dependent signals

#### 查询相关信号

Query independent signals can be computed offline, so computational cost isn’t a major concern, although it can be high. For example, for the “page” rank, the signal depends on the whole corpus and requires a MapReduce-like batch processing to calculate. Query dependent signals, which must be calculated for each query, should be cheap to compute. This means that they are restricted to the query and information quickly accessible from the index.

查询独立信号可以离线计算，因此计算成本不是主要问题，尽管它可能很高。例如，对于“页面”排名，信号依赖于整个语料库，需要类似 MapReduce 的批处理来计算。查询相关信号，即使必须为每个查询进行计算，但是计算成本应该很低。这意味着它们仅限于从索引中快速访问的查询和信息。

Unlike web search, we don’t just match on tokens. However, if there are clean token matches (that is, the search term matches with content with some form of breaks,such as whitespace, around it), a further boost is applied and case sensitivity is considered. This means, for example, a search for “Point” will score higher against "Point *p” than against “appointed to the council.”

与网络搜索不同，我们不仅仅匹配令牌。但是，如果存在干净的标记匹配（即，搜索词与带有某种形式的中断（例如空格）的内容匹配），则会应用进一步的提升并考虑区分大小写。这意味着，例如，搜索“Point”将针对“Point *p”的得分高于针对“被任命为理事会成员”的得分。

For convenience, a default search matches filename and qualified symbols[^14] ion to the actual file content. A user can specify the particular kind of match, but they don’t need to. The scoring boosts symbol and filename matches over normal content matches to reflect the inferred intent of the developer. Just as with web searches, developers can add more terms to the search to make queries more specific.It’s very common for a query to be “qualified” with hints about the filename (e.g.,“base” or “myproject”). Scoring leverages this by boosting results where much of the query occurs in the full path of the potential result, putting such results ahead of those that contain only the words in random places in their content.

为方便起见，除了实际文件内容外，默认搜索还匹配文件名和限定符号。用户可以指定特定类型的匹配，但他们不需要。与正常的内容匹配相比，该评分提高了符号和文件名匹配，以反映开发人员的推断意图。与 Web 搜索一样，开发人员可以在搜索中添加更多术语以使查询更加具体。通过文件名提示“限定”查询是很常见的（例如，“基础”或“我的项目”）。评分通过提升大部分查询出现在潜在结果的完整路径中的结果来利用这一点，将此类结果置于仅包含其内容中随机位置的单词的结果之前。

> 14 In programming languages, a symbol such as a function “Alert” often is defined in a particular scope, such as  class (“Monitor”) or namespace (“absl”). The qualified name might then be absl::Monitor::Alert, and this is indable, even if it doesn’t occur in the actual text.
> 14 在编程语言中，像函数 "Alert "这样的符号经常被定义在一个特定的范围内，例如类（"Monitor"）或命名空间（"absl"）。因此，限定的名称可能是absl::Monitor::Alert，这是可以理解的，即使它没有出现在实际文本中。

#### Retrieval

#### 恢复

Before a document can be scored, candidates that are likely to match the search query are found. This phase is called retrieval. Because it is not practical to retrieve all documents, but only retrieved documents can be scored, retrieval and scoring must work well together to find the most relevant documents. A typical example is to search for a class name. Depending on the popularity of the class, it can have thousands of usages, but potentially only one definition. If the search was not explicitly restricted to class definitions, retrieval of a fixed number of results might stop before the file with the single definition was reached. Obviously, the problem becomes more challenging as the codebase grows.

在对文档进行评分之前，会找到可能与搜索查询匹配的候选者。这个阶段称为检索。因为检索所有文档并不实用，只能对检索到的文档进行评分，因此检索和评分必须协同工作才能找到最相关的文档。一个典型的例子是搜索类名。根据类的受欢迎程度，它可以有数千种用法，但可能只有一种定义。如果搜索没有明确限制在类定义中，则在到达具有单个定义的文件之前，可能会停止检索固定数量的结果。显然，随着代码库的增长，问题变得更具挑战性。

The main challenge for the retrieval phase is to find the few highly relevant files among the bulk of less interesting ones. One solution that works quite well is called supplemental retrieval. The idea is to rewrite the original query into more specialized ones. In our example, this would mean that a supplemental query would restrict the search to only definitions and filenames and add the newly retrieved documents to the output of the retrieval phase. In a naive implementation of supplemental retrieval, more documents need to be scored, but the additional partial scoring information gained can be used to fully evaluate only the most promising documents from the retrieval phase.

检索阶段的主要挑战是在大量不那么关联的文件中找到少数高度相关的文件。一种效果很好的解决方案称为补充检索。这个方法是将原始查询重写为更专业的查询。在我们的示例中，这意味着补充查询会将搜索限制为仅定义和文件名，并将新检索到的文档添加到检索阶段的输出中。在补充检索的简单实现中，需要对更多文档进行评分，但获得的额外部分评分信息可用于全面评估检索阶段中最有希望的文档。

#### Result diversity

#### 结果多样性

Another aspect of search is diversity of results, meaning trying to give the best results in multiple categories. A simple example would be to provide both the Java and Python matches for a simple function name, rather than filling the first page of results with one or the other.

搜索的另一个方面是结果的多样性，这意味着试图在多个类别中给出最好的结果。一个简单的例子是为一个简单的函数名提供 Java 和 Python 匹配，而不是用一个或另一个填充结果的第一页。

This is especially important when the intent of the user is not clear. One of the challenges with diversity is that there are many different categories—like functions,classes, filenames, local results, usages, tests, examples, and so on—into which results can be grouped, but that there isn’t a lot of space in the UI to show results for all of them or even all combinations, nor would it always be desirable. Google’s Code Search doesn’t do this as well as web search does, but the drop-down list of suggested results (like the autocompletions of web search) is tweaked to provide a diverse set of top filenames, definitions, and matches in the user’s current workspace.

当用户的意图不明确时，这一点尤其重要。多样性的挑战之一是有许多不同的类别—如函数、类、文件名、本地结果、用法、测试、示例等—结果可以分组，但没有很多UI 中的空间来显示所有结果甚至所有组合的结果，这是不可取的。 Google 的代码搜索在这方面的表现不如网络搜索，但建议结果的下拉列表（如网络搜索的自动完成）经过调整，可以匹配用户的当前工作区。

## Selected Trade-Offs

## 选择的权衡

Implementing Code Search within a codebase the size of Google’s and keeping it responsive involved making a variety of trade-offs. These are noted in the following section.

在 Google 这么大量级的代码库中实现代码搜索并保持其响应速度需要做出各种权衡。这些将在下一节中注明。

### Completeness: Repository at Head

### 完整性：仓库头部

We’ve seen that a larger codebase has negative consequences for search; for example, slower and more expensive indexing, slower queries, and noisier results. Can these costs be reduced by sacrificing completeness; in other words, leaving some content out of the index? The answer is yes, but with caution. Nontext files (binaries, images, videos, sound, etc.) are usually not meant to be read by humans and are dropped apart from their filename. Because they are huge, this saves a lot of resources. A more borderline case involves generated JavaScript files. Due to obfuscation and the loss of structure, they are pretty much unreadable for humans, so excluding them from the index is usually a good trade-off, reducing indexing resources and noise at the cost of completeness. Empirically, multimegabyte files rarely contain information relevant for developers, so excluding extreme cases is probably the correct choice.

我们已经看到，更大的代码库会对搜索产生负面影响；例如，更慢且更昂贵的索引、更慢的查询和更嘈杂的结果。是否可以通过牺牲完整性来降低这些成本？换句话说，将一些内容排除在索引之外？答案是肯定的，但要谨慎。非文本文件（二进制文件、图像、视频、声音等）通常不适合人类阅读，而是从文件名中删除。因为它们很大，所以可以节省大量资源。更边缘的情况涉及生成的 JavaScript 文件。由于混淆和结构丢失，它们对人类来说几乎是不可读的，因此将它们从索引中排除通常是一个很好的权衡，以完整性为代价减少索引资源和噪音。根据经验，数兆字节的文件很少包含与开发人员相关的信息，因此排除极端情况可能是正确的选择。

However, dropping files from the index has one big drawback. For developers to rely on Code Search, they need to be able to trust it. Unfortunately, it is generally impossible to give feedback about incomplete search results for a specific search if the dropped files weren’t indexed in the first place. The resulting confusion and productivity loss for developers is a high price to pay for the saved resources. Even if developers are fully aware of the limitations, if they still need to perform their search, they will do so in an ad hoc and error-prone way. Given these rare but potentially high costs, we choose to err on the side of indexing too much, with quite high limits that are mostly picked to prevent abuse and guarantee system stability rather than to save resources.

但是，从索引中删除文件有一个很大的缺点。对于依赖代码搜索的开发人员，他们需要能够信任它。不幸的是，如果删除的文件一开始没有被索引，通常不可能就特定搜索的不完整搜索结果提供反馈。给开发人员带来的混乱和生产力损失是为节省的资源付出的高昂代价。即使开发人员完全意识到这些限制，如果他们仍然需要执行搜索，他们也会以一种临时且容易出错的方式进行。鉴于这些罕见但潜在的高成本，我们选择在索引过多方面犯错，具有比较高的限制，是为了防止滥用和保证系统稳定性，而不是为了节省资源。

In the other direction, generated files aren’t in the codebase but would often be useful to index. Currently they are not, because indexing them would require integrating the tools and configuration to create them, which would be a massive source of complexity, confusion, and latency.

另一方面，生成的文件不在代码库中，但通常对索引很有用。虽然目前它们不是，是因为索引它们需要依赖集成工具和配置，这将是复杂性、混乱和延迟的巨大来源。

### Completeness: All Versus Most-Relevant Results

### 完整性：所有结果与最相关结果

Normal search sacrifices completeness for speed, essentially gambling that ranking will ensure that the top results will contain all of the desired results. And indeed, for Code Search, ranked search is the more common case in which the user is looking for one particular thing, such as a function definition, potentially among millions of matches. However, sometimes developers want all results; for example, finding all occurrences of a particular symbol for refactoring. Needing all results is common for analysis, tooling, or refactoring, such as a global search and replace. The need to deliver all results is a fundamental difference to web search in which many shortcuts can be taken, such as to only consider highly ranked items.

正常搜索会牺牲完整性来换取速度，本质上是在赌排名会确保靠前的结果包含所有所需的结果。事实上，对于代码搜索，排名搜索是更常见的情况，例如用户正在寻找一个特定的东西，函数定义，可能在数百万个匹配项中。但是，有时开发人员想要所有结果；例如，查找特定符号的所有地方以进行重构。分析、工具或重构（例如全局搜索和替换）通常需要所有结果。提供所有结果的需求是与 Web 搜索之间的根本区别，其中可以采用许多捷径，例如只考虑排名较高的项目。

Being able to deliver all results for very large result sets has high cost, but we felt it was required for tooling, and for developers to trust the results. However, because for most queries only a few results are relevant (either there are only a few matches[^15] or only a few are interesting), we didn’t want to sacrifice average speed for potential completeness.

能够为非常大的结果集交付所有结果的成本很高，但我们认为这是工具所必需的，并且开发人员需要信任结果。然而，因为对于大多数查询，只有少数结果是相关的（或者只有少数匹配 15 或只有少数是有用的），我们不想为了潜在的完整性而牺牲平均速度。

To achieve both goals with one architecture, we split the codebase into shards with files ordered by their priority. Then, we usually need to consider only the matches to high priority files from each chunk. This is similar to how web search works. However, if requested, Code Search can fetch all results from each chunk, to guarantee finding all results.[^16] This lets us address both use cases, without typical searches being slowed down by the less frequently used capability of returning large, complete results sets. Results can also then be delivered in alphabetical order, rather than ranked, which is useful for some tools.

为了通过一种架构实现这两个目标，我们将代码库拆分为分片，文件按优先级排序。然后，我们通常只需要考虑每个块中与高优先级文件的匹配。这类似于网络搜索的工作方式。但是，如果需要，代码搜索可以从每个块中获取所有结果，以保证找到所有结果。这让我们能够解决这两个用例，而不会因为不常用的返回大型完整结果集的功能而减慢典型搜索速度。结果也可以按字母顺序而不是排名，这对某些工具很有用。

So, here the trade-off was a more complex implementation and API versus greater capabilities, rather than the more obvious latency versus completeness.

因此，这里权衡的是更复杂的实现和 API 与更强大的功能，而不是更明显的延迟与完整性。

> 15 An analysis of queries showed that about one-third of user searches have fewer than 20 results./
> 15 对查询的分析表明，大约三分之一的用户搜索结果少于20个。
> 
> 16 In practice, even more happens behind the scenes so that responses don’t become painfully huge and developers don’t bring down the whole system by making searches that match nearly everything (imagine searching for the letter “i” or a single space)./
> 16在实践中，更多的事情发生在幕后，因此响应不会变得异常巨大，开发人员也不会通过搜索几乎所有内容来破坏整个系统（想象一下搜索字母“i”或单个空格）

### Completeness: Head Versus Branches Versus All History Versus Workspaces

### 完整性：头vs分支vs所有历史vs工作区

Related to the dimension of corpus size is the question of which code versions should be indexed: specifically, whether anything more than the current snapshot of code (“head”) should be indexed. System complexity, resource consumption, and overall cost increase drastically if more than a single file revision is indexed. To our knowledge, no IDE indexes anything but the current version of code. When looking at distributed version control systems like Git or Mercurial, a lot of their efficiency comes from the compression of their historical data. But the compactness of these representations becomes lost when constructing reverse indices. Another issue is that it is difficult to efficiently index graph structures, which are the basis for Distributed Version Control Systems.

与语料库大小相关的是应该索引哪些代码版本的问题：具体来说，是否应该索引除当前代码快照（“head”）之外的任何内容。如果索引多个文件修订版，系统复杂性、资源消耗和总体成本会急剧增加。据我们所知，除了当前版本的代码之外，没有任何 IDE 索引任何内容。在查看像 Git 或 Mercurial 这样的分布式版本控制系统时，它们的很多效率都来自对历史数据的压缩。但是在构建反向索引时，这些表示的紧凑性会丢失。另一个问题是很难有效地索引图结构，这是分布式版本控制系统的基础。

Although it is difficult to index multiple versions of a repository, doing so allows the exploration of how code has changed and finding deleted code. Within Google, Code Search indexes the (linear) Piper history. This means that the codebase can be searched at an arbitrary snapshot of the code, for deleted code, or even for code authored by certain people.

尽管索引存储库的多个版本很困难，但这样做可以探索代码如何更改并找到已删除的代码。在 Google 中，代码搜索索引（线性）Piper 历史。这意味着可以在代码的任意快照中搜索代码库，查找已删除的代码，甚至是某些人创作的代码。

One big benefit is that obsolete code can now simply be deleted from the codebase. Before, code was often moved into directories marked as obsolete so that it could still be found later. The full history index also laid the foundation for searching effectively in people’s workspaces (unsubmitted changes), which are synced to a specific snapshot of the codebase. For the future, a historical index opens up the possibility of interesting signals to use when ranking, such as authorship, code activity, and so on. Workspaces are very different from the global repository:

一个大的优点是现在可以简单地从代码库中删除过时的代码。以前，代码经常被移动到标记为过时的目录中，以便以后仍然可以找到它。完整的历史索引还为在人们的工作空间（未提交的更改）中进行有效搜索奠定了基础，这些工作空间与代码库的特定快照同步。对于未来，历史索引开辟了在排名时使用有效信号的可能性，例如作者身份、代码活动等。工作区与全局存储库有很大不同：

• Each developer can have their own workspaces.

• 每个开发人员都可以拥有自己的工作区。

• There are usually a small number of changed files within a workspace.

• 工作空间中通常有少量更改的文件。

• The files being worked on are changing frequently.

• 正在处理的文件经常更改。

• A workspace exists only for a relatively short time period.

• 工作空间仅存在相对较短的时间段。

To provide value, a workspace index must reflect exactly the current state of the workspace.

为了提供价值，工作区索引必须准确反映工作区的当前状态。

### Expressiveness: Token Versus Substring Versus Regex

### 表现力：令牌与子字符串与正则表达式

The effect of scale is greatly influenced by the supported search feature set. Code Search supports regular expression (regex) search, which adds power to the query language, allowing whole groups of terms to be specified or excluded, and they can be used on any text, which is especially helpful for documents and languages for which deeper semantic tools don’t exist.

规模的效果受到支持的搜索特征集的很大影响。代码搜索支持正则表达式 (regex) 搜索，这增加了查询语言的功能，允许指定或排除整组术语，并且它们可以用于任何文本，在不存在更深层次的语义工具的情况下，对于文档和语言特别有用。

Developers are also used to using regular expressions in other tools (e.g., grep) and contexts, so they provide powerful search without adding to a developer’s cognitive load. This power comes at a cost given that creating an index to query them efficiently is challenging. What simpler options exist?

开发人员还习惯于在其他工具（例如 grep）和上下文中使用正则表达式，因此它们提供了强大的搜索功能，而不会增加开发人员的认知负担。鉴于创建索引以有效地查询它们具有挑战性，因此这种能力是有代价的。有哪些更简单的选择？

A token-based index (i.e., words) scales well because it stores only a fraction of the actual source code and is well supported by standard search engines. The downside is that many use cases are tricky or even impossible to realize efficiently with a tokenbased index when dealing with source code, which attaches meaning to many characters typically ignored when tokenizing. For example, searching for “function()” versus “function(x)”, “(x ^ y)”, or “=== myClass” is difficult or impossible in most token-based searches.

基于标记的索引（例如：单词）可以很好地扩展，因为它只存储实际源代码的一小部分，并且得到标准搜索引擎的良好支持。不利的一面是，在处理源代码时，使用基于标记的索引来有效地实现许多用例是棘手的，甚至不可能有效地实现，这为标记化时通常被忽略的许多字符附加了意义。例如，在大多数基于标记的搜索中，搜索“function()”与“function(x)”、“(x ^ y)”或“=== myClass”是困难的或不可能的。

Another problem of tokenization is that tokenization of code identifiers is ill defined. Identifiers can be written in many ways, such as CamelCase, snake_case, or even justmashedtogether without any word separator. Finding an identifier when remembering only some of the words is a challenge for a token-based index.

标记化的另一个问题是代码标识符的标记化定义不明确。标识符可以用多种方式编写，例如 CamelCase、snake_case，甚至只是混合在一起而无需任何单词分隔符。在只记住一些单词时找到一个标识符对于基于标记的索引来说是一个挑战。

Tokenization also typically doesn’t care about the case of letters (“r” versus “R”), and will often blur words; for example, reducing “searching” and “searched” to the same stem token search. This lack of precision is a significant problem when searching code. Finally, tokenization makes it impossible to search on whitespace or other word delimiters (commas, parentheses), which can be very important in code.

标记化通常也不关心字母的大小写（“r”与“R”），并且经常会模糊单词；例如，将“searching”和“searched”简化为相同的词干标记搜索。在搜索代码时，缺乏精确性是一个严重的问题。最后，标记化使搜索空格或其他单词分隔符（逗号、括号）成为不可能，即使这在代码中可能非常重要。

A next step up[^17] in searching power is full substring search in which any sequence of characters can be searched for. One fairly efficient way to provide this is via a trigram-based index. [^18] In its simplest form, the resulting index size is still much smaller than the original source code size. However, the small size comes at the cost of relatively low recall accuracy compared to other substring indices. This means slower queries because the nonmatches need to be filtered out of the result set. This is where a good compromise between index size, search latency, and resource consumption must be found that depends heavily on codebase size, resource availability, and searches per second.

搜索能力的下一步是完整的子字符串搜索，其中可以搜索任何字符序列。提供此功能的一种相当有效的方法是通过基于三元组的索引。在最简单的形式中，生成的索引大小仍然比源代码大小小得多。然而，与其他子字符串索引相比，小尺寸的代价是召回准确率相对较低。这意味着查询速度较慢，因为不匹配项需要从结果集中过滤掉。这是必须在索引大小、搜索延迟和资源消耗之间找到良好折衷的地方，这在很大程度上取决于代码库大小、资源可用性和每秒搜索量。

If a substring index is available, it’s easy to extend it to allow regular expression searches. The basic idea is to convert the regular expression automaton into a set of substring searches. This conversion is straightforward for a trigram index and can be generalized to other substring indices. Because there is no perfect regular expression index, it will always be possible to construct queries that result in a brute-force search. However, given that only a small fraction of user queries are complex regular expressions, in practice, the approximation via substring indices works very well.

如果子字符串索引可用，很容易扩展它以允许正则表达式搜索。基本思想是将正则表达式自动机转换为一组子字符串搜索。这种转换对于三元索引很简单，并且可以推广到其他子字符串索引。因为没有完美的正则表达式索引，所以总是可以构建导致暴力搜索的查询。然而，鉴于只有一小部分用户查询是复杂的正则表达式，在实践中，通过子字符串索引的近似效果非常好。

> 17 There are other intermediate varieties, such as building a prefix/suffix index, but generally they provide less expressiveness in search queries while still having high complexity and indexing costs./
> 17 还有其他的类似方式，如建立前缀/后缀索引，但一般来说，它们在搜索查询中提供的表达能力较低，同时仍有较高的复杂性和索引成本。
> 
18 Russ Cox, “Regular Expression Matching with a Trigram Index or How Google Code Search Worked.”/
> 18 Russ Cox，"用三元索引进行正则表达式匹配或谷歌代码搜索的工作原理"。

## Conclusion

## 结论

Code Search grew from an organic replacement for grep into a central tool boosting developer productivity, leveraging Google’s web search technology along the way. What does this mean for you, though? If you are on a small project that easily fits in your IDE, probably not much. If you are responsible for the productivity of engineers on a larger codebase, there are probably some insights to be gained.

代码搜索从 grep 的有机替代品发展成为提高开发人员生产力的核心工具，并在此过程中利用了 Google 的网络搜索技术。不过，这对你意味着什么？如果你在一个很容易融入你的 IDE 的小项目上，可能不多。如果您负责在更大的代码库上提高工程师的生产力，那么您可能会获得一些见解。

The most important one is perhaps obvious: understanding code is key to developing and maintaining it, and this means that investing in understanding code will yield dividends that might be difficult to measure, but are real. Every feature we added to Code Search was and is used by developers to help them in their daily work (admittedly some more than others). Two of the most important features, Kythe integration (i.e., adding semantic code understanding) and finding working examples, are also the most clearly tied to understanding code (versus, for example, finding it, or seeing how it’s changed). In terms of tool impact, no one uses a tool that they don’t know exists, so it is also important to make developers aware of the available tooling—at Google, it is part of “Noogler” training, the onboarding training for newly hired software engineers.

最重要的一点可能是显而易见的：理解代码是开发和维护代码的关键，这意味着投资在理解代码上将产生可能难以衡量但实实在在的红利。我们添加到代码搜索中的每个功能都被开发人员用来帮助他们完成日常工作（诚然，其中一些功能比其他功能更多）。两个最重要的功能，Kythe 集成（即添加语义代码理解）和查找工作示例，也与理解代码最明显相关（例如，查找代码或查看代码如何更改）。就工具影响而言，没有人使用他们不知道存在的工具，因此让开发人员了解可用工具也很重要——在谷歌，它是“Noogler”培训的一部分，即新人的入职培训和聘请的软件工程师培训。

For you, this might mean setting up a standard indexing profile for IDEs, sharing knowledge about egrep, running ctags, or setting up some custom indexing tooling, like Code Search. Whatever you do, it will almost certainly be used, and used more, and in different ways than you expected—and your developers will benefit.

对您而言，这可能意味着为 IDE 设置标准索引配置文件、分享有关 egrep 的知识、运行 ctags 或设置一些自定义索引工具，例如代码搜索。无论你做什么，它几乎肯定会被使用，而且使用得更多，而且使用的方式与你预期的不同—你的开发人员将从中受益。

## TL;DRs  内容提要

• Helping your developers understand code can be a big boost to engineering productivity. At Google, the key tool for this is Code Search.

• 帮助您的开发人员理解代码可以大大提高工程生产力。在 Google，这方面的关键工具是代码搜索。

• Code Search has additional value as a basis for other tools and as a central, standard place that all documentation and developer tools link to.

• 作为其他工具的基础以及作为所有文档和开发工具连接到的中心标准位置，代码搜索具有附加价值。

• The huge size of the Google codebase made a custom tool—as opposed to, for example, grep or an IDE’s indexing—necessary.

• Google 代码库的庞大规模使得定制工具（例如，与 grep 或 IDE 的索引不同）成为必要。

• As an interactive tool, Code Search must be fast, allowing a “question and answer” workflow. It is expected to have low latency in every respect: search, browsing, and indexing.

• 作为一种交互式工具，代码搜索必须快速，允许“问题和回答”的工作流程。预计在各个方面都有低延迟：搜索，浏览和索引。

• It will be widely used only if it is trusted, and will be trusted only if it indexes all code, gives all results, and gives the desired results first. However, earlier, less powerful, versions were both useful and used, as long as their limits were understood.

• 只有当它被信任时才会被广泛使用，并且只有当它索引所有代码、给出所有结果并首先给出期望的结果时才会被信任。但是，只要了解其局限性，较早的、功能较弱的版本既有用又可以使用。

