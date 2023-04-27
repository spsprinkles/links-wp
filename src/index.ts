import { Components, ContextInfo } from "gd-sprest-bs";
import { App } from "./app";
import { Configuration } from "./cfg";
import { DataSource } from "./ds";
import Strings, { setContext } from "./strings";

// Styling
import "./styles.scss";

// Create the global variable for this solution
const GlobalVariable = {
    App: null,
    Configuration,
    render: (el: HTMLElement, context?, displayMode?: number, sourceUrl?: string) => {
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
                GlobalVariable.App = new App(el, displayMode);
            },

            // Error
            () => {
                let installFl = false;

                // Render a button to install the solution
                let btn = Components.Button({
                    el,
                    text: "Install App",
                    type: Components.ButtonTypes.OutlinePrimary,
                    onClick: () => {
                        if (installFl) {
                            // Refresh the page
                            window.location.reload();
                        }

                        // Disable the button
                        btn.disable();

                        // Install the solution
                        Configuration.install().then(() => {
                            // Set the flag
                            installFl = true;

                            // Update the button
                            btn.setText("Refresh");

                            // Enable the button
                            btn.enable();
                        });
                    }
                });
            }
        );
    },
    updateTheme: () => {
        GlobalVariable.App ? GlobalVariable.App.updateTheme() : null;
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