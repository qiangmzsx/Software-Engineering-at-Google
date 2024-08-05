
**CHAPTER 7**

# Measuring Engineering Productivity

# 第七章  度量工程效率

**Written by  Ciera Jaspan**

**Edited by Riona Macnamara**

Google is a data-driven company. We back up most of our products and design decisions with hard data. The culture of data-driven decision making, using appropriate metrics, has some drawbacks, but overall, relying on data tends to make most decisions objective rather than subjective, which is often a good thing. Collecting and analyzing data on the human side of things, however, has its own challenges. Specifically, within software engineering, Google has found that having a team of specialists focus on engineering productivity itself to be very valuable and important as the company scales and can leverage insights from such a team.

谷歌是一家数据驱动型公司。我们的大部分产品和设计决策都有可靠的数据支持。数据驱动决策的文化，使用适当的指标，有一些不足，但总的来说，依靠数据往往使大多数决策变得客观而不是主观，这往往是一件好事。然而，收集和分析数据是人性的弱点，有其自身的挑战。具体来说，在软件工程领域，谷歌发现，随着公司规模的扩大，拥有一支专注于工程生产效率的专家团队本身是非常有价值和重要的，可以利用这样一支团队的洞察力。

## Why Should We Measure Engineering Productivity? 我们为什么要度量工程效率

Let’s presume that you have a thriving business (e.g., you run an online search engine), and you want to increase your business’s scope (enter into the enterprise application market, or the cloud market, or the mobile market). Presumably, to increase the scope of your business, you’ll need to also increase the size of your engineering organization. However, as organizations grow in size linearly, communication costs grow quadratically.[^1] Adding more people will be necessary to increase the scope of your business, but the communication overhead costs will not scale linearly as you add additional personnel. As a result, you won’t be able to scale the scope of your business linearly to the size of your engineering organization.

让我们假设你有一个蓬勃发展的业务（例如，你经营一个在线搜索引擎），并且你想扩大你的业务范围（进入企业应用市场，或云市场，或移动市场）。据推测，为了增加你的业务范围，你也需要增加你的工程组织的规模。然而，随着组织规模的线性增长，沟通成本也呈二次曲线增长。增加人员对扩大业务范围是必要的，但沟通成本不会随着你增加人员而线性扩展。因此，你将无法根据你的工程组织的规模线性地扩大你的业务范围。

There is another way to address our scaling problem, though: *we could make each individual more productive*. If we can increase the productivity of individual engineers in the organization, we can increase the scope of our business without the commensurate increase in communication overhead.

不过，还有一种方法可以解决我们的规模问题：*我们可以使每个人的生产效率提高*。如果我们能提高组织中单个工程师的生产效率，我们就能增加我们的业务范围，而不会相应地增加沟通成本。

Google has had to grow quickly into new businesses, which has meant learning how to make our engineers more productive. To do this, we needed to understand what makes them productive, identify inefficiencies in our engineering processes, and fix the identified problems. Then, we would repeat the cycle as needed in a continuous improvement loop. By doing this, we would be able to scale our engineering organization with the increased demand on it.

谷歌不得不迅速发展新业务，这意味着要学习如何让我们的工程师更有效率。要做到这一点，我们需要了解是什么让他们富有成效，找出我们工程流程中的低效之处，并解决所发现的问题。然后，我们将根据需要在一个持续改进的循环中重复这个循环。通过这样做，我们将能够在需求增加的情况下扩展我们的工程组织。

However, this improvement cycle *also* takes human resources. It would not be worthwhile to improve the productivity of your engineering organization by the equivalent of 10 engineers per year if it took 50 engineers per year to understand and fix productivity blockers. *Therefore, our goal is to not only improve software engineering productivity, but to do so efficiently.*

然而，这个增量改进过程*同样*需要人力资源。如果每年需要50个工程师来了解和解决生产力的障碍，那么以每年10名工程师的数量来提高工程组织的生产率是不值当的。*因此，我们不仅要在目标上提高软件工程的生产力，而且这一改进过程也要同样高效。*

At Google, we addressed these trade-offs by creating a team of researchers dedicated to understanding engineering productivity. Our research team includes people from the software engineering research field and generalist software engineers, but we also include social scientists from a variety of fields, including cognitive psychology and behavioral economics. The addition of people from the social sciences allows us to not only study the software artifacts that engineers produce, but to also understand the human side of software development, including personal motivations, incentive structures, and strategies for managing complex tasks. The goal of the team is to take a data-driven approach to measuring and improving engineering productivity.

在谷歌，我们通过建立一个致力于了解工程生产效率的研究团队来解决这些权衡问题。我们的研究团队包括来自软件工程研究人员和普通的软件工程师，但我们也包括来自不同领域的社会学家，包括认知心理学和行为经济学。来自社会科学的人员的加入使我们不仅可以研究工程师生产的软件构件，还可以了解软件开发过程中人的一面，包括个人动机、激励结构和管理复杂任务的策略。该团队的目标是采用数据驱动的方法来度量和提高工程生产效率。

In this chapter, we walk through how our research team achieves this goal. This begins with the triage process: there are many parts of software development that we *can* measure, but what *should* we measure? After a project is selected, we walk through how the research team identifies meaningful metrics that will identify the problematic parts of the process. Finally, we look at how Google uses these metrics to track improvements to productivity.

在本章中，我们将介绍我们的研究团队是如何实现这一目标的。这从分类过程开始：我们对软件开发的许多部分*可以*进行计量，但是我们到底应该计量什么呢？在一个项目被选中后，我们将介绍研究团队如何确定有意义的指标，以确定该过程中存在问题的部分。最后，我们看一下谷歌是如何使用这些指标来跟踪生产效率的改进。

