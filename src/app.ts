import { Components, ContextInfo, Helper, SPTypes } from "gd-sprest-bs";
import { infoSquare } from "gd-sprest-bs/build/icons/svgs/infoSquare";
import { Datatable } from "./datatable";
import { DataSource } from "./ds";
import { Link } from "./link";
import Strings from "./strings";

/**
 * Main Application
 */
export class App {
    private _ds: DataSource = null;
    private _dt: Datatable = null;
    private _el: HTMLElement = null;

    // Constructor
    constructor(el: HTMLElement, ds: DataSource, displayMode: number, justify: string) {
        // Save the properties
        this._ds = ds;
        this._el = el;

        // Render the component
        this.render(displayMode, justify);
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

    // Renders the component
    private render(displayMode: number, justify: string) {
        // See if we are editing the page
        if (this.isInEditMode(displayMode)) {
            // Create the datatable if it doesn't exist
            this._dt = this._dt || new Datatable(this._ds, () => {
                // Clear the element
                while (this._el.firstChild) { this._el.removeChild(this._el.firstChild); }

                // Render the component
                this.render(displayMode, justify);
            });

            // See if we are in classic mode
            if (Strings.IsClassic) {
                // Render the edit button
                this.renderEdit();
            }
        }

        // Ensure links exist
        if (this._ds.LinksList.Items.length > 0) {
            // Create the main element
            let elWP = document.createElement("div");
            elWP.classList.add("d-flex");
            elWP.classList.add("flex-wrap");
            justify ? elWP.classList.add(justify) : null;
            elWP.classList.add("row");
            this._el.appendChild(elWP);

            // Render the dashboard
            this.renderIcons(elWP);

            // Update the theme
            this.updateTheme();
        } else {
            if (!Strings.IsClassic) {
                // Render the edit button
                this.renderEdit();
            }
        }
    }

    // Renders the icons
    private renderIcons(el: HTMLElement) {
        // Parse the links
        for (let i = 0; i < this._ds.LinksList.Items.length; i++) {
            // Render the link
            new Link(el, this._ds.LinksList.Items[i]);
        }
    }

    // Render the edit information
    private renderEdit() {
        // Render a button to Edit Icon Links
        let btn = Components.Button({
            el: this._el,
            className: "ms-1 my-1",
            iconClassName: "edit-btn-img",
            iconSize: 22,
            iconType: infoSquare,
            isSmall: true,
            text: "Edit Icon Links",
            type: Components.ButtonTypes.OutlinePrimary,
            onClick: () => {
                // Show the datatable
                this._dt.show();
            }
        });
        btn.el.classList.remove("btn-icon");
    }

    // Shows the datatable
    showDatatable() {
        // Show the datatable
        this._dt.show();
    }

    // Updates the styling, based on the theme
    updateTheme(themeInfo?: any) {
        // Get the theme colors
        let bgColor = (themeInfo || ContextInfo.theme).primaryButtonBackground || this._ds.getThemeColor("NavigationSelectedBackground");
        let bgHover = (themeInfo || ContextInfo.theme).primaryButtonBackgroundHovered || this._ds.getThemeColor("NavigationHoverBackground");
        let bgActive = (themeInfo || ContextInfo.theme).primaryButtonBackgroundPressed || this._ds.getThemeColor("NavigationPressed");
        let textColor = (themeInfo || ContextInfo.theme).primaryButtonText || this._ds.getThemeColor("Navigation");

        // Set the CSS properties to the theme colors
        let root = document.querySelector(':root') as HTMLElement;
        root.style.setProperty('--sp-btn-bg', bgColor);
        root.style.setProperty('--sp-btn-bg-hover', bgHover);
        root.style.setProperty('--sp-btn-bg-active', bgActive);
        root.style.setProperty('--sp-btn-text', textColor);
    }
}