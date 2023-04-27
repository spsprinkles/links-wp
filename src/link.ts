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
                <a class="link-icon" href="#">
                    ${svgIcon.outerHTML}
                    <div class="link-text">${link.Title}</div>
                </a>
            </div>`;

            // Create the element
            el = document.createElement("div");
            el.innerHTML = html;

            // Set the link click event
            let elLink = el.querySelector("a");
            elLink.addEventListener("click", () => {
                // Display the link in a new window
                window.open(link.LinkUrl, "_blank");
            });

            // See if a tooltip exists
            if(link.LinkTooltip) {
                
            }

            // Return the element
            return el.querySelector(".col");
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