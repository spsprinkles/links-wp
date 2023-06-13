import { Components } from "gd-sprest-bs";
import { ILinkItem } from "./ds";

/**
 * Link
 */
export class Link {
    // Constructor
    constructor(el: HTMLElement, link: ILinkItem) {
        // Render the link
        this.render(el, link);
    }

    // Generates the base html
    private generateElement(link: ILinkItem) {
        let el: HTMLElement = null;

        // Read the icon
        let elIcon = document.createElement("div");
        elIcon.innerHTML = link.LinkIcon;

        // Ensure a svg icon exists
        let svgIcon = elIcon.querySelector("svg");
        if (svgIcon) {
            // Get the path element
            let elSvgPath = svgIcon.querySelector("path");
            if (elSvgPath) {
                // Clear the color
                elSvgPath.removeAttribute("fill");
            }

            // Generate the html
            let html = `<div class="col">
                <a class="link-icon" href="${link.LinkUrl || "#"}" target="${link.OpenInNewTab ? "_blank" : "_self"}" aria-label="${link.LinkTooltip || link.Title}">
                    ${svgIcon.outerHTML}
                    <div class="link-text">${link.Title}</div>
                </a>
            </div>`;

            // Create the element
            el = document.createElement("div");
            el.innerHTML = html;

            // See if a tooltip exists
            let elCol = el.querySelector(".col");
            if (link.LinkTooltip) {
                // Render the tooltip
                Components.Tooltip({
                    content: link.LinkTooltip,
                    target: elCol
                })
            }

            // Return the element
            return elCol;
        }
    }

    // Renders the link
    private render(el: HTMLElement, link: ILinkItem) {
        // Generate the element
        let elLink = this.generateElement(link);
        if (elLink) {
            el.appendChild(elLink);
        }
    }
}