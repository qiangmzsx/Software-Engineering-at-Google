
**CHAPTER 10**

# Documentation

# 第十章 文档

**Written by Tom Manshreck**

**Edited by Riona MacNamara**

Of the complaints most engineers have about writing, using, and maintaining code, a singular common frustration is the lack of quality documentation. “What are the side effects of this method?” “I got an error after step 3.” “What does this acronym mean?” “Is this document up to date?” Every software engineer has voiced complaints about the quality, quantity, or sheer lack of documentation throughout their career, and the software engineers at Google are no different.

在大多数工程师对编写、使用和维护代码的抱怨中，一个常见的问题是缺乏高质量的文档。"这个方法的副作用是什么？" "我在第三步之后出错了。”“这个缩写词是什么意思？”“这份文档是最新的吗？”每个软件工程师在他们的职业生涯中都对文档的质量、数量或完全缺失提出过抱怨，谷歌的软件工程师也不例外。

Technical writers and project managers may help, but software engineers will always need to write most documentation themselves. Engineers, therefore, need the proper tools and incentives to do so effectively. The key to making it easier for them to write quality documentation is to introduce processes and tools that scale with the organization and that tie into their existing workflow.

技术撰稿人和项目经理可以提供帮助，但软件工程师总是需要自己编写大部分的文档。因此，工程师需要适当的工具和激励来有效地做到这一点。让他们更便捷地写出高质量的文档的关键是引入随组织扩展并与现有工作流程相结合的流程和工具。

Overall, the state of engineering documentation in the late 2010s is similar to the state of software testing in the late 1980s. Everyone recognizes that more effort needs to be made to improve it, but there is not yet organizational recognition of its critical benefits. That is changing, if slowly. At Google, our most successful efforts have been when documentation is treated like code and incorporated into the traditional engineering workflow, making it easier for engineers to write and maintain simple documents.

总体而言，2010年代末的工程文档状况与1980年代末的软件测试状态相似。每个人都认识到需要做出更多的努力来改善它，但还没有组织上认识到它的关键好处。这种情况正在改变，尽管很缓慢。在谷歌，我们最成功的努力是将文档像代码一样对待，并将其纳入传统的工程工作流程，使工程师更便捷地编写和维护文档。

## What Qualifies as Documentation? 什么是合格的文档？

When we refer to “documentation,” we’re talking about every supplemental text that an engineer needs to write to do their job: not only standalone documents, but code comments as well. (In fact, most of the documentation an engineer at Google writes comes in the form of code comments.) We’ll discuss the various types of engineering documents further in this chapter.

