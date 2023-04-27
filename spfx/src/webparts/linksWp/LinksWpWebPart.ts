import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ILinksWpWebPartProps { }

// Import the solution
import "../../../../dist/links-wp.js";
declare const LinksWP: {
  render: (el: HTMLElement, context: WebPartContext, displayMode: DisplayMode) => void;
  updateTheme: () => void;
};

export default class LinksWpWebPart extends BaseClientSideWebPart<ILinksWpWebPartProps> {

  private _hasRendered: boolean = false;
  public render(): void {
    // See if have rendered the solution
    if(this._hasRendered) { return; }

    // Render the solution
    LinksWP.render(this.domElement, this.context, this.displayMode);

    // Set the flag
    this._hasRendered = true;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // Update the theme
    LinksWP.updateTheme();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
