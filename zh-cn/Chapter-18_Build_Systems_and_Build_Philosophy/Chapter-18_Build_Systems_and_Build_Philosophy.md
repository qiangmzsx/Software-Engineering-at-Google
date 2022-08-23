**CHAPTER 18**

# Build Systems and Build Philosophy

# 第十八章 构建系统，构建理念

**Written by  Erik Kuefler**

**Edited by Lisa Carey**

If you ask Google engineers what they like most about working at Google (besides the free food and cool products), you might hear something surprising: engineers love the build system.[^1] Google has spent a tremendous amount of engineering effort over its lifetime in creating its own build system from the ground up, with the goal of ensuring that our engineers are able to quickly and reliably build code. The effort has been so successful that Blaze, the main component of the build system, has been reimplemented several different times by ex-Googlers who have left the company.[^2] In 2015, Google finally open sourced an implementation of Blaze named Bazel.

如果你问谷歌的工程师，他们最喜欢在谷歌工作的原因（除了免费的食物和黑科技产品），你还会听到一些令人惊讶的事情：工程师们喜欢构建系统。谷歌一直在花费了巨大的努力，从零开始创建自己的构建系统，目的是确保工程师们能够快速、可靠地构建代码。这一努力是成功的，构建系统的主要组件Blaze，已经被已离开公司的前谷歌员工重新实现了好几次。2015年，谷歌终于公开了Blaze的一个实现，名为Bazel。

> [^1]:	In an internal survey, 83% of Googlers reported being satisfied with the build system, making it the fourth most satisfying tool of the 19 surveyed. The average tool had a satisfaction rating of 69%./
> 1  在一项内部调查中，83%的谷歌用户表示对构建系统感到满意，这使它成为19项调查中第四个最令人满意的工具。平均工具的满意度为69%。
> 
> [^2]:	See https://buck.build/ and https://www.pantsbuild.org/index.html./
> 2 查阅 https://buck.build/ and https://www.pantsbuild.org/index.html


# Purpose of a Build System
Fundamentally, all build systems have a straightforward purpose: they transform the source code written by engineers into executable binaries that can be read by machines. A good build system will generally try to optimize for two important properties:
Fast
	A developer should be able to type a single command to run the build and get back the resulting binary, often in as little as a few seconds.

Correct
	Every time any developer runs a build on any machine, they should get the same result (assuming that the source files and other inputs are the same).

从根上说，所有的构建系统都有一个简单的目的：它们将工程师编写的源代码转化为机器可以读取的可执行二进制文件。一个好的构建系统通常会试图优化两个重要的属性：
*快*
	开发人员应该能够输入简单的命令来运行构建并返回生成的二进制文件，而且只需几秒钟
*正确*
	任何开发人员在任何机器上运行构建，他们都应该得到相同的结果（假设源文件和其他输入是相同的）。

Many older build systems attempt to make trade-offs between speed and correctness by taking shortcuts that can lead to inconsistent builds. Bazel’s main objective is to avoid having to choose between speed and correctness, providing a build system structured to ensure that it’s always possible to build code efficiently and consistently.

许多较老的构建系统尝试在速度和正确性之间做出权衡，采取了一些可能导致不一致的构建的捷径。Bazel的主要目标是避免在速度和正确性之间做出选择，提供一个结构化的构建系统，以确保总是可以高效和一致地构建代码。

Build systems aren’t just for humans; they also allow machines to create builds automatically, whether for testing or for releases to production. In fact, the large majority of builds at Google are triggered automatically rather than directly by engineers. Nearly all of our development tools tie into the build system in some way, giving huge amounts of value to everyone working on our codebase. Here’s a small sample of workflows that take advantage of our automated build system:
- Code is automatically built, tested, and pushed to production without any human intervention. Different teams do this at different rates: some teams push weekly, others daily, and others as fast as the system can create and validate new builds. (see Chapter 24).
- Developer changes are automatically tested when they’re sent for code review (see Chapter 19) so that both the author and reviewer can immediately see any build or test issues caused by the change.
- Changes are tested again immediately before merging them into the trunk, making it much more difficult to submit breaking changes.
- Authors of low-level libraries are able to test their changes across the entire codebase, ensuring that their changes are safe across millions of tests and binaries.
- Engineers are able to create large-scale changes (LSCs) that touch tens of thousands of source files at a time (e.g., renaming a common symbol) while still being able to safely submit and test those changes. We discuss LSCs in greater detail in Chapter 22.

