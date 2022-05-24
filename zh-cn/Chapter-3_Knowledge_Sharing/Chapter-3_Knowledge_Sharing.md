
**CHAPTER  3**

# Knowledge Sharing 

# 第三章 知识共享
​																						**Written by Nina Chen and Mark Barolak **

​                                                                                                 **Edited by Riona MacNamara**

Your organization understands your problem domain better than some random person on the internet; your organization should be able to answer most of its own questions. To achieve that, you need both experts who know the answers to those questions and mechanisms to distribute their knowledge, which is what we’ll explore in this chapter. These mechanisms range from the utterly simple (Ask questions; Write down what you know) to the much more structured, such as tutorials and classes. Most importantly, however, your organization needs a culture of learning, and that requires creating the psychological safety that permits people to admit to a lack of knowledge.

你的组织对你问题领域的理解比互联网上的一些随机的人要好；你的组织应该能解答你的大部分问题。要做到这一点，你需要知道解决问题答案的专家在哪里和传播知识的机制，这就是我们将在本章中探讨的。这些机制的范围很广，从完全简单的（提问；写下你所知道的）到系统化，如教程和课程。然而，最重要的是，你的组织需要一种学习文化，这需要创造一种心理上的安全感，允许人们承认自己缺乏知识。

## Challenges to Learning 学习的挑战
Sharing expertise across an organization is not an easy task. Without a strong culture of learning, challenges can emerge. Google has experienced a number of these challenges, especially as the company has scaled:    
*Lack of psychological safety*  
	An environment in which people are afraid to take risks or make mistakes in front of others because they fear being punished for it. This often manifests as a culture of fear or a tendency to avoid transparency. 
*Information islands*  
	Knowledge fragmentation that occurs in different parts of an organization that don’t communicate with one another or use shared resources. In such anenvironment, each group develops its own way of doing things.1 This often leads to the following:  
  **Information fragmentation**   
  Each island has an incomplete picture of the bigger whole.  
  **Information duplication**   
  Each island has reinvented its own way of doing something.  
  **Information skew**   
  Each island has its own ways of doing the same thing, and these might or might not conflict.   
*Single point of failure (SPOF)*   
	A bottleneck that occurs when critical information is available from only a single person. This is related to bus factor, which is discussed in more detail in Chapter 2.  
	SPOFs can arise out of good intentions: it can be easy to fall into a habit of “Let me take care of that for you.” But this approach optimizes for short-term efficiency (“It’s faster for me to do it”) at the cost of poor long-term scalability (the team never learns how to do whatever it is that needs to be done). This mindset also tends to lead to all-or-nothing expertise.  
*All-or-nothing expertise*   
	A group of people that is split between people who know “everything” and novices, with little middle ground. This problem often reinforces itself if experts always do everything themselves and don’t take the time to develop new experts through mentoring or documentation. In this scenario, knowledge and responsibilities continue to accumulate on those who already have expertise, and new team members or novices are left to fend for themselves and ramp up more slowly.  
*Parroting*   
	Mimicry without understanding. This is typically characterized by mindlessly copying patterns or code without understanding their purpose, often under the assumption that said code is needed for unknown reasons.
*Haunted graveyards*   
	Places, often in code, that people avoid touching or changing because they are afraid that something might go wrong. Unlike the aforementioned parroting, haunted graveyards are characterized by people avoiding action because of fear and superstition.  

在一个组织内共享专业知识并非易事。没有强大的学习文化，挑战随时出现。谷歌经历了许多这样的挑战，尤其是随着公司规模的扩大：  
*缺乏安全感*。
	一个环境中，人们不敢在别人面前冒险或犯错，因为他们害怕因此受到惩罚。这通常表现为一种恐惧文化或避免透明的倾向。
*信息孤岛*
	在一个组织的不同部分发生的知识碎片，这些部分没有相互沟通或使用共享资源。在这样的环境中，每个小组都形成了自己的做事方式。这往往导致以下情况：
​	**信息碎片化**
	每个孤岛对整体都有一个不完整的描述。
​	**信息重复**
	每个孤岛都重新发明了自己的做事方式。
​	**信息偏移**
	每个孤岛都有自己做同一件事的方法，这些方法在一起协作可能会或可能不会发生冲突。
*单点故障（SPOF）*
	当关键信息只能从一个人那里获得时，就会出现瓶颈。这与巴士因子有关，在第二章有详细讨论。
	SPOF可能是出于良好的意图：我们很容易陷入 "让我来帮你解决 "的习惯。但这种方法提高了短期效率（"我做起来更快"），但代价是长期可扩展性差（团队从未学会如何做需要做的事）。这种心态也往往导致失败，组员要么全会或要么都不会某方面的知识。
*要么全会要么都不会*
	一群人被分成了 "什么都懂 "的老人和什么都不会的新手，几乎没有中间地带。如果专家总是自己做所有的事情，而不花时间通过指导或编写文档来培养新的专家，这个问题往往会加剧。在这种情况下，知识和责任继续在那些已经拥有专业知识的人身上积累，而新的团队成员或新手则只能自生自灭，提升速度更慢。
*鹦鹉学舌*
	模仿而不理解。这典型的特征是在不了解其目的的情况下无意识地复制模式或代码，通常是在假设上述代码是出于未知原因而需要的情况下。
*闹鬼墓地*
	人们避免接触或改变的地方，通常在代码中，因为他们担心会出问题。与前面提到的鹦鹉学舌不同，闹鬼墓地的特点是人们因为恐惧和迷信而避免行动。

In the rest of this chapter, we dive into strategies that Google’s engineering organizations have found to be successful in addressing these challenges.

在本章的其余部分，我们将深入探讨谷歌的工程组织在应对这些挑战方面成功的策略。

```
1 In other words, rather than developing a single global maximum, we have a bunch of local maxima
1 换句话说，我们没有形成一个单一的全球最大值，而是有一堆的局部最大值。
```

## Philosophy  理念
Software engineering can be defined as the multiperson development of multiversion programs.2 People are at the core of software engineering: code is an important output but only a small part of building a product. Crucially, code does not emerge spontaneously out of nothing, and neither does expertise. Every expert was once a novice: an organization’s success depends on growing and investing in its people.

软件工程可以定义为多人协作开发多版本程序。人是软件工程的核心：代码是重要的产出，但只是构建产品的一小部分。至关重要的是，代码不是凭空出现的，专业知识也不会凭空出现。每个专家都曾经是菜鸟：一个组织的成功取决于其员工的成长和投入。

Personalized, one-to-one advice from an expert is always invaluable. Different team members have different areas of expertise, and so the best teammate to ask for any given question will vary. But if the expert goes on vacation or switches teams, the team can be left in the lurch. And although one person might be able to provide personalized help for one-to-many, this doesn’t scale and is limited to small numbers of “many.”

来自专家的个性化、一对一的建议总是宝贵的。不同的团队的成员有不同的专业领域，因此对于任何给定的问题，最佳的队友都会有所不同解法。但如果专家休假或调换团队，原团队可能会陷入困境。尽管一个人可以为一对多人提供个性化的帮助，但这并不具有规模，只限于少量的 "多"。

Documented knowledge, on the other hand, can better scale not just to the team but to the entire organization. Mechanisms such as a team wiki enable many authors to share their expertise with a larger group. But even though written documentation is more scalable than one-to-one conversations, that scalability comes with some trade- offs: it might be more generalized and less applicable to individual learners’ situations, and it comes with the added maintenance cost required to keep information relevant and up to date over time.

另一方面，文档化的知识不仅可以更好地扩展到团队，还可以扩展到整个组织。团队wiki等机制使许多作者能够与更大的团队分享他们的专业知识。但是，尽管书面文档比一对一的对话更具可扩展性，但这种可扩展性也带来了一些代价：它可能更具普遍性，不太适用于个别学习者的情况，而且随着时间的推移，还需要额外的维护成本来，保持信息的相关性和实时性。

Tribal knowledge exists in the gap between what individual team members know and what is documented. Human experts know these things that aren’t written down. If we document that knowledge and maintain it, it is now available not only to somebody with direct one-to-one access to the expert today, but to anybody who can find and view the documentation.

内部知识存在于单个团队成员所知道的和被记录下来的东西之间的差距。人类专家知道这些没有写下来的东西。如果我们把这些知识记录下来并加以维护，那么现在不仅可以让今天的专家一对一地直接接触到这些知识，而且可以让任何能够找到并查看这些文件的人获得这些知识。

```
tribal knowledge：内部知识；是指一种仅存在于某个部落中的信息或知识， 这些知识不为外界所知，没有正式记 录， 只能口口相传。
```

So in a magical world in which everything is always perfectly and immediately documented, we wouldn’t need to consult a person any more, right? Not quite. Written knowledge has scaling advantages, but so does targeted human help. A human expert can synthesize their expanse of knowledge. They can assess what information is applicable to the individual’s use case, determine whether the documentation is still relevant, and know where to find it. Or, if they don’t know where to find the answers, they might know who does.

因此，在一个神奇的世界里，如果所有的事情总是完美地、立即地被记录下来，我们就不需要再咨询一个人了，对吗？并非如此。书面知识具有扩展优势，但有针对性的人力投入也具有扩展优势。人类专家可以利用他们广博的知识。他们可以评估哪些信息适用于个人的使用案例，确定文件是否仍然相关，并知道在哪里可以找到它。或者，如果他们不知道在哪里可以找到解答，他们知道谁可以解决。

```
2	David Lorge Parnas, Software Engineering: Multi-person Development of Multi-version Programs (Heidelberg: Springer-Verlag Berlin, 2011).

2 David Lorge Parnas, 软件工程。多人开发多版本程序 (Heidelberg: Springer-Verlag Berlin, 2011).
```

Tribal and written knowledge complement each other. Even a perfectly expert team with perfect documentation needs to communicate with one another, coordinate with other teams, and adapt their strategies over time. No single knowledge-sharing approach is the correct solution for all types of learning, and the particulars of a good mix will likely vary based on your organization. Institutional knowledge evolves over time, and the knowledge-sharing methods that work best for your organization will likely change as it grows. Train, focus on learning and growth, and build your own stable of experts: there is no such thing as too much engineering expertise.

内部知识和书面知识相互补充。即使是一个拥有完美文档的专家团队也需要相互沟通，与其他团队协调，并随着时间的推移不断调整他们的策略。没有任何一种知识共享方法是所有类型学习的正确解决方案，最佳组合的具体内容会根据你的组织而有所不同。团队知识随着时间的推移而演变，对你的组织最有效的知识共享方法可能会随着组织的发展而改变。培训，专注于学习和成长，并建立自己稳定的专家队伍：没有太多的工程专业知识。

## Setting the Stage: Psychological Safety 搭建舞台：心理安全
Psychological safety is critical to promoting a learning environment.

心理安全是促进学习环境的关键。

To learn, you must first acknowledge that there are things you don’t understand. We should welcome such honesty rather than punish it. (Google does this pretty well, but sometimes engineers are reluctant to admit they don’t understand something.)

要学习，你必须首先承认有些事情你不明白。我们应该欢迎这种诚实，而不是惩罚它。（谷歌在这方面做得很好，但有时工程师不愿意承认他们不懂一些东西。）

An enormous part of learning is being able to try things and feeling safe to fail. In a healthy environment, people feel comfortable asking questions, being wrong, and learning new things. This is a baseline expectation for all Google teams; indeed, our research has shown that psychological safety is the most important part of an effective team.

学习的一个重要部分是能够尝试事情，并感觉到失败的无责。在一个健康的环境中，人们对提出问题、犯错和学习新事物感到自在。这是所有谷歌团队的基本期望；事实上，我们的研究表明，心理安全是有效团队最重要的组成部分。

### Mentorship 导师制
At Google, we try to set the tone as soon as a “Noogler” (new Googler) engineer joins the company. One important way of building psychological safety is to assign Nooglers a mentor—someone who is not their team member, manager, or tech lead— whose responsibilities explicitly include answering questions and helping the Noogler ramp up. Having an officially assigned mentor to ask for help makes it easier for the newcomer and means that they don’t need to worry about taking up too much of their coworkers’ time.

在谷歌，我们尝试在 "Noogler"（新的Googler）工程师加入公司时就确定基调。建立心理安全的一个重要方法是为Noogler分配一个导师——一个不是他们的团队成员、经理或技术负责人的人——其职责明确包括回答问题和帮助Noogler成长。有一个官方指定的导师可以寻求帮助，这对新人来说更容易，也意味着他们不需要担心会占用同事太多的时间。

A mentor is a volunteer who has been at Google for more than a year and who is available to advise on anything from using Google infrastructure to navigating Google culture. Crucially, the mentor is there to be a safety net to talk to if the mentee doesn’t know whom else to ask for advice. This mentor is not on the same team as the mentee, which can make the mentee feel more comfortable about asking for help in tricky situations.

导师是在谷歌工作了一年以上的志愿者，他可以就使用谷歌基础设施和了解谷歌文化等方面提供建议。最重要的是，如果被指导者不知道该向谁寻求建议，指导者就会成为一个安全网。这位导师与被指导者不在同一个团队，这可以使被指导者在棘手的情况下更放心地寻求帮助。

Mentorship formalizes and facilitates learning, but learning itself is an ongoing process. There will always be opportunities for coworkers to learn from one another, whether it’s a new employee joining the organization or an experienced engineer learning a new technology. With a healthy team, teammates will be open not just to answering but also to asking questions: showing that they don’t know something and learning from one another.

导师制使学习正规化并促进学习，但学习本身是一个持续的过程。无论是加入组织的新员工还是学习新技术的有经验的工程师，同事之间总是有机会互相学习。在一个健康的团队中，队友们不仅愿意回答问题，也愿意提出问题：表明他们不知道的东西，并相互学习。

### Psychological Safety in Large Groups 大团体的心理安全
Asking a nearby teammate for help is easier than approaching a large group of mostly strangers. But as we’ve seen, one-to-one solutions don’t scale well. Group solutions are more scalable, but they are also scarier. It can be intimidating for novices to form a question and ask it of a large group, knowing that their question might be archived for many years. The need for psychological safety is amplified in large groups. Every member of the group has a role to play in creating and maintaining a safe environment that ensures that newcomers are confident asking questions and up-and- coming experts feel empowered to help those newcomers without the fear of having their answers attacked by established experts.

向附近的队友寻求帮助比接近一大群大多是陌生的人容易得多。但正如我们所看到的，一对一的解决方案并不能很好地扩展。对于新手来说，出现一个问题并向一大团队人提问是一种威胁，因为他们知道自己的问题可能会存在多年。对心理安全的需求在大团队中被放大了。小组的每个成员都应在创造和维持一个安全的环境中发挥作用，以确保新人自信提出问题，而新晋专家则感到有能力帮助这些新人，而不必担心他们的答案会受到老专家的攻击。

The most important way to achieve this safe and welcoming environment is for group interactions to be cooperative, not adversarial. Table 3-1 lists some examples of recommended patterns (and their corresponding antipatterns) of group interactions.

实现这种安全和受欢迎的环境的最重要的方法是团体互动是合作性的，而不是对抗性的。表3-1列出了一些推荐的团体互动模式（以及相应的反模式）的例子。

Table 3-1. Group interaction patterns

| Recommended patterns (cooperative)                           | Antipatterns (adversarial)                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Basic questions or mistakes are guided in the proper direction | Basic questions or mistakes are picked on, and the person asking the question is chastised |
| Explanations are given with the intent of helping the person asking the question learn | Explanations are given with the intent of showing off one’s own knowledge |
| Responses are kind, patient, and helpful                     | Responses are condescending, snarky, and unconstructive      |
| Interactions are shared discussions for finding solutions    | Interactions are arguments with “winners” and “losers”       |

Table 3-1. 团队互动模式

| 推荐的模式（合作型）                         | 反模式(对抗型)                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 基本的问题或错误被引导到正确的方向 | 基本的问题或错误被挑剔，提出问题的人被责备 |
| 解释的目的是为了帮助提问的人学习 | 解释的目的是为了炫耀自己的知识 |
| 回应亲切、耐心、乐于助人         | 回应是居高临下、尖酸刻薄、毫无建设性的 |
| 互动是为寻找解决方案而进行的共同讨论 | ”互动是有 "赢家 "和 "输家 "的争论 |

These antipatterns can emerge unintentionally: someone might be trying to be helpful but is accidentally condescending and unwelcoming. We find the [Recurse Center’s social rules ](https://oreil.ly/zGvAN)to be helpful here:  
*No feigned surprise (“What?! I can’t believe you don’t know what the stack is!”)*
	Feigned surprise is a barrier to psychological safety and makes members of the group afraid of admitting to a lack of knowledge.
*No* *“well-actuallys”*
	Pedantic corrections that tend to be about grandstanding rather than precision.
*No back-seat driving*
	Interrupting an existing discussion to offer opinions without committing to the conversation.
*No subtle “-isms” (“It’s so easy my grandmother could do it!”)*
	Small expressions of bias (racism, ageism, homophobia) that can make individuals feel unwelcome, disrespected, or unsafe.

这些反模式可能是无意中出现的：有人可能是想帮忙，但却意外地居高临下，不受欢迎。我们发现Recurse中心的社交规则在这里很有帮助：  
*不要假装惊讶（"什么？ 我不相信你不知道堆栈是什么！"）*  
	假装惊讶是心理安全的障碍，使团体成员害怕承认自己缺乏知识。  
*不根据事实*
	迂腐的纠正，往往是为了哗众取宠而非纠正。
*不开小会*
	打断现有的讨论，提供意见，而不投入到对话中。
*不说微妙的谎言（"这太容易了，我奶奶都能做！"）*
	小小的偏见表达（种族主义、年龄歧视、恐同症），会使个人感到不受欢迎、不被尊重或不安全。


## Growing Your Knowledge 增长你的知识

Knowledge sharing starts with yourself. It is important to recognize that you always have something to learn. The following guidelines allow you to augment your own personal knowledge.

知识共享从自己开始。重要的是要认识到，你总是有东西要学。下面的准则可以让你增加自己的个人知识。

### Ask Questions 提问

If you take away only a single thing from this chapter, it is this: always be learning; always be asking questions.

如果你从这一章中只带走一件事，那就是：永远学习；保持好奇。

We tell Nooglers that ramping up can take around six months. This extended period is necessary to ramp up on Google’s large, complex infrastructure, but it also reinforces the idea that learning is an ongoing, iterative process. One of the biggest mistakes that beginners make is not to ask for help when they’re stuck. You might be tempted to struggle through it alone or feel fearful that your questions are “too simple.” “I just need to try harder before I ask anyone for help,” you think. Don’t fall into this trap! Your coworkers are often the best source of information: leverage this valuable resource.

我们告诉Nooglers，提升可能需要6个月左右。这个时间的延长对于在谷歌庞大而复杂的基础设施上的提升是必要的，但它也强化了学习是一个持续、迭代的过程的理念。初学者犯的最大错误之一是在遇到困难时不寻求帮助。你可能会想独自挣扎一下，或者感到害怕你的问题 "太简单了"。"你想："我只是需要在向别人寻求帮助之前更努力地一下。不要落入这个陷阱! 你的同事往往是最好的信息来源：利用这一宝贵资源。

There is no magical day when you suddenly always know exactly what to do in every situation—there’s always more to learn. Engineers who have been at Google for years still have areas in which they don’t feel like they know what they are doing, and that’s OK! Don’t be afraid to say “I don’t know what that is; could you explain it?” Embrace not knowing things as an area of opportunity rather than one to fear.[3](#_bookmark216)

不会有神奇的一天，你突然总是确切地知道在任何情况下该怎么做——总是有更多的东西需要学。在谷歌工作多年的工程师们仍然有一些领域他们觉得自己不知道自己该怎么做，这没关系！不要害怕说 "我不知道那是什么，你能解释一下吗？"。把不知道事情当作了解新领域的机会，而不是一个恐惧这个未知领域。

It doesn’t matter whether you’re new to a team or a senior leader: you should always be in an environment in which there’s something to learn. If not, you stagnate (and should find a new environment).

不管你是新加入的团队还是高级领导者：你应该始终处在一个有东西可学的环境中。如果不是这样，你就会停滞不前（应该找一个新的环境）。

It’s especially critical for those in leadership roles to model this behavior: it’s important not to mistakenly equate “seniority” with “knowing everything.” In fact, the more you know, [the more you know you don’t know](https://oreil.ly/VWusg). Openly asking questions[4](#_bookmark217) or expressing gaps in knowledge reinforces that it’s OK for others to do the same.

对于那些担任领导角色的人来说，塑造这种行为尤为重要：重要的是不要错误地将 "资历 "等同于 "无所不知"。事实上，你知道的越多，[你知道你不知道的就越多](https://oreil.ly/VWusg)。公开提问或表达知识差距，强化了其他人也可以这样做。

On the receiving end, patience and kindness when answering questions fosters an environment in which people feel safe looking for help. Making it easier to overcome the initial hesitation to ask a question sets the tone early: reach out to solicit questions, and make it easy for even “trivial” questions to get an answer. Although engineers could probably figure out tribal knowledge on their own, they’re not here to work in a vacuum. Targeted help allows engineers to be productive faster, which in turn makes their entire team more productive.

在接受端，在回答问题时的耐心和善意培养了一种环境，使人们感到安全地寻求帮助。让人们更容易克服最初对提问的犹豫不决，尽早定下基调：主动征求问题，让即使是“琐碎”的问题也能轻松得到答案。虽然工程师们可能会自己摸索出内部知识，但他们不是在真空中工作的。有针对性的帮助可以让工程师更快地提高工作效率，从而使整个团队的工作效率更高。

```
3	Impostor syndrome is not uncommon among high achievers, and Googlers are no exception—in fact, a majority of this book’s authors have impostor syndrome. We acknowledge that fear of failure can be difficult for those with impostor syndrome and can reinforce an inclination to avoid branching out.
3    冒名顶替综合症在成功人士中并不少见，谷歌也不例外。事实上，本书的大多数作者都患有冒名顶替综合症。我们承认，对于冒名顶替综合征患者来说，对失败的恐惧可能很难，并且会强化他们避免分道扬镳的倾向。
4	See “How to ask good questions.”
```

### Understand Context 了解背景
Learning is not just about understanding new things; it also includes developing an understanding of the decisions behind the design and implementation of existing things. Suppose that your team inherits a legacy codebase for a critical piece of infrastructure that has existed for many years. The original authors are long gone, and the code is difficult to understand. It can be tempting to rewrite from scratch rather than spend time learning the existing code. But instead of thinking “I don’t get it” and ending your thoughts there, dive deeper: what questions should you be asking?

学习不仅仅是了解新事物；它还包括对现有事物的设计和实施背后的决策的理解。假设你的团队继承了一个已经存在多年的关键基础设施的遗留代码库。原作者早就不在了，代码也很难理解。与其花时间学习现有的代码，不如从头开始重写，这很有诱惑力。但是，不要想着“我不明白”并在那里结束你的想法，而是深入思考：你应该问什么问题？

Consider the principle of “Chesterson’s fence”: before removing or changing something, first understand why it’s there.
	In the matter of reforming things, as distinct from deforming them, there is one plain and simple principle; a principle which will probably be called a paradox. There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, “I don’t see the use of this; let us clear it away.” To which the more intelligent type of reformer will do well to answer: “If you don’t see the use of it, I certainly won’t let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it.”

考虑一下 "Chesterson's fence "的原则：在移除或改变某些东西之前，首先要了解它为什么存在。
	在改造事物的问题上，不同于使事物变形，有一个简单明了的原则；这个原则可能会被称为悖论。在这种情况下，存在着某种制度或法律；为了简单起见，让我们说，在一条道路上竖起了栅栏或大门。更现代的改革者兴高采烈地走到它面前，说："我看不出来这有什么用；让我们把它清除掉吧。" 对此，更聪明的改革者会很好地回答。"如果你看不到它的用途，我当然不会让你清除它。走吧，好好想想。然后，当你能回来告诉我你确实看到了它的用途时，我才会允许你销毁它。"

This doesn’t mean that code can’t lack clarity or that existing design patterns can’t be wrong, but engineers have a tendency to reach for “this is bad!” far more quickly than is often warranted, especially for unfamiliar code, languages, or paradigms. Google is not immune to this. Seek out and understand context, especially for decisions that seem unusual. After you’ve understood the context and purpose of the code, consider whether your change still makes sense. If it does, go ahead and make it; if it doesn’t, document your reasoning for future readers.

这并不意味着代码不可能缺乏清晰，也不意味着现有的设计模式不可能是错误的，但工程师们有一种倾向，即 "这很糟糕！"通常的代码要快得多，特别是对于不熟悉的代码、语言或范例。谷歌也不能幸免。寻找和了解背景，特别是对于那些看起来不寻常的决定。在你了解了代码的背景和目的之后，考虑你的改变是否仍然有意义。如果有意义，就继续做；如果没有意义，就为未来的继任者记录下你的理由。

Many Google style guides explicitly include context to help readers understand the rationale behind the style guidelines instead of just memorizing a list of arbitrary rules. More subtly, understanding the rationale behind a given guideline allows authors to make informed decisions about when the guideline shouldn’t apply or whether the guideline needs updating. See Chapter 8.

许多谷歌风格指南明确地包括背景，以帮助读者理解风格指南背后的理由，而不是仅仅记住一串武断的规则。更微妙的是，了解某条准则背后的理由，可以让作者做出明智的决定，知道该准则何时不适用，或者该准则是否需要更新。见第8章。

## Scaling Your Questions: Ask the Community 扩展你的问题：向社区提问
Getting one-to-one help is high bandwidth but necessarily limited in scale. And as a learner, it can be difficult to remember every detail. Do your future self a favor: when you learn something from a one-to-one discussion, write it down.

获得一对一的帮助是高带宽的，但规模必然有限。而作为一个学习者，要记住每一个细节很困难。帮你未来的自己一个忙：当你从一对一的讨论中学到一些东西时，把它写下来。

Chances are that future newcomers will have the same questions you had. Do them a favor, too, and share what you write down.

未来的新来者可能会有和你一样的问题。也帮他们一个忙，分享你写下的东西。

Although sharing the answers you receive can be useful, it’s also beneficial to seek help not from individuals but from the greater community. In this section, we examine different forms of community-based learning. Each of these approaches—group chats, mailing lists, and question-and-answer systems—have different trade-offs and complement one another. But each of them enables the knowledge seeker to get help from a broader community of peers and experts and also ensures that answers are broadly available to current and future members of that community.

尽管分享你得到的答案可能是有用的，但寻求更多社区而非个人的帮助也是有益的。在本节中，我们将研究不同形式的社区学习。这些方法中的每一种——群聊、邮件列表和问答系统——都有不同的权衡，并相互补充。但它们中的每一种都能使知识寻求者从更广泛的同行和专家社区获得帮助，同时也能确保该社区的当前和未来成员都能广泛获得答案。

### Group Chats 群聊
When you have a question, it can sometimes be difficult to get help from the right person. Maybe you’re not sure who knows the answer, or the person you want to ask is busy. In these situations, group chats are great, because you can ask your question to many people at once and have a quick back-and-forth conversation with whoever is available. As a bonus, other members of the group chat can learn from the question and answer, and many forms of group chat can be automatically archived and searched later.

当你有一个问题时，有时很难从适合的人那里得到帮助。也许你不确定谁知道答案，或者你想问的人很忙。在这种情况下，群聊是很好的方式，因为你可以同时向许多人提出你的问题，并与任何有空的人进行快速的对话。另外，群聊中的其他成员可以从问题和答案中学习，而且许多形式的群聊可以自动存档并在以后进行搜索。

Group chats tend to be devoted either to topics or to teams. Topic-driven group chats are typically open so that anyone can drop in to ask a question. They tend to attract experts and can grow quite large, so questions are usually answered quickly. Team- oriented chats, on the other hand, tend to be smaller and restrict membership. As a result, they might not have the same reach as a topic-driven chat, but their smaller size can feel safer to a newcomer.

群聊往往是专门针对主题或团队。以主题为导向的群聊通常是开放的，因此任何人都可以进来问问题。他们倾向于吸引专家，并且可以发展得相当大，所以问题通常会很快得到回答。另一方面，以团队为导向的聊天，往往规模较小，并限制成员。因此，他们可能没有话题驱动型聊天的影响力，但其较小的规模会让新人感到更安心。

Although group chats are great for quick questions, they don’t provide much structure, which can make it difficult to extract meaningful information from a conversation in which you’re not actively involved. As soon as you need to share information outside of the group, or make it available to refer back to later, you should write a document or email a mailing list.

虽然小组聊天对快速提问很有帮助，但它们没有提供太多的结构化，这会使你很难从一个你没有积极参与的对话中提取有意义的信息。一旦你需要在群组之外分享信息，或使其可在以后参考，你应该写一份文档或给邮件列表发邮件。

### Mailing Lists 邮件列表
Most topics at Google have a topic-users@ or topic-discuss@ Google Groups mailing list that anyone at the company can join or email. Asking a question on a public mailing list is a lot like asking a group chat: the question reaches a lot of people who could potentially answer it and anyone following the list can learn from the answer. Unlike group chats, though, public mailing lists are easy to share with a wider audience: they are packaged into searchable archives, and email threads provide more structure than group chats. At Google, mailing lists are also indexed and can be discovered by Moma, Google’s intranet search engine.

谷歌的大多数主题都有一个topic-users@或topic-discuss@的谷歌群组邮件列表，公司的任何人都可以加入或发送电子邮件。在公共邮件列表上提出问题，很像在群组聊天中提出问题：这个问题可以传到很多有可能回答它的人那儿，而且任何关注这个列表的人都可以从答案中学习。但与群聊不同的是，公共邮件列表很容易与更多人分享：它们被打包成可搜索的档案，而且电子邮件比群聊提供更多的结构化。在谷歌，邮件列表也被编入索引，可以被谷歌的内部网搜索引擎Moma发现。

When you find an answer to a question you asked on a mailing list, it can be tempting to get on with your work. Don’t do it! You never know when someone will need the same information in the future, so it’s a best practice to post the answer back to the list.

当你找到了你在邮件列表中提出的问题的答案时，你可能会很想继续你的工作。请不要这样做! 你永远不知道将来什么时候会有人需要同样的信息，所以最好将答案发回邮件列表。

Mailing lists are not without their trade-offs. They’re well suited for complicated questions that require a lot of context, but they’re clumsy for the quick back-and- forth exchanges at which group chats excel. A thread about a particular problem is generally most useful while it is active. Email archives are immutable, and it can be hard to determine whether an answer discovered in an old discussion thread is still relevant to a present-day situation. Additionally, the signal-to-noise ratio can be lower than other mediums like formal documentation because the problem that someone is having with their specific workflow might not be applicable to you.

邮件列表也有其不足之处。它们很适合处理需要大量背景资料的复杂问题，但对于小组聊天所擅长的快速来回交流来说，它们就显得很笨拙。一个关于特定问题的线索通常在它活跃的时候是最有用的。电子邮件档案是不可改变的，而且很难确定在一个旧的讨论主题中发现的答案是否仍然对今天的情况有效。此外，信噪比可能比其他媒介（如正式文件）低，因为某人在其特定工作流程中遇到的问题可能并不适用于你。

------

#### Email at Google  谷歌的电子邮件

Google culture is infamously email-centric and email-heavy. Google engineers receive hundreds of emails (if not more) each day, with varying degrees of actionability. Nooglers can spend days just setting up email filters to deal with the volume of notifications coming from groups that they’ve been autosubscribed to; some people just give up and don’t try to keep up with the flow. Some groups CC large mailing lists onto every discussion by default, without trying to target information to those who are likely to be specifically interested in it; as a result, the signal-to-noise ratio can be a real problem.

谷歌的文化是臭名昭著的以电子邮件为中心和电子邮件主。谷歌的工程师们每天都会收到数以百计的电子邮件（如果不是更多的话），其中有不同程度的可操作性。新手们需要花好几天时间来设置电子邮件过滤器，以处理来自他们自动订阅的群组的大量通知；有些人干脆放弃了，不尝试跟上邮件数。一些群组将大型邮件列表默认为每一个讨论，而不试图将信息定向给那些可能对其特别感兴趣的人；结果，信噪比成为了一个真正的问题。

Google tends toward email-based workflows by default. This isn’t necessarily because email is a better medium than other communications options—it often isn’t—rather, it’s because that’s what our culture is accustomed to. Keep this in mind as your organization considers what forms of communication to encourage or invest in.

谷歌默认倾向于基于电子邮件的工作流程。这并不一定是因为电子邮件是一个比其他通信选项更好的媒介——它往往不是——而是因为这是我们的文化所习惯的。当你的组织考虑要鼓励或投入什么形式的沟通时，请记住这一点。

------

### YAQS: Question-and-Answer Platform YAQS：问答平台

YAQS (“Yet Another Question System”) is a Google-internal version of a [Stack Overflow](https://oreil.ly/iTtbm)–like website, making it easy for Googlers to link to existing or work-in-progress code as well as discuss confidential information.

YAQS（"另一个问题系统"）是谷歌内部版本的[Stack Overflow](https://oreil.ly/iTtbm)——类似网站，使Googlers能够轻松地链接到现有或正在进行的代码，以及讨论机密信息。

Like Stack Overflow, YAQS shares many of the same advantages of mailing lists and adds refinements: answers marked as helpful are promoted in the user interface, and users can edit questions and answers so that they remain accurate and useful as code and facts change. As a result, some mailing lists have been superseded by YAQS, whereas others have evolved into more general discussion lists that are less focused on problem solving.

像Stack Overflow一样，YAQS分享了邮件列表的许多相同的优点，并增加了完善的功能：标记为有用的答案在用户界面上被推广，用户可以编辑问题和答案，以便随着代码和事实的变化保持准确和有用。因此，一些邮件列表已经被YAQS所取代，而其他的邮件列表已经演变成更一般的讨论列表，不再专注于解决问题。

## Scaling Your Knowledge:You Always Have Something to Teach 扩展你的知识：你总是有东西可教的
Teaching is not limited to experts, nor is expertise a binary state in which you are either a novice or an expert. Expertise is a multidimensional vector of what you know: everyone has varying levels of expertise across different areas. This is one of the reasons why diversity is critical to organizational success: different people bring different perspectives and expertise to the table (see Chapter 4). Google engineers teach others in a variety of ways, such as office hours, giving tech talks, teaching classes, writing documentation, and reviewing code.

教学不局限专家，专业知识也不是一种二元状态，你要么是新手，要么是专家。专业知识是你所知道的一个多维向量：每个人在不同领域都有不同水平的专业知识。这就是为什么多样性对组织的成功至关重要的原因之一：不同的人带来不同的观点和专业知识（见第四章）。谷歌工程师以各种方式教授他人，如办公时间、举办技术讲座、教授课程、编写文档和审查代码。

### Office Hours 固定时间
Sometimes it’s really important to have a human to talk to, and in those instances, office hours can be a good solution. Office hours are a regularly scheduled (typically weekly) event during which one or more people make themselves available to answer questions about a particular topic. Office hours are almost never the first choice for knowledge sharing: if you have an urgent question, it can be painful to wait for the next session for an answer; and if you’re hosting office hours, they take up time and need to be regularly promoted. That said, they do provide a way for people to talk to an expert in person. This is particularly useful if the problem is still ambiguous enough that the engineer doesn’t yet know what questions to ask (such as when they’re just starting to design a new service) or whether the problem is about something so specialized that there just isn’t documentation on it.

有时与人交谈非常重要，在这些情况下，固定时间是一个很好的解决方案。固定时间是一个定期安排的活动（通常是每周一次），在此期间，一个或多个人可以回答关于某个特定主题的问题。固定时间几乎从来不是知识共享的首选：如果你有一个紧急的问题，等待下一次会议的答案可能会很痛苦；如果你主持固定时间，它们会占用时间，需要定期宣传。也就是说，它们确实为人们提供了一种与专家当面交谈的方式。如果问题还很模糊，工程师还不知道该问什么问题（比如他们刚开始设计一个新的服务），或者问题是关于一个非常专业的东西，以至于没有相关的文档，那么这就特别有用。

### Tech Talks and Classes 技术讲座和课程
Google has a robust culture of both internal and external5 tech talks and classes. Our engEDU (Engineering Education) team focuses on providing Computer Science education to many audiences, ranging from Google engineers to students around the world. At a more grassroots level, our g2g (Googler2Googler) program lets Googlers sign up to give or attend talks and classes from fellow Googlers.6 The program is wildly successful, with thousands of participating Googlers teaching topics from the technical (e.g., “Understanding Vectorization in Modern CPUs”) to the just-for-fun (e.g., “Beginner Swing Dance”).

谷歌拥有强大的内部和外部5技术讲座和课程的文化。我们的engEDU（工程教育）团队专注于为许多受众提供计算机科学教育，包括谷歌工程师和世界各地的学生。在更底层的层面上，我们的g2g（Googler2Googler）计划让Googlers报名参加，以举办或参加Googlers同伴的讲座和课程。该计划非常成功，有数千名Googlers参与，教授的主题从技术（如 "了解现代CPU的矢量化"）到只是为了好玩（如 "初级摇摆舞"）。

Tech talks typically consist of a speaker presenting directly to an audience. Classes, on the other hand, can have a lecture component but often center on in-class exercises and therefore require more active participation from attendees. As a result, instructor-led classes are typically more demanding and expensive to create and maintain than tech talks and are reserved for the most important or difficult topics. That said, after a class has been created, it can be scaled relatively easily because many instructors can teach a class from the same course materials. We’ve found that classes tend to work best when the following circumstances exist:  
-   The topic is complicated enough that it’s a frequent source of misunderstanding. Classes take a lot of work to create, so they should be developed only when they’re addressing specific needs.
-   The topic is relatively stable. Updating class materials is a lot of work, so if the subject is rapidly evolving, other forms of sharing knowledge will have a better bang for the buck.
-   The topic benefits from having teachers available to answer questions and provide personalized help. If students can easily learn without directed help, self- serve mediums like documentation or recordings are more efficient. A number of introductory classes at Google also have self-study versions.
-   There is enough demand to offer the class regularly. Otherwise, potential learners will get the information they need in other ways rather than waiting for the class. At Google, this is particularly a problem for small, geographically remote offices.

技术讲座通常由演讲者直接向听众介绍。另一方面，课堂可以有讲座的部分，但往往以课堂练习为中心，因此需要与会者更积极地参与。因此，与技术讲座相比，教师授课的课程在创建和维护方面通常要求更高、成本也更高，而且只保留给最重要或最难的主题。也就是说，在一个课程创建之后，它的规模可以相对容易地扩大，因为许多教员可以用同样的课程材料来教课。我们发现，当存在以下情况时，课程往往效果最好：  
- 主题足够复杂，以至于经常出现误解。课程的创建需要大量的工作，因此只有在满足特定需求时才能开发。
- 该主题相对稳定。更新课堂材料是一项大量的工作，所以如果该主题快速发展，其他形式的知识共享将有更好的回报。
- 该主题得益于有教师回答问题和提供个性化的帮助。如果学生可以在没有指导帮助的情况下轻松学习，那么像文档或录音这样的自我服务媒介就会更有效率。谷歌的一些介绍性课程也有自学版本。
- 有足够的需求定期提供课程。否则，潜在的学习者会通过其他方式获得他们需要的信息，而不是等待课程。在谷歌，这对于地理位置偏远的小型办公室来说尤其是一个问题。

```
5	https://talksat.withgoogle.com and https://www.youtube.com/GoogleTechTalks, to name a few.
6	The g2g program is detailed in: Laszlo Bock, Work Rules!: Insights from Inside Google That Will Transform How You Live and Lead (New York: Twelve Books, 2015). It includes descriptions of different aspects of the program as well as how to evaluate impact and recommendations for what to focus on when setting up similar programs.
6  g2g程序详见。Laszlo Bock, Work Rules! 来自谷歌内部的洞察力，将改变你的生活和领导方式（纽约：十二书局，2015年）。该书包括对该计划不同方面的描述，以及如何评估影响，并就设立类似计划时应关注的内容提出建议。
```

### Documentation 文档
Documentation is written knowledge whose primary goal is to help its readers learn something. Not all written knowledge is necessarily documentation, although it can be useful as a paper trail. For example, it’s possible to find an answer to a problem in a mailing list thread, but the primary goal of the original question on the thread was to seek answers, and only secondarily to document the discussion for others.

文档是书面知识，其主要目的是帮助读者学习一些东西。并非所有的书面知识都一定是文档，尽管它可以用作书面记录。例如，有可能在一个邮件列表线索中找到一个问题的答案，但线索上的原始问题的主要目标是寻求答案，其次才是为其他人记录讨论情况。

In this section, we focus on spotting opportunities for contributing to and creating formal documentation, from small things like fixing a typo to larger efforts such as documenting tribal knowledge.

在这一节中，我们着重于发现为正式文件做出贡献的机会，小到修正一个错别字，大到记录内部知识等。

#### Updating documentation 更新文档
The first time you learn something is the best time to see ways that the existing documentation and training materials can be improved. By the time you’ve absorbed and understood a new process or system, you might have forgotten what was difficult or what simple steps were missing from the “Getting Started” documentation. At this stage, if you find a mistake or omission in the documentation, fix it! Leave the campground cleaner than you found it,7 and try to update the documents yourself, even when that documentation is owned by a different part of the organization.

你第一次学习某样东西的时候，最好是看看如何改进现有的文档和培训材料。当你吸收并理解了一个新的流程或系统时，你可能已经忘记了 "入门 "文档中的难点或缺少哪些简单的步骤文档。在这个阶段，如果你发现文件中的错误或遗漏，就把它改正过来! 离开营地时要比你发现时更干净，并尝试自己更新文件，即使文档属于组织的其他部门。

At Google, engineers feel empowered to update documentation regardless of who owns it—and we often do—even if the fix is as small as correcting a typo. This level of community upkeep increased notably with the introduction of g3doc,8 which made it much easier for Googlers to find a documentation owner to review their suggestion. It also leaves an auditable trail of change history no different than that for code.

在谷歌，工程师们觉得无论文档的所有者是谁，都有权更新文档——我们经常这样做——即使修复的范围很小，比如纠正一个拼写错误。这种社区维护的水平随着g3doc的引入而明显提高，这使得Googlers更容易找到一个文档的所有者来审查他们的建议。这也让可审核的变更历史记录与代码的变更历史记录相同。

#### Creating documentation 创建文档
As your proficiency grows, write your own documentation and update existing docs. For example, if you set up a new development flow, document the steps. You can then make it easier for others to follow in your path by pointing them to your document. Even better, make it easier for people to find the document themselves. Any sufficiently undiscoverable or unsearchable documentation might as well not exist. This is another area in which g3doc shines because the documentation is predictably located right next to the source code, as opposed to off in an (unfindable) document or webpage somewhere.

随着你的熟练程度的提高，编写你自己的文档并更新现有的文档。例如，如果你建立了一个新的开发流程，就把这些步骤记录下来。然后，你可以让别人更容易沿着你的道路走下去，把他们引导到你的文档。甚至更好的是，让人们自己更容易找到这个文件。任何足以让人无法发现或无法搜索的文件都可能不存在。这是g3doc大放异彩的另一个领域，因为文档可预测地位于源代码旁边，而不是在某个（无法找到的）文档或网页上。

Finally, make sure there’s a mechanism for feedback. If there’s no easy and direct way for readers to indicate that documentation is outdated or inaccurate, they are likely not to bother telling anyone, and the next newcomer will come across the same problem. People are more willing to contribute changes if they feel that someone will actually notice and consider their suggestions. At Google, you can file a documentation bug directly from the document itself.

最后，确保有一个反馈的机制。如果没有简单直接的方法让读者指出文档过时或不准确，他们很可能懒得告诉别人，而下一个新来的人也会遇到同样的问题。如果人们觉得有人会真正注意到并考虑他们的建议，他们就会更愿意做出改变。在谷歌，你可以直接从文档本身提交一个文档错误。

In addition, Googlers can easily leave comments on g3doc pages. Other Googlers can see and respond to these comments and, because leaving a comment automatically files a bug for the documentation owner, the reader doesn’t need to figure out who to contact.

此外，Googlers可以轻松地在g3doc页面上留下评论。其他Googlers可以看到并回复这些评论，而且，由于留下评论会自动为文档拥有者归档一个错误，读者不需要弄清楚该与谁联系。

####  Promoting documentation  推广文档
Traditionally, encouraging engineers to document their work can be difficult. Writing documentation takes time and effort that could be spent on coding, and the benefits that result from that work are not immediate and are mostly reaped by others. Asymmetrical trade-offs like these are good for the organization as a whole given that many people can benefit from the time investment of a few, but without good incentives, it can be challenging to encourage such behavior. We discuss some of these structural incentives in the section “Incentives and recognition” on page 57.

传统上，鼓励工程师记录他们的工作可能是困难的。编写文档需要消耗编码的时间和精力，而且这些工作所带来的好处并不直接，大部分是由其他人获益的。鉴于许多人可以从少数人的时间中获益，像这样的不对称权衡对整个组织来说是好的，但如果没有好的激励措施，鼓励这样的行为是很有挑战性的。我们在第57页的 "激励和认可 "一节中讨论了其中的一些结构性激励。

However, a document author can often directly benefit from writing documentation. Suppose that team members always ask you for help debugging certain kinds of production failures. Documenting your procedures requires an upfront investment of time, but after that work is done, you can save time in the future by pointing team members to the documentation and providing hands-on help only when needed.

然而，文档作者往往可以直接从编写文档中受益。假设团队成员总是向你寻求帮助，以调试某些种类的生产故障。记录你的程序需要前期的时间投入，但在这项工作完成后，你可以在未来节省时间，指点团队成员去看文档，只在需要时提供动手帮助。

Writing documentation also helps your team and organization scale. First, the information in the documentation becomes canonicalized as a reference: team members can refer to the shared document and even update it themselves. Second, the canonicalization may spread outside the team. Perhaps some parts of the documentation are not unique to the team’s configuration and become useful for other teams looking to resolve similar problems.

编写文档也有助于你的团队和组织的扩展。首先，文档中的信息成为规范化的参考：团队成员可以参考共享的文档，甚至自己更新它。其次，规范化可能扩散到团队之外。也许文档中的某些部分对团队的配置来说并不独特，对其他想要解决类似问题的团队来说变得有用。

```
7	See “The Boy Scout Rule” and Kevlin Henney, 97 Things Every Programmer Should Know (Boston: O’Reilly, 2010).
8	g3doc stands for “google3 documentation.” google3 is the name of the current incarnation of Google’s monolithic source repository.
g3doc是 "google3文档 "的缩写。google3是谷歌单仓库源码库的当前化身的名称。
```

### Code 代码
At a meta level, code is knowledge, so the very act of writing code can be considered a form of knowledge transcription. Although knowledge sharing might not be a direct intent of production code, it is often an emergent side effect, which can be facilitated by code readability and clarity.

在元层面上，代码就是知识，所以写代码的行为本身可以被认为是一种知识的转录。虽然知识共享可能不是生产代码的直接目的，但它往往是一个副产品，它可以通过代码的可读性和清晰性来促进。

Code documentation is one way to share knowledge; clear documentation not only benefits consumers of the library, but also future maintainers. Similarly, implementation comments transmit knowledge across time: you’re writing these comments expressly for the sake of future readers (including Future You!). In terms of trade- offs, code comments are subject to the same downsides as general documentation: they need to be actively maintained or they can quickly become out of date, as anyone who has ever read a comment that directly contradicts the code can attest.

代码文档是分享知识的一种方式；清晰的文档不仅有利于库的使用者，而且也有利于后继的维护者。同样地，实现注释也能跨时空传播知识：你写这些注释是为了未来的读者（包括未来的你！）。就权衡利弊而言，代码注释和一般的文档一样有缺点：它们需要积极维护，否则很快就会过时，任何读过与代码直接矛盾的注释的人都可以证明这一点。

Code reviews (see Chapter 9) are often a learning opportunity for both author(s) and reviewer(s). For example, a reviewer’s suggestion might introduce the author to a new testing pattern, or a reviewer might learn of a new library by seeing the author use it in their code. Google standardizes mentoring through code review with the readability process, as detailed in the case study at the end of this chapter.

代码审查（见第9章）对作者和审查者来说都是一个学习机会。例如，审查者的建议可能会给作者带来新的测试模式，或者审查者可能通过看到作者在他们的代码中使用一个新的库来了解它。谷歌通过代码审查的可读性过程来规范指导，在本章末尾的案例研究中详细介绍了这一点。

## Scaling Your Organization’s Knowledge 扩展组织的知识
Ensuring that expertise is appropriately shared across the organization becomes more difficult as the organization grows. Some things, like culture, are important at every stage of growth, whereas others, like establishing canonical sources of information, might be more beneficial for more mature organizations.

随着组织的发展，确保专业知识在整个组织内得到适当的分享变得更加困难。有些事情，比如文化，在每一个成长阶段都很重要，而其他事情，比如建立规范的信息源，可能对更成熟的组织更有利。

### Cultivating a Knowledge-Sharing Culture 培养知识共享文化
Organizational culture is the squishy human thing that many companies treat as an afterthought. But at Google, we believe that focusing on the culture and environment first9 results in better outcomes than focusing on only the output—such as the code— of that environment.

组织文化是许多公司视为事后诸葛亮的东西。但在谷歌，我们相信首先关注文化和环境会比只关注该环境的产出（如代码）带来更好的结果。

Making major organizational shifts is difficult, and countless books have been written on the topic. We don’t pretend to have all the answers, but we can share specific steps Google has taken to create a culture that promotes learning.
See the book Work Rules 10 for a more in-depth examination of Google’s culture.

进行重大的组织转变是很难的，关于这个主题的书已经不计其数。我们并不假设拥有所有的答案，但我们可以分享谷歌为创造一种促进学习的文化而采取的具体步骤。

请参阅《工作规则》（Work Rules!: Insights From Inside *Google* That Will TransformLaszlo BockGrand Central Publis）一书，对谷歌的文化进行更深入的研究。

### Respect 尊重
The bad behavior of just a few individuals can make an entire team or community unwelcoming. In such an environment, novices learn to take their questions elsewhere, and potential new experts stop trying and don’t have room to grow. In the worst cases, the group reduces to its most toxic members. It can be difficult to recover from this state.

仅仅几个人的不良行为就可以使整个团队或社区不受欢迎。在这样的环境中，新手将会把问题转移到其他地方，而潜在的新专家则停止尝试，没有成长的空间。在最糟糕的情况下，这个团体会只剩下有有毒的成员。要从这种状态中恢复过来很困难。

Knowledge sharing can and should be done with kindness and respect. In tech, tolerance—or worse, reverence—of the “brilliant jerk” is both pervasive and harmful, but being an expert and being kind are not mutually exclusive. The Leadership section of Google’s software engineering job ladder outlines this clearly:
	Although a measure of technical leadership is expected at higher levels, not all leadership is directed at technical problems. Leaders improve the quality of the people around them, improve the team’s psychological safety, create a culture of teamwork and collaboration, defuse tensions within the team, set an example of Google’s culture and values, and make Google a more vibrant and exciting place to work. Jerks are not good leaders.

知识分享可以而且应该以善意和尊重的方式进行。在科技界，对 "聪明的混蛋 "的容忍——还有更糟糕的是，崇尚 "聪明的混蛋"，即是普遍又是危害的，但作为一个专家和善良并不互斥。谷歌软件工程职位阶梯的领导力部分清楚地概述了这一点：
	虽然在更高的层次上需要衡量技术领导力，但并非所有的领导力都针对技术问题。领导者可以提高周围人的素质，改善团队的心理安全，创造团队合作文化，化解团队内部的紧张情绪，树立谷歌文化和价值观的榜样，让谷歌成为一个更具活力和激情的工作场所。混蛋不是好领导。

This expectation is modeled by senior leadership: Urs Hölzle (Senior Vice President of Technical Infrastructure) and Ben Treynor Sloss (Vice President, Founder of Google SRE) wrote a regularly cited internal document (“No Jerks”) about why Googlers should care about respectful behavior at work and what to do about it.

这种期望是由高级领导层示范的:Urs Hölzle（技术基础设施高级副总裁）和Ben Treynor Sloss（副总裁，谷歌SRE的创始人）写了一份经常被引用的内部文件（"No Jerks"），说明为什么谷歌人应该关心工作中的尊重行为以及如何做。

### ntives and recognition  奖励和认可
Good culture must be actively nurtured, and encouraging a culture of knowledge sharing requires a commitment to recognizing and rewarding it at a systemic level. It’s a common mistake for organizations to pay lip service to a set of values while actively rewarding behavior that does not enforce those values. People react to incentives over platitudes, and so it’s important to put your money where your mouth is by putting in place a system of compensation and awards.

良好的文化必须积极培育，而鼓励知识共享的文化需要获得在系统层面上认可和奖励。一个常见的错误是，组织在口头上支持一套价值观的同时，积极奖励那些不执行这些价值观的行为。人们对语言的表扬很难有感觉，因此，通过建立薪酬和奖励制度，把钱放在嘴边就很重要的。

Google uses a variety of recognition mechanisms, from company-wide standards such as performance review and promotion criteria to peer-to-peer awards between Googlers.

谷歌使用了各种认可机制，从全公司的标准，如绩效审查和晋升标准到谷歌员工同行奖励。

Our software engineering ladder, which we use to calibrate rewards like compensation and promotion across the company, encourages engineers to share knowledge by noting these expectations explicitly. At more senior levels, the ladder explicitly calls out the importance of wider influence, and this expectation increases as seniority increases. At the highest levels, examples of leadership include the following:  
- Growing future leaders by serving as mentors to junior staff, helping them develop both technically and in their Google role
- Sustaining and developing the software community at Google via code and design reviews, engineering education and development, and expert guidance to others in the field

我们的软件工程师级别用于校准整个公司的薪酬和晋升等奖励，通过明确记录这些期望，鼓励工程师分享知识。在更高的层次上，级别明确指出了更广泛影响力的重要性，这种期望随着资历的增加而增加。在最高级别，领导力的例子包括以下内容：  
-   通过担任初级员工的导师，帮助他们在技术和谷歌角色上发展，培养未来的领导者。
-   通过代码和设计审查、工程教育和开发以及对该领域其他人的专家指导，维持和发展谷歌的软件社区。

Job ladder expectations are a top-down way to direct a culture, but culture is also formed from the bottom up. At Google, the peer bonus program is one way we embrace the bottom-up culture. Peer bonuses are a monetary award and formal recognition that any Googler can bestow on any other Googler for above-and-beyond work.11 For example, when Ravi sends a peer bonus to Julia for being a top contributor to a mailing list—regularly answering questions that benefit many readers—he is publicly recognizing her knowledge-sharing work and its impact beyond her team. Because peer bonuses are employee driven, not management driven, they can have an important and powerful grassroots effect.

工作阶梯的期望是一种自上而下引导文化的方式，但文化也是自下而上形成的。在谷歌，同行奖金计划是我们拥抱自下而上文化的一种方式。同行奖金是一种货币奖励和正式认可，任何谷歌员工都可以将其授予任何其他谷歌员工，以表彰他们的超越性工作。例如，当Ravi将同行奖金发给Julia，因为她是一个邮件列表的顶级贡献者——定期回答问题，使许多读者受益，他公开承认她的知识共享工作及其对团队以外的影响。由于同行奖金是由员工驱动的，而不是由管理层驱动的，因此它们可以产生重要而强大的基层效应。

Similar to peer bonuses are kudos: public acknowledgement of contributions (typically smaller in impact or effort than those meriting a peer bonus) that boost the visibility of peer-to-peer contributions.

与同行奖金相似的是嘉奖：对贡献的公开承认（通常比那些值得同行奖金的影响或努力要小），提高同行贡献的知名度。

When a Googler gives another Googler a peer bonus or kudos, they can choose to copy additional groups or individuals on the award email, boosting recognition of the peer’s work. It’s also common for the recipient’s manager to forward the award email to the team to celebrate one another’s achievements.

当一个Googler给另一个Googler颁发同行奖金或嘉奖时，他们可以选择在奖励邮件上抄送其他组或个人，提高对同行工作的认可。收件人的经理将奖励邮件转发给团队以庆祝彼此的成就也很常见。

A system in which people can formally and easily recognize their peers is a powerful tool for encouraging peers to keep doing the awesome things they do. It’s not the bonus that matters: it’s the peer acknowledgement.

一个人们可以正式和容易地认可他们的同行系统是一个强大的工具，可以鼓励同行继续做他们所做的了不起的事情。重要的不是奖金：而是同行的认可。

```
11 Peer bonuses include a cash award and a certificate as well as being a permanent part of a Googler’s award record in an internal tool called gThanks.
11  同行奖金包括现金奖励和证书，以及在一个名为gThanks的内部工具中成为Googler奖励记录的永久组成部分。
```

### Establishing Canonical Sources of Information 建立规范的信息源
Canonical sources of information are centralized, company-wide corpuses of information that provide a way to standardize and propagate expert knowledge. They work best for information that is relevant to all engineers within the organization, which is otherwise prone to information islands. For example, a guide to setting up a basic developer workflow should be made canonical, whereas a guide for running a local Frobber instance is more relevant just to the engineers working on Frobber.

规范的信息源是集中的、公司范围的信息库，提供了一种标准化和传播专家知识的方法。它们最适用于与组织内所有工程师相关的信息，否则容易出现信息孤岛。例如，建立一个基本的开发者工作流程的指南应该成为规范，而运行一个本地Frobber实例的指南则只与从事Frobber的工程师有关。

Establishing canonical sources of information requires higher investment than maintaining more localized information such as team documentation, but it also has broader benefits. Providing centralized references for the entire organization makes broadly required information easier and more predictable to find and counters problems with information fragmentation that can arise when multiple teams grappling with similar problems produce their own—often conflicting—guides.

建立规范的信息源需要比主要获取更本地化的信息（如团队文档）更高的投资，但也有更多的好处。为整个组织提供集中的参考资料，使广泛需要的信息更容易找到，也更可预测，并解决了信息碎片化的问题，因为这些问题可能会在多个处理类似问题的团队制定自己的指南时出现，这些指南往往相互冲突。

Because canonical information is highly visible and intended to provide a shared understanding at the organizational level, it’s important that the content is actively maintained and vetted by subject matter experts. The more complex a topic, the more critical it is that canonical content has explicit owners. Well-meaning readers might see that something is out of date but lack the expertise to make the significant structural changes needed to fix it, even if tooling makes it easy to suggest updates.

因为规范信息是高度可见的，并且旨在提供组织层面的共同理解，所以内容由主题专家积极维护和审核是很重要的。主题越复杂，规范内容的所有者就越明确。善意的读者可能会看到某些东西已经过时，但缺乏进行修复所需的重大结构更改的专业知识，即使工具可以很容易地提出更新建议。

Creating and maintaining centralized, canonical sources of information is expensive and time consuming, and not all content needs to be shared at an organizational level. When considering how much effort to invest in this resource, consider your audience. Who benefits from this information? You? Your team? Your product area? All engineers?

创建和维护集中的、规范的信息来源是昂贵和耗时的，而且不是所有的内容都需要在组织层面上共享。当考虑在这个资源上投入多少精力时，要考虑你的受众。谁会从这些信息中受益？你吗？你的团队？你的产品领域？所有的工程师？

#### Developer guides  开发者指南 
Google has a broad and deep set of official guidance for engineers, including style guides, official software engineering best practices,12 guides for code review13 and testing,14 and Tips of the Week (TotW).15

谷歌为工程师提供了一套广泛而深入的官方指导，包括风格指南、官方软件工程最佳实践、代码审查和测试指南以及每周提示（TotW）。

The corpus of information is so large that it’s impractical to expect engineers to read it all end to end, much less be able to absorb so much information at once. Instead, a human expert already familiar with a guideline can send a link to a fellow engineer, who then can read the reference and learn more. The expert saves time by not needing to personally explain a company-wide practice, and the learner now knows that there is a canonical source of trustworthy information that they can access whenever necessary. Such a process scales knowledge because it enables human experts to recognize and solve a specific information need by leveraging common, scalable resources.

信息库是如此之大，以至于期望工程师从头到尾读完它是不切实际的，更不用说能够一次吸收这么多信息了。相反，已经熟悉某项准则的专家可以将链接发送给工程师同事，他们可以阅读参考资料并了解更多信息。专家不需要亲自解释公司范围内的做法，从而节省了时间，而学习者现在知道有一个值得信赖的信息的典型来源，他们可以在需要时访问。这样过程可以扩展知识，因为它使专家能够通过利用共同的、可扩展的资源来重新认识和解决特定的信息需求。

```
12	Such as books about software engineering at Google.
13	See Chapter 9.
14	See Chapter 11.
15	Available for multiple languages. Externally available for C++ at https://abseil.io/tips.

12 如谷歌公司有关软件工程的书籍。
13 见第9章。
14 见第11章。
15 可用于多种语言。对外可用于C++，在https://abseil.io/tips。
```

#### go/links
go/links (sometimes referred to as goto/ links) are Google’s internal URL shortener.16 Most Google-internal references have at least one internal go/ link. For example, “go/ spanner” provides information about Spanner, “go/python” is Google’s Python developer guide. The content can live in any repository (g3doc, Google Drive, Google Sites, etc.), but having a go/ link that points to it provides a predictable, memorable way to access it. This yields some nice benefits:
•	- go/links are so short that it’s easy to share them in conversation (“You should check out go/frobber!”). This is much easier than having to go find a link and then send a message to all interested parties. Having a low-friction way to share references makes it more likely that that knowledge will be shared in the first place.
•	- go/links provide a permalink to the content, even if the underlying URL changes. When an owner moves content to a different repository (for example, moving content from a Google doc to g3doc), they can simply update the go/link’s target URL. The go/link itself remains unchanged.

go/links（有时被称为goto/链接）是谷歌的内部URL缩短器。大多数谷歌内部的参考资料至少有一个内部go/links。例如，"go/spanner "提供关于Spanner的信息，"go/python "是谷歌的Python开发者指南。这些内容可以存在于任何资源库中（g3doc、Google Drive、Google Sites等），但有一个指向它的go/links提供了一种可预测的、可记忆的访问方式。这产生了一些很好的好处：
- go/links非常短，很容易在谈话中分享它们（"你应该看看go/frobber！"）。这比去找一个链接，然后给所有感兴趣的人发一个消息要容易得多。有一个低成本的方式来分享参考资料，使得这些知识更有可能在第一时间被分享。
- go/links提供内容的固定链接，即使底层的URL发生变化。当所有者将内容移到一个不同的资源库时（例如，将内容从Google doc移到g3doc），他们可以简单地更新go/link的目标URL。go/link本身保持不变。

go/links are so ingrained into Google culture that a virtuous cycle has emerged: a Googler looking for information about Frobber will likely first check go/frobber. If the go/ link doesn’t point to the Frobber Developer Guide (as expected), the Googler will generally configure the link themselves. As a result, Googlers can usually guess the correct go/link on the first try.

go/links在谷歌文化中根深蒂固，以至于出现了一个良性循环：一个寻找Frobber信息的Googler可能会首先查看go/frobber。如果go/links没有指向Frobber开发者指南（如预期），Googler一般会自己配置链接。因此，Googler通常可以在第一次尝试时猜出正确的go/links。

#### Codelabs 代码实验室
Google codelabs are guided, hands-on tutorials that teach engineers new concepts or processes by combining explanations, working best-practice example code, and code exercises.17 A canonical collection of codelabs for technologies broadly used across Google is available at go/codelab. These codelabs go through several rounds of formal review and testing before publication. Codelabs are an interesting halfway point between static documentation and instructor-led classes, and they share the best and worst features of each. Their hands-on nature makes them more engaging than traditional documentation, but engineers can still access them on demand and complete them on their own; but they are expensive to maintain and are not tailored to the learner’s specific needs.

Google codelabs是有指导的实践教程，通过结合解释、工作中的最佳实践示例代码和代码练习，向工程师传授新概念或流程。go/codelab上提供了一个规范的codelabs集合，用于Google广泛使用的技术。这些代码集在发布前经过了几轮正式的审查和测试。Codelabs是介于静态文档和讲师指导课程之间的一个有趣的中间点，它们分享了两者的最佳和最差的特点。它们的实践性使它们比传统的文档更有吸引力，但工程师仍然可以按需访问它们，并自行完成；但它们的维护成本很高，而且不适合学习者的特定需求。

```
16	go/ links are unrelated to the Go language.
go/link与go语言无关。
17	External codelabs are available at https://codelabs.developers.google.com.
17 外部代码实验室可在https://codelabs.developers.google.com。
```

#### Static analysis 静态分析
Static analysis tools are a powerful way to share best practices that can be checked programmatically. Every programming language has its own particular static analysis tools, but they have the same general purpose: to alert code authors and reviewers to ways in which code can be improved to follow style and best practices. Some tools go one step further and offer to automatically apply those improvements to the code.

静态分析工具是分享编程检查最佳实践的强大方式。每种编程语言都有其特定的静态分析工具，它们有相同的共同目的：提醒代码作者和审查者注意可以改进代码的方式，以遵循规范和最佳实践。有些工具更进一步，提供自动将这些改进应用到代码中。

Setting up static analysis tools requires an upfront investment, but as soon as they are in place, they scale efficiently. When a check for a best practice is added to a tool, every engineer using that tool becomes aware of that best practice. This also frees up engineers to teach other things: the time and effort that would have gone into manually teaching the (now automated) best practice can instead be used to teach something else. Static analysis tools augment engineers’ knowledge. They enable an organization to apply more best practices and apply them more consistently than would otherwise be possible.

设置静态分析工具需要前期投入，但一旦这些工具到位，它们就会有效地扩展。当最佳实践的检查被添加到一个工具中时，每个使用该工具的工程师都会意识到这是最佳实践。这也使工程师们可以腾出时间来教其他东西：原本用于手动教授（现在是自动的）最佳实践的时间和精力，可以用来教授其他东西。静态分析工具增强了工程师的知识。它们使一个组织能够应用更多的最佳实践，并比其他方式更一致地应用它们。

### Staying in the Loop 保持互动
Some information is critical to do one’s job, such as knowing how to do a typical development workflow. Other information, such as updates on popular productivity tools, is less critical but still useful. For this type of knowledge, the formality of the information sharing medium depends on the importance of the information being delivered. For example, users expect official documentation to be kept up to date, but typically have no such expectation for newsletter content, which therefore requires less maintenance and upkeep from the owner.

有些信息对于完成工作至关重要，例如知道如何执行典型的开发工作流。其他的信息，比如流行的生产力工具的更新，虽然不那么关键，但仍然有用。对于这种类型的知识，信息共享媒介的正式性取决于所传递信息的重要性。例如，用户希望官方文档保持最新，但通常对新闻稿内容没有这样的期待，因此新闻稿内容需要所有者进行较少的维护和保养。

#### Newsletters 时事通讯
Google has a number of company-wide newsletters that are sent to all engineers, including EngNews (engineering news), Ownd (Privacy/Security news), and Google’s Greatest Hits (report of the most interesting outages of the quarter). These are a good way to communicate information that is of interest to engineers but isn’t mission critical. For this type of update, we’ve found that newsletters get better engagement when they are sent less frequently and contain more useful, interesting content. Otherwise, newsletters can be perceived as spam.

谷歌有一些发给所有工程师的公司范围内的新闻简报，包括EngNews（工程新闻），Ownd（隐私/安全新闻），以及谷歌的Greatest Hits（本季度最有趣的故障报告）。这些都是传达工程师感兴趣但并非关键任务的信息的好方法。对于这种类型的更新，我们发现，如果通讯发送的频率较低，并且包含更多有用的、有趣的内容，就会得到更好的参与度。否则，通讯会被认为是垃圾邮件。

Even though most Google newsletters are sent via email, some are more creative in their distribution. Testing on the Toilet (testing tips) and Learning on the Loo (productivity tips) are single-page newsletters posted inside toilet stalls. This unique delivery medium helps the Testing on the Toilet and Learning on the Loo stand out from other newsletters, and all issues are archived online.

尽管大多数谷歌新闻通讯都是通过电子邮件发送的，但有些新闻通讯的发送方式更有创意。厕所测试（测试提示）和厕所学习（产品活动提示）是张贴在厕所里的单页新闻通讯。这种独特的发送媒介帮助厕所测试和厕所学习从其他新闻通讯中脱颖而出，而且所有期刊都在在线存档。

#### Communities 社区
Googlers like to form cross-organizational communities around various topics to share knowledge. These open channels make it easier to learn from others outside your immediate circle and avoid information islands and duplication. Google Groups are especially popular: Google has thousands of internal groups with varying levels of formality. Some are dedicated to troubleshooting; others, like the Code Health group, are more for discussion and guidance. Internal Google+ is also popular among Googlers as a source of informal information because people will post interesting technical breakdowns or details about projects they are working on.

谷歌人喜欢围绕各种主题建立跨组织的社区和分享知识。这些开放的渠道可以让你更容易地向周围的人学习，避免信息孤岛和重复。谷歌群组尤其受欢迎：谷歌有数千个内部团体，形式各异。有些专门用于故障排除；其他人，如代码健康小组，更多的是讨论和指导。内部Google+作为非正式信息来源在谷歌用户中也很受欢迎，因为人们会发布有趣的技术分类或他们正在从事的项目的详细信息。

## Readability: Standardized Mentorship Through Code Review 可读性：通过代码审查实现标准化指导

At Google, “readability” refers to more than just code readability; it is a standardized, Google-wide mentorship process for disseminating programming language best practices. Readability covers a wide breadth of expertise, including but not limited to language idioms, code structure, API design, appropriate use of common libraries, documentation, and test coverage.

在谷歌，"可读性 "指的不仅仅是代码的可读性；这是一个标准化的、谷歌范围内的指导过程，用于传播编程语言最佳实践。可读性涵盖了广泛的专业知识，包括但不限于语言语义、代码结构、API设计、通用库的正确使用、文档和测试覆盖率。

Readability started as a one-person effort. In Google’s early days, Craig Silverstein (employee ID #3) would sit down in person with every new hire and do a line-by-line “readability review” of their first major code commit. It was a nitpicky review that covered everything from ways the code could be improved to whitespace conventions. This gave Google’s codebase a uniform appearance but, more important, it taught best practices, highlighted what shared infrastructure was available, and showed new hires what it’s like to write code at Google.

可读性最初是一个人的努力。在谷歌早期，Craig Silverstein（员工ID#3）会亲自与每一位新员工坐下来，逐行对他们的第一个主要代码提交进行“可读性审查”。这是一次挑剔的审查，涵盖了从代码改进到空白约定的所有方面。这让谷歌的代码库有了统一的模式，但更重要的是，它教授了最佳实践，强调了什么是可用的共享基础设施，并向新员工展示了在谷歌编写代码的感觉。

Inevitably, Google’s hiring rate grew beyond what one person could keep up with. So many engineers found the process valuable that they volunteered their own time to scale the program. Today, around 20% of Google engineers are participating in the readability process at any given time, as either reviewers or code authors.

不可避免地，谷歌的招聘速度越来越快，超出了一个人的能力范围。如此多的工程师发现这个过程很有价值，于是他们自愿拿出自己的时间来扩展这个项目。今天，大约有20%的谷歌工程师在任何时候都在参与可读性进程，他们要么是审查员，要么是代码作者。

### What Is the Readability Process?  什么是可读性过程？
Code review is mandatory at Google. Every changelist (CL)18 requires readability approval, which indicates that someone who has readability certification for that language has approved the CL. Certified authors implicitly provide readability approval of their own CLs; otherwise, one or more qualified reviewers must explicitly give readability approval for the CL. This requirement was added after Google grew to a point where it was no longer possible to enforce that every engineer received code reviews that taught best practices to the desired rigor.

在谷歌，代码审查是强制性的。每个变更列表（CL）都需要可读性批准，这表明拥有该语言的可读性认证的人已经批准了该CL。经过认证的作者隐含地对他们自己的CL提供可读性批准；否则，一个或多个合格的审查员必须明确地对CL提供可读性批准。这项要求是在谷歌发展到无法强制要求每个工程师接受代码审查，从而将最佳实践传授到所需的严格程度之后添加的。

Within Google, having readability certification is commonly referred to as “having readability” for a language. Engineers with readability have demonstrated that they consistently write clear, idiomatic, and maintainable code that exemplifies Google’s best practices and coding style for a given language. They do this by submitting CLs through the readability process, during which a centralized group of readability reviewers review the CLs and give feedback on how much it demonstrates the various areas of mastery. As authors internalize the readability guidelines, they receive fewer and fewer comments on their CLs until they eventually graduate from the process and formally receive readability. Readability brings increased responsibility: engineers with readability are trusted to continue to apply their knowledge to their own code and to act as reviewers for other engineers’ code.

在谷歌内部，拥有可读性认证通常被称为一门语言的 "可读性"。拥有可读性认证的工程师已经证明，他们始终如一地写出清晰、习惯和可维护的代码，体现了谷歌对特定语言的最佳实践和编码风格。他们通过可读性程序提交CL，在此过程中，一个集中的可读性审查员小组审查CL，并就它在多大程度上展示了各个领域的掌握程度给出反馈。随着作者对可读性准则的内化，他们收到的关于他们的CL的评论越来越少，直到他们最终从这个过程中毕业并正式获得可读性。可读性带来了更多的责任：拥有可读性的工程师被信任，可以继续将他们的知识应用于他们自己的代码，并作为其他工程师的代码的审查者。

Around 1 to 2% of Google engineers are readability reviewers. All reviewers are volunteers, and anyone with readability is welcome to self-nominate to become a readability reviewer. Readability reviewers are held to the highest standards because they are expected not just to have deep language expertise, but also an aptitude for teaching through code review. They are expected to treat readability as first and foremost a mentoring and cooperative process, not a gatekeeping or adversarial one. Readability reviewers and CL authors alike are encouraged to have discussions during the review process. Reviewers provide relevant citations for their comments so that authors can learn about the rationales that went into the style guidelines (“Chesterson’s fence”). If the rationale for any given guideline is unclear, authors should ask for clarification (“ask questions”).

大约有1%到2%的谷歌工程师是可读性审查员。所有的审查员都是志愿者，任何有可读性的人都欢迎自我提名成为可读性审查员。可读性审查员被要求达到最高标准，因为他们不仅要有深厚的语言专业知识，还要有通过代码审查进行教学的能力。他们被期望把可读性首先作为一个指导和合作的过程，而不是一个把关或对抗的过程。我们鼓励可读性审查员和CL作者在审查过程中进行讨论。审查人为他们的评论提供相关的引文，这样作者就可以了解制定文体指南的理由（"切斯特森的篱笆"）。如果任何特定准则的理由不清楚，作者应该要求澄清（"提问"）。

```
18  A changelist is a list of files that make up a change in a version control system. A changelist is synonymous with a changeset.
18   变更列表是构成版本控制系统中的一个变更的文件列表。变更列表与变更集是同义的。
```
Readability is deliberately a human-driven process that aims to scale knowledge in a standardized yet personalized way. As a complementary blend of written and tribal knowledge, readability combines the advantages of written documentation, which can be accessed with citable references, with the advantages of expert human reviewers, who know which guidelines to cite. Canonical guidelines and language recommendations are comprehensively documented—which is good!—but the corpus of information is so large19 that it can be overwhelming, especially to newcomers.

可读性是一个人为驱动的过程，旨在以标准化但个性化的方式扩展知识。作为书面知识和内部知识的互补混合体，可读性结合了书面文件的优势，可以通过可引用的参考文献来获取，也结合了专家审查员的优势，他们知道应该引用哪些指南。典范指南和语言建议被全面地记录下来——这很好！——但信息的语料库非常大，可能会让人不知所措，特别是对新人来说。

### Why Have This Process? 为什么有这个过程？
Code is read far more than it is written, and this effect is magnified at Google’s scale and in our (very large) monorepo.20 Any engineer can look at and learn from the wealth of knowledge that is the code of other teams, and powerful tools like Kythe make it easy to find references throughout the entire codebase (see Chapter 17). An important feature of documented best practices (see Chapter 8) is that they provide consistent standards for all Google code to follow. Readability is both an enforcement and propagation mechanism for these standards.

代码的阅读量远远大于编写量，这种影响在谷歌的规模和我们（非常大的）monorepo中被放大。任何工程师都可以查看并学习其他团队的代码的丰富知识，而像Kythe这样强大的工具使得在整个代码库中寻找参考资料变得很容易（见第17章）。文档化最佳实践的一个重要特征（见第8章）是，它们为所有谷歌代码提供了一致的标准。可读性是这些标准的可强制执行和传播的基础。

One of the primary advantages of the readability program is that it exposes engineers to more than just their own team’s tribal knowledge. To earn readability in a given language, engineers must send CLs through a centralized set of readability reviewers who review code across the entire company. Centralizing the process makes a significant trade-off: the program is limited to scaling linearly rather than sublinearly with organization growth, but it makes it easier to enforce consistency, avoid islands, and avoid (often unintentional) drifting from established norms.

可读性项目的主要优势之一是，它让工程师接触到的不仅仅是他们自己团队的内部知识。为了获得特定语言的可读性，工程师们必须将 CLs 发送给一组集中的可读性审查员，他们审查整个公司的代码。将流程集中化会带来显著的折衷：该计划仅限于随着组织的发展而线性扩展，而不是次线性扩展，但它更容易实现一致性，避免孤岛，并避免（通常是无意的）偏离既定规范。

The value of codebase-wide consistency cannot be overstated: even with tens of thousands of engineers writing code over decades, it ensures that code in a given language will look similar across the corpus. This enables readers to focus on what the code does rather than being distracted by why it looks different than code that they’re used to. Large-scale change authors (see Chapter 22) can more easily make changes across the entire monorepo, crossing the boundaries of thousands of teams. People can change teams and be confident that the way that the new team uses a given language is not drastically different than their previous team.

整个代码库的一致性的价值怎么强调都不为过：即使数十年来有数万名工程师编写代码，它也确保了一门语言中的代码在整个语法库中看起来都是相似的。这使读者能够专注于代码的作用，而不是被为什么它看起来与他们习惯的代码不同而分散注意力。大规模的变更作者（见第22章）可以更容易地在整个语法库中进行变更，跨越成千上万个团队的界限。人们可以更换团队，并确信新的团队使用特定语言的方式不会与他们以前的团队有很大的不同。

```
19  As of 2019, just the Google C++ style guide is 40 pages long. The secondary material making up the complete corpus of best practices is many times longer.
19  截至2019，谷歌C++风格指南只有40页长。构成完整的最佳实践语法库的次要材料要长很多倍。
20  For why Google uses a monorepo, see https://cacm.acm.org/magazines/2016/7/204032-why-google-stores- billions-of-lines-of-code-in-a-single-repository/fulltext. Note also that not all of Google’s code lives within the monorepo; readability as described here applies only to the monorepo because it is a notion of within- repository consistency.
20  有关谷歌使用monorepo的原因，请参阅https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext. 还要注意的是，并非谷歌的所有代码都存在于monorepo中；此处描述的可读性仅适用于monorepo，因为它是存储库内一致性的概念。
```
These benefits come with some costs: readability is a heavyweight process compared to other mediums like documentation and classes because it is mandatory and enforced by Google tooling (see Chapter 19). These costs are nontrivial and include the following:
- Increased friction for teams that do not have any team members with readability, because they need to find reviewers from outside their team to give readability approval on CLs.
- Potential for additional rounds of code review for authors who need readability review.
- Scaling disadvantages of being a human-driven process. Limited to scaling linearly to organization growth because it depends on human reviewers doing specialized code reviews.

这些好处伴随着一些成本：与文档和类等其他媒介相比，可读性是一个重量级的过程，因为它是强制性的，并由谷歌工具化强制执行（见第19章）。这些成本是不小的，包括以下几点：  
- 对于那些没有任何团队成员具备可读性的团队来说，增加了冲突，因为他们需要从团队之外寻找审查员来对CL进行可读性审批。
- 对于需要可读性审查的作者来说，有可能需要额外的几轮代码审查。
- 作为一个由人驱动的过程，其扩展性成为瓶颈。由于它依赖于人类审查员进行专门的代码审查，所以对组织的增长具有线性扩展的限制。

The question, then, is whether the benefits outweigh the costs. There’s also the factor of time: the full effect of the benefits versus the costs are not on the same timescale. The program makes a deliberate trade-off of increased short-term code-review latency and upfront costs for the long-term payoffs of higher-quality code, repository-wide code consistency, and increased engineer expertise. The longer timescale of the benefits comes with the expectation that code is written with a potential lifetime of years, if not decades.21

那么，问题是收益是否大于成本。还有一个时间因素：收益与成本的全部效果并不在同一时间维度上。该计划对增加的短期代码审查延迟和前期成本进行了慎重的权衡，以获得更高质量代码、存储库范围内的代码一致性和增加的工程师专业知识的长期回报。效益的时间尺度较长，期望编写的代码有几年甚至几十年的潜在寿命。

As with most—or perhaps all—engineering processes, there’s always room for improvement. Some of the costs can be mitigated with tooling. A number of readability comments address issues that could be detected statically and commented on automatically by static analysis tooling. As we continue to invest in static analysis, readability reviewers can increasingly focus on higher-order areas, like whether a particular block of code is understandable by outside readers who are not intimately familiar with the codebase instead of automatable detections like whether a line has trailing whitespace.

与大多数——或许是所有的工程过程一样，总是有改进的余地。一些成本可以通过工具来降低。许多可读性注释解决了静态检测和静态分析工具自动注释的问题。随着我们对静态分析的不断投资，可读性审查员可以越来越多地关注更高层次的领域，比如某个特定的代码块是否可以被不熟悉代码库的外部读者所理解，而外部读者不熟悉代码库，而不是自动检测，例如行是否有尾随空白。

But aspirations aren’t enough. Readability is a controversial program: some engineers complain that it’s an unnecessary bureaucratic hurdle and a poor use of engineer time. Are readability’s trade-offs worthwhile? For the answer, we turned to our trusty Engineering Productivity Research (EPR) team.

但光有愿望是不够的。可读性是一个有争议的项目：一些工程师抱怨说这是一个不必要的官僚主义，是对工程师时间的浪费。可读性的权衡是值得的吗？为了找到答案，我们求助于我们可信赖的工程生产力研究（EPR）团队。

```
21  For this reason, code that is known to have a short time span is exempt from readability requirements. Examples include the experimental/ directory (explicitly designated for experimental code and cannot push to production) and the Area 120 program, a workshop for Google’s experimental products.
21  因此，已知时间跨度较短的代码不受可读性要求的约束。考试示例包括实验/目录（明确指定为实验代码，不能推动生产）和Area 120计划，这是谷歌实验产品的研讨会。
```
The EPR team performed in-depth studies of readability, including but not limited to whether people were hindered by the process, learned anything, or changed their behavior after graduating. These studies showed that readability has a net positive impact on engineering velocity. CLs by authors with readability take statistically significantly less time to review and submit than CLs by authors who do not have readability.22 Self-reported engineer satisfaction with their code quality—lacking more objective measures for code quality—is higher among engineers who have readability versus those who do not. A significant majority of engineers who complete the program report satisfaction with the process and find it worthwhile. They report learning from reviewers and changing their own behavior to avoid readability issues when writing and reviewing code.

EPR团队对可读性进行了深入的研究，包括但不限于人们是否受到这个过程的阻碍，是否学到了什么，或者毕业后是否改变了他们的行为。这些研究表明，可读性对工程速度有正向的积极影响。具有可读性的作者的CL比不具有可读性的作者的CL在统计上要少花时间。具有可读性的工程师与不具有可读性的工程师相比，自我报告的对其代码质量的满意度——缺乏对代码质量更客观的衡量标准——更高。绝大多数完成该计划的工程师对这一过程表示满意，并认为这是值得的。他们报告说从审查员那里学到了东西，并改变了自己的行为，以避免在编写和评审代码时出现可读性问题。

Google has a very strong culture of code review, and readability is a natural extension of that culture. Readability grew from the passion of a single engineer to a formal program of human experts mentoring all Google engineers. It evolved and changed with Google’s growth, and it will continue to evolve as Google’s needs change.

谷歌有着非常浓厚的代码审查文化，可读性是这种文化的延伸。可读性从一个工程师的热情发展到一个由专家组指导所有谷歌工程师的正式项目。它随着谷歌的成长而不断发展变化，并将随着谷歌需求的变化而继续发展。

## Conclusion 结论
Knowledge is in some ways the most important (though intangible) capital of a software engineering organization, and sharing of that knowledge is crucial for making an organization resilient and redundant in the face of change. A culture that promotes open and honest knowledge sharing distributes that knowledge efficiently across the organization and allows that organization to scale over time. In most cases, investments into easier knowledge sharing reap manyfold dividends over the life of a company.

在某些方面，知识是软件工程组织最重要的（尽管是无形的）资产，而知识的共享对于使组织在面对变化时具有弹性和冗余至关重要。一种促进开放和诚实的知识共享的文化可以在整个组织内有效地分配这些知识，并使该组织能够随着时间的推移而扩展。在大多数情况下，对更容易的知识共享的投入会在一个公司的生命周期中获得许多倍的回报。

```
22  This includes controlling for a variety of factors, including tenure at Google and the fact that CLs for authors who do not have readability typically need additional rounds of review compared to authors who already have readability.
22  这包括控制各种因素，包括在谷歌的任职期限，以及与已经具备可读性的作者相比，没有可读性的作者的CLs通常需要额外的审查。
```

## TL;DRs  内容提要
- Psychological safety is the foundation for fostering a knowledge-sharing environment.
- Start small: ask questions and write things down.
- Make it easy for people to get the help they need from both human experts and documented references.
- At a systemic level, encourage and reward those who take time to teach and broaden their expertise beyond just themselves, their team, or their organization.
- There is no silver bullet: empowering a knowledge-sharing culture requires a combination of multiple strategies, and the exact mix that works best for your organization will likely change over time.

- 心理安全是培养知识共享环境的基础。
- 从小事做起：问问题，把事情写下来。
- 让人们可以很容易地从专家和有记录的参考资料中获得他们需要的帮助。
- 在系统的层面上，鼓励和奖励那些花时间去教授和扩大他们的专业知识，而不仅仅是他们自己、他们的团队或他们的组织。
- 没有什么灵丹妙药：增强知识共享文化需要多种策略的结合，而最适合你的组织的确切组合可能会随着时间的推移而改变。





