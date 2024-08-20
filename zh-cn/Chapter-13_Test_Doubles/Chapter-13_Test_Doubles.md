
**CHAPTER 13**

# Test Doubles

# 第十三章 测试替代

**Written by Andrew Trenk and Dillon Bly**

**Edited by Tom Manshreck**

Unit tests are a critical tool for keeping developers productive and reducing defects in code. Although they can be easy to write for simple code, writing them becomes difficult as code becomes more complex.

单元测试是保持开发人员生产力和减少代码缺陷的重要工具。尽管对于简单的代码来说，单元测试很容易编写，但当代码变得更加复杂时，编写单元测试就变得困难了。

For example, imagine trying to write a test for a function that sends a request to an external server and then stores the response in a database. Writing a handful of tests might be doable with some effort. But if you need to write hundreds or thousands of tests like this, your test suite will likely take hours to run, and could become flaky due to issues like random network failures or tests overwriting one another’s data.

例如，想象一下，尝试为一个函数编写测试，该函数向外部服务器发送请求，然后将响应存储在数据库中。只需多付出一些努力，编写少量的测试可能是可以做到的。但如果你需要写成百上千个这样的测试，你的测试套件很可能需要几个小时才能运行，并且可能由于随机网络故障或测试相互覆盖数据等问题让测试变得不稳定。

Test doubles come in handy in such cases. A test double is an object or function that can stand in for a real implementation in a test, similar to how a stunt double can stand in for an actor in a movie. The use of test doubles is often referred to as mocking, but we avoid that term in this chapter because, as we’ll see, that term is also used to refer to more specific aspects of test doubles.

在这种情况下，测试替代就会派上用场。测试替代可以是一个对象或函数，它可以在测试中替代真正的实现，类似于特技替身可以代替电影中的演员那样。测试替代的使用通常被称为模拟，但我们在本章中避免使用这个术语，因为正如我们将看到的，这个术语也被用来指代测试替代的更具体方面。

Perhaps the most obvious type of test double is a simpler implementation of an object that behaves similarly to the real implementation, such as an in-memory database. Other types of test doubles can make it possible to validate specific details of your system, such as by making it easy to trigger a rare error condition, or ensuring a heavyweight function is called without actually executing the function’s implementation.

也许最明显的测试替代类型是一个行为类似于真实实现的对象的更简单的实现，比如一个内存数据库。其他类型的测试替代可以验证系统的特定细节，例如通过使触发罕见错误条件变得容易，或者确保在不实际执行函数实现的情况下调用重量级函数。

The previous two chapters introduced the concept of small tests and discussed why they should comprise the majority of tests in a test suite. However, production code often doesn’t fit within the constraints of small tests due to communication across multiple processes or machines. Test doubles can be much more lightweight than real implementations, allowing you to write many small tests that execute quickly and are not flaky.

前两章介绍了小型测试的概念，并讨论了为什么它们应该包括测试套件中的大多数测试。然而，由于跨多个进程或机器的通信，生产代码往往不适合小型测试的约束。测试替代可以比真正的实现更轻量级，允许你写许多小测试，快速执行，并且不易出错。

## The Impact of Test Doubles on Software Development  测试替代对软件开发的影响

The use of test doubles introduces a few complications to software development that require some trade-offs to be made. The concepts introduced here are discussed in more depth throughout this chapter:

*Testability*  
    To use test doubles, a codebase needs to be designed to be testable—it should be possible for tests to swap out real implementations with test doubles. For example, code that calls a database needs to be flexible enough to be able to use a test double in place of a real database. If the codebase isn’t designed with testing in mind and you later decide that tests are needed, it can require a major commitment to refactor the code to support the use of test doubles.

*Applicability*  
    Although proper application of test doubles can provide a powerful boost to engineering velocity, their improper use can lead to tests that are brittle, complex, and less effective. These downsides are magnified when test doubles are used improperly across a large codebase, potentially resulting in major losses in productivity for engineers. In many cases, test doubles are not suitable and engineers should prefer to use real implementations instead.

*Fidelity*  
    Fidelity refers to how closely the behavior of a test double resembles the behavior of the real implementation that it’s replacing. If the behavior of a test double significantly differs from the real implementation, tests that use the test double likely wouldn’t provide much value—for example, imagine trying to write a test with a test double for a database that ignores any data added to the database and always returns empty results. But perfect fidelity might not be feasible; test doubles often need to be vastly simpler than the real implementation in order to be suitable for use in tests. In many situations, it is appropriate to use a test double even without perfect fidelity. Unit tests that use test doubles often need to be supplemented by larger-scope tests that exercise the real implementation.

测试替代的使用给软件开发带来了一些复杂的问题，需要做出一些权衡。本章将更深入地讨论此处介绍的概念：

*可测试性*  
    为了使用测试替代，需要将代码库设计成可测试的--测试应该可以用测试替代替换实际实现。例如，调用数据库的代码需要足够灵活，以便能够使用测试替代来代替真正的数据库。如果代码库在设计时没有考虑到测试，而你后来决定需要测试，那么可能需要进行大量的提交来重构代码，以支持使用测试替代。

*适用性*  
    尽管适当地应用测试替代可以极大地提高工程速度，但其使用不当会导致测试变得脆弱、复杂且低效。当测试替代在大型代码库中使用不当时，这些缺点就会被放大，这可能会导致工程师在生产效率方面的重大损失。在许多情况下，测试替代是不合适的，工程师应该倾向于使用真实的实现。

*仿真度*  
    仿真度是指测试替代的行为与它所替代的真实实现的行为有多大的相似性。如果测试替代的行为与真正的实现有很大的不同，那么使用测试替代的测试可能不会提供太多的价值——例如，想象一下，尝试用测试替代为一个数据库写一个测试，这个数据库忽略了添加到数据库的任何数据，总是返回空结果。这样做是完美的仿真度不能接受的；测试替代通常需要比实际的实现简单得多，以便适合在测试中使用。在许多情况下，即使没有完美的仿真度，使用测试替代也是合适的。使用测试替代的单元测试通常需要由执行实际实现的更大范围的测试来支持。

## Test Doubles at Google 谷歌的测试替代

At Google, we’ve seen countless examples of the benefits to productivity and software quality that test doubles can bring to a codebase, as well as the negative impact they can cause when used improperly. The practices we follow at Google have evolved over time based on these experiences. Historically, we had few guidelines on how to effectively use test doubles, but best practices evolved as we saw common patterns and antipatterns arise in many teams’ codebases.

在谷歌，我们已经看到了无数的例子，证明测试替代可以为代码库提升生产力和软件质量方面的好处，以及在使用不当时可能造成的负面影响。我们在谷歌遵循的做法是基于这些经验随着时间的推移而演变的。从历史上看，我们很少有关于如何有效地使用测试替代，但最佳实践随着我们看到许多团队的代码库中出现了常见模式和反模式而不断发展。

One lesson we learned the hard way is the danger of overusing mocking frameworks, which allow you to easily create test doubles (we will discuss mocking frameworks in more detail later in this chapter). When mocking frameworks first came into use at Google, they seemed like a hammer fit for every nail—they made it very easy to write highly focused tests against isolated pieces of code without having to worry about how to construct the dependencies of that code. It wasn’t until several years and countless tests later that we began to realize the cost of such tests: though these tests were easy to write, we suffered greatly given that they required constant effort to maintain while rarely finding bugs. The pendulum at Google has now begun swinging in the other direction, with many engineers avoiding mocking frameworks in favor of writing more realistic tests.

我们经过艰苦的历程学到的一个教训是过度使用模拟框架的危险，它允许你轻松创建测试替代（我们将在本章后面更详细地讨论模拟框架）。当mocking框架首次在Google使用时，它们就像一把锤子，适合每一根钉子。它们使得针对独立的代码段编写高度集中的测试变得非常容易，而不必担心如何构建代码的依赖关系。直到经过几年和无数次测试之后，我们才开始意识到这些测试的成本：尽管这些测试很容易编写，但由于它们需要不断的努力来维护，而很少发现bug，我们遭受了巨大的损失。谷歌的天平现在开始向另一个方向摆动，许多工程师避免mocking框架，转而编写更真实的测试。

Even though the practices discussed in this chapter are generally agreed upon at Google, the actual application of them varies widely from team to team. This variance stems from engineers having inconsistent knowledge of these practices, inertia in an existing codebase that doesn’t conform to these practices, or teams doing what is easiest for the short term without thinking about the long-term implications.

尽管本章中讨论的实践在谷歌公司得到普遍认可，但实际应用情况因团队而异。这种差异源于工程师对这些实践的认识差异，现有代码库中的习惯不符合这些实践，或者团队只做短期内最容易的事情而不考虑长期影响。

## Basic Concepts 基本概念

Before we dive into how to effectively use test doubles, let’s cover some of the basic concepts related to them. These build the foundation for best practices that we will discuss later in this chapter.

在我们深入研究如何有效地使用测试替代之前，让我们先介绍一些与之相关的基本概念。这些为我们在本章后面讨论的最佳实践奠定了基础。

### An Example Test Double 测试替代的示例

