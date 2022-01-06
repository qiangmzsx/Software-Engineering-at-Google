**<p align="right">第八章</p>**  
-- -  
**<p align="right">Code Review</p>**  

*<p align="right">作者： Tom Manshreck and Caitlin Sadowski</p>* 
*<p align="right">编辑： Lisa Carey</p>*
代码评审是指在代码被引入代码库之前，由作者以外的其他人对代码进行评审的过程。尽管这是一个简单的定义，但是代码审查过程的实现在整个软件行业中差别很大。一些组织在代码库中有一组经过选择的“看门人”来审查变更。另一些团队将代码审查过程委托给较小的团队，允许不同的团队要求不同级别的代码审查。在谷歌，基本上每个变更在提交之前都要进行评审，每个工程师都要负责发起评审和评审变更。

代码评审通常需要过程和支持该过程的工具的结合。在谷歌，我们使用一个定制的代码审查工具，Critique，来支持我们的过程。[^1]评论在谷歌是一个足够重要的工具，足以在本书中有自己的一章。本章的重点是在谷歌中实践的代码审查过程，而不是特定的工具，这是因为这些基础比工具更古老，而且这些观点中的大多数都可以适用于任何您可能用于代码审查的工具。

<div style="border:solid 1px #eee; padding:10px">For more information on Critique, see Chapter 19.
</div>

代码检查的一些好处，比如在代码进入代码库之前检测代码中的错误，已经很好地建立了[^2]，而且有些明显(如果测量不精确的话)。然而，其他的好处则更为微妙。由于谷歌的代码审查过程是如此普遍和广泛，我们已经注意到许多这些更微妙的影响，包括心理影响，随着时间的推移和规模的扩大，它们为组织提供了许多好处。


### 代码审查流程（Code Review Flow）
代码审查可以发生在软件开发的许多阶段。在谷歌，在将更改提交到代码库之前进行代码审查;这个阶段也称为预提交评审。代码审查的主要最终目标是让另一名工程师同意更改，我们将更改标记为“对我来说很好”(LGTM)。我们使用这个LGTM作为必要的权限“位”(与下面提到的其他位相结合)来允许提交更改。

在谷歌，一个典型的代码审查要经过以下步骤:
1. 用户将更改写入工作区中的代码库。然后，作者创建更改的快照:补丁和相应的描述
上传至代码审查工具。此更改针对代码库生成一个di，用于评估哪些代码已更改。
2. 作者可以使用这个初始补丁来应用自动评审注释或进行自我评审。当作者对变更的差异感到满意时，他们会发送
更改为一个或多个审阅者。这个过程通知那些审阅者，要求他们查看并评论快照。
3.审查员在代码审查工具中打开变更并对差异发表评论，有些评论要求明确的解决方案。有些仅仅是信息。
4. 作者修改了更改，并根据反馈上传了新的快照，然后回复给审阅者。步骤3和步骤4可以重复多次。
5. 在评审人员对更改的最新状态感到满意后，他们同意更改并通过将其标记为“对我来说很好”(LGTM)来接受它。默认情况下只需要一个LGTM，尽管惯例可能要求所有审阅者同意更改。
6. 在一个变更被标记为LGTM之后，只要代码库能够解决所有的注释，并且变更得到批准，作者就可以将变更提交到代码库中。

我们将在下一节讨论批准问题。

<div style="border:1px #EEE solid;padding:10px">

**<p align="center">代码是一种负担</p>**

重要的是要记住(并接受)代码本身就是一种负担。它可能是一种必要的负担，但就其本身而言，代码对某些人来说只是一项维护任务。就像飞机携带的燃料一样，它也有重量，当然，这是飞机飞行所必需的。

当然，新特性通常是必要的，但是在开发代码之前，应该首先注意确保任何新特性都是必要的。重复的代码不仅是一种浪费，它实际上会比没有代码花费更多的时间;当代码库中存在重复时，在一个代码模式下很容易执行的更改通常需要更多的工作。编写全新的代码是非常不受欢迎的，以至于我们中的一些人会说:“如果你从头开始编写代码，那么你就做错了!”

对于库或实用程序代码来说尤其如此。如果您正在编写一个实用程序，那么在一个谷歌大小的代码库中，可能有其他人也做过类似的事情。因此，在第17章中讨论的工具对于查找这些实用代码和防止引入重复代码都是至关重要的。理想情况下，这项研究是事先完成的，在编写任何新代码之前，任何新内容的设计都要传达给适当的小组。

当然，会出现新的项目，引入新的技术，需要新的组件，等等。综上所述，代码审查不是一个重新讨论或讨论以前设计决策的场合。设计决策通常需要时间，需要设计建议的流通，在API评审或类似会议上就设计进行辩论，也许还需要原型的开发。就像对全新代码的代码审查不应该是突然发生的一样，代码审查过程本身也不应该被看作是重新审视以前的决策的机会。
</div>

### 谷歌是怎么做代码审查的（How Code Review Works at Google）
我们已经大致指出了典型的代码评审过程是如何工作的，不过还没有说明细节。本节详细概述了代码审查在谷歌中是如何工作的，以及这些实践如何允许它随着时间的推移而适当伸缩。
对于谷歌的任何给定更改，有三个方面的审查需要“批准”:
- 另一名工程师检查代码的正确性和理解性，确认代码是合适的，并且符合作者的要求。这通常是一个团队成员，尽管也不需要是。这反映在LGTM权限“位”中，这将在同行评审者同意代码“看起来不错”后设置。

- 代码所有者之一的批准，该代码适合于代码库的这一部分(可以签入特定的目录)。如果作者是这样的所有者，这种认可可能是隐含的。谷歌的代码库是一个树形结构，具有特定目录的分层所有者。(见第16章)。所有者是他们特定目录的看门人。更改可以由任何工程师提出，也可以由任何其他工程师进行LGTM 'ed，但相关目录的所有者还必须批准将此添加到他们的代码库中。这样的所有者可能是技术主管或其他被认为是代码库特定领域专家的工程师。通常由每个团队决定分配所有权特权的范围是广还是窄。

- 获得具有语言“可读性”的人的认可[^3]，确认代码符合该语言的风格和最佳实践，并检查代码是否按照我们预期的方式编写。如果作者具有这样的可读性，这种认可也可能是隐含的。这些工程师是从全公司范围内的工程师中挑选出来的，他们被授予了该编程语言的可读性。

尽管这种级别的控制听起来很繁重——而且必须承认，有时大多数审查都有一个人承担所有三个角色，这大大加快了过程。重要的是，作者也可以承担后两种角色，只需另一个工程师的LGTM来将代码检入自己的代码库，前提是他们在该语言中已经具有可读性(所有者经常这样做)。

