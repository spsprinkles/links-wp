declare interface IIconLinksWebPartStrings {
  BasicGroupName: string;
  ListNameFieldDescription: string;
  ListNameFieldLabel: string;
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

declare module 'IconLinksWebPartStrings' {
  const strings: IIconLinksWebPartStrings;
  export = strings;
}