For this chapter, we follow one concrete example posed by the C++ and Java language teams at Google: readability. For most of Google’s existence, these teams have managed the readability process at Google. (For more on readability, see Chapter 3.) The readability process was put in place in the early days of Google, before automatic formatters (Chapter 8 and linters that block submission were commonplace (Chapter 9). The process itself is expensive to run because it requires hundreds of engineers performing readability reviews for other engineers in order to grant readability to them. Some engineers viewed it as an archaic hazing process that no longer held utility, and it was a favorite topic to argue about around the lunch table. The concrete question from the language teams was this: is the time spent on the readability process worthwhile?

在本章中，我们遵循谷歌的C++和Java语言团队提出的一个具体例子：可读性。在谷歌存在的大部分时间里，这些团队一直在管理谷歌的可读性过程。(关于可读性的更多信息，请参见第三章）。可读性过程是在谷歌的早期建立的，当时自动格式化工具（第8章）和阻止提交的锁定还没有普及（第9章）。这个过程本身运行成本很高，因为它需要数以百计的工程师为其他工程师进行可读性审查，以便授予他们可读性。一些工程师认为这是一个古老的自欺欺人过程，不再具有实用性，这也是午餐桌上最喜欢争论的话题。来自语言团队的具体问题是：花在可读性过程上的时间是值得的吗？

> [^1]: Frederick P. Brooks, The Mythical Man-Month: Essays on Software Engineering (New York: Addison-Wesley, 1995).
>
> 1   Frederick P.Brooks，《人月神话：软件工程随笔》（纽约：Addison Wesley，1995）。

## Triage: Is It Even Worth Measuring? 分类：是否值得度量？

Before we decide how to measure the productivity of engineers, we need to know when a metric is even worth measuring. The measurement itself is expensive: it takes people to measure the process, analyze the results, and disseminate them to the rest of the company. Furthermore, the measurement process itself might be onerous and slow down the rest of the engineering organization. Even if it is not slow, tracking progress might change engineers’ behavior, possibly in ways that mask the underlying issues. We need to measure and estimate smartly; although we don’t want to guess, we shouldn’t waste time and resources measuring unnecessarily.

在我们决定如何度量工程师的生产效率之前，我们需要知道某个指标是否值得度量。度量本身是昂贵的：它需要人去度量过程，分析结果，并将其传播给公司的其他部门。此外，度量过程本身可能是繁琐的，会拖累工程组织的其他部门。即使它不慢，跟踪进度也可能改变工程师的行为，可能会掩盖潜在的问题。我们需要聪明地度量和估计；虽然我们不想猜测，但我们不应该浪费时间和资源进行不必要的度量。

At Google, we’ve come up with a series of questions to help teams determine whether it’s even worth measuring productivity in the first place. We first ask people to describe what they want to measure in the form of a concrete question; we find that the more concrete people can make this question, the more likely they are to derive benefit from the process. When the readability team approached us, its question was simple: are the costs of an engineer going through the readability process worth the benefits they might be deriving for the company?

在谷歌，我们想出了一系列的问题来帮助团队判定是否值得优先度量生产效率。我们首先要求人们以具体问题的形式描述他们想要度量的东西；我们发现，人们提出这个问题越具体，他们就越有可能从这个过程中获益。当可读性团队与我们接触时，其问题很简单：工程师在提高可读性过程中的成本增加是否匹配他们为公司带来的好处？

We then ask them to consider the following aspects of their question:

*What result are you expecting, and why?*  
    Even though we might like to pretend that we are neutral investigators, we are not. We do have preconceived notions about what ought to happen. By acknowledging this at the outset, we can try to address these biases and prevent post hoc explanations of the results.  
    When this question was posed to the readability team, it noted that it was not sure. People were certain the costs had been worth the benefits at one point in time, but with the advent of autoformatters and static analysis tools, no one was entirely certain. There was a growing belief that the process now served as a hazing ritual. Although it might still provide engineers with benefits (and they had survey data showing that people did claim these benefits), it was not clear whether it was worth the time commitment of the authors or the reviewers of the code.

*If the data supports your expected result, what action will be taken?*  
    We ask this because if no action will be taken, there is no point in measuring. Notice that an action might in fact be “maintain the status quo” if there is a planned change that will occur if we didn’t have this result.  
    When asked about this, the answer from the readability team was straightforward: if the benefit was enough to justify the costs of the process, they would link to the research and the data on the FAQ about readability and advertise it to set expectations.

*If we get a negative result, will appropriate action be taken?*  
    We ask this question because in many cases, we find that a negative result will not change a decision. There might be other inputs into a decision that would override any negative result. If that is the case, it might not be worth measuring in the first place. This is the question that stops most of the projects that our research team takes on; we learn that the decision makers were interested in knowing the results, but for other reasons, they will not choose to change course.  
    In the case of readability, however, we had a strong statement of action from the team. It committed that, if our analysis showed that the costs either outweighed the benefit or the benefits were negligible, the team would kill the process. As different programming languages have different levels of maturity in formatters and static analyses, this evaluation would happen on a per-language basis.

*Who is going to decide to take action on the result, and when would they do it?*  
    We ask this to ensure that the person requesting the measurement is the one who is empowered to take action (or is doing so directly on their behalf). Ultimately, the goal of measuring our software process is to help people make business decisions. It’s important to understand who that individual is, including what form of data convinces them. Although the best research includes a variety of approaches (everything from structured interviews to statistical analyses of logs), there might be limited time in which to provide decision makers with the data they need. In those cases, it might be best to cater to the decision maker. Do they tend to make decisions by empathizing through the stories that can be retrieved from interviews?[^2] Do they trust survey results or logs data? Do they feel comfortable with complex statistical analyses? If the decider doesn’t believe the form of the result in principle, there is again no point in measuring the process.  
    In the case of readability, we had a clear decision maker for each programming language. Two language teams, Java and C++, actively reached out to us for assistance, and the others were waiting to see what happened with those languages first.[^3] The decision makers trusted engineers’ self-reported experiences for understanding happiness and learning, but the decision makers wanted to see “hard numbers” based on logs data for velocity and code quality. This meant that we needed to include both qualitative and quantitative analysis for these metrics. There was not a hard deadline for this work, but there was an internal conference that would make for a useful time for an announcement if there was going to be a change. That deadline gave us several months in which to complete the work.

然后我们要求他们考虑以下问题：

*你期望的结果是什么？为什么？*
    尽管我们可能想假装我们是中立的调查人员，但事实并非如此。我们确实对一些事有先入为主的观念。通过一开始就承认这一点，我们可以尝试解决这些偏见，防止对结果进行事后解释。
    当这个问题被提给可读性小组时，该小组指出，它并不确定。人们确信在某个时间点上，成本是值得的，但是随着自动格式化和静态分析工具的出现，没有人完全确定。越来越多的人认为，这个过程现在成了一种自欺欺人的仪式。虽然它可能仍然为工程师提供了好处（他们有调查数据显示人们确实声称有这些好处），但不清楚它是否值得作者或代码审查员投入时间。

*如果数据支持你的预期结果，将采取什么行动*
    我们这样问是因为如果不采取任何行动，那么度量就没有意义了。请注意，如果没有这一结果，就会发生计划变更，那么行动实际上可能是“维持现状”。
    当被问及这个问题时，可读性团队的回答很直截了当：如果好处足以证明这个过程的成本是合理的，他们会链接到关于可读性的FAQ上的研究和数据，并进行宣传以设定期望。

*如果我们得到一个负面的结果，是否会采取适当的行动？*
    我们问这个问题是因为在许多情况下，我们发现负面结果不会改变决策。决策中可能会有其他的投入，而这些投入将取代任何负面的结果。如果是这样的话，可能一开始就不值得度量。这也是阻止我们研究团队所做的大多数项目的问题；我们了解到决策者对了解结果感兴趣，但由于其他原因，他们不会选择改变方向。
    然而，在可读性的案例中，我们有一个来自团队的强有力的行动声明。它承诺，如果我们的分析显示成本大于收益，或者收益可以忽略不计，团队将放弃这个项目。由于不同的编程语言在格式化和静态分析方面有不同的成熟度，因此该评估将基于每种语言进行。

*谁将决定对结果采取行动，以及他们何时采取行动？*
    我们这样问是为了确保要求度量的人是被授权采取行动的人（或直接代表他们采取行动）。归根结底，度量我们的软件流程的目的是帮助人们做出业务决策。了解这个人是谁很重要，包括什么形式的数据能说服他们。尽管最好的研究包括各种方法（从结构化访谈到日志的统计分析等各种方法），但为决策者提供他们需要的数据的时间可能有限。在这些情况下，最好的办法是迎合决策者的要求。他们是否倾向于通过访谈中可以获取到的故事来做出决策？他们是否信任调查结果或日志数据？他们对复杂的统计分析感到满意吗？如果决策者压根就不相信结果的形式，那么度量过程又没有意义。
    在可读性方面，我们对每种编程语言都有一个明确的决策者。有两个语言团队，即Java和C++，积极向我们寻求帮助，而其他团队则在等待，看这些语言先发生什么。决策者相信工程师自我报告的经验，以了解快乐和学习，但决策者希望看到基于日志数据的速度和代码质量的 "硬数字"。这意味着，我们需要对这些指标进行定性和定量分析。这项工作没有一个硬性的截止日期，但如果有变化，有一个内部会议可以用来适时地宣布变更。这个期限给了我们几个月的时间来完成这项工作。

By asking these questions, we find that in many cases, measurement is simply not worthwhile…and that’s OK! There are many good reasons to not measure the impact of a tool or process on productivity. Here are some examples that we’ve seen:

*You can’t afford to change the process/tools right now*  
    There might be time constraints or financial constraints that prevent this. For example, you might determine that if only you switched to a faster build tool, it would save hours of time every week. However, the switchover will mean pausing development while everyone converts over, and there’s a major funding deadline approaching such that you cannot afford the interruption. Engineering trade-offs are not evaluated in a vacuum—in a case like this, it’s important to realize that the broader context completely justifies delaying action on a result.

*Any results will soon be invalidated by other factors*  
    Examples here might include measuring the software process of an organization just before a planned reorganization. Or measuring the amount of technical debt for a deprecated system.  
    The decision maker has strong opinions, and you are unlikely to be able to provide a large enough body of evidence, of the right type, to change their beliefs.  
    This comes down to knowing your audience. Even at Google, we sometimes find people who have unwavering beliefs on a topic due to their past experiences. We have found stakeholders who never trust survey data because they do not believe self-reports. We’ve also found stakeholders who are swayed best by a compelling narrative that was informed by a small number of interviews. And, of course, there are stakeholders who are swayed only by logs analysis. In all cases, we attempt to triangulate on the truth using mixed methods, but if a stakeholder is limited to believing only in methods that are not appropriate for the problem, there is no point in doing the work.

*The results will be used only as vanity metrics to support something you were going to do anyway*  
    This is perhaps the most common reason we tell people at Google not to measure a software process. Many times, people have planned a decision for multiple reasons, and improving the software development process is only one benefit of several. For example, the release tool team at Google once requested a measurement to a planned change to the release workflow system. Due to the nature of the change, it was obvious that the change would not be worse than the current state, but they didn’t know if it was a minor improvement or a large one. We asked the team: if it turns out to only be a minor improvement, would you spend the resources to implement the feature anyway, even if it didn’t look to be worth the investment? The answer was yes! The feature happened to improve productivity, but this was a side effect: it was also more performant and lowered the release tool team’s maintenance burden.  

*The only metrics available are not precise enough to measure the problem and can be confounded by other factors*  
    In some cases, the metrics needed (see the upcoming section on how to identify metrics) are simply unavailable. In these cases, it can be tempting to measure using other metrics that are less precise (lines of code written, for example). However, any results from these metrics will be uninterpretable. If the metric confirms the stakeholders’ preexisting beliefs, they might end up proceeding with their plan without consideration that the metric is not an accurate measure. If it does not confirm their beliefs, the imprecision of the metric itself provides an easy explanation, and the stakeholder might, again, proceed with their plan.

通过问这些问题，我们发现在许多情况下，度量根本不值得……这没有关系！有许多很好的理由不度量一个工具或过程对生产效率的影响。以下是我们看到的一些例子：

*至少在现阶段，你承担不了改变这个过程/工具的成本*  
    可能有时间上的限制或资金上的制约，使之无法进行。例如，你可能确定，只要你切换到一个更快的构建工具，每周就能节省几个小时的时间。然而，转换意味着在每个人都转换的时候暂停开发，而且有一个重要的资金期限即将到来，这样你就无法承受这种中断。工程权衡不是在真空中评估的——在这样的情况下，重要的是要意识到，更广泛的背景完全可以说明推迟对结果采取行动是合理的。

*任何结果很快就会因其他因素而失效*  
    这里的例子可能包括在计划重组之前度量一个组织的软件流程。或者度量一个被废弃的系统的技术债务的数量。  
    决策者有强烈的意见，而你不太可能提供足够多的正确类型的证据，来改变他们的信念。  
    这就需要了解你的受众。即使在谷歌，我们有时也会发现一些人由于他们过去的经验而对某一主题有坚定的信念。我们曾发现一些利益相关者从不相信调查数据，因为他们不相信自我观念。我们也发现一些利益相关者，他们最容易被由少量访谈得出的令人信服的叙述所动摇。当然，也有一些利益相关者只被日志分析所动摇。在所有情况下，我们都试图用混合方法对真相进行三角分析，但如果利益相关者只限于相信不适合问题的方法，那么做这项工作就没有意义。

*结果只能作为浮华的指标，以来支持你一定要做的事情*  
    这也许是我们在谷歌告诉人们不要度量软件过程的最常见的原因。很多时候，人们已经为多个原因规划了一个决策，而改进软件开发过程只是这些决策的一个好处。例如，谷歌的发布工具团队曾经要求对发布工作流程系统的计划变更进行度量。由于变化的性质，很明显，这个变化不会比目前的状态差，但他们不知道这是一个小的改进还是一个大的改进。我们问团队：如果结果只是一个小的改进，无论如何你会花资源来实现这个功能，即使它看起来不值得投资？答案是肯定的! 这个功能碰巧提高了生产效率，但这是一个副作用：它也更具有性能，降低了发布工具团队的维护负担。

*现有可用的度量标准不够精确，无法准确测量问题，且可能受到其他因素的干扰*  
    在某些情况下，所需的指标（见即将到来的关于如何识别指标的章节）根本无法获得。在这些情况下，使用其他不那么精确的指标（例如，编写的代码行）进行度量是很诱人的。然而，这些指标的任何结果都是无法解释的。如果这个指标证实了利益相关者预先存在的观念，他们最终可能会继续执行他们的计划，而不考虑这个指标不是一个准确的度量标准。如果它没有证实他们的观念，那么指标本身的不精确性就提供了一个简单的解释，利益相关者可能再次继续他们的计划。

When you are successful at measuring your software process, you aren’t setting out to prove a hypothesis correct or incorrect; *success means giving a stakeholder the data they need to make a decision*. If that stakeholder won’t use the data, the project is always a failure. We should only measure a software process when a concrete decision will be made based on the outcome. For the readability team, there was a clear decision to be made. If the metrics showed the process to be beneficial, they would publicize the result. If not, the process would be abolished. Most important, the readability team had the authority to make this decision.

当你成功地度量你的软件过程时，你并不是为了证明一个假设的正确与否；*成功意味着给利益相关者提供他们做出决定所需的数据*。如果这个利益相关者不使用这些数据，那么这个项目就是失败的。我们只应该在根据结果做出具体决定的时候才去度量一个软件过程。对于可读性团队来说，有一个明确的决定要做。如果度量标准显示这个过程是有益的，他们将公布这个结果。如果没有，这个过程就会被废除。最重要的是，可读性小组有权力做出这个决定。

> [^2]: It’s worth pointing out here that our industry currently disparages “anecdata,” and everyone has a goal of being “data driven.” Yet anecdotes continue to exist because they are powerful. An anecdote can provide context and narrative that raw numbers cannot; it can provide a deep explanation that resonates with others because it mirrors personal experience. Although our researchers do not make decisions on anecdotes, we do use and encourage techniques such as structured interviews and case studies to deeply understand phenomena and provide context to quantitative data.
>
> 2 在此值得指出的是，我们的行业目前贬低 "轶事数据"，而每个人都有一个 "数据驱动 "的目标。然而，轶事仍然存在，因为它们是强大的。轶事可以提供原始数字无法提供的背景和叙述；它可以提供一个深刻的解释，因为它反映了个人的经验，所以能引起别人的共鸣。虽然我们的研究人员不会根据轶事做出决定，但我们确实使用并鼓励结构化访谈和案例研究等技术，以深入理解现象，并为定量数据提供背景。 
>
> [^3]: Java and C++ have the greatest amount of tooling support. Both have mature formatters and static analysis tools that catch common mistakes. Both are also heavily funded internally. Even though other language teams, like Python, were interested in the results, clearly there was not going to be a benefit for Python to remove readability if we couldn’t even show the same benefit for Java or C++.
>
> 3 Java和C++拥有最大量的工具支持。两者都有成熟的格式化工具和静态分析工具，可以捕捉常见的错误。两者也都有大量的内部资金。即使其他语言团队，如Python，对结果感兴趣，但显然，如果我们连Java或C++都不能显示出同样的好处，那么Python就不会有删除可读性的好处。

## Selecting Meaningful Metrics with Goals and Signals  用目标和信号来选择有意义的度量标准

After we decide to measure a software process, we need to determine what metrics to use. Clearly, lines of code (LOC) won’t do,[^4] but how do we actually measure engineering productivity?

在我们决定度量一个软件过程之后，我们需要确定使用什么指标。显然，代码行（LOC）是不行的，但我们究竟该如何度量工程生产效率呢？

At Google, we use the Goals/Signals/Metrics (GSM) framework to guide metrics creation.

在谷歌，我们使用目标/信号/指标（GSM）框架来指导指标创建。

- A *goal* is a desired end result. It’s phrased in terms of what you want to understand at a high level and should not contain references to specific ways to measure it.
- A signal is how you might know that you’ve achieved the end result. Signals are things we would *like* to measure, but they might not be measurable themselves.
- A *metric* is proxy for a signal. It is the thing we actually can measure. It might not be the ideal measurement, but it is something that we believe is close enough.

- *目标* 是一个期望的最终结果。它是根据你希望在高层次上理解的内容来表述的，不应包含对具体度量方法的引用。。
- *信号* 是指你可能如何得知你已经达到最终结果的方式。信号是我们*想要*度量的东西，但它们本身可能是不可度量的。
- *指标* 是信号的代表。它是我们实际上可以度量的东西。它可能不是理想的度量，但它是我们认为足够接近的东西。

The GSM framework encourages several desirable properties when creating metrics. First, by creating goals first, then signals, and finally metrics, it prevents the *streetlight* *effect*. The term comes from the full phrase “looking for your keys under the streetlight”: if you look only where you can see, you might not be looking in the right place. With metrics, this occurs when we use the metrics that we have easily accessible and that are easy to measure, regardless of whether those metrics suit our needs. Instead, GSM forces us to think about which metrics will actually help us achieve our goals, rather than simply what we have readily available.

GSM框架在创建指标时鼓励几个理想的属性。首先，通过首先创建目标，然后是信号，最后是指标，它可以防止*路灯*效应。这个词来自于 "在路灯下找你的钥匙 "这个完整的短语：如果你只看你能看到的地方，你可能没有找对地方。对于指标来说，当我们使用我们容易获得的、容易度量的指标时，就会出现这种情况，不管这些指标是否适合我们的需求。相反，GSM迫使我们思考哪些指标能真正帮助我们实现目标，而不是简单地考虑我们有哪些现成的指标。

Second, GSM helps prevent both metrics creep and metrics bias by encouraging us to come up with the appropriate set of metrics, using a principled approach, *in advance* of actually measuring the result. Consider the case in which we select metrics without a principled approach and then the results do not meet our stakeholders’ expectations. At that point, we run the risk that stakeholders will propose that we use different metrics that they believe will produce the desired result. And because we didn’t select based on a principled approach at the start, there’s no reason to say that they’re wrong! Instead, GSM encourages us to select metrics based on their ability to measure the original goals. Stakeholders can easily see that these metrics map to their original goals and agree, in advance, that this is the best set of metrics for measuring the outcomes.

第二，GSM通过鼓励我们使用原则性的方法提出适当的指标集，从而有助于防止指标蔓延和指标偏差，从而有助于实际度量结果。考虑这样一种情况，我们在没有原则性方法的情况下选择指标，然后结果不符合我们的利益相关者的期望。在这一点上，我们面临着利益相关者建议我们使用他们认为会产生预期结果的不同指标的风险。而且因为我们一开始并没有基于原则性的方法进行选择，所以没有理由说他们错了！相反，GSM鼓励我们根据度量原始目标的能力选择指标。利益相关者可以很容易地看到这些指标映射到他们的最初的目标，并提前同意这是度量结果的最佳指标集。

Finally, GSM can show us where we have measurement coverage and where we do not. When we run through the GSM process, we list all our goals and create signals for each one. As we will see in the examples, not all signals are going to be measurable and that’s OK! With GSM, at least we have identified what is not measurable. By identifying these missing metrics, we can assess whether it is worth creating new metrics or even worth measuring at all.

最后，GSM可以告诉我们哪里有度量覆盖，哪里没有。当我们运行GSM流程时，我们列出所有的目标，并为每个目标创建信号。正如我们在例子中所看到的，并不是所有的信号都是可度量的，这没关系！通过GSM，至少我们已经确定了什么是可度量的。通过GSM，至少我们已经确定了哪些是不可度量的。通过识别这些缺失的指标，我们可以评估是否值得创建新的指标，甚至是否值得度量。

The important thing is to maintain *traceability*. For each metric, we should be able to trace back to the signal that it is meant to be a proxy for and to the goal it is trying to measure. This ensures that we know which metrics we are measuring and why we are measuring them.

重要的是要保持*可追溯性*。对于每个指标，我们应该能够追溯到它所要代表的信号，以及它所要度量的目标。这可以确保我们知道我们正在度量哪些指标，以及为什么我们要度量它们。

> [^4]: “From there it is only a small step to measuring ‘programmer productivity’ in terms of ‘number of lines of code produced per month.’ This is a very costly measuring unit because it encourages the writing of insipid code, but today I am less interested in how foolish a unit it is from even a pure business point of view. My point today is that, if we wish to count lines of code, we should not regard them as ‘lines produced’ but as ‘lines spent’: the current conventional wisdom is so foolish as to book that count on the wrong side of the ledger.” Edsger Dijkstra, on the cruelty of really teaching computing science, EWD Manuscript 1036.
>
> 4  “从那时起，用‘每月产生的代码行数’来度量‘程序员生产效率’只需一小步。这是一个非常昂贵的度量单位，因为它鼓励编写平淡的代码，但今天我对这个单位的愚蠢程度不感兴趣，甚至从纯商业的角度来看也是如此。我今天的观点是，如果我们希望计算代码的行数，我们不应该将它们视为“生产的行数”，而应该视为“花费的行数”：当前的传统智慧愚蠢到将这些行数记在账本的错误一侧。”Edsger Dijkstra，关于真正教给计算机科学的残酷性，EWD手稿1036。

## Goals  目标

A goal should be written in terms of a desired property, without reference to any metric. By themselves, these goals are not measurable, but a good set of goals is something that everyone can agree on before proceeding onto signals and then metrics.

目标应该根据所需的属性来编写，而不需要参考任何指标。就其本身而言，这些目标是无法度量的，但一组好的目标是每个人都可以在继续进行信号和度量指标之前达成一致的。

To make this work, we need to have identified the correct set of goals to measure in the first place. This would seem straightforward: surely the team knows the goals of their work! However, our research team has found that in many cases, people forget to include all the possible *trade-offs within productivity*, which could lead to mismeasurement.

为了使其发挥作用，我们首先需要确定一套正确的目标来度量。这看起来很简单：团队肯定知道他们工作的目标！但是，我们的研究团队发现，在许多情况下，人们忘记了将所有可能的*权衡因素包括在生产效率中*。然而，我们的研究团队发现，在许多情况下，人们忘记了将所有可能的*生产力内的权衡因素包括在内*，这可能导致错误的度量。

Taking the readability example, let’s assume that the team was so focused on making the readability process fast and easy that it had forgotten the goal about code quality. The team set up tracking measurements for how long it takes to get through the review process and how happy engineers are with the process. One of our teammates proposes the following:  

> I can make your review velocity very fast: just remove code reviews entirely.

以可读性为例，我们假设团队太专注于使可读性过程快速和简单，以至于忘记了关于代码质量的目标。团队设置了跟踪度量，以了解通过审查过程需要多长时间，以及工程师对该过程的满意程度。我们的一个队友提出以下建议：  

> 我可以让你的审查速度变得非常快：只要完全取消代码审查。

Although this is obviously an extreme example, teams forget core trade-offs all the time when measuring: they become so focused on improving velocity that they forget to measure quality (or vice versa). To combat this, our research team divides productivity into five core components. These five components are in trade-off with one another, and we encourage teams to consider goals in each of these components to ensure that they are not inadvertently improving one while driving others downward. To help people remember all five components, we use the mnemonic “QUANTS”:

***Quality** of the code*  
    What is the quality of the code produced? Are the test cases good enough to prevent regressions? How good is an architecture at mitigating risk and changes?

***Attention** from engineers*  
    How frequently do engineers reach a state of flow? How much are they distracted by notifications? Does a tool encourage engineers to context switch?

*Intellectual complexity*  
    How much cognitive load is required to complete a task? What is the inherent complexity of the problem being solved? Do engineers need to deal with unnecessary complexity?

*Tempo and velocity*  
    How quickly can engineers accomplish their tasks? How fast can they push their releases out? How many tasks do they complete in a given timeframe?

*Satisfaction*  
    How happy are engineers with their tools? How well does a tool meet engineers’ needs? How satisfied are they with their work and their end product? Are engineers feeling burned out?

虽然这显然是一个极端的例子，但团队在度量时总是忘记了核心的权衡：他们太专注于提高速度而忘记了度量质量（或者反过来）。为了解决这个问题，我们的研究团队将生产效率分为五个核心部分。这五个部分是相互权衡的，我们鼓励团队考虑每一个部分的目标，以确保他们不会在无意中提高一个部分而使其他部分下降。为了帮助人们记住所有五个组成部分，我们使用了 "QUANTS "的记忆法：

代码的***质量***  
    产生的代码的质量如何？测试用例是否足以预防回归？架构在减轻风险和变化方面的能力如何？

工程师的***关注度***  
    工程师达到流动状态的频率如何？他们在多大程度上被通知分散了注意力？工具是否鼓励工程师进行状态切换？

*知识的复杂性*  
    完成一项任务需要多大的认知负荷？正在解决的问题的内在复杂性是什么？工程师是否需要处理不必要的复杂性？

*节奏和速度*  
    工程师能多快地完成他们的任务？他们能以多快的速度把他们的版本推出去？他们在给定的时间范围内能完成多少任务？

*满意程度*  
    工程师对他们的工具有多满意？工具能在多大程度上满足工程师的需求？他们对自己的工作和最终产品的满意度如何？工程师是否感到筋疲力尽？

Going back to the readability example, our research team worked with the readability team to identify several productivity goals of the readability process:

*Quality of the code*  
    Engineers write higher-quality code as a result of the readability process; they write more consistent code as a result of the readability process; and they contribute to a culture of code health as a result of the readability process.

*Attention from engineers*  
    We did not have any attention goal for readability. This is OK! Not all questions about engineering productivity involve trade-offs in all five areas.

*Intellectual complexity*  
    Engineers learn about the Google codebase and best coding practices as a result of the readability process, and they receive mentoring during the readability process.

*Tempo and velocity*  
    Engineers complete work tasks faster and more efficiently as a result of the readability process.

*Satisfaction*  
    Engineers see the benefit of the readability process and have positive feelings about participating in it.

回到可读性的例子，我们的研究团队与可读性团队合作，确定了可读性过程中的几个生产力目标：

*代码的质量*  
    由于可读性过程，工程师们写出了更高质量的代码；由于可读性过程，他们写出了更一致的代码；由于可读性过程，他们为代码的健康文化做出了贡献。

*来自工程师的关注*  
    我们没有为可读性制定任何关注目标。这是可以的! 并非所有关于工程生产力的问题都涉及所有五个领域的权衡。

*知识复杂性*  
    工程师们通过可读性过程了解谷歌代码库和最佳编码实践，他们在可读性过程中接受指导。

*节奏和速度*  
    由于可读性过程，工程师更快、更有效地完成工作任务。

*满意度*  
    工程师们看到了可读性过程的好处，对参与该过程有积极的感受。

## Signals  信号

A signal is the way in which we will know we’ve achieved our goal. Not all signals are measurable, but that’s acceptable at this stage. There is not a 1:1 relationship between signals and goals. Every goal should have at least one signal, but they might have more. Some goals might also share a signal. Table 7-1 shows some example signals for the goals of the readability process measurement.

通过约定的信号，我们可以知晓某个目标已被实现。并非所有的信号都是可度量的，但这在现阶段是可以接受的。信号和目标之间不是1:1的关系。每个目标应该至少有一个信号，但它们可能有更多的信号。有些目标也可能共享一个信号。表7-1显示了可读性过程度量的目标的一些信号示例。

*Table 7-1. Signals and goals*  *表7-1. 信号和目标 *

| Goals                                                        | Signals                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Engineers write higher-quality code as a result of the readability process. | Engineers who have been granted readability judge their code to be of higher quality than engineers who have not been granted readability. The readability process has a positive impact on code quality. |
| Engineers learn about the Google codebase and best coding practices as a result of the readability process. | Engineers report learning from the readability process.      |
| Engineers receive mentoring during the readability process.  | Engineers report positive interactions with experienced Google engineers who serve as reviewers during the readability process. |
| Engineers receive mentoring during the readability process.<br/>Engineers complete work tasks faster and more efficiently as a result of the readability process.<br/><br/><br/>Engineers see the benefit of the readability process and have positive feelings about participating in it. | Engineers who have been granted readability judge themselves to be more productive than engineers who have not been granted readability. Changes written by engineers who have been granted readability are faster to review than changes written by engineers who have not been granted readability.<br/>Engineers view the readability process as being worthwhile. |

| 目标                                                         | 信号                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 由于可读性过程，工程师们会写出更高质量的代码。               | 被授予可读性的工程师判断他们的代码比没有被授予可读性的工程师的质量更高。可读性过程对代码质量有积极影响。 |
| 工程师们通过可读性过程了解谷歌的代码库和最佳编码实践。       | 工程师们报告了从可读性过程中的学习情况。                     |
| 工程师在可读性过程中接受指导。                               | 工程师们报告了与经验丰富的谷歌工程师的积极互动，他们在可读性过程中担任审查员。 |
| 工程师在可读性过程中得到指导。<br/><br/>由于可读性过程，工程师们更快、更有效地完成工作任务。<br/><br/>工程师们看到了可读性过程的好处，并对参与这一过程有积极的感受。 | 被授予可读性的工程师判断自己比没有被授予可读性的工程师更有生产效率。被授予可读性的工程师所写的修改比未被授予可读性的工程师所写的修改审查得更快。<br/><br/>工程师认为可读性过程是值得的。 |


## Metrics  指标

Metrics are where we finally determine how we will measure the signal. Metrics are not the signal themselves; they are the measurable proxy of the signal. Because they are a proxy, they might not be a perfect measurement. For this reason, some signals might have multiple metrics as we try to triangulate on the underlying signal.

指标是我们最终确定如何计量、评判信号的标准。指标不是信号本身；它们是信号的可度量的代表。因为它们是一个代表，所以它们可能不是一个完美的度量。出于这个原因，我们试图对基本信号进行三角度量分析，一些信号可能有多个指标。

For example, to measure whether engineers’ code is reviewed faster after readability, we might use a combination of both survey data and logs data. Neither of these metrics really provide the underlying truth. (Human perceptions are fallible, and logs metrics might not be measuring the entire picture of the time an engineer spends reviewing a piece of code or can be confounded by factors unknown at the time, like the size or difficulty of a code change.) However, if these metrics show different results, it signals that possibly one of them is incorrect and we need to explore further. If they are the same, we have more confidence that we have reached some kind of truth.

例如，为了度量工程师的代码在可读性之后是否审查得更快，我们可能会同时使用调查数据和日志数据。这两个指标都没有真正提供基本的事实。(人类的感知是易变的，而日志指标可能没有度量出工程师审查一段代码所花时间的全貌，或者可能被当时未知的因素所混淆，比如代码修改的大小或难度)。然而，如果这些指标显示出不同的结果，就表明可能其中一个指标是不正确的，我们需要进一步探索。如果它们是一样的，我们就更有信心，我们已经达到了某种真相。

Additionally, some signals might not have any associated metric because the signal might simply be unmeasurable at this time. Consider, for example, measuring code quality. Although academic literature has proposed many proxies for code quality, none of them have truly captured it. For readability, we had a decision of either using a poor proxy and possibly making a decision based on it, or simply acknowledging that this is a point that cannot currently be measured. Ultimately, we decided not to capture this as a quantitative measure, though we did ask engineers to self-rate their code quality.

此外，一些信号可能没有任何相关的指标，因为信号可能在这个时候根本无法度量。例如，考虑度量代码质量。尽管学术文献已经提出了许多代码质量的代用指标，但没有一个能真正抓住它。对于可读性，我们必须做出决定，要么使用一个糟糕的代表，并可能根据它做出决定，要么干脆承认这是一个目前无法度量的点。最终，我们决定不把它作为一个量化的指标，尽管我们确实要求工程师对他们的代码质量进行自我评价。

Following the GSM framework is a great way to clarify the goals for why you are measuring your software process and how it will actually be measured. However, it’s still possible that the metrics selected are not telling the complete story because they are not capturing the desired signal. At Google, we use qualitative data to validate our metrics and ensure that they are capturing the intended signal.

遵循GSM框架是一个很好的方法，可以明确你为什么要度量你的软件过程的目标，以及它将如何被实际度量。然而，仍然有可能选择的指标没有说明全部情况，因为它们没有捕获所需的信号。在谷歌，我们使用定性数据来验证我们的指标，并确保它们捕捉到了预期的信号。

## Using Data to Validate Metrics  使用数据验证指标

As an example, we once created a metric for measuring each engineer’s median build latency; the goal was to capture the “typical experience” of engineers’ build latencies. We then ran an *experience sampling study*. In this style of study, engineers are interrupted in context of doing a task of interest to answer a few questions. After an engineer started a build, we automatically sent them a small survey about their experiences and expectations of build latency. However, in a few cases, the engineers responded that they had not started a build! It turned out that automated tools were starting up builds, but the engineers were not blocked on these results and so it didn’t “count” toward their “typical experience.” We then adjusted the metric to exclude such builds.[^5]

举个例子，我们曾经创建了一个度量每个工程师平均构建延迟中位数的指标；目的是为了捕捉工程师构建延迟的 "典型经验"。然后我们进行了一个*经验抽样研究*。在这种研究方式中，工程师在做一项感兴趣的任务时被打断，以回答一些问题。在工程师开始构建后，我们自动向他们发送了一份小型调查，了解他们对构建延迟的经验和期望。然而，在少数情况下，工程师们回答说他们没有开始构建！结果发现，自动化工具正在启动。事实证明，自动化工具正在启动构建，但工程师们并没有被这些结果所阻碍，因此它并没有“计入”他们的“典型经验”。然后我们调整了指标，排除了这种构建。

Quantitative metrics are useful because they give you power and scale. You can measure the experience of engineers across the entire company over a large period of time and have confidence in the results. However, they don’t provide any context or narrative. Quantitative metrics don’t explain why an engineer chose to use an antiquated tool to accomplish their task, or why they took an unusual workflow, or why they circumvented a standard process. Only qualitative studies can provide this information, and only qualitative studies can then provide insight on the next steps to improve a process.

定量指标是有用的，因为它们给你能力和规模。你可以在很长一段时间内度量整个公司的工程师的经验，并对结果有信心。然而，它们并不提供任何背景或叙述。定量指标不能解释为什么一个工程师选择使用一个过时的工具来完成他们的任务，或者为什么他们采取了一个不寻常的工作流程，或者为什么他们绕过了一个标准流程。只有定性研究才能提供这些信息，也只有定性研究才能为改进流程的下一步提供洞察力。

> [^5]:	It has routinely been our experience at Google that when the quantitative and qualitative metrics disagree, it was because the quantitative metrics were not capturing the expected result.
>
> 5 我们在谷歌的常规经验是，当定量指标和定性指标不一致时，是因为定量指标没有捕捉到预期的结果。

Consider now the signals presented in Table 7-2. What metrics might you create to measure each of those? Some of these signals might be measurable by analyzing tool and code logs. Others are measurable only by directly asking engineers. Still others might not be perfectly measurable—how do we truly measure code quality, for example?

现在考虑一下表7-2中提出的信号。你可以创建什么指标来度量其中的每一个？其中一些信号可能是可以通过分析工具和代码日志来度量的。其他的只能通过直接询问工程师来度量。还有一些可能不是完全可度量的——例如，我们如何真正度量代码质量？

Ultimately, when evaluating the impact of readability on productivity, we ended up with a combination of metrics from three sources. First, we had a survey that was specifically about the readability process. This survey was given to people after they completed the process; this allowed us to get their immediate feedback about the process. This hopefully avoids recall bias,[^6] but it does introduce both recency bias[^7] and sampling bias.[^8] Second, we used a large-scale quarterly survey to track items that were not specifically about readability; instead, they were purely about metrics that we expected readability should affect. Finally, we used fine-grained logs metrics from our developer tools to determine how much time the logs claimed it took engineers to complete specific tasks.[^9] Table 7-2 presents the complete list of metrics with their corresponding signals and goals.

最终，在评估可读性对生产力的影响时，我们最终综合了三个方面的指标。首先，我们有一个专门针对可读性过程的调查。这个调查是在人们完成了这个过程之后进行的；这使我们能够得到他们对这个过程的即时反馈。这有望避免回忆偏差，但它确实引入了近期偏差和抽样偏差。其次，我们使用大规模的季度调查来追踪那些不是专门关于可读性的项目；相反，它们纯粹是关于我们预期可读性应该影响的指标。最后，我们使用了来自我们的开发者工具的细粒度的日志指标来确定日志中声称的工程师完成特定任务所需的时间。表7-2列出了完整的指标清单及其相应的信号和目标。

*Table 7-2. Goals, signals, and metrics*  *表7-2. 目标、信号和指标*

| QUANTS                       | Goal                                                         | Signal                                                       | Metric                                                       |
| ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Qu**ality of the code      | Engineers write higherquality code as a result of the readability process. | Engineers who have been granted readability judge their code to be of higher quality than engineers who have not been granted readability.<br/>The readability process has a positive impact on code quality. | Quarterly Survey: Proportion ofengineers who report being satisfied with the quality of their own code<br/><br/>Readability Survey: Proportion of engineers reporting that readability reviews have no impact or negative impact on code quality |
|                              |                                                              |                                                              | Readability Survey: Proportionof engineers reporting thatparticipating in the readability process has improved codequality for their team |
|                              | Engineers write more consistent code as a result of the readability process. | Engineers are given consistent feedback and direction in code reviews by readability reviewers as a part of the readability process. | Readability Survey: Proportion of engineers reporting inconsistency in readability reviewers’ comments and readability criteria. |
|                              | Engineers contribute to a culture of code health as a result of the readability process. | Engineers who have been granted readability regularly comment on style and/or readability issues in code reviews. | Readability Survey: Proportion of engineers reporting that they regularly comment on style and/or readability issues in code reviews |
| **A**ttention from engineers | n/a                                                          | n/a                                                          | n/a                                                          |
| I**n**tellectual             | Engineers learn about the Google codebase and best coding practices as a result of the readability process. | Engineers report learning from the readability process.      | Readability Survey: Proportion of engineers reporting that they learned about four relevant topics |
|                              |                                                              |                                                              | Readability Survey: Proportion of engineers reporting that learning or gaining expertise was a strength of the readability process |
|                              | Engineers receive mentoring during the readability process.  | Engineers report positive interactions with experienced Google engineers who serve as reviewers during the readability process. | Readability Survey: Proportion of engineers reporting that working with readability reviewers was a strength of the readability process |
| **T**empo/velocity           | Engineers are more productive as a result of the readability process. | Engineers who have been granted readability judge themselves to be more productive than engineers who have not been granted readability. | Quarterly Survey: Proportion of engineers reporting that they’re highly productive |
|                              |                                                              | Engineers report that completing the readability process positively affects their engineering velocity. | Readability Survey: Proportion of engineers reporting that not having readability reduces team engineering velocity |
|                              |                                                              | Changelists (CLs) written by engineers who have been granted readability are faster to review than CLs written by engineers who have not been granted readability. | Logs data: Median review time for CLs from authors with readability and without readability |
|                              |                                                              | CLs written by engineers who have been granted readability are easier to shepherd through code review than CLs written by engineers who have not been granted readability. | Logs data: Median shepherding time for CLs from authors with readability and without readability |
|                              |                                                              | CLs written by engineers who have been granted readability are faster to get through code review than CLs written by engineers who have not been granted readability. | Logs data: Median time to submit for CLs from authors with readability and without readability |
|                              |                                                              | The readability process does not have a negative impact on engineering velocity. | Readability Survey: Proportion of engineers reporting that the readability process negatively impacts their velocity |
|                              |                                                              |                                                              | Readability Survey: Proportion of engineers reporting that readability reviewers responded promptly |
|                              |                                                              |                                                              | Readability Survey: Proportion of engineers reporting that timeliness of reviews was a strength of the readability process |
| **S**atisfaction             | Engineers see the benefit of the readability process and have positive feelings about participating in it. | Engineers view the readability process as being an overall positive experience. | Readability Survey: Proportion of engineers reporting that their experience with the readability process was positive overall |
|                              |                                                              | Engineers view the readability process as being worthwhile   | Readability Survey: Proportion of engineers reporting that the readability process is worthwhile |
|                              |                                                              |                                                              | Readability Survey: Proportion of engineers reporting that the quality of readability reviews is a strength of the process |
|                              |                                                              |                                                              | Readability Survey: Proportion of engineers reporting that thoroughness is a strength of the process |
|                              |                                                              | Engineers do not view the readability process as frustrating. | Readability Survey: Proportion of engineers reporting that the readability process is uncertain, unclear, slow, or frustrating |
|                              |                                                              |                                                              | Quarterly Survey: Proportion of engineers reporting that they’re satisfied with their own engineering velocity |



| QUANTS         | 目标                                                         | 信号                                                         | 指标                                                         |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **代码**的质量 | 由于可读性过程，工程师们会写出更高质量的代码。               | 被授予可读性的工程师判断他们的代码比没有被授予可读性的工程师的质量更高。<br/><br/>可读性过程对代码质量有积极影响。 | 季度调查。对自己的代码质量表示满意的工程师的比例<br/><br/>可读性调查。报告可读性审查对代码质量没有影响或有负面影响的工程师的比例 |
|                |                                                              |                                                              | 可读性调查。报告说参与可读性过程改善了他们团队的代码质量的工程师的比例 |
|                | 作为可读性过程的结果，工程师们写出的代码更加一致。           | 工程师在代码审查中由可读性审查员提供一致的反馈和指导，这是可读性过程的一部分。 | 可读性调查。报告可读性审查员的意见和可读性标准不一致的工程师比例。 |
|                | 工程师对代码健康文化的贡献是可读性过程的结果。               | 被授予可读性的工程师经常在代码审查中评论风格和/或可读性问题。 | 可读性调查：报告他们经常在代码审查中评论风格和/或可读性问题的工程师的比例 |
| 工程师的关注   | 不适用                                                       | 不适用                                                       | 不适用                                                       |
| 知识           | 工程师们通过可读性过程了解谷歌的代码库和最佳编码实践。       | 工程师们报告了从可读性过程中的学习情况。                     | 可读性调查。报告说他们了解了四个相关主题的工程师比例         |
|                |                                                              |                                                              | 可读性调查：报告学习或获得专业知识是可读性过程的优势的工程师比例 |
|                | 工程师在可读性过程中接受指导。                               | 工程师们报告说，在可读性过程中，他们与作为审查员的经验丰富的谷歌工程师进行了积极的互动。 | 可读性调查：报告说与可读性审查员一起工作是可读性过程的优势的工程师的比例 |
| 节奏/速度      | 由于可读性过程，工程师们的工作效率更高。                     | 被授予可读性的工程师判断自己比没有被授予可读性的工程师更有生产力。 | 季度调查：报告他们具有高生产力的工程师的比例                 |
|                |                                                              | 工程师们报告说，完成可读性过程对他们的工程速度有积极的影响。 | 可读性调查：报告不具备可读性会降低团队工程速度的工程师比例   |
|                |                                                              | 由被授予可读性的工程师编写的变更列表（CLs）比由未被授予可读性的工程师编写的变更列表审查得更快。 | 日志数据：有可读性和无可读性的作者所写的CL的审查时间中位数   |
|                |                                                              | 由被授予可读性的工程师编写的CL比由未被授予可读性的工程师编写的CL更容易通过代码审查。 | Logs数据：具备可读性和不具备可读性的作者编写的CL的指导时间的中位数 |
|                |                                                              | 由被授予可读性的工程师编写的CL比由未被授予可读性的工程师编写的CL更快地通过代码审查。 | 日志数据：具有可读性和不具有可读性的作者的CL提交时间的中位数 |
|                |                                                              | 可读性过程不会对工程速度产生负面影响。                       | 可读性调查：报告可读性过程对其速度有负面影响的工程师比例     |
|                |                                                              |                                                              | 可读性调查：报告可读性审查员及时回复的工程师比例             |
|                |                                                              |                                                              | 可读性调查：可读性调查：报告审查的及时性是可读性过程的优势的工程师比例 |
| 满意度         | 工程师们看到了可读性过程的好处，并对参与这一过程有积极的感受。 | 工程师们认为可读性过程是一个总体上积极的经历               | 可读性调查：报告说他们在可读性过程中的经验总体上是积极的工程师的比例 |
|                |                                                              | 工程师认为可读性过程是值得的                                 | 可读性调查：报告说可读性过程是值得的工程师比例               |
|                |                                                              |                                                              | 可读性调查：报告称可读性审查质量是流程优势的工程师比例       |
|                |                                                              |                                                              | 可读性调查：报道称彻底性是流程的优势的工程师比例             |
|                |                                                              | 工程师不认为可读性过程是令人沮丧的。                         | 可读性调查：报告说可读性过程不确定、不清楚、缓慢或令人沮丧的工程师的比例 |
|                |                                                              |                                                              | 季度调查：报告他们对自己的工程速度感到满意的工程师的比例     |



> [^6]:	Recall bias is the bias from memory. People are more likely to recall events that are particularly interesting or frustrating.
>
> 6 回忆偏差是来自记忆的偏差。人们更愿意回忆那些特别有趣或令人沮丧的事件。
>
> [^7]:	Recency bias is another form of bias from memory in which people are biased toward their most recent experience. In this case, as they just successfully completed the process, they might be feeling particularly good about it.
>
> 7 近期偏见是另一种形式的来自记忆的偏见，即人们偏向于最近的经历。在这种情况下，由于他们刚刚成功地完成了这个过程，他们可能会感觉特别好。
>
> [^8]:	Because we asked only those people who completed the process, we aren’t capturing the opinions of those who did not complete the process.
>
> 8 因为我们只问了那些完成过程的人，所以我们没有捕捉到那些没有完成过程的人的意见。
>
> [^9]:	There is a temptation to use such metrics to evaluate individual engineers, or perhaps even to identify high and low performers. Doing so would be counterproductive, though. If productivity metrics are used for performance reviews, engineers will be quick to game the metrics, and they will no longer be useful for measuring and improving productivity across the organization. The only way to make these measurements work is to let go of the idea of measuring individuals and embrace measuring the aggregate effect.
>
> 9 有一种诱惑，就是用这样的指标来评价个别的工程师，甚至可能用来识别高绩效和低绩效的人。不过，这样做会适得其反。如果生产效率指标被用于绩效评估，工程师们就会很快学会操弄这些指标，它们将不再对度量和提高整个组织的生产效率有用。让这些指标发挥作用的唯一方法是，不将其用于度量个体，而是接受度量总体效果。

## Taking Action and Tracking Results  采取行动并跟踪结果

Recall our original goal in this chapter: we want to take action and improve productivity. After performing research on a topic, the team at Google always prepares a list of recommendations for how we can continue to improve. We might suggest new features to a tool, improving latency of a tool, improving documentation, removing obsolete processes, or even changing the incentive structures for the engineers. Ideally, these recommendations are “tool driven”: it does no good to tell engineers to change their process or way of thinking if the tools do not support them in doing so. We instead always assume that engineers will make the appropriate trade-offs if they have the proper data available and the suitable tools at their disposal.

回顾我们在本章中的最初目标：我们希望采取行动，提高生产效率。在对某个主题进行研究之后，谷歌的团队总是准备一份建议清单，说明我们可以如何继续改进。我们可能会建议给一个工具增加新的功能，改善工具的延迟，改善文档，删除过时的流程，甚至改变工程师的激励结构。理想情况下，这些建议是 "工具驱动"的：如果工具不支持工程师改变他们的流程或思维方式，那么告诉他们这样做是没有用的。相反，我们总是假设，如果工程师有适当的数据和合适的工具可以使用，他们会做出适当的权衡。

For readability, our study showed that it was overall worthwhile: engineers who had achieved readability were satisfied with the process and felt they learned from it. Our logs showed that they also had their code reviewed faster and submitted it faster, even accounting for no longer needing as many reviewers. Our study also showed places for improvement with the process: engineers identified pain points that would have made the process faster or more pleasant. The language teams took these recommendations and improved the tooling and process to make it faster and to be more transparent so that engineers would have a more pleasant experience.

就可读性而言，我们的研究表明，总体上是值得的：实现了可读性的工程师对这一过程感到满意，并认为他们从中学到了东西。我们的记录显示，他们的代码审查得更快，提交得也更快，甚至不再需要那么多的审查员。我们的研究还显示了过程中需要改进的地方：工程师们发现了可以使过程更快、更愉快的痛点。语言团队采纳了这些建议，并改进了工具和流程，使其更快、更透明，从而使工程师有一个更愉快的体验。

## Conclusion  总结

At Google, we’ve found that staffing a team of engineering productivity specialists has widespread benefits to software engineering; rather than relying on each team to chart its own course to increase productivity, a centralized team can focus on broad- based solutions to complex problems. Such “human-based” factors are notoriously difficult to measure, and it is important for experts to understand the data being analyzed given that many of the trade-offs involved in changing engineering processes are difficult to measure accurately and often have unintended consequences. Such a team must remain data driven and aim to eliminate subjective bias.

在谷歌，我们发现配备一个工程生产效率专家团队对软件工程有广泛的好处；与其依靠每个团队制定自己的路线来提高生产效率，一个集中的团队可以专注于复杂问题的广泛解决方案。这种 "以人为本"的因素是出了名的难以度量，而且鉴于改变工程流程所涉及的许多权衡都难以准确度量，而且往往会产生意想不到的后果，因此专家们必须了解正在分析的数据。这样的团队必须保持数据驱动，旨在消除主观偏见。

## TL;DRs  内容提要

- Before measuring productivity, ask whether the result is actionable, regardless of whether the result is positive or negative. If you can’t do anything with the result, it is likely not worth measuring.
- Select meaningful metrics using the GSM framework. A good metric is a reasonable proxy to the signal you’re trying to measure, and it is traceable back to your original goals.
- Select metrics that cover all parts of productivity (QUANTS). By doing this, you ensure that you aren’t improving one aspect of productivity (like developer velocity) at the cost of another (like code quality).
- Qualitative metrics are metrics, too! Consider having a survey mechanism for tracking longitudinal metrics about engineers’ beliefs. Qualitative metrics should also align with the quantitative metrics; if they do not, it is likely the quantitative metrics that are incorrect.
- Aim to create recommendations that are built into the developer workflow and incentive structures. Even though it is sometimes necessary to recommend additional training or documentation, change is more likely to occur if it is built into the developer’s daily habits.

- 在度量生产效率之前，要问结果是否可操作，无论结果是积极还是消极。如果你对这个结果无能为力，它很可能不值得度量。
- 使用GSM框架选择有意义的度量标准。一个好的指标是你试图度量的信号的合理代理，而且它可以追溯到你的原始目标。
- 选择涵盖生产效率所有部分的度量标准（QUANTS）。通过这样做，你可以确保你不会以牺牲另一个方面（如代码质量）为代价来改善生产力的一个方面（如开发人员的速度）。
- 定性指标也是指标。考虑有一个调查机制来跟踪关于工程师信念的纵向指标。定性指标也应该与定量指标一致；如果它们不一致，很可能是定量指标不正确。
- 争取创建内置于开发人员工作流程和激励结构的建议。即使有时有必要推荐额外的培训或文档，但如果将其纳入开发人员的日常习惯，则更有可能发生变化。