Imagine an ecommerce site that needs to process credit card payments. At its core, it might have something like the code shown in [Example 13-1](#_bookmark1068).

想象一个需要处理信用卡支付的电子商务网站。在其核心部分，它可能有类似于例13-1中所示的代码。

*Example* *13-1.* *A* *credit* *card* *service*

```java
class PaymentProcessor {
  private CreditCardService creditCardService;
  ...
  boolean makePayment(CreditCard creditCard, Money amount) {
    if (creditCard.isExpired()) { return false; }
    boolean success = creditCardService.chargeCreditCard(creditCard,  amount);
    return success;
  }
}

```

It would be infeasible to use a real credit card service in a test (imagine all the transaction fees from running the test!), but a test double could be used in its place to *simulate* the behavior of the real system. The code in Example 13-2 shows an extremely simple test double.

在测试中使用真正的信用卡服务是不可行的（想象一下运行测试所产生的所有交易费用！），但是可以用一个测试用的替代来*模拟*真实系统的行为。例13-2中的代码展示了一个非常简单的测试替代。

*Example 13-2. A trivial test double*

```java
class TestDoubleCreditCardService implements CreditCardService {
  @Override
  public boolean chargeCreditCard(CreditCard creditCard, Money amount) {
    return true;
  }
}
```

Although this test double doesn’t look very useful, using it in a test still allows us to test some of the logic in the makePayment() method. For example, in Example 13-3, we can validate that the method behaves properly when the credit card is expired because the code path that the test exercises doesn’t rely on the behavior of the credit card service.

虽然这个测试替代看起来不是很有用，但在测试中使用它仍然可以让我们测试makePayment()方法中的一些逻辑。例如，在例13-3中，我们可以验证该方法在信用卡过期时的行为是否正确，因为测试执行的代码路径不依赖于信用卡服务的行为。

*Example 13-3. Using the test double*

```java
@Test public void cardIsExpired_returnFalse() {
	boolean success = paymentProcessor.makePayment(EXPIRED_CARD, AMOUNT);
    assertThat(success).isFalse();
}
```

The following sections in this chapter will discuss how to make use of test doubles in more complex situations than this one.

本章下面的章节将讨论如何在比这更复杂的情况下使用测试替代。

### Seams

```txt
Seams是可以更改程序中的行为而无需在指定位置进行编辑的地方。
```

Code is said to be [*testable* ](https://oreil.ly/yssV2)if it is written in a way that makes it possible to write unit tests for the code. A [*seam* ](https://oreil.ly/pFSFf)is a way to make code testable by allowing for the use of test doubles—it makes it possible to use different dependencies for the system under test rather than the dependencies used in a production environment.

如果代码的编写方式能够使代码的单元测试成为可能，那么代码就被称为[*可测试代码*](https://oreil.ly/yssV2)。[*seam*](https://oreil.ly/pFSFf)是一种通过允许使用测试替代使代码可测试的方法——它使被测系统可以使用不同的依赖项，而不是生产环境中使用的依赖项。

[*Dependency* *injection* ](https://oreil.ly/og9p9)is a common technique for introducing seams. In short, when a class utilizes dependency injection, any classes it needs to use (i.e., the class’s *dependencies*) are passed to it rather than instantiated directly, making it possible for these dependencies to be substituted in tests.

[*依赖注入*](https://oreil.ly/og9p9)是一种引入seams的常见技术。简而言之，当一个类利用依赖注入时，它需要使用的任何类（即该类的*依赖*）被传递给它，而不是直接实例化，从而使这些依赖项可以在测试中被替换。

[Example 13-4 ](#_bookmark1074)shows an example of dependency injection. Rather than the constructor creating an instance of CreditCardService, it accepts an instance as a parameter.

示例13-4显示了依赖项注入的示例。它接受实例作为参数，而不是创建CreditCardService实例的构造函数。

*Example* *13-4.* *Dependency* *injection*

```java
class PaymentProcessor {
  private CreditCardService creditCardService;

  PaymentProcessor(CreditCardService creditCardService) {
    this.creditCardService = creditCardService;
  }
  ...
}

```

The code that calls this constructor is responsible for creating an appropriate Credit CardService instance. Whereas the production code can pass in an implementation of CreditCardService that communicates with an external server, the test can pass in a test double, as demonstrated in [Example 13-5](#_bookmark1075).

调用这个构造函数的代码负责创建一个合适的CreditCardService实例。生产代码可以传入一个与外部服务器通信的CreditCardService的实现，而测试可以传入一个测试用的替代，如例13-5所示。

*Example 13-5. Passing in a test double*

```java
PaymentProcessor paymentProcessor =
    new PaymentProcessor(new TestDoubleCreditCardService());
```

To reduce boilerplate associated with manually specifying constructors, automated dependency injection frameworks can be used for constructing object graphs automatically. At Google, [Guice](https://github.com/google/guice)and [Dagger](https://google.github.io/dagger)are automated dependency injection frameworks that are commonly used for Java code.

为了减少与手动指定构造函数有关的模板，可以使用自动依赖注入框架来自动构建对象。在谷歌，[Guice](https://github.com/google/guice)和[Dagger](https://google.github.io/dagger)是自动依赖注入框架，通常用于Java代码。

With dynamically typed languages such as Python or JavaScript, it is possible to dynamically replace individual functions or object methods. Dependency injection is less important in these languages because this capability makes it possible to use real implementations of dependencies in tests while only overriding functions or methods of the dependency that are unsuitable for tests.

对于动态类型的语言，如Python或JavaScript，有可能动态地替换单个函数或对象方法。依赖注入在这些语言中不太重要，因为这种功能使得在测试中使用依赖项的真实实现成为可能，同时只覆盖不适合测试的依赖项的函数或方法。

Writing testable code requires an upfront investment. It is especially critical early in the lifetime of a codebase because the later testability is taken into account, the more difficult it is to apply to a codebase. Code written without testing in mind typically needs to be refactored or rewritten before you can add appropriate tests.

编写可测试代码需要前期投入。在代码库生命周期的早期，这一点尤其重要，因为越晚考虑可测试性，就越难应用到代码库中。在没有考虑到测试的情况下编写的代码通常需要重构或重写，然后才可以添加适当的测试。

### Mocking Frameworks 模拟框架

A *mocking framework* is a software library that makes it easier to create test doubles within tests; it allows you to replace an object with a *mock*, which is a test double whose behavior is specified inline in a test. The use of mocking frameworks reduces boilerplate because you don’t need to define a new class each time you need a test double.

一个*mocking框架*是一个软件库，它使得在测试中创建测试替代更加容易；它允许您将对象替换为模拟对象，模拟对象是在测试中内联指定其行为的测试替代。模拟框架的使用减少了模板代码，因为你不需要在每次需要测试时定义一个新类。

Example 13-6 demonstrates the use of [Mockito](https://site.mockito.org/), a mocking framework for Java. Mockito creates a test double for CreditCardService and instructs it to return a specific value.

 例13-6演示了[Mockito](https://site.mockito.org/)的使用，这是一个Java的模拟框架。Mockito为CreditCardService创建了一个测试替代，并指定它返回一个特定的值。

*Example 13-6. Mocking frameworks*

```java
class PaymentProcessorTest {
...
PaymentProcessor paymentProcessor;

// Create a test double of CreditCardService with just one line of code.
@Mock CreditCardService mockCreditCardService;

@Before public void setUp() {
    // Pass in the test double to the system under test.
    paymentProcessor = new PaymentProcessor(mockCreditCardService);
}

@Test public void chargeCreditCardFails_returnFalse() {
    // Give some behavior to the test double: it will return false
    // anytime the chargeCreditCard() method is called. The usage of
    // “any()” for the method’s arguments tells the test double to
    // return false regardless of which arguments are passed.
    when(mockCreditCardService.chargeCreditCard(any(), any())
    	.thenReturn(false);
    boolean success = paymentProcessor.makePayment(CREDIT_CARD, AMOUNT);
    assertThat(success).isFalse();
  }
}
```

Mocking frameworks exist for most major programming languages. At Google, we use Mockito for Java, [the googlemock component of Googletest](https://github.com/google/googletest)for C++, and [unittest.mock](https://oreil.ly/clzvH)for Python.

大多数主要的编程语言都有模拟框架。在Google，我们在Java中使用Mockito，在C++中使用[Googletest的googlemock组件](https://github.com/google/googletest)，在Python中使用[uni-ttest.mock](https://oreil.ly/clzvH) 。

Although mocking frameworks facilitate easier usage of test doubles, they come with some significant caveats given that their overuse will often make a codebase more difficult to maintain. We cover some of these problems later in this chapter.

尽管模拟框架有助于更容易地使用测试替代，但它们也有一些重要的注意事项，因为过度使用它们往往会使代码库更难维护。我们将在本章的后面介绍其中的一些问题。

## Techniques for Using Test Doubles 测试替代的使用技巧

There are three primary techniques for using test doubles. This section presents a brief introduction to these techniques to give you a quick overview of what they are and how they differ. Later sections in this chapter go into more details on how to effectively apply them.

使用测试替代有三种主要技术。本节简要介绍这些技术，让您快速了解它们是什么以及它们之间的区别。本章后面几节将详细介绍如何有效地应用它们。

An engineer who is aware of the distinctions between these techniques is more likely to know the appropriate technique to use when faced with the need to use a test double.

知道到这些技术之间区别的工程师更有可能在面临需要使用测试替代时知道使用哪种适当的技术。

### Faking 伪造

A [*fake*](https://oreil.ly/rymnI) is a lightweight implementation of an API that behaves similar to the real implementation but isn’t suitable for production; for example, an in-memory database. Example 13-7presents an example of faking.

 [*fake*](https://oreil.ly/rymnI)是一个API的轻量级实现，其行为类似于真实实现，但不适合生产；例如，一个内存数据库。例13-7介绍了一个伪造的例子。

*Example 13-7. A simple* *fake*

```java
// Creating the fake is fast and easy.
AuthorizationService fakeAuthorizationService = new FakeAuthorizationService();
AccessManager accessManager = new AccessManager(fakeAuthorizationService):

// Unknown user IDs shouldn’t have access.
assertFalse(accessManager.userHasAccess(USER_ID));

// The user ID should have access after it is added to
// the authorization service. 
fakeAuthorizationService.addAuthorizedUser(new User(USER_ID));
assertThat(accessManager.userHasAccess(USER_ID)).isTrue();

```

Using a fake is often the ideal technique when you need to use a test double, but a fake might not exist for an object you need to use in a test, and writing one can be challenging because you need to ensure that it has similar behavior to the real implementation, now and in the future.

当你需要使用测试替代时，使用伪造通常是理想的技术，但是对于你需要在测试中使用的对象，伪造可能不存在，编写伪造可能是一项挑战，因为你需要确保它在现在和将来具有与真实实现类似的行为。

### Stubbing 打桩

[*Stubbing*](https://oreil.ly/gmShS)is the process of giving behavior to a function that otherwise has no behavior on its own—you specify to the function exactly what values to return (that is, you *stub* the return values).

打桩是指将行为赋予一个函数的过程，如果该函数本身没有行为，则你可以为该函数指定要返回的值（即打桩返回值）。

[Example 13-8](#_bookmark1093) illustrates stubbing. The when(...).thenReturn(...) method calls from the Mockito mocking framework specify the behavior of the lookupUser() method.

例13-8演示了打桩的使用。来自Mockito模拟框架的when(...).thenReturn(...)方法调用指定了lookupUser()方法的行为。

*Example* *13-8.* *Stubbing*

```java
// Pass in a test double that was created by a mocking framework.
AccessManager accessManager = new AccessManager(mockAuthorizationService):

// The user ID shouldn’t have access if null is returned. 
when(mockAuthorizationService.lookupUser(USER_ID)).thenReturn(null);
assertThat(accessManager.userHasAccess(USER_ID)).isFalse();

// The user ID should have access if a non-null value is returned.   
when(mockAuthorizationService.lookupUser(USER_ID)).thenReturn(USER);
assertThat(accessManager.userHasAccess(USER_ID)).isTrue();
```

Stubbing is typically done through mocking frameworks to reduce boilerplate that would otherwise be needed for manually creating new classes that hardcode return values.

打桩通常是通过模拟框架来完成的，以减少手动创建新的类来硬编码返回值所需的模板。

Although stubbing can be a quick and simple technique to apply, it has limitations, which we’ll discuss later in this chapter.

虽然打桩是一种快速而简单的应用技术，但它也有局限性，我们将在本章后面讨论。

### Interaction Testing 交互测试

[*Interaction testing*](https://oreil.ly/zGfFn)is a way to validate *how* a function is called without actually calling the implementation of the function. A test should fail if a function isn’t called the correct way—for example, if the function isn’t called at all, it’s called too many times, or it’s called with the wrong arguments.

交互测试是一种在不执行函数实现的情况下验证函数如何被调用的方法。如果函数没有正确调用，测试应该失败。例如，如果函数根本没有被调用，调用次数太多，或者调用参数错误。

Example 13-9 presents an instance of interaction testing. The verify(...) method from the Mockito mocking framework is used to validate that lookupUser() is called as expected.

例13-9展示了一个交互测试的实例。来自Mockito 模拟框架的verify(...)方法被用来验证lookupUser()是否按预期调用。

*Example* *13-9. Interaction testing*

```java
// Pass in a test double that was created by a mocking framework.
AccessManager accessManager = new AccessManager(mockAuthorizationService);
accessManager.userHasAccess(USER_ID);

// The test will fail if accessManager.userHasAccess(USER_ID) didn’t call
// mockAuthorizationService.lookupUser(USER_ID).
verify(mockAuthorizationService).lookupUser(USER_ID);

```

Similar to stubbing, interaction testing is typically done through mocking frameworks. This reduces boilerplate compared to manually creating new classes that contain code to keep track of how often a function is called and which arguments were passed in.

与打桩类似，交互测试通常是通过模拟框架完成的。与手动创建包含代码的新类以跟踪函数调用频率和传入参数相比，这减少了模板文件。

Interaction testing is sometimes called [*mocking*](https://oreil.ly/IfMoR). We avoid this terminology in this chapter because it can be confused with mocking frameworks, which can be used for stubbing as well as for interaction testing.

交互测试有时被称为模拟。我们在本章中避免使用这个术语，因为它可能与模拟框架混淆，模拟框架既可用于打桩，也可用于交互测试。

As discussed later in this chapter, interaction testing is useful in certain situations but should be avoided when possible because overuse can easily result in brittle tests.

正如本章后面所讨论的，交互测试在某些情况下很有用，但应尽可能避免，因为过度使用很容易导致脆性测试。

### Real Implementations 真实实现

Although test doubles can be invaluable testing tools, our first choice for tests is to use the real implementations of the system under test’s dependencies; that is, the same implementations that are used in production code. Tests have higher fidelity when they execute code as it will be executed in production, and using real implementations helps accomplish this.

尽管测试替代是非常有价值的测试工具，但我们对测试的第一选择是使用被测系统依赖的真实实现；也就是说，与生产代码中使用的实现相同。当测试执行代码时，其仿真度更高，因为它将在生产中执行，使用真实实现有助于实现这一目标。

At Google, the preference for real implementations developed over time as we saw that overuse of mocking frameworks had a tendency to pollute tests with repetitive code that got out of sync with the real implementation and made refactoring difficult. We’ll look at this topic in more detail later in this chapter.

在谷歌，对真实实现的偏好随着时间的推移而发展，因为我们看到过度使用模拟框架有一种倾向，即使用与真实实现不同步的重复代码污染测试，从而使重构变得困难。我们将在本章后面更详细地讨论这个主题。

Preferring real implementations in tests is known as [*classical testing*](https://oreil.ly/OWw7h). There is also a style of testing known as *mockist testing*, in which the preference is to use mocking frameworks instead of real implementations. Even though some people in the software industry practice mockist testing (including the [creators of the first mocking](https://oreil.ly/_QWy7) [frameworks](https://oreil.ly/_QWy7)), at Google, we have found that this style of testing is difficult to scale. It requires engineers to follow [strict guidelines when designing the system under test](http://jmock.org/oopsla2004.pdf), and the default behavior of most engineers at Google has been to write code in a way that is more suitable for the classical testing style.

在测试中更倾向于使用真实实现被称为[*经典测试*](https://oreil.ly/OWw7h)。还有一种测试风格被称为*模拟测试*，其中倾向于使用模拟框架而不是真实实现。尽管软件行业的一些人在进行模拟测试（包括[第一个模拟框架](https://oreil.ly/_QWy7)的创造者），但在谷歌，我们发现这种测试风格很难扩展。它要求工程师遵循[设计被测系统时的严格准则](http://jmock.org/oopsla2004.pdf)，而谷歌大多数工程师的默认行为是以一种更适合经典测试风格的方式来编写代码。

### Prefer Realism Over Isolation 优先考虑现实性而非孤立性

Using real implementations for dependencies makes the system under test more realistic given that all code in these real implementations will be executed in the test. In contrast, a test that utilizes test doubles isolates the system under test from its dependencies so that the test does not execute code in the dependencies of the system under test.

考虑到这些真实实现中的所有代码都将在测试中执行，使用真实实现进行依赖测试会使被测系统更加真实。相比之下，使用测试替代的测试会将被测系统与其依赖隔离开来，这样测试就不会在被测系统的依赖中执行代码。

We prefer realistic tests because they give more confidence that the system under test is working properly. If unit tests rely too much on test doubles, an engineer might need to run integration tests or manually verify that their feature is working as expected in order to gain this same level of confidence. Carrying out these extra tasks can slow down development and can even allow bugs to slip through if engineers skip these tasks entirely when they are too time consuming to carry out compared to running unit tests.

我们更喜欢真实测试，因为它们能让人对被测系统的正常工作更有信心。如果单元测试过于依赖测试替代，工程师可能需要运行集成测试或手动验证他们的功能是按预期工作的，以获得同样的信心水平。执行这些额外的任务会减慢开发速度，如果工程师完全跳过这些任务，那么与运行单元测试相比，执行这些任务太耗时，甚至会让bug溜走。

Replacing all dependencies of a class with test doubles arbitrarily isolates the system under test to the implementation that the author happens to put directly into the class and excludes implementation that happens to be in different classes. However, a good test should be independent of implementation—it should be written in terms of the API being tested rather than in terms of how the implementation is structured.

将一个类的所有依赖项替换为测试替代项可以任意地将被测系统与作者直接放入类中的实现隔离开来，并排除恰好位于不同类中的实现。然而，一个好的测试应该独立于实现，它应该根据API编写正在进行测试，而不是根据实现的结构进行测试。

Using real implementations can cause your test to fail if there is a bug in the real implementation. This is good! You *want* your tests to fail in such cases because it indicates that your code won’t work properly in production. Sometimes, a bug in a real implementation can cause a cascade of test failures because other tests that use the real implementation might fail, too. But with good developer tools, such as a Continuous Integration (CI) system, it is usually easy to track down the change that caused the failure.

如果真实实现中存在错误，使用真实的实现会导致你的测试失败。这是很好的。你希望你的测试在这种情况下失败，因为它表明你的代码在生产中不能正常工作。有时，真实实现中的一个错误会导致一连串的测试失败，因为其他使用真实实现的测试也可能失败。但是有了好的开发者工具，如持续集成（CI）系统，通常很容易追踪到导致失败的变化。

-----

#### Case Study: @DoNotMock 案例研究：@DoNotMock

At Google, we’ve seen enough tests that over-rely on mocking frameworks to motivate the creation of the @DoNotMock annotation in Java, which is available as part of the [ErrorProne](https://github.com/google/error-prone)static analysis tool. This annotation is a way for API owners to declare, “this type should not be mocked because better alternatives exist.”

在Google，我们已经看到了足够多的过度依赖模拟框架的测试，这促使我们在Java中创建了@DoNotMock注解，它可以作为[ErrorProne](https://github.com/google/error-prone)静态分析工具的一部分。这个注解是API所有者声明的一种方式，"这个类型不应该被模拟，因为存在更好的替代方案"。

If an engineer attempts to use a mocking framework to create an instance of a class or interface that has been annotated as @DoNotMock, as demonstrated in Example 13-10, they will see an error directing them to use a more suitable test strategy, such as a real implementation or a fake. This annotation is most commonly used for value objects that are simple enough to use as-is, as well as for APIs that have well-engineered fakes available.

如果工程师试图使用模拟框架来创建一个被注解为@DoNotMock的类或接口的实例，如例13-10所示，他们会看到一个错误，指示他们使用更合适的测试策略，如真实的实现或伪造。这个注解最常用于那些简单到可以按原样使用的值对象，以及那些有精心设计的伪造的API。

*Example* *13-10. The @DoNotMock annotation*

```java
@DoNotMock("Use SimpleQuery.create() instead of mocking.")
public abstract class Query {
  public abstract String getQueryValue();
}
```

Why would an API owner care? In short, it severely constrains the API owner’s ability to make changes to their implementation over time. As we’ll explore later in the chapter, every time a mocking framework is used for stubbing or interaction testing, it duplicates behavior provided by the API.

为什么API所有者会在意这个问题呢？简而言之，它严重限制了API所有者随时间对其实现进行更改的能力。正如我们在本章后面将探讨的那样，每次使用模拟框架进行存打桩或交互测试时，它都会复制API提供的行为。

When the API owner wants to change their API, they might find that it has been mocked thousands or even tens of thousands of times throughout Google’s codebase! These test doubles are very likely to exhibit behavior that violates the API contract of the type being mocked—for instance, returning null for a method that can never return null. Had the tests used the real implementation or a fake, the API owner could make changes to their implementation without first fixing thousands of flawed tests.

当API所有者想要改变他们的API时，他们可能会发现它已经在整个Google的代码库中被模拟了数千次甚至上万次！这些测试替代很可能表现出违反被模拟类型的API契约的行为——例如，为一个永远不能返回null的方法返回null。如果测试使用的是真正的实现或伪造，API所有者可以对他们的实现进行修改，而不需要先修复成千上万的有缺陷的测试。

-----

### How to Decide When to Use a Real Implementation 如何决定何时使用真实实现

A real implementation is preferred if it is fast, deterministic, and has simple dependencies. For example, a real implementation should be used for a [*value object*](https://oreil.ly/UZiXP). Examples include an amount of money, a date, a geographical address, or a collection class such as a list or a map.

如果真实实现速度快、确定性强且依赖性简单，则首选真实实现。例如，一个真实实现应该被用于[*值对象*](https://oreil.ly/UZiXP)。例子包括一笔钱、一个日期、一个地理位置，或者一个集合类，如列表或地图。

However, for more complex code, using a real implementation often isn’t feasible. There might not be an exact answer on when to use a real implementation or a test double given that there are trade-offs to be made, so you need to take the following considerations into account.

然而，对于更复杂的代码，使用真实实现通常是不可行的。考虑到需要进行权衡，可能没有关于何时使用真实实现或测试替代的确切答案，因此需要考虑以下因素。

#### Execution time 执行时间

One of the most important qualities of unit tests is that they should be fast—you want to be able to continually run them during development so that you can get quick feedback on whether your code is working (and you also want them to finish quickly when run in a CI system). As a result, a test double can be very useful when the real implementation is slow.

单元测试的最重要特性之一是速度——你希望能够在开发过程中持续运行它们，以便能够快速获得代码是否正常工作的反馈（你还希望它们在CI系统中运行时能够快速完成）因此，当实际实现缓慢时，测试替代可能非常有用。

How slow is too slow for a unit test? If a real implementation added one millisecond to the running time of each individual test case, few people would classify it as slow. But what if it added 10 milliseconds, 100 milliseconds, 1 second, and so on?

对于一个单元测试来说，多慢才算慢？如果一个真正实现在每个单独的测试用例的运行时间上增加一毫秒，很少有人会将其归类为慢。但如果它增加了10毫秒，100毫秒，1秒等等呢？

There is no exact answer here—it can depend on whether engineers feel a loss in productivity, and how many tests are using the real implementation (one second extra per test case may be reasonable if there are five test cases, but not if there are 500). For borderline situations, it is often simpler to use a real implementation until it becomes too slow to use, at which point the tests can be updated to use a test double instead.

这里没有确切的答案——它可能取决于工程师是否感到生产率下降，以及有多少测试正在使用实际实现（如果有5个测试用例，每个测试用例多一秒钟可能是合理的，但如果有500个测试用例就不一样了）。对于临界情况，通常更容易使用实际实现，直到它变得太慢而无法使用，此时可以更新测试以使用测试替代。

Parellelization of tests can also help reduce execution time. At Google, our test infrastructure makes it trivial to split up tests in a test suite to be executed across multiple servers. This increases the cost of CPU time, but it can provide a large savings in developer time. We discuss this more in [Chapter 18](#_bookmark1596).

测试的并行化也有助于减少执行时间。在谷歌，我们的测试基础设施使得将测试套件中的测试拆分到多个服务器上执行变得非常简单。这增加了CPU的成本，但它可以为开发人员节省大量时间。我们在第18章中对此有更多的讨论。

Another trade-off to be aware of: using a real implementation can result in increased build times given that the tests need to build the real implementation as well as all of its dependencies. Using a highly scalable build system like [Bazel ](https://bazel.build/)can help because it caches unchanged build artifacts.

另一个需要注意的权衡：使用一个真实实现会导致构建时间的增加，因为测试需要构建真实实现以及它的所有依赖。使用像[Bazel](https://bazel.build/)这样的高度可扩展的构建系统会有帮助，因为它缓存了未改变的构建构件。

#### Determinism 确定性

A test is [*deterministic*](https://oreil.ly/brxJl)if, for a given version of the system under test, running the test always results in the same outcome; that is, the test either always passes or always fails. In contrast, a test is [*nondeterministic*](https://oreil.ly/5pG0f)if its outcome can change, even if the system under test remains unchanged.

如果对于被测系统的给定版本，运行测试的结果总是相同的，也就是说，测试要么总是通过，要么总是失败，那么这个测试就具有[*确定性*](https://oreil.ly/brxJl)。相反，如果一个测试的结果可以改变，即使被测系统保持不变，那么它就是[*非确定性*](https://oreil.ly/5pG0f)。

[Nondeterminism in tests ](https://oreil.ly/71OFU)can lead to flakiness—tests can occasionally fail even when there are no changes to the system under test. As discussed in Chapter 11, flakiness harms the health of a test suite if developers start to distrust the results of the test and ignore failures. If use of a real implementation rarely causes flakiness, it might not warrant a response, because there is little disruption to engineers. But if flakiness hap‐pens often, it might be time to replace a real implementation with a test double because doing so will improve the fidelity of the test.

[测试中的非确定性](https://oreil.ly/71OFU)会导致松散性——即使被测系统没有变化，测试也会偶尔失败。正如在第11章中所讨论的，如果开发人员开始不相信测试的结果并忽视失败，那么松散性会损害测试套件的健康。如果使用一个真正实现很少引起松散性，它可能不需要响应失败，因为对工程师的干扰很小。但是，如果经常发生故障，可能是时候用一个测试替代真实实现了，因为这样做会提高测试的仿真度。

A real implementation can be much more complex compared to a test double, which increases the likelihood that it will be nondeterministic. For example, a real implementation that utilizes multithreading might occasionally cause a test to fail if the output of the system under test differs depending on the order in which the threads are executed.

与测试替代相比，真正实现可能要复杂得多，这增加了它不确定性的概率。例如，如果被测系统的输出因线程的执行顺序不同而不同，利用多线程的真实实现可能偶尔会导致测试失败。

A common cause of nondeterminism is code that is not [hermetic](https://oreil.ly/aes__); that is, it has dependencies on external services that are outside the control of a test. For example, a test that tries to read the contents of a web page from an HTTP server might fail if the server is overloaded or if the web page contents change. Instead, a test double should be used to prevent the test from depending on an external server. If using a test double is not feasible, another option is to use a hermetic instance of a server, which has its life cycle controlled by the test. Hermetic instances are discussed in more detail in the next chapter.

不确定性的一个常见原因是代码不够封闭；也就是说，它依赖于测试无法控制的外部服务。例如，如果服务器过载或网页内容更改，尝试从HTTP服务器读取网页内容的测试可能会失败。相反，应该使用测试替代来防止测试依赖于外部服务器。如果使用测试工具不可行，另一种选择是使用服务器的封闭实例，其生命周期由测试控制。下一章将更详细地讨论封闭实例。

Another example of nondeterminism is code that relies on the system clock given that the output of the system under test can differ depending on the current time. Instead of relying on the system clock, a test can use a test double that hardcodes a specific time.

不确定性的另一个例子是依赖于系统时钟的代码，因为被测系统的输出可能因当前时间而异。测试可以使用硬编码特定时间的测试替代，而不是依赖于系统时钟。

#### Dependency construction 依赖关系的构建

When using a real implementation, you need to construct all of its dependencies. For example, an object needs its entire dependency tree to be constructed: all objects that it depends on, all objects that these dependent objects depend on, and so on. A test double often has no dependencies, so constructing a test double can be much simpler compared to constructing a real implementation.

当使用真实实现时，你需要构造它的所有依赖项。例如，一个对象需要构造其整个依赖关系树：它所依赖的所有对象，这些依赖对象所依赖的所有对象，等等。测试替代通常没有依赖项，因此与构建实际实现相比，构建测试替代要简单得多。

As an extreme example, imagine trying to create the object in the code snippet that follows in a test. It would be time consuming to determine how to construct each individual object. Tests will also require constant maintenance because they need to be updated when the signature of these objects’ constructors is modified:

作为一个极端的例子，想象一下尝试在测试中后面的代码段中创建对象。确定如何构造每个单独的对象将非常耗时。测试还需要持续维护，因为当这些对象的构造函数的签名被修改时，测试需要更新：

```java
Foo foo = new Foo(new A(new B(new C()), new D()), new E(), ..., new Z());
```

It can be tempting to instead use a test double because constructing one can be trivial. For example, this is all it takes to construct a test double when using the Mockito mocking framework:

使用测试替代是很有诱惑力的，因为构建一个测试替代是很简单的。例如，在使用模拟框架时，这就是构建一个测试替代的全部内容：

```java
@Mock 
Foo mockFoo;
```

Although creating this test double is much simpler, there are significant benefits to using the real implementation, as discussed earlier in this section. There are also often significant downsides to overusing test doubles in this way, which we look at later in this chapter. So, a trade-off needs to be made when considering whether to use a real implementation or a test double.

尽管创建这个测试替代要简单得多，但使用真正实现有很大的好处，正如本节前面所讨论的。以这种方式过度使用测试替代往往也有很大的弊端，我们在本章后面会看一下。所以，在考虑是使用真实实现还是测试替身时，需要做一个权衡。

Rather than manually constructing the object in tests, the ideal solution is to use the same object construction code that is used in the production code, such as a factory method or automated dependency injection. To support the use case for tests, the object construction code needs to be flexible enough to be able to use test doubles rather than hardcoding the implementations that will be used for production.

与其在测试中手动构建对象，理想的解决方案是使用生产代码中使用的相同的对象构建代码，如工厂方法或自动依赖注入。为了支持测试的使用情况，对象构造代码需要有足够的灵活性，能够使用测试替代，而不是硬编码将用于生产的实现。

## Faking 伪造测试

If using a real implementation is not feasible within a test, the best option is often to use a fake in its place. A fake is preferred over other test double techniques because it behaves similarly to the real implementation: the system under test shouldn’t even be able to tell whether it is interacting with a real implementation or a fake. Example 13-11illustrates a fake file system. 

如果在测试中使用真实实现是不可行的，那么最好的选择通常是使用伪造实现。与其他测试替代技术相比，伪造测试技术更受欢迎，因为它的行为类似于真实实现：被测试的系统甚至不能判断它是与真实实现交互还是与伪造实现交互。示例13-11演示了一个伪造文件系统。

*Example* *13-11.* *A* *fake* *file* *system*

```java
// This fake implements the FileSystem interface. This interface is also
// used by the real implementation.
public class FakeFileSystem implements FileSystem {
    // Stores a map of file name to file contents. The files are stored in
    // memory instead of on disk since tests shouldn’t need to do disk I/O.
    private Map < String, String > files = new HashMap< > ();
    
    @Override
    public void writeFile(String fileName, String contents) {
        // Add the file name and contents to the map.
        files.add(fileName, contents);
    }
  
    @Override
    public String readFile(String fileName) {
        String contents = files.get(fileName);
        // The real implementation will throw this exception if the
        // file isn’t found, so the fake must throw it too.
        if(contents == null) {
            throw new FileNotFoundException(fileName);
        }
        return contents;
    }
}
```

### Why Are Fakes Important? 为什么伪造测试很重要？

Fakes can be a powerful tool for testing: they execute quickly and allow you to effectively test your code without the drawbacks of using real implementations.

伪造测试是一个强大的测试工具：它们可以快速执行，并允许你有效地测试代码，而没有使用真实实现的缺点。

A single fake has the power to radically improve the testing experience of an API. If you scale that to a large number of fakes for all sorts of APIs, fakes can provide an enormous boost to engineering velocity across a software organization.

一个伪造的API就可以从根本上改善API的测试体验。如果将其扩展到各种API的大量伪造，伪造可以极大地提高整个软件组织的工程速度。

At the other end of the spectrum, in a software organization where fakes are rare, velocity will be slower because engineers can end up struggling with using real implementations that lead to slow and flaky tests. Or engineers might resort to other test double techniques such as stubbing or interaction testing, which, as we’ll examine later in this chapter, can result in tests that are unclear, brittle, and less effective.

另一方面，在一个使用伪造测试很少的软件组织中，速度会慢一些，因为工程师最终会在使用真正实现时遇到困难，从而导致测试缓慢和不稳定。或者工程师可能会求助于其他测试替代技术，如打桩或交互测试，正如我们将在本章后面讨论的那样，这些技术可能会导致测试不清晰、脆弱且效率较低。

### When Should Fakes Be Written? 什么时候应该写伪造测试？

A fake requires more effort and more domain experience to create because it needs to behave similarly to the real implementation. A fake also requires maintenance: whenever the behavior of the real implementation changes, the fake must also be updated to match this behavior. Because of this, the team that owns the real implementation should write and maintain a fake.

伪造测试需要更多的努力和更多的领域经验来创建，因为它需要与真实实现类似的行为。伪造实现代码还需要维护：当真实实现的行为发生更改时，伪造实现代码也必须更新以匹配此行为。因此，拥有真实实现的团队应该编写并维护一个伪造实现代码。

If a team is considering writing a fake, a trade-off needs to be made on whether the productivity improvements that will result from the use of the fake outweigh the costs of writing and maintaining it. If there are only a handful of users, it might not be worth their time, whereas if there are hundreds of users, it can result in an obvious productivity improvement.

如果一个团队正在考虑编写一个伪造测试，就需要权衡使用伪造测试所带来的生产力的提高是否超过了编写和维护的成本。如果只有少数几个用户，可能不值得他们花费时间，而如果有几百个用户，这可以显著提高生产率。

To reduce the number of fakes that need to be maintained, a fake should typically be created only at the root of the code that isn’t feasible for use in tests. For example, if a database can’t be used in tests, a fake should exist for the database API itself rather than for each class that calls the database API.

为了减少需要维护的伪造测试代码的数量，伪造测试代码通常应该只在测试中不可行的代码根处创建。例如，如果一个数据库不能在测试中使用，那么应该为数据库API本身编写一个伪造测试，而不是为调用数据库API的每个类编写。

Maintaining a fake can be burdensome if its implementation needs to be duplicated across programming languages, such as for a service that has client libraries that allow the service to be invoked from different languages. One solution for this case is to create a single fake service implementation and have tests configure the client libraries to send requests to this fake service. This approach is more heavyweight compared to having the fake written entirely in memory because it requires the test to communicate across processes. However, it can be a reasonable trade-off to make, as long as the tests can still execute quickly.

如果需要跨编程语言复制伪造实现代码的实现，例如对于具有允许从不同语言调用服务的客户端库的服务，则维护伪造实现代码可能会很麻烦。这种情况下的一个解决方案是创建一个伪造服务实现，并让测试配置客户端库以向该伪造服务发送请求。与将伪造实现代码完全写入内存相比，这种方法更为重要，因为它需要测试跨进程进行通信。但是，只要测试仍然可以快速执行，那么这是一个合理的权衡。

### The Fidelity of Fakes 伪造测试的仿真度

Perhaps the most important concept surrounding the creation of fakes is *fidelity*; in other words, how closely the behavior of a fake matches the behavior of the real implementation. If the behavior of a fake doesn’t match the behavior of the real implementation, a test using that fake is not useful—a test might pass when the fake is used, but this same code path might not work properly in the real implementation.

也许围绕着创建伪造测试的最重要的概念是*仿真度*；换句话说，伪造测试的行为与真实实现的行为的匹配程度。如果伪造测试的行为与真实实现的行为不匹配，那么使用该伪造测试就没有用处——当使用该伪造测试时，测试可能会通过，但同样的代码路径在真实实现中可能无法正常工作。

Perfect fidelity is not always feasible. After all, the fake was necessary because the real implementation wasn’t suitable in one way or another. For example, a fake database would usually not have fidelity to a real database in terms of hard drive storage because the fake would store everything in memory.

完美的仿真并不总是可行的。毕竟，伪造是必要的，因为真实实现在某种程度上并不适合。例如，在硬盘存储方面，一个伪造数据库通常不会与真正的数据库一样，因为伪造数据库会把所有东西都存储在内存中。

Primarily, however, a fake should maintain fidelity to the API contracts of the real implementation. For any given input to an API, a fake should return the same output and perform the same state changes of its corresponding real implementation. For example, for a real implementation of database.save(itemId), if an item is successfully saved when its ID does not yet exist but an error is produced when the ID already exists, the fake must conform to this same behavior.

然而，主要的是，伪造测试应该保持对真实实现的API契约的完整性。对于API的任何给定的输入，伪造测试应该返回相同的输出，并对其相应的实际实现执行相同的状态更改。例如，对于数据库.save(itemId)的真实实现，如果一个项目在其ID不存在的情况下被成功保存，但在ID已经存在的情况下会产生一个错误，伪造数据库必须符合这个相同的行为。

One way to think about this is that the fake must have perfect fidelity to the real implementation, but *only from the perspective of the test*. For example, a fake for a hashing API doesn’t need to guarantee that the hash value for a given input is exactly the same as the hash value that is generated by the real implementation—tests likely don’t care about the specific hash value, only that the hash value is unique for a given input. If the contract of the hashing API doesn’t make guarantees of what specific hash values will be returned, the fake is still conforming to the contract even if it doesn’t have perfect fidelity to the real implementation.

一种思考方式是，伪造测试必须对真正的实现有完美的仿真度，但只能从测试的角度来看。例如，一个伪造hash API不需要保证给定输入的hash值与真实实现产生的hash值完全相同——测试可能不关心具体的hash值，只关心给定输入的hash值是唯一的。如果hash API的契约没有保证将返回哪些特定的hash值，那么伪造函数仍然符合契约，即使它与真实实现没有完美的仿真度。

Other examples where perfect fidelity typically might not be useful for fakes include latency and resource consumption. However, a fake cannot be used if you need to explicitly test for these constraints (e.g., a performance test that verifies the latency of a function call), so you would need to resort to other mechanisms, such as by using a real implementation instead of a fake.

完美的仿真度通常不适用于伪造的其他示例包括延迟和资源消耗。但是，如果你需要显式测试这些约束（例如，验证函数调用延迟的性能测试），则不能使用伪造函数，因此你需要求助于其他机制，例如使用真实实现而不是伪造函数。

A fake might not need to have 100% of the functionality of its corresponding real implementation, especially if such behavior is not needed by most tests (e.g., error handling code for rare edge cases). It is best to have the fake fail fast in this case; for example, raise an error if an unsupported code path is executed. This failure communicates to the engineer that the fake is not appropriate in this situation.

伪造实现代码可能不需要拥有其对应的真实实现的100%功能，尤其是在大多数测试不需要这种行为的情况下（例如，罕见边缘情况下的错误处理代码）。在这种情况下，最好让伪造测试快速失效；例如，如果执行了不受支持的代码路径，则引发错误。该故障告知工程师，在这种情况下，伪造测试是不合适的。

### Fakes Should Be Tested  伪造测试应当被测试

A fake must have its *own* tests to ensure that it conforms to the API of its corresponding real implementation. A fake without tests might initially provide realistic behavior, but without tests, this behavior can diverge over time as the real implementation evolves.

伪造测试必须有自己的*测试*，以确保它符合其相应的真实实现的API。没有测试的伪造最初可能会提供真实的行为，但如果没有测试，随着时间的推移，这种行为会随着真实实现的发展而发生变化。

One approach to writing tests for fakes involves writing tests against the API’s public interface and running those tests against both the real implementation and the fake (these are known as [*contract tests*](https://oreil.ly/yuVlX)). The tests that run against the real implementation will likely be slower, but their downside is minimized because they need to be run only by the owners of the fake.

为伪造测试编写测试的一种方法是针对API的公共接口编写测试，并针对真实实现和伪造测试运行这些测试（这些被称为[*合同测试*](https://oreil.ly/yuVlX)）。针对真实实现运行的测试可能会更慢，但它们的缺点会被最小化，因为它们只需要由伪造实现代码的所有者运行。

### What to Do If a Fake Is Not Available 如果没有伪造测试怎么办？

If a fake is not available, first ask the owners of the API to create one. The owners might not be familiar with the concept of fakes, or they might not realize the benefit they provide to users of an API.

如果没有伪造测试，首先要求API的所有者创建一个。所有者可能不熟悉伪造测试的概念，或者他们可能没有意识到伪造测试对API用户的好处。

If the owners of an API are unwilling or unable to create a fake, you might be able to write your own. One way to do this is to wrap all calls to the API in a single class and then create a fake version of the class that doesn’t talk to the API. Doing this can also be much simpler than creating a fake for the entire API because often you’ll need to use only a subset of the API’s behavior anyway. At Google, some teams have even contributed their fake to the owners of the API, which has allowed other teams to benefit from the fake.

如果一个API的所有者不愿意或无法创建一个伪造测试，你可以写一个。实现这一点的一种方法是将对API的所有调用封装在一个类中，然后创建一个不与API对话的类的伪造测试版本。这样做也比为整个API创建一个伪造测试API简单得多，因为通常你只需要使用API行为的一个子集。在谷歌，一些团队甚至将他们的伪造测试贡献给API的所有者，这使得其他团队可以从伪造测试中获益。

Finally, you could decide to settle on using a real implementation (and deal with the trade-offs of real implementations that are mentioned earlier in this chapter), or resort to other test double techniques (and deal with the trade-offs that we will mention later in this chapter).

最后，你可以决定选择使用真实实现（并处理本章前面提到的真实实现的权衡问题），或者求助于其他测试替代技术（并处理本章后面提到的权衡问题）。

In some cases, you can think of a fake as an optimization: if tests are too slow using a real implementation, you can create a fake to make them run faster. But if the speedup from a fake doesn’t outweigh the work it would take to create and maintain the fake, it would be better to stick with using the real implementation.

在某些情况下，可以将伪造实现代码视为优化：如果使用真实实现的测试太慢，可以创建伪代码以使它们运行得更快。但是，如果伪造实现代码的加速比不超过创建和维护伪造实现代码所需的工作量，那么最好还是坚持使用真实实现。

## Stubbing 打桩

As discussed earlier in this chapter, stubbing is a way for a test to hardcode behavior for a function that otherwise has no behavior on its own. It is often a quick and easy way to replace a real implementation in a test. For example, the code in [Example 13-12 ](#_bookmark1144)uses stubbing to simulate the response from a credit card server.

正如本章前面所讨论的，打桩是一种测试函数硬编码行为的方法，否则函数本身就没有行为。它通常是一种快速而简单的方法来替代测试中的真实实现。例如，例13-12中的代码使用打桩来模拟信用卡服务器的响应。

*Example* *13-12.* *Using* *stubbing* *to* *simulate* *responses*

```java
@Test public void getTransactionCount() {
transactionCounter = new TransactionCounter(mockCreditCardServer);
// Use stubbing to return three transactions.
when(mockCreditCardServer.getTransactions()).thenReturn( newList(TRANSACTION_1, TRANSACTION_2, TRANSACTION_3));
assertThat(transactionCounter.getTransactionCount()).isEqualTo(3);
}
```

### The Dangers of Overusing Stubbing  过度使用打桩的危害

Because stubbing is so easy to apply in tests, it can be tempting to use this technique anytime it’s not trivial to use a real implementation. However, overuse of stubbing can result in major losses in productivity for engineers who need to maintain these tests.

因为打桩在测试中很容易应用，所以在使用真实实现不容易的情况下，使用这种技术是很诱惑力的。然而，过度使用打桩会导致需要维护这些测试的工程师的生产力的重大损失。

#### Tests become unclear 测试变得不清晰

Stubbing involves writing extra code to define the behavior of the functions being stubbed. Having this extra code detracts from the intent of the test, and this code can be difficult to understand if you’re not familiar with the implementation of the system under test.

打桩涉及编写额外的代码来定义被打桩的函数的行为。额外的代码会影响测试的意图，如果你不熟悉被测系统的实现，这些代码会很难理解。

A key sign that stubbing isn’t appropriate for a test is if you find yourself mentally stepping through the system under test in order to understand why certain functions in the test are stubbed.

打桩不适用于测试的一个关键标志是，如果你发现自己为了理解为什么测试中的某些功能是打桩的，而在思路已经跃出了被测系统。

#### Tests become brittle 测试变得脆弱

Stubbing leaks implementation details of your code into your test. When implementation details in your production code change, you’ll need to update your tests to reflect these changes. Ideally, a good test should need to change only if user-facing behavior of an API changes; it should remain unaffected by changes to the API’s implementation.

打桩测试将你的代码的实现细节泄露给你的测试。当生产代码中的实现细节改变时，你需要更新你的测试以反映这些变化。理想情况下，一个好的测试应该只在API面向用户的行为发生变化时才需要改变；它应该不受API实现变化的影响。

#### Tests become less effective 测试有效性降低

With stubbing, there is no way to ensure the function being stubbed behaves like the real implementation, such as in a statement like that shown in the following snippet that hardcodes part of the contract of the add() method (*“If 1 and 2 are passed in, 3* *will be returned”*):

在打桩的情况下，没有办法确保被打桩的函数表现得像真实实现，比如像下面这个片段中的语句，硬编码了add()方法的部分契约（*"如果传入1和2，3将被返回 "*）。

```java
when(stubCalculator.add(1, 2)).thenReturn(3);
```

Stubbing is a poor choice if the system under test depends on the real implementation’s contract because you will be forced to duplicate the details of the contract, and there is no way to guarantee that the contract is correct (i.e., that the stubbed function has fidelity to the real implementation).

如果被测试的系统依赖于真实实现的契约，打桩测试是一个糟糕的选择，因为你将被迫复制契约的细节，而且没有办法保证契约的正确性（即，打桩函数对真实实现的仿真度）。

Additionally, with stubbing there is no way to store state, which can make it difficult to test certain aspects of your code. For example, if you call database.save(item) on either a real implementation or a fake, you might be able to retrieve the item by calling database.get(item.id()) given that both of these calls are accessing internal state, but with stubbing, there is no way to do this.

此外，使用打桩测试无法存储状态，这会使测试代码的某些方面变得困难。例如，如果你在一个真实实现或位置实现上调用database.save(item)，你可能会通过调用database.get(item.id())来检索项目，因为这两个调用都是在访问内部状态，但在打桩测试中，没有办法这样做。

An example of overusing stubbing.

一个过度使用打桩测试的例子。

Example 13-13 illustrates a test that overuses stubbing.

例13-13说明了一个过度使用打桩的测试。

*Example* *13-13.* *Overuse* *of* *stubbing*

```java
@Test
public void creditCardIsCharged() {
    // Pass in test doubles that were created by a mocking framework.
    paymentProcessor = new PaymentProcessor(mockCreditCardServer, mockTransactionProcessor);
    // Set up stubbing for these test doubles. 
    when(mockCreditCardServer.isServerAvailable()).thenReturn(true);
    when(mockTransactionProcessor.beginTransaction()).thenReturn(transaction);
    when(mockCreditCardServer.initTransaction(transaction)).thenReturn(true);
    when(mockCreditCardServer.pay(transaction, creditCard, 500)).thenReturn(false);
    when(mockTransactionProcessor.endTransaction()).thenReturn(true);
    // Call the system under test.
    paymentProcessor.processPayment(creditCard, Money.dollars(500));
    // There is no way to tell if the pay() method actually carried out the
    // transaction, so the only thing the test can do is verify that the
    // pay() method was called.
    verify(mockCreditCardServer).pay(transaction, creditCard, 500);
}
```

Example 13-14 rewrites the same test but avoids using stubbing. Notice how the test is shorter and that implementation details (such as how the transaction processor is used) are not exposed in the test. No special setup is needed because the credit card server knows how to behave.

例13-14重写了同样的测试，但避免了使用打桩测试方式。注意这个测试是如何精简的，并且在测试中没有暴露实现细节（比如如何使用交易处理器）。不需要特别的设置，因为信用卡服务器知道如何操作。

*Example* *13-14.* *Refactoring* *a* *test* *to* *avoid* *stubbing*

```java
@Test
public void creditCardIsCharged() {
    paymentProcessor = new PaymentProcessor(creditCardServer, transactionProcessor);
    // Call the system under test.
    paymentProcessor.processPayment(creditCard, Money.dollars(500));
    // Query the credit card server state to see if the payment went through.
    assertThat(creditCardServer.getMostRecentCharge(creditCard)).isEqualTo(500);
}
```

We obviously don’t want such a test to talk to an external credit card server, so a fake credit card server would be more suitable. If a fake isn’t available, another option is to use a real implementation that talks to a hermetic credit card server, although this will increase the execution time of the tests. (We explore hermetic servers in the next chapter.)

显然，我们不希望这样的测试与外部信用卡服务器交互，因此更适合使用假信用卡服务器。如果一个伪造不可用，另一个选择是使用一个真实实现，与一个封闭的信用卡服务器交互，尽管这会增加测试的执行时间。（我们将在下一章中探讨封闭服务器。）

### When Is Stubbing Appropriate? 什么情况下才适合使用打桩测试？

Rather than a catch-all replacement for a real implementation, stubbing is appropriate when you need a function to return a specific value to get the system under test into a certain state, such as Example 13-12 that requires the system under test to return a non-empty list of transactions. Because a function’s behavior is defined inline in the test, stubbing can simulate a wide variety of return values or errors that might not be possible to trigger from a real implementation or a fake.

当你需要一个函数返回一个特定的值以使被测系统进入某种状态时，打桩方式就很合适，而不是真实实现的万能替代品，例如例13-12要求被测系统返回一个非空的事务列表。因为一个函数的行为是在测试中内联定义的，所以打桩可以模拟各种各样的返回值或错误，而这些返回值或错误可能无法从真实实现或伪造测试中触发。

To ensure its purpose is clear, each stubbed function should have a direct relationship with the test’s assertions. As a result, a test typically should stub out a small number of functions because stubbing out many functions can lead to tests that are less clear. A test that requires many functions to be stubbed can be a sign that stubbing is being overused, or that the system under test is too complex and should be refactored.

为了确保其目的明确，每个打桩函数应该与测试的断言直接相关。因此，一个测试通常应该打桩少量的函数，因为打桩太多会导致函数不够清晰。一个需要打桩许多函数的测试是一个迹象，表明打桩被过度使用，或者被测系统过于复杂，应该被重构。

Note that even when stubbing is appropriate, real implementations or fakes are still preferred because they don’t expose implementation details and they give you more guarantees about the correctness of the code compared to stubbing. But stubbing can be a reasonable technique to use, as long as its usage is constrained so that tests don’t become overly complex.

请注意，即使打桩测试是合适的，真实实现或伪造测试仍然是首选，因为它们不会暴露实现的细节，与打桩测试相比，它们能给你更多关于代码的正确性的保证。但打桩可以是一种合理的技术，只要它的使用受到限制，使测试不会变得过于复杂。

## Interaction Testing  交互测试

As discussed earlier in this chapter, interaction testing is a way to validate how a function is called without actually calling the implementation of the function.

正如本章前面所讨论的，交互测试是一种验证函数如何被调用的方法，而不需要实际调用该函数的实现。

Mocking frameworks make it easy to perform interaction testing. However, to keep tests useful, readable, and resilient to change, it’s important to perform interaction testing only when necessary.

模拟框架使执行交互测试变得容易。然而，为了保持测试的有用性、可读性和应变能力，只在必要时执行交互测试是很重要的。

### Prefer State Testing Over Interaction Testing 推荐状态测试而非交互测试

In contrast to interaction testing, it is preferred to test code through [*state* *testing*](https://oreil.ly/k3hSR).

与交互测试相比，最好是通过[*状态测试*](https://oreil.ly/k3hSR)来测试代码。

With state testing, you call the system under test and validate that either the correct value was returned or that some other state in the system under test was properly changed. Example 13-15 presents an example of state testing.

通过状态测试，你可以调用被测系统，并验证返回的值是否正确，或者被测系统中的其他状态是否已正确更改。示例13-15给出了一个状态测试示例。

*Example 13-15. State testing*

 ```java
 @Test
 public void sortNumbers() {
     NumberSorter numberSorter = new NumberSorter(quicksort, bubbleSort);
     // Call the system under test.
     List sortedList = numberSorter.sortNumbers(newList(3, 1, 2));
     // Validate that the returned list is sorted. It doesn’t matter which
     // sorting algorithm is used, as long as the right result was returned.
     assertThat(sortedList).isEqualTo(newList(1, 2, 3));
 }
 ```

Example 13-16 illustrates a similar test scenario but instead uses interaction testing. Note how it’s impossible for this test to determine that the numbers are actually sorted, because the test doubles don’t know how to sort the numbers—all it can tell you is that the system under test tried to sort the numbers.

 示例13-16说明了一个类似的测试场景，但使用了交互测试。请注意，此测试无法确定数字是否实际已排序，因为测试替代不知道如何对数字进行排序——它所能告诉你的是，被测试系统尝试对数字进行排序。

*Example* *13-16.* *Interaction* *testing*

```java
@Test 
public void sortNumbers_quicksortIsUsed() {
    // Pass in test doubles that were created by a mocking framework.
    NumberSorter numberSorter = new NumberSorter(mockQuicksort, mockBubbleSort);
    // Call the system under test.
    numberSorter.sortNumbers(newList(3, 1, 2));
    // Validate that numberSorter.sortNumbers() used quicksort. The test
    // will fail if mockQuicksort.sort() is never called (e.g., if
    // mockBubbleSort is used) or if it’s called with the wrong arguments.
    verify(mockQuicksort).sort(newList(3, 1, 2));
}
```

At Google, we’ve found that emphasizing state testing is more scalable; it reduces test brittleness, making it easier to change and maintain code over time.

在谷歌，我们发现强调状态测试更具可扩展性；它降低了测试的脆弱性，使得随着时间的推移更容易变更和维护代码。

The primary issue with interaction testing is that it can’t tell you that the system under test is working properly; it can only validate that certain functions are called as expected. It requires you to make an assumption about the behavior of the code; for example, “*If* *database.save(item) is called, we assume the item will be saved to the database.*” State testing is preferred because it actually validates this assumption (such as by saving an item to a database and then querying the database to validate that the item exists).

交互测试的主要问题是它不能告诉你被测试的系统是否正常工作；它只能验证是否按预期调用了某些函数。它要求你对代码的行为做出假设；例如，首选“如果”状态测试，因为它实际上验证了该假设（例如，将项目保存到数据库，然后查询数据库以验证该项目是否存在）。如果调用了*database.save(item)*，则假定该项将保存到数据库中。

Another downside of interaction testing is that it utilizes implementation details of the system under test—to validate that a function was called, you are exposing to the test that the system under test calls this function. Similar to stubbing, this extra code makes tests brittle because it leaks implementation details of your production code into tests. Some people at Google jokingly refer to tests that overuse interaction testing as [*change-detector* *tests* ](https://oreil.ly/zkMDu)because they fail in response to any change to the production code, even if the behavior of the system under test remains unchanged.

交互测试的另一个缺点是，它利用被测系统的实现细节——验证某个函数是否被调用，你使测试依赖于被测系统调用该函数的具体实现。与打桩类似，这个额外的代码使测试变得脆弱，因为它将生产代码的实现细节泄漏到测试中。谷歌的一些人开玩笑地把过度使用交互测试的测试称为[*变更检测器测试*](https://oreil.ly/zkMDu)，因为它们对生产代码的任何改变都会失败，即使被测系统的行为保持不变。

### When Is Interaction Testing Appropriate? 什么时候适合进行交互测试？

There are some cases for which interaction testing is warranted:

- You cannot perform state testing because you are unable to use a real implementation or a fake (e.g., if the real implementation is too slow and no fake exists). As a fallback, you can perform interaction testing to validate that certain functions are called. Although not ideal, this does provide some basic level of confidence that the system under test is working as expected.
- Differences in the number or order of calls to a function would cause undesired behavior. Interaction testing is useful because it could be difficult to validate this behavior with state testing. For example, if you expect a caching feature to reduce the number of calls to a database, you can verify that the database object is not accessed more times than expected. Using Mockito, the code might look similar to this:

在某些情况下，交互测试是有必要的：

- 你不能进行状态测试，因为你无法使用真实实现或伪造实现（例如，如果真实实现太慢，而且没有伪造测试存在）。作为备用方案，你可以进行交互测试以验证某些函数被调用。虽然不是很理想，但这确实提供了一些基本的功能，即被测系统正在按照预期工作。
- 对一个函数的调用数量或顺序的不同会导致不在预期内的行为。交互测试是有用的，因为用状态测试可能很难验证这种行为。例如，如果你期望一个缓存功能能减少对数据库的调用次数，你可以验证数据库对象的访问次数没有超过预期。使用Mockito，代码可能看起来类似于这样：

```java
verify(databaseReader, atMostOnce()).selectRecords();
```

Interaction testing is not a complete replacement for state testing. If you are not able to perform state testing in a unit test, strongly consider supplementing your test suite with larger-scoped tests that do perform state testing. For instance, if you have a unit test that validates usage of a database through interaction testing, consider adding an integration test that can perform state testing against a real database. Larger-scope testing is an important strategy for risk mitigation, and we discuss it in the next chapter.

交互测试不能完全替代状态测试。如果无法在单元测试中执行状态测试，请强烈考虑用更大范围的执行状态测试的范围测试来补充测试套件。例如，如果你有一个单元测试，通过交互测试来验证数据库的使用，考虑添加一个集成测试，可以对真实数据库进行状态测试。更大范围的测试是减轻风险的重要策略，我们将在下一章中讨论它。

#### Best Practices for Interaction Testing 交互测试的最佳实践

When performing interaction testing, following these practices can reduce some of the impact of the aforementioned downsides.

在进行交互测试时，遵循这些最佳实践可以减轻交互测试的负面影响。

#### Prefer to perform interaction testing only for state-changing functions  优先对改变状态的函数进行交互测试

When a system under test calls a function on a dependency, that call falls into one of two categories:
- *State-changing*
    Functions that have side effects on the world outside the system under test. Examples: 

```java
sendEmail(), saveRecord(), logAccess().
```

- *Non-state-changing*
Functions that don’t have side effects; they return information about the world outside the system under test and don’t modify anything. Examples: 
```java
getUser(), findResults(), readFile().
```

当被测系统调用一个依赖关系上的函数时，该调用属于两类中的一类：

*改变状态*
	对被测系统以外的范围有副作用的函数。例子：

```java
sendEmail(), saveRecord(), logAccess().
```

- *不改变状态*
没有副作用的函数；它们返回关于被测系统以外的范围的信息，但不进行任何修改。例如：

```java
getUser(), findResults(), readFile()。
```

In general, you should perform interaction testing only for functions that are state- changing. Performing interaction testing for non-state-changing functions is usually redundant given that the system under test will use the return value of the function to do other work that you can assert. The interaction itself is not an important detail for correctness, because it has no side effects.

一般来说，你应该只对状态变化的函数进行交互测试。考虑到被测系统将使用函数的返回值来执行你可以断言的其他工作，对非状态变化函数执行交互测试通常是多余的。交互本身对于正确性来说不是一个重要的细节，因为它没有副作用。

Performing interaction testing for non-state-changing functions makes your test brittle because you’ll need to update the test anytime the pattern of interactions changes. It also makes the test less readable given that the additional assertions make it more difficult to determine which assertions are important for ensuring correctness of the code. By contrast, state-changing interactions represent something useful that your code is doing to change state somewhere else.

对非状态变化的函数进行交互测试会使你的测试变得很脆弱，因为你需要在交互模式发生变化时更新测试。由于附加的断言使得确定哪些断言对于确保代码的正确性很重要变得更加困难，因此它还使得测试的可读性降低。相比之下，状态改变的交互代表了你的代码为改变其他地方的状态所做的有用的事情。

Example 13-17 demonstrates interaction testing on both state-changing and non- state-changing functions.

例13-17展示了对状态变化和非状态变化函数的交互测试。

*Example 13-17. State-changing and non-state-changing interactions*  *例13-17. 状态改变和非状态改变的相互作用*

```java
@Test
public void grantUserPermission() {
    UserAuthorizer userAuthorizer = new UserAuthorizer(mockUserService, mockPermissionDatabase);
    when(mockPermissionService.getPermission(FAKE_USER)).thenReturn(EMPTY);
    // Call the system under test.
    userAuthorizer.grantPermission(USER_ACCESS);
    // addPermission() is state-changing, so it is reasonable to perform
    // interaction testing to validate that it was called.
    verify(mockPermissionDatabase).addPermission(FAKE_USER, USER_ACCESS);
    // getPermission() is non-state-changing, so this line of code isn’t
    // needed. One clue that interaction testing may not be needed:
    // getPermission() was already stubbed earlier in this test.
    verify(mockPermissionDatabase).getPermission(FAKE_USER);
}
```

#### Avoid overspecification 避免过度规范化

In Chapter 12, we discuss why it is useful to test behaviors rather than methods. This means that a test method should focus on verifying one behavior of a method or class rather than trying to verify multiple behaviors in a single test.

在第12章中，我们将讨论为什么测试行为比测试方法更有用。这意味着一个测试方法应该关注于验证一个方法或类的一个行为，而不是试图在一个测试中验证多个行为。

When performing interaction testing, we should aim to apply the same principle by avoiding overspecifying which functions and arguments are validated. This leads to tests that are clearer and more concise. It also leads to tests that are resilient to changes made to behaviors that are outside the scope of each test, so fewer tests will fail if a change is made to a way a function is called.

在进行交互测试时，我们应该通过避免过度指定验证哪些函数和参数，以应用相同原则。这将导致测试更清晰、更简洁。这也导致了测试对每个测试范围之外的行为的改变有弹性，所以如果改变了一个函数的调用方式，更少的测试会失败。

Example 13-18 illustrates interaction testing with overspecification. The intention of the test is to validate that the user’s name is included in the greeting prompt, but the test will fail if unrelated behavior is changed.

示例13-18说明了过度规范的交互测试。测试的目的是验证用户名是否包含在问候语提示中，但如果不相关的行为发生更改，测试将失败。

 *Example* *13-18.* *Overspecified* *interaction* *tests*

```java
@Test public void displayGreeting_renderUserName() {
    when(mockUserService.getUserName()).thenReturn("Fake User");
    userGreeter.displayGreeting();
    // Call the system under test.
    // The test will fail if any of the arguments to setText() are changed.
    verify(userPrompt).setText("Fake User", "Good morning!", "Version 2.1");
    // The test will fail if setIcon() is not called, even though this
    // behavior is incidental to the test since it is not related to
    // validating the user name.
    verify(userPrompt).setIcon(IMAGE_SUNSHINE);
}
```

[Example 13-19](#_bookmark1176) illustrates interaction testing with more care in specifying relevant arguments and functions. The behaviors being tested are split into separate tests, and each test validates the minimum amount necessary for ensuring the behavior it is testing is correct.

例13-19说明了交互测试在指定相关参数和函数时更加谨慎。被测试的行为被分成独立的测试，每个测试都验证了确保它所测试的行为是正确的所需的最小量。

 *Example 13-19. Well-specified interaction tests*  *例13-19.指向明确的交互检验*

```java
@Test 
public void displayGreeting_renderUserName() {
    when(mockUserService.getUserName()).thenReturn("Fake User");
    userGreeter.displayGreeting(); // Call the system under test. 
    verify(userPrompter).setText(eq("Fake User"), any(), any());
}

@Test 
public void displayGreeting_timeIsMorning_useMorningSettings() {
    setTimeOfDay(TIME_MORNING);
    userGreeter.displayGreeting(); // Call the system under test. 
    verify(userPrompt).setText(any(), eq("Good morning!"), any());
    verify(userPrompt).setIcon(IMAGE_SUNSHINE);
}
```

## Conclusion 总结

We’ve learned that test doubles are crucial to engineering velocity because they can help comprehensively test your code and ensure that your tests run fast. On the other hand, misusing them can be a major drain on productivity because they can lead to tests that are unclear, brittle, and less effective. This is why it’s important for engineers to understand the best practices for how to effectively apply test doubles.

我们已经了解到，测试替代对工程速度至关重要，因为它们可以帮助全面测试代码并确保测试快速运行。另一方面，误用它们可能是生产率的主要消耗，因为它们可能导致测试不清楚、不可靠、效率较低。这就是为什么工程师了解如何有效应用测试替代的最佳实践非常重要。

There is often no exact answer regarding whether to use a real implementation or a test double, or which test double technique to use. An engineer might need to make some trade-offs when deciding the proper approach for their use case.

关于是使用真实实现还是测试替代，或者使用哪种测试替代技术，通常没有确切的答案。工程师在为他们的用例决定合适的方法时可能需要做出一些权衡。

Although test doubles are great for working around dependencies that are difficult to use in tests, if you want to maximize confidence in your code, at some point you still want to exercise these dependencies in tests. The next chapter will cover larger-scope testing, for which these dependencies are used regardless of their suitability for unit tests; for example, even if they are slow or nondeterministic.

尽管测试替代对于处理测试中难以使用的依赖项非常有用，但如果你想最大限度地提高代码的可信度，在某些时候你仍然希望在测试中使用这些依赖项。下一章将介绍更大范围的测试，对于这些测试，不管它们是否适合单元测试，都将使用这些依赖关系；例如，即使它们很慢或不确定。

## TL;DRs  内容提要

- A real implementation should be preferred over a test double.
- A fake is often the ideal solution if a real implementation can’t be used in a test.
- Overuse of stubbing leads to tests that are unclear and brittle.
- Interaction testing should be avoided when possible: it leads to tests that are brittle because it exposes implementation details of the system under test.

- 真实实现应优先于测试替代。
- 如果在测试中不能使用真实实现，那么伪造实现通常是理想的解决方案。
- 过度使用打桩会导致测试不明确和变脆。
- 在可能的情况下，应避免交互测试：因为交互测试会暴露被测系统的实现细节，所以会导致测试不连贯。
