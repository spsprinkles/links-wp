import { List } from "dattatable";
import { ContextInfo, Helper, Types } from "gd-sprest-bs";
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
    private _themeInfo: { [name: string]: string };
    getThemeColor(name: string) { return ContextInfo.theme.accent ? ContextInfo.theme[name] : this._themeInfo[name]; }

    // Initializes the application
    init(viewName?: string) {
        // Initialize the solution
        return Promise.all([
            this.initLinksList(viewName),
            this.initTheme()
        ]);
    }

    // Links list
    private _linksList: List<ILinkItem> = null;
    get LinksList(): List<ILinkItem> { return this._linksList; }
    private initLinksList(viewName?: string): PromiseLike<void> {
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
    initTheme(): PromiseLike<void> {
        // Clear the theme
        this._themeInfo = {};

        // Return a promise
        return new Promise((resolve) => {
            // Load the modern/classic theme information
            Helper.getCurrentTheme().then(themeInfo => {
                // Set the theme info
                this._themeInfo = themeInfo;

                // Resolve the request
                resolve();
            }, resolve);
        });
    }
}