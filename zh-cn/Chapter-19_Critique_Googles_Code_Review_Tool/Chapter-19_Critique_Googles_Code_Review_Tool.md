**CHAPTER 19**

# Critique: Google’s Code Review Tool

# 第十九章 体验：google的代码审查工具

**Written by Caitlin Sadowski, Ilham Kurnia, and Ben Rohlfs**

**Edited by Lisa Carey**

As you saw in Chapter 9, code review is a vital part of software development, particularly when working at scale. The main goal of code review is to improve the readability and maintainability of the code base, and this is supported fundamentally by the review process. However, having a well-defined code review process in only one part of the code review story. Tooling that supports that process also plays an important part in its success.

正如你在第9章中所看到的，代码审查是软件开发的重要组成部分，特别是在大规模工作时。代码审查的主要目标是提高代码库的可读性和可维护性，评审过程从根本上支持这一点。然而，拥有一个定义明确的代码审查过程只是代码审查流程的一个部分。支持该过程的工具在其成功中也起着重要作用。

In this chapter, we’ll look at what makes successful code review tooling via Google’s well-loved in-house system, Critique. Critique has explicit support for the primary motivations of code review, providing reviewers and authors with a view of the review and ability to comment on the change. Critique also has support for gatekeeping what code is checked into the codebase, discussed in the section on “scoring” changes. Code review information from Critique also can be useful when doing code archaeology, following some technical decisions that are explained in code review interactions (e.g., when inline comments are lacking). Although Critique is not the only code review tool used at Google, it is the most popular one by a large margin.

在本章中，我们将通过Google深受喜爱的内部系统Critique，来看看成功的代码审查工具的模样。Critique明确支持代码审查的主要功能，为审查者和作者提供审查的视图和对修改的评论能力。Critique还支持对哪些代码被检入代码库进行把关，这一点在 "评分 "更改一节中讨论。评论中的代码评审信息在进行代码考古时也很有用，遵循代码评审交互中解释的一些技术决策（例如，当缺少内联注释时）。尽管Critique并不是Google唯一使用的代码审查工具，但它是最受欢迎的工具。

## Code Review Tooling Principles 代码审查工具原则

We mentioned above that Critique provides functionality to support the goals of code review (we look at this functionality in more detail later in this chapter), but why is it so successful? Critique has been shaped by Google’s development culture, which includes code review as a core part of the workflow. This cultural influence translates into a set of guiding principles that Critique was designed to emphasize:
- *Simplicity*  
	Critique’s user interface (UI) is based around making it easy to do code review without a lot of unnecessary choices, and with a smooth interface. The UI loads fast, navigation is easy and hotkey supported, and there are clear visual markers for the overall state of whether a change has been reviewed.
- *Foundation of trust*  
	Code review is not for slowing others down; instead, it is for empowering others. Trusting colleagues as much as possible makes it work. This might mean, for example, trusting authors to make changes and not requiring an additional review phase to double check that minor comments are actually addressed. Trust also plays out by making changes openly accessible (for viewing and reviewing) across Google.
- *Generic communication*  
	Communication problems are rarely solved through tooling. Critique prioritizes generic ways for users to comment on the code changes, instead of complicated protocols. Critique encourages users to spell out what they want in their comments or even suggests some edits instead of making the data model and process more complex. Communication can go wrong even with the best code review tool because the users are humans.
- *Workflow integration*  
	Critique has a number of integration points with other core software development tools. Developers can easily navigate to view the code under review in our code search and browsing tool, edit code in our web-based code editing tool, or view test results associated with a code change.

我们在前面提到，Critique提供了支持代码审查目标的功能（我们在本章后面会详细介绍这种功能），但为什么它如此成功？Critique是基于Google的开发文化塑造的，其中包括代码审查作为工作流程的核心部分。这种文化影响转化为一套指导原则，Critique的设计就是为了强调这些原则：
- *简洁性*  
	Critique的用户界面（UI）基于使代码审查变得容易而不需要很多不必要的选择，并且具有流畅界面。用户界面加载速度快，导航简单，支持热键，而且有清晰的视觉标记，可以显示更改是否已审核的总体状态。
- *信任的基础*  
	代码审查不是为了拖慢别人，相反，它是为了授权他人。尽可能地信任同事使其发挥作用。这可能意味着，例如，信任作者进行修改，而不需要额外的审查阶段来再次检查是否确实解决了次要评论。信任还体现在使修改在整个谷歌上公开进行（供查看和审查）。
- *通用的沟通*  
	沟通问题很难通过工具来解决。Critique优先考虑让用户对代码修改进行评论的通用方法，而不是复杂的协定。评论鼓励用户详细说明他们想要的内容，甚至建议进行一些编辑，而不是使数据模型和过程更加复杂。即使是最好的代码审查工具，沟通也会出错，因为用户是人。
- *工作流程的集成*  
	Critique有很多与其他核心软件开发工具的集成点。开发人员可以在我们的代码搜索和浏览工具中轻松浏览正在审查的代码，在我们基于网络的代码编辑工具中编辑代码，或者查看与代码修改相关的测试结果。

Across these guiding principles, simplicity has probably had the most impact on the tool. There were many interesting features we considered adding, but we decided not to make the model more complicated to support a small set of users.

在这些指导原则中，简单性可能对这个工具影响最大。我们考虑过增加许多有趣的功能，但我们决定不为支持一小部分用户而使模型更加复杂。

Simplicity also has an interesting tension with workflow integration. We considered but ultimately decided against creating a “Code Central” tool with code editing, reviewing, and searching in one tool. Although Critique has many touchpoints with other tools, we consciously decided to keep code review as the primary focus. Features are linked from Critique but implemented in different subsystems.

简单与工作流程的整合也有一个有趣的矛盾。我们考虑过，但最终决定不创建一个集代码编辑、审查和搜索于一体的 "代码中心 "工具。尽管Critique与其他工具有许多接触点，但我们还是有意识地决定将代码审查作为主要关注点。特征与评论相关，但在不同的子系统中实施。

## Code Review Flow 代码审查流程
Code reviews can be executed at many stages of software development, as illustrated in Figure 19-1. Critique reviews typically take place before a change can be committed to the codebase, also known as precommit reviews. Although Chapter 9 contains a brief description of the code review flow, here we expand it to describe key aspects of Critique that help at each stage. We’ll look at each stage in more detail in the following sections.

