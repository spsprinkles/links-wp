import { ContextInfo } from "gd-sprest";
import { App } from "./app";
import { Configuration } from "./cfg";
import { DataSource } from "./ds";
import Strings, { setContext } from "./strings";

// Styling
import "./styles.scss";

// Create the global variable for this solution
const GlobalVariable = {
    Configuration,
    render: (el: HTMLElement, context?, sourceUrl?: string) => {
        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context, sourceUrl);

            // Update the configuration
            Configuration.setWebUrl(sourceUrl || ContextInfo.webServerRelativeUrl);
        }

        // Initialize the application
        DataSource.init().then(
            // Success
            () => {
                // Create the application
                new App(el);
            },

            // Error
            () => {
                let installFl = false;

                // Render a button to install the solution
                let btn = document.createElement("button");
                el.appendChild(btn);
                btn.textContent = "Install App";
                btn.addEventListener("click", () => {
                    if (installFl) {
                        // Refresh the page
                        window.location.reload();
                    }

                    // Disable the button
                    btn.disabled = true;

                    // Install the solution
                    Configuration.install().then(() => {
                        // Set the flag
                        installFl = true;

                        // Update the button
                        btn.textContent = "Refresh";
                        btn.disabled = false;
                    });
                });
            }
        );
    }
};

// Make is available in the DOM
window[Strings.GlobalVariable] = GlobalVariable;

// Get the element and render the app if it is found
let elApp = document.querySelector("#" + Strings.AppElementId) as HTMLElement;
if (elApp) {
    // Render the application
    GlobalVariable.render(elApp);
}