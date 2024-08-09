
**CHAPTER 9**

# Code Review

# 第九章 代码审查

**Written by Tom Manshreck**

**Caitlin Sadowski Edited by Lisa Carey**

Code review is a process in which code is reviewed by someone other than the author, often before the introduction of that code into a codebase. Although that is a simple definition, implementations of the process of code review vary widely throughout the software industry. Some organizations have a select group of “gatekeepers” across the codebase that review changes. Others delegate code review processes to smaller teams, allowing different teams to require different levels of code review. At Google, essentially every change is reviewed before being committed, and every engineer is responsible for initiating reviews and reviewing changes.

代码审查是一个由作者以外的人对代码进行审查的过程，通常在将该代码引入代码库之前。尽管这是一个简单的定义，但在整个软件行业中，代码审查过程的实施有很大不同。一些组织在代码库中拥有一组挑选出来的 "守门人 "来审查修改。其他团队将代码审查过程委托给这个小团队，允许不同的团队要求不同级别的代码审查。在谷歌，基本上每一个改动在提交之前都会被审查，每个工程师都负责启动审查和审查变更。

Code reviews generally require a combination of a process and a tool supporting that process. At Google, we use a custom code review tool, Critique, to support our process.[^1] Critique is an important enough tool at Google to warrant its own chapter in this book. This chapter focuses on the process of code review as it is practiced at Google rather than the specific tool, both because these foundations are older than the tool and because most of these insights can be adapted to whatever tool you might use for code review.

代码审查通常需要一个流程和一个支持该流程的工具的组合。在Google，我们使用一个定制的代码审查工具Critique来支持我们的流程。 Critique在Google是一个非常重要的工具，足以让它在本书中占有一章。本章重点介绍Google实施的代码审查流程，而不是特定的工具，这是因为这些基础比工具更早出现，另一方面是因为这些见解大多数可以适用于你可能用于代码审查的任何工具。

Some of the benefits of code review, such as detecting bugs in code before they enter a codebase, are well established[^2] and somewhat obvious (if imprecisely measured). Other benefits, however, are more subtle. Because the code review process at Google is so ubiquitous and extensive, we’ve noticed many of these more subtle effects, including psychological ones, which provide many benefits to an organization over time and scale.

代码审查的一些好处，例如在代码进入代码库之前检测到代码中的错误，已经得到了很好的证实，而且有点明显（如果测量不精确的话）。然而，其他的好处则更为微妙。由于谷歌的代码审查过程是如此的普遍和广泛，我们已经注意到了许多这些更微妙的影响，包括心理上的影响，随着时间的推移和规模的扩大，会给一个组织带来许多好处。

> [^1]: We also use Gerrit to review Git code, primarily for our open source projects. However, Critique is the primary tool of a typical software engineer at Google.
>
> 1 我们也使用Gerrit来审查Git代码，主要用于我们的开源项目。然而，Critique是谷歌公司典型的软件工程师的主要工具。
>
> [^2]: Steve McConnell, Code Complete (Redmond: Microsoft Press, 2004).
>
> 2 史蒂夫·麦康奈尔, Code Complete (雷蒙德：微软出版社，2004年).

## Code Review Flow  代码审查流程

Code reviews can happen at many stages of software development. At Google, code reviews take place before a change can be committed to the codebase; this stage is also known as a *precommit review*. The primary end goal of a code review is to get another engineer to consent to the change, which we denote by tagging the change as “looks good to me” (LGTM). We use this LGTM as a necessary permissions “bit” (combined with other bits noted below) to allow the change to be committed.

代码评审可以在软件开发的多个阶段进行。在谷歌，代码评审是在更改提交到代码库之前进行的；这个阶段也被称为*预提交审查*。代码评审的主要目标是让另一位工程师认可变更，我们通过将变更标记为“我觉得不错”（LGTM）来表示。我们将此LGTM用作必要的权限“标识”（与下面提到的其他标识结合使用），以允许提交更改。

A typical code review at Google goes through the following steps:

1. A user writes a change to the codebase in their workspace. This *author* then creates a snapshot of the change: a patch and corresponding description that are uploaded to the code review tool. This change produces a *diff* against the codebase, which is used to evaluate what code has changed.
2. The author can use this initial patch to apply automated review comments or do self-review. When the author is satisfied with the diff of the change, they mail the change to one or more reviewers. This process notifies those reviewers, asking them to view and comment on the snapshot.
3. *Reviewers* open the change in the code review tool and post comments on the diff. Some comments request explicit resolution. Some are merely informational.
4. The author modifies the change and uploads new snapshots based on the feedback and then replies back to the reviewers. Steps 3 and 4 may be repeated multiple times.
5. After the reviewers are happy with the latest state of the change, they agree to the change and accept it by marking it as “looks good to me” (LGTM). Only one LGTM is required by default, although convention might request that all reviewers agree to the change.
6. After a change is marked LGTM, the author is allowed to commit the change to the codebase, provided they *resolve all comments* and that the change is *approved*. We’ll cover approval in the next section.

谷歌的标准代码审查过程如下：

1. 用户在其工作区的代码库中写入一个变更。然后作者创建变更的快照：一个补丁和相应的描述，上传到代码审查工具。此更改生成了与代码库的对比差异（diff），用来评估哪些代码发生了变化。
2. 作者可以使用此初始补丁应用自动审查评论或进行自动审查的注解。当作者对变更的差异感到满意时，他们会将变更邮寄给一个或多个审查者。此过程通知这些审查者，要求他们查看快照并对其进行评论。
3. *审查者*在代码审阅工具中打开更改，并在差异上发表评论。一些评论要求明确的解决方案。另一些则仅提供参考信息。
4. 作者根据反馈意见修改更改，并上传新的快照，然后回复给审查者。步骤3和4可重复多次。
5. 审查员对更改的最新状态表示认可后，他们同意并接受了这项更改，并通过标注‘看起来不错给我’（LGTM）来表达这一点。默认情况下，只需要一个LGTM，尽管惯例可能要求所有审核人同意变更。
6. 在更改被标记为LGTM之后，作者可以将更改提交到代码库，前提是他们*解决*所有*评论*，并且该变更被*批准*。我们将在下一节中讨论批准问题。

We’ll go over this process in more detail later in this chapter.

我们将在本章后面更详细地介绍这个过程。

-----

#### Code Is a Liability 编码是一种责任

It’s important to remember (and accept) that code itself is a liability. It might be a necessary liability, but by itself, code is simply a maintenance task to someone somewhere down the line. Much like the fuel that an airplane carries, it has weight, though it is, of course, [necessary for that airplane to fly](https://oreil.ly/TmoWX).

重要的是要记住（并接受），编码本身就是一种负担。它可能是一种必要的负担，但就其本身而言，编码只是某个人的一项维护任务。就像飞机携带的燃料一样，它有重量，尽管它当然是[飞机飞行的必要条件](https://oreil.ly/TmoWX)。

New features are often necessary, of course, but care should be taken before developing code in the first place to ensure that any new feature is warranted. Duplicated code not only is a wasted effort, it can actually cost more in time than not having the code at all; changes that could be easily performed under one code pattern often require more effort when there is duplication in the codebase. Writing entirely new code is so frowned upon that some of us have a saying: “If you’re writing it from scratch, you’re doing it wrong!”

当然，新特性通常是必需的，但在开发代码之前，首先要注意确保任何新特性都是合理的。重复的代码不仅是一种浪费，而且实际上比根本没有代码要花费更多的时间；当代码库中存在重复时，可以在一个代码模式下轻松执行的更改通常需要更多的工作。编写全新的代码是如此令人不快，以至于我们中的一些人都有这样一句话：“如果你是从零开始编写，那你就是做错了！”

This is especially true of library or utility code. Chances are, if you are writing a utility, someone else somewhere in a codebase the size of Google’s has probably done something similar. Tools such as those discussed in Chapter 17 are therefore critical for both finding such utility code and preventing the introduction of duplicate code. Ideally, this research is done beforehand, and a design for anything new has been communicated to the proper groups before any new code is written.

这对于类库或实用程序代码来说尤其如此。有可能，如果你正在写一个实用程序，那么在像Google那样大的代码库中，其他人可能已经做了类似的事情。因此，像那些在第17章中讨论的工具对于找到这些实用程序代码和防止引入重复的代码都是至关重要的。理想情况下，这种研究是事先完成的，在编写任何新的代码之前，任何新的设计都已经传达给合适的小组。

Of course, new projects happen, new techniques are introduced, new components are needed, and so on. All that said, a code review is not an occasion to rehash or debate previous design decisions. Design decisions often take time, requiring the circulation of design proposals, debate on the design in API reviews or similar meetings, and perhaps the development of prototypes. As much as a code review of entirely new code should not come out of the blue, the code review process itself should also not be viewed as an opportunity to revisit previous decisions.

当然，新项目的发生，新技术的引入，新组件的需要，等等。综上所述，代码审查并不是一个重提或辩论以前的设计决策的时机。设计决策通常需要时间，需要分发设计方案，在API评审或类似的会议上对设计进行辩论，也许还需要开发原型。就像对全新的代码进行代码审查不应该突然出现一样，代码审查过程本身也不应该被看作是重新审视以前决策的时机。

----

## How Code Review Works at Google  谷歌的代码审查工作

We’ve pointed out roughly how the typical code review process works, but the devil is in the details. This section outlines in detail how code review works at Google and how these practices allow it to scale properly over time.

我们已经粗略地指出了典型的代码审查过程是如何工作的，但问题在于细节。本节详细概述了谷歌的代码审查工作原理，以及这些实践如何使其能够随时间适当扩展。

There are three aspects of review that require “approval” for any given change at Google:

- A correctness and comprehension check from another engineer that the code is appropriate and does what the author claims it does. This is often a team member, though it does not need to be. This is reflected in the LGTM permissions “bit,” which will be set after a peer reviewer agrees that the code “looks good” to them.
- Approval from one of the code owners that the code is appropriate for this particular part of the codebase (and can be checked into a particular directory). This approval might be implicit if the author is such an owner. Google’s codebase is a tree structure with hierarchical owners of particular directories. (See [Chapter 16](#_bookmark1364)). Owners act as gatekeepers for their particular directories. A change might be proposed by any engineer and LGTM’ed by any other engineer, but an owner of the directory in question must also *approve* this addition to their part of the codebase. Such an owner might be a tech lead or other engineer deemed expert in that particular area of the codebase. It’s generally up to each team to decide how broadly or narrowly to assign ownership privileges.
- Approval from someone with language “readability”[^3] that the code conforms to the language’s style and best practices, checking whether the code is written in the manner we expect. This approval, again, might be implicit if the author has such readability. These engineers are pulled from a company-wide pool of engineers who have been granted readability in that programming language.

对于Google的任何特定变化，有三个方面的审查需要 "批准"：

- 由另一位工程师进行的正确性和可读性检查，检查代码是否合适，以及代码是否符合作者的要求。这通常是一个团队成员，尽管不一定是。这反映在LGTM权限的 "标识 "上，在同行审查者同意代码 "看起来不错 "之后，该标识将被设置。
- 来自代码所有者之一的批准，即该代码适合于代码库的这个特定部分（并且可以被检查到一个特定的目录）。如果作者是这样一个所有者，这种批准可能是隐含的。谷歌的代码库是一个树状结构，有特定目录的分层所有者。(见第16章）。所有者作为他们特定目录的看门人。任何工程师都可以提出修改意见，任何其他工程师也可以提出LGTM，但有关目录的所有者必须*批准*在他们的代码库中加入这一内容。这样的所有者可能是技术领导或其他被认为是代码库特定领域的专家的工程师。通常由每个团队决定分配所有权特权的范围是宽还是窄。
- 拥有语言 "可读性"的人批准代码符合语言的风格和最佳实践，检查代码是否以我们期望的方式编写。如果作者有这样的可读性，这种认可又可能是隐含的。这些工程师来自公司范围内的工程师队伍，他们被授予了该编程语言的可读性。

Although this level of control sounds onerous—and, admittedly, it sometimes is— most reviews have one person assuming all three roles, which speeds up the process quite a bit. Importantly, the author can also assume the latter two roles, needing only an LGTM from another engineer to check code into their own codebase, provided they already have readability in that language (which owners often do).

虽然这种程度的控制听起来很繁琐——而且，不可否认，有时的确如此——但大多数审查都是由一个人承担这三个角色，这就大大加快了审查过程。重要的是，作者也可以承担后两个角色，只需要另一个工程师的LGTM就可以将代码检查到他们自己的代码库中，前提是他们已经具备了该语言的可读性（所有者经常这样做）。

These requirements allow the code review process to be quite flexible. A tech lead who is an owner of a project and has that code’s language readability can submit a code change with only an LGTM from another engineer. An intern without such authority can submit the same change to the same codebase, provided they get approval from an owner with language readability. The three aforementioned permission “bits” can be combined in any combination. An author can even request more than one LGTM from separate people by explicitly tagging the change as wanting an LGTM from all reviewers.

这些要求使得代码审查过程非常灵活。技术负责人是一个项目的所有者，并且具有代码的语言可读性，可以只使用另一个工程师的LGTM提交代码更改。如果获得具有语言阅读能力的所有者的批准，即使是没有这样权限的实习生也可以向同一代码库提交相同的更改。上述三个许可“标识”可以任意组合。作者甚至可以从不同的人处请求多个LGTM，方法是明确地将更改标记为希望从所有审阅者处获得LGTM。

In practice, most code reviews that require more than one approval usually go through a two-step process: gaining an LGTM from a peer engineer, and then seeking approval from appropriate code owner/readability reviewer(s). This allows the two roles to focus on different aspects of the code review and saves review time. The primary reviewer can focus on code correctness and the general validity of the code change; the code owner can focus on whether this change is appropriate for their part of the codebase without having to focus on the details of each line of code. An approver is often looking for something different than a peer reviewer, in other words. After all, someone is trying to check in code to their project/directory. They are more concerned with questions such as: “Will this code be easy or difficult to maintain?” “Does it add to my technical debt?” “Do we have the expertise to maintain it within our team?”

在实践中，大多数需要不止一次批准的代码评审通常经历两个步骤：首先从同行工程师那里获得LGTM，然后向适当的代码所有者/可读性审查者寻求批准。这使得这两个角色可以专注于代码审查的不同方面，并节省审查时间。主要的审查者可以专注于代码的正确性和代码修改的一般有效性；代码所有者可以关注此更改是否适合他们的部分，而不必关注每行代码的细节。换句话说，审批者所寻找的东西往往与同行评审者不同。毕竟，有人是想把代码签入他们的项目/目录。他们更关心的是诸如以下问题。"这段代码是容易还是难以维护？" "它是否增加了我的技术债务？" "我们的团队中是否有维护它的专业知识？"

If all three of these types of reviews can be handled by one reviewer, why not just have those types of reviewers handle all code reviews? The short answer is scale. Separating the three roles adds flexibility to the code review process. If you are working with a peer on a new function within a utility library, you can get someone on your team to review the code for code correctness and comprehension. After several rounds (perhaps over several days), your code satisfies your peer reviewer and you get an LGTM. Now, you need only get an *owner* of the library (and owners often have appropriate readability) to approve the change.

如果这三种类型的审查都可以由一个审查员处理，为什么不直接让这些类型的审查员处理所有的代码审查呢？简单的答案是规模。将这三种角色分开，可以增加代码审查过程的灵活性。如果你和同行一起在一个实用程序库中开发一个新的函数，你可以让你团队中的某人来审查代码的正确性和理解性。经过几轮（也许是几天的时间），你的代码让你的同行审查员满意，你就会得到一个LGTM。现在，你只需要让该库的*所有者*（而所有者往往具有适当的可读性）批准这项修改。

> [^3]: At Google, “readability” does not refer simply to comprehension, but to the set of styles and best practices that allow code to be maintainable to other engineers. See Chapter 3.
>
> 3   在谷歌，“可读性”不仅仅指理解能力，而是指允许其他工程师维护代码的一套风格和最佳实践。见第3章。

-----

#### Ownership  所有权

***Hyrum Wright***

When working on a small team in a dedicated repository, it’s common to grant the entire team access to everything in the repository. After all, you know the other engineers, the domain is narrow enough that each of you can be experts, and small numbers constrain the effect of potential errors.

***海勒姆·赖特***

当一个小团队在专门的版本库中工作时，通常会授予整个团队对版本库中所有内容的访问权。毕竟，你认识其他的工程师，这个领域很窄，你们每个人都可以成为专家，而且人数少限制了潜在错误的影响范围。

As the team grows larger, this approach can fail to scale. The result is either a messy repository split or a different approach to recording who has what knowledge and responsibilities in different parts of the repository. At Google, we call this set of knowledge and responsibilities *ownership* and the people to exercise them *owners*. This concept is different than possession of a collection of source code, but rather implies a sense of stewardship to act in the company’s best interest with a section of the codebase. (Indeed, “stewards” would almost certainly be a better term if we had it to do over again.)

随着团队规模的扩大，这种方法可能无法扩展。其结果要么是混乱的版本库分裂，要么是用不同的方法来记录谁在版本库的不同部分拥有哪些知识和职责。在谷歌，我们把这套知识和职责称为*所有权*，把行使这些知识和职责的人称为*所有者*。这个概念不同于对源代码集合的占有，而是意味着一种管理意识，以公司的最佳利益对代码库的某个部分采取行动。(事实上，如果我们重新来过，"管家 "几乎肯定是一个更好的术语）。

Specially named OWNERS files list usernames of people who have ownership responsibilities for a directory and its children. These files may also contain references to other OWNERS files or external access control lists, but eventually they resolve to a list of individuals. Each subdirectory may also contain a separate OWNERS file, and the relationship is hierarchically additive: a given file is generally owned by the union of the members of all the OWNERS files above it in the directory tree. OWNERS files may have as many entries as teams like, but we encourage a relatively small and focused list to ensure responsibility is clear.

特别命名的OWNERS文件列出了对一个目录及其子目录有所有权责任的人的用户名。这些文件也可能包含对其他OWNERS文件或外部访问控制列表的引用，但最终它们会解析为个人列表。每个子目录也可能包含一个单独的OWNERS文件，而且这种关系是分层递增的：一个给定的文件通常由目录树中它上面的所有OWNERS文件的成员共同拥有。OWNERS文件可以有任意多的条目，但我们鼓励一个相对较小和集中的列表，以确保责任明确。

Ownership of Google’s code conveys approval rights for code within one’s purview, but these rights also come with a set of responsibilities, such as understanding the code that is owned or knowing how to find somebody who does. Different teams have different criteria for granting ownership to new members, but we generally encourage them not to use ownership as a rite of initiation and encourage departing members to yield ownership as soon as is practical.

对谷歌代码的所有权传达了对其权限范围内的代码的批准权，但这些权利也伴随着一系列的责任，如了解所拥有的代码或知道如何找到拥有这些代码的人。不同的团队在授予新成员所有权方面有不同的标准，但我们通常鼓励他们不要把所有权作为入职仪式，并鼓励离职的成员在可行的情况下尽快放弃所有权。

This distributed ownership structure enables many of the other practices we’ve outlined in this book. For example, the set of people in the root OWNERS file can act as global approvers for large-scale changes (see Chapter 22) without having to bother local teams. Likewise, OWNERS files act as a kind of documentation, making it easy for people and tools to find those responsible for a given piece of code just by walking up the directory tree. When new projects are created, there’s no central authority that has to register new ownership privileges: a new OWNERS file is sufficient.

这种分布式所有权结构使我们在本书中概述的许多其他做法成为可能。例如，根OWNERS文件中的一组人可以作为大规模修改的全球批准者（见第22章），而不必打扰本地团队。同样，OWNERS文件作为一种文档，使人们和工具很容易找到对某段代码负责的人，只要沿着目录树走就可以了。当新项目被创建时，没有一个中央机构需要注册新的所有权权限：一个新的OWNERS文件就足够了。

This ownership mechanism is simple, yet powerful, and has scaled well over the past two decades. It is one of the ways that Google ensures that tens of thousands of engineers can operate efficiently on billions of lines of code in a single repository.

这种所有权机制简单而强大，在过去的20年里得到了良好的扩展。这是谷歌确保数以万计的工程师能够在单一资源库中有效操作数十亿行代码的方法之一。

-----

## Code Review Benefits 代码审查的好处

Across the industry, code review itself is not controversial, although it is far from a universal practice. Many (maybe even most) other companies and open source projects have some form of code review, and most view the process as important as a sanity check on the introduction of new code into a codebase. Software engineers understand some of the more obvious benefits of code review, even if they might not personally think it applies in all cases. But at Google, this process is generally more thorough and wide spread than at most other companies.

纵观整个行业，代码审查本身并不存在争议，尽管它还远不是一种普遍的做法。许多（甚至可能是大多数）其他公司和开源项目都有某种形式的代码审查，而且大多数人认为这个过程很重要，是对引入新代码到代码库的合理检查。软件工程师理解代码审查的一些更明显的好处，即使他们个人可能不认为它适用于所有情况。但在谷歌，这个过程通常比其他大多数公司更彻底、更广泛。

Google’s culture, like that of a lot of software companies, is based on giving engineers wide latitude in how they do their jobs. There is a recognition that strict processes tend not to work well for a dynamic company needing to respond quickly to new technologies, and that bureaucratic rules tend not to work well with creative professionals. Code review, however, is a mandate, one of the few blanket processes in which all software engineers at Google must participate. Google requires code review for almost[^4] every code change to the codebase, no matter how small. This mandate does have a cost and effect on engineering velocity given that it does slow down the introduction of new code into a codebase and can impact time-to-production for any given code change. (Both of these are common complaints by software engineers of strict code review processes.) Why, then, do we require this process? Why do we believe that this is a long-term benefit?

谷歌的文化，就像许多软件公司的文化一样，是基于给工程师们在工作中的自由度。人们认识到，对于需要对新技术做出快速反应的充满活力的公司来说，严格的流程往往不起作用，而官僚主义的规则往往不适合创造性专业人士。然而，代码审查是一项任务，是谷歌所有软件工程师都必须参与的少数全流程之一。谷歌要求对代码库的每一次代码修改都要进行代码审查，无论多么微小。这个任务确实对工程速度有成本和影响，因为它确实减缓了将新代码引入代码库的速度，并可能影响任何特定代码更改的生产时间。(这两点是软件工程师对严格的代码审查过程的常见抱怨）。那么，为什么我们要要求这个过程？为什么我们相信这是一个长期有利的？

 A well-designed code review process and a culture of taking code review seriously provides the following benefits:  

- Checks code correctness
- Ensures the code change is comprehensible to other engineers
- Enforces consistency across the codebase
- Psychologically promotes team ownership
- Enables knowledge sharing
- Provides a historical record of the code review itself

一个精心设计的代码审查过程和认真对待代码审查的文化会带来以下好处：

- 检查代码的正确性
- 确保其他工程师能够理解代码更改
- 强化整个代码库的一致性
- 从心理上促进团队的所有权
- 实现知识共享
- 提供代码审查本身的历史记录

Many of these benefits are critical to a software organization over time, and many of them are beneficial to not only the author but also the reviewers. The following sections go into more specifics for each of these items.

随着时间的推移，这些好处对一个软件组织来说是至关重要的，其中许多好处不仅对作者有利，而且对审查员也有利。下面的章节将对这些项目中的每一项进行更详细的说明。

> [^4]: Some changes to documentation and configurations might not require a code review, but it is often still preferable to obtain such a review.
>
> 4   对文档和配置的某些更改可能不需要代码审查，但通常仍然可以获得这样的审查。

### Code Correctness  代码正确性

An obvious benefit of code review is that it allows a reviewer to check the “correctness” of the code change. Having another set of eyes look over a change helps ensure that the change does what was intended. Reviewers typically look for whether a change has proper testing, is properly designed, and functions correctly and efficiently. In many cases, checking code correctness is checking whether the particular change can introduce bugs into the codebase.

代码审查的一个明显的好处是，它允许审查者检查代码更改的 "正确性"。让另一双眼睛来审视一个更改，有助于确保这个更改能达到预期效果。审查员通常会检查一个变更是否有适当的测试，设计是否合理，功能是否正确和有效。在许多情况下，检查代码正确性就是检查特定的更改是否会将bug引入代码库。

Many reports point to the efficacy of code review in the prevention of future bugs in software. A study at IBM found that discovering defects earlier in a process, unsurprisingly, led to less time required to fix them later on.[^5] The investment in the time for code review saved time otherwise spent in testing, debugging, and performing regressions, provided that the code review process itself was streamlined to keep it lightweight. This latter point is important; code review processes that are heavyweight, or that don’t scale properly, become unsustainable.[^6] We will get into some best practices for keeping the process lightweight later in this chapter.

许多报告指出了代码审查在防止软件未来出现错误方面的有效性。IBM的一项研究发现，在一个过程的越早发现缺陷，无疑会减少以后修复缺陷所需的时间。对代码审查时间的投入节省了原本用于测试、调试和执行回归的时间，前提是代码审查过程本身经过了优化，以保持其轻量级。如果代码审查过程很重，或者扩展不当，那么这些过程将变得不可持续。我们将在本章后面介绍一些保持过程轻量级的最佳实践。

To prevent the evaluation of correctness from becoming more subjective than objective, authors are generally given deference to their particular approach, whether it be in the design or the function of the introduced change. A reviewer shouldn’t propose alternatives because of personal opinion. Reviewers can propose alternatives, but only if they improve comprehension (by being less complex, for example) or functionality (by being more efficient, for example). In general, engineers are encouraged to approve changes that improve the codebase rather than wait for consensus on a more “perfect” solution. This focus tends to speed up code reviews.

为了防止正确性评估变得更加主观而非客观，作者通常会遵循其特定方法，无论是在设计中还是在引入变更的功能中。审查员不应该因为个人意见而提出替代方案。审查员可以提出替代方案，但前提是这些替代方案能够改善理解性（例如，通过降低复杂性）或功能性（例如，通过提高效率）。一般来说，鼓励工程师批准改进代码库的更改，而不是等待就更“完美”的解决方案达成共识。这种关注倾向于加速代码审查。

As tooling becomes stronger, many correctness checks are performed automatically through techniques such as static analysis and automated testing (though tooling might never completely obviate the value for human-based inspection of code—see Chapter 20 for more information). Though this tooling has its limits, it has definitely lessoned the need to rely on human-based code reviews for checking code correctness.

随着工具越来越强大，许多正确性检查会通过静态分析和自动测试等技术自动执行（尽管工具可能永远不会完全消除基于人工的代码检查的价值，更多信息请参见第20章）。尽管这种工具有其局限性，但它明确地说明了需要依靠基于人工的代码检查来检查代码的正确性。

That said, checking for defects during the initial code review process is still an integral part of a general “shift left” strategy, aiming to discover and resolve issues at the earliest possible time so that they don’t require escalated costs and resources farther down in the development cycle. A code review is neither a panacea nor the only check for such correctness, but it is an element of a defense-in-depth against such problems in software. As a result, code review does not need to be “perfect” to achieve results.

这就是说，在最初的代码审查过程中检查缺陷仍然是一般“左移”策略的一个组成部分，旨在尽早发现和解决问题，从而避免在开发周期中进一步增加成本和资源。代码审查不是万能的，也非检验此类正确性的唯一手段，但它是深入防御软件中此类问题的一个要素。因此，代码审查不需要“完美”才能取得成果。

Surprisingly enough, checking for code correctness is not the primary benefit Google accrues from the process of code review. Checking for code correctness generally ensures that a change works, but more importance is attached to ensuring that a code change is understandable and makes sense over time and as the codebase itself scales. To evaluate those aspects, we need to look at factors other than whether the code is simply logically “correct” or understood.

令人惊讶的是，检查代码的正确性并不是谷歌从代码审查过程中获得的最大好处。检查代码正确性通常可以确保更改有效，但更重要的是确保代码更改是可以理解的，并且随着时间的推移和代码库本身的扩展而变得有意义。为了评估这些方面，我们需要查看除代码在逻辑上是否“正确”或理解之外的其他因素。

> [^5]: “Advances in Software Inspection,” IEEE Transactions on Software Engineering, SE-12(7): 744–751, July 1986. Granted, this study took place before robust tooling and automated testing had become so important in the software development process, but the results still seem relevant in the modern software age.
>
> 5 "Advances in Software Inspection," IEEE Transactions on Software Engineering, SE-12(7): 744-751, July 1986. 诚然，这项研究发生在强大的工具和自动测试在软件开发过程中变得如此重要之前，但其结果在现代软件时代似乎仍有意义。
>
> [^6]: Rigby, Peter C. and Christian Bird. 2013. “Convergent software peer review practices.” ESEC/FSE 2013: Proceedings of the 2013 9th Joint Meeting on Foundations of Software Engineering, August 2013: 202-212. https:// dl.acm.org/doi/10.1145/2491411.2491444.
>
> 6 Rigby, Peter C. and Christian Bird. 2013. "趋同的软件同行评审实践"。ESEC/FSE 2013。2013年第九届软件工程基础联席会议论文集》，2013年8月：202-212。https:// dl.acm.org/doi/10.1145/2491411.2491444。

### Comprehension of Code  代码理解

A code review typically is the first opportunity for someone other than the author to inspect a change. This perspective allows a reviewer to do something that even the best engineer cannot do: provide feedback unbiased by an author’s perspective. *A* *code review is often the first test of whether a given change is understandable to a broader audience*. This perspective is vitally important because code will be read many more times than it is written, and understanding and comprehension are critically important.

代码审查通常是作者以外的人检查修改的第一个时机。这种视角使审查者能够做到最好的工程师也做不到的事情：提供不受作者视角影响的反馈。*代码审查通常是对一个特定的变更是否能被更多的人理解的第一个测试*。这种观点是非常重要的，因为代码被阅读的次数要比它被写的次数多得多，而理解和领悟是非常重要的。

It is often useful to find a reviewer who has a different perspective from the author, especially a reviewer who might need, as part of their job, to maintain or use the code being proposed within the change. Unlike the deference reviewers should give authors regarding design decisions, it’s often useful to treat questions on code comprehension using the maxim “the customer is always right.” In some respect, any questions you get now will be multiplied many-fold over time, so view each question on code comprehension as valid. This doesn’t mean that you need to change your approach or your logic in response to the criticism, but it does mean that you might need to explain it more clearly.

找到一个与作者观点不同的读者通常是很有用的，特别是一个审查员，作为他们工作的一部分，可能需要维护或使用修改中提出的代码。与审查员在设计决策方面应该给予作者的尊重不同，用 "客户永远是对的 "这一格言来对待代码理解方面的问题往往是有用的。在某种程度上，你现在得到的任何问题都会随着时间的推移而成倍增加，所以要把每个关于代码理解的问题看作是有效的。这并不意味着你需要改变你的方法或逻辑来回应批评，但这确实意味着你可能需要更清楚地解释它。

Together, the code correctness and code comprehension checks are the main criteria for an LGTM from another engineer, which is one of the approval bits needed for an approved code review. When an engineer marks a code review as LGTM, they are saying that the code does what it says and that it is understandable. Google, however, also requires that the code be sustainably maintained, so we have additional approvals needed for code in certain cases.

代码正确性和代码理解力的检查共同构成了另一个工程师的LGTM的主要标准，这也是一个被批准的代码审查所需的批准之一。当一个工程师将代码审查标记为LGTM时，他们是在说，代码做了它所说的事情，而且它是可以理解的。然而，谷歌也要求代码是可持续维护的，所以我们在某些情况下对代码还需要额外的批准。

### Code Consistency  代码的一致性

At scale, code that you write will be depended on, and eventually maintained, by someone else. Many others will need to read your code and understand what you did. Others (including automated tools) might need to refactor your code long after you’ve moved to another project. Code, therefore, needs to conform to some standards of consistency so that it can be understood and maintained. Code should also avoid being overly complex; simpler code is easier for others to understand and maintain as well. Reviewers can assess how well this code lives up to the standards of the codebase itself during code review. A code review, therefore, should act to ensure *code health*.

在规模上，你写的代码会被别人依赖，并最终由其他人维护。许多人需要阅读你的代码并了解你的工作。在你转移到另一个项目之后很长时间后，其他人（包括自动化工具）可能需要重构你的代码。因此，代码需要符合一些一致性的标准，这样它才能被理解和维护。代码也应避免过于复杂；简单的代码对其他人来说也更容易理解和维护。审查员可以在代码评审中评估这些代码是否符合代码库本身的标准。因此，代码审查的作用应该是确保*代码的健康*。

It is for maintainability that the LGTM state of a code review (indicating code correctness and comprehension) is separated from that of readability approval. Readability approvals can be granted only by individuals who have successfully gone through the process of code readability training in a particular programming language. For example, Java code requires approval from an engineer who has “Java readability.”

正是为了可维护性，代码审查的LGTM状态（表示代码的正确性和理解力）与可读性批准的状态是分开的。可读性的批准只能由成功通过特定编程语言的代码可读性培训过程的人授予。例如，Java代码需要有 "Java可读性 "的工程师来批准。

A readability approver is tasked with reviewing code to ensure that it follows agreedon best practices for that particular programming language, is consistent with the codebase for that language within Google’s code repository, and avoids being overly complex. Code that is consistent and simple is easier to understand and easier for tools to update when it comes time for refactoring, making it more resilient. If a particular pattern is always done in one fashion in the codebase, it’s easier to write a tool to refactor it.

可读性审查员的任务是审查代码，以确保它遵循该特定编程语言的商定的最佳做法，与谷歌代码库中该语言的代码库一致，并避免过于复杂。一致和简单的代码更容易理解，当需要重构时，工具也更容易更新，使其更有扩展性。如果一个特定的模式在代码库中总是以一种方式完成，那么写一个工具来重构它就会更容易。

Additionally, code might be written only once, but it will be read dozens, hundreds, or even thousands of times. Having code that is consistent across the codebase improves comprehension for all of engineering, and this consistency even affects the process of code review itself. Consistency sometimes clashes with functionality; a readability reviewer may prefer a less complex change that may not be functionally “better” but is easier to understand.

此外，代码可能只编写一次，但它将被读取数十次、数百次甚至数千次。在整个代码库中使用一致的代码可以提高对所有工程的理解，这种一致性甚至会影响代码评审本身的过程。一致性有时与功能冲突；可读性审查员可能更喜欢不太复杂的更改，这些更改在功能上可能不是“更好”，但更容易理解。

With a more consistent codebase, it is easier for engineers to step in and review code on someone else’s projects. Engineers might occasionally need to look outside the team for help in a code review. Being able to reach out and ask experts to review the code, knowing they can expect the code itself to be consistent, allows those engineers to focus more properly on code correctness and comprehension.

有了一个更加一致的代码库，工程师就更容易介入并审查别人项目的代码。工程师们可能偶尔需要向团队外寻求代码审查方面的帮助。能够伸出援手，请专家来审查代码，知道他们可以期望代码本身是一致的，使这些工程师能够更正确地关注代码的正确性和理解。

### Psychological and Cultural Benefits  心理和文化方面的好处

Code review also has important cultural benefits: it reinforces to software engineers that code is not “theirs” but in fact part of a collective enterprise. Such psychological benefits can be subtle but are still important. Without code review, most engineers would naturally gravitate toward personal style and their own approach to software design. The code review process forces an author to not only let others have input, but to compromise for the sake of the greater good.

代码审查还有重要的文化好处：它向软件工程师强调代码不是“他们的”，而是事实上集体事业的一部分。这种心理上的好处可能很微妙，但仍然很重要。没有代码审查，大多数工程师自然会倾向于个人风格和他们自己的软件设计方法。代码审查过程迫使作者不仅要让别人提出意见，而且要为了更大的利益做出妥协。

It is human nature to be proud of one’s craft and to be reluctant to open up one’s code to criticism by others. It is also natural to be somewhat reticent to welcome critical feedback about code that one writes. The code review process provides a mechanism to mitigate what might otherwise be an emotionally charged interaction. Code review, when it works best, provides not only a challenge to an engineer’s assumptions, but also does so in a prescribed, neutral manner, acting to temper any criticism which might otherwise be directed to the author if provided in an unsolicited manner. After all, the process *requires* critical review (we in fact call our code review tool “Critique”), so you can’t fault a reviewer for doing their job and being critical. The code review process itself, therefore, can act as the “bad cop,” whereas the reviewer can still be seen as the “good cop.”

以自己的手艺为荣，不愿意公开自己的代码接受他人的批评，这是人类的天性。对于自己写的代码的批评性反馈，也很自然地不愿意接受。代码审查过程提供了一个机制，以减轻可能是一个情绪化的互动。如果代码审查效果最佳，它不仅会对工程师的假设提出质疑，而且还会以规定的、中立的方式提出质疑，如果以未经请求的方式提出批评，则可能会对作者提出批评。毕竟，这个过程需要批判性的审查（事实上，我们把我们的代码审查工具称为 "批判"），所以你不能责怪审查者做他们的工作和批评。因此，代码审查过程本身可以充当 "坏警察"，而审查者仍然可以被看作是 "好警察"。

Of course, not all, or even most, engineers need such psychological devices. But buffering such criticism through the process of code review often provides a much gentler introduction for most engineers to the expectations of the team. Many engineers joining Google, or a new team, are intimidated by code review. It is easy to think that any form of critical review reflects negatively on a person’s job performance. But over time, almost all engineers come to expect to be challenged when sending a code review and come to value the advice and questions offered through this process (though, admittedly, this sometimes takes a while).

当然，不是所有的，甚至是大多数的工程师都需要这样的心理措施。但是，通过代码审查的过程来缓解这种批评，往往能为大多数工程师提供一个更温和的指导，让他们了解团队的期望。许多加入谷歌的工程师，或者一个新的团队，都被代码审查所吓倒。我们很容易认为任何形式的批评性审查都会对一个人的工作表现产生负面影响。但是，随着时间的推移，几乎所有的工程师都期望在发送代码审查时受到挑战，并开始重视通过这一过程提供的建议和问题（尽管，无可否认，这有时需要一段时间）。

Another psychological benefit of code review is validation. Even the most capable engineers can suffer from imposter syndrome and be too self-critical. A process like code review acts as validation and recognition for one’s work. Often, the process involves an exchange of ideas and knowledge sharing (covered in the next section), which benefits both the reviewer and the reviewee. As an engineer grows in their domain knowledge, it’s sometimes difficult for them to get positive feedback on how they improve. The process of code review can provide that mechanism.

代码审查的另一个心理好处是验证。即使是最有能力的工程师也可能患上冒名顶替综合症，过于自我批评。像代码评审这样的过程是对一个人工作的确认和认可。通常，该过程涉及思想交流和知识共享（将在下一节中介绍），这对审核人和被审核人都有好处。随着工程师领域知识的增长，他们有时很难获得关于如何改进的积极反馈。代码审查过程可以提供这种机制。

The process of initiating a code review also forces all authors to take a little extra care with their changes. Many software engineers are not perfectionists; most will admit that code that “gets the job done” is better than code that is perfect but that takes too long to develop. Without code review, it’s natural that many of us would cut corners, even with the full intention of correcting such defects later. “Sure, I don’t have all of the unit tests done, but I can do that later.” A code review forces an engineer to resolve those issues before sending the change. Collecting the components of a change for code review psychologically forces an engineer to make sure that all of their ducks are in a row. The little moment of reflection that comes before sending off your change is the perfect time to read through your change and make sure you’re not missing anything.

启动代码审查的过程也迫使所有作者对他们的更改多加注意。许多软件工程师并不是完美主义者；大多数人都会承认，"能完成工作 "的代码要比完美但开发时间太长的代码要好。我们中的许多人会抄近路是很自然的，即使我们完全打算在以后纠正这些缺陷。"当然，我没有完成所有的单元测试，但我可以以后再做。" 代码审查迫使工程师在发送修改前解决这些问题。从心理上讲，为代码审查而收集修改的组成部分，迫使工程师确保他们所有的事情都是一帆风顺的。在发送修改前的那一小段思考时间是阅读修改的最佳时机，以确保你没有遗漏任何东西。

### Knowledge Sharing  知识共享

One of the most important, but underrated, benefits of code review is in knowledge sharing. Most authors pick reviewers who are experts, or at least knowledgeable, in the area under review. The review process allows reviewers to impart domain knowledge to the author, allowing the reviewer(s) to offer suggestions, new techniques, or advisory information to the author. (Reviewers can even mark some comments “FYI,” requiring no action; they are simply added as an aid to the author.) Authors who become particularly proficient in an area of the codebase will often become owners as well, who then in turn will be able to act as reviewers for other engineers.

代码审查的一个最重要的，但被低估的好处是知识共享。大多数作者挑选的审查员都是被审查领域的专家，或者至少在所审查的领域有知识。审查过程允许审查员向作者传授领域知识，允许审查员向作者提供建议、新技术或咨询信息。(审查员甚至可以把一些评论标记为 "仅供参考"，不需要采取任何行动；它们只是作为作者的一种帮助而被添加进来）。在代码库某个领域特别精通的作者通常也会成为所有者，而后者又可以作为其他工程师的评审员。

Part of the code review process of feedback and confirmation involves asking questions on why the change is done in a particular way. This exchange of information facilitates knowledge sharing. In fact, many code reviews involve an exchange of information both ways: the authors as well as the reviewers can learn new techniques and patterns from code review. At Google, reviewers may even directly share suggested edits with an author within the code review tool itself.

反馈和确认的代码评审过程的一部分包括询问为什么以特定方式进行更改。这种信息交流有助于知识共享。事实上，许多代码评审都涉及双向信息交换：作者和审查员都可以从代码评审中学习新的技术和模式。在谷歌，审查员甚至可以直接在代码审查工具中与作者分享建议的编辑。

An engineer may not read every email sent to them, but they tend to respond to every code review sent. This knowledge sharing can occur across time zones and projects as well, using Google’s scale to disseminate information quickly to engineers in all corners of the codebase. Code review is a perfect time for knowledge transfer: it is timely and actionable. (Many engineers at Google “meet” other engineers first through their code reviews!)

工程师可能不会阅读每一封发给他们的电子邮件，但他们往往会回复每一封发送的代码审查。这种知识共享也可以跨越时区和项目，利用谷歌的规模将信息迅速传播到代码库的各个角落的工程师。代码审查是知识转移的最佳时机：它是及时和可操作的。(谷歌的许多工程师首先通过代码审查 "认识 "其他工程师！）。

Given the amount of time Google engineers spend in code review, the knowledge accrued is quite significant. A Google engineer’s primary task is still programming, of course, but a large chunk of their time is still spent in code review. The code review process provides one of the primary ways that software engineers interact with one another and exchange information about coding techniques. Often, new patterns are advertised within the context of code review, sometimes through refactorings such as large-scale changes.

考虑到谷歌工程师花在代码审查上的时间，积累的知识相当重要。当然，谷歌工程师的主要任务仍然是编程，但他们的大部分时间仍然花在代码审查上。代码评审过程提供了软件工程师相互交流和交换编码技术信息的主要方式之一。通常，新模式是在代码审查的上下文中发布的，有时是通过重构（如大规模更改）发布的。

Moreover, because each change becomes part of the codebase, code review acts as a historical record. Any engineer can inspect the Google codebase and determine when some particular pattern was introduced and bring up the actual code review in question. Often, that archeology provides insights to many more engineers than the original author and reviewer(s).

此外，由于每个更改都成为代码库的一部分，所以代码评审充当历史记录。任何工程师都可以检查谷歌的代码库，并确定何时引入某些特定的模式，并提出有关的实际代码审查。通常情况下，这种考古学为比原作者和审查者更多的工程师提供了洞察力。

## Code Review Best Practices  代码评审最佳实践

Code review can, admittedly, introduce friction and delay to an organization. Most of these issues are not problems with code review per se, but with their chosen implementation of code review. Keeping the code review process running smoothly at Google is no different, and it requires a number of best practices to ensure that code review is worth the effort put into the process. Most of those practices emphasize keeping the process nimble and quick so that code review can scale properly.

诚然，代码审查会给一个组织带来阻力和延迟。这些问题大多不是代码审查本身的问题，而是他们选择的代码审查实施的问题。在谷歌保持代码审查过程的顺利运行也不例外，它需要大量的最佳实践来确保代码审查是值得的。大多数实践都强调保持流程的敏捷性和快速性，以便代码评审能够适当地扩展。

### Be Polite and Professional  要有礼貌和专业精神

As pointed out in the Culture section of this book, Google heavily fosters a culture of trust and respect. This filters down into our perspective on code review. A software engineer needs an LGTM from only one other engineer to satisfy our requirement on code comprehension, for example. Many engineers make comments and LGTM a change with the understanding that the change can be submitted after those changes are made, without any additional rounds of review. That said, code reviews can introduce anxiety and stress to even the most capable engineers. It is critically important to keep all feedback and criticism firmly in the professional realm.

正如本书文化部分所指出的，谷歌大力培育信任和尊重的文化。这将深入到我们对代码审查的观点中。例如，软件工程师只需要一个来自其他工程师的LGTM就可以满足我们对代码理解的要求。许多工程师在作出更改后提出意见和LGTM，并理解这些更改可以在做出更改后提交，而无需进行任何额外的审查。也就是说，即使是最有能力的工程师，代码审查也会带来焦虑和压力。在专业领域中，坚定地保留所有反馈和批评是至关重要的。

In general, reviewers should defer to authors on particular approaches and only point out alternatives if the author’s approach is deficient. If an author can demonstrate that several approaches are equally valid, the reviewer should accept the preference of the author. Even in those cases, if defects are found in an approach, consider the review a learning opportunity (for both sides!). All comments should remain strictly professional. Reviewers should be careful about jumping to conclusions based on a code author’s particular approach. It’s better to ask questions on why something was done the way it was before assuming that approach is wrong.

一般来说，审查员应该在特定的方法上听从作者的意见，只有在作者的方法有缺陷时才指出替代方法。如果作者能证明几种方法同样有效，审查员应该接受作者的偏好。即使在这些情况下，如果发现一个方法有缺陷，也要把审查看作是一个学习的机会（对双方都是如此！）。所有的评论都应该严格保持专业性。审查员应该注意不要根据代码作者的特定方法就下结论。在假设该方法是错误的之前，最好先问一下为什么要这样做。

Reviewers should be prompt with their feedback. At Google, we expect feedback from a code review within 24 (working) hours. If a reviewer is unable to complete a review in that time, it’s good practice (and expected) to respond that they’ve at least seen the change and will get to the review as soon as possible. Reviewers should avoid responding to the code review in piecemeal fashion. Few things annoy an author more than getting feedback from a review, addressing it, and then continuing to get unrelated further feedback in the review process.

审查员应及时提供反馈。在谷歌，我们希望在24（工作）小时内得到代码审查的反馈。如果审查员无法在这段时间内完成审查，那么良好的做法是（也是我们所期望的）回应说他们至少已经看到了更改，并将尽快进行审查。审查员应该避免以零散的方式回应代码评审。没有什么事情比从审查中得到反馈，解决它，然后继续在审查过程中得到无关的进一步反馈更让作者恼火。

As much as we expect professionalism on the part of the reviewer, we expect professionalism on the part of the author as well. Remember that you are not your code, and that this change you propose is not “yours” but the team’s. After you check that piece of code into the codebase, it is no longer yours in any case. Be receptive to questions on your approach, and be prepared to explain why you did things in certain ways. Remember that part of the responsibility of an author is to make sure this code is understandable and maintainable for the future.

就像我们期望审查员有专业精神一样，我们也期望作者有专业精神。记住，你不是你的代码，你提出的这个修改不是 "你的"，而是团队的。在你把这段代码检查到代码库中后，它无论如何都不再是你的了。要乐于接受关于你的方法的问题，并准备好解释你为什么以某种方式做事情。记住，作者的部分责任是确保这段代码是可以理解的，并且可以为将来维护。

It’s important to treat each reviewer comment within a code review as a TODO item; a particular comment might not need to be accepted without question, but it should at least be addressed. If you disagree with a reviewer’s comment, let them know, and let them know why and don’t mark a comment as resolved until each side has had a chance to offer alternatives. One common way to keep such debates civil if an author doesn’t agree with a reviewer is to offer an alternative and ask the reviewer to PTAL (please take another look). Remember that code review is a learning opportunity for both the reviewer and the author. That insight often helps to mitigate any chances for disagreement.

重要的是要把代码审查中的每个审查者的评论当作一个TODO项目；一个特定的评论可能不需要被无条件接受，但它至少应该被解决。如果你不同意一个评审员的评论，让他们知道，并让他们知道为什么，在双方都有机会提供替代方案之前，不要把评论标记为已解决。如果作者不同意审查员的意见，保持这种辩论的一个常见方法是提供一个替代方案，并要求评审员PTAL（请再看看）。记住，代码审查对于审查者和作者来说都是一个学习的机会。这种洞察力往往有助于减少任何分歧的场景。

By the same token, if you are an owner of code and responding to a code review within your codebase, be amenable to changes from an outside author. As long as the change is an improvement to the codebase, you should still give deference to the author that the change indicates something that could and should be improved.

同样的道理，如果你是代码的所有者，并且在你的代码库中对代码审查做出回应，那么就应该对来自外部作者的改动持宽容态度。只要这个改动是对代码库的改进，你就应该尊重作者的意见，即更改表明了一些可以而且应该改进的地方。

### Write Small Changes  写出小的更改

Probably the most important practice to keep the code review process nimble is to keep changes small. A code review should ideally be easy to digest and focus on a single issue, both for the reviewer and the author. Google’s code review process discourages massive changes consisting of fully formed projects, and reviewers can rightfully reject such changes as being too large for a single review. Smaller changes also prevent engineers from wasting time waiting for reviews on larger changes, reducing downtime. These small changes have benefits further down in the software development process as well. It is far easier to determine the source of a bug within a change if that particular change is small enough to narrow it down.

要保持代码审查过程的灵活性，最重要的做法可能是保持小的更改。理想情况下，代码审查应该是容易理解的，并且对审查者和作者来说，都是集中在一个问题上。谷歌的代码审查过程不鼓励由完全成型的项目组成的大规模修改，审查员可以理所当然地拒绝这样的更改，因为它对于一次审查来说太大。较小的改动也可以防止工程师浪费时间等待对较大变更的审查，减少停滞时间。这些小更改在软件开发过程中也有好处。如果一个特定的变更足够小，那么确定该变更中的错误来源就容易得多。

That said, it’s important to acknowledge that a code review process that relies on small changes is sometimes difficult to reconcile with the introduction of major new features. A set of small, incremental code changes can be easier to digest individually, but more difficult to comprehend within a larger scheme. Some engineers at Google admittedly are not fans of the preference given to small changes. Techniques exist for managing such code changes (development on integration branches, management of changes using a diff base different than HEAD), but those techniques inevitably involve more overhead. Consider the optimization for small changes just that: an optimization, and allow your process to accommodate the occasional larger change.

尽管如此，必须承认，依赖于小更改的代码审查过程有时很难与主要新特性的引入相协调。一组小的、渐进式的代码修改可能更容易单独消化，但在一个更大的方案中却更难理解。不可否认，谷歌的一些工程师并不喜欢小改动。存在管理这种代码变化的技术（在集成分支上开发，使用不同于HEAD的diff base管理变化），但这些技术不可避免地涉及更多的开销。考虑到对小改动的优化只是一个优化，并允许你的过程适应偶尔的大更改。

Small” changes should generally be limited to about 200 lines of code. A small change should be easy on a reviewer and, almost as important, not be so cumbersome that additional changes are delayed waiting for an extensive review. Most changes at Google are expected to be reviewed within about a day.[^7] (This doesn’t necessarily mean that the review is over within a day, but that initial feedback is provided within a day.) About 35% of the changes at Google are to a single file.[^8] Being easy on a reviewer allows for quicker changes to the codebase and benefits the author as well. The author wants a quick review; waiting on an extensive review for a week or so would likely impact follow-on changes. A small initial review also can prevent much more expensive wasted effort on an incorrect approach further down the line.

“小”改动一般应限制在200行左右的代码。一个小的更改应该对审查者来说是容易的，而且，几乎同样重要的是，不要太麻烦，以至于更多的更改被延迟，以等待广泛的审查。在谷歌，大多数的更改预计会在一天内被审查。(这并不一定意味着审查在一天内结束，但初步反馈会在一天内提供。) 在谷歌，大约35%的修改是针对单个文件的。对审查者来说容易，可以更快地修改代码库，对作者也有利。作者希望快速审查；等待一个星期左右的广泛审查可能会影响后续的更改。一个小规模的初步审查也可以防止在后续的错误方法上浪费更昂贵的精力。

Because code reviews are typically small, it’s common for almost all code reviews at Google to be reviewed by one and only one person. Were that not the case—if a team were expected to weigh in on all changes to a common codebase—there is no way the process itself would scale. By keeping the code reviews small, we enable this optimization. It’s not uncommon for multiple people to comment on any given change— most code reviews are sent to a team member, but also CC’d to appropriate teams— but the primary reviewer is still the one whose LGTM is desired, and only one LGTM is necessary for any given change. Any other comments, though important, are still optional.

因为代码审查通常是小规模的，所以在谷歌，几乎所有的代码审查都是由一个人审查，而且只有一个人。如果不是这样的话——如果一个团队被期望对一个共同的代码库的所有更改进行评估，那么这个过程本身就没有办法扩展。通过保持小规模的代码审查，我们实现了这种优化。多人对任何给定的更改发表评论的情况并不罕见--大多数代码审查被发送给一个团队成员，但也被抄送给适当的团队——但主要的审查员仍然是那个希望得到LGTM的人，而且对于任何给定的更改，只有一个LGTM是必要的。任何其他评论，尽管很重要，但仍然是可选的。

Keeping changes small also allows the “approval” reviewers to more quickly approve any given changes. They can quickly inspect whether the primary code reviewer did due diligence and focus purely on whether this change augments the codebase while maintaining code health over time.

保持小的更改也允许 "批准 "审查员更快地批准任何特定的变化。他们可以快速检查主要的代码审查员是否尽职尽责，并纯粹关注这一变化是否增强了代码库，同时随着时间的推移保持代码的健康。

> [^7]: Caitlin Sadowski, Emma Söderberg, Luke Church, Michal Sipko, and Alberto Bacchelli, “Modern code review: a case study at Google.”
>
> 7   Caitlin Sadowski、Emma Söderberg、Luke Church、Michal Sipko和Alberto Baccelli，“现代代码评论：谷歌的案例研究”
>
> [^8]: Ibid.
>
> 8   同上。


### Write Good Change Descriptions  写出好的变更描述

A change description should indicate its type of change on the first line, as a summary. The first line is prime real estate and is used to provide summaries within the code review tool itself, to act as the subject line in any associated emails, and to become the visible line Google engineers see in a history summary within Code Search (see Chapter 17), so that first line is important.

变更描述应该在第一行标注它的变更类型，作为一个摘要。第一行是最重要的，它被用来在代码审查工具中提供摘要，作为任何相关电子邮件的主题行，并成为谷歌工程师在代码搜索中看到的历史摘要的可见行（见第17章），所以第一行很重要。

Although the first line should be a summary of the entire change, the description should still go into detail on what is being changed *and why*. A description of “Bug fix” is not helpful to a reviewer or a future code archeologist. If several related modifications were made in the change, enumerate them within a list (while still keeping it on message and small). The description is the historical record for this change, and tools such as Code Search allow you to find who wrote what line in any particular change in the codebase. Drilling down into the original change is often useful when trying to fix a bug.

虽然第一行应该是整个更改的摘要，但描述仍然应该详细说明更改的内容和*原因*。“Bug修复”的描述对审查员或未来的代码考古学家来说是没有帮助的。如果在变更中进行了多个相关修改，请在列表中列出这些修改（同时仍保留信息和小信息）。描述是此更改的历史记录，代码搜索等工具允许你查找谁在代码库中的任何特定更改中编写了哪一行。在试图修复bug时，深入了解原始更改通常很有用。

Descriptions aren’t the only opportunity for adding documentation to a change. When writing a public API, you generally don’t want to leak implementation details, but by all means do so within the actual implementation, where you should comment liberally. If a reviewer does not understand why you did something, even if it is correct, it is a good indicator that such code needs better structure or better comments (or both). If, during the code review process, a new decision is reached, update the change description, or add appropriate comments within the implementation. A code review is not just something that you do in the present time; it is something you do to record what you did for posterity.

描述并不是为一个更改添加文档的唯一机会。在编写公共API时，你通常不想泄露实现的细节，但在实际实现中，你应该随意地进行注释。如果审查员不理解你为什么要这样做，即使它是正确的，这也是一个很好的指标，说明这样的代码需要更好的结构或更好的注释（或两者）。如果在代码审查过程中，有了新的决定，请更新修改说明，或在实现中添加适当的注释。代码审查不仅仅是你当前所做的事情；这是你为后继者所做的记录。

### Keep Reviewers to a Minimum  尽量减少审查员

Most code reviews at Google are reviewed by precisely one reviewer.[^9] Because the code review process allows the bits on code correctness, owner acceptance, and language readability to be handled by one individual, the code review process scales quite well across an organization the size of Google.

在谷歌，大多数的代码审查都是由一个审查员进行审查的。由于代码审查过程允许由一个人处理代码正确性、所有者接受度和语言可读性等方面的问题，代码审查过程在谷歌这样的组织规模中具有相当好的扩展性。

There is a tendency within the industry, and within individuals, to try to get additional input (and unanimous consent) from a cross-section of engineers. After all, each additional reviewer can add their own particular insight to the code review in question. But we’ve found that this leads to diminishing returns; the most important LGTM is the first one, and subsequent ones don’t add as much as you might think to the equation. The cost of additional reviewers quickly outweighs their value.

在行业内和个人都有一种趋势，即试图从工程师的各个方面获得额外的投入（和一致同意）。毕竟，每个额外的审查员都可以为所讨论的代码审阅添加他们自己的特定见解。但我们发现这会导致收益递减；最重要的LGTM是第一个，后续的LGTM不会像你想象的那样添加到等式中。额外审查员的成本很快就超过了他们的价值。

The code review process is optimized around the trust we place in our engineers to do the right thing. In certain cases, it can be useful to get a particular change reviewed by multiple people, but even in those cases, those reviewers should focus on different aspects of the same change.

代码审查过程是围绕着我们对工程师的信任而优化的，他们会做正确的事情。在某些情况下，让一个特定的更改由多人审查可能是有用的，但即使在这些情况下，这些审查员也应该专注于同一变化的不同方面。

> [^9]: Ibid.
>
> 9   同上。

### Automate Where Possible  尽可能实现自动化

Code review is a human process, and that human input is important, but if there are components of the code process that can be automated, try to do so. Opportunities to automate mechanical human tasks should be explored; investments in proper tooling reap dividends. At Google, our code review tooling allows authors to automatically submit and automatically sync changes to the source control system upon approval (usually used for fairly simple changes).

代码评审是一个人性化的过程，人的投入很重要，但是如果代码过程中的某些部分可以自动化，就尽量这样做。应该探索将人类的机械任务自动化的机会；在适当的工具上的投资可以获得回报。在谷歌，我们的代码审查工具允许作者自动提交修改，并在批准后自动同步到源代码控制系统（通常用于相当简单的修改）。

One of the most important technological improvements regarding automation over the past few years is automatic static analysis of a given code change (see Chapter 20). Rather than require authors to run tests, linters, or formatters, the current Google code review tooling provides most of that utility automatically through what is known as *presubmits*. A presubmit process is run when a change is initially sent to a reviewer. Before that change is sent, the presubmit process can detect a variety of problems with the existing change, reject the current change (and prevent sending an awkward email to a reviewer), and ask the original author to fix the change first. Such automation not only helps out with the code review process itself, it also allows the reviewers to focus on more important concerns than formatting.

在过去的几年中，关于自动化的最重要的技术改进之一是对给定的代码修改进行自动静态分析（见第20章）。目前的Google代码审查工具并不要求作者运行测试、linters或格式化程序，而是通过所谓的*预提交*自动提供大部分的效用。预提交的过程是在一个更改最初被发送给一个审查员时运行的。在该更改被发送之前，预提交程序可以检测到现有更改的各种问题，拒绝当前的更改（并防止向审查者发送尴尬的电子邮件），并要求原作者首先修复该更改。这样的自动化不仅对代码审查过程本身有帮助，还能让审查员专注于比格式化更重要的问题。

## Types of Code Reviews  代码审查的类型

All code reviews are not alike! Different types of code review require different levels of focus on the various aspects of the review process. Code changes at Google generally fall into one of the following buckets (though there is sometimes overlap):

- Greenfield reviews and new feature development
- Behavioral changes, improvements, and optimizations
- Bug fixes and rollbacks
- Refactorings and large-scale changes

所有的代码审查都是不一样的! 不同类型的代码审查需要对审查过程中的各个环节进行不同程度的关注。在谷歌，代码变更一般都属于以下几种情况（尽管有时会有重叠）：

- 绿地审查和新功能开发
- 行为改变、改进和优化
- Bug修复和回滚
- 重构和大规模更改

### Greenfield Code Reviews  绿地代码审查

The least common type of code review is that of entirely new code, a so-called *green‐* *field review*. A greenfield review is the most important time to evaluate whether the code will stand the test of time: that it will be easier to maintain as time and scale change the underlying assumptions of the code. Of course, the introduction of entirely new code should not come as a surprise. As mentioned earlier in this chapter, code is a liability, so the introduction of entirely new code should generally solve a real problem rather than simply provide yet another alternative. At Google, we generally require new code and/or projects to undergo an extensive design review, apart from a code review. A code review is not the time to debate design decisions already made in the past (and by the same token, a code review is not the time to introduce the design of a proposed API).

最不常见的代码审查类型是全新的代码，即所谓的*绿地审查*。绿地审查是评估代码是否经得起时间考验的最重要时机：随着时间和规模的变化，代码的基本假设也会发生变化，它将更容易维护。当然，引入全新的代码并不令人惊讶。正如本章前面提到的，编码是一种责任，因此引入全新的代码通常应该解决一个真正的问题，而不仅仅是提供另一种选择。在Google，除了代码审查之外，我们一般要求新的代码和/或项目要经过广泛的设计审查。代码审查不是辩论过去已经做出的设计决定的时候（同样的道理，代码审查也不是介绍建议的API的设计的时候）。

To ensure that code is sustainable, a greenfield review should ensure that an API matches an agreed design (which may require reviewing a design document) and is tested *fully*, with all API endpoints having some form of unit test, and that those tests fail when the code’s assumptions change. (See Chapter 11). The code should also have proper owners (one of the first reviews in a new project is often of a single OWNERS file for the new directory), be sufficiently commented, and provide supplemental documentation, if needed. A greenfield review might also necessitate the introduction of a project into the continuous integration system. (See Chapter 23).

为了确保代码是可持续性，绿地审查应该确保API与商定的设计相匹配（这可能需要审查设计文档），并进行*充分测试*，所有API接口都有某种形式的单元测试，而且当代码的假设发生变化时，这些测试会失效。(见第11章）。代码还应该有适当的所有者（一个新项目的第一次审查往往是对新目录的一个单一的OWNERS文件的审查），有足够的注释，如果需要的话，还应该提供补充文档。绿地审查也可能需要将项目引入持续集成系统。(参见第23章）。

### Behavioral Changes, Improvements, and Optimizations 行为更改、改进和优化

Most changes at Google generally fall into the broad category of modifications to existing code within the codebase. These additions may include modifications to API endpoints, improvements to existing implementations, or optimizations for other factors such as performance. Such changes are the bread and butter of most software engineers.

谷歌的大多数更改一般都属于对代码库内现有代码进行更改的类型。这些新增内容可能包括对API端点的更改，对现有实现的改进，或对其他因素的优化，如性能。这类更改是大多数软件工程师的日常。

In each of these cases, the guidelines that apply to a greenfield review also apply: is this change necessary, and does this change improve the codebase? Some of the best modifications to a codebase are actually deletions! Getting rid of dead or obsolete code is one of the best ways to improve the overall code health of a codebase.

在每一种情况下，适用于绿地审查的指南也适用：这种更改是否必要，以及这种更改是否改善了代码库？对代码库的一些最佳更改实际上是删除！消除死代码或过时代码是改善代码库整体代码健康状况的最佳方法之一。

Any behavioral modifications should necessarily include revisions to appropriate tests for any new API behavior. Augmentations to the implementation should be tested in a Continuous Integration (CI) system to ensure that those modifications don’t break any underlying assumptions of the existing tests. As well, optimizations should of course ensure that they don’t affect those tests and might need to include performance benchmarks for the reviewers to consult. Some optimizations might also require benchmark tests.

任何行为修改都必须包括对任何新API行为的适当测试的修订。应在持续集成（CI）系统中测试对实现的增强，以确保这些修改不会破坏现有测试的任何基本假设。此外，优化当然应该确保它们不会影响这些测试，并且可能需要包括性能基准，供审查员参考。一些优化可能还需要基准测试。

### Bug Fixes and Rollbacks  Bug修复和回滚

Inevitably, you will need to submit a change for a bug fix to your codebase. *When doing so, avoid the temptation to address other issues*. Not only does this risk increasing the size of the code review, it also makes it more difficult to perform regression testing or for others to roll back your change. A bug fix should focus solely on fixing the indicated bug and (usually) updating associated tests to catch the error that occurred in the first place.

不可避免地，你将需要提交一个更改以修复你的代码库中的bug。*在这样做的时候，要避免一起处理其他问题的诱惑*。这不仅有可能增加代码审查的规模，也会使执行回归测试或其他人回滚你的更改更加困难。bug修复应该只关注于修复指定的bug，并且（通常）更新相关的测试以捕获最初发生的错误。

Addressing the bug with a revised test is often necessary. The bug surfaced because existing tests were either inadequate, or the code had certain assumptions that were not met. As a reviewer of a bug fix, it is important to ask for updates to unit tests if applicable.

用修改后的测试来解决这个bug往往是必要的。这个bug的出现是因为现有的测试不充分，或者代码中的某些假设没有被满足。作为一个bug修复的审查员，如果适用的话，要求更新单元测试是很重要的。

Sometimes, a code change in a codebase as large as Google’s causes some dependency to fail that was either not detected properly by tests or that unearths an untested part of the codebase. In those cases, Google allows such changes to be “rolled back,” usually by the affected downstream customers. A rollback consists of a change that essentially undoes the previous change. Such rollbacks can be created in seconds because they just revert the previous change to a known state, but they still require a code review.

有时，像谷歌这样庞大的代码库中的代码变更会导致一些依赖失效，而这些依赖要么没有被测试正确地检测到，要么就是发现了代码库中未经测试的部分。在这些情况下，谷歌允许这种变化被 "回滚"，通常是由受影响的下游客户进行。回滚由基本上撤消先前更改的更改组成。这种回滚可以在几秒钟内创建，因为它们只是将以前的更改恢复到已知状态，但仍然需要代码检查。

It also becomes critically important that any change that could cause a potential rollback (and that includes all changes!) be as small and atomic as possible so that a rollback, if needed, does not cause further breakages on other dependencies that can be difficult to untangle. At Google, we’ve seen developers start to depend on new code very quickly after it is submitted, and rollbacks sometimes break these developers as a result. Small changes help to mitigate these concerns, both because of their atomicity, and because reviews of small changes tend to be done quickly.

同样至关重要的是，任何可能导致潜在回滚的更改（这包括所有的变化！）都要尽可能小且原子化，这样，如果需要回滚，就不会导致其他依赖关系的进一步破坏，从而难以解开。在谷歌，我们看到开发人员在提交新代码后很快就开始依赖新代码，而回滚有时会破坏这些开发人员。小更改有助于缓解这些担忧，这既因为它们的原子性，也因为对小更改的审查往往很快完成。

### Refactorings and Large-Scale Changes  重构和大规模更改

Many changes at Google are automatically generated: the author of the change isn’t a person, but a machine. We discuss more about the large-scale change (LSC) process in Chapter 22, but even machine-generated changes require review. In cases where the change is considered low risk, it is reviewed by designated reviewers who have approval privileges for our entire codebase. But for cases in which the change might be risky or otherwise requires local domain expertise, individual engineers might be asked to review automatically generated changes as part of their normal workflow.

谷歌的许多变更是自动生成的：变更的作者不是人，而是机器。我们在第22章中讨论了更多关于大规模变更(LSC)的过程，但即使是机器生成的变更也需要审查。在被认为是低风险的情况下，它被指定的审查员审查，他们对我们的整个代码库有批准权。但对于那些可能有风险或需要本地领域专业知识的变化，个别工程师可能被要求审查自动生成的变化，作为他们正常工作流程的一部分。

At first look, a review for an automatically generated change should be handled the same as any other code review: the reviewer should check for correctness and applicability of the change. However, we encourage reviewers to limit comments in the associated change and only flag concerns that are specific to their code, not the underlying tool or LSC generating the changes. While the specific change might be machine generated, the overall process generating these changes has already been reviewed, and individual teams cannot hold a veto over the process, or it would not be possible to scale such changes across the organization. If there is a concern about the underlying tool or process, reviewers can escalate out of band to an LSC oversight group for more information.

乍一看，对自动生成的变更的审查应与任何其他代码审查一样进行处理：审查员应检查变更的正确性和适用性。但是，我们鼓励审查员限制相关更改中的注释，只标记特定于其代码的关注点，而不是生成更改的底层工具或LSC。虽然具体的变更可能是机器生成的，但生成这些变更的整个流程已经过审查，单个团队不能对该流程拥有否决权，否则就不可能在整个组织中扩展此类变更。如果对基础工具或流程存在担忧，审查员可以将带外问题上报给LSC监督小组，以获取更多信息。

We also encourage reviewers of automatic changes to avoid expanding their scope. When reviewing a new feature or a change written by a teammate, it is often reasonable to ask the author to address related concerns within the same change, so long as the request still follows the earlier advice to keep the change small. This does not apply to automatically generated changes because the human running the tool might have hundreds of changes in flight, and even a small percentage of changes with review comments or unrelated questions limits the scale at which the human can effectively operate the tool.

我们还鼓励自动更改的审查者避免扩大其范围。当审查一项新功能或一项由团队成员编写的变更时，通常有理由要求作者解决同一变更中的相关问题，只要该请求仍然遵循先前的建议，以保持较小的变更。这不适用于自动生成的变更，因为运行工具的人可能有数百个变更在进行，即使是带有审查意见或无关问题的一小部分更改，也会限制人员有效操作该工具的范围。

## Conclusion  总结

Code review is one of the most important and critical processes at Google. Code review acts as the glue connecting engineers with one another, and the code review process is the primary developer workflow upon which almost all other processes must hang, from testing to static analysis to CI. A code review process must scale appropriately, and for that reason, best practices, including small changes and rapid feedback and iteration, are important to maintain developer satisfaction and appropriate production velocity.

代码审查是谷歌最重要、最关键的流程之一。代码评审充当着工程师之间的粘合剂，代码评审过程是开发人员的主要工作流程，几乎所有其他过程都必须依赖于此，从测试到静态分析再到CI。代码评审过程必须适当扩展，因此，最佳实践（包括小变更、快速反馈和迭代）对于保持开发人员满意度和适当的生产速度非常重要。

## TL;DRs  内容提要

- Code review has many benefits, including ensuring code correctness, comprehension, and consistency across a codebase.
- Always check your assumptions through someone else; optimize for the reader.
- Provide the opportunity for critical feedback while remaining professional.
- Code review is important for knowledge sharing throughout an organization.
- Automation is critical for scaling the process.
- The code review itself provides a historical record.

- 代码审查有很多好处，包括确保代码的正确性、理解性和整个代码库的一致性。
- 总是通过别人来检查你的假设；为读者优化。
- 在保持专业性同时提供关键反馈的机会。
- 代码审查对于整个组织的知识共享非常重要。
- 自动化对于扩展这个过程是至关重要的。
- 代码审查本身提供了一个历史记录。
