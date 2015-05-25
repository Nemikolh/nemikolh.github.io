# Oil

### User interface library
Nemikolh


<img class="logo" src="img/logo.svg" />

---

## Agenda

- Background
- Design
- Layout
- Focus
- Demo
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

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

- Pros:
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

## State of the art

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

## Design decision for Oil

- Modularity
- Data bindings **only**
- Style: similar to CSS for now

---

## Layout

---

The automatic layout in Oil follow a set of rules similar to HTML layout.

- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

---

## Focus

---

## Demo

---

## Future

- Finish data-bindings implementation
- Introduce font rendering
- Animation
- Find a more expressive grammar over xml (?)
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX <!-- .element: class="hidden" -->

---


## Thank you !

[oil](http://oil-lang.github.io/)