代码审查可以在软件开发的许多阶段进行，如图19-1所示。评论评审通常在变更提交到代码库之前进行，也称为预提交评审。尽管第9章包含了对代码评审流程的简要描述，但在这里我们将其扩展，以描述Critique在每个阶段的关键作用。我们将在下面的章节中更详细地讨论每个阶段。

![Figure 19-1](./images/Figure%2019-1.png)

*Figure 19-1. The code review flow*

Typical review steps go as follows:

1. **Create a change.** A user authors a change to the codebase in their workspace. This *author* then uploads a *snapshot* (showing a patch at a particular point in time) to Critique, which triggers the run of automatic code analyzers (see [Chapter 20](#_bookmark1781)).
2. **Request** **review.** After the author is satisfied with the diff of the change and the result of the analyzers shown in Critique, they mail the change to one or more reviewers.
3. **Comment.** *Reviewers* open the change in Critique and draft comments on the diff. Comments are by default marked as *unresolved,* meaning they are crucial for the author to address. Additionally, reviewers can add *resolved* comments that are optional or informational. Results from automatic code analyzers, if present, are also visible to reviewers. Once a reviewer has drafted a set of comments, they need to *publish* them in order for the author to see them; this has the advantage of allowing a reviewer to provide a complete thought on a change atomically, after having reviewed the entire change. Anyone can comment on changes, providing a “drive-by review” as they see it necessary.
4. **Modify change and reply to comments.** The author modifies the change, uploads new snapshots based on the feedback, and replies back to the reviewers. The author addresses (at least) all unresolved comments, either by changing the code or just replying to the comment and changing the comment type to be *resolved*. The author and reviewers can look at diffs between any pairs of snapshots to see what changed. Steps 3 and 4 might be repeated multiple times.
5. **Change approval.** When the reviewers are happy with the latest state of the change, they approve the change and mark it as “looks good to me” (LGTM). They can optionally include comments to address. After a change is deemed good for submission, it is clearly marked green in the UI to show this state.
6. **Commit a change.** Provided the change is approved (which we’ll discuss shortly), the author can trigger the commit process of the change. If automatic analyzers and other precommit hooks (called “presubmits”) don’t find any problems, the change is committed to the codebase.

典型的审查步骤如下：
1. **创建一个变更。**一个用户对其工作区的代码库进行变更。然后这个*作者*向Critique上传一个*快照*（显示某一特定时间点的补丁），这将触发自动代码分析器的运行（见[第20章](#_bookmark1781)）。
2. **要求审查。**在作者对修改的差异和Critique中显示的分析器的结果感到满意后，他们将修改发送给一个或多个审查员。
3. **评论。**评论者在Critique中打开修改，并对diff起草评论。评论默认标记为*未解决*，意味着它们对作者来说是至关重要的。此外，评论者可以添加*已解决*的评论，这些评论是可选的或信息性的。自动代码分析器的结果，如果存在的话，也可以让审查者看到。一旦审查者起草了一组评论，他们需要*发布*它们，以便作者看到它们；这样做的好处是允许审查者在审查了整个修改后，以原子方式提供一个完整的想法。任何人都可以对变更发表评论，并在他们认为必要时提供“驱动式审查”。
4. **修改变更并回复评论。**作者修改变更，根据反馈上传新的快照，并回复评论者。作者处理（至少）所有未解决的评论，要么修改代码，要么直接回复评论并将评论类型改为*解决*。作者和审稿人可以查看任何一对快照之间的差异，看看有什么变化。步骤3和4可能要重复多次。
5. **变更批准。**当审查者对修改的最新状态感到满意时，他们会批准变更，并将其标记为 “我觉得不错"（LGTM）。他们可以选择包含已解决的评论。更改被认为适合提交后，在UI中会清楚地标记为绿色以显示此状态。
6. **提交变更。**只要变更被批准（我们很快会讨论），作者就可以触发变更的提交过程。如果自动分析器和其他预提交钩子（称为 "预提交"）没有发现任何问题，该变更就被提交到代码库中。

Even after the review process is started, the entire system provides significant flexibility to deviate from the regular review flow. For example, reviewers can un-assign themselves from the change or explicitly assign it to someone else, and the author can postpone the review altogether. In emergency cases, the author can forcefully commit their change and have it reviewed after commit.

即使在审查过程开始后，整个系统也提供了很大的灵活性来偏离常规的审查流程。例如，评审员可以取消自己对修改的分配，或者明确地将其分配给其他人，而作者可以完全推迟评审。在紧急情况下，作者可以强行提交他们的修改，并在提交后对其进行审查。

### Notifications 通知

As a change moves through the stages outlined earlier, Critique publishes event notifications that might be used by other supporting tools. This notification model allows Critique to focus on being a primary code review tool instead of a general purpose tool, while still being integrated into the developer workflow. Notifications enable a separation of concerns such that Critique can just emit events and other systems build off of those events.

当一个变更经过前面概述的阶段时，Critique 会发布可能被其他支持工具使用的事件通知。这种通知模式使Critique能够专注于成为一个主要的代码审查工具，而不是一个通用的工具，同时仍然能够集成到开发人员的工作流程中。通知实现了关注点的分离，这样Critique就可以直接发出事件，而其他系统则基于这些事件进行开发。

For example, users can install a Chrome extension that consumes these event notifications. When a change needs the user’s attention—for example, because it is their turn to review the change or some presubmit fails—the extension displays a Chrome notification with a button to go directly to the change or silence the notification. We have found that some developers really like immediate notification of change updates, but others choose not to use this extension because they find it is too disruptive to their flow.

例如，用户可以安装使用这些事件通知的Chrome扩展。当一个变更需要用户注意时--例如，当更改需要用户注意时，由于轮到用户查看更改或某个预提交失败--该扩展会显示一个Chrome通知，其中有一个按钮可直接转到更改或使通知静音。我们发现，一些开发者非常喜欢即时的变更更新通知，但也有人选择不使用这个扩展，因为他们觉得这对他们的工作流程太过干扰。

Critique also manages emails related to a change; important Critique events trigger email notifications. In addition to being displayed in the Critique UI, some analyzer findings are configured to also send the results out by email. Critique also processes email replies and translates them to comments, supporting users who prefer an email-based flow. Note that for many users, emails are not a key feature of code review; they use Critique’s dashboard view (discussed later) to manage reviews.

Critique还管理与变化有关的电子邮件；重要的Critique事件会触发电子邮件通知。除了在 Critique UI 中显示外，一些分析器的结果也被配置为通过电子邮件发送。Critique 还处理电子邮件回复并将其转换为评论，支持喜欢基于电子邮件的流程的用户。请注意，对许多用户来说，电子邮件并不是代码审查的一个关键特征；他们使用 Critique 的仪表盘视图（后面会讨论）来管理评论。

## Stage 1: Create a Change 阶段1：创建一个变更

A code review tool should provide support at all stages of the review process and should not be the bottleneck for committing changes. In the prereview step, making it easier for change authors to polish a change before sending it out for review helps reduce the time taken by the reviewers to inspect the change. Critique displays change diffs with knobs to ignore whitespace changes and highlight move-only changes. Critique also surfaces the results from builds, tests, and static analyzers, including style checks (as discussed in [Chapter 9](#_bookmark664)).

代码审查工具应该在审查过程的各个阶段提供支持，不应该成为提交更改的瓶颈。在审查前的步骤中，让修改者在送出审查前更容易打磨修正，有助于减少审查者检查修改的时间。Critique在显示修改差异时，可以忽略空白处的修改，并突出显示纯移动的修改。Critique还可以显示构建、测试和静态分析器的结果，包括样式检查（如第9章中所讨论的）。

Showing an author the diff of a change gives them the opportunity to wear a different hat: that of a code reviewer. Critique lets a change author see the diff of their changes as their reviewer will, and also see the automatic analysis results. Critique also supports making lightweight modifications to the change from within the review tool and suggests appropriate reviewers. When sending out the request, the author can also include preliminary comments on the change, providing the opportunity to ask reviewers directly about any open questions. Giving authors the chance to see a change just as their reviewers do prevents misunderstanding.

向作者展示修改的差异，让他们有机会拥有不同的思路：代码审查者的思路。Critique可以让修改作者像他们的审查者一样看到他们的修改的差异，也可以看到自动分析的结果。Critique还支持在审查工具中对变更进行轻量级的修改，并推荐合适的审查者。在发送请求时，作者也可以包括对修改的初步评论，提供机会直接向审查者询问任何公开的问题。让作者有机会像他们的审查者一样看到一个变化，可以防止误解。

To provide further context for the reviewers, the author can also link the change to a specific bug. Critique uses an autocomplete service to show relevant bugs, prioritizing bugs that are assigned to the author.

为了给审阅者提供进一步的上下文，作者还可以将更改链接到特定的bug。评论使用自动完成服务来显示相关的bug，并对分配给作者的bug进行优先级排序。

### Diffing 差异点
The core of the code review process is understanding the code change itself. Larger changes are typically more difficult to understand than smaller ones. Optimizing the diff of a change is thus a core requirement for a good code review tool.

代码审查过程的核心是理解代码变更本身。较大的变化通常比小的变化更难理解。因此，优化变更的差异是一个好的代码审查工具的核心要求。

In Critique, this principle translates onto multiple layers (see Figure 19-2). The diffing component, starting from an optimized longest common subsequence algorithm, is enhanced with the following:
•	Syntax highlighting
•	Cross-references (powered by Kythe; see Chapter 17)
•	Intraline diffing that shows the difference on character-level factoring in the word boundaries (Figure 19-2)
•	An option to ignore whitespace differences to a varying degree
•	Move detection, in which chunks of code that are moved from one place to another are marked as being moved (as opposed to being marked as removed here and added there, as a naive diff algorithm would)

在Critique中，这一原则转化为多个层面（见图19-2）。从优化的最长共同子序列算法开始，diffing组件得到了以下增强：
- 语法高亮
- 交叉引用（由Kythe提供，见第17章）
- 字符内差分，显示字符级的差异，并考虑到词的边界（图19-2）。
- 在不同程度上忽略空白差异的选项。
- 移动检测，在这种检测中，从一个地方移动到另一个地方的代码块被标记为正在移动（而不是像朴素的diff算法那样，在这里被标记为删除，在那里被添加）。

![Figure 19-2](./images/Figure%2019-2.png)

*Figure 19-2. Intraline diffing showing character-level differences*

Users can also view the diff in various different modes, such as overlay and side by side. When developing Critique, we decided that it was important to have side-by- side diffs to make the review process easier. Side-by-side diffs take a lot of space: to make them a reality, we had to simplify the diff view structure, so there is no border, no padding—just the diff and line numbers. We also had to play around with a variety of fonts and sizes until we had a diff view that accommodates even for Java’s 100- character line limit for the typical screen-width resolution when Critique launched (1,440 pixels).

用户还可以以各种不同的模式查看diff，如叠加和并排。在开发Critique时，我们决定必须有并排的diff，使审查过程更容易。并排diff需要很大的空间：为了使它们成为现实，我们必须简化diff视图结构，因此没有边框，没有填充，只有diff和行号。我们还不得不使用各种字体和尺寸，直到我们有了一种差异视图，即使是在Critique启动时典型的屏幕宽度分辨率（1440像素）下，也能满足Java的100个字符行数限制。

Critique further supports a variety of custom tools that provide diffs of artifacts produced by a change, such as a screenshot diff of the UI modified by a change or configuration files generated by a change.

Critique还支持各种定制工具，这些工具提供由变更产生的构件diff，例如由变更修改的UI屏幕截图差异或由变更生成的配置文件。

To make the process of navigating diffs smooth, we were careful not to waste space and spent significant effort ensuring that diffs load quickly, even for images and large files and/or changes. We also provide keyboard shortcuts to quickly navigate through files while visiting only modified sections.

为了使浏览diff的过程顺利进行，我们小心翼翼地避免浪费空间，并花费大量精力确保diff加载迅速，即使是图片和大文件和/或修改。我们还提供快捷键，以便在仅访问修改的部分时快速浏览文件。

When users drill down to the file level, Critique provides a UI widget with a compact display of the chain of snapshot versions of a file; users can drag and drop to select which versions to compare. This widget automatically collapses similar snapshots, drawing focus to important snapshots. It helps the user understand the evolution of a file within a change; for example, which snapshots have test coverage, have already been reviewed, or have comments. To address concerns of scale, Critique prefetches everything, so loading different snapshots is very quick.

当用户深入到文件层面时，Critique提供了一个UI小工具，紧凑地显示了文件的快照版本链；用户可以通过拖放来选择要比较的版本。这个小组件会自动折叠相似的快照，将注意力集中在重要的快照上。它帮助用户理解文件在变更中的演变；例如，哪些快照有测试覆盖率，已经被审查过，或者有评论。为了解决规模问题，Critique预取了所有内容，所以加载不同的快照非常快。

### Analysis Results 分析结果

Uploading a snapshot of the change triggers code analyzers (see [Chapter 20](#_bookmark1781)). Critique displays the analysis results on the change page, summarized by analyzer status chips shown below the change description, as depicted in [Figure 19-3](#_bookmark1742), and detailed in the Analysis tab, as illustrated in [Figure 19-4](#_bookmark1743).

上传变更的快照会触发代码分析器（见第20章）。Critique将分析结果显示在变更页面上，按分析器状态筹码汇总，显示在变更描述下面，如图19-3所示，并在分析标签中详细说明，如图19-4所示。

Analyzers can mark specific findings to highlight in red for increased visibility. Analyzers that are still in progress are represented by yellow chips, and gray chips are displayed otherwise. For the sake of simplicity, Critique offers no other options to mark or highlight findings—actionability is a binary option. If an analyzer produces some results (“findings”), clicking the chip opens up the findings. Like comments, findings can be displayed inside the diff but styled differently to make them easily distinguishable. Sometimes, the findings also include fix suggestions, which the author can preview and choose to apply from Critique.

分析器可以标记特定的结果，以红色突出显示，以提高可视性。仍在进行中的分析器由黄色卡片表示，否则显示灰色卡片。为了简单起见，Critique没有提供其他选项来标记或突出研究结果--可操作性是一个二元选项。如果一个分析器产生了一些结果（"研究结果"），点击卡片就可以打开研究结果。像评论一样，研究结果可以显示在diff里面，但风格不同，使它们容易区分。有时，研究结果也包括修正建议，作者可以预先查看这些建议，并从评论中选择应用。

![Figure 19-3](./images/Figure%2019-3.png)

*Figure* *19-3.* *Change* *summary* *and* *diff*  view

![Figure 19-4](./images/Figure%2019-4.png)

*Figure* *19-4.* *Analysis* *results*

For example, suppose that a linter finds a style violation of extra spaces at the end of the line. The change page will display a chip for that linter. From the chip, the author can quickly go to the diff showing the offending code to understand the style violation with two clicks. Most linter violations also include fix suggestions. With a click, the author can preview the fix suggestion (for example, remove the extra spaces), and with another click, apply the fix on the change.

例如，假设一个人发现行末有多余的空格，是违反风格的。更改页面将显示该linter的卡片。从卡片中，作者可以快速转到显示违规代码的diff，只需点击两次就能了解样式违规。大多数违规的linter也包括修复建议。通过点击，作者可以预览修正建议（例如，删除多余的空格），并通过另一次点击，在修改中应用修正。

### Tight Tool Integration 紧密的工具集成

Google has tools built on top of Piper, its monolithic source code repository (see [Chapter 16](#_bookmark1364)), such as the following:
- Cider, an online IDE for editing source code stored in the cloud
- Code Search, a tool for searching code in the codebase
- Tricorder, a tool for displaying static analysis results (mentioned earlier)
- Rapid, a release tool that packages and deploys binaries containing a series of changes
- Zapfhahn, a test coverage calculation tool

谷歌拥有建立在Piper--其单体源代码库（见第16章）之上的工具，例如以下这些。
- Cider，用于编辑云中存储的源代码的在线IDE
- 代码搜索，用于在代码库中搜索代码的工具
- Tricorder，用于显示静态分析结果的工具（前面提到）
- Rapid，一个打包和部署包含一系列更改的二进制文件的发布工具
- Zapfhahn，一个测试覆盖率计算工具

Additionally, there are services that provide context on change metadata (for example, about users involved in a change or linked bugs). Critique is a natural melting pot for a quick one-click/hover access or even embedded UI support to these systems, although we need to be careful not to sacrifice simplicity. For example, from a change page in Critique, the author needs to click only once to start editing the change further in Cider. There is support to navigate between cross-references using Kythe or view the mainline state of the code in Code Search (see [Chapter 17](#_bookmark1485)). Critique links out to the release tool so that users can see whether a submitted change is in a specific release. For these tools, Critique favors links rather than embedding so as not to distract from the core review experience. One exception here is test coverage: the information of whether a line of code is covered by a test is shown by different background colors on the line gutter in the file’s diff view (not all projects use this coverage tool).

此外，还有一些服务可以提供变更元数据的上下文（例如，关于参与变更的用户或链接的错误）。Critique是一个很自然的熔炉，它可以快速地一键/悬停访问这些系统，甚至支持嵌入式UI，尽管我们需要小心不要牺牲简单性。例如，在Critique的修改页面上，作者只需要点击一次就可以在Cider中进一步编辑修改。我们支持使用Kythe在交叉引用之间进行导航，或在代码搜索中查看代码的主线状态（见第17章）。Critique链接到发布工具，这样用户就可以看到提交的变更是否在一个特定的版本中。对于这些工具，Critique更倾向于链接而不是嵌入，这样就不会分散对核心评审经验的注意力。这里的一个例外是测试覆盖率：测试是否覆盖代码行的信息由文件的diff视图中的行槽上的不同背景色显示（并非所有项目都使用此覆盖率工具）。

Note that tight integration between Critique and a developer’s workspace is possible because of the fact that workspaces are stored in a FUSE-based filesystem, accessible beyond a particular developer’s computer. The Source of Truth is hosted in the cloud and accessible to all of these tools.

请注意，Critique和开发者的工作空间之间的紧密结合是可能的，因为工作空间存储在一个基于FUSE的文件系统中，可以在特定开发者的计算机之外访问。真相之源托管在云中，所有这些工具都可以访问。

## Stage 2: Request Review 阶段2：发送审查

After the author is happy with the state of the change, they can send it for review, as depicted in [Figure 19-5](#_bookmark1751). This requires the author to pick the reviewers. Within a small team, finding a reviewer might seem simple, but even there it is useful to distribute reviews evenly across team members and consider situations like who is on vacation. To address this, teams can provide an email alias for incoming code reviews. The alias is used by a tool called *GwsQ* (named after the initial team that used this technique:  
(Google Web Server) that assigns specific reviewers based on the configuration linked to the alias. For example, a change author can assign a review to some-team-list-alias, and GwsQ will pick a specific member of some-team-list-alias to perform the review.

在作者对更改的状态感到满意后，他们可以把它送去审查，如图19-5中所描述的。这需要作者挑选审查者。在一个小团队内，寻找审查者可能看起来很简单，但是即使在团队成员之间均匀地分配评论，也需要考虑像是谁休假的情况。为了解决这个问题，团队可以为收到的代码审查提供一个电子邮件别名。这个别名被一个叫做*GwsQ*的工具所使用（以最初使用这种技术的团队命名：
（谷歌网络服务器），它根据链接到别名的配置分配特定的审阅者。例如，变更作者可以将评审分配给某个团队列表别名，GwsQ将选择某个团队列表别名的特定成员来执行评审。

![Figure 19-5](./images/Figure%2019-5.png)

Figure 19-5. Requesting reviewers

Given the size of Google’s codebase and the number of people modifying it, it can be difficult to find out who is best qualified to review a change outside your own project. Finding reviewers is a problem to consider when reaching a certain scale. Critique must deal with scale. Critique offers the functionality to propose sets of reviewers that are sufficient to approve the change. The reviewer selection utility takes into account the following factors:
*   Who owns the code that is being changed (see the next section)
*   Who is most familiar with the code (i.e., who recently changed it)
*   Who is available for review (i.e., not out of office and preferably in the same time zone)
*   The GwsQ team alias setup

考虑到谷歌代码库的规模和修改代码的人数，很难找出谁最有资格审查你自己项目之外的变更。发现审查者在达到一定的规模时要考虑的问题。评论必须处理规模问题。Critique提供了建议一组足以批准更改的审阅者的功能。评审员的选择工具考虑到了以下因素。
- 谁拥有被修改的代码（见下一节）
- 谁对该代码最熟悉（即，谁最近修改过该代码）。
- 谁可以进行审查（即没有离开办公室，最好是在同一时区）。
- GwsQ团队的别名设置

Assigning a reviewer to a change triggers a review request. This request runs “presubmits” or precommit hooks applicable to the change; teams can configure the presubmits related to their projects in many ways. The most common hooks include the following:
•   Automatically adding email lists to changes to raise awareness and transparency
•   Running automated test suites for the project
•   Enforcing project-specific invariants on both code (to enforce local code style restrictions) and change descriptions (to allow generation of release notes or other forms of tracking)

为一个变更指定一个审查员会触发一个审查请求。该请求运行适用于该变更的 "预提交 "或预提交钩子；团队可以以多种方式配置与他们的项目相关的预提交。最常见的钩子包括以下内容：
- 自动将电子邮件列表添加到更改中，以提高意识和透明度
- 为项目运行自动化测试套件
- 对代码（强制执行本地代码风格限制）和变更描述（允许生成发布说明或其他形式的跟踪）执行项目特定的不变因素

As running tests is resource intensive, at Google they are part of presubmits (run when requesting review and when committing changes) rather than for every snapshot like Tricorder checks. Critique surfaces the result of running the hooks in a similar way to how analyzer results are displayed, with an extra distinction to highlight the fact that a failed result blocks the change from being sent for review or committed. Critique notifies the author via email if presubmits fail.

 由于运行测试是资源密集型的，在Google，它们是预提交的一部分（在请求审查和提交修改时运行），而不是像Tricorder检查那样为每个快照运行。Critique以类似于分析器结果的方式显示运行钩子的结果，并有一个额外的区别，即失败的结果会阻止修改被送审或提交。如果预提交失败，Critique会通过电子邮件通知作者。

## Stages 3 and 4: Understanding and Commenting on a Change 阶段3和4：理解和评论变更

After the review process starts, the author and the reviewers work in tandem to reach the goal of committing changes of high quality.

审查过程开始后，作者和审查员协同工作，以达到提交高质量变更的目标。

### Commenting 评论

Making comments is the second most common action that users make in Critique after viewing changes (Figure 19-6). Commenting in Critique is free for all. Anyone—not only the change author and the assigned reviewers—can comment on a change.

发表评论是用户在Critique查看修改后的第二常见的行为（图19-6）。评论中的评论对所有人都是公开的。任何人--不仅仅是修改作者和指定的评审者--都可以对修改进行评论。

Critique also offers the ability to track review progress via per-person state. Reviewers have checkboxes to mark individual files at the latest snapshot as reviewed, helping the reviewer keep track of what they have already looked at. When the author modifies a file, the “reviewed” checkbox for that file is cleared for all reviewers because the latest snapshot has been updated.

评论还提供了通过个人状态跟踪审查进度的能力。审阅者有复选框将最新快照中的单个文件标记为已审阅，以帮助审阅者跟踪他们已查看的内容。当作者修改文件时，所有审阅者都会清除该文件的“审阅”复选框，因为最新快照已更新。

![Figure 19-6](./images/Figure%2019-6.png)

*Figure 19-6. Commenting on the diff view*

When a reviewer sees a relevant analyzer finding, they can click a “Please fix” button to create an unresolved comment asking the author to address the finding. Reviewers can also suggest a fix to a change by inline editing the latest version of the file. Critique transforms this suggestion into a comment with a fix attached that can be applied by the author.

当审查者看到一个相关的分析器发现时，他们可以点击 "请修复 "按钮，创建一个未解决的评论，要求作者解决这个问题。审查者还可以通过内联编辑文件的最新版本来建议修改。Critique将此建议转换为评论，并附上一个作者可以应用的修复程序。

Critique does not dictate what comments users should create, but for some common comments, Critique provides quick shortcuts. The change author can click the “Done” button on the comment panel to indicate when a reviewer’s comment has been addressed, or the “Ack” button to acknowledge that the comment has been read, typically used for informational or optional comments. Both have the effect of resolving the comment thread if it is unresolved. These shortcuts simplify the workflow and reduce the time needed to respond to review comments.

Critique 没有规定用户应该创建什么评论，但对于一些常见的评论，Critique 提供了快速的快捷方式。修改者可以点击评论面板上的 "完成 "按钮，以表示审查者的评论已被解决，或者点击 "Ack "按钮，以确认评论已被阅读，通常用于信息性或选择性评论。如果标注的评论未被解决，两者都有解决的效果。这些快捷方式简化了工作流程，减少了回复评论所需的时间。

As mentioned earlier, comments are drafted as-you-go, but then “published” atomically, as shown in [Figure 19-7](#_bookmark1758). This allows authors and reviewers to ensure that they are happy with their comments before sending them out.

如前所述，评论是随心所欲地起草的，但随后以原子方式 "发表"，如图19-7所示。这允许作者和审查者在发送评论之前确保他们对自己的评论感到满意。

![Figure 19-7](./images/Figure%2019-7.png)

*Figure 19-7. Preparing comments to the author*

### Understanding the State of a Change 了解变化的状态

Critique provides a number of mechanisms to make it clear where in the comment- and-iterate phase a change is currently located. These include a feature for determining who needs to take action next, and a dashboard view of review/author status for all of the changes with which a particular developer is involved.

Critique提供了一些机制，使人们清楚地了解到某项修改目前处于评论和迭代阶段的什么位置。这些机制包括确定谁需要采取下一步行动的功能，以及特定开发者参与的所有修改的审查/作者状态的仪表盘视图。

#### “Whose turn” feature “轮到谁”功能

One important factor in accelerating the review process is understanding when it’s your turn to act, especially when there are multiple reviewers assigned to a change. This might be the case if the author wants to have their change reviewed by a software engineer and the user-experience person responsible for the feature, or the SRE carrying the pager for the service. Critique helps define who is expected to look at the change next by managing an *attention set* for each change.

加快审查过程的一个重要因素是了解什么时候轮到你干活了，特别是当有多个审查员被分配到一个变更时。如果作者想让软件工程师和负责该功能的用户体验人员审查他们的变更，或者为服务准备部署的SRE人员审查其更改，可能就是这种情况。通过管理每个变更的关注集，评论有助于确定下一个变更的关注者。

The attention set comprises the set of people on which a change is currently blocked. When a reviewer or author is in the attention set, they are expected to respond in a timely manner. Critique tries to be smart about updating the attention set when a user publishes their comments, but users can also manage the attention set themselves. Its usefulness increases even more when there are more reviewers in the change. The attention set is surfaced in Critique by rendering the relevant usernames in bold.

关注集由当前阻止更改的一组人组成。当评论者或作者在关注集中时，他们应该及时作出回应。Critique自动化地在用户发表评论时更新关注集，但用户也可以自己管理关注集。当变化中的评论者较多时，它的作用就更大了。在Critique中，关注集是通过将相关的用户名用黑体字显示出来的。

After we implemented this feature, our users had a difficult time imagining the previous state. The prevailing opinion is: how did we get along without this? The alternative before we implemented this feature was chatting between reviewers and authors to understand who was dealing with a change. This feature also emphasizes the turn- based nature of code review; it is always at least one person’s turn to take action.

在我们实施这一功能后，我们的用户很难想象以前的状态。普遍的看法是：如果没有这个，我们是怎么过的？在我们实施这个功能之前，另一个选择是审查员和作者之间的聊天，以了解谁在处理一个变化。这个功能也强调了代码审查的轮流性质；总是至少轮到一个人采取行动。

#### Dashboard and search system 仪表板和搜索系统

Critique’s landing page is the user’s dashboard page, as depicted in [Figure 19-8](#_bookmark1762). The dashboard page is divided into user-customizable sections, each of them containing a list of change summaries.

Critique的登陆页面是用户的仪表盘页面，如图19-8所示。仪表盘页面被分为用户可定制的部分，每个部分都包含一个变更摘要列表。

![Figure 19-8](./images/Figure%2019-8.png)

*Figure* *19-8. Dashboard view*

The dashboard page is powered by a search system called *Changelist Search*. Changelist Search indexes the latest state of all available changes (both pre- and post-submit) across all users at Google and allows its users to look up relevant changes by regular expression–based queries. Each dashboard section is defined by a query to Changelist Search. We have spent time ensuring Changelist Search is fast enough for interactive use; everything is indexed quickly so that authors and reviewers are not slowed down, despite the fact that we have an extremely large number of concurrent changes happening simultaneously at Google.

仪表板页面是由一个名为*Changelist Search*的搜索系统提供的。Changelist Search索引了谷歌所有用户的所有可用变化的最新状态（包括提交前和提交后），并允许其用户通过基于正则表达式的查询来查找相关变化。每个仪表板部分都由对Changelist Search的查询来定义。我们花了很多时间来确保Changelist Search搜索足够快；所有的东西都被快速索引，这样作者和审稿人就不会被拖慢，尽管事实上谷歌同时出现了大量的并发更改。

To optimize the user experience (UX), Critique’s default dashboard setting is to have the first section display the changes that need a user’s attention, although this is customizable. There is also a search bar for making custom queries over all changes and browsing the results. As a reviewer, you mostly just need the attention set. As an author, you mostly just need to take a look at what is still waiting for review to see if you need to ping any changes. Although we have shied away from customizability in some other parts of the Critique UI, we found that users like to set up their dashboards differently without detracting from the fundamental experience, similar to the way everyone organizes their emails differently.[^1]

为了优化用户体验（UX），Critique的默认仪表盘设置是在第一部分显示需要用户关注的变更，不过这也是可以定制的。还有一个搜索栏，可以对所有修改进行自定义查询，并浏览结果。作为一个审查员，你大多只需要关注集。作为一个作者，你大多数时候只需要看一下哪些东西还在等待审查，看看你是否需要修正。尽管我们在Critique用户界面的一些其他部分回避了可定制性，但我们发现用户喜欢以不同的方式设置他们的仪表板，而不影响基本的体验，就像每个人以不同的方式组织他们的电子邮件一样。

> 1 Centralized “global” reviewers for large-scale changes (LSCs) are particularly prone to customizing this dashboard to avoid flooding it during an LSC (see Chapter 22)./
>  1 大规模变更（LSCs）的集中式 "全球 "审查员特别容易定制这个仪表盘，以避免在LSC期间淹没它（见第22章）。

## Stage 5: Change Approvals (Scoring a Change) 阶段5：变更批准（对变更进行评分）

Showing whether a reviewer thinks a change is good boils down to providing concerns and suggestions via comments. There also needs to be some mechanism for providing a high-level “OK” on a change. At Google, the scoring for a change is divided into three parts:
•   LGTM (“looks good to me”)
•   Approval
•   The number of unresolved comments

显示一个审查员是否认为一个变更是好的，归根结底是通过评论提供关注和建议。此外，还需要有一些机制来提供一个高水平的 "OK"。在谷歌，对一个变化的打分分为三个部分：
- LGTM（“我觉得不错”）
- 批准
- 未解决的评论的数量

An LGTM stamp from a reviewer means that “I have reviewed this change, believe that it meets our standards, and I think it is okay to commit it after addressing unresolved comments.” An Approval stamp from a reviewer means that “as a gatekeeper, I allow this change to be committed to the codebase.” A reviewer can mark comments as unresolved, meaning that the author will need to act upon them. When the change has at least one LGTM, sufficient approvals and no unresolved comments, the author can then commit the change. Note that every change requires an LGTM regardless of approval status, ensuring that at least two pairs of eyes viewed the change. This simple scoring rule allows Critique to inform the author when a change is ready to commit (shown prominently as a green page header).

审查者的LGTM印章意味着 "我已经审阅了这个变更，相信它符合我们的标准，我认为在解决了未解决的评论之后，可以提交它。” 审查者的批准标识意味着 "作为一个把关人，我允许这个修改被提交到代码库中"。审查者可以将评论标记为未解决，这意味着作者需要对其采取行动。当变更至少有一个LGTM、足够的批准和没有未解决的评论时，作者可以提交变更。请注意，无论批准状态如何，每项变更都需要一个LGTM，以确保至少有两双眼睛查看该变更。这个简单的评分规则使Critique可以在修改准备好提交时通知作者（以绿色页眉的形式突出显示）。

```
1	Centralized “global” reviewers for large-scale changes (LSCs) are particularly prone to customizing this dashboard to avoid flooding it during an LSC (see Chapter 22).
1   大规模变更（LSC）的集中式“全局”评审员特别倾向于定制此仪表板，以避免在LSC期间将其淹没（参见第22章）。
```

We made a conscious decision in the process of building Critique to simplify this rating scheme. Initially, Critique had a “Needs More Work” rating and also a “LGTM++”. The model we have moved to is to make LGTM/Approval always positive. If a change definitely needs a second review, primary reviewers can add comments but without LGTM/Approval. After a change transitions into a mostly-good state, reviewers will typically trust authors to take care of small edits—the tooling does not require repeated LGTMs regardless of change size.

在建立Critique的过程中，我们有意识地决定简化这一评分方案。最初，Critique有一个 "需要更多工作 "的评级，也有一个 "LGTM++"。我们所采用的模式是使 `LGTM/批准` 总是积极的。如果变更确实需要第二次审核，主要审查者可以添加内容，但无需LGTM/批准。在一个变化过渡到基本良好的状态后，审查员通常会相信作者会处理好小的编辑--无论变更大小如何，该工具都不需要重复LGTM。

This rating scheme has also had a positive influence on code review culture. Reviewers cannot just thumbs-down a change with no useful feedback; all negative feedback from reviewers must be tied to something specific to be fixed (for example, an unresolved comment). The phrasing “unresolved comment” was also chosen to sound relatively nice.

这种评分方案也对代码审查文化产生了积极影响。审查者不能在没有任何有用反馈的情况下对一个改动竖起大拇指；所有来自审查者的负面反馈都必须与需要修复的具体内容相联系（例如，一个未解决的评论）。选择 "未解决的评论 "这一措辞也是为了听起来比较好。

Critique includes a scoring panel, next to the analysis chips, with the following information:
•   Who has LGTM’ed the change
•   What approvals are still required and why
•   How many unresolved comments are still open

批评包括一个打分板，在分析卡片旁边，有以下信息。
- 谁进行了变更
- 还需要哪些批准，为什么？
- 有多少的评论仍未解决

Presenting the scoring information this way helps the author quickly understand what they still need to do to get the change committed.

以这种方式呈现评分信息有助于作者快速了解他们仍然需要做些什么才能实现更改。

LGTM and Approval are *hard* requirements and can be granted only by reviewers. Reviewers can also revoke their LGTM and Approval at any time before the change is committed. Unresolved comments are *soft* requirements; the author can mark a comment “resolved” as they reply. This distinction promotes and relies on trust and communication between the author and the reviewers. For example, a reviewer can LGTM the change accompanied with unresolved comments without later on checking precisely whether the comments are truly addressed, highlighting the trust the reviewer places on the author. This trust is particularly important for saving time when there is a significant difference in time zones between the author and the reviewer. Exhibiting trust is also a good way to build trust and strengthen teams.

LGTM和批准是*硬性*要求，只能由审查者授予。在提交变更之前，审查者还可以随时撤销其LGTM和批准。未解决的评论是*软*要求；作者可以在回复时将评论标记为 "已解决"。这种区别促进并依赖于作者和审查者之间的信任和沟通。例如，审查者可以在LGTM的修改中伴随着未解决的评论，而不需要后来精确地检查这些评论是否真正被解决，这突出了审稿人对作者的信任。当作者和审稿人之间存在明显的时区差异时，这种信任对于节省时间尤为重要。展现信任也是建立信任和加强团队的一个好方法。

## Stage 6: Commiting a Change 阶段6：提交变更

Last but not least, Critique has a button for committing the change after the review to avoid context-switching to a command-line interface.

最后但并非最不重要的是，Critique有一个在审查后提交修改的按钮，以避免上下文切换到命令行界面。

### After Commit: Tracking History 提交后：跟踪历史记录

In addition to the core use of Critique as a tool for reviewing source code changes before they are committed to the repository, Critique is also used as a tool for change archaeology. For most files, developers can view a list of the past history of changes that modified a particular file in the Code Search system (see [Chapter 17](#_bookmark1485)), or navigate directly to a change. Anyone at Google can browse the history of a change to generally viewable files, including the comments on and evolution of the change. This enables future auditing and is used to understand more details about why changes were made or how bugs were introduced. Developers can also use this feature to learn how changes were engineered, and code review data in aggregate is used to produce trainings.

除了Critique的核心用途是在源代码修改提交到版本库之前对其进行审查外，Critique还被用作变更考古的工具。对于大多数文件，开发者可以在代码搜索系统中查看过去修改某个文件的历史列表（见第17章），或者直接导航到某个修改。Google的任何人都可以浏览一般可查看文件的修改历史，包括对修改的评论和演变。这使未来的审计成为可能，并被用来了解更多的细节，如为什么会做出改变或如何引入bug。开发人员也可以使用这个功能来了解变化是如何被设计的，代码审查数据的汇总被用来制作培训。

Critique also supports the ability to comment after a change is committed; for example, when a problem is discovered later or additional context might be useful for someone investigating the change at another time. Critique also supports the ability to roll back changes and see whether a particular change has already been rolled back.

Critique 还支持在修改提交后进行评论的能力；例如，当后来发现问题或额外的背景可能对另一个时间调查修改的人有用。Critique还支持回滚修改的能力，以及查看某一修改是否已经被回滚。

------

Case Study: Gerrit 案例研究：Gerrit

Although Critique is the most commonly used review tool at Google, it is not the only one. Critique is not externally available due to its tight interdependencies with our large monolithic repository and other internal tools. Because of this, teams at Google that work on open source projects (including Chrome and Android) or internal projects that can’t or don’t want to be hosted in the monolithic repository use a different code review tool: Gerrit.

尽管Critique是Google最常用的审查工具，但它并不是唯一的工具。由于Critique与我们的大型单体库和其他内部工具有紧密的相互依赖关系，所以Critique不能对外使用。正因为如此，在谷歌从事开源项目（包括Chrome和Android）或内部项目的团队，如果不能或不想托管在单片库中，就会使用另一种代码审查工具：Gerrit。

Gerrit is a standalone, open source code review tool that is tightly integrated with the Git version control system. As such, it offers a web UI to many Git features including code browsing, merging branches, cherry-picking commits, and, of course, code review. In addition, Gerrit has a fine-grained permission model that we can use to restrict access to repositories and branches.

Gerrit是一个独立的开源代码审查工具，与Git版本控制系统紧密集成。因此，它为许多Git特性提供了一个web UI，包括代码浏览、合并分支、提交，当然还有代码审查。此外，Gerrit有一个细粒度的权限模型，我们可以使用它来限制对存储库和分支的访问。

Both Critique and Gerrit have the same model for code reviews in that each commit is reviewed separately. Gerrit supports stacking commits and uploading them for individual review. It also allows the chain to be committed atomically after it’s reviewed.

Commission和Gerrit都有相同的代码评审模型，每个提交都是单独评审的。Gerrit支持堆叠提交并将其上载以供个人审阅。它还允许在对链进行审查后以原子方式提交链

Being open source, Gerrit accommodates more variants and a wider range of use cases; Gerrit’s rich plug-in system enables a tight integration into custom environments. To support these use cases, Gerrit also supports a more sophisticated scoring system. A reviewer can veto a change by placing a –2 score, and the scoring system is highly configurable.

由于是开源的，Gerrit适应了更多的变体和更广泛的用例；Gerrit丰富的插件系统实现了与定制环境的紧密集成。为了支持这些用例，Gerrit还支持更复杂的评分系统。评审员可以通过给-2分否决变更，评分系统是高度可配置的。

You can learn more about Gerrit and see it in action at [*https://www.gerritcodereview.com*](https://www.gerritcodereview.com/).

你可以在[*https://www.gerritcodereview.com*](https://www.gerritcodereview.com/)了解更多关于Gerrit的信息，并看到它的运行情况。

------

## Conclusion 总结

There are a number of implicit trade-offs when using a code review tool. Critique builds in a number of features and integrates with other tools to make the review process more seamless for its users. Time spent in code reviews is time not spent coding, so any optimization of the review process can be a productivity gain for the company. Having only two people in most cases (author and reviewer) agree on the change before it can be committed keeps velocity high. Google greatly values the educational aspects of code review, even though they are more difficult to quantify.

在使用代码审查工具时，有一些隐含的权衡因素。Critique内置了许多功能，并与其他工具集成，使用户的审查过程更加完美。花在代码评审上的时间并不是比花在编码上的时间少多少，所以评审过程的任何优化都可以提高公司的生产效率。在大多数情况下，只有两个人（作者和审查者）在提交修改前达成一致，可以保持高速度。谷歌非常重视代码审查的培训方面，尽管它们更难以量化。

To minimize the time it takes for a change to be reviewed, the code review process should flow seamlessly, informing users succinctly of the changes that need their attention and identifying potential issues before human reviewers come in (issues are caught by analyzers and Continuous Integration). When possible, quick analysis results are presented before the longer-running analyses can finish.

为了最大限度地减少评审更改所需的时间，代码评审过程应该无缝流动，简洁地告知用户需要关注的更改，并在人工评审员介入之前确定潜在问题（问题由分析人员和持续集成人员发现）。如果可能，在较长时间运行的分析完成之前，会显示快速分析结果。

There are several ways in which Critique needs to support questions of scale. The Critique tool must scale to the large quantity of review requests produced without suffering a degradation in performance. Because Critique is on the critical path to getting changes committed, it must load efficiently and be usable for special situations such as unusually large changes.[^2](#_bookmark1778) The interface must support managing user activities (such as finding relevant changes) over the large codebase and help reviewers and authors navigate the codebase. For example, Critique helps with finding appropriate reviewers for a change without having to figure out the ownership/maintainer landscape (a feature that is particularly important for large-scale changes such as API migrations that can affect many files).

Critique需要在几个方面支持规模问题。Critique工具必须在不降低性能的情况下，适应大量的审查请求。由于Critique是在提交修改的关键路径上，它必须有效地加载，并能在特殊情况下使用，如异常大的修改。界面必须支持在大型代码库中管理用户活动（如寻找相关修改），并帮助评审员和作者浏览代码库。例如，Critique有助于为某一变更找到合适的审查者，而不必弄清所有权/维护者的情况（这一功能对于大规模的变更，如可能影响许多文件的API迁移，尤为重要）。

Critique favors an opinionated process and a simple interface to improve the general review workflow. However, Critique does allow some customizability: custom analyzers and presubmits provide specific context on changes, and some team-specific policies (such as requiring LGTM from multiple reviewers) can be enforced.

Critique倾向于采用意见一致的流程和简单的界面来改善一般的审查工作流程。然而，Critique确实允许一些自定义功能：自定义分析器和预提交提供了具体的修改内容，而且可以强制执行一些特定的团队策略（如要求多个审稿人提供LGTM）。

> [^2]:	Although most changes are small (fewer than 100 lines), Critique is sometimes used to review large refactoring changes that can touch hundreds or thousands of files, especially for LSCs that must be executed atomically (see Chapter 22)./
> 2 尽管大多数改动都很小（少于100行），但Critique有时也被用来审查大型的重构改动，这些改动可能会触及成百上千个文件，特别是对于那些必须原子化执行的LSCs（见第22章）。

Trust and communication are core to the code review process. A tool can enhance the experience, but can’t replace them. Tight integration with other tools has also been a key factor in Critique’s success.

信任和沟通是代码审查过程的核心。工具可以增强体验，但不能替代它们。与其他工具的紧密结合也是Critique成功的一个关键因素。

## TL;DRs  内容提要

•   Trust and communication are core to the code review process. A tool can enhance the experience, but it can’t replace them.
•   Tight integration with other tools is key to great code review experience.
•   Small workflow optimizations, like the addition of an explicit “attention set,” can increase clarity and reduce friction substantially.

- 信任和沟通是代码审查过程的核心。工具可以增强体验，但不能替代它们。
- 与其他工具的紧密集成是获得优秀代码审查体验的关键。
- 小的工作流程优化，如增加一个明确的 "关注集"，可以提高清晰度并大大减少摩擦。

