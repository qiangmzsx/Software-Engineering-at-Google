**CHAPTER 14**

# Larger Testing

# 第十四章 大型测试

**Written by  Written by Joseph Graves**

**Edited by Lisa Carey**

In previous chapters, we have recounted how a testing culture was established at Google and how small unit tests became a fundamental part of the developer workflow. But what about other kinds of tests? It turns out that Google does indeed use many larger tests, and these comprise a significant part of the risk mitigation strategy necessary for healthy software engineering. But these tests present additional challenges to ensure that they are valuable assets and not resource sinks. In this chapter, we’ll discuss what we mean by “larger tests,” when we execute them, and best practices for keeping them effective.

在前几章中，我们已经讲述了测试文化是如何在Google建立的，以及小型单元测试是如何成为开发人员工作流程的基本组成部分。那么其他类型的测试呢？事实证明，Google确实使用了许多大型测试，这些测试构成了健康的软件工程所需的风险缓解策略的重要组成部分。但是想要确保它们是有价值的资产而不是资源黑洞，那么这些测试面临了更多的挑战。在这一章中，我们将讨论什么是 "大型测试"，什么时候执行这些测试，以及保持其有效性的最佳做法。

## What Are Larger Tests? 什么是大型测试？

As mentioned previously, Google has specific notions of test size. Small tests are restricted to one thread, one process, one machine. Larger tests do not have the same restrictions. But Google also has notions of test scope. A unit test necessarily is of smaller scope than an integration test. And the largest-scoped tests (sometimes called end-to-end or system tests) typically involve several real dependencies and fewer test doubles.

