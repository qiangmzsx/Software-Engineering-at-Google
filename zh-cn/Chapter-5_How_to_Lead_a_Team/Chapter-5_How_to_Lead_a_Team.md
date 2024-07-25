
**CHAPTER 5**

# How to Lead a Team

# 第五章 如何领导团队

**Written by Brian Fitzpatrick**

**Edited by Riona MacNamara**

We’ve covered a lot of ground so far on the culture and composition of teams writing software, and in this chapter, we’ll take a look at the person ultimately responsible for making it all work.

到目前为止，我们已经介绍了编写软件团队的文化和组成，在本章中，我们将看看最终负责使所有工作正常进行的人。

No team can function well without a leader, especially at Google, where engineering is almost exclusively a team endeavor. At Google, we recognize two different leadership roles. A *Manager* is a leader of people, whereas a *Tech Lead* leads technology efforts. Although the responsibilities of these two roles require similar planning skills, they require quite different people skills.

没有领导者，任何团队都无法良好运作，尤其是在谷歌，工程几乎完全是团队的努力。在谷歌，我们认识到两种不同的领导者角色。*经理*是人的领导，而*技术负责人*则领导技术工作。虽然这两个角色的职责需要类似的规划技能，但他们需要相当不同的人际交往技能。

A boat without a captain is nothing more than a floating waiting room: unless someone grabs the rudder and starts the engine, it’s just going to drift along aimlessly with the current. A piece of software is just like that boat: if no one pilots it, you’re left with a group of engineers burning up valuable time, just sitting around waiting for something to happen (or worse, still writing code that you don’t need). Although this chapter is about people management and technical leadership, it is still worth a read if you’re an individual contributor because it will likely help you understand your own leaders a bit better.

没有船长的船只不过是一个漂浮的等候室：除非有人抓住方向舵并启动引擎，否则它只会随波逐流。一个软件就像那艘船：如果没有人驾驶它，你会被一群工程师浪费宝贵的时间，只是坐在那里等待一些事情发生（或者更糟糕的是，仍然在编写你不需要的代码）。尽管本章是关于人员管理和技术领导的，但如果你是个人贡献者，则仍值得一读，因为它可能会帮助你更好地了解你是自己的领导。

## Managers and Tech Leads (and Both)  经理和技术负责人（以及两者角色）

Whereas every engineering team generally has a leader, they acquire those leaders in different ways. This is certainly true at Google; sometimes an experienced manager comes in to run a team, and sometimes an individual contributor is promoted into a leadership position (usually of a smaller team).

虽然每个工程团队通常都有一个领导者，但他们以不同的方式获得这些领导者。这在谷歌肯定是一样的；有时是一位经验丰富的经理来管理一个团队，有时是一位因个人贡献被提升为领导职位（通常是一个较小的团队）。

In nascent teams, both roles will sometimes be filled by the same person: a *Tech Lead Manager* (TLM). On larger teams, an experienced people manager will step in to take on the management role while a senior engineer with extensive experience will step into the tech lead role. Even though manager and tech lead each play an important part in the growth and productivity of an engineering team, the people skills required to succeed in each role are wildly different.

在初创团队中，这两个角色有时会由同一个人担任：*技术主管经理*（TLM）。在较大的团队中，有经验的人事经理将介入管理角色，而具有丰富经验的高级工程师将进入技术负责人的角色。尽管经理和技术负责人在工程团队的成长和生产效率方面都发挥着重要作用，但在每个角色中取得成功所需的人际关系技能却大不相同。

### The Engineering Manager  工程经理

Many companies bring in trained people managers who might know little to nothing about software engineering to run their engineering teams. Google decided early on, however, that its software engineering managers should have an engineering background. This meant hiring experienced managers who used to be software engineers, or training software engineers to be managers (more on this later).

许多公司引进了训练有素的人事经理，他们可能对软件工程知之甚少，甚至一无所知来管理工程团队。然而，谷歌很早就决定，其软件工程经理应该有工程背景。这意味着雇用曾经是软件工程师的有经验的经理，或者培训软件工程师成为经理（后面会有更多介绍）。

At the highest level, an engineering manager is responsible for the performance, productivity, and happiness of every person on their team—including their tech lead— while still making sure that the needs of the business are met by the product for which they are responsible. Because the needs of the business and the needs of individual team members don’t always align, this can often place a manager in a difficult position.

在最高层面上，工程经理要对其团队中每个人的绩效、生产效率和幸福感负责——包括他们的技术负责人——同时还要确保他们负责的产品能够满足企业的需求。由于企业的需求和个人团队成员的需求并不总是一致，这往往会使经理处于困境。

### The Tech Lead  技术负责人

The tech lead (TL) of a team—who will often report to the manager of that team—is responsible for (surprise!) the technical aspects of the product, including technology decisions and choices, architecture, priorities, velocity, and general project management (although on larger teams they might have program managers helping out with this). The TL will usually work hand in hand with the engineering manager to ensure that the team is adequately staffed for their product and that engineers are set to work on tasks that best match their skill sets and skill levels. Most TLs are also individual contributors, which often forces them to choose between doing something quickly themselves or delegating it to a team member to do (sometimes) more slowly. The latter is most often the correct decision for the TL as they grow the size and capability of their team.

团队的技术负责人（TL）通常会向该团队的经理汇报，负责产品的技术方面，包括技术决策和选择、架构、优先级、速度和总体项目管理（尽管在较大的团队中，他们可能会有项目经理帮助处理这个问题）。TL通常会与工程经理携手合作，以确保团队有足够的人员来完成他们的产品，并确保工程师被安排在最符合他们技能组合和技能水平的任务上工作。大多数TL也是个人贡献者，这往往迫使他们在自己快速做某事或委托团队成员做（有时）更慢的事之间做出选择。对于TL来说，随着团队规模和能力的增长，后者通常是正确的决策。

### The Tech Lead Manager  技术主管经理

On small and nascent teams for which engineering managers need a strong technical skill set, the default is often to have a TLM: a single person who can handle both the people and technical needs of their team. Sometimes, a TLM is a more senior person, but more often than not, the role is taken on by someone who was, until recently, an individual contributor.

在小型和新生的团队中，工程经理需要强大的技术技能，默认情况下，通常会有一个TLM（技术主管经理）：一个可以同时处理团队的人员和技术需求的人。有时，TLM（技术主管经理）是一个更高级的人，但更多的时候，这个角色是由一个直到最近还是个人贡献者的人承担的。

At Google, it’s customary for larger, well-established teams to have a pair of leaders— one TL and one engineering manager—working together as partners. The theory is that it’s really difficult to do both jobs at the same time (well) without completely burning out, so it’s better to have two specialists crushing each role with dedicated focus.

在谷歌，大型、成熟的团队习惯于有一对领导——一个TL（技术负责人）和一个工程经理——作为伙伴一起工作。理论上说，要同时做这两份工作（好）而又不至于完全精疲力竭，真的很困难，因此最好有两名专家专注于每个角色。

The job of TLM is a tricky one and often requires the TLM to learn how to balance individual work, delegation, and people management. As such, it usually requires a high degree of mentoring and assistance from more experienced TLMs. (In fact, we recommend that in addition to taking a number of classes that Google offers on this subject, a newly minted TLM seek out a senior mentor who can advise them regularly as they grow into the role.)

TLM（技术主管经理）的工作很棘手，通常需要TLM学习如何平衡个人工作、授权和人员管理。因此，它通常需要经验丰富的TLM的深入指导和帮助。（事实上，我们建议新晋的TLM除了学习谷歌提供的一些关于这一主题的课程外，还应该寻找一位资深导师，在他们成长为该角色时定期向他们提供建议。）

-----

#### Case Study: Influencing Without Authority  案例研究：没有权威的影响力

It’s generally accepted that you can get folks who report to you to do the work that you need done for your products, but it’s different when you need to get people outside of your organization—or heck, even outside of your product area sometimes—to do something that you think needs to be done. This “influence without authority” is one of the most powerful leadership traits that you can develop.

人们普遍认为，你可以让向你汇报工作的人为你的产品做你需要做的工作，但当你需要让你的组织以外的人——或者说，有时甚至是你的产品领域以外的人——做你认为需要做的事情时，情况就不同了。这种“没有权威的影响力”是你可以培养的最强大的领导力特质之一。

For example, for years, Jeff Dean, senior engineering fellow and possibly the most well-known Googler *inside* of Google, led only a fraction of Google’s engineering team, but his influence on technical decisions and direction reaches to the ends of the entire engineering organization and beyond (thanks to his writing and speaking outside of the company).

例如，多年来，高级工程研究员杰夫·迪安（Jeff Dean）可能是谷歌内部最知名的Googler，他只领导谷歌工程团队的一小部分，但他对技术决策和方向的影响却达到了整个工程组织的末端，甚至更远（这要归功于他在公司之外的写作和演讲）。

Another example is a team that I started called The Data Liberation Front: with a team of less than a half-dozen engineers, we managed to get more than 50 Google products to export their data through a product that we launched called Google Takeout. At the time, there was no formal directive from the executive level at Google for all products to be a part of Takeout, so how did we get hundreds of engineers to contribute to this effort? By identifying a strategic need for the company, showing how it linked to the mission and existing priorities of the company, and working with a small group of engineers to develop a tool that allowed teams to quickly and easily integrate with Takeout.

另一个例子是我发起的一个名为“数据解放阵线”的团队：一个由不到六名工程师组成的团队，我们成功地让50多个谷歌产品通过我们推出的一款名为“Google Takeout”的产品来输出数据。当时，谷歌的管理层并没有正式指示所有产品都要成为Takeout的一部分，那么我们是如何让数百名工程师为这项工作做出贡献的呢？通过确定公司的战略需求，展示它如何与公司的使命和现有的优先事项相联系，并与一小组工程师合作开发一个工具，使团队能够快速、轻松地与Takeout整合。

-----

## Moving from an Individual Contributor Role to a Leadership Role  从个人贡献者角色转变为领导角色

Whether or not they’re officially appointed, someone needs to get into the driver’s seat if your product is ever going to go anywhere, and if you’re the motivated, impatient type, that person might be you. You might find yourself sucked into helping your team resolve conflicts, make decisions, and coordinate people. It happens all the time, and often by accident. Maybe you never intended to become a “leader,” but somehow it happened anyway. Some people refer to this affliction as “manageritis.”

无论他们是否被正式任命，如果你的产品要发展，就需要有人进入驾驶座，如果你是一个有动力、有影响力的人，那么这个人可能就是你。你可能会发现自己主动去帮助你的团队解决冲突、做出决策和协调人员的行列。这种情况一直在存在，而且往往是偶然发生的。也许你从来没有想过要成为一个 "领导者"，但不知何故，它还是发生了。有些人把这种痛苦称为 "经理病"。

Even if you’ve sworn to yourself that you’ll never become a manager, at some point in your career, you’re likely to find yourself in a leadership position, especially if you’ve been successful in your role. The rest of this chapter is intended to help you understand what to do when this happens.

即便你向自己发誓你永远不会成为一名管理者，在你职业生涯的某个阶段，你很可能会发现自己处于领导位置，特别是如果你在自己的角色上取得了成功。本章的其余部分旨在帮助你理解当这种情况发生时该怎么做。

We’re not here to attempt to convince you to become a manager, but rather to help show why the best leaders work to serve their team using the principles of humility, respect, and trust. Understanding the ins and outs of leadership is a vital skill for influencing the direction of your work. If you want to steer the boat for your project and not just go along for the ride, you need to know how to navigate, or you’ll run yourself (and your project) onto a sandbar.

我们来这里不是为了说服你成为一名管理者，而是为了帮助你展示为什么最好的领导者会以谦逊、尊重和信任的原则为团队服务。了解领导力的来龙去脉是影响你工作方向的重要技能。如果你想为你的项目掌舵，而不是随波逐流，你需要知道如何导航，否则你会把自己（和你的项目）撞上沙滩。

### The Only Thing to Fear Is…Well, Everything  唯一害怕的是…嗯，所有的事

Aside from the general sense of malaise that most people feel when they hear the word “manager,” there are a number of reasons that most people don’t want to become managers. The biggest reason you’ll hear in the software development world is that you spend much less time writing code. This is true whether you become a TL or an engineering manager, and I’ll talk more about this later in the chapter, but first, let’s cover some more reasons why most of us avoid becoming managers.

除了大多数人听到“经理”这个词时普遍感到的不安之外，大多数人不想成为经理的原因有很多。在软件开发领域，你会听到的最大的原因是你花在编写代码上的时间要少得多。无论你是成为TL还是工程经理，这都是事实，我将在本章后面更多地讨论这一点，但首先，让我们讨论一下更多的原因，为什么我们大多数人都逃避成为经理。

If you’ve spent the majority of your career writing code, you typically end a day with something you can point to—whether it’s code, a design document, or a pile of bugs you just closed—and say, “That’s what I did today.” But at the end of a busy day of “management,” you’ll usually find yourself thinking, “I didn’t do a damned thing today.” It’s the equivalent of spending years counting the number of apples you picked each day and changing to a job growing bananas, only to say to yourself at the end of each day, “I didn’t pick any apples,” happily ignoring the flourishing banana trees sitting next to you. Quantifying management work is more difficult than counting widgets you turned out, but just making it possible for your team to be happy and productive is a big measure of your job. Just don’t fall into the trap of counting apples when you’re growing bananas.[^1]

