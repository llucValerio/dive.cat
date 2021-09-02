const Item = require('../models/itemModel');
const itemController = require('./itemController');

jest.mock('../models/itemModel');

describe('Given a getItems function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        query: {}
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And the query function is empty', () => {
      describe('And Item.find resolves', () => {
        test('Then res.json must be called', async () => {
          Item.find.mockResolvedValue({});

          await itemController.getItems(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And the query function is NOT empty', () => {
      describe('And Item.find resolves', () => {
        test('Then res.json must be called', async () => {
          Item.find.mockResolvedValue({});

          req = {
            query: { date: '2020-09-01' }
          };

          await itemController.getItems(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And Item.find rejects', () => {
      test('Then res.send must be called', async () => {
        Item.find.mockRejectedValue({});

        await itemController.getItems(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a setItem function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        body: {}
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Item.create resolves', () => {
      test('Then res.json must be called', async () => {
        Item.create.mockResolvedValue({});

        await itemController.setItem(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Item.create rejects', () => {
      test('Then res.send must be called', async () => {
        Item.create.mockRejectedValue({});

        await itemController.setItem(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getItemById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        params: {
          itemId: {}
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Item.findById resolves', () => {
      test('Then res.json must be called', async () => {
        Item.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue({ name: 'Fins' })
        });

        await itemController.getItemById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Item.findById rejects', () => {
      test('Then res.send must be called', async () => {
        Item.findById.mockRejectedValue({});

        await itemController.getItemById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateItemById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        body: {},
        params: {
          itemId: {}
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Item.findByIdAndUpdate resolves', () => {
      test('Then res.json must be called', async () => {
        Item.findByIdAndUpdate.mockReturnValue({
          populate: jest.fn().mockResolvedValue({ name: 'Luke' })
        });

        await itemController.updateItemById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Item.findByIdAndUpdate rejects', () => {
      test('Then res.send must be called', async () => {
        Item.findByIdAndUpdate.mockRejectedValue({});

        await itemController.updateItemById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteItemById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        params: {
          equipmentId: {}
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Item.findByIdAndDelete resolves', () => {
      test('Then res.json must be called', async () => {
        Item.findByIdAndRemove.mockResolvedValue({});

        await itemController.deleteItemById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Item.findByIdAndDelete rejects', () => {
      test('Then res.send must be called', async () => {
        Item.findByIdAndRemove.mockRejectedValue({});

        await itemController.deleteItemById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});
