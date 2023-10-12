import { LoadingDialog } from "dattatable";
import { Components, ContextInfo } from "gd-sprest-bs";
import { infoSquare } from "gd-sprest-bs/build/icons/svgs/infoSquare";
import { App } from "./app";
import { Configuration } from "./cfg";
import { DataSource } from "./ds";
import { Log } from "./log";
import Strings, { setContext } from "./strings";

// Styling
import "./styles.scss";

// App Properties
interface IAppProps {
    el: HTMLElement;
    context?: any;
    envType?: number;
    displayMode?: number;
    layout?: string;
    log?: any;
    justify?: string;
    viewName?: string;
    listName?: string;
    sourceUrl?: string;
}

// Create the global variable for this solution
const GlobalVariable = {
    App: null,
    Configuration,
    description: Strings.ProjectDescription,
    render: (props: IAppProps) => {
        // Clear the element
        while (props.el.firstChild) { props.el.removeChild(props.el.firstChild); }

        // See if the page context exists
        if (props.context) {
            // Set the context
            setContext(props.context, props.envType, props.sourceUrl);

            // Update the configuration
            Configuration.setWebUrl(props.sourceUrl || ContextInfo.webServerRelativeUrl);

            // See if the list name is set
            if (props.listName) {
                // Update the configuration
                Strings.Lists.IconLinks = props.listName;
                Configuration._configuration.ListCfg[0].ListInformation.Title = props.listName;
            }

            // See if the log is set
            if (props.log) {
                // Initialize the log
                Log.init(props.log, props.context.serviceScope);
            }
        }

        // Log
        Log.Information("Initializing the application.");

        // Initialize the data source
        let ds = new DataSource();
        ds.init(props.viewName).then(
            // Success
            () => {
                // See if the app exists
                if (GlobalVariable.App) {
                    // Log
                    Log.Information("Refreshing the application.");

                    // Refresh the application
                    GlobalVariable.App.refresh(props.displayMode, props.layout, props.justify);
                } else {
                    // Log
                    Log.Information("Creating the application.");

                    // Create the application
                    GlobalVariable.App = new App(props.el, ds, props.displayMode, props.layout, props.justify);
                }
            },

            // Error
            () => {
                let installFl = false;

                // Render a button to install the solution
                let btn = Components.Button({
                    el: props.el,
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

                        // Show a loading dialog
                        LoadingDialog.setHeader("Creating the List");
                        LoadingDialog.setBody("This dialog will close after the list is created...");
                        LoadingDialog.show();

                        // Install the solution
                        Configuration.install().then(() => {
                            // Set the flag
                            installFl = true;

                            // Update the button
                            btn.setText("Refresh");

                            // Enable the button
                            btn.enable();

                            // Hide the dialog
                            LoadingDialog.hide();
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
    new GlobalVariable.render({ el: elApp });
}