如果你的职业生涯大部分时间都在写代码，你通常会在结束一天的工作时，指着一些东西——无论是代码、设计文档，还是你刚刚关闭的一堆bug——说："这就是我今天做的事情。" 但在忙碌的 "管理 "一天结束时，你通常会发现自己在想，"我今天一件该死的事也没做"。这相当于花上几年的时间数数你每天摘的苹果的数量，然后换了份种植香蕉的工作，每天结束时都对自己说，“我没有摘苹果”，忽略了你身旁茂盛的香蕉树。量化管理工作比计算你生产的小组件要困难得多，但让你的团队能够快乐且高效是你工作的一个重要指标。只是在你种植香蕉时不要落入数苹果的陷阱。

Another big reason for not becoming a manager is often unspoken but rooted in the famous “Peter Principle,” which states that “In a hierarchy every employee tends to rise to his level of incompetence.” Google generally avoids this by requiring that a person perform the job *above* their current level for a period of time (i.e., to “exceeds expectations” at their current level) before being promoted to that level. Most people have had a manager who was incapable of doing their job or was just really bad at managing people,[^2] and we know some people who have worked only for bad managers. If you’ve been exposed only to crappy managers for your entire career, why would you *ever* want to be a manager? Why would you want to be promoted to a role that you don’t feel able to do?

不成为经理的另一个重要原因往往是不言而喻的，但却源于著名的 "彼得原理"，即 "在等级制度中，每个职工趋向于上升到他所不能胜任的职位"。谷歌通常通过要求一个人在晋升到该级别之前，必须在其目前的级别上完成高于当前水平的工作一段时间（即达到 "超出预期 "的目前级别）来避免这种情况。大多数人都有过一个不能胜任工作的经理，或者只是非常不善于管理人，而我们知道有些人只为糟糕的经理工作。如果你在整个职业生涯中只接触过糟糕的经理，你为什么**想成为一名经理**？你为什么要被提拔到一个你觉得无法胜任的角色？

> 彼得原理推导：每一个职位最终都将被一个不能胜任其工作的职工所占据。层级组织的工作任务多半是由尚未达到胜任阶层的员工完成的。

There are, however, great reasons to consider becoming a TL or manager. First, it’s a way to scale yourself. Even if you’re great at writing code, there’s still an upper limit to the amount of code you can write. Imagine how much code a team of great engineers could write under your leadership! Second, you might just be really good at it—many people who find themselves sucked into the leadership vacuum of a project discover that they’re exceptionally skilled at providing the kind of guidance, help, and air cover a team or a company needs. Someone has to lead, so why not you?

然而，有很好的理由考虑成为一名TL或经理。首先，这是一种扩展自己的方式。即使你很擅长写代码，你能写的代码量还是有上限的。想象一下，在你的领导下，一个由优秀工程师组成的团队可以写多少代码？第二，你可能真的很擅长写代码——许多人发现自己被吸进了项目的领导真空中，发现自己在提供团队或公司所需的指导、帮助和故障处理方面非常熟练。总得有人来领导，那么为什么不是你呢？

> [^1]:	Another difference that takes getting used to is that the things we do as managers typically pay off over a longer timeline.
>
> 1 另一个需要适应的差异是，我们作为管理者所做的事情通常会在更长的时间后才得到回报。
> 
> [^2]:	Yet another reason companies shouldn’t force people into management as part of a career path: if an engineer is able to write reams of great code and has no desire at all to manage people or lead a team, by forcing them into a management or TL role, you’re losing a great engineer and gaining a crappy manager. This is not only a bad idea, but it’s actively harmful.
>
> 2 然而，另一个原因是，公司不应该强迫人们把管理作为职业道路的一部分：如果一个工程师能够写出大量的优秀代码，却完全没有管理人或领导团队的愿望，强迫他们进入管理层或TL的角色，你就会失去一个伟大的工程师，得到一个糟糕的经理。这不仅是一个糟糕的主意，而且是积极有害的方式。

### Servant Leadership  服务型领导

There seems to be a sort of disease that strikes managers in which they forget about all the awful things their managers did to them and suddenly begin doing these same things to “manage” the people that report to them. The symptoms of this disease include, but are by no means limited to, micromanaging, ignoring low performers, and hiring pushovers. Without prompt treatment, this disease can kill an entire team. The best advice I received when I first became a manager at Google was from Steve Vinter, an engineering director at the time. He said, “Above all, resist the urge to manage.” One of the greatest urges of the newly minted manager is to actively “manage” their employees because that’s what a manager does, right? This typically has disastrous consequences.

似乎有一种疾病袭扰了经理们，他们忘记了他们的经理对他们所做的所有可怕的事情，突然开始做同样的事情来 "管理 "向他们汇报的人。这种疾病的症状包括，但不限于，微观管理（事必躬亲），忽视低绩效员工，以及使用推卸责任者。如果不及时治疗，这种疾病可以杀死整个团队。当我第一次在谷歌成为经理时，我得到的最好的建议是来自当时的工程总监史蒂夫·温特。他说："首先，要抵制管人的冲动"。新上任的经理人最大的冲动之一就是积极 "管理 "他们的员工，因为这就是经理的工作，对吗？这通常会带来灾难性的后果。

The cure for the “management” disease is a liberal application of “servant leadership,” which is a nice way of saying the most important thing you can do as a leader is to serve your team, much like a butler or majordomo tends to the health and well-being of a household. As a servant leader, you should strive to create an atmosphere of humility, respect, and trust. This might mean removing bureaucratic obstacles that a team member can’t remove by themselves, helping a team achieve consensus, or even buying dinner for the team when they’re working late at the office. The servant leader fills in the cracks to smooth the way for their team and advises them when necessary, but still isn’t afraid of getting their hands dirty. The only managing that a servant leader does is to manage both the technical and social health of the team; as tempting  as it might be to focus on purely the technical health of the team, the social health of the team is just as important (but often infinitely more difficult to manage).

“管理”疾病的治疗方法是“服务型领导”的自由运用这是一个很好的做法，作为一个领导者，你能做的最重要的事情就是为你的团队服务，就像一个管家或大管家关心一个家庭的健康和福祉一样。作为一个服务型领导者，你应该努力营造一种谦逊、尊重和信任的氛围。这可能意味着消除团队成员自己无法消除的官僚主义障碍，帮助团队达成共识，甚至在团队在办公室工作到很晚的时候为他们买晚餐。服务型领导会填补缝隙，为他们的团队铺平道路，必要时为他们提供建议，但仍然不怕弄脏自己的手。服务型领导所做的唯一管理就是管理团队的技术和社会健康；尽管单纯关注团队的技术健康可能很诱人，但团队的氛围健康也同样重要（但往往更难管理）。

## The Engineering Manager 工程经理

So, what is actually expected of a manager at a modern software company? Before the computing age, “management” and “labor” might have taken on almost antagonistic roles, with the manager wielding all of the power and labor requiring collective action to achieve its own ends. But that isn’t how modern software companies work.

那么，在现代软件公司中，对经理的实际期望是什么？在计算机时代之前，"管理 "和 "劳动 "可能承担着几乎是对立的角色，管理者掌握着所有的权力，而劳动者则需要集体行动来实现自己的目的。但这并不是现代软件公司的工作方式。

### Manager Is a Four-Letter Word  经理是一个四个字母的单词

Before talking about the core responsibilities of an engineering manager at Google, let’s review the history of managers. The present-day concept of the pointy-haired manager is partially a carryover, first from military hierarchy and later adopted by the Industrial Revolution—more than a hundred years ago! Factories began popping up everywhere, and they required (usually unskilled) workers to keep the machines going. Consequently, these workers required supervisors to manage them, and because it was easy to replace these workers with other people who were desperate for a job, the managers had little motivation to treat their employees well or improve conditions for them. Whether humane or not, this method worked well for many years when the employees had nothing more to do than perform rote tasks.

在谈论谷歌工程经理的核心职责之前，让我们回顾一下经理的历史。当前的顶尖经理的概念部分是延续下来的，首先是来自军队的等级制度，后来被工业革命所采用——一百多年前！工厂开始到处涌现，他们需要（通常是不熟练的）工人来维持机器运转。因此，这些工人需要主管人员来管理他们，由于很容易用其他急于找工作的人取代这些工人，主管人员没有什么动力来善待他们的雇员或改善他们的条件。无论人道与否，这种方法在许多年里都很有效，当时员工除了完成死记硬背的任务外没有其他事情可做。

Managers frequently treated employees in the same way that cart drivers would treat their mules: they motivated them by alternately leading them forward with a carrot, and, when that didn’t work, whipping them with a stick. This carrot-and-stick method of management survived the transition from the factory[^3] to the modern office, where the stereotype of the tough-as-nails manager-as-mule-driver flourished in the middle part of the twentieth century when employees would work at the same job for years and years.

经理们经常用赶车人对待骡子的方式来对待员工：他们用胡萝卜来激励他们，当胡萝卜不起作用的时候，就用棍子来鞭打他们。这种胡萝卜加大棒的管理方法在从工厂过渡到现代办公室的过渡中幸存下来，在二十世纪中叶，当员工在同一工作岗位上工作多年后，强硬的经理人作为骡子赶车人的刻板印象在办公室里盛行。

This continues today in some industries—even in industries that require creative thinking and problem solving—despite numerous studies suggesting that the anachronistic carrot and stick is ineffective and harmful to the productivity of creative people. Whereas the assembly-line worker of years past could be trained in days and replaced at will, software engineers working on large codebases can take months to get up to speed on a new team. Unlike the replaceable assembly-line worker, these people need nurturing, time, and space to think and create.

尽管许多研究表明，不合时宜的胡萝卜和大棒是无效的，而且对有创造力的人的生产效率有害，但这种情况当前在一些行业仍然存在——甚至在那些需要创造力思维和解决问题的行业。过去几年的装配线工人可以在几天内接受培训并被随意替换，而从事大型代码库工作的软件工程师可能需要几个月的时间才能在一个新的团队中适应。与可替换的装配线工人不同，这些人需要培养、时间和空间来思考和创造。


> [^3]:	For more fascinating information on optimizing the movements of factory workers, read up on Scientific Management or Taylorism, especially its effects on worker morale./
> 3   有关优化工厂工人流动的更多有趣信息，请阅读科学管理或泰勒主义，尤其是其对工人士气的影响。


### Today’s Engineering Manager  当今的工程经理

Most people still use the title “manager” despite the fact that it’s often an anachronism. The title itself often encourages new managers to *manage* their reports. Managers can wind up acting like parents,[^4] and consequently employees react like children. To frame this in the context of humility, respect, and trust: if a manager makes it obvious that they trust their employee, the employee feels positive pressure to live up to that trust. It’s that simple. A good manager forges the way for a team, looking out for their safety and well-being, all while making sure their needs are met. If there’s one thing you remember from this chapter, make it this:
    Traditional managers worry about how to get things done, whereas great managers worry about what things get done (and trust their team to figure out how to do it).

大多数人仍然使用 "经理 "这个头衔，尽管它往往是一个不合时宜的头衔。这个头衔本身经常鼓励新经理撰写报告。经理们可能会表现得像父母一样，因此员工的反应也像孩子。从谦逊、尊重和信任的角度来看：如果经理明显地表示他们信任员工，那么员工就会感到有积极的压力，不辜负这种信任。就是这么简单。好的经理为团队开辟道路，关注他们的安全和福祉，同时确保他们的需求得到满足。如果你在本章中记住了一件事，那就是这个：
    传统的经理担心的是如何把事情做好，而优秀的经理担心的是把什么事情做好（并相信他们的团队能想出办法来）。

A new engineer, Jerry, joined my team a few years ago. Jerry’s last manager (at a different company) was adamant that he be at his desk from 9:00 to 5:00 every day, and assumed that if he wasn’t there, he wasn’t working enough (which is, of course, a ridiculous assumption). On his first day working with me, Jerry came to me at 4:40p.m. and stammered out an apology that he had to leave 15 minutes early because he had an appointment that he had been unable to reschedule. I looked at him, smiled, and told him flat out, “Look, as long as you get your job done, I don’t care what time you leave the office.” Jerry stared blankly at me for a few seconds, nodded, and went on his way. I treated Jerry like an adult; he always got his work done, and I never had to worry about him being at his desk, because he didn’t need a babysitter to get his work done. If your employees are so uninterested in their job that they actually need traditional-manager babysitting to be convinced to work, *that* is your real problem.

几年前，一位名叫杰瑞的工程师新加入了我的团队。杰瑞的上一任经理（在另一家公司）坚决要求他每天从早上9点到下午5点都在办公桌前，并认为如果他不在那里，就说明他工作得不够努力（当然，这是一个可笑的假设）。在他和我一起工作的第一天，杰瑞在下午4点40分来找我，结结巴巴地道歉，说他不得不提前15分钟离开，因为他有一个约会，但他没法重新安排。我看着他，笑了笑，直截了当地告诉他："听着，只要你完成了你的工作，我不在乎你什么时候离开办公室。" 杰瑞茫然地盯着我看了几秒钟，点了点头，然后上路了。我对待杰瑞就像对待成年人一样，他总是能完成工作，我从来没有担心过他是否在办公桌前，因为他不需要保姆一样的来完成工作。如果你的员工对他们的工作如此不感兴趣，以至于他们实际上需要传统的经理保姆式来监督他们工作，这才是你真正的问题。

> [^4]: If you have kids, the odds are good that you can remember with startling clarity the first time you said something to your child that made you stop and exclaim (perhaps even aloud), “Holy crap, I’ve become my mother.”
>
> 4 如果你有孩子，你很有可能清楚地记得你第一次对你的孩子说了什么，让你停下来并感叹（也许甚至是大声地感叹）："我的妈呀，我已经变成我的母亲了。"
-----