这些需求使得代码审查过程非常灵活。技术主管是项目的所有者，拥有该代码的语言可读性，他可以只使用来自另一名工程师的LGTM提交代码更改。没有这种权限的实习生可以向相同的代码库提交相同的更改，只要他们得到具有语言可读性的所有者的批准。上述三个权限“位”可以任意组合。作者甚至可以从不同的人那里请求多个LGTM，方法是显式地将更改标记为需要从所有审阅者那里获得LGTM。

在实践中，大多数需要多个批准的代码审查通常要经过两个步骤:从同行工程师那里获得LGTM，然后寻找
来自适当的代码所有者/可读性评审者的批准。这允许两个角色关注代码评审的不同方面，并节省评审时间。革命制度党》
Mary reviewer可以关注代码的正确性和代码更改的总体有效性;代码所有者可以关注此更改是否适合他们的代码库部分，而不必关注每一行代码的细节。换句话说，审批人通常会寻找与同行审批人不同的东西。毕竟，有人试图将代码检入到他们的项目/目录中。他们更关心这样的问题:“这段代码维护起来容易还是困难?”“这会增加我的技术债务吗?”“在我们的团队中，我们是否有维护它的专业知识?”

如果这三种类型的评审都可以由一个评审人员处理，为什么不让这些类型的评审人员处理所有的代码评审呢?简单来说就是规模。分离这三个角色可以增加代码审查过程的灵活性。如果您在实用程序库中的一个新函数上与同行一起工作，您可以让团队中的某个人检查代码的正确性和理解性。经过几轮(也许是几天)，您的代码满足了同行审查员的要求，您得到了一个LGTM。现在，您只需要让库的所有者(所有者通常具有适当的可读性)批准更改即可。

<div >

**<p align="center">所有权Ownership</p>**
当在专用存储库中的小型团队中工作时，通常会授予整个团队对存储库中的所有内容的访问权。毕竟，你知道其他的工程师，这个领域很窄，你们每个人都可以成为专家，小数字限制了潜在错误的影响。

随着团队的扩大，这种方法可能无法扩展。结果要么是混乱的存储库分割，要么是记录谁在存储库的不同部分拥有哪些知识和职责的不同方法。在谷歌，我们将这一套知识和责任称为所有权，并将行使这些知识和责任的人称为所有者。这一概念与拥有一组源代码不同，而是暗示了一种管理意识，即在代码库的某一部分中按照公司的最佳利益行事。(事实上，如果我们可以重新来过，“管家”几乎肯定是一个更好的词。)

特别命名的所有者文件列出了对目录及其子目录负有所有权责任的人的用户名。这些文件还可能包含对其他所有者文件或外部访问控制列表的引用，但最终它们解析为一个个人列表。每个子目录也可以包含一个单独的所有者文件，这种关系是层次上的附加的:一个给定的文件通常由目录树中它上面的所有所有者文件的成员的联合拥有。所有者文件的条目可能和团队一样多，但我们鼓励一个相对较小和集中的列表，以确保责任明确。

谷歌代码的所有权传递了个人权限内代码的批准权，但这些权利也伴随着一系列责任，比如理解拥有的代码，或者知道如何找到拥有该代码的人。不同的团队有
给予新成员所有权的标准不同，但我们通常鼓励他们不要把所有权作为一种入会仪式，并鼓励离开的成员在可行的情况下尽快放弃所有权。

这种分布式所有权结构可以实现我们在本书中概述的许多其他实践。例如，根所有者文件中的一组人可以作为大规模变更的全球审批人(见第22章)，而不必打扰本地团队。类似地，所有者文件充当一种文档，使人们和工具可以通过沿着目录树查找负责给定代码段的人员。在创建新项目时，不存在必须注册新所有权特权的中央机构:一个新的owner文件就足够了。

这种所有权机制很简单，但很强大，而且在过去20年里发展得很好。这是谷歌确保成千上万的工程师可以在一个存储库中高效地操作数十亿行代码的方法之一。
</div>

### 代码评审的好处（Code Review Benefits）
在整个行业中，代码审查本身是没有争议的，尽管它远不是一个普遍的实践。许多(甚至可能是大多数)其他公司和开源项目都有某种形式的代码审查，而且大多数公司都将这个过程视为与将新代码引入代码库时的完整性检查一样重要。软件工程师理解代码评审的一些更明显的好处，即使他们个人并不认为它适用于所有的情况。但在谷歌，这个过程通常比其他大多数公司更彻底、更广泛。

和许多软件公司一样，谷歌的文化是基于给予工程师广泛的自由来完成他们的工作。人们已经认识到，对于一个需要对新技术做出快速反应的充满活力的公司来说，严格的流程往往不起作用，而官僚主义的规则往往不能很好地与创造性的专业人士合作。然而，代码审查是一项强制要求，是谷歌所有软件工程师必须参与的少数通用过程之一。谷歌要求对代码库的每一次修改都进行代码检查[^4]，无论修改的代码有多小。这一要求确实会对工程速度产生成本和影响，因为它会减慢将新代码引入代码库的速度，并会影响任何给定代码更改的生产时间。(这两种情况都是软件工程师对严格的代码评审过程的常见抱怨。)那么，为什么我们需要这个过程呢?为什么我们相信这是一个长期的利益?

设计良好的代码审查过程和认真对待代码审查的文化可以带来以下好处:
- 检查代码正确性
- 确保其他工程师能够理解代码更改
- 强制代码库的一致性
- 从心理上促进团队所有权
- 实现知识共享
- 提供代码评审本身的历史记录

随着时间的推移，其中的许多好处对软件组织来说是至关重要的，而且其中的许多好处不仅对作者有益，而且对评审者也有益。下面的章节将对每一项进行更详细的介绍。

#### 代码的正确性（Code Correctness）

代码审查的一个明显好处是，它允许审查者检查代码更改的“正确性”。让另一组人检查更改有助于确保更改达到预期的效果。审查员通常会查看更改是否有适当的测试、设计是否适当、功能是否正确和有效。在许多情况下，检查代码正确性就是检查特定的更改是否会将错误引入代码库。


许多报告指出，代码审查在防止软件未来出现错误方面的有效性。IBM的一项研究发现，不出所料，在流程中越早发现缺陷，以后修复缺陷所需的时间就越少[^5]。在代码评审时间上的投资节省了测试、调试和执行回归的时间，如果代码评审过程本身是流线型的，以保持它的轻量级。后一点很重要;重量级的代码评审过程，或者不能适当伸缩的代码评审过程，将变得不可持续[^6]。在本章的后面，我们将介绍一些保持流程轻量级的最佳实践。

