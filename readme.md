# Simple Data Import Site

open SimpleDataImport.sln run it in IISExpress and note down the port number,
update that port number in the simple-data-import-app\src\api\constants.tsx file baseApiUrl string

open simple-data-import-app folder with vscode
run npm start in vscode command prompt, this should launch the website in https://localhost:3000,
if not, need to stop the web api to update Cors policy in program.cs.

Prerequisite:

1. .net 6
2. node js