#### Failure Is an Option  失败也是一种选择

Another way to catalyze your team is to make them feel safe and secure so that they can take greater risks by building psychological safety—meaning that your team members feel like they can be themselves without fear of negative repercussions from you or their team members. Risk is a fascinating thing; most humans are terrible at evaluating risk, and most companies try to avoid risk at all costs. As a result, the usual modus operandi is to work conservatively and focus on smaller successes, even when taking a bigger risk might mean exponentially greater success. A common saying at Google is that if you try to achieve an impossible goal, there’s a good chance you’ll fail, but if you fail trying to achieve the impossible, you’ll most likely accomplish far more than you would have accomplished had you merely attempted something you knew you could complete. A good way to build a culture in which risk taking is accepted is to let your team know that it’s OK to fail.

催化你的团队的另一个方法是让他们感到安全和有保障，这样他们就可以通过建立心理安全来承担更大的风险——也就是说，你的团队成员觉得他们可以做自己，而不用担心来自你或团队成员的负面反馈。风险是一个令人着迷的东西；大多数人在评估风险方面是很糟糕的，而且大多数公司试图不惜一切代价避免风险。因此，通常的工作方式是保守地工作，专注于较小的成功，即使承担较大的风险可能意味着成倍的成功。在谷歌，有一句话是这样说的：如果你试图实现一个不可能的目标，你很有可能会失败，但如果你试图实现不可能的目标而失败，你的成就很可能会远远超过你仅仅尝试你知道你可以完成的事情所取得的成就。建立一个接受风险的文化的好方法是让你的团队知道，失败是允许的。

So, let’s get that out of the way: it’s OK to fail. In fact, we like to think of failure as a way of learning a lot really quickly (provided that you’re not repeatedly failing at the same thing). In addition, it’s important to see failure as an opportunity to learn and not to point fingers or assign blame. Failing fast is good because there’s not a lot at stake. Failing slowly can also teach a valuable lesson, but it is more painful because more is at risk and more can be lost (usually engineering time). Failing in a manner that affects customers is probably the least desirable failure that we encounter, but it’s also one in which we have the greatest amount of structure in place to learn from failures. As mentioned earlier, every time there is a major production failure at Google, we perform a postmortem. This procedure is a way to document the events that led to the actual failure and to develop a series of steps that will prevent it from happening in the future. This is neither an opportunity to point fingers, nor is it intended to introduce unnecessary bureaucratic checks; rather, the goal is to strongly focus on the core of the problem and fix it once and for all. It’s very difficult, but quite effective (and cathartic).

所以，让我们先把话说清楚：失败是允许的。事实上，我们喜欢把失败看作是一种快速学习的方式（只要你不是在同一件事上反复犯错）。此外，重要的是把失败看作是一个学习的机会，而不是指责或推责。快速失败是好的，因为没有太多的风险。缓慢的失败也能给人以宝贵的教训，但它更痛苦，因为风险更大，可能损失更多（通常是工程时间）。以影响客户的方式失败可能是我们遇到的最不可取的失败，但这也是我们从失败中学习的最大方式。如前所述，每次谷歌出现重大生产故障时，我们都会进行事后分析。这一过程是记录失败的一种方式导致实际失败的事件，并制定一系列措施防止未来发生。这既不是一个指责的机会，也不是为了引入不必要的官僚检查；相反，目标是强烈关注问题的核心，并一劳永逸地解决它。这非常困难，但相当有效（和宣泄）。

Individual successes and failures are a bit different. It’s one thing to laud individual successes, but looking to assign individual blame in the case of failure is a great way to divide a team and discourage risk taking across the board. It’s alright to fail, but fail as a team and learn from your failures. If an individual succeeds, praise them in front of the team. If an individual fails, give constructive criticism in private.[^5] Whatever the case, take advantage of the opportunity and apply a liberal helping of humility, respect, and trust to help your team learn from its failures.

个人的成功和失败是有点不同的。赞扬个人的成功是一回事，但在失败的情况下寻找个人的责任是分裂团队的方式，并阻碍整个团队的风险承担。失败是正常的，但作为一个团队，要从失败中学习。如果一个人成功了，在团队面前表扬他们。如果一个人失败了，私下给予建设性的指导。无论是什么情况，都要利用这个机会，运用谦逊、尊重和信任的慷慨帮助，帮助你的团队从失败中吸取教训。

------

> [^5]: Public criticism of an individual is not only ineffective (it puts people on the defense), but rarely necessary, and most often is just mean or cruel. You can be sure the rest of the team already knows when an individual has failed, so there’s no need to rub it in.  
>
> 5 对一个人的公开批评不仅没有效果（它使人们处于防御状态），而且很少有必要，大多数时候只是刻薄或残酷。你可以肯定，团队的其他成员已经知道一个人什么时候失败了，所以没有必要重复。

## Antipatterns  反模式

Before we go over a litany of “design patterns” for successful TLs and engineering managers, we’re going to review a collection of the patterns that you *don’t* want to follow if you want to be a successful manager. We’ve observed these destructive patterns in a handful of bad managers that we’ve encountered in our careers, and in more than a few cases, ourselves.

在我们讨论一系列成功的TL和工程经理的 "设计模式 "之前，我们要回顾一下，如果你想成为一个成功的经理，你*不能*遵循的模式。我们已经在我们职业生涯中遇到的一些糟糕经理身上观察到了这些破坏性的模式，而我们自己也遇到过不少这样的情况。

### Antipattern: Hire Pushovers   反模式：雇佣推手

If you’re a manager and you’re feeling insecure in your role (for whatever reason), one way to make sure no one questions your authority or threatens your job is to hire people you can push around. You can achieve this by hiring people who aren’t as smart or ambitious as you are, or just people who are more insecure than you. Even though this will cement your position as the team leader and decision maker, it will mean a lot more work for you. Your team won’t be able to make a move without you leading them like dogs on a leash. If you build a team of pushovers, you probably can’t take a vacation; the moment you leave the room, productivity comes to a screeching halt. But surely this is a small price to pay for feeling secure in your job, right?

如果你是一名经理，而且你对自己的角色感到没安全感（无论什么原因），确保没有人质疑你的权威或威胁你的工作的一个方法是雇佣你可以推波助澜的人。你可以通过雇佣不如你聪明或有野心的人，或者只是比你更没有安全感的人，来实现这一目标。尽管这将巩固你作为团队领导者和决策者的地位，但这将意味着你的工作会更多。如果你不像牵着狗一样牵着他们，你的团队就无法行动。如果你建立了一个由推手组成的团队，你可能就不能休假了；你离开房间的那一刻，工作效率就急剧下降。但是，这肯定是为你的工作安全感付出的一个小代价，对吗？

Instead, you should strive to hire people who are smarter than you and can replace you. This can be difficult because these very same people will challenge you on a regular basis (in addition to letting you know when you make a mistake). These very same people will also consistently impress you and make great things happen. They’ll be able to direct themselves to a much greater extent, and some will be eager to lead the team, as well. You shouldn’t see this as an attempt to usurp your power; instead, look at it as an opportunity for you to lead an additional team, investigate new opportunities, or even take a vacation without worrying about checking in on the team every day to make sure it’s getting its work done. It’s also a great chance to learn and grow—it’s a lot easier to expand your expertise when surrounded by people who are smarter than you.

相反，你应该努力雇用比你更聪明的人，并能取代你。这可能很困难，因为这些人也会定期挑战你（除了在你犯错时只有你自己知道）。这些人也会不断地给你留下深刻印象，并让伟大的事情出现。他们将能够在更大程度上指导自己，有些人也会渴望领导团队。你不应该把这看作是企图篡夺你的权力；相反，你应该把它看作是一个机会，让你领导一个额外的团队，找到新的机会，甚至休假，而不必担心每天都要检查团队，确保它完成工作。这也是一个学习和成长的好机会——当周围有比你更聪明的人时，拓展你的专业知识会容易得多。

### Antipattern: Ignore Low Performers  反模式：忽略低绩效员工

Early in my career as a manager at Google, the time came for me to hand out bonus letters to my team, and I grinned as I told my manager, “I love being a manager!” Without missing a beat, my manager, a long-time industry veteran, replied, “Sometimes you get to be the tooth fairy, other times you have to be the dentist.”

在我在谷歌担任经理的早期，到了给我的团队发奖金信的时候，我咧嘴笑着对我的经理说："我喜欢当经理！" 我的经理是一位长期的行业老手，他不慌不忙地回答说："有时你可以做牙仙，有时你必须做牙医。"

It’s never any fun to pull teeth. We’ve seen team leaders do all the right things to build incredibly strong teams only to have these teams fail to excel (and eventually fall apart) because of just one or two low performers. We understand that the human aspect is the most challenging part of writing software, but the most difficult part of dealing with humans is handling someone who isn’t meeting expectations. Sometimes, people miss expectations because they’re not working long enough or hard enough, but the most difficult cases are when someone just isn’t capable of doing their job no matter how long or hard they work.

拔牙从来不是什么有趣的事情。我们看到团队领导做了所有正确的事情，建立了令人难以置信的强大团队，但这些团队却因为一两个表现不佳的人而无法脱颖而出（并最终分崩离析）。我们知道，有些人在编写软件最具挑战性的部分是出色的，但与人打交道最困难的部分是处理没有达到预期的效果。有时，人们达不到预期是因为他们工作的时间不够长或不够努力，但最困难的情况是有人无论工作多长时间或多努力，就是没有能力完成他们的工作。

Google’s Site Reliability Engineering (SRE) team has a motto: “Hope is not a strategy.” And nowhere is hope more overused as a strategy than in dealing with a low performer. Most team leaders grit their teeth, avert their eyes, and just *hope* that the low performer either magically improves or just goes away. Yet it is extremely rare that this person does either.

谷歌的网站可靠性工程（SRE）团队有一个座右铭："希望不是一种策略"。而希望作为一种策略被过度使用的情况，莫过于在处理低绩效员工时。大多数团队领导咬紧牙关，转移视线，只是*希望*低绩效员工要么神奇地改善，要么就消失。然而，这种情况极少发生。

While the leader is hoping and the low performer isn’t improving (or leaving), high performers on the team waste valuable time pulling the low performer along, and team morale leaks away into the ether. You can be sure that the team knows the low performer is there even if you’re ignoring them—in fact, the team is *acutely* aware of who the low performers are, because they have to carry them.

当领导抱着希望，而低绩效者没有进步（或离开）的时候，团队中高绩效者就会浪费宝贵的时间来拉拢低绩效员工，而团队就会泄气。你可以肯定的是，即使你对他们忽视，团队也知道低绩效员工的存在——事实上，团队非常清楚谁是低绩效员工，因为他们必须要带着他们。

Ignoring low performers is not only a way to keep new high performers from joining your team, but it’s also a way to encourage existing high performers to leave. You eventually wind up with an entire team of low performers because they’re the only ones who can’t leave of their own volition. Lastly, you aren’t even doing the low performer any favors by keeping them on the team; often, someone who wouldn’t do well on your team could actually have plenty of impact somewhere else.

忽视低绩效员工不仅会阻碍新的高绩效员工加入你的团队，而且也会鼓励现有的高绩效员工离开。你最终会发现整个团队都是低绩效员工，因为他们是唯一不能主动离开的人。最后，你把低绩效员工留在团队中，甚至对他们没有任何好处；通常情况下，一个在你的团队中做得不好的人，实际上可以在其他地方产生很大的影响。

The benefit of dealing with a low performer as quickly as possible is that you can put yourself in the position of helping them up or out. If you immediately deal with a low performer, you’ll often find that they merely need some encouragement or direction to slip into a higher state of productivity. If you wait too long to deal with a low performer, their relationship with the team is going to be so sour and you’re going to be so frustrated that you’re not going to be able to help them.

尽快处理低绩效员工的好处是，你可以把自己放在帮助他们提升或退出的位置上。如果你立即处理一个低绩效员工，你往往会发现他们只需要一些鼓励或指导就能走向更高的生产效率状态。如果你等待很长时间再来处理低绩效员工，他们与团队的关系就会变得非常糟糕，你也会感到非常沮丧，以至于你无法帮助他们。

How do you effectively coach a low performer? The best analogy is to imagine that you’re helping a limping person learn to walk again, then jog, then run alongside the rest of the team. It almost always requires temporary micromanagement, but still a whole lot of humility, respect, and trust—particularly respect. Set up a specific time frame (say, two months) and some very specific goals you expect them to achieve in that period. Make the goals small, incremental, and measurable so that there’s an opportunity for lots of small successes. Meet with the team member every week to check on progress, and be sure you set really explicit expectations around each upcoming milestone so that it’s easy to measure success or failure. If the low performer can’t keep up, it will become quite obvious to both of you early in the process. At this point, the person will often acknowledge that things aren’t going well and decide to quit; in other cases, determination will kick in and they’ll “up their game” to meet expectations. Either way, by working directly with the low performer, you’re catalyzing important and necessary changes.

你如何有效地指导低绩效员工？最好的比喻是想象你在帮助一个跛脚的人重新学会走路，然后慢跑，然后和团队的其他成员一起跑步。这几乎总是需要暂时的微观管理，但仍然需要大量的谦逊、尊重和信任——特别是尊重。设定一个具体的时间框架（例如，两个月）和一些非常具体的目标，你希望他们在这段时间内实现。把目标定得小一点，渐进一点，可衡量一点，这样就有机会取得很多小的成功。每周与团队成员见面，检查进展情况，并确保你对每个即将到来的里程碑设定了非常明确的期望，这样就很容易衡量成功或失败。如果表现不佳的人跟不上，那么在这个过程的早期，你们两个人都会很清楚。在这一点上，这个人通常会承认事情进展不顺利，并决定退出；在其他情况下，决心会启动，他们会 "提高自己的水平"，以满足期望。无论是哪种情况，通过直接与低绩效员工合作，你都会促成重要而必要的改变。

