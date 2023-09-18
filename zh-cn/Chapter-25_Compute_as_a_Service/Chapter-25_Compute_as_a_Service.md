

**CHAPTER** **25

# Compute as a Service

# 第二十五章 计算即服务

**Written by Onufry Wojtaszczyk**

**Edited by Lisa Carey**

*I don’t try to understand computers. I try to understand the programs.*

—Barbara Liskov

After doing the hard work of writing code, you need some hardware to run it. Thus, you go to buy or rent that hardware. This, in essence, is *Compute as a Service* (CaaS), in which “Compute” is shorthand for the computing power needed to actually run your programs.

在完成了编写代码的艰苦工作之后，你需要一些硬件来运行它。因此，你可以购买或租用这些硬件。本质上，这就是“计算即服务”（Compute as a Service，CaaS），其中“计算”是实际运行程序所需的计算能力的简写。

This chapter is about how this simple concept—just give me the hardware to run my stuff[^1]—maps into a system that will survive and scale as your organization evolves and grows. It is somewhat long because the topic is complex, and divided into four sections:

- “Taming the Compute Environment” on page 518 covers how Google arrived at its solution for this problem and explains some of the key concepts of CaaS.
- “Writing Software for Managed Compute” on page 523 ](#_bookmark2156)shows how a managed compute solution affects how engineers write software. We believe that the “cattle, not pets”/flexible scheduling model has been fundamental to Google’s success in the past 15 years and is an important tool in a software engineer’s toolbox.
- “CaaS Over Time and Scale” on page 530 goes deeper into a few lessons Google learned about how various choices about a compute architecture play out as the organization grows and evolves.
- Finally, “Choosing a Compute Service” on page 535 is dedicated primarily to those engineers who will make a decision about what compute service to use in their organization.

本章讲述的是这个简单的概念--如何为我提供硬件--如何组成一个系统，随着你的组织的发展和壮大而生存和扩展。本章有点长，因为主题很复杂，分为四个部分：

- 第518页的 "驯服计算环境"涵盖了谷歌是如何得出这个问题的解决方案的，并解释了CaaS的一些关键概念。
- 第523页的 "为托管计算编写软件"展示了托管计算解决方案如何影响工程师编写软件。我们相信，"牛，而不是宠物"/灵活的调度模式是谷歌在过去15年成功的根本，也是软件工程师工具箱中的重要工具。
- 第530页的 "CaaS随时间和规模的变化"更深入地探讨了谷歌在组织成长和发展过程中对计算架构的各种选择是如何发挥的一些经验。
- 最后，第535页的 "选择计算服务"主要是献给那些将决定在其组织中使用何种计算服务的工程师。

> [^1]: Disclaimer: for some applications, the “hardware to run it” is the hardware of your customers (think, for example, of a shrink-wrapped game you bought a decade ago). This presents very different challenges that we do not cover in this chapter.
>
> 1   免责声明：对于某些应用程序，“运行它的硬件”是你客户的硬件（例如，想想你十年前购买的一款压缩包装的游戏）。这就提出了我们在本章中没有涉及的非常不同的挑战。

## Taming the Compute Environment 驯服计算机环境

Google’s internal Borg system[^2] was a precursor for many of today’s CaaS architectures (like Kubernetes or Mesos). To better understand how the particular aspects of such a service answer the needs of a growing and evolving organization, we’ll trace the evolution of Borg and the efforts of Google engineers to tame the compute environment.

谷歌的内部Borg系统是今天许多CaaS架构（如Kubernetes或Mesos）的前身。为了更好地理解这种服务的特定方面如何满足一个不断增长和发展的组织的需要，我们将追溯Borg的发展和谷歌工程师为驯服计算环境所做的努力。

### Automation of Toil 自动化操作

Imagine being a student at the university around the turn of the century. If you wanted to deploy some new, beautiful code, you’d SFTP the code onto one of the machines in the university’s computer lab, SSH into the machine, compile and run the code. This is a tempting solution in its simplicity, but it runs into considerable issues over time and at scale. However, because that’s roughly what many projects begin with, multiple organizations end up with processes that are somewhat streamlined evolutions of this system, at least for some tasks—the number of machines grows (so you SFTP and SSH into many of them), but the underlying technology remains. For example, in 2002, Jeff Dean, one of Google’s most senior engineers, wrote the following about running an automated data-processing task as a part of the release process:  
    [Running the task] is a logistical, time-consuming nightmare. It currently requires getting a list of 50+ machines, starting up a process on each of these 50+ machines, and monitoring its progress on each of the 50+ machines. There is no support for automatically migrating the computation to another machine if one of the machines dies, and monitoring the progress of the jobs is done in an ad hoc manner [...] Furthermore, since processes can interfere with each other, there is a complicated, human- implemented “sign up” file to throttle the use of machines, which results in less-than- optimal scheduling, and increased contention for the scarce machine resources

想象一下，你是世纪之交时的大学生。如果你想部署一些新的、牛逼的代码，你会把代码从SFTP复制到大学计算机实验室的一台机器上，SSH进入机器，编译并运行代码。这是一个简单而诱人的解决方案，但随着时间的推移和规模的扩大，它遇到了相当多的问题。然而，因为这大概是许多项目开始时的情况，多个组织最终采用的流程在某种程度上是这个系统的流程演变，至少对于某些任务来说是这样的--机器的数量增加了（所以你SFTP和SSH进入其中许多机器），但底层技术仍然存在。例如，2002年，谷歌最资深的工程师之一杰夫·迪恩（Jeff Dean）写了以下关于在发布过程中运行自动数据处理任务的文章：  
    [运行任务]是一个组织管理的、耗时的噩梦。目前，它需要获得一个50多台机器的列表，在这50多台机器上各启动一个进程，并在这50多台机器上各监控其进度。如果其中一台机器宕机了，不支持自动将计算迁移到另一台机器上，而且监测工作的进展是以临时的方式进行的[......]此外，由于进程可以相互干扰，有一个复杂的、人工实现的 "注册 "文件来节制机器的使用，这导致了非最优调度，增加了对稀缺机器资源的争夺。

This was an early trigger in Google’s efforts to tame the compute environment, which explains well how the naive solution becomes unmaintainable at larger scale.

这是谷歌努力驯服计算环境的早期导火索，这很好地解释了这种幼稚的解决方案如何在更大范围内变得不可维护。

> [^2]: Abhishek Verma, Luis Pedrosa, Madhukar R Korupolu, David Oppenheimer, Eric Tune, and John Wilkes, “Large-scale cluster management at Google with Borg,” EuroSys, Article No.: 18 (April 2015): 1–17.
>
> 2  Abhishek Verma、Luis Pedrosa、Madhukar R Korupolu、David Oppenheimer、Eric Tune和John Wilkes，“谷歌与Borg的大规模集群管理”，EuroSys，文章编号：18（2015年4月）：1-17。

#### Simple automations 简单自动化

There are simple things that an organization can do to mitigate some of the pain. The process of deploying a binary onto each of the 50+ machines and starting it there can easily be automated through a shell script, and then—if this is to be a reusable solution—through a more robust piece of code in an easier-to-maintain language that will perform the deployment in parallel (especially since the “50+” is likely to grow over time).

一个组织可以做一些简单的事情来减轻一些痛苦。将二进制文件部署到50多台机器上并在其中启动的过程可以通过一个shell脚本轻松实现自动化，如果这是一个可重用的解决方案，则可以通过一段更健壮的代码，使用一种更易于维护的语言，并行执行部署（特别是因为“50+”可能会随着时间的推移而增长）。

More interestingly, the monitoring of each machine can also be automated. Initially, the person in charge of the process would like to know (and be able to intervene) if something went wrong with one of the replicas. This means exporting some monitoring metrics (like “the process is alive” and “number of documents processed”) from the process—by having it write to a shared storage, or call out to a monitoring service, where they can see anomalies at a glance. Current open source solutions in that space are, for instance, setting up a dashboard in a monitoring tool like Graphana or Prometheus.

更有趣的是，对每台机器的监控也可以自动化。最初，负责进程的人希望知道（并能够进行干预），如果其中一个副本出了问题。这意味着从进程中输出一些监控指标（如 "进程是活的 "和 "处理的文件数"）--让它写到一个共享存储中，或调用一个监控服务，在那里他们可以一眼看到异常情况。目前该领域的开源解决方案是，例如，在Graphana或Prometheus等监控工具中设置一个仪表盘。

If an anomaly is detected, the usual mitigation strategy is to SSH into the machine, kill the process (if it’s still alive), and start it again. This is tedious, possibly error prone (be sure you connect to the right machine, and be sure to kill the right process), and could be automated:

- Instead of manually monitoring for failures, one can use an agent on the machine that detects anomalies (like “the process did not report it’s alive for the past five minutes” or “the process did not process any documents over the past 10 minutes”), and kills the process if an anomaly is detected.
- Instead of logging in to the machine to start the process again after death, it might be enough to wrap the whole execution in a “while true; do run && break; done” shell script.

如果检测到异常，通常的缓解策略是通过SSH进入机器，杀死进程（如果进程仍然在运行），然后重新启动它。这很繁琐，可能容易出错（要确保你连接到正确的机器，并确保关闭正确的进程），并且可以自动化：

- 与其手动监控故障，不如在机器上使用一个代理，检测异常情况（比如 "该进程在过去5分钟内没有报告它处于”活动状态"或 "该进程在过去10分钟内没有处理任何文件"），如果检测到异常情况，就关闭该进程。
- 与其在宕掉后登录到机器上再次启动进程，不如将整个执行过程包裹在一个 "while true; do run && break; done "的shell脚本中。

The cloud world equivalent is setting an autohealing policy (to kill and re-create a VM or container after it fails a health check).

在云计算世界中，相当于设置了一个自动修复策略（在运行状况检查失败后关闭并重新创建VM或容器）。

These relatively simple improvements address a part of Jeff Dean’s problem described earlier, but not all of it; human-implemented throttling, and moving to a new machine, require more involved solutions.

这些相对简单的改进解决了前面描述的杰夫·迪恩问题的一部分，但不是全部；人工实现的流程，以及转移到新机器，需要更复杂的解决方案。

#### Automated scheduling 自动调度

The natural next step is to automate machine assignment. This requires the first real “service” that will eventually grow into “Compute as a Service.” That is, to automate scheduling, we need a central service that knows the complete list of machines available to it and can—on demand—pick a number of unoccupied machines and automatically deploy your binary to those machines. This eliminates the need for a hand-maintained “sign-up” file, instead delegating the maintenance of the list of machines to computers. This system is strongly reminiscent of earlier time-sharing architectures.

下一步自然是自动化机器资源分配。这需要第一个真正的“服务”，最终将发展为“计算即服务”。也就是说，为了自动化调度，我们需要一个中心服务，它知道可用机器的完整列表，并且可以根据需要选择一些未占用的机器，并自动将二进制文件部署到这些机器上。这样就不需要人动了维护“注册”文件，而不是将机器列表的维护委托给计算机。该系统强烈地让人联想起早期的分时贡献体系结构。

A natural extension of this idea is to combine this scheduling with reaction to machine failure. By scanning machine logs for expressions that signal bad health (e.g., mass disk read errors), we can identify machines that are broken, signal (to humans) the need to repair such machines, and avoid scheduling any work onto those machines in the meantime. Extending the elimination of toil further, automation can try some fixes first before involving a human, like rebooting the machine, with the hope that whatever was wrong goes away, or running an automated disk scan.

这种想法的自然延伸是将这种调度与对机器故障的响应结合起来。通过扫描机器日志以查找表示运行状况不良的指标（例如，大量磁盘读取错误），我们可以识别出损坏的机器，向（工程师）发出修复此类机器的信号，同时避免将任何工作安排到这些机器上。为了进一步消除繁重的工作，自动化可以在人工干预之前先尝试一些修复，比如重新启动机器，希望任何错误都能消失，或者运行自动磁盘扫描。

One last complaint from Jeff ’s quote is the need for a human to migrate the computation to another machine if the machine it’s running on breaks. The solution here is simple: because we already have scheduling automation and the capability to detect that a machine is broken, we can simply have the scheduler allocate a new machine and restart the work on this new machine, abandoning the old one. The signal to do this might come from the machine introspection daemon or from monitoring of the individual process.

Jeff引用的最后一个抱怨是，如果正在运行的机器出现故障，人们需要将计算机迁移到另一台机器上。这里的解决方案很简单：因为我们已经有了调度自动化和检测机器故障的能力，我们可以简单地让调度器分配一台新机器，并在这台新机器上重新启动工作，放弃旧机器。执行此操作的信号可能来自机器内部守护进程或来自于对单个进程的监控。

All of these improvements systematically deal with the growing scale of the organization. When the fleet was a single machine, SFTP and SSH were perfect solutions, but at the scale of hundreds or thousands of machines, automation needs to take over. The quote we started from came from a 2002 design document for the “Global WorkQueue,” an early CaaS internal solution for some workloads at Google.

所有这些改进都系统地处理了组织规模不断扩大的问题。当集群是一台机器时，SFTP和SSH是完美的解决方案，但在数百或数千台机器的规模上，需要自动化来接管。我们所引用的这句话来自2002年 "全局工作队列"的设计文件，这是Google早期针对某些工作负载的CaaS内部解决方案。

### Containerization and Multitenancy 容器化和多租户

So far, we implicitly assumed a one-to-one mapping between machines and the programs running on them. This is highly inefficient in terms of computing resource (RAM, CPU) consumption, in many ways:

- It’s very likely to have many more different types of jobs (with different resource requirements) than types of machines (with different resource availability), so many jobs will need to use the same machine type (which will need to be provisioned for the largest of them).
- Machines take a long time to deploy, whereas program resource needs grow over time. If obtaining new, larger machines takes your organization months, you need to also make them large enough to accommodate expected growth of resource needs over the time needed to provision new ones, which leads to waste, as new machines are not utilized to their full capacity.[^3]
- Even when the new machines arrive, you still have the old ones (and it’s likely wasteful to throw them away), and so you must manage a heterogeneous fleet that does not adapt itself to your needs.

到目前为止，我们隐含地假设机器和运行在机器上的程序之间存在一对一的映射。在计算资源（RAM、CPU）消耗方面，这在许多方面都是非常低效的：

- 很可能有许多不同类型的任务（具有不同的资源需求），而机器类型（具有不同的资源可用性）则较少。因此，许多任务将需要使用相同类型的机器（需要为最大的任务配置机器）。这样会导致资源利用率低下。
- 机器部署需要很长时间，而程序的资源需求会随着时间的推移而增长。如果组织需要花费数月时间来获取新的更大机器，那么在配置新机器所需的时间内，你需要确保它们足够大，以适应预期的资源需求增长，这会导致资源浪费，因为新机器的利用率无法充分发挥。
- 即使新机器到达，你仍然拥有旧机器（丢弃它们可能是浪费的），因此你必须管理一个异构的机器群，它不能自动适应你的需求。

The natural solution is to specify, for each program, its resource requirements (in terms of CPU, RAM, disk space), and then ask the scheduler to bin-pack replicas of the program onto the available pool of machines.

最自然的解决方案是为每个程序指定其资源需求（CPU、RAM、磁盘空间），然后要求调度器将程序的副本打包到可用的机器资源池中。

> [^3]: Note that this and the next point apply less if your organization is renting machines from a public cloud provider.
>
> 3 请注意，如果你的组织从公共云提供商那里租用机器，这一点和下一点就不适用。

#### My neighbor’s dog barks in my RAM 邻居家的狗在我的内存中吠叫

The aforementioned solution works perfectly if everybody plays nicely. However, if I specify in my configuration that each replica of my data-processing pipeline will consume one CPU and 200 MB of RAM, and then—due to a bug, or organic growth—it starts consuming more, the machines it gets scheduled onto will run out of resources. In the CPU case, this will cause neighboring serving jobs to experience latency blips; in the RAM case, it will either cause out-of-memory kills by the kernel or horrible latency due to disk swap.[^4]

上述解决方案在每个人都遵守规则的情况下运作得很好。然而，如果我在配置中指定我的数据处理流水线的每个副本将使用一个CPU和200 MB的内存，并且由于错误或指数式增长，它开始消耗更多的资源，那么它调度到的机器将耗尽资源。在消耗CPU的情况下，这将导致相邻的服务工作出现延迟；在消耗RAM的情况下，它要么会导致内核内存不足，要么会由于磁盘交换而导致可怕的延迟。

Two programs on the same computer can interact badly in other ways as well. Many programs will want their dependencies installed on a machine, in some specific version—and these might collide with the version requirements of some other program. A program might expect certain system-wide resources (think about /tmp) to be available for its own exclusive use. Security is an issue—a program might be handling sensitive data and needs to be sure that other programs on the same machine cannot access it.

同一台计算机上的两个程序在其他方面也会相互影响。许多程序希望在特定版本的计算机上安装它们的依赖项，这些依赖项可能会与其他程序的版本要求发生冲突。一个程序可能期望某些系统资源（例如/tmp）可供自己专用。安全性是一个问题--程序可能正在处理敏感数据，需要确保同一台计算机上的其他程序无法访问它。

Thus, a multitenant compute service must provide a degree of *isolation,* a guarantee of some sort that a process will be able to safely proceed without being disturbed by the other tenants of the machine.

因此，多租户计算服务必须提供一定程度的*隔离*，某种程度上保证一个进程能够安全进行而不被机器的其他租户干扰。

A classical solution to isolation is the use of virtual machines (VMs). These, however, come with significant overhead[^5] in terms of resource usage (they need the resources to run a full operating system inside) and startup time (again, they need to boot up a full operating system). This makes them a less-than-perfect solution for batch job containerization for which small resource footprints and short runtimes are expected. This led Google’s engineers designing Borg in 2003 to look to different solutions, ending up with *containers—*a lightweight mechanism based on cgroups (contributed by Google engineers into the Linux kernel in 2007) and chroot jails, bind mounts and/or union/overlay filesystems for filesystem isolation. Open source container implementations include Docker and LMCTFY.

隔离的一个经典解决方案是使用虚拟机（VM）。然而，这些虚拟机在资源使用（它们需要资源在里面运行一个完整的操作系统）和启动时间（同样，它们需要启动一个完整的操作系统）方面有很大的开销。这使得它们成为一个不太完美的解决方案，使用于资源占用少、运行时间短的批量作业容器化。这导致谷歌在2003年设计Borg的工程师们寻找不同的解决方案，最终找到了*容器*--一种基于cgroups（由谷歌工程师在2007年贡献给Linux内核）和chroot jails、bind mounts和/或union/overlay文件系统进行文件系统隔离的轻型机制。开源容器的实现包括Docker和LMCTFY。

Over time and with the evolution of the organization, more and more potential isolation failures are discovered. To give a specific example, in 2011, engineers working on Borg discovered that the exhaustion of the process ID space (which was set by default to 32,000 PIDs) was becoming an isolation failure, and limits on the total number of processes/threads a single replica can spawn had to be introduced. We look at this example in more detail later in this chapter.

随着时间的推移和组织的发展，发现了越来越多的潜在隔离故障。举个具体的例子，2011年，在Borg工作的工程师发现，进程ID空间（默认设置为32000个PID）的耗尽正在成为一个隔离故障，因此不得不引入对单个副本可产生的进程/线程总数的限制。我们将在本章后面更详细地讨论这个例子。

> [^4]: Google has chosen, long ago, that the latency degradation due to disk swap is so horrible that an out-of- memory kill and a migration to a different machine is universally preferable—so in Google’s case, it’s always an out-of-memory kill.
>
> 4 谷歌很久以前就确认了，由于磁盘交换导致的延迟降低是如此可怕，以至于内存不足杀死和迁移到另一台机器是普遍可取的，因此在谷歌的情况下，总是内存不足杀死进程。
>
> [^5]: Although a considerable amount of research is going into decreasing this overhead, it will never be as low as a process running natively.
>
> 5 尽管有大量的研究正在致力于减少这种开销，但它永远不会像一个本机运行的进程那么低。

#### Rightsizing and autoscaling 合理调整和自动缩放

The Borg of 2006 scheduled work based on the parameters provided by the engineer in the configuration, such as the number of replicas and the resource requirements.

2006年的Borg根据工程师在配置中提供的参数，如复制的数量和资源要求，进行工作。

Looking at the problem from a distance, the idea of asking humans to determine the resource requirement numbers is somewhat flawed: these are not numbers that humans interact with daily. And so, these configuration parameters become themselves, over time, a source of inefficiency. Engineers need to spend time determining them upon initial service launch, and as your organization accumulates more and more services, the cost to determine them scales up. Moreover, as time passes, the program evolves (likely grows), but the configuration parameters do not keep up. This ends in an outage—where it turns out that over time the new releases had resource requirements that ate into the slack left for unexpected spikes or outages, and when such a spike or outage actually occurs, the slack remaining turns out to be insufficient.

从长远来看这个问题，要求人类确定资源需求量的想法有些缺陷：这些并不是人类每天都要与之交互的数字。因此，随着时间的推移，这些配置参数本身就成为效率低下的来源。工程师需要花时间在最初的服务启动时确定这些参数，而随着你的组织积累越来越多的服务，确定这些参数的成本也在增加。此外，随着时间的推移，程序的发展（可能不断增长），但配置参数并没有跟上。这最终导致了故障的发生--事实证明，随着时间的推移，新版本的资源需求吃掉了留预期外高峰或故障的冗余资源，而当这种高峰或故障实际发生时，剩余的冗余资源被证明是不够的。

The natural solution is to automate the setting of these parameters. Unfortunately, this proves surprisingly tricky to do well. As an example, Google has only recently reached a point at which more than half of the resource usage over the whole Borg fleet is determined by rightsizing automation. That said, even though it is only half of the usage, it is a larger fraction of configurations, which means that the majority of engineers do not need to concern themselves with the tedious and error-prone burden of sizing their containers. We view this as a successful application of the idea that “easy things should be easy, and complex things should be possible”—just because some fraction of Borg workloads is too complex to be properly managed by rightsizing doesn’t mean there isn’t great value in handling the easy cases.

自然的解决方案是将这些参数的设置自动化。不幸的是，要做好这件事非常棘手。作为一个例子，谷歌最近才达到一个点，即整个Borg集群超过一半的资源使用是由调整大小有自动化系统决定的。也就是说，尽管这只是一半的使用量，但它是配置中较大的一部分，这意味着大多数工程师不需要担心确定容器大小的繁琐且容易出错的问题。我们认为这是对 "简单的事情应该是容易的，复杂的事情应该是可能的 "这一理念的成功应用--仅仅因为Borg工作负载的某些部分过于复杂，无法通过自动调整大小进行适当的管理，并不意味着在处理简单情况时没有巨大的价值。

### Summary 总结

As your organization grows and your products become more popular, you will grow in all of these axes:

- Number of different applications to be managed
- Number of copies of an application that needs to run
- The size of the largest application

随着你的组织的发展和产品的普及，你将在所有这些轴上成长：

- 需要管理的不同应用程序的数量
- 需要运行的应用程序的副本数量
- 最大的应用程序的规模

To effectively manage scale, automation is needed that will enable you to address all these growth axes. You should, over time, expect the automation itself to become more involved, both to handle new types of requirements (for instance, scheduling for GPUs and TPUs is a major change in Borg that happened over the past 10 years) and increased scale. Actions that, at a smaller scale, could be manual, will need to be automated to avoid a collapse of the organization under the load.

为了有效地管理规模，需要自动化，使你能够解决所有这些增长轴。随着时间的推移，你应该期待自动化本身变得更多，既要处理新类型的要求（例如，GPU和TPU的调度是 Borg 在过去10年里发生的一个主要变化），又要处理规模的增加。在较小的规模下，可能是手动的操作，将需要自动化，以避免组织在负载下的崩溃。

One example—a transition that Google is still in the process of figuring out—is automating the management of our *datacenters*. Ten years ago, each datacenter was a separate entity. We manually managed them. Turning a datacenter up was an involved manual process, requiring a specialized skill set, that took weeks (from the moment when all the machines are ready) and was inherently risky. However, the growth of the number of datacenters Google manages meant that we moved toward a model in which turning up a datacenter is an automated process that does not require human intervention.

一个例子--谷歌仍在摸索的转变--是自动管理我们的*数据中心*。十年前，每个数据中心是一个独立的实体。我们手动管理它们。启用一个数据中心是一个复杂的手动过程，需要专门的技能，需要几周的时间（从所有机器准备好的那一刻开始），而且本身就有风险。然而，谷歌管理的数据中心数量的增长意味着我们转向了一种模式，即启动数据中心是一个不需要人工干预的自动化过程。

## Writing Software for Managed Compute 为管理计算能力编写软件

The move from a world of hand-managed lists of machines to the automated scheduling and rightsizing made management of the fleet much easier for Google, but it also took profound changes to the way we write and think about software.

从手工管理的机器列表转向自动化的计划和调整规模，这使得谷歌更容易管理集群，但也给我们编写和思考软件的方式带来了深刻的变化。

### Architecting for Failure 故障架构

Imagine an engineer is to process a batch of one million documents and validate their correctness. If processing a single document takes one second, the entire job would take one machine roughly 12 days—which is probably too long. So, we shard the work across 200 machines, which reduces the runtime to a much more manageable 100 minutes.

想象一下，一个工程师要处理一批100万份文件并验证其正确性。如果处理一个文件需要一秒钟，那么整个工作将需要一台机器大约12天--这可能太长了。因此，我们把工作分散到200台机器上，这将运行时间减少到更易于管理的100分钟。

As discussed in “Automated scheduling” on page 519, in the Borg world, the scheduler can unilaterally kill one of the 200 workers and move it to a different machine.[^6] The “move it to a different machine” part implies that a new instance of your worker can be stamped out automatically, without the need for a human to SSH into the machine and tune some environment variables or install packages.

正如第519页 "自动调度 "中所讨论的，在 Borg 世界中，调度中心可以单方面杀死200个worker中的一个，并把它移到不同的机器上。"把它移到不同的机器上 "这部分意味着你的workers的新实例可以自动被输出出来，不需要人手动去SSH进入机器，调整一些环境变量或安装软件包。

The move from “the engineer has to manually monitor each of the 100 tasks and attend to them if broken” to “if something goes wrong with one of the tasks, the system is architected so that the load is picked up by others, while the automated scheduler kills it and reinstantiates it on a new machine” has been described many years later through the analogy of “pets versus cattle.”[^7]

从 "工程师必须手动监控100个任务中的每一个，并在出现问题时对其进行处理 "到 "如果其中一个任务出现问题，系统会被设计成由其他任务来承担，而自动化系统会将其杀死并在新的机器上重新执行"，这一转变在许多年后通过 "宠物与牛"的比喻来描述。

If your server is a pet, when it’s broken, a human comes to look at it (usually in a panic), understand what went wrong, and hopefully nurse it back to health. It’s difficult to replace. If your servers are cattle, you name them replica001 to replica100, and if one fails, automation will remove it and provision a new one in its place. The distinguishing characteristic of “cattle” is that it’s easy to stamp out a new instance of the job in question—it doesn’t require manual setup and can be done fully automatically. This allows for the self-healing property described earlier—in the case of a failure, automation can take over and replace the unhealthy job with a new, healthy one without human intervention. Note that although the original metaphor spoke of servers (VMs), the same applies to containers: if you can stamp out a new version of the container from an image without human intervention, your automation will be able to autoheal your service when required.

如果你的服务器是一只宠物，当它坏了时，一个人会来看它（通常是惊慌失措），了解出了什么问题，并希望护理它恢复健康。很难更换。如果你的服务器是牛群，你可以将它们命名为replica001到replica100，如果其中一个服务器出现故障，自动化将删除它并在其位置提供一个新的服务器。“牛群”的独特之处在于，它可以很容易地删除相关作业的新实例--它不需要手动设置，可以完全自动完成。这就实现了前面描述的自愈特性。在发生故障的情况下，自动化可以接管不健康的工作，并用一个新的、健康的工作替换它，而无需人工干预。请注意，尽管最初的隐喻谈到了服务器（VM），但同样适用于容器：如果你可以在无需人工干预的情况下从镜像中删除容器的新版本，那么你的自动化将能够在需要时自动修复你的服务。

If your servers are pets, your maintenance burden will grow linearly, or even superlinearly, with the size of your fleet, and that’s a burden that no organization should accept lightly. On the other hand, if your servers are cattle, your system will be able to return to a stable state after a failure, and you will not need to spend your weekend nursing a pet server or container back to health.

如果你的服务器是宠物，你的维护负担将随着你的集群规模线性增长，甚至是超线性增长，这是任何组织都不应轻视的负担。另一方面，如果你的服务器是牛群，你的系统将能够在故障后恢复到一个稳定的状态，你将不需要花周末的时间来护理一个宠物服务器或容器恢复健康。

Having your VMs or containers be cattle is not enough to guarantee that your system will behave well in the face of failure, though. With 200 machines, one of the replicas being killed by Borg is quite likely to happen, possibly more than once, and each time it extends the overall duration by 50 minutes (or however much processing time was lost). To deal with this gracefully, the architecture of the processing needs to be different: instead of statically assigning the work, we instead divide the entire set of one million documents into, say, 1,000 chunks of 1,000 documents each. Whenever a worker is finished with a particular chunk, it reports the results, and picks up another. This means that we lose at most one chunk of work on a worker failure, in the case when the worker dies after finishing the chunk, but before reporting it. This, fortunately, fits very well with the data-processing architecture that was Google’s standard at that time: work isn’t assigned equally to the set of workers at the start of the computation; it’s dynamically assigned during the overall processing in order to account for workers that fail.

不过，让虚拟机或容器正常运行并不足以保证系统在出现故障时表现良好。对于200台机器，Borg很可能会杀死其中一个复制副本，可能不止一次，每次都会将整个持续时间延长50分钟（或者无论损失多少处理时间）。为了优雅地处理这个问题，处理的架构需要改变：我们不是固定地分配工作，而是将100万个文档的整个集合划分为1000个块，每个块包含1000个文档。每当一个worker完成了一个特定的块，它就会报告结果，并拿起另一个。这意味着，如果worker在完成区块后但在报告之前宕机，我们在worker失败时最多损失一个区块的工作。幸运的是，这非常符合当时谷歌标准的数据处理架构：在计算开始时，任务并不是平均分配给一组worker的；而是在整个处理过程中动态分配的，以便考虑到worker的失败。

Similarly, for systems serving user traffic, you would ideally want a container being rescheduled not resulting in errors being served to your users. The Borg scheduler, when it plans to reschedule a container for maintenance reasons, signals its intent to the container to give it notice ahead of time. The container can react to this by refusing new requests while still having the time to finish the requests it has ongoing. This, in turn, requires the load-balancer system to understand the “I cannot accept new requests” response (and redirect traffic to other replicas).

同样的，对于服务于用户流量的系统来说，理想情况下，希望容器调度不会导致向用户提供错误。当Borg调度器由于维护原因计划重新调度一个容器时，会向容器发出信号以提前通知它。容器可以通过拒绝新的请求来做出反应，同时还有时间来完成它正在进行的请求。这反过来要求负载均衡器系统理解 "我不能接受新请求"的响应（并将流量重定向到其他副本）。

To summarize: treating your containers or servers as cattle means that your service can get back to a healthy state automatically, but additional effort is needed to make sure that it can function smoothly while experiencing a moderate rate of failures.

总而言之：将容器或服务器视为“牛群”意味着你的服务可以自动恢复到正常状态，但还需要付出额外的努力，以确保它能够在遇到中等故障率的情况下顺利运行。

> [^6]: The scheduler does not do this arbitrarily, but for concrete reasons (like the need to update the kernel, or a disk going bad on the machine, or a reshuffle to make the overall distribution of workloads in the datacenter bin-packed better). However, the point of having a compute service is that as a software author, I should neither know nor care why regarding the reasons this might happen.
>
> 6 调度器并不是随意这样做的，而是出于具体的原因（比如需要更新内核，或者机器上的磁盘坏了，或者为了更好地打包数据中心容器中的工作负载的总体分布而进行的改组）。然而，拥有计算服务的意义在于，作为软件作者，我不应该知道也不关心为什么会发生这种情况。
>
> [^7]: The “pets versus cattle” metaphor is attributed to Bill Baker by Randy Bias and it’s become extremely popular as a way to describe the “replicated software unit” concept. As an analogy, it can also be used to describe concepts other than servers; for example, see Chapter 22.
>
> 7 "宠物与牛群"的比喻是由Randy Bias归功于Bill Baker的，它作为描述 "复制的软件单元 "概念的一种方式，已经变得非常流行。作为一个比喻，它也可以用来描述服务器以外的概念；例如，见第22章。

### Batch Versus Serving 批量作业与服务作业

The Global WorkQueue (which we described in the first section of this chapter) addressed the problem of what Google engineers call “batch jobs”—programs that are expected to complete some specific task (like data processing) and that run to completion. Canonical examples of batch jobs would be logs analysis or machine learning model learning. Batch jobs stood in contrast to “serving jobs”—programs that are expected to run indefinitely and serve incoming requests, the canonical example being the job that served actual user search queries from the prebuilt index.

全局工作队列（Global WorkQueue）（我们在本章第一节中描述过）解决了谷歌工程师所说的 "批处理作业"的问题--这些程序要完成一些特定的任务（如数据处理），并且要运行到完成。批量作业的典型例子是日志分析或机器学习模型学习。批量作业与"服务作业"形成鲜明对比--这些程序预计将无限期地运行并为传入的请求提供服务，典型的例子是为来自预构建索引的实际用户搜索查询提供服务的作业。

These two types of jobs have (typically) different characteristics,[^8] in particular:

- Batch jobs are primarily interested in throughput of processing. Serving jobs care about latency of serving a single request.
- Batch jobs are short lived (minutes, or at most hours). Serving jobs are typically long lived (by default only restarted with new releases).
- Because they’re long lived, serving jobs are more likely to have longer startup times.

这两类作业（通常）具有不同的特点，特别是：

- 批量作业主要关心的是处理的吞吐量。服务作业关心的是服务单个请求的延迟。
- 批量作业的生命周期很短（几分钟，或最多几个小时）。服务工作通常是长期存在的（默认情况下，只有在新版本发布时才会重新启动）。
- 因为它们是长期存在的，所以服务工作更有可能有较长的启动时间。

So far, most of our examples were about batch jobs. As we have seen, to adapt a batch job to survive failures, we need to make sure that work is spread into small chunks and assigned dynamically to workers. The canonical framework for doing this at Google was MapReduce,[^9] later replaced by Flume.[^10]

到目前为止，我们大部分的例子都是关于批处理作业的。正如我们所看到的，为了使批处理作业适应失败，我们需要确保工作被分散成小块，并动态地分配给worker。在谷歌，这样做的典型框架是MapReduce，后来被Flume取代。

Serving jobs are, in many ways, more naturally suited to failure resistance than batch jobs. Their work is naturally chunked into small pieces (individual user requests) that are assigned dynamically to workers—the strategy of handling a large stream of requests through load balancing across a cluster of servers has been used since the early days of serving internet traffic.

在许多方面，服务作业比批量作业更自然地适合于抗故障。他们的工作自然地分成小块（单个用户请求），动态地分配给worker。从互联网流量服务的早期开始，就采用了通过服务器集群负载平衡来处理大量请求的策略。

However, there are also multiple serving applications that do not naturally fit that pattern. The canonical example would be any server that you intuitively describe as a “leader” of a particular system. Such a server will typically maintain the state of the system (in memory or on its local filesystem), and if the machine it is running on goes down, a newly created instance will typically be unable to re-create the system’s state. Another example is when you have large amounts of data to serve—more than fits on one machine—and so you decide to shard the data among, for instance, 100 servers, each holding 1% of the data, and handling requests for that part of the data. This is similar to statically assigning work to batch job workers; if one of the servers goes down, you (temporarily) lose the ability to serve a part of your data. A final example is if your server is known to other parts of your system by its hostname. In that case, regardless of how your server is structured, if this specific host loses network connectivity, other parts of your system will be unable to contact it.[^11]

然而，也有多个服务应用程序不适合这种模式。典型的例子是任何你直观地描述为某个特定系统“领导者”的服务器。这样的服务器通常会维护系统的状态（在内存中或在其本地文件系统中），如果它所运行的机器出现故障，新创建的实例通常无法重新创建系统的状态。另一个例子是，当你有大量的数据需要服务--超过一台机器所能容纳的--于是你决定将数据分片，比如说，100台服务器，每台都持有1%的数据，并处理这部分数据的请求。这类似于将工作静态地分配给批处理工作的worker；如果其中一个服务器发生故障，你就会（暂时）失去为部分数据服务的能力。最后一个示例是，系统的其他部分是否知道服务器的主机名。在这种情况下，无论服务器的结构如何，如果此特定主机失去网络连接，系统的其他部分将无法与之联系。

> [^8]: Like all categorizations, this one isn’t perfect; there are types of programs that don’t fit neatly into any of the categories, or that possess characteristics typical of both serving and batch jobs. However, like most useful categorizations, it still captures a distinction present in many real-life cases.
>
> 8 像所有的分类一样，这个分类并不完美；有些类型的程序不适合任何类别，或者具有服务作业和批处理作业的典型特征。然而，与最有用的分类一样，它仍然抓住了许多实际案例中存在的区别。
>
> [^9]: See Jeffrey Dean and Sanjay Ghemawat, “MapReduce: Simplified Data Processing on Large Clusters,” 6th Symposium on Operating System Design and Implementation (OSDI), 2004.
>
> 9 见Jeffrey Dean和Sanjay Ghemawat，"MapReduce。简化大型集群上的数据处理，"第六届操作系统设计与实现研讨会（OSDI），2004。
>
> [^10]: Craig Chambers, Ashish Raniwala, Frances Perry, Stephen Adams, Robert Henry, Robert Bradshaw, and Nathan Weizenbaum, “Flume‐Java: Easy, Efficient Data-Parallel Pipelines,” ACM SIGPLAN Conference on Programming Language Design and Implementation (PLDI), 2010.
>
> 10 Craig Chambers, Ashish Raniwala, Frances Perry, Stephen Adams, Robert Henry, Robert Bradshaw, and Nathan Weizenbaum, "Flume-Java: Easy, Efficient Data-Parallel Pipelines," ACM SIGPLAN编程语言设计与实现会议（PLDI），2010。
>
> [^11]: See also Atul Adya et al. “Auto-sharding for datacenter applications,” OSDI, 2019; and Atul Adya, Daniel Myers, Henry Qin, and Robert Grandl, “Fast key-value stores: An idea whose time has come and gone,” HotOS XVII, 2019.
>
> 11 另见Atul Adya等人，"数据中心应用的自动分片"，OSDI，2019；以及Atul Adya、Daniel Myers、Henry Qin和Robert Grandl，"快速键值存储。一个时代已经到来的想法，" HotOS XVII，2019年。

### Managing State 管理状态

One common theme in the previous description focused on *state* as a source of issues when trying to treat jobs like cattle.[^12] Whenever you replace one of your cattle jobs, you lose all the in-process state (as well as everything that was on local storage, if the job is moved to a different machine). This means that the in-process state should be treated as transient, whereas “real storage” needs to occur elsewhere.

在前面的描述中，有一个共同的主题集中在*状态*上，当试图像对待牛一样对待作业时，*状态*是问题的来源。每当你替换你的一个牛的作业时，你会失去所有的进程中的状态（以及所有在本地存储的东西，如果作业被转移到不同的机器上）。这意味着进程内状态应被视为瞬态，而“真实存储”需要发生在其他地方。

The simplest way of dealing with this is extracting all storage to an external storage system. This means that anything that should survive past the scope of serving a single request (in the serving job case) or processing one chunk of data (in the batch case) needs to be stored off machine, in durable, persistent storage. If all your local state is immutable, making your application failure resistant should be relatively painless.

处理这个问题的最简单方法是将所有的存储提取到外部存储系统。这意味着任何应该在服务单一请求（在服务工作的情况下）或处理一个数据块（在批处理的情况下）的范围内生存的东西都需要存储在机器外的持久性存储中。如果所有的本地状态都是不可变的，那么让应用程序具有抗故障能力应该是相对容易的。

Unfortunately, most applications are not that simple. One natural question that might come to mind is, “How are these durable, persistent storage solutions implemented are *they* cattle?” The answer should be “yes.” Persistent state can be managed by cattle through state replication. On a different level, RAID arrays are an analogous concept; we treat disks as transient (accept the fact one of them can be gone) while still maintaining state. In the servers world, this might be realized through multiple replicas holding a single piece of data and synchronizing to make sure every piece of data is replicated a sufficient number of times (usually 3 to 5). Note that setting this up correctly is difficult (some way of consensus handling is needed to deal with writes), and so Google developed a number of specialized storage solutions[^13] that were enablers for most applications adopting a model where all state is transient.

不幸的是，大多数应用并不那么简单。可能会想到的一个自然而然问题是："这些持久的存储解决方案是如何实现的—它们是*牛*吗？" 答案应该是 "是的"。牛可以通过状态复制来管理持久状态。在不同的层面上，RAID阵列是一个类似的概念；我们将磁盘视为暂时的（接受其中一个可以消失的事实），同时仍保持主要状态。在服务器世界中，这可以通过多个副本来实现，多个副本保存一个数据段并进行同步，以确保每个数据段都被复制足够的次数（通常为3到5次）。请注意，正确设置此选项很困难（需要某种一致性处理方式来处理写操作），因此Google开发了许多专门的存储解决方案13，这些解决方案是采用所有状态都是瞬态的模型的大多数应用程序的推动者。

Other types of local storage that cattle can use covers “re-creatable” data that is held locally to improve serving latency. Caching is the most obvious example here: a cache is nothing more than transient local storage that holds state in a transient location, but banks on the state not going away all the time, which allows for better performance characteristics on average. A key lesson for Google production infrastructure has been to provision the cache to meet your latency goals, but provision the core application for the total load. This has allowed us to avoid outages when the cache layer was lost because the noncached path was provisioned to handle the total load (although with higher latency). However, there is a clear trade-off here: how much to spend on the redundancy to mitigate the risk of an outage when cache capacity is lost.

牛可以使用的其他类型的本地存储包括本地保存的“可重新创建”数据，以改善服务延迟。缓存是这里最明显的例子：缓存只不过是在一个短暂的位置上保存状态的本地存储，但却依赖于该状态不会一直消失，这使得平均性能特征更好。谷歌生产基础设施的一个关键经验是，配置缓存以满足你的延迟要求，但为总负载配置核心应用程序。这使得我们能够在缓存层丢失时避免故障，因为非缓存路径的配置能够处理总的负载（尽管延迟更高）。然而，这里有一个明显的权衡：当缓存容量丢失时，要在冗余上花多少钱才能减轻故障的风险。

In a similar vein to caching, data might be pulled in from external storage to local in the warm-up of an application, in order to improve request serving latency.

与缓存类似，在应用程序的预热过程中，数据可能从外部存储拉到本地，以改善请求服务延迟。

One more case of using local storage—this time in case of data that’s written more than read—is batching writes. This is a common strategy for monitoring data (think, for instance, about gathering CPU utilization statistics from the fleet for the purposes of guiding the autoscaling system), but it can be used anywhere where it is acceptable for a fraction of data to perish, either because we do not need 100% data coverage (this is the monitoring case), or because the data that perishes can be re-created (this is the case of a batch job that processes data in chunks, and writes some output for each chunk). Note that in many cases, even if a particular calculation has to take a long time, it can be split into smaller time windows by periodic checkpointing of state to persistent storage.

还有一种使用本地存储的情况--这次是在数据写入多于读取的情况下--是批量写入。这是监控数据的常见策略（例如，考虑从机群中收集CPU利用率的统计数据，以指导自动伸缩系统），但它也可以用在任何可以接受部分数据丢失的地方，因为我们不需要100%的数据覆盖（这是监控的情况），或者因为丢失的数据可以重新创建（这是一个批处理作业的情况，它分块处理数据，并为每个分块写一些输出）。请注意，在很多情况下，即使一个特定的计算需要很长的时间，也可以通过定期检查状态到持久性存储的方式将其分割成更小的时间窗口。

> [^12]: Note that, besides distributed state, there are other requirements to setting up an effective “servers as cattle” solution, like discovery and load-balancing systems (so that your application, which moves around the datacenter, can be accessed effectively). Because this book is less about building a full CaaS infrastructure and more about how such an infrastructure relates to the art of software engineering, we won’t go into more detail here.
>
> 12 请注意，除了分布式状态，建立一个有效的 "服务器即牛 "解决方案还有其他要求，比如发现和负载平衡系统（以便你的应用程序，在数据中心内移动，可以被有效访问）。因为这本书与其说是关于建立一个完整的CaaS基础设施，不如说是关于这样的基础设施与软件工程艺术的关系，所以我们在这里就不多说了。
>
> [^13]: See, for example, Sanjay Ghemawat, Howard Gobioff, and Shun-Tak Leung, “The Google File System,” Proceedings of the 19th ACM Symposium on Operating Systems, 2003; Fay Chang et al., “Bigtable: A Distributed Storage System for Structured Data,” 7th USENIX Symposium on Operating Systems Design and Implementation (OSDI); or James C. Corbett et al., “Spanner: Google’s Globally Distributed Database,” OSDI, 2012.
>
> 13 例如，见Sanjay Ghemawat, Howard Gobioff, and Shun-Tak Leung, "The Google File System," Pro- ceedings of the 19th ACM Symposium on Operating Systems, 2003; Fay Chang等人, "Bigtable: 一个结构化数据的分布式存储系统，"第七届USENIX操作系统设计和实施研讨会（OSDI）；或James C. Corbett等人，”Spanner:谷歌的全球分布式数据库"，OSDI，2012。

#### Connecting to a Service 连接到服务

As mentioned earlier, if anything in the system has the name of the host on which your program runs hardcoded (or even provided as a configuration parameter at startup), your program replicas are not cattle. However, to connect to your application, another application does need to get your address from somewhere. Where?

如前所述，如果系统中的任何内容都有你的程序所运行的主机的名字的硬编码（甚至在启动时作为配置参数提供），则程序副本不可用。然而，为了连接到你的应用程序，另一个应用程序确实需要从某个地方获得你的地址。在哪里？

The answer is to have an extra layer of indirection; that is, other applications refer to your application by some identifier that is durable across restarts of the specific “backend” instances. That identifier can be resolved by another system that the scheduler writes to when it places your application on a particular machine. Now, to avoid distributed storage lookups on the critical path of making a request to your application, clients will likely look up the address that your app can be found on, and set up a connection, at startup time, and monitor it in the background. This is generally called *service discovery*, and many compute offerings have built-in or modular solutions. Most such solutions also include some form of load balancing, which reduces coupling to specific backends even more.

答案是有一个额外的代理层；也就是说，其他应用程序通过某个标识符来引用你的应用程序，这些标识符在特定的"后端"实例的重启中是持久的。这个标识符可以由另一个系统来解决，当调度器把你的应用程序放在一个特定的机器上时，它就会写到这个系统。现在，为了避免在向你的应用程序发出请求的关键路径上进行分布式存储查询，客户可能会在启动时查询你的应用程序的地址，并建立一个连接，并在后台监控它。这通常被称为*服务发现*，许多计算产品有内置或模块化的解决方案。大多数这样的解决方案还包括某种形式的负载平衡，这就进一步减少了与特定后端的耦合。

A repercussion of this model is that you will likely need to repeat your requests in some cases, because the server you are talking to might be taken down before it manages to answer.[^14] Retrying requests is standard practice for network communication (e.g., mobile app to a server) because of network issues, but it might be less intuitive for things like a server communicating with its database. This makes it important to design the API of your servers in a way that handles such failures gracefully. For mutating requests, dealing with repeated requests is tricky. The property you want to guarantee is some variant of *idempotency—*that the result of issuing a request twice is the same as issuing it once. One useful tool to help with idempotency is client- assigned identifiers: if you are creating something (e.g., an order to deliver a pizza to a specific address), the order is assigned some identifier by the client; and if an order with that identifier was already recorded, the server assumes it’s a repeated request and reports success (it might also validate that the parameters of the order match).

这种模式的影响是，在某些情况下，你可能需要重复你的请求，因为你对话的服务器可能在响应之前就被关闭了。由于网络问题，重试请求是网络通信的标准做法（例如，移动应用程序到服务器），但对于像服务器与数据库通信的事情来说，这可能不够直接。这使得在设计你的服务器的API时，必须能够优雅地处理这种故障。对于突变的请求，处理重复请求是很棘手的。你想保证的属性是*幂等性变体*--发出一个请求两次的结果与发出一次相同。帮助实现幂等性的一个有用工具是客户机指定的标识符：如果你正在创建一些内容（例如，将比萨饼送到一个特定的地址的订单），该订单由客户端分配一些标识符；如果一个具有该标识符的订单已经被记录下来，服务器会认为这是一个重复的请求并报告成功（它也可能验证该订单的参数是否匹配）。

One more surprising thing that we saw happen is that sometimes the scheduler loses contact with a particular machine due to some network problem. It then decides that all of the work there is lost and reschedules it onto other machines—and then the machine comes back! Now we have two programs on two different machines, both thinking they are “replica072.” The way for them to disambiguate is to check which one of them is referred to by the address resolution system (and the other one should terminate itself or be terminated); but it also is one more case for idempotency: two replicas performing the same work and serving the same role are another potential source of request duplication.

我们看到的另一件令人惊讶的事情是，有时调度器会因为一些网络问题而与某台机器失去联系。然后它认为那里的所有工作都丢失了，并将其重新安排到其他机器上--然后这台机器又回来了! 现在我们在两台不同的机器上有两个程序，都认为自己是 "replica072"。他们消除歧义的方法是检查他们中的哪一个被地址解析系统提及（而另一个应该终止自己或被终止）；但这也是幂等性的另一个案例：两个执行相同工作并担任相同角色的副本是请求重复的另一个潜在来源。

> [^14]: Note that retries need to be implemented correctly—with backoff, graceful degradation and tools to avoid cascading failures like jitter. Thus, this should likely be a part of Remote Procedure Call library, instead of implemented by hand by each developer. See, for example, Chapter 22: Addressing Cascading Failures in the SRE book.
>
> 14 请注意，重试需要正确地实现--用后退、优雅降级和工具来避免像抖动那样的失败。因此，这可能应该是远程过程调用库的一部分，而不是由每个开发人员手工实现。例如，见SRE书中的第22章：解决级联故障。

### One-Off Code 一次性代码

Most of the previous discussion focused on production-quality jobs, either those serving user traffic, or data-processing pipelines producing production data. However, the life of a software engineer also involves running one-off analyses, exploratory prototypes, custom data-processing pipelines, and more. These need compute resources.

前面的讨论大多集中在生产质量的工作上，要么是那些为用户流量服务的工作，要么是产生生产数据的数据处理管道。然而，软件工程师的生活也涉及到运行一次性分析、探索性原型、定制数据处理管道等等。这些都需要计算资源。

Often, the engineer’s workstation is a satisfactory solution to the need for compute resources. If one wants to, say, automate the skimming through the 1 GB of logs that a service produced over the last day to check whether a suspicious line A always occurs before the error line B, they can just download the logs, write a short Python script, and let it run for a minute or two.

通常，工程师的工作站是满足计算资源需求的满意解决方案。比如说，如果想自动浏览服务在最后一天生成的1GB日志，以检查可疑A行是否总是出现在错误B行之前，他们可以下载日志，编写一个简短的Python脚本，然后让它运行一两分钟即可。

But if they want to automate the skimming through 1 TB of logs that service produced over the last year (for a similar purpose), waiting for roughly a day for the results to come in is likely not acceptable. A compute service that allows the engineer to just run the analysis on a distributed environment in several minutes (utilizing a few hundred cores) means the difference between having the analysis now and having it tomorrow. For tasks that require iteration—for example, if I will need to refine the query after seeing the results—the difference may be between having it done in a day and not having it done at all.

但是，如果他们想自动浏览去年服务生产的1 TB日志（出于类似目的），等待大约一天的结果可能是不可接受的。一个允许工程师在几分钟内（利用几百个内核）在分布式环境中运行分析的计算服务意味着立即得到分析结果和明天才能得到结果之间的区别。例如，对于需要迭代的任务，如果我在看到结果后需要优化查询，那么在一天内完成任务和根本无法完成任务之间可能存在差异。

One concern that arises at times with this approach is that allowing engineers to just run one-off jobs on the distributed environment risks them wasting resources. This is, of course, a trade-off, but one that should be made consciously. It’s very unlikely that the cost of processing that the engineer runs is going to be more expensive than the engineer’s time spent on writing the processing code. The exact trade-off values differ depending on an organization’s compute environment and how much it pays its engineers, but it’s unlikely that a thousand core hours costs anything close to a day of engineering work. Compute resources, in that respect, are similar to markers, which we discussed in the opening of the book; there is a small savings opportunity for the company in instituting a process to acquire more compute resources, but this process is likely to cost much more in lost engineering opportunity and time than it saves.

这种方法有时会引起一个问题，即允许工程师在分布式环境中运行一次性作业可能会浪费资源。当然，这是一种权衡，但应该有意识地进行权衡。工程师运行的处理成本很可能不会比工程师写处理代码的时间更贵。确切的权衡取决于一个组织的计算环境和它付给工程师的工资多少，但一千个核心小时的成本不太可能接近一天的工程工作量。在这方面，计算资源类似于标记，我们在本书的开篇中讨论过；对于公司来说，建立一个获取更多计算资源的过程是一个很小的节约机会，但是这个过程在失去工程机会和时间方面的成本可能比它节省的成本高得多。

That said, compute resources differ from markers in that it’s easy to take way too many by accident. Although it’s unlikely someone will carry off a thousand markers, it’s totally possible someone will accidentally write a program that occupies a thousand machines without noticing.[^15] The natural solution to this is instituting quotas for resource usage by individual engineers. An alternative used by Google is to observe that because we’re running low-priority batch workloads effectively for free (see the section on multitenancy later on), we can provide engineers with almost unlimited quota for low-priority batch, which is good enough for most one-off engineering tasks.

这就是说，计算资源与标记的不同之处在于，很容易因意外而占用过多的资源。虽然不太可能有人会携带上千个标记，但完全有可能有人会无意中编写一个程序，在没有注意到的情况下占用了上千台机器。解决这一问题的自然方法是为每个工程师的资源使用设定配额。谷歌使用的一个替代方案是，由于我们正在有效地免费运行低优先级的批处理工作负载（见后面关于多租户的部分），我们可以为工程师提供几乎无限的低优先级批处理配额，这对于大多数一次性工程任务来说已经足够了。

> [^15]: This has happened multiple times at Google; for instance, because of someone leaving load-testing infrastructure occupying a thousand Google Compute Engine VMs running when they went on vacation, or because a new employee was debugging a master binary on their workstation without realizing it was spawning 8,000 full-machine workers in the background.
>
> 15  这种情况在谷歌发生过多次；例如，因为有人在休假时留下了占用一千台谷歌计算引擎虚拟机的负载测试基础设施，或者因为一个新员工在他们的工作站上调试一个主二进制文件时，没有意识到它在后台催生了8000个全机器worker。

## CaaS Over Time and Scale CaaS随时间和规模的变化

We talked above how CaaS evolved at Google and the basic parts needed to make it happen—how the simple mission of “just give me resources to run my stuff ” translates to an actual architecture like Borg. Several aspects of how a CaaS architecture affects the life of software across time and scale deserve a closer look.

我们在上面讨论了CaaS是如何在Google发展起来的，以及实现它所需要的基本部分--"只需给我资源来运行我的东西 "的简单任务是如何过渡到像Borg这样的架构。CaaS体系结构如何跨时间和规模影响软件生命周期的几个方面值得仔细研究。

### Containers as an Abstraction  容器是一种抽象

Containers, as we described them earlier, were shown primarily as an isolation mechanism, a way to enable multitenancy, while minimizing the interference between different tasks sharing a single machine. That was the initial motivation, at least in Google. But containers turned out to also serve a very important role in abstracting away the compute environment.

正如我们前面所描述的，容器主要是一种隔离机制，一种实现多租户的方法，同时最大限度地减少共享一台机器的不同任务之间的干扰。这是最初的动机，至少在谷歌是这样。但事实证明，容器在抽象计算环境方面也起着非常重要的作用。

A container provides an abstraction boundary between the deployed software and the actual machine it’s running on. This means that as—over time—the machine changes, it is only the container software (presumably managed by a single team) that has to be adapted, whereas the application software (managed by each individual team, as the organization grows) can remain unchanged.

容器在部署的软件和它所运行的实际机器之间提供了一个抽象边界。这意味着，随着时间的推移，机器发生了变化，只有容器软件（大概由一个团队管理）需要调整，而应用软件（随着组织的发展，由每个团队管理）可以保持不变。

Let’s discuss two examples of how a containerized abstraction allows an organization to manage change.

让我们来讨论两个例子，说明容器化的抽象如何让一个组织管理变化。

A *filesystem abstraction* provides a way to incorporate software that was not written in the company without the need to manage custom machine configurations. This might be open source software an organization runs in its datacenter, or acquisitions that it wants to onboard onto its CaaS. Without a filesystem abstraction, onboarding a binary that expects a different filesystem layout (e.g., expecting a helper binary at */bin/foo/bar*) would require either modifying the base layout of all machines in the fleet, or fragmenting the fleet, or modifying the software (which might be difficult, or even impossible due to licence considerations).

*文件系统抽象*提供了一种方法，将不是由公司编写的软件整合进来的方式，而无需管理自定义的机器配置。这可能是某个组织在其数据中心运行的开源软件，或者是它想在其CaaS上进行的整合。在没有文件系统抽象的情况下，如果一个二进制文件需要一个不同的文件系统布局（例如，期望在*/bin/foo/bar*有一个附加二进制文件）将需要修改机群中所有机器的基本布局，或者对集群进行分段操作，或者修改软件（这可能会由于许可证考虑而变得困难甚至不可能）。

Even though these solutions might be feasible if importing an external piece of software is something that happens once in a lifetime, it is not a sustainable solution if importing software becomes a common (or even only-somewhat-rare) practice.

即使这些解决方案可能是可行的，如果导入一个外部软件是一生中只会发生一次的事情，但如果导入软件成为一种常见的（甚至只是有点罕见的）做法，这不是一个可持续的解决方案。

A filesystem abstraction of some sort also helps with dependency management because it allows the software to predeclare and prepackage the dependencies (e.g., specific versions of libraries) that the software needs to run. Depending on the software installed on the machine presents a leaky abstraction that forces everybody to use the same version of precompiled libraries and makes upgrading any component very difficult, if not impossible.

某种类型的文件系统抽象也有助于依赖性管理，因为它允许软件预先声明和预包装软件运行所需的依赖性（例如，特定版本的库）。依赖于安装在机器上的软件提出了一个漏洞百出的抽象，迫使每个人都使用相同版本的预编译库，使任何组件的升级都非常困难，甚至不可能。

A container also provides a simple way to manage *named resources* on the machine. The canonical example is network ports; other named resources include specialized targets; for example, GPUs and other accelerators.

容器还提供了一种简单的方法来管理计算机上的*命名资源*。典型的示例是网络端口；其他命名资源包括专用目标；例如GPU和其他加速器。

Google initially did not include network ports as a part of the container abstraction, and so binaries had to search for unused ports themselves. As a result, the PickUnu sedPortOrDie function has more than 20,000 usages in the Google C++ codebase. Docker, which was built after Linux namespaces were introduced, uses namespaces to provide containers with a virtual-private NIC, which means that applications can listen on any port they want. The Docker networking stack then maps a port on the machine to the in-container port. Kubernetes, which was originally built on top of Docker, goes one step further and requires the network implementation to treat containers (“pods” in Kubernetes parlance) as “real” IP addresses, available from the host network. Now every app can listen on any port they want without fear of conflicts.

Google最初并没有将网络端口作为容器抽象的一部分，因此二进制文件不得不自己搜索未使用的端口。结果，PickUnu sedPortOrDie函数在谷歌C++代码库中有超过20,000次的使用。Docker是在Linux命名空间引入后建立的，它使用命名空间为容器提供虚拟私有网卡，这意味着应用程序可以监听他们想要的任何端口。Docker网络堆栈然后将机器上的一个端口映射到容器内的端口。最初建立在Docker之上的Kubernetes更进一步，要求网络实现将容器（Kubernetes术语为 "pods"）视为 "真正的"IP地址，可从主机网络获得。现在，每个应用程序都可以监听他们想要的任何端口，而不用担心冲突。

These improvements are particularly important when dealing with software not designed to run on the particular compute stack. Although many popular open source programs have configuration parameters for which port to use, there is no consistency between them for how to configure this.

当处理不是为在特定计算机技术栈上运行而设计的软件时，这些改进尤其重要。尽管许多流行的开源程序都有使用哪个端口的配置参数，但它们之间对于如何配置并不一致。

#### Containers and implicit dependencies 容器和隐性依赖

As with any abstraction, Hyrum’s Law of implicit dependencies applies to the container abstraction. It probably applies *even more than usual*, both because of the huge number of users (at Google, all production software and much else will run on Borg) and because the users do not feel that they are using an API when using things like the filesystem (and are even less likely to think whether this API is stable, versioned, etc.).

与任何抽象一样，海勒姆定律的隐性依赖适用于容器抽象。由于用户数量巨大（在谷歌，所有生产软件和许多其他软件都将在Borg上运行），它可能比通常更适用而且因为用户在使用文件系统之类的东西时感觉不到自己在使用API（而且更不可能考虑此API是否稳定、是否有版本等）。

To illustrate, let’s return to the example of process ID space exhaustion that Borg experienced in 2011. You might wonder why the process IDs are exhaustible. Are they not simply integer IDs that can be assigned from the 32-bit or 64-bit space? In Linux, they are in practice assigned in the range [0,..., PID_MAX - 1], where PID_MAX defaults to 32,000. PID_MAX, however, can be raised through a simple configuration change (to a considerably higher limit). Problem solved?

为了说明这一点，让我们回到Borg在2011年经历的进程ID空间耗尽的例子。你可能想知道为什么进程ID是可耗尽的。它们不仅仅是可以从32位或64位空间分配的整数ID吗？在Linux中，它们实际上是在[0，…，PID_MAX-1]范围内分配的，其中PID_MAX默认为32000。然而，PID_MAX可以通过简单的配置更改（达到相当高的限制）来提高。问题解决了吗？

Well, no. By Hyrum’s Law, the fact that the PIDs that processes running on Borg got were limited to the 0...32,000 range became an implicit API guarantee that people started depending on; for instance, log storage processes depended on the fact that the PID can be stored in five digits, and broke for six-digit PIDs, because record names exceeded the maximum allowed length. Dealing with the problem became a lengthy, two-phase project. First, a temporary upper bound on the number of PIDs a single container can use (so that a single thread-leaking job cannot render the whole machine unusable). Second, splitting the PID space for threads and processes. (Because it turned out very few users depended on the 32,000 guarantee for the PIDs assigned to threads, as opposed to processes. So, we could increase the limit for threads and keep it at 32,000 for processes.) Phase three would be to introduce PID namespaces to Borg, giving each container its own complete PID space. Predictably (Hyrum’s Law again), a multitude of systems ended up assuming that the triple {hostname, timestamp, pid} uniquely identifies a process, which would break if PID namespaces were introduced. The effort to identify all these places and fix them (and backport any relevant data) is still ongoing eight years later.

嗯，没有。根据海勒姆定律，在Borg上运行的进程得到的PID被限制在0...32,000范围内，这一事实成为人们开始依赖的隐含的API保证；例如，日志存储进程依赖于PID可以存储为五位数的事实，而对于六位数的PID来说，就会出现问题，因为记录名称超出了最大允许长度。处理这个问题成为一个漫长的、分两个阶段的项目。首先，对单个容器可以使用的PID数量设定一个临时的上限（这样单个线程泄漏的工作就不会导致整个机器无法使用）。第二，为线程和进程分割PID空间。(因为事实证明，很少有用户依赖分配给线程的PID的32000个保证，而不是进程。所以，我们可以增加线程的限制，而将进程的限制保持在32,000个）。第三阶段是在Borg中引入PID命名空间，让每个容器拥有自己完整的PID空间。可以预见的是（又是Hyrum定律），许多系统最终都认为{hostname, timestamp, pid}这三者可以唯一地识别一个进程，如果引入PID命名空间，这将会被打破。识别所有这些地方并修复它们（以及回传任何相关数据）的努力在八年后仍在进行。

The point here is not that you should run your containers in PID namespaces. Although it’s a good idea, it’s not the interesting lesson here. When Borg’s containers were built, PID namespaces did not exist; and even if they did, it’s unreasonable to expect engineers designing Borg in 2003 to recognize the value of introducing them. Even now there are certainly resources on a machine that are not sufficiently isolated, which will probably cause problems one day. This underlines the challenges of designing a container system that will prove maintainable over time and thus the value of using a container system developed and used by a broader community, where these types of issues have already occurred for others and the lessons learned have been incorporated.

这里的重点不是说你应该在PID命名空间中运行你的容器。尽管这是个好主意，但这并不是有趣的经验。当Borg的容器被建立时，PID命名空间并不存在；即使它们存在，期望2003年设计Borg的工程师认识到引入它们的价值也是不合理的。即使是现在，机器上也肯定有一些资源没有被充分隔离，这可能会在某一天造成问题。这强调了设计一个容器系统的挑战，该系统将被证明是可以长期维护的，因此使用一个由更广泛的社区开发和使用的容器系统的价值，在那里，这些类型的问题已经存在为其他人发生的事件，已将所吸取的经验教训纳入其中。

### One Service to Rule Them All 一种服务统治一切

As discussed earlier, the original WorkQueue design was targeted at only some batch jobs, which ended up all sharing a pool of machines managed by the WorkQueue, and a different architecture was used for serving jobs, with each particular serving job running in its own, dedicated pool of machines. The open source equivalent would be running a separate Kubernetes cluster for each type of workload (plus one pool for all the batch jobs).

如前所述，最初的WorkQueue设计只针对一些批处理作业，这些作业最终都共享一个由WorkQueue管理的机器资源池，而对于服务作业则采用不同的架构，每个特定的服务作业都运行在自己的专用机器资源池中。开源的替代方案是为每种类型的工作负载单独运行一个 Kubernetes 集群（以及一个用于所有批处理作业的池）。

In 2003, the Borg project was started, aiming (and eventually succeeding at) building a compute service that assimilates these disparate pools into one large pool. Borg’s pool covered both serving and batch jobs and became the only pool in any datacenter (the equivalent would be running a single large Kubernetes cluster for all workloads in each geographical location). There are two significant efficiency gains here worth discussing.

2003年，Borg项目启动，旨在（并最终成功地）建立一个计算服务，将这些不同的机器资源池整合为一个大机器资源池。Borg的机器资源池涵盖了服务和批处理工作，并成为任何数据中心的唯一机器资源池（相当于为每个地理位置的所有工作负载运行一个大型Kubernetes集群）。这里有两个显著的效率提升值得讨论。

The first one is that serving machines became cattle (the way the Borg design doc put it: “*Machines are anonymous:* programs don’t care which machine they run on as long as it has the right characteristics”). If every team managing a serving job must manage their own pool of machines (their own cluster), the same organizational overhead of maintaining and administering that pool is applied to every one of these teams. As time passes, the management practices of these pools will diverge over time, making company-wide changes (like moving to a new server architecture, or switching datacenters) more and more complex. A unified management infrastructure—that is, a *common* compute service for all the workloads in the organization—allows Google to avoid this linear scaling factor; there aren’t *n* different management practices for the physical machines in the fleet, there’s just Borg.[^16]

第一个是，服务于机器的人变成了牛（Borg设计文档是这样说的。"*机器是透明的：*程序并不关心它们在哪台机器上运行，只要它有正确的特征"）。如果每个管理服务工作的团队都必须管理他们自己的机器资源池（他们自己的集群），那么维护和管理这个机器资源池的组织开销也同样适用于这些团队中的每个人。随着时间的推移，这些机器资源池的管理实践会随着时间的推移而产生分歧，使整个公司范围内的变化（如转移到一个新的服务器架构，或切换数据中心）变得越来越复杂。一个统一的管理基础设施--也就是一个适用于组织中所有工作负载的*通用*计算服务--允许谷歌避免这种线性扩展因素；对于机群中的物理机器没有*N*种不同的管理实践，只有Borg。

The second one is more subtle and might not be applicable to every organization, but it was very relevant to Google. The distinct needs of batch and serving jobs turn out to be complementary. Serving jobs usually need to be overprovisioned because they need to have capacity to serve user traffic without significant latency decreases, even in the case of a usage spike or partial infrastructure outage. This means that a machine running only serving jobs will be underutilized. It’s tempting to try to take advantage of that slack by overcommitting the machine, but that defeats the purpose of the slack in the first place, because if the spike/outage does happen, the resources we need will not be available.

第二个问题更加微妙，可能并不适用于每个组织，但它与谷歌非常相关。批量作业和服务作业的不同需求是互补的。服务工作通常需要超额配置，因为它们需要有能力为用户流量提供服务而不出现明显的延迟下降，即使在使用量激增或部分基础设施中断的情况下。这意味着仅运行服务作业的机器将未得到充分利用。试图通过过度使用机器来利用这种闲置是很有诱惑力的，但这首先违背了闲置的目的，因为如果出现高峰/中断出现，我们需要的资源将无法使用。

However, this reasoning applies only to serving jobs! If we have a number of serving jobs on a machine and these jobs are requesting RAM and CPU that sum up to the total size of the machine, no more serving jobs can be put in there, even if real utilization of resources is only 30% of capacity. But we *can* (and, in Borg, will) put batch jobs in the spare 70%, with the policy that if any of the serving jobs need the memory or CPU, we will reclaim it from the batch jobs (by freezing them in the case of CPU or killing in the case of RAM). Because the batch jobs are interested in throughput (measured in aggregate across hundreds of workers, not for individual tasks) and their individual replicas are cattle anyway, they will be more than happy to soak up this spare capacity of serving jobs.

然而，这种推理仅适用于服务作业！如果我们在一台机器上有许多服务作业，而这些作业请求的RAM和CPU总计为机器的总和，即使资源的实际利用率仅为容量的30%，也不能在其中放置更多的服务作业。但我们可以（而且，在Borg，我们）将批处理作业放在备用70%中，策略是，如果任何服务作业需要内存或CPU，我们将从批处理作业中回收（在CPU的情况下冻结它们，在RAM的情况下杀死它们）。因为批处理作业对吞吐量感兴趣（在数百名worker中进行聚合测量，而不是针对单个任务），而且它们的单个副本无论如何都是牛，所以它们将非常乐意吸收服务作业的这一剩余容量。

Depending on the shape of the workloads in a given pool of machines, this means that either all of the batch workload is effectively running on free resources (because we are paying for them in the slack of serving jobs anyway) or all the serving workload is effectively paying for only what they use, not for the slack capacity they need for failure resistance (because the batch jobs are running in that slack). In Google’s case, most of the time, it turns out we run batch effectively for free.

根据给定机器资源池池中工作负载的形状，这意味着要么所有批处理工作负载都有效地运行在空闲资源上（因为我们无论如何都是在空闲的服务作业中为它们付费）或者，所有的服务性工作负载实际上只为他们使用的东西付费，而不是为他们抵抗故障所需的闲置容量付费（因为批处理作业是在这种闲置状态下运行的）。在谷歌的案例中，大多数时候，事实证明我们免费有效地运行批处理。

>[^16]: As in any complex system, there are exceptions. Not all machines owned by Google are Borg-managed, and not every datacenter is covered by a single Borg cell. But the majority of engineers work in an environment in which they don’t touch non-Borg machines, or nonstandard cells.
>
> 16 正如任何复杂的系统一样，也有例外。并非所有谷歌拥有的机器都由Borg管理，也不是每个数据中心都由一个Borg单元覆盖。但大多数工程师的工作环境是，他们不接触非Borg机，也不接触非标准的单元。

#### Multitenancy for serving jobs 为工作提供服务的多租户

Earlier, we discussed a number of requirements that a compute service must satisfy to be suitable for running serving jobs. As previously discussed, there are multiple advantages to having the serving jobs be managed by a common compute solution, but this also comes with challenges. One particular requirement worth repeating is a discovery service, discussed in “Connecting to a Service” on page 528. There are a number of other requirements that are new when we want to extend the scope of a managed compute solution to serving tasks, for example:

- Rescheduling of jobs needs to be throttled: although it’s probably acceptable to kill and restart 50% of a batch job’s replicas (because it will cause only a temporary blip in processing, and what we really care about is throughput), it’s unlikely to be acceptable to kill and restart 50% of a serving job’s replicas (because the remaining jobs are likely too few to be able to serve user traffic while waiting for the restarted jobs to come back up again).
- A batch job can usually be killed without warning. What we lose is some of the already performed processing, which can be redone. When a serving job is killed without warning, we likely risk some user-facing traffic returning errors or (at best) having increased latency; it is preferable to give several seconds of warning ahead of time so that the job can finish serving requests it has in flight and not accept new ones.

早些时候，我们讨论了计算服务必须满足的一些要求，以适合运行服务作业。正如之前所讨论的，让服务作业由一个共同的计算解决方案来管理有多种好处，但这也伴随着挑战。一个值得重复的特殊要求是发现服务，在[第528页的 "连接到服务"]中讨论过。当我们想把托管计算解决方案的范围扩展到服务任务时，还有一些其他的要求是新的，比如说:

- 作业的重新调度需要节制：尽管杀死并重新启动一个批处理作业的50%的副本可能是可以接受的（因为这只会导致处理过程中的暂时性突变，而我们真正关心的是吞吐量），但杀死并重新启动一个服务作业的50%的副本是不太可能接受的（因为剩下的作业可能太少，无法在等待重新启动的作业再次出现的同时为用户流量提供服务）。
- 一个批处理作业通常可以在没有警告的情况下被杀死。我们失去的是一些已经执行的处理，这些处理可以重新进行。当一个服务工作在没有警告的情况下被杀死时，我们很可能冒着一些面向用户的流量返回错误或（最多）延迟增加的风险；最好是提前几秒钟发出警告，以便工作能够完成服务它在运行中的请求，不再接受新的请求。

For the aforementioned efficiency reasons, Borg covers both batch and serving jobs, but multiple compute offerings split the two concepts—typically, a shared pool of machines for batch jobs, and dedicated, stable pools of machines for serving jobs. Regardless of whether the same compute architecture is used for both types of jobs, however, both groups benefit from being treated like cattle.

出于上述效率原因，Borg同时涵盖了批处理和服务作业，但多个计算产品将这两个概念分割开来--通常情况下，批处理作业使用共享的机器资源池，而服务工作使用专用的、稳定的机器资源池。然而，无论这两类工作是否使用相同的计算架构，这两类工作都会因被当作牛一样对待而受益。

### Submitted Configuration 提交配置

The Borg scheduler receives the configuration of a replicated service or batch job to run in the cell as the contents of a Remote Procedure Call (RPC). It’s possible for the operator of the service to manage it by using a command-line interface (CLI) that sends those RPCs, and have the parameters to the CLI stored in shared documentation, or in their head.

Borg调度器接收扩容服务或批处理作业的配置，作为远程过程调用（RPC）的内容在单元中运行。服务运营商可以通过使用命令行界面（CLI）对其进行管理，该界面发送这些RPC，并将参数存储在共享文档或其Header中。

Depending on documentation and tribal knowledge over code submitted to a repository is rarely a good idea in general because both documentation and tribal knowledge have a tendency to deteriorate over time (see Chapter 3). However, the next natural step in the evolution—wrapping the execution of the CLI in a locally developed script—is still inferior to using a dedicated configuration language to specify the configuration of your service.

在一般情况下，依靠文档和团队知识而不是提交给资源库的代码不会是个好主意，因为文档和团队知识都有随着时间推移而退化的趋势（见[第三章]）。然而，前进中的下一个自然步骤--将CLI的执行包裹在本地开发的脚本中--仍然不如使用专门的配置语言来指定服务的配置。

Over time, the runtime presence of a logical service will typically grow beyond a single set of replicated containers in one datacenter across many axes:

- It will spread its presence across multiple datacenters (both for user affinity and failure resistance).
- It will fork into having staging and development environments in addition to the production environment/configuration.
- It will accrue additional replicated containers of different types in the form of attached services, like a memcached accompanying the service.

随着时间的推移，逻辑服务的运行时存在通常会超过在一个数据中心的部署容器组，跨越多个区域：

- 它将在多个数据中心分散其存在（既有用户亲和力，也有抗故障能力）。
- 除了生产环境/配置之外，它还会分叉到拥有临时和开发环境。
- 它将以附加服务的形式累积不同类型的额外副本容器，如服务附带的memcached。

Management of the service is much simplified if this complex setup can be expressed in a standardized configuration language that allows easy expression of standard operations (like “update my service to the new version of the binary, but taking down no more than 5% of capacity at any given time”).

如果这种复杂的设置可以用一种标准化的配置语言来表达，那么服务的管理就会大大简化，这种语言可以方便地表达标准操作（比如“将我的服务更新为新版本的二进制文件，但在任何给定时间占用的容量不超过5%”）。

A standardized configuration language provides standard configuration that other teams can easily include in their service definition. As usual, we emphasize the value of such standard configuration over time and scale. If every team writes a different snippet of custom code to stand up their memcached service, it becomes very difficult to perform organization-wide tasks like swapping out to a new memcache implementation (e.g., for performance or licencing reasons) or to push a security update to all the memcache deployments. Also note that such a standardized configuration language is a requirement for automation in deployment (see Chapter 24).

标准化配置语言提供标准配置，其他团队可以轻松地将其包含在服务定义中。像往常一样，我们强调这种标准配置在时间和规模上的价值。如果每个团队都编写不同的自定义代码片段以支持其memcache服务，则执行组织范围内的任务（如切换到新的memcache实现）或将安全更新推送到所有memcache部署将变得非常困难。还要注意，这种标准化配置语言是部署自动化的一个要求（参见第24章)。

## Choosing a Compute Service 选择计算服务

It’s unlikely any organization will go down the path that Google went, building its own compute architecture from scratch. These days, modern compute offerings are available both in the open source world (like Kubernetes or Mesos, or, at a different level of abstraction, OpenWhisk or Knative), or as public cloud managed offerings (again, at different levels of complexity, from things like Google Cloud Platform’s Managed Instance Groups or Amazon Web Services Elastic Compute Cloud [Amazon EC2] autoscaling; to managed containers similar to Borg, like Microsoft Azure Kubernetes Service [AKS] or Google Kubernetes Engine [GKE]; to a serverless offering like AWS Lambda or Google’s Cloud Functions).

不太可能有别的组织会重走谷歌走过的路，从头开始构建自己的计算架构。如今，现代计算产品在开源世界（比如Kubernetes或Mesos，或者在不同的抽象层次上，OpenWhisk或Knative），或作为公共云管理产品（同样，在不同的复杂性级别，从Google云平台的托管实例组或Amazon Web服务弹性计算云[Amazon EC2]自动伸缩；到类似于Borg的托管容器，如Microsoft Azure Kubernetes服务[AKS]或谷歌Kubernetes引擎[GKE]；提供类似AWS Lambda或谷歌云功能的无服务器服务）。

However, most organizations will *choose* a compute service, just as Google did internally. Note that a compute infrastructure has a high lock-in factor. One reason for that is because code will be written in a way that takes advantage of all the properties of the system (Hyrum’s Law); thus, for instance, if you choose a VM-based offering, teams will tweak their particular VM images; and if you choose a specific container- based solution, teams will call out to the APIs of the cluster manager. If your architecture allows code to treat VMs (or containers) as pets, teams will do so, and then a move to a solution that depends on them being treated like cattle (or even different forms of pets) will be difficult.

然而，大多数组织会*选择一个计算服务*，就像谷歌内部那样。请注意，计算基础设施有一个很高的锁定因素。其中一个原因是，代码的编写方式将充分利用系统的所有特性（海勒姆定律）；因此，例如，如果你选择了一个基于虚拟机的产品，团队将调整他们特定的虚拟机镜像；如果你选择了一个特定的基于容器的解决方案，团队将调用集群管理器的API。如果你的架构允许代码将虚拟机（或容器）视为宠物，那么团队将这样做，然后转向一种解决方案，将它们视为牛（甚至不同形式的宠物）将是困难的。

To show how even the smallest details of a compute solution can end up locked in, consider how Borg runs the command that the user provided in the configuration. In most cases, the command will be the execution of a binary (possibly followed by a number of arguments). However, for convenience, the authors of Borg also included the possibility of passing in a shell script; for example, while true; do ./ my_binary; done.[^17] However, whereas a binary execution can be done through a simple fork-and-exec (which is what Borg does), the shell script needs to be run by a shell like Bash. So, Borg actually executed /usr/bin/bash -c $USER_COMMAND, which works in the case of a simple binary execution as well.

为了说明即使是计算解决方案中最小的细节也会最终被锁定，考虑一下Borg如何运行用户在配置中提供的命令。在大多数情况下，该命令将是执行一个二进制文件（后面可能有一些参数）。然而，为了方便起见，Borg的作者也包括了传入一个shell脚本的可能性；例如，`while true; do ./ my_binary; done`。 然而，二进制的执行可以通过一个简单的fork-and-exec来完成（这就是Borg的做法），shell脚本需要由一个像Bash这样的shell来运行。所以，Borg实际上是执行/usr/bin/bash -c $USER_COMMAND，该命令也适用于简单的二进制执行。

At some point, the Borg team realized that at Google’s scale, the resources—mostly memory—consumed by this Bash wrapper are non-negligible, and decided to move over to using a more lightweight shell: ash. So, the team made a change to the process runner code to run /usr/bin/ash -c $USER_COMMAND instead.

在某种程度上，Borg团队意识到在Google的规模下，这个Bash包装器所消耗的资源--主要是内存--是不可忽视的，并决定转而使用一个更轻量级的shell：ash。因此，该团队对进程运行器的代码进行了修改，改为运行`/usr/bin/ash -c $USER_COMMAND`。

You would think that this is not a risky change; after all, we control the environment, we know that both of these binaries exist, and so there should be no way this doesn’t work. In reality, the way this didn’t work is that the Borg engineers were not the first to notice the extra memory overhead of running Bash. Some teams were creative in their desire to limit memory usage and replaced (in their custom filesystem overlay) the Bash command with a custom-written piece of “execute the second argument” code. These teams, of course, were very aware of their memory usage, and so when the Borg team changed the process runner to use ash (which was not overwritten by the custom code), their memory usage increased (because it started including ash usage instead of the custom code usage), and this caused alerts, rolling back the change, and a certain amount of unhappiness.

你会认为这不是一个有风险的改变；毕竟，我们控制了环境，我们知道这两个二进制文件都存在，所以这不可能不起作用。事实上，这不起作用的原因是，Borg的工程师们并不是第一个注意到运行Bash的额外内存开销的人。一些团队在限制内存使用方面很有创意，他们（在他们的自定义文件系统覆盖中）用一段自定义编写的 "执行第二个参数 "的代码来替换Bash命令。当然，这些团队非常清楚他们的内存使用情况，因此当Borg团队将进程运行器改为使用ash（没有被自定义代码覆盖）时，他们的内存使用量增加了（因为它开始包括ash的nei使用量而不是自定义代码的内存使用量），这引起了警报、回滚变化和一定程度的不愉快。

Another reason that a compute service choice is difficult to change over time is that any compute service choice will eventually become surrounded by a large ecosystem of helper services—tools for logging, monitoring, debugging, alerting, visualization, on-the-fly analysis, configuration languages and meta-languages, user interfaces, and more. These tools would need to be rewritten as a part of a compute service change, and even understanding and enumerating those tools is likely to be a challenge for a medium or large organization.

计算服务的选择难以随时间变化的另一个原因是，任何计算服务的选择最终都会被一个庞大的辅助服务生态系统所包围--用于记录、监控、调试、警报、可视化、即时分析、配置语言和元语言、用户界面等等的工具。这些工具需要作为计算服务变革的一部分被重写，甚至理解和列举这些工具对于一个大中型组织来说都可能是一个挑战。

Thus, the choice of a compute architecture is important. As with most software engineering choices, this one involves trade-offs. Let’s discuss a few.

因此，计算架构的选择是很重要的。与大多数软件工程的选择一样，这个选择涉及到权衡。让我们来讨论一下。

> [^17]: This particular command is actively harmful under Borg because it prevents Borg’s mechanisms for dealing with failure from kicking in. However, more complex wrappers that echo parts of the environment to logging, for example, are still in use to help debug startup problems.
>
> 17  这个特殊的命令在Borg下是有害的，因为它阻止Borg处理故障的机制启动。但是，更复杂的包装器（例如，将环境的一部分回送到日志记录）仍然在使用，以帮助调试启动问题。

### Centralization Versus Customization 统一与定制

From the point of view of management overhead of the compute stack (and also from the point of view of resource efficiency), the best an organization can do is adopt a single CaaS solution to manage its entire fleet of machines and use only the tools available there for everybody. This ensures that as the organization grows, the cost of managing the fleet remains manageable. This path is basically what Google has done with Borg.

从计算栈的管理开销的角度来看（也从资源效率的角度来看），一个组织能做的最好的事情就是统一采用一个的CaaS解决方案来管理它的整个机群，并且只使用那里的工具供大家使用。这可以确保随着组织的发展，管理集群的成本仍然是可控的。这条路基本上就是谷歌对Borg所做的。

#### Need for customization 定制化

However, a growing organization will have increasingly diverse needs. For instance, when Google launched the Google Compute Engine (the “VM as a Service” public cloud offering) in 2012, the VMs, just as most everything else at Google, were managed by Borg. This means that each VM was running in a separate container controlled by Borg. However, the “cattle” approach to task management did not suit Cloud’s workloads, because each particular container was actually a VM that some particular user was running, and Cloud’s users did not, typically, treat the VMs as cattle.[^18]

然而，一个不断发展的组织将有越来越多样化的需求。例如，当谷歌在2012年推出谷歌计算引擎（“虚拟机即服务”公共云产品）时，这些虚拟机与谷歌的大多数其他产品一样，都是Borg设计的。这意味着每个虚拟机都在 Borg 控制的单独容器中运行。然而，任务管理的“牛”方法并不适合云的工作负载，因为每个特定容器实际上是某个特定用户正在运行的VM，而云的用户通常不会将VM视为牛。

Reconciling this difference required considerable work on both sides. The Cloud organization made sure to support live migration of VMs; that is, the ability to take a VM running on one machine, spin up a copy of that VM on another machine, bring the copy to be a perfect image, and finally redirect all traffic to the copy, without causing a noticeable period when service is unavailable.[^19] Borg, on the other hand, had to be adapted to avoid at-will killing of containers containing VMs (to provide the time to migrate the VM’s contents to the new machine), and also, given that the whole migration process is more expensive, Borg’s scheduling algorithms were adapted to optimize for decreasing the risk of rescheduling being needed.[^20] Of course, these modifications were rolled out only for the machines running the cloud workloads, leading to a (small, but still noticeable) bifurcation of Google’s internal compute offering.

调和这种差异需要双方做大量的工作。云计算组织确保支持虚拟机的实时迁移；也就是说，能够在一台机器上运行一个虚拟机，在另一台机器上启动该虚拟机的副本，使该副本成为一个完美的镜像，并最终将所有流量重定向到该副本，而不会造成明显的服务不可用时间段。  另一方面，Borg必须进行调整，以避免随意杀死包含虚拟机的容器（以提供时间将虚拟机的内容迁移到新机器上），同时，鉴于整个迁移过程更加耗时，Borg的调度算法被调整为优化，以减少需要重新调度的风险。当然，这些修改只针对运行云工作负载的机器，导致了谷歌内部计算产品的分化（很小，但仍然很明显）。

> [^18]: My mail server is not interchangeable with your graphics rendering job, even if both of those tasks are running in the same form of VM.
>
> 18  我的邮件服务器不能与图形渲染作业互换，即使这两个任务都以相同的VM形式运行。
>
> [^19]: This is not the only motivation for making user VMs possible to live migrate; it also offers considerable user- facing benefits because it means the host operating system can be patched and the host hardware updated without disrupting the VM. The alternative (used by other major cloud vendors) is to deliver “maintenance event notices,” which mean the VM can be, for example, rebooted or stopped and later started up by the cloud provider.
>
> 19  这不是让用户虚拟机能够实时迁移的唯一动机；它还提供了大量面向用户的好处，因为这意味着可以修补主机操作系统并更新主机硬件，而不会中断VM。另一种选择（其他主要云供应商使用）是提供“维护事件通知”，这意味着云提供商可以重新启动或停止VM，然后再启动VM。
>
> [^20]: This is particularly relevant given that not all customer VMs are opted into live migration; for some workloads even the short period of degraded performance during the migration is unacceptable. These customers will receive maintenance event notices, and Borg will avoid evicting the containers with those VMs unless strictly necessary.
>
> 20  考虑到并非所有客户虚拟机都选择实时迁移，这一点尤其重要；对于某些工作负载，即使在迁移过程中出现短期性能下降也是不可接受的。这些客户将收到维护事件通知，除非严格必要，否则Borg将避免驱逐带有这些VM的容器。

A different example—but one that also leads to a bifurcation—comes from Search. Around 2011, one of the replicated containers serving Google Search web traffic had a giant index built up on local disks, storing the less-often-accessed part of the Google index of the web (the more common queries were served by in-memory caches from other containers). Building up this index on a particular machine required the capacity of multiple hard drives and took several hours to fill in the data. However, at the time, Borg assumed that if any of the disks that a particular container had data on had gone bad, the container will be unable to continue, and needs to be rescheduled to a different machine. This combination (along with the relatively high failure rate of spinning disks, compared to other hardware) caused severe availability problems; containers were taken down all the time and then took forever to start up again. To address this, Borg had to add the capability for a container to deal with disk failure by itself, opting out of Borg’s default treatment; while the Search team had to adapt the process to continue operation with partial data loss.

另一个不同的例子--但也导致了分化--来自于搜索。2011年左右，一个为谷歌搜索网络流量服务的复制容器在本地磁盘上建立了一个巨大的索引，存储了谷歌网络索引中不常被访问的部分（更常见的查询由其他容器的内存缓存提供）。在一台特定的机器上建立这个索引需要多个硬盘的容量，并且需要几个小时来填入数据。然而，在当时，Borg认为，如果某个特定容器上有数据的任何磁盘坏了，该容器将无法继续运行，需要重新调度到另一台机器上。这种组合（与其他硬件相比，旋转磁盘的故障率相对较高）造成了严重的可用性问题；容器总是被关闭，然后又要花很长时间才能重新启动。为了解决这个问题，Borg必须增加容器自己处理磁盘故障的能力，选择不使用Borg的默认处理方式；而搜索团队必须调整流程，在部分数据丢失的情况下继续运行。

Multiple other bifurcations, covering areas like filesystem shape, filesystem access, memory control, allocation and access, CPU/memory locality, special hardware, special scheduling constraints, and more, caused the API surface of Borg to become large and unwieldy, and the intersection of behaviors became difficult to predict, and even more difficult to test. Nobody really knew whether the expected thing happened if a container requested *both* the special Cloud treatment for eviction *and* the custom Search treatment for disk failure (and in many cases, it was not even obvious what “expected” means).

其他多个分化，涵盖了文件系统形状、文件系统访问、内存控制、分配和访问、CPU/内存定位、特殊硬件、特殊调度约束等领域，导致Borg的API体量变得庞大而笨重，各种行为的交叉点变得难以预测，甚至更难测试。没有人真正知道，如果一个容器同时请求特殊的云处理（用于驱逐）和自定义的磁盘故障搜索处理（在许多情况下，“预期”的含义甚至不明显），预期的事情是否会发生。

After 2012, the Borg team devoted significant time to cleaning up the API of Borg. It discovered some of the functionalities Borg offered were no longer used at all.[^21] The more concerning group of functionalities were those that were used by multiple containers, but it was unclear whether intentionally—the process of copying the configuration files between projects led to proliferation of usage of features that were originally intended for power users only. Whitelisting was introduced for certain features to limit their spread and clearly mark them as poweruser–only. However, the cleanup is still ongoing, and some changes (like using labels for identifying groups of containers) are still not fully done.[^22]

2012年后，Borg团队花了大量时间来清理Borg的API。它发现 Borg 提供的一些功能已不再使用。令人关注的功能组是多个容器使用的功能组，但目前尚不清楚，在项目之间复制配置文件的过程是否有意导致原本只针对超级用户的功能的使用激增。某些功能被引入了白名单，以限制它们的传播，并明确地将它们标记为仅适用于特权用户。然而，清理工作仍在进行，一些变化（如使用标签来识别容器组）仍未完全完成。

As usual with trade-offs, although there are ways to invest effort and get some of the benefits of customization while not suffering the worst downsides (like the aforementioned whitelisting for power functionality), in the end there are hard choices to be made. These choices usually take the form of multiple small questions: do we accept expanding the explicit (or worse, implicit) API surface to accommodate a particular user of our infrastructure, or do we significantly inconvenience that user, but maintain higher coherence?

像通常情况下的权衡一样，尽管有一些方法可以投入精力并从定制中获得一些好处，同时又不会遭受严重的负面影响（如前面提到的特权白名单），但最终还是要做出艰难的选择。这些选择通常以多个小问题的形式出现：我们是否接受扩展显式（或更糟的是，隐式）API表面以适应我们基础设施的特定用户，或者我们是否显著地给该用户带来不便，但主要是保持更高的一致性？

> [^21]: A good reminder that monitoring and tracking the usage of your features is valuable over time.
>
> 21  这是一个很好的提醒，随着时间的推移，监视和跟踪功能的使用是很有价值的。
>
> [^22]: This means that Kubernetes, which benefited from the experience of cleaning up Borg but was not hampered by a broad existing userbase to begin with, was significantly more modern in quite a few aspects (like its treatment of labels) from the beginning. That said, Kubernetes suffers some of the same issues now that it has broad adoption across a variety of types of applications.
>
> 22  这意味着Kubernetes从清理Borg的经验中获益，但从一开始就没有受到广泛的现有用户基础的阻碍，从一开始就在很多方面（如标签的处理）明显更加现代化。也就是说，Kubernetes现在也遇到了一些相同的问题，因为它在各种类型的应用程序中得到了广泛的采用。

### Level of Abstraction: Serverless 抽象级别：无服务器

The description of taming the compute environment by Google can easily be read as a tale of increasing and improving abstraction—the more advanced versions of Borg took care of more management responsibilities and isolated the container more from the underlying environment. It’s easy to get the impression this is a simple story: more abstraction is good; less abstraction is bad.

谷歌对驯服计算环境的描述很容易被理解为一个增加和改进抽象层的故事--更高级的Borg版本承担了更多的管理责任，并将容器与底层环境更多地隔离。这很容易让人觉得这是一个简单的故事：更多的抽象是好的；更少的抽象是差的。

Of course, it is not that simple. The landscape here is complex, with multiple offerings. In “Taming the Compute Environment” on page 518, we discussed the progression from dealing with pets running on bare-metal machines (either owned by your organization or rented from a colocation center) to managing containers as cattle. In between, as an alternative path, are VM-based offerings in which VMs can progress from being a more flexible substitute for bare metal (in Infrastructure as a Service offerings like Google Compute Engine [GCE] or Amazon EC2) to heavier substitutes for containers (with autoscaling, rightsizing, and other management tools).

当然，事情没有那么简单。这里的情况很复杂，有多种产品。在第518页的 "驯服计算环境"中，我们讨论了从处理在裸机上运行的宠物（无论是你的组织拥有的还是从主机托管中心租用的）到管理容器的进展情况。在这两者之间，作为一个替代路径，是基于虚拟机的产品，其中虚拟机可以从更灵活地替代裸机（在基础设施即服务产品中，如谷歌计算引擎[GCE]或亚马逊EC2）发展到更重地替代容器（具有自动伸缩、权限调整和其他管理工具）。

In Google’s experience, the choice of managing cattle (and not pets) is the solution to managing at scale. To reiterate, if each of your teams will need just one pet machine in each of your datacenters, your management costs will rise superlinearly with your organization’s growth (because both the number of teams *and* the number of datacenters a team occupies are likely to grow). And after the choice to manage cattle is made, containers are a natural choice for management; they are lighter weight (implying smaller resource overheads and startup times) and configurable enough that should you need to provide specialized hardware access to a specific type of workload, you can (if you so choose) allow punching a hole through easily.

根据谷歌的经验，选择管理牛（而不是宠物）是规模管理的解决方案。重申一下，如果你的每个团队在每个数据中心只需要一台宠物机，那么你的管理成本将随着你的组织的增长而呈超线性上升（因为团队的数量*和*一个团队所占用的数据中心的数量都可能增长）。而在选择了管理牛之后，容器是管理的自然选择；它们的重量更轻（意味着更小的资源开销和启动时间），而且可配置，如果你需要为特定类型的工作负载提供专门的硬件访问，你可以（如果你选择的话）允许轻松透传通过。

The advantage of VMs as cattle lies primarily in the ability to bring our own operating system, which matters if your workloads require a diverse set of operating systems to run. Multiple organizations will also have preexisting experience in managing VMs, and preexisting configurations and workloads based on VMs, and so might choose to use VMs instead of containers to ease migration costs.

虚拟机作为牛的优势主要在于能够带来我们自己的操作系统，如果你的工作环境需要一组不同的操作系统来运行，这一点很重要。多个组织在管理虚拟机、基于虚拟机的现有配置和工作负载方面也有经验，因此可能会选择使用虚拟机而不是容器来降低迁移成本。

#### What is serverless? 什么是无服务器？

An even higher level of abstraction is *serverless* offerings.[^23] Assume that an organization is serving web content and is using (or willing to adopt) a common server framework for handling the HTTP requests and serving responses. The key defining trait of a framework is the inversion of control—so, the user will only be responsible for writing an “Action” or “Handler” of some sort—a function in the chosen language that takes the request parameters and returns the response.

更高层次的抽象是无服务器产品。假设一个组织正在为网络内容提供服务，并且正在使用（或愿意采用）一个通用的服务器框架来处理HTTP请求和提供响应。框架的关键定义特征是控制权的倒置--因此，用户只负责编写某种“Action”或“Handler”--所选语言中的函数，接收请求参数并返回响应。

In the Borg world, the way you run this code is that you stand up a replicated container, each replica containing a server consisting of framework code and your functions. If traffic increases, you will handle this by scaling up (adding replicas or expanding into new datacenters). If traffic decreases, you will scale down. Note that a minimal presence (Google usually assumes at least three replicas in each datacenter a server is running in) is required.

在Borg的世界里，你运行这段代码的方式是，你建立一个副本的容器，每个副本包含一个由框架代码和你的功能组成的服务器。如果流量增加，你将通过扩大规模来处理（增加副本或扩展到新的数据中心）。如果流量减少，你将缩小规模。请注意，需要一个最小的存在（谷歌通常假设服务器运行的每个数据中心至少有三个副本）。

However, if multiple different teams are using the same framework, a different approach is possible: instead of just making the machines multitenant, we can also make the framework servers themselves multitenant. In this approach, we end up running a larger number of framework servers, dynamically load/unload the action code on different servers as needed, and dynamically direct requests to those servers that have the relevant action code loaded. Individual teams no longer run servers, hence “serverless.”

但是，如果多个不同的团队使用同一个框架，就可以采用不同的方法：除了使机器支持多租户外，我们还可以使框架服务器本身支持多租户。在这种方法中，我们最终会运行更多的框架服务器，根据需要在不同的服务器上动态加载/卸载动作代码，并将请求动态地引导到那些加载了相关动作代码的服务器。各个团队不再运行服务器，因此 "无服务器"。

Most discussions of serverless frameworks compare them to the “VMs as pets” model. In this context, the serverless concept is a true revolution, as it brings in all of the benefits of cattle management—autoscaling, lower overhead, lack of explicit provisioning of servers. However, as described earlier, the move to a shared, multitenant,cattle-based model should already be a goal for an organization planning to scale; and so the natural comparison point for serverless architectures should be “persistent containers” architecture like Borg, Kubernetes, or Mesosphere.

大多数关于无服务器框架的讨论都将其与 "虚拟机作为宠物 "的模式相比较。在这种情况下，无服务器概念是一场真正的革命，因为它带来了牛群管理的所有好处--自动扩展、较低的开销、缺乏明确的服务器配置。然而，正如前文所述，对于计划扩展的组织来说，转向共享、多租户、基于牛的模式应该已经是一个目标；因此，无服务器架构的自然比较点应该是 "持久性容器"架构，如Borg、Kubernetes或Mesosphere。

> [^23]: FaaS (Function as a Service) and PaaS (Platform as a Service) are related terms to serverless. There are differences between the three terms, but there are more similarities, and the boundaries are somewhat blurred.
>
> 23 FaaS（功能即服务）和PaaS（平台即服务）是与无服务器相关的术语。这三个术语之间有区别，但更多的是相似之处，而且边界有些模糊不清。

#### Pros and cons 利与弊

First note that a serverless architecture requires your code to be *truly stateless*; it’s unlikely we will be able to run your users’ VMs or implement Spanner inside the serverless architecture. All the ways of managing local state (except not using it) that we talked about earlier do not apply. In the containerized world, you might spend a few seconds or minutes at startup setting up connections to other services, populating caches from cold storage, and so on, and you expect that in the typical case you will be given a grace period before termination. In a serverless model, there is no local state that is really persisted across requests; everything that you want to use, you should set up in request-scope.

首先要注意的是，无服务器架构要求你的代码必须是*真正的无状态*；我们不太可能在无服务器架构内运行你用户的虚拟机或实现Spanner。我们之前谈到的所有管理本地状态的方法（除了不使用它）都不适用。在容器化的世界里，你可能会在启动时花几秒钟或几分钟的时间来设置与其他服务的连接，从冷数据中填充缓存，等等，你期望在典型情况下，在终止前会有一个宽限期。在无服务器模型中，不存在真正跨请求持久化的本地状态；所有你想使用的东西，你都应该在请求范围内设置。

In practice, most organizations have needs that cannot be served by truly stateless workloads. This can either lead to depending on specific solutions (either home grown or third party) for specific problems (like a managed database solution, which is a frequent companion to a public cloud serverless offering) or to having two solutions: a container-based one and a serverless one. It’s worth mentioning that many or most serverless frameworks are built on top of other compute layers: AppEngine runs on Borg, Knative runs on Kubernetes, Lambda runs on Amazon EC2.

在实践中，大多数组织的需求都无法由真正的无状态工作负载来满足。这可能会导致依赖特定的解决方案（无论是本地的还是第三方的）来解决特定的问题（比如管理数据库的解决方案，这是公有云无服务器产品的常见配套），或者拥有两个解决方案：一个基于容器的解决方案和一个无服务器的解决方案。值得一提的是，许多或大多数无服务器框架是建立在其他计算层之上的。AppEngine运行在Borg上，Knative运行在Kubernetes上，Lambda运行在Amazon EC2上。

The managed serverless model is attractive for *adaptable scaling* of the resource cost, especially at the low-traffic end. In, say, Kubernetes, your replicated container cannot scale down to zero containers (because the assumption is that spinning up both a container and a node is too slow to be done at request serving time). This means that there is a minimum cost of just having an application available in the persistent cluster model. On the other hand, a serverless application can easily scale down to zero; and so the cost of just owning it scales with the traffic.

管理无服务器模式对于资源成本的*适应性扩展*很有吸引力，特别是在低流量的一端。在Kubernetes中，你的容器不能缩容到零容器（因为假设在请求服务时间内，同时启动容器和节点的速度太慢）。这意味着，在持久化集群模型中，仅仅拥有一个应用程序是有最低成本的。另一方面，无服务器应用程序可以很容易地缩容到零；因此，仅仅拥有它的成本随着流量的增加而增加。

At the very high-traffic end, you will necessarily be limited by the underlying infrastructure, regardless of the compute solution. If your application needs to use 100,000 cores to serve its traffic, there needs to be 100,000 physical cores available in whatever physical equipment is backing the infrastructure you are using. At the somewhat lower end, where your application does have enough traffic to keep multiple servers busy but not enough to present problems to the infrastructure provider, both the persistent container solution and the serverless solution can scale to handle it, although the scaling of the serverless solution will be more reactive and more granular than that of the persistent container one.

在非常高的流量端，无论采用何种计算解决方案，你都必须受到底层基础设施的限制。如果你的应用程序需要使用100,000个核心来服务于它的流量，那么在你所使用的基础设施的任何物理设备中需要有100,000个物理核心可用。在较低端的情况下，如果你的应用有足够的流量让多个服务器忙碌，但又不足以给基础设施提供商带来问题，那么持久化容器解决方案和无服务器解决方案都可以扩展来处理，尽管无服务器解决方案的扩展将比持久化容器解决方案更具有高响应和细粒度。

Finally, adopting a serverless solution implies a certain loss of control over your environment. On some level, this is a good thing: having control means having to exercise it, and that means management overhead. But, of course, this also means that if you need some extra functionality that’s not available in the framework you use, it will become a problem for you.

最后，采用无服务器解决方案意味着在一定程度上失去了对环境的控制。在某种程度上，这是一件好事：拥有控制权意味着必须行使它，而这意味着管理开销。但当然，这也意味着，如果你需要一些你所使用的框架中没有的额外功能，这将成为你的一个问题。

To take one specific instance of that, the Google Code Jam team (running a programming contest for thousands of participants, with a frontend running on Google AppEngine) had a custom-made script to hit the contest webpage with an artificial traffic spike several minutes before the contest start, in order to warm up enough instances of the app to serve the actual traffic that happened when the contest started. This worked, but it’s the sort of hand-tweaking (and also hacking) that one would hope to get away from by choosing a serverless solution.

举个具体的例子，谷歌Code Jam团队（为数千名参赛者举办的编程比赛，其前端运行在谷歌AppEngine上）有一个定制的脚本，在比赛开始前几分钟给比赛网页带来了人为的流量高峰，以便为应用程序的足够实例预热，为比赛开始时的实际流量提供服务。这很有效，但这是人们希望通过选择无服务器解决方案来摆脱的那种手工调整（也是黑客科技）。

#### The trade-off 权衡

Google’s choice in this trade-off was not to invest heavily into serverless solutions. Google’s persistent containers solution, Borg, is advanced enough to offer most of the serverless benefits (like autoscaling, various frameworks for different types of applications, deployment tools, unified logging and monitoring tools, and more). The one thing missing is the more aggressive scaling (in particular, the ability to scale down to zero), but the vast majority of Google’s resource footprint comes from high-traffic services, and so it’s comparably cheap to overprovision the small services. At the same time, Google runs multiple applications that would not work in the “truly stateless” world, from GCE, through home-grown database systems like [BigQuery](https://cloud.google.com/bigquery)or Spanner, to servers that take a long time to populate the cache, like the aforementioned long- tail search serving jobs. Thus, the benefits of having one common unified architecture for all of these things outweigh the potential gains for having a separate serverless stack for a part of a part of the workloads.

谷歌在这种权衡的选择是不对无服务器解决方案进行大量投资。谷歌的持久化容器解决方案Borg足够先进，可以提供大部分无服务器的好处（比如自动伸缩、针对不同类型应用的各种框架、部署工具、统一的日志和监控工具等等）。缺少的是更积极的扩展（特别是将规模缩小到零的能力），但谷歌的绝大部分资源足迹来自高流量服务，因此过度供应小服务的成本相对较低。同时，谷歌运行的多个应用程序在“真正无状态”的世界中不起作用，从GCE，到自制的数据库系统，如[BigQuery](https://cloud.google.com/bigquery)或Spanner，再到需要长时间填充缓存的服务器，如上述的长尾搜索服务工作。因此，对所有这些事情采用一个共同的统一架构的好处超过了对一部分工作负载采用单独的无服务器方向的潜在收益。

However, Google’s choice is not necessarily the correct choice for every organization: other organizations have successfully built out on mixed container/serverless architectures, or on purely serverless architectures utilizing third-party solutions for storage.

然而，谷歌的选择并不一定是每个组织的正确选择：其他组织已经成功4地建立了混合容器/无服务器架构，或在纯粹的无服务器架构上利用第三方解决方案进行存储。

The main pull of serverless, however, comes not in the case of a large organization making the choice, but in the case of a smaller organization or team; in that case, the comparison is inherently unfair. The serverless model, though being more restrictive, allows the infrastructure vendor to pick up a much larger share of the overall management overhead and thus *decrease the management overhead* for the users. Running the code of one team on a shared serverless architecture, like AWS Lambda or Google’s Cloud Run, is significantly simpler (and cheaper) than setting up a cluster to run the code on a managed container service like GKE or AKS if the cluster is not being shared among many teams. If your team wants to reap the benefits of a managed compute offering but your larger organization is unwilling or unable to move to a persistent containers-based solution, a serverless offering by one of the public cloud providers is likely to be attractive to you because the cost (in resources and management) of a shared cluster amortizes well only if the cluster is truly shared (between multiple teams in the organization).

然而，无服务器的主要吸引力并不是来自于一个大型组织的选择，而是来自于一个较小的组织或团队；在这种情况下，这种比较本身就是不公平的。无服务器模式虽然限制更大，但允许基础设施供应商承担更大的总体管理开销，从而减少用户的管理开销。在共享的无服务器体系结构（如AWS Lambda或Google的Cloud Run）上运行一个团队的代码，要比在多个团队之间不共享集群的情况下，在GKE或AKS等托管容器服务上设置集群来运行代码要简单得多（而且更便宜）。如果你的团队希望从托管计算产品中获益，但你的公司不愿意或无法转向基于持久容器的解决方案，那么由一家公共云提供商提供的无服务器产品可能会对你有吸引力，因为成本（资源和成本）很高只有当集群真正共享（在组织中的多个团队之间）时，共享集群的管理才能很好地摊销。

Note, however, that as your organization grows and adoption of managed technologies spreads, you are likely to outgrow the constraints of a purely serverless solution. This makes solutions where a break-out path exists (like from KNative to Kubernetes) attractive given that they provide a natural path to a unified compute architecture like Google’s, should your organization decide to go down that path.

但是，请注意，随着组织的发展和托管技术的普及，你很可能会超越纯无服务器解决方案的限制。这使得存在突破路径的解决方案（如从KNative到Kubernetes）具有吸引力，因为如果你的组织决定走这条路，它们提供了一条通向像Google这样的统一计算体系结构的自然路径。

### Public Versus Private 公有与私有

Back when Google was starting, the CaaS offerings were primarily homegrown; if you wanted one, you built it. Your only choice in the public-versus-private space was between owning the machines and renting them, but all the management of your fleet was up to you.

当谷歌刚刚起步时，CaaS产品主要是本土产品；如果你想要一个，你就建造它。在公共空间和私有空间中，你唯一的选择是拥有机器和租用机器，但你的集群的所有管理都取决于你。

In the age of public cloud, there are cheaper options, but there are also more choices, and an organization will have to make them.

在公有云时代，有更便宜的选择，但也有更多的选择，组织必须做出选择。

An organization using a public cloud is effectively outsourcing (a part of) the management overhead to a public cloud provider. For many organizations, this is an attractive proposition—they can focus on providing value in their specific area of expertise and do not need to grow significant infrastructure expertise. Although the cloud providers (of course) charge more than the bare cost of the metal to recoup the management expenses, they have the expertise already built up, and they are sharing it across multiple customers.

使用公共云的机构实际上是将管理费用（部分）外包给公共云供应商。对于许多组织来说，这是一个有吸引力的提议--他们可以专注于在其特定的专业领域提供价值，而不需要增加重要的基础架构专业知识。虽然云供应商（当然）收取的费用超过了裸机的最低成本，以收回管理费用，但他们已经建立了专业知识，并在多个客户之间共享。

Additionally, a public cloud is a way to scale the infrastructure more easily. As the level of abstraction grows—from colocations, through buying VM time, up to managed containers and serverless offerings—the ease of scaling up increases—from having to sign a rental agreement for colocation space, through the need to run a CLI to get a few more VMs, up to autoscaling tools for which your resource footprint changes automatically with the traffic you receive. Especially for young organizations or products, predicting resource requirements is challenging, and so the advantages of not having to provision resources up front are significant.

此外，公共云是一种更容易扩展基础设施的方式。随着抽象水平的提高--从主机托管，到购买虚拟机时间，再到管理容器和无服务器产品--扩展的难度也在增加--从必须签署主机托管空间的租赁协议，到需要运行CLI来获得更多的虚拟机，再到自动扩展工具，你的资源足迹随着你收到的流量自动变化。特别是对于年轻的组织或产品，预测资源需求是具有挑战性的，因此，不必预先配置资源的优势是非常显著的。

One significant concern when choosing a cloud provider is the fear of lock-in—the provider might suddenly increase their prices or maybe just fail, leaving an organization in a very difficult position. One of the first serverless offering providers, Zimki, a Platform as a Service environment for running JavaScript, shut down in 2007 with three months’ notice.

在选择云计算供应商时，一个重要的顾虑是担心被锁定--供应商可能会突然涨价，或者直接倒闭，让企业陷入非常困难的境地。最早的无服务器提供商之一Zimki，一个运行JavaScript的平台即服务环境，在2007年关闭，只提前三个月通知。

A partial mitigation for this is to use public cloud solutions that run using an open source architecture (like Kubernetes). This is intended to make sure that a migration path exists, even if the particular infrastructure provider becomes unacceptable for some reason. Although this mitigates a significant part of the risk, it is not a perfect strategy. Because of Hyrum’s Law, it’s difficult to guarantee no parts that are specific to a given provider will be used.

对此的部分缓解措施是使用使用开源架构（如Kubernetes）运行的公共云解决方案。这是为了确保存在一个迁移路径，即使特定的基础设施供应商由于某种原因变得不可接受。虽然这减轻了很大一部分风险，但这并不是一个完美的策略。由于海勒姆定律，很难保证不使用特定供应商的特定部分。

Two extensions of that strategy are possible. One is to use a lower-level public cloud solution (like Amazon EC2) and run a higher-level open source solution (like OpenWhisk or KNative) on top of it. This tries to ensure that if you want to migrate out, you can take whatever tweaks you did to the higher-level solution, tooling you built on top of it, and implicit dependencies you have along with you. The other is to run multicloud; that is, to use managed services based on the same open source solutions from two or more different cloud providers (say, GKE and AKS for Kubernetes). This provides an even easier path for migration out of one of them, and also makes it more difficult to depend on specific implementation details available in one one of them.

这一战略有两种可能的扩展。一种是使用较低级别的公有云解决方案（如亚马逊EC2），并在其上运行较高级别的开源解决方案（如OpenWhisk或KNative）。这试图确保如果你想迁移出去，你可以带着你对高级解决方案所做的任何调整，你在它上面建立的工具，以及你拥有的隐性依赖。另一种是运行多云；也就是说，使用基于两个或多个不同的云供应商的相同开源解决方案的管理服务（例如，Kubernetes的GKE和AKS）。这为迁移出其中一个提供了更容易的路径，同时也使你更难依赖其中一个的具体实施细节。

One more related strategy—less for managing lock-in, and more for managing migration—is to run in a hybrid cloud; that is, have a part of your overall workload on your private infrastructure, and part of it run on a public cloud provider. One of the ways this can be used is to use the public cloud as a way to deal with overflow. An organization can run most of its typical workload on a private cloud, but in case of resource shortage, scale some of the workloads out to a public cloud. Again, to make this work effectively, the same open source compute infrastructure solution needs to be used in both spaces.

还有一个相关的策略--不是为了管理锁定，而是为了管理迁移--是在混合云中运行；也就是说，在你的私有基础设施上有一部分整体工作负载，而在公共云供应商上运行一部分。其中一种方法是使用公共云来处理多出的资源需求。一个组织可以在私有云上运行其大部分典型的工作负载，但在资源短缺的情况下，将一些工作负载扩展到公共云上。同样，为了使其有效运作，需要在两个空间使用相同的开源计算基础设施解决方案。

Both multicloud and hybrid cloud strategies require the multiple environments to be connected well, through direct network connectivity between machines in different environments and common APIs that are available in both.

多云和混合云战略都需要将多个环境很好地连接起来，通过不同环境中的机器之间的直接网络连接和两个环境中都有的通用API。

## Conclusion 总结

Over the course of building, refining, and running its compute infrastructure, Google learned the value of a well-designed, common compute infrastructure. Having a single infrastructure for the entire organization (e.g., one or a small number of shared Kubernetes clusters per region) provides significant efficiency gains in management and resource costs and allows the development of shared tooling on top of that infrastructure. In the building of such an architecture, containers are a key tool to allow sharing a physical (or virtual) machine between different tasks (leading to resource efficiency) as well as to provide an abstraction layer between the application and the operating system that provides resilience over time.

在构建、完善和运行计算基础设施的过程中，谷歌认识到了设计良好的通用计算基础设施的价值。为整个组织提供单一的基础设施（例如，每个区域一个或少数共享Kubernetes集群）可以显著提高管理效率和资源成本，并允许在基础设施之上开发共享工具。在构建这样一个体系结构时，容器是一个关键工具，它允许在不同的任务之间共享物理（或虚拟）机器（从而提高资源效率），并在应用程序和操作系统之间提供一个抽象层，随着时间的推移提供弹性。

Utilizing a container-based architecture well requires designing applications to use the “cattle” model: engineering your application to consist of nodes that can be easily and automatically replaced allows scaling to thousands of instances. Writing software to be compatible with that model requires different thought patterns; for example, treating all local storage (including disk) as ephemeral and avoiding hardcoding hostnames.

充分利用基于容器的体系结构需要设计使用“牛”模型的应用程序：将应用程序设计为由可以轻松自动替换的节点组成，从而可以扩展到数千个实例。编写与该模型兼容的软件需要不同的思维模式；例如，将所有本地存储（包括磁盘）视为短暂的，并避免硬编码主机名。

That said, although Google has, overall, been both satisfied and successful with its choice of architecture, other organizations will choose from a wide range of compute services—from the “pets” model of hand-managed VMs or machines, through “cattle” replicated containers, to the abstract “serverless” model, all available in managed and open source flavors; your choice is a complex trade-off of many factors.

这就是说，尽管谷歌总体上对其架构的选择感到满意并取得了成功，但其他组织将从一系列计算服务中进行选择，从手工管理的虚拟机或机器的“宠物”模型，通过“牛”复制容器，到抽象的“无服务器”模型，所有版本都有托管和开源版本；你的选择是许多因素的复杂权衡。

## TL;DRs  内容提要

- Scale requires a common infrastructure for running workloads in production.
- A compute solution can provide a standardized, stable abstraction and environment for software.
- Software needs to be adapted to a distributed, managed compute environment.
- The compute solution for an organization should be chosen thoughtfully to provide appropriate levels of abstraction.

- 规模化需要一个通用的基础设施来运行生产中的工作负载。
- 一个计算解决方案可以为软件提供一个标准化的、稳定的抽象和环境。
- 软件需要适应一个分布式的、可管理的计算环境。
- 组织的计算解决方案应经过深思熟虑的选择，以提供适当的抽象级别。