为了防止对正确性的评价变得过于主观而非客观，作者通常会遵从他们的特定方法，无论是在设计上还是引入的变化的功能上。评论者不应该因为个人观点而提出替代方案。评审者可以提出替代方案，但前提是这些方案能够提高理解能力(例如，通过降低复杂性)或提高功能(例如，通过提高效率)。一般来说，工程师被鼓励批准改进代码库的变更，而不是等待对更“完美”的解决方案达成一致。这种关注倾向于加快代码审查。


随着工具变得越来越强大，许多正确性检查都是通过诸如静态分析和自动测试之类的技术自动执行的(尽管工具可能永远不会完全消除基于人工的代码检查的价值，请参阅第20章了解更多信息)。尽管这种工具有其局限性，但它明确地告诉我们，需要依靠基于人工的代码检查来检查代码的正确性。


也就是说，在最初的代码审查过程中检查缺陷仍然是一般的“左移”策略的一个不可或缺的部分，旨在尽早发现和解决问题，这样它们就不需要在开发周期中进一步升级的成本和资源。代码检查既不是万灵药，也不是这种正确性的唯一检查，但它是针对软件中此类问题进行深入防御的一个元素。因此，代码评审不需要达到“完美”的结果。

令人惊讶的是，检查代码正确性并不是谷歌从代码检查过程中获得的主要好处。检查代码正确性通常可以确保更改有效，但更重要的是要确保代码更改是可理解的，并且随着时间的推移和代码库本身的扩展是有意义的。为了评估这些方面，我们需要看看代码是否在逻辑上“正确”或是否被理解之外的因素。

#### 代码的易读性（Comprehension of Code）
代码审查通常是除作者之外的其他人检查变更的第一个机会。这种观点允许审稿人做一些即使是最好的工程师也做不到的事情:根据作者的观点提供公正的反馈。代码审查通常是测试给定变更是否为更广泛的受众所理解的第一步。这种观点非常重要，因为代码被阅读的次数要比编写的次数多得多，能被看懂和理解非常重要。


找到与作者观点不同的审查员通常是很有用的，尤其是需要维护或使用变更中提出的代码的审查员，这可能是他们工作的一部分。不同于审稿人在设计决策方面应该给予作者的尊重，使用“客户永远是正确的”的格言来处理代码理解问题通常是有用的。在某些方面，您现在遇到的任何问题都将随着时间的推移而成倍增加，所以请将每一个关于代码理解的问题视为有效的。这并不意味着你需要改变你的方法或你的逻辑来回应批评，但它确实意味着你可能需要更清楚地解释它。

代码正确性和代码理解检查是其他工程师对LGTM的主要标准，这是经过批准的代码审查所需的批准位之一。当工程师将代码评审标记为LGTM时，他们是在说代码做了它说的事情，并且是可以理解的。然而，谷歌也要求代码可以持续地维护，因此在某些情况下，我们需要对代码进行额外的批准。

#### 代码的一致性（Code Consistency）

在很大程度上，您编写的代码将依赖于其他人，并最终由其他人维护。许多其他人需要阅读您的代码并理解您所做的工作。其他人(包括自动化工具)可能需要在您转移到另一个项目后很长时间重构您的代码。因此，代码需要遵循一些一致性标准，以便能够被理解和维护。代码也应该避免过于复杂;更简单的代码对其他人来说也更容易理解和维护。评审人员可以在代码评审期间评估代码符合代码库本身标准的程度。因此，代码审查应该确保代码健康。


为了可维护性，代码审查的LGTM状态(指示代码的正确性和理解程度)与可读性批准的状态是分开的。只有通过特定编程语言的代码可读性培训的个人才能批准可读性。例如，Java代码需要获得具有“Java可读性”的工程师的批准。


可读性审批人的任务是审查代码，以确保代码遵循特定编程语言的最佳实践，与谷歌代码库中该语言的代码库保持一致，并避免过于复杂。一致性和简单的代码更容易理解，当需要重构时，工具也更容易更新代码，使其更具弹性。如果一个特定的模式总是在代码库中以一种方式完成，那么编写一个工具来重构它会更容易。


此外，代码可能只写一次，但它会被读几十次、数百次甚至数千次。让代码在整个代码库中保持一致可以提高对所有工程的理解，这种一致性甚至会影响代码审查过程本身。一致性有时会与功能发生冲突;可读性评审者可能更喜欢不那么复杂的更改，这种更改在功能上可能并不“更好”，但更容易理解。

有了更一致的代码库，工程师可以更容易地介入并检查其他人项目的代码。在代码评审中，工程师可能偶尔需要向代码评审利益团队以外的团队寻求帮助。能够联系并请专家检查代码，知道他们可以期望代码本身是一致的，可以让那些工程师更适当地关注代码的正确性和理解

#### 心理和文化上的益处（Psychological and Cultural Benefits）
代码审查也有重要的文化好处:它向软件工程师强调代码不是“他们的”，而是集体企业的一部分。这种心理上带来的好处可能很微妙，但这很重要。如果没有代码审查，大多数工程师会很自然地倾向于个人风格和他们自己的软件设计方法。代码审查过程迫使作者不仅接受让其他人参与，而且会为了整体的利益而让步。


为自己的技艺感到骄傲，不愿让自己的代码受到别人的批评，这是人的本性。对于一个人所写的代码的批评性反馈，在某种程度上保持缄默也是很自然的。代码评审过程提供了一种机制来减轻可能产生的情感上的交互。代码审查，当它工作得最好的时候，不仅提供了一个对工程师的假设的挑战，而且还以一种规定的、中立的方式这样做，以缓和任何批评，如果以一种不请自来的方式提供，可能会指向作者。毕竟，这个过程需要批判性的审查(我们实际上称我们的代码审查工具为“批判”)，所以您不能因为审查者的工作和批判性而指责他们。因此，代码审查过程本身可以充当“唱白脸”，而审查员仍然可以被视为“唱白脸”。


当然，并不是所有，甚至大多数工程师都需要这样的心理设备。但是，通过代码审查的过程来缓冲这种批评，通常为大多数工程师提供了一个更温和的介绍，以了解团队的期望。许多加入谷歌或新团队的工程师都害怕代码审查。人们很容易认为，任何形式的批判性评估都会对一个人的工作表现产生负面影响。但随着时间的推移，几乎所有的工程师在发送代码审查时都会遇到挑战，并开始重视这个过程中提供的建议和问题(尽管，不可否认，这有时需要一段时间)。


代码评审的另一个心理好处是验证。即使是最有能力的工程师也会患上冒名者综合症，过于自我批评。像代码审查这样的过程可以作为对某人工作的验证和识别。通常，这个过程包括思想的交换和知识的分享(在下一节中讨论)，这对审稿人和被审稿人都有好处。随着工程师领域知识的增长，有时候他们很难就自己的进步获得积极的反馈。代码评审过程可以提供这种机制。