### Antipattern: Ignore Human Issues  反模式：忽视人性的问题

A manager has two major areas of focus for their team: the social and the technical. It’s rather common for managers to be stronger in the technical side at Google, and because most managers are promoted from a technical job (for which the primary goal of their job was to solve technical problems), they can tend to ignore human issues. It’s tempting to focus all of your energy on the technical side of your team because, as an individual contributor, you spend the vast majority of your time solving technical problems. When you were a student, your classes were all about learning the technical ins and outs of your work. Now that you’re a manager, however, you ignore the human element of your team at your own peril.

经理对他们的团队有两个主要的关注领域：社会和技术。在谷歌，经理在技术方面比较强大是比较常见的，因为大多数经理都是从技术工作中晋升的（对他们来说，工作的主要目标是解决技术问题），他们可能倾向于忽视人性问题。把所有的精力都集中在团队的技术方面是很诱人的，因为作为个人贡献者，你的绝大部分时间都在解决技术问题。当你还是个学生的时候，你的课程都是关于学习工作的技术内涵和外延。然而，现在你是一名经理，你忽视了团队中的人性因素，这将是你自己的危险。

Let’s begin with an example of a leader ignoring the human element in his team. Years ago, Jake had his first child. Jake and Katie had worked together for years, both remotely and in the same office, so in the weeks following the arrival of the new baby, Jake worked from home. This worked out great for the couple, and Katie was totally fine with it because she was already used to working remotely with Jake. They were their usual productive selves until their manager, Pablo (who worked in a different office), found out that Jake was working from home for most of the week. Pablo was upset that Jake wasn’t going into the office to work with Katie, despite the fact that Jake was just as productive as always and that Katie was fine with the situation. Jake attempted to explain to Pablo that he was just as productive as he would be if he came into the office and that it was much easier on him and his wife for him to mostly work from home for a few weeks. Pablo’s response: “Dude, people have kids all the time. You need to go into the office.” Needless to say, Jake (normally a mild-mannered engineer) was enraged and lost a lot of respect for Pablo.

让我们从一个领导忽视其团队中人性的因素的例子开始。几年前，杰克有了他的第一个孩子。杰克和凯蒂在一起工作了好几年，无论是远程工作还是在同一个办公室，所以在新生婴儿出生后的几周里，杰克在家工作。这对这对夫妇来说是很好的，凯蒂也完全同意，因为她已经习惯了与杰克一起远程工作。他们像往常一样富有成效，直到他们的经理帕布罗（在另一个办公室工作）发现杰克这周大部分时间都在家里工作。帕布罗对杰克不到办公室和凯蒂一起工作感到很不高兴，尽管事实上杰克和以前一样富有成效，而且凯蒂对这种情况也感到满意。杰克试图向帕布罗解释说，如果他进办公室的话，他的工作效率也是一样的，而且这几个星期他大部分时间都在家里工作，对他和他的妻子来说要容易得多。帕布罗的回答是。"伙计，人们总是有孩子。你需要到办公室去。" 不用说，杰克（通常是一个温和的工程师）被激怒了，对帕布罗失去了以往很多尊重。

There are numerous ways in which Pablo could have handled this differently: he could have showed some understanding that Jake wanted to spend more time at home with his wife and, if his productivity and team weren’t being affected, just let him continue to do so for a while. He could have negotiated that Jake go into the office for one or two days a week until things settled down. Regardless of the end result, a little bit of empathy would have gone a long way toward keeping Jake happy in this situation.

帕布罗有许多方法可以以不同的方式处理这件事：他可以对杰克想花更多时间在家里陪他的妻子表示一些理解，如果他的工作效率和团队没有受到影响，就让他继续保持一段时间。他可以协商让杰克每周到办公室工作一到两天，直到事情解决为止。无论最终结果如何，在这种情况下，一点点同理心将大大有助于让杰克保持快乐。

### Antipattern: Be Everyone’s Friend  反模式：试图成为每个人的朋友

The first foray that most people have into leadership of any sort is when they become the manager or TL of a team of which they were formerly members. Many leads don’t want to lose the friendships they’ve cultivated with their teams, so they will sometimes work extra hard to maintain friendships with their team members after becoming a team lead. This can be a recipe for disaster and for a lot of broken friendships. Don’t confuse friendship with leading with a soft touch: when you hold power over someone’s career, they might feel pressure to artificially reciprocate gestures of friendship.

大多数人第一次进入任何类型的领导层是当他们成为团队的经理或TL时，他们以前是团队的成员。许多领导不想失去他们与团队培养起来的友谊，所以他们有时会在成为团队领导后特别努力地维持与团队成员的友谊。这可能会导致灾难，也可能导致许多友谊破裂。不要把友谊和温柔的领导混为一谈：当你掌握了某人职业生涯的权力时，他们可能会感到压力，需要收敛地回应友谊的姿态。

Remember that you can lead a team and build consensus without being a close friend of your team (or a monumental hard-ass). Likewise, you can be a tough leader without tossing your existing friendships to the wind. We’ve found that having lunch with your team can be an effective way to stay socially connected to them without making them uncomfortable—this gives you a chance to have informal conversations outside the normal work environment.

请记住，你可以领导一个团队并建立共识，而不需要成为你团队的亲密朋友（或一个不折不扣的硬汉）。同样，你也可以成为一个强硬的领导者，而不把你现有的友谊扔到九霄云外。我们发现，与你的团队共进午餐是一种有效的方式，既能与他们保持社交联系，又不会让他们感到不舒服——这让你有机会在正常工作环境之外进行非正式的对话。

Sometimes, it can be tricky to move into a management role over someone who has been a good friend and a peer. If the friend who is being managed is not self- managing and is not a hard worker, it can be stressful for everyone. We recommend that you avoid getting into this situation whenever possible, but if you can’t, pay extra attention to your relationship with those folks.

有时，在一个曾经是好朋友和同龄人的人身上担任管理职务可能会很棘手。如果被管理的朋友不具备自我管理的能力，也不是一个努力工作的人，那么对每个人来说都会有压力。我们建议你尽可能避免陷入这种情况，但如果你不能，就要特别注意你与这些人的关系。

### Antipattern: Compromise the Hiring Bar  反模式：降低招聘标准

Steve Jobs once said: “A people hire other A people; B people hire C people.” It’s incredibly easy to fall victim to this adage, and even more so when you’re trying to hire quickly. A common approach I’ve seen outside of Google is that a team needs to hire 5 engineers, so it sifts through a pile of applications, interviews 40 or 50 people, and picks the best 5 candidates regardless of whether they meet the hiring bar.

史蒂夫·乔布斯曾经说过。"A类人雇用其他A类人；B类人雇用C类人。" 这句格言很容易让你成为牺牲品，尤其是当你试图快速雇佣的时候。我在谷歌之外看到的一个常见的方法是，一个团队需要招聘5名工程师，所以它筛选了一堆申请，面试了40或50人，并挑选了最好的5名候选人，不管他们是否符合招聘标准。

This is one of the fastest ways to build a mediocre team.

这是建立一个平庸团队的最快方式之一。

The cost of finding the appropriate person—whether by paying recruiters, paying for advertising, or pounding the pavement for references—pales in comparison to the cost of dealing with an employee who you never should have hired in the first place. This “cost” manifests itself in lost team productivity, team stress, time spent managing the employee up or out, and the paperwork and stress involved in firing the employee. That’s assuming, of course, that you try to avoid the monumental cost of just leaving them on the team. If you’re managing a team for which you don’t have a say over hiring and you’re unhappy with the hires being made for your team, you need to fight tooth and nail for higher-quality engineers. If you’re still handed substandard engineers, maybe it’s time to look for another job. Without the raw materials for a great team, you’re doomed.

找到合适人选的成本——无论是通过支付招聘人员费用、支付广告费用，还是为推荐人做铺垫——与处理一个你一开始就不应该雇用的员工的成本相比，都显得微不足道。这种 "成本 "体现在团队生产效率的损失、团队压力、管理员工的时间以及解雇员工所涉及的文书工作和压力上。当然，这是假设你试图避免让他们留在团队中的巨大成本。如果你管理的团队在招聘方面没有发言权，而且你对你的团队所招聘的人不满意，你需要为更高素质的工程师拼命争取。如果你仍然得到不合格的工程师，也许是时候寻找另一份工作了。没有优秀团队的人才，你就注定要失败。

### Antipattern: Treat Your Team Like Children  反模式：像对待孩子一样对待团队成员

The best way to show your team that you don’t trust it is to treat team members like kids—people tend to act the way you treat them, so if you treat them like children or prisoners, don’t be surprised when that’s how they behave. You can manifest this behavior by micromanaging them or simply by being disrespectful of their abilities and giving them no opportunity to be responsible for their work. If it’s permanently necessary to micromanage people because you don’t trust them, you have a hiring failure on your hands. Well, it’s a failure unless your goal was to build a team that you can spend the rest of your life babysitting. If you hire people worthy of trust and show these people you trust them, they’ll usually rise to the occasion (sticking with the basic premise, as we mentioned earlier, that you’ve hired good people).

向你的团队表明你不信任它的最好方法是把团队成员当成小孩子——人们往往会按照你对待他们的方式行事，因此如果你像对待孩子或囚犯一样对待他们，当他们的行为如此时，不要感到惊讶。你可以通过对他们进行微观管理来体现这种行为，或者仅仅是不尊重他们的能力，不给他们机会对他们的工作负责。如果因为你不信任他们而长期需要对他们进行微观管理，那么你的招聘就失败了。好吧，这是一个失败，除非你的目标是建立一个你可以用余生来照看的团队。如果你雇用值得信任的人，并向这些人展示你对他们的信任，他们通常会迎难而上（坚持我们前面提到的基本前提，即你已经雇用了优秀的人）。

The results of this level of trust go all the way to more mundane things like office and computer supplies. As another example, Google provides employees with cabinets stocked with various and sundry office supplies (e.g., pens, notebooks, and other “legacy” implements of creation) that are free to take as employees need them. The IT department runs numerous “Tech Stops” that provide self-service areas that are like a mini electronics store. These contain lots of computer accessories and doodads (power supplies, cables, mice, USB drives, etc.) that would be easy to just grab and walk off with en masse, but because Google employees are being trusted to check these items out, they feel a responsibility to Do The Right Thing. Many people from typical corporations react in horror to hearing this, exclaiming that surely Google is hemorrhaging money due to people “stealing” these items. That’s certainly possible, but what about the costs of having a workforce that behaves like children or that has to waste valuable time formally requesting cheap office supplies? Surely that’s more expensive than the price of a few pens and USB cables.

这种信任程度的结果一直延伸到更平凡的事情，如办公室和电脑用品。另一个例子是，谷歌为员工提供了储存有各种杂类办公用品的柜子（例如，笔、笔记本和其他 "传统 "创作工具），员工可以根据需要自由取用。IT部门经营着许多 "技术站"，提供自助服务区，就像一个小型电子产品商店。这些地方有很多电脑配件和小玩意（电源、电缆、鼠标、U盘等），这些东西很容易就被拿走了，但因为谷歌员工被信任去获取这些物品，他们觉得有责任去做正确的事情。许多来自典型企业的人听到这个消息后都会感到惊恐，他们感叹说，他们惊呼肯定是因为有人“偷”这些东西，谷歌肯定会损失惨重。这当然是可能的，但是拥有一支像小孩子一样的员工队伍，或者不得不浪费宝贵的时间正式申请廉价办公用品的成本呢？这肯定比几支笔和USB线的价格要贵。

## Positive Patterns  积极模式

Now that we’ve covered antipatterns, let’s turn to positive patterns for successful leadership and management that we’ve learned from our experiences at Google, from watching other successful leaders and, most of all, from our own leadership mentors. These patterns are not only those that we’ve had great success implementing, but the patterns that we’ve always respected the most in the leaders who we follow.

现在我们已经介绍了反模式，让我们来谈谈成功的领导和管理的积极模式，这些模式是我们从在谷歌的经验中，从观察其他成功的领导者中，最重要的是，从我们自己的领导导师那里学到的。这些模式不仅是那些我们已经成功实施的模式，而且是我们一直以来最尊重的领导者的模式。

### Lose the Ego   放下自负

We talked about “losing the ego” a few chapters ago when we first examined humility, respect, and trust, but it’s especially important when you’re a team leader. This pattern is frequently misunderstood as encouraging people to be doormats and let others walk all over them, but that’s not the case at all. Of course, there’s a fine line between being humble and letting others take advantage of you, but humility is not the same as lacking confidence. You can still have self-confidence and opinions without being an egomaniac. Big personal egos are difficult to handle on any team, especially in the team’s leader. Instead, you should work to cultivate a strong collective team ego and identity.

我们在几章前第一次研究谦卑、尊重和信任时谈到了 " 放下自负"，但当你是一个团队领导时，这一点尤其重要。这种模式经常被误解为鼓励人们做受气包，让别人踩在他们身上，但事实并非如此。当然，在谦虚和让别人利用你之间有一条细微的界限，但谦虚不等于缺乏自信。你仍然可以有自信心和意见，而不是成为一个自大狂。在任何团队中，特别是在团队领导中，个人自大都是很难处理的。相反，你应该努力培养强大的集体自我和认同感。

