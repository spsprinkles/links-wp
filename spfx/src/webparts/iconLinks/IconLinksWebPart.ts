import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ISemanticColors } from '@microsoft/sp-component-base';
import * as strings from 'IconLinksWebPartStrings';

export interface IIconLinksWebPartProps {
  listName: string;
  viewName: string;
  webUrl: string;
}

// Import the solution
import "../../../../dist/icon-links.js";
declare const IconLinks: {
  render: new (el: HTMLElement, context: WebPartContext, displayMode: DisplayMode, viewName: string, listName: string, sourceUrl: string) => void;
  updateTheme: (currentTheme: Partial<ISemanticColors>) => void;
};


export default class IconLinksWebPart extends BaseClientSideWebPart<IIconLinksWebPartProps> {
  private _hasRendered: boolean = false;

  public render(): void {
    // See if have rendered the solution
    if (this._hasRendered) {
      // Clear the element
      while (this.domElement.firstChild) { this.domElement.removeChild(this.domElement.firstChild); }
    }

    // Render the solution
    new IconLinks.render(this.domElement, this.context, this.displayMode, this.properties.viewName, this.properties.listName, this.properties.webUrl);

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
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
