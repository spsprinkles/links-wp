import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ILinksWpWebPartProps { }

// Import the solution
import "../../../../dist/links-wp.js";
declare const LinksWP: { render: (el: HTMLElement, context: WebPartContext, displayMode: DisplayMode) => void; };

export default class LinksWpWebPart extends BaseClientSideWebPart<ILinksWpWebPartProps> {

  public render(): void {
    // Render the solution
    LinksWP.render(this.domElement, this.context, this.displayMode);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    /*
    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
    */
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
