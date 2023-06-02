import { Dashboard, Modal } from "dattatable";
import { Components } from "gd-sprest-bs";
import { appIndicator } from "gd-sprest-bs/build/icons/svgs/appIndicator";
import { plusSquare } from "gd-sprest-bs/build/icons/svgs/plusSquare";
import * as jQuery from "jquery";
import { DataSource, ILinkItem } from "./ds";
import { Forms } from "./forms";
import Strings from "./strings";

/**
 * Datatable
 */
export class Datatable {
    private _dashboard: Dashboard = null;
    private _ds: DataSource = null;
    private _onUpdate: () => void = null;

    // Constructor
    constructor(ds: DataSource, onUpdate: () => void) {
        // Save the properties
        this._ds = ds;
        this._onUpdate = onUpdate;

        // Render the datatable
        this.render();
    }

    // Renders the datatable
    private render() {
        // Render the modal
        this.renderModal();
    }

    // Renders the modal
    private renderModal() {
        // See if the dashboard exists
        if (this._dashboard) { return; }

        // Clear the modal
        Modal.clear();

        // Set the size
        Modal.setType(Components.ModalTypes.Full);

        // Render the dashboard
        this._dashboard = new Dashboard({
            el: Modal.BodyElement,
            hideHeader: true,
            hideFooter: true,
            useModal: false,
            navigation: {
                searchPlaceholder: "Find an Icon",
                showFilter: false,
                onRendering: props => {
                    // Set the class names
                    props.className = "bg-sharepoint navbar-expand rounded-top";

                    // Set the brand
                    let brand = document.createElement("div");
                    brand.className = "d-flex";
                    brand.appendChild(appIndicator());
                    brand.append(Strings.ProjectName);
                    brand.querySelector("svg").classList.add("me-75");
                    props.brand = brand;
                },
                // Adjust the brand alignment
                onRendered: (el) => {
                    el.querySelector("nav div.container-fluid").classList.add("ps-3");
                    el.querySelector("nav div.container-fluid a.navbar-brand").classList.add("pe-none");
                },
                items: [
                    {
                        className: "",
                        text: "Add an Icon",
                        onRender: (el, item) => {
                            // Clear the existing button
                            while (el.firstChild) { el.removeChild(el.firstChild); }

                            // Create a span to wrap the icon in
                            let span = document.createElement("span");
                            span.className = "bg-white d-inline-flex ms-2 rounded";
                            el.appendChild(span);

                            // Render a tooltip
                            Components.Tooltip({
                                el: span,
                                content: "Click to add a new icon.",
                                btnProps: {
                                    // Render the icon button
                                    className: "p-1 pe-2",
                                    iconClassName: "me-1",
                                    iconType: plusSquare,
                                    iconSize: 24,
                                    isSmall: true,
                                    text: "Add",
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    onClick: () => {
                                        // Show the new form
                                        Forms.new(this._ds, () => {
                                            // Refresh the dashboard
                                            this._dashboard.refresh(this._ds.LinksList.Items);

                                            // Call the update event
                                            this._onUpdate();
                                        });
                                    }
                                },
                            });
                        }
                    }
                ]
            },
            table: {
                rows: this._ds.LinksList.Items,
                dtProps: {
                    dom: 'rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
                    columnDefs: [
                        {
                            "targets": 6,
                            "orderable": false,
                            "searchable": false
                        }
                    ],
                    createdRow: function (row, data, index) {
                        jQuery('td', row).addClass('align-middle');
                    },
                    drawCallback: function (settings) {
                        let api = new jQuery.fn.dataTable.Api(settings) as any;
                        jQuery(api.context[0].nTable).removeClass('no-footer');
                        jQuery(api.context[0].nTable).addClass('tbl-footer');
                        jQuery(api.context[0].nTable).addClass('table-striped');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_info').addClass('text-center');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_length').addClass('pt-2');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_paginate').addClass('pt-03');
                    },
                    headerCallback: function (thead, data, start, end, display) {
                        jQuery('th', thead).addClass('align-middle');
                    },
                    // Order by the 1st column by default; ascending
                    order: [[1, "asc"]]
                },
                columns: [
                    {
                        name: "LinkIcon",
                        title: "Icon"
                    },
                    {
                        name: "LinkOrder",
                        title: "Order"
                    },
                    {
                        name: "Title",
                        title: "Title"
                    },
                    {
                        name: "LinkTooltip",
                        title: "Tooltip"
                    },
                    {
                        name: "LinkUrl",
                        title: "URL"
                    },
                    {
                        name: "OpenInNewTab",
                        title: "Open in New Tab?"
                    },
                    {
                        name: "",
                        title: "",
                        onRenderCell: (el, col, item: ILinkItem) => {
                            // Render the edit button
                            Components.Tooltip({
                                el,
                                content: "Click to edit the item.",
                                btnProps: {
                                    isSmall: true,
                                    text: "Edit",
                                    type: Components.ButtonTypes.OutlineSuccess,
                                    onClick: () => {
                                        // Show the edit form
                                        Forms.edit(item.Id, this._ds, () => {
                                            // Refresh the dashboard
                                            this._dashboard.refresh(this._ds.LinksList.Items);

                                            // Call the update event
                                            this._onUpdate();
                                        });
                                    }
                                }
                            });
                        }
                    }
                ]
            }
        });
    }

    // Shows the datatable
    show() {
        // Show the datatable
        Modal.show();
    }
}