启动代码审查的过程还迫使所有的作者在修改时都要格外小心。许多软件工程师不是完美主义者;大多数人会承认，“完成工作”的代码比完美但开发时间太长的代码要好。如果没有代码检查，我们中的许多人会很自然地抄近路，即使我们的目的是在以后纠正这些缺陷。“当然，我没有完成所有的单元测试，但我可以稍后再做这些。”代码审查迫使工程师在发送变更之前解决这些问题。从心理上来说，为代码审查收集变更的组件会迫使工程师确保所有的事情都井然有序。在发送更改之前的片刻反思是仔细阅读更改并确保没有遗漏任何内容的最佳时机。

#### 知识共享（Knowledge Sharing）
代码评审最重要但被低估的好处之一是知识共享。大多数作者会选择那些在所审查的领域是专家，或者至少是知识渊博的评论者。审查过程允许审查人员向作者传授领域知识，允许审查人员向作者提供建议、新技术或咨询信息。(评论者甚至可以将一些评论标记为“供参考”，无需采取任何行动;它们只是作为作者的辅助而添加的。)在代码库的某个领域变得特别精通的作者通常也会成为所有者，然后他们将能够作为其他工程师的评审员

反馈和确认的代码评审过程的一部分包括询问为什么以特定的方式进行变更的问题。这种信息交换促进了知识共享。事实上，许多代码评审都涉及到两种方式的信息交换:作者和评审人员可以从代码评审中学到新的技术和模式。在谷歌，评审人员甚至可以直接在代码评审工具中与作者分享建议的编辑。


工程师可能不会阅读发给他们的每一封电子邮件，但他们倾向于回复发给他们的每一封代码审查。这种知识共享也可以跨越时区和项目，使用谷歌的规模将信息快速传播给代码库的各个角落的工程师。代码评审是知识转移的最佳时机:它是及时的和可操作的。(谷歌的许多工程师都是通过代码评审与其他工程师“见面”的!)


考虑到谷歌工程师花费在代码审查上的时间，积累的知识是非常重要的。当然，谷歌工程师的主要任务仍然是编程，但他们的大部分时间仍然花在代码审查上。代码评审过程提供了软件工程师相互交互和交换编码技术信息的主要方式之一。通常，新的模式是在代码审查的上下文中发布的，有时是通过重构，比如大规模的变更。


此外，因为每个变更都成为代码库的一部分，所以代码审查就像历史记录一样。任何工程师都可以检查谷歌代码库，并确定何时引入某些特定的模式，并提出实际的代码审查问题。通常，比起原作者和审稿人，考古学为更多的工程师提供了洞见。

### 代码评审的最佳实践（Code Review Best Practices）

#### 保持礼貌和专业（Be Polite and Professional）
<details>
<summary>原文</summary>
<div style="border:1px solid #eee;">
Code review can, admittedly, introduce friction and delay to an organization. Most of these issues are not problems with code review per se, but with their chosen implementation of code review. Keeping the code review process running smoothly at Google is no different, and it requires a number of best practices to ensure that code review is worth the effort put into the process. Most of those practices emphasize keeping the process nimble and quick so that code review can scale properly.
</div>
</details>
无可否认，代码评审会给组织带来分歧和延误。这些问题中的大多数都不是代码审查本身的问题，而是它们选择的代码审查实现的问题。保持代码审查过程在谷歌上平稳运行也是一样的，它需要大量的最佳实践来确保代码审查过程值得投入的努力。大多数实践强调保持过程的敏捷和快速，这样代码评审就可以适当地伸缩。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;">
As pointed out in the Culture section of this book, Google heavily fosters a culture of trust and respect. This filters down into our perspective on code review. A software engineer needs an LGTM from only one other engineer to satisfy our requirement on code comprehension, for example. Many engineers make comments and LGTM a change with the understanding that the change can be submitted after those changes are made, without any additional rounds of review. That said, code reviews can introduce anxiety and stress to even the most capable engineers. It is critically important to keep all feedback and criticism firmly in the professional realm.
</div>
</details>

正如本书的文化部分所指出的，谷歌在很大程度上培养了一种信任和尊重的文化。这就深入到我们的代码审查的角度。例如，一个软件工程师只需要一个其他工程师的LGTM来满足我们对代码理解的需求。许多工程师会提出意见，LGTM会做出更改，因为他们认为更改可以在更改完成后提交，而无需进行任何额外的审核。也就是说，即使是最有能力的工程师，代码评审也会给他们带来焦虑和压力。在专业领域中保持所有的反馈和批评是非常重要的。


<details>
<summary>origin</summary>
<div style="border:1px solid #eee;">
In general, reviewers should defer to authors on particular approaches and only point out alternatives if the author’s approach is deficient. If an author can demonstrate that several approaches are equally valid, the reviewer should accept the preference of the author. Even in those cases, if defects are found in an approach, consider the review a learning opportunity (for both sides!). All comments should remain strictly professional. Reviewers should be careful about jumping to conclusions based on a code author’s particular approach. It’s better to ask questions on why something was done the way it was before assuming that approach is wrong.
</div>
</details>

一般来说，审稿人应该在特定的方法上听从作者的意见，只有在作者的方法有缺陷的时候才会指出替代方案。如果一个作者能证明几种方法是同样有效的，审稿人应该接受作者的偏好。即使在这些情况下，如果在一种方法中发现了缺陷，将评审视为一个学习的机会(对双方来说!)所有的评论都应该保持严格的专业性。审查员应该注意不要根据代码作者的特定方法草率下结论。最好先问清楚为什么会这样做，然后再假设这种方法是错误的。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;">
Reviewers should be prompt with their feedback. At Google, we expect feedback from a code review within 24 (working) hours. If a reviewer is unable to complete a review in that time, it’s good practice (and expected) to respond that they’ve at least seen the change and will get to the review as soon as possible. Reviewers should avoid responding to the code review in piecemeal fashion. Few things annoy an author more than getting feedback from a review, addressing it, and then continuing to get unrelated further feedback in the review process.
</div>
</details>

评审员应该及时提供反馈。在谷歌，我们期望在24(工作)小时内从代码审查中得到反馈。如果评审员无法在那段时间内完成评审，那么最好的做法(和预期的)是回应他们至少已经看到了更改，并将尽快进行评审。评审人员应该避免以零碎的方式响应代码评审。很少有什么事情比从审查中获得反馈，解决它，然后在审查过程中继续获得不相关的进一步反馈更让作者恼火的了。


