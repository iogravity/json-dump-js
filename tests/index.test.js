const JsonDump = require('../src');

let jsonDump;
let dumpName;

beforeAll(() => {
    jsonDump = new JsonDump('MDE2M2I5M2RmNDE5MDkxNGMxNDViZWFjNzhmNTRkYTg');
    dumpName = (Math.random() + 1).toString(36).substring(7);
});

afterAll(async () => {
    await jsonDump.delete(dumpName);
});
describe("test get all dumps", () => {
    it("should return all dumps for a user", async () => {
        let data = await jsonDump.get();
        expect(data).toHaveProperty('isSuccess', true);
    });
});

describe("create a dump", () => {
    it("should create a dump", async () => {
        json = {
            "test": "create_dump"
        };
        let data = await jsonDump.create(dumpName, json);
        expect(data).toHaveProperty('isSuccess', true);
        expect(data.data.json).toEqual(json);
    });

    it("should return an error if a dump name is empty", async () => {
        json = {
            "test": "create_dump"
        };
        let data = await jsonDump.create('', json);
        expect(data).toHaveProperty('isSuccess', false);
    });

    it("should return an error if a json is empty", async () => {
        json = {};
        let data = await jsonDump.create(dumpName, json);
        expect(data).toHaveProperty('isSuccess', false);
    });

    it("should return an error if a dump already exists", async () => {
        json = {
            "test": "create_dump"
        };
        let data = await jsonDump.create(dumpName, json);
        expect(data).toHaveProperty('isSuccess', false);
    });

});

describe("test get a dump by name", () => {
    it("should return a dump by specific name", async () => {
        let data = await jsonDump.find(dumpName);
        console.log(data);
        expect(data).toHaveProperty('isSuccess', true);
    });
    it("should return an error if dump does not exists by specific name", async () => {
        let data = await jsonDump.find((Math.random() + 1).toString(36).substring(7));
        console.log(data);
        expect(data).toHaveProperty('isSuccess', false);
    });
});

describe("update a dump", () => {
    it("should update a dump", async () => {
        json = {
            "test": "create_dump_2"
        };
        let data = await jsonDump.update(dumpName, json);
        expect(data).toHaveProperty('isSuccess', true);
        expect(data.data.json).toEqual(json);
    });

    it("should return an error if a json is empty", async () => {
        json = {};
        let data = await jsonDump.update(dumpName, json);
        expect(data).toHaveProperty('isSuccess', false);
    });

    it("should return an error if dump with new name already exists", async () => {
        await jsonDump.create('test', { "test": 1 });
        json = {
            "test": "create_dump_2"
        };
        let data = await jsonDump.update(dumpName, json, 'test');
        await jsonDump.delete('test');
        expect(data).toHaveProperty('isSuccess', false);

    });
});