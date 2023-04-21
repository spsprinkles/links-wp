import { ContextInfo, Site, Types, Web } from "gd-sprest";
import Strings from "./strings";

/**
 * Link Item
 * The link item information
 */
export interface ILinkItem extends Types.SP.ListItem {
    LinkIcon: string;
    LinkOrder: number;
    LinkUrl: string;
}

/**
 * Data Source
 */
export class DataSource {
    // List Items
    private static _links: ILinkItem[] = null;
    static get Links(): ILinkItem[] { return this._links; }

    // Theme Information
    private static _themeInfo: { [name: string]: string };
    static getThemeColor(name: string) { return ContextInfo.theme.accent ? ContextInfo.theme[name] : this._themeInfo[name]; }

    // Initializes the application
    static init() {
        // Initialize the solution
        return Promise.all([
            this.initLinks(),
            this.initTheme()
        ]);
    }

    // Initializes the links
    private static initLinks(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the list items
            Web(Strings.SourceUrl).Lists(Strings.Lists.Links).Items().query({
                GetAllItems: true,
                OrderBy: ["LinkOrder"],
                Top: 5000
            }).execute(items => {
                // Set the items
                this._links = items.results as any;

                // Resolve the request
                resolve();
            }, reject);
        });
    }

    // Intializes the theme information
    static initTheme(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if this is a modern page, do nothing if that is the case
            if (document.getElementById("s4-workspace") == null) { resolve(); return; }

            // Get the current theme
            Web().Lists("Composed Looks").Items().query({
                Filter: "DisplayOrder eq 0 or Title eq 'Office'",
                OrderBy: ["DisplayOrder"],
                Select: ["MasterPageUrl", "ThemeUrl"]
            }).execute(
                items => {
                    let currentItem = items.results[0];
                    let defaultItem = items.results[1];

                    // See if the current selection has a theme url set
                    if (currentItem && currentItem["ThemeUrl"]) {
                        // Get the theme information
                        this.readTheme(currentItem["ThemeUrl"].Url).then(resolve, reject);
                    }
                    // Else, use the default theme
                    else if (defaultItem && defaultItem["ThemeUrl"]) {
                        // Get the theme information
                        this.readTheme(defaultItem["ThemeUrl"].Url).then(resolve, reject);
                    } else {
                        // Unable to determine the theme, resolve the request
                        resolve();
                    }
                }
            );
        });
    }

    // Reads the theme information from SharePoint
    private static readTheme(url: string = "") {
        // Clear the theme information
        this._themeInfo = {};

        // Return a promise
        return new Promise((resolve) => {
            // Ensure the url exists
            if (url.length == 0) { resolve(null); return; }

            // Get the file
            Site().RootWeb().getFileByUrl(url).execute(file => {
                // Get the contents
                file.content().execute(content => {
                    // Convert the content to text
                    let xml = String.fromCharCode.apply(null, new Uint8Array(content));

                    // Read the xml
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(xml, "text/xml");

                    // Read the colors
                    let colors = xmlDoc.getElementsByTagName("s:color");
                    for (let i = 0; i < colors.length; i++) {
                        let color = colors[i];

                        // Update
                        this._themeInfo[color.getAttribute("name")] = "#" + color.getAttribute("value");
                    }

                    // Resolve the request
                    resolve(null);
                }, resolve);
            }, resolve);
        });
    }
}