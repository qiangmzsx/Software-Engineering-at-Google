
**CHAPTER 12**

# Unit Testing

# 第十二章 单元测试

**Written by Erik Kuefler**

**Edited by Tom Manshreck**

The previous chapter introduced two of the main axes along which Google classifies tests: *size* and *scope*. To recap, size refers to the resources consumed by a test and what it is allowed to do, and scope refers to how much code a test is intended to validate. Though Google has clear definitions for test size, scope tends to be a little fuzzier. We use the term *unit test* to refer to tests of relatively narrow scope, such as of a single class or method. Unit tests are usually small in size, but this isn’t always the case.

上一章介绍了谷歌对测试进行分类的两个主要轴线：*大小*和*范围*。简而言之，大小是指测试所消耗的资源和允许做的事情，范围是指测试要验证多少代码。虽然谷歌对测试规模有明确的定义，但范围往往是比较模糊的。我们使用术语*单元测试*指的是范围相对较窄的测试，如单个类或方法的测试。单元测试通常是小规模的，但并不总是如此。

After preventing bugs, the most important purpose of a test is to improve engineers’ productivity. Compared to broader-scoped tests, unit tests have many properties that make them an excellent way to optimize productivity:

- They tend to be small according to Google’s definitions of test size. Small tests are fast and deterministic, allowing developers to run them frequently as part of their workflow and get immediate feedback.
- They tend to be easy to write at the same time as the code they’re testing, allowing engineers to focus their tests on the code they’re working on without having to set up and understand a larger system.
- They promote high levels of test coverage because they are quick and easy to write. High test coverage allows engineers to make changes with confidence that they aren’t breaking anything.
- They tend to make it easy to understand what’s wrong when they fail because each test is conceptually simple and focused on a particular part of the system.
- They can serve as documentation and examples, showing engineers how to use the part of the system being tested and how that system is intended to work.

在实现防止bug之后，测试最重要的目的是提高工程师的生产效率。与范围更广的测试相比，单元测试有许多特性，使其成为优化生产效率的绝佳方式:

- 根据谷歌对测试规模的定义，它们往往是小型的。小型测试是快速和确定的，允许开发人员频繁地运行它们，作为他们工作流程的一部分，并获得即时反馈。
- 单元测试往往很容易与正在测试的代码同时编写，允许工程师将他们的测试集中在他们正在工作的代码上，而不需要建立和理解一个更大的系统。
- 单元测试促进高水平的测试覆盖率，因为它们快速且易于编写。高测试覆盖率使工程师能够满怀信心地进行更改，确保他们不会破坏任何东西。
- 由于每个单元测试在概念上都很简单，并且都集中在系统的特定部分，因此，它们往往会使人们很容易理解失败时的错误。
- 它们可以作为文档和例子，向工程师展示如何使用被测试的系统部分，以及该系统的预期工作方式。

Due to their many advantages, most tests written at Google are unit tests, and as a rule of thumb, we encourage engineers to aim for a mix of about 80% unit tests and 20% broader-scoped tests. This advice, coupled with the ease of writing unit tests and the speed with which they run, means that engineers run a *lot* of unit tests—it’s not at all unusual for an engineer to execute thousands of unit tests (directly or indirectly) during the average workday.

由于单元测试有很多优点，在谷歌写的大多数测试都是单元测试，作为经验法则，我们鼓励工程师把80%的单元测试和20%的范围更广的测试混合起来。这个建议，再加上编写单元测试的简易性和运行速度，意味着工程师要运行*多个*单元测试——一个工程师在平均工作日中执行数千个单元测试（直接或间接）是很正常的。

Because they make up such a big part of engineers’ lives, Google puts a lot of focus on *test maintainability*. Maintainable tests are ones that “just work”: after writing them, engineers don’t need to think about them again until they fail, and those failures indicate real bugs with clear causes. The bulk of this chapter focuses on exploring the idea of maintainability and techniques for achieving it.

因为测试在工程师的生活中占了很大一部分，所以谷歌非常重视*测试*的可维护性。可维护的测试是那些 "正常工作 "的测试：在写完测试后，工程师不需要再考虑它们，直到它们失败，而这些失败表明有明确原因的真正错误。本章的主要内容是探讨可维护性的概念和实现它的技术。

## The Importance of Maintainability  可维护性的重要性

Imagine this scenario: Mary wants to add a simple new feature to the product and is able to implement it quickly, perhaps requiring only a couple dozen lines of code. But when she goes to check in her change, she gets a screen full of errors back from the automated testing system. She spends the rest of the day going through those failures one by one. In each case, the change introduced no actual bug, but broke some of the assumptions that the test made about the internal structure of the code, requiring those tests to be updated. Often, she has difficulty figuring out what the tests were trying to do in the first place, and the hacks she adds to fix them make those tests even more difficult to understand in the future. Ultimately, what should have been a quick job ends up taking hours or even days of busywork, killing Mary’s productivity and sapping her morale.

想象一下这个场景：Mary希望向产品添加一个简单的新功能，并且能够快速实现它，可能只需要几十行代码。但是，当她去检查她的改动，她从自动测试系统那里得到了满屏的错误。她花了一天的时间来逐一检查这些错误。在每种情况下，更改都没有引入实际的bug，但打破了测试对代码内部结构的一些设定，需要更新这些测试。通常情况下，她很难弄清楚这些测试一开始要做什么，而她为修复它们而添加的黑操作使得这些测试在以后更难理解。最终，本来应该是一份快速的工作，结果却要花上几个小时甚至几天的时间忙碌，扼杀了Mary的工作效率，消磨了她的士气。

Here, testing had the opposite of its intended effect by draining productivity rather than improving it while not meaningfully increasing the quality of the code under test. This scenario is far too common, and Google engineers struggle with it every day. There’s no magic bullet, but many engineers at Google have been working to develop sets of patterns and practices to alleviate these problems, which we encourage the rest of the company to follow.

在这里，测试产生了与预期相反的效果，它消耗了生产力，而不是提高生产效率，同时没有显著提高被测试代码的质量。这种情况太普遍了，谷歌工程师每天都在与之斗争。没有什么灵丹妙药，但谷歌的许多工程师一直在努力开发一套模式和实践来缓解这些问题，我们鼓励公司的其他人效仿。

The problems Mary ran into weren’t her fault, and there was nothing she could have done to avoid them: bad tests must be fixed before they are checked in, lest they impose a drag on future engineers. Broadly speaking, the issues she encountered fall into two categories. First, the tests she was working with were *brittle*: they broke in response to a harmless and unrelated change that introduced no real bugs. Second, the tests were *unclear*: after they were failing, it was difficult to determine what was wrong, how to fix it, and what those tests were supposed to be doing in the first place.

Mary遇到的问题不是她的错，而且她也没有办法避免这些问题：糟糕的测试必须在出现之前被修复，以免它们给未来的工程师带来阻力。概括地说，她遇到的问题分为两类。首先，她所使用的测试是很脆弱的：它们在应对一个无害的、不相关的变化时，没有引入真正的bug而损坏。第二，测试不明确：在测试失败后，很难确定哪里出了问题，如何修复它，以及这些测试最初应该做什么。

## Preventing Brittle Tests  预防脆性测试

As just defined, a brittle test is one that fails in the face of an unrelated change to production code that does not introduce any real bugs.[^1] Such tests must be diagnosed and fixed by engineers as part of their work. In small codebases with only a few engineers, having to tweak a few tests for every change might not be a big problem. But if a team regularly writes brittle tests, test maintenance will inevitably consume a larger and larger proportion of the team’s time as they are forced to comb through an increasing number of failures in an ever-growing test suite. If a set of tests needs to be manually tweaked by engineers for each change, calling it an “automated test suite” is a bit of a stretch!

正如刚才所定义的，脆性测试是指在面对不相关的程序代码变化时失败的测试，这些变化不会引入任何真正的错误。在只有几个工程师的小型代码库中，每次修改都要调整一些测试，这可能不是一个大问题。但是，如果一个团队经常写脆弱测试，测试维护将不可避免地消耗团队越来越多的时间，因为他们不得不在不断增长的测试套件中梳理越来越多的失败。如果一套测试需要工程师为每一个变化进行手动调整，称其为 "自动化测试套件"就有点牵强了！

