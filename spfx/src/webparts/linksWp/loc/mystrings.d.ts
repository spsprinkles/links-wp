declare interface ILinksWpWebPartStrings {
  BasicGroupName: string;
  ViewNameFieldDescription: string;
  ViewNameFieldLabel: string;
  WebUrlFieldDescription: string;
  WebUrlFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module 'LinksWpWebPartStrings' {
  const strings: ILinksWpWebPartStrings;
  export = strings;
}