<details>
<summary>origin</summary>
<div style="border:1px solid #eee;">
As much as we expect professionalism on the part of the reviewer, we expect professionalism on the part of the author as well. Remember that you are not your code, and that this change you propose is not “yours” but the team’s. After you check that piece of code into the codebase, it is no longer yours in any case. Be receptive to questions on your approach, and be prepared to explain why you did things in certain ways. Remember that part of the responsibility of an author is to make sure this code is understandable and maintainable for the future.
</div>
</details>
正如我们期望审稿人的专业性一样，我们也期望作者的专业性。记住，你不是你的代码，你提出的这个改变不是“你的”，而是团队的。在您将这段代码签入代码库后，它在任何情况下都不再是您的。要乐于接受关于你的方法的问题，并准备好解释为什么你会以某种方式做事。请记住，作者的部分职责是确保这些代码在将来是可理解和可维护的。

<details>
<summary>origin1</summary>
<div style="border:1px solid #eee;">
It’s important to treat each reviewer comment within a code review as a TODO item; a particular comment might not need to be accepted without question, but it should at least be addressed. If you disagree with a reviewer’s comment, let them know, and let them know why and don’t mark a comment as resolved until each side has had a chance to offer alternatives. One common way to keep such debates civil if an author doesn’t agree with a reviewer is to offer an alternative and ask the reviewer to PTAL (please take another look). Remember that code review is a learning opportunity for both the reviewer and the author. That insight often helps to mitigate any chances for disagreement.
</div>
</details>
将代码评审中的每个评审人的注释视为TODO项目是很重要的;可能不需要毫无疑问地接受某个特定的评论，但至少应该处理它。如果你不同意评审员的意见，让他们知道，并让他们知道原因，在双方都有机会提供替代方案之前，不要将意见标记为已解决。如果作者不同意审稿人的观点，一种让这种争论保持公正性的常见方法是提供另一种选择，并请审稿人提供PTAL(请再看一遍)。记住，代码审查对于审查者和作者来说都是一个学习的机会。这种洞察力通常有助于减少出现分歧的机会。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Code review can, admittedly, introduce friction and delay to an organization. Most of these issues are not problems with code review per se, but with their chosen implementation of code review. Keeping the code review process running smoothly at Google is no different, and it requires a number of best practices to ensure that code review is worth the effort put into the process. Most of those practices emphasize keeping the process nimble and quick so that code review can scale properly.
</div>
</details>
同样地，如果您是代码的所有者，并在代码库中响应代码审查，那么您应该对来自外部作者的更改保持服从。只要更改是对代码库的改进，您仍然应该尊重作者，因为更改表明了可以而且应该改进的东西。

#### 尽量小的修改（Write Small Changes）
<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Probably the most important practice to keep the code review process nimble is to keep changes small. A code review should ideally be easy to digest and focus on a single issue, both for the reviewer and the author. Google’s code review process discourages massive changes consisting of fully formed projects, and reviewers can rightfully reject such changes as being too large for a single review. Smaller changes also prevent engineers from wasting time waiting for reviews on larger changes, reducing downtime. These small changes have benefits further down in the software development process as well. It is far easier to determine the source of a bug within a change if that particular change is small enough to narrow it down.
</div>
</details>
保持代码审查过程灵活的最重要的实践可能是保持变更小。对于审查员和作者来说，理想情况下，代码审查应该易于理解，并且集中于单个问题。谷歌的代码评审过程不鼓励由完全成形的项目组成的大规模更改，评审人员可以正确地拒绝这些更改，因为它们对于单个评审来说太大了。较小的变更还可以防止工程师浪费时间等待较大变更的审查，从而减少停机时间。这些小的变化在软件开发过程中也有好处。如果特定的更改足够小，可以缩小范围，那么在更改中确定bug的来源就容易得多。


<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
That said, it’s important to acknowledge that a code review process that relies on small changes is sometimes difficult to reconcile with the introduction of major new features. A set of small, incremental code changes can be easier to digest individually, but more difficult to comprehend within a larger scheme. Some engineers at Google admittedly are not fans of the preference given to small changes. Techniques exist for managing such code changes (development on integration branches, management of changes using a diff base different than HEAD), but those techniques inevitably involve more overhead. Consider the optimization for small changes just that: an optimization, and allow your process to accommodate the occasional larger change.
</div>
</details>

也就是说，重要的是要认识到，依赖于小更改的代码审查过程有时很难与主要新特性的引入相协调。一组小的、递增的代码更改可以更容易地单独理解，但在一个更大的方案中更难理解。诚然，谷歌的一些工程师并不喜欢小改动。管理这些代码变更的技术是存在的(在集成分支上进行开发，使用不同于HEAD的差异基进行变更的管理)，但是这些技术不可避免地会带来更多的开销。考虑对小更改的优化:这是一种优化，并允许您的流程适应偶尔出现的较大更改。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
“Small” changes should generally be limited to about 200 lines of code. A small change should be easy on a reviewer and, almost as important, not be so cumbersome that additional changes are delayed waiting for an extensive review. Most changes at Google are expected to be reviewed within about a day. (This doesn’t necessarily mean that the review is over within a day, but that initial feedback is provided within a day.) About 35% of the changes at Google are to a single file. Being easy on a reviewer allows for quicker changes to the codebase and benefits the author as well. The author wants a quick review; waiting on an extensive review for a week or so would likely impact follow-on changes. A small initial review also can prevent much more expensive wasted effort on an incorrect approach further down the line.
</div>
</details>

“小的”更改通常应该限制在200行代码之内。对审查员来说，一个小的改变应该是容易的，同样重要的是[^7]，不要太麻烦，因为额外的改变要等到广泛的审查才会被延迟。谷歌的大多数修改预计将在一天内被审查(这并不一定意味着审查在一天内结束，但最初的反馈是在一天内提供的。)谷歌中35%的修改都是针对单个文件的对审查员来说容易[^8]，可以更快地修改代码库，同时也有利于作者。作者想要快速回顾;等待一个星期左右的全面审查可能会影响后续的变化。一个小的初始审查还可以防止在一个不正确的方法上花费更多的精力。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Because code reviews are typically small, it’s common for almost all code reviews at Google to be reviewed by one and only one person. Were that not the case—if a team were expected to weigh in on all changes to a common codebase—there is no way the process itself would scale. By keeping the code reviews small, we enable this optimization. It’s not uncommon for multiple people to comment on any given change— most code reviews are sent to a team member, but also CC’d to appropriate teams— but the primary reviewer is still the one whose LGTM is desired, and only one LGTM is necessary for any given change. Any other comments, though important, are still optional.
</div>
</details>

因为代码评审规模通常很小，所以谷歌上几乎所有的代码评审通常都只有一个人评审。如果不是这样的话——如果希望团队对公共代码库的所有更改进行权衡，那么流程本身就不可能进行扩展。通过保持代码评审的小范围，我们实现了这种优化。许多人对任何给定的更改进行评论并不罕见——大多数代码评审会发送给一个团队成员，但也会抄送给适当的团队——但主要的评审人员仍然是需要LGTM的人，而且任何给定的更改只需要一个LGTM。其他注释虽然重要，但仍然是可选的。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Keeping changes small also allows the “approval” reviewers to more quickly approve any given changes. They can quickly inspect whether the primary code reviewer did due diligence and focus purely on whether this change augments the codebase while maintaining code health over time.
</div>
</details>

