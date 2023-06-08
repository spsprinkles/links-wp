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
    render: (el: HTMLElement, context?, envType?: number, displayMode?: number, viewName?: string, sourceUrl?: string) => {
        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context, envType, sourceUrl);

            // Update the configuration
            Configuration.setWebUrl(sourceUrl || ContextInfo.webServerRelativeUrl);
        }

        // Initialize the data source
        let ds = new DataSource();
        ds.init(viewName).then(
            // Success
            () => {
                // Create the application
                GlobalVariable.App = new App(el, ds, displayMode);
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
    updateTheme: (themeInfo) => {
        GlobalVariable.App ? GlobalVariable.App.updateTheme(themeInfo) : null;
    },
    viewList: () => {
        GlobalVariable.App ? GlobalVariable.App.showDatatable() : null;
    }
};

// Make is available in the DOM
window[Strings.GlobalVariable] = GlobalVariable;

// Get the element and render the app if it is found
let elApp = document.querySelector("#" + Strings.AppElementId) as HTMLElement;
if (elApp) {
    // Render the application
    new GlobalVariable.render(elApp);
}