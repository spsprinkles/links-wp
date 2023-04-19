import { Types, Web } from "gd-sprest";
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

    // Initializes the application
    static init(): PromiseLike<void> {
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
}