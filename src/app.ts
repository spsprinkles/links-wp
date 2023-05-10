import { Components, ContextInfo, Helper, SPTypes } from "gd-sprest-bs";
import { DataSource } from "./ds";
import { Link } from "./link";
import Strings from "./strings";

/**
 * Main Application
 */
export class App {
    private _el: HTMLElement = null;

    // Constructor
    constructor(el: HTMLElement, displayMode: number) {
        // Save the element
        this._el = el;

        // See if we are editing the page
        if (this.isInEditMode(displayMode)) {
            // Render the dashboard
            this.renderEdit();
        }

        // Ensure links exist
        if (DataSource.LinksList.Items.length > 0) {
            // Create the main element
            let elWP = document.createElement("div");
            elWP.classList.add("links-wp");
            elWP.classList.add("row");
            this._el.appendChild(elWP);

            // Render the dashboard
            this.render(elWP);

            // Update the theme
            this.updateTheme();
        }
    }

    // Returns true if the page is in edit mode
    private isInEditMode(displayMode: number) {
        // See if the display mode is set
        if (typeof (displayMode) === "number") {
            // See if the page is being edited
            return displayMode == SPTypes.DisplayMode.Edit;
        } else {
            // See if this classic page is in edit mode
            return Helper.WebPart.isEditMode();
        }
    }

    // Renders the dashboard
    private render(el: HTMLElement) {
        // Parse the links
        for (let i = 0; i < DataSource.LinksList.Items.length; i++) {
            // Render the link
            new Link(el, DataSource.LinksList.Items[i]);
        }
    }

    // Render the edit information
    private renderEdit() {
        // Render a link to the list
        Components.Button({
            el: this._el,
            className: "link-to-list",
            text: "Link to List",
            type: Components.ButtonTypes.OutlinePrimary,
            onClick: () => {
                // Open the link in a new window
                window.open(Strings.SourceUrl + "/lists/" + Strings.Lists.Links, "_blank");
            }
        });
    }

    // Updates the styling, based on the theme
    updateTheme(themeInfo?:any) {
        // Get the theme colors
        let backgroundColor = (themeInfo || ContextInfo.theme).primaryButtonBackground || DataSource.getThemeColor("ButtonBackground");
        let iconColor = (themeInfo || ContextInfo.theme).primaryButtonText || DataSource.getThemeColor("ButtonText");
        let textColor = (themeInfo || ContextInfo.theme).primaryButtonText || DataSource.getThemeColor("ButtonText");

        // Set the link button
        let elButton: HTMLElement = this._el.querySelector(".link-to-list");
        if (elButton) {
            elButton.style.backgroundColor = backgroundColor;
            elButton.style.borderColor = textColor;
            elButton.style.color = textColor;
        }

        // Get the column elements
        let columns = this._el.querySelectorAll(".col");
        for (let i = 0; i < columns.length; i++) {
            let column = columns[i];

            // Set the icon background color
            let elIcon = column.querySelector(".link-icon") as HTMLElement;
            elIcon.style.backgroundColor = backgroundColor;

            // Set the icon color
            let elIconSvg = column.querySelector("svg path") as HTMLElement;
            elIconSvg.style.fill = iconColor;

            // Set the text color
            let elText = column.querySelector(".link-text") as HTMLElement;
            elText.style.color = textColor;
        }
    }
}