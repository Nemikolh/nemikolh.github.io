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
- Demo
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:
A little background to help you have

---

## Background

---

## Immediate mode GUI

```cpp
if (ImGui::Button("Press me")) {
    // Here run the logic when the button is pressed.
}
```

- Pros:                                                 <!-- .element: class="fragment" data-fragment-index="1" -->
    - Easy to use                                       <!-- .element: class="fragment" data-fragment-index="1" -->
- Cons:                                                 <!-- .element: class="fragment" data-fragment-index="2" -->
    - Use globals to store UI state                     <!-- .element: class="fragment" data-fragment-index="2" -->
    - Hard to configure                                 <!-- .element: class="fragment" data-fragment-index="2" -->
    - Mix logic with presentations                      <!-- .element: class="fragment" data-fragment-index="2" -->
    - Screen sizes                                      <!-- .element: class="fragment" data-fragment-index="2" -->
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
- Stylesheet
- Scripting for UI logic
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

Originally HTML was designed for static content with "forms"
HTML is a *text* markup language:
 - property color of css affect text not container
 - hard to center vertically ? Take a document editor (word) as an example.
Any DOM can be rendered even with no CSS

---

## HTML 5 / CSS 3 / JS

- **Drawbacks:**
    - Javascript (!)
    - Not originally designed to write user interfaces
    - Lot of design flaws
    - Modularity *(will be fixed with web components)*
- <!-- .element: class="fragment" data-fragment-index="1" --> **Strength:**
<!-- .element: class="fragment" data-fragment-index="1" -->

    - Users           <!-- .element: class="fragment" data-fragment-index="1" -->
    - Great framework <!-- .element: class="fragment" data-fragment-index="1" --> *(e.g. Angular)*      <!-- .element: class="fragment" data-fragment-index="1" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

Design flaws: table
Predictability and Consistency. CSS has neither. Percentage / specificity rule.

---

## QML

- Support for module / components
- Complete new syntax

    ```js
    import QtQuick 2.3

    ApplicationWindow {

        width: 200
        height: 100

        Text {
            anchors.centerIn: parent
            text: "Hello, World!"
        }
    }
    ```
<!-- .element: class="fragment" data-fragment-index="1" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

---

## QML (More)

- Property bindings
- Javascript (V8)
- Events

    ```js
    ApplicationWindow {
        width: 400
        height: 200

        MouseArea {
            anchors.fill: parent
            onClicked: parent.color = "blue"
        }

        Rectangle {
            width: parent.width / 2
            height: parent.height
            x: parent.width / 2
        }
    }
    ```
<!-- .element: class="fragment" data-fragment-index="1" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

Note:

- Use ideas from Reactive programming (bindings)

---

## Summary

- HTML
    - Javascript
    - Modularity
- QML
    - Application logic can be in C++ or QML/Js or both
- Scaleform<!-- .element: class="fragment" data-fragment-index="1" -->

Note:

Only cons here, good part (subjective) go in design decision.
For QML, it makes sense for them as they want to provide a full
alternative to writing classic c++ qt application in a simple language.
But the done side is that it makes interaction with complex application harder
in my opinion.

Scaleform is to mentioned because of the variety of tools that surrounds it.
Scaleform use ActionScript which is roughly ES6, illustrator and photoshop
to create / manage assets ( vector graphics, custom animations, 3D ui ).
Everything is manipulated through tools from adobe suite.
Scaleform Gfx is the library part of the stack that game links to.

---

## Design decision for Oil

- Markup with views / templates
- Data bindings **only**
- Style: similar to CSS for now
- Application logic is in the application language **only**

Note:

The final dot refer to the last previous point of QML.
Modularity through templates and views. Note: I'm not sure
yet about what would be the best way to resolve dependencies.

---

## Languages at a glance

```xml
<view name="main">
    <template name="foobar" />
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

## View stack

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

## Layout

---

The automatic layout in Oil follow a set of rules similar to HTML.

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
    <div class="some-child"></div>
    <div class="">
        <div class="child"></div>
    </div><!-- .element: class="placement fragment" data-fragment-index="1" -->
    <div class="">
        <div class="child red"></div>
        <div class=""></div><!-- .element: class="child fragment " data-fragment-index="3" -->
    </div><!-- .element: class="placement fragment" data-fragment-index="2" -->
</div><!-- .element: class="parent fragment always-visible" data-fragment-index="3" -->
</div>

- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

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

---

## Demo

---

## Demo

```xml
<view name="main">
    <group class="center single-line">
        <group class="shop">
            <button class="item"></button>
            ...
        </group>
        <group class="inventory">
            <button class="item"></button>
            ...
        </group>
    </group>
    <group class="center">
        <group class="shop">
            <button class="item"></button>
            ...
        </group>
        <group class="inventory">
            <button class="item"></button>
            ...
        </group>
    </group>
</view>
```

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
