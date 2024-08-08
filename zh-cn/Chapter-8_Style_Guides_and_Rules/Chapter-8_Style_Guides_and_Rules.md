**CHAPTER 8**

# Style Guides and Rules

# 第八章 风格指南和规则

**Written by Shaindel Schwartz**

**Edited by Tom Manshreck**


Most engineering organizations have rules governing their codebases—rules about where source files are stored, rules about the formatting of the code, rules about naming and patterns and exceptions and threads. Most software engineers are working within the bounds of a set of policies that control how they operate. At Google, to manage our codebase, we maintain a set of style guides that define our rules.

大多数软件工程机构都有管理其代码库的规则——关于源文件的存储位置规则、代码格式化规则、命名规则和模式以及异常处理规则和多线程规则。大多数软件工程师就在这组控制他们如何运作的策略的范围内工作。在谷歌，要管理我们的代码库，我们维护了一套定义我们规则的风格指南。

Rules are laws. They are not just suggestions or recommendations, but strict, mandatory laws. As such, they are universally enforceable—rules may not be disregarded except as approved on a need-to-use basis. In contrast to rules, guidance provides recommendations and best practices. These bits are good to follow, even highly advisable to follow, but unlike rules, they usually have some room for variance.

规则就像法律。 它们不仅仅是建议或提议，而是严格且强制性的法律。 因此，规则具有普遍可执行性——不得无视规则除非在需要使用的基础上获得豁免。 与规则相反，指导提供帮助建议和最佳实践。 指导值得遵循，甚至是高度建议能够遵守，但与规则不同的是，指导通常允许出现一些变化的空间。

We collect the rules that we define, the do’s and don’ts of writing code that must be followed, in our programming style guides, which are treated as canon. “Style” might be a bit of a misnomer here, implying a collection limited to formatting practices. Our style guides are more than that; they are the full set of conventions that govern our code. That’s not to say that our style guides are strictly prescriptive; style guide rules may call for judgement, such as the rule to use names that are “as descriptive as possible, within reason.” Rather, our style guides serve as the definitive source for the rules to which our engineers are held accountable.

我们把我们定义的规则，即写代码时必须遵守的 "允许"和 "禁止"，收集在我们的编程风格指南中，这些指南被视为典范。 “风格”可能这里有点名不副实，暗示着范围仅限于格式化实践。我们的风格指南不止于此； 它们是一套完整的约定约束我们的代码。 这并不是说我们的风格指南是严格规定的； 是指导还是规则可能需要判断，例如有一条命名规则是“[在合理范围内使用与描述性相同的名称。]” 并且，我们的风格指南是最终的来源我们的工程师必须遵守的规则。

We maintain separate style guides for each of the programming languages used at Google [^1].At a high level, all of the guides have similar goals, aiming to steer code development with an eye to sustainability. At the same time, there is a lot of variation among them in scope, length, and content. Programming languages have different strengths, different features, different priorities, and different historical paths to adoption within Google’s ever-evolving repositories of code. It is far more practical, therefore, to independently tailor each language’s guidelines. Some of our style guides are concise, focusing on a few overarching principles like naming and formatting, as demonstrated in our Dart, R, and Shell guides. Other style guides include far more detail, delving into specific language features and stretching into far lengthier documents—notably, our C++, Python, and Java guides. Some style guides put a premium on typical non-Google use of the language—our Go style guide is very short, adding just a few rules to a summary directive to adhere to the practices outlined in the externally recognized conventions. Others include rules that fundamentally differ from external norms; our C++ rules disallow use of exceptions, a language feature widely used outside of Google code.

我们为谷歌使用的每一门编程语言都单独维护了一套风格指南。在高层次上，所有指南都有相似的目标，旨在引导代码开发并着眼于可持续性。同时，也有很多变化其中包括范围、长度和内容。编程语言有不同的优势，不同的特点，不同的重点，以及在谷歌不断发展的代码库中采用的不同历史路径。因此，独立定制每种语言的指南要实际得多。我们的一部分风格指南注重简洁，专注于一些总体原则，如命名和格式，如在我们的 Dart、R 和 Shell 指南中进行演示的样子。另一部分风格指南注重更多细节方面，深入研究特定的语言特征并扩展内容，特别是我们的 C++、Python 和 Java 指南。还有一部分风格指南重视该语言在谷歌之外的惯例——我们的 Go 风格指南非常简短，只是在一个总结指令中添加了一些规则，以遵循外部公认的惯例。也有部分指南的规则和外部规范根本不同；我们的 C++ 风格指南中不允许使用异常，而使用异常是一种在 Google 代码之外广泛使用语言特性。

The wide variance among even our own style guides makes it difficult to pin down the precise description of what a style guide should cover. The decisions guiding the development of Google’s style guides stem from the need to keep our codebase sustainable. Other organizations’ codebases will inherently have different requirements for sustainability that necessitate a different set of tailored rules. This chapter discusses the principles and processes that steer the development of our rules and guidance, pulling examples primarily from Google’s C++, Python, and Java style guides.

即使是我们自己的风格指南也存在很大的差异，这使得我们很难精确地描述一个风格指南应该涵盖什么内容。指导谷歌风格指南开发背后的决策源于维持我们代码库的可持续性需求。其他组织的代码库天生对可持续性有不同的要求，这就需要一套不同的定制规则。本章讨论了指导我们规则和指南开发的原则和过程，主要从谷歌的c++、Python和Java风格指南中抽取示例。

> [^1]: Many of our style guides have external versions, which you can find at https://google.github.io/styleguide. We cite numerous examples from these guides within this chapter.
>
> 1 我们的许多风格指南都有外部版本，你可以在https://google.github.io/styleguide。我们在本章中引用了这些指南中的许多例子。

## Why Have Rules?  为什么需要规则？

So why do we have rules? The goal of having rules in place is to encourage “good” behavior and discourage “bad” behavior. The interpretation of “good” and “bad” varies by organization, depending on what the organization cares about. Such designations are not universal preferences; good versus bad is subjective, and tailored to needs. For some organizations, “good” might promote usage patterns that support a small memory footprint or prioritize potential runtime optimizations. In other organizations, “good” might promote choices that exercise new language features. Sometimes, an organization cares most deeply about consistency, so that anything inconsistent with existing patterns is “bad.” We must first recognize what a given organization values; we use rules and guidance to encourage and discourage behavior accordingly.

那么我们为什么需要规则呢?制定规则的目的是鼓励“好的”行为，阻止“坏的”行为。对“好”和“坏”的解释因组织而异，这取决于组织关心的是什么。这样的设计不是普遍的偏好;好与坏是主观的，是根据需要而定的。对于一些组织，“好”可能会促进支持小内存占用或优先考虑潜在运行时优化的使用模式。在其他组织中，“好”可能促进使用新语言特性的选择。有时，组织非常关心一致性，因此与现有模式不一致的任何东西都是“不好的”。我们必须首先认识到一个给定的组织的价值;我们使用规则和指导来鼓励和阻止相应的行为。

As an organization grows, the established rules and guidelines shape the common vocabulary of coding. A common vocabulary allows engineers to concentrate on what their code needs to say rather than how they’re saying it. By shaping this vocabulary, engineers will tend to do the “good” things by default, even subconsciously. Rules thus give us broad leverage to nudge common development patterns in desired directions.

随着组织的发展壮大，已建立的规则和指导方针形成了通用的编码词汇表。通用词汇表可以让工程师专注于他们的代码需要表达什么，而不是如何表达。通过塑造这种词汇，工程师会倾向于默认地、甚至是潜意识地去做“好”事情。因此，规则为我们提供了广泛的杠杆作用，以便将共同的开发模式推向所需的方向。

## Creating the Rules  指定规则

When defining a set of rules, the key question is not, “What rules should we have?” The question to ask is, “What goal are we trying to advance?” When we focus on the goal that the rules will be serving, identifying which rules support this goal makes it easier to distill the set of useful rules. At Google, where the style guide serves as law for coding practices, we do not ask, “What goes into the style guide?” but rather, “Why does something go into the style guide?” What does our organization gain by having a set of rules to regulate writing code?

当定义一组规则时，关键问题不是“我们应该有什么规则?”我们要问的问题是:“我们想要实现的目标是什么?”当我们关注规则将服务的目标时，识别哪些规则支持这个目标，可以更容易地提取有用的规则集。在谷歌，风格指南作为编码实践的法规，我们不会问，“风格指南中包含什么?”而是“为什么要把一些东西放进风格指南?”我们的组织通过制定一套规范代码编写的规则获得了什么?

### Guiding Principles   指导原则

Let’s put things in context: Google’s engineering organization is composed of more than 30,000 engineers. That engineering population exhibits a wild variance in skill and background. About 60,000 submissions are made each day to a codebase of more than two billion lines of code that will likely exist for decades. We’re optimizing for a different set of values than most other organizations need, but to some degree, these concerns are ubiquitous——we need to sustain an engineering environment that is resilient to both scale and time.

让我们把事情放在背景中:谷歌的工程组织由3万多名工程师组成。工程师群体在技能和背景方面表现出巨大的差异。每天大约有6万份文件提交给超过20亿行代码的代码库，这些代码库可能会存在几十年。我们正在优化一套不同于大多数其他组织所需要的价值，但在某种程度上，这些关注是无处不在的——我们需要维持一个对规模和时间都有扩展的工程环境。

In this context, the goal of our rules is to manage the complexity of our development environment, keeping the codebase manageable while still allowing engineers to work productively. We are making a trade-off here: the large body of rules that helps us toward this goal does mean we are restricting choice. We lose some flexibility and we might even offend some people, but the gains of consistency and reduced conflict furnished by an authoritative standard win out.

在这种情况下，我们规则的目标是管理开发环境的复杂性，保持代码库的可管理性，同时仍然允许工程师高效地工作。我们在这里做了权衡:帮助我们实现这一目标的大量规则确实意味着我们在限制选择。我们失去了一些灵活性，甚至可能会冒犯某些人，但权威标准所带来的一致性和减少冲突的收益是最重要的。

Given this view, we recognize a number of overarching principles that guide the development of our rules, which must:

- Pull their weight
- Optimize for the reader
- Be consistent
- Avoid error-prone and surprising constructs
- Concede to practicalities when necessary

鉴于这一观点，我们认识到一些指导我们制定规则的首要原则，这些原则必须:

- 发挥其作用
- 为读者优化
- 保持一致
- 避免容易出错和令人惊讶的结构
- 必要时对实际问题让步

#### Rules must pull their weight  规则必须发挥其作用 

Not everything should go into a style guide. There is a nonzero cost in asking all of the engineers in an organization to learn and adapt to any new rule that is set. With too many rules [^2] ,not only will it become harder for engineers to remember all relevant rules as they write their code, but it also becomes harder for new engineers to learn their way. More rules also make it more challenging and more expensive to maintain the rule set.

并不是所有的东西都应该放在风格指南中。要求组织中的所有工程师学习和适应任何新规则的成本是有一定代价的。有太多的规则，不仅会让工程师在写代码时更难记住所有相关的规则，而且也会让新工程师更难学会他们的方法。更多的规则也会使维护规则集更具挑战性和更昂贵。

