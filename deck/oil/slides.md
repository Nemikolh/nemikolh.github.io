# Oil

### User interface library
Nemikolh


<img class="logo" src="img/logo.svg" />

---

## Agenda

- Background
- Two particular cases
- Design
- Layout
- Focus
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:
A little background to help you have

---

## Background

---

## Immediate mode GUI

```csharp
// Assign the skin to be the one currently used.
GUI.skin = mySkin;
// Make a background box
GUI.Box(new Rect(10,10,100,90), "Menu");

if(GUI.Button(new Rect(20,40,80,20), "Press me!")) {
    // Here run the logic when the button is pressed.
}
// Assign the currently skin to be Unity's default.
GUI.skin = null;
```

- Pros:                                                 <!-- .element: class="fragment" data-fragment-index="1" -->
    - Easy to use                                       <!-- .element: class="fragment" data-fragment-index="1" -->
- Cons:                                                 <!-- .element: class="fragment" data-fragment-index="2" -->
    - Use globals to store UI state                     <!-- .element: class="fragment" data-fragment-index="2" -->
    - Mix logic with presentations                      <!-- .element: class="fragment" data-fragment-index="2" -->
    - No event bubbling                                      <!-- .element: class="fragment" data-fragment-index="2" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

Not artists / UX designer friendly
They don't play well with different monitor sizes
- Layout is absent by default
- Sizes are usually hard-coded

---

## Widget-based framework

```cpp
QWidget window;
window.show();
QPushButton *button = new QPushButton("Press me"), &window);
button->show();
```

- Pros:                                                 <!-- .element: class="fragment" data-fragment-index="1" -->
    - Code is more maintainable                         <!-- .element: class="fragment" data-fragment-index="1" -->
    - Objects retains data instead of using globals     <!-- .element: class="fragment" data-fragment-index="1" -->
- Cons:                                                 <!-- .element: class="fragment" data-fragment-index="2" -->
    - UI structure is still hard-coded                  <!-- .element: class="fragment" data-fragment-index="2" -->
    - Separation of concerns is still unclear           <!-- .element: class="fragment" data-fragment-index="2" -->
    - Custom widgets are non-trivial to write           <!-- .element: class="fragment" data-fragment-index="2" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

The main problem solved by this approach is the flexibility
and lead to cleaner code base (personal experience).

With widget based interface, the user might retained too much state needed.
Optimizations are on the user interface designer shoulders.

Because the lifetime of the structure is retained by the application code
such framework prevents optimizations by the rendering engine.

Custom widgets requires deep understanding of the library to avoid common pitfall
slowing down the UI.

---

## Markup language

- Pros: <!-- .element: class="fragment" data-fragment-index="1" -->
    - Dedicated engine                                  <!-- .element: class="fragment" data-fragment-index="1" -->
    - Runtime optimizations                             <!-- .element: class="fragment" data-fragment-index="1" -->
    - Decouple UI/UX designer work from Core Engineers  <!-- .element: class="fragment" data-fragment-index="1" -->
- Cons:                                                 <!-- .element: class="fragment" data-fragment-index="2" -->
    - Hard to get "right"                               <!-- .element: class="fragment" data-fragment-index="2" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

They fully abstract the application problem but they are really hard to get right.
Take for instance the HTML spec and browser specific behavior leading to weird normalization:
- normalize.css
- jquery

---

## Two particular cases

---

## HTML 5 / CSS 3 / JS

- Automatic layout
- DOM (UI data structure)
- Stylesheet separates presentation from content
- Selectors
  * pseudo-classes
  * specificity
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

Originally HTML was designed for static content with "forms"
HTML is a *text* markup language:
 - property color of css affect text not container
 - hard to center vertically ? Take a document editor (word) as an example.