保持更改小也允许“批准”审阅者更快地批准任何给定的更改。他们可以快速地检查主代码审查员是否做了尽职调查，并只关注这个变更是否增加了代码库，同时随着时间的推移保持了代码健康。

#### 编写好的变更说明（Write Good Change Descriptions）

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
A change description should indicate its type of change on the first line, as a summary. The first line is prime real estate and is used to provide summaries within the code review tool itself, to act as the subject line in any associated emails, and to become the visible line Google engineers see in a history summary within Code Search (see Chapter 17), so that first line is important.
</div>
</details>

变更描述应该在第一行指出它的变更类型，作为一个摘要。第一行是'房地产和用于提供总结在代码审查工具本身,作为相关的主题在任何电子邮件,和成为可见线在代码搜索谷歌工程师看到历史的总结(见第17章),所以,第一行是非常重要的。


<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Although the first line should be a summary of the entire change, the description should still go into detail on what is being changed and why. A description of “Bug fix” is not helpful to a reviewer or a future code archeologist. If several related modifications were made in the change, enumerate them within a list (while still keeping it on message and small). The description is the historical record for this change, and tools such as Code Search allow you to find who wrote what line in any particular change in the codebase. Drilling down into the original change is often useful when trying to fix a bug.
</div>
</details>

虽然第一行应该是整个变更的总结，但是描述仍然应该详细说明变更的内容和原因。关于“Bug修复”的描述对于审查者或未来的代码考古学家来说并没有什么帮助。如果在更改中进行了几个相关的修改，则在列表中枚举它们(同时仍然保持其为消息且较小)。描述是此更改的历史记录，而诸如Code Search之类的工具允许您查找代码库中任何特定更改中的哪一行是由谁编写的。在试图修复bug时，深入研究原始更改通常很有用。

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Descriptions aren’t the only opportunity for adding documentation to a change. When writing a public API, you generally don’t want to leak implementation details, but by all means do so within the actual implementation, where you should comment liberally. If a reviewer does not understand why you did something, even if it is correct, it is a good indicator that such code needs better structure or better comments (or both). If, during the code review process, a new decision is reached, update the change description, or add appropriate comments within the implementation. A code review is not just something that you do in the present time; it is something you do to record what you did for posterity.
</div>
</details>

描述并不是向变更添加文档的唯一机会。在编写公共API时，通常不希望泄漏实现细节，但务必在实际实现中这样做，在实际实现中应该自由地注释。如果审查员不理解你为什么要做某事，即使它是正确的，这是一个很好的指示器，表明这样的代码需要更好的结构或更好的注释(或两者都需要)。如果，在代码评审过程中，达成了一个新的决定，更新变更描述，或者在实现中添加适当的注释。代码评审不仅仅是你现在要做的事情;你这样做是为了后面维护此功能的工程师。


#### 尽量控制审查人员数量（Keep Reviewers to a Minimum）

<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
Most code reviews at Google are reviewed by precisely one reviewer.9 Because the code review process allows the bits on code correctness, owner acceptance, and language readability to be handled by one individual, the code review process scales quite well across an organization the size of Google.
</div>
</details>

谷歌的大多数代码评审都是由一个评审人员来评审的因为代码审查过程允许代码正确性、所有者接受度和语言可读性由一个人来处理，所以代码审查过程在一个规模如谷歌的组织中可以很好地扩展。


<details>
<summary>origin</summary>
<div style="border:1px solid #eee;padding:5px">
There is a tendency within the industry, and within individuals, to try to get additional input (and unanimous consent) from a cross-section of engineers. After all, each additional reviewer can add their own particular insight to the code review in question. But we’ve found that this leads to diminishing returns; the most important LGTM is the first one, and subsequent ones don’t add as much as you might think to the equation. The cost of additional reviewers quickly outweighs their value.
</div>
</details>

无论是在行业内部还是在个人内部，都有一种倾向，即试图从不同领域的工程师那里获得额外的投入(以及一致的同意)。毕竟，每个额外的审查员都可以将他们自己独特的见解添加到有问题的代码审查中。但我们发现这会导致收益递减;LGTM中最重要的是第一个，而后续的程序并没有你想象的那么多。额外评审员的成本很快就超过了他们的价值。


<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
The code review process is optimized around the trust we place in our engineers to do the right thing. In certain cases, it can be useful to get a particular change reviewed by multiple people, but even in those cases, those reviewers should focus on different aspects of the same change.
</div></details>

代码审查过程是基于我们对工程师的信任而优化的。在某些情况下，让多个人员评审一个特定的变更是很有用的，但是即使在这些情况下，那些评审人员也应该关注相同变更的不同方面。


#### 尽可能自动化（Automate Where Possible）


<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Code review is a human process, and that human input is important, but if there are components of the code process that can be automated, try to do so. Opportunities to automate mechanical human tasks should be explored; investments in proper tooling reap dividends. At Google, our code review tooling allows authors to automatically submit and automatically sync changes to the source control system upon approval (usually used for fairly simple changes).
</div></details>

代码审查是一个人工过程，而人工输入是重要的，但是如果代码过程中有可以自动化的组件，请尝试这样做。应该探索将机械人工任务自动化的机会;投资于合适的工具会获得回报。在谷歌，我们的代码审查工具允许作者在批准时自动向源代码控制系统提交并自动同步更改(通常用于相当简单的更改)。


<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
One of the most important technological improvements regarding automation over the past few years is automatic static analysis of a given code change (see Chapter 20). Rather than require authors to run tests, linters, or formatters, the current Google code review tooling provides most of that utility automatically through what is known as presubmits. A presubmit process is run when a change is initially sent to a reviewer. Before that change is sent, the presubmit process can detect a variety of problems with the existing change, reject the current change (and prevent sending an awkward email to a reviewer), and ask the original author to fix the change first. Such automation not only helps out with the code review process itself, it also allows the reviewers to focus on more important concerns than formatting.
</div></details>

在过去的几年中，关于自动化的最重要的技术改进之一是对给定代码更改的自动静态分析(参见第20章)。当前的谷歌代码审查工具通过所谓的预提交自动提供了大部分实用程序，而不是要求作者运行测试、测试器或格式化器。预提交流程是在更改首次发送给审阅者时运行的。在发送更改之前，presubmit过程可以检测到现有更改的各种问题，拒绝当前的更改(并防止向审查者发送尴尬的电子邮件)，并要求原始作者首先修复更改。这种自动化不仅有助于代码评审过程本身，它还允许评审人员关注比格式更重要的问题。

