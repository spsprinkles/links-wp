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
                    description: "The contents within an SVG icon file.&lt;br/&gt;Free SVG icons: &lt;a href='https://icons.getbootstrap.com' target='_blank'&gt;Bootstrap Icons&lt;/a&gt;, &lt;a href='https://www.flicon.io' target='_blank'&gt;Flicon&lt;/a&gt;, &lt;a href='https://fluenticons.co' target='_blank'&gt;Fluent Icons&lt;/a&gt;",
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