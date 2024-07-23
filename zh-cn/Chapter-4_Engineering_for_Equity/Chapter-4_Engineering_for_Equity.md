
**CHAPTER 4**

# Engineering for Equity

# 第四章 公平工程

**Written by Demma Rodriguez**

**Edited by Riona MacNamara**

In earlier chapters, we’ve explored the contrast between programming as the production of code that addresses the problem of the moment, and software engineering as the broader application of code, tools, policies, and processes to a dynamic and ambiguous problem that can span decades or even lifetimes. In this chapter, we’ll discuss the unique responsibilities of an engineer when designing products for a broad base of users. Further, we evaluate how an organization, by embracing diversity, can design systems that work for everyone, and avoid perpetuating harm against our users.

在前几章中，我们已经探讨了编程与软件工程之间的对比，前者是解决当下问题的代码生产，后者则是对代码、工具、策略和流程的更广泛的应用，以解决可能跨越几十年甚至一生的动态且不确定的问题。在本章中，我们将讨论工程师在为众多用户设计产品时的独特责任。此外，我们还将评估一个组织如何通过拥抱多样性来设计适合每个人的系统，并避免对我们的用户造成永久性的伤害。

As new as the field of software engineering is, we’re newer still at understanding the impact it has on underrepresented people and diverse societies. We did not write this chapter because we know all the answers. We do not. In fact, understanding how to engineer products that empower and respect all our users is still something Google is learning to do. We have had many public failures in protecting our most vulnerable users, and so we are writing this chapter because the path forward to more equitable products begins with evaluating our own failures and encouraging growth.

尽管软件工程领域是个全新领域，但我们在了解它对代表性不足的群体和多元化社会的影响方面还比较浅。我们写这一章并不是因为我们知道所有的答案。我们不知道。事实上，了解如何设计出能够赋予所有用户权益并尊重所有用户的产品仍然是谷歌正在学习做的事情。在保护我们最弱势的用户方面，我们有很多公开的失败产品，所以我们写这一章是因为通往更平等的产品的道路始于评估我们自己的失败和鼓励成长。

We are also writing this chapter because of the increasing imbalance of power between those who make development decisions that impact the world and those who simply must accept and live with those decisions that sometimes disadvantage already marginalized communities globally. It is important to share and reflect on what we’ve learned so far with the next generation of software engineers. It is even more important that we help influence the next generation of engineers to be better than we are today.

我们之所以要写这一章，也是因为在那些做出影响世界发展的人和那些只能选择接受并忍受这些决定的人之间，力量越来越不平衡，这些决定有时使全球已经边缘化的社区处于不利地位。与下一代软件工程师分享和反思我们迄今所学到的知识是很重要的。更重要的是，我们帮助影响下一代工程师，使他们比我们今天做得更好。

Just picking up this book means that you likely aspire to be an exceptional engineer. You want to solve problems. You aspire to build products that drive positive outcomes for the broadest base of people, including people who are the most difficult to reach. To do this, you will need to consider how the tools you build will be leveraged to change the trajectory of humanity, hopefully for the better.

只要拿起这本书，就意味着你可能渴望成为一名卓越的工程师。你想解决问题。你渴望建造产品，为最广泛的人群，包括最难接触的人，打造一个能带来积极成果的产品。要做到这一点，你需要考虑如何利用你建造的工具来改变人类的轨迹，希望是为了获得更好的发展。

## Bias Is the Default 偏见是默认的

When engineers do not focus on users of different nationalities, ethnicities, races, genders, ages, socioeconomic statuses, abilities, and belief systems, even the most talented staff will inadvertently fail their users. Such failures are often unintentional; all people have certain biases, and social scientists have recognized over the past several decades that most people exhibit unconscious bias, enforcing and promulgating existing stereotypes. Unconscious bias is insidious and often more difficult to mitigate than intentional acts of exclusion. Even when we want to do the right thing, we might not recognize our own biases. By the same token, our organizations must also recognize that such bias exists and work to address it in their workforces, product development, and user outreach.

当工程师不关注不同国籍、民族、种族、性别、年龄、社会经济地位、能力和信仰体系的用户时，即使是最优秀的工程师也会无意中让他们的用户失望。这种失败往往是无意的；所有的人都存在一定的偏见，社会科学家在过去几十年中已经认识到，大多数人都表现出无意识的偏见，强迫和传播存在的刻板印象。无意识的偏见是隐藏的，往往比有意的排斥行为更难改正。即使我们想做正确的事，我们也可能意识不到自己的偏见。同样，我们的组织也必须认识到这种偏见的存在，并努力在员工队伍、产品开发和用户推广中解决这一问题。

Because of bias, Google has at times failed to represent users equitably within their products, with launches over the past several years that did not focus enough on underrepresented groups. Many users attribute our lack of awareness in these cases to the fact that our engineering population is mostly male, mostly White or Asian, and certainly not representative of all the communities that use our products. The lack of representation of such users in our workforce[^1] means that we often do not have the requisite diversity to understand how the use of our products can affect underrepresented or vulnerable users.

由于偏见，谷歌有时未能在其产品中公平地代表用户，在过去几年中推出的产品没有足够关注代表性不足的群体。许多用户将我们在这些情况下缺乏意识归咎于这样一个事实，即我们的工程人员大多数是男性，大多数是白人或亚洲人，当然不能代表所有使用我们产品的人群。这类用户在我们的员工队伍中缺乏代表性，这意味着我们往往不具备必要的多样性，无法理解使用我们的产品会如何影响代表性不足或弱势的用户。

------

#### Case Study: Google Misses the Mark on Racial Inclusion  案例研究：谷歌在种族包容方面的失误

In 2015, software engineer Jacky Alciné pointed out[^2] that the image recognition algorithms in Google Photos were classifying his black friends as “gorillas.” Google was slow to respond to these mistakes and incomplete in addressing them.

2015年，软件工程师Jacky Alciné指出，谷歌照片中的图像识别算法将其黑人朋友错误地分类为‘大猩猩’。谷歌对这些错误的反应很慢，解决起来也不彻底。

What caused such a monumental failure? Several things:
- Image recognition algorithms depend on being supplied a “proper” (often meaning “complete”) dataset. The photo data fed into Google’s image recognition algorithm was clearly incomplete. In short, the data did not represent the population.
- Google itself (and the tech industry in general) did not (and does not) have much black representation,[^3] and that affects decisions subjective in the design of such algorithms and the collection of such datasets. The unconscious bias of the organization itself likely led to a more representative product being left on the table.
- Google’s target market for image recognition did not adequately include such underrepresented groups. Google’s tests did not catch these mistakes; as a result, our users did, which both embarrassed Google and harmed our users.

是什么导致了这样一个巨大的失误？有几件事：
- 图像识别算法取决于是否提供了一个 "适当的"（通常意味着 "完整的"）数据集。送入谷歌图像识别算法的照片数据显然是不完整的。简而言之，这些数据并不代表所有人口。
- 谷歌本身（以及整个科技行业）过去没有（现在也没有）很多黑人代表，这影响了设计这种算法和收集这种数据集的主观决定。组织本身无意识的偏见很可能导致更具代表性的产品被搁置。
- 谷歌的图像识别目标市场并没有充分包括这种代表性不足的群体。谷歌的测试没有发现这些错误；结果是我们的用户发现了，这既让谷歌感到尴尬，也伤害了我们的用户。

As late as 2018, Google still had not adequately addressed the underlying problem.[^4]

直到2018年，谷歌仍然没有彻底地解决这些潜在的问题。

------

In this example, our product was inadequately designed and executed, failing to properly consider all racial groups, and as a result, failed our users and caused Google bad press. Other technology suffers from similar failures: autocomplete can return offensive or racist results. Google’s Ad system could be manipulated to show racist or offensive ads. YouTube might not catch hate speech, though it is technically outlawed on that platform.

在这个例子中，我们的产品设计和执行不充分，未能适当考虑到所有的种族群体，结果是辜负了我们的用户，给谷歌带来了恶劣的影响。其他技术也有类似的失误：自动完成补全可以返回攻击性或种族主义的结果。谷歌的广告系统可以被操纵来显示种族主义或攻击性广告。YouTube可能没有识别到仇恨言论，尽管从技术上讲，它在该平台上是非法的。

In all of these cases, the technology itself is not really to blame. Autocomplete, for example, was not designed to target users or to discriminate. But it was also not resilient enough in its design to exclude discriminatory language that is considered hate speech. As a result, the algorithm returned results that caused harm to our users. The harm to Google itself should also be obvious: reduced user trust and engagement with the company. For example, Black, Latinx, and Jewish applicants could lose faith in Google as a platform or even as an inclusive environment itself, therefore undermining Google’s goal of improving representation in hiring.

在所有这些情况下，技术本身并不是真正的罪魁祸首。例如，自动完成补全的设计目的不是为了针对用户或进行歧视。但它的设计也没有足够的灵活来排除被认为是仇恨言论的歧视性语言。结果，该算法返回的结果对我们的用户造成了伤害。对谷歌本身的损害也应该是显而易见的：用户对该公司的信任和参与度降低。例如，黑人、拉美人和犹太人的申请者可能会对谷歌这个平台甚至其本身的包容性环境失去信心，因此破坏了谷歌在招聘中改善代表性的目标。

How could this happen? After all, Google hires technologists with impeccable education and/or professional experience—exceptional programmers who write the best code and test their work. “Build for everyone” is a Google brand statement, but the truth is that we still have a long way to go before we can claim that we do. One way to address these problems is to help the software engineering organization itself look like the populations for whom we build products.

这怎么会发生呢？毕竟，谷歌雇用的技术专家拥有无可挑剔的教育和/或专业经验——卓越的程序员，他们编写最好的代码并测试他们的功能。"为每个人而建 "是谷歌的品牌宣言，但事实是，在宣称我们做到这一点之前，我们仍有很长的路要走。解决这些问题的方法之一是帮助软件工程组织本身变得像我们为其建造产品的人群。

> [^1]:    Google’s 2019 Diversity Report.
> 1 谷歌的2019年多样性报告。
>
> [^2]:    @jackyalcine. 2015. “Google Photos, Y’all Fucked up. My Friend’s Not a Gorilla.” Twitter, June 29, 2015.https://twitter.com/jackyalcine/status/615329515909156865.
> 2 @jackyalcine. 2015. "谷歌照片，你们都搞砸了。我的朋友不是大猩猩"。Twitter，2015年6月29日。https://twitter.com/jackyalcine/status/615329515909156865
>
> [^3]:    Many reports in 2018–2019 pointed to a lack of diversity across tech. Some notables include the National Center for Women & Information Technology, and Diversity in Tech./
> 3  2018-2019年的许多报告指出，整个科技界缺乏多样性。一些著名的报告包括国家妇女和信息技术中心，以及科技领域的多样性。
>
> [^4]:    Tom Simonite, “When It Comes to Gorillas, Google Photos Remains Blind,” Wired, January 11, 2018.
> 4    Tom Simonite，"当涉及到大猩猩时，谷歌照片仍然是盲目的，"《连线》，2018年1月11日。

## Understanding the Need for Diversity 了解多样性的必要性

At Google, we believe that being an exceptional engineer requires that you also focus on bringing diverse perspectives into product design and implementation. It also means that Googlers responsible for hiring or interviewing other engineers must contribute to building a more representative workforce. For example, if you interview other engineers for positions at your company, it is important to learn how biased outcomes happen in hiring. There are significant prerequisites for understanding how to anticipate harm and prevent it. To get to the point where we can build for everyone, we first must understand our representative populations. We need to encourage engineers to have a wider scope of educational training.

在谷歌，我们相信，作为一名出色的工程师，你还需要专注于将不同的视角引入到产品设计和实施中。这也意味着，负责招聘或面试其他工程师的谷歌人必须致力于打造更具代表性的团队。例如，如果你为公司的职位面试其他工程师，了解招聘过程中的偏差结果是如何发生，这是很重要的。了解如何预测和预防伤害有重要的先决条件。为了达到我们能够为每个人而建的目的，我们首先必须了解我们的代表人群。了解招聘过程中的偏差结果是如何发生的是很重要的。

The first order of business is to disrupt the notion that as a person with a computer science degree and/or work experience, you have all the skills you need to become an exceptional engineer. A computer science degree is often a necessary foundation. However, the degree alone (even when coupled with work experience) will not make you an engineer. It is also important to disrupt the idea that only people with computer science degrees can design and build products. Today, [most programmers do have a computer science degree](https://oreil.ly/2Bu0H); they are successful at building code, establishing theories of change, and applying methodologies for problem solving. However, as the aforementioned examples demonstrate, *this approach is insufficient for inclusive and* *equitable engineering*.

首要的任务是打破这样的观念：作为一个拥有计算机科学学位或且工作经验的人，你拥有成为一名出色工程师所需的所有技能。计算机科学学位通常是一个必要的基础。然而，单凭学位（即使再加上工作经验）并不能使你成为一名工程师。打破只有拥有计算机科学学位的人才能设计和建造产品的想法也很重要。今天，大多数程序员确实拥有计算机科学学位；他们在构建代码、建立变化理论和应用解决问题的方法方面都很成功。然而，正如上述例子所表明的，*这种方法不足以实现包容性和公平工程*。

Engineers should begin by focusing all work within the framing of the complete ecosystem they seek to influence. At minimum, they need to understand the population demographics of their users. Engineers should focus on people who are different than themselves, especially people who might attempt to use their products to cause harm. The most difficult users to consider are those who are disenfranchised by the processes and the environment in which they access technology. To address this challenge, engineering teams need to be representative of their existing and future users. In the absence of diverse representation on engineering teams, individual engineers need to learn how to build for all users.

工程师应首先关注他们试图影响的完整生态系统框架内的所有工作。至少，他们需要了解用户的人群统计数据。工程师应该关注与自己不同的人，特别是那些试图使用他们的产品而受伤的人。最难考虑的用户是那些被他们获取技术的过程和环境所剥夺了权益的人。为了应对这一挑战，工程团队需要代表其现有和未来的用户。在工程团队缺乏多元化代表的情况下，每个工程师需要学习如何为所有用户构建。

## Building Multicultural Capacity 构建多元化能力

One mark of an exceptional engineer is the ability to understand how products can advantage and disadvantage different groups of human beings. Engineers are expected to have technical aptitude, but they should also have the *discernment* to know when to build something and when not to. Discernment includes building the capacity to identify and reject features or products that drive adverse outcomes. This is a lofty and difficult goal, because there is an enormous amount of individualism that goes into being a high-performing engineer. Yet to succeed, we must extend our focus beyond our own communities to the next billion users or to current users who might be disenfranchised or left behind by our products.

卓越的工程师的一个标志是能够理解产品对不同的人群的好处和坏处。工程师应该有技术能力，但他们也应该有*敏锐的判断力*，知道什么时候该造什么，什么时候不该造。判断力包括建立识别和拒绝那些导致不良结果的功能或产品的能力。这是一个崇高而艰难的目标，因为要成为一名出色的工程师，需要有大量的个人主义。然而，想要成功，我们必须扩大我们的关注范围，关注我们当前用户之外的未来十亿的用户，哪怕是可能被我们的产品剥夺权利或遗弃的现有用户。

Over time, you might build tools that billions of people use daily—tools that influence how people think about the value of human lives, tools that monitor human activity, and tools that capture and persist sensitive data, such as images of their children and loved ones, as well as other types of sensitive data. As an engineer, you might wield more power than you realize: the power to literally change society. It’s critical that on your journey to becoming an exceptional engineer, you understand the innate responsibility needed to exercise power without causing harm. The first step is to recognize the default state of your bias caused by many societal and educational factors. After you recognize this, you’ll be able to consider the often-forgotten use cases or users who can benefit or be harmed by the products you build.

随着时间的推移，你可能会建立数十亿人每天使用的工具——影响人们思考人类生命价值的工具，监测人类活动的工具，以及捕获和永久保存敏感数据的工具，如他们的孩子和亲人的图像，以及其他类型的敏感数据。作为一名工程师，你可能掌握着比你意识到的更多的权力：真正改变社会的权力。至关重要的是，在你成为一名杰出的工程师的过程中，你必须理解在不造成伤害的情况下行使权力所需的内在责任，这一点至关重要。第一步是要认识到由许多社会和教育因素造成的你的偏见的默认状态。在你认识到这一点之后，你就能考虑那些经常被遗忘的用例或用户，他们可以从你制造的产品中获益或受到伤害。

The industry continues to move forward, building new use cases for artificial intelligence (AI) and machine learning at an ever-increasing speed. To stay competitive, we drive toward scale and efficacy in building a high-talent engineering and technology workforce. Yet we need to pause and consider the fact that today, some people have the ability to design the future of technology and others do not. We need to understand whether the software systems we build will eliminate the potential for entire populations to experience shared prosperity and provide equal access to technology.

软件行业持续发展，以不断提高的速度为人工智能（AI）和机器学习建立新的用例。为了保持竞争力，我们在建设高素质的工程和技术人才队伍方面，朝着规模和效率的方向努力。然而，我们需要暂停并考虑这样一个事实：今天，有些人有能力设计技术的未来，其他人却没有。我们需要了解我们建立的软件系统是否会消除整个人口体验共同繁荣的潜力，并提供平等获得技术的机会。

Historically, companies faced with a decision between completing a strategic objective that drives market dominance and revenue and one that potentially slows momentum toward that goal have opted for speed and shareholder value. This tendency is exacerbated by the fact that many companies value individual performance and excellence, yet often fail to effectively drive accountability on product equity across all areas. Focusing on underrepresented users is a clear opportunity to promote equity. To continue to be competitive in the technology sector, we need to learn to engineer for global equity.

从历史上看，公司在完成推动市场主导地位和收入的战略目标和可能减缓实现这一目标势头的战略目标之间，都选择了速度和股东价值。许多公司重视个人的绩效和卓越，但往往不能有效地推动各领域的产品公平的问责机制，这加剧了这种倾向。关注代表性不足的用户显然是促进公平的机会。为了在技术领域继续保持竞争力，我们需要学习如何设计全球公平。

Today, we worry when companies design technology to scan, capture, and identify people walking down the street. We worry about privacy and how governments might use this information now and in the future. Yet most technologists do not have the requisite perspective of underrepresented groups to understand the impact of racial variance in facial recognition or to understand how applying AI can drive harmful and inaccurate results.

如今，当公司设计扫描、捕获和识别街上行人的技术时，我们感到担忧。我们担心隐私问题以及政府现在和将来如何使用这些信息。然而，大多数技术专家并不具备代表性不足群体的必要视角，无法理解种族差异对面部识别的影响，也无法理解应用人工智能如何导致有害和不准确的结果。

Currently, AI-driven facial-recognition software continues to disadvantage people of color or ethnic minorities. Our research is not comprehensive enough and does not include a wide enough range of different skin tones. We cannot expect the output to be valid if both the training data and those creating the software represent only a small subsection of people. In those cases, we should be willing to delay development in favor of trying to get more complete and accurate data, and a more comprehensive and inclusive product.

目前，人工智能驱动的面部识别软件仍然对有色人种或少数族裔不利。我们的研究还不够全面，没有包括足够多的肤色。如果训练数据和创建软件的人都只代表一小部分人，我们就不能指望输出是有效的。在这种情况下，我们应该愿意推迟开发，以获得更完整、更准确的数据，以及更全面、更包容的产品。

Data science itself is challenging for humans to evaluate, however. Even when we do have representation, a training set can still be biased and produce invalid results. A study completed in 2016 found that more than 117 million American adults are in a law enforcement facial recognition database.[^5] Due to the disproportionate policing of Black communities and disparate outcomes in arrests, there could be racially biased error rates in utilizing such a database in facial recognition. Although the software is being developed and deployed at ever-increasing rates, the independent testing is not. To correct for this egregious misstep, we need to have the integrity to slow down and ensure that our inputs contain as little bias as possible. Google now offers statistical training within the context of AI to help ensure that datasets are not intrinsically biased.

然而，数据科学本身对人类的评估是具有挑战性的。即使我们有表示，训练集仍然可能有偏见，产生无效的结果。2016年完成的一项研究发现，执法部门的面部识别数据库中有1.17亿以上的美国成年人。由于黑人社区的警察比例过高，逮捕的结果也不尽相同，因此在面部识别中使用该数据库可能存在种族偏见错误率。尽管该软件的开发和部署速度不断提高，但独立测试却并非如此。为了纠正这一令人震惊的错误，我们需要有诚信，放慢脚步，确保我们的输入尽可能不包含偏见。谷歌现在在人工智能的范围内提供统计培训，以帮助确保数据集没有内在的偏见。

Therefore, shifting the focus of your industry experience to include more comprehensive, multicultural, race and gender studies education is not only your responsibility, but also the responsibility of your employer. Technology companies must ensure that their employees are continually receiving professional development and that this development is comprehensive and multidisciplinary. The requirement is not that one individual take it upon themselves to learn about other cultures or other demographics alone. Change requires that each of us, individually or as leaders of teams, invest in continuous professional development that builds not just our software development and leadership skills, but also our capacity to understand the diverse experiences throughout humanity.

因此，将你的行业经验的重点转移到更全面的、多文化的、种族和性别研究的教育，不仅是你的责任，也是你雇主的责任。科技公司必须确保他们的员工不断接受专业发展，而且这种发展是全面和多学科的。要求不是个体独自承担起学习其他文化或其他人口统计学的任务。变革要求我们每个人，无论是个人还是团队的领导者，都要投资于持续的专业发展，不仅要培养我们的软件开发和领导技能，还要培养我们理解全人类不同经验的能力。

> [^5]:    Stephen Gaines and Sara Williams. “The Perpetual Lineup: Unregulated Police Face Recognition in America.”
>
> 5    斯蒂芬·盖恩斯和莎拉·威廉姆斯。“永远的阵容：美国不受监管的警察面孔识别。”
乔治敦法律学院隐私与技术中心，2016年10月18日。

## Making Diversity Actionable 让多样性成为现实

Systemic equity and fairness are attainable if we are willing to accept that we are all accountable for the systemic discrimination we see in the technology sector. We are accountable for the failures in the system. Deferring or abstracting away personal accountability is ineffective, and depending on your role, it could be irresponsible. It is also irresponsible to fully attribute dynamics at your specific company or within your team to the larger societal issues that contribute to inequity. A favorite line among diversity proponents and detractors alike goes something like this: “We are working hard to fix (insert systemic discrimination topic), but accountability is hard. How do we combat (insert hundreds of years) of historical discrimination?” This line of inquiry is a detour to a more philosophical or academic conversation and away from focused efforts to improve work conditions or outcomes. Part of building multicultural capacity requires a more comprehensive understanding of how systems of inequality in society impact the workplace, especially in the technology sector.

如果我们愿意接受我们需要对我们在技术部门看到的系统歧视负责，那么系统的公平和公正是可以实现的。我们要对系统的故障负责。推迟或抽离个人责任是无效的，而且根据你的角色，这可能是不负责任的。将特定公司或团队的动态完全归因于导致不平等的更大社会问题也是不负责任的。多样性支持者和反对者中最喜欢的一句话是这样的。"我们正在努力解决（加入系统歧视的话题），但问责是很难的。我们如何打击（加入几百年来的）历史歧视？" 这条调查路线是一条通往哲学或学术对话的迂回之路，与改善工作条件或成果的专注努力相去甚远。建设多元文化能力的一部分需要更全面地了解社会中的不平等制度如何影响工作场所，特别是在技术部门。

If you are an engineering manager working on hiring more people from underrepresented groups, deferring to the historical impact of discrimination in the world is a useful academic exercise. However, it is critical to move beyond the academic conversation to a focus on quantifiable and actionable steps that you can take to drive equity and fairness. For example, as a hiring software engineer manager, you’re accountable for ensuring that your candidate slates are balanced. Are there women or other underrepresented groups in the pool of candidates’ reviews? After you hire someone, what opportunities for growth have you provided, and is the distribution of opportunities equitable? Every technology lead or software engineering manager has the means to augment equity on their teams. It is important that we acknowledge that, although there are significant systemic challenges, we are all part of the system. It is our problem to fix.

如果你是一名工程经理，致力于雇用更多来自代表性不足的群体的人，推崇世界上歧视的历史影响是一项有益的学术活动。然而，关键是要超越学术交流，把重点放在可量化和可操作的步骤上，以推动公平和公正。例如，作为招聘软件工程师经理，你有责任确保你的候选人名单是均衡的。在候选人的审查中是否有女性或其他代表性不足的群体？雇佣员工后，你提供了哪些成长机会，机会分配是否公平？每个技术领导或软件工程经理都有办法在他们的团队中增加平等。重要的是，我们要承认，尽管存在着重大的系统性挑战，但我们都是这个系统的一部分。这是我们要解决的问题。

## Reject Singular Approaches 摒弃单一方法

We cannot perpetuate solutions that present a single philosophy or methodology for fixing inequity in the technology sector. Our problems are complex and multifactorial. Therefore, we must disrupt singular approaches to advancing representation in the workplace, even if they are promoted by people we admire or who have institutional power.

我们不能让那些提出单一理念或方法来解决技术部门不公平问题的延续解决方案。我们的问题是复杂和多因素的。因此，我们必须打破推进工作场所代表性的单一方法，即使这些方法是由我们敬佩的人或拥有机构权力的人推动的。

One singular narrative held dear in the technology industry is that lack of representation in the workforce can be addressed solely by fixing the hiring pipelines. Yes, that is a fundamental step, but that is not the immediate issue we need to fix. We need to recognize systemic inequity in progression and retention while simultaneously focusing on more representative hiring and educational disparities across lines of race, gender, and socioeconomic and immigration status, for example.

在科技行业中，有一种单一的说法是，劳动力中缺乏代表性的问题可以只通过修复招聘通道来解决。是的，这是一个基本步骤，但这并不是我们需要解决的紧迫问题。我们需要认识到在晋升和留任方面的系统不平等，同时关注更具代表性的招聘和教育差异，例如种族、性别、社会经济和移民状况。

In the technology industry, many people from underrepresented groups are passed over daily for opportunities and advancement. Attrition among Black+ Google employees outpaces attrition from all other groups and confounds progress on representation goals. If we want to drive change and increase representation, we need to evaluate whether we’re creating an ecosystem in which all aspiring engineers and other technology professionals can thrive.

在科技行业，许多来自代表性不足的群体的人每天都被排除在机会和晋升之外。谷歌黑人员工的流失率超过了所有其他群体的流失率，并影响了代表目标的实现。如果我们想推动变革并提高代表性，我们需要评估我们是否正在创造一个所有有抱负的工程师和其他技术专业人员都能茁壮成长的生态系统。

Fully understanding an entire problem space is critical to determining how to fix it. This holds true for everything from a critical data migration to the hiring of a representative workforce. For example, if you are an engineering manager who wants to hire more women, don’t just focus on building a pipeline. Focus on other aspects of the hiring, retention, and progression ecosystem and how inclusive it might or might not be to women. Consider whether your recruiters are demonstrating the ability to identify strong candidates who are women as well as men. If you manage a diverse engineering team, focus on psychological safety and invest in increasing multicultural capacity on the team so that new team members feel welcome.

充分了解整个问题空间对于确定如何解决它至关重要。这适用于从关键数据迁移到雇佣代表性员工的所有方面。例如，如果你是一个想雇用更多女性的工程经理，不要只关注单个方面建设。关注招聘、保留和晋升生态系统的其他方面，以及它对女性的包容性。考虑一下你的招聘人员是否展示了识别女性和男性候选人的能力。如果你管理一个多元化的工程团队，请关注心理安全，并投入于增加团队的多元文化能力，使新的团队成员感到受欢迎。

A common methodology today is to build for the majority use case first, leaving improvements and features that address edge cases for later. But this approach is flawed; it gives users who are already advantaged in access to technology a head start, which increases inequity. Relegating the consideration of all user groups to the point when design has been nearly completed is to lower the bar of what it means to be an excellent engineer. Instead, by building in inclusive design from the start and raising development standards for development to make tools delightful and accessible for people who struggle to access technology, we enhance the experience for all users.

如今，一种常见的方法是首先为大多数用例构建，将解决边缘用例的改进和特性留待以后使用。但这种方法是有缺陷的；它让那些在获取技术方面已经有优势的用户抢先一步，这增加了不平等。把对所有用户群体的考虑放在设计即将完成的时候，就是降低成为一名优秀工程师的标准。相反，通过从一开始就采用包容性设计，提高开发标准，让那些难以获得技术的人能够轻松地使用工具，我们增强了所有用户的体验。

Designing for the user who is least like you is not just wise, it’s a best practice. There are pragmatic and immediate next steps that all technologists, regardless of domain, should consider when developing products that avoid disadvantaging or underrepresenting users. It begins with more comprehensive user-experience research. This research should be done with user groups that are multilingual and multicultural and that span multiple countries, socioeconomic class, abilities, and age ranges. Focus on the most difficult or least represented use case first.

为与你最不同的用户设计，而且是最佳实践。所有的技术专家，无论在哪个领域，在开发产品时都应该考虑一些实用的和直接的步骤，以避免对用户造成不利影响或代表不足。它从更全面的用户体验研究开始。这项研究应该针对多语言、多文化、跨多个国家、社会经济阶层、能力和年龄范围的用户群体进行。首先关注最困难或最不典型的用例。

## Challenge Established Processes 挑战既定流程

Challenging yourself to build more equitable systems goes beyond designing more inclusive product specifications. Building equitable systems sometimes means challenging established processes that drive invalid results.

挑战自己以建立更公平的系统，不仅仅是设计更具包容性的产品规格。建立公平系统有时意味着挑战那些推动无效结果的既定流程。

Consider a recent case evaluated for equity implications. At Google, several engineering teams worked to build a global hiring requisition system. The system supports both external hiring and internal mobility. The engineers and product managers involved did a great job of listening to the requests of what they considered to be their core user group: recruiters. The recruiters were focused on minimizing wasted time for hiring managers and applicants, and they presented the development team with use cases focused on scale and efficiency for those people. To drive efficiency, the recruiters asked the engineering team to include a feature that would highlight performance ratings—specifically lower ratings—to the hiring manager and recruiter as soon as an internal transfer expressed interest in a job.

考虑一下最近一个被评估为对公平有影响的案例。在谷歌，几个工程团队致力于建立一个全球招聘申请系统。该系统同时支持外部招聘和内部流动。参与的工程师和产品经理在倾听他们认为是他们的核心用户群体的请求方面做得很好：招聘人员。招聘人员专注于最大限度地减少招聘经理和申请人的时间浪费，他们向开发团队提出了专注于这些人的规模和效率的案例。为了提高效率，招聘人员要求工程团队加入一项功能，在内部调动人员表示对某项工作感兴趣时，该功能将突出绩效评级，特别是向招聘经理和招聘人员提供较低的评级。

On its face, expediting the evaluation process and helping job seekers save time is a great goal. So where is the potential equity concern? The following equity questions were raised:

- Are developmental assessments a predictive measure of performance?
- Are the performance assessments being presented to prospective managers free of individual bias?
- Are performance assessment scores standardized across organizations?

从表面上看，加快评估过程和帮助求职者节省时间是一个伟大的目标。那么，潜在的公平问题在哪里？以下是提出的公平问题:

- 发展评估是否是绩效的预测指标？
- 向潜在经理提交的绩效评估是否没有个人偏见？
- 绩效评估的分数在不同的组织中是标准化的吗？

If the answer to any of these questions is “no,” presenting performance ratings could still drive inequitable, and therefore invalid, results.

如果这些问题的答案都是 "否"，呈现绩效评级仍然可能导致不公平，因此是无效的结果。

When an exceptional engineer questioned whether past performance was in fact predictive of future performance, the reviewing team decided to conduct a thorough review. In the end, it was determined that candidates who had received a poor performance rating were likely to overcome the poor rating if they found a new team. In fact, they were just as likely to receive a satisfactory or exemplary performance rating as candidates who had never received a poor rating. In short, performance ratings are indicative only of how a person is performing in their given role at the time they are being evaluated. Ratings, although an important way to measure performance during a specific period, are not predictive of future performance and should not be used to gauge readiness for a future role or qualify an internal candidate for a different team. (They can, however, be used to evaluate whether an employee is properly or improperly slotted on their current team; therefore, they can provide an opportunity to evaluate how to better support an internal candidate moving forward.)

当一位杰出的工程师质疑过去的业绩是否真的能预测未来的业绩时，审查小组决定进行一次彻底的审查。最后确定，曾经获得不良业绩评级的候选人如果找到一个新的团队，就有可能克服较差的评级。事实上，他们获得满意或堪称楷模绩效评级的可能性与从未获得过差评的候选人一样。简而言之，绩效评级仅表示一个人在担任指定角色时的表现。评级虽然是衡量特定时期绩效的一种重要方式，但不能预测未来绩效，不应用于衡量未来角色的准备情况或确定不同团队的内部候选人。(然而，它们可以被用来评估一个员工在其当前团队中的位置是否合适；因此，它们可以提供一个机会来评估如何更好地支持内部候选人发展。）

This analysis definitely took up significant project time, but the positive trade-off was a more equitable internal mobility process.

这一分析无疑占用了大量的项目时间，但积极的权衡是一个更公平的内部流动过程。

## Values Versus Outcomes 价值观与成果

Google has a strong track record of investing in hiring. As the previous example illustrates, we also continually evaluate our processes in order to improve equity and inclusion. More broadly, our core values are based on respect and an unwavering commitment to a diverse and inclusive workforce. Yet, year after year, we have also missed our mark on hiring a representative workforce that reflects our users around the globe. The struggle to improve our equitable outcomes persists despite the policies and programs in place to help support inclusion initiatives and promote excellence in hiring and progression. The failure point is not in the values, intentions, or investments of the company, but rather in the application of those policies at the implementation level.

谷歌在招聘方面有着良好的投入记录。正如前面的例子所示，我们也在不断评估我们的流程，以提高公平和包容。更广泛地说，我们的核心价值观是基于尊重、对多元化和包容性劳动力的坚定承诺。然而，一年又一年，我们在雇用一支反映我们全球用户的代表性员工队伍方面却没有达到目标。尽管制定了策略和计划，以帮助支持包容倡议并促进招聘和晋升的卓越性，但改善公平结果的斗争依然存在。失败点不在于公司的价值观、意图或投入，而在于这些策略在执行层面的应用。

Old habits are hard to break. The users you might be used to designing for today— the ones you are used to getting feedback from—might not be representative of all the users you need to reach. We see this play out frequently across all kinds of products, from wearables that do not work for women’s bodies to video-conferencing software that does not work well for people with darker skin tones.

旧习惯很难改掉。你今天可能习惯于为之设计的用户——你习惯于从他们那里获得反馈——可能并不代表你需要接触的所有用户。我们看到这种情况经常发生在各种产品上，从不适合女性身体的可穿戴设备到不适合深肤色人的视频会议软件。

So, what’s the way out?

1. Take a hard look in the mirror. At Google, we have the brand slogan, “Build For Everyone.” How can we build for everyone when we do not have a representative workforce or engagement model that centralizes community feedback first? We can’t. The truth is that we have at times very publicly failed to protect our most vulnerable users from racist, antisemitic, and homophobic content.
2. Don’t build for everyone. Build with everyone. We are not building for everyone yet. That work does not happen in a vacuum, and it certainly doesn’t happen when the technology is still not representative of the population as a whole. That said, we can’t pack up and go home. So how do we build for everyone? We build with our users. We need to engage our users across the spectrum of humanity and be intentional about putting the most vulnerable communities at the center of our design. They should not be an afterthought.
3. Design for the user who will have the most difficulty using your product. Building for those with additional challenges will make the product better for everyone. Another way of thinking about this is: don’t trade equity for short-term velocity.
4. Don’t assume equity; measure equity throughout your systems. Recognize that decision makers are also subject to bias and might be undereducated about the causes of inequity. You might not have the expertise to identify or measure the scope of an equity issue. Catering to a single userbase might mean disenfranchising another; these trade-offs can be difficult to spot and impossible to reverse. Partner with individuals or teams that are subject matter experts in diversity, equity, and inclusion.
5. Change is possible. The problems we’re facing with technology today, from surveillance to disinformation to online harassment, are genuinely overwhelming. We can’t solve these with the failed approaches of the past or with just the skills we already have. We need to change.

那么，出路是什么？

1. 认真照照镜子。在谷歌，我们有一个品牌口号，"为每个人而建"。当我们没有一个代表性的员工队伍或首先集中社区反馈的参与模式时，我们如何为每个人建设？我们不能。事实是，我们有时在公开场合未能保护我们最脆弱的用户免受种族主义、反犹太主义和恐同内容的侵害。
2. 不要为每个人而建。要与所有人一起共建。我们还没有为每个人建设的能力。这项工作不会凭空实现，当技术仍然不能代表整个人口时，这项工作肯定不会发生。话虽如此，我们也不能打包回家。那么，我们如何为每个人建立？我们与我们的用户一起建设。我们需要让全人类的用户参与进来，并有意将最脆弱的群体置于我们设计的中心。他们不应该是事后的考虑对象。
3. 为那些在使用你的产品时遇到最大困难的用户设计。为那些有额外挑战的人设计将使产品对所有人都更好。另一种思考方式是：不要用公平来换取短期的速度。
4. 不要假设公平；**衡量整个系统的公平性**。认识到决策者也会有偏见，而且可能对不平等的原因认识不足。你可能不具备识别或衡量公平问题的范围的专业知识。迎合单个用户群可能意味着剥夺另一个用户群的权利；这些权衡可能很难发现，也不可能逆转。与作为多元化主题专家的个人或团队合作，公平、平等和包容。
5. 改变是可能的。我们今天所面临的技术问题，从监视到虚假信息再到在线骚扰，确实是令人难以承受的。我们不能用过去失败的方法或只用我们已有的技能来解决这些问题。我们需要改变。

## Stay Curious, Push Forward 保持好奇心，勇往直前

The path to equity is long and complex. However, we can and should transition from simply building tools and services to growing our understanding of how the products we engineer impact humanity. Challenging our education, influencing our teams and managers, and doing more comprehensive user research are all ways to make progress. Although change is uncomfortable and the path to high performance can be painful, it is possible through collaboration and creativity.

通往公平的道路是道阻且长。然而，我们可以也应该从简单地构建工具和服务过渡到加深我们对我们设计的产品如何影响人类的理解。挑战我们的教育，影响我们的团队和管理者，以及做更全面的用户研究，都是取得进展的方法。虽然改变是痛苦的，而且通向高绩效的道路可能是痛苦的，但通过合作和创新，变革是可能的。

Lastly, as future exceptional engineers, we should focus first on the users most impacted by bias and discrimination. Together, we can work to accelerate progress by focusing on Continuous Improvement and owning our failures. Becoming an engineer is an involved and continual process. The goal is to make changes that push humanity forward without further disenfranchising the disadvantaged. As future exceptional engineers, we have faith that we can prevent future failures in the system.

最后，作为未来的杰出工程师，我们应该首先关注受偏见和歧视影响最大的用户。通过共同努力，我们可以通过专注于持续改进和承认失败来加速进步。成为一名工程师是一个复杂而持续的过程。目标是在不进一步剥夺弱势群体权利的情况下，做出推动人类前进的变革。作为未来杰出的工程师，我们有信心能够防止未来系统的失败。

## Conclusion 总结

Developing software, and developing a software organization, is a team effort. As a software organization scales, it must respond and adequately design for its user base, which in the interconnected world of computing today involves everyone, locally and around the world. More effort must be made to make both the development teams that design software and the products that they produce reflect the values of such a diverse and encompassing set of users. And, if an engineering organization wants to scale, it cannot ignore underrepresented groups; not only do such engineers from these groups augment the organization itself, they provide unique and necessary perspectives for the design and implementation of software that is truly useful to the world at large.

开发软件和开发软件组织是一项团队工作。随着软件组织规模的扩大，它必须对其用户群做出响应并进行充分设计，在当今互联的计算世界中，用户群涉及到本地和世界各地的每个人。必须做出更多的努力，使设计软件的开发团队和他们生产的产品都能反映出这样一个多样化的、包含了所有用户的价值观。而且，如果一个工程组织想要扩大规模，它不能忽视代表性不足的群体；这些来自这些群体的工程师不仅能增强组织本身，还能为设计和实施对整个世界真正有用的软件提供独特而必要的视角。

## TL;DRs  内容提要

- Bias is the default.
- Diversity is necessary to design properly for a comprehensive user base.
- Inclusivity is critical not just to improving the hiring pipeline for underrepresented groups, but to providing a truly supportive work environment for all people.
- Product velocity must be evaluated against providing a product that is truly useful to all users. It’s better to slow down than to release a product that might cause harm to some users.

- 偏见是默认的。
- 多样性是正确设计综合用户群所必需的。
- 包容性不仅对于改善代表不足的群体的招聘渠道至关重要，而且对于为所有人提供一个真正支持性的工作环境也至关重要。
- 产品速度必须根据提供对所有用户真正有用的产品来评估。与其发布一个可能对某些用户造成伤害的产品，还不如放慢速度。
