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
        if (DataSource.Links && DataSource.Links.length > 0) {
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
        for (let i = 0; i < DataSource.Links.length; i++) {
            // Render the link
            new Link(el, DataSource.Links[i]);
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

    // Convert hex values from aRGB to RGBa
    private aRGB2RGBa(hex:string): string {
        if (hex.length > 7) {
            return "#"+hex.slice(3,9)+hex[1]+hex[2];
        }
        else return hex;
    }

    // Updates the styling, based on the theme
    updateTheme(themeInfo?:any) {
        // Get the theme colors
        let bgColor = (themeInfo || ContextInfo.theme).primaryButtonBackground || this.aRGB2RGBa(DataSource.getThemeColor("NavigationSelectedBackground"));
        let bgHover = (themeInfo || ContextInfo.theme).primaryButtonBackgroundHovered || this.aRGB2RGBa(DataSource.getThemeColor("NavigationHoverBackground"));
        let bgActive = (themeInfo || ContextInfo.theme).primaryButtonBackgroundPressed || this.aRGB2RGBa(DataSource.getThemeColor("NavigationPressed"));
        let textColor = (themeInfo || ContextInfo.theme).primaryButtonText || this.aRGB2RGBa(DataSource.getThemeColor("Navigation"));

        // Set the CSS properties to the theme colors
        let root = document.querySelector(':root') as HTMLElement;
        root.style.setProperty('--sp-btn-bg', bgColor);
        root.style.setProperty('--sp-btn-bg-hover', bgHover);
        root.style.setProperty('--sp-btn-bg-active', bgActive);
        root.style.setProperty('--sp-btn-text', textColor);
    }
}