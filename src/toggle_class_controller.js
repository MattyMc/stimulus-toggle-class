import { Controller } from '@hotwired/stimulus';

/**
 * ToggleClassController
 *
 * This controller syncs a checkbox with the presence of a CSS class on a group of target elements.
 *
 * When `checkOn` is true (default):
 *   - The checkbox is checked if every target element has the CSS class.
 *   - It is unchecked if none have the class.
 *   - It is indeterminate if only some have the class.
 *
 * When `checkOn` is false:
 *   - The checkbox is checked if no target element has the CSS class.
 *   - It is unchecked if every target element has the class.
 *   - It is indeterminate if only some have the class.
 *
 * If no target elements match, the checkbox is checked and disabled.
 *
 * Data Attributes:
 *   data-toggle-class-controller-css-selector-value:
 *     CSS selector for target elements.
 *   data-toggle-class-controller-css-class-value:
 *     CSS class to toggle (default: "show").
 *   data-toggle-class-controller-check-on-value:
 *     Boolean flag; when true, the checkbox is checked if all target elements have the class (default: true).
 */
export default class ToggleClassController extends Controller {
  static values = {
    cssSelector: String,
    cssClass: { type: String, default: 'show' },
    checkOn: { type: Boolean, default: true },
  };

  /**
   * Called when the controller connects.
   * Initializes target elements and the checkbox, sets the initial state,
   * and attaches MutationObservers to monitor class changes.
   */
  connect() {
    console.log(this.cssSelectorValue, this.cssClassValue, this.checkOnValue);

    // Get target elements (they may lie outside this controller's element).
    this.elements = document.querySelectorAll(this.cssSelectorValue);
    // Find the checkbox within this controller.
    this.checkbox = this.element.querySelector('input[type="checkbox"]');

    if (!this.checkbox) {
      console.error('ToggleClassController: No checkbox input found.');
      return;
    }

    // If no target elements are found, check and disable the checkbox.
    if (this.elements.length === 0) {
      this.checkbox.checked = true;
      this.checkbox.disabled = true;
      return;
    }

    // Set the initial checkbox state.
    this.updateCheckbox();

    // Attach MutationObservers to update the checkbox when a target element's class changes.
    this.observers = Array.from(this.elements).map((el) => {
      const observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.type === 'attributes' && m.attributeName === 'class')) {
          this.updateCheckbox();
        }
      });
      observer.observe(el, { attributes: true, attributeFilter: ['class'] });
      return observer;
    });
  }

  /**
   * Called when the controller disconnects.
   * Cleans up any MutationObservers.
   */
  disconnect() {
    this.observers?.forEach((observer) => observer.disconnect());
  }

  /**
   * Updates the checkbox state based on the CSS class presence on target elements.
   */
  updateCheckbox() {
    const total = this.elements.length;
    // Count elements meeting the criteria:
    // If checkOn is true, count elements that have the class.
    // Otherwise, count those that lack the class.
    const count = Array.from(this.elements).filter((el) =>
      this.checkOnValue ? el.classList.contains(this.cssClassValue) : !el.classList.contains(this.cssClassValue)
    ).length;

    const checked = count === total;
    const indeterminate = count > 0 && count < total;

    // Update the checkbox state and ARIA attribute.
    this.checkbox.checked = checked;
    this.checkbox.indeterminate = indeterminate;
    this.checkbox.setAttribute('aria-checked', indeterminate ? 'mixed' : checked ? 'true' : 'false');
  }

  /**
   * Toggles the CSS class on all target elements based on the checkbox state.
   */
  toggle() {
    // When checkOn is true, add the class if the checkbox is checked; remove it if unchecked.
    // When false, the action is reversed.
    const force = this.checkOnValue ? this.checkbox.checked : !this.checkbox.checked;
    this.elements.forEach((el) => el.classList.toggle(this.cssClassValue, force));
  }
}
