## Foreword 序言

I have always been endlessly fascinated with the details of how Google does things. I have grilled my Googler friends for information about the way things really work inside of the company. How do they manage such a massive, monolithic code repository without falling over? How do tens of thousands of engineers successfully collaborate on thousands of projects? How do they maintain the quality of their systems?

我对谷歌做事的细节着迷不已。我也曾向在谷歌工作的朋友问询谷歌内部如何运作。他们是如何管理如此庞大的单体代码库而不出错的？数以万计的工程师是如何在数千个项目上成功协作的？他们是如何保持系统的质量的？

Working with former Googlers has only increased my curiosity. If you’ve ever worked with a former Google engineer (or “Xoogler,” as they’re sometimes called), you’ve no doubt heard the phrase “at Google we…” Coming out of Google into other companies seems to be a shocking experience, at least from the engineering side of things. As far as this outsider can tell, the systems and processes for writing code at Google must be among the best in the world, given both the scale of the company and how often peo‐ ple sing their praises.

与前谷歌员工一起共事，只会增加我的好奇心。如果你曾经与前谷歌工程师（或他们有时称之为“Xoogler”）一起工作，你无疑听到过这样一句话："在谷歌我们......" 从谷歌出来进入其他公司已经是一个令人羡慕的经历，至少从工程方面来说是这样。就我这个局外人而言，考虑到公司的规模和员工对其的赞誉程度，谷歌公司编写代码的系统和流程一定是世界上最好的之一。

In *Software Engineering at Google*, a set of Googlers (and some Xooglers) gives us a lengthy blueprint for many of the practices, tools, and even cultural elements that underlie software engineering at Google. It’s easy to overfocus on the amazing tools that Google has built to support writing code, and this book provides a lot of details about those tools. But it also goes beyond simply describing the tooling to give us the philosophy and processes that the teams at Google follow. These can be adapted to fit a variety of circumstances, whether or not you have the scale and tooling. To my delight, there are several chapters that go deep on various aspects of automated testing, a topic that continues to meet with too much resistance in our industry.

在*《Google的软件工程》*中，一组Googlers（和一些Xooglers）为我们提供了谷歌软件工程的许多实践、工具甚至文化元素的详细蓝图。我们很容易过度关注谷歌为支持编写代码而构建的神奇工具，本书提供了很多关于这些工具的细节。本书不仅仅是简单地描述工具，为我们提供谷歌团队遵循的理念和流程。这些都可以适应各种情况，无论你是否有这样的规模和工具。令我兴奋的是，有几个章节深入探讨了自动化测试的各个方面，这个话题在我们的行业中仍然遇到太多的阻力。

The great thing about tech is that there is never only one way to do something. Instead, there is a series of trade-offs we all must make depending on the circumstances of our team and situation. What can we cheaply take from open source? What can our team build? What makes sense to support for our scale? When I was grilling my Googler friends, I wanted to hear about the world at the extreme end of scale: resource rich, in both talent and money, with high demands on the software being built. This anecdotal information gave me ideas on some options that I might not otherwise have considered.

技术的伟大之处在于，做一件事永远不会只有一种方法。相反，有一系列的权衡，我们都必须根据我们的团队和现状来选择。我们可以从开放源码中低成本地获取什么？我们的团队可以创建什么？对我们的规模来说，什么是有意义的支持？当我在询问我的Googler朋友时，我想听听处于规模之颠的世界：要钱有钱，要人有人，对正在构建的软件要求很高。这些信息给了我一些想法，这些想法可能是我没有思考过的。

With this book, we’ve written down those options for everyone to read. Of course, Google is a unique company, and it would be foolish to assume that the right way to run your software engineering organization is to precisely copy their formula. Applied practically, this book will give you ideas on how things could be done, and a lot of information that you can use to bolster your arguments for adopting best practices like testing, knowledge sharing, and building collaborative teams.

通过这本书，我们把这些选择写下来供大家阅读。当然，谷歌是一家独一无二的公司，如果认为运行你的软件工程组织的正确方法是精确地复制他们的模式，那就太愚蠢了。在实际应用中，这本书会给你提供关于如何做事情的想法，以及很多信息，你可以用这些信息来支持你采用最佳实践的论据，如测试、知识共享和建立协作团队。

You may never need to build Google yourself, and you may not even want to reach for the same techniques they apply in your organization. But if you aren’t familiar with the practices Google has developed, you’re missing a perspective on software engineering that comes from tens of thousands of engineers working collaboratively on software over the course of more than two decades. That knowledge is far too valuable to ignore.

你可能永远不需要自己创建谷歌，你甚至可能不想在你的组织中使用他们所应用的技术。但是，如果你不熟悉谷歌开发的实践，你就会错过一个关于软件工程的视角，这个视角来自于二十多年来数万名工程师在软件上的协作。这些知识太有价值了，不能忽视。

 

*— Camille Fournier* *Author,* The Manager’s Path