当我们提到“文档”时，我们谈论的是工程师为完成工作需要编写的每一个补充文本：不仅是独立文档，还有代码注释。(事实上，谷歌的工程师所写的大部分文档都是以代码注释的形式出现的）。我们将在本章进一步讨论各种类型的工程文档。

## Why Is Documentation Needed? 为什么需要文档？

Quality documentation has tremendous benefits for an engineering organization. Code and APIs become more comprehensible, reducing mistakes. Project teams are more focused when their design goals and team objectives are clearly stated. Manual processes are easier to follow when the steps are clearly outlined. Onboarding new members to a team or code base takes much less effort if the process is clearly documented.

高质量的文档对一个工程组织有巨大的好处。代码和API变得更容易理解，减少了错误。当项目团队的设计目标和团队目标明确时，他们会更加专注。当步骤被清楚地列出时，手动流程更容易被遵循。如果流程有明确的文档记录，那么将新成员加入团队或代码库所需的工作量要小得多。

But because documentation’s benefits are all necessarily downstream, they generally don’t reap immediate benefits to the author. Unlike testing, which (as we’ll see) quickly provides benefits to a programmer, documentation generally requires more effort up front and doesn’t provide clear benefits to an author until later. But, like investments in testing, the investment made in documentation will pay for itself over time. After all, you might write a document only once,[^1] but it will be read hundreds, perhaps thousands of times afterward; its initial cost is amortized across all the future readers. Not only does documentation scale over time, but it is critical for the rest of the organization to scale as well. It helps answer questions like these:

- Why were these design decisions made?
- Why did we implement this code in this manner?
- Why did I implement this code in this manner, if you’re looking at your own code two years later?

但是，由于文档的好处都必然是延后的，它们通常不会给作者带来直接的好处。与测试不同，测试（正如我们将看到的）很快就能给程序员带来好处，而文档编写通常需要更多的前期工作，直到后来才会给作者带来明确的好处。但是，就像对测试的投入一样，对文档的投入会随着时间的推移而得到回报。毕竟，你可能只写了一次文档，但之后会被阅读数百次，甚至数千次；其最初的成本会在所有未来的读者中摊销。文档不仅可以随着时间的推移而扩展，而且对于组织的其他部分也是至关重要的。它有助于回答这样的问题：

- 为什么做出这些设计决策？
- 为什么我们要以这种方式实现这段代码？
- 如果你两年后再看自己的代码，我为什么要以这种方式实现这些代码？

If documentation conveys all these benefits, why is it generally considered “poor” by engineers? One reason, as we’ve mentioned, is that the benefits aren’t immediate, especially to the writer. But there are several other reasons:

- Engineers often view writing as a separate skill than that of programming. (We’ll try to illustrate that this isn’t quite the case, and even where it is, it isn’t necessarily a separate skill from that of software engineering.)
- Some engineers don’t feel like they are capable writers. But you don’t need a robust command of English[^2] to produce workable documentation. You just need to step outside yourself a bit and see things from the audience’s perspective.
- Writing documentation is often more difficult because of limited tools support or integration into the developer workflow.
- Documentation is viewed as an extra burden—something else to maintain— rather than something that will make maintenance of their existing code easier.

如果文档能传达这么多的好处，为什么工程师们普遍认为它 "很糟糕"？正如我们所提到的，其中一个原因是，这些好处并不直接，尤其是对作者而言。但还有其他几个原因：

- 工程师们通常认为写作是一种独立于编程的技能。(我们将试图说明，事实并非如此，即使是这样，它也不一定是与软件工程不同的技能。)
- 有些工程师觉得他们不是有写作能力的人。但是，你不需要精通英语，就能写出可行的文档。你只需要跳出自己视角，从听众的角度看问题。
- 由于有限的工具支持或集成到开发人员的工作流程中，编写文档往往更加困难。
- 文档被看作是一个额外的负担——需要维护的其他东西——而不是能使他们现有的代码维护更容易的东西。

> [^1]: OK, you will need to maintain it and revise it occasionally.
>
> 1   好的，你将需要维护它并偶尔修改它。
>
> [^2]: English is still the primary language for most programmers, and most technical documentation for programmers relies on an understanding of English.
>
> 2   英语仍然是大多数程序员的主要语言，大多数程序员的技术文档都依赖于对英语的理解。

Not every engineering team needs a technical writer (and even if that were the case, there aren’t enough of them). This means that engineers will, by and large, write most of the documentation themselves. So, instead of forcing engineers to become technical writers, we should instead think about how to make writing documentation easier for engineers. Deciding how much effort to devote to documentation is a decision your organization will need to make at some point.

不是每个工程团队都需要技术撰稿人（即使是需要，也没有足够的技术撰稿人）。这意味着，工程师基本上会自己写大部分的文档。因此，我们不应该强迫工程师成为技术撰稿人，而应该考虑如何让工程师更容易编写文档。决定在文档上投入多少精力是你的组织在某个时候需要做出的决定。

Documentation benefits several different groups. Even to the writer, documentation provides the following benefits:

- It helps formulate an API. Writing documentation is one of the surest ways to figure out if your API makes sense. Often, the writing of the documentation itself leads engineers to reevaluate design decisions that otherwise wouldn’t be questioned. If you can’t explain it and can’t define it, you probably haven’t designed it well enough.
- It provides a road map for maintenance and a historical record. Tricks in code should be avoided, in any case, but good comments help out a great deal when you’re staring at code you wrote two years ago, trying to figure out what’s wrong.
- It makes your code look more professional and drive traffic. Developers will naturally assume that a well-documented API is a better-designed API. That’s not always the case, but they are often highly correlated. Although this benefit sounds cosmetic, it’s not quite so: whether a product has good documentation is usually a pretty good indicator of how well a product will be maintained.
- It will prompt fewer questions from other users. This is probably the biggest benefit over time to someone writing the documentation. If you have to explain something to someone more than once, it usually makes sense to document that process.

文档对几个不同的群体都有好处。即使对作者来说，文档也有以下好处：

- 它有助于制定API。编写文档是确定API是否合理的最可靠方法之一。通常情况下，文档的编写本身会导致工程师重新评估设计决策，否则这些决策将会被质疑。如果你不能解释它，也不能定义它，那么你可能设计得不够好。
- 它提供了维护路线图和历史记录。无论如何，应该避免代码中的技巧，但是当你盯着两年前编写的代码，试图找出错误的地方时，好的注释会有很大帮助。
- 它使你的代码看起来更专业，并带来流量。开发人员通常认为，一个有良好文档的API是一个设计更好的API。情况并非总是如此，但它们往往是高度相关的。虽然这个好处听起来很表象，但也不尽然：一个产品是否有良好的文档记录通常是一个很好的指标，表明一个产品的维护情况如何。
- 它将减少其他用户提出的问题。随着时间的推移，这可能是编写文档的人最大的收获。如果你必须向别人解释不止一次，通常记录这个过程是有意义的。

As great as these benefits are to the writer of documentation, the lion’s share of documentation’s benefits will naturally accrue to the reader. Google’s C++ Style Guide notes the maxim “optimize for the reader.” This maxim applies not just to code, but to the comments around code, or the documentation set attached to an API. Much like testing, the effort you put into writing good documents will reap benefits many times over its lifetime. Documentation is critical over time, and reaps tremendous benefits for especially critical code as an organization scales.

尽管这些好处对文档的作者来说是巨大的，但文档的大部分好处自然会累积到读者身上。谷歌的《C++风格指南》指出了 "为读者优化 "的格言。这句格言不仅适用于代码，也适用于代码周围的注释，或者附加到API的文档集。和测试一样，你为编写好的文档所付出的努力将在其生命周期内多次获得收益。随着时间的推移，文档是非常重要的，随着组织规模的扩大，对于特别重要的代码，文档将获得巨大的好处。

## Documentation Is Like Code 把文档当做代码

Software engineers who write in a single, primary programming language still often reach for different languages to solve specific problems. An engineer might write shell scripts or Python to run command-line tasks, or they might write most of their backend code in C++ but write some middleware code in Java, and so on. Each language is a tool in the toolbox.

用单一的、主要的编程语言编写的软件工程师仍然经常使用不同的语言来解决特定的问题。工程师可以编写shell脚本或Python来运行命令行任务，或者他们可以用C++编写他们的大部分后端代码，但是在java中编写一些中间件代码，等等。每种语言都是工具箱中的一种工具。

Documentation should be no different: it’s a tool, written in a different language (usually English) to accomplish a particular task. Writing documentation is not much different than writing code. Like a programming language, it has rules, a particular syntax, and style decisions, often to accomplish a similar purpose as that within code: enforce consistency, improve clarity, and avoid (comprehension) errors. Within technical documentation, grammar is important not because one needs rules, but to standardize the voice and avoid confusing or distracting the reader. Google requires a certain comment style for many of its languages for this reason.

文档应该没有什么不同：它是一种工具，用不同的语言（通常是英语）编写，用于完成特定任务。编写文档与编写代码没有太大区别。与编程语言一样，它有规则、特定语法和样式规范，通常用于实现与代码中类似的目的：加强一致性、提高清晰度和避免（理解）错误。在技术文档中，语法很重要，不是因为需要规则，而是为了使声音标准化，避免混淆或分散读者的注意力。出于这个原因，谷歌对其许多语言都要求有一定的注释风格。

Like code, documents should also have owners. Documents without owners become stale and difficult to maintain. Clear ownership also makes it easier to handle documentation through existing developer workflows: bug tracking systems, code review tooling, and so forth. Of course, documents with different owners can still conflict with one another. In those cases, it is important to designate canonical documentation: determine the primary source and consolidate other associated documents into that primary source (or deprecate the duplicates).

与代码一样，文档也应该有所有者。没有所有者的文档会变得陈旧且难以维护。明确的所有权还可以通过现有的开发人员工作流程（bug跟踪系统、代码审查工具等）更轻松地处理文档。当然，不同所有者的文档仍然可能相互冲突。在这些情况下，指定规范文档非常重要：确定主要来源，并将其他相关文档合并到该主要来源中（或弃用副本）。

The prevalent usage of “go/links” at Google (see Chapter 3) makes this process easier. Documents with straightforward go/ links often become the canonical source of truth. One other way to promote canonical documents is to associate them directly with the code they document by placing them directly under source control and alongside the source code itself.

在谷歌，"go/links "的普遍使用（见第三章）使这一过程更加容易。有直接的 "go/links "的文件往往成为权威的标准来源。促进规范化文档的另一种方法是，通过将它们直接置于源代码控制之下并与源代码本身一起，将它们与它们所记录的代码直接关联。

Documentation is often so tightly coupled to code that it should, as much as possible, be treated as code. That is, your documentation should:

- Have internal policies or rules to be followed
- Be placed under source control
- Have clear ownership responsible for maintaining the docs
- Undergo reviews for changes (and change with the code it documents)
- Have issues tracked, as bugs are tracked in code
- Be periodically evaluated (tested, in some respect)
- If possible, be measured for aspects such as accuracy, freshness, etc. (tools have still not caught up here)

文档通常与代码紧密相连，所以应该尽可能地把它当作代码来对待。也就是说，你的文档应该：

- 有需要遵循的内部策略或规则
- 被置于源代码控制之下
- 有明确的所有权，负责维护文档
- 对修改进行审查（并与它所记录的代码一起改变）。
- 追踪问题，就像追踪代码中的bug一样
- 定期评估（在某种程度上测试）。
- 如有可能，对准确度、新鲜度等方面进行衡量（这里还没有工具）

The more engineers treat documentation as “one of” the necessary tasks of software development, the less they will resent the upfront costs of writing, and the more they will reap the long-term benefits. In addition, making the task of documentation easier reduces those upfront costs.

工程师们越是把文档工作当作软件开发的必要任务之一，他们就越是不反感写文档的前期成本，也就越能获得长期的收益。此外，让文档工作变得更容易，可以减少这些前期成本。

------

 **Case Study: The Google Wiki** **案例研究：谷歌维基**

When Google was much smaller and leaner, it had few technical writers. The easiest way to share information was through our own internal wiki (GooWiki). At first, this seemed like a reasonable approach; all engineers shared a single documentation set and could update it as needed.

当谷歌规模更小、更精简时，几乎没有技术作家。分享信息的最简单方法是通过我们自己的内部维基（GooWiki）。起初，这似乎是一个合理的方法；所有工程师共享一个文档集，可以根据需要进行更新。

But as Google scaled, problems with a wiki-style approach became apparent. Because there were no true owners for documents, many became obsolete.[^3] Because no process was put in place for adding new documents, duplicate documents and document sets began appearing. GooWiki had a flat namespace, and people were not good at applying any hierarchy to the documentation sets. At one point, there were 7 to 10 documents (depending on how you counted them) on setting up Borg, our production compute environment, only a few of which seemed to be maintained, and most were specific to certain teams with certain permissions and assumptions.

但随着谷歌规模的扩大，维基风格方法的问题变得明显。因为没有真正的文档所有者，许多文档变得过时了。因为没有建立添加新文档的流程，重复的文档和文档集开始出现了。GooWiki有一个扁平的命名空间，人们不擅长将任何层次结构应用于文档集。在某些点上，有7到10个文档（取决于你如何计算）用于设置我们的生产计算环境Borg，其中只有少数文档似乎得到了维护，大多数文档都是特定于具有特定权限和设定的特指定团队的。

Another problem with GooWiki became apparent over time: the people who could fix the documents were not the people who used them. New users discovering bad documents either couldn’t confirm that the documents were wrong or didn’t have an easy way to report errors. They knew something was wrong (because the document didn’t work), but they couldn’t “fix” it. Conversely, the people best able to fix the documents often didn’t need to consult them after they were written. The documentation became so poor as Google grew that the quality of documentation became Google’s number one developer complaint on our annual developer surveys.

随着时间的推移，GooWiki的另一个问题变得显而易见：能够修复文档的人不是使用它们的人。发现不良文档的新用户要么无法确认文档是否有误，要么无法便捷报告错误。他们知道出了问题（因为文档不起作用），但他们无法“修复”它。相反，最能修复文档的人通常不需要在编写文档后查阅它们。随着谷歌的发展，文档质量变得如此之差，以至于在我们的年度开发者调查中，文档质量成了谷歌对开发者的第一大抱怨。

The way to improve the situation was to move important documentation under the same sort of source control that was being used to track code changes. Documents began to have their own owners, canonical locations within the source tree, and processes for identifying bugs and fixing them; the documentation began to dramatically improve. Additionally, the way documentation was written and maintained began to look the same as how code was written and maintained. Errors in the documents could be reported within our bug tracking software. Changes to the documents could be handled using the existing code review process. Eventually, engineers began to fix the documents themselves or send changes to technical writers (who were often the owners).

改善这种情况的方法是将重要的文档转移到与跟踪代码变化相同的源代码控制之下。文档开始有自己的所有者，在源代码树中的规范位置，以及识别bug和修复bug的过程；文档质量开始显著改善。此外，编写和维护文档的方式开始与编写和维护代码的方式相同。文档中的错误可以在我们的错误跟踪软件中报告。对文档的修改可以通过现有的代码审查过程来处理。最终，工程师们开始自己修改文档，或将修改内容发送给技术作家（他们往往是文档的所有者）。

Moving documentation to source control was initially met with a lot of controversy.
Many engineers were convinced that doing away with the GooWiki, that bastion of freedom of information, would lead to poor quality because the bar for documentation (requiring a review, requiring owners for documents, etc.) would be higher. But that wasn’t the case. The documents became better.

将文档转移到源码控制中，最初遇到了很多争议。
许多工程师相信，取消GooWiki这个信息自由的堡垒，会导致质量下降，因为对文档的要求（要求审查，要求文档的所有者等）会更高。但事实并非如此。文档变得更好了。

The introduction of Markdown as a common documentation formatting language also helped because it made it easier for engineers to understand how to edit documents without needing specialized expertise in HTML or CSS. Google eventually introduced its own framework for embedding documentation within code: g3doc.With that framework, documentation improved further, as documents existed side by side with the source code within the engineer’s development environment. Now, engineers could update the code and its associated documentation in the same change (a practice for which we’re still trying to improve adoption).

引入Markdown作为通用的文档格式化语言也有帮助，因为它使工程师更容易理解如何编辑文档，而不需要HTML或CSS方面的专业知识。谷歌最终引入了自己的框架，用于在代码中嵌入文档：g3doc.有了这个框架，文档得到了进一步的改善，因为在工程师的开发环境中，文档与源代码并列存在。现在，工程师们可以在相同的变更中更新代码及其相关的文档（我们仍在努力改进这种做法）。

The key difference was that maintaining documentation became a similar experience to maintaining code: engineers filed bugs, made changes to documents in changelists, sent changes to reviews by experts, and so on. Leveraging of existing developer  workflows, rather than creating new ones, was a key benefit.

关键的区别在于，维护文档变成了与维护代码类似的流程：工程师们提交错误，在变更列表中对文档进行修改，将修改发送给专家审查，等等。利用现有的开发者工作流程，而不是创建新的工作流程，是一个关键的好处。

------

> [^3]: When we deprecated GooWiki, we found that around 90% of the documents had no views or updates in the previous few months.
>
> 3   当我们弃用GooWiki时，我们发现大约90%的文档在前几个月没有视图或更新。

## Know Your Audience 了解你的受众

One of the most important mistakes that engineers make when writing documentation is to write only for themselves. It’s natural to do so, and writing for yourself is not without value: after all, you might need to look at this code in a few years and try to figure out what you once meant. You also might be of approximately the same skill set as someone reading your document. But if you write only for yourself, you are going to make certain assumptions, and given that your document might be read by a very wide audience (all of engineering, external developers), even a few lost readers is a large cost. As an organization grows, mistakes in documentation become more prominent, and your assumptions often do not apply.

工程师在写文档时犯的最主要的错误之一是只为自己写。这样做是很自然的，而且为自己写也不是没有价值：毕竟，你可能需要在几年后看一下这段代码，并试图弄清楚你曾经的设计。你也可能与阅读你的文档的人具有大致相同的技能。但是，如果你只为自己写，你就会做出某些假设，考虑到你的文档可能会被非常广泛的读者阅读（所有的工程人员、外部开发人员），即使失去几个读者也是一个很大的代价。随着组织的发展，文档中的错误变得更加突出，你的假设往往不适用。

Instead, before you begin writing, you should (formally or informally) identify the audience(s) your documents need to satisfy. A design document might need to persuade decision makers. A tutorial might need to provide very explicit instructions to someone utterly unfamiliar with your codebase. An API might need to provide complete and accurate reference information for any users of that API, be they experts or novices. Always try to identify a primary audience and write to that audience.

相反，在你开始写作之前，你应该（正式地或非正式地）确定你的文件需要满足的受众。设计文档可能需要说服决策者。教程可能需要为完全不熟悉你的代码库的人提供非常明确的说明。API可能需要为该API的任何用户（无论是专家还是新手）提供完整准确的参考信息。始终尝试确定主要受众并为该受众写作。

Good documentation need not be polished or “perfect.” One mistake engineers make when writing documentation is assuming they need to be much better writers. By that measure, few software engineers would write. Think about writing like you do about testing or any other process you need to do as an engineer. Write to your audience, in the voice and style that they expect. If you can read, you can write. Remember that  your audience is standing where you once stood, but without your new domain knowledge. So you don’t need to be a great writer; you just need to get someone like you as familiar with the domain as you now are. (And as long as you get a stake in the ground, you can improve this document over time.)

好的文档不需要润色或 "完美"。工程师在写文档时犯的一个错误是假设他们需要成为更好的作家。按照这个标准，很少有软件工程师会写。思考写作，就像你做测试一样，或者你作为一名工程师需要做的任何其他过程。以听众期望的声音和风格向他们写信。如果你能读，你就能写。记住，你的受众就站在你曾经站过的地方，但没有你的新领域知识。所以你不需要成为一个伟大的作家；你只需要找一个像你一样熟悉这个领域的人。（而且，只要你能从中获益，你就可以随着时间的推移改进这份文件。）

### Types of Audiences 受众类型

We’ve pointed out that you should write at the skill level and domain knowledge appropriate for your audience. But who precisely is your audience? Chances are, you have multiple audiences based on one or more of the following criteria:

- Experience level (expert programmers, or junior engineers who might not even be familiar—gulp!—with the language).
- Domain knowledge (team members, or other engineers in your organization who are familiar only with API endpoints).
- Purpose (end users who might need your API to do a specific task and need to find that information quickly, or software gurus who are responsible for the guts of a particularly hairy implementation that you hope no one else needs to maintain).

我们已经指出，你应该按照适合你的受众的技能水平和领域知识来写作。但究竟谁是你的受众？根据以下一个或多个标准，你可能拥有多个受众：

- 经验水平（专家级程序员，或者甚至可能不熟悉语言的初级工程师）。
- 领域知识（团队成员或组织中只熟悉API端点的其他工程师）。
- 目的（可能需要你的API来完成特定任务并需要快速找到该信息的最终用户，或负责你希望没有其他人需要维护的特别复杂的实现的核心的软件专家）。

In some cases, different audiences require different writing styles, but in most cases, the trick is to write in a way that applies as broadly to your different audience groups as possible. Often, you will need to explain a complex topic to both an expert and a novice. Writing for the expert with domain knowledge may allow you to cut corners, but you’ll confuse the novice; conversely, explaining everything in detail to the novice will doubtless annoy the expert.

在某些情况下，不同的受众需要不同的写作风格，但在大多数情况下，技巧是以一种尽可能广泛地适用于不同受众群体的方式进行写作。通常，你需要同时向专家和新手解释一个复杂的主题。为有领域知识的专家写作方式可能会让你少走弯路，但你会让新手感到困惑；反之，向新手详细解释一切无疑会让专家感到厌烦。

Obviously, writing such documents is a balancing act and there’s no silver bullet, but one thing we’ve found is that it helps to keep your documents short. Write descriptively enough to explain complex topics to people unfamiliar with the topic, but don’t lose or annoy experts. Writing a short document often requires you to write a longer one (getting all the information down) and then doing an edit pass, removing duplicate information where you can. This might sound tedious, but keep in mind that this expense is spread across all the readers of the documentation. As Blaise Pascal once said, “If I had more time, I would have written you a shorter letter.” By keeping a document short and clear, you will ensure that it will satisfy both an expert and a novice.

显然，编写这样的文档是一种平衡行为，没有什么灵丹妙药，但我们发现，它有助于保持文档的简短。写下足够的描述，向不熟悉该主题的人解释复杂的主题，但不要失去或惹恼专家。编写一个简短的文档通常需要你编写一个较长的文档（将所有信息记录下来），然后进行编辑，尽可能删除重复的信息。这听起来可能很乏味，但请记住，这项费用会分摊到文档的所有读者身上。正如布莱斯·帕斯卡（Blaise Pascal）曾经说过的那样，“如果我有更多的时间，我会给你写一封更短的信。”通过保持文档的简短和清晰，你将确保它能让专家和新手都满意。

Another important audience distinction is based on how a user encounters a document:

- Seekers are engineers who know what they want and want to know if what they are looking at fits the bill. A key pedagogical device for this audience is consistency. If you are writing reference documentation for this group—within a code file, for example—you will want to have your comments follow a similar format so that readers can quickly scan a reference and see whether they find what they are looking for.
- Stumblers might not know exactly what they want. They might have only a vague idea of how to implement what they are working with. The key for this audience is clarity. Provide overviews or introductions (at the top of a file, for example) that explain the purpose of the code they are looking at. It’s also useful to identify when a doc is not appropriate for an audience. A lot of documents at Google begin with a “TL;DR statement” such as “TL;DR: if you are not interested in C++ compilers at Google, you can stop reading now.”

另一个重要的受众区分是基于用户如何使用文档：

- 寻求者，工程师知道他们想要什么，并且想知道他们所看到的是否符合要求。对于这些听众来说，一个关键的教学手段是一致性。如果你为这一群体写参考文档——在一个代码文件内，例如——你希望注释遵循类似的格式，以便受众可以快速扫描引用并查看是否找到所需内容。
- 浏览者，可能不知道他们到底想要什么。他们可能对如何实施他们正在使用的东西只有一个模糊的概念。这类读者的关键是清晰。提供概述或介绍（例如，在文件的顶部），解释他们正在查看的代码的用途。确定文档何时不适合受众也很有用。谷歌的很多文件都以 "TL;DR声明 "开始，如 "TL;DR：如果你对谷歌的C++编译器不感兴趣，你现在可以停止阅读。"

Finally, one important audience distinction is between that of a customer (e.g., a user of an API) and that of a provider (e.g., a member of the project team). As much as possible, documents intended for one should be kept apart from documents intended for the other. Implementation details are important to a team member for maintenance purposes; end users should not need to read such information. Often, engineers denote design decisions within the reference API of a library they publish. Such reasonings belong more appropriately in specific documents (design documents) or, at best, within the implementation details of code hidden behind an interface.

最后，一个重要的受众区分是客户（例如，API的用户）和供应方（例如，项目组的成员）。为一方准备的文件应尽可能与为另一方准备的文件分开保存。实施细节对于团队成员的维护非常重要；最终用户不需要阅读此类信息。通常，工程师在他们发布的库的参考API中表示设计决策。这种推理更适合于特定文档（设计文档）中，或者充其量是隐藏在接口后面的代码的实现细节中。

## Documentation Types 文档类型

Engineers write various different types of documentation as part of their work: design documents, code comments, how-to documents, project pages, and more. These all count as “documentation.” But it is important to know the different types, and to not mix types. A document should have, in general, a singular purpose, and stick to it. Just as an API should do one thing and do it well, avoid trying to do several things within one document. Instead, break out those pieces more logically.

工程师编写各种不同类型的文档作为他们工作的一部分：设计文档、代码注释、操作文档、项目页面等等。这些都算作 "文档"。但重要的是，要了解不同的类型，不要混合类型。一般来说，一个文档应该有一个单一的用途，并坚持这个职责。就像一个API应该做一件事并且做得很好一样，避免试图在一个文档中做几件事。相反，更逻辑合理地分解这些部分。

There are several main types of documents that software engineers often need to write:

- Reference documentation, including code comments
- Design documents
- Tutorials
- Conceptual documentation
- Landing pages

软件工程师经常需要写的文档主要有几种类型：

- 参考文档，包括代码注释
- 设计文档
- 教程
- 概念文档
- 着陆页

It was common in the early days of Google for teams to have monolithic wiki pages with bunches of links (many broken or obsolete), some conceptual information about how the system worked, an API reference, and so on, all sprinkled together. Such documents fail because they don’t serve a single purpose (and they also get so long that no one will read them; some notorious wiki pages scrolled through several dozens of screens). Instead, make sure your document has a singular purpose, and if adding something to that page doesn’t make sense, you probably want to find, or even create, another document for that purpose.

在谷歌的早期，团队拥有单页的维基页面是很常见的，其中有成堆的链接（许多链接已死链或过时），一些关于系统如何工作的概念信息，一个API参考等等，这些都散落在一起。这些文档之所以失败，是因为它们没有一个单一的职责（而且它们也会变得如此之长，以至于没有人会阅读它们；一些臭名昭著的wiki页面滚动了几十个屏幕）。相反，要确保你的文档有一个单一的职责，如果向该页面添加内容没有意义，可能希望找到或甚至创建另一个用于该用途的文档。

### Reference Documentation 参考文档

Reference documentation is the most common type that engineers need to write; indeed, they often need to write some form of reference documents every day. By reference documentation, we mean anything that documents the usage of code within the codebase. Code comments are the most common form of reference documentation that an engineer must maintain. Such comments can be divided into two basic camps: API comments versus implementation comments. Remember the audience differences between these two: API comments don’t need to discuss implementation details or design decisions and can’t assume a user is as versed in the API as the author. Implementation comments, on the other hand, can assume a lot more domain knowledge of the reader, though be careful in assuming too much: people leave projects, and sometimes it’s safer to be methodical about exactly why you wrote this code the way you did.

参考文档是工程师最常需要写的类型；事实上，他们经常每天都需要写某种形式的参考文档。所谓参考文档，我们指的是记录代码库中的代码使用情况的任何东西。代码注释是工程师必须维护的最常见的参考文档形式。这种注释可以分为两个基本阵营。API注释和实现注释。记住这两者之间的受众差异。API注释不需要讨论实现细节或设计决策，也不能假设用户像作者一样精通API。另一方面，实现注释可以假定读者有更多的领域知识，但要小心假设太多：人们离开了项目，有时更安全的做法是有条不紊地说明你为什么这样写代码。

Most reference documentation, even when provided as separate documentation from the code, is generated from comments within the codebase itself. (As it should; reference documentation should be single-sourced as much as possible.) Some languages such as Java or Python have specific commenting frameworks (Javadoc, PyDoc, GoDoc) meant to make generation of this reference documentation easier. Other languages, such as C++, have no standard “reference documentation” implementation, but because C++ separates out its API surface (in header or .h files) from the implementation (.cc files), header files are often a natural place to document a C++ API.

大多数参考文档，即使是作为独立于代码的文档提供，也是由代码库本身的注释生成的。(这是应该的；参考文档应该尽可能的单一来源。) 一些语言，如Java或Python有特定的注释框架（Javadoc、PyDoc、GoDoc）旨在简化参考文档的生成。其他语言，如C++，没有标准的 "参考文档 "实现，但由于C++将其API表面（头文件或.h文件）与实现（.cc文件）分开，头文件通常是记录C++ API的自然场所。

Google takes this approach: a C++ API deserves to have its reference documentation live within the header file. Other reference documentation is embedded directly in the Java, Python, and Go source code as well. Because Google’s Code Search browser (see Chapter 17) is so robust, we’ve found little benefit to providing separate generated reference documentation. Users in Code Search not only search code easily, they can usually find the original definition of that code as the top result. Having the documentation alongside the code’s definitions also makes the documentation easier to discover and maintain.

谷歌采取了这种方法：一个C++ API应该有它的参考文件存在头文件中。其他参考文档也直接嵌入到Java、Python和Go源代码中。因为Google的Code Search浏览器（见第17章）非常强大，我们发现提供单独的通用参考文档没有什么好处。用户在代码搜索中不仅可以很容易地搜索到代码，而且通常可以找到该代码的原始定义作为最重要的结果。将文档与代码的定义放在一起，也使文档更容易被发现和维护。

We all know that code comments are essential to a well-documented API. But what precisely is a “good” comment? Earlier in this chapter, we identified two major audiences for reference documentation: seekers and stumblers. Seekers know what they want; stumblers don’t. The key win for seekers is a consistently commented codebase so that they can quickly scan an API and find what they are looking for. The key win for stumblers is clearly identifying the purpose of an API, often at the top of a file header. We’ll walk through some code comments in the subsections that follow. The code commenting guidelines that follow apply to C++, but similar rules are in place at Google for other languages.

我们都知道，代码注释对于一个良好的文档化的API来说是必不可少的。但是什么才是 "好的 "注释呢？在本章的前面，我们确定了参考文档的两个主要受众：寻求者和浏览者。寻求者知道他们想要什么，而浏览者不知道。寻求者的关键点是一个一致的注释代码库，这样他们就可以快速扫描API并找到他们正在寻找的东西。对于浏览者来说，关键的胜利是明确识别API的用途，通常是在文件头的顶部。我们将在下面的小节中介绍一些代码注释。下面的代码注释指南适用于C++，但在谷歌，其他语言也有类似的规则。

**File comments 文件注释**
Almost all code files at Google must contain a file comment. (Some header files that contain only one utility function, etc., might deviate from this standard.) File comments should begin with a header of the following form:

在谷歌，几乎所有的代码文件都必须包含一个文件注释。(一些只包含一个实用函数的头文件等，可能会偏离这个标准)。文件注释应该以下列形式的头文件开始：

```C++
// -----------------------------------------------------------------------------
// str_cat.h
// -----------------------------------------------------------------------------
//
// This header file contains functions for efficiently concatenating and appending
// strings: StrCat() and StrAppend(). Most of the work within these routines is
// actually handled through use of a special AlphaNum type, which was designed
// to be used as a parameter type that efficiently manages conversion to
// strings and avoids copies in the above operations.
... ...
```

Generally, a file comment should begin with an outline of what’s contained in the code you are reading. It should identify the code’s main use cases and intended audience (in the preceding case, developers who want to concatenate strings). Any API that cannot be succinctly described in the first paragraph or two is usually the sign of an API that is not well thought out. Consider breaking the API into separate components in those cases.

通常，文件注释应该以你正在阅读的代码中所包含的内容的概要开始。它应该确定代码的主要用例和目标受众（在前面的例子中，是想要连接字符串的开发者）。在第一段或第二段中无法简洁描述的任何API通常都是未经过深思熟虑的API的标志。在这种情况下，可以考虑将API分成独立的组件。

#### Class comments 类注释

Most modern programming languages are object oriented. Class comments are therefore important for defining the API “objects” in use in a codebase. All public classes (and structs) at Google must contain a class comment describing the class/struct, important methods of that class, and the purpose of the class. Generally, class comments should be “nouned” with documentation emphasizing their object aspect. That is, say, “The Foo class contains x, y, z, allows you to do Bar, and has the following Baz aspects,” and so on.

大多数现代编程语言都是面向对象的。因此，类注释对于定义代码库中使用的API "对象 "非常重要。谷歌的所有公共类（和结构）必须包含一个类注释，描述该类/结构、该类的重要方法以及该类的目的。一般来说，类的注释应该是 "名词化 "的，文件强调其对象方面。也就是说，"Foo类包含x、y、z，允许你做Bar，并且有以下Baz方面的内容"，等等。

Class comments should generally begin with a comment of the following form:

类的注释一般应该以下列形式的注释开始：

```Java
// -----------------------------------------------------------------------------
// AlphaNum
// -----------------------------------------------------------------------------
//
// The AlphaNum class acts as the main parameter type for StrCat() and
// StrAppend(), providing efficient conversion of numeric, boolean, and
// hexadecimal values (through the Hex type) into strings.
```

#### Function comments 函数注释

All free functions, or public methods of a class, at Google must also contain a function comment describing what the function *does*. Function comments should stress the *active* nature of their use, beginning with an indicative verb describing what the function does and what is returned.

在谷歌的所有公开函数或类的公共方法也必须包含一个函数注释，说明函数的功能。函数注释应该强调其使用的主动性，以一个指示性动词开始，描述函数的作用和返回的内容。

Function comments should generally begin with a comment of the following form:

函数注释一般应以下列形式的注释开始：

```Java
// StrCat()
//
// Merges the given strings or numbers, using no delimiter(s),
// returning the merged result as a string.
... ...
```

Note that starting a function comment with a declarative verb introduces consistency across a header file. A seeker can quickly scan an API and read just the verb to get an idea of whether the function is appropriate: “Merges, Deletes, Creates,” and so on.

请注意，用一个声明性的动词来开始一个函数注释，可以在头文件中引入一致性。寻求者可以快速扫描一个API，只读动词就可以知道这个函数是否合适。"合并、删除、创建"等等。

Some documentation styles (and some documentation generators) require various forms of boilerplate on function comments, like “Returns:”, “Throws:”, and so forth, but at Google we haven’t found them to be necessary. It is often clearer to present such information in a single prose comment that’s not broken up into artificial section boundaries:

一些文档样式（和一些文档生成器）要求在函数注释中加入各种形式的模板，如 "Returns:"，"Throws:"等等，但在谷歌，我们发现它们并不是必须的。在一个松散的注释中呈现这样的信息通常更清晰，而不是将其分解为人为的段落边界：

```Java
// Creates a new record for a customer with the given name and address,
// and returns the record ID, or throws `DuplicateEntryError` if a
// record with that name already exists.
int AddCustomer(string name, string address);
```

Notice how the postcondition, parameters, return value, and exceptional cases are naturally documented together (in this case, in a single sentence), because they are not independent of one another. Adding explicit boilerplate sections would make the comment more verbose and repetitive, but no clearer (and arguably less clear).

请注意后置条件、参数、返回值和异常情况是如何自然地记录在一起的（在本例中，在一句话中），因为它们不是相互独立的。添加明确的样板部分会使注释更加冗长和重复，但不会更清晰（也可能不那么清晰）。

### Design Docs 设计文档

Most teams at Google require an approved design document before starting work on any major project. A software engineer typically writes the proposed design document using a specific design doc template approved by the team. Such documents are designed to be collaborative, so they are often shared in Google Docs, which has good collaboration tools. Some teams require such design documents to be discussed and debated at specific team meetings, where the finer points of the design can be discussed or critiqued by experts. In some respects, these design discussions act as a form of code review before any code is written.

谷歌的大多数团队在开始任何重大项目之前都需要获得批准的设计文档。软件工程师通常使用团队批准的特定设计文档模板编写拟定设计文件。这些文档是为了协作而设计的，所以它们通常在谷歌文档中共享，谷歌文档有很好的协作工具。一些团队要求在特定的团队会议上讨论和辩论此类设计文件，专家可以讨论或评论设计的细节。在某些方面，这些设计讨论就像是在编写任何代码之前的一种代码审查形式。

Because the development of a design document is one of the first processes an engineer undertakes before deploying a new system, it is also a convenient place to ensure that various concerns are covered. The canonical design document templates at Google require engineers to consider aspects of their design such as security implications, internationalization, storage requirements and privacy concerns, and so on. In most cases, such parts of those design documents are reviewed by experts in those domains.

由于设计文档的开发是工程师在部署新系统之前首先进行的过程之一，因此也是确保涵盖了各种关切。谷歌的典型设计文档模板要求工程师考虑其设计的各个方面，如安全影响、国际化、存储要求和隐私问题等等。在大多数情况下，这些设计文档的这类部分都是由这些领域的专家来审查的。

A good design document should cover the goals of the design, its implementation strategy, and propose key design decisions with an emphasis on their individual trade-offs. The best design documents suggest design goals and cover alternative designs, denoting their strong and weak points.

一个好的设计文档应该包括设计目标、实施策略，并提出关键的设计决策，重点放在它们各自的权衡上。最好的设计文档建议设计目标，涵盖替代设计，指出其优缺点。

A good design document, once approved, also acts not only as a historical record, but as a measure of whether the project successfully achieved its goals. Most teams archive their design documents in an appropriate location within their team documents so that they can review them at a later time. It’s often useful to review a design document before a product is launched to ensure that the stated goals when the design document was written remain the stated goals at launch (and if they do not, either the document or the product can be adjusted accordingly).

一份好的设计文档一旦获得批准，不仅可以作为历史记录，还可以作为衡量项目是否成功实现其目标的指标。大多数团队将其设计文档归档在团队文档中的适当位置，以便日后进行审查。在产品发布之前审查设计文档通常很有用，以确保在编写设计文档时所述的目标保持在发布时所述的目标（如果没有，则可以相应地调整文档或产品）。

### Tutorials 教程

Every software engineer, when they join a new team, will want to get up to speed as quickly as possible. Having a tutorial that walks someone through the setup of a new project is invaluable; “Hello World” has established itself is one of the best ways to ensure that all team members start off on the right foot. This goes for documents as well as code. Most projects deserve a “Hello World” document that assumes nothing and gets the engineer to make something “real” happen.

每个软件工程师，当他们加入一个新的团队时，都希望能尽快进入状态。有一个指导别人完成新项目设置的教程是非常有价值的；"Hello World "是确保所有团队成员从正确的角度出发的最佳方式之一。这适用于文件和代码。大多数项目都应该有一个 "Hello World “文档，该文档不做任何假设，并让工程师去做一些 "真实 "的事情。

Often, the best time to write a tutorial, if one does not yet exist, is when you first join a team. (It’s also the best time to find bugs in any existing tutorial you are following.) Get a notepad or other way to take notes, and write down everything you need to do along the way, assuming no domain knowledge or special setup constraints; after you’re done, you’ll likely know what mistakes you made during the process—and why —and can then edit down your steps to get a more streamlined tutorial. Importantly, write everything you need to do along the way; try not to assume any particular setup, permissions, or domain knowledge. If you do need to assume some other setup, state that clearly in the beginning of the tutorial as a set of prerequisites.

通常，如果还没有教程，编写教程的最佳时间是你第一次加入团队时。（这也是在你正在学习的任何现有教程中查找bug的最佳时机。）使用记事本或其他方式记笔记，并在没有领域知识或特殊设置限制的情况下，写下你需要做的所有事情；完成后，你可能会知道在这个过程中犯了哪些错误——原因——然后可以编辑你的步骤，以获得更精简的教程。重要的是，写下你需要做的一切；尽量不要假设任何特定的设置、权限或领域知识。如果你确实需要采用其他设置，请在本教程的开头明确说明这是一组先决条件。

Most tutorials require you to perform a number of steps, in order. In those cases, number those steps explicitly. If the focus of the tutorial is on the user (say, for external developer documentation), then number each action that a user needs to undertake. Don’t number actions that the system may take in response to such user actions. It is critical and important to number explicitly every step when doing this. Nothing is more annoying than an error on step 4 because you forget to tell someone to properly authorize their username, for example.

大多数教程要求你按顺序执行许多步骤。在这些情况下，请明确为这些步骤编号。如果本教程的重点是用户（例如，对于外部开发人员文档），则对用户需要执行的每个操作进行编号。不要对系统响应此类用户操作可能采取的操作进行编号。在执行此操作时，对每个步骤进行明确编号是至关重要的。没有什么比步骤4中的错误更令人恼火的了，例如，你忘记告诉某人对其用户名进行授权。

**Example: A bad tutorial**

1. Download the package from our server at <http://example.com>
2. Copy the shell script to your home directory
3. Execute the shell script
4. The foobar system will communicate with the authentication system
5. Once authenticated, foobar will bootstrap a new database named “baz”
6. Test “baz” by executing a SQL command on the command line
7. Type: CREATE DATABASE my_foobar_db;

**示例：糟糕的教程**

1. 从我们的服务器下载软件包，网址为<http://example.com>
2. 将shell脚本复制到主目录
3. 执行shell脚本
4. foobar系统将与认证系统通信
5. 经过身份验证后，foobar将引导一个名为“baz”的新数据库
6. 通过在命令行上执行SQL命令来测试“baz”
7. 类型：创建数据库my_foobar_db；

In the preceding procedure, steps 4 and 5 happen on the server end. It’s unclear whether the user needs to do anything, but they don’t, so those side effects can be mentioned as part of step 3. As well, it’s unclear whether step 6 and step 7 are different. (They aren’t.) Combine all atomic user operations into single steps so that the user knows they need to do something at each step in the process. Also, if your tutorial has user-visible input or output, denote that on separate lines (often using the convention of a monospaced bold font).

在前面的程序中，步骤4和5发生在服务器端。不清楚用户是否需要做什么，但他们不需要，所以这些副作用可以作为步骤3的一部分提及。同样，也不清楚步骤6和步骤7是否不同。(它们不是。)将所有原子用户操作组合到单个步骤中，以便用户知道他们需要在流程的每个步骤中做一些事情。另外，如果你的教程有用户可见的输入或输出，请用单独的行来表示（通常使用单间距粗体字体）。

**Example: A bad tutorial made better**

1. Download the package from our server at <http://example.com>:

```bash
curl -I http://example.com
```

2. Copy the shell script to your home directory:

```bash
cp foobar.sh ~
```

3. Execute the shell script in your home directory:

```bash
cd ~; foobar.sh
```

The foobar system will first communicate with the authentication system. Once authenticated, foobar will bootstrap a new database named “baz” and open an input shell.
4. Test “baz” by executing a SQL command on the command line:

```bash
baz:$ CREATE DATABASE my_foobar_db;
```

例子：一个不好的教程会变得更好

1. 从我们的服务器下载软件包，网址为<http://example.com>:

```bash
$curl -I http://example.com
```

2. 将shell脚本复制到主目录：

```bash
$cp foobar.sh ~
```

3. 在主目录中执行shell脚本：

```bash
$cd ~; foobar.sh
```

foobar系统将首先与身份验证系统通信。经过身份验证后，foobar将引导一个名为“baz”的新数据库并打开一个输入shell。

4. 通过在命令行上执行SQL命令来测试“baz”：

```bash
baz:$CREATE DATABASE my_foobar_db;
```

Note how each step requires specific user intervention. If, instead, the tutorial had a focus on some other aspect (e.g., a document about the “life of a server”), number those steps from the perspective of that focus (what the server does).

注意每个步骤都需要指定的用户操作。相反，如果本教程侧重于其他方面（例如，关于“服务器生命周期”的文档），请从该重点的角度对这些步骤进行编号（服务器的功能）。

### Conceptual Documentation 概念文档

Some code requires deeper explanations or insights than can be obtained simply by reading the reference documentation. In those cases, we need conceptual documentation to provide overviews of the APIs or systems. Some examples of conceptual documentation might be a library overview for a popular API, a document describing the life cycle of data within a server, and so on. In almost all cases, a conceptual document is meant to augment, not replace, a reference documentation set. Often this leads to duplication of some information, but with a purpose: to promote clarity. In those cases, it is not necessary for a conceptual document to cover all edge cases (though a reference should cover those cases religiously). In this case, sacrificing some accuracy is acceptable for clarity. The main point of a conceptual document is to impart understanding.

有些代码需要比阅读参考文档更深入的解释或见解。在这些情况下，我们需要概念文档来提供API或系统的概述。概念文档的一些示例可能是流行API的库概述、描述服务器内数据生命周期的文档等。在几乎所有情况下，概念文档都是为了补充而不是取代参考文档集。这通常会导致某些信息的重复，但目的是：提高清晰度。在这些情况下，概念文档不必涵盖所有边缘情况（尽管参考文档应严格涵盖这些情况）。在这种情况下，为了清晰起见，牺牲一些准确性是可以接受的。概念文件的要点是传达了解。

“Concept” documents are the most difficult forms of documentation to write. As a result, they are often the most neglected type of document within a software engineer’s toolbox. One problem engineers face when writing conceptual documentation is that it often cannot be embedded directly within the source code because there isn’t a canonical location to place it. Some APIs have a relatively broad API surface area, in which case, a file comment might be an appropriate place for a “conceptual” explanation of the API. But often, an API works in conjunction with other APIs and/or modules. The only logical place to document such complex behavior is through a separate conceptual document. If comments are the unit tests of documentation, conceptual documents are the integration tests.

“概念”文档是最难编写的文档形式。因此，它们通常是软件工程师工具箱中最被忽视的文档类型。工程师在编写概念文档时面临的一个问题是，它通常无法直接嵌入到源代码中，因为没有一个规范的位置来放置它。一些API具有相对广泛的API表面积，在这种情况下，文件注释可能是对API进行“概念性”解释的合适位置。但是，API通常与其他API和/或模块一起工作。记录这种复杂行为的唯一合理之处是通过一个单独的概念文档。如果注释是文档的单元测试，那么概念文档就是集成测试。

Even when an API is appropriately scoped, it often makes sense to provide a separate conceptual document. For example, Abseil’s StrFormat library covers a variety of concepts that accomplished users of the API should understand. In those cases, both internally and externally, we provide a format concepts document.

即使API的范围适当，提供一个单独的概念文档通常也是有意义的。例如，Abseil的StrFormat库涵盖了API的熟练用户应该理解的各种概念。在这些情况下，无论是内部还是外部，我们都提供了一个格式概念文档。

A concept document needs to be useful to a broad audience: both experts and novices alike. Moreover, it needs to emphasize clarity, so it often needs to sacrifice completeness (something best reserved for a reference) and (sometimes) strict accuracy. That’s not to say a conceptual document should intentionally be inaccurate; it just means that it should focus on common usage and leave rare usages or side effects for reference documentation.

概念文档需要对广大受众有用：包括专家和新手。此外，它还需要强调清晰性，因此通常需要牺牲完整性（最好留作参考）和（有时）严格的准确性。这并不是说概念性文档应该故意不准确；这只是意味着它应该关注常见用法，并将罕见用法或副作用留给参考文档。

### Landing Pages 着陆页

Most engineers are members of a team, and most teams have a “team page” somewhere on their company’s intranet. Often, these sites are a bit of a mess: a typical landing page might contain some interesting links, sometimes several documents titled “read this first!”, and some information both for the team and for its customers. Such documents start out useful but rapidly turn into disasters; because they become so cumbersome to maintain, they will eventually get so obsolete that they will be fixed by only the brave or the desperate.

大多数工程师都是一个团队的成员，而大多数团队在其公司内部网的某个地方都有一个 "团队页面"。通常情况下，这些网站有点混乱：一个典型的着陆页面可能包含一些有趣的链接，有时是几个标题为 "先阅读此文！"的文件，以及一些既为团队又为客户的信息。这些的文档一开始很有用，但很快就变成了灾难；因为它们的维护变得非常麻烦，最终会变得非常陈旧，只有勇敢的人或绝望的人才会去修复它们。

Luckily, such documents look intimidating, but are actually straightforward to fix: ensure that a landing page clearly identifies its purpose, and then include only links to other pages for more information. If something on a landing page is doing more than being a traffic cop, it is not doing its job. If you have a separate setup document, link to that from the landing page as a separate document. If you have too many links on the landing page (your page should not scroll multiple screens), consider breaking up the pages by taxonomy, under different sections.

幸运的是，这些文档看起来很吓人，但实际上很容易修复：确保着陆页清楚地标识其用途，然后只包含指向其他页面的链接以获取更多信息。如果着陆页面上的某件事不仅仅是做一名交通警察，那它就没有做好自己的工作。如果你有单独的设置文档，请从着陆页作为单独的文档链接到该文档。如果你在着陆页面上有太多链接（你的页面不应该滚动多个屏幕），考虑按分类法将页面分成不同部分。

Most poorly configured landing pages serve two different purposes: they are the “goto” page for someone who is a user of your product or API, or they are the home page for a team. Don’t have the page serve both masters—it will become confusing. Create a separate “team page” as an internal page apart from the main landing page. What the team needs to know is often quite different than what a customer of your API needs to know.

大多数配置不好的着陆页有两个不同的用途：它们是产品或API用户的“入门”页面，或者是团队的主页。不要让页面同时为两个主体服务——这将变得混乱。创建一个独立的“团队页面”，作为主着陆页面之外的内部页面。团队内部需要知道的东西往往与你的API的客户需要知道的东西完全不同。

## Documentation Reviews 文档评审

At Google, all code needs to be reviewed, and our code review process is well understood and accepted. In general, documentation also needs review (though this is less universally accepted). If you want to “test” whether your documentation works, you should generally have someone else review it.

在谷歌，所有的代码都需要评审，我们的代码评审是被充分理解和接受的。一般来说，文档也需要评审（尽管这不太被普遍接受）。如果你想 "测试 "你的文档是否有效，你一般应该让别人来评审。

A technical document benefits from three different types of reviews, each emphasizing different aspects:

- A technical review, for accuracy. This review is usually done by a subject matter expert, often another member of your team. Often, this is part of a code review itself.
- An audience review, for clarity. This is usually someone unfamiliar with the domain. This might be someone new to your team or a customer of your API.
- A writing review, for consistency. This is often a technical writer or volunteer.

一份技术文档得益于三种不同类型的评审，每一种都关注不同的方面：

- 技术评审，以保证准确性。这种审查通常是由主题专家完成的，通常是你的团队的另一个成员。通常，这也是代码审查本身的一部分。
- 受众评审，以确保清晰度。这通常是对该领域不熟悉的人。这可能是新加入你的团队的人或你的API的客户。
- 写作评审，以保证一致性。这通常是一个技术撰稿人或志愿者。

Of course, some of these lines are sometimes blurred, but if your document is high profile or might end up being externally published, you probably want to ensure that it receives more types of reviews. (We’ve used a similar review process for this book.) Any document tends to benefit from the aforementioned reviews, even if some of those reviews are ad hoc. That said, even getting one reviewer to review your text is preferable to having no one review it.

当然，其中一些界限有时是模糊的，但如果你的文档引人瞩目或最终可能会在外部发布，你可能希望确保它收到更多类型的评审。(我们对这本书采用了类似的评审程序。)任何文档都倾向于从上述评审中受益，即使其中一些评审是临时性的。也就是说，即使让一个审查员评审你的文本也比没有人评审要好。

Importantly, if documentation is tied into the engineering workflow, it will often improve over time. Most documents at Google now implicitly go through an audience review because at some point, their audience will be using them, and hopefully letting you know when they aren’t working (via bugs or other forms of feedback).

重要的是，如果文档与工程工作流程联系在一起，它往往会随着时间的推移而改进。现在，谷歌的大多数文档都隐式地经过受众审查，因为在某个时候，他们的读者会使用这些文档，并希望在它们不起作用时（通过bug或其他形式的反馈）让你知道。

---
**Case Study: The Developer Guide Library 案例研究：开发者指南库**
As mentioned earlier, there were problems associated with having most (almost all) engineering documentation contained within a shared wiki: little ownership of important documentation, competing documentation, obsolete information, and difficulty in filing bugs or issues with documentation. But this problem was not seen in some documents: the Google C++ style guide was owned by a select group of senior engineers (style arbiters) who managed it. The document was kept in good shape because certain people cared about it. They implicitly owned that document. The document was also canonical: there was only one C++ style guide.

如前所述，大多数（几乎所有）工程文件都包含在一个共享的维基中，这其中存在一些问题：重要的文档没有所有者、重复的文档、过时信息，以及难以归档的错误或文件问题。但是，这个问题在一些文档中并没有出现：谷歌C++风格指南是由一组精选的高级工程师（风格仲裁者）管理的。该文档被保持良好的状态，因为有人关心它。他们隐式地拥有该文档。该文档也是规范的：只有一个C++风格指南。

As previously mentioned, documentation that sits directly within source code is one way to promote the establishment of canonical documents; if the documentation sits alongside the source code, it should usually be the most applicable (hopefully). At Google, each API usually has a separate g3doc directory where such documents live (written as Markdown files and readable within our Code Search browser). Having the documentation exist alongside the source code not only establishes de facto ownership, it makes the documentation seem more wholly “part” of the code.

如前所述，直接位于源代码中的文档是促进规范文档建立的一种方法；如果文档与源代码放在一起，它通常应该是最适用的（希望如此）。在谷歌，每个API通常都有一个单独的g3doc目录，这些文档就在这里（写为标记文件，在我们的代码搜索浏览器中可读）。将文档与源代码放在一起不仅建立了事实上的所有权，而且使文档看起来更完全是代码的“一部分”。

Some documentation sets, however, cannot exist very logically within source code. A “C++ developer guide” for Googlers, for example, has no obvious place to sit within the source code. There is no master “C++” directory where people will look for such information. In this case (and others that crossed API boundaries), it became useful to create standalone documentation sets in their own depot. Many of these culled together associated existing documents into a common set, with common navigation and look-and-feel. Such documents were noted as “Developer Guides” and, like the code in the codebase, were under source control in a specific documentation depot, with this depot organized by topic rather than API. Often, technical writers managed these developer guides, because they were better at explaining topics across API boundaries.

然而，有些文档集在源代码中不能非常合理地存在。例如，Google的“C++开发者指南”， 在源代码中没有明确的位置。没有主 "C++"目录，人们会在那里寻找这些信息。在这种情况下（以及其他跨API边界的情况），在他们自己的仓库中创建独立文档集变得非常有用。其中许多文档将关联的现有文档挑选到一个公共集合中，具有公共导航和外观。这些文档被称为“开发人员指南”，与代码库中的代码一样，在一个特定的文档库中受源代码控制，该库是按主题而不是API组织的。通常情况下，技术撰稿人管理这些开发者指南，因为他们更善于解释跨API边界的主题。

Over time, these developer guides became canonical. Users who wrote competing or supplementary documents became amenable to adding their documents to the canonical document set after it was established, and then deprecating their competing documents. Eventually, the C++ style guide became part of a larger “C++ Developer Guide.” As the documentation set became more comprehensive and more authoritative, its quality also improved. Engineers began logging bugs because they knew someone was maintaining these documents. Because the documents were locked down under source control, with proper owners, engineers also began sending changelists directly to the technical writers.

随着时间的推移，这些开发者指南成为经典。编写重叠或补充文档的用户在规范文档集建立后，开始愿意将他们的文档添加到规范文档集中，然后废除他们的重复文档。最终，C++风格指南成为一个更大的 "C++开发者指南 "的一部分。随着文档集变得更全面、更权威，其质量也得到了提高。工程师们开始记录错误，因为他们知道有人在维护这些文档。由于这些文档被锁定在源码控制之下，并有适当的所有者，工程师们也开始直接向技术作者发送变更列表。

The introduction of go/links (see Chapter 3) allowed most documents to, in effect,more easily establish themselves as canonical on any given topic. Our C++ Developer Guide became established at “go/cpp,” for example. With better internal search, go/links, and the integration of multiple documents into a common documentation set,such canonical documentation sets became more authoritative and robust over time.

引入go/links（见第3章）后，大多数文件实际上可以更容易地建立自己在任何特定主题上的规范性。例如，我们的《C++开发指南》就建立在 "go/cpp "上。有了更好的内部搜索、go/links，以及将多个文档整合到一个共同的文档集，随着时间的推移，这样的规范文档集变得更加权威和强大。

---

## Documentation Philosophy 写文档秘诀

Caveat: the following section is more of a treatise on technical writing best practices (and personal opinion) than of “how Google does it.” Consider it optional for software engineers to fully grasp, though understanding these concepts will likely allow you to more easily write technical information.

注意：以下部分更像是一篇关于技术写作最佳实践的论文（和个人观点），而不是 "谷歌是如何做到的"。对于软件工程师来说，可以考虑让他们完全掌握，尽管理解这些概念可能会让你更容易写出技术信息。

### WHO, WHAT, WHEN, WHERE, and WHY 谁，什么，何时，何地，为什么

Most technical documentation answers a “HOW” question. How does this work? How do I program to this API? How do I set up this server? As a result, there’s a tendency for software engineers to jump straight into the “HOW” on any given document and ignore the other questions associated with it: the WHO, WHAT, WHEN, WHERE, and WHY. It’s true that none of those are generally as important as the HOW—a design document is an exception because an equivalent aspect is often the WHY—but without a proper framing of technical documentation, documents end up confusing. Try to address the other questions in the first two paragraphs of any document:

- WHO was discussed previously: that’s the audience. But sometimes you also need to explicitly call out and address the audience in a document. Example: “This document is for new engineers on the Secret Wizard project.”
- WHAT identifies the purpose of this document: “This document is a tutorial designed to start a Frobber server in a test environment.” Sometimes, merely writing the WHAT helps you frame the document appropriately. If you start adding information that isn’t applicable to the WHAT, you might want to move that information into a separate document.
- WHEN identifies when this document was created, reviewed, or updated. Documents in source code have this date noted implicitly, and some other publishing schemes automate this as well. But, if not, make sure to note the date on which the document was written (or last revised) on the document itself.
- WHERE is often implicit as well, but decide where the document should live. Usually, the preference should be under some sort of version control, ideally with the source code it documents. But other formats work for different purposes as well. At Google, we often use Google Docs for easy collaboration, particularly on design issues. At some point, however, any shared document becomes less of a discussion and more of a stable historical record. At that point, move it to someplace more permanent, with clear ownership, version control, and responsibility.
- WHY sets up the purpose for the document. Summarize what you expect someone to take away from the document after reading it. A good rule of thumb is to establish the WHY in the introduction to a document. When you write the summary, verify whether you’ve met your original expectations (and revise accordingly).

大多数技术文档回答的是 "如何 "的问题。它是如何工作的？我如何对这个API进行编程？我如何设置这个服务器？因此，软件工程师有一种倾向，就是在任何给定的文件中直接跳到 "如何"，而忽略了与之相关的其他问题：谁、什么、什么时候、什么地方和为什么。诚然，这些问题通常都不如 "如何 "重要——设计文件是个例外，因为与之相当的方面往往是 "为什么"——但如果没有适当的技术文档框架，文档最终会变得混乱。试着在任何文档的前两段解决其他问题：

- 之前讨论的是WHO：这就是受众。但有时你也需要在文件中明确地叫出并解决受众的问题。例如。"本文档适用于秘密向导项目的新工程师。"
- WHAT是确定本文档用途的内容：“本文档是一个旨在在测试环境中启动Frobber服务器的教程。”有时，只需编写帮助你正确构建文档的内容即可。如果开始添加不适用于WHAT的信息，则可能需要将该信息移动到单独的文档中。
- WHEN是何时确定本文件的创建、审查或更新时间。源代码中的文档隐式记录了该日期，其他一些发布方案也会自动记录该日期。但是，如果没有，请确保在文档本身上注明文档的编写日期（或最后一次修订日期）。
- WHERE通常也是隐含的，但要决定该文档应该放在哪里。通常情况下，偏好应该在某种版本控制之下，最好是与它所记录的源代码一起。但其他格式也适用于不同的目的。在Google，我们经常使用Google Docs以方便协作，特别是在设计问题上。然而，在某些时候，任何共享的文件都不再是一种讨论，而更像是一种稳定的历史记录。在这一点上，把它移到一个更永久的地方，有明确的所有权、版本控制和责任。
- WHY设定文件的目的。总结一下你希望别人在阅读后能从文件中得到什么。一个好的经验法则是在文件的引言中确立 "为什么"。当你写总结的时候，验证你是否达到了你最初的期望（并进行相应的修改）。

### The Beginning, Middle, and End 开头、中间和结尾

All documents—indeed, all parts of documents—have a beginning, middle, and end. Although it sounds amazingly silly, most documents should often have, at a minimum, those three sections. A document with only one section has only one thing to say, and very few documents have only one thing to say. Don’t be afraid to add sections to your document; they break up the flow into logical pieces and provide readers with a roadmap of what the document covers.

所有的文档——事实上，文档的所有部分——都有一个开头、中间和结束。虽然这听起来很愚蠢，但大多数文档通常至少应该有这三个部分。只有一个部分的文档只有一句话要说，很少文档只有一句话要说。不要害怕在文档中添加条款；它们将流程分解为逻辑部分，并为读者提供文档内容的路线图。

Even the simplest document usually has more than one thing to say. Our popular “C++ Tips of the Week” have traditionally been very short, focusing on one small piece of advice. However, even here, having sections helps. Traditionally, the first section denotes the problem, the middle section goes through the recommended solutions, and the conclusion summarizes the takeaways. Had the document consisted of only one section, some readers would doubtless have difficulty teasing out the important points.

即使是最简单的文档通常也有不止一句话要说。我们受欢迎的 "每周C++提示 "传统上是非常简短的，集中在一个小建议上。然而，即使在这里，有一些章节也是有帮助的。传统上，第一部分表示问题，中间部分是推荐的解决方案，结论总结了要点。如果该文档只有一个部分，一些读者无疑会难以找出重要的要点。

Most engineers loathe redundancy, and with good reason. But in documentation, redundancy is often useful. An important point buried within a wall of text can be difficult to remember or tease out. On the other hand, placing that point at a more prominent location early can lose context provided later on. Usually, the solution is to introduce and summarize the point within an introductory paragraph, and then use the rest of the section to make your case in a more detailed fashion. In this case, redundancy helps the reader understand the importance of what is being stated.

大多数工程师厌恶冗余，这是有道理的。但在文档中，冗余通常是有用的。隐藏在文字墙内的一个要点可能很难记住或梳理。另一方面，前面将该点放置在更突出的位置可能会丢失后面提供的背景。通常，解决方法是在介绍性段落中介绍和总结要点，然后使用本节的其余部分以更详细的方式阐述你的案例。在这种情况下，冗余有助于读者理解所述内容的重要性。

### The Parameters of Good Documentation 良好文档的衡量标准

There are usually three aspects of good documentation: completeness, accuracy, and clarity. You rarely get all three within the same document; as you try to make a document more “complete,” for example, clarity can begin to suffer. If you try to document every possible use case of an API, you might end up with an incomprehensible mess. For programming languages, being completely accurate in all cases (and documenting all possible side effects) can also affect clarity. For other documents, trying to be clear about a complicated topic can subtly affect the accuracy of the document; you might decide to ignore some rare side effects in a conceptual document, for example,because the point of the document is to familiarize someone with the usage of an API, not provide a dogmatic overview of all intended behavior.

好的文档通常有三个方面：完整性、准确性和清晰性。你很少在同一文档中得到这三点；例如，当你试图使文档更加“完整”时，清晰度可能开始受到影响。如果你试图记录一个API的每一个可能的用例，你最终可能会得到一个难以理解的混乱。对于编程语言来说，在所有情况下完全准确（以及记录所有可能的副作用）也会影响清晰度。对于其他文档，试图弄清楚一个复杂的主题可能会微妙地影响文档的准确性；你可能会决定忽略概念文档中一些罕见的副作用，例如，因为本文档的目的是让某人熟悉API的使用，而不是提供所有预期行为的教条式概述。

In each case, a “good document” is defined as the document that is doing its intended job. As a result, you rarely want a document doing more than one job. For each document (and for each document type), decide on its focus and adjust the writing appropriately. Writing a conceptual document? You probably don’t need to cover every part of the API. Writing a reference? You probably want this complete, but perhaps must sacrifice some clarity. Writing a landing page? Focus on organization and keep discussion to a minimum. All of this adds up to quality, which, admittedly, is stubbornly difficult to accurately measure.

在每种情况下，“良好的文档”都被定义为有效的文档。因此，通常我们不希望文档承担多于一个的任务或职责。对于每个文档（以及每种文档类型），确定其重点并适当调整写作。写概念文档？你可能不需要涵盖API的每个部分。写参考文档？你可能希望这是完整的，但可能必须牺牲一些清晰度。写着陆页？专注于组织，并尽量减少讨论。所有这些都是为了提高质量，诚然，这是很难准确衡量的。

How can you quickly improve the quality of a document? Focus on the needs of the audience. Often, less is more. For example, one mistake engineers often make is adding design decisions or implementation details to an API document. Much like you should ideally separate the interface from an implementation within a welldesigned API, you should avoid discussing design decisions in an API document. Users don’t need to know this information. Instead, put those decisions in a specialized document for that purpose (usually a design doc).

如何快速提高文档的质量？关注受众的需求。通常，少就是多。例如，工程师经常犯的一个错误是将设计决策或实现细节添加到API文档中。就像你应该在一个设计良好的API中理想地将接口与实现分离一样，你应该避免在API文档中讨论设计决策。用户不需要知道这些信息。相反，将这些决策放在专门的文档中（通常是设计文档）。

### Deprecating Documents 废弃文档

Just like old code can cause problems, so can old documents. Over time, documents become stale, obsolete, or (often) abandoned. Try as much as possible to avoid abandoned documents, but when a document no longer serves any purpose, either remove it or identify it as obsolete (and, if available, indicate where to go for new information). Even for unowned documents, someone adding a note that “This no longer works!” is more helpful than saying nothing and leaving something that seems authoritative but no longer works.

就像旧代码可能导致问题一样，旧文档也可能导致问题。随着时间的推移，文档会变得陈旧、过时或（通常）被废弃。尽可能避免使用过时的文档，但当文档不再具有任何用途时，请将其删除或将其标识为已过时（如果可用，请指明获取新信息的位置）。即使对于无主文档，有人加上“这不再有效！”的注释也比什么都不说，留下一些看似权威但不再有效的东西更有帮助。

At Google, we often attach “freshness dates” to documentation. Such documents note the last time a document was reviewed, and metadata in the documentation set will send email reminders when the document hasn’t been touched in, for example, three months. Such freshness dates, as shown in the following example—and tracking your documents as bugs—can help make a documentation set easier to maintain over time, which is the main concern for a document:

在谷歌，我们经常在文档中附加“保鲜日期”。此类文档会记录文档最后一次审阅的时间，文档集中的元数据会在文档未被触及时（例如，三个月）发送电子邮件提醒。以下示例中所示的这些更新日期以及作为bug跟踪文档有助于使文档集随着时间的推移更易于维护，这是文档的主要问题：

```Java
<!--*
# Document freshness: For more information, see go/fresh-source. freshness: { owner: `username` reviewed: '2019-02-27' }

# 文档的新鲜度：更多信息，请看 go/fresh-source。 freshness: { owner: `username` reviewed: '2019-02-27' }
*-->
```

Users who own such a document have an incentive to keep that freshness date current (and if the document is under source control, that requires a code review). As a result, it’s a low-cost means to ensure that a document is looked over from time to time. At Google, we found that including the owner of a document in this freshness date within the document itself with a byline of “Last reviewed by...” led to increased adoption as well.

拥有此类文档的用户有保持该新鲜度的动力（如果文档受源代码控制，则需要代码审查）。因此，它是一种低成本的方法，可以确保文档不时被查看。在谷歌，我们发现在这种新鲜感中包括文档的所有者文档中署名为“Last Review by…”的日期也增加了采用。

## When Do You Need Technical Writers? 何时需要技术撰稿人？

When Google was young and growing, there weren’t enough technical writers in software engineering. (That’s still the case.) Those projects deemed important tended to receive a technical writer, regardless of whether that team really needed one. The idea was that the writer could relieve the team of some of the burden of writing and maintaining documents and (theoretically) allow the important project to achieve greater velocity. This turned out to be a bad assumption.

当谷歌早期和成长时，软件工程中没有足够的技术撰稿人。(现在仍然如此。）那些被认为是重要的项目往往会得到一个技术撰稿人，不管这个团队是否真的需要。我们的想法是，技术撰稿人可以减轻团队编写和维护文档的一些负担，（理论上）让重要的项目取得更快的发展。这被证明是一个错误的假设。

We learned that most engineering teams can write documentation for themselves (their team) perfectly fine; it’s only when they are writing documents for another audience that they tend to need help because it’s difficult to write to another audience. The feedback loop within your team regarding documents is more immediate, the domain knowledge and assumptions are clearer, and the perceived needs are more obvious. Of course, a technical writer can often do a better job with grammar and organization, but supporting a single team isn’t the best use of a limited and specialized resource; it doesn’t scale. It introduced a perverse incentive: become an important project and your software engineers won’t need to write documents. Discouraging engineers from writing documents turns out to be the opposite of what you want to do.

我们了解到，大多数工程团队可以为他们自己（他们的团队）完美地编写文档；只有当他们为另一个受众编写文档时，他们才倾向于需要帮助，因为为另一个受众编写文档很困难。团队内部关于文档的反馈回路更直接，领域知识和假设更清晰，感知的需求也更明显。当然，技术撰稿人通常可以在语法和组织方面做得更好，但支持一个团队并不是对有限的专业资源的最佳利用；它没有规模化。它引入了一个不正当的激励措施：成为一个重要的项目，你的软件工程师就不需要写文档了。不鼓励工程师写文档，结果是与你想做的事相反。结果证明，阻止工程师编写文档与想要做的恰恰相反。

Because they are a limited resource, technical writers should generally focus on tasks that software engineers don’t need to do as part of their normal duties. Usually, this involves writing documents that cross API boundaries. Project Foo might clearly know what documentation Project Foo needs, but it probably has a less clear idea what Project Bar needs. A technical writer is better able to stand in as a person unfamiliar with the domain. In fact, it’s one of their critical roles: to challenge the assumptions your team makes about the utility of your project. It’s one of the reasons why many, if not most, software engineering technical writers tend to focus on this specific type of API documentation.

因为他们是有限的资源，技术撰稿人通常应该关注软件工程师作为其正常职责的一部分需要完成的任务。通常，这涉及到编写跨API边界的文档。项目Foo可能清楚地知道项目Foo需要什么文档，但它可能不太清楚项目Bar需要什么。技术撰稿人更能以不熟悉该领域的人的身份出现。事实上，这是他们的关键角色之一：挑战团队对项目效用的假设。这就是为什么许多（如果不是大多数的话）软件工程技术撰稿人倾向于关注这种特定类型的API文档的原因之一。

## Conclusion 总结

Google has made good strides in addressing documentation quality over the past decade, but to be frank, documentation at Google is not yet a first-class citizen. For comparison, engineers have gradually accepted that testing is necessary for any code change, no matter how small. As well, testing tooling is robust, varied and plugged into an engineering workflow at various points. Documentation is not ingrained at nearly the same level.

在过去的十年中，谷歌在解决文档质量方面取得了长足的进步，但坦率地说，谷歌的文档还不是一等公民。相比之下，工程师们已经逐渐接受了测试对于任何代码修改都是必要的，无论更改多么小。同样，测试工具是健壮的、多样的，并在不同的点上插入工程工作流程中。文档还达不到在相同的层次上扎根的。

To be fair, there’s not necessarily the same need to address documentation as with testing. Tests can be made atomic (unit tests) and can follow prescribed form and function. Documents, for the most part, cannot. Tests can be automated, and schemes to automate documentation are often lacking. Documents are necessarily subjective; the quality of the document is measured not by the writer, but by the reader, and often quite asynchronously. That said, there is a recognition that documentation is important, and processes around document development are improving. In this author’s opinion, the quality of documentation at Google is better than in most software engineering shops.

公平地说，解决文档问题的必要性不一定和测试一样。测试可以是原子化的（单元测试），可以遵循规定的形式和功能。在大多数情况下，文档都做不到。测试可以自动化，而文档自动化的方案通常是缺乏的。文档必然是主观的；文档本质上具有主观性；其质量的评价取决于读者而非作者，而且通常是异步的。尽管如此，人们认识到文档的重要性，围绕文档开发的过程也在不断改进。在笔者看来，谷歌公司的文档质量比大多数软件工程公司的要好。

To change the quality of engineering documentation, engineers—and the entire engineering organization—need to accept that they are both the problem and the solution. Rather than throw up their hands at the state of documentation, they need to realize that producing quality documentation is part of their job and saves them time and effort in the long run. For any piece of code that you expect to live more than a few months, the extra cycles you put in documenting that code will not only help others, it will help you maintain that code as well.

为了改变工程文档的质量，工程师和整个工程组织需要接受他们既是问题又是解决方案。他们需要意识到，制作高质量的文档是他们工作的一部分，从长远来看，这可以节省他们的时间和精力，而不是在当前文档状态下束手无策。对于任何一段生命周期超过几个月的代码，记录该代码的额外周期不仅有助于其他人，也有助于维护该代码。

## TL;DRs  内容提要

- Documentation is hugely important over time and scale.
- Documentation changes should leverage the existing developer workflow.
- Keep documents focused on one purpose.
- Write for your audience, not yourself.

- 随着时间和规模的增长，文档是非常重要的。
- 文档的更新应该利用现有的开发人员的工作流程。
- 让文档集中在一个职责（用途）上。
- 为你的受众而不是你自己而写。
