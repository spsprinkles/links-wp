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
    AppElementId: "icon-links",
    GlobalVariable: "LinksWP",
    Lists: {
        IconLinks: "Icon Links"
    },
    ProjectName: "Links WebPart",
    ProjectDescription: "Similar to the quick links, but stores the data in a single list so you can reuse the same links across multiple pages/sites.",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    Version: "0.0.2"
};
export default Strings;