const div = document.createElement('div');
div.innerHTML = '<custom-style><style include="lumo-color lumo-typography"></style></custom-style>';
document.head.insertBefore(div.firstElementChild, document.head.firstChild);

function addCssBlock(block) {
 const tpl = document.createElement('template');
 tpl.innerHTML = block;
 document.head.appendChild(tpl.content);
}
import $css_0 from 'Frontend/styles/view-styles.css';
addCssBlock(`<dom-module id="view-styles"><template><style>${$css_0}</style></template></dom-module>`);
import $css_1 from 'Frontend/styles/shared-styles.css';
addCssBlock(`<custom-style><style include="view-styles">${$css_1}</style></custom-style>`);

import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/icons.js';
import '@vaadin/flow-frontend/flow-component-renderer.js';
import '@vaadin/flow-frontend/comboBoxConnector-es6.js';
import '@vaadin/vaadin-combo-box/theme/lumo/vaadin-combo-box.js';
import '@vaadin/flow-frontend/datepickerConnector.js';
import '@vaadin/vaadin-date-picker/theme/lumo/vaadin-date-picker.js';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid.js';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid-sorter.js';
import '@vaadin/vaadin-checkbox/theme/lumo/vaadin-checkbox.js';
import '@vaadin/flow-frontend/gridConnector-es6.js';
import '@vaadin/flow-frontend/contextMenuConnector-es6.js';
import '@vaadin/vaadin-context-menu/theme/lumo/vaadin-context-menu.js';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid-column-group.js';
import '@vaadin/flow-frontend/vaadin-grid-flow-selection-column.js';
import 'lit-pagination/lit-pagination.js';
import '@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-notification/theme/lumo/vaadin-notification.js';
import '@vaadin/vaadin-text-field/theme/lumo/vaadin-number-field.js';
import '@vaadin/vaadin-ordered-layout/theme/lumo/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-button/theme/lumo/vaadin-button.js';
import '@vaadin/vaadin-dialog/theme/lumo/vaadin-dialog.js';
import '@vaadin/vaadin-form-layout/theme/lumo/vaadin-form-layout.js';
import '@vaadin/vaadin-form-layout/theme/lumo/vaadin-form-item.js';
import '@vaadin/vaadin-ordered-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/flow-frontend/comboBoxConnector.js';
import '@vaadin/flow-frontend/gridConnector.js';
import '@vaadin/flow-frontend/contextMenuConnector.js';