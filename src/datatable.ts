import { Dashboard, Modal } from "dattatable";
import { Components } from "gd-sprest-bs";
import { infoSquare } from "gd-sprest-bs/build/icons/svgs/infoSquare";
import { pencilSquare } from "gd-sprest-bs/build/icons/svgs/pencilSquare";
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
                    props.className = "bg-sharepoint navbar-expand rounded";

                    // Set the brand
                    let brand = document.createElement("div");
                    brand.className = "d-flex";
                    brand.appendChild(infoSquare());
                    brand.append(Strings.ProjectName);
                    brand.querySelector("svg").classList.add("me-75");
                    props.brand = brand;
                },
                // Adjust the brand alignment
                onRendered: (el) => {
                    el.querySelector("nav div.container-fluid").classList.add("ps-3");
                    el.querySelector("nav div.container-fluid a.navbar-brand").classList.add("pe-none");
                },
                itemsEnd: [
                    {
                        text: "Add a new icon link",
                        onRender: (el, item) => {
                            // Clear the existing button
                            while (el.firstChild) { el.removeChild(el.firstChild); }

                            // Create a span to wrap the icon in
                            let span = document.createElement("span");
                            span.className = "bg-white d-inline-flex me-2 rounded";
                            el.appendChild(span);

                            // Render a tooltip
                            let btn = Components.Tooltip({
                                el: span,
                                content: item.text,
                                placement: Components.TooltipPlacements.Left,
                                type: Components.TooltipTypes.LightBorder,
                                btnProps: {
                                    // Render the icon button
                                    className: "icon-btn p-1 pe-2",
                                    iconClassName: "me-1",
                                    iconType: plusSquare,
                                    iconSize: 24,
                                    isSmall: true,
                                    text: "New",
                                    type: Components.ButtonTypes.Light,
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
                            btn.el.classList.remove("btn-icon");
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
                            "targets": [0, 6],
                            "orderable": false,
                            "searchable": false
                        }
                    ],
                    createdRow: function (row, data, index) {
                        jQuery('td', row).addClass('align-middle');
                    },
                    drawCallback: function (settings) {
                        let api = new jQuery.fn.dataTable.Api(settings) as any;
                        let div = api.table().container() as HTMLDivElement;
                        let table = api.table().node() as HTMLTableElement;
                        div.querySelector(".dataTables_info").classList.add("text-center");
                        div.querySelector(".dataTables_length").classList.add("pt-2");
                        div.querySelector(".dataTables_paginate").classList.add("pt-03");
                        table.classList.remove("no-footer");
                        table.classList.add("tbl-footer");
                        table.classList.add("table-striped");
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
                        title: "Icon",
                        onRenderCell: (el, col, item: ILinkItem) => {
                            let svgIcon = el.querySelector("svg");
                            if (svgIcon) {
                                // Get the path element
                                let elSvgPath = svgIcon.querySelector("path");
                                if (elSvgPath) {
                                    // Clear the color
                                    elSvgPath.removeAttribute("fill");
                                }
                                svgIcon.style.fill = "#212529";
                                svgIcon.style.height = "32px";
                                svgIcon.style.width = "32px";
                            }
                        }
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
                        title: "Open In New Tab?",
                        onRenderHeader: (el) => {
                            el.classList.add("text-nowrap");
                        },
                        onRenderCell: (el, col, item: ILinkItem) => {
                            el.innerHTML = item.OpenInNewTab ? "Yes" : "No";
                        }
                    },
                    {
                        className: "text-end",
                        isHidden: true,
                        name: "Edit",
                        onRenderCell: (el, col, item: ILinkItem) => {
                            // Create a span to wrap the icons in
                            let span = document.createElement("span");
                            span.className = "bg-white d-inline-flex ms-2 rounded text-nowrap";
                            el.appendChild(span);

                            // Render a tooltip
                            let btn = Components.Tooltip({
                                el: span,
                                content: col.name + " icon link",
                                placement: Components.TooltipPlacements.Left,
                                type: Components.TooltipTypes.LightBorder,
                                btnProps: {
                                    // Render the icon button
                                    className: "icon-btn p-1",
                                    iconClassName: "me-1",
                                    iconType: pencilSquare,
                                    iconSize: 24,
                                    isSmall: true,
                                    text: col.name,
                                    type: Components.ButtonTypes.OutlineSecondary,
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
                            btn.el.classList.remove("btn-icon");
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