import { Helper, SPTypes } from "gd-sprest";
import { DataSource, ILinkItem } from "./ds";
import Strings from "./strings";

/**
 * Main Application
 */
export class App {
    // Constructor
    constructor(el: HTMLElement, displayMode: number) {
        // See if we are editing the page
        if (this.isInEditMode(displayMode)) {
            // Render the dashboard
            this.renderEdit(el);
        }

        // Ensure links exist
        if (DataSource.Links && DataSource.Links.length > 0) {
            // Create the main element
            let elWP = document.createElement("div");
            elWP.classList.add("links-wp");
            el.appendChild(elWP);

            // Render the dashboard
            this.render(elWP);
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
            this.renderLink(el, DataSource.Links[i]);
        }
    }

    // Render the edit information
    private renderEdit(el: HTMLElement) {
        // Render a link to the list
        let btn = document.createElement("button");
        el.appendChild(btn);
        btn.textContent = "Link to List";
        btn.addEventListener("click", () => {
            // Open the link in a new window
            window.open(Strings.SourceUrl + "/lists/" + Strings.Lists.Links, "_blank");
        });
    }

    // Renders the link
    private renderLink(el: HTMLElement, link: ILinkItem) {
        // Read the icon
        let elIcon = document.createElement("div");
        elIcon.innerHTML = link.LinkIcon;

        // Ensure a svg icon exists
        let svgIcon = elIcon.querySelector("svg");
        if (svgIcon) {
            // Render the icon
            let elLink = document.createElement("a");
            el.appendChild(elLink);
            elLink.classList.add("link-icon");
            elLink.href = "#";
            elLink.addEventListener("click", () => {
                // Display the link in a new window
                window.open(link.LinkUrl, "_blank");
            });

            // Add the icon
            elLink.appendChild(svgIcon);

            // Get the path element
            let elSvgPath = svgIcon.querySelector("path");
            if (elSvgPath) {
                // Clear the color
                elSvgPath.removeAttribute("fill");
            }

            // Add the text
            let elText = document.createElement("div");
            elLink.appendChild(elText);
            elText.classList.add("link-text");
            elText.innerHTML = link.Title;
        }
    }
}