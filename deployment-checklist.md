### Deployment - for use by developers
1. checkout a throwaway branch  
2. check config files
3. `$ npm run build` && `npm run trim` 
4. remove bundle.js from the .gitignore
5. remove the test script from package json to avoid the precommit hook failure
5. commit your changes
6. `$ git push heroku branchname:master`  