### 代码评审的类型（Types of Code Reviews）

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
All code reviews are not alike! Different types of code review require different levels of focus on the various aspects of the review process. Code changes at Google generally fall into one of the following buckets (though there is sometimes overlap): 

- Greenfield reviews and new feature development
- Behavioral changes, improvements, and optimizations
- Bug fixes and rollbacks
- Refactorings and large-scale changes
</div></details>

所有的代码评审都是不一样的!不同类型的代码评审需要对评审过程的各个方面有不同程度的关注。谷歌的代码更改通常属于以下一个桶(尽管有时有重叠):
- 新功能的评估和开发
- 行为改变、改进和优化
- Bug修复和回滚
- 重构和大规模变更

#### Greenfield Code Reviews

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
The least common type of code review is that of entirely new code, a so-called greenfield review. A greenfield review is the most important time to evaluate whether the code will stand the test of time: that it will be easier to maintain as time and scale change the underlying assumptions of the code. Of course, the introduction of entirely new code should not come as a surprise. As mentioned earlier in this chapter, code is a liability, so the introduction of entirely new code should generally solve a real problem rather than simply provide yet another alternative. At Google, we generally require new code and/or projects to undergo an extensive design review, apart from a code review. A code review is not the time to debate design decisions already made in the past (and by the same token, a code review is not the time to introduce the design of a proposed API).
</div></details>

最不常见的代码审查类型是对全新代码的审查，即所谓的“绿地审查”。在评估代码是否能经受住时间的考验时，最重要的是对新代码进行审查:当时间和规模改变了代码的基本假设时，代码的维护会更容易。当然，引入全新的代码并不令人意外。正如本章前面提到的，代码是一种负担，所以引入全新的代码通常应该解决实际问题，而不是简单地提供另一种选择。在谷歌，我们通常要求新代码和/或项目经过广泛的设计审查，而不是代码审查。代码审查不是讨论过去已经做出的设计决定的时候(同样，代码审查也不是介绍所提议API设计的时候)。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
To ensure that code is sustainable, a greenfield review should ensure that an API matches an agreed design (which may require reviewing a design document) and is tested fully, with all API endpoints having some form of unit test, and that those tests fail when the code’s assumptions change. (See Chapter 11). The code should also have proper owners (one of the first reviews in a new project is often of a single OWNERS file for the new directory), be sufficiently commented, and provide supplemental documentation, if needed. A greenfield review might also necessitate the introduction of a project into the continuous integration system. (See Chapter 23).
</div></details>

为了确保代码的可持续性，新开发的评审应该确保API与商定的设计相匹配(这可能需要评审设计文档)，并进行充分的测试，所有API端点都有某种形式的单元测试，当代码的假设发生变化时，这些测试将失败。(见第11章)。代码还应该有适当的所有者(新项目中的第一个审查通常是新目录的一个单独的所有者文件)，要有充分的注释，并在需要时提供补充文档。新开发的审查也可能需要将项目引入到持续集成系统中。(参见23章)。

#### 行为改变、改进和优化


<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Most changes at Google generally fall into the broad category of modifications to existing code within the codebase. These additions may include modifications to API endpoints, improvements to existing implementations, or optimizations for other factors such as performance. Such changes are the bread and butter of most software engineers.
</div></details>

谷歌中的大多数更改通常属于对代码库中现有代码的修改的广泛类别。这些添加可能包括对API端点的修改，对现有实现的改进，或者对其他因素(如性能)的优化。这些变化是大多数软件工程师的谋生之道。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
In each of these cases, the guidelines that apply to a greenfield review also apply: is this change necessary, and does this change improve the codebase? Some of the best modifications to a codebase are actually deletions! Getting rid of dead or obsolete code is one of the best ways to improve the overall code health of a codebase.
</div></details>

在每一种情况下，适用于新领域评审的准则也同样适用:这个更改是必要的吗?这个更改是否改进了代码库?对代码库的一些最好的修改实际上是删除!清除死的或过时的代码是改善代码库整体代码健康状况的最佳方法之一。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Any behavioral modifications should necessarily include revisions to appropriate tests for any new API behavior. Augmentations to the implementation should be tested in a Continuous Integration (CI) system to ensure that those modifications don’t break any underlying assumptions of the existing tests. As well, optimizations should of course ensure that they don’t affect those tests and might need to include performance benchmarks for the reviewers to consult. Some optimizations might also require benchmark tests.
</div></details>

任何行为修改都必须包括对任何新API行为的适当测试的修订。应该在持续集成(CI)系统中测试对实现的增强，以确保这些修改不会破坏现有测试的任何潜在假设。此外，优化当然应该确保它们不会影响这些测试，并且可能需要包括性能基准，以便审核人员参考。一些优化可能还需要基准测试。

#### Bug修复和回滚（Bug Fixes and Rollbacks）

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Inevitably, you will need to submit a change for a bug fix to your codebase. When doing so, avoid the temptation to address other issues. Not only does this risk increasing the size of the code review, it also makes it more difficult to perform regression testing or for others to roll back your change. A bug fix should focus solely on fixing the indicated bug and (usually) updating associated tests to catch the error that occurred in the first place.
</div></details>

不可避免地，您将需要为代码库的bug修复提交更改。这样做的时候，要避免解决其他问题的诱惑。这种风险不仅增加了代码审查的规模，还使执行回归测试或让其他人回滚您的更改变得更加困难。错误修复应该只关注于修复指定的错误，并且(通常)更新相关的测试，以捕获最初发生的错误。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Addressing the bug with a revised test is often necessary. The bug surfaced because existing tests were either inadequate, or the code had certain assumptions that were not met. As a reviewer of a bug fix, it is important to ask for updates to unit tests if applicable.
</div></details>

通常需要通过修订的测试来解决bug。bug出现的原因是现有的测试不充分，或者代码的某些假设没有得到满足。作为一个bug修复的评审者，如果适用的话，要求更新单元测试是很重要的。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Sometimes, a code change in a codebase as large as Google’s causes some dependency to fail that was either not detected properly by tests or that unearths an untested part of the codebase. In those cases, Google allows such changes to be “rolled back,” usually by the affected downstream customers. A rollback consists of a change that essentially undoes the previous change. Such rollbacks can be created in seconds because they just revert the previous change to a known state, but they still require a code review.
</div></details>

有时，像谷歌这样大的代码库中的代码更改会导致某些依赖项失败，这些依赖项要么没有被测试正确地检测到，要么会发现代码库中未测试的部分。在这些情况下，谷歌允许“回滚”这些更改，通常由受影响的下游客户执行。回滚包含一个基本上撤消先前更改的更改。这样的回滚可以在几秒钟内创建，因为它们只是将以前的更改恢复到已知的状态，但它们仍然需要代码检查。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
It also becomes critically important that any change that could cause a potential rollback (and that includes all changes!) be as small and atomic as possible so that a rollback, if needed, does not cause further breakages on other dependencies that can be difficult to untangle. At Google, we’ve seen developers start to depend on new code very quickly after it is submitted, and rollbacks sometimes break these developers as a result. Small changes help to mitigate these concerns, both because of their atomicity, and because reviews of small changes tend to be done quickly.
</div></details>