Part of “losing the ego” is trust: you need to trust your team. That means respecting the abilities and prior accomplishments of the team members, even if they’re new to your team.

“丢失自负 "的一部分是信任：你需要信任你的团队。这意味着尊重团队成员的能力和先前的成就，即使他们是团队的新成员。

If you’re not micromanaging your team, you can be pretty certain the folks working in the trenches know the details of their work better than you do. This means that although you might be the one driving the team to consensus and helping to set the direction, the nuts and bolts of how to accomplish your goals are best decided by the people who are putting the product together. This gives them not only a greater sense of ownership, but also a greater sense of accountability and responsibility for the success (or failure) of their product. If you have a good team and you let it set the bar for the quality and rate of its work, it will accomplish more than by you standing over team members with a carrot and a stick.

如果你没有对你的团队进行微观管理，你可以非常肯定，那些在基层工作的人比你更了解他们工作的细节。这意味着，尽管你可能是推动团队达成共识并帮助确定方向的人，但如何完成你的目标的具体细节最好是由正在制作产品的人决定。这不仅使他们有更大的主人翁意识，而且对他们产品的成功（或失败）也有更大的责任感和使命感。如果你有一个好的团队，并让它为其工作的质量和速度设定标准，它将比你拿着胡萝卜和大棒站在团队成员面前的成就更大。

Most people new to a leadership role feel an enormous responsibility to get everything right, to know everything, and to have all the answers. We can assure you that you will not get everything right, nor will you have all the answers, and if you act like you do, you’ll quickly lose the respect of your team. A lot of this comes down to having a basic sense of security in your role. Think back to when you were an individual contributor; you could smell insecurity a mile away. Try to appreciate inquiry: when someone questions a decision or statement you made, remember that this person is usually just trying to better understand you. If you encourage inquiry, you’re much more likely to get the kind of constructive criticism that will make you a better leader of a better team. Finding people who will give you good constructive criticism is incredibly difficult, and it’s even more difficult to get this kind of criticism from people who “work for you.” Think about the big picture of what you’re trying to accomplish as a team, and accept feedback and criticism openly; avoid the urge to be territorial.

大多数刚开始担任领导角色的人都觉得自己肩负着巨大的责任，要做好每一件事，了解每一件事，并掌握所有答案。我们可以向你保证，你不会把所有事情都做对，也不会有所有的答案，如果你这样做，你很快就会失去团队的尊重。这很大程度上取决于你的角色是否具有基本的安全感。回想一下你还是个人贡献者的时候，你在一英里外就能闻到不安全感。尝试欣赏询问：当有人质疑你的决定或声明时，记住这个人通常只是想更好地了解你。如果你鼓励询问，你就更有可能得到那种建设性的批评，使你成为一个更好的团队的领导者。找到会给你好的建设性批评的人是非常困难的，而从 "为你工作"的人那里得到这种批评就更难了。想一想你作为一个团队所要完成的大局，坦然接受反馈和批评；避免地盘化的冲动。

The last part of losing the ego is a simple one, but many engineers would rather be boiled in oil than do it: apologize when you make a mistake. And we don’t mean you should just sprinkle “I’m sorry” throughout your conversation like salt on popcorn— you need to sincerely mean it. You are absolutely going to make mistakes, and whether or not you admit it, your team is going to know you’ve made a mistake. Your team members will know regardless of whether they talk to you (and one thing is guaranteed: they *will* talk about it with one another). Apologizing doesn’t cost money. People have enormous respect for leaders who apologize when they screw up, and contrary to popular belief, apologizing doesn’t make you vulnerable. In fact, you’ll usually gain respect from people when you apologize, because apologizing tells people that you are level headed, good at assessing situations, and—coming back to humility, respect, and trust—humble.

丢掉自负的最后一部分很简单，但许多工程师宁愿在油锅里也不愿意这样做：当你犯了错误时要道歉。我们并不是说你应该像在爆米花上撒盐一样在你的谈话中撒下 "对不起"，你需要真诚地表达。你绝对会犯错误，无论你是否承认，你的团队都会知道你犯了错误。无论你的团队成员是否与你交谈，他们都会知道（有一点是可以保证的：他们*会*彼此谈论这个问题）。道歉不需要花钱。人们对那些在犯错时道歉的领导人有着极大的尊重，与流行的观点相反，道歉不会让你变得脆弱。事实上，当你道歉时，你通常会得到人们的尊重，因为道歉告诉人们，你头脑冷静，善于评估情况，而且——回到谦逊、尊重和信任——谦虚。

### Be a Zen Master  管好自己

As an engineer, you’ve likely developed an excellent sense of skepticism and cynicism, but this can be a liability when you’re trying to lead a team. This is not to say that you should be naively optimistic at every turn, but you would do well to be less vocally skeptical while still letting your team know you’re aware of the intricacies and obstacles involved in your work. Mediating your reactions and maintaining your calm is more important as you lead more people, because your team will (both unconsciously and consciously) look to you for clues on how to act and react to whatever is going on around you.

作为一名工程师，你很可能已经养成了优秀的怀疑主义和愤世嫉俗的意识，但当你试图领导一个团队时，这可能是一种负担。这并不是说你应该处处天真乐观，但是你最好少说些怀疑的话，同时让你的团队知道你已经意识到了工作中的复杂性和障碍。当你领导更多的人时，调解你的反应和保持你的冷静更加重要，因为你的团队会（无意识地和有意识地）向你寻求线索，了解如何对你周围发生的任何事情采取行动和作出反应。

A simple way to visualize this effect is to see your company’s organization chart as a chain of gears, with the individual contributor as a tiny gear with just a few teeth all the way at one end, and each successive manager above them as another gear, ending with the CEO as the largest gear with many hundreds of teeth. This means that every time that individual’s “manager gear” (with maybe a few dozen teeth) makes a single revolution, the “individual’s gear” makes two or three revolutions. And the CEO can make a small movement and send the hapless employee, at the end of a chain of six or seven gears, spinning wildly! The farther you move up the chain, the faster you can set the gears below you spinning, whether or not you intend to.

将这种效应形象化的一个简单方法是将你公司的组织结构图看作是一个齿轮链，个人是一个很小的齿轮，只有几个齿，而他们之上的每个继任经理都是另一个齿轮，最后CEO是有数百颗牙的最大齿轮。这意味着个人的 "经理齿轮"（可能有几十个齿）每转一圈，"个人的齿轮 "就转两三圈。而首席执行官可以做一个小动作，让处于六、七个齿轮链末端的无助的员工疯狂地旋转！你越是往上走，就越是如此。你在链条上走得越远，你就能让你下面的齿轮转得越快，无论你是否打算这样做。

Another way of thinking about this is the maxim that the leader is always on stage. This means that if you’re in an overt leadership position, you are always being watched: not just when you run a meeting or give a talk, but even when you’re just sitting at your desk answering emails. Your peers are watching you for subtle clues in your body language, your reactions to small talk, and your signals as you eat lunch. Do they read confidence or fear? As a leader, your job is to inspire, but inspiration is a 24/7 job. Your visible attitude about absolutely everything—no matter how trivial—is unconsciously noticed and spreads infectiously to your team.

另一种思考方式是 "领导者总是站在舞台上" 的格言。这意味着，如果你处于公开的领导地位，你总是被监视着：不仅仅是当你主持会议或发表演讲时，甚至当你只是坐在办公桌前回复电子邮件时。你的同僚在观察你，从你的肢体语言、你对闲谈的反应以及你吃午餐时的信号中寻找微妙的线索。他们是读出了自信还是恐惧？作为一个领导，你的工作是激励，但激励是一项全天候的工作。你对所有事情的明显态度——无论多么微不足道——都会不自觉地被注意到，并会传染给你的团队。

One of the early managers at Google, Bill Coughran, a VP of engineering, had truly mastered the ability to maintain calm at all times. No matter what blew up, no matter what crazy thing happened, no matter how big the firestorm, Bill would never panic. Most of the time he’d place one arm across his chest, rest his chin in his hand, and ask questions about the problem, usually to a completely panicked engineer. This had the effect of calming them and helping them to focus on solving the problem instead of running around like a chicken with its head cut off. Some of us used to joke that if someone came in and told Bill that 19 of the company’s offices had been attacked by space aliens, Bill’s response would be, “Any idea why they didn’t make it an even 20?”

谷歌的早期经理之一，工程部副部长比尔·考夫兰，真正掌握了在任何时候都保持冷静的能力。无论发生什么事情，无论发生什么疯狂的事情，无论发生多大的风波，比尔都不会惊慌。大多数时候，他会把一只手放在胸前，用手托着下巴，对问题进行提问，通常是向完全惊慌失措的工程师提问。这样做的效果是让他们平静下来，帮助他们专注于解决问题，而不是像一只被砍了头的鸡一样到处乱跑。我们中的一些人曾经开玩笑说，如果有人进来告诉比尔，公司的19个办公室被太空外星人袭击了，比尔的反应会是："知道为什么他们没有袭击20个？"。

This brings us to another Zen management trick: asking questions. When a team member asks you for advice, it’s usually pretty exciting because you’re finally getting the chance to fix something. That’s exactly what you did for years before moving into a leadership position, so you usually go leaping into solution mode, but that is the last place you should be. The person asking for advice typically doesn’t want *you* to solve their problem, but rather to help them solve it, and the easiest way to do this is to ask this person questions. This isn’t to say that you should replace yourself with a Magic 8 Ball, which would be maddening and unhelpful. Instead, you can apply some humility, respect, and trust and try to help the person solve the problem on their own by trying to refine and explore the problem. This will usually lead the employee to the answer,[^6] and it will be that person’s answer, which leads back to the ownership and responsibility we went over earlier in this chapter. Whether or not you have the answer, using this technique will almost always leave the employee with the impression that you did. Tricky, eh? Socrates would be proud of you.

这给我们带来了另一个管理自我技巧：问问题。当一个团队成员向你征求意见时，这通常是非常令人兴奋的，因为你终于有机会解决一些问题了。这正是你在进入领导岗位之前多年所做的事情，所以你通常会立即进入解决方案模式，但这是你最不应该做的。寻求建议的人通常不希望*你*解决他们的问题，而是希望你能帮助他们解决问题，而最简单的方法就是向这个人提问。这并不是说你应该用 "魔力8球 "来代替你自己，那样做会让人发疯，而且没有帮助。相反，你可以运用一些谦逊、尊重和信任，通过尝试完善和探索问题，尝试帮助这个人自己解决这个问题。这通常会引导员工找到答案，而且这将是这个人的答案，这又回到了我们在本章前面所讲的所有权和责任。无论你是否有答案，使用这种技巧几乎总是会给员工留下你有答案的印象。很狡猾，是吗？苏格拉底会为你感到骄傲的。

> [^6]: See also “Rubber duck debugging.”
>
> 6   另请参见“橡皮鸭调试”

### Be a Catalyst  成为催化剂（促进者）

In chemistry, a catalyst is something that accelerates a chemical reaction, but which itself is not consumed in the reaction. One of the ways in which catalysts (e.g., enzymes) work is to bring reactants into close proximity: instead of bouncing around randomly in a solution, the reactants are much more likely to favorably interact with one another when the catalyst helps bring them together. This is a role you’ll often need to play as a leader, and there are a number of ways you can go about it.

在化学中，催化剂是加速化学反应的东西，但它本身在反应中不被消耗。（如酶）发挥作用的方式之一是使反应物接近：反应物不是在溶液中随机地跳动，而是在催化剂的帮助下更有可能彼此有利地互动。这是你作为一个领导者经常需要扮演的角色，你可以通过多种方式来实现这一目标。

One of the most common things a team leader does is to build consensus. This might mean that you drive the process from start to finish, or you just give it a gentle push in the right direction to speed it up. Working to build team consensus is a leadership skill that is often used by unofficial leaders because it’s one way you can lead without any actual authority. If you have the authority, you can direct and dictate direction, but that’s less effective overall than building consensus.[^7] If your team is looking to move quickly, sometimes it will voluntarily concede authority and direction to one or more team leads. Even though this might look like a dictatorship or oligarchy, when it’s done voluntarily, it’s a form of consensus.

团队领导最常做的事情之一是建立共识。这可能意味着你从头到尾推动这个过程，或者你只是在正确的方向上轻轻地推动它以加速它。努力建立团队共识是一种领导技能，经常被非官方领导人使用，因为这是你可以在没有任何实际权力的情况下进行领导的一种方式。如果你有权力，你可以指挥和发号施令，但这在整体上不如建立共识有效。如果你的团队希望快速行动，有时会自愿将权力和方向让给一个或多个团队领导。尽管这可能看起来像独裁或寡头政治，但当它是自愿做的时候，它是一种共识的形式。

> [^7]:	Attempting to achieve 100% consensus can also be harmful. You need to be able to decide to proceed even if not everyone is on the same page or there is still some uncertainty.  
> 7 试图达成100%的共识也可能是有害的。你需要能够决定继续进行，即使不是每个人都在同一起跑线上，或者仍有一些不确定性。

### Remove Roadblocks  消除障碍

Sometimes, your team already has consensus about what you need to do, but it hit a roadblock and became stuck. This could be a technical or organizational roadblock, but jumping in to help the team get moving again is a common leadership technique. There are some roadblocks that, although virtually impossible for your team members to get past, will be easy for you to handle, and helping your team understand that you’re glad (and able) to help out with these roadblocks is valuable.

