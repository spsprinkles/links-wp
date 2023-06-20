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
            // Clear the container color
            svgIcon.removeAttribute("fill");
            // Clear the height
            svgIcon.removeAttribute("height");
            // Clear the width
            svgIcon.removeAttribute("width");
            // Hide icon from assistive technologies
            svgIcon.setAttribute("aria-hidden", "true");
            // Get the path elements
            svgIcon.querySelectorAll("path").forEach(el => {
                // Clear the color
                el.removeAttribute("fill");
            });

            // Generate the html
            let html = `<div class="col">
                <a href="${link.LinkUrl || "#"}" aria-label="${link.LinkTooltip || link.Title}" target="${link.OpenInNewTab ? "_blank" : "_self"}">
                    ${svgIcon.outerHTML}
                    <div class="icon-text">${link.Title}</div>
                </a>
            </div>`;

            // Create the element
            el = document.createElement("div");
            el.innerHTML = html;
            
            // Add square icon class
            el.querySelector("a").classList.add("icon-sqre");

            // See if a tooltip exists
            let elCol = el.querySelector(".col");
            if (link.LinkTooltip) {
                // Render the tooltip
                Components.Tooltip({
                    content: link.LinkTooltip,
                    target: elCol,
                    options: {
                        offset: [0, 5],
                        theme: "sharepoint"
                    }
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