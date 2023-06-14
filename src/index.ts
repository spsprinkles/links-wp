import { Components, ContextInfo } from "gd-sprest-bs";
import { infoSquare } from "gd-sprest-bs/build/icons/svgs/infoSquare";
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
    description: Strings.ProjectDescription,
    render: (el: HTMLElement, context?, envType?: number, displayMode?: number, justify?: string, viewName?: string, listName?: string, sourceUrl?: string) => {
        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context, envType, sourceUrl);

            // Update the configuration
            Configuration.setWebUrl(sourceUrl || ContextInfo.webServerRelativeUrl);

            // See if the list name is set
            if (listName) {
                // Update the configuration
                Strings.Lists.IconLinks = listName;
                Configuration._configuration.ListCfg[0].ListInformation.Title = listName;
            }
        }

        // Initialize the data source
        let ds = new DataSource();
        ds.init(viewName).then(
            // Success
            () => {
                // Create the application
                GlobalVariable.App = new App(el, ds, displayMode, justify);
            },

            // Error
            () => {
                let installFl = false;

                // Render a button to install the solution
                let btn = Components.Button({
                    el,
                    className: "ms-1 my-1",
                    iconClassName: "btn-img",
                    iconSize: 22,
                    iconType: infoSquare,
                    isSmall: true,
                    text: "Install Icon Links",
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
                btn.el.classList.remove("btn-icon");
            }
        );
    },
    updateTheme: (themeInfo) => {
        GlobalVariable.App ? GlobalVariable.App.updateTheme(themeInfo) : null;
    },
    version: Strings.Version,
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