Brittle tests cause pain in codebases of any size, but they become particularly acute at Google’s scale. An individual engineer might easily run thousands of tests in a single day during the course of their work, and a single large-scale change (see [Chapter 22](#_bookmark1935)) can trigger hundreds of thousands of tests. At this scale, spurious breakages that affect even a small percentage of tests can waste huge amounts of engineering time. Teams at Google vary quite a bit in terms of how brittle their test suites are, but we’ve identified a few practices and patterns that tend to make tests more robust to change.

脆弱测试在任何规模的代码库中都会造成痛苦，但在谷歌的规模中，它们变得尤为严重。一个单独的工程师在工作过程中，可能在一天内就会轻易地运行数千个测试，而一个大规模的变化（见第22章）可能会引发数十万个测试。在这种规模下，即使是影响一小部分测试的误报故障也会浪费大量的工程时间。谷歌的团队在测试套件的脆弱性方面存在很大差异，但我们已经确定了一些实践和模式，这些实践和模式倾向于使测试变得更健壮，更易于更改。

> [^1]: Note that this is slightly different from a flaky test, which fails nondeterministically without any change to production code./
> 1  注意，这与不稳定测试略有不同，不稳定测试是在不改变生产代码的情况下非确定性地失败。

### Strive for Unchanging Tests  力求稳定的测试

Before talking about patterns for avoiding brittle tests, we need to answer a question: just how often should we expect to need to change a test after writing it? Any time spent updating old tests is time that can’t be spent on more valuable work. Therefore, *the ideal test is unchanging*: after it’s written, it never needs to change unless the requirements of the system under test change.

在讨论避免脆性测试的模式之前，我们需要回答一个问题：编写测试后，我们应该多久更改一次测试？任何花在更新旧测试上的时间都不能花在更有价值的工作上。因此，*理想的测试是不变的：*在编写之后，它永远不需要更改，除非被测系统的需求发生变化。

What does this look like in practice? We need to think about the kinds of changes that engineers make to production code and how we should expect tests to respond to those changes. Fundamentally, there are four kinds of changes:

- *Pure refactorings*  
	When an engineer refactors the internals of a system without modifying its interface, whether for performance, clarity, or any other reason, the system’s tests shouldn’t need to change. The role of tests in this case is to ensure that the refactoring didn’t change the system’s behavior. Tests that need to be changed during a refactoring indicate that either the change is affecting the system’s behavior and isn’t a pure refactoring, or that the tests were not written at an appropriate level of abstraction. Google’s reliance on large-scale changes (described in Chapter 22) to do such refactorings makes this case particularly important for us.

- *New features*  
	When an engineer adds new features or behaviors to an existing system, the system’s existing behaviors should remain unaffected. The engineer must write new tests to cover the new behaviors, but they shouldn’t need to change any existing tests. As with refactorings, a change to existing tests when adding new features suggest unintended consequences of that feature or inappropriate tests.

- *Bug fixes*  
	Fixing a bug is much like adding a new feature: the presence of the bug suggests that a case was missing from the initial test suite, and the bug fix should include that missing test case. Again, bug fixes typically shouldn’t require updates to existing tests.

- *Behavior changes*  
	Changing a system’s existing behavior is the one case when we expect to have to make updates to the system’s existing tests. Note that such changes tend to be significantly more expensive than the other three types. A system’s users are likely to rely on its current behavior, and changes to that behavior require coordination with those users to avoid confusion or breakages. Changing a test in this case indicates that we’re breaking an explicit contract of the system, whereas changes in the previous cases indicate that we’re breaking an unintended contract. Low- level libraries will often invest significant effort in avoiding the need to ever make a behavior change so as not to break their users.

这在实践中是什么样子的呢？我们需要考虑工程师对生产代码所做的各种修改，以及我们应该如何期望测试对这些修改做出反应。从根本上说，有四种更改：

- *纯粹的重构*  
  当工程师在不修改系统接口的情况下重构系统内部时，无论是出于性能、清晰度还是任何其他原因，系统的测试都不需要更改。在这种情况下，测试的作用是确保重构没有改变系统的行为。在重构过程中需要改变的测试表明，要么变化影响了系统的行为，不是纯粹的重构，要么测试没有写在适当的抽象水平上。Google依靠大规模的变化（在第22章中描述）来做这样的重构，使得这种情况对我们特别重要。

- *新功能*  
  当工程师向现有系统添加新的功能或行为时，系统的现有行为应该不受影响。工程师必须编写新的测试来覆盖新的行为，但他们不应该需要改变任何现有的测试。与重构一样，在添加新功能时，对现有测试的改变表明该功能的非预期后果或不适当的测试。

- *Bug修复*  
  修复bug与添加新功能很相似：bug的存在表明初始测试套件中缺少一个案例，bug修复应该包括缺少的测试案例。同样，错误修复通常不需要对现有的测试进行更新。

- *行为改变*  
  当我们期望必须对系统的现有测试进行更新时，更改系统的现有行为就是一种情况。请注意，这种变化往往比其他三种类型的测试代价要高得多。系统的用户可能依赖于其当前行为，而对该行为的更改需要与这些用户进行协调，以避免混淆或中断。在这种情况下改变测试表明我们正在破坏系统的一个明确的契约，而在前面的情况下改变则表明我们正在破坏一个非预期的契约。基础类库往往会投入大量的精力来避免需要进行行为的改变，以免破坏他们的用户。

The takeaway is that after you write a test, you shouldn’t need to touch that test again as you refactor the system, fix bugs, or add new features. This understanding is what makes it possible to work with a system at scale: expanding it requires writing only a small number of new tests related to the change you’re making rather than potentially having to touch every test that has ever been written against the system. Only breaking changes in a system’s behavior should require going back to change its tests, and in such situations, the cost of updating those tests tends to be small relative to the cost of updating all of the system’s users.

启示是，在编写测试之后，在重构系统、修复bug或添加新功能时，不需要再次接触该测试。这种理解使大规模使用系统成为可能：扩展系统只需要写少量的与你所做的改变有关的新测试，而不是可能要触动所有针对该系统写过的测试。只有对系统行为的破坏性更改才需要返回以更改其测试，在这种情况下，更新这些测试的成本相对于更新所有系统用户的成本往往很小。

### Test via Public APIs  通过公共API进行测试

Now that we understand our goal, let’s look at some practices for making sure that tests don’t need to change unless the requirements of the system being tested change. By far the most important way to ensure this is to write tests that invoke the system being tested in the same way its users would; that is, make calls against its public API [rather than its implementation details](https://oreil.ly/ijat0). If tests work the same way as the system’s users, by definition, change that breaks a test might also break a user. As an additional bonus, such tests can serve as useful examples and documentation for users.

现在我们了解了我们的目标，让我们看看一些做法，以确保测试不需要改变，除非被测试系统的需求改变。到目前为止，确保这一点的最重要的方法是编写测试，以与用户相同的方式调用正在测试的系统；也就是说，针对其公共API[而不是其实现细节](https://oreil.ly/ijat0)进行调用。如果测试的工作方式与系统的用户相同，顾名思义，破坏测试的变化也可能破坏用户。作为一个额外的好处，这样的测试可以作为用户的有用的例子和文档。

Consider Example 12-1, which validates a transaction and saves it to a database.

考虑例12-1，它验证了一个事务并将其保存到数据库中。

*Example* *12-1.* *A transaction API *  *实例12-1.事务API*

```java 
public void processTransaction(Transaction transaction) {
    if(isValid(transaction)) {
        saveToDatabase(transaction);
    }
}
private boolean isValid(Transaction t) {
    return t.getAmount() < t.getSender().getBalance();
}
private void saveToDatabase(Transaction t) {
    String s = t.getSender() + "," + t.getRecipient() + "," + t.getAmount();
    database.put(t.getId(), s);
}
public void setAccountBalance(String accountName, int balance) {
    // Write the balance to the database directly
}
public void getAccountBalance(String accountName) {
    // Read transactions from the database to determine the account balance
}
```

A tempting way to test this code would be to remove the “private” visibility modifiers and test the implementation logic directly, as demonstrated in Example 12-2.

测试这段代码的一个诱人的方法是去掉 "私有 "可见修饰符，直接测试实现逻辑，如例12-2所示。

*Example 12-2. A naive test of a transaction API’s implementation*  *例12-2.事务 API 实现的简单测试*

```java
@Test
public void emptyAccountShouldNotBeValid() {
    assertThat(processor.isValid(newTransaction().setSender(EMPTY_ACCOUNT))).isFalse();
}

@Test
public void shouldSaveSerializedData() {
    processor.saveToDatabase(newTransaction().setId(123).setSender("me").setRecipient("you").setAmount(100));
    assertThat(database.get(123)).isEqualTo("me,you,100");
}

```

This test interacts with the transaction processor in a much different way than its real users would: it peers into the system’s internal state and calls methods that aren’t publicly exposed as part of the system’s API. As a result, the test is brittle, and almost any refactoring of the system under test (such as renaming its methods, factoring them out into a helper class, or changing the serialization format) would cause the test to break, even if such a change would be invisible to the class’s real users.

此测试与事务处理器的交互方式与其实际用户的交互方式大不相同：它窥视系统的内部状态并调用系统API中未公开的方法。因此，测试是脆弱的，几乎任何对被测系统的重构（例如重命名其方法、将其分解为辅助类或更改序列化格式）都会导致测试中断，即使此类更改对类的实际用户是不可见的。

Instead, the same test coverage can be achieved by testing only against the class’s public API, as shown in Example 12-3.[^2]

相反，同样的测试覆盖率可以通过只测试类的公共 API 来实现，如例 12-3.2 所示。

*Example 12-3. Testing the public API*  *例12-3. 测试公共API*

```java
@Test
public void shouldTransferFunds() {
    processor.setAccountBalance("me", 150);
    processor.setAccountBalance("you", 20);
    processor.processTransaction(newTransaction().setSender("me").setRecipient("you").setAmount(100));
    assertThat(processor.getAccountBalance("me")).isEqualTo(50);
    assertThat(processor.getAccountBalance("you")).isEqualTo(120);
}

@Test
public void shouldNotPerformInvalidTransactions() {
    processor.setAccountBalance("me", 50);
    processor.setAccountBalance("you", 20);
    processor.processTransaction(newTransaction().setSender("me").setRecipient("you").setAmount(100));
    assertThat(processor.getAccountBalance("me")).isEqualTo(50);
    assertThat(processor.getAccountBalance("you")).isEqualTo(20);
}

```

Tests using only public APIs are, by definition, accessing the system under test in the same manner that its users would. Such tests are more realistic and less brittle because they form explicit contracts: if such a test breaks, it implies that an existing user of the system will also be broken. Testing only these contracts means that you’re free to do whatever internal refactoring of the system you want without having to worry about making tedious changes to tests.

根据定义，仅使用公共API的测试是以与用户相同的方式访问被测系统。这样的测试更现实，也不那么脆弱，因为它们形成了明确的契约：如果这样的测试失败，它意味着系统的现有用户也将失败。只测试这些契约意味着你可以自由地对系统进行任何内部重构，而不必担心对测试进行繁琐的更改。

> [^2]:	This is sometimes called the "Use the front door first principle.”
>
> 2   这有时被称为“使用前门优先原则”

It’s not always clear what constitutes a “public API,” and the question really gets to the heart of what a “unit” is in unit testing. Units can be as small as an individual function or as broad as a set of several related packages/modules. When we say “public API” in this context, we’re really talking about the API exposed by that unit to third parties outside of the team that owns the code. This doesn’t always align with the notion of visibility provided by some programming languages; for example, classes in Java might define themselves as “public” to be accessible by other packages in the same unit but are not intended for use by other parties outside of the unit. Some languages like Python have no built-in notion of visibility (often relying on conventions like prefixing private method names with underscores), and build systems like Bazel can further restrict who is allowed to depend on APIs declared public by the programming language.

什么是 "公共API "并不总是很清楚，这个问题实际上涉及到单元测试中的 "单元"的核心。单元可以小到一个单独的函数，也可以大到由几个相关的包/模块组成的集合。当我们在这里说 "公共API"时，我们实际上是在谈论该单元暴露给拥有该代码的团队之外的第三方的API。这并不总是与某些编程语言提供的可见性概念一致；例如，Java中的类可能将自己定义为 "公共"，以便被同一单元中的其他包所访问，但并不打算供该单元之外的其他方使用。有些语言，如Python，没有内置的可见性概念（通常依靠惯例，如在私有方法名称前加上下划线），而像Bazel这样的构建系统可以进一步限制谁可以依赖编程语言所声明的公共API。

Defining an appropriate scope for a unit and hence what should be considered the public API is more art than science, but here are some rules of thumb:

- If a method or class exists only to support one or two other classes (i.e., it is a “helper class”), it probably shouldn’t be considered its own unit, and its functionality should be tested through those classes instead of directly.
- If a package or class is designed to be accessible by anyone without having to consult with its owners, it almost certainly constitutes a unit that should be tested directly, where its tests access the unit in the same way that the users would.
- If a package or class can be accessed only by the people who own it, but it is designed to provide a general piece of functionality useful in a range of contexts (i.e., it is a “support library”), it should also be considered a unit and tested directly. This will usually create some redundancy in testing given that the support library’s code will be covered both by its own tests and the tests of its users. However, such redundancy can be valuable: without it, a gap in test coverage could be introduced if one of the library’s users (and its tests) were ever removed.

为一个单元定义一个合适的范围，因此应该将其视为公共API，这与其说是科学，不如说是艺术，但这里有一些经验法则：

- 如果一个方法或类的存在只是为了支持一两个其他的类（即，它是一个 "辅助类"），它可能不应该被认为是独立的单元，它的功能测试应该通过这些类进行，而不是直接测试它。

- 如果一个包或类被设计成任何人都可以访问，而不需要咨询其所有者，那么它几乎肯定构成了一个应该直接测试的单元，它的测试以用户的方式访问该单元。

- 如果一个包或类只能由其拥有者访问，但它的设计目的是提供在各种上下文中有用的通用功能（即，它是一个“支持库”），也应将其视为一个单元并直接进行测试。这通常会在测试中产生一些冗余，因为支持库的代码会被它自己的测试和用户的测试所覆盖。然而，这种冗余可能是有价值的：如果没有它，如果库的一个用户（和它的测试）被删除，测试覆盖率就会出现缺口。

At Google, we’ve found that engineers sometimes need to be persuaded that testing via public APIs is better than testing against implementation details. The reluctance is understandable because it’s often much easier to write tests focused on the piece of code you just wrote rather than figuring out how that code affects the system as a whole. Nevertheless, we have found it valuable to encourage such practices, as the extra upfront effort pays for itself many times over in reduced maintenance burden. Testing against public APIs won’t completely prevent brittleness, but it’s the most important thing you can do to ensure that your tests fail only in the event of meaningful changes to your system.

在谷歌，我们发现工程师有时需要被说服，通过公共API进行测试比针对实现细节进行测试要好。这种不情愿的态度是可以理解的，因为写测试的关注点往往是你刚刚写的那段代码，而不是弄清楚这段代码是如何影响整个系统的。然而，我们发现鼓励这种做法是很有价值的，因为额外的前期努力在减少维护负担方面得到了许多倍的回报。针对公共API的测试并不能完全防止脆弱性，但这是你能做的最重要的事情，以确保你的测试只在系统发生有意义的变化时才失败。

### Test State, Not Interactions  测试状态，而不是交互

Another way that tests commonly depend on implementation details involves not which methods of the system the test calls, but how the results of those calls are verified. In general, there are two ways to verify that a system under test behaves as expected. With *state testing*, you observe the system itself to see what it looks like after invoking with it. With *interaction testing*, you instead check that the system took an expected sequence of actions on its collaborators [in response to invoking it](https://oreil.ly/3S8AL). Many tests will perform a combination of state and interaction validation.

测试通常依赖于实现细节的另一种方法不是测试调用系统的哪些方法，而是如何验证这些调用的结果。通常，有两种方法可以验证被测系统是否按预期运行。通过*状态测试*，你观察系统本身，看它在调用后是什么样子。通过*交互测试*，你要检查系统是否对其合作者采取了预期的行动序列[以响应调用它](https://oreil.ly/3S8AL)。许多测试将执行状态和交互验证的组合。

Interaction tests tend to be more brittle than state tests for the same reason that it’s more brittle to test a private method than to test a public method: interaction tests check *how* a system arrived at its result, whereas usually you should care only *what* the result is. [Example 12-4 ](#_bookmark971)illustrates a test that uses a test double (explained further in [Chapter 13](#_bookmark1056)) to verify how a system interacts with a database.

交互测试往往比状态测试更脆弱，测试一个私有方法比测试一个公共方法更脆的原因相同：交互测试检查系统是*如何*得到结果的，而通常你只应该关心结果是*什么*。例12-4展示了一个测试，它使用一个测试替换（在第13章中进一步解释）来验证一个系统如何与数据库交互。

*Example  12-4. A brittle interaction test*  *例12-4.  脆弱性相互作用测试*

```java
@Test
public void shouldWriteToDatabase() {
    accounts.createUser("foobar");
    verify(database).put("foobar");
}
```

The test verifies that a specific call was made against a database API, but there are a couple different ways it could go wrong:
- If a bug in the system under test causes the record to be deleted from the database shortly after it was written, the test will pass even though we would have wanted it to fail.

- If the system under test is refactored to call a slightly different API to write an equivalent record, the test will fail even though we would have wanted it to pass.

该测试验证了对数据库API的特定调用，但有两种不同的方法可能会出错：

- 如果被测系统中的错误导致记录在写入后不久从数据库中删除，那么即使我们希望它失败，测试也会通过。
- 如果对被测系统进行重构，以调用稍有不同的API来编写等效记录，那么即使我们希望测试通过，测试也会失败。

It’s much less brittle to directly test against the state of the system, as demonstrated in Example 12-5.

如例12-5所示，直接对系统的状态进行测试就不那么脆弱了。

*Example 12-5. Testing against state*  *例12-5. 针对状态的测试*

```java
@Test
public void shouldCreateUsers() {
    accounts.createUser("foobar");
    assertThat(accounts.getUser("foobar")).isNotNull();
}
```

This test more accurately expresses what we care about: the state of the system under test after interacting with it.

这种测试更准确地表达了我们所关心的：被测系统与之交互后的状态。

The most common reason for problematic interaction tests is an over reliance on mocking frameworks. These frameworks make it easy to create test doubles that record and verify every call made against them, and to use those doubles in place of real objects in tests. This strategy leads directly to brittle interaction tests, and so we tend to prefer the use of real objects in favor of mocked objects, as long as the real objects are fast and deterministic.

交互测试出现问题的最常见原因是过度依赖mocking框架。这些框架可以很容易地创建测试替换，记录并验证针对它们的每个调用，并在测试中使用这些替换来代替真实对象。这种策略直接导致了脆弱的交互测试，因此我们倾向于使用真实对象而不是模拟对象，只要真实对象是快速和确定的。

## Writing Clear Tests  编写清晰的测试

Sooner or later, even if we’ve completely avoided brittleness, our tests will fail. Failure is a good thing—test failures provide useful signals to engineers, and are one of the main ways that a unit test provides value.
Test failures happen for one of two reasons:[^3]

- The system under test has a problem or is incomplete. This result is exactly what tests are designed for: alerting you to bugs so that you can fix them.
- The test itself is flawed. In this case, nothing is wrong with the system under test, but the test was specified incorrectly. If this was an existing test rather than one that you just wrote, this means that the test is brittle. The previous section discussed how to avoid brittle tests, but it’s rarely possible to eliminate them entirely.

总有一天，即使我们已经完全避免了脆弱性，我们的测试也会失败。失败是一件好事——测试失败为工程师提供了有用的信号，也是单元测试提供价值的主要方式之一。
测试失败有两个原因：

- 被测系统有问题或不完整。这个结果正是测试的设计目的：提醒你注意bug，以便你能修复它们。
- 测试本身是有缺陷的。在这种情况下，被测系统没有任何问题，但测试的指定是不正确的。如果这是一个现有的测试，而不是你刚写的测试，这意味着测试是脆弱的。上一节讨论了如何避免脆性测试，但很少有可能完全消除它们。

When a test fails, an engineer’s first job is to identify which of these cases the failure falls into and then to diagnose the actual problem. The speed at which the engineer can do so depends on the test’s clarity. A clear test is one whose purpose for existing and reason for failing is immediately clear to the engineer diagnosing a failure. Tests fail to achieve clarity when their reasons for failure aren’t obvious or when it’s difficult to figure out why they were originally written. Clear tests also bring other benefits, such as documenting the system under test and more easily serving as a basis for new tests.

当测试失败时，工程师的首要工作是确定失败属于哪种情况，然后诊断出实际问题。工程师定位问题的速度取决于测试的清晰程度。清晰的测试是指工程师在诊断故障时，立即明确其存在目的和故障原因的测试。如果测试失败的原因不明显，或者很难弄清楚最初写这些测试的原因，那么测试就无法达到清晰的效果。清晰的测试还能带来其他的好处，比如记录被测系统，更容易作为新测试的基础。

Test clarity becomes significant over time. Tests will often outlast the engineers who wrote them, and the requirements and understanding of a system will shift subtly as it ages. It’s entirely possible that a failing test might have been written years ago by an engineer no longer on the team, leaving no way to figure out its purpose or how to fix it. This stands in contrast with unclear production code, whose purpose you can usually determine with enough effort by looking at what calls it and what breaks when it’s removed. With an unclear test, you might never understand its purpose, since removing the test will have no effect other than (potentially) introducing a subtle hole in test coverage.

随着时间的推移，测试的清晰度变得非常重要。测试往往比编写测试的工程师的时间更长，而且随着时间的推移，对系统的要求和理解会发生微妙的变化。一个失败的测试完全有可能是多年前由一个已经不在团队中的工程师写的，没有办法弄清楚其目的或如何修复它。这与不明确的生产代码形成了鲜明的对比，你通常可以通过查看调用代码的内容和删除代码后的故障来确定其目的。对于一个不明确的测试，你可能永远不会明白它的目的，因为删除该测试除了（潜在地）在测试覆盖率中引入一个细微的漏洞之外没有任何影响。

In the worst case, these obscure tests just end up getting deleted when engineers can’t figure out how to fix them. Not only does removing such tests introduce a hole in test coverage, but it also indicates that the test has been providing zero value for perhaps the entire period it has existed (which could have been years).

在最坏的情况下，这些晦涩难懂的测试最终会被删除，因为工程师不知道如何修复它们。删除这些测试不仅会在测试覆盖率上带来漏洞，而且还表明该测试在其存在的整个期间（可能是多年）一直提供零价值。

For a test suite to scale and be useful over time, it’s important that each individual test in that suite be as clear as possible. This section explores techniques and ways of thinking about tests to achieve clarity.

为了使测试套件能够随时间扩展并变得有用，套件中的每个测试都尽可能清晰是很重要的。本节探讨了为实现清晰性而考虑测试的技术和方法。

> [^3]: These are also the same two reasons that a test can be “flaky.” Either the system under test has a nondeterministic fault, or the test is flawed such that it sometimes fails when it should pass.
>
> 3   这也是测试可能“不稳定”的两个原因。要么被测系统存在不确定性故障，要么测试存在缺陷，以至于在通过测试时有时会失败。

### Make Your Tests Complete and Concise  确保你的测试完整和简明

Two high-level properties that help tests achieve clarity are completeness and conciseness. A test is complete when its body contains all of the information a reader needs in order to understand how it arrives at its result. A test is concise when it contains no other distracting or irrelevant information. Example 12-6 shows a test that is neither complete nor concise:

帮助测试实现清晰的两个高级属性是完整性和简洁性。一个测试是完整的，当它的主体包含读者需要的所有信息，以了解它是如何得出结果的。当一个测试不包含其他分散注意力的或不相关的信息时，它就是简洁的。例12-6显示了一个既不完整也不简洁的测试：

*Example 12-6. An incomplete and cluttered test*   *例12-6. 一个不完整且杂乱的测试*

```java
@Test
public void shouldPerformAddition() {
    Calculator calculator = new Calculator(new RoundingStrategy(), "unused", ENABLE_COSINE_FEATURE, 0.01, calculusEngine, false);
    int result = calculator.calculate(newTestCalculation());
    assertThat(result).isEqualTo(5); // Where did this number come from?
}
```

The test is passing a lot of irrelevant information into the constructor, and the actual important parts of the test are hidden inside of a helper method. The test can be made more complete by clarifying the inputs of the helper method, and more concise by using another helper to hide the irrelevant details of constructing the calculator, as illustrated in Example 12-7.

测试将大量不相关的信息传递给构造函数，测试的实际重要部分隐藏在辅助方法中。通过澄清辅助方法的输入，可以使测试更加完整，通过使用另一个辅助隐藏构建计算器的无关细节，可以使测试更加简洁，如示例12-7所示。

*Example 12-7. A complete, concise test*  *实例 12-7. A. 完整且简洁的测验*

```java
@Test
public void shouldPerformAddition() { 
    Calculator calculator = newCalculator();
    int result = calculator.calculate(newCalculation(2, Operation.PLUS, 3));
    assertThat(result).isEqualTo(5);
}
```

Ideas we discuss later, especially around code sharing, will tie back to completeness and conciseness. In particular, it can often be worth violating the DRY (Don’t Repeat Yourself) principle if it leads to clearer tests. Remember: a test’s body should contain all of the information needed to understand it without containing any irrelevant or distracting information.

我们稍后讨论的观点，特别是围绕代码共享，将与完整性和简洁性相关。需要注意的是，如果能使测试更清晰，违反DRY（不要重复自己）原则通常是值得的。记住：**一个测试的主体应该包含理解它所需要的所有信息，而不包含任何无关或分散的信息**。

### Test Behaviors, Not Methods  测试行为，而不是方法

The first instinct of many engineers is to try to match the structure of their tests to the structure of their code such that every production method has a corresponding test method. This pattern can be convenient at first, but over time it leads to problems: as the method being tested grows more complex, its test also grows in complexity and becomes more difficult to reason about. For example, consider the snippet of code in Example 12-8, which displays the results of a transaction.

许多工程师的第一直觉是试图将他们的测试结构与他们的代码结构相匹配，这样每个产品方法都有一个相应的测试方法。这种模式一开始很方便，但随着时间的推移，它会导致问题：随着被测试的方法越来越复杂，它的测试也越来越复杂，变得越来越难以理解。例如，考虑例12-8中的代码片段，它显示了一个事务的结果。

*Example 12-8. A transaction snippet*  *例12-8. 一个事务片段*

```java
public void displayTransactionResults(User user, Transaction transaction) {
    ui.showMessage("You bought a " + transaction.getItemName());
    if(user.getBalance() < LOW_BALANCE_THRESHOLD) {
        ui.showMessage("Warning: your balance is low!");
    }
}
```
It wouldn’t be uncommon to find a test covering both of the messages that might be shown by the method, as presented in Example 12-9.

如例12-9所示，一个测试涵盖了该方法可能显示的两个信息，这并不罕见。

*Example 12-9. A method-driven test*   *例12-9. 方法驱动的测试*

```java
@Test
public void testDisplayTransactionResults() {
transactionProcessor.displayTransactionResults(newUserWithBalance(LOW_BALANCE_THRESHOLD.plus(dollars(2))), new Transaction("Some Item", dollars(3)));
    assertThat(ui.getText()).contains("You bought a Some Item");
    assertThat(ui.getText()).contains("your balance is low");
}

```

With such tests, it’s likely that the test started out covering only the first method. Later, an engineer expanded the test when the second message was added (violating the idea of unchanging tests that we discussed earlier). This modification sets a bad precedent: as the method under test becomes more complex and implements more functionality, its unit test will become increasingly convoluted and grow more and more difficult to work with.

对于这样的测试，很可能一开始测试只包括第一个方法。后来，当第二条信息被添加进来时，工程师扩展了测试（违反了我们前面讨论的稳定的测试理念）。这种修改开创了一个不好的先例：随着被测方法变得越来越复杂，实现的功能越来越多，其单元测试也会变得越来越复杂，越来越难以使用。

The problem is that framing tests around methods can naturally encourage unclear tests because a single method often does a few different things under the hood and might have several tricky edge and corner cases. There’s a better way: rather than writing a test for each method, write a test for each behavior.[^4] A behavior is any guarantee that a system makes about how it will respond to a series of inputs while in a particular state.[^5] Behaviors can often be expressed using the words “given,” “when,” and “then”: “Given that a bank account is empty, when attempting to withdraw money from it, then the transaction is rejected.” The mapping between methods and behaviors is many-to-many: most nontrivial methods implement multiple behaviors, and some behaviors rely on the interaction of multiple methods. The previous example can be rewritten using behavior-driven tests, as presented in Example 12-10.

问题是，以方法为中心的测试框架自然倾向于产生不清晰的测试，因为单个方法经常在背后下做一些不同的事情，可能有几个棘手的边缘和角落的情况。有一个更好的方法：与其为每个方法写一个测试，不如为每个行为写一个测试。 行为是一个系统对它在特定状态下如何响应一系列输入的任何承诺。"鉴于一个银行账户是空的，当试图从该账户中取钱时，该交易被拒绝。" 方法和行为之间的映射是多对多的：大多数非核心的方法实现了多个行为，一些行为依赖于多个方法的交互。前面的例子可以用行为驱动的测试来重写，如例12-10所介绍。

*Example 12-10. A behavior-driven test*   *例12-10. 行为驱动的测试*

```java
@Test
public void displayTransactionResults_showsItemName() {
    transactionProcessor.displayTransactionResults(new User(), new Transaction("Some Item"));
    assertThat(ui.getText()).contains("You bought a Some Item");
}

@Test
public void displayTransactionResults_showsLowBalanceWarning() {
    transactionProcessor.displayTransactionResults(newUserWithBalance(LOW_BALANCE_THRESHOLD.plus(dollars(2))), new Transaction("Some Item", dollars(3)));
    assertThat(ui.getText()).contains("your balance is low");
}

```

The extra boilerplate required to split apart the single test is more than worth it, and the resulting tests are much clearer than the original test. Behavior-driven tests tend to be clearer than method-oriented tests for several reasons. First, they read more like natural language, allowing them to be naturally understood rather than requiring laborious mental parsing. Second, they more clearly express cause and effect because each test is more limited in scope. Finally, the fact that each test is short and descriptive makes it easier to see what functionality is already tested and encourages engineers to add new streamlined test methods instead of piling onto existing methods.

拆分单个测试所需的额外模板文件非常值得，并且最终的测试比原来测试更清晰。行为驱动测试往往比面向方法的测试更清晰，原因有几个。首先，它们阅读起来更像自然语言，让人们自然地理解它们，而不需要复杂的心理语言解析。其次，它们更清楚地表达了因果关系，因为每个测试的范围都更有限。最后，每个测试都很短且描述性强，这一事实使我们更容易看到已经测试了哪些功能，并鼓励工程师添加新的简洁测试方法，而不是在现有方法中不断增加内容。

> [^4]:	See `https://testing.googleblog.com/2014/04/testing-on-toilet-test-behaviors-not.html` and `https://dannorth.net/introducing-bdd`.
>
> 4 见 `https://testing.googleblog.com/2014/04/testing-on-toilet-test-behaviors-not.html` 和 `https://dannorth.net/introducing-bdd`。
>
> [^5]: Furthermore, a feature (in the product sense of the word) can be expressed as a collection of behaviors.
>
> 5 此外，一个特征（在这个词的产品意义上）可以被表达为一组行为。

#### Structure tests to emphasize behaviors  强调行为的结构测试

Thinking about tests as being coupled to behaviors instead of methods significantly affects how they should be structured. Remember that every behavior has three parts: a “given” component that defines how the system is set up, a “when” component that defines the action to be taken on the system, and a “then” component that validates the result.[^6] Tests are clearest when this structure is explicit. Some frameworks like Cucumber and Spock directly bake in given/when/then. Other languages can use whitespace and optional comments to make the structure stand out, such as that shown in Example 12-11.

将测试视为与行为而非方法相耦合会显著影响测试的结构。请记住，每个行为都有三个部分：一个是定义系统如何设置的 "given"组件，一个是定义对系统采取的行动的 "when"组件，以及一个验证结果的 "then"组件。当此结构是显式的时，测试是最清晰的。一些框架（如Cucumber和Spock）直接加入了given/when/then的功能支持。其他语言可以使用空格和可选注释使结构突出，如示例12-11所示。

*Example 12-11. A well-structured test*  *例12-11. 一个结构良好的测试*

```java  
@Test
public void transferFundsShouldMoveMoneyBetweenAccounts() {
    // Given two accounts with initial balances of $150 and $20
    Account account1 = newAccountWithBalance(usd(150));
    Account account2 = newAccountWithBalance(usd(20));
    // When transferring $100 from the first to the second account
    bank.transferFunds(account1, account2, usd(100));
    // Then the new account balances should reflect the transfer 
    assertThat(account1.getBalance()).isEqualTo(usd(50));
    assertThat(account2.getBalance()).isEqualTo(usd(120));
}

```

This level of description isn’t always necessary in trivial tests, and it’s usually sufficient to omit the comments and rely on whitespace to make the sections clear. However, explicit comments can make more sophisticated tests easier to understand. This pattern makes it possible to read tests at three levels of granularity:

1. A reader can start by looking at the test method name (discussed below) to get a rough description of the behavior being tested.
2. If that’s not enough, the reader can look at the given/when/then comments for a formal description of the behavior.
3. Finally, a reader can look at the actual code to see precisely how that behavior is expressed.

这种程度的描述在琐碎的测试中并不总是必要的，通常省略注释并依靠空白来使各部分清晰。然而，明确的注释可以使更复杂的测试更容易理解。这种模式使我们有可能在三个层次的粒度上阅读测试:

1. 读者可以从测试方法的名称开始（下面讨论），以获得对被测试行为的粗略描述。
2. 如果这还不够，读者可以查看given/when/then注释，以获得行为的正式描述。
3. 最后，读者可以查看实际代码，以准确地看到该行为是如何表达的。

This pattern is most commonly violated by interspersing assertions among multiple calls to the system under test (i.e., combining the “when” and “then” blocks). Merging the “then” and “when” blocks in this way can make the test less clear because it makes it difficult to distinguish the action being performed from the expected result.

最常见的违反模式是在对被测系统的多个调用之间穿插断言（即，组合“when”和“then”块）。以这种方式合并 "then "和 "when "块会使测试不那么清晰，因为它使人们难以区分正在执行的操作和预期结果。

When a test does want to validate each step in a multistep process, it’s acceptable to define alternating sequences of when/then blocks. Long blocks can also be made more descriptive by splitting them up with the word “and.” Example 12-12 shows what a relatively complex, behavior-driven test might look like.

当一个测试确实想验证一个多步骤过程中的每个步骤时，定义when/then块的交替序列是可以接受的。长的区块也可以用 "and"字来分割，使其更具描述性。例12-12显示了一个相对复杂的、行为驱动的测试是什么样子的。

*Example 12-12. Alternating when/then blocks within a test*   *例12-12. 在一个测试中交替使用when/then块*

```java
@Test
public void shouldTimeOutConnections() {
    // Given two users
    User user1 = newUser();
    User user2 = newUser();
    // And an empty connection pool with a 10-minute timeout
    Pool pool = newPool(Duration.minutes(10));
    // When connecting both users to the pool
    pool.connect(user1);
    pool.connect(user2);
    // Then the pool should have two connections
    assertThat(pool.getConnections()).hasSize(2);
    // When waiting for 20 minutes
    clock.advance(Duration.minutes(20));
    // Then the pool should have no connections
    assertThat(pool.getConnections()).isEmpty();
    // And each user should be disconnected 
    assertThat(user1.isConnected()).isFalse();
    assertThat(user2.isConnected()).isFalse();
}

```

When writing such tests, be careful to ensure that you’re not inadvertently testing multiple behaviors at the same time. Each test should cover only a single behavior, and the vast majority of unit tests require only one “when” and one “then” block.

在编写这种测试时，要注意确保你不会无意中同时测试多个行为。每个测试应该只覆盖一个行为，绝大多数的单元测试只需要一个 "when"和一个 "then"块。

> [^6]: These components are sometimes referred to as “arrange,” “act,” and “assert.”
>
> 6 这些组成部分有时被称为 "安排"、"行动 "和 "断言"。

#### Name tests after the behavior being tested  以被测试的行为命名测试

Method-oriented tests are usually named after the method being tested (e.g., a test for the updateBalance method is usually called testUpdateBalance). With more focused behavior-driven tests, we have a lot more flexibility and the chance to convey useful information in the test’s name. The test name is very important: it will often be the first or only token visible in failure reports, so it’s your best opportunity to communicate the problem when the test breaks. It’s also the most straightforward way to express the intent of the test.

面向方法的测试通常以被测试的方法命名（例如，对 updateBalance 方法的测试通常称为 testUpdateBalance）。对于更加集中的行为驱动的测试，我们有更多的灵活性，并有机会在测试的名称中传达有用的信息。测试名称非常重要：它通常是失败报告中第一个或唯一一个可见的标记，所以当测试中断时，它是你沟通问题的最好机会。它也是表达测试意图的最直接的方式。

A test’s name should summarize the behavior it is testing. A good name describes both the actions that are being taken on a system and the expected outcome. Test names will sometimes include additional information like the state of the system or its environment before taking action on it. Some languages and frameworks make this easier than others by allowing tests to be nested within one another and named using strings, such as in Example 12-13, which uses Jasmine.

测试的名字应该概括它所测试的行为。一个好的名字既能描述在系统上采取的行动，又能描述预期的结果。测试名称有时会包括额外的信息，如系统或其环境的状态。一些语言和框架允许测试相互嵌套，并使用字符串命名，例如例12-13，其中使用了Jasmine，这样做比其他语言和框架更容易。

*Example 12-13. Some sample nested naming patterns*  *例12-1. 一些嵌套命名模式的例子*

```java
describe("multiplication", function() {
    describe("with a positive number", function() {
        var positiveNumber = 10;
        it("is positive with another positive number", function() {
            expect(positiveNumber * 10).toBeGreaterThan(0);
        });
        it("is negative with a negative number", function() {
            expect(positiveNumber * -10).toBeLessThan(0);
        });
    });
    describe("with a negative number", function() {
        var negativeNumber = 10;
        it("is negative with a positive number", function() {
            expect(negativeNumber * 10).toBeLessThan(0);
        });
        it("is positive with another negative number", function() {
            expect(negativeNumber * -10).toBeGreaterThan(0);
        });
    });
});

```

Other languages require us to encode all of this information in a method name, leading to method naming patterns like that shown in Example 12-14.

其他语言要求我们在方法名中编码所有这些信息，导致方法的命名模式如例12-14所示。

*Example 12-14. Some sample method naming patterns*  例12-14. 一些示例方法的命名模式

```Java
multiplyingTwoPositiveNumbersShouldReturnAPositiveNumber 
multiply_postiveAndNegative_returnsNegative 
divide_byZero_throwsException
````

Names like this are much more verbose than we’d normally want to write for methods in production code, but the use case is different: we never need to write code that calls these, and their names frequently need to be read by humans in reports. Hence, the extra verbosity is warranted.

像这样的名字比我们通常为产品代码中的方法所写的要啰嗦得多，但使用场景不同：我们从来不需要写代码来调用这些方法，而且它们的名字经常需要由人类在报告中阅读。因此，额外的描述是有必要的。

Many different naming strategies are acceptable so long as they’re used consistently within a single test class. A good trick if you’re stuck is to try starting the test name with the word “should.” When taken with the name of the class being tested, this naming scheme allows the test name to be read as a sentence. For example, a test of a BankAccount class named shouldNotAllowWithdrawalsWhenBalanceIsEmpty can be read as “BankAccount should not allow withdrawals when balance is empty.” By reading the names of all the test methods in a suite, you should get a good sense of the behaviors implemented by the system under test. Such names also help ensure that the test stays focused on a single behavior: if you need to use the word “and” in a test name, there’s a good chance that you’re actually testing multiple behaviors and should be writing multiple tests!

许多不同的命名策略是可以接受的，只要它们在一个测试类中使用一致。如果你遇到命名困境，一个好的技巧是尝试用 "应当"这个词来开始测试名称。当与被测类的名称一起使用时，这种命名方案允许将测试名称作为一个句子来阅读。例如，一个名为shouldNotAllowWithdrawalsWhenBalanceIsEmpty的BankAccount类的测试可以被理解为 "BankAccount不应该允许在余额为空时提款"。通过阅读套件中所有测试方法的名称，你应该对被测系统实现的行为有一个很好的了解。这样的名字也有助于确保测试集中在单个行为上：如果你需要在测试名称中使用 "and"这个词，很有可能你实际上是在测试多个行为，应该写多个测试!

### Don’t Put Logic in Tests  不要在测试中放入逻辑

Clear tests are trivially correct upon inspection; that is, it is obvious that a test is doing the correct thing just from glancing at it. This is possible in test code because each test needs to handle only a particular set of inputs, whereas production code must be generalized to handle any input. For production code, we’re able to write tests that ensure complex logic is correct. But test code doesn’t have that luxury—if you feel like you need to write a test to verify your test, something has gone wrong!

清晰的测试在检查时通常是正确的；也就是说，很明显，只要看一眼，测试就做了正确的事情。这在测试代码中是可能的，因为每个测试只需要处理一组特定的输入，而产品代码必须被泛化以处理任何输入。对于产品代码，我们能够编写测试，确保复杂的逻辑是正确的。但测试代码没有那么奢侈——如果你觉得你需要写一个测试来验证你的测试，那就说明出了问题！这是不可能的。

Complexity is most often introduced in the form of logic. Logic is defined via the imperative parts of programming languages such as operators, loops, and conditionals. When a piece of code contains logic, you need to do a bit of mental computation to determine its result instead of just reading it off of the screen. It doesn’t take much logic to make a test more difficult to reason about. For example, does the test in Example 12-15 look correct to you?

复杂性最常以逻辑的形式引入。逻辑是通过编程语言的指令部分来定义的，如运算符、循环和条件。当一段代码包含逻辑时，你需要做一些心理预期来确定其结果，而不是仅仅从屏幕上读出来。不需要太多的逻辑就可以使一个测试变得更难理解。例如，例12-15中的测试在你看来是否正确？

*Example 12-15. Logic concealing a bug*  *例12-15. 掩盖bug的逻辑*

```java
@Test
public void shouldNavigateToAlbumsPage() {
    String baseUrl = "http://photos.google.com/";
    Navigator nav = new Navigator(baseUrl);
    nav.goToAlbumPage();
    assertThat(nav.getCurrentUrl()).isEqualTo(baseUrl + "/albums");
}
```

There’s not much logic here: really just one string concatenation. But if we simplify the test by removing that one bit of logic, a bug immediately becomes clear, as demonstrated in Example 12-16.

这里没有什么逻辑：实际上只是一个字符串连接。但是，如果我们通过删除这一点逻辑来简化测试，一个错误就会立即变得清晰，如例12-16所示。

*Example 12-16. A test without logic reveals the bug*  *例12-16. 没有逻辑的测试揭示了bug*

```java
@Test
public void shouldNavigateToPhotosPage() {
    Navigator nav = new Navigator("http://photos.google.com/");
    nav.goToPhotosPage();
    assertThat(nav.getCurrentUrl())).isEqualTo("http://photos.google.com//albums"); // Oops!
}
```

When the whole string is written out, we can see right away that we’re expecting two slashes in the URL instead of just one. If the production code made a similar mistake, this test would fail to detect a bug. Duplicating the base URL was a small price to pay for making the test more descriptive and meaningful (see the discussion of DAMP versus DRY tests later in this chapter).

当写出整个字符串时，我们可以立即看到，我们期望URL中有两个斜杠，而不是一个。如果产品代码犯了类似的错误，此测试将无法检测到错误。重复基本URL是为了使测试更具描述性和意义而付出的小代价（见本章后面关于DAMP与DRY测试的讨论）。

If humans are bad at spotting bugs from string concatenation, we’re even worse at spotting bugs that come from more sophisticated programming constructs like loops and conditionals. The lesson is clear: in test code, stick to straight-line code over clever logic, and consider tolerating some duplication when it makes the test more descriptive and meaningful. We’ll discuss ideas around duplication and code sharing later in this chapter.

如果人类不善于发现来自字符串连接的错误，那么我们更不善于发现来自更复杂的编程结构的错误，如循环和条件。这个教训很清晰：在测试代码中，坚持使用直线型代码而不是复杂的逻辑，并在测试更具描述性的时候考虑容忍一些重复。我们将在本章后面讨论关于重复和代码共享的想法。

### Write Clear Failure Messages  给出清晰的失败信息

One last aspect of clarity has to do not with how a test is written, but with what an engineer sees when it fails. In an ideal world, an engineer could diagnose a problem just from reading its failure message in a log or report without ever having to look at the test itself. A good failure message contains much the same information as the test’s name: it should clearly express the desired outcome, the actual outcome, and any relevant parameters.

清晰的最后一个方面不是关于测试如何编写的，而是关于测试失败时工程师看到的内容。在一个理想的世界里，工程师可以通过阅读日志或报告中的失败信息来诊断一个问题，而不需要看测试本身。一个好的故障信息包含与测试名称相同的信息：它应该清楚地表达预期结果、实际结果和任何相关的参数。

Here’s an example of a bad failure message:

下面是一个糟糕失败消息的示例：

```Java
Test failed: account is closed
```

Did the test fail because the account was closed, or was the account expected to be closed and the test failed because it wasn’t? A better failure message clearly distinguishes the expected from the actual state and gives more context about the result:

测试失败是因为帐户已关闭，还是因为帐户预期将关闭，而测试失败是因为帐户未关闭？一条更好的失败消息清楚地将预期状态与实际状态区分开来，并提供有关结果的更多上下文：

```java
Expected an account in state CLOSED, but got account:
<{name: "my-account", state: "OPEN"}
```

Good libraries can help make it easier to write useful failure messages. Consider the assertions in Example 12-17 in a Java test, the first of which uses classical JUnit asserts, and the second of which uses Truth, an assertion library developed by Google:

好的库可以帮助我们更容易写出有用的失败信息。考虑一下例12-17中Java测试中的断言，第一个断言使用了经典的JUnit断言，第二个断言使用了Truth，一个由Google开发的断言库：

*Example 12-17. An assertion using the Truth library*   *例12-17.  使用Truth库的断言*

```java
Set<String> colors = ImmutableSet.of("red", "green", "blue"); 
assertTrue(colors.contains("orange")); // JUnit 
assertThat(colors).contains("orange"); // Truth
```

Because the first assertion only receives a Boolean value, it is only able to give a generic error message like “expected `true` but was `false`,” which isn’t very informative in a failing test output. Because the second assertion explicitly receives the subject of the assertion, it is able to give a much more useful error message: AssertionError: <[red, green, blue]> should have contained `orange`.”

因为第一个断言只接收一个布尔值，所以它只能给出一个通用的错误信息，如 "预期`true`，但得到的是`false`"，这在失败的测试输出中不是很有意义。因为第二个断言明确地接收断言的主题，它能够给出一个更有用的错误信息。AssertionError: <[red, green, blue]>应该包含`orange`"。

Not all languages have such helpers available, but it should always be possible to manually specify the important information in the failure message. For example, test assertions in Go conventionally look like Example 12-18.

并非所有的语言都有这样的辅助工具，但总是可以手动指定失败信息中的重要信息。例如，Go中的测试断言通常看起来像例12-18。

*Example 12-18. A test assertion in Go*   *例12-18. Go中的测试断言*

```golang
result: = Add(2, 3)
if result != 5 {
    t.Errorf("Add(2, 3) = %v, want %v", result, 5)
}
```

## Tests and Code Sharing: DAMP, Not DRY  测试和代码共享：DAMP，而不是DRY

One final aspect of writing clear tests and avoiding brittleness has to do with code sharing. Most software attempts to achieve a principle called DRY—“Don’t Repeat Yourself.” DRY states that software is easier to maintain if every concept is canonically represented in one place and code duplication is kept to a minimum. This approach is especially valuable in making changes easier because an engineer needs to update only one piece of code rather than tracking down multiple references. The downside to such consolidation is that it can make code unclear, requiring readers to follow chains of references to understand what the code is doing.

编写清晰的测试和避免脆弱性的最后一个方面与代码共享有关。大多数软件都试图实现一个称为DRY的原则——“不要重复你自己。”DRY指出，如果每个概念都在一个地方被规范地表示，并且代码重复保持在最低限度，那么软件就更容易维护。这种方法在简化更改方面尤其有用，因为工程师只需要更新一段代码，而不需要跟踪多个引用。。这种合并的缺点是，它可能会使代码变得不清楚，需要读者跟随引用链来理解代码在做什么。

In normal production code, that downside is usually a small price to pay for making code easier to change and work with. But this cost/benefit analysis plays out a little differently in the context of test code. Good tests are designed to be stable, and in fact you usually want them to break when the system being tested changes. So DRY doesn’t have quite as much benefit when it comes to test code. At the same time, the costs of complexity are greater for tests: production code has the benefit of a test suite to ensure that it keeps working as it becomes complex, whereas tests must stand by themselves, risking bugs if they aren’t self-evidently correct. As mentioned earlier, something has gone wrong if tests start becoming complex enough that it feels like they need their own tests to ensure that they’re working properly.

在通常的产品代码中，为了使代码更易于修改和使用而付出一个小代价。但是这种成本/效益分析在测试代码的背景下有一点不同。好的测试被设计成稳定的，事实上，当被测试的系统发生变化时，你通常希望它们能够捕获到破坏变更。因此，当涉及到测试代码时，DRY并没有那么多的好处。同时，对于测试来说，复杂性的成本更高：产品代码具有测试套件的优势，可以确保它在变得复杂时继续工作，而测试必须独立进行，如果它们不明显正确，则可能出现错误。如前所述，如果测试变得足够复杂，以至于感觉需要自己的测试来确保它们正常工作，那么就会出现问题。

Instead of being completely DRY, test code should often strive to be DAMP—that is, to promote “Descriptive And Meaningful Phrases.” A little bit of duplication is OK in tests so long as that duplication makes the test simpler and clearer. To illustrate, Example 12-19 presents some tests that are far too DRY.

与其说是完全的DRY，不如说测试代码应该经常努力做到DAMP——也就是提倡 "描述性和有意义的短语"。在测试中，一点点的重复是可以的，只要这种重复能使测试更简单、更清晰。为了说明这一点，例12-19介绍了一些过于DRY的测试。

*Example 12-19. A test that is too DRY*   *例12-19. 一个过于DRY的测试*

```java
@Test
public void shouldAllowMultipleUsers() {
    List < User > users = createUsers(false, false);
    Forum forum = createForumAndRegisterUsers(users);
    validateForumAndUsers(forum, users);
}

@Test
public void shouldNotAllowBannedUsers() {
        List < User > users = createUsers(true);
        Forum forum = createForumAndRegisterUsers(users);
        validateForumAndUsers(forum, users);
}

// Lots more tests...
private static List < User > createUsers(boolean...banned) {
    List < User > users = new ArrayList < > ();
    for(boolean isBanned: banned) {
        users.add(newUser().setState(isBanned ? State.BANNED : State.NORMAL).build());
    }
    return users;
}

private static Forum createForumAndRegisterUsers(List < User > users) {
    Forum forum = new Forum();
    for(User user: users) {
        try {
            forum.register(user);
        } catch(BannedUserException ignored) {}
    }
    return forum;
}

private static void validateForumAndUsers(Forum forum, List < User > users) {
    assertThat(forum.isReachable()).isTrue();
    for(User user: users) {
        assertThat(forum.hasRegisteredUser(user)).isEqualTo(user.getState() == State.BANNED);
    }
}
```

The problems in this code should be apparent based on the previous discussion of clarity. For one, although the test bodies are very concise, they are not complete: important details are hidden away in helper methods that the reader can’t see without having to scroll to a completely different part of the file. Those helpers are also full of logic that makes them more difficult to verify at a glance (did you spot the bug?). The test becomes much clearer when it’s rewritten to use DAMP, as shown in Example 12-20.

基于前面对清晰度的讨论，这段代码中的问题应该是显而易见的。首先，尽管测试主体非常简洁，但它们并不完整：重要的细节被隐藏在辅助方法中，读者如果不滚动到文件的完全不同部分就看不到这些方法。那些辅助方法也充满了逻辑，使它们更难以一目了然地验证（你发现了这个错误吗？） 当它被改写成使用DAMP时，测试就变得清晰多了，如例12-20所示。

*Example 12-20. Tests should be DAMP*   *例12-20. 测试应该是DAMP*

```java  
@Test
public void shouldAllowMultipleUsers() {
    User user1 = newUser().setState(State.NORMAL).build();
    User user2 = newUser().setState(State.NORMAL).build();

    Forum forum = new Forum();
    forum.register(user1);
    forum.register(user2);

    assertThat(forum.hasRegisteredUser(user1)).isTrue();
    assertThat(forum.hasRegisteredUser(user2)).isTrue();
}

@Test
public void shouldNotRegisterBannedUsers() {
    User user = newUser().setState(State.BANNED).build();

    Forum forum = new Forum();
    try {
        forum.register(user);
    } catch(BannedUserException ignored) {}

    assertThat(forum.hasRegisteredUser(user)).isFalse();
}
```

These tests have more duplication, and the test bodies are a bit longer, but the extra verbosity is worth it. Each individual test is far more meaningful and can be understood entirely without leaving the test body. A reader of these tests can feel confident that the tests do what they claim to do and aren’t hiding any bugs.

这些测试有更多的重复，测试体也有点长，但额外的言辞是值得的。每个单独的测试都更有意义，不离开测试主体就可以完全理解。这些测试的读者可以确信，这些测试做了他们声称要做的事情，并且没有隐藏任何bug。

DAMP is not a replacement for DRY; it is complementary to it. Helper methods and test infrastructure can still help make tests clearer by making them more concise, factoring out repetitive steps whose details aren’t relevant to the particular behavior being tested. The important point is that such refactoring should be done with an eye toward making tests more descriptive and meaningful, and not solely in the name of reducing repetition. The rest of this section will explore common patterns for sharing code across tests.

DAMP不是DRY的替代品；它是对DRY的补充。辅助方法和测试基础设施仍然可以帮助使测试更清晰，使其更简洁，剔除重复的步骤，其细节与被测试的特定行为不相关。重要的一点是，这样的重构应该着眼于使测试更有描述性和意义，而不是仅仅以减少重复的名义进行。本节的其余部分将探讨跨测试共享代码的常见模式。

### Shared  Values  共享值

Many tests are structured by defining a set of shared values to be used by tests and then by defining the tests that cover various cases for how these values interact. Example 12-21 illustrates what such tests look like.

许多测试的结构是通过定义一组测试使用的共享值，然后通过定义测试来涵盖这些值如何交互的各种情况。例12-21说明了此类测试的模样。

*Example 12-21. Shared values with ambiguous names*  *例12-21. 名称不明确的共享值*

```java
private static final Account ACCOUNT_1 = Account.newBuilder()
    .setState(AccountState.OPEN).setBalance(50).build();

private static final Account ACCOUNT_2 = Account.newBuilder()
    .setState(AccountState.CLOSED).setBalance(0).build();

private static final Item ITEM = Item.newBuilder()
    .setName("Cheeseburger").setPrice(100).build();

// Hundreds of lines of other tests...

@Test
public void canBuyItem_returnsFalseForClosedAccounts() {
    assertThat(store.canBuyItem(ITEM, ACCOUNT_1)).isFalse();
}

@Test
public void canBuyItem_returnsFalseWhenBalanceInsufficient() {
    assertThat(store.canBuyItem(ITEM, ACCOUNT_2)).isFalse();
}
```

This strategy can make tests very concise, but it causes problems as the test suite grows. For one, it can be difficult to understand why a particular value was chosen for a test. In Example 12-21, the test names fortunately clarify which scenarios are being tested, but you still need to scroll up to the definitions to confirm that ACCOUNT_1 and ACCOUNT_2 are appropriate for those scenarios. More descriptive constant names (e.g.,CLOSED_ACCOUNT and ACCOUNT_WITH_LOW_BALANCE) help a bit, but they still make it more difficult to see the exact details of the value being tested, and the ease of reusing these values can encourage engineers to do so even when the name doesn’t exactly describe what the test needs.

此策略可以使测试非常简洁，但随着测试套件的增长，它会导致问题。首先，很难理解为什么选择某个特定值进行测试。在示例12-21中，幸运的是，测试名称澄清了正在测试的场景，但你仍然需要向上滚动到定义，以确认ACCOUNT_1和ACCOUNT_2适用于这些场景。更具描述性的常量名称（例如，CLOSED_ACCOUNT 和 ACCOUNT_WITH_LOW_BALANCE）有一些帮助，但它们仍然使查看被测试值的确切细节变得更加困难，并且重用这些值的方便性可以鼓励工程师这样做，即使名称不能准确描述测试需要什么。

Engineers are usually drawn to using shared constants because constructing individual values in each test can be verbose. A better way to accomplish this goal is to construct data using helper methods (see Example 12-22) that require the test author to specify only values they care about, and setting reasonable defaults7 for all other values. This construction is trivial to do in languages that support named parameters, but languages without named parameters can use constructs such as the Builder pattern to emulate them (often with the assistance of tools such as AutoValue):

工程师通常倾向于使用共享常量，因为在每个测试中构造单独的值可能会很冗长。实现此目标的更好方法是使用辅助方法（参见示例12-22）构造数据，该方法要求测试作者仅指定他们关心的值，并为所有其他值设置合理的默认值。在支持命名参数的语言中，这种构造非常简单，但是没有命名参数的语言可以使用构建器模式等构造来模拟它们（通常需要AutoValue等工具的帮助）：

*Example 12-22. Shared values using helper methods*   *例12-22. 使用辅助方法的共享值*

```java
# A helper method wraps a constructor by defining arbitrary defaults for 
# each of its parameters.
def newContact(
        firstName = "Grace", lastName = "Hopper", phoneNumber = "555-123-4567"):
    return Contact(firstName, lastName, phoneNumber)

# Tests call the helper, specifying values for only the parameters that they
# care about.
def test_fullNameShouldCombineFirstAndLastNames(self):
    def contact = newContact(firstName = "Ada", lastName = "Lovelace") self.assertEqual(contact.fullName(), "Ada Lovelace")

// Languages like Java that don’t support named parameters can emulate them
// by returning a mutable "builder" object that represents the value under
// construction.
private static Contact.Builder newContact() {
    return Contact.newBuilder()
        .setFirstName("Grace")
        .setLastName("Hopper")
        .setPhoneNumber("555-123-4567");
}

// Tests then call methods on the builder to overwrite only the parameters
// that they care about, then call build() to get a real value out of the
// builder. @Test
public void fullNameShouldCombineFirstAndLastNames() {
    Contact contact = newContact()
        .setFirstName("Ada").setLastName("Lovelace")
        .build();
    assertThat(contact.getFullName()).isEqualTo("Ada Lovelace");
}
```

Using helper methods to construct these values allows each test to create the exact values it needs without having to worry about specifying irrelevant information or conflicting with other tests.

使用辅助方法来构建这些值，允许每个测试创建它所需要的精确值，而不必担心指定不相关的信息或与其他测试冲突。

> [^7]: In many cases, it can even be useful to slightly randomize the default values returned for fields that aren’t explicitly set. This helps to ensure that two different instances won’t accidentally compare as equal, and makes it more difficult for engineers to hardcode dependencies on the defaults.
>
> 7 在许多情况下，甚至可以对未显式设置的字段返回的默认值进行轻微的随机化。这有助于确保两个不同的实例不会意外地比较为相等，并使工程师更依赖硬编码对默认值关系。

### Shared Setup  共享设置

A related way that tests shared code is via setup/initialization logic. Many test frameworks allow engineers to define methods to execute before each test in a suite is run. Used appropriately, these methods can make tests clearer and more concise by obviating the repetition of tedious and irrelevant initialization logic. Used inappropriately, these methods can harm a test’s completeness by hiding important details in a separate initialization method.

测试共享代码的相关方法是通过设置/初始化逻辑。许多测试框架允许工程师定义在每个测试运行前需执行的方法。如果使用得当，这些方法可以避免重复繁琐和不相关的初始化逻辑，从而使测试更清晰、更简洁。如果使用不当，这些方法会在单独的初始化方法中隐藏重要细节，从而损害测试的完整性。

The best use case for setup methods is to construct the object under tests and its collaborators. This is useful when the majority of tests don’t care about the specific arguments used to construct those objects and can let them stay in their default states. The same idea also applies to stubbing return values for test doubles, which is a concept that we explore in more detail in Chapter 13.

设置方法的最佳用例是构造被测试对象及其合作者们。当大多数测试不关心用于构造这些对象的特定参数，并且可以让它们保持默认状态时，这非常有用。同样的想法也适用于测试替换的打桩返回值，这是一个我们在第13章中详细探讨的概念。

One risk in using setup methods is that they can lead to unclear tests if those tests begin to depend on the particular values used in setup. For example, the test in Example 12-23 seems incomplete because a reader of the test needs to go hunting to discover where the string “Donald Knuth” came from.

使用设置方法的一个风险是，如果这些测试开始依赖于设置中使用的特定值，它们可能导致测试不明确。例如，例12-23中的测试似乎不完整，因为测试的读者需要去寻找字符串“Donald Knuth”的来源。

*Example 12-23. Dependencies on values in setup methods*   *例12-23. 设置方法中对数值的依赖性*

```java
private NameService nameService;
private UserStore userStore;

@Before
public void setUp() {
    nameService = new NameService();
    nameService.set("user1", "Donald Knuth");
    userStore = new UserStore(nameService);
}

// [... hundreds of lines of tests ...]

@Test
public void shouldReturnNameFromService() {
    UserDetails user = userStore.get("user1");
    assertThat(user.getName()).isEqualTo("Donald Knuth");
}
```

Tests like these that explicitly care about particular values should state those values directly, overriding the default defined in the setup method if need be. The resulting test contains slightly more repetition, as shown in Example 12-24, but the result is far more descriptive and meaningful.

像这样明确关心特定值的测试应该直接说明这些值，如果需要的话，可以覆盖setup方法中定义的默认值。如例12-24所示，所产生的测试包含了稍多的重复，但其结果是更有描述性和意义的。

*Example 12-24. Overriding values in setup Methods*   *例12-24. 重写设置方法中的值*

```java
private NameService nameService;
private UserStore userStore;

@Before
public void setUp() {
    nameService = new NameService();
    nameService.set("user1", "Donald Knuth");
    userStore = new UserStore(nameService);
}

@Test
public void shouldReturnNameFromService() {
    nameService.set("user1", "Margaret Hamilton");
    UserDetails user = userStore.get("user1");
    assertThat(user.getName()).isEqualTo("Margaret Hamilton");
}
```

### Shared  Helpers  and  Validation  共享辅助方法和验证

The last common way that code is shared across tests is via “helper methods” called from the body of the test methods. We already discussed how helper methods can be a useful way for concisely constructing test values—this usage is warranted, but other types of helper methods can be dangerous.

最后一种在测试中共享代码的常见方式是通过从测试方法主体中调用 "辅助方法"。我们已经讨论了辅助方法如何成为简明地构建测试值的有用方法——这种用法是有必要的，但其他类型的辅助方法可能是危险的。

One common type of helper is a method that performs a common set of assertions against a system under test. The extreme example is a validate method called at the end of every test method, which performs a set of fixed checks against the system under test. Such a validation strategy can be a bad habit to get into because tests using this approach are less behavior driven. With such tests, it is much more difficult to determine the intent of any particular test and to infer what exact case the author had in mind when writing it. When bugs are introduced, this strategy can also make them more difficult to localize because they will frequently cause a large number of tests to start failing.

一种常见的辅助工具是对被测系统执行一套常见的断言方法。极端的例子是在每个测试方法的末尾调用一个验证方法，它对被测系统执行一组固定的检查。这样的验证策略可能是一个不好的习惯，因为使用这种方法的测试是较少的行为驱动。有了这样的测试，就更难确定任何特定测试的意图，也更难推断作者编写时心中所想的确切情况。当bug被引入时，这种策略也会使它们更难被定位，因为它们会经常导致大量的测试开始失败。

More focused validation methods can still be useful, however. The best validation helper methods assert a single conceptual fact about their inputs, in contrast to general-purpose validation methods that cover a range of conditions. Such methods can be particularly helpful when the condition that they are validating is conceptually simple but requires looping or conditional logic to implement that would reduce clarity were it included in the body of a test method. For example, the helper method in Example 12-25 might be useful in a test covering several different cases around account access.

然而，更有针对性的验证方法仍然是有用的。最好的验证辅助方法只断言其输入的一个概念性事实，与涵盖一系列条件的通用验证方法形成对比。当他们验证的条件在概念上很简单，但需要循环或条件逻辑来实现，如果将其包含在测试方法的主体中，就会降低清晰度，这样的方法特别有用。例如，例12-25中的辅助方法在测试中可能很有用，它涵盖了围绕账户访问的几种不同情况。

*Example 12-25. A conceptually simple test*   *例12-25. 概念上简单的测试*

```java
private void assertUserHasAccessToAccount(User user, Account account) {
    for(long userId: account.getUsersWithAccess()) {
        if(user.getId() == userId) {
            return;
        }
    }
    fail(user.getName() + " cannot access " + account.getName());
}
```

### Defining Test Infrastructure  界定测试基础框架

The techniques we’ve discussed so far cover sharing code across methods in a single test class or suite. Sometimes, it can also be valuable to share code across multiple test suites. We refer to this sort of code as test infrastructure. Though it is usually more valuable in integration or end-to-end tests, carefully designed test infrastructure can make unit tests much easier to write in some circumstances.

到目前为止，我们讨论的技术包括在单个测试类或测试套件中跨方法共享代码。有时，跨多个测试套件共享代码也很有价值。我们将这种代码称为测试基础框架。尽管它通常在集成或端到端测试中更有价值，但精心设计的测试基础框架可以使单元测试在某些情况下更易于编写。

Custom test infrastructure must be approached more carefully than the code sharing that happens within a single test suite. In many ways, test infrastructure code is more similar to production code than it is to other test code given that it can have many callers that depend on it and can be difficult to change without introducing breakages. Most engineers aren’t expected to make changes to the common test infrastructure while testing their own features. Test infrastructure needs to be treated as its own separate product, and accordingly, test infrastructure must always have its own tests.

自定义测试基础框架必须比在单个测试套件中发生的代码共享更谨慎地处理。在许多方面，测试基础框架的代码比其他测试代码更类似于产品代码，因为它可能有许多依赖它的调用者，并且在不引入破坏的情况下很难改变。大多数工程师不应该在测试他们自己的功能时对通用测试基础框架进行修改。测试基础框架需要被当作自己独立的产品，相应地，测试基础框架必须始终有自己的测试。

Of course, most of the test infrastructure that most engineers use comes in the form of well-known third-party libraries like JUnit. A huge number of such libraries are available, and standardizing on them within an organization should happen as early and universally as possible. For example, Google many years ago mandated Mockito as the only mocking framework that should be used in new Java tests and banned new tests from using other mocking frameworks. This edict produced some grumbling at the time from people comfortable with other frameworks, but today, it’s universally seen as a good move that made our tests easier to understand and work with.

当然，大多数工程师使用的测试基础框架都是以知名的第三方库的形式出现的，如JUnit。有大量这样的库可以使用，在一个组织内对它们进行标准化应该尽可能早地和普遍地发生。例如，Google多年前规定Mockito是新的Java测试中唯一应该使用的模拟框架，并禁止新的测试使用其他模拟框架。这一规定在当时引起了一些对其他框架感到满意的人的不满，但今天，人们普遍认为这是一个好的举措，使我们的测试更容易理解和使用。

## Conclusion

Unit tests are one of the most powerful tools that we as software engineers have to make sure that our systems keep working over time in the face of unanticipated changes. But with great power comes great responsibility, and careless use of unit testing can result in a system that requires much more effort to maintain and takes much more effort to change without actually improving our confidence in said system.

单元测试是我们作为软件工程师所拥有的最强大的工具之一，它可以确保我们的系统在面对意料之外的变化时仍能正常工作。但是，强大的力量伴随着巨大的责任，不小心使用单元测试会导致系统需要更多的努力来维护，需要更多的努力来更改，否则实际上不会提高我们对所述系统的信心。

Unit tests at Google are far from perfect, but we’ve found tests that follow the practices outlined in this chapter to be orders of magnitude more valuable than those that don’t. We hope they’ll help you to improve the quality of your own tests!

谷歌的单元测试远非完美，但我们发现遵循本章所述做法的测试比那些不遵循的测试要有价值得多。我们希望它们能帮助你提高你自己的测试的质量。

## TL;DRs  内容提要

- Strive for unchanging tests.

- Test via public APIs.

- Test state, not interactions.

- Make your tests complete and concise.

- Test behaviors, not methods.

- Structure tests to emphasize behaviors.

- Name tests after the behavior being tested.

- Don’t put logic in tests.

- Write clear failure messages.

- Follow DAMP over DRY when sharing code for tests.

- 努力实现稳定的测试。

- 通过公共API进行测试。

- 测试状态，而不是交互。

- 使你的测试完整和简明。

- 测试行为，而不是方法。

- 强调行为的结构测试。

- 使用被测试的行为来命名测试。

- 不要把逻辑放在测试中。

- 编写清晰的失败信息。

- 在共享测试的代码时，遵循DAMP而不是DRY。