有时，你的团队已经对你需要做的事情达成了共识，但它遇到了障碍并陷入困境。这可能是一个技术上或组织上的障碍，但帮助团队重新行动是一种常见的领导技巧。有一些障碍，虽然对你的团队成员来说几乎不可能逾越，但对你来说却很容易处理，帮助你的团队了解您乐于（并且能够）帮助解决这些障碍是非常有价值的

One time, a team spent several weeks trying to work past an obstacle with Google’s legal department. When the team finally reached its collective wits’ end and went to its manager with the problem, the manager had it solved in less than two hours simply because he knew the right person to contact to discuss the matter. Another time, a team needed some server resources and just couldn’t get them allocated. Fortunately, the team’s manager was in communication with other teams across the company and managed to get the team exactly what it needed that very afternoon. Yet another time, one of the engineers was having trouble with an arcane bit of Java code. Although the team’s manager was not a Java expert, she was able to connect the engineer to another engineer who knew exactly what the problem was. You don’t need to know all the answers to help remove roadblocks, but it usually helps to know the people who do. In many cases, knowing the right person is more valuable than knowing the right answer.

有一次，一个团队花了几个星期的时间试图克服谷歌法律部门的一个障碍。当该团队最终一筹莫展，向其经理提出这个问题时，经理在不到两个小时内就解决了这个问题，只因为他知道讨论这个问题的正确关联人。还有一次，一个团队需要一些服务器资源，却无法将其分配。幸运的是，团队经理与公司其他团队进行了沟通，并设法在当天下午让团队完全满足其需求。还有一次，一位工程师在处理一段神秘的Java代码时遇到了麻烦。虽然该团队的经理不是Java专家，但她还是为该工程师联系到了另一位工程师，而这位工程师正是知道问题出在哪里。你不需要知道所有的答案来帮助消除障碍，但是了解那些知道的人通常是有帮助的。在许多情况下，了解正确的人比知道正确的答案更有价值。

### Be a Teacher and a Mentor  成为一名教师和导师

One of the most difficult things to do as a TL is to watch a more junior team member spend 3 hours working on something that you know you can knock out in 20 minutes. Teaching people and giving them a chance to learn on their own can be incredibly difficult at first, but it’s a vital component of effective leadership. This is especially important for new hires who, in addition to learning your team’s technology and codebase, are learning your team’s culture and the appropriate level of responsibility to assume. A good mentor must balance the trade-offs of a mentee’s time learning versus their time contributing to their product as part of an effective effort to scale the team as it grows.

作为一名TL，最困难的事情之一就是看着一名级别较低的团队成员花3个小时做一些你知道可以在20分钟内完成的事情。一开始，教人并给他们一个自学的机会可能非常困难，但这是有效领导的重要组成部分。这对于新员工尤其重要，他们除了学习团队的技术和代码库外，还学习团队的文化和承担的适当责任水平。一个好的导师必须权衡学员的学习时间与他们为产品贡献的时间，作为有效努力的一部分，随着团队的发展扩大团队规模。

Much like the role of manager, most people don’t apply for the role of mentor—they usually become one when a leader is looking for someone to mentor a new team member. It doesn’t take a lot of formal education or preparation to be a mentor. Primarily, you need three things: experience with your team’s processes and systems, the ability to explain things to someone else, and the ability to gauge how much help your mentee needs. The last thing is probably the most important—giving your mentee enough information is what you’re supposed to be doing, but if you overexplain things or ramble on endlessly, your mentee will probably tune you out rather than politely tell you they got it.

与经理的角色一样，大多数人并不申请担任导师的角色——他们通常在领导寻找指导新团队成员的人时成为导师。要成为一名导师，不需要很多正式的教育或准备。主要来说，你需要三件事：对团队的流程和系统的经验，向别人解释事情的能力，以及衡量被指导者需要多少帮助的能力。最后一点可能是最重要的——向被指导者提供足够的信息是你应该做的，但是如果你说得太多或者没完没了，被指导者可能会把你拒之门外，而不是礼貌地告诉你他们明白了。

### Set Clear Goals  设定清晰目标

This is one of those patterns that, as obvious as it sounds, is solidly ignored by an enormous number of leaders. If you’re going to get your team moving rapidly in one direction, you need to make sure that every team member understands and agrees on what the direction is. Imagine your product is a big truck (and not a series of tubes). Each team member has in their hand a rope tied to the front of the truck, and as they work on the product, they’ll pull the truck in their own direction. If your intention is to pull the truck (or product) northbound as quickly as possible, you can’t have team members pulling every which way—you want them all pulling the truck north. If you’re going to have clear goals, you need to set clear priorities and help your team decide how it should make trade-offs when the time comes.

这是其中的一种模式，尽管听起来很明显，但却被大量领导者所忽视。如果你想让你的团队朝一个方向快速前进，你需要确保每个团队成员都理解并同意这个方向。想象一下，你的产品是一辆大卡车（而不是一系列的管子）。每个团队成员手里都有一根绑在卡车前面的绳子，当他们在产品上工作时，他们会把卡车拉向自己的方向。如果你的目的是尽快将卡车（或产品）向北拉，你就不能让团队成员向各个方向拉，你要他们都把卡车拉到北边。如果你想要有明确的目标，你需要设定明确的优先级，并帮助你的团队决定在时机成熟时应该如何权衡。

The easiest way to set a clear goal and get your team pulling the product in the same direction is to create a concise mission statement for the team. After you’ve helped the team define its direction and goals, you can step back and give it more autonomy, periodically checking in to make sure everyone is still on the right track. This not only frees up your time to handle other leadership tasks, it also drastically increases the efficiency of your team. Teams can (and do) succeed without clear goals, but they typically waste a great deal of energy as each team member pulls the product in a slightly different direction. This frustrates you, slows progress for the team, and forces you to use more and more of your own energy to correct the course.

指定一个明确的目标并让你的团队在同一个方向上拉动产品的最简单的方法是为团队创建一个简洁的任务陈述。在你帮助团队确定方向和目标后，你可以退后一步，给团队更多的自主权，定期检查，以确保每个人仍然在正确的轨道上。这不仅可以释放你的时间来处理其他的领导任务，还可以大幅提高团队的效率。如果没有明确的目标，团队可以（也确实）取得成功，但他们通常会浪费大量的精力，因为每个团队成员将产品拉向稍微不同的方向。这会让你感到沮丧，减慢团队的进度，迫使你越来越多地使用自己的精力来纠正错误。

### Be Honest  以诚待人

This doesn’t mean that we’re assuming you are lying to your team, but it merits a mention because you’ll inevitably find yourself in a position in which you can’t tell your team something or, even worse, you need to tell everyone something they don’t want to hear. One manager we know tells new team members, “I won’t lie to you, but I will tell you when I can’t tell you something or if I just don’t know.”

这并不意味着我们假设你在对你的团队撒谎，但值得一提的是，你将不可避免地发现自己处于一种无法告诉团队的境地，或者更糟糕的是，你需要告诉每个人他们不想听的事情。我们认识的一位经理告诉新团队成员，“我不会对你们撒谎，但当我不能告诉你们一些事情或者我只是不知道的什么时候，可以告诉你们。”

If a team member approaches you about something you can’t share, it’s OK to just tell them you know the answer but are not at liberty to say anything. Even more common is when a team member asks you something you don’t know the answer to: you can tell that person you don’t know. This is another one of those things that seems blindingly obvious when you read it, but many people in a manager role feel that if they don’t know the answer to something, it proves that they’re weak or out of touch. In reality, the only thing it proves is that they’re human.

如果一个团队成员找你谈一些你不能分享的事情，你可以告诉他们你知道答案，但不能随意说话。更常见的是，当一个团队成员问你一些你不知道的答案时：你可以告诉那个人你不知道。当你读到它时，这是另一件看起来非常明显的事情，但许多担任经理角色的人觉得，如果他们不知道某事的答案，就证明他们软弱或不合群。实际上，它唯一证明的是他们是人类。

Giving hard feedback is…well, hard. The first time you need to tell one of your reports that they made a mistake or didn’t do their job as well as expected can be incredibly stressful. Most management texts advise that you use the “compliment sandwich” to soften the blow when delivering hard feedback. A compliment sandwich looks something like this:

    You’re a solid member of the team and one of our smartest engineers. That being said, your code is convoluted and almost impossible for anyone else on the team to understand. But you’ve got great potential and a wicked cool T-shirt collection.

给予严厉的反馈是......嗯，很难。当你第一次需要告诉你的下属他们犯了一个错误或没有把工作做得像预期的那样好时，可能会有难以置信的压力。大多数管理学书籍建议你在提供硬反馈时使用 "赞美三明治 "来缓和打击。赞美的三明治看起来像这样：

    你是团队中一个可靠的成员，是我们最聪明的工程师之一。虽然如此，你的代码很复杂，团队中的其他人几乎不可能理解。但是，你有很大的潜力，而且有一件很酷的T恤衫收藏。

Sure, this softens the blow, but with this sort of beating around the bush, most people will walk out of this meeting thinking only, “Sweet! I’ve got cool T-shirts!” We *strongly* advise against using the compliment sandwich, not because we think you should be unnecessarily cruel or harsh, but because most people won’t hear the critical message, which is that something needs to change. It’s possible to employ respect here: be kind and empathetic when delivering constructive criticism without resorting to the compliment sandwich. In fact, kindness and empathy are critical if you want the recipient to hear the criticism and not immediately go on the defensive.

当然，这会减轻打击，但在这种绕圈子的情况下，大多数人在离开会议时只会想，“太好了！我有很酷的T恤！”我们强烈建议不要使用赞美三明治，不是因为我们认为你应该不必要地残忍或苛刻，而是因为大多数人不会听到批评的信息，也就是说有些东西需要改变。在这里可以使用尊重：在发表建设性的批评时，不要求助于“赞美三明治”，而是要善意和同理心。事实上，如果你想让接受者听到批评而不是立即采取防御措施，那么善意和同理心是至关重要的。

Years ago, a colleague picked up a team member, Tim, from another manager who insisted that Tim was impossible to work with. He said that Tim never responded to feedback or criticism and instead just kept doing the same things he’d been told he shouldn’t do. Our colleague sat in on a few of the manager’s meetings with Tim to watch the interaction between the manager and Tim, and noticed that the manager  made extensive use of the compliment sandwich so as not to hurt Tim’s feelings. When they brought Tim onto their team, they sat down with him and very clearly explained that Tim needed to make some changes to work more effectively with the team:

    We’re quite sure that you’re not aware of this, but the way that you’re interacting with the team is alienating and angering them, and if you want to be effective, you need to refine your communication skills, and we’re committed to helping you do that.

几年前，一位同事从另一位经理那里接过了一个团队成员蒂姆，这位经理坚持认为蒂姆是不能与之合作。他说，蒂姆从不回应反馈或批评，而只是不断地做他被告知不应该做的事情。我们的同事旁听了该经理与蒂姆的几次会议，观察该经理与蒂姆之间的互动，并注意到该经理为了不伤害蒂姆的感情，大量使用了赞美的三明治。当他们把蒂姆带到他们的团队时，他们与他坐下来，非常清楚地解释蒂姆需要做出一些改变，以便更有效地与团队合作：  
    我们很肯定你没有意识到这一点，但你与团队互动的方式正在疏远和激怒他们，如果你想有效地工作，你需要改进你的沟通技巧，我们致力于帮助你做到这一点。

They didn’t give Tim any compliments or candy-coat the issue, but just as important, they weren’t mean—they just laid out the facts as they saw them based on Tim’s performance with the previous team. Lo and behold, within a matter of weeks (and after a few more “refresher” meetings), Tim’s performance improved dramatically. Tim just needed very clear feedback and direction.

在这个问题上，他们没有给蒂姆任何赞扬或甜言蜜语，但同样重要的是，他们并不意味着他们只是根据蒂姆在前一个团队中的表现来陈述事实。你瞧，在几周之内（以及在几次“复习”会议之后），蒂姆的表现有了显著的改善。蒂姆只需要非常清晰的反馈和指导。

When you’re providing direct feedback or criticism, your delivery is key to making sure that your message is heard and not deflected. If you put the recipient on the defensive, they’re not going to be thinking of how they can change, but rather how they can argue with you to show you that you’re wrong. Our colleague Ben once managed an engineer who we’ll call Dean. Dean had extremely strong opinions and would argue with the rest of the team about anything. It could be something as big as the team’s mission or as small as the placement of a widget on a web page; Dean would argue with the same conviction and vehemence either way, and he refused to let anything slide. After months of this behavior, Ben met with Dean to explain to him that he was being too combative. Now, if Ben had just said, “Dean, stop being such a jerk,” you can be pretty sure Dean would have disregarded it entirely. Ben thought hard about how he could get Dean to understand how his actions were adversely affecting the team, and he came up with the following metaphor:

    Every time a decision is made, it’s like a train coming through town—when you jump in front of the train to stop it, you slow the train down and potentially annoy the engineer driving the train. A new train comes by every 15 minutes, and if you jump in front of every train, not only do you spend a lot of your time stopping trains, but eventually one of the engineers driving the train is going to get mad enough to run right over you. So, although it’s OK to jump in front of some trains, pick and choose the ones you want to stop to make sure you’re stopping only the trains that really matter.

