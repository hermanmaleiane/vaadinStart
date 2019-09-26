/*
 * Copyright 2000-2017 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.maleiane.herman.ui.views.reviewslist;

import com.maleiane.herman.backend.Review;
import com.maleiane.herman.backend.ReviewService;
import com.maleiane.herman.ui.MainLayout;
import com.maleiane.herman.ui.common.AbstractEditorDialog;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.KeyModifier;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.polymertemplate.EventHandler;
import com.vaadin.flow.component.polymertemplate.ModelItem;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.vaadin.klaudeta.PaginatedGrid;

import java.util.List;

/**
 * Displays the list of available categories, with a search filter as well as
 * buttons to add a new category or edit existing ones.
 *
 * Implemented using a simple template.
 */
@Route(value = "reviews", layout = MainLayout.class)
@PageTitle("Review List")
public class ReviewsList extends VerticalLayout {
    private final TextField searchField = new TextField("", "Search Reviews");
    private final H2 header = new H2("Reviews");
    private final PaginatedGrid<Review> grid = new PaginatedGrid<>();

    private ReviewEditorDialog reviewForm = new ReviewEditorDialog(this::saveUpdate, this::deleteUpdate);

    public ReviewsList() {
        initView();
        addSearchBar();
        addContent();
        updateView();
    }

    private void initView() {
        addClassName("reviews-list");
        setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.STRETCH);
    }

    private void addSearchBar() {
        Div viewToolbar = new Div();
        viewToolbar.addClassName("view-toolbar");

        searchField.setPrefixComponent(new Icon("lumo", "search"));
        searchField.addClassName("view-toolbar__search-field");
        searchField.addValueChangeListener(e -> updateView());
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        searchField.addFocusShortcut(Key.KEY_F, KeyModifier.CONTROL);

        Button newButton = new Button("New Review", new Icon("lumo", "plus"));
        newButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        newButton.addClassName("view-toolbar__button");
        newButton.addClickListener(e -> reviewForm.open(new Review(),
                AbstractEditorDialog.Operation.ADD));
        /*
            This is a fall-back method:
            '+' is not a event.code (DOM events), so as a fall-back shortcuts
            will perform a character-based comparison. Since Key.ADD changes
            locations frequently based on the keyboard language, we opted to use
            a character instead.
         */
        newButton.addClickShortcut(Key.of("+"));

        viewToolbar.add(searchField, newButton);
        add(viewToolbar);
    }

    public void saveUpdate(Review review,
                           AbstractEditorDialog.Operation operation) {
        ReviewService.getInstance().saveReview(review);
        updateView();
        Notification.show(
                "Beverage successfully " + operation.getNameInText() + "ed.",
                3000, Position.BOTTOM_START)
                .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }

    public void deleteUpdate(Review review) {
        ReviewService.getInstance().deleteReview(review);
        updateView();
        Notification.show("Beverage successfully deleted.", 3000,
                Position.BOTTOM_START)
                .addThemeVariants(NotificationVariant.LUMO_CONTRAST);
    }

   /* private void updateList() {
        List<Review> reviews = ReviewService.getInstance().findReviews(searchField.getValue());
        if (search.isEmpty()) {
          //  header.setText("Reviews");
            //header.add(new Span(reviews.size() + " in total"));
        } else {
            //header.setText("Search for “" + search.getValue() + "”");
            if (!reviews.isEmpty()) {
                //header.add(new Span(reviews.size() + " results"));
            }
        }
        getModel().setReviews(reviews);
    }*/

    private void addContent() {
        VerticalLayout container = new VerticalLayout();
        container.setClassName("view-container");
        container.setAlignItems(FlexComponent.Alignment.STRETCH);

        grid.addColumn(Review::getName).setHeader("Name").setWidth("8em").setResizable(true);
        grid.addColumn(review -> review.getCategory().getName()).setHeader("Categoria").setWidth("8em");
        grid.addColumn(Review::getDate).setHeader("Last Update").setWidth("6em");
        grid.addColumn(new ComponentRenderer<>(this::createEditButton)).setFlexGrow(0);
        grid.setSelectionMode(Grid.SelectionMode.NONE);
        grid.setPageSize(5);
        grid.setPaginatorSize(5);

        container.add(grid);
        add(container);
    }


    private Button createEditButton(Review review) {
        Button edit = new Button("Edit", event -> reviewForm.open(review, AbstractEditorDialog.Operation.EDIT));
        edit.setIcon(new Icon("lumo", "edit"));
        edit.addClassName("review__edit");
        edit.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        return edit;
    }

    private void updateView() {
        List<Review> reviews = ReviewService.getInstance().findReviews(searchField.getValue());

        grid.setItems(reviews);

        if (searchField.getValue().length() > 0) {
            header.setText("Search for “" + searchField.getValue() + "”");
        } else {
            header.setText("Reviews");
        }
    }


    @EventHandler
    private void edit(@ModelItem Review review) {
        openForm(review, AbstractEditorDialog.Operation.EDIT);
    }

    private void openForm(Review review,
                          AbstractEditorDialog.Operation operation) {
        // Add the form lazily as the UI is not yet initialized when
        // this view is constructed
        if (reviewForm.getElement().getParent() == null) {
            getUI().ifPresent(ui -> ui.add(reviewForm));
        }
        reviewForm.open(review, operation);
    }

}