同样重要的是，任何可能导致潜在回滚(包括所有更改!)的更改都要尽可能小和原子化，这样，如果需要回滚，就不会对其他依赖项造成进一步的破坏，从而难以理清。在谷歌，我们看到开发人员在提交新代码后很快就开始依赖它，回滚有时会导致这些开发人员崩溃。小的更改有助于缓解这些问题，这不仅是因为它们的原子性，而且因为小更改的检查往往可以快速完成。

#### 重构和大规模变更（Refactorings and Large-Scale Changes）

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Many changes at Google are automatically generated: the author of the change isn’t a person, but a machine. We discuss more about the large-scale change (LSC) process in Chapter 22, but even machine-generated changes require review. In cases where the change is considered low risk, it is reviewed by designated reviewers who have approval privileges for our entire codebase. But for cases in which the change might be risky or otherwise requires local domain expertise, individual engineers might be asked to review automatically generated changes as part of their normal workflow.
</div></details>

谷歌中的许多更改都是自动生成的:更改的作者不是一个人，而是一台机器。我们在第22章中更多地讨论了大规模变化(LSC)过程，但即使是机器生成的变化也需要回顾。在变更被认为是低风险的情况下，它将由对我们的整个代码库具有批准权限的指定的评审者进行审查。但是对于变更可能有风险或者需要局部领域的专业知识的情况，单个的工程师可能会被要求检查自动生成的变更，作为他们正常工作流程的一部分。

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
At first look, a review for an automatically generated change should be handled the same as any other code review: the reviewer should check for correctness and applicability of the change. However, we encourage reviewers to limit comments in the associated change and only flag concerns that are specific to their code, not the underlying tool or LSC generating the changes. While the specific change might be machine generated, the overall process generating these changes has already been reviewed, and individual teams cannot hold a veto over the process, or it would not be possible to scale such changes across the organization. If there is a concern about the underlying tool or process, reviewers can escalate out of band to an LSC oversight group for more information.
</div></details>

乍一看，对自动生成的变更的审查应该与任何其他代码审查一样处理:审查者应该检查变更的正确性和适用性。然而，我们鼓励审阅者限制相关变更中的注释，并且只标记特定于他们的代码的关注点，而不是生成变更的底层工具或LSC。虽然特定的变更可能是机器生成的，但是生成这些变更的整个过程已经被审查过了，并且单个团队不能对该过程持有否决权，否则就不可能在整个组织中扩展这些变更。如果对底层工具或流程有疑问，审查人员可以将审查范围扩大到LSC监督小组以获取更多信息。


<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
We also encourage reviewers of automatic changes to avoid expanding their scope. When reviewing a new feature or a change written by a teammate, it is often reasonable to ask the author to address related concerns within the same change, so long as the request still follows the earlier advice to keep the change small. This does not apply to automatically generated changes because the human running the tool might have hundreds of changes in flight, and even a small percentage of changes with review comments or unrelated questions limits the scale at which the human can effectively operate the tool.
</div></details>

我们还鼓励自动更改的评审者避免扩大他们的范围。当评审一个由团队成员编写的新特性或变更时，只要这个请求仍然遵循早期的建议，保持变更小，要求作者处理相同变更中的相关问题通常是合理的。这并不适用于自动生成的变更，因为运行工具的人员可能会有数百个变更正在进行中，即使只有一小部分变更带有评论或无关的问题，也会限制人员有效操作工具的规模。

#### 重构和重大变更（Refactorings and Large-Scale Changes）

### 总结（Conclusion）

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">
Code review is one of the most important and critical processes at Google. Code review acts as the glue connecting engineers with one another, and the code review process is the primary developer workflow upon which almost all other processes must hang, from testing to static analysis to CI. A code review process must scale appropriately, and for that reason, best practices, including small changes and rapid feedback and iteration, are important to maintain developer satisfaction and appro‐ priate production velocity
</div></details>

代码审查是谷歌最重要和关键的流程之一。代码评审充当连接工程师之间的粘合剂，而代码评审过程是开发人员的主要工作流程，几乎所有其他过程(从测试到静态分析到CI)都必须在此之上挂起。代码评审过程必须适当地扩展，因此，最佳实践，包括小的变更、快速的反馈和迭代，对于保持开发人员的满意度和适当的生产速度非常重要


### TL;DRs

<details> <summary>origin</summary><div style="border:1px solid #eee;padding:5px">

- Code review has many benefits, including ensuring code correctness, comprehension, and consistency across a codebase.
- Always check your assumptions through someone else; optimize for the reader.
- Provide the opportunity for critical feedback while remaining professional.
- Code review is important for knowledge sharing throughout an organization.
- Automation is critical for scaling the process.
- The code review itself provides a historical record.
</div></details>

- 代码评审有很多好处，包括确保代码的正确性、理解性和代码库的一致性。
- 总是通过别人来验证你的假设;为读者优化。
- 在保持专业的同时，提供批判性反馈的机会。
- 代码评审对于整个组织的知识共享非常重要。
- 自动化是扩展流程的关键。
- 代码评审本身提供了一个历史记录。



[^1]:We also use Gerrit to review Git code, primarily for our open source projects. However, Critique is the pri‐
mary tool of a typical software engineer at Google.

[^2]:Steve McConnell, Code Complete (Redmond: Microsoft Press, 2004). 

[^3]:At Google, “readability” does not refer simply to comprehension, but to the set of styles and best practices that allow code to be maintainable to other engineers. See Chapter 3.
[^4]:Some changes to documentation and configurations might not require a code review, but it is often still pref‐
erable to obtain such a review.
[^5]:“Advances in Software Inspection,” IEEE Transactions on Soware Engineering, SE-12(7): 744–751, July 1986.
Granted, this study took place before robust tooling and automated testing had become so important in the
software development process, but the results still seem relevant in the modern software age.
[^6]:Rigby, Peter C. and Christian Bird. 2013. “Convergent software peer review practices.” ESEC/FSE 2013: Pro‐
ceedings of the 2013 9th Joint Meeting on Foundations of Software Engineering, August 2013: 202-212.[https://dl.acm.org/doi/10.1145/2491411.2491444](https://dl.acm.org/doi/10.1145/2491411.2491444).
[^7]:Caitlin Sadowski, Emma Söderberg, Luke Church, Michal Sipko, and Alberto Bacchelli, “[Modern code review: a case study at Google.](https://oreil.ly/m7FnJ)”

[^8]:Ibid