构建系统不仅仅是为人类服务的；它们也允许机器自动创建构建，无论是用于测试还是用于发布到生产环境。事实上，谷歌的大部分构建都是自动触发的，而不是由工程师点击触发的。我们几乎所有的开发工具都以某种方式与构建系统相结合，为每个在我们的代码库上工作的人提供了巨大的价值。以下是利用我们的自动构建系统的一小部分工作流示例：
- 代码自动构建、测试并推送到生产环境，无需任何人工干预。不同的团队以不同的频率做这件事：有些团队每周推送一次，有些团队每天推送一次，有些团队则以系统能够创建和验证新构建的速度推送。(见第24章）。
- 开发人员的更改在发送给代码审查时自动进行测试（参见第19章），以便作者和审查人员都可以立即看到更改引起的任何构建或测试问题。。
- 在将修改合并到主干中之前，会立即对其进行测试，这使得提交破坏性修改变得更加困难。
- 基础库的作者能够在整个代码库中测试他们的修改，确保他们的修改在数百万的测试和二进制文件中是安全的。
- 工程师们能够创建大规模的变更（LSCs），同时触及数以万计的源文件（例如，重命名公共符号），同时仍然能够安全地提交和测试这些修改。我们将在第22章中更详细地讨论LSCs。

All of this is possible only because of Google’s investment in its build system. Although Google might be unique in its scale, any organization of any size can realize similar benefits by making proper use of a modern build system. This chapter describes what Google considers to be a “modern build system” and how to use such systems.

所有这些都是由于谷歌对其构建系统的投入才得以实现。尽管谷歌的规模是独一无二的，但任何规模的组织都可以通过正确使用现代构建系统实现类似的好处。本章介绍了Google认为的 "现代构建系统"以及如何使用这些系统。

#  What Happens Without a Build System? 没有构建系统会怎样？

Build systems allow your development to scale. As we’ll illustrate in the next section, we run into problems of scaling without a proper build environment.

构建系统使你的开发可扩展。正如我们将在下一节说明的那样，我们在没有适当的构建环境的情况下会遇到扩展问题。

## But All I Need Is a Compiler! 但我所需要的只是一个编译器!
The need for a build system might not be immediately obvious. After all, most of us probably didn’t use a build system when we were first learning to code—we probably started by invoking tools like gcc or javac directly from the command line, or the equivalent in an integrated development environment (IDE). As long as all of our source code is in the same directory, a command like this works fine:

```shell
javac *.java
```
对构建系统的需求可能不是很明显。毕竟，我们中的大多数人在最初学习编码时可能并没有使用构建系统--我们可能一开始就直接从命令行中调用gcc或javac等工具，或者在集成开发环境（IDE）中调用相应的工具。只要我们所有的源代码都在同一个目录下，这样的命令就能正常工作：

```shell
javac *.java
```

This instructs the Java compiler to take every Java source file in the current directory and turn it into a binary class file. In the simplest case, this is all that we need.

这指示Java编译器把当前目录下的每一个Java源文件都变成一个二进制类文件。在最简单的情况下，这就是我们所需要的。

However, things become more complicated quickly as soon as our code expands. javac is smart enough to look in subdirectories of our current directory to find code that we import. But it has no way of finding code stored in other parts of the filesystem (perhaps a library shared by several of our projects). It also obviously only knows how to build Java code. Large systems often involve different pieces written in a variety of programming languages with webs of dependencies among those pieces, meaning no compiler for a single language can possibly build the entire system.

然而，随着代码的扩展，事情很快就会变得更加复杂。javac非常聪明，可以在我们当前目录的子目录中寻找我们导入的代码。但它没有办法找到存储在文件系统其他地方的代码（也许是我们几个项目共享的库）。显然，它只知道如何构建Java代码。大型系统通常涉及到用各种编程语言编写的不同部分，这些部分之间存在着依赖关系，这意味着没有一个单一语言的编译器可以构建整个系统。

As soon as we end up having to deal with code from multiple languages or multiple compilation units, building code is no longer a one-step process. We now need to think about what our code depends on and build those pieces in the proper order, possibly using a different set of tools for each piece. If we change any of the dependencies, we need to repeat this process to avoid depending on stale binaries. For a codebase of even moderate size, this process quickly becomes tedious and error-prone.

一旦我们不得不处理来自多种语言或多个编译单元的代码，构建代码就不再是一步到位的过程。我们现在需要考虑我们的代码依赖于什么，并以适当的顺序构建这些部分，可能为每个部分使用一套不同的工具。如果我们改变了任何依赖关系，我们需要重复这个过程，以避免依赖过时的二进制文件。对于一个中等规模的代码库来说，这个过程很快就会变得乏味，并且容易出错。

The compiler also doesn’t know anything about how to handle external dependencies, such as third-party JAR files in Java. Often the best we can do without a build system is to download the dependency from the internet, stick it in a lib folder on the hard drive, and configure the compiler to read libraries from that directory. Over time, it’s easy to forget what libraries we put in there, where they came from, and whether they’re still in use. And good luck keeping them up to date as the library maintainers release new versions.

编译器也不知道如何处理外部依赖关系，比如Java中的第三方JAR文件。通常，在没有构建系统的情况下，我们能做的最好的事情就是从网上下载依赖关系，把它放在硬盘上的lib文件夹里，并配置编译器从该目录中读取库。随着时间的推移，我们很容易忘记我们把哪些库放在那里，它们来自哪里，以及它们是否仍在使用。而且，当库的维护者发布新的版本时，要想让它们保持最新的状态，那就得靠运气了。

## Shell Scripts to the Rescue? 来自shell脚本的拯救？
Suppose that your hobby project starts out simple enough that you can build it using just a compiler, but you begin running into some of the problems described previously. Maybe you still don’t think you need a real build system and can automate away the tedious parts using some simple shell scripts that take care of building things in the correct order. This helps out for a while, but pretty soon you start running into even more problems:

- It becomes tedious. As your system grows more complex, you begin spending almost as much time working on your build scripts as on real code. Debugging shell scripts is painful, with more and more hacks being layered on top of one another.
- It’s slow. To make sure you weren’t accidentally relying on stale libraries, you have your build script build every dependency in order every time you run it. You think about adding some logic to detect which parts need to be rebuilt, but that sounds awfully complex and error prone for a script. Or you think about specifying which parts need to be rebuilt each time, but then you’re back to square one.
- Good news: it’s time for a release! Better go figure out all the arguments you need to pass to the jar command to make your final build. And remember how to upload it and push it out to the central repository. And build and push the documentation updates, and send out a notification to users. Hmm, maybe this calls for another script...
-	Disaster! Your hard drive crashes, and now you need to recreate your entire system. You were smart enough to keep all of your source files in version control, but what about those libraries you downloaded? Can you find them all again and make sure they were the same version as when you first downloaded them? Your scripts probably depended on particular tools being installed in particular places — can you restore that same environment so that the scripts work again? What about all those environment variables you set a long time ago to get the compiler working just right and then forgot about?
-	Despite the problems, your project is successful enough that you’re able to begin hiring more engineers. Now you realize that it doesn’t take a disaster for the previous problems to arise—you need to go through the same painful bootstrapping process every time a new developer joins your team. And despite your best efforts, there are still small differences in each person’s system. Frequently, what works on one person’s machine doesn’t work on another’s, and each time it takes a few hours of debugging tool paths or library versions to figure out where the difference is.
-	You decide that you need to automate your build system. In theory, this is as simple as getting a new computer and setting it up to run your build script every night using cron. You still need to go through the painful setup process, but now you don’t have the benefit of a human brain being able to detect and resolve minor problems. Now, every morning when you get in, you see that last night’s build failed because yesterday a developer made a change that worked on their system but didn’t work on the automated build system. Each time it’s a simple fix, but it happens so often that you end up spending a lot of time each day discovering and applying these simple fixes.
- Builds become slower and slower as the project grows. One day, while waiting for a build to complete, you gaze mournfully at the idle desktop of your coworker, who is on vacation, and wish there were a way to take advantage of all that wasted computational power.

假设你的业余项目开始时非常简单，你可以只用一个编译器来构建它，但你开始遇到前面描述的一些问题。也许你仍然认为你不需要一个真正的构建系统，可以使用一些简单的shell脚本来自动处理那些繁琐的部分，这些脚本负责按照正确的顺序构建东西。这会有一段时间的帮助，但很快你就会遇到更多的问题：

- 它变得乏味了。随着你的系统越来越复杂，你开始花在构建脚本上的时间几乎和真正的写代码一样多。调试shell脚本是很痛苦的，越来越多的"黑"操作操作被叠加在一起。
- 速度很慢。为了确保你没有意外地依赖过时的库，你让你的构建脚本在每次运行时按顺序构建每个依赖。你可以考虑添加一些逻辑来检测哪些部分需要重建，但这对于一个脚本来说听起来非常复杂而且容易出错。或者你可以考虑每次指定哪些部分需要重建，但是你又回到了原点。
- 好消息是：现在是发布的时候了! 最好弄清楚所有需要传递给jar命令以进行最终构建的参数。并记住如何上传并推送到中央仓库。构建并推送文档更新，并向用户发送通知。嗯，也许这需要另一个脚本......
- 灾难! 硬盘崩溃了，现在需要重新创建整个系统。你很聪明，把所有的源文件都保存在版本控制中，但是你下载的那些库呢？你能重新找到它们，并确保它们和你第一次下载它们时的版本相同吗？你的脚本可能依赖于特定的工具被安装在特定的地方--你能恢复同样的环境，使脚本再次工作吗？那些你很久以前为了让编译器工作得恰到好处而设置的环境变量，后来又忘记了，怎么办？
- 尽管有这些问题，你的项目还是足于成功，以至于你能够开始雇用更多的工程师。现在你意识到，不需要一场灾难就会出现以前的问题--每次有新的开发人员加入你的团队，你都需要经历同样痛苦的启动过程。而且，尽管你做了最大的努力，每个人的系统还是有小的差异。通常，在一个人的机器上起作用的东西在另一个人的机器上不起作用，每次调试工具路径或库版本都需要几个小时才能找出差异所在。
- 你决定需要自动化构建系统。从理论上讲，这就像买一台新的电脑并设置它每天晚上使用cron运行你的构建脚本一样简单。你仍然需要经历痛苦的设置过程，但现在你没有了需要调式检测和解决小问题的好处。现在，每天早上当你进去的时候，你会看到昨晚的构建失败了，因为昨天一个开发者做了一个改变，这个改变在他们的系统上有效，但在自动构建系统上却不起作用。每次都是一个简单的修复，但它经常发生，以至于你每天都要花费大量时间来发现和应用这些简单的修复。
- 随着项目的发展，构建的速度越来越慢。有一天，在等待构建完成时，你哀怨地注视着正在度假的同事的闲置桌面，希望有一种方法可以充分利用以前的计算能力。

You’ve run into a classic problem of scale. For a single developer working on at most a couple hundred lines of code for at most a week or two (which might have been the entire experience thus far of a junior developer who just graduated university), a compiler is all you need. Scripts can maybe take you a little bit farther. But as soon as you need to coordinate across multiple developers and their machines, even a perfect build script isn’t enough because it becomes very difficult to account for the minor differences in those machines. At this point, this simple approach breaks down and it’s time to invest in a real build system.

你遇到了一个典型的规模问题。对于一个开发人员来说，一个编译器就是你所需要的一切，他最多工作几百行代码，最多工作一两周（这可能是一个刚从大学毕业的初级开发人员迄今为止的全部经验）。脚本可能会让你走得更远一些。但是一旦你需要在多个开发人员和他们的机器之间进行协作，即使是一个完美的构建脚本也是不够的，因为很难解释这些机器中的细微差异。在这一点上，这个简单的方法崩溃了，是时候开发一个真正的构建系统了。

# Modern Build Systems 现代化的构建系统

Fortunately, all of the problems we started running into have already been solved many times over by existing general-purpose build systems. Fundamentally, they aren’t that different from the aforementioned script-based DIY approach we were working on: they run the same compilers under the hood, and you need to understand those underlying tools to be able to know what the build system is really doing. But these existing systems have gone through many years of development, making them far more robust and flexible than the scripts you might try hacking together yourself.

幸运的是，我们开始遇到的所有问题已经被现有的通用构建系统多次解决。从根本上说，它们与前面提到的基于脚本的DIY方法没有什么不同：它们在后台运行相同的编译器，你需要了解这些底层工具，才能了解构建系统真正在做什么。但是这些现有的系统已经经历了多年的开发，使得它们比你自己尝试破解的脚本更加健壮和灵活。

## It’s All About Dependencies 一切都是关于依赖关系

In looking through the previously described problems, one theme repeats over and over: managing your own code is fairly straightforward, but managing its dependencies is much more difficult (and [Chapter 21 ](#_bookmark1845)is devoted to covering this problem in detail). There are all sorts of dependencies: sometimes there’s a dependency on a task (e.g., “push the documentation before I mark a release as complete”), and sometimes there’s a dependency on an artifact (e.g., “I need to have the latest version of the computer vision library to build my code”). Sometimes, you have internal dependencies on another part of your codebase, and sometimes you have external dependencies on code or data owned by another team (either in your organization or a third party). But in any case, the idea of “I need that before I can have this” is something that recurs repeatedly in the design of build systems, and managing dependencies is perhaps the most fundamental job of a build system.

在回顾之前描述的问题时，有一个主题反复出现：管理你自己的代码是相当简单的，但管理它的依赖关系要困难得多（[第21章](#_bookmark1845)专门详细介绍了这个问题）。有各种各样的依赖关系：有时依赖于任务（例如，“在我将发布标记为完成之前推送文档”），有时依赖于工件（例如，“我需要最新版本的计算机视觉库来构建代码”）。有时，你对你的代码库的另一部分有内部依赖性，有时你对另一个团队（在你的组织中或第三方）拥有的代码或数据有外部依赖性。但无论如何，"在我拥有这个之前，我需要那个 "的想法在构建系统的设计中反复出现，而管理依赖性也许是构建系统最基本的工作。

## Task-Based Build Systems 基于任务的构建系统
The shell scripts we started developing in the previous section were an example of a primitive task-based build system. In a task-based build system, the fundamental unit of work is the task. Each task is a script of some sort that can execute any sort of logic, and tasks specify other tasks as dependencies that must run before them. Most major build systems in use today, such as Ant, Maven, Gradle, Grunt, and Rake, are task based.

我们在上一节开始开发的shell脚本是一个原始的基于任务的构建系统的示例。在基于任务的构建系统中，工作的基本单位是任务。每个任务都是某种类型的脚本，可以执行任何类型的逻辑，任务将其他任务指定为必须在它们之前运行的依赖项。目前使用的大多数主要构建系统，如Ant、Maven、Gradle、Grunt和Rake，都是基于任务的。

Instead of shell scripts, most modern build systems require engineers to create buildfiles that describe how to perform the build. Take this example from the Ant manual:

大多数现代构建系统要求工程师创建描述如何执行构建的构建文件，而不是shell脚本。以Ant手册中的这个例子为例：

``` XML
<project name="MyProject" default="dist" basedir=".">
<description>
simple example build file
</description>
<!-- set global properties for this build -->
<property name="src" location="src"/>
<property name="build" location="build"/>
<property name="dist" location="dist"/>

<target name="init">
<!-- Create the time stamp -->
<tstamp/>
<!-- Create the build directory structure used by compile -->
<mkdir dir="${build}"/>
</target>

<target name="compile" depends="init" description="compile the source">
<!-- Compile the Java code from ${src} into ${build} -->
<javac srcdir="${src}" destdir="${build}"/>
</target>

<target name="dist" depends="compile" description="generate the distribution">
<!-- Create the distribution directory -->
<mkdir dir="${dist}/lib"/>

<!-- Put everything in ${build} into the MyProject-${DSTAMP}.jar file -->
<jar jarfile="${dist}/lib/MyProject-${DSTAMP}.jar" basedir="${build}"/>
</target>

<target name="clean" description="clean up">
<!-- Delete the ${build} and ${dist} directory trees -->
<delete dir="${build}"/>
<delete dir="${dist}"/>
</target>
</project>
```
The buildfile is written in XML and defines some simple metadata about the build along with a list of tasks (the <target> tags in the XML[^3]). Each task executes a list of possible commands defined by Ant, which here include creating and deleting directories, running javac, and creating a JAR file. This set of commands can be extended by user-provided plug-ins to cover any sort of logic. Each task can also define the tasks it depends on via the depends attribute. These dependencies form an acyclic graph (see Figure 18-1).

构建文件是用XML编写的，定义了一些关于构建的简单元数据以及任务列表（XML中的<target>标签）。每个任务都执行Ant定义的一系列可能的命令，其中包括创建和删除目录、运行javac和创建JAR文件。这组命令可以由用户提供的插件扩展，以涵盖任何类型的逻辑。每个任务还可以通过依赖属性定义它所依赖的任务。这些依赖关系形成一个无环图（见图18-1）。

Figure 18-1. An acyclic graph showing dependencies 显示依赖关系的无环图

![Figure 18-1](./images/Figure%2018-1.jpg)

Users perform builds by providing tasks to Ant’s command-line tool. For example, when a user types ant dist, Ant takes the following steps:

1. Loads a file named *build.xml* in the current directory and parses it to create the graph structure shown in [Figure 18-1](#_bookmark1627).

2. Looks for the task named dist that was provided on the command line and discovers that it has a dependency on the task named compile.

3. Looks for the task named compile and discovers that it has a dependency on the task named init.

4. Looks for the task named init and discovers that it has no dependencies.

5. Executes the commands defined in the init task.

6. Executes the commands defined in the compile task given that all of that task’s dependencies have been run.

7. Executes the commands defined in the dist task given that all of that task’s dependencies have been run.

用户通过向Ant的命令行工具提供任务来执行构建。例如，当用户输入ant dist时，Ant会采取以下步骤。

1. 在当前目录下加载一个名为*build.xml*的文件，并对其进行解析以创建图18-1所示的图结构。

2. 寻找命令行上提供的名为dist的任务，并发现它与名为compile的任务有依赖关系。

3. 寻找名为compile的任务，发现它与名为init的任务有依赖关系。

4. 查找名为init的任务并确认它没有依赖项。

5. 执行init任务中定义的命令。

6. 执行编译任务中定义的命令，前提是该任务的所有依赖项都已运行。

7. 执行dist任务中定义的命令，前提是该任务的所有依赖项都已运行。

In the end, the code executed by Ant when running the dist task is equivalent to the following shell script:

最后，Ant在运行dist任务时执行的代码相当于以下shell脚本：

```shell
./createTimestamp.sh 
mkdir build/
javac src/* -d build/
mkdir -p dist/lib/
jar cf dist/lib/MyProject-$(date --iso-8601).jar build/*
```

```
3	Ant uses the word “target” to represent what we call a “task” in this chapter, and it uses the word “task” to refer to what we call “commands.”
3   Ant使用“target”一词来表示我们在本章中所称的“task”，并使用“task”一词来表示我们所称的“commands”
```

When the syntax is stripped away, the buildfile and the build script actually aren’t too different. But we’ve already gained a lot by doing this. We can create new buildfiles in other directories and link them together. We can easily add new tasks that depend on existing tasks in arbitrary and complex ways. We need only pass the name of a single task to the ant command-line tool, and it will take care of determining everything that needs to be run.

去掉语法后，构建文件和构建脚本实际上没有太大区别。但我们这样做已经有了很大的收获。我们可以在其他目录中创建新的构建文件并将它们链接在一起。我们可以以任意和复杂的方式轻松添加依赖于现有任务的新任务。我们只需要将单个任务的名称传递给ant命令行工具，它将负责确定需要运行的所有内容。

Ant is a very old piece of software, originally released in 2000—not what many people would consider a “modern” build system today! Other tools like Maven and Gradle have improved on Ant in the intervening years and essentially replaced it by adding features like automatic management of external dependencies and a cleaner syntax without any XML. But the nature of these newer systems remains the same: they allow engineers to write build scripts in a principled and modular way as tasks and provide tools for executing those tasks and managing dependencies among them.

Ant是一个非常古老的软件，最初发布于2000年--而不是很多人今天会考虑的“现代”构建系统！其他工具，如Maven和Gradle，在这几年中对Ant进行了改进，基本上取代了它，添加诸如自动管理外部依赖项和不使用任何XML的更干净语法等功能。但这些新系统的本质仍然是一样的：它们允许工程师以有原则的模块化方式编写构建脚本作为任务，并提供工具来执行这些任务和管理它们之间的依赖关系。

> [^3]:  Ant uses the word “target” to represent what we call a “task” in this chapter, and it uses the word “task” to refer to what we call “commands.”/
> 3 ant用 "目标 "这个词来表示我们在本章中所说的 "任务"，它用 "任务 "这个词来指代我们所说的 "命令"/。

### The dark side of task-based build systems 基于任务的构建系统的缺陷

Because these tools essentially let engineers define any script as a task, they are extremely powerful, allowing you to do pretty much anything you can imagine with them. But that power comes with drawbacks, and task-based build systems can become difficult to work with as their build scripts grow more complex. The problem with such systems is that they actually end up giving *too much power to engineers and not enough power to the system*. Because the system has no idea what the scripts are doing, performance suffers, as it must be very conservative in how it schedules and executes build steps. And there’s no way for the system to confirm that each script is doing what it should, so scripts tend to grow in complexity and end up being another thing that needs debugging.

因为这些工具本质上允许工程师将任何脚本定义为一项任务，所以它们非常强大，允许你用它们做几乎任何你能想象到的事情。但是，这种能力也有缺点，基于任务的构建系统会随着构建脚本的日益复杂而变得难以使用。这类系统的问题是，它们实际上最终给了*过多的权力给工程师，而没有足够的权力给系统*。因为系统不知道脚本在做什么，性能受到影响，因为它在调度和执行构建步骤时必须非常保守。而且，系统无法确认每个脚本都在做它应该做的事情，因此脚本往往会变得越来越复杂，最终成为另一件需要调试的事情。

**Difficulty of parallelizing build steps.** Modern development workstations are typically quite powerful, with multiple cores that should theoretically be capable of executing several build steps in parallel. But task-based systems are often unable to parallelize task execution even when it seems like they should be able to. Suppose that task A depends on tasks B and C. Because tasks B and C have no dependency on each other, is it safe to run them at the same time so that the system can more quickly get to task A? Maybe, if they don’t touch any of the same resources. But maybe not—perhaps both use the same file to track their statuses and running them at the same time will cause a conflict. There’s no way in general for the system to know, so either it has to risk these conflicts (leading to rare but very difficult-to-debug build problems), or it has to restrict the entire build to running on a single thread in a single process. This can be a huge waste of a powerful developer machine, and it completely rules out the possibility of distributing the build across multiple machines.

**并行化构建步骤的难点。**现代开发工作站通常非常强大，有多个CPU内核，理论上应该能够并行执行几个构建步骤。但是，基于任务的系统往往无法将任务执行并行化，即使是在看起来应该能够做到的时候。假设任务A依赖于任务B和C。因为任务B和C彼此不依赖，所以同时运行它们是否安全，以便系统可以更快地到达任务A？也许吧，如果它们不接触任何相同的资源。但也许不是--也许它们都使用同一个文件来跟踪它们的状态，同时运行它们会导致冲突。一般来说，系统无法知道，所以要么它不得不冒着这些冲突的风险（导致罕见但非常难以调试的构建问题），要么它必须限制整个构建在单个进程的单个线程上运行。这可能是对强大的开发者机器的巨大浪费，而且它完全排除了在多台机器上分布构建的可能性。

**Difficulty performing incremental builds**. A good build system will allow engineers to perform reliable incremental builds such that a small change doesn’t require the entire codebase to be rebuilt from scratch. This is especially important if the build system is slow and unable to parallelize build steps for the aforementioned reasons. But unfortunately, task-based build systems struggle here, too. Because tasks can do anything, there’s no way in general to check whether they’ve already been done. Many tasks simply take a set of source files and run a compiler to create a set of binaries; thus, they don’t need to be rerun if the underlying source files haven’t changed. But without additional information, the system can’t say this for sure—maybe the task downloads a file that could have changed, or maybe it writes a timestamp that could be different on each run. To guarantee correctness, the system typically must rerun every task during each build.

**难以执行增量构建**。一个好的构建系统将允许工程师执行可靠的增量构建，这样，一个小的变更就不需要从头开始重建整个代码库了。如果构建系统由于上述原因，速度很慢，无法并行化构建步骤，那么这一点就尤为重要。但不幸的是，基于任务的构建系统在这里也很困难。因为任务可以做任何事情，一般来说，没有办法检查它们是否已经完成。许多任务只是接收一组源文件并运行一个编译器来创建一组二进制文件；因此，如果底层源文件没有更改，则不需要重新运行。但是，如果没有额外的信息，系统就不能确定这一点--可能是任务下载了一个可能已更改的文件，或者它在每次运行时写入了一个可能不同的时间戳。为了保证正确性，系统通常必须在每次构建期间重新运行每个任务。

Some build systems try to enable incremental builds by letting engineers specify the conditions under which a task needs to be rerun. Sometimes this is feasible, but often it’s a much trickier problem than it appears. For example, in languages like C++ that allow files to be included directly by other files, it’s impossible to determine the entire set of files that must be watched for changes without parsing the input sources. Engineers will often end up taking shortcuts, and these shortcuts can lead to rare and frustrating problems where a task result is reused even when it shouldn’t be. When this happens frequently, engineers get into the habit of running clean before every build to get a fresh state, completely defeating the purpose of having an incremental build in the first place. Figuring out when a task needs to be rerun is surprisingly subtle, and is a job better handled by machines than humans.

一些构建系统试图通过让工程师指定需要重新运行任务的条件来启用增量构建。有时这是可行的，但通常这是一个比看起来更棘手的问题。例如，在像C++这样允许文件直接被其他文件包含的语言中，如果不解析输入源，就不可能确定必须关注的整个文件集的变化。工程师们最终往往会走捷径，而这些捷径会导致罕见的、令人沮丧的问题，即一个任务结果被重复使用，即使它不应该被使用。当这种情况经常发生时，工程师们就会养成习惯，在每次构建前运行clean，以获得一个全新的状态，这就完全违背了一开始就有增量构建的目的。弄清楚什么时候需要重新运行一个任务是非常微妙的，而且是一个最好由机器而不是人处理的工作。

**Difficulty maintaining and debugging scripts**. Finally, the build scripts imposed by task- based build systems are often just difficult to work with. Though they often receive less scrutiny, build scripts are code just like the system being built, and are easy places for bugs to hide. Here are some examples of bugs that are very common when working with a task-based build system:
-	Task A depends on task B to produce a particular file as output. The owner of task B doesn’t realize that other tasks rely on it, so they change it to produce output in a different location. This can’t be detected until someone tries to run task A and finds that it fails.
-	Task A depends on task B, which depends on task C, which is producing a particular file as output that’s needed by task A. The owner of task B decides that it doesn’t need to depend on task C any more, which causes task A to fail even though task B doesn’t care about task C at all!
-	The developer of a new task accidentally makes an assumption about the machine running the task, such as the location of a tool or the value of particular environment variables. The task works on their machine, but fails whenever another developer tries it.
-	A task contains a nondeterministic component, such as downloading a file from the internet or adding a timestamp to a build. Now, people will get potentially different results each time they run the build, meaning that engineers won’t always be able to reproduce and fix one another’s failures or failures that occur on an automated build system.
-	Tasks with multiple dependencies can create race conditions. If task A depends on both task B and task C, and task B and C both modify the same file, task A will get a different result depending on which one of tasks B and C finishes first.

**难以维护和调试脚本**。最后，基于任务的构建系统所强加的构建脚本往往就是难以使用。尽管构建脚本通常很少受到审查，但它们与正在构建的系统一样，都是代码，很容易隐藏bug。以下是使用基于任务的构建系统时常见的一些错误示例：
- 任务A依赖于任务B来产生一个特定的文件作为输出。任务B的所有者没有意识到其他任务依赖于它，所以他们改变了它，在不同的位置产生输出。直到有人试图运行任务A，发现它失败了，这才被发现。
- 任务A依赖于任务B，而任务B依赖于任务C，而任务C正在产生一个任务A需要的特定文件作为输出。任务B的所有者决定它不需要再依赖于任务C，这导致任务A失败，尽管任务B根本不关心任务C!
- 一个新任务的开发者不小心对运行该任务的机器做了一个设置，比如一个工具的位置或特定环境变量的值。该任务在他们的机器上可以运行，但只要其他开发者尝试，就会失败。
- 任务包含不确定组件，例如从internet下载文件或向生成添加时间戳。现在，人们每次运行构建时都会得到可能不同的结果，这意味着工程师不可能总是能够重现和修复彼此的故障或自动构建系统上发生的故障。
- 有多个依赖关系的任务会产生竞赛条件。如果任务A同时依赖于任务B和任务C，而任务B和任务C同时修改同一个文件，那么任务A会得到不同的结果，这取决于任务B和任务C中哪一个先完成。

There’s no general-purpose way to solve these performance, correctness, or maintainability problems within the task-based framework laid out here. So long as engineers can write arbitrary code that runs during the build, the system can’t have enough information to always be able to run builds quickly and correctly. To solve the problem, we need to take some power out of the hands of engineers and put it back in the hands of the system and reconceptualize the role of the system not as running tasks, but as producing artifacts. This is the approach that Google takes with Blaze and Bazel, and it will be described in the next section.

在这里列出的基于任务的框架中，没有通用的方法来解决这些性能、正确性或可维护性问题。只要工程师能够编写在构建过程中运行的任意代码，系统就不可能拥有足够的信息来始终能够快速、正确地运行构建。我们需要从工程师手中夺走一些权力，把它放回系统的手中，并重新认识到系统的作用不是作为运行任务，而是作为生产组件。这就是谷歌对Blaze和Bazel采取的方法，将在下一节进行描述。

## Artifact-Based Build Systems 基于构件的构建系统
To design a better build system, we need to take a step back. The problem with the earlier systems is that they gave too much power to individual engineers by letting them define their own tasks. Maybe instead of letting engineers define tasks, we can have a small number of tasks defined by the system that engineers can configure in a limited way. We could probably deduce the name of the most important task from the name of this chapter: a build system’s primary task should be to build code. Engineers would still need to tell the system what to build, but the how of doing the build would be left to the system.

为了设计一个更好的构建系统，我们需要后退一步。早期系统的问题在于，它们让工程师定义自己的任务，从而给了他们太多的权力。也许，我们可以不让工程师定义任务，而是由系统定义少量的任务，让工程师以有限的方式进行配置。我们也许可以从本章的名称中推断出最重要的任务的名称：构建系统的主要任务应该是构建代码。工程师们仍然需要告诉系统要构建什么，但如何构建的问题将留给系统。

This is exactly the approach taken by Blaze and the other artifact-based build systems descended from it (which include Bazel, Pants, and Buck). Like with task-based build systems, we still have buildfiles, but the contents of those buildfiles are very different. Rather than being an imperative set of commands in a Turing-complete scripting language describing how to produce an output, buildfiles in Blaze are a declarative manifest describing a set of artifacts to build, their dependencies, and a limited set of options that affect how they’re built. When engineers run blaze on the command line, they specify a set of targets to build (the “what”), and Blaze is responsible for configuring, running, and scheduling the compilation steps (the “how”). Because the build system now has full control over what tools are being run when, it can make much stronger guarantees that allow it to be far more efficient while still guaranteeing correctness.

这正是Blaze和它衍生的其他基于构件的构建系统（包括Bazel、Pants和Buck）所采用的方法。与基于任务的构建系统一样，我们仍然有构建文件，但这些构建文件的内容却非常不同。在Blaze中，构建文件不是图灵完备的脚本语言中描述如何产生输出的命令集，而是声明性的清单，描述一组要构建的构件、它们的依赖关系，以及影响它们如何构建的有限选项集。当工程师在命令行上运行blaze时，他们指定一组要构建的目标（"what"），而Blaze负责配置、运行和调度编译步骤（"how"）。由于构建系统现在可以完全控制什么工具在什么时候运行，它可以做出更有力的保证，使其在保证正确性的同时，效率也大大提高。

### A functional perspective 功能视角

It’s easy to make an analogy between artifact-based build systems and functional programming. Traditional imperative programming languages (e.g., Java, C, and Python) specify lists of statements to be executed one after another, in the same way that task- based build systems let programmers define a series of steps to execute. Functional programming languages (e.g., Haskell and ML), in contrast, are structured more like a series of mathematical equations. In functional languages, the programmer describes a computation to perform, but leaves the details of when and exactly how that computation is executed to the compiler. This maps to the idea of declaring a manifest in an artifact-based build system and letting the system figure out how to execute the build.

在基于构件的构建系统和函数式编程之间做个类比是很容易的。传统的命令式编程语言（如Java、C和Python）指定了一个又一个要执行的语句列表，就像基于任务的构建系统让程序员定义一系列的执行步骤一样。相比之下，函数式编程语言（如Haskell和ML）的结构更像是一系列的数学方程。在函数式语言中，程序员描述了一个要执行的计算，但把何时以及如何执行该计算的细节留给了编译器。这就相当于在基于构件的构建系统中声明一个清单，并让系统找出如何执行构建的思路。

Many problems cannot be easily expressed using functional programming, but the ones that do benefit greatly from it: the language is often able to trivially parallelize such programs and make strong guarantees about their correctness that would be impossible in an imperative language. The easiest problems to express using functional programming are the ones that simply involve transforming one piece of data into another using a series of rules or functions. And that’s exactly what a build system is: the whole system is effectively a mathematical function that takes source files (and tools like the compiler) as inputs and produces binaries as outputs. So, it’s not surprising that it works well to base a build system around the tenets of functional programming.

许多问题无法用函数式编程便捷表达，但那些确实从中受益匪浅的问题：函数式语言通常能够简单地并行这些程序，并对它们的正确性做出强有力的保证，而这在命令式语言中是不可能的。使用函数编程最容易表达的问题是使用一系列规则或函数将一段数据转换为另一段数据的问题。而这正是构建系统的特点：整个系统实际上是一个数学函数，它将源文件（和编译器等工具）作为输入，并产生二进制文件作为输出。因此，围绕函数式编程的原则建立一个构建系统并不令人惊讶。

Getting concrete with Bazel. Bazel is the open source version of Google’s internal build tool, Blaze, and is a good example of an artifact-based build system. Here’s what a buildfile (normally named BUILD) looks like in Bazel:

用Bazel来实现具体化。Bazel是谷歌内部构建工具Blaze的开源版本，是基于构件的构建系统的一个好例子。下面是Bazel中构建文件（通常名为BUILD）的内容：

```
java_binary(
name = "MyBinary",
srcs = ["MyBinary.java"], deps = [
":mylib",
],
)

java_library(
name = "mylib",
srcs = ["MyLibrary.java", "MyHelper.java"],
visibility = ["//java/com/example/myproduct: subpackages "], deps = [
"//java/com/example/common", "//java/com/example/myproduct/otherlib", "@com_google_common_guava_guava//jar",
],
)
```
In Bazel, BUILD files define targets—the two types of targets here are java_binary and java_library. Every target corresponds to an artifact that can be created by the system: binary targets produce binaries that can be executed directly, and library targets produce libraries that can be used by binaries or other libraries. Every target has a name (which defines how it is referenced on the command line and by other targets, srcs (which define the source files that must be compiled to create the artifact for the target), and deps (which define other targets that must be built before this target and linked into it). Dependencies can either be within the same package (e.g., MyBinary’s dependency on ":mylib"), on a different package in the same source hierarchy (e.g., mylib’s dependency on "//java/com/example/common"), or on a third- party artifact outside of the source hierarchy (e.g., mylib’s dependency on "@com_google_common_guava_guava//jar"). Each source hierarchy is called a workspace and is identified by the presence of a special WORKSPACE file at the root.

在Bazel中，BUILD文件定义了目标--这里的两类目标是java_binary和java_library。每个目标都对应于系统可以创建的构件：二进制目标产生可以直接执行的二进制文件，而库目标产生可以被二进制文件或其他库使用的库。每个目标都有一个名字（它定义了它在命令行和其他目标中的引用方式）、srcs（它定义了必须被编译以创建目标的组件的源文件）和deps（它定义了必须在这个目标之前构建并链接到它的其他目标）。依赖关系可以是在同一个包内（例如，MyBinary对":mylib "的依赖），也可以是在同一个源层次结构中的不同包上（例如，mylib对"//java/com/example/common "的依赖），或者是在源层次结构之外的第三方工件上（例如，mylib对"@com_google_common_guava_guava//jar "的依赖）。每个源层次结构被称为工作区，并通过在根部存在一个特殊的WORKSPACE文件来识别。

Like with Ant, users perform builds using Bazel’s command-line tool. To build the MyBinary target, a user would run bazel build :MyBinary. Upon entering that command for the first time in a clean repository, Bazel would do the following:  
1. Parse every BUILD file in the workspace to create a graph of dependencies among artifacts.
2. Use the graph to determine the transitive dependencies of MyBinary; that is, every target that MyBinary depends on and every target that those targets depend on, recursively.  
3. Build (or download for external dependencies) each of those dependencies, in order. Bazel starts by building each target that has no other dependencies and keeps track of which dependencies still need to be built for each target. As soon as all of a target’s dependencies are built, Bazel starts building that target. This process continues until every one of MyBinary’s transitive dependencies have been built.
4. Build MyBinary to produce a final executable binary that links in all of the dependencies that were built in step 3.
    Fundamentally, it might not seem like what’s happening here is that much different than what happened when using a task-based build system. Indeed, the end result is the same binary, and the process for producing it involved analyzing a bunch of steps to find dependencies among them, and then running those steps in order. But there are critical differences. The first one appears in step 3: because Bazel knows that each target will only produce a Java library, it knows that all it has to do is run the Java compiler rather than an arbitrary user-defined script, so it knows that it’s safe to run these steps in parallel. This can produce an order of magnitude performance improvement over building targets one at a time on a multicore machine, and is only possible because the artifact-based approach leaves the build system in charge of its own execution strategy so that it can make stronger guarantees about parallelism.


  和Ant一样，用户使用Bazel的命令行工具进行构建。为了构建MyBinary目标，用户可以运行 bazel build :MyBinary。在一个干净的版本库中第一次输入该命令时，Bazel会做以下工作。

  1. 解析工作区中的每个BUILD文件，以创建工件之间的依赖关系图。
  2. 使用该图来确定MyBinary的横向依赖关系；也就是说，MyBinary所依赖的每个目标以及这些目标所依赖的每个目标都是递归的。
  3. 生成（或下载外部依赖项）每个依赖项按顺序排列。Bazel首先构建没有其他依赖项的每个目标，并跟踪每个目标仍需要构建哪些依赖项。一旦构建了目标的所有依赖项，Bazel就会开始构建该目标。此过程一直持续到MyBinary的每个可传递依赖项已经建成。
  4. 构建MyBinary，产生一个最终的可执行二进制文件，该文件链接了在步骤3中构建的所有依赖项。

  The benefits extend beyond parallelism, though. The next thing that this approach gives us becomes apparent when the developer types bazel build :MyBinary a second time without making any changes: Bazel will exit in less than a second with a message saying that the target is up to date. This is possible due to the functional programming paradigm we talked about earlier—Bazel knows that each target is the result only of running a Java compiler, and it knows that the output from the Java compiler depends only on its inputs, so as long as the inputs haven’t changed, the output can be reused. And this analysis works at every level; if MyBinary.java changes, Bazel knows to rebuild MyBinary but reuse mylib. If a source file for //java/com/ example/common changes, Bazel knows to rebuild that library, mylib, and MyBinary, but reuse //java/com/example/myproduct/otherlib. Because Bazel knows about the properties of the tools it runs at every step, it’s able to rebuild only the minimum set of artifacts each time while guaranteeing that it won’t produce stale builds.

  从根本上说，这里发生的事情似乎与使用基于任务的构建系统时发生的事情没有太大的不同。事实上，最终结果是相同的二进制文件，生成它的过程包括分析一系列步骤以找到它们之间的依赖关系，然后按顺序运行这些步骤。但是有一些关键的区别。第一个出现在第3步：因为Bazel知道每个目标只会生成一个Java库，所以它知道它所要做的就是运行Java编译器，而不是任意的用户定义脚本，所以它知道运行它是安全的。这些步骤是并行的。与在多核机器上一次构建一个目标相比，这可以产生一个数量级的性能改进，并且这是唯一可能的，因为基于工件的方法让构建系统负责自己的执行策略，以便它能够对并行性做出更有力的保证。

  Reframing the build process in terms of artifacts rather than tasks is subtle but powerful. By reducing the flexibility exposed to the programmer, the build system can know more about what is being done at every step of the build. It can use this knowledge to make the build far more efficient by parallelizing build processes and reusing their outputs. But this is really just the first step, and these building blocks of parallelism and reuse will form the basis for a distributed and highly scalable build system that will be discussed later.

  从构件而不是任务的角度来重构构建过程是微妙而强大的。通过减少暴露在程序员面前的灵活性，构建系统可以知道更多关于在构建的每一步正在做什么。它可以利用这些知识，通过并行化构建过程和重用其输出，使构建的效率大大提升。但这实际上只是第一步，这些并行和重用的构件将构成分布式和高度可扩展的构建系统的基础，这将在后面讨论。
### Other nifty Bazel tricks 其他有趣的Bazel技巧
Artifact-based build systems fundamentally solve the problems with parallelism and reuse that are inherent in task-based build systems. But there are still a few problems that came up earlier that we haven’t addressed. Bazel has clever ways of solving each of these, and we should discuss them before moving on.

基于构件的构建系统从根本上解决了基于任务的构建系统所固有的并行性和重用问题。但仍有一些问题在前面出现过，我们还没有解决。Bazel有解决这些问题的聪明方法，我们应该在继续之前讨论它们。

**Tools as dependencies**. One problem we ran into earlier was that builds depended on the tools installed on our machine, and reproducing builds across systems could be difficult due to different tool versions or locations. The problem becomes even more difficult when your project uses languages that require different tools based on which platform they’re being built on or compiled for (e.g., Windows versus Linux), and each of those platforms requires a slightly different set of tools to do the same job.

**工具作为依赖项**。我们之前遇到的一个问题是，构建取决于我们机器上安装的工具，由于工具版本或位置不同，跨系统复制构建可能会很困难。当你的项目使用的语言需要根据它们在哪个平台上构建或编译的不同工具时（例如，Windows与Linux），这个问题就变得更加困难，而每个平台都需要一套稍微不同的工具来完成同样的工作。

Bazel solves the first part of this problem by treating tools as dependencies to each target. Every java_library in the workspace implicitly depends on a Java compiler, which defaults to a well-known compiler but can be configured globally at the workspace level. Whenever Blaze builds a java_library, it checks to make sure that the specified compiler is available at a known location and downloads it if not. Just like any other dependency, if the Java compiler changes, every artifact that was dependent upon it will need to be rebuilt. Every type of target defined in Bazel uses this same strategy of declaring the tools it needs to run, ensuring that Bazel is able to bootstrap them no matter what exists on the system where it runs.

Bazel解决了这个问题的第一部分，把工具当作对每个目标的依赖。工作区中的每一个java_library都隐含地依赖于一个Java编译器，它默认为一个知名的编译器，但可以在工作区层面进行全局配置。每当Blaze构建一个java_library时，它都会检查以确保指定的编译器在已知的位置上是可用的，如果不可用，就下载它。就像其他依赖关系一样，如果Java编译器改变了，每个依赖它的工件都需要重建。在Bazel中定义的每一种类型的目标都使用这种相同的策略来声明它需要运行的工具，确保Bazel能够启动它们，无论它运行的系统上存在什么。

Bazel solves the second part of the problem, platform independence, by using toolchains. Rather than having targets depend directly on their tools, they actually depend on types of toolchains. A toolchain contains a set of tools and other properties defining how a type of target is built on a particular platform. The workspace can define the particular toolchain to use for a toolchain type based on the host and target platform. For more details, see the Bazel manual.

Bazel通过使用工具链解决了问题的第二部分，即平台独立性。与其让目标直接依赖于它们的工具，不如说它们实际上依赖于工具链的类型。工具链包含一组工具和其他属性，定义了如何在特定平台上构建目标类型。工作区可以定义基于主机和目标平台，为工具链类型使用特定的工具链。有关更多详细信息，请参阅Bazel手册。

**Extending the build system**. Bazel comes with targets for several popular programming languages out of the box, but engineers will always want to do more—part of the benefit of task-based systems is their flexibility in supporting any kind of build process, and it would be better not to give that up in an artifact-based build system. Fortunately, Bazel allows its supported target types to be extended by adding custom rules.

**扩展构建系统**。Bazel为几种流行的编程语言提供了开箱即用的能力，但工程师们总是想做得更多--基于任务的系统的部分好处是它们在支持任何类型的构建过程中的灵活性，在基于构件的构建系统中最好也可以支持这一点。幸运的是，Bazel允许其支持通过添加自定义规则扩展的目标类型。

To define a rule in Bazel, the rule author declares the inputs that the rule requires (in the form of attributes passed in the BUILD file) and the fixed set of outputs that the rule produces. The author also defines the actions that will be generated by that rule. Each action declares its inputs and outputs, runs a particular executable or writes a particular string to a file, and can be connected to other actions via its inputs and outputs. This means that actions are the lowest-level composable unit in the build system —an action can do whatever it wants so long as it uses only its declared inputs and outputs, and Bazel will take care of scheduling actions and caching their results as appropriate.

要在Bazel中定义规则，规则作者要声明该规则需要的输入（以BUILD文件中传递的属性形式）和该规则产生的固定输出集。作者还定义了将由该规则生成的操作。每个操作都声明其输入和输出，运行特定的可执行文件或将特定字符串写入文件，并可以通过其输入和输出连接到其他操作。这意味着操作是构建系统中最底层的可组合单元--一个操作可以做任何它想做的事情，只要它只使用它所声明的输入和输出，Bazel将负责调度动作并适当地缓存其结果。

The system isn’t foolproof given that there’s no way to stop an action developer from doing something like introducing a nondeterministic process as part of their action. But this doesn’t happen very often in practice, and pushing the possibilities for abuse all the way down to the action level greatly decreases opportunities for errors. Rules supporting many common languages and tools are widely available online, and most projects will never need to define their own rules. Even for those that do, rule definitions only need to be defined in one central place in the repository, meaning most engineers will be able to use those rules without ever having to worry about their implementation.

这个系统并不是万无一失的，因为没有办法阻止操作开发者做一些事情，比如在他们的操作中引入一个不确定的过程。但这种情况在实践中并不经常发生，而且将滥用的可能性一直推到操作层面，大大减少了错误的机会。支持许多常用语言和工具的规则在网上广泛提供，大多数项目都不需要定义自己的规则。即使是那些需要定义规则的项目，规则定义也只需要在存储库中的一个中心位置定义，这意味着大多数工程师将能够使用这些规则，而不必担心它们的实现。

**Isolating the environment**. Actions sound like they might run into the same problems as tasks in other systems—isn’t it still possible to write actions that both write to the same file and end up conflicting with one another? Actually, Bazel makes these conflicts impossible by using sandboxing. On supported systems, every action is isolated from every other action via a filesystem sandbox. Effectively, each action can see only a restricted view of the filesystem that includes the inputs it has declared and any outputs it has produced. This is enforced by systems such as LXC on Linux, the same technology behind Docker. This means that it’s impossible for actions to conflict with one another because they are unable to read any files they don’t declare, and any files that they write but don’t declare will be thrown away when the action finishes. Bazel also uses sandboxes to restrict actions from communicating via the network.

**隔离环境**。行动听起来可能会遇到与其他系统中的任务相同的问题--难道没有可能写入同时写入同一文件并最终相互冲突的操作吗？实际上，Bazel通过使用沙箱使这些冲突变得不可能。在支持的系统上，每个操作都通过文件系统沙盒与其他动作隔离开来。实际上，每个操作只能看到文件系统的一个有限视图，包括它所声明的输入和它生成的任何输出。这是由Linux上的LXC等系统强制执行的，Docker背后的技术也是如此。这意味着操作之间不可能发生冲突，因为它们无法读取它们没有声明的任何文件，并且他们编写但未声明的文件将在操作完成时被丢弃。Bazel还使用沙盒来限制行动通过网络进行通信。

**Making external dependencies deterministic**. There’s still one problem remaining: build systems often need to download dependencies (whether tools or libraries) from external sources rather than directly building them. This can be seen in the example via the @com_google_common_guava_guava//jar dependency, which downloads a JAR file from Maven.

**使外部依赖性具有确定性**。还有一个问题：构建系统经常需要从外部下载依赖项（无论是工具还是库），而不是直接构建它们。这可以通过@com_google_common_guava_guava//jar依赖项在示例中看到，该依赖项从Maven下载jar文件。

Depending on files outside of the current workspace is risky. Those files could change at any time, potentially requiring the build system to constantly check whether they’re fresh. If a remote file changes without a corresponding change in the workspace source code, it can also lead to unreproducible builds—a build might work one day and fail the next for no obvious reason due to an unnoticed dependency change. Finally, an external dependency can introduce a huge security risk when it is owned by a third party:[^4]  if an attacker is able to infiltrate that third-party server, they can replace the dependency file with something of their own design, potentially giving them full control over your build environment and its output.

依靠当前工作区以外的文件是有风险的。这些文件可能随时更改，这可能需要生成系统不断检查它们是否是最新的。如果一个远程文件发生了变化，而工作区的源代码却没有相应的变化，这也会导致构建的不可重复性--由于一个未被注意到的依赖性变化，构建可能在某一天成功，而在第二天却没有明显的原因而失败。最后，当外部依赖项属于第三方时，可能会带来巨大的安全风险：如果攻击者能够渗透到第三方服务器，他们可以用自己设计的内容替换依赖项文件，从而有可能让他们完全控制服务器构建环境及其输出。

The fundamental problem is that we want the build system to be aware of these files without having to check them into source control. Updating a dependency should be a conscious choice, but that choice should be made once in a central place rather than managed by individual engineers or automatically by the system. This is because even with a “Live at Head” model, we still want builds to be deterministic, which implies that if you check out a commit from last week, you should see your dependencies as they were then rather than as they are now.

根本的问题是，我们希望构建系统知道这些文件，而不必将它们放入源代码管理。更新一个依赖关系应该是一个有意识的选择，但这个选择应该在一个中心位置做出，而不是由个别工程师管理或由系统自动管理。这是因为即使是 "Live at Head "模式，我们仍然希望构建是确定性的，这意味着如果你检查出上周的提交，你应该看到你的依赖关系是当时的，而不是现在的。

Bazel and some other build systems address this problem by requiring a workspace- wide manifest file that lists a cryptographic hash for every external dependency in the workspace.[^5]  The hash is a concise way to uniquely represent the file without checking the entire file into source control. Whenever a new external dependency is referenced from a workspace, that dependency’s hash is added to the manifest, either manually or automatically. When Bazel runs a build, it checks the actual hash of its cached dependency against the expected hash defined in the manifest and redownloads the file only if the hash differs.

Bazel和其他一些构建系统通过要求一个工作区范围的清单文件来解决这个问题，该文件列出了工作区中每个外部依赖项的加密哈希。每当从工作区引用一个新的外部依赖关系时，该依赖关系的哈希值就会被手动或自动添加到清单中。Bazel 运行构建时，会将其缓存的依赖关系的实际哈希值与清单中定义的预期哈希值进行对比，只有在哈希值不同时才会重新下载文件。


> [^4]:	Such "software supply chain" attacks are becoming more common./
> 4   这种“软件供应链”攻击越来越普遍。
> 
> [^5]:	Go recently added preliminary support for modules using the exact same system.
> 5   Go最近增加了对使用完全相同系统的模块的初步支持。

If the artifact we download has a different hash than the one declared in the manifest, the build will fail unless the hash in the manifest is updated. This can be done automatically, but that change must be approved and checked into source control before the build will accept the new dependency. This means that there’s always a record of when a dependency was updated, and an external dependency can’t change without a corresponding change in the workspace source. It also means that, when checking out an older version of the source code, the build is guaranteed to use the same dependencies that it was using at the point when that version was checked in (or else it will fail if those dependencies are no longer available).

如果我们下载的构件与清单中声明的哈希值不同，除非更新清单中的哈希值，否则构建将失败。这可以自动完成，但在构建接受新的依赖关系之前，这一变化必须得到批准并检查到源代码控制中。这意味着总是有依赖关系更新的记录，如果工作区源代码没有相应的变化，外部依赖关系就不会改变。这也意味着，当签出一个旧版本的源代码时，构建保证使用与签入该版本时相同的依赖关系（否则，如果这些依赖关系不再可用，它将失败）。

Of course, it can still be a problem if a remote server becomes unavailable or starts serving corrupt data—this can cause all of your builds to begin failing if you don’t have another copy of that dependency available. To avoid this problem, we recommend that, for any nontrivial project, you mirror all of its dependencies onto servers or services that you trust and control. Otherwise you will always be at the mercy of a third party for your build system’s availability, even if the checked-in hashes guarantee its security.

当然，如果一个远程服务器变得不可用或开始提供损坏的数据，这仍然是一个问题--如果没有该依赖项的另一个副本可用，这可能会导致所有构建开始失败。为了避免这个问题，我们建议，对于任何不重要的项目，你应该把所有的依赖关系镜像到你信任和控制的服务器或服务上。否否则，构建系统的可用性将始终取决于第三方，即使签入哈希保证了其安全性。

## Distributed Builds 分布式构建
Google’s codebase is enormous—with more than two billion lines of code, chains of dependencies can become very deep. Even simple binaries at Google often depend on tens of thousands of build targets. At this scale, it’s simply impossible to complete a build in a reasonable amount of time on a single machine: no build system can get around the fundamental laws of physics imposed on a machine’s hardware. The only way to make this work is with a build system that supports distributed builds wherein the units of work being done by the system are spread across an arbitrary and scalable number of machines. Assuming we’ve broken the system’s work into small enough units (more on this later), this would allow us to complete any build of any size as quickly as we’re willing to pay for. 

谷歌的代码库非常庞大--有超过20亿行的代码，依赖关系链可以变得非常深。在谷歌，即使是简单的二进制文件也常常依赖于成千上万个构建目标。在这种规模下，要在一台机器上以合理的时间完成构建是根本不可能的：任何构建系统都无法绕过强加给机器硬件的基本物理定律。唯一的办法是使用支持分布式构建的构建系统，其中系统所完成的工作单元分布在任意数量且可扩展的机器上。假设我们把系统的工作分解成足够小的单位（后面会有更多介绍），这将使我们能够以我们可以根据支付的费用来获得想要的速度完成任何规模的构建。

This scalability is the holy grail we’ve been working toward by defining an artifact-based build system.

通过定义基于构件的构建系统，这种可伸缩性是我们一直致力于实现的法宝。

## Remote caching
The simplest type of distributed build is one that only leverages remote caching, which is shown in Figure 18-2.

最简单的分布式构建类型是只利用远程缓存的构建，如图18-2所示。

![Figure 18-2](./images/Figure%2018-2.jpg)

Figure 18-2. A distributed build showing remote caching

Every system that performs builds, including both developer workstations and continuous integration systems, shares a reference to a common remote cache service. This service might be a fast and local short-term storage system like Redis or a cloud service like Google Cloud Storage. Whenever a user needs to build an artifact, whether directly or as a dependency, the system first checks with the remote cache to see if that artifact already exists there. If so, it can download the artifact instead of building it. If not, the system builds the artifact itself and uploads the result back to the cache. This means that low-level dependencies that don’t change very often can be built once and shared across users rather than having to be rebuilt by each user. At Google, many artifacts are served from a cache rather than built from scratch, vastly reducing the cost of running our build system.

每个执行构建的系统，包括开发人员工作站和连续集成系统，都共享对公共远程缓存服务的引用。这个服务可能是一个高速的本地短期存储系统，如Redis，或一个云服务，如谷歌云存储。每当用户需要构建一个构件时，无论是直接构建还是作为一个依赖，系统首先检查远程缓存，看该构件是否已经存在。如果存在，它可以下载该构件而不是构建它。如果没有，系统会自己构建构件，并将结果上传到缓存中。这意味着不经常更改的低级依赖项可以构建一次并在用户之间共享，而不必由每个用户重新构建。在谷歌，许多构件是从缓存中提供的，而不是从头开始构建的，这大大降低了我们运行构建系统的成本。

For a remote caching system to work, the build system must guarantee that builds are completely reproducible. That is, for any build target, it must be possible to determine the set of inputs to that target such that the same set of inputs will produce exactly the same output on any machine. This is the only way to ensure that the results of downloading an artifact are the same as the results of building it oneself. Fortunately, Bazel provides this guarantee and so supports [remote caching](https://oreil.ly/D9doX). Note that this requires that each artifact in the cache be keyed on both its target and a hash of its inputs—that way, different engineers could make different modifications to the same target at the same time, and the remote cache would store all of the resulting artifacts and serve them appropriately without conflict.

为了使远程缓存系统发挥作用，构建系统必须保证构建是完全可重复的。也就是说，对于任何构建目标，必须能够确定该目标的输入集，以便相同的输入集在任何机器上产生完全相同的输出。这是确保下载工件的结果与自己构建工件的结果相同的唯一方法。幸运的是，Bazel提供了这种保证，因此支持[远程缓存]（https://oreil.ly/D9doX）。请注意，这要求缓存中的每个构件都以其目标和输入的哈希值为关键--这样，不同的工程师可以在同一时间对同一目标进行不同的修改，而远程缓存将存储所有结果的构件，并适当地为它们提供服务，而不会产生冲突。

Of course, for there to be any benefit from a remote cache, downloading an artifact needs to be faster than building it. This is not always the case, especially if the cache server is far from the machine doing the build. Google’s network and build system is carefully tuned to be able to quickly share build results. When configuring remote caching in your organization, take care to consider network latencies and perform experiments to ensure that the cache is actually improving performance.

当然，要想从远程缓存中获得任何好处，下载构件的速度必须比构建它的速度快。但情况并非总是如此，尤其是当缓存服务器远离进行构建的机器时。谷歌的网络和构建系统是经过精心调整的，能够快速分享构建结果。在组织中配置远程缓存时，请注意考虑网络延迟，并进行实验以确保缓存实际上正在提高性能

## Remote execution 远程构建

Remote caching isn’t a true distributed build. If the cache is lost or if you make a low- level change that requires everything to be rebuilt, you still need to perform the entire build locally on your machine. The true goal is to support *remote execution*, in which the actual work of doing the build can be spread across any number of workers. [Figure 18-3 ](#_bookmark1676)depicts a remote execution system.

远程缓存不是真正的分布式构建。如果缓存丢失或者进行了需要重建所有内容的低级更改，那么仍然需要在计算机上本地执行整个构建。远程缓存并不是一个真正的分布式构建。如果缓存丢失了，或者如果你做了一个低级别的改变，需要重建所有的东西，你仍然需要在你的机器上执行整个构建。真正的目标是支持*远程执行*，在这种情况下，进行构建的实际工作可以分散到任何数量的机器上。[图18-3]（#_bookmark1676）描述了一个远程执行系统。

![Figure 18-3](./images/Figure%2018-3.png)

Figure 18-3. A remote execution system

The build tool running on each user’s machine (where users are either human engineers or automated build systems) sends requests to a central build master. The build master breaks the requests into their component actions and schedules the execution of those actions over a scalable pool of workers. Each worker performs the actions asked of it with the inputs specified by the user and writes out the resulting artifacts. These artifacts are shared across the other machines executing actions that require them until the final output can be produced and sent to the user.

在每个用户的机器上运行的构建工具（用户可以是工程师，也可以是自动构建系统）向中央构建主控器发送请求。构建主机将请求分解为组件操作，并在可扩展的机器资源池上安排这些操作的执行。每个机器根据用户指定的输入执行所要求的操作，并写出结果的构件。这些构件在执行需要它们的操作的其他机器之间共享，直到可以生成最终输出并发送给用户。

The trickiest part of implementing such a system is managing the communication between the workers, the master, and the user’s local machine. Workers might depend on intermediate artifacts produced by other workers, and the final output needs to be sent back to the user’s local machine. To do this, we can build on top of the distributed cache described previously by having each worker write its results to and read its dependencies from the cache. The master blocks workers from proceeding until everything they depend on has finished, in which case they’ll be able to read their inputs from the cache. The final product is also cached, allowing the local machine to download it. Note that we also need a separate means of exporting the local changes in the user’s source tree so that workers can apply those changes before building.

实现这样一个系统最棘手的部分是管理员、主站和用户的本地机器之间的通信。某台构建机器可能依赖于其他机器产生的中间构件，而最终输出需要发送回用户的本地机器。要做到这一点，我们可以建立在前面描述的分布式缓存之上，让每个构建机器将其结果写入缓存并从缓存中读取其依赖项。主模块阻止构建程序继续工作，直到它所依赖的一切完成，在这种情况下，它将能够从缓存中读取它的输入。最终的产品也被缓存起来，允许本地机器下载它。请注意，我们还需要一种单独的方法来导出用户源树中的本地更改，以便构建机器可以在构建之前应用这些更改。

For this to work, all of the parts of the artifact-based build systems described earlier need to come together. Build environments must be completely self-describing so that we can spin up workers without human intervention. Build processes themselves must be completely self-contained because each step might be executed on a different machine. Outputs must be completely deterministic so that each worker can trust the results it receives from other workers. Such guarantees are extremely difficult for a task-based system to provide, which makes it nigh-impossible to build a reliable remote execution system on top of one.

要做到这一点，前面描述的基于构件的构建系统的所有部分都需要结合起来。构建环境必须是完全自描述的，这样我们就可以在没有人为干预的情况下提高构建的速度。构建过程本身必须是完全自包含的，因为每个步骤可能在不同的机器上执行。输出必须是完全确定的，这样每个构建机器就可以相信它从其他构建机器那里得到的结果。样的保证对于基于任务的系统来说是非常困难的，这使得在一个系统之上构建一个可靠的远程执行系统几乎是不可能的。

**Distributed builds at Google.** Since 2008, Google has been using a distributed build system that employs both remote caching and remote execution, which is illustrated in [Figure 18-4](#_bookmark1678).

**谷歌的分布式构建。**自2008年以来，谷歌一直在使用分布式构建系统，该系统同时采用了远程缓存和远程执行，如[图18-4]（#_bookmark1678）所示。

![Figure 18-4](./images/Figure%2018-4.png)

*Figure* *18-4. Google’s distributed build system*

Google’s remote cache is called ObjFS. It consists of a backend that stores build outputs in [Bigtables](https://oreil.ly/S_N-D) distributed throughout our fleet of production machines and a frontend FUSE daemon named objfsd that runs on each developer’s machine. The FUSE daemon allows engineers to browse build outputs as if they were normal files stored on the workstation, but with the file content downloaded on-demand only for the few files that are directly requested by the user. Serving file contents on-demand greatly reduces both network and disk usage, and the system is able to [build twice as](https://oreil.ly/NZxSp) [fast ](https://oreil.ly/NZxSp)compared to when we stored all build output on the developer’s local disk.

谷歌的远程缓存被称为ObjFS。它包括一个将构建输出存储在[Bigtables](https://oreil.ly/S_N-D)的后端，分布在我们的生产机群中，以及一个运行在每个开发人员机器上的名为objfsd的前端FUSE守护程序。FUSE守护进程允许工程师浏览构建输出，就像它们是存储在工作站上的普通文件一样，但文件内容仅针对用户直接请求的少数文件按需下载。按需提供文件内容大大减少了网络和磁盘的使用，系统的构建速度是将所有构建输出存储在开发人员的本地磁盘上时的两倍。

Google’s remote execution system is called Forge. A Forge client in Blaze called the Distributor sends requests for each action to a job running in our datacenters called the Scheduler. The Scheduler maintains a cache of action results, allowing it to return a response immediately if the action has already been created by any other user of the system. If not, it places the action into a queue. A large pool of Executor jobs continually read actions from this queue, execute them, and store the results directly in the ObjFS Bigtables. These results are available to the executors for future actions, or to be downloaded by the end user via objfsd.

谷歌的远程执行系统被称为Forge。在Blaze中，一个名为 "Distributor "的Forge客户端将每个操作的请求发送到数据中心中名为Scheduler调度器。调度器维护操作结果的缓存，允许它在操作已经由系统的任何其他用户创建时立即返回响应。如果没有，它就把操作放到一个队列中。大量执行器作业从该队列中连续读取操作，执行它们，并将结果直接存储在ObjFS Bigtables中。这些结果可供执行者用于将来的操作，或由最终用户通过objfsd下载。

The end result is a system that scales to efficiently support all builds performed at Google. And the scale of Google’s builds is truly massive: Google runs millions of builds executing millions of test cases and producing petabytes of build outputs from billions of lines of source code every *day*. Not only does such a system let our engineers build complex codebases quickly, it also allows us to implement a huge number of automated tools and systems that rely on our build. We put many years of effort into developing this system, but nowadays open source tools are readily available such that any organization can implement a similar system. Though it can take time and energy to deploy such a build system, the end result can be truly magical for engineers and is often well worth the effort.

最终的结果是一个可扩展的系统，能够有效地支持在谷歌执行的所有构建。谷歌构建的规模确实是巨大的：谷歌每天运行数以百万计的构建，执行数以百万计的测试用例，并从数十亿行源代码中产生数PB的构建输出。这样一个系统不仅让我们的工程师快速构建复杂的代码库，还让我们能够实现大量依赖我们构建的自动化工具和系统。我们为开发这个系统付出了多年的努力，但现在开源工具已经很容易获得，这样任何组织都可以实现类似的系统。虽然部署这样一个构建系统可能需要时间和精力，但最终的结果对工程师来说确实是神奇的，而且通常是值得付出努力的。

## Time, Scale, Trade-Offs 时间、规模、权衡

Build systems are all about making code easier to work with at scale and over time. And like everything in software engineering, there are trade-offs in choosing which sort of build system to use. The DIY approach using shell scripts or direct invocations of tools works only for the smallest projects that don’t need to deal with code changing over a long period of time, or for languages like Go that have a built-in build system.

构建系统都是为了使代码更易于大规模和长期使用。就像软件工程一样，在选择使用哪种构建系统时也存在权衡。使用shell脚本或直接调用工具的DIY方法只适用于不需要长时间处理代码更改的最小项目，或者适用于具有内置构建系统的Go等语言。

Choosing a task-based build system instead of relying on DIY scripts greatly improves your project’s ability to scale, allowing you to automate complex builds and more easily reproduce those builds across machines. The trade-off is that you need to actually start putting some thought into how your build is structured and deal with the overhead of writing build files (though automated tools can often help with this). This trade-off tends to be worth it for most projects, but for particularly trivial projects (e.g., those contained in a single source file), the overhead might not buy you much.

选择基于任务的构建系统而不是依赖DIY脚本可以极大地提高项目的可扩展性，允许你自动完成复杂的构建，并更容易在不同的机器上复制这些构建。权衡之下，你需要真正开始考虑构建是如何构造的，并处理编写构建文件的开销（尽管自动化工具通常可以帮助解决这个问题）。对于大多数项目来说，这种权衡是值得的，但对于特别琐碎的项目（例如，那些包含在单一源文件中的项目），开销可能不会给你带来太多好处。

Task-based build systems begin to run into some fundamental problems as the project scales further, and these issues can be remedied by using an artifact-based build system instead. Such build systems unlock a whole new level of scale because huge builds can now be distributed across many machines, and thousands of engineers can be more certain that their builds are consistent and reproducible. As with so many other topics in this book, the trade-off here is a lack of flexibility: artifact- based systems don’t let you write generic tasks in a real programming language, but require you to work within the constraints of the system. This is usually not a problem for projects that are designed to work with artifact-based systems from the start, but migration from an existing task-based system can be difficult and is not always worth it if the build isn’t already showing problems in terms of speed or correctness.

随着项目规模的进一步扩大，基于任务的构建系统开始遇到一些基本问题，而这些问题可以通过使用基于构件的构建系统来弥补。这样的构建系统开启了一个全新的规模，因为巨大的构建现在可以分布在许多机器上，成千上万的工程师可以更确定他们的构建是一致的和可重复的。就像本书中的许多其他主题一样，这里的权衡是缺乏灵活性：基于构件的系统不允许你用真正的编程语言编写通用任务，而要求你在系统的约束范围内工作。对于那些从一开始就被设计为与基于工件的系统一起工作的项目来说，这通常不是一个问题，但是从现有的基于任务的系统迁移可能是困难的，而且如果构建在速度或正确性方面还没有出现问题的话，这并不总是值得的。

Changes to a project’s build system can be expensive, and that cost increases as the project becomes larger. This is why Google believes that almost every new project benefits from incorporating an artifact-based build system like Bazel right from the start. Within Google, essentially all code from tiny experimental projects up to Google Search is built using Blaze.

对一个项目的构建系统进行修改代价耿是昂贵的，而且随着项目的扩大，成本也会增加。这就是为什么谷歌认为，几乎每一个新项目从一开始就可以从Bazel这样的基于工件的构建系统中获益。在谷歌内部，从微小的实验性项目到谷歌搜索，基本上所有的代码都是用Blaze构建的。

# Dealing with Modules and Dependencies 处理模块和依赖关系
Projects that use artifact-based build systems like Bazel are broken into a set of modules, with modules expressing dependencies on one another via BUILD files. Proper organization of these modules and dependencies can have a huge effect on both the performance of the build system and how much work it takes to maintain.

像Bazel这样使用基于构件的构建系统的项目被分解成一系列模块，模块之间通过BUILD文件表达彼此的依赖关系。适当地组织这些模块和依赖关系，对构建系统的性能和维护的工作量都有很大的影响。

## Using Fine-Grained Modules and the 1:1:1 Rule 使用细粒度模块和1:1:1规则
The first question that comes up when structuring an artifact-based build is deciding how much functionality an individual module should encompass. In Bazel, a “module” is represented by a target specifying a buildable unit like a java_library or a go_binary. At one extreme, the entire project could be contained in a single module by putting one BUILD file at the root and recursively globbing together all of that project’s source files. At the other extreme, nearly every source file could be made into its own module, effectively requiring each file to list in a BUILD file every other file it depends on.

构建基于工件的构建时出现的第一个问题是决定单个模块应该包含多少功能。在Bazel中，一个 "module"是由一个指定可构建单元的目标表示的，如java_library或go_binary。在一个极端，整个项目可以包含在一个单一的module中，方法是把一个BUILD文件放在根部，然后递归地把该项目所有的源文件放在一起。在另一个极端，几乎每一个源文件都可以成为自己的模块，有效地要求每个文件在BUILD文件中列出它所依赖的每个其他文件。

Most projects fall somewhere between these extremes, and the choice involves a trade-off between performance and maintainability. Using a single module for the entire project might mean that you never need to touch the BUILD file except when adding an external dependency, but it means that the build system will always need to build the entire project all at once. This means that it won’t be able to parallelize or distribute parts of the build, nor will it be able to cache parts that it’s already built. One-module-per-file is the opposite: the build system has the maximum flexibility in caching and scheduling steps of the build, but engineers need to expend more effort maintaining lists of dependencies whenever they change which files reference which.

大多数项目都介于这两个极端之间，这种选择涉及到性能和可维护性之间的权衡。在整个项目使用一个模块可能意味着除了添加外部依赖项时，你永远不需要更改构建文件，但这意味着构建系统将始终需要一次构建整个项目。这意味着它将无法并行化或分发构建的一部分，也无法缓存已经构建的部分。每个文件一个模块的情况正好相反：构建系统在缓存和安排构建步骤方面有最大的灵活性，但工程师需要花费更多的精力来维护依赖关系的列表，无论何时他们改变哪个文件引用哪个文件。

Though the exact granularity varies by language (and often even within language), Google tends to favor significantly smaller modules than one might typically write in a task-based build system. A typical production binary at Google will likely depend on tens of thousands of targets, and even a moderate-sized team can own several hundred targets within its codebase. For languages like Java that have a strong built- in notion of packaging, each directory usually contains a single package, target, and BUILD file (Pants, another build system based on Blaze, calls this the 1:1:1 rule). Languages with weaker packaging conventions will frequently define multiple targets per BUILD file.

虽然精确的颗粒度因语言而异（甚至在语言内部也是如此），但谷歌倾向于使用比通常在基于任务的构建系统中编写的模块小得多的模块。在谷歌，一个典型的生产二进制文件可能会依赖于数以万计的目标构件，甚至一个中等规模的团队也可能在其代码库中拥有数百个目标。对于像Java这样有强大的内置打包概念的语言，每个目录通常包含一个单独的包、目标和BUILD文件（另一个基于Blaze的构建系统Pants称之为1:1:1规则）。封装约定较弱的语言通常会为每个构建文件定义多个目标。

The benefits of smaller build targets really begin to show at scale because they lead to faster distributed builds and a less frequent need to rebuild targets. The advantages become even more compelling after testing enters the picture, as finer-grained targets mean that the build system can be much smarter about running only a limited subset of tests that could be affected by any given change. Because Google believes in the systemic benefits of using smaller targets, we’ve made some strides in mitigating the downside by investing in tooling to automatically manage BUILD files to avoid burdening developers. Many of these tools are now open source.

较小的构建目标的好处真正开始在规模上表现出来，因为它们可以支持更快的分布式构建和更少的重建目标的需要。当测试进入画面后，这些优势变得更加引人注目，因为更细粒度的目标意味着构建系统可以更智能地只运行可能受任何给定更改影响的有限测试子集。由于谷歌相信使用较小目标的系统性好处，我们通过开发自动管理构建文件的工具，在减轻不利影响方面取得了一些进展，以避免打扰开发人员。其中许多工具现在都是开源的。

## Minimizing Module Visibility 最小化模块可见性
Bazel and other build systems allow each target to specify a visibility: a property that specifies which other targets may depend on it. Targets can be public, in which case they can be referenced by any other target in the workspace; private, in which case they can be referenced only from within the same BUILD file; or visible to only an explicitly defined list of other targets. A visibility is essentially the opposite of a dependency: if target A wants to depend on target B, target B must make itself visible to target A.

Bazel和其他构建系统允许每个目标指定可见性：一个属性，指定哪些其他目标可能依赖它。目标可以是公共的，在这种情况下，它们可以被工作区中的任何其他目标引用；private，在这种情况下，它们只能从同一构建文件中引用；或仅对明确定义的其他目标列表可见。可见性本质上与依赖性相反：如果目标A想要依赖于目标B，目标B必须使自己对目标A可见。

Just like in most programming languages, it is usually best to minimize visibility as much as possible. Generally, teams at Google will make targets public only if those targets represent widely used libraries available to any team at Google. Teams that require others to coordinate with them before using their code will maintain a whitelist of customer targets as their target’s visibility. Each team’s internal implementation targets will be restricted to only directories owned by the team, and most BUILD files will have only one target that isn’t private.

就像在大多数编程语言中，通常最好方法是尽可能地减少可见性。一般来说，谷歌的团队只有在这些目标代表了谷歌任何团队都可以使用的广泛使用的库时，才会将目标公开。要求其他人在使用代码之前与他们协调的团队将保留一份客户目标白名单，作为其目标的可见性。每个团队的内部实施目标将被限制在该团队所拥有的目录中，而且大多数BUILD文件将只有一个非私有的目标。

## Managing Dependencies 管理依赖关系
Modules need to be able to refer to one another. The downside of breaking a codebase into fine-grained modules is that you need to manage the dependencies among those modules (though tools can help automate this). Expressing these dependencies usually ends up being the bulk of the content in a BUILD file.

模块需要能够相互引用。将代码库分解为细粒度模块的缺点是需要管理这些模块之间的依赖关系（尽管工具可以帮助实现自动化）。表达这些依赖关系通常会成为BUILD文件中的大部分内容。

### Internal dependencies 内部依赖关系
In a large project broken into fine-grained modules, most dependencies are likely to be internal; that is, on another target defined and built in the same source repository. Internal dependencies differ from external dependencies in that they are built from source rather than downloaded as a prebuilt artifact while running the build. This also means that there’s no notion of “version” for internal dependencies—a target and all of its internal dependencies are always built at the same commit/revision in the repository.

在细分为细粒度模块的大型项目中，大多数依赖关系可能是内部的；也就是说，在同一源存储库中定义和构建的另一个目标上。内部依赖项与外部依赖项的不同之处在于，它们是从源代码构建的，而不是在运行构建时作为预构建工件下载的。这也意味着内部依赖项没有“版本”的概念——目标及其所有内部依赖项始终在存储库中的同一提交/修订中构建。

One issue that should be handled carefully with regard to internal dependencies is how to treat transitive dependencies (Figure 18-5). Suppose target A depends on target B, which depends on a common library target C. Should target A be able to use classes defined in target C?

关于内部依赖关系，应该小心处理的一个问题是如何处理可传递依赖关系（图 18-5）。假设目标A依赖于目标B，而目标B依赖于一个共同的库目标C，那么目标A是否应该使用目标C中定义的类？

![Figure 18-5](./images/Figure%2018-5.png)

*Figure* *18-5.* *Transitive* *dependencies*

As far as the underlying tools are concerned, there’s no problem with this; both B and C will be linked into target A when it is built, so any symbols defined in C are known to A. Blaze allowed this for many years, but as Google grew, we began to see problems. Suppose that B was refactored such that it no longer needed to depend on C. If B’s dependency on C was then removed, A and any other target that used C via a dependency on B would break. Effectively, a target’s dependencies became part of its public contract and could never be safely changed. This meant that dependencies accumulated over time and builds at Google started to slow down.

就底层工具而言，这没有问题；B和C在构建目标A时都会链接到目标A中，因此C中定义的任何符号都会被A知道。Blaze允许这一点很多年了，但随着谷歌的发展，我们开始发现问题。假设B被重构，不再需要依赖C。如果B对C的依赖关系被删除，A和通过对B的依赖关系使用C的任何其他目标都将中断。实际上，一个目标的依赖关系成为其公共契约的一部分，永远无法安全地更改。这意味着依赖性会随着时间的推移而积累，谷歌的构建速度开始变慢。

Google eventually solved this issue by introducing a “strict transitive dependency mode” in Blaze. In this mode, Blaze detects whether a target tries to reference a symbol without depending on it directly and, if so, fails with an error and a shell command that can be used to automatically insert the dependency. Rolling this change out across Google’s entire codebase and refactoring every one of our millions of build targets to explicitly list their dependencies was a multiyear effort, but it was well worth it. Our builds are now much faster given that targets have fewer unnecessary dependencies,[^6] and engineers are empowered to remove dependencies they don’t need without worrying about breaking targets that depend on them.

谷歌最终解决了这个问题，在Blaze中引入了一个 "严格传递依赖模式"。在这种模式下，Blaze检测目标是否尝试引用符号而不直接依赖它，如果是，则失败，并显示错误和可用于自动插入依赖项的shell命令。在谷歌的整个代码库中推广这一变化，并重构我们数百万个构建目标中的每一个，以以明确列出它们的依赖关系，这是一项多年的努力，但这是非常值得的。现在我们的构建速度快多了，因为目标的不必要的依赖性减少了，工程师有权删除他们不需要的依赖关系，而不用担心破坏依赖它们的目标。

As usual, enforcing strict transitive dependencies involved a trade-off. It made build files more verbose, as frequently used libraries now need to be listed explicitly in many places rather than pulled in incidentally, and engineers needed to spend more effort adding dependencies to *BUILD* files. We’ve since developed tools that reduce this toil by automatically detecting many missing dependencies and adding them to a *BUILD* files without any developer intervention. But even without such tools, we’ve found the trade-off to be well worth it as the codebase scales: explicitly adding a dependency to *BUILD* file is a one-time cost, but dealing with implicit transitive dependencies can cause ongoing problems as long as the build target exists. [Bazel](https://oreil.ly/Z-CqD) [enforces strict transitive dependencies ](https://oreil.ly/Z-CqD)on Java code by default.

像往常一样，强制执行严格的可传递依赖关系需要权衡。它使构建文件更加冗长，因为现在需要在许多地方明确列出常用的库，而不是附带地将其拉入，而且工程师需要花更多的精力将依赖关系添加到*BUILD*文件中。我们后来开发了一些工具，通过自动检测许多缺失的依赖关系并将其添加到*BUILD*文件中，而不需要任何开发人员的干预，从而减少了这项工作。但即使没有这样的工具，我们也发现，随着代码库的扩展，这样的权衡是非常值得的：明确地在*BUILD*文件中添加一个依赖关系是一次性的成本，但是只要构建目标存在，处理隐式传递依赖项就可能导致持续的问题。Bazel对Java代码强制执行严格的可传递依赖项。

> [^6]:	Of course, actually removing these dependencies was a whole separate process. But requiring each target to explicitly declare what it used was a critical first step. See Chapter 22 for more information about how Google makes large-scale changes like this./
> 6   当然，实际上删除这些依赖项是一个完全独立的过程。但要求每个目标明确声明它使用了什么是关键的第一步。请参阅第22章，了解更多关于谷歌如何做出如此大规模改变的信息。

### External dependencies 外部依赖

If a dependency isn’t internal, it must be external. External dependencies are those on artifacts that are built and stored outside of the build system. The dependency is imported directly from an *artifact repository* (typically accessed over the internet) and used as-is rather than being built from source. One of the biggest differences between external and internal dependencies is that external dependencies have *versions*, and those versions exist independently of the project’s source code.

如果一个依赖性不是内部的，它一定是外部的。外部依赖关系是指在构建系统之外构建和存储的构件上的依赖关系。依赖关系直接从*构件库*（通常通过互联网访问）导入，并按原样使用，而不是从源代码构建。外部依赖和内部依赖的最大区别之一是，外部依赖有版本，这些版本独立于项目的源代码而存在。

 **Automatic versus manual dependency management.** Build systems can allow the versions of external dependencies to be managed either manually or automatically. When managed manually, the buildfile explicitly lists the version it wants to download from the artifact repository, often using [a semantic version string ](https://semver.org/)such as “1.1.4”. When managed automatically, the source file specifies a range of acceptable versions, and the build system always downloads the latest one. For example, Gradle allows a dependency version to be declared as “1.+” to specify that any minor or patch version of a dependency is acceptable so long as the major version is 1.

 **自动与手动依赖管理。**构建系统可以允许手动或自动管理外部依赖的版本。当手动管理时，构建文件明确列出它要从工件库中下载的版本，通常使用[语义版本字符串](https://semver.org/)，如 "1.1.4"。当自动管理时，源文件指定了一个可接受的版本范围，并且构建系统总是下载最新的版本。例如，Gradle允许将依赖版本声明为 "1.+"，以指定只要主要版本是1，那么依赖的任何次要或补丁版本都是可以接受的。

Automatically managed dependencies can be convenient for small projects, but they’re usually a recipe for disaster on projects of nontrivial size or that are being worked on by more than one engineer. The problem with automatically managed dependencies is that you have no control over when the version is updated. There’s no way to guarantee that external parties won’t make breaking updates (even when they claim to use semantic versioning), so a build that worked one day might be broken the next with no easy way to detect what changed or to roll it back to a working state. Even if the build doesn’t break, there can be subtle behavior or performance changes that are impossible to track down.

自动管理的依赖关系对于小项目来说是很方便的，但对于规模不小的项目或由多名工程师负责的项目来说，它们通常是带来灾难。自动管理的依赖关系的问题是，你无法控制版本的更新时间。没有办法保证外部各方不会进行破坏性的更新（即使他们声称使用了语义版本管理），所以前一天还能正常工作的构建，第二天就可能被破坏，而且没有便捷的方法来检测什么变化或将其恢复到工作状态。即使构建没有被破坏，也可能有一些细微的行为或性能变化，而这些变化是无法追踪的。

In contrast, because manually managed dependencies require a change in source control, they can be easily discovered and rolled back, and it’s possible to check out an older version of the repository to build with older dependencies. Bazel requires that versions of all dependencies be specified manually. At even moderate scales, the overhead of manual version management is well worth it for the stability it provides.

相比之下，由于手动管理的依赖关系需要改变源码控制，它们可以很容易地被发现和回滚，而且有可能检查出较早版本的存储库，用较早的依赖关系进行构建。Bazel要求手动指定所有依赖关系的版本。即使是中等规模，手动版本管理的开销对于它提供的稳定性来说也是非常值得的。

**The One-Version Rule.** Different versions of a library are usually represented by different artifacts, so in theory there’s no reason that different versions of the same external dependency couldn’t both be declared in the build system under different names. That way, each target could choose which version of the dependency it wanted to use. Google has found this to cause a lot of problems in practice, so we enforce a strict [*One-Version Rule* ](https://oreil.ly/OFa9V)for all third-party dependencies in our internal codebase.

**一个版本的规则。**一个库的不同版本通常由不同的构件来代表，所以在理论上，没有理由不能在构建系统中以不同的名称声明相同外部依赖的不同版本。这样，每个目标都可以选择要使用哪个版本的依赖项。谷歌发现这在实践中会造成很多问题，因此我们在内部代码库中对所有第三方依赖项实施严格的一个版本规则。

The biggest problem with allowing multiple versions is the *diamond dependency* issue. Suppose that target A depends on target B and on v1 of an external library. If target B is later refactored to add a dependency on v2 of the same external library, target A will break because it now depends implicitly on two different versions of the same library. Effectively, it’s never safe to add a new dependency from a target to any third-party library with multiple versions, because any of that target’s users could already be depending on a different version. Following the One-Version Rule makes this conflict impossible—if a target adds a dependency on a third-party library, any existing dependencies will already be on that same version, so they can happily coexist.

允许多版本的最大问题是*钻石依赖性*问题。假设目标A依赖于目标B和外部库的v1。如果以后对目标B进行重构以添加对同一外部库的v2的依赖，则目标a将中断，因为它现在隐式地依赖于同一库的两个不同版本。实际上，将新的依赖项从目标添加到任何具有多个版本的第三方库永远都不安全，因为该目标的任何用户都可能已经依赖于不同的版本。遵循“一个版本”规则使此冲突不可能发生如果目标在第三方库上添加依赖项，则任何现有依赖项都将在同一版本上，因此它们可以愉快地共存。

We’ll examine this further in the context of a large monorepo in [Chapter 21](#_bookmark1845).

我们将在[第21章](#_bookmark1845)中结合大型单体的情况进一步研究这个问题。

 **Transitive external dependencies.** Dealing with the transitive dependencies of an external dependency can be particularly difficult. Many artifact repositories such as Maven Central allow artifacts to specify dependencies on particular versions of other artifacts in the repository. Build tools like Maven or Gradle will often recursively download each transitive dependency by default, meaning that adding a single dependency in your project could potentially cause dozens of artifacts to be downloaded in total.

 **可传递的外部依赖。**处理外部依赖的可传递依赖可能特别困难。许多构件库（如Maven Central）允许构件指定对仓库中其他构件的特定版本的依赖性。像Maven或Gradle这样的构建工具通常会默认递归地下载每个横向依赖，这意味着在你的项目中添加一个依赖可能会导致总共下载几十个构件。

This is very convenient: when adding a dependency on a new library, it would be a big pain to have to track down each of that library’s transitive dependencies and add them all manually. But there’s also a huge downside: because different libraries can depend on different versions of the same third-party library, this strategy necessarily violates the One-Version Rule and leads to the diamond dependency problem. If your target depends on two external libraries that use different versions of the same dependency, there’s no telling which one you’ll get. This also means that updating an external dependency could cause seemingly unrelated failures throughout the codebase if the new version begins pulling in conflicting versions of some of its dependencies.

这非常方便：在新库上添加依赖项时，必须跟踪该库的每个可传递依赖项并手动添加它们，这将是一个很大的麻烦。但也有一个巨大的缺点：因为不同的库可能依赖于同一第三方库的不同版本，所以这种策略必然违反一个版本规则，并导致钻石依赖问题。如果你的目标依赖于使用同一依赖项的不同版本的两个外部库，则无法确定你将获得哪一个。这也意味着，如果新版本开始引入其某些依赖项的冲突版本，更新外部依赖项可能会导致整个代码库中看似无关的故障。

For this reason, Bazel does not automatically download transitive dependencies. And, unfortunately, there’s no silver bullet—Bazel’s alternative is to require a global file that lists every single one of the repository’s external dependencies and an explicit version used for that dependency throughout the repository. Fortunately, [Bazel provides tools](https://oreil.ly/kejfX) that are able to automatically generate such a file containing the transitive dependencies of a set of Maven artifacts. This tool can be run once to generate the initial *WORKSPACE* file for a project, and that file can then be manually updated to adjust the versions of each dependency.

因此，Bazel不会自动下载可传递依赖项。。而且，不幸的是，没有银弹--Bazel的替代方案是需要一个全局文件，列出版本库的每一个外部依赖，以及整个版本库中用于该依赖的明确版本。幸运的是，[Bazel提供的工具](https://oreil.ly/kejfX)能够自动生成这样一个文件，其中包含一组Maven构件的可传递依赖项。该工具可以运行一次，为项目生成初始*WORKSPACE*文件，然后可以手动更新该文件，以调整每个依赖的版本。

Yet again, the choice here is one between convenience and scalability. Small projects might prefer not having to worry about managing transitive dependencies themselves and might be able to get away with using automatic transitive dependencies. This strategy becomes less and less appealing as the organization and codebase grows, and conflicts and unexpected results become more and more frequent. At larger scales, the cost of manually managing dependencies is much less than the cost of dealing with issues caused by automatic dependency management.

然而，这里的权衡是在便捷性和可伸缩性之间。小型项目可能更愿意不必担心管理可传递依赖项本身，并且可能可以不使用自动可传递依赖项。随着组织和代码库的增长，这种策略越来越没有吸引力，冲突和意外结果也越来越频繁。在更大的范围内，手动管理依赖关系的成本远远低于处理自动依赖关系管理所引起的问题的成本。

**Caching build results using external dependencies.** External dependencies are most often provided by third parties that release stable versions of libraries, perhaps without providing source code. Some organizations might also choose to make some of their own code available as artifacts, allowing other pieces of code to depend on them as third- party rather than internal dependencies. This can theoretically speed up builds if artifacts are slow to build but quick to download.

**使用外部依赖性缓存构建结果。**外部依赖性最常由发布稳定版本库的第三方提供，可能没有提供源代码。一些组织可能也会选择将他们自己的一些代码作为构件来提供，允许其他代码作为第三方依赖它们，而不是内部依赖。如果构件的构建速度慢但下载速度快，理论上这可以加快构建速度。

However, this also introduces a lot of overhead and complexity: someone needs to be responsible for building each of those artifacts and uploading them to the artifact repository, and clients need to ensure that they stay up to date with the latest version. Debugging also becomes much more difficult because different parts of the system will have been built from different points in the repository, and there is no longer a consistent view of the source tree.

然而，这也带来了很多开销和复杂性：需要有人负责构建每一个构件，并将它们上传到构件库，而客户需要确保它们保持最新的版本。调试也变得更加困难，因为系统的不同部分将从存储库中的不同点构建，并且不再有源代码树的一致视图。

A better way to solve the problem of artifacts taking a long time to build is to use a build system that supports remote caching, as described earlier. Such a build system will save the resulting artifacts from every build to a location that is shared across engineers, so if a developer depends on an artifact that was recently built by someone else, the build system will automatically download it instead of building it. This provides all of the performance benefits of depending directly on artifacts while still ensuring that builds are as consistent as if they were always built from the same source. This is the strategy used internally by Google, and Bazel can be configured to use a remote cache.

解决工件构建时间过长问题的更好方法是使用支持远程缓存的构建系统，如前所述。这样的构建系统将把每次构建产生的构件保存到工程师共享的位置，所以如果一个开发者依赖于最近由其他人构建的构件，构建系统将自动下载它而不是构建它。这提供了直接依赖构件的所有性能优势，同时确保构建的一致性，就像它们总是从同一个源构建一样。这是谷歌内部使用的策略，Bazel可以配置为使用远程缓存。

**Security and reliability of external dependencies.** Depending on artifacts from third- party sources is inherently risky. There’s an availability risk if the third-party source (e.g., an artifact repository) goes down, because your entire build might grind to a halt if it’s unable to download an external dependency. There’s also a security risk: if the third-party system is compromised by an attacker, the attacker could replace the referenced artifact with one of their own design, allowing them to inject arbitrary code into your build.

**外部依赖的安全性和可靠性。**依赖第三方来源的构件本身是有风险的。如果第三方来源（例如估计库）发生故障，就会有可用性风险，因为如果你无法下载外部依赖，整个构建可能会停止。还有一个安全风险：如果第三方系统被攻击者破坏了，攻击者可以用他们自己设计的构件来替换引用的构件，允许他们在你的构建中注入任意代码。

Both problems can be mitigated by mirroring any artifacts you depend on onto servers you control and blocking your build system from accessing third-party artifact repositories like Maven Central. The trade-off is that these mirrors take effort and resources to maintain, so the choice of whether to use them often depends on the scale of the project. The security issue can also be completely prevented with little overhead by requiring the hash of each third-party artifact to be specified in the source repository, causing the build to fail if the artifact is tampered with.

这两个问题都可以通过将你依赖的构件镜像到你控制的服务器上，并阻止你的构建系统访问第三方构件库（如Maven Central）来缓解。权衡之下，这些镜像需要花费精力和资源来维护，所以是否使用这些镜像往往取决于项目的规模。安全问题也可以通过要求在源码库中指定每个第三方工件的哈希值来完全避免，如果构件被篡改，则会导致构建失败。

Another alternative that completely sidesteps the issue is to *vendor* your project’s dependencies. When a project vendors its dependencies, it checks them into source control alongside the project’s source code, either as source or as binaries. This effectively means that all of the project’s external dependencies are converted to internal dependencies. Google uses this approach internally, checking every third-party library referenced throughout Google into a *third_party* directory at the root of Google’s source tree. However, this works at Google only because Google’s source control system is custom built to handle an extremely large monorepo, so vendoring might not be an option for other organizations.

另一个完全避开这个问题的办法是你项目的依赖关系。当项目提供其依赖项时，它会将它们与项目源代码一起作为源代码或二进制文件检查到源代码管理中。这实际上意味着该项目所有的外部依赖被转换为内部依赖。谷歌在内部使用这种方法，将整个谷歌引用的每一个第三方库检查到谷歌源码树根部的*第三方*目录中。然而，这在谷歌是可行的，因为谷歌的源码控制系统是定制的，可以处理一个非常大的monorepo，所以对于其他组织来说，vendor可能不是一个选项。

# Conclusion 总结

A build system is one of the most important parts of an engineering organization. Each developer will interact with it potentially dozens or hundreds of times per day, and in many situations, it can be the rate-limiting step in determining their productivity. This means that it’s worth investing time and thought into getting things right.

构建系统是一个工程组织中最重要的部分之一。每个开发人员每天可能要与它互动几十次或几百次，在许多情况下，它可能是决定他们生产率的限制性步骤。这意味着，值得花时间和精力把事情做好。

As discussed in this chapter, one of the more surprising lessons that Google has learned is that *limiting engineers’ power and flexibility can improve their productivity*. We were able to develop a build system that meets our needs not by giving engineers free reign in defining how builds are performed, but by developing a highly structured framework that limits individual choice and leaves most interesting decisions in the hands of automated tools. And despite what you might think, engineers don’t resent this: Googlers love that this system mostly works on its own and lets them focus on the interesting parts of writing their applications instead of grappling with build logic. Being able to trust the build is powerful—incremental builds just work, and there is almost never a need to clear build caches or run a “clean” step.

正如本章所讨论的，谷歌学到的一个更令人惊讶的教训是，*限制工程师的权力和灵活性可以提高他们的生产力*。我们能够开发出一个满足我们需求的构建系统，并不是通过让工程师自由决定如何进行构建，而是通过开发一个高度结构化的框架，限制个人的选择，并将最有趣的决策留给自动化工具。不管你怎么想，工程师们对此并不反感：Googlers喜欢这个系统主要靠自己工作，让他们专注于编写应用程序的有趣部分，而不是纠结于构建逻辑。能够信任构建是一个强大的增量构建，而且几乎不需要清除构建缓存或运行“清理”步骤。

We took this insight and used it to create a whole new type of *artifact-based* build system, contrasting with traditional *task-based* build systems. This reframing of the build as centering around artifacts instead of tasks is what allows our builds to scale to an organization the size of Google. At the extreme end, it allows for a *distributed* *build system* that is able to leverage the resources of an entire compute cluster to accelerate engineers’ productivity. Though your organization might not be large enough to benefit from such an investment, we believe that artifact-based build systems scale down as well as they scale up: even for small projects, build systems like Bazel can bring significant benefits in terms of speed and correctness.

我们接受了这一观点，并利用它创建了一种全新的基于构件的构建系统，与传统的构建系统形成对比。这种以构件为中心而不是以任务为中心的构建重构，使我们的构建能够扩展到一个与谷歌规模相当的组织。在极端情况下，它允许一个*分布式构建系统*，能够利用整个计算集群的资源来加速工程师的生产力。虽然你的组织可能还没有大到可以从这样的投资中获益，但我们相信，基于工件的构建系统会随着规模的扩大而缩小：即使对于小型项目，像Bazel这样的构建系统也可以在速度和正确性方面带来显著的好处。

The remainder of this chapter explored how to manage dependencies in an artifact- based world. We came to the conclusion that *fine-grained modules scale better than coarse-grained modules*. We also discussed the difficulties of managing dependency versions, describing the O*ne-Version Rule* and the observation that all dependencies should be *versioned manually and explicitly*. Such practices avoid common pitfalls like the diamond dependency issue and allow a codebase to achieve Google’s scale of billions of lines of code in a single repository with a unified build system.

本章的其余部分探讨了如何在一个基于工件的系统中管理依赖关系。我们得出的结论是：*细粒度的模块比粗粒度的模块更容易扩展。我们还讨论了管理依赖版本的困难，描述了* "一个版本规则 "*，以及所有的依赖都应该*手动和明确的版本*的观点。这样的做法可以避免像钻石依赖问题这样的常见陷阱，并允许代码库在一个具有统一构建系统的单一存储库中实现谷歌数万亿行代码的规模。

# TL;DRs  内容提要

•   A fully featured build system is necessary to keep developers productive as an organization scales.
•   Power and flexibility come at a cost. Restricting the build system appropriately makes it easier on developers.

- 一个功能齐全的构建系统对于保持开发人员在组织规模扩大时的生产力是必要的。
- 权力和灵活性是有代价的。适当地限制构建系统可以使开发人员更容易地使用它。

































































