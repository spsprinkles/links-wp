import { DisplayMode, Environment, Version } from '@microsoft/sp-core-library';
import { PropertyPaneButton, PropertyPaneChoiceGroup, IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneHorizontalRule, PropertyPaneLabel, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ISemanticColors } from '@microsoft/sp-component-base';
import * as strings from 'IconLinksWebPartStrings';

export interface IIconLinksWebPartProps {
  justify: string;
  layout: string;
  listName: string;
  viewName: string;
  webUrl: string;
}

// Import the solution
import "../../../../dist/icon-links.js";
declare const IconLinks: {
  description: string;
  render: new (el: HTMLElement, context: WebPartContext, envType: number, displayMode: DisplayMode, layout: string, justify: string, viewName: string, listName: string, sourceUrl: string) => void;
  updateTheme: (currentTheme: Partial<ISemanticColors>) => void;
  version: string;
  viewList: () => void;
}

export default class IconLinksWebPart extends BaseClientSideWebPart<IIconLinksWebPartProps> {
  private _hasRendered: boolean = false;

  public render(): void {
    // See if have rendered the solution
    if (this._hasRendered) {
      // Clear the element
      while (this.domElement.firstChild) { this.domElement.removeChild(this.domElement.firstChild); }
    }

    // Set the default property values
    if (!this.properties.justify) { this.properties.justify = strings.JustifyFieldValue; }
    if (!this.properties.listName) { this.properties.listName = strings.ListNameFieldValue; }
    if (!this.properties.layout) { this.properties.layout = strings.LayoutFieldValue; }
    if (!this.properties.viewName) { this.properties.viewName = strings.ViewNameFieldValue; }
    if (!this.properties.webUrl) { this.properties.webUrl = this.context.pageContext.web.serverRelativeUrl; }
    
    // Render the solution
    new IconLinks.render(this.domElement, this.context, Environment.type, this.displayMode, this.properties.layout, this.properties.justify, this.properties.viewName, this.properties.listName, this.properties.webUrl);

    // Set the flag
    this._hasRendered = true;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // Update the theme
    IconLinks.updateTheme(currentTheme.semanticColors);
  }

  protected get dataVersion(): Version {
    return Version.parse(IconLinks.version);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneChoiceGroup('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    {
                      key: 'icon-sqre',
                      text: 'Square',
                      iconProps: { officeFabricIconFontName: 'squareshape' }
                    },
                    {
                      key: 'icon-rect',
                      text: 'Rectangle',
                      imageSize: { height: 32, width: 32 },
                      imageSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBzdHlsZT0ic3Ryb2tlOiAjMjQyNDI0OyIgeD0iMSIgeT0iMSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEyIiByeD0iMiIgc3Ryb2tlLXdpZHRoPSIyIj48L3JlY3Q+PC9zdmc+',
                      selectedImageSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBzdHlsZT0ic3Ryb2tlOiAjMjQyNDI0OyIgeD0iMSIgeT0iMSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEyIiByeD0iMiIgc3Ryb2tlLXdpZHRoPSIyIj48L3JlY3Q+PC9zdmc+'
                    }
                  ]
                }),
                PropertyPaneDropdown('justify', {
                  label: strings.JustifyFieldLabel,
                  selectedKey: 'justify-content-start',
                  options: [
                    { key: 'justify-content-start', text: 'Left' },
                    { key: 'justify-content-center', text: 'Center' },
                    { key: 'justify-content-end', text: 'Right' },
                    { key: 'justify-content-around', text: 'Around' },
                    { key: 'justify-content-between', text: 'Between' }
                  ]
                }),
                PropertyPaneTextField('webUrl', {
                  label: strings.WebUrlFieldLabel,
                  description: strings.WebUrlFieldDescription
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel,
                  description: strings.ListNameFieldDescription
                }),
                PropertyPaneTextField('viewName', {
                  label: strings.ViewNameFieldLabel,
                  description: strings.ViewNameFieldDescription
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneButton('editLinks', {
                  text: "Edit Icon Links",
                  onClick: () => {
                    // Show the list
                    IconLinks.viewList();
                  }
                }),
                PropertyPaneLabel('version', {
                  text: "v" + IconLinks.version
                })
              ]
            }
          ],
          header: {
            description: IconLinks.description
          }
        }
      ]
    };
  }
}
