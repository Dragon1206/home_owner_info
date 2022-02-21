
### Homeowner Information

#### Create Resource:
1. Take an XML document, parses it. [Here i am using an XAL document to parse the data, this can be esily changed to reading an XML document as part of get request. This app is not designed to read very large XML file]
2. Calculate the homeowner’s age based on the supplied Date of Birth
3. Make a 3rd party call to retrieve geocoordinates of house [Since Google API ask credit card information to enable the service. Even for free tier we have to enter the credit card information]
4. Store the homeowners information in DB [Used Atlas mongoDB]

#### Services
##### Read Resource
Ability to retrieve document(s) by:
ID
Search parameters
All

##### Update Resource
Update document

##### Delete Resource
By ID
By multiple IDs

#### Services:
1. GET: `API: http://127.0.0.1:3000/sample/get/xml` [Loads the XML file]
2. POST: `API: http://127.0.0.1:3000/sample/search` [Finds the document]
> Request structure:

    { "CustomerId": <String> [required }

4. POST: `API: http://127.0.0.1:3000/sample/update` [Update the document based on CustomerId]
> Request structure:

     { "CustomerId": <String>, [required] "ContactName": <String>, [optional] "DateOfBirth": <String>, [optional] "Phone": <String>  [optional] }

5. POST: `API: http://127.0.0.1:3000/sample/delete` [Delete the document based on single or multiple CustomerIds]
> Request structure:

    {"CustomerId": [Array of string] [required] }

#### Note:
1. XML file resides in the resource folder
2. Google API key for getting geolocation can be added in the environment varialbes
3. For testing this application uses JEST and mongodb-memory-server
4. Mongo server we used in this application is mongoAtlas. Credentials are removed.
5. Request validation is not performed
6. To run the application 
> [npm run start]
7. To run the test 
>[npm run test]


