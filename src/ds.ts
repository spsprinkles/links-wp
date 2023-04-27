import { ContextInfo, Helper, Types, Web } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * Link Item
 * The link item information
 */
export interface ILinkItem extends Types.SP.ListItem {
    LinkIcon: string;
    LinkOrder: number;
    LinkTooltip?: string;
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
        // Clear the theme
        this._themeInfo = {};

        // Return a promise
        return new Promise((resolve) => {
            Helper.getCurrentTheme().then(themeInfo => {
                // Set the theme info
                this._themeInfo = themeInfo;
                resolve();
            }, resolve);
        });
    }
}