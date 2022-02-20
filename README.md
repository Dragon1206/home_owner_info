Homeowner Information

Create Resource:
Take an XML document, parses it. [Here i am using an XAL document to parse the data, this can be esily changed to reading an XML document as part of get request. This app is not designed to read very large XML file]
Calculate the homeowner’s age based on the supplied Date of Birth
Make a 3rd party call to retrieve geocoordinates of house [Since Google API ask credit card information to enable the service. Even for free tier we have to enter the credit card information]
Store the homeowners information in DB [Used Atlas mongoDB]

Read Resource
Ability to retrieve document(s) by:
ID
Search parameters
All

Update Resource
Update document

Delete Resource
By ID
By multiple IDs

Note:
XML file resides in the resource folder
Google API key for getting geolocation can be added in the environment varialbes
For testing this application uses JEST and mongodb-memory-server
Mongo server we used in this application is mongoAtlas. Credentials are removed.
Request validation is not performed

To run the application 
    npm run start

To run the test
    npm run test
