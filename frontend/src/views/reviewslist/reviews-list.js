import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@polymer/iron-icon/iron-icon.js';

class ReviewListElement extends PolymerElement {
    static get template() {
        return html`
        <style include="lumo-color lumo-typography lumo-badge view-styles">
            :host {
                display: block;
            }

            #header {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: baseline;
            }

            /* Subtitle for the header */
            #header span {
                display: block;
                font-size: var(--lumo-font-size-s);
                font-weight: 400;
                color: var(--lumo-secondary-text-color);
                letter-spacing: 0;
                margin-top: 0.3em;
                margin-left: auto;
                margin-right: 20px;
            }

            .review {
                display: flex;
                align-items: center;
                width: 100%;
                padding: var(--lumo-space-wide-xl);
                padding-right: var(--lumo-space-m);
                box-sizing: border-box;
                margin-bottom: 8px;
                background-color: var(--lumo-base-color);
                box-shadow: 0 0 0 1px var(--lumo-shade-5pct), 0 2px 5px 0 var(--lumo-shade-10pct);
                border-radius: var(--lumo-border-radius);
            }

            .review__rating {
                flex: none;
                align-self: flex-start;
                margin: 0 1em 0 0;
                position: relative;
                cursor: default;
            }

            .review__score {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--lumo-border-radius);
                font-weight: 600;
                width: 2.5em;
                height: 2.5em;
                margin: 0;
            }

            [data-score="1"] {
                box-shadow: inset 0 0 0 1px var(--lumo-contrast-10pct);
            }

            [data-score="2"] {
                background-color: var(--lumo-contrast-20pct);
            }

            [data-score="3"] {
                background-color: var(--lumo-contrast-40pct);
            }

            [data-score="4"] {
                background-color: var(--lumo-contrast-60pct);
                color: var(--lumo-base-color);
            }

            [data-score="5"] {
                background-color: var(--lumo-contrast-80pct);
                color: var(--lumo-base-color);
            }

            .review__count {
                position: absolute;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 20px;
                min-width: 8px;
                padding: 0 6px;
                background: var(--lumo-base-color);
                color: var(--lumo-secondary-text-color);
                top: -10px;
                left: -10px;
                border-radius: var(--lumo-border-radius);
                margin: 0;
                font-size: 12px;
                font-weight: 500;
                box-shadow: 0 0 0 1px var(--lumo-contrast-20pct);
            }

            .review__count span {
                width: 0;
                overflow: hidden;
                white-space: nowrap;
            }

            .review__rating:hover .review__count span {
                width: auto;
                margin-left: 0.4em;
            }

            .review__details {
                width: 100%;
                max-width: calc(100% - 8.5em);
                flex: auto;
                line-height: var(--lumo-line-height-xs);
                overflow: hidden;
            }

            .review__name {
                margin: 0 0.5em 0 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .review__category {
                margin: 0;
                flex: none;
            }

            /* We only expect to have 10 categories at most, after which the colors start to rotate */
            .review__category {
                color: hsla(calc(340 + 360 / 10 * var(--category)), 40%, 20%, 1);
                background-color: hsla(calc(340 + 360 / 10 * var(--category)), 60%, 50%, 0.1);
            }

            .review__date {
                white-space: nowrap;
                line-height: var(--lumo-line-height-xs);
                margin: 0 1em;
                width: 30%;
            }

            .review__date h5 {
                font-size: var(--lumo-font-size-s);
                font-weight: 400;
                color: var(--lumo-secondary-text-color);
                margin: 0;
            }

            .review__date p {
                font-size: var(--lumo-font-size-s);
                margin: 0;
            }

            .review__edit {
                align-self: flex-start;
                flex: none;
                margin: 0 0 0 auto;
                width: 5em;
            }

            .reviews__no-matches {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 4em;
                font-size: 22px;
                color: var(--lumo-tertiary-text-color);
            }

            /* Small viewport styles */

            @media (max-width: 500px) {
                .review {
                    padding: var(--lumo-space-m);
                    padding-right: var(--lumo-space-s);
                    flex-wrap: wrap;
                }

                .review__date {
                    order: 1;
                    margin-left: 3.5em;
                    margin-top: 0.5em;
                }
            }

        </style>

        <div class="view-toolbar">
            <vaadin-text-field id="search" class="view-toolbar__search-field" autocapitalize="off">
                <iron-icon icon="lumo:search" slot="prefix"></iron-icon>
            </vaadin-text-field>
            <vaadin-button id="newReview" class="view-toolbar__button" theme="primary">
                <iron-icon icon="lumo:plus" slot="prefix"></iron-icon>
                <span>[[reviewButtonText]]</span>
            </vaadin-button>
        </div>

       
`;
    }

    static get is() {
        return 'reviews-list'
    }

    _isEmpty(array) {
        return array.length == 0;
    }
}
customElements.define(ReviewListElement.is, ReviewListElement);
