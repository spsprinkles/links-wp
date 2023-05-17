import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ISemanticColors } from '@microsoft/sp-component-base';
import * as strings from 'LinksWpWebPartStrings';

export interface ILinksWpWebPartProps {
  viewName: string;
  webUrl: string;
}

// Import the solution
import "../../../../dist/links-wp.js";
declare const LinksWP: {
  render: new(el: HTMLElement, context: WebPartContext, displayMode: DisplayMode, viewName: string, sourceUrl: string) => void;
  updateTheme: (currentTheme: Partial<ISemanticColors>) => void;
};

export default class LinksWpWebPart extends BaseClientSideWebPart<ILinksWpWebPartProps> {

  private _hasRendered: boolean = false;
  public render(): void {
    // See if have rendered the solution
    if (this._hasRendered) {
      // Clear the element
      while (this.domElement.firstChild) { this.domElement.removeChild(this.domElement.firstChild); }
    }

    // Render the solution
    new LinksWP.render(this.domElement, this.context, this.displayMode, this.properties.viewName, this.properties.webUrl);

    // Set the flag
    this._hasRendered = true;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // Update the theme
    LinksWP.updateTheme(currentTheme.semanticColors);
  }

  protected get disableReactivePropertyChanges(): boolean { return true; }

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

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