CSS 2.1/3:
 - allows authors and users to attach style (e.g., fonts and spacing) to structured documents
 - separates the presentation style of documents from the content of documents
 - supports media specific style (printer, )
 - apply properties through selectors (expression * element -> boolean)
    - specificity
    - class selector
    - attribute selector
    - universal selector *
    - pseudo-classes
      - :link, :visited                     (link class)
      - :hover, :active, :focus             (user action) (focus -> accept form of input such as keyboard/mouse)
      - :target                             (when the uri refer to a location inside the html page (end with #id))
      - :lang                               (select based on the language used)
      - :enabled, :disabled, :checked       (ui element that have an enabled state)
      - :root, :nth-child(), :first-child   (structural selector)
      - :not()
    - pseudo elements
      - ::first-line
      - ::first-letter
      - ::before
      - ::after

---

## HTML 5 / CSS 3 / JS

- **Drawbacks:**
    - Javascript (!)
    - Dynamic content
    - Modularity *(will be fixed with web components)*
- <!-- .element: class="fragment" data-fragment-index="1" --> **Strength:**
<!-- .element: class="fragment" data-fragment-index="1" -->

    - Users       <!-- .element: class="fragment" data-fragment-index="1" -->
    - Great tools <!-- .element: class="fragment" data-fragment-index="1" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

Not originally designed to write user interfaces
Lot of design flaws
Design flaws: table
Css: global scope
Dynamic content needs js support

---

## QML

- Support for module / components
- Property bindings
- Events have explicit definition
- No default automatic layout
- Complete new syntax

---

## QML an example

```js
import QtQuick 2.3

ApplicationWindow {

    width: 200
    height: 100

    MouseArea {
        anchors.fill: parent
        onClicked: parent.color = "blue"
    }

    Text {
        anchors.centerIn: parent
        text: "Hello, World!"
    }
}
```
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

---

## QML ? But...

- Javascript (again)
- Model can be defined:

  - *either as UI element with some JS attached to it...*

  - *...or as C++ model binded to some UI element.*

- <!-- .element: class="fragment" data-fragment-index="1" --> Did they really solved the UI problem ?<!-- .element: class="fragment" data-fragment-index="1" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

UI problem: a friendly markup language for designers that allow a cleaner
separation between the application engineer concerns and the designers one.

---

## Problems

<img class="html_stack" src="img/html_stack.png" />
<img class="qml_stack" src="img/qml_stack.png" />

- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<!-- .element: class="hidden" -->
- Scripting (application logic)
- UI Design pattern
- Modularity
- User Interaction Flow
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<!-- .element: class="hidden" -->

Note:

Would be nice to have UI Design Pattern directly understood by the engine.
Allow for better optimizations and avoid DRY problems.

---

## Design decisions for Oil

<img class="logo-oil" src="img/logo.svg" />

- Scripting (ui logic) solved by:
  - Data bindings **only**
  - `gotoview`<!-- .element: class="emphasis" -->
- Modularity solved by:
  - Markup with views / templates
  - Symbol resolution not yet defined though

- Style: similar to CSS for now
- Application logic in **Rust**<!-- .element: class="emphasis" -->
- **no scripting**
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<!-- .element: class="hidden" -->


Note:

Modularity through templates and views. Note: I'm not sure
yet about what would be the best way to resolve dependencies.

---

## Wait, you said Rust ?

Yes I did.

---

## Rust

<img class="logo-rust" src="img/rust-logo-blk.svg" />

- LLVM based
- Memory safety with ownership
- No data races
- No GC
- UTF-8
- Modern packet manager
- <!-- .element: class="fragment" data-fragment-index="1" -->**No null pointers**<!-- .element: class="emphasis fragment" data-fragment-index="1" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<!-- .element: class="hidden" -->

Note:

Modern packet manager for system programming !!

---

<div class="cpp-text-float">C++</div>

```cpp
unique_ptr<A> a(new A());
give_ownership(a);

// Pick one:
// - segfault
// - use after free
a->do_stuff();
```

<div class="rust-text-float">Rust</div><!-- .element: class="rust-text-float fragment" data-fragment-index="1" -->

```rust
let a = A::new();
give_ownership(a);

// Won't compile.
a.do_stuff();
```
<!-- .element: class="fragment" data-fragment-index="1" -->

```
<anon>:22:5: 22:6 error: use of moved value: `a`
<anon>:22     a.do_stuff();
              ^
<anon>:20:20: 20:21 note: `a` moved here because it has type `A`, which is
                          non-copyable
<anon>:20     give_ownership(a);
```
<!-- .element: class="fragment" data-fragment-index="2" -->

Note:

Move semantics have been introduced in C++ to allow a clear
distinction between a move and a copy.

Rust is move by default and copy is explicit whereas in C++ copy
is implicit (except if the programmer explicitly reject copy ctor & assignment).

The C++ example can be segfault if during the move unique_ptr set to a null pointer
the pointer value of a.

Note the performance impact on a large C++ code base. To avoid problem, you
are likely going to perform a check every time you manage a pointer (but you also
need to guard yourself against dangerous move and recommend to set moved value
pointer to zero). So you have an overhead because you trade memory safety against
speed.

---

## Why Rust ?

- Learn about UI from scratch
- Performance
- Concurrency
- Emscripten

Note:

Have you heard about linux from scratch ?
    Well it is not really about writing it from scratch, but
more about compiling it from scratch. However as you have full
control on the process you learn a lot on the linux architecture.

Learning reason mainly, but also because:
- Nice support for string manipulation
- Servo
- Targeting Game devs

If you seek what the web will be in 2020,
you might be surprised by how crazy it became.
Did you heard about the WebAssembly draft ?

---

## Oil's languages at a glance

```xml
<view name="main">
    <template path="foobar" />
    Lorem ipsum
    <group class="maecenas">
        <button class="btn">dolor sit amet</button>
        <button class="btn">consectetur</button>
    </group>
</view>

<template name="foobar">
    <button/>
</template>
```

```css
.maecenas {
    margin: expand;
}

.btn {
    width: auto;
}
```

Note:

* The view tag work like an iframe / html tag. It defines a unique rendering
context.
* The template outside a view tag behave as a constructor for a sub tree. It can
then be imported inside the view with the template tag.
* The ambient model apply to a particular view.

---

## View flow

```xml
<view name="main">
    <button gotoview="foobar"></button>
</view>

<view name="foobar">
    <button action="pop_view"></button>
    <button gotoview="bazz"></button>
</view>

<view name="bazz">
    <button gotoview="main"></button>
</view>
```
<!-- .element: class="reset" -->
<div class="view-stack-container">
<div class="view-stack">
  <div class="stack-element">bazz</div><!-- .element: class="current-visible stack-element fragment" data-fragment-index="1" -->
  <div class="stack-element">foobar</div><!-- .element: class="current-visible stack-element fragment" data-fragment-index="1" -->
  <div class="stack-element">main</div>
</div><!-- .element: class="view-stack fragment" data-fragment-index="1" -->
</div>

<div class="dummy"></div><!-- .element: class="hidden fragment" data-fragment-index="2" -->

Note:

The view stack allow to jump directly to a view which is below in the stack.
You can either pop the view or return directly to an existing view. If the view does
not exist then the the view is added on top of the stack.

---

## Data-bindings

<div class="as-pre"><code class="xml hljs "><span class="hljs-tag">&lt;<span class="hljs-title">view</span> <span class="hljs-attribute">name</span>=<span class="hljs-value">"main"</span>&gt;</span>
    Hello <span class="data-bindings fragment" data-fragment-index="1">{{name}}</span> !
    <span class="hljs-tag">&lt;<span class="hljs-title">repeat</span> <span class="hljs-attribute">iter</span>=<span class="hljs-value data-bindings fragment" data-fragment-index="2">"{{friends}}"</span> <span class="hljs-attribute">template-name</span>=<span class="hljs-value">"friend"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">template</span> <span class="hljs-attribute">name</span>=<span class="hljs-value">"friend"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">group</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"li"</span>&gt;</span><span class="data-bindings fragment" data-fragment-index="1">{{name}}</span> is <span class="data-bindings fragment" data-fragment-index="1">{{status}}</span><span class="hljs-tag">&lt;/<span class="hljs-title">group</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">template</span>&gt;</span></code></div>

<img class="data_bindings_simple current-visible fragment" src="img/data-bindings_simple.png" data-fragment-index="1" />
<img class="data_bindings_repeat current-visible fragment" src="img/data-bindings_repeat.png" data-fragment-index="2" />

Note:

Data bindings is all about change detection and knowing when
the data should be updated.

---

## Layout

<div class="a-screen">
    <span class="legend">window width</span>
    <span class="legend rotate">window height</span>
</div>

Note:
Screen constraints the space, now you can extends those rules
HTML ignore the height one assuming a vertical scrollbars.
It also pick

---

## Layout

* Left to Right
* Automatic layout (equivalent to HTML one)

<div class="reset">
<div class="fullwidth">
    <span class="legend block">max width</span>
    <div class="block limits">
        <div class="dashed"></div>
        <div class="left-arrow"></div>
        <div class="right-arrow"></div>
    </div>
</div>
<div class="parent">
    <div class="some-child"><div class="green-block">1</div></div>
    <div class="">
        <div class="child"><div class="green-block">2</div></div>
    </div><!-- .element: class="placement fragment" data-fragment-index="1" -->
    <div class="">
        <div class="child red">3</div>
        <div class=""><div class="green-block">3</div></div><!-- .element: class="child fragment " data-fragment-index="3" -->
    </div><!-- .element: class="placement fragment" data-fragment-index="2" -->
</div><!-- .element: class="parent fragment always-visible" data-fragment-index="3" -->
</div>

- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

---

## Layout

* "New line"-like properties
  - `auto`<!-- .element: class="emphasis" -->

    Force a line return but does not use all the space available.

  - `expand`<!-- .element: class="emphasis" -->

    Force a line return and consume all the space available

---

## Layout: demo

---

## Focus

```xml
<view>
    <group class="one-line">
        <button class="btn"/>
        <button class="btn"/>
    </group>
    <group class="one-line">
        <button class="btn"/>
        <button class="btn"/>
    </group>
</view>
```
<!-- .element: class="reset" -->
<div class="view-stack-container">
<div class="view-focus">
<div class="focus-group">
  <div class="focus-element"></div><!-- .element: class="focus-element fragment" data-fragment-index="1" -->
  <div class="focus-element"></div>
</div>
<div class="focus-group">
  <div class="focus-element"></div><!-- .element: class="focus-element fragment" data-fragment-index="2" -->
  <div class="focus-element"></div>
</div>
</div>
</div>

<div class="dummy"></div><!-- .element: class="hidden fragment" data-fragment-index="3" -->


Note:

In the image above we can see how focus interact with the ui structure.
The idea is that if you have only a gamepad or a keyboard as a controller,
you need a clever way to navigate the tree to find the most relevant node
that will have the focus.

Natural way to interact with the ui.

---

## Focus: demo (explanations)

```xml
<view name="main">
    <group class="center single-line">
        <group class="square">
            <button class="btn"></button>
            ...
        </group>
        <group class="square">
            <button class="btn"></button>
            ...
        </group>
    </group>
    <group class="center">
        <group class="square">
            <button class="btn"></button>
            ...
        </group>
        <group class="square">
            <button class="btn"></button>
            ...
        </group>
    </group>
    <button class="center btn"></button>
</view>
```

---

## Focus: demo

---

## Future

- Finish data-bindings implementation
- Font rendering
- Animation
- Write a better grammar for the markup (?)
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

Font rendering is hard: harfbuzz, freetype, rendering backend, fontconfig
and patents.

---


## Thank you !

[oil](http://oil-lang.github.io/)
