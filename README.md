Basic inline editor that uses contenteditable.  Appearance of the element is controlled via a CSS class on editable
elements, and another class that is added when an element goes into edit mode.

### Setup

There are two ways to call Schmedit.  First, directly on some element:

```
Schmedit(someElement, options)
```

Second, using delegation by providing an element and a child selector. 

```
Schmedit(someElement, childSelector, options)
```


### Cancel vs Commit

By default, a blur event will cause the edit to be cancelled. You can override this by setting `commitOnBlur` to be true
in your options.

### Lifecycle Callbacks

Three lifecycle callbacks are supported:

#### onCommit

`onCommit(element, value)`

Called when an element's value has been changed.

#### onCancel

`onCancel(element)`

Called when editing of an element was cancelled.

#### onEdit

`onEdit(element)`

Called before editing begins. Returning false will prevent editing from occurring.
