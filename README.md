# Stimulus Toggle Class

A lightweight set of Stimulus controllers that synchronize a checkbox with the presence (or absence) of a CSS class on a group of target elements. This makes it easy to manage UI states—such as visibility or enabled/disabled status—based solely on class toggling.

## Setup: Ruby on Rails

Generate a new ToggleClassController:

```bash
./bin/rails generate stimulus toggleClass
```

Copy/Paste the contents from src/toggle_class_controller.js into the toggle_class_controller.js file that was generated above.


## Example: Hide All Elements with Tailwind's [`invisible` class](https://tailwindcss.com/docs/visibility)

```html
<!-- The container with the controller declaration -->
<div data-controller="toggle-class"
     data-toggle-class-css-selector-value=".item"
     data-toggle-class-css-class-value="invisible"
     data-toggle-class-check-on-value="true">
  <!-- The checkbox that triggers the toggle action -->
  <input type="checkbox" data-action="click->toggle-class#toggle" id="showHideDivsCheckbox">
  <label for="showHideDivsCheckbox">Hide Divs</label>
</div>

<!-- Target elements that will have the "active" class toggled -->
<div class="item">Div 1</div>
<div class="item">Div 2</div>
<div class="item">Div 3</div>
```
