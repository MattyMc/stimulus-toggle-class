# Stimulus Toggle Class

A lightweight set of Stimulus controllers that synchronize a checkbox with the presence (or absence) of a CSS class on a group of target elements. This makes it easy to manage UI states—such as visibility or enabled/disabled status—based solely on class toggling.

## Video Demo on Loom

<a href="https://www.loom.com/share/7d2cb644f5d84063916d578e5f923334" target="_blank" rel="noopener noreferrer">Demo: Stimulus Toggle Class Controller</a>

## Usage

Provide the controller a CSS selector to find elements, and a CSS class. If the class name is present on:

  - All matching elements have the class: Checkbox is checked
  - Some matching elements have the class: Checkbox is as [:indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate)
  - No matching elements have the class: Checkbox is empty

## Features

  - Monitors changes (mutations) to matching elements and updates the checkbox
  - Supports [:indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) state
  - Allows inverting logic. For example, if a set of elements are shown using a class (e.g. Tailwind's `visible` or Bootstrap's `show`), you may wish to have to have a "Hide All Items" checkbox marked as checked if all elements _do not_ have the `show` or `visible` class. In this case, set `check-on-value="false"` and the controller will set this value if the classes are _not_ present.
  - Easily extended (see example below)

## Setup: Ruby on Rails

Generate a new ToggleClassController:

```bash
./bin/rails generate stimulus toggleClass
```

Copy/Paste the contents from [src/toggle_class_controller.js](https://github.com/MattyMc/stimulus-toggle-class/blob/main/src/toggle_class_controller.js) into the toggle_class_controller.js file that was generated above.

## Bootstrap Example

### Show All Items Using Bootstrap (with d-none)

In this example, the target elements are visible when they do not have the `d-none` class. The checkbox is checked when all target elements are visible, and unchecked when they are hidden (i.e. when `d-none` is applied).

```html
<!-- Container with controller declaration -->
<div data-controller="toggle-class"
     data-toggle-class-css-selector-value=".item"
     data-toggle-class-css-class-value="d-none"
     data-toggle-class-check-on-value="false">
  <input type="checkbox" data-action="click->toggle-class#toggle" id="toggleItemsCheckbox">
  <label for="toggleItemsCheckbox">Show Items</label>
</div>

<!-- Target elements (initially visible) -->
<div class="item" id="item_1">Item 1</div>
<div class="item" id="item_2">Item 2</div>
<div class="item" id="item_3">Item 3</div>
```

### Hide a Single Collapsed Item Using Bootstrap (with `show`)

In this example, a collapsible element is controlled by the `show` class. The element is initially expanded (visible) because it has the `show` class, and the checkbox is unchecked. Toggling the checkbox will remove the `show` class, collapsing (hiding) the element. Useful if 

## Tailwind Examples using [`invisible` class](https://tailwindcss.com/docs/visibility)

### Hide all elements with class `item`

```html
<!-- The container with the controller declaration -->
<div data-controller="toggle-class"
     data-toggle-class-css-selector-value=".item"
     data-toggle-class-css-class-value="invisible"
     data-toggle-class-check-on-value="true">
  <!-- The checkbox that triggers the toggle action -->
  <input type="checkbox" data-action="click->toggle-class#toggle" id="hideItemsCheckbox">
  <label for="hideItemsCheckbox">Hide Items</label>
</div>

<!-- Target elements -->
<div class="item" id="item_1">Item 1</div>
<div class="item" id="item_2">Item 2</div>
<div class="item" id="item_3">Item 3</div>
```

### Hide a single matching element with id `item_2`

```html
<div data-controller="toggle-class"
     data-toggle-class-css-selector-value="#item_2"
     data-toggle-class-css-class-value="invisible"
     data-toggle-class-check-on-value="true">
  <!-- The checkbox that triggers the toggle action -->
  <input type="checkbox" data-action="click->toggle-class#toggle" id="hideItem2Checkbox">
  <label for="hideItem2Checkbox">Hide Item 2</label>
</div>

<!-- Target elements -->
<div class="item" id="item_1">Item 1</div>
<div class="item" id="item_2">Item 2</div>
<div class="item" id="item_3">Item 3</div>
```

## Extending

For example, we use Bootstrap 5.3 and created a `visibility_d_none_controller.js`:

```javascript
import ToggleClassController from './toggle_class_controller';

/**
 * This controller toggles visibility using the "d-none" CSS class.
 * - An element with "d-none" is hidden.
 * - The checkbox is checked when all target elements are visible (i.e. lack "d-none").
 */
export default class VisibilityDNoneController extends ToggleClassController {
  static values = {
    ...ToggleClassController.values,
    cssClass: { type: String, default: 'd-none' },
    checkOn: { type: Boolean, default: false },
  };
}
```