当你提供直接的反馈或批评时，你的表达方式是确保你的信息被听到而不被偏离是关键。如果你让接受者处于防守状态，他们就不会考虑如何改变，而是会考虑如何与你争辩以证明你错了。我们的同事本曾经管理过一个工程师，我们称之为迪安。迪安有非常强烈的意见，会和团队的其他成员争论任何事情。这件事可能大到团队的任务，小到网页上一个小部件的位置；无论如何，迪安都会以同样的信念和激烈的态度进行争论，而且他拒绝放过任何东西。这种行为持续了几个月后，本与迪安见面，向他解释说他太好斗了。现在，如果本只是说："迪安，别再这么混蛋了"，你可以很肯定迪安会完全不理会。本认真思考了如何让迪安明白他的行为是如何对团队产生不利影响的，他想出了下面这个比喻:

    每次做出决定时，就像一列火车驶过小镇——当你跳到火车前面去阻止它时，你就会使火车减速，并有可能惹恼驾驶火车的工程师。每15分钟就会有一列新的火车经过，如果你在每一列火车前跳车，你不仅要花很多时间来阻止火车，而且最终驾驶火车的工程师众人会生气到直接从你身上碾过。因此，尽管跳到一些火车前面是可以的，但要挑选你想停的火车，以确保你只停真正重要的火车。

This anecdote not only injected a bit of humor into the situation, but also made it easier for Ben and Dean to discuss the effect that Dean’s “train stopping” was having on the team in addition to the energy Dean was spending on it.

这段轶事不仅为情况注入了一点幽默感，而且使本和迪恩更容易讨论迪恩的 "火车停摆 "除了耗费精力之外对团队的影响。

### Track Happiness  追踪幸福感

As a leader, one way you can make your team more productive (and less likely to leave) in the long term is to take some time to gauge their happiness. The best leaders we’ve worked with have all been amateur psychologists, looking in on their team members’ welfare from time to time, making sure they get recognition for what they do, and trying to make certain they are happy with their work. One TLM we know makes a spreadsheet of all the grungy, thankless tasks that need to be done and makes certain these tasks are evenly spread across the team. Another TLM watches the hours his team is working and uses comp time and fun team outings to avoid burnout and exhaustion. Yet another starts one-on-one sessions with his team members by dealing with their technical issues as a way to break the ice, and then takes some time to make sure each engineer has everything they need to get their work done. After they’ve warmed up, he talks to the engineer for a bit about how they’re enjoying the work and what they’re looking forward to next.

作为一名领导者，从长远来看，你可以让你的团队更有效率（也不太可能离开）的一种方法是花一些时间来衡量他们的幸福感。我们合作过的最好的领导都是业余的心理学家，他们时常关注团队成员的福利，确保他们的工作得到认可，并努力确保他们对工作感到满意。我们认识的一位TLM将所有需要完成的烦人、吃力不讨好的任务制成电子表格，并确保这些任务在团队中平均分配。另一位TLM观察他的团队的工作时间，并利用补偿时间和有趣的团队外出活动来避免倦怠和疲惫。还有一个人开始与他的团队成员进行一对一的会谈，处理他们的技术问题，以此来打破僵局，然后花一些时间来确保每个工程师拥有完成工作所需的一切。在他们热身之后，他与工程师交谈了一会儿，谈论他们如何享受工作，以及他们接下来期待的事情。

A good simple way to track your team’s happiness[^8] is to ask the team member at the end of each one-on-one meeting, “What do you need?” This simple question is a great way to wrap up and make sure each team member has what they need to be productive and happy, although you might need to carefully probe a bit to get details. If you ask this every time you have a one-on-one, you’ll find that eventually your team will remember this and sometimes even come to you with a laundry list of things it needs to make everyone’s job better.

跟踪你的团队幸福感的一个好的简单方法是在每次一对一的会议结束时问团队成员："你需要什么？" 这个简单的问题是一个很好的总结方式，确保每个团队成员都有他们需要的东西，以提高工作效率和幸福感，尽管你可能需要仔细探究一下以获得细节。如果你在每次一对一会谈时都这样问，你会发现最终你的团队会记住这一点，有时甚至会带着一长串需要的东西来找你，以使每个人的工作变得更好。

> [^8]:	Google also runs an annual employee survey called “Googlegeist” that rates employee happiness across many dimensions. This provides good feedback but isn’t what we would call “simple.”
>
> 8 谷歌还开展了一项名为 "Googlegeist "的年度员工调查，从多个方面对员工的幸福感进行评价。这提供了良好的反馈，但并不是我们所说的 "简单"。

## The Unexpected Question  意想不到的问题

Shortly after I started at Google, I had my first meeting with then-CEO Eric Schmidt, and at the end Eric asked me, “Is there anything you need?” I had prepared a million defensive responses to difficult questions or challenges but was completely unprepared for this. So I sat there, dumbstruck and staring. You can be sure I had something ready the next time I was asked that question!

在我进入谷歌后不久，我与当时的首席执行官埃里克·施密特（Eric Schmidt）进行了第一次会面，最后埃里克问我：“你需要什么吗？”我准备了一百万份针对困难问题或挑战的防御性回复，但对此完全没有准备。于是我坐在那里，呆呆地望着。下次再被问到这个问题时，我已经准备好了东西！’

It can also be worthwhile as a leader to pay some attention to your team’s happiness outside the office. Our colleague Mekka starts his one-on-ones by asking his reports to rate their happiness on a scale of 1 to 10, and oftentimes his reports will use this as a way to discuss happiness in *and* outside of the office. Be wary of assuming that people have no life outside of work—having unrealistic expectations about the amount of time people can put into their work will cause people to lose respect for you, or worse, to burn out. We’re not advocating that you pry into your team members’ personal lives, but being sensitive to personal situations that your team members are going through can give you a lot of insight as to why they might be more or less productive at any given time. Giving a little extra slack to a team member who is currently having a tough time at home can make them a lot more willing to put in longer hours when your team has a tight deadline to hit later.

作为一个领导者，关注一下你的团队在办公室以外的幸福感也是值得的。我们的同事梅卡在他的一对一谈话中，首先要求他的报告在1到10的范围内给他们的幸福感打分，而他的报告往往会以此作为一种方式来讨论办公室内外的幸福。要警惕假设人们没有工作以外的生活——对人们能够投入工作的时间有不切实际的期望，会导致人们失去对你的尊重，或者更糟糕的是，会让人倦怠。我们并不提倡你窥探团队成员的私人生活，但对团队成员正在经历的个人情况保持敏感，可以让你深入了解为什么他们在任何特定时间可能会更有或更没有生产效率。给目前在家里过得很艰难的团队成员一点额外的宽容，可以使他们在你的团队以后有一个紧迫的截止日期时更愿意投入更多的时间。

A big part of tracking your team members’ happiness is tracking their careers. If you ask a team member where they see their career in five years, most of the time you’ll get a shrug and a blank look. When put on the spot, most people won’t say much about this, but there are usually a few things that everyone would like to do in the next five years: be promoted, learn something new, launch something important, and work with smart people. Regardless of whether they verbalize this, most people are thinking about it. If you’re going to be an effective leader, you should be thinking about how you can help make all those things happen and let your team know you’re thinking about this. The most important part of this is to take these implicit goals and make them explicit so that when you’re giving career advice you have a real set of metrics with which to evaluate situations and opportunities.

跟踪你的团队成员的幸福感的一个重要部分是跟踪他们的职业生涯。如果你问一个团队成员他们对五年后的职业生涯的看法，大多数时候你会得到一个耸肩和一个茫然的眼神。当被问及这个问题时，大多数人都不会多说什么，但通常有几件事是每个人在未来五年都想做的：晋升、学习新东西、推出重要的东西、与聪明人一起工作。不管他们是否口头上这么说，大多数人都在考虑这个问题。如果你要成为一个有效的领导者，你应该考虑如何帮助实现所有这些事情，并让你的团队知道你在考虑这个问题。其中最重要的部分是将这些隐含的目标明确化，这样当你提供职业建议时，你就有了一套真正的衡量标准，用来评估形势和机会。

Tracking happiness comes down to not just monitoring careers, but also giving your team members opportunities to improve themselves, be recognized for the work they do, and have a little fun along the way.

追踪幸福感归根结底不仅仅是监测职业，还要给你的团队成员提供机会来提高自己，使他们的工作得到认可，并在此过程中获得一些乐趣。

## Other Tips and Tricks  其他提示和窍门

Following are other miscellaneous tips and tricks that we at Google recommend when you’re in a leadership position:

- *Delegate, but get your hands dirty*  
    When moving from an individual contributor role to a leadership role, achieving a balance is one of the most difficult things to do. Initially, you’re inclined to do all of the work yourself, and after being in a leadership role for a long time, it’s easy to get into the habit of doing none of the work yourself. If you’re new to a leadership role, you probably need to work hard to delegate work to other engineers on your team, even if it will take them a lot longer than you to accomplish that work. Not only is this one way for you to maintain your sanity, but also it’s how the rest of your team will learn. If you’ve been leading teams for a while or if you pick up a new team, one of the easiest ways to gain the team’s respect and get up to speed on what they’re doing is to get your hands dirty—usually by taking on a grungy task that no one else wants to do. You can have a resume and a list of achievements a mile long, but nothing lets a team know how skillful and dedicated (and humble) you are like jumping in and actually doing some hard work.

- *Seek to replace yourself*
    Unless you want to keep doing the exact same job for the rest of your career, seek to replace yourself. This starts, as we mentioned earlier, with the hiring process: if you want a member of your team to replace you, you need to hire people capable of replacing you, which we usually sum up by saying that you need to “hire people smarter than you.” After you have team members capable of doing your job, you need to give them opportunities to take on more responsibilities or occasionally lead the team. If you do this, you’ll quickly see who has the most aptitude to lead as well as who wants to lead the team. Remember that some people prefer to just be high-performing individual contributors, and that’s OK. We’ve always been amazed at companies that take their best engineers and—against their wishes—throw these engineers into management roles. This usually subtracts a great engineer from your team and adds a subpar manager.

- *Know when to make waves*  
    You will (inevitably and frequently) have difficult situations crop up in which every cell in your body is screaming at you to do nothing about it. It might be the engineer on your team whose technical chops aren’t up to par. It might be the person who jumps in front of every train. It might be the unmotivated employee who is working 30 hours a week. “Just wait a bit and it will get better,” you’ll tell yourself. “It will work itself out,” you’ll rationalize. Don’t fall into this trap—these are the situations for which you need to make the biggest waves and you need to make them now. Rarely will these problems work themselves out, and the longer you wait to address them, the more they’ll adversely affect the rest of the team and the more they’ll keep you up at night thinking about them. By waiting, you’re only delaying the inevitable and causing untold damage in the process. So act, and act quickly.

- *Shield* *your team from chaos*  
    When you step into a leadership role, the first thing you’ll usually discover is that outside your team is a world of chaos and uncertainty (or even insanity) that you never saw when you were an individual contributor. When I first became a manager back in the 1990s (before going back to being an individual contributor), I was taken aback by the sheer volume of uncertainty and organizational chaos that was happening in my company. I asked another manager what had caused this sudden rockiness in the otherwise calm company, and the other manager laughed hysterically at my naivete: the chaos had always been present, but my previous manager had shielded me and the rest of my team from it.

- *Give your team air cover*  
    Whereas it’s important that you keep your team informed about what’s going on “above” them in the company, it’s just as important that you defend them from a lot of the uncertainty and frivolous demands that can be imposed upon you from outside your team. Share as much information as you can with your team, but don’t distract them with organizational craziness that is extremely unlikely to ever actually affect them.

- *Let your team know when they’re doing well*  
    Many new team leads can get so caught up in dealing with the shortcomings of their team members that they neglect to provide positive feedback often enough. Just as you let someone know when they screw up, be sure to let them know when they do well, and be sure to let them (and the rest of the team) know when they knock one out of the park.

下面是谷歌在你担任领导职务时推荐的其他提示和窍门： 

- *委托，但要弄脏自己的手*  
    当从个人贡献者的角色转变为领导角色时，实现平衡是最难做到的事情之一。起初，你会倾向于自己做所有的工作，而在领导岗位上呆久了，很容易养成自己不做任何工作的习惯。如果你刚开始担任领导职务，你可能需要努力工作，把工作委托给团队中的其他工程师，即使他们完成这项工作所需的时间比你长很多。这不仅是你保持理智的一种方式，而且也是你的团队其他成员学习的方式。如果你已经领导了一段时间的团队，或者你接了一个新的团队，获得团队的尊重和了解他们的工作的最简单的方法之一就是弄脏你的手——通常是承担一个别人不愿意做的肮脏的任务。你可以有一份简历和一份一英里长的成就清单，但没有任何东西能让团队知道你有多熟练、有多谦逊（和谦逊），你喜欢跳进去做一些艰苦的工作。

- *寻求继任者*  
    除非你想在余下的职业生涯中一直做着完全相同的工作，否则要设法寻找继任者。正如我们前面提到的，这从招聘过程开始：如果你想让你的团队成员取代你，你需要雇佣有能力取代你的人，我们通常总结说，你需要 "雇佣比你更聪明的人"。在你拥有能够胜任工作的团队成员之后，你需要给他们机会承担更多的责任或偶尔领导团队。如果你这样做，你会很快看到谁最有领导才能，以及谁想领导团队。请记住，有些人更愿意只做高绩效的个人，这也是可以的。我们一直对一些公司感到惊讶，这些公司把他们最优秀的工程师，违背他们的意愿，把这些工程师扔到管理岗位上。这通常会从你的团队中减少一名优秀的工程师，而增加一名不合格的经理。