如前所述，谷歌对测试规模有特定的概念。小型测试仅限于单线程、单进程、单服务器。较大的测试没有相同的限制。但谷歌也有测试范围的概念。单元测试的范围必然比集成测试的范围小。而最大范围的测试（有时被称为端到端或系统测试）通常涉及多个实际依赖项和较少的测试替身。（`Test Double`是在Martin Fowler的文章[Test Double](https://martinfowler.com/bliki/TestDouble.html)中，Gerard Meszaros提出了这个概念。虽然是06年的文章了，但里面的概念并不过时。这篇文章提到`Test Double`只是一个通用的词，代表为了达到测试目的并且减少被测试对象的依赖，使用“替身”代替一个真实的依赖对象，从而保证了测试的速度和稳定性。统一翻译为测试替代）

Larger tests are many things that small tests are not. They are not bound by the same constraints; thus, they can exhibit the following characteristics:
- They may be slow. Our large tests have a default timeout of 15 minutes or 1 hour, but we also have tests that run for multiple hours or even days.
- They may be nonhermetic. Large tests may share resources with other tests and traffic.
- They may be nondeterministic. If a large test is nonhermetic, it is almost impossible to guarantee determinism: other tests or user state may interfere with it.

较大的测试有许多是小型测试所不具备的内容。它们受的约束不同；因此，它们可以表现出以下特征：
- 它们可能很慢。我们的大型测试的默认时长时间为15分钟或1小时，但我们也有运行数小时甚至数天的测试。
- 它们可能是不封闭的。大型测试可能与其他测试和流量共享资源。
- 它们可能是不确定的。如果大型测试是非密封的，则几乎不可能保证确定性：其他测试或用户状态可能会干扰它。

So why have larger tests? Reflect back on your coding process. How do you confirm that the programs you write actually work? You might be writing and running unit tests as you go, but do you find yourself running the actual binary and trying it out yourself? And when you share this code with others, how do they test it? By running your unit tests, or by trying it out themselves?

那么，为什么要进行大型测试？回想一下你的编码过程。你是如何确认你写的程序真的能工作的？你可能边写边运行单元测试，但你是否发现自己在运行实际的二进制文件并亲自体验？而当你与他人分享这些代码时，他们是如何测试的呢？是通过运行你的单元测试，还是通过自己体验？

Also, how do you know that your code continues to work during upgrades? Suppose that you have a site that uses the Google Maps API and there’s a new API version. Your unit tests likely won’t help you to know whether there are any compatibility issues. You’d probably run it and try it out to see whether anything broke.

另外，你怎么知道你的代码在升级时还能继续工作？假设你有一个使用谷歌地图API的网站，有一个新的API版本。你的单元测试很可能无法帮助你知道是否有任何兼容性问题。你可能会运行它，试一试，看看是否有什么故障。

Unit tests can give you confidence about individual functions, objects, and modules, but large tests provide more confidence that the overall system works as intended. And having actual automated tests scales in ways that manual testing does not.

单元测试可以让你对单个功能、对象和模块有信心，但大型测试可以让你对整个系统按预期工作更有信心。并且拥有实际的自动化测试能以手动测试无法比拟的方式扩展。

### Fidelity 仿真度

The primary reason larger tests exist is to address *fidelity*. Fidelity is the property by which a test is reflective of the real behavior of the system under test (SUT).

大型测试存在的主要原因是为了解决仿真度问题。仿真度是测试反映被测系统（SUT）真实行为的属性。

One way of envisioning fidelity is in terms of the environment. As [Figure 14-1 ](#_bookmark1192)illustrates, unit tests bundle a test and a small portion of code together as a runnable unit, which ensures the code is tested but is very different from how production code runs. Production itself is, naturally, the environment of highest fidelity in testing. There is also a spectrum of interim options. A key for larger tests is to find the proper fit, because increasing fidelity also comes with increasing costs and (in the case of production) increasing risk of failure.

一种设想仿真度的方法是在环境方面。如图14-1所示，单元测试将测试和一小部分代码捆绑在一起作为一个可运行的单元，这确保了代码得到测试，但与生产代码的运行方式有很大不同。产品本身才是测试中仿真度最高的环境。也有一系列的临时选项。大型测试的一个关键是要找到适当的契合点，因为提高仿真度也伴随着成本的增加和（在线上的情况下）故障风险的增加。

![Figure 14-1](./images/Figure%2014-1.png)

*Figure 14-1. Scale of increasing fidelity* *图14-1 环境仿真度递增的尺度*

Tests can also be measured in terms of how faithful the test content is to reality. Many handcrafted, large tests are dismissed by engineers if the test data itself looks unrealistic. Test data copied from production is much more faithful to reality (having been captured that way), but a big challenge is how to create realistic test traffic *before* launching the new code. This is particularly a problem in artificial intelligence (AI), for which the “seed” data often suffers from intrinsic bias. And, because most data for unit tests is handcrafted, it covers a narrow range of cases and tends to conform to the biases of the author. The uncovered scenarios missed by the data represent a fidelity gap in the tests.

测试也可以用测试内容对现实的仿真度程度来衡量。如果测试数据本身看起来不真实，许多手工配置的大型测试就会被工程师摒弃。从生产中复制的测试数据仿真度更高（以这种方式捕获），但一个很大的挑战是如何在*启动新代码之前*创建真实的测试流量。这在人工智能（AI）中尤其是一个问题，因为 "种子 "数据经常受到内在偏见的影响。而且，由于大多数单元测试的数据是手工配置的，它涵盖的案例范围很窄，并倾向于符合作者的偏见。数据所遗漏的场景代表了测试中的仿真度差距。

### Common Gaps in Unit Tests 单元测试中常见的问题

Larger tests might also be necessary where smaller tests fail. The subsections that follow present some particular areas where unit tests do not provide good risk mitigation coverage.

如果较小的测试失败，也可能需要进行较大的测试。下面的小节介绍了单元测试无法提供良好风险缓解覆盖一些特定领域的示例。

#### Unfaithful doubles 仿真度不足的测试替代

A single unit test typically covers one class or module. Test doubles (as discussed in [Chapter 13](#_bookmark1056)) are frequently used to eliminate heavyweight or hard-to-test dependencies. But when those dependencies are replaced, it becomes possible that the replacement and the doubled thing do not agree.

一个单元测试通常覆盖一个类或模块。测试替代（如第13章所讨论的）经常被用来消除重量级或难以测试的依赖项。但是当这些依赖关系被替换时，就有可能出现替换后的东西和被替换的东西不匹配·的情况。

Almost all unit tests at Google are written by the same engineer who is writing the unit under test. When those unit tests need doubles and when the doubles used are mocks, it is the engineer writing the unit test defining the mock and its intended behavior. But that engineer usually did *not* write the thing being mocked and can be misinformed about its actual behavior. The relationship between the unit under test and a given peer is a behavioral contract, and if the engineer is mistaken about the actual behavior, the understanding of the contract is invalid.

在谷歌，几乎所有的单元测试都是由编写被测单元的工程师编写的。当这些单元测试需要替代时，当使用的替代是模拟时，是编写单元测试的工程师在定义模拟和它的预期行为。但该工程师通常*没有*写被模拟的东西，因此可能对其实际行为有误解。被测单元与给定对等方之间的关系是一种行为契约，如果工程师对实际行为有误解，则对契约的理解无效。

Moreover, mocks become stale. If this mock-based unit test is not visible to the author of the real implementation and the real implementation changes, there is no signal that the test (and the code being tested) should be updated to keep up with the changes.

此外，模拟会变得过时。如果实际实现的作者看不到这个基于模拟的单元测试，并且实际实现发生了变化，那么就没有信号表明应该更新测试（以及正在测试的代码）以跟上变化。

Note that, as mentioned in [Chapter 13], if teams provide fakes for their own services, this concern is mostly alleviated.

请注意，正如在第13章中提到的，如果团队为他们自己的服务提供模拟，这种担忧大多会得到缓解。

#### Configuration issues 配置问题

Unit tests cover code within a given binary. But that binary is typically not completely self-sufficient in terms of how it is executed. Usually a binary has some kind of deployment configuration or starter script. Additionally, real end-user-serving production instances have their own configuration files or configuration databases.

单元测试涵盖了给定二进制中的代码。但该二进制文件在如何执行方面通常不是完全自洽的。通常情况下，二进制文件有某种部署配置或启动脚本。此外，真正为终端用户服务的生产实例有它们自己的配置文件或配置数据库。

If there are issues with these files or the compatibility between the state defined by these stores and the binary in question, these can lead to major user issues. Unit tests alone cannot verify this compatibility.[^1] Incidentally, this is a good reason to ensure that your configuration is in version control as well as your code, because then, changes to configuration can be identified as the source of bugs as opposed to introducing random external flakiness and can be built in to large tests.

如果这些文件存在问题，或者这些存储定义的状态与有问题的二进制文件之间存在兼容性问题，则可能会导致重大的用户故障。单元测试不能验证这种兼容性。顺便说一下，这是一个很好的理由，确保你的配置和你的代码一样在版本控制中，因为这样，配置的变更可以被识别为bug的来源，而不是引入随机的外部碎片，并且可以在大型测试中构建。

At Google, configuration changes are the number one reason for our major outages. This is an area in which we have underperformed and has led to some of our most embarrassing bugs. For example, there was a global Google outage back in 2013 due to a bad network configuration push that was never tested. Configurations tend to be written in configuration languages, not production code languages. They also often have faster production rollout cycles than binaries, and they can be more difficult to test. All of these lead to a higher likelihood of failure. But at least in this case (and others), configuration was version controlled, and we could quickly identify the culprit and mitigate the issue.

在谷歌，配置变更是我们重大故障的头号原因。这是一个我们表现不佳的领域，并导致了我们一些最尴尬的错误。例如，2013年，由于一次从未测试过的糟糕网络配置推送，谷歌出现了一次全球停机。它们通常也比二进制文件具有更快的生产部署周期，而且它们可能更难测试。所有这些都会导致更高的失败可能性。但至少在这种情况下（和其他情况下），配置是由版本控制的，我们可以快速识别故障并缓解问题。

> [^1]:	See “Continuous Delivery” on page 483 and Chapter 25 for more information.
>
> 1   有关更多信息，请参见第483页和第25章的“连续交付”。

#### Issues that arise under load 高负载导致的问题

At Google, unit tests are intended to be small and fast because they need to fit into our standard test execution infrastructure and also be run many times as part of a frictionless developer workflow. But performance, load, and stress testing often require sending large volumes of traffic to a given binary. These volumes become difficult to test in the model of a typical unit test. And our large volumes are big, often thousands or millions of queries per second (in the case of ads, [real-time bidding](https://oreil.ly/brV5-))!

在谷歌，单元测试的目的是小而快，因为它们需要适配标准测试执行基础设施，也可以作为顺畅的开发人员工作流程的一部分多次运行。但性能、负载和压力测试往往需要向一个特定的二进制文件发送大量的流量。这些流量在典型的单元测试模型中变得难以制造。而我们的大流量是很大的，往往是每秒数千或数百万次的查询（在广告的情况下，实时竞价）!

#### Unanticipated behaviors, inputs, and side effects 非预期的行为、投入和副作用

Unit tests are limited by the imagination of the engineer writing them. That is, they can only test for anticipated behaviors and inputs. However, issues that users find with a product are mostly unanticipated (otherwise it would be unlikely that they would make it to end users as issues). This fact suggests that different test techniques are needed to test for unanticipated behaviors.

单元测试受到编写它们的工程师想象力的限制。也就是说，他们只能测试预期的行为和输入。然而，用户在产品中发现的问题大多是未预料到的（否则，他们不太可能将其作为问题提交给最终用户）。这一事实表明，需要不同的测试技术来测试非预期的行为。

[Hyrum’s Law ](http://hyrumslaw.com/)is an important consideration here: even if we could test 100% for conformance to a strict, specified contract, the effective user contract applies to all visible behaviors, not just a stated contract. It is unlikely that unit tests alone test for all visible behaviors that are not specified in the public API.

海勒姆定律在这里是一个重要的考虑因素：即使我们可以100%测试是否符合严格的规定合同，有效的用户合同也适用于所有可见的行为，而不仅仅是规定的合同。单元测试不太可能单独测试公共API中未指定的所有可视行为。

#### Emergent behaviors and the “vacuum effect” 突发行为和 "真空效应"

Unit tests are limited to the scope that they cover (especially with the widespread use of test doubles), so if behavior changes in areas outside of this scope, it cannot be detected. And because unit tests are designed to be fast and reliable, they deliberately eliminate the chaos of real dependencies, network, and data. A unit test is like a problem in theoretical physics: ensconced in a vacuum, neatly hidden from the mess of the real world, which is great for speed and reliability but misses certain defect categories.

由于被设计为快速可靠，单元测试往往只关注它所覆盖的范围内的行为（特别是随着测试替代的广泛使用,屏蔽了外界的副作用及噪声：比如真实依赖、网络和数据），因此如果外部行为发生变化，单元测试则无法检测到。单元测试就像理论物理中的一个问题：运行在真空中，巧妙地隐藏在现实世界的混乱中，这有助于提高速度和可靠性，但忽略了某些缺陷类别。

### Why Not Have Larger Tests? 为什么不进行大型测试？

In earlier chapters, we discussed many of the properties of a developer-friendly test. In particular, it needs to be as follows:
- *Reliable*  
	It must not be flaky and it must provide a useful pass/fail signal.
- *Fast*  
	It needs to be fast enough to not interrupt the developer workflow.
- *Scalable*  
	Google needs to be able to run all such useful affected tests efficiently for presubmits and for post-submits.

在前面的章节中，我们讨论了对开发者友好的测试的许多特性。特别是，它需要做到以下几点：
- *可靠的*  
	它不能是不确定的，它必须提供一个有用的通过/失败信号。
- *快速*  
	它需要足够快，以避免中断开发人员的工作流程。
- *可扩展性*  
	谷歌需要能够有效地运行所有这些有用的受影响的测试，用于预提交和后提交。

Good unit tests exhibit all of these properties. Larger tests often violate all of these constraints. For example, larger tests are often flakier because they use more infrastructure than does a small unit test. They are also often much slower, both to set up as well as to run. And they have trouble scaling because of the resource and time requirements, but often also because they are not isolated—these tests can collide with one another.

好的单元测试展现出这些特性。大型测试经常违反这些限制。例如，大型测试往往是脆弱的，因为它们比小单元测试使用更多的基础设施。它们的设置和运行速度也往往慢得多。而且，由于资源和时间的要求，它们在扩展上有困难，但往往也因为它们不是孤立的——这些测试可能会相互冲突。

Additionally, larger tests present two other challenges. First, there is a challenge of ownership. A unit test is clearly owned by the engineer (and team) who owns the unit. A larger test spans multiple units and thus can span multiple owners. This presents a long-term ownership challenge: who is responsible for maintaining the test and who is responsible for diagnosing issues when the test breaks? Without clear ownership, a test rots.

此外，大型测试还带来了另外两个挑战。首先，所有权是一个挑战。单元测试显然由拥有单元的工程师（和团队）拥有。较大的测试跨越多个单元，因此可以跨越多个所有者。这带来了一个长期的所有权挑战：谁负责维护测试，谁负责在测试中断时诊断问题？没有明确的所有权，测试就会腐化。

The second challenge for larger tests is one of standardization (or the lack thereof). Unlike unit tests, larger tests suffer a lack of standardization in terms of the infrastructure and process by which they are written, run, and debugged. The approach to larger tests is a product of a system’s architectural decisions, thus introducing variance in the type of tests required. For example, the way we build and run A-B diff regression tests in Google Ads is completely different from the way such tests are built and run in Search backends, which is different again from Drive. They use different platforms, different languages, different infrastructures, different libraries, and competing testing frameworks.

大型测试的第二个挑战是标准化问题（或缺乏标准化）。与单元测试不同，大型测试在编写、运行和调试的基础设施和流程方面缺乏标准化。大型测试的方法是系统架构设计的产物，因此在所需的测试类型中引入了差异性。例如，我们在谷歌广告中建立和运行A-B差异回归测试的方式与在搜索后端建立和运行此类测试的方式完全不同，而搜索后端又与云存储不同。他们使用不同的平台，不同的语言，不同的基础设施，不同的库，以及相互竞争的测试框架。

This lack of standardization has a significant impact. Because larger tests have so many ways of being run, they often are skipped during large-scale changes. (See Chapter 22.) The infrastructure does not have a standard way to run those tests, and asking the people executing LSCs to know the local particulars for testing on every team doesn’t scale. Because larger tests differ in implementation from team to team, tests that actually test the integration between those teams require unifying incompatible infrastructures. And because of this lack of standardization, we cannot teach a single approach to Nooglers (new Googlers) or even more experienced engineers, which both perpetuates the situation and also leads to a lack of understanding about the motivations of such tests.

这种缺乏标准化的情况有很大的影响。因为大型测试有许多运行方式，在大规模的变更中，它们经常被忽略。(见第22章) 基础设施没有一个标准的方式来运行这些测试，要求执行LSC的人员了解每个团队测试的本地细节是不可行的。因为更大的测试在各个团队的实施中是不同的，因此实际测试这些团队之间集成的测试需要统一不兼容的基础架构。而且由于缺乏标准化，我们无法向Nooglers（新的Googlers）甚至更有经验的工程师传授统一的方法，这既使情况长期存在，也导致人们对这种测试的动机缺乏了解。

## Larger Tests at Google 谷歌的大型测试

When we discussed the history of testing at Google earlier (see Chapter 11), we mentioned how Google Web Server (GWS) mandated automated tests in 2003 and how this was a watershed moment. However, we actually had automated tests in use before this point, but a common practice was using automated large and enormous tests. For example, AdWords created an end-to-end test back in 2001 to validate product scenarios. Similarly, in 2002, Search wrote a similar “regression test” for its indexing code, and AdSense (which had not even publicly launched yet) created its variation on the AdWords test.

当我们在前面讨论Google的测试历史时（见第11章），我们讨论了Google Web Server（GWS）如何在2003年强制执行自动化测试，以及这是一个分水岭时刻。然而，在这之前，我们实际上已经有了自动化测试的使用，但一个普遍的做法是使用自动化的大型测试。例如，AdWords早在2001年就创建了一个端到端的测试来验证产品方案。同样，在2002年，搜索部门为其索引代码写了一个类似的 "回归测试"，而AdSense（当时甚至还没有公开推出）在AdWords的测试上创造了它的变种。

Other “larger” testing patterns also existed circa 2002. The Google search frontend relied heavily on manual QA—manual versions of end-to-end test scenarios. And Gmail got its version of a “local demo” environment—a script to bring up an end-to- end Gmail environment locally with some generated test users and mail data for local manual testing.

其他 "较大"的测试模式也开始于2002年左右。谷歌搜索前端在很大程度上依赖于手动质量检查——端到端的测试场景的手动版本。Gmail得到了它的 "本地演示 "环境的版本——一个脚本，在本地建立一个端到端的Gmail环境，其中有一些生成的测试用户和邮件数据，用于本地手动测试。

When C/J Build (our first continuous build framework) launched, it did not distinguish between unit tests and other tests, but there were two critical developments that led to a split. First, Google focused on unit tests because we wanted to encourage the testing pyramid and to ensure the vast majority of written tests were unit tests. Second, when TAP replaced C/J Build as our formal continuous build system, it was only able to do so for tests that met TAP’s eligibility requirements: hermetic tests buildable at a single change that could run on our build/test cluster within a maximum time limit. Although most unit tests satisfied this requirement, larger tests mostly did not. However, this did not stop the need for other kinds of tests, and they have continued to fill the coverage gaps. C/J Build even stuck around for years specifically to handle these kinds of tests until newer systems replaced it.

当C/J Build（我们的第一个持续构建框架）推出时，它并没有区分单元测试和其他测试，但有两个关键的进展导致了区分两者。首先，Google专注于单元测试，因为我们想鼓励金字塔式测试，并确保绝大部分的测试是单元测试。第二，当TAP取代C/J Build成为我们正式的持续构建系统时，它只能为符合TAP资格要求的测试服务：可在一次修改中构建的密封测试，可在最大时间限制内运行在我们的构建/测试集群上。尽管大多数单元测试满足了这一要求，但大型测试大多不满足。然而，这并没有阻止对其他类型的测试的需求，而且它们一直在填补覆盖率的空白。C/J Build甚至坚持了多年，专门处理这些类型的测试，直到更新的系统取代它。

### Larger Tests and Time 大型测试与时间

Throughout this book, we have looked at the influence of time on software engineering, because Google has built software running for more than 20 years. How are larger tests influenced by the time dimension? We know that certain activities make more sense the longer the expected lifespan of code, and testing of various forms is an activity that makes sense at all levels, but the test types that are appropriate change over the expected lifetime of code.

在本书中，我们一直在关注时间对软件工程的影响，因为谷歌已经开发了运行20多年的软件。大型测试是如何受到时间维度的影响的？我们知道，代码的生命周期越长，某些活行为就越有意义，各种形式的测试是一种在各个层面都有意义的活动，但适合的测试类型会随着代码的生命周期而改变。

As we pointed out before, unit tests begin to make sense for software with an expected lifespan from hours on up. At the minutes level (for small scripts), manual testing is most common, and the SUT usually runs locally, but the local demo likely *is* production, especially for one-off scripts, demos, or experiments. At longer lifespans, manual testing continues to exist, but the SUTs usually diverge because the production instance is often cloud hosted instead of locally hosted.

正如我们之前所指出的，单元测试对于生命周期在几小时以上的软件开始有意义。在分钟级别（小型脚本），手动测试是最常见的，SUT通常在本地运行，但本地demo很可能*就是*产品，特别是对于一次性的脚本、演示或实验。在更长的生命期，手动测试继续存在，但SUT通常是有差别的，因为生产实例通常是云托管而不是本地托管。

The remaining larger tests all provide value for longer-lived software, but the main concern becomes the maintainability of such tests as time increases.

其余大型测试都为生命周期较长的软件提供了价值，但随着时间的增加，主要的问题变成了这种测试的可维护性。

Incidentally, this time impact might be one reason for the development of the “ice cream cone” testing antipattern, as mentioned in the Chapter 11 and shown again in Figure 14-2.

顺便说一句，这一时间冲击可能是开发“冰淇淋筒”测试反模式的原因之一，如第11章所述，图14-2再次显示

![Figure 14-2](./images/Figure%2014-2.png)

*Figure 14-2. The ice cream cone testing antipattern*

When development starts with manual testing (when engineers think that code is meant to last only for minutes), those manual tests accumulate and dominate the initial overall testing portfolio. For example, it’s pretty typical to hack on a script or an app and test it out by running it, and then to continue to add features to it but continue to test it out by running it manually. This prototype eventually becomes functional and is shared with others, but no automated tests actually exist for it.

当开发从手动测试开始时（当工程师认为代码只能持续几分钟时），那些手动测试就会积累起来并主导最初的整体测试组合。例如，通常我们会修改脚本或应用程序并通过运行来验证修改有效，然后继续向其添加功能，并继续通过手动运行来测试它，这是非常典型的。长此以往，原型产品的功能会越来越完整，直至可与其他人共享，但实际上不存在针对它的自动测试。

Even worse, if the code is difficult to unit test (because of the way it was implemented in the first place), the only automated tests that can be written are end-to-end ones, and we have inadvertently created “legacy code” within days.

更糟糕的是，如果代码很难进行单元测试（因为它最初的实现方式），那么唯一可以编写的自动化测试就是端到端的测试，并且我们在几天内无意中创建了“遗留代码”。

It is *critical* for longer-term health to move toward the test pyramid within the first few days of development by building out unit tests, and then to top it off after that point by introducing automated integration tests and moving away from manual end- to-end tests. We succeeded by making unit tests a requirement for submission, but covering the gap between unit tests and manual tests is necessary for long-term health.

在开发的头几天，通过建立单元测试，向金字塔式测试迈进，然后在这之后通过引入自动化集成测试，摆脱手动端到端的测试，这对长期的稳定是*至关重要*的。我们成功地使单元测试成为提交的要求，但弥补单元测试和手工测试之间的差距对长期稳健是必要的。

#### Larger Tests at Google Scale 谷歌规模的大型测试

It would seem that larger tests should be more necessary and more appropriate at larger scales of software, but even though this is so, the complexity of authoring, running, maintaining, and debugging these tests increases with the growth in scale, even more so than with unit tests.

在软件规模较大的情况下，大型测试似乎更有必要，也更合适，但即使如此，编写、运行、维护和调试这些测试的复杂性也会随着规模的增长而增加，复杂度远超过单元测试。

In a system composed of microservices or separate servers, the pattern of interconnections looks like a graph: let the number of nodes in that graph be our *N*. Every time a new node is added to this graph, there is a multiplicative effect on the number of distinct execution paths through it.

在由微服务或独立服务器组成的系统中，互连模式看起来像一个图：让该图中的节点数为我们的N。每次向该图添加新节点时，都会对通过该图的不同执行路径的数量产生乘法效应的倍增。

[Figure 14-3 ](#_bookmark1226)depicts an imagined SUT: this system consists of a social network with users, a social graph, a stream of posts, and some ads mixed in. The ads are created by advertisers and served in the context of the social stream. This SUT alone consists of two groups of users, two UIs, three databases, an indexing pipeline, and six servers. There are 14 edges enumerated in the graph. Testing all of the end-to-end possibilities is already difficult. Imagine if we add more services, pipelines, and databases to this mix: photos and images, machine learning photo analysis, and so on?

图14-3描绘了一个想象中的SUT：这个系统由一个有用户的社交网络、一个社交图、一个feed流和一些混合广告组成。广告由广告商创建，并在社交流的背景下提供服务。这个SUT单独由两组用户、两个UI、三个数据库、一个索引管道和六个服务器组成。图中列举了14条边。测试所有端到端的可能性已经很困难了。想象一下，如果我们在这个组合中添加更多的服务、管道和数据库：照片和图像、机器学习照片分析等等？

![Figure 14-3](./images/Figure%2014-3.png)

*Figure 14-3. Example of a fairly small SUT: a social network with advertising*

The rate of distinct scenarios to test in an end-to-end way can grow exponentially or combinatorially depending on the structure of the system under test, and that growth does not scale. Therefore, as the system grows, we must find alternative larger testing strategies to keep things manageable.

以端到端的方式测试的不同场景的速率可以指数增长或组合增长，这取决于被测系统的结构，并且这种增长无法扩展。因此，随着系统的发展，我们必须找到其他大型测试的测试策略，以保持测试的可管理性。

However, the value of such tests also increases because of the decisions that were necessary to achieve this scale. This is an impact of fidelity: as we move toward larger-*N* layers of software, if the service doubles are lower fidelity (1-epsilon), the chance of bugs when putting it all together is exponential in *N*. Looking at this example SUT again, if we replace the user server and ad server with doubles and those doubles are low fidelity (e.g., 10% accurate), the likelihood of a bug is 99% (1 – (0.1 ∗ 0.1)). And that’s just with two low-fidelity doubles.

然而，由于实现这一规模所需的决策，此类测试的价值也增加了。这是仿真度的一个影响：随着我们向更大的N层软件发展，如果服务的仿真度加倍（1ε），那么当把所有的服务放在一起时，出现错误的几率是N的指数。再看看这个例子SUT，如果我们用测试替代来取代用户服务器和广告服务器，并且这些测试替代的仿真度较低（例如，10%的不准确度），出现错误的可能性为99%（1–（0.1 ∗ 0.1)). 这只是两个低仿真度的替代。

Therefore, it becomes critical to implement larger tests in ways that work well at this scale but maintain reasonably high fidelity.

因此，以在这种规模下工作良好但保持合理高仿真度的方式实现更大的测试变得至关重要。

------

Tip:"The Smallest Possible Test" 提示："尽可能小的测试"
Even for integration tests,smaller is better-a handful of large tests is preferable to anenormous one.And,because the scope of a test is often coupled to the scope of theSUT,finding ways to make the SUT smaller help make the test smaller.

即便是集成测试，也是越小越好——少数大型测试比一个超大测试要好。而且，因为测试的范围经常与SUT的范围相联系，找到使SUT变小的方法有助于使测试变小。

One way to achieve this test ratio when presented with a user journey that can requirecontributions from many internal systems is to "chain"tests,as illustrated inFigure 14-4,not specifically in their execution,but to create multiple smaller pairwiseintegration tests that represent the overall scenario.This is done by ensuring that theoutput of one test is used as the input to another test by persisting this output to adata repository.

当出现一个需要许多内部系统服务的用户请求时，实现这种测试比率的一种方法是 "连锁"测试，如图14-4所示，不是具体执行，而是创建多个较小的成对集成测试，代表整个场景。

![Figure 14-4](./images/Figure%2014-4.png)

Figure 14-4. Chained tests

## Structure of a Large Test 大型测试组成

Although large tests are not bound by small test constraints and could conceivably consist of anything, most large tests exhibit common patterns. Large tests usually consist of a workflow with the following phases:
- Obtain a system under test
- Seed necessary test data
- Perform actions using the system under test
- Verify behaviors

尽管大型测试不受小型测试约束的约束，并且可以由任何内容组成，但大多数大型测试都显示出共同的模式。大型测试通常由具有以下阶段的流程组成：
- 获得被测试的系统 
- 必要的测试数据
- 使用被测系统执行操作
- 验证行为

### The System Under Test 被测试的系统

One key component of large tests is the aforementioned SUT (see Figure 14-5). A typical unit test focuses its attention on one class or module. Moreover, the test code runs in the same process (or Java Virtual Machine [JVM], in the Java case) as the code being tested. For larger tests, the SUT is often very different; one or more separate processes with test code often (but not always) in its own process.

大型测试的一个关键组成部分是前述的SUT（见图14-5）。一个典型的单元测试将关注点集中在一个类或模块上。此外，测试代码运行在与被测试代码相同的进程（或Java虚拟机[JVM]，在Java的情况下）。对于大型测试，SUT通常是非常不同的；一个或多个独立的进程，测试代码通常（但不总是）在自己的进程中。

![Figure 14-5](./images/Figure%2014-5.png)

*Figure 14-5. An example system under test (SUT)*

At Google, we use many different forms of SUTs, and the scope of the SUT is one of the primary drivers of the scope of the large test itself (the larger the SUT, the larger the test). Each SUT form can be judged based on two primary factors:
- *Hermeticity*  
	This is the SUT’s isolation from usages and interactions from other components than the test in question. An SUT with high hermeticity will have the least exposure to sources of concurrency and infrastructure flakiness.
- *Fidelity*  
	The SUT’s accuracy in reflecting the production system being tested. An SUT with high fidelity will consist of binaries that resemble the production versions (rely on similar configurations, use similar infrastructures, and have a similar overall topology).

在谷歌，我们使用许多不同形式的SUT，而SUT的范围是大型测试本身范围的主要驱动因素之一（SUT越大，测试越大）。每种SUT形式都可以根据两个主要因素来判断。
- *封闭性*  
	这是SUT与相关测试之外的其他组件的使用和交互的隔离。具有高隔离性的SUT将具有最少的并发性和基础架构脆弱性来源。
- *仿真度*  
	SUT反映被测生产系统的准确性。具有高仿真度的SUT将由与生产版本相似的二进制文件组成（依赖于类似的配置，使用类似的基础设施，并且具有类似的总体拓扑）。

Often these two factors are in direct conflict. Following are some examples of SUTs:
- *Single-process SUT*  
	The entire system under test is packaged into a single binary (even if in production these are multiple separate binaries). Additionally, the test code can be packaged into the same binary as the SUT. Such a test-SUT combination can be a “small” test if everything is single-threaded, but it is the least faithful to the production topology and configuration.
- *Single-machine SUT*  
	The system under test consists of one or more separate binaries (same as production) and the test is its own binary. But everything runs on one machine. This is used for “medium” tests. Ideally, we use the production launch configuration of each binary when running those binaries locally for increased fidelity.
- *Multimachine SUT*  
	The system under test is distributed across multiple machines (much like a production cloud deployment). This is even higher fidelity than the single-machine SUT, but its use makes tests “large” size and the combination is susceptible to increased network and machine flakiness.
- *Shared environments (staging and production)*  
	Instead of running a standalone SUT, the test just uses a shared environment. This has the lowest cost because these shared environments usually already exist, but the test might conflict with other simultaneous uses and one must wait for the code to be pushed to those environments. Production also increases the risk of end-user impact.
- *Hybrids*  
	Some SUTs represent a mix: it might be possible to run some of the SUT but have it interact with a shared environment. Usually the thing being tested is explicitly run but its backends are shared. For a company as expansive as Google, it is practically impossible to run multiple copies of all of Google’s interconnected services, so some hybridization is required.

通常有这两个因素是直接冲突的。以下是一些SUT的例子：
- *单进程SUT*  
	整个被测系统被打包成一个二进制文件（即使在生产中这些是多个独立的二进制文件）。此外，测试代码可以被打包成与SUT相同的二进制文件。如果所有测试都是单线程的，那么这种测试SUT组合可能是一个“小”测试，但它对生产拓扑和配置仿真度最低。
- *单机SUT*  
	被测系统由一个或多个独立的二进制文件组成（与生产相同），测试是自身的二进制文件。但一切都在一台机器上运行。这用于 "中等 "测试。理想情况下，在本地运行这些二进制文件时，我们使用每个二进制文件的生产启动配置，以提高仿真度。
- *多机SUT*  
	被测系统分布在多台机器上（很像生产云部署）。这比单机SUT的仿真度还要高，但它的使用使得测试的规模 "很大"，而且这种组合很容易受到网络和机器脆弱程度的影响。
- *共享环境（预发和生产）*  
	测试只使用共享环境，而不是运行独立的SUT。这具有最低的成本，因为这些共享环境通常已经存在，但是测试可能会与其他同时使用冲突，并且必须等待代码被推送到这些环境中。生产也增加了最终用户受到影响的风险。
- *混合模式*  
	一些SUT代表了一种混合：可以运行一些SUT，但可以让它与共享环境交互。通常被测试的东西是显式运行的，但是它的后端是共享的。对于像谷歌这样扩张的公司来说，实际上不可能运行所有谷歌互联服务的多个副本，因此需要一些混合。

#### The benefits of hermetic SUTs 封闭式SUT的好处

The SUT in a large test can be a major source of both unreliability and long turnaround time. For example, an in-production test uses the actual production system deployment. As mentioned earlier, this is popular because there is no extra overhead cost for the environment, but production tests cannot be run until the code reaches that environment, which means those tests cannot themselves block the release of the code to that environment—the SUT is too late, essentially.

大型测试中的SUT可能是不可靠性和长运行时间的主要原因。例如，生产中的测试使用实际的生产系统部署。如前所述，这很流行，因为没有额外的环境开销成本，但在代码到达生产环境之前，生产测试无法运行，这意味着这些测试本身无法阻止将代码发布到生产环境--SUT本质上太晚了。

The most common first alternative is to create a giant shared staging environment and to run tests there. This is usually done as part of some release promotion process, but it again limits test execution to only when the code is available. As an alternative, some teams will allow engineers to “reserve” time in the staging environment and to use that time window to deploy pending code and to run tests, but this does not scale with a growing number of engineers or a growing number of services, because the environment, its number of users, and the likelihood of user conflicts all quickly grow.

最常见的第一种选择是创建一个巨大的共享预发环境并在那里运行测试。这通常是作为某些发布升级过程的一部分来完成的，但它再次将测试执行限制为仅当代码可用时。作为一个替代方案，一些团队允许工程师在预发环境中"保留 "时间，并使用该时间窗口来部署待定的代码和运行测试，但这并不能随着工程师数量的增加或服务数量的增加而扩展，因为环境、用户数量和用户冲突的可能性都会迅速增加。

The next step is to support cloud-isolated or machine-hermetic SUTs. Such an environment improves the situation by avoiding the conflicts and reservation requirements for code release.

下一步是支持云隔离的或机器密闭的SUT。这样的环境通过避免代码发布的冲突和保留要求来改善情况。

------

*Case Study:Risks of testing in production and Webdriver Torso*  
*案例研究：生产中的测试风险和Webdriver Torso*

We mentioned that testing in production can be risky.One humorous episode resulting from testing in production was known as the Webdriver Torso incident.Weneeded a way to verify that video rendering in You Tube production was workingproperly and so created automated scripts to generate test videos,upload them,andverify the quality of the upload.This was done in a Google-owned YouTube channelcalled Webdriver Torso.But this channel was public,as were most of the videos.

我们提到，在生产中进行测试是有风险的。我们需要一种方法来验证YouTube生产中的视频渲染是否正常，因此创建了自动脚本来生成测试视频，上传它们，并验证上传质量，这是在谷歌拥有的名为Webdriver Torso的YouTube中进行的。

Subsequently,this channel was publicized in an article at Wired,which led to itsspread throughout the media and subsequent efforts to solve the mystery.Finally,ablogger tied everything back to Google.Eventually,we came clean by having a bit offun with it,including a Rickroll and an Easter Egg,so everything worked out well.Butwe do need to think about the possibility of end-user discovery of any test data weinclude in production and be prepared for it.

后来，这个渠道在《连线》杂志的一篇文章中被公布，这导致它在媒体上传播，随后人们努力解开这个谜团。最后，我们通过与它进行一些互动，包括一个Rickroll和一个复活节彩蛋，所以一切都很顺利。但我们确实需要考虑最终用户发现我们在生产中包含的任何测试数据的可能性并做好准备。

----------

#### Reducing the size of your SUT at problem boundaries 减少问题边界内SUT的范围

There are particularly painful testing boundaries that might be worth avoiding. Tests that involve both frontends and backends become painful because user interface (UI) tests are notoriously unreliable and costly:
- UIs often change in look-and-feel ways that make UI tests brittle but do not actually impact the underlying behavior.
- UIs often have asynchronous behaviors that are difficult to test.

有一些特别痛苦的测试界限，值得避免。同时涉及前台和后台的测试变得很痛苦，因为用户界面（UI）测试是出了名的不可靠和高成本：
- UI的外观和感觉方式经常发生变化，使UI测试变得脆弱，但实际上不会影响底层行为。
- UI通常具有难以测试的异步行为。

Although it is useful to have end-to-end tests of a UI of a service all the way to its backend, these tests have a multiplicative maintenance cost for both the UI and the backends. Instead, if the backend provides a public API, it is often easier to split the tests into connected tests at the UI/API boundary and to use the public API to drive the end-to-end tests. This is true whether the UI is a browser, command-line interface (CLI), desktop app, or mobile app.

尽管对服务的UI进行端到端测试非常有用，但这些测试会增加UI和后端的维护成本。相反，如果后端提供公共API，则通常更容易在UI/API边界将测试拆分为连接的测试，并使用公共API驱动端到端测试。无论UI是浏览器、命令行界面（CLI）、桌面应用程序还是移动应用程序，都是如此。

Another special boundary is for third-party dependencies. Third-party systems might not have a public shared environment for testing, and in some cases, there is a cost with sending traffic to a third party. Therefore, it is not recommended to have automated tests use a real third-party API, and that dependency is an important seam at which to split tests.

另一个特殊的边界是第三方依赖关系。第三方系统可能没有用于测试的公共共享环境，在某些情况下，向第三方发送流量会产生成本。因此，不建议让自动匹配的测试使用真正的第三方API，并且依赖性是分割测试的一个重要接点。

To address this issue of size, we have made this SUT smaller by replacing its databases with in-memory databases and removing one of the servers outside the scope of the SUT that we actually care about, as shown in [Figure 14-6](#_bookmark1248). This SUT is more likely to fit on a single machine.

为了解决规模问题，我们通过用内存数据库替换它的数据库，并移除SUT范围之外的一个我们真正关心的服务器，使这个SUT变得更小，如图14-6所示。这个SUT更可能适合在一台机器上使用。

![Figure 14-6](./images/Figure%2014-6.png)

*Figure 14-6. A reduced-size SUT*

The key is to identify trade-offs between fidelity and cost/reliability, and to identify reasonable boundaries. If we can run a handful of binaries and a test and pack it all into the same machines that do our regular compiles, links, and unit test executions, we have the easiest and most stable “integration” tests for our engineers.

关键是要确定仿真度和成本/可靠性之间的权衡，并确定合理的边界。如果我们能够运行少量的二进制文件和一个测试，并将其全部打包到进行常规编译、链接和单元测试执行的同一台机器上，我们就能为我们的工程师提供最简单、最稳定的 "集成 "测试。

#### Record/replay proxies 录制/重放代理

In the previous chapter, we discussed test doubles and approaches that can be used to decouple the class under test from its difficult-to-test dependencies. We can also double entire servers and processes by using a mock, stub, or fake server or process with the equivalent API. However, there is no guarantee that the test double used actually conforms to the contract of the real thing that it is replacing.

在前一章中，我们讨论了测试加倍和可用于将被测类与其难以测试的依赖项解耦的方法。我们还可以通过使用具有等效API的模拟、打桩或伪服务器或进程来复制整个服务器和进程。然而，无法保证所使用的测试替代实际上符合其所替换的真实对象的契约。

One way of dealing with an SUT’s dependent but subsidiary services is to use a test double, but how does one know that the double reflects the dependency’s actual behavior? A growing approach outside of Google is to use a framework for [consumer-driven contract ](https://oreil.ly/RADVJ)tests. These are tests that define a contract for both the client and the provider of the service, and this contract can drive automated tests. That is, a client defines a mock of the service saying that, for these input arguments, I get a particular output. Then, the real service uses this input/output pair in a real test to ensure that it produces that output given those inputs. Two public tools for consumer-driven contract testing are [Pact Contract Testing ](https://docs.pact.io/)and [Spring Cloud Contracts](https://oreil.ly/szQ4j). Google’s heavy dependency on protocol buffers means that we don’t use these internally.

处理SUT的依赖关系和附属服务的一种方法是使用测试替代，但如何知道替代反映了依赖的实际行为？在谷歌之外，一种正在发展的方法是使用一个框架进行消费者驱动的合同测试。这些测试为客户和服务的提供者定义了一个合同，这个合同可以驱动自动测试。也就是说，一个客户定义了一个服务的模拟，说对于这些输入参数，我得到一个特定的输出。然后，真正的服务在真正的测试中使用这个输入/输出对，以确保它在这些输入的情况下产生那个输出。消费者驱动的合同测试的两个公共工具是[Pact Contract Testing](https://docs.pact.io/)和[Spring Cloud Contracts](https://oreil.ly/szQ4j)。谷歌对protocol buffers的严重依赖意味着我们内部不使用这些工具。

At Google, we do something a little bit different. [Our most popular approach ](https://oreil.ly/-wvYi)(for which there is a public API) is to use a larger test to generate a smaller one by recording the traffic to those external services when running the larger test and replaying it when running smaller tests. The larger, or “Record Mode” test runs continuously on post-submit, but its primary purpose is to generate these traffic logs (it must pass, however, for the logs to be generated). The smaller, or “Replay Mode” test is used during development and presubmit testing.

在谷歌，我们做的有些不同。我们最流行的方法（有公共API）是使用较大的测试生成较小的测试，方法是在运行较大的测试时录制到这些外部服务的流量，并在运行较小的测试时重放流量。大型或“记录模式”测试在提交后持续运行，但其主要目的是生成这些流量日志（但必须通过才能生成日志）。在开发和提交前测试过程中，使用较小的或“重放模式”测试。

One of the interesting aspects of how record/replay works is that, because of nondeterminism, requests must be matched via a matcher to determine which response to replay. This makes them very similar to stubs and mocks in that argument matching is used to determine the resulting behavior.

录制/重放工作原理的一个有趣方面是，由于非终结性，必须通过匹配器匹配请求，以确定重放的响应。这使得它们与打桩和模拟非常相似，因为参数匹配用于确定结果行为。

What happens for new tests or tests where the client behavior changes significantly? In these cases, a request might no longer match what is in the recorded traffic file, so the test cannot pass in Replay mode. In that circumstance, the engineer must run the test in Record mode to generate new traffic, so it is important to make running Record tests easy, fast, and stable.

新测试或客户端行为发生显著变化的测试会发生什么情况？在这些情况下，请求可能不再与录制的流量文件中的内容匹配，因此测试无法在重放模式下通过。在这种情况下，工程师必须以记录模式运行测试以生成新的通信量，因此使运行录制测试变得简单、快速和稳定非常重要。

### Test Data 测试数据

A test needs data, and a large test needs two different kinds of data:
- *Seeded data*  
	Data preinitialized into the system under test reflecting the state of the SUT at the inception of the test
- *Test traffic*  
	Data sent to the system under test by the test itself during its execution

测试需要数据，大型测试需要两种不同的数据：
- *种子数据*  
	预先初始化到被测系统中的数据，反映测试开始时SUT的状态
- *测试流量*  
	在测试执行过程中，由测试本身发送至被测系统的数据。

Because of the notion of the separate and larger SUT, the work to seed the SUT state is often orders of magnitude more complex than the setup work done in a unit test. For example:
- *Domain data*  
	Some databases contain data prepopulated into tables and used as configuration for the environment. Actual service binaries using such a database may fail on startup if domain data is not provided.
- *Realistic baseline*  
	For an SUT to be perceived as realistic, it might require a realistic set of base data at startup, both in terms of quality and quantity. For example, large tests of a social network likely need a realistic social graph as the base state for tests: enough test users with realistic profiles as well as enough interconnections between those users must exist for the testing to be accepted.
- *Seeding APIs*  
	The APIs by which data is seeded may be complex. It might be possible to directly write to a datastore, but doing so might bypass triggers and checks performed by the actual binaries that perform the writes.

由于独立的和更大的SUT的概念，SUT状态的种子工作往往比单元测试中的设置工作要复杂得多。比如说：
- *领域数据*  
	一些数据库包含预先填充到表中的数据，并作为环境的配置使用。如果不提供领域数据，使用这种数据库的实际服务二进制文件可能在启动时失败。
- *现实的基线*  
	要使SUT被认为是现实的，它可能需要在启动时提供一组现实的基础数据，包括质量和数量。例如，社交网络的大型测试可能需要一个真实的社交图作为测试的基本状态：必须有足够多的具有真实配置文件的测试用户以及这些用户之间的足够互联，才能接受测试。
- *种子APIs*  
	数据种子的API可能很复杂。也许可以直接写入数据存储，但这样做可能会绕过由执行写入的实际二进制文件执行的触发器和检查。

Data can be generated in different ways, such as the following:
- *Handcrafted data*  
	Like for smaller tests, we can create test data for larger tests by hand. But it might require more work to set up data for multiple services in a large SUT, and we might need to create a lot of data for larger tests.
- *Copied data*  
	We can copy data, typically from production. For example, we might test a map of Earth by starting with a copy of our production map data to provide a baseline and then test our changes to it.
- *Sampled data*  
	Copying data can provide too much data to reasonably work with. Sampling data can reduce the volume, thus reducing test time and making it easier to reason about. “Smart sampling” consists of techniques to copy the minimum data necessary to achieve maximum coverage.

数据可以通过不同的方式产生，比如说以下几种：
- *手工制作数据*  
	与小型测试一样，我们可以手动创建大型测试的测试数据。但是在一个大型SUT中为多个服务设置数据可能需要更多的工作，并且我们可能需要为大型测试创建大量数据。
- *复制的数据*  
	我们可以复制数据，通常来自生产。例如，我们可以通过从生产地图数据的副本开始测试地球地图，以提供基线，然后测试我们对它的更改。
- *抽样数据*  
	复制数据可以提供太多的数据来进行合理的工作。采样数据可以减少数量，从而减少测试时间，使其更容易推理。"智能抽样 "包括复制最小的数据以达到最大覆盖率的技术。

### Verification 验证

After an SUT is running and traffic is sent to it, we must still verify the behavior. There are a few different ways to do this:
- *Manual*  
	Much like when you try out your binary locally, manual verification uses humans to interact with an SUT to determine whether it functions correctly. This verification can consist of testing for regressions by performing actions as defined on a consistent test plan or it can be exploratory, working a way through different interaction paths to identify possible new failures.
	Note that manual regression testing does not scale sublinearly: the larger a system grows and the more journeys through it there are, the more human time is needed to manually test.
- *Assertions*  
	Much like with unit tests, these are explicit checks about the intended behavior of the system. For example, for an integration test of Google search of xyzzy, an assertion might be as follows:

```java 
assertThat(response.Contains("Colossal Cave"))
```

- *A/B comparison (differential)*  
	Instead of defining explicit assertions, A/B testing involves running two copies of the SUT, sending the same data, and comparing the output. The intended behavior is not explicitly defined: a human must manually go through the differences to ensure any changes are intended.

在SUT运行并向其发送流量后，我们仍然必须验证其行为。有几种不同的方法可以做到这一点。
- *手动*  
	就像你在本地尝试你的二进制文件一样，手动验证使用人工与SUT互动以确定它的功能是否正确。这种验证可以包括通过执行一致的测试计划中定义的操作来测试回归，也可以是探索性的，通过不同的交互路径来识别可能的新故障。
	需要注意的是，人工回归测试的规模化不是线性的：系统越大，通过它的操作越多，需要人力测试的时间就越多。
- *断言*  
	与单元测试一样，这些是对系统预期行为的明确检查。例如，对于谷歌搜索xyzzy的集成测试，一个断言可能如下：

```
assertThat(response.Contains("Colossal Cave"))
```

- *A/B测试（差异）*  
	A/B测试不是定义显式断言，而是运行SUT的两个副本，发送相同的数据，并比较输出。未明确定义预期行为：人工必须手动检查差异，以确保任何预期更改。

## Types of Larger Tests 大型测试的类型

We can now combine these different approaches to the SUT, data, and assertions to create different kinds of large tests. Each test then has different properties as to which risks it mitigates; how much toil is required to write, maintain, and debug it; and how much it costs in terms of resources to run.

我们现在可以将这些不同的方法组合到SUT、数据和断言中，以创建不同类型的大型测试。然后，每项测试都有不同的特性，可以降低哪些风险；编写、维护和调试它需要多少工作了；以及它在运行资源方面的成本。

What follows is a list of different kinds of large tests that we use at Google, how they are composed, what purpose they serve, and what their limitations are:
- Functional testing of one or more binaries
- Browser and device testing
- Performance, load, and stress testing
- Deployment configuration testing
- Exploratory testing
- A/B diff (regression) testing
- User acceptance testing (UAT)
- Probers and canary analysis
- Disaster recovery and chaos engineering
- User evaluation

下面是我们在谷歌使用的各种大型测试的列表，它们是如何组成的，它们的用途是什么，它们的局限性是什么：
- 一个或多个二进制文件的功能测试
- 浏览器和设备测试
- 性能、负载和压力测试
- 部署配置测试
- 探索性测试
- A/B对比（回归）测试
- 用户验收测试（UAT）
- 探针和金丝雀分析
- 故障恢复和混沌工程
- 用户评价

Given such a wide number of combinations and thus a wide range of tests, how do we manage what to do and when? Part of designing software is drafting the test plan, and a key part of the test plan is a strategic outline of what types of testing are needed and how much of each. This test strategy identifies the primary risk vectors and the necessary testing approaches to mitigate those risk vectors.

考虑到如此广泛的组合和如此广泛的测试，我们如何管理做什么以及何时做？软件设计的一部分是起草测试计划，而测试计划的一个关键部分是需要什么类型的测试以及每种测试需要多少的战略大纲。该测试策略确定了主要风险向量和缓解这些风险向量的必要测试方法。

At Google, we have a specialized engineering role of “Test Engineer,” and one of the things we look for in a good test engineer is the ability to outline a test strategy for our products.

在谷歌，我们有一个专门的工程角色“测试工程师”，我们在一个好的测试工程师身上寻找的东西之一就是能够为我们的产品勾勒出一个测试策略。

### Functional Testing of One or More Interacting Binaries 一个或多个二进制文件的功能测试

Tests of these type have the following characteristics:
- SUT: single-machine hermetic or cloud-deployed isolated
- Data: handcrafted
- Verification: assertions

此类试验具有以下特点：
- SUT：单机密封或云部署隔离
- 数据：手工制作
- 核查：断言

As we have seen so far, unit tests are not capable of testing a complex system with true fidelity, simply because they are packaged in a different way than the real code is packaged. Many functional testing scenarios interact with a given binary differently than with classes inside that binary, and these functional tests require separate SUTs and thus are canonical, larger tests.

到目前为止，我们已经看到，单元测试无法以真正仿真地测试复杂的系统，仅仅是因为它们的打包方式与实际代码的打包方式不同。许多功能测试场景与给定二进制文件的交互方式不同于与该二进制文件中的类的交互方式，这些功能测试需要单独的SUT，因此是经典的大型测试。

Testing the interactions of multiple binaries is, unsurprisingly, even more complicated than testing a single binary. A common use case is within microservices environments when services are deployed as many separate binaries. In this case, a functional test can cover the real interactions between the binaries by bringing up an SUT composed of all the relevant binaries and by interacting with it through a published API.

毫不奇怪，测试多个二进制文件的相互作用甚至比测试单个二进制文件更复杂。一个常见的案例是在微服务环境中，当服务被部署为许多独立的二进制文件。在这种情况下，功能测试可以通过提出由所有相关二进制文件组成的SUT，并通过发布的API与之交互，来覆盖二进制文件之间的真实交互。

### Browser and Device Testing 浏览器和设备测试

Testing web UIs and mobile applications is a special case of functional testing of one or more interacting binaries. It is possible to unit test the underlying code, but for the end users, the public API is the application itself. Having tests that interact with the application as a third party through its frontend provides an extra layer of coverage.

测试web UI和移动应用程序是对一个或多个交互二进制文件进行功能测试的特例。可以对底层代码进行单元测试，但对于最终用户来说，公共API是应用程序本身。将测试作为第三方通过其前端与应用程序交互提供了额外的覆盖层。

### Performance, Load, and Stress testing 性能、负载和压力测试
Tests of these type have the following characteristics:
- SUT: cloud-deployed isolated
- Data: handcrafted or multiplexed from production
- Verification: diff (performance metrics)

此类试验具有以下特点：
- SUT：云部署隔离
- 数据：手工制作或从生产中多路传输
- 验证：差异（性能指标）

Although it is possible to test a small unit in terms of performance, load, and stress, often such tests require sending simultaneous traffic to an external API. That definition implies that such tests are multithreaded tests that usually test at the scope of a binary under test. However, these tests are critical for ensuring that there is no degradation in performance between versions and that the system can handle expected spikes in traffic.

尽管可以在性能、负载和压力方面测试较小的单元，但此类测试通常需要同时向外部API发送通信量。该定义意味着此类测试是多线程测试，通常在被测二进制文件的范围内进行测试。但是，这些测试对于确保版本之间的性能不会下降以及系统能够处理预期的流量峰值至关重要。

As the scale of the load test grows, the scope of the input data also grows, and it eventually becomes difficult to generate the scale of load required to trigger bugs under load. Load and stress handling are “highly emergent” properties of a system; that is, these complex behaviors belong to the overall system but not the individual members. Therefore, it is important to make these tests look as close to production as possible. Each SUT requires resources akin to what production requires, and it becomes difficult to mitigate noise from the production topology.

随着负载测试规模的增长，输入数据的范围也在增长，甚至很难在负载下生成触发bug所需的负载规模。负载和压力处理是系统的 "高度涌现"属性；也就是说，这些复杂的行为属于整个系统，而不是个别组成。因此，重要的是使这些测试看起来尽可能地接近生产。每个SUT所需的资源与生产所需的资源类似，因此很难缓解生产拓扑中的噪音。

One area of research for eliminating noise in performance tests is in modifying the deployment topology—how the various binaries are distributed across a network of machines. The machine running a binary can affect the performance characteristics; thus, if in a performance diff test, the base version runs on a fast machine (or one with a fast network) and the new version on a slow one, it can appear like a performance regression. This characteristic implies that the optimal deployment is to run both versions on the same machine. If a single machine cannot fit both versions of the binary, an alternative is to calibrate by performing multiple runs and removing peaks and valleys.

消除性能测试中的噪音的一个研究领域是修改部署拓扑结构——各种二进制文件在机器网络中的分布。运行二进制文件的机器会影响性能特性；因此，如果在性能差异测试中，基本版本在快速机器（或具有高速网络的机器）上运行，而新版本在慢速机器上运行，则可能会出现性能回归。此特性意味着最佳部署是在同一台机器上运行两个版本。如果一台机器无法同时安装两种版本的二进制文件，另一种方法是通过执行多次运行并消除峰值和谷值来进行校准。

### Deployment Configuration Testing 部署配置测试

Tests of these type have the following characteristics:
- SUT: single-machine hermetic or cloud-deployed isolated
- Data: none
- Verification: assertions (doesn’t crash)

此类试验具有以下特点：
- SUT：单机封闭或云部署隔离
- 数据：无
- 验证：断言（不会崩溃）

Many times, it is not the code that is the source of defects but instead configuration: data files, databases, option definitions, and so on. Larger tests can test the integration of the SUT with its configuration files because these configuration files are read during the launch of the given binary.

很多时候，缺陷的根源不是代码，而是配置：数据文件、数据库、选项定义等等。较大的测试可以测试SUT与其配置文件的集成，因为这些配置文件是在给定二进制文件启动期间读取的。

Such a test is really a smoke test of the SUT without needing much in the way of additional data or verification. If the SUT starts successfully, the test passes. If not, the test fails.

这种测试实际上是SUT的冒烟测试，不需要太多额外的数据或验证。如果SUT成功启动，则测试通过。否则，测试失败。

### Exploratory Testing 探索性测试

Tests of these type have the following characteristics:
- SUT: production or shared staging
- Data: production or a known test universe
- Verification: manual

此类试验具有以下特点：
- SUT：生产或共享预发
- 数据：生产或已知测试范围
- 核查：手动

Exploratory testing[^2] is a form of manual testing that focuses not on looking for behavioral regressions by repeating known test flows, but on looking for questionable behavior by trying out new user scenarios. Trained users/testers interact with a product through its public APIs, looking for new paths through the system and for which behavior deviates from either expected or intuitive behavior, or if there are security vulnerabilities.

探索性测试是一种手动测试，它的重点不是通过重复已知的测试流程来寻找已知行为的回归测试，而是通过尝试新的用户场景来寻找有问题的行为。训练有素的用户/测试人员通过产品的公共API与产品交互，在系统中寻找新的路径，寻找行为偏离预期或直观行为的路径，或者是否存在安全漏洞。

Exploratory testing is useful for both new and launched systems to uncover unanticipated behaviors and side effects. By having testers follow different reachable paths through the system, we can increase the system coverage and, when these testers identify bugs, capture new automated functional tests. In a sense, this is a bit like a manual “fuzz testing” version of functional integration testing.

探索性测试对于新系统和已发布系统都很有用，可以发现意外行为和副作用。通过让测试人员在系统中遵循不同的可到达路径，我们可以增加系统覆盖率，并且当这些测试人员发现bug时，可以捕获新的自动化功能测试。在某种意义上，这有点像功能集成测试的手动“模糊测试”版本。

>[^2]:	James A. Whittaker, Exploratory Software Testing: Tips, Tricks, Tours, and Techniques to Guide Test Design(New York: Addison-Wesley Professional, 2009)./
> 2     詹姆斯·惠塔克，探索性软件测试： 提示， 诡计， 旅行，和技巧到指导测验设计（纽约：Addison-Wesley Professional，2009年）。

#### Limitations 局限性

Manual testing does not scale sublinearly; that is, it requires human time to perform the manual tests. Any defects found by exploratory tests should be replicated with an automated test that can run much more frequently.

手动测试无法进行次线性扩展；也就是说，执行手动测试需要人工时间。通过探索性测试发现的任何缺陷都应该通过能够更频繁地运行的自动化测试进行复制。

#### Bug bashes 扫除bug

One common approach we use for manual exploratory testing is the [bug bash](https://oreil.ly/zRLyA). A team of engineers and related personnel (managers, product managers, test engineers, anyone with familiarity with the product) schedules a “meeting,” but at this session, everyone involved manually tests the product. There can be some published guidelines as to particular focus areas for the bug bash and/or starting points for using the system, but the goal is to provide enough interaction variety to document questionable product behaviors and outright bugs.

我们用于手动探索性测试的一种常见方法是bug大扫除。一组工程师和相关人员（经理、产品经理、测试工程师、熟悉产品的任何人）安排了一次“会议”，但在此情况下，所有相关人员都会手动测试产品。对于bug 大扫除的特定关注领域和/或使用系统的起点，可能会有一些已发布的指南，但目标是提供足够的交互多样性，以记录有问题的产品行为和底层的bug。

### A/B Diff Regression Testing  A/B对比测试

Tests of these type have the following characteristics:
- SUT: two cloud-deployed isolated environments
- Data: usually multiplexed from production or sampled
- Verification: A/B diff comparison

此类试验具有以下特点：
- SUT：两个云部署的隔离环境
- 数据：通常从生产或取样中多路传输
- 验证：A/B差异比较

Unit tests cover expected behavior paths for a small section of code. But it is impossible to predict many of the possible failure modes for a given publicly facing product. Additionally, as Hyrum’s Law states, the actual public API is not the declared one but all user-visible aspects of a product. Given those two properties, it is no surprise that A/B diff tests are possibly the most common form of larger testing at Google. This approach conceptually dates back to 1998. At Google, we have been running tests based on this model since 2001 for most of our products, starting with Ads, Search, and Maps.

单元测试覆盖了一小部分代码的预期行为路径。但是，对于给定的面向公众的产品，预测多种可能的故障模式是不可行的。此外，正如海勒姆定律所指出的，实际的公共API不是声明的API，而是一个产品的所有用户可见的方面。鉴于这两个特性，A/B对比测试可能是谷歌最常见的大型测试形式，这并不奇怪。这种方法在概念上可以追溯到1998年。在谷歌，我们从2001年开始为我们的大多数产品进行基于这种模式的测试，从广告、搜索和地图开始。

A/B diff tests operate by sending traffic to a public API and comparing the responses between old and new versions (especially during migrations). Any deviations in behavior must be reconciled as either anticipated or unanticipated (regressions). In this case, the SUT is composed of two sets of real binaries: one running at the candidate version and the other running at the base version. A third binary sends traffic and compares the results.

A/B对比测试通过向公共API发送流量并比较新旧版本之间的响应（特别是在迁移期间）。任何行为上的偏差都必须作为预期的或未预期的（回归）进行调整。在这种情况下，SUT由两组真实的二进制文件组成：一个运行在候选版本，另一个运行在基本版本。第三个二进制程序发送流量并比较结果。

There are other variants. We use A-A testing (comparing a system to itself) to identify nondeterministic behavior, noise, and flakiness, and to help remove those from A-B diffs. We also occasionally use A-B-C testing, comparing the last production version, the baseline build, and a pending change, to make it easy at one glance to see not only the impact of an immediate change, but also the accumulated impacts of what would be the next-to-release version.

还有其他的变体。我们使用A-A测试（将系统与自身进行比较）来识别非决定性行为、噪音和脆弱性，并帮助从A-B差异中去除这些东西。我们有时也会使用A-B-C测试，比较最后的生产版本、基线构建和一个待定的变化，以便一眼就能看出即时更改的影响，以及下一个发布版本的累积影响。

A/B diff tests are a cheap but automatable way to detect unanticipated side effects for any launched system.

A/B差异测试是一种低成本但可自动检测任何已启动系统意外副作用的方法。

#### Limitations  局限性

Diff testing does introduce a few challenges to solve:
- *Approval*  
	Someone must understand the results enough to know whether any differences are expected. Unlike a typical test, it is not clear whether diffs are a good or bad thing (or whether the baseline version is actually even valid), and so there is often a manual step in the process.
- *Noise*  
	For a diff test, anything that introduces unanticipated noise into the results leads to more manual investigation of the results. It becomes necessary to remediate noise, and this is a large source of complexity in building a good diff test.
- *Coverage*  
	Generating enough useful traffic for a diff test can be a challenging problem. The test data must cover enough scenarios to identify corner-case differences, but it is difficult to manually curate such data.
- *Setup*  
	Configuring and maintaining one SUT is fairly challenging. Creating two at a time can double the complexity, especially if these share interdependencies.

对比测试确实带来了一些需要解决的挑战：
- *批准*  
	必须有人对结果有足够的了解，才能知道是否会出现任何差异。与典型的测试不同，不清楚差异是好是坏（或者基线版本实际上是否有效），因此在这个过程中通常需要手动步骤。
- *噪音*  
	对于对比测试来说，任何在结果中引入意料之外的噪音都会导致对结果进行更多的手动查验。有必要对噪声进行补救，这也是建立一个好的对比测试的一个很大的复杂性来源。
- *覆盖率*  
	为对比测试产生足够的有用流量是一个具有挑战性的问题。测试数据必须涵盖足够多的场景，以确定角落的差异，但很难手动管理这样的数据。
- *配置*  
	配置和维护一个SUT是相当具有挑战性的。一次创建两个可以使复杂性加倍，特别是如果这些共享相互依赖关系。

### UAT

Tests of these type have the following characteristics:
- SUT: machine-hermetic or cloud-deployed isolated
- Data: handcrafted
- Verification: assertions

此类试验具有以下特点：
- SUT：机器密封或云部署隔离
- 数据：手工制作
- 核查：断言

A key aspect of unit tests is that they are written by the developer writing the code under test. But that makes it quite likely that misunderstandings about the *intended* behavior of a product are reflected not only in the code, but also the unit tests. Such unit tests verify that code is “Working as implemented” instead of “Working as intended.”

单元测试的一个关键方面是，它们是由编写被测代码的开发人员编写的。但是，这使得对产品的*预期*行为的误解很可能不仅反映在代码中，而且也反映在单元测试中。这样的单元测试验证了代码是 "按实现工作 "而不是 "按预期工作"。

For cases in which there is either a specific end customer or a customer proxy (a customer committee or even a product manager), UATs are automated tests that exercise the product through public APIs to ensure the overall behavior for specific [user jour‐](https://oreil.ly/lOaOq) [neys ](https://oreil.ly/lOaOq)is as intended. Multiple public frameworks exist (e.g., Cucumber and RSpec) to make such tests writable/readable in a user-friendly language, often in the context of “runnable specifications.”

对于有特定终端客户或客户代理（客户委员会甚至产品经理）的情况，UAT是通过公共API执行产品的自动化测试，以确保特定[用户旅程](https://oreil.ly/lOaOq)的总体行为符合预期。存在多个公共框架（例如，Cucumber和RSpec），使这种测试可以用用户友好的语言写/读，通常是在 "可运行规范"的背景下。

Google does not actually do a lot of automated UAT and does not use specification languages very much. Many of Google’s products historically have been created by the software engineers themselves. There has been little need for runnable specification languages because those defining the intended product behavior are often fluent in the actual coding languages themselves.

谷歌实际上并没有做很多自动化的UAT，也不怎么使用规范语言。谷歌的许多产品在历史上都是由软件工程师自己创建的。几乎不需要可运行的规范语言，因为那些定义预期产品行为的规范语言通常能够流利地使用实际的编码语言。

### Probers and Canary Analysis 探针和金丝雀分析

Tests of these type have the following characteristics:
- SUT: production
- Data: production
- Verification: assertions and A/B diff (of metrics)

此类试验具有以下特点：
- SUT：生产
- 数据：生产
- 验证：断言和A/B差异（度量）

Probers and canary analysis are ways to ensure that the production environment itself is healthy. In these respects, they are a form of production monitoring, but they are structurally very similar to other large tests.

探针和金丝雀分析是确保生产环境本身健康的方法。在这些方面，它们是生产监控的一种形式，但在结构上与其他大型测试非常相似。

Probers are functional tests that run encoded assertions against the production environment. Usually these tests perform well-known and deterministic read-only actions so that the assertions hold even though the production data changes over time. For example, a prober might perform a Google search at [www.google.com ](http://www.google.com/)and verify that a result is returned, but not actually verify the contents of the result. In that respect, they are “smoke tests” of the production system, but they provide early detection of major issues.

Probers是功能测试，针对生产环境运行编码的断言。通常，这些测试执行众所周知的和确定的只读动作，这样即使生产数据随时间变化，断言也能成立。例如，探针可能在 [www.google.com](http://www.google.com/) 执行谷歌搜索，并验证返回的结果，但实际上并不验证结果的内容。在这方面，它们是生产系统的 "冒烟测试"，但可以及早发现重大问题。

Canary analysis is similar, except that it focuses on when a release is being pushed to the production environment. If the release is staged over time, we can run both prober assertions targeting the upgraded (canary) services as well as compare health metrics of both the canary and baseline parts of production and make sure that they are not out of line.

金丝雀分析也是类似的，只不过它关注的是一个版本何时被推送到生产环境。如果发布是分阶段进行的，我们可以同时运行针对升级（金丝雀）服务的探针断言，以及比较生产中金丝雀和基线部分的健康指标，并确保它们没有失衡。

Probers should be used in any live system. If the production rollout process includes a phase in which the binary is deployed to a limited subset of the production machines (a canary phase), canary analysis should be used during that procedure.

探针应该在任何实时系统中使用。如果生产推广过程包括一个阶段，其中二进制文件被部署到生产机器的有限子集（一个金丝雀阶段），则金丝雀分析应该在该过程中使用。

#### Limitations 局限性

Any issues caught at this point in time (in production) are already affecting end users.

此时（生产中）发现的任何问题都已经影响到最终用户。

If a prober performs a mutable (write) action, it will modify the state of production. This could lead to one of three outcomes: nondeterminism and failure of the assertions, failure of the ability to write in the future, or user-visible side effects.

如果探针执行可变（写入）操作，它将修改生产状态。这可能导致以下三种结果之一：不确定性和评估失败、未来写入能力失败或用户可见的副作用。

### Disaster Recovery and Chaos Engineering 故障恢复与混沌工程

Tests of these type have the following characteristics:
- SUT: production
- Data: production and user-crafted (fault injection)
- Verification: manual and A/B diff (metrics)

此类试验具有以下特点：
- SUT：生产
- 数据：生产和用户定制（故障注入）
- 验证：手动和A/B对比（指标）

These test how well your systems will react to unexpected changes or failures.

这些测试将测试系统对意外更改或故障的反应。

For years, Google has run an annual war game called [DiRT ](https://oreil.ly/17ffL)(Disaster Recovery Testing) during which faults are injected into our infrastructure at a nearly planetary scale. We simulate everything from datacenter fires to malicious attacks. In one memorable case, we simulated an earthquake that completely isolated our headquarters in Mountain View, California, from the rest of the company. Doing so exposed not only technical shortcomings but also revealed the challenge of running a company when all the key decision makers were unreachable.[^3]

多年来，谷歌每年都会举办一场名为“灾难恢复测试”[DiRT](https://oreil.ly/17ffL)(Disaster Recovery Testing)的演练，在这场演练中，故障几乎以全球规模注入我们的基础设施。我们模拟了从数据中心火灾到恶意攻击的一切。在一个令人难忘的案例中，我们模拟了一场地震，将我们位于加州山景城的总部与公司其他部门完全隔离。这样做不仅暴露了技术上的缺陷，也揭示了在所有关键决策者都无法联系到的情况下，管理公司的挑战。

The impacts of DiRT tests require a lot of coordination across the company; by contrast, chaos engineering is more of a “continuous testing” for your technical infrastructure. [Made popular by Netflix](https://oreil.ly/BCwdM), chaos engineering involves writing programs that continuously introduce a background level of faults into your systems and seeing what happens. Some of the faults can be quite large, but in most cases, chaos testing tools are designed to restore functionality before things get out of hand. The goal of chaos engineering is to help teams break assumptions of stability and reliability and help them grapple with the challenges of building resiliency in. Today, teams at Google perform thousands of chaos tests each week using our own home-grown system called Catzilla.

DiRT测试的影响需要整个公司的大量协调；相比之下，混沌工程更像是对你的技术基础设施的 "持续测试"。[由Netflix推广](https://oreil.ly/BCwdM)，混沌工程包括编写程序，在你的系统中不断引入背景水平的故障，并观察会发生什么。有些故障可能相当大，但在大多数情况下，混沌测试工具旨在在事情失控之前恢复功能。混沌工程的目标是帮助团队打破稳定性和可靠性的假设，帮助他们应对建立弹性的挑战。今天，谷歌的团队每周都会使用我们自己开发的名为Catzilla的系统进行数千次混沌测试。

These kinds of fault and negative tests make sense for live production systems that have enough theoretical fault tolerance to support them and for which the costs and risks of the tests themselves are affordable.

这些类型的故障和负面测试对于具有足够理论容错能力的实时生产系统是有意义的，并且测试本身的成本和风险是可以承受的。

> [^3]:	During this test, almost no one could get anything done, so many people gave up on work and went to one of our many cafes, and in doing so, we ended up creating a DDoS attack on our cafe teams!/
> 3   在这次测试中，几乎没有人能完成任何事情，所以很多人放弃了工作，去了我们众多咖啡馆中的一家，在这样做的过程中，我们最终对我们的咖啡馆团队发起了DDoS攻击！


#### Limitations 局限性

Any issues caught at this point in time (in production) are already affecting end users.

此时（生产中）发现的任何问题都已经影响到最终用户。

DiRT is quite expensive to run, and therefore we run a coordinated exercise on an infrequent scale. When we create this level of outage, we actually cause pain and negatively impact employee performance.

DiRT的运行成本相当高，因此我们不经常进行协作演练。当我们制造这种程度的故障时，我们实际上造成了痛苦，并对员工的绩效产生了负面影响。

If a prober performs a mutable (write) action, it will modify the state of production. This could lead to either nondeterminism and failure of the assertions, failure of the ability to write in the future, or user-visible side effects.

如果探针执行了一个可变（写）的动作，它将修改生产的状态。这可能导致非确定性和断言的失败，未来写入能力的失败，或用户可见的副作用。

### User Evaluation 用户评价

Tests of these type have the following characteristics:
- SUT: production
- Data: production
- Verification: manual and A/B diffs (of metrics)

此类试验具有以下特点：
- SUT：生产
- 数据：生产
- 验证：手动和A/B对比（度量）

Production-based testing makes it possible to collect a lot of data about user behavior. We have a few different ways to collect metrics about the popularity of and issues with upcoming features, which provides us with an alternative to UAT:
- *Dogfooding*  
	It’s possible using limited rollouts and experiments to make features in production available to a subset of users. We do this with our own staff sometimes (eat our own dogfood), and they give us valuable feedback in the real deployment environment.
- *Experimentation*  
	A new behavior is made available as an experiment to a subset of users without their knowing. Then, the experiment group is compared to the control group at an aggregate level in terms of some desired metric. For example, in YouTube, we had a limited experiment changing the way video upvotes worked (eliminating the downvote), and only a portion of the user base saw this change.
	This is a [massively important approach for Google](https://oreil.ly/OAvqF). One of the first stories a Noogler hears upon joining the company is about the time Google launched an experiment changing the background shading color for AdWords ads in Google Search and noticed a significant increase in ad clicks for users in the experimental group versus the control group.
- *Rater* *evaluation*  
	Human raters are presented with results for a given operation and choose which one is “better” and why. This feedback is then used to determine whether a given change is positive, neutral, or negative. For example, Google has historically used rater evaluation for search queries (we have published the guidelines we give our raters). In some cases, the feedback from this ratings data can help determine launch go/no-go for algorithm changes. Rater evaluation is critical for nondeterministic systems like machine learning systems for which there is no clear correct answer, only a notion of better or worse.
	

基于产品的测试可以收集大量关于用户行为的数据。我们有几种不同的方法来收集有关即将推出的功能的受欢迎程度和问题的指标，这为我们提供了UAT的替代方案：
- *吃自己的狗粮*  
	我们可以利用有限的推广和实验，将生产中的功能提供给一部分用户使用。我们有时会和自己的员工一起这样做（吃自己的狗粮），他们会在真实的部署环境中给我们提供宝贵的反馈。
- *实验*  
	在用户不知情的情况下，将一个新的行为作为一个实验提供给一部分用户。然后，将实验组与控制组在某种期望的指标方面进行综合比较。例如，在YouTube，我们做了一个有限的实验，改变了视频加分的方式（取消了降分），只有一部分用户看到了这个变化。
	这是一个[对谷歌来说非常重要的方法](https://oreil.ly/OAvqF)。Noogler在加入公司后听到的第一个故事是关于谷歌推出了一个实验，改变了谷歌搜索中AdWords广告的背景阴影颜色，并注意到实验组的用户与对照组相比，广告点击量明显增加。
- *评分员评价*  
	评分员会被告知某一特定操作的结果，并选择哪一个 "更好"以及原因。然后，这种反馈被用来确定一个特定的变更是正面、中性还是负面的。例如，谷歌在历史上一直使用评分员对搜索查询进行评估（我们已经公布了我们给评员者的指导方针）。在某些情况下，来自该评级数据的反馈有助于确定算法更改的启动通过/不通过。评价员的评价对于像机器学习系统这样的非确定性系统至关重要，因为这些系统没有明确的正确答案，只有一个更好或更差的概念。

## Large Tests and the Developer Workflow  大型测试和开发人员工作流程

We’ve talked about what large tests are, why to have them, when to have them, and how much to have, but we have not said much about the who. Who writes the tests? Who runs the tests and investigates the failures? Who owns the tests? And how do we make this tolerable?

我们已经讨论了什么是大型测试，为什么要做测试，什么时候做，做多少测试，但我们还没有说太多是谁的问题。谁来写测试？谁来运行测试并调查故障？谁拥有这些测试？我们如何让这一切变得可以忍受？

Although standard unit test infrastructure might not apply, it is still critical to integrate larger tests into the developer workflow. One way of doing this is to ensure that automated mechanisms for presubmit and post-submit execution exist, even if these are different mechanisms than the unit test ones. At Google, many of these large tests do not belong in TAP. They are nonhermetic, too flaky, and/or too resource intensive. But we still need to keep them from breaking or else they provide no signal and become too difficult to triage. What we do, then, is to have a separate post-submit continuous build for these. We also encourage running these tests presubmit, because that provides feedback directly to the author.

尽管标准的单元测试基础设施可能不适用，但将大型测试集成到开发人员的工作流程中仍然是至关重要的。做到这一点的一个方法是确保存在预提交和提交后执行的自动化机制，即使这些机制与单元测试的机制不同。在谷歌，许多大型测试不属于TAP。它们不封闭、太不稳定和/或资源密集。但是我们仍然需要防止它们被破坏，否则它们就不能提供任何信号，并且变得太难处理了。那么，我们所做的就是为这些测试建立一个单独的提交后持续构建。我们也鼓励在提交前运行这些测试，因为这样可以直接向作者提供反馈。

A/B diff tests that require manual blessing of diffs can also be incorporated into such a workflow. For presubmit, it can be a code-review requirement to approve any diffs in the UI before approving the change. One such test we have files release-blocking bugs automatically if code is submitted with unresolved diffs.

需要手动批准的A/B对比测试也可以被纳入这样一个工作流程。对于预提交，在批准更改之前批准UI中的任何差异可能是代码审查要求。我们有一个这样的测试，如果提交的代码有未解决的差异，就会自动归档阻断发布的错误。

In some cases, tests are so large or painful that presubmit execution adds too much developer friction. These tests still run post-submit and are also run as part of the release process. The drawback to not running these presubmit is that the taint makes it into the monorepo and we need to identify the culprit change to roll it back. But we need to make the trade-off between developer pain and the incurred change latency and the reliability of the continuous build.

在某些情况下，测试是如此之大或痛苦，以至于提交前的执行增加了太多的开发者负担。这些测试仍然在提交后运行，并且作为发布过程的一部分运行。不在提交前运行这些测试的缺点是，bug会进入monorepo，我们需要确定罪魁祸首的变化来回滚它。但我们需要在开发人员的痛苦和所产生的变更延迟与持续构建的可靠性之间做出权衡。

### Authoring Large Tests 编写大型测试

Although the structure of large tests is fairly standard, there is still a challenge with creating such a test, especially if it is the first time someone on the team has done so.

虽然大型测试的结构是相当标准的，但创建这样的测试仍然存在挑战，特别是当团队中有人第一次操作时。

The best way to make it possible to write such tests is to have clear libraries, documentation, and examples. Unit tests are easy to write because of native language support (JUnit was once esoteric but is now mainstream). We reuse these assertion libraries for functional integration tests, but we also have created over time libraries for interacting with SUTs, for running A/B diffs, for seeding test data, and for orchestrating test workflows.

要使写这种测试成为可能，最好的办法是有明确的库、文档和例子。单元测试很容易写，因为有本地语言的支持（JUnit曾经很深奥，但现在是主流）。我们重新使用这些断言库进行功能集成测试，但随着时间的推移，我们也创建了与SUT交互的库，用于运行A/B差异，用于播种测试数据，以及用于协调测试工作流。

Larger tests are more expensive to maintain, in both resources and human time, but not all large tests are created equal. One reason that A/B diff tests are popular is that they have less human cost in maintaining the verification step. Similarly, production SUTs have less maintenance cost than isolated hermetic SUTs. And because all of this authored infrastructure and code must be maintained, the cost savings can compound.

大型测试在资源和人力时间方面的维护成本较高，但不是所有的大型测试都是一样的。A/B对比测试受欢迎的一个原因是，它们在维护验证步骤方面的人力成本较低。同样，生产型SUT的维护成本比隔离的封闭型SUT要低。而且，由于所有这些自创的基础设施和代码都必须被维护，成本的节省可以是落地的。

However, this cost must be looked at holistically. If the cost of manually reconciling diffs or of supporting and safeguarding production testing outweighs the savings, it becomes ineffective.

然而，必须从整体上看待这一成本。如果手动协调差异或支持和保护生产测试的成本超过了节省的成本，那么它将变得无效。

### Running Large Tests 进行大型测试

We mentioned above how our larger tests don’t fit in TAP and so we have alternate continuous builds and presubmits for them. One of the initial challenges for our engineers is how to even run nonstandard tests and how to iterate on them.

我们在上面提到，我们的大型测试不适合在TAP中进行，所以我们为它们准备了备用的持续构建和预提交。对我们的工程师来说，最初的挑战之一是如何运行非标准的测试，以及如何对它们进行迭代。

As much as possible, we have tried to make our larger tests run in ways familiar for our engineers. Our presubmit infrastructure puts a common API in front of running both these tests and running TAP tests, and our code review infrastructure shows both sets of results. But many large tests are bespoke and thus need specific documentation for how to run them on demand. This can be a source of frustration for unfamiliar engineers.

我们尽可能地使我们的大型测试以工程师熟悉的方式运作。我们的预提交基础设施在运行这些测试和运行TAP测试之前都提供了一个通用的API，我们的代码审查基础设施显示了这两组结果。但许多大型测试是定制的，因此需要具体的文档来说明如何按需运行它们。对于不熟悉的工程师来说，这可能是一个令人沮丧的原因。

#### Speeding up tests  加快测试进度

Engineers don’t wait for slow tests. The slower a test is, the less frequently an engineer will run it, and the longer the wait after a failure until it is passing again.

工程师不会等待缓慢的测试。测试越慢，工程师运行测试的频率就越低，失败后等待测试再次通过的时间就越长。

The best way to speed up a test is often to reduce its scope or to split a large test into two smaller tests that can run in parallel. But there are some other tricks that you can do to speed up larger tests.

加速测试的最佳方法通常是缩小其范围，或者将大型测试拆分为两个可以并行运行的小型测试。但是，您还可以使用其他一些技巧来加速更大的测试。

Some naive tests will use time-based sleeps to wait for nondeterministic action to occur, and this is quite common in larger tests. However, these tests do not have thread limitations, and real production users want to wait as little as possible, so it is best for tests to react the way real production users would. Approaches include the following:

- Polling for a state transition repeatedly over a time window for an event to complete with a frequency closer to microseconds. You can combine this with a timeout value in case a test fails to reach a stable state.
- Implementing an event handler.
- Subscribing to a notification system for an event completion.

一些简单的测试会使用基于时间延迟注入来等待非确定性的动作发生，这在大型测试中是很常见的。但是，这些测试没有线程限制，并且实际生产用户希望等待的时间尽可能少，因此最好让测试以实际生产用户的方式做出反应。方法包括：  
- 在时间窗口内重复轮询状态转换，以使事件以接近微秒的频率完成。如果测试无法达到稳定状态，你可以将其与超时值结合起来。
- 实现一个事件处理程序。
- 订阅事件完成通知系统。

Note that tests that rely on sleeps and timeouts will all start failing when the fleet running those tests becomes overloaded, which spirals because those tests need to be rerun more often, increasing the load further.

请注意，当运行这些测试的负载变得超载时，依赖延时和超时的测试都会开始失败，这是因为这些测试需要更频繁地重新运行，进一步增加了负载。

*Lower internal system timeouts and delays*  
	A production system is usually configured assuming a distributed deployment topology, but an SUT might be deployed on a single machine (or at least a cluster of colocated machines). If there are hardcoded timeouts or (especially) sleep statements in the production code to account for production system delay, these should be made tunable and reduced when running tests.

*Optimize test build time*  
	One downside of our monorepo is that all of the dependencies for a large test are built and provided as inputs, but this might not be necessary for some larger tests. If the SUT is composed of a core part that is truly the focus of the test and some other necessary peer binary dependencies, it might be possible to use prebuilt versions of those other binaries at a known good version. Our build system (based on the monorepo) does not support this model easily, but the approach is actually more reflective of production in which different services release at different versions.

*更低的内部系统超时和延迟*。  
	生产系统通常采用分布式部署拓扑进行配置，但SUT可能部署在一台机器上（或至少是一个群集的机器）。如果在生产代码中存在硬编码超时或（特别是）休眠语句来解释生产系统延迟，则应在运行测试时使其可调并减少。

*优化测试构建时间*。  
	我们的monorepo的一个缺点是，大型测试的所有依赖项都是作为输入构建和提供的，但对于一些大型测试来说，这可能不是必需的。如果SUT是由一个真正的测试重点的核心部分和其他一些必要的对等二进制依赖组成的，那么可以在已知的良好版本中使用这些其他二进制文件的预构建版本。我们的构建系统（基于monorepo）不容易支持这种模式，但该方法实际上更能反映不同服务以不同版本发布的生产。

#### Driving out flakiness  驱除松散性

Flakiness is bad enough for unit tests, but for larger tests, it can make them unusable. A team should view eliminating flakiness of such tests as a high priority. But how can flakiness be removed from such tests?

对于单元测试来说，松散性已经很糟糕了，但对于大型测试来说，它可能会使它们无法使用。一个团队应该把消除这种测试的松散性视为一个高度优先事项。但是，如何才能从这些测试中消除松散性呢？

Minimizing flakiness starts with reducing the scope of the test—a hermetic SUT will not be at risk of the kinds of multiuser and real-world flakiness of production or a shared staging environment, and a single-machine hermetic SUT will not have the network and deployment flakiness issues of a distributed SUT. But you can mitigate other flakiness issues through test design and implementation and other techniques. In some cases, you will need to balance these with test speed.

最大限度地减少松散，首先要减少测试的范围——封闭的SUT不会有生产或共享预发环境的各种多用户和真实世界松散的风险，单机封闭的SUT不会有分布式SUT的网络和部署闪失问题。但是你可以通过测试设计和实施以及其他技术来减轻其他的松散性问题。在某些情况下，你需要平衡这些与测试速度。

Just as making tests reactive or event driven can speed them up, it can also remove flakiness. Timed sleeps require timeout maintenance, and these timeouts can be embedded in the test code. Increasing internal system timeouts can reduce flakiness, whereas reducing internal timeouts can lead to flakiness if the system behaves in a nondeterministic way. The key here is to identify a trade-off that defines both a tolerable system behavior for end users (e.g., our maximum allowable timeout is *n* seconds) but handles flaky test execution behaviors well.

正如使测试反应式或事件驱动可以加快它们的速度一样，它也可以消除松散性。定时休眠需要超时维护，这些超时可以嵌入测试代码中。增加系统的内部超时可以减少松散性，而减少内部超时可以导致松散性，如果系统的行为是不确定的。这里的关键是确定一个权衡（平衡），既要为终端用户定义一个可容忍的系统行为（例如，我们允许的最大超时是*n*秒），但很好地处理了不稳定的测试执行行为。

A bigger problem with internal system timeouts is that exceeding them can lead to difficult errors to triage. A production system will often try to limit end-user exposure to catastrophic failure by handling possible internal system issues gracefully. For example, if Google cannot serve an ad in a given time limit, we don’t return a 500, we just don’t serve an ad. But this looks to a test runner as if the ad-serving code might be broken when there is just a flaky timeout issue. It’s important to make the failure mode obvious in this case and to make it easy to tune such internal timeouts for test scenarios.

内部系统超时的一个更大问题是，超过这些超时会导致难以分类的错误。生产系统通常会试图通过优雅地方式处理可能的内部系统问题来限制终端用户对灾难性故障的暴露。例如，如果谷歌不能在给定的时间限制内提供广告，我们不会返回500，我们只是不提供广告。但在测试运行人员看来，如果只是出现异常超时问题，广告服务可能会被中断。在这种情况下，重要的是使故障模式变得明显，并使调整测试场景的此类内部超时变得容易

#### Making tests understandable  让测试变得易懂

A specific case for which it can be difficult to integrate tests into the developer workflow is when those tests produce results that are unintelligible to the engineer running the tests. Even unit tests can produce some confusion—if my change breaks your test, it can be difficult to understand why if I am generally unfamiliar with your code—but for larger tests, such confusion can be insurmountable. Tests that are assertive must provide a clear pass/fail signal and must provide meaningful error output to help triage the source of failure. Tests that require human investigation, like A/B diff tests, require special handling to be meaningful or else risk being skipped during presubmit.

当这些测试产生的结果对运行测试的工程师来说是无法理解的时候，就很难将测试整合到开发者的工作流程中。即使是单元测试也会产生一些混乱——如果我的修改破坏了你的测试，如果我一般不熟悉你的代码，就很难理解为什么，但对于大型测试，这种混乱可能是无法克服的。坚定的测试必须提供一个明确的通过/失败信号，并且必须提供有意义的错误输出，以帮助分类失败的原因。需要人工调查的测试，如A/B对比测试，需要特殊处理才能有意义，否则在预提交期间有被跳过的风险。

How does this work in practice? A good large test that fails should do the following:
- *Have a message that clearly identifies what the failure is*  
	The worst-case scenario is to have an error that just says “Assertion failed” and a stack trace. A good error anticipates the test runner’s unfamiliarity with the code and provides a message that gives context: “In test_ReturnsOneFullPageOfSearchResultsForAPopularQuery, expected 10 search results but got 1.” For a performance or A/B diff test that fails, there should be a clear explanation in the output of what is being measured and why the behavior is considered suspect.
- *Minimize the effort necessary to identify the root cause of  the discrepancy*  
	A stack trace is not useful for larger tests because the call chain can span multiple process boundaries. Instead, it’s necessary to produce a trace across the call chain or to invest in automation that can narrow down the culprit. The test should produce some kind of artifact to this effect. For example, [Dapper](https://oreil.ly/FXzbv) is a framework used by Google to associate a single request ID with all the requests in an RPC call chain, and all of the associated logs for that request can be correlated by that ID to facilitate tracing.
- *Provide support and contact information.*  
	It should be easy for the test runner to get help by making the owners and supporters of the test easy to contact.

这在实践中是如何运作的？一个成功的大型测试应该从失败中获取到信息，要做到以下几点：
- *有一个明确指出失败原因的信息*  
	最坏的情况是有一个错误，只是说 "断言失败 "和一个堆栈跟踪。一个好的错误能预见到测试运行者对代码的不熟悉，并提供一个信息来说明背景。”in test_ReturnsOneFullPageOfSearchResultsForAPopularQuery中，预期有10个搜索结果，但得到了1个。" 对于失败的性能或A/B对比测试，在输出中应该有一个明确的解释，说明什么是被测量的，为什么该行为被认为是可疑的。
- *尽量减少识别差异的根本原因所需的努力*  
	堆栈跟踪对较大的测试没有用，因为调用链可能跨越多个进程边界。相反，有必要在整个调用链中产生一个跟踪，或者投资于能够缩小罪魁祸首的自动化。测试应该产生某种工具来达到这个效果。例如，[Dapper](https://oreil.ly/FXzbv) 是谷歌使用的一个框架，将一个单一的请求ID与RPC调用链中的所有请求相关联，该请求的所有相关日志都可以通过该ID进行关联，以方便追踪。
- *提供支持和联系信息*  
	通过使测试的所有者和支持者易于联系，测试运行者应该很容易获得帮助。

#### Owning Large Tests  大型测试所有权 

Larger tests must have documented owners—engineers who can adequately review changes to the test and who can be counted on to provide support in the case of test failures. Without proper ownership, a test can fall victim to the following:
- It becomes more difficult for contributors to modify and update the test
- It takes longer to resolve test failures

大型测试必须有记录的所有者——他们可以充分审查测试的变更，并且在测试失败的情况下，可以依靠他们提供支持。没有适当的所有权，测试可能成为以下情况的受害者：
- 参与者修改和更新测试变得更加困难
- 解决测试失败需要更长的时间

And the test rots.

而且测试也会腐烂。

Integration tests of components within a particular project should be owned by the project lead. Feature-focused tests (tests that cover a particular business feature across a set of services) should be owned by a “feature owner”; in some cases, this owner might be a software engineer responsible for the feature implementation end to end; in other cases it might be a product manager or a “test engineer” who owns the description of the business scenario. Whoever owns the test must be empowered to ensure its overall health and must have both the ability to support its maintenance and the incentives to do so.

特定项目中组件的集成测试应由项目负责人负责。以功能为中心的测试（覆盖一组服务中特定业务功能的测试）应由“功能所有者”负责；在某些情况下，该所有者可能是负责端到端功能实现的软件工程师；在其他情况下，可能是负责业务场景描述的产品经理或“测试工程师”。无论谁拥有该测试，都必须有权确保其整体健康，并且必须具备支持其维护的能力和这样做的激励。

It is possible to build automation around test owners if this information is recorded in a structured way. Some approaches that we use include the following:
- *Regular code ownership*  
	In many cases, a larger test is a standalone code artifact that lives in a particular location in our codebase. In that case, we can use the OWNERS ([Chapter 9](#_bookmark664)) information already present in the monorepo to hint to automation that the owner(s) of a particular test are the owners of the test code.
- *Per-test* *annotations*  
	In some cases, multiple test methods can be added to a single test class or module, and each of these test methods can have a different feature owner. We use  per-language structured annotations to document the test owner in each of these cases so that if a particular test method fails, we can identify the owner to contact.

如果以结构化的方式记录此信息，则可以围绕测试所有者构建自动化。我们使用的一些方法包括：
- *常规代码所有权*  
	在许多情况下，大型测试是一个独立的代码构件，它位于代码库中的特定位置。在这种情况下，我们可以使用monorepo中已经存在的所有者（第9章）信息来提示自动化，特定测试的所有者是测试代码的所有者。

- *每个测试注释*  
	在某些情况下，可以将多个测试方法添加到单个测试类或模块中，并且这些测试方法中的每一个都可以有不同的特性所有者。我们使用每种语言的结构化注释，用于记录每种情况下的测试所有者，以便在特定测试方法失败时，我们可以确定要联系的所有者。

## Conclusion 总结
A comprehensive test suite requires larger tests, both to ensure that tests match the fidelity of the system under test and to address issues that unit tests cannot adequately cover. Because such tests are necessarily more complex and slower to run, care must be taken to ensure such larger tests are properly owned, well maintained, and run when necessary (such as before deployments to production). Overall, such larger tests must still be made as small as possible (while still retaining fidelity) to avoid developer friction. A comprehensive test strategy that identifies the risks of a system, and the larger tests that address them, is necessary for most software projects.

一个全面的测试套件需要大型测试，既要确保测试与被测系统的仿真度相匹配，又要解决单元测试不能充分覆盖的问题。因为这样的测试必然更复杂，运行速度更慢，所以必须注意确保这样的大型测试是正确的，良好的维护，并在必要时运行（例如在部署到生产之前）。总的来说，这种大型测试仍然必须尽可能的小（同时仍然保留仿真度），以避免开发人员的阻力。一个全面的测试策略，确定系统的风险，以及解决这些风险的大型测试，对大多数软件项目来说是必要的。

## TL;DRs  内容提要
- Larger tests cover things unit tests cannot.
- Large tests are composed of a System Under Test, Data, Action, and Verification.
- A good design includes a test strategy that identifies risks and larger tests that mitigate them.
- Extra effort must be made with larger tests to keep them from creating friction in the developer workflow.

- 大型测试涵盖了单元测试不能涵盖的内容。
- 大型测试是由被测系统、数据、操作和验证组成。
- 良好的设计包括识别风险的测试策略和缓解风险的大型测试。
- 必须对大型测试做出额外的努力，以防止它们在开发者的工作流程中产生阻力。

