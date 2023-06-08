import { LoadingDialog } from "dattatable";
import { Components, Helper } from "gd-sprest-bs";
import { DataSource, ILinkItem } from "./ds";

// Acceptable image file types
const ImageExtensions = [
    ".apng", ".avif", ".bmp", ".cur", ".gif", ".jpg", ".jpeg", ".jfif",
    ".ico", ".pjpeg", ".pjp", ".png", ".svg", ".tif", ".tiff", ".webp"
];

/**
 * Forms
 */
export class Forms {
    // Configures the form
    private static configureForm(props: Components.IListFormEditProps): Components.IListFormEditProps {
        // Set the control rendered event
        props.onControlRendered = (ctrl, fld) => {
            // See if this is a url field
            if (fld.InternalName == "LinkIcon") {
                // Set a tooltip
                Components.Tooltip({
                    content: "Click to upload an image file.",
                    target: ctrl.textbox.elTextbox
                });

                // Make this textbox read-only
                ctrl.textbox.elTextbox.readOnly = true;

                // Set a click event
                ctrl.textbox.elTextbox.addEventListener("click", () => {
                    // Display a file upload dialog
                    Helper.ListForm.showFileDialog(["image/*"]).then(file => {
                        // Clear the value
                        ctrl.textbox.setValue("");

                        // Get the file name
                        let fileName = file.name.toLowerCase();

                        // Validate the file type
                        if (this.isImageFile(fileName)) {
                            // Show a loading dialog
                            LoadingDialog.setHeader("Reading the File");
                            LoadingDialog.setBody("This will close after the file is converted...");
                            LoadingDialog.show();

                            // Convert the file
                            let reader = new FileReader();
                            reader.onloadend = () => {
                                // Set the value
                                ctrl.textbox.setValue(reader.result as string);

                                // Close the dialog
                                LoadingDialog.hide();
                            }
                            reader.readAsDataURL(file.src);
                        } else {
                            // Display an error message
                            ctrl.updateValidation(ctrl.el, {
                                isValid: false,
                                invalidMessage: "The file must be a valid image file. Valid types: png, jpg, jpeg, gif"
                            });
                        }
                    });
                });
            }
        }

        // Return the properties
        return props;
    }

    // Displays the edit form
    static edit(itemId: number, ds: DataSource, onUpdate: () => void) {
        ds.LinksList.editForm({
            itemId,
            onCreateEditForm: props => { return this.configureForm(props); },
            onUpdate: (item: ILinkItem) => {
                // Refresh the item
                ds.LinksList.refreshItem(item.Id).then(() => {
                    // Call the update event
                    onUpdate();
                });
            }
        });
    }

    // Determines if the image extension is valid
    private static isImageFile(fileName: string): boolean {
        let isValid = false;

        // Parse the valid file extensions
        for (let i = 0; i < ImageExtensions.length; i++) {
            // See if this is a valid file extension
            if (fileName.endsWith(ImageExtensions[i])) {
                // Set the flag and break from the loop
                isValid = true;
                break;
            }
        }

        // Return the flag
        return isValid;
    }

    // Displays the new form
    static new(ds: DataSource, onUpdate: () => void) {
        ds.LinksList.newForm({
            onCreateEditForm: props => { return this.configureForm(props); },
            onUpdate: (item: ILinkItem) => {
                // Refresh the data
                ds.LinksList.refreshItem(item.Id).then(() => {
                    // Call the update event
                    onUpdate();
                });
            }
        });
    }

    // Displays the view form
    static view(item: ILinkItem, ds: DataSource) {
        ds.LinksList.viewForm({
            itemId: item.Id,
            onCreateViewForm: props => {
                // Customize the screenshots to display the image
                props.onControlRendered = (ctrl, fld) => {
                    // See if this is a url field
                    if (fld.InternalName == "LinkIcon") {
                        // Clear the element
                        while (ctrl.el.firstChild) { ctrl.el.removeChild(ctrl.el.firstChild); }

                        // Ensure a value exists
                        if (item[fld.InternalName]) {
                            // Display the image
                            let elImage = document.createElement("img");
                            elImage.src = item[fld.InternalName];
                            elImage.style.maxHeight = "250px";
                            ctrl.el.appendChild(elImage);
                        }
                    }
                }

                // Return the properties
                return props;
            }
        });
    }
}