- *知道什么时候该掀起风波*  
    你会（不可避免且经常地）遇到一些困难的情况，在这些情况下，你身体里的每一个细胞都在对你大喊大叫，要求你什么都不要做。这可能是你团队中的工程师，他的技术能力达不到要求。它可能是那个在每辆火车前跳来跳去的人。它可能是每周工作30小时的无心的员工。"只要等一等，就会好起来的，"你会告诉自己。"它会自己解决的，"你会合理地解释。不要落入这个陷阱——这些是你需要掀起最大波澜的情况，你需要现在就掀起。这些问题很少会自己解决，你等待解决的时间越长，它们对团队其他成员的不利影响就越大，它们会让你彻夜思考。通过等待，你只是拖延了不可避免的事情，并在这个过程中造成难以言喻的损失。因此，要采取行动，而且要迅速行动。

- *屏蔽团队免受混乱影响*  
    当你步入领导岗位时，你通常会发现，在你的团队之外是一个混乱和不确定（甚至是疯狂）的世界，而你在做个人贡献者时从未见过。当我在20世纪90年代第一次成为一名经理时（在回到个人贡献者之前），我对公司里发生的大量不确定性和组织混乱感到吃惊。我问另一位经理，是什么原因导致原本平静的公司突然出现这种动荡，另一位经理歇斯底里地笑我太天真了：混乱一直存在，但我以前的经理把我和我的团队其他成员都挡在外面。

- *给你的团队提供空中掩护*  
    尽管让你的团队了解公司 "上面 "发生的事情很重要，但同样重要的是，你要保护他们不受很多不确定因素和轻率要求的影响，这些要求可能来自你的团队之外。尽可能多地与你的团队分享信息，但不要用那些极不可能真正影响到他们的组织的疯狂行为来分散他们的注意力。

- *让你的团队知道他们什么时候做得好*  
    许多新的团队领导可能会陷入处理团队成员的缺点中，以至于他们忽略了经常提供积极的反馈。就像你让某人知道他们搞砸了一样，一定要让他们知道他们做得很好，而且一定要让他们（和团队其他成员）知道他们在球场里踢出了一个好成绩。

Lastly, here’s something the best leaders know and use often when they have adventurous team members who want to try new things:

*It’s easy to say “yes” to something that’s easy to undo*  
    If you have a team member who wants to take a day or two to try using a new tool or library[^9] that could speed up your product (and you’re not on a tight deadline), it’s easy to say, “Sure, give it a shot.” If, on the other hand, they want to do something like launch a product that you’re going to have to support for the next 10 years, you’ll likely want to give it a bit more thought. Really good leaders have a good sense for when something can be undone, but more things are undoable than you think (and this applies to both technical and nontechnical decisions).

最后，这里有一些最好的领导者知道的东西，当他们有想尝试新事物的富有冒险精神的团队成员时，他们经常使用：

*很容易对容易撤销的事情说 "是 "*  
    如果你有一个团队成员想花一两天时间尝试使用一个新的工具或库，可以加速你的产品（而且你没有紧迫的期限），你很容易说："当然，给它一个机会。" 另一方面，如果他们想做一些事情，比如推出一个你必须在未来10年内支持的产品，你可能会想多考虑一下。真正好的领导对什么时候可以撤销的事情有很好的感觉，但更多的事情是可以撤销的，而不是你想象的那样（这适用于技术和非技术的决定）。

> [^9]: To gain a better understanding of just how “undoable” technical changes can be, see Chapter 22.  
>
> 9 要想更好地了解技术变革是如何 "不可逆转 "的，见第22章。

## People Are Like Plants  人如植物

My wife is the youngest of six children, and her mother was faced with the difficult task of figuring out how to raise six very different children, each of whom needed different things. I asked my mother-in-law how she managed this (see what I did there?), and she responded that kids are like plants: some are like cacti and need little water but lots of sunshine, others are like African violets and need diffuse light and moist soil, and still others are like tomatoes and will truly excel if you give them a little fertilizer. If you have six kids and give each one the same amount of water, light, and fertilizer, they’ll all get equal treatment, but the odds are good that *none* of them will get what they actually need.

我的妻子是六个孩子中最小的一个，她的母亲面临着一项艰巨的任务，即如何抚养六个完全不同的孩子，每个孩子都需要不同的东西。我问我的岳母她是如何做到的（看到我在那里做了什么了吗？），她回答说，孩子就像植物：有些像仙人掌，需要很少的水，但需要大量的阳光；有些像非洲紫罗兰，需要漫射的光和湿润的土壤；还有一些像西红柿，如果你给他们一点肥料，他们会非常出色。如果你有六个孩子，并且给每个孩子相同数量的水、光和肥料，他们都会得到同等的待遇，但很有可能他们都得不到他们真正需要的东西。

And so your team members are also like plants: some need more light, and some need more water (and some need more…fertilizer). It’s your job as their leader to determine who needs what and then give it to them—except instead of light, water, and fertilizer, your team needs varying amounts of motivation and direction.

因此，你的团队成员也像植物一样：有些需要更多的光，有些需要更多的水（有些需要更多的......肥料）。作为他们的领导，你的工作是确定谁需要什么，然后给他们——只是你的团队需要的不是光、水和肥料，而是不同程度的动力和方向。

To get all of your team members what they need, you need to motivate the ones who are in a rut and provide stronger direction to those who are distracted or uncertain of what to do. Of course, there are those who are “adrift” and need both motivation and direction. So, with this combination of motivation and direction, you can make your team happy and productive. And you don’t want to give them too much of either—because if they don’t need motivation or direction and you try giving it to them, you’re just going to annoy them.

为了让所有团队成员都得到他们所需要的，你需要激励那些墨守成规的人，并为那些分心或不确定该做什么的人提供更有力的指导。当然，有些人是“漂泊”的，需要动力和方向。因此，通过这种动机和方向的结合，你可以让你的团队快乐并富有成效。你也不想给他们太多，因为如果他们不需要动力或方向，而你试图给他们动力或方向，你只会惹恼他们。

Giving direction is fairly straightforward—it requires a basic understanding of what needs to be done, some simple organizational skills, and enough coordination to break it down into manageable tasks. With these tools in hand, you can provide sufficient guidance for an engineer in need of directional help. Motivation, however, is a bit more sophisticated and merits some explanation.

给出方向是相当简单的——它需要对需要做什么有一个基本的了解，一些简单的组织技能，以及足够的协调来将其分解为可管理的任务。有了这些工具，你可以为需要定向帮助的工程师提供足够的指导。然而，动机有点复杂，值得解释一下。

### Intrinsic Versus Extrinsic Motivation  内在动机与外在动机的关系

There are two types of motivation: *extrinsic*, which originates from outside forces (such as monetary compensation), and *intrinsic*, which comes from within. In his book *Drive*,[^10] Dan Pink explains that the way to make people the happiest and most productive isn’t to motivate them extrinsically (e.g., throw piles of cash at them); rather, you need to work to increase their intrinsic motivation. Dan claims you can increase intrinsic motivation by giving people three things: autonomy, mastery, and purpose.[^11]

有两种类型的动机：*外部动机*，来源于外部力量（如金钱补偿），和*内部动机*，来源于内部。丹-平克在他的书《驱动》中解释说，让人们成为最快乐、最有效率的人的方法不是外在地激励他们（例如，向他们扔大量现金）；相反，你需要努力提高他们的内在动机。丹声称，你可以通过给人们三样东西来增加内在动机：自主性、掌控力和目标。

A person has autonomy when they have the ability to act on their own without someone micromanaging them.[^12] With autonomous employees (and Google strives to hire mostly autonomous engineers), you might give them the general direction in which they need to take the product but leave it up to them to decide how to get there. This helps with motivation not only because they have a closer relationship with the product (and likely know better than you how to build it), but also because it gives them a much greater sense of ownership of the product. The bigger their stake is in the success of the product, the greater their interest is in seeing it succeed.

当一个人能够独立行动而不受任何人的微观管理时，他就拥有了自主权。有了自主员工（谷歌努力雇佣的大多是自主工程师），你可能会给他们提供他们需要的产品的大方向，但让他们自己决定如何去做。这有助于激励，不仅因为他们与产品的关系更密切（而且可能比你更了解如何构建产品），而且还因为这让他们对产品有更大的主人翁意识。他们对产品的成功所持的股份越大，他们对看到产品成功的兴趣就越大。

Mastery in its basest form simply means that you need to give someone the opportunity to improve existing skills and learn new ones. Giving ample opportunities for mastery not only helps to motivate people, it also makes them better over time, which makes for stronger teams.[^13] An employee’s skills are like the blade of a knife: you can spend tens of thousands of dollars to find people with the sharpest skills for your team, but if you use that knife for years without sharpening it, you will wind up with a dull knife that is inefficient, and in some cases useless. Google gives ample opportunities for engineers to learn new things and master their craft so as to keep them sharp, efficient, and effective.

掌握最基本的方式只意味着你需要给某人机会来提高现有技能并学习新技能。提供充分的掌握技能的机会不仅有助于激励员工，而且随着时间的推移，他们也会变得更好，从而形成更强大的团队。员工的技能就像刀锋：你可以花数万美元为团队找到最有技能的人，但是，如果你使用这把刀多年而没有磨快它，你会得到一把钝刀，这是低效的，在某些情况下是无用的。谷歌为工程师提供了大量学习新事物和掌握技能的机会，从而使他们保持敏锐、高效和有效。

Of course, all the autonomy and mastery in the world isn’t going to help motivate someone if they’re doing work for no reason at all, which is why you need to give their work purpose. Many people work on products that have great significance, but they’re kept at arm’s length from the positive effects their products might have on their company, their customers, or even the world. Even for cases in which the product might have a much smaller impact, you can motivate your team by seeking the reason for their efforts and making this reason clear to them. If you can help them to see this purpose in their work, you’ll see a tremendous increase in their motivation and productivity.[14](#_bookmark464) One manager we know keeps a close eye on the email feedback that Google gets for its product (one of the “smaller-impact” products), and whenever she sees a message from a customer talking about how the company’s product has helped them personally or helped their business, she immediately forwards it to the engineering team. This not only motivates the team, but also frequently inspires team members to think about ways in which they can make their product even better.

当然，如果某人无缘无故地工作，那么世界上所有的自主性和掌握性都无助于激励他们，这就是为什么你需要给他们工作的目的。许多人从事具有重大意义的产品，但他们与产品可能对公司、客户甚至世界产生的积极影响保持一定距离。即使在产品的影响可能小得多的情况下，你也可以通过寻找他们努力的原因并向他们说明原因来激励团队。如果你能帮助他们在工作中看到这一目标，你会看到他们的积极性和生产效率有了巨大的提高。我们认识的一位经理密切关注谷歌为其产品（一种“影响较小”的产品）收到的电子邮件反馈，每当她看到客户在谈论公司的产品如何帮助他们个人或帮助他们的业务时，她会立即将其转发给工程团队。这不仅激励了团队，也经常激励团队成员思考如何让他们的产品变得更好。

> [^10]: See Dan’s fantastic TED talk on this subject.
>
> 10  看丹关于这个话题的精彩TED演讲。
>
> [^11]: This assumes that the people in question are being paid well enough that income is not a source of stress.
>
> 11  这是假设相关人员的薪酬足够高，收入不是压力来源。
>
> [^12]: This assumes that you have people on your team who don’t need micromanagement.
>
> 12  这假设您的团队中有不需要微观管理的人员。
>
> [^13]:Of course, it also means they’re more valuable and marketable employees, so it’s easier for them to pick up and leave you if they’re not enjoying their work. See the pattern in “Track Happiness” on page 99.
>
> 13  当然，这也意味着他们是更有价值、更有市场价值的员工，因此，如果他们不喜欢自己的工作，他们会更容易接你离开。请参见第99页“追踪幸福感”中的模式。
>
> [^14]: Adam M. Grant, “The Significance of Task Significance: Job Performance Effects, Relational Mechanisms, and Boundary Conditions,” Journal of Applied Psychology, 93, No. 1 (2018), http://bit.ly/task_significance.
>
> 14  Adam M.Grant，“任务重要性的重要性：工作绩效影响、关系机制和边界条件”，《应用心理学杂志》，第93期，第1期（2018年），http://bit.ly/task_significance.

## Conclusion  总结

Leading a team is a different task than that of being a software engineer. As a result, good software engineers do not always make good managers, and that’s OK— effective organizations allow productive career paths for both individual contributors and people managers. Although Google has found that software engineering experience itself is invaluable for managers, the most important skills an effective manager brings to the table are social ones. Good managers enable their engineering teams by helping them work well, keeping them focused on proper goals, and insulating them from problems outside the group, all while following the three pillars of humility, trust, and respect.

领导团队与作为软件工程师是不同的任务。因此，好的软件工程师并不总是能成为好的管理者，这也没关系——高效的组织为个人贡献者和人员管理者提供了富有成效的职业道路。尽管谷歌发现软件工程经验本身对管理者来说是无价的，但一个有效的管理者所带来的最重要的技能是社交技能。优秀的管理者帮助他们的工程团队做好工作，让他们专注于正确的目标，让他们远离团队之外的问题，同时遵循谦逊、信任和尊重这三大支柱。

## TL;DRs  内容提要

- Don’t “manage” in the traditional sense; focus on leadership, influence, and serving your team.
- Delegate where possible; don’t DIY (Do It Yourself).
- Pay particular attention to the focus, direction, and velocity of your team.

- 不要进行传统意义上的 "管理"；重点是领导力、影响力和为你的团队服务。
- 尽可能地授权；不要DIY（自己动手）。
- 特别注意你的团队的重点、方向和效率。
