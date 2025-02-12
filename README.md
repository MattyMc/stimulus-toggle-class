# Stimulus Toggle Class

A lightweight set of Stimulus controllers that synchronize a checkbox with the presence (or absence) of a CSS class on a group of target elements. This makes it easy to manage UI states—such as visibility or enabled/disabled status—based solely on class toggling.

## Setup: Ruby on Rails

Generate a new ToggleClassController:

```bash
./bin/rails generate stimulus toggleClass
```

Copy/Paste the contents from [src/toggle_class_controller.js](https://github.com/MattyMc/stimulus-toggle-class/blob/main/src/toggle_class_controller.js) into the toggle_class_controller.js file that was generated above.

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
