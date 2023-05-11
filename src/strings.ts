import { ContextInfo } from "gd-sprest-bs";

// Sets the context information
// This is for SPFx or Teams solutions
export const setContext = (context, sourceUrl?: string) => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Update the source url
    Strings.SourceUrl = sourceUrl || ContextInfo.webServerRelativeUrl;
}

/**
 * Global Constants
 */
const Strings = {
    AppElementId: "links-wp",
    GlobalVariable: "LinksWP",
    Lists: {
        IconLinks: "Icon Links"
    },
    ProjectName: "Links WebPart",
    ProjectDescription: "Displays icon links from a list.",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    Version: "0.0.1"
};
export default Strings;