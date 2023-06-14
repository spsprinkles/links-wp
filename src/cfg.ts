import { Helper, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * SharePoint Assets
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        {
            ListInformation: {
                Title: Strings.Lists.IconLinks,
                BaseTemplate: SPTypes.ListTemplateType.GenericList
            },
            CustomFields: [
                {
                    name: "LinkOrder",
                    title: "Order",
                    type: Helper.SPCfgFieldType.Number,
                    required: true,
                    defaultValue: "0",
                    numberType: SPTypes.FieldNumberType.Integer,
                    min: 0
                } as Helper.IFieldInfoNumber,
                {
                    name: "LinkUrl",
                    title: "URL",
                    type: Helper.SPCfgFieldType.Text,
                    required: true
                },
                {
                    name: "LinkIcon",
                    title: "Icon",
                    description: "The svg html markup of the icon. Reference https://www.flicon.io/ for examples.",
                    type: Helper.SPCfgFieldType.Note,
                    noteType: SPTypes.FieldNoteType.TextOnly
                } as Helper.IFieldInfoNote,
                {
                    name: "LinkTooltip",
                    title: "Tooltip",
                    description: "Text to be displayed when hovering over the icon.",
                    type: Helper.SPCfgFieldType.Text
                },
                {
                    name: "OpenInNewTab",
                    title: "Open In New Tab",
                    description: "Opens the link in a new tab/window.",
                    type: Helper.SPCfgFieldType.Boolean,
                    defaultValue: "0"
                },
            ],
            ViewInformation: [
                {
                    ViewName: "All Items",
                    ViewQuery: "<OrderBy><FieldRef Name='LinkOrder' /></OrderBy>",
                    ViewFields: [
                        "LinkTitle", "LinkOrder", "LinkUrl", "LinkIcon", "LinkTooltip", "OpenInNewTab"
                    ]
                }
            ]
        }
    ]
});