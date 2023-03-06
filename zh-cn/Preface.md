## Preface 序言

This book is titled *Software Engineering at Google*. What precisely do we mean by software engineering? What distinguishes “software engineering” from “programming” or “computer science”? And why would Google have a unique perspective to add to the corpus of previous software engineering literature written over the past 50 years?

本书的标题是*《谷歌的软件工程》*。我们对软件工程的确切定义是什么？软件工程 "与 "编程 "或 "计算机科学 "的区别是什么？为什么谷歌在过去50年的软件工程文献库中会有那些独特的视角？

The terms “programming” and “software engineering” have been used interchangeably for quite some time in our industry, although each term has a different emphasis and different implications. University students tend to study computer science and get jobs writing code as “programmers.”

在我们的业界，"编程 "和 "软件工程 "这两个术语已经被交替使用了相当长的时间，尽管每个术语都有不同的重点和不同的含义。大学生倾向于学习计算机科学，并以作为"程序员 “的身份进行写代码的工作。

“Software engineering,” however, sounds more serious, as if it implies the application of some theoretical knowledge to build something real and precise. Mechanical engineers, civil engineers, aeronautical engineers, and those in other engineering disciplines all practice engineering. They all work in the real world and use the application of their theoretical knowledge to create something real. Software engineers also create “something real,” though it is less tangible than the things other engineers create.

然而，"软件工程 "听起来更加严肃，似乎它意味着应用一些理论知识来建立一些真实和精确的东西。机械工程师、土木工程师、航空工程师和其他工程学科的人都在进行工程实践。他们都在现实世界中工作，运用他们的理论知识来创造一些真实的东西。软件工程师也创造 "真实的东西"，尽管它没有像其他工程师创造的东西那么有形。

Unlike those more established engineering professions, current software engineering theory or practice is not nearly as rigorous. Aeronautical engineers must follow rigid guidelines and practices, because errors in their calculations can cause real damage; programming, on the whole, has traditionally not followed such rigorous practices. But, as software becomes more integrated into our lives, we must adopt and rely on more rigorous engineering methods. We hope this book helps others see a path toward more reliable software practices.

与那些更成熟的工程专业不同，目前的软件工程理论或实践还没有那么严格。航空工程师必须遵循严格的准则和实践，因为他们的计算错误会造成真正的损失；而编程，总体来说，传统上没有遵循这样严格的实践。但是，随着软件越来越多地融入我们的生活，我们必须采用并依赖更严格的工程方法。我们希望这本书能帮助其他人看到一条通往更可靠的软件实践的道路。

### Programming Over Time 随时间变化的编程

We propose that “software engineering” encompasses not just the act of writing code, but all of the tools and processes an organization uses to build and maintain that code over time. What practices can a software organization introduce that will best keep its code valuable over the long term? How can engineers make a codebase more sustainable and the software engineering discipline itself more rigorous? We don’t have fundamental answers to these questions, but we hope that Google’s collective experience over the past two decades illuminates possible paths toward finding those answers.

我们建议，"软件工程 "不仅包括编写代码的行为，还包括一个组织用来长期构建和维护代码的所有工具和流程。一个软件组织可以采用哪些做法来使其代码长期保持最佳价值？工程师们如何才能使代码库更具有可持续性，并使软件工程学科本身更加严格？我们没有这些问题的最终答案，但我们希望谷歌在过去20年的集体经验能够为寻找这些答案的提供可能。

One key insight we share in this book is that software engineering can be thought of as “programming integrated over time.” What practices can we introduce to our code to make it *sustainable*—able to react to necessary change—over its life cycle, from conception to introduction to maintenance to deprecation?

我们在本书中分享的一个关键观点是，软件工程可以被认为是 "随着时间推移而整合的编程"。我们可以在我们的代码中引入哪些实践，使其*可持续*——能够对必要的变化做出反应——在其生命周期中，从设计到引入到维护到废弃？

The book emphasizes three fundamental principles that we feel software organizations should keep in mind when designing, architecting, and writing their code:  
*Time* *and* *Change*
	How code will need to adapt over the length of its life
*Scale* *and Growth*
	How an organization will need to adapt as it evolves
*Trade-offs and Costs*
	How an organization makes decisions, based on the lessons of Time and Change and Scale and Growth

本书强调了三个基本原则，我们认为软件组织在设计、架构和编写代码时应该牢记这些原则：
*时间和变化*
	​代码如何在其生命周期内进行适配。
*规模和增长*
	​一个组织如何适应它的发展过程。
*权衡和成本*
	​一个组织如何根据时间和变化以及规模和增长的经验教训做出决策。

