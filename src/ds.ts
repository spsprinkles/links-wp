import { List } from "dattatable";
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
    OpenInNewTab?: boolean;
}

/**
 * Data Source
 */
export class DataSource {
    // Theme Information
    private static _themeInfo: { [name: string]: string };
    static getThemeColor(name: string) { return ContextInfo.theme.accent ? ContextInfo.theme[name] : this._themeInfo[name]; }

    // Initializes the application
    static init(viewName?: string) {
        // Initialize the solution
        return Promise.all([
            this.initLinksList(viewName),
            this.initTheme()
        ]);
    }

    // Links list
    private static _linksList: List<ILinkItem> = null;
    static get LinksList(): List<ILinkItem> { return this._linksList; }
    private static initLinksList(viewName?: string): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Create the list instance
            this._linksList = new List({
                listName: Strings.Lists.IconLinks,
                viewName: viewName || "All Items",
                webUrl: Strings.SourceUrl,
                onInitError: reject,
                onInitialized: resolve
            })
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