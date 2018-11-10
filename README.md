# Workspace Commander

## Features

This extension allows you to add workspace specific projects to the workspace settings file that allows you to control the state of those projects.

Projects are displayed in panels grouped by project type (UX, API, ENT, LIB). Interaction with each type is unique to that type. Running projects have an icon indicating that they are running to the left of the project name. In order to keep the indicators accurate you should do all start, stop or restart actions from the extension.

### UX projects

Clicking on a UX project will create a new terminal, navigate to the project directory and issue a npm start. Once the project is started and running, clicking the project name again will open a browser window at the url for that project. Right clicking the project name will allow you to stop the project.

### API / ENTERPRISE projects

Clicking on an API/ENT project will create a new termional, navigate to the project directory and issue a dotnet run. Once the project is started and running, clicking the project name again will open a browser window at the swagger url for that project. Right clicking the project name will allow you to restart or stop the project.

### LIBRARY projects

Clicking on a LIB project will create a new terminal, navigate to the project direcotry and issue a dotnet build.

### Groups Panel

The group panel displays groups that have been created in the configuration. This is simply a shortcut for starting multiple projects at once. Clicking the group name will start all configured projects for that group. The appropriate action will occur for each project and the running icon will display.

If a project in a group is already running, the process simply skips starting that project. This makes it safe to have the same project in multiple groups and use the groups to start multiple projects without conflicts.


## Requirements

For this extension to work you must add items to the workspace file. You will need a settings node that contains a workspace-commander node. The workspace-commander node should contain 3 nodes; pathPrefix, projects and groups.

The __pathPrefix__ is a single string that is the path to get to your top repository folder.

The __projects__ nodes contains an array of project items that you want to be able to control from this workspace. They do not need to be included in the workspace, just present on your system. Each project item must provide 4 properties; type, path, label and url.

1. The project type must be 1 of 4 strings; UX, API, ENT, LIB.
2. The project path is a string indicating the path to the project. Keep in mind the pathPrefix is prepended.
3. The project label is a string that will show in the UI for managing the project.
4. The url is the address to the project that you would enter into the browser.

    UX project types just need the path you would browse to, ie: http://localhost:5111/

    API and ENT project types automatically add swagger to the url so just provide the protocol, host, port and prefix. ie. http://localhost:5111/api/accounts/

The __groups__ node contains an array of strings that match project labels that you want to quickly start as a group.

An example configuration is below:

```json
"settings": {
	"commander": {
		"pathPrefix": "~/appdev/",
		"groups": [
			{
				"label": "Accounts App",
				"projects": [
					"Ux.Accounts",
					"Api.Accounts",
					"Enterprise.Users"
				]
			}
		],
		"projects": [
			{
				"type": "UX",
				"path": "ActiveDirectory/Ux.Accounts/",
				"label": "Ux.Accounts",
				"url": "http://localhost:5111/"
			},
			{
				"type": "UX",
				"path": "JobLibrary/Ux.JobLibrary/",
				"label": "Ux.JobLibrary",
				"url": "https://localhost:5054/"
			},
			{
				"type": "API",
				"path": "ActiveDirectory/Api.Accounts/src/",
				"label": "Api.Accounts",
				"url": "https://localhost:6111/api/accounts/"
			},
			{
				"type": "ENT",
				"path": "Enterprise/Enterprise.Configuration/src/",
				"label": "Enterprise.Configuration",
				"url": "https://localhost:7112/enterprise/configuration/"
			},
			{
				"type": "ENT",
				"path": "Enterprise/Enterprise.Persons/src/",
				"label": "Enterprise.Persons",
				"url": "https://localhost:7114/enterprise/persons/"
			},
			{
				"type": "ENT",
				"path": "Enterprise/Enterprise.Users/src/",
				"label": "Enterprise.Users",
				"url": "https://localhost:7111/enterprise/users/"
			},
			{
				"type": "LIB",
				"path": "Enterprise/Shared/src/",
				"label": "Shared"
			},
			{
				"type": "LIB",
				"path": "Enterprise/Shared.Model/src/",
				"label": "Shared.Model"
			},
			{
				"type": "LIB",
				"path": "Enterprise/Resource.Couchbase/src/",
				"label": "Resource.Couchbase"
			},
			{
				"type": "LIB",
				"path": "Enterprise/Resource.Directory/src/",
				"label": "Resource.Directory"
			},
			{
				"type": "LIB",
				"path": "Enterprise/Resource.Sql/src/",
				"label": "Resource.Sql"
			}
		]
	}
}
```