Throughout the chapters, we have tried to tie back to these themes and point out ways in which such principles affect engineering practices and allow them to be sustainable. (See [Chapter 1 ](#_bookmark3)for a full discussion.)

在整个章节中，我们都尝试与这些主题联系起来，并指出这些原则如何影响工程实践并使其可持续。(见[第1章](#_bookmark3)的全面讨论)。

### Google’s Perspective 谷歌的视角

Google has a unique perspective on the growth and evolution of a sustainable soft‐ ware ecosystem, stemming from our scale and longevity. We hope that the lessons we have learned will be useful as your organization evolves and embraces more sustainable practices.

谷歌对可持续软件生态系统的发展和演变有着独特的视角，这源于我们的规模和寿命。我们希望在你的组织发展和采用更多的可持续发展的做法时，我们学到的经验将能对你有帮助。

We’ve divided the topics in this book into three main aspects of Google’s software engineering landscape:
- Culture
- Processes
- Tools

我们将本书的主题分为谷歌软件工程领域的三个主要方面：
- 文化
- 流程
- 工具

Google’s culture is unique, but the lessons we have learned in developing our engineering culture are widely applicable. Our chapters on Culture ([Part II](#_bookmark100)) emphasize the collective nature of a software development enterprise, that the development of software is a team effort, and that proper cultural principles are essential for an organization to grow and remain healthy.

谷歌的文化是独一无二的，但我们在发展工程文化中所获得的经验是广泛适用的。我们关于文化的章节（[第二部分](#_bookmark100)）强调了软件开发企业的集体性，软件开发是一项团队工作，正确的文化原则对于一个组织的成长和保持健康至关重要。

The techniques outlined in our Processes chapters ([Part III](#_bookmark579)) are familiar to most soft‐ ware engineers, but Google’s large size and long-lived codebase provides a more complete stress test for developing best practices. Within those chapters, we have tried to emphasize what we have found to work over time and at scale as well as identify areas where we don’t yet have satisfying answers.

在我们的流程章节（[第三部分](#_bookmark579)）中概述的技术是大多数软体工程师所熟悉的，但谷歌的庞大规模和长期的代码库为开发最佳实践提供了一个更完整的压力测试。在这些章节中，我们强调我们发现随着时间的推移和规模的扩大，什么是有效的，以及确定我们还没有满意的答案的领域。

Finally, our Tools chapters ([Part IV](#_bookmark1363)) illustrate how we leverage our investments in tooling infrastructure to provide benefits to our codebase as it both grows and ages. In some cases, these tools are specific to Google, though we point out open source or third-party alternatives where applicable. We expect that these basic insights apply to most engineering organizations.

最后，我们的工具章节（[第四部分](#_bookmark1363)）说明了我们如何利用对工具基础设施的投入来优化代码库，因为它既增长又腐化。在某些情况下，这些工具是谷歌特有的，尽管我们在适当的地方指出了开源或第三方的替代品。我们希望这些基本的见解适用于大多数工程组织。

The culture, processes, and tools outlined in this book describe the lessons that a typical software engineer hopefully learns on the job. Google certainly doesn’t have a monopoly on good advice, and our experiences presented here are not intended to dictate what your organization should do. This book is our perspective, but we hope you will find it useful, either by adopting these lessons directly or by using them as a starting point when considering your own practices, specialized for your own problem domain.

本书中描写的文化、流程和工具是大多数的软件工程师希望在工作中使用的内容。谷歌当然不会独断好建议，我们在这里介绍的经验并不是要规定你的组织应当这么做。本书是我们的观点，但我们希望你会发现它是有用的，可以直接采用这些经验，也可以在考虑自己的实践时把它们作为一个起点，专门用于解决自己的领域问题。

Neither is this book intended to be a sermon. Google itself still imperfectly applies many of the concepts within these pages. The lessons that we have learned, we learned through our failures: we still make mistakes, implement imperfect solutions, and need to iterate toward improvement. Yet the sheer size of Google’s engineering organization ensures that there is a diversity of solutions for every problem. We hope that this book contains the best of that group.

本书也不打算成为一本布道书。谷歌自身仍在不完善地应用这些书中的许多理念。我们从失败中吸收了教训：我们仍然会犯错误，实施不完美的解决方案，还需要迭代改进。然而，谷歌工程组织的庞大规模确定了每个问题都有多样化的解决方案。我们希望这本书包含了这群人中最好的方案。

### What This Book Isn’t 本书不适用于哪些

This book is not meant to cover software design, a discipline that requires its own book (and for which much content already exists). Although there is some code in this book for illustrative purposes, the principles are language neutral, and there is little actual “programming” advice within these chapters. As a result, this text doesn’t cover many important issues in software development: project management, API design, security hardening, internationalization, user interface frameworks, or other language-specific concerns. Their omission in this book does not imply their lack of importance. Instead, we choose not to cover them here knowing that we could not provide the treatment they deserve. We have tried to make the discussions in this book more about engineering and less about programming.

本书并不是要涵盖软件设计，这门学科有自己的书（而且已经有很多类型的书）。虽然书中有一些代码用于说明问题，但原则是语言无关的，而且这些章节中几乎没有实际的 "编程 "建议。因此，本书没有涉及软件开发中的许多重要问题：项目管理、API设计、安全加固、国际化、用户界面框架或其他特定编程语言问题。本书对这些问题的忽略并不意味着它们不重要。相反，我们选择不在这里涉及它们，因为我们知道我们无法提供它们应有的内容。我们试图使本书的讨论更多的关于工程领域，而不是关于编程领域。

### Parting Remarks 临别赠言

This text has been a labor of love on behalf of all who have contributed, and we hope that you receive it as it is given: as a window into how a large software engineering organization builds its products. We also hope that it is one of many voices that helps move our industry to adopt more forward-thinking and sustainable practices. Most important, we further hope that you enjoy reading it and can adopt some of its lessons to your own concerns.

这篇文章是所有贡献者的心血结晶，我们希望你能虚心地接受它：作为了解一个大型软件工程组织如何构建其产品的窗口。我们还希望它是有助于推动我们的行业采用更具前瞻性和可持续实践的众多声音之一。最重要的是，我们更希望你喜欢它，并能将其中的一些经验用于你的工作。



*— Tom Manshreck*





