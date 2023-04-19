import { Helper, SPTypes } from "gd-sprest";
import Strings from "./strings";

/**
 * SharePoint Assets
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        {
            ListInformation: {
                Title: Strings.Lists.Links,
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
                } as Helper.IFieldInfoNote
            ],
            ViewInformation: [
                {
                    ViewName: "All Items",
                    ViewFields: [
                        "LinkTitle", "LinkUrl", "LinkIcon"
                    ]
                }
            ]
        }
    ]
});