To this end, we deliberately chose not to include rules expected to be self-evident. Google’s style guide is not intended to be interpreted in a lawyerly fashion; just because something isn’t explicitly outlawed does not imply that it is legal. For example, the C++ style guide has no rule against the use of goto. C++ programmers already tend to avoid it, so including an explicit rule forbidding it would introduce unnecessary overhead. If just one or two engineers are getting something wrong, adding to everyone’s mental load by creating new rules doesn’t scale.

为此，我们有意排除了大家公认的不言而喻的规则。谷歌的风格指南不打算以法律的方式解释;没有明确规定的东西并不意味着它是合法的。例如，c++风格指南没有规定禁止使用goto。c++程序员已经倾向于避免使用它，所以包含禁止使用它的显式规则将引入不必要的开销。如果只有一两个工程师犯了错误，那么通过创建新规则来增加每个人的负担是不利于以后扩展的。

> [^2]: Tooling matters here. The measure for “too many” is not the raw number of rules in play, but how many an engineer needs to remember. For example, in the bad-old-days pre-clang-format, we needed to remember a ton of formatting rules. Those rules haven’t gone away, but with our current tooling, the cost of adherence has fallen dramatically. We’ve reached a point at which somebody could add an arbitrary number of formatting rules and nobody would care, because the tool just does it for you.
>
> 2  这里的工具很重要。衡量 "太多 "的标准不是规则的初始数量，而是一个工程师需要记住多少规则。例如，在clang-format之前的糟糕时代，我们需要记住大量的格式化规则。这些规则并没有消失，但在我们目前的工具中，遵守规则的成本已经大大降低了。我们已经达到了这样的程度：任何人都可以添加任意数量的格式化规则，而没有人会在意，因为工具只是为你处理好。

#### Optimize for the reader   为读者优化

Another principle of our rules is to optimize for the reader of the code rather than the author. Given the passage of time, our code will be read far more frequently than it is written. We’d rather the code be tedious to type than difficult to read. In our Python style guide, when discussing conditional expressions, we recognize that they are shorter than if statements and therefore more convenient for code authors. However, because they tend to be more difficult for readers to understand than the more verbose if statements, we restrict their usage. We value “simple to read” over “simple to write.” We’re making a trade-off here: it can cost more upfront when engineers must repeatedly type potentially longer, descriptive names for variables and types. We choose to pay this cost for the readability it provides for all future readers.

我们规则的另一个原则是为代码的读者而不是作者优化。随着时间的推移，我们的代码被阅读的频率将远远高于编写的频率。我们宁愿代码是繁琐的输入，而不是难以阅读。在我们的Python风格指南中，当讨论条件表达式时，我们认识到它们比if语句短，因此对代码作者来说更方便。然而，由于它们往往比更冗长的if语句更难让读者理解，所以我们限制了它们的使用。我们认为“读起来简单”比“写起来简单”更重要。我们在这里做了一个权衡:当工程师必须重复地为变量和类型输入可能更长的描述性名称时，前期的成本会更高。我们选择支付这笔费用，是因为它为所有未来的读者提供了可读性。

As part of this prioritization, we also require that engineers leave explicit evidence of intended behavior in their code. We want readers to clearly understand what the code is doing as they read it. For example, our Java, JavaScript, and C++ style guides mandate use of the override annotation or keyword whenever a method overrides a superclass method. Without the explicit in-place evidence of design, readers can likely figure out this intent, though it would take a bit more digging on the part of each reader working through the code.

作为优先级的一部分，我们还要求工程师在他们的代码中留下预期行为的明确证明。我们希望读者在阅读代码时能够清楚地理解代码在做什么。例如，我们的Java、JavaScript和C++风格指导在方法重写超类方法时手动使用override注释或关键字。如果没有明确的设计证明，读者很可能会发现这一意图，但是这需要每个阅读代码的读者对代码进行更多的挖掘。

Evidence of intended behavior becomes even more important when it might be surprising. In C++, it is sometimes difficult to track the ownership of a pointer just by reading a snippet of code. If a pointer is passed to a function, without being familiar with the behavior of the function, we can’t be sure what to expect. Does the caller still own the pointer? Did the function take ownership? Can I continue using the pointer after the function returns or might it have been deleted? To avoid this problem, our C++ style guide prefers the use of std::unique_ptr when ownership transfer is intended. unique_ptr is a construct that manages pointer ownership, ensuring that only one copy of the pointer ever exists. When a function takes a unique_ptr as an argument and intends to take ownership of the pointer, callers must explicitly invoke move semantics:

这可能令人惊讶，有意行为的证明变得更加重要。在C++中，仅仅通过阅读一段代码，有时很难追踪指针的所有权。如果一个指针被传递给一个函数，在不熟悉该函数的行为的情况下，我们不能确定将会发生什么。调用者仍然拥有指针吗?这个函数拥有所有权了吗?我可以在函数返回后继续使用指针吗?或者它可能已经被删除了?为了避免这个问题，我们的C++风格指南更倾向于使用std::unique_ptr来实现所有权转移。Unique_ptr是一个管理指针所有权的构造，确保指针只有一个副本存在。当函数接受一个unique_ptr作为参数，并打算获得指针的所有权时，调用者必须显式地调用move语义:

```C++
// Function that takes a Foo* and may or may not assume ownership of 
// the passed pointer.
void TakeFoo(Foo* arg);
// Calls to the function don’t tell the reader anything about what to 
// expect with regard to ownership after the function returns.
Foo* my_foo(NewFoo());
TakeFoo(my_foo);
```

Compare this to the following:
将此与以下内容进行比较:

```C++
// Function that takes a std::unique_ptr<Foo>.
void TakeFoo(std::unique_ptr<Foo> arg);
// Any call to the function explicitly shows that ownership is 
// yielded and the unique_ptr cannot be used after the function 
// returns.
std::unique_ptr<Foo> my_foo(FooFactory()); TakeFoo(std::move(my_foo));
```

Given the style guide rule, we guarantee that all call sites will include clear evidence of ownership transfer whenever it applies. With this signal in place, readers of the code don’t need to understand the behavior of every function call. We provide enough information in the API to reason about its interactions. This clear documentation of behavior at the call sites ensures that code snippets remain readable and understandable. We aim for local reasoning, where the goal is clear understanding of what’s happening at the call site without needing to find and reference other code, including the function’s implementation.

鉴于风格指南规则，我们保证所有调用方将包括明确的所有权转移证明，无论何时适用。有了这个信号，代码的读者就不需要理解每个函数调用的行为了。我们在API中提供了足够的信息来推断它的交互。这种清晰的调用方行为文档确保了代码片段的可读性和可理解性。我们的目标是局部推理，目标是清楚地了解在调用方发生了什么，而不需要查找和引用其他代码，包括函数的具体实现。

Most style guide rules covering comments are also designed to support this goal of in-place evidence for readers. Documentation comments (the block comments prepended to a given file, class, or function) describe the design or intent of the code that follows. Implementation comments (the comments interspersed throughout the code itself) justify or highlight non-obvious choices, explain tricky bits, and underscore important parts of the code. We have style guide rules covering both types of comments, requiring engineers to provide the explanations another engineer might be looking for when reading through the code.

大多数涉及注释的风格指南规则也被设计成支持为读者提供原地证明的目标。文档注释(预先挂在给定文件、类或函数上的块注释)描述了后面代码的设计或意图。实现注释(注释穿插在代码本身中)说明或突出不明显的选择，解释棘手的部分，并强调代码的重要部分。这两种类型注释的指导风格规则在指南中都有涵盖，要求工程师提供其他工程师在阅读代码时可能正在寻找的解释。

#### Be consistent   保持一致性

Our view on consistency within our codebase is similar to the philosophy we apply to our Google offices. With a large, distributed engineering population, teams are frequently split among offices, and Googlers often find themselves traveling to other sites. Although each office maintains its unique personality, embracing local flavor and style, for anything necessary to get work done, things are deliberately kept the same. A visiting Googler’s badge will work with all local badge readers; any Google devices will always get WiFi; the video conferencing setup in any conference room will have the same interface. A Googler doesn’t need to spend time learning how to get this all set up; they know that it will be the same no matter where they are. It’s easy to move between offices and still get work done.

我们对代码库一致性的看法类似于我们应用于谷歌办公室的理念。由于工程人员众多，分布广泛，团队经常被分到不同的办公室，而且谷歌员工经常发现自己在其他地方出差。尽管每个办公室都保留了自己独特的个性，融入了当地的风味和风格，但为了完成工作，有一些东西被刻意保持一致。来访的谷歌员工的徽章可以工作在所有当地的徽章阅读器上;任何谷歌设备都可以使用WiFi;任何一间会议室的视频会议设置都将具有相同的界面。谷歌员工不需要花时间去学习如何设置这些;他们知道，无论他们在哪里，这个基本条件都是一样的。在不同的办公室之间转换工作很容易，而且还能完成工作。

That’s what we strive for with our source code. Consistency is what enables any engineer to jump into an unfamiliar part of the codebase and get to work fairly quickly. A local project can have its unique personality, but its tools are the same, its techniques are the same, its libraries are the same, and it all Just Works.

这就是我们在源代码中所追求的。一致性是使任何工程师即使进入代码库中不熟悉的部分，也能够相当迅速地开始工作的原因。一个本地项目可以有它独特的个性，但是它的工具是一样的，它的技术是一样的，它的库是一样的，而且都是正常工作的。

##### Advantages of consistency    一致性的优点

Even though it might feel restrictive for an office to be disallowed from customizing a badge reader or video conferencing interface, the consistency benefits far outweigh the creative freedom we lose. It’s the same with code: being consistent may feel constraining at times, but it means more engineers get more work done with less effort:[^3]

- When a codebase is internally consistent in its style and norms, engineers writing code and others reading it can focus on what’s getting done rather than how it is presented. To a large degree, this consistency allows for expert chunking. [^4]When we solve our problems with the same interfaces and format the code in a consistent way, it’s easier for experts to glance at some code, zero in on what’s important, and understand what it’s doing. It also makes it easier to modularize code and spot duplication. For these reasons, we focus a lot of attention on consistent naming conventions, consistent use of common patterns, and consistent formatting and structure. There are also many rules that put forth a decision on a seemingly small issue solely to guarantee that things are done in only one way.For example, take the choice of the number of spaces to use for indentation or the limit set on line length .[^5] It’s the consistency of having one answer rather than the answer itself that is the valuable part here.
- Consistency enables scaling. Tooling is key for an organization to scale, and consistent code makes it easier to build tools that can understand, edit, and generate code. The full benefits of the tools that depend on uniformity can’t be applied if everyone has little pockets of code that differ—if a tool can keep source files updated by adding missing imports or removing unused includes, if different projects are choosing different sorting strategies for their import lists, the tool might not be able to work everywhere. When everyone is using the same components and when everyone’s code follows the same rules for structure and organization, we can invest in tooling that works everywhere, building in automation for many of our maintenance tasks. If each team needed to separately invest in a bespoke version of the same tool, tailored for their unique environment, we would lose that advantage.
- Consistency helps when scaling the human part of an organization, too. As an organization grows, the number of engineers working on the codebase increases. Keeping the code that everyone is working on as consistent as possible enables better mobility across projects, minimizing the ramp-up time for an engineer switching teams and building in the ability for the organization to flex and adapt as headcount needs fluctuate. A growing organization also means that people in other roles interact with the code—SREs, library engineers, and code janitors, for example. At Google, these roles often span multiple projects, which means engineers unfamiliar with a given team’s project might jump in to work on that project’s code. A consistent experience across the codebase makes this efficient.
- Consistency also ensures resilience to time. As time passes, engineers leave projects, new people join, ownership shifts, and projects merge or split. Striving for a consistent codebase ensures that these transitions are low cost and allows us nearly unconstrained fluidity for both the code and the engineers working on it, simplifying the processes necessary for long-term maintenance.

尽管不允许办公室定制徽章阅读器或视频会议界面可能会让人觉得受到限制，但一致性带来的好处远远大于我们失去的创作自由。代码也是如此:一致性有时可能会让人感到约束，但这意味着更多的工程师用更少的努力完成更多的工作:  
- 编写代码的工程师和阅读代码的其他人就可以专注于正在完成的工作，而不是它的呈现方式。在很大程度上，这种一致性允许专家分块阅读。当我们用相同的界面解决问题，并以一致的方式格式化代码时，专家们更容易浏览一些代码，锁定重要的内容，并理解它在做什么。它还使模块化代码和定位重复变得更容易。基于这些原因，我们将重点放在一致的命名约定、一致的通用模式使用以及一致的格式和结构上。也有许多规则对看似很小的问题做出决定，只是为了保证事情只能以一种方式完成。例如，选择用于缩进的空格数或行长限制只有一个答案而不是答案本身的才是这里有价值的部分。
- 一致性可以使规模扩大。工具是组织扩展的关键，而一致的代码使构建能够理解、编辑和生成代码的工具变得更容易。如果每个人都有少量不同的代码，那么依赖于一致性的工具的全部好处就无法应用——如果一个工具可以通过添加缺失的导入或删除未使用的包含来更新源文件，如果不同的项目为他们的导入列表选择不同的排序策略，这个工具可能不能在任何地方都适用。当每个人都使用相同的组件，当每个人的代码都遵循相同的结构和组织规则时，我们就可以投资于在任何地方都能工作的工具，为我们的许多维护任务构建自动化。如果每个团队需要分别投资同一工具的定制版本，为他们独特的环境量身定制，我们就会失去这种优势。
- 在扩展组织的人力部分时，一致性也有帮助。随着组织的增长，从事代码库工作的工程师数量也会增加。让每个人都在编写的代码尽可能一致，这样可以更好地跨项目移动，最大限度地减少工程师转换团队的过渡时间，并为组织构建适应员工需求波动的能力。一个成长中的组织还意味着其他角色的人与代码SREs、库工程师和代码管理员进行交互。在谷歌，这些角色通常跨越多个项目，这意味着不熟悉某个团队项目的工程师可能会参与到项目代码的编写中。跨代码库的一致体验使得这种方法非常有效。
- 一致性也确保了对时间的适应性。随着时间的推移，工程师离开项目，新人加入，所有权转移，项目合并或分裂。努力实现一致的代码库可以确保这些转换的成本较低，并允许我们对代码和工作在代码上的工程师几乎不受约束的流动，从而简化长期维护所需的过程。

> [^3]:  Credit to H. Wright for the real-world comparison, made at the point of having visited around 15 different Google offices.
>
> 3 归功于H.Wright的现实世界的比较，这是在访问了大约15个不同的谷歌办公室后做出的。
>
> [^4]:  “Chunking” is a cognitive process that groups pieces of information together into meaningful “chunks” rather than keeping note of them individually. Expert chess players, for example, think about configurations of  pieces rather than the positions of the individuals.
>
> 4  "分块 "是一种认知过程，它将信息碎片组合成有意义的 "块"，而不是单独记下它们。例如，国际象棋高手考虑的是棋子的配置，而不是个人的位置。
>
> [^5]:  See [4.2 Block indentation: +2 spaces, Spaces vs. Tabs, 4.4 Column limit:100 and Line Length](https://oreil.ly/WhufW)
>
> 5 查阅  [4.2 Block indentation: +2 spaces, Spaces vs. Tabs, 4.4 Column limit:100 and Line Length](https://oreil.ly/WhufW)

-----

##### At Scale   规模效应

A few years ago, our C++ style guide promised to almost never change style guide rules that would make old code inconsistent: “In some cases, there might be good arguments for changing certain style rules, but we nonetheless keep things as they are in order to preserve consistency.”

几年前，我们的C++风格指南承诺，几乎不会改变会使旧代码不一致的风格指南规则:“在某些情况下，改变某些风格规则可能有很好的理由，但我们仍然保持事物的原样，以保持一致性。”

When the codebase was smaller and there were fewer old, dusty corners, that made sense.

当代码库比较小的时候，老旧的代码比较少的时候，这是有意义的。

When the codebase grew bigger and older, that stopped being a thing to prioritize. This was (for the arbiters behind our C++ style guide, at least) a conscious change: when striking this bit, we were explicitly stating that the C++ codebase would never again be completely consistent, nor were we even aiming for that.

当代码库变得更大、更老旧时，这就不再是需要优先考虑的事情了。这是(至少对于我们C++风格指南背后的裁定者来说)一个有意识的改变:当改变这一点时，我们明确地声明C++代码库将不再是完全一致的，我们甚至也不打算这样做。

It would simply be too much of a burden to not only update the rules to current best practices, but to also require that we apply those rules to everything that’s ever been written. Our Large Scale Change tooling and processes allow us to update almost all of our code to follow nearly every new pattern or syntax so that most old code exhibits the most recent approved style (see Chapter 22). Such mechanisms aren’t perfect, however; when the codebase gets as large as it is, we can’t be sure every bit of old code can conform to the new best practices. Requiring perfect consistency has reached the point where there’s too much cost for the value.

不仅要将规则更新到当前的最佳实践，而且还要将这些规则应用到已经编写的所有内容，这样的负担太大了。我们的大规模变更工具和过程允许我们更新几乎所有的代码，以遵循几乎每一个新的模式或语法，所以大多数旧的代码都呈现出最新的被认可的风格(见第22章)。然而，这种机制并不完美;当代码库变得足够大时，我们不能保证每一段旧代码都能符合新的最佳实践。对完美一致性的要求需要付出的价代价太大了。

-----

**Setting the standard.** When we advocate for consistency, we tend to focus on internal consistency. Sometimes, local conventions spring up before global ones are adopted, and it isn’t reasonable to adjust everything to match. In that case, we advocate a hierarchy of consistency: “Be consistent” starts locally, where the norms within a given file precede those of a given team, which precede those of the larger project, which precede those of the overall codebase. In fact, the style guides contain a number of rules that explicitly defer to local conventions[^6], valuing this local consistency over a scientific technical choice.

**设置标准。** 当我们提倡一致性时，我们倾向于关注内部一致性。有时，局部的惯例规则在整体惯例规则产生之前就已经出现了，因此调整一切来适应整体惯例规则是不合理的。在这种情况下，我们提倡一种层级的一致性:“保持一致性”从局部开始，一个文件中的规范优先于一个团队的规范，优先于更大的项目的规范，也优先于整个代码库的规范。事实上，风格指南包含了许多明确遵守局部惯例的规则，重视局部的一致性，而不是科学技术的选择。

However, it is not always enough for an organization to create and stick to a set of internal conventions. Sometimes, the standards adopted by the external community should be taken into account.

然而，对于一个组织来说，仅仅创建并遵守一套内部惯例是不够的。有时，应考虑到外部环境的惯例。

> [^6]: Use of const, for example.
>
> 6 [使用const](https://google.github.io/styleguide/cppguide.html#Use_of_const)，例子。

-----

##### Counting Spaces  空格的计算

The Python style guide at Google initially mandated two-space indents for all of our Python code. The standard Python style guide, used by the external Python community, uses four-space indents. Most of our early Python development was in direct support of our C++ projects, not for actual Python applications. We therefore chose to use two-space indentation to be consistent with our C++ code, which was already formatted in that manner. As time went by, we saw that this rationale didn’t really hold up. Engineers who write Python code read and write other Python code much more often than they read and write C++ code. We were costing our engineers extra effort every time they needed to look something up or reference external code snippets. We were also going through a lot of pain each time we tried to export pieces of our code into open source, spending time reconciling the differences between our internal code and the external world we wanted to join.

谷歌的Python风格指南最初要求我们所有的Python代码都采用双空格缩进。外部Python社区使用的标准Python风格指南使用四空格缩进。我们早期的大部分Python开发都是直接支持我们的C++项目，而不是实际的Python应用程序。因此，我们选择使用双空格缩进，以与我们的C++代码保持一致，C++代码已经以这种方式格式化了。随着时间的推移，我们发现这种理论并不成立。编写Python代码的工程师读和写其他Python代码的频率要比读和写c++代码的频率高得多。每次我们的工程师需要查找或引用外部代码片段时，我们都要花费额外的精力。每次我们试图将代码片段输出到开源时，我们都经历了很多痛苦，花了很多时间来调和内部代码和我们想要加入的外部世界之间的差异。

When the time came for Starlark (a Python-based language designed at Google to serve as the build description language) to have its own style guide, we chose to change to using four-space indents to be consistent with the outside world.[^7]

当Starlark(一种基于python的语言，设计于谷歌，作为构建描述语言)有了自己的风格指南时，我们选择使用四间距缩进来与外界保持一致。

-----

If conventions already exist, it is usually a good idea for an organization to be consistent with the outside world. For small, self-contained, and short-lived efforts, it likely won’t make a difference; internal consistency matters more than anything happening outside the project’s limited scope. Once the passage of time and potential scaling become factors, the likelihood of your code interacting with outside projects or even ending up in the outside world increase. Looking long-term, adhering to the widely accepted standard will likely pay off.

如果惯例已经存在，那么一个组织与外界保持一致通常是一个好主意。对于小的，独立的，生命周期短的项目，它可能不会有什么不同;内部一致性比发生在项目有限范围之外的任何事情都重要。一旦时间的推移和潜在的扩展性成为要素，代码与外部项目交互甚至最终与外部世界交互的可能性就会增加。从长远来看，坚持被广泛接受的标准可能会有回报。

> [^7]: Style formatting for BUILD files implemented with Starlark is applied by buildifier. See https://github.com/ bazelbuild/buildtools.
>
> 7 用Starlark实现的BUILD文件的样式格式由buildifier应用。参见https://github.com/ bazelbuild/buildtools。

#### Avoid error-prone and surprising constructs  避免容易出错和令人惊讶的结构

Our style guides restrict the use of some of the more surprising, unusual, or tricky constructs in the languages that we use. Complex features often have subtle pitfalls not obvious at first glance. Using these features without thoroughly understanding their complexities makes it easy to misuse them and introduce bugs. Even if a construct is well understood by a project’s engineers, future project members and maintainers are not guaranteed to have the same understanding.

我们的风格指南限制了我们使用的语言中一些更令人惊讶、不寻常或棘手的结构的使用。复杂的特征往往有一些乍一看并不明显的细微缺陷。在没有彻底了解其复杂性的情况下使用这些特性，很容易误用它们并引入错误。即使现在的项目的工程师可以很好地理解这个结构，也不能保证未来的项目成员和维护者有同样的理解。

This reasoning is behind our Python style guide ruling to avoid using power features such as reflection. The reflective Python functions hasattr() and getattr() allow a user to access attributes of objects using strings:

这就是我们Python风格指南中避免使用反射等功能特性的原因。Python反射函数hasattr()和getattr()允许用户使用字符串访问对象的属性:

```python
if hasattr(my_object, 'foo'): 
some_var = getattr(my_object, 'foo')
```

Now, with that example, everything might seem fine. But consider this: some_file.py:

现在，在这个例子中，一切看起来都很好。但是考虑一下这个:

some_file.py:

```python
A_CONSTANT = [
    'foo',
    'bar',
    'baz',
]
```

other_file.py:

```python
values = []
for field in some_file.A_CONSTANT: 
values.append(getattr(my_object, field))
```

When searching through code, how do you know that the fields foo, bar, and baz are being accessed here? There’s no clear evidence left for the reader. You don’t easily see and therefore can’t easily validate which strings are used to access attributes of your object. What if, instead of reading those values from A_CONSTANT, we read them from a Remote Procedure Call (RPC) request message or from a data store? Such obfuscated code could cause a major security flaw, one that would be very difficult to notice, simply by validating the message incorrectly. It’s also difficult to test and verify such code.

当搜索代码时，怎么知道这里访问的是字段 foo、bar 和 baz ?没有给读者留下明确的证明。你不容易看到，因此也不容易验证哪些字符串用于访问对象的属性。如果不是从A_CONSTANT读取这些值，而是从远程过程调用(Remote Procedure Call, RPC)请求消息或数据存储读取这些值，那会怎么样呢?这种模糊化的代码可能会导致一个严重的安全漏洞，一个很难被发现的漏洞，只需错误地验证消息就可能发生。测试和验证这样的代码也很困难。

Python’s dynamic nature allows such behavior, and in very limited circumstances, using hasattr() and getattr() is valid. In most cases, however, they just cause obfuscation and introduce bugs.

Python的动态特性允许这样的行为，并且在非常有限的情况下，使用hasattr()和getattr()是有效的。然而，在大多数情况下，它们只会造成混淆并引入错误。

Although these advanced language features might perfectly solve a problem for an expert who knows how to leverage them, power features are often more difficult to understand and are not very widely used. We need all of our engineers able to operate in the codebase, not just the experts. It’s not just support for the novice software engineer, but it’s also a better environment for SREs—if an SRE is debugging a production outage, they will jump into any bit of suspect code, even code written in a language in which they are not fluent. We place higher value on simplified, straightforward code that is easier to understand and maintain.

尽管这些高级语言特性可能完美地解决了知道如何利用它们的专家的问题，但强大的特性通常更难理解，而且没有得到广泛的应用。我们需要我们所有的工程师都能够在代码库中操作，而不仅仅是专家。它不仅支持新手软件工程师，而且对SRE来说也要创建一个更好的环境——如果SRE在调试生产中断，他们会跳入任何可疑的代码，甚至包括一些用他们不熟练的语言编写的代码。我们更加重视易于理解和维护的简化、直接的代码。

#### Concede to practicalities  为实用性让步

In the words of Ralph Waldo Emerson: “A foolish consistency is the hobgoblin of little minds.” In our quest for a consistent, simplified codebase, we do not want to blindly ignore all else. We know that some of the rules in our style guides will encounter cases that warrant exceptions, and that’s OK. When necessary, we permit concessions to optimizations and practicalities that might otherwise conflict with our rules.

用拉尔夫·沃尔多·爱默生的话说:“愚蠢的一致性是心胸狭隘的妖怪（为渺小的政治家、哲学家和神学家所崇拜。一个伟大的灵魂与一致性毫无关系）”。在我们追求一致的、简化的代码库时，我们不想盲目地忽略所有其他内容。我们知道风格指南中的一些规则会遇到需要例外的情况，这都是可以的。必要时，我们允许对可能与我们的规则相冲突的优化和和实际问题做出让步。

Performance matters. Sometimes, even if it means sacrificing consistency or readability, it just makes sense to accommodate performance optimizations. For example, although our C++ style guide prohibits use of exceptions, it includes a rule that allows the use of noexcept, an exception-related language specifier that can trigger compiler optimizations.

性能很重要。有时，即使这意味着牺牲一致性或可读性，适应性能优化也是有意义的。例如，尽管我们的C++风格指南禁止使用异常，但它包含了一条允许使用noexcept的规则，noexcept是一个与异常相关的语言说明符，可以触发编译器优化。

Interoperability also matters. Code that is designed to work with specific non-Google pieces might do better if tailored for its target. For example, our C++ style guide includes an exception to the general CamelCase naming guideline that permits use of the standard library’s snake_case style for entities that mimic standard library features.[^8] The C++ style guide also allows exemptions for Windows programming, where compatibility with platform features requires multiple inheritance, something explicitly forbidden for all other C++ code. Both our Java and JavaScript style guides explicitly state that generated code, which frequently interfaces with or depends on components outside of a project’s ownership, is out of scope for the guide’s rules.[^9] Consistency is vital; adaptation is key.

互操作性也很重要。为特定的非google部分而设计的代码，如果为其目标量身定做，可能会做得更好。例如，我们的C++风格指南有一个通用CamelCase命名准则的例外，它允许对模仿标准库功能的实体使用标准库的 snake_case 风格。C++风格指南还允许对Windows编程的豁免，在Windows编程中，与平台特性的兼容性需要使用多重继承，这对其他情况的C++代码来说都是明确禁止的。我们的Java和JavaScript风格指南都明确指出，生成的代码中，经常与项目之外的组件交互或依赖于这些组件的代码不在本指南的范围内。一致性是非常重要的；适应更是关键所在。

> [^8]: See [Exceptions to Naming Rules](https://google.github.io/styleguide/cppguide.html#Exceptions_to_Naming_Rules). As an example, our open sourced Abseil libraries use snake_case naming for types intended to be replacements for standard types. See the types defined in https://github.com/abseil/abseilcpp/blob/master/absl/utility/utility.h. These are C++11 implementation of C++14 standard types and therefore use the standard’s favored snake_case style instead of Google’s preferred CamelCase form.
>
> 8 见命名规则的例外情况。作为一个例子，我们的开源Abseil库对打算替代标准类型的类型使用了snake_case命名。参见https://github.com/abseil/abseilcpp/blob/master/absl/utility/utility.h 中定义的类型。这些是C++11对C++14标准类型的实现，因此使用了标准所青睐的snake_case风格，而不是谷歌所青睐的CamelCase形式。
>
> [^9};  See [Generated code: mostly exempt](https://google.github.io/styleguide/jsguide.html#policies-generated-code-mostly-exempt).
>
> 9 查阅 [生成的代码：主要是豁免](https://google.github.io/styleguide/jsguide.html#policies-generated-code-mostly-exempt)./

### The Style Guide  风格指南

So, what does go into a language style guide? There are roughly three categories into which all style guide rules fall:

- Rules to avoid dangers
- Rules to enforce best practices
- Rules to ensure consistency

那么，语言风格指南应该包含哪些内容呢?所有的风格指南规则大致分为三类:

- 规避危险的规则
- 执行最佳实践的规则
- 确保一致性的规则

#### Avoiding danger  规避危险

First and foremost, our style guides include rules about language features that either must or must not be done for technical reasons. We have rules about how to use static members and variables; rules about using lambda expressions; rules about handling exceptions; rules about building for threading, access control, and class inheritance. We cover which language features to use and which constructs to avoid. We call out standard vocabulary types that may be used and for what purposes. We specifically include rulings on the hard-to-use and the hard-to-use-correctly—some language features have nuanced usage patterns that might not be intuitive or easy to apply properly, causing subtle bugs to creep in. For each ruling in the guide, we aim to include the pros and cons that were weighed with an explanation of the decision that was reached. Most of these decisions are based on the need for resilience to time, supporting and encouraging maintainable language usage.

首先，我们的风格指南包括关于语言特性的规则，这些规则出于技术原因必须或不必须做。我们有关于如何使用静态成员和变量的规则；关于使用lambda表达式的规则;异常处理规则；关于构建线程、访问控制和类继承的规则。我们涵盖了要使用的语言特性和要避免的结构。我们列出了可以使用的标准词汇类型以及用途。我们特别包括了关于难以使用和难以正确使用的规则——一些语言特性具有微妙的使用模式，可能不直观或不容易正确应用，会导致一些Bug。对于指南中的每个规则，我们的目标是在描述所达成的决定时，解释权衡过的利弊。这些决定（规则）大多是基于对时适应性的需要，或者支持和鼓励可维护的语言使用。

#### Enforcing best practices 执行最佳实践

Our style guides also include rules enforcing some best practices of writing source code. These rules help keep the codebase healthy and maintainable. For example, we specify where and how code authors must include comments.[^10] Our rules for comments cover general conventions for commenting and extend to include specific cases that must include in-code documentation—cases in which intent is not always obvious, such as fall-through in switch statements, empty exception catch blocks, and template metaprogramming. We also have rules detailing the structuring of source files, outlining the organization of expected content. We have rules about naming: naming of packages, of classes, of functions, of variables. All of these rules are intended to guide engineers to practices that support healthier, more sustainable code.

我们的风格指南还包括一些编写源代码的最佳实践的规则。这些规则有助于保持代码库的健康和可维护性。例如，我们指定代码作者必须在哪里以及如何包含注释。我们的注释规则涵盖了注释的一般惯例，并扩展到包括必须包含代码内文档的特定情况——在这些情况下，意图并不总是明显的，例如switch语句中的失败，空的异常捕获块，以及模板元编程。我们还有详细说明源文件结构的规则，概述了预期内容的组织。我们有关于命名的规则:包、类、函数、变量的命名。所有这些规则都是为了指导工程师采用更健康、更可持续的代码的实践。

Some of the best practices enforced by our style guides are designed to make source code more readable. Many formatting rules fall under this category. Our style guides specify when and how to use vertical and horizontal whitespace in order to improve readability. They also cover line length limits and brace alignment. For some languages, we cover formatting requirements by deferring to autoformatting tools— gofmt for Go, dartfmt for Dart. Itemizing a detailed list of formatting requirements or naming a tool that must be applied, the goal is the same: we have a consistent set of formatting rules designed to improve readability that we apply to all of our code.

我们的风格指南中实施的一些最佳实践旨在使源代码更具可读性。许多格式规则都属于这一类。我们的样式指南指定了何时以及如何使用换行和水平空格，以提高可读性。它们还包括行长度限制和大括号对齐。对于某些语言，我们通过使用自动格式化工具来满足格式化要求——Go 的 gofmt 和 Dart 的 dartfmt。逐项列出格式化需求的详细列表，或者命名必须应用的工具，目标是相同的:我们有一套一致的格式化规则，旨在提高我们所有代码的可读性。

Our style guides also include limitations on new and not-yet-well-understood language features. The goal is to preemptively install safety fences around a feature’s potential pitfalls while we all go through the learning process. At the same time, before everyone takes off running, limiting use gives us a chance to watch the usage patterns that develop and extract best practices from the examples we observe. For these new features, at the outset, we are sometimes not sure of the proper guidance to give. As adoption spreads, engineers wanting to use the new features in different ways discuss their examples with the style guide owners, asking for allowances to permit additional use cases beyond those covered by the initial restrictions. Watching the waiver requests that come in, we get a sense of how the feature is getting used and eventually collect enough examples to generalize good practice from bad. After we have that information, we can circle back to the restrictive ruling and amend it to allow wider use.

我们的风格指南还包括对新的和尚未被很好理解的语言特性的限制。目的是在学习过程中，在一个功能的潜在缺陷周围预先安装安全围栏。同时，在每个人都应用起来之前，限制使用让我们有机会观察，从我们观察的例子中开发和提取最佳实践的使用模式。对于这些新特性，在开始的时候，我们有时并不确定该如何给予适当的指导。随着采用范围的扩大，希望以不同方式使用新特性的工程师会与风格指南的所有者讨论他们的例子，要求允许超出最初限制范围的额外用例。通过观察收到的豁免请求，我们了解了该特性是如何被使用的，并最终收集了足够多的示例来总结好的实践。在我们得到这些信息之后，我们可以回到限制性规则，并修改它以允许更广泛的使用。

> [^10]: See `https://google.github.io/styleguide/cppguide.html#Comments`, `http://google.github.io/styleguide/pyguide#38-comments-and-docstrings`, and `https://google.github.io/styleguide/javaguide.html#s7-javadoc`, where multiple languages define general comment rules.
>
> 10 查阅 `https://google.github.io/styleguide/cppguide.html#Comments`, `http://google.github.io/styleguide/pyguide#38-comments-and-docstrings`, 以及 `https://google.github.io/styleguide/javaguide.html#s7-javadoc`, where multiple languages define general comment rules.其中多种语言定义了一般的评论规则。

---

#### Case Study: Introducing std::unique_ptr  案例分析：介绍 std::unique_ptr

When C++11 introduced std::unique_ptr, a smart pointer type that expresses exclusive ownership of a dynamically allocated object and deletes the object when the unique_ptr goes out of scope, our style guide initially disallowed usage. The behavior of the unique_ptr was unfamiliar to most engineers, and the related move semantics that the language introduced were very new and, to most engineers, very confusing. Preventing the introduction of std::unique_ptr in the codebase seemed the safer choice. We updated our tooling to catch references to the disallowed type and kept our existing guidance recommending other types of existing smart pointers.

当C++11引入std::unique_ptr是一种智能指针类型，它表达了对动态分配对象的独占所有权，并在unique_ptr超出范围时删除该对象，我们的风格指南最初不允许使用。unique_ptr 的使用方式对于大多数工程师来说是不熟悉的，并且该语言引入的相关的move语义是非常新的，对大多数工程师来说，非常令人困惑。防止在代码库中引入std::unique_ptr似乎是更安全的选择。我们更新了工具来捕获对不允许类型的引用，并保留了现有的指南规则，建议使用其他类型的智能指针。

Time passed. Engineers had a chance to adjust to the implications of move semantics and we became increasingly convinced that using std::unique_ptr was directly in line with the goals of our style guidance. The information regarding object ownership that a std::unique_ptr facilitates at a function call site makes it far easier for a reader to understand that code. The added complexity of introducing this new type, and the novel move semantics that come with it, was still a strong concern, but the significant improvement in the long-term overall state of the codebase made the adoption of std::unique_ptr a worthwhile trade-off.

时间飞逝。工程师有机会适应move语义的语义，我们也越来越相信使用std::unique_ptr直接符合我们的风格指南的目标。在函数调用处上，std::unique_ptr所提供的关于对象所有权的信息使读者更容易理解该代码。引入这种新类型所增加的复杂性，以及随之而来的新的move语义，仍然是一个值得关注的问题，但是代码库长期整体状态的显著改善使得采用std::unique_ptr是一个值得的权衡。

---

#### Building in consistency  构建一致性

Our style guides also contain rules that cover a lot of the smaller stuff. For these rules, we make and document a decision primarily to make and document a decision. Many rules in this category don’t have significant technical impact. Things like naming conventions, indentation spacing, import ordering: there is usually no clear, measurable, technical benefit for one form over another, which might be why the technical community tends to keep debating them.[^11] By choosing one, we’ve dropped out of the endless debate cycle and can just move on. Our engineers no longer spend time discussing two spaces versus four. The important bit for this category of rules is not what we’ve chosen for a given rule so much as the fact that we have chosen.

我们的风格指南还包含了一些规则，涵盖了许多较小的内容。对于这些规则，我们主要是为了做出和记录一个决定。这类规则中的许多规则都没有重大的技术影响。诸如命名约定、缩进间距、导入顺序等:通常一种形式相对于另一种形式没有明确的、可衡量的技术优势，这可能是技术社区倾向于对它们争论不休的原因。选择一个，我们就退出了无休止的辩论循环，可以继续前进了。我们的工程师不再花时间去讨论两个空格与四个空格。这类规则的重要部分不是我们为给定的规则选择的内容，而是我们选择的这个动作本身。

> 11 Such discussions are really just bikeshedding, an illustration of Parkinson’s law of triviality.
>
> 11 这样的讨论实际上只是在骑自行车，是对帕金森法则的零散的描述。

#### And for everything else...   至于其他的一切……

With all that, there’s a lot that’s not in our style guides. We try to focus on the things that have the greatest impact on the health of our codebase. There are absolutely best practices left unspecified by these documents, including many fundamental pieces of good engineering advice: don’t be clever, don’t fork the codebase, don’t reinvent the wheel, and so on. Documents like our style guides can’t serve to take a complete novice all the way to a master-level understanding of software engineering—there are some things we assume, and this is intentional.

除此之外，还有很多内容不在我们的风格指南中。我们试着专注于那些对我们代码库的健康状况有重大影响的事情。这些文档中绝对有一些没有详细说明的最佳实践，包括许多很好的工程建议:不要自做聪明，不要分支代码库，不要重新发明轮子，等等。像我们的风格指南这样的文档不能让一个完全的新手拥有软件工程大师的理解——有些事情是我们假设的，这是故意的。

## Changing the Rules  改变规则

Our style guides aren’t static. As with most things, given the passage of time, the landscape within which a style guide decision was made and the factors that guided a given ruling are likely to change. Sometimes, conditions change enough to warrant reevaluation. If a new language version is released, we might want to update our rules to allow or exclude new features and idioms. If a rule is causing engineers to invest effort to circumvent it, we might need to reexamine the benefits the rule was supposed to provide. If the tools that we use to enforce a rule become overly complex and burdensome to maintain, the rule itself might have decayed and need to be revisited. Noticing when a rule is ready for another look is an important part of the process that keeps our rule set relevant and up to date.

我们的风格指南不是一成不变的。与大多数事情一样，随着时间的推移，做出风格指导决策的环境和指导给定裁决的因素可能会发生变化。有时，情况的变化足以使人们需要重新评估。如果发布了新的语言版本，我们可能需要更新规则以允许或排除新的特性和习惯用法。如果某个规则是工程师需要付出努力来规避它的，我们可能需要重新审视该规则本来应该提供的好处。如果我们用来执行规则的工具变得过于复杂和难于维护，那么规则本身可能已经腐化，需要重新修订。注意到一条规则何时准备好，以便再次审视，这是过程中的一个重要部分，它使我们的规则集保持相关性和时效性。

The decisions behind rules captured in our style guides are backed by evidence. When adding a rule, we spend time discussing and analyzing the relevant pros and cons as well as the potential consequences, trying to verify that a given change is appropriate for the scale at which Google operates. Most entries in Google’s style guides include these considerations, laying out the pros and cons that were weighed during the process and giving the reasoning for the final ruling. Ideally, we prioritize this detailed reasoning and include it with every rule.

在我们的风格指南中，规则背后的决定是有证据支持的。在添加规则时，我们将花时间讨论和分析相关的利弊以及潜在的后果，并试图验证给定的更改是否适合谷歌运营规模。谷歌风格指南中的大多数条目都包含了这些考虑因素，列出了在过程中权衡的利弊，并给出了最终裁决的理由。理想情况下，我们优先考虑这种详细的推理，并将其包含在每条规则中。

Documenting the reasoning behind a given decision gives us the advantage of being able to recognize when things need to change. Given the passage of time and changing conditions, a good decision made previously might not be the best current one. With influencing factors clearly noted, we are able to identify when changes related to one or more of these factors warrant reevaluating the rule.

记录给定决策背后的原因，使我们能够识别何时需要更改。考虑到时间的流逝和环境的变化，以前做出的好决定可能不是现在的最佳决定。明确地指出影响因素后，我们就能够确定何时与一个或多个因素相关的更改需要重新评估规则。

---

#### Case Study:CamelCase Naming 案例分析：驼峰命名法

At Google, when we defined our initial style guidance for Python code, we chose to use CamelCase naming style instead of snake_case naming style for method names. Although the public Python style guide (PEP 8) and most of the Python community used snake_case naming, most of Google’s Python usage at the time was for C++ developers using Python as a scripting layer on top of a C++ codebase. Many of the defined Python types were wrappers for corresponding C++ types, and because Google’s C++ naming conventions follow CamelCase style, the cross-language consistency was seen as key.

在谷歌，当我们为Python代码定义初始风格指导时，我们选择使用驼峰命名风格，而不是使用snake_case命名风格来命名方法名。尽管公共Python风格指南(PEP 8)和大多数Python社区使用了snake_case命名，但当时谷歌的大多数Python用法是为c++开发人员使用Python作为c++代码库之上的脚本层。许多定义的Python类型是相应c++类型的包装工具，因为Goo‐gle的C++命名惯例遵循驼峰命名风格，在这里跨语言的一致性被视为关键。

Later, we reached a point at which we were building and supporting independent Python applications. The engineers most frequently using Python were Python engineers developing Python projects, not C++ engineers pulling together a quick script. We were causing a degree of awkwardness and readability problems for our Python engineers, requiring them to maintain one standard for our internal code but constantly adjust for another standard every time they referenced external code. We were also making it more difficult for new hires who came in with Python experience to adapt to our codebase norms.

后来，我们到了构建和支持独立 Python 应用程序的地步。最经常使用Python的工程师是那些开发Python项目的Python工程师，而不是编写快速脚本的C++工程师。我们给我们的Python工程师造成了一定程度的尴尬和可读性问题，要求他们为我们的内部代码维护一个标准，但每次他们引用外部代码时都要不断地调整另一个标准。我们还让有Python经验的新员工更难以适应我们的代码库规范。

As our Python projects grew, our code more frequently interacted with external Python projects. We were incorporating third-party Python libraries for some of our projects, leading to a mix within our codebase of our own CamelCase format with the externally preferred snake_case style. As we started to open source some of our Python projects, maintaining them in an external world where our conventions were nonconformist added both complexity on our part and wariness from a community that found our style surprising and somewhat weird.

随着Python 项目的增长，我们的代码与外部Python项目的交互越来越频繁。我们在一些项目中合并了第三方Python库，导致我们的代码库中混合了我们自己的驼峰命名格式和外部偏爱的snake_case样式。当我们开始开源我们的一些Python项目时，在一个我们的没有约定规范限制的外部世界中维护它们，既增加了我们的复杂性，也增加了社区对我们风格的警惕，他们觉得我们的风格令人惊讶，有些怪异。

Presented with these arguments, after discussing both the costs (losing consistency with other Google code, reeducation for Googlers used to our Python style) and benefits (gaining consistency with most other Python code, allowing what was already leaking in with third-party libraries), the style arbiters for the Python style guide decided to change the rule. With the restriction that it be applied as a file-wide choice, an exemption for existing code, and the latitude for projects to decide what is best for them, the Google Python style guide was updated to permit snake_case naming.

提出这些论点后，讨论了成本(失去与其他谷歌代码的一致性，对习惯于我们的 Python 风格的 Google 员工进行再教育)和好处(获得与大多数其他Python代码的一致性，允许已经泄露到第三方库的内容)，Python风格指南的风格仲裁者决定改变规则。有了它被应用为文件范围的选择的限制，现有代码的例外，以及项目决定什么最适合他们的自由度，谷歌Python风格指南已更新为允许 snake_case 命名。

---

### The Process  过程

Recognizing that things will need to change, given the long lifetime and ability to scale that we are aiming for, we created a process for updating our rules. The process for changing our style guide is solution based. Proposals for style guide updates are framed with this view, identifying an existing problem and presenting the proposed change as a way to fix it. “Problems,” in this process, are not hypothetical examples of things that could go wrong; problems are proven with patterns found in existing Google code. Given a demonstrated problem, because we have the detailed reasoning behind the existing style guide decision, we can reevaluate, checking whether a different conclusion now makes more sense.

考虑到我们所追求的长生命周期和扩展能力，我们认识到事情需要改变，因此我们创建了一个更新规则的过程。改变我们的风格指南的过程是基于解决方案的。风格指南更新的建议是以此观点为框架的，识别现有的问题，并将建议的更改作为修复问题的一种方法。在这个过程中，“问题”并不是可能出错的假设例子;问题是通过在现有谷歌代码中发现的模式来证明的。给定一个被证明的问题，因为我们有现有风格指南决策背后的详细理由，我们可以重新评估，检查和之前不同的结论现在是否更有意义。

The community of engineers writing code governed by the style guide are often best positioned to notice when a rule might need to be changed. Indeed, here at Google, most changes to our style guides begin with community discussion. Any engineer can ask questions or propose a change, usually by starting with the language-specific mailing lists dedicated to style guide discussions.

编写风格指南所规范的代码的工程师群体，往往最能注意到何时需要改变规则。事实上，在谷歌，我们的风格指南的大多数改变都是从社区讨论开始的。任何工程师都可以提出问题或提出更改建议，通常从专门用于讨论风格指南的特定语言邮件列表开始。

Proposals for style guide changes might come fully-formed, with specific, updated wording suggested, or might start as vague questions about the applicability of a given rule. Incoming ideas are discussed by the community, receiving feedback from other language users. Some proposals are rejected by community consensus, gauged to be unnecessary, too ambiguous, or not beneficial. Others receive positive feedback, gauged to have merit either as-is or with some suggested refinement. These proposals, the ones that make it through community review, are subject to final decision- making approval.

关于风格指南更改的建议可能是完整的，包括建议的具体的、更新的建议，或者可能以关于给定规则的适用性的模糊问题开始。社区会讨论新想法，并接收其他语言用户的反馈。一些提案被社区共识拒绝，被认为是不必要的、过于模糊的或无益的。另一些则收到了积极的反馈，被认为是有价值的，或者有一些建议的改进。这些提案，经过社区审查后，需要得到最终决策的批准。

### The Style Arbiters  风格仲裁者

At Google, for each language’s style guide, final decisions and approvals are made by the style guide’s owners—our style arbiters. For each programming language, a group of long-time language experts are the owners of the style guide and the designated decision makers. The style arbiters for a given language are often senior members of the language’s library team and other long-time Googlers with relevant language experience.

在谷歌，对于每种语言的风格指南，最终的决定和批准都是由风格指南的所有者——我们的风格仲裁者——做出的。对于每一种编程语言，都有一群资深的语言专家是风格指南的所有者和指定的决策者。特定语言的风格仲裁人通常是该语言库团队的高级成员，以及其他具有相关语言经验的长期谷歌员工。

The actual decision making for any style guide change is a discussion of the engineering trade-offs for the proposed modification. The arbiters make decisions within the context of the agreed-upon goals for which the style guide optimizes. Changes are not made according to personal preference; they’re trade-off judgments. In fact, the C++ style arbiter group currently consists of four members. This might seem strange: having an odd number of committee members would prevent tied votes in case of a split decision. However, because of the nature of the decision making approach, where nothing is “because I think it should be this way” and everything is an evaluation of trade-off, decisions are made by consensus rather than by voting. The four-member group is happily functional as-is.

对于任何风格指南的更改，实际的决策都是对提议修改的工程权衡的反复讨论。仲裁者在风格指南优化的一致目标上下文中做出决定。更改并非根据个人喜好。它们是权衡判断。事实上，C++风格仲裁组目前由四个成员组成。这可能看起来很奇怪:如果委员会成员人数为奇数，就可以防止出现出现意见分歧的情况，出现票数平手的情况。然而，由于决策制定方法的本质，没有什么是“因为我认为它应该是这样的”，一切都是一种权衡，决策是通过共识而不是投票做出的。这个由四名成员组成的小组就这样愉快地运作着。

### Exceptions   例外

Yes, our rules are law, but yes, some rules warrant exceptions. Our rules are typically designed for the greater, general case. Sometimes, specific situations would benefit from an exemption to a particular rule. When such a scenario arises, the style arbiters are consulted to determine whether there is a valid case for granting a waiver to a particular rule.

没错，我们的规则就是法律，但也有例外。我们的规则通常是为更大的一般情况而设计的。有时，特定的情况会受益于对特定规则的豁免。当出现这种情况时，会咨询风格仲裁者，以确定是否存在授予某个特定规则豁免的有效案例。

Waivers are not granted lightly. In C++ code, if a macro API is introduced, the style guide mandates that it be named using a project-specific prefix. Because of the way C++ handles macros, treating them as members of the global namespace, all macros that are exported from header files must have globally unique names to prevent collisions. The style guide rule regarding macro naming does allow for arbiter-granted exemptions for some utility macros that are genuinely global. However, when the reason behind a waiver request asking to exclude a project-specific prefix comes down to preferences due to macro name length or project consistency, the waiver is rejected. The integrity of the codebase outweighs the consistency of the project here.

豁免不是轻易就能获得的。在C++代码中，如果引入了宏API，风格指南要求使用特定于项目的前缀来命名它。由于C++处理宏的方式，将它们视为全局命名空间的成员，所有从头文件导出的宏必须具有全局唯一的名称，以防止冲突。关于宏命名的风格指南规则确实允许对一些真正全局的实用宏进行仲裁授予的豁免。但是，当请求排除项目特定前缀的豁免请求背后的原因归结为由于宏名称长度或项目一致性而导致的偏好时，豁免被拒绝。这里代码库的完整性胜过项目的一致性。

Exceptions are allowed for cases in which it is gauged to be more beneficial to permit the rule-breaking than to avoid it. The C++ style guide disallows implicit type conversions, including single-argument constructors. However, for types that are designed to transparently wrap other types, where the underlying data is still accurately and precisely represented, it’s perfectly reasonable to allow implicit conversion. In such cases, waivers to the no-implicit-conversion rule are granted. Having such a clear case for valid exemptions might indicate that the rule in question needs to be clarified or amended. However, for this specific rule, enough waiver requests are received that appear to fit the valid case for exemption but in fact do not—either because the specific type in question is not actually a transparent wrapper type or because the type is a wrapper but is not actually needed—that keeping the rule in place as-is is still worthwhile.

在被认为允许违反规则比避免违反规则更有利的情况下，允许例外。C++ 风格指南不允许隐式类型转换，包括单参数构造函数。然而，对于那些被设计成透明地包装其他类型的类型，其中的底层数据仍然被精确地表示出来，允许隐式转换是完全合理的。在这种情况下，授予对无隐式转换规则的豁免。拥有如此明确的有效豁免案例可能表明需要澄清或修改相关规则。然而,对于此特定规则，收到了足够多的豁免请求，这些请求似乎适合豁免的有效案例，但实际上不符合。因为所讨论的特定类型实际上不是透明包装工具类型，或者因为该类型是包装工具但实际上并不需要——保持原样的规则仍然是值得的。

## Guidance  指导

In addition to rules, we curate programming guidance in various forms, ranging from long, in-depth discussion of complex topics to short, pointed advice on best practices that we endorse.

除了规则之外，我们还以各种形式提供编程指导，从对复杂主题的长而深入的讨论到对我们认可的最佳实践的简短而有针对性的建议。

Guidance represents the collected wisdom of our engineering experience, documenting the best practices that we’ve extracted from the lessons learned along the way. Guidance tends to focus on things that we’ve observed people frequently getting wrong or new things that are unfamiliar and therefore subject to confusion. If the rules are the “musts,” our guidance is the “shoulds.”

指导代表了我们收集的工程经验的智慧，记录了我们从一路走来的经验教训中提取的最佳实践。指导往往侧重于我们观察到人们经常出错的事情或不熟悉并因此容易混淆的新事物。如果规则是“必须”，那么我们的指导就是“应该”。

One example of a pool of guidance that we cultivate is a set of primers for some of the predominant languages that we use. While our style guides are prescriptive, ruling on which language features are allowed and which are disallowed, the primers are descriptive, explaining the features that the guides endorse. They are quite broad in their coverage, touching on nearly every topic that an engineer new to the language’s use at Google would need to reference. They do not delve into every detail of a given topic, but they provide explanations and recommended use. When an engineer needs to figure out how to apply a feature that they want to use, the primers aim to serve as the go-to guiding reference.

我们培养的指导库的一个例子是我们使用的一些主要语言的编写入门指南。虽然我们的风格指南是规范性的，规定了哪些语言特性是允许的，哪些是不允许的，而入门指南是描述性的，解释了指南认可的特性。他们的内容相当广泛，几乎涵盖了谷歌新使用该语言的工程师需要参考的所有主题。它们不会深入研究特定主题的每一个细节，但它们提供解释和推荐使用。当工程师需要弄清楚如何应用他们想要使用的功能时，入门指南的目的是作为指导参考。

A few years ago, we began publishing a series of C++ tips that offered a mix of general language advice and Google-specific tips. We cover hard things—object lifetime, copy and move semantics, argument-dependent lookup; new things—C++ 11 features as they were adopted in the codebase, preadopted C++17 types like string_view, optional, and variant; and things that needed a gentle nudge of correction—reminders not to use using directives, warnings to remember to look out for implicit bool conversions. The tips grow out of actual problems encountered, addressing real programming issues that are not covered by the style guides. Their advice, unlike the rules in the style guide, are not true canon; they are still in the category of advice rather than rule. However, given the way they grow from observed patterns rather than abstract ideals, their broad and direct applicability set them apart from most other advice as a sort of “canon of the common.” Tips are narrowly focused and relatively short, each one no more than a few minutes’ read. This “Tip of the Week” series has been extremely successful internally, with frequent citations during code reviews and technical discussions.[^12]

几年前，我们开始发布一系列C++提示，其中包括通用语言建议和谷歌特有的提示。我们涵盖了困难的事情——对象生命期、复制和移动语义、依赖于参数的查找;新事物- C++11特性，它们在代码库中被采用，预采用的 C++17 类型，如string_view, optional, 和 variant;还有一些东西需要温和的调整——提醒不要使用using指令，警告要记住寻找隐式布尔转换。这些技巧来源于所遇到的实际问题，解决了样式指南中没有涉及的实际编程问题。与风格指南中的规则不同，它们的建议并不是真正的经典;它们仍然属于建议而非规则的范畴。然而，考虑到它们是从观察到的模式而不是抽象的理想中发展出来的，它们广泛而直接的适用性使它们有别于大多数其他建议，成为一种“共同的经典”。这些小贴士的内容都比较狭隘，篇幅也相对较短，每一条都不超过几分钟的阅读时间。这个“每周技巧”系列在内部已经非常成功，在代码评审和技术讨论中经常被引用。

Software engineers come in to a new project or codebase with knowledge of the programming language they are going to be using, but lacking the knowledge of how the programming language is used within Google. To bridge this gap, we maintain a series of “<Language>@Google 101” courses for each of the primary programming languages in use. These full-day courses focus on what makes development with that language different in our codebase. They cover the most frequently used libraries and idioms, in-house preferences, and custom tool usage. For a C++ engineer who has just become a Google C++ engineer, the course fills in the missing pieces that make them not just a good engineer, but a good Google codebase engineer.

软件工程师进入一个新的项目或代码库时，已经掌握了他们将要使用的编程语言的知识，但缺乏关于如何在 Google 中使用该编程语言的知识。为了弥补这一差距，我们为使用中的每一种主要编程语言设置了一系列的“<语言>@Google 101”课程。这些全日制课程侧重于在我们的代码库中使用该语言进行开发的不同之处。它们涵盖了最常用的库和习惯用法、内部首选项和自定义工具的使用。对于一个刚刚成为谷歌C++工程师的C++工程师，该课程填补了缺失的部分，使他们不仅是一名优秀的工程师，而且是一名优秀的 Google 代码库工程师。

In addition to teaching courses that aim to get someone completely unfamiliar with our setup up and running quickly, we also cultivate ready references for engineers deep in the codebase to find the information that could help them on the go. These references vary in form and span the languages that we use. Some of the useful references that we maintain internally include the following:

- Language-specific advice for the areas that are generally more difficult to get correct (such as concurrency and hashing).
- Detailed breakdowns of new features that are introduced with a language update and advice on how to use them within the codebase.
- Listings of key abstractions and data structures provided by our libraries. This keeps us from reinventing structures that already exist and provides a response to, “I need a thing, but I don’t know what it’s called in our libraries.”

除了教授旨在让完全不熟悉我们的人快速运行的课程外，我们还为深入代码库的工程师培养现成的参考资料，以便在学习途中找到可以帮助他们的信息。这些参考资料的形式各不相同，并且跨越了我们使用的语言。我们内部维护的一些有用的参考资料包括：

- 针对通常很难正确处理的领域(如并发性和散列)提供特定语言的建议。
- 语言更新中引入的新特性的详细分解，以及如何在代码库中使用它们的建议。
- 我们库提供的关键抽象和数据结构列表。这阻止了我们重新创建已经存在的结构，并提供了对“我需要一个东西，但我不知道它在我们的库中叫什么”的回应。

> 12 https://abseil.io/tips has a selection of some of our most popular tips.
>
> 12 https://abseil.io/tips 选择了一些我们最受欢迎的提示。

## Applying the Rules  应用规则

Rules, by their nature, lend greater value when they are enforceable. Rules can be enforced socially, through teaching and training, or technically, with tooling. We have various formal training courses at Google that cover many of the best practices that our rules require. We also invest resources in keeping our documentation up to date to ensure that reference material remains accurate and current. A key part of our overall training approach when it comes to awareness and understanding of our rules is the role that code reviews play. The readability process that we run here at Google —where engineers new to Google’s development environment for a given language are mentored through code reviews—is, to a great extent, about cultivating the habits and patterns required by our style guides (see details on the readability process in
Chapter 3). The process is an important piece of how we ensure that these practices are learned and applied across project boundaries.

就其本质而言，规则在可执行的情况下会带来更大的价值。规则可以通过教学和培训在社会上执行，也可以在技术上通过工具来执行。我们在谷歌提供了各种正式的培训课程，涵盖了我们的规则所要求的许多最佳实践。我们还投入资源使我们的文档保持更新，以确保参考材料保持准确和最新。当涉及到对规则的了解和理解时，我们整体培训方法的一个关键部分是代码评审所扮演的角色。我们在谷歌运行的可读性过程——在这里，针对特定语言的谷歌开发环境的新工程师会通过代码审查来指导——在很大程度上是为了培养我们的风格指南所要求的习惯和模式(详见第3章可读性过程) 。这个过程是我们如何确保这些实践是跨项目边界学习和应用的重要部分。

Although some level of training is always necessary—engineers must, after all, learn the rules so that they can write code that follows them—when it comes to checking for compliance, rather than exclusively depending on engineer-based verification, we strongly prefer to automate enforcement with tooling.

尽管一定程度的培训总是必要的——毕竟，工程师必须学习规则，这样他们才能编写遵循规则的代码——但在检查合规性时，我们强烈倾向于不完全依赖基于工程师的验证使用工具自动执行。

Automated rule enforcement ensures that rules are not dropped or forgotten as time passes or as an organization scales up. New people join; they might not yet know all the rules. Rules change over time; even with good communication, not everyone will remember the current state of everything. Projects grow and add new features; rules that had previously not been relevant are suddenly applicable. An engineer checking for rule compliance depends on either memory or documentation, both of which can fail. As long as our tooling stays up to date, in sync with our rule changes, we know that our rules are being applied by all our engineers for all our projects.

自动执行规则确保了规则不会随着时间流逝或组织扩展而被遗漏或遗忘。新的人加入；他们可能还不熟悉所有规则。规则随时间演变；即使沟通顺畅，也非所有人都能记住每项事物的当前状态。项目不断发展并添加新功能;以前不相关的规则突然适用了。检查规则合规性的工程师依赖于记忆或文档，这两者都可能失败。只要我们的工具保持更新，与我们的规则更改同步，我们就知道我们的规则被我们所有的工程师应用于我们所有的项目。

Another advantage to automated enforcement is minimization of the variance in how a rule is interpreted and applied. When we write a script or use a tool to check for compliance, we validate all inputs against a single, unchanging definition of the rule. We aren’t leaving interpretation up to each individual engineer. Human engineers view everything with a perspective colored by their biases. Unconscious or not, potentially subtle, and even possibly harmless, biases still change the way people view things. Leaving enforcement up to engineers is likely to see inconsistent interpretation and application of the rules, potentially with inconsistent expectations of accountability. The more that we delegate to the tools, the fewer entry points we leave for human biases to enter.

自动执行的另一个优点是最大限度地减少了规则解释和应用的差异性。当我们编写脚本或使用工具检查合规性时，我们会根据一个单一的、不变的规则定义来验证所有输入。我们不会将解释留给每个单独的工程师。人类工程师以带有偏见的视角看待一切。无论是否是无意识的，潜在的微妙的，甚至可能是无害的，偏见仍然会改变人们看待事物的方式。如果让工程师来执行这些规则，可能会导致对规则的解释和应用不一致，对责任的期望也可能不一致。我们授权给工具的越多，留给人类偏见进入的入口就越少。

Tooling also makes enforcement scalable. As an organization grows, a single team of experts can write tools that the rest of the company can use. If the company doubles in size, the effort to enforce all rules across the entire organization doesn’t double, it costs about the same as it did before.

工具还使执行具有可扩展性。随着组织的成长，专家团队可以开发出全公司都能使用的工具。如果公司的规模扩大一倍，在整个组织内执行所有规则的成本不会增加一倍，它与以前差不多。

Even with the advantages we get by incorporating tooling, it might not be possible to automate enforcement for all rules. Some technical rules explicitly call for human judgment. In the C++ style guide, for example: “Avoid complicated template metaprogramming.” “Use auto to avoid type names that are noisy, obvious, or unimportant—cases where the type doesn’t aid in clarity for the reader.” “Composition is often more appropriate than inheritance.” In the Java style guide: “There’s no single correct recipe for how to [order the members and initializers of your class]; different classes may order their contents in different ways.” “It is very rarely correct to do nothing in response to a caught exception.” “It is extremely rare to override Object.finalize.” For all of these rules, judgment is required and tooling can’t (yet!) take that place.

即使具有我们通过合并工具获得的优势，也可能无法自动执行所有规则。一些技术规则明确要求人的判断。例如，在C++风格指南中:“避免复杂的模板元编程。”“使用auto来避免冗长、明显或不重要的类型名，这些类型名不能帮助读者清晰地读懂。“组合通常比继承更合适。”在Java风格指南中:“对于如何[对类的成员和初始化程序进行排序]并没有一个正确的方法;不同的类可能以不同的方式排列内容。”“对所捕获的异常不做任何响应很少是正确的。"覆盖 Object.finalize 的情况极为罕见。"对于所有这些规则，都需要人工判断，工具目前还不能代替判断。

Other rules are social rather than technical, and it is often unwise to solve social problems with a technical solution. For many of the rules that fall under this category, the details tend to be a bit less well defined and tooling would become complex and expensive. It’s often better to leave enforcement of those rules to humans. For example, when it comes to the size of a given code change (i.e., the number of files affected and lines modified) we recommend that engineers favor smaller changes. Small changes are easier for engineers to review, so reviews tend to be faster and more thorough. They’re also less likely to introduce bugs because it’s easier to reason about the potential impact and effects of a smaller change. The definition of small, however, is somewhat nebulous. A change that propagates the identical one-line update across hundreds of files might actually be easy to review. By contrast, a smaller, 20-line change might introduce complex logic with side effects that are difficult to evaluate. We recognize that there are many different measurements of size, some of which may be subjective—particularly when taking the complexity of a change into account. This is why we do not have any tooling to autoreject a proposed change that exceeds an arbitrary line limit. Reviewers can (and do) push back if they judge a change to be too large. For this and similar rules, enforcement is up to the discretion of the engineers authoring and reviewing the code. When it comes to technical rules, however, whenever it is feasible, we favor technical enforcement.

其他规则是社会性的而不是技术性的，用技术性的解决方案来解决社会性问题通常是不明智的。对于这个类别下的许多规则，细节往往不太明确，工具将变得复杂且昂贵。将这些规则的执行留给人类通常会更好。例如，当涉及到给定代码更改的大小（即受影响的文件数和修改的行数）时，我们建议工程师倾向于较小的更改。对于工程师来说，小的变更更容易审核，所以审核往往更快、更可靠。它们也不太可能引入bug，因为更容易推断出较小更改的潜在影响和效果。然而，“小”的定义有些模糊。一个在数百个文件中传播相同的单行更新的变化实际上可能很容易审查。相比之下，一个较小的20行修改可能会引入复杂的逻辑，并产生难以评估的副作用。我们认识到有许多不同的衡量尺度，其中一些可能是主观的——特别是当考虑到变化的复杂性时。这就是为什么我们没有任何工具来自动拒绝超过任意行限制的建议更改。如果审阅者认为更改过大，他们可以(而且确实会)推回。对于这种规则和类似的规则，执行由编写和审查代码的工程师自行决定。然而，当涉及到技术规则时，只要是可行的，我们倾向于技术执行。

### Error Checkers  错误检查工具

Many rules covering language usage can be enforced with static analysis tools. In fact, an informal survey of the C++ style guide by some of our C++ librarians in mid-2018 estimated that roughly 90% of its rules could be automatically verified. Error- checking tools take a set of rules or patterns and verify that a given code sample fully complies. Automated verification removes the burden of remembering all applicable rules from the code author. If an engineer only needs to look for violation warnings— many of which come with suggested fixes—surfaced during code review by an analyzer that has been tightly integrated into the development workflow, we minimize the effort that it takes to comply with the rules. When we began using tools to flag deprecated functions based on source tagging, surfacing both the warning and the suggested fix in-place, the problem of having new usages of deprecated APIs disappeared almost overnight. Keeping the cost of compliance down makes it more likely for engineers to happily follow through.

许多涉及语言使用的规则可以通过静态分析工具强制执行。事实上，我们的一些C++类库管理员在2018年年中对C++风格指南进行的一项非正式调查估计，其中大约90%的规则可以自动验证。错误检查工具采用一组规则或模式，并验证给定的代码示例是否完全符合。自动验证消除了代码作者记住所有适用规则的负担。如果工程师只需要查找违规警告——其中许多都带有建议的修复——在代码审查期间由已紧密集成到开发工作流中的分析工具发现的，我们将尽可能减少遵守规则所需要的工作量。当我们开始使用工具基于源标签来标记已弃用的函数时，警告和建议的就都会同时给出，新使用已弃用 API 的问题几乎在一夜之间消失了。降低合规成本使工程师更有可能愉快地贯彻执行。

We use tools like clang-tidy (for C++) and Error Prone (for Java) to automate the process of enforcing rules. See Chapter 20 for an in-depth discussion of our approach.

我们使用像clang-tidy(用于C++)和Error Prone(用于Java)这样的工具来自动化执行规则的过程。有关我们方法的深入讨论，请参见第 20 章。

The tools we use are designed and tailored to support the rules that we define. Most tools in support of rules are absolutes; everybody must comply with the rules, so everybody uses the tools that check them. Sometimes, when tools support best practi‐ces where there’s a bit more flexibility in conforming to the conventions, there are opt-out mechanisms to allow projects to adjust for their needs.

我们使用的工具都是为支持我们定义的规则而设计和定制的。大多数支持规则的工具都是绝对的;每个人都必须遵守规则，所以每个人都使用检查规则的工具。有时，当工具支持最佳实践时，在遵守约定方面有更多的灵活性，就会有选择退出机制，允许项目根据自己的需要进行调整。

### Code Formatters  代码格式工具

At Google, we generally use automated style checkers and formatters to enforce consistent formatting within our code. The question of line lengths has stopped being interesting.[^13]Engineers just run the style checkers and keep moving forward. When formatting is done the same way every time, it becomes a non-issue during code review, eliminating the review cycles that are otherwise spent finding, flagging, and fixing minor style nits.

在谷歌，我们通常使用自动样式检查工具和格式化工具来在我们的代码中执行一致的格式。行长度的问题已经不再有趣了。工程师只需运行样式检查工具并继续前进。如果每次都以相同的方式进行格式化，那么在代码审查期间就不会出现问题，从而消除了用来查找、标记和修复要样式细节的审查周期。

In managing the largest codebase ever, we’ve had the opportunity to observe the results of formatting done by humans versus formatting done by automated tooling. The robots are better on average than the humans by a significant amount. There are some places where domain expertise matters—formatting a matrix, for example, is something a human can usually do better than a general-purpose formatter. Failing that, formatting code with an automated style checker rarely goes wrong.

在管理有史以来最大的代码库时，我们有机会观察人工格式化和自动化工具格式化的结果。平均而言，机器人比人类好很多。在某些地方，领域专业知识很重要——例如，格式化矩阵，人工通常可以比通用格式化程序做得更好。如果做不到这一点，用自动样式检查工具格式化代码很少出错。

We enforce use of these formatters with presubmit checks: before code can be submitted, a service checks whether running the formatter on the code produces any diffs. If it does, the submit is rejected with instructions on how to run the formatter to fix the code. Most code at Google is subject to such a presubmit check. For our code, we use clang-format for C++; an in-house wrapper around yapf for Python; gofmt for Go; dartfmt for Dart; and buildifier for our BUILD files.

我们通过预提交检查强制使用这些格式化程序:在提交代码之前，服务会检查在代码上运行格式化工具是否会产生任何差异。如果是，提交将被拒绝，并提供有关如何运行格式化程序以修复代码的说明。谷歌上的大多数代码都要接受这种预提交检查。在我们的代码中，C++使用了clang-format；Python使用yapf内部包装工具；Go使用gofmt；Dart 使用 dartfmt；以及我们的 BUILD 文件使用buildifier。

> 13 When you consider that it takes at least two engineers to have the discussion and multiply that by the number of times this conversation is likely to happen within a collection of more than 30,000 engineers, it turns out that “how many characters” can become a very expensive question.
>
> 13 当你考虑到至少需要两名工程师进行讨论，并将其乘以这种对话可能在30,000多名工程师的集合中发生的次数时，事实证明，"多少个字符 "可能成为一个成本非常高的问题。

---

#### Case Study: gofmt  案例分析：go格式化工具

Sameer Ajmani

萨米尔·阿吉马尼

Google released the Go programming language as open source on November 10, 2009. Since then, Go has grown as a language for developing services, tools, cloud infrastructure, and open source software.[^14]

谷歌于2009年11月10日以开源方式发布了Go编程语言。从那时起，Go已经发展成为一种开发服务、工具、云基础设施和开源软件的语言。

We knew that we needed a standard format for Go code from day one. We also knew that it would be nearly impossible to retrofit a standard format after the open source release. So the initial Go release included gofmt, the standard formatting tool for Go.

我们从一开始就知道我们需要一个Go代码的标准格式。我们也知道，在开源版本发布后，几乎不可能改造标准格式。因此，最初的Go版本包括gofmt，这是Go的标准格式工具。

**Motivations 动机**

Code reviews are a software engineering best practice, yet too much time was spent in review arguing over formatting. Although a standard format wouldn’t be everyone’s favorite, it would be good enough to eliminate this wasted time.[^15]

代码审查是一种软件工程的最佳实践，但是太多的时间被花在评审中争论格式。虽然标准格式不是每个人都喜欢的，但它足以消除这些浪费的时间。

By standardizing the format, we laid the foundation for tools that could automatically update Go code without creating spurious diffs: machine-edited code would be indistinguishable from human-edited code.[^16]

通过标准化格式，我们为可以自动更新 Go 代码而不会创建虚假差异的工具奠定了基础：机器编辑的代码与人工编辑的代码无法区分。

For example, in the months leading up to Go 1.0 in 2012, the Go team used a tool called gofix to automatically update pre-1.0 Go code to the stable version of the language and libraries. Thanks to gofmt, the diffs gofix produced included only the important bits: changes to uses of the language and APIs. This allowed programmers to more easily review the changes and learn from the changes the tool made.

例如，在2012年Go 1.0的前几个月，Go 团队使用了一个名为 gofix 的工具来自动将 1.0 之前的 Go 代码更新到语言和库的稳定版本。多亏了gofmt, gofix 产生的差异只包括重要的部分：语言和 API 使用的更改。 这使程序员可以更轻松地查看更改并从工具所做的更改中学习。

**Impact 影响**

Go programmers expect that all Go code is formatted with gofmt. gofmt has no configuration knobs, and its behavior rarely changes. All major editors and IDEs use gofmt or emulate its behavior, so nearly all Go code in existence is formatted identically. At first, Go users complained about the enforced standard; now, users often cite gofmt as one of the many reasons they like Go. Even when reading unfamiliar Go code, the format is familiar.

Go程序员希望所有的Go代码都使用gofmt格式。gofmt没有配置旋钮，它的行为很少改变。所有主要的编辑器和IDE都使用gofmt或者模仿它的行为，所以几乎所有的Go代码都采用了相同的格式。起初，Go 用户抱怨强制执行的标准；现在，用户经常将 gofmt 作为他们喜欢 Go 的众多原因之一。即使阅读不熟悉的Go代码，格式也是熟悉的。

Thousands of open source packages read and write Go code.[^17] Because all editors and IDEs agree on the Go format, Go tools are portable and easily integrated into new developer environments and workflows via the command line.

成千上万的开源包读取和编写 Go 代码。因为所有的编辑器和IDE都同意Go格式，所以Go工具是可移植的，并且很容易通过命令行集成到新的开发环境和工作流中。

 **Retrofitting 改装**

In 2012, we decided to automatically format all BUILD files at Google using a new standard formatter: buildifier. BUILD files contain the rules for building Google’s software with Blaze, Google’s build system. A standard BUILD format would enable us to create tools that automatically edit BUILD files without disrupting their format, just as Go tools do with Go files.

在2012年，我们决定使用一个新的标准格式工具来自动格式化谷歌中的所有BUILD文件:buildifier。BUILD文件包含了使用Blaze(谷歌的构建系统)构建谷歌软件的规则。标准的BUILD格式将使我们能够创建自动编辑BUILD文件而不破坏其格式的工具，就像Go工具对Go文件所做的那样。

It took six weeks for one engineer to get the reformatting of Google’s 200,000 BUILD files accepted by the various code owners, during which more than a thousand new BUILD files were added each week. Google’s nascent infrastructure for making large- scale changes greatly accelerated this effort. (See Chapter 22.)

一位工程师花了六周时间重新格式化了谷歌的 200,000 个 BUILD 文件，这些文件被各个代码所有者接受，在此期间每周都会添加一千多个新的 BUILD 文件。谷歌为进行大规模变革而建立的基础设施大大加快了这一努力。（见第 22 章）。

-----

> [^14]:  In December 2018, Go was the #4 language on GitHub as measured by pull requests.
>
> 14 2018年12月，按拉动请求衡量，Go是GitHub上排名第四的语言。
>
> [^15]:  Robert Griesemer’s 2015 talk, “The Cultural Evolution of gofmt,” provides details on the motivation, design,and impact of gofmt on Go and other languages.
>
> 15 Robert Griesemer在2015年的演讲《gofmt的文化演变》中详细介绍了gofmt的动机、设计。
> 以及gofmt对Go和其他语言的影响。
>
> [^16]:  Russ Cox explained in 2009 that gofmt was about automated changes: “So we have all the hard parts of a program manipulation tool just sitting waiting to be used. Agreeing to accept ‘gofmt style’ is the piece that makes it doable in a finite amount of code.”
>
> 16 Russ Cox在2009年解释说，gofmt是关于自动化修改的。"因此，我们有一个程序操作工具的所有硬性部分，只是坐在那里等着被使用。同意接受'gofmt风格'是使其在有限的代码量中可以做到的部分。"
>
> [^17]:  The Go AST and format packages each have thousands of importers.
>
> 17 Go AST和格式包各自有成千上万的导入器。

## Conclusion  结论

For any organization, but especially for an organization as large as Google’s engineering force, rules help us to manage complexity and build a maintainable codebase. A shared set of rules frames the engineering processes so that they can scale up and keep growing, keeping both the codebase and the organization sustainable for the long term.

对于任何组织，尤其是像 Google 的工程师团队这样大的组织，规则帮助我们管理复杂性并建立一个可维护的代码库。一组共享的规则框定了工程流程，以便它们可以扩大规模并保持增长，从而保持代码库和组织的长期可持续性。

## TL;DRs(Too long;Don't read)  内容提要

- Rules and guidance should aim to support resilience to time and scaling.
- Know the data so that rules can be adjusted.
- Not everything should be a rule.
- Consistency is key.
- Automate enforcement when possible.

- 规则和指导应旨在支持对时间和规模的扩展性。
- 了解数据，以便调整规则。
- 并非所有事情都应该成为规则。
- 一致性是关键。
- 在可能的情况下自动化执行。
