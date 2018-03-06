# Tic
I'm digging into React lately, and I was kinda annoyed with the official tutorial. I think what it came down to is, and this will likely continue, that I'm looking at a problem that I've already solved, and it's being solved in a different way. This is a good thing, this frustration, because will likely lead to some new things.

While I was going through the tutorial, again I was thinking like I have with other tutorials: Where are the tests?, then later: I'm stuck, what did I do wrong (because there's no typescript to help me, and "Why are they doing it this way, it makes it hard to test and easy to break". So, as an exercise, I converted my little react tutorial app over to angular, which is this. I kept as much of the reactish stuff I could, because I wanted to wrap my brain around react more, and to show how I would add tests to this  and refactor for cleaner code. That doesn't mean react is bad, and I would do the same refactors with react. It's also interesting to note that the react version does look cleaner because of the inheirtance, like I had to make up `setState`.

Steps:
1. `npm run test` Test fail (because I used the angular cli to generate the spec files, no surprise)
2. xdescribe all tests
3. work from the bottom up: square, this one required no change, it's a dumb component, no set state, and no child components, and no dependancies
4. Board: `Can't bind to 'value' since it isn't a known property of 'app-square'.`: Look at the template for the this component. It has the `<app-square> selector, which means an instance of the SquareComponent is created, and the TestBed has no idea where that selector is coming from. So add it to the declarations array.
5. Board: [object ErrorEvent] thrown
  - find `getJasmineRequireObj().ExceptionFormatter` in `node_modules/jasmine-core/lib/jasmine-core/jasmine.js`, and add a debugger statement.
  - OR: `ng test --sourcemaps=false` typically gives you more valid feedback
  - Before I did that, I examined the template, and my guess what right. On each SquareComponent, I'm assigning it value that will be undefined in the test
  - Solve this: Add a value to the second beforeEach
6. game: Add squares and board to declarations
7. Add xit statements for each method on all the classes. Board and Square don't need any, because they just have Inputs and Outputs. Use this time to also organize your properties and methods: sort alphabeticaly, Inputs, outputs, state properties, constructor, lifecycle hooks, methods
  - instead of using xit, you can just not add the callback param

https://jasmine.github.io/2.0/introduction.html
