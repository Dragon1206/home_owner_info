'use strict';
const {dbConnector} = require('./dbConnector/dbConnector');
const {resourceCreate} = require('../service/resource/create');
const {resourceRead} = require('../service/resource/read');
const {resourceUpdate} = require('../service/resource/update');
const {resourceDelete} = require('../service/resource/delete');


let mongod;
describe('JEST Unit testing', () => {
  beforeAll(async () => {
    mongod = await dbConnector.getMongoDbServer();
    const uri = mongod.getUri();
    await dbConnector.getMongoDbConn(uri);
  });

  test('createresource correct input', async () => {
    const object = {data: correctInput};
    const result = await resourceCreate.saveResource(object);
    return expect(result).toBeTruthy();
  });

  test('findResource correct input', async () => {
    const object = {req: getCorrectResourceInput};
    const result = await resourceRead.findData(object);
    return expect(JSON.parse(JSON.stringify(result))).toEqual(JSON.parse(JSON.stringify(getCorrectResourceOutput)));
  });

  test('findResource incorrect input', async () => {
    const object = {req: getIncorrectResourceInput};
    const result = await resourceRead.findData(object);
    return expect(JSON.parse(JSON.stringify(result))).not.
        toEqual(JSON.parse(JSON.stringify(getIncorrectResourceOutput)));
  });

  test('updateResource correct input', async () => {
    const object = {req: updateResourceInput};
    const result = await resourceUpdate.updateResource(object);
    return expect(JSON.parse(JSON.stringify(result))).toEqual(JSON.parse(JSON.stringify(updateResourceOutput)));
  });

  test('updateResource incorrect input', async () => {
    const object = {req: updateResourceIncorrectInput};
    const result = await resourceUpdate.updateResource(object);
    return expect(JSON.parse(JSON.stringify(result))).
        toEqual(JSON.parse(JSON.stringify(updateResourceIncorrectOutput)));
  });

  test('deleteResource correct input', async () => {
    const object = {req: deleteResourceInput};
    const result = await resourceDelete.deleteResource(object);
    return expect(JSON.parse(JSON.stringify(result))).toEqual(JSON.parse(JSON.stringify(deleteResourceOutput)));
  });

  test('deleteResource incorrect input', async () => {
    const object = {req: deleteResourceIncorrectInput};
    const result = await resourceDelete.deleteResource(object);
    return expect(JSON.parse(JSON.stringify(result))).
        toEqual(JSON.parse(JSON.stringify(deleteResourceIncorrectOutput)));
  });


  afterAll(async () => {
    await dbConnector.closeMongoDbConnection(mongod);
  }, 10000);
});


const correctInput = {
  'Root': {
    'Customer': [{
      'CustomerId': ['1'], 'ContactName': ['Howard Snyder'], 'DateOfBirth': ['10-11-1988'],
      'Phone': ['(503) 555-7555'], 'Address': ['2732 Baker Blvd.'], 'City': ['Eugene'], 'Region': ['OR'],
      'PostalCode': ['97403'], 'Country': ['USA'], 'Age': ['33'], 'GeoLocation': [null],
    }, {
      'CustomerId': ['2'], 'ContactName': ['Snyder'], 'DateOfBirth': ['7-22-1901'],
      'Phone': ['(503) 555-7555'], 'Address': ['2732 Baker Blvd.'], 'City': ['Eugene'], 'Region': ['OR'],
      'PostalCode': ['97403'], 'Country': ['USA'], 'Age': ['121'], 'GeoLocation': [null],
    },
    {
      'CustomerId': ['3'], 'ContactName': ['Allan Snyder'], 'DateOfBirth': ['4-8-1918'],
      'Phone': ['(503) 555-7555'], 'Address': ['2732 Baker Blvd.'], 'City': ['Eugene'], 'Region': ['OR'],
      'PostalCode': ['97403'], 'Country': ['USA'], 'Age': ['104'], 'GeoLocation': [null],
    },
    ],
  },
};

const getCorrectResourceInput = {
  'CustomerId': '1',
};
const getCorrectResourceOutput = [{
  'Address': ['2732 Baker Blvd.'], 'City': ['Eugene'],
  'ContactName': ['Howard Snyder'], 'Country': ['USA'], 'CustomerId': ['1'],
  'DateOfBirth': ['10-11-1988'], 'Phone': ['(503) 555-7555'], 'PostalCode': ['97403'], 'Region': ['OR'],
  'Age': ['33'], 'GeoLocation': [null],
}];

const getIncorrectResourceInput = {
  'DateOfBirth': '7-22-1901',
};

const getIncorrectResourceOutput = [{
  'Address': ['2732 Baker Blvd.'], 'City': ['Eugene'],
  'ContactName': ['Howard Snyder'], 'Country': ['USA'], 'CustomerId': ['1'],
  'DateOfBirth': ['10-11-1988'], 'Phone': ['(503) 555-7555'], 'PostalCode': ['97403'], 'Region': ['OR'],
}];

const updateResourceInput = {
  'CustomerId': '1',
  'ContactName': 'Howard',
  'DateOfBirth': '1-1-2001',
  'Phone': '9024129581',
};

const updateResourceOutput = {
  'acknowledged': true,
  'modifiedCount': 1,
  'upsertedId': null,
  'upsertedCount': 0,
  'matchedCount': 1,
};

const updateResourceIncorrectInput = {
  'CustomerId': '10',
  'ContactName': 'Howard',
  'DateOfBirth': '1-1-2001',
  'Phone': '9024129581',
};

const updateResourceIncorrectOutput = {
  'acknowledged': true,
  'modifiedCount': 0,
  'upsertedId': null,
  'upsertedCount': 0,
  'matchedCount': 0,
};


const deleteResourceInput = {
  'CustomerId': ['1', '2'],
};

const deleteResourceOutput = {
  'deletedCount': 2,
};

const deleteResourceIncorrectInput = {
  'CustomerId': ['12'],
};

const deleteResourceIncorrectOutput = {
  'deletedCount': 0,
};
