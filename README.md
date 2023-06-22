# icon-links
### This project sets up an icon links webpart for Classic SharePoint Online sites.
### Follow these steps to generate a icon links web part application.
##### *All steps below assume SharePoint Online has been set up to allow Custom Web Parts*

<br>

### Cloning the repo and installing locally: 
1. Clone this repo locally
    - `git clone https://github.com/spsprinkles/icon-links.git C:\code\icon-links`
2. Install the node packages
    - `npm i`
3. Build the application
    - `npm run build`

### SharePoint Online set up and Web Part installation

4. Go to SharePoint Online, view in Classic mode.
5. Go to Site Assets and create a new folder
    - `icon-links`
6. Navigate to SPO icon-links folder and copy the following files from local c:\code\icon-links into icon-links SPO folder
    - `.\dist\icon-links.js`
    - `.\src\index.html`
7. In the navigation bar on the left, go to "Pages"
8. Create a new Web Part Page, name it icon-links and set to Full Page, Vertical layout
    - `icon-links`
9. Stop editing and navigate back to Site contents (left side Navigation) and go to Site Assets
10. Drag icon-links.aspx file into icon-links folder
    - There should be three files in here: icon-links.aspx, icon-links.js, and index.html
11. Navigate to and click on the icon-links.aspx file
12. Click (top nav bar) Page > Edit Page, then click "Add a Web Part"
13. In the "Content Link" box, enter:
    - `.\index.html` and then "OK"

### Utilizing Icon-Links App

14. Click "Edit Icon Links"
15. Enter a TItle, modify the Order (if this is your first Icon leave it alone, otherwise modify this as you continue to build your library), and the URL to the site the icon should link to
16. Download an SVG icon relevant to your icon-link entry
    - `flicon.io` is recommended for examples
17. On your webpart, click on the Icon text space and upload your SVG file you downloaded
18. Click "Create"