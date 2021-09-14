const Equipment = require('../models/equipmentModel');
const equipmentController = require('./equipmentController');

jest.mock('../models/equipmentModel');

describe('Given a getEquipment function', () => {
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
      describe('And Equipment.find resolves', () => {
        test('Then res.json must be called', async () => {
          Equipment.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue({ name: 'Fins' })
          });

          await equipmentController.getEquipment(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And the query function is NOT empty', () => {
      describe('And Equipment.find resolves', () => {
        test('Then res.json must be called', async () => {
          Equipment.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue({ name: 'Fins' })
          });
          req = {
            query: { name: 'mask' }
          };

          await equipmentController.getEquipment(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And Equipment.find rejects', () => {
      test('Then res.send must be called', async () => {
        Equipment.find.mockRejectedValue({});

        await equipmentController.getEquipment(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a setEquipment function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        body: {},
        query: {
          email: ''
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Equipment.create resolves', () => {
      test('Then res.json must be called', async () => {
        Equipment.create.mockResolvedValue({});

        await equipmentController.setEquipment(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Equipment.create rejects', () => {
      test('Then res.send must be called', async () => {
        Equipment.create.mockRejectedValue({});

        await equipmentController.setEquipment(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    // describe('And the equipment could not been pushed into user', () => {
    //   test('Then res.status must be 404', async () => {
    //     Equipment.create.mockRejectedValue({});

    //     await equipmentController.setEquipment(req, res);

    //     expect(res.json).toHaveBeenCalledWith(404);
    //   });
    // });
    describe('And there is no user on this function', () => {
      test('Then res.send must be called', async () => {
        req = {
          query: {
          }
        };

        Equipment.create.mockRejectedValue({});

        await equipmentController.setEquipment(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getEquipmentById function', () => {
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
    describe('And Equipment.findById resolves', () => {
      test('Then res.json must be called', async () => {
        Equipment.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue({ name: 'Fins' })
        });

        await equipmentController.getEquipmentById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Equipment.findById rejects', () => {
      test('Then res.send must be called', async () => {
        Equipment.findById.mockRejectedValue({});

        await equipmentController.getEquipmentById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateEquipmentById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        body: {},
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
    describe('And Equipment.findByIdAndUpdate resolves', () => {
      test('Then res.json must be called', async () => {
        Equipment.findByIdAndUpdate.mockReturnValue({
          populate: jest.fn().mockResolvedValue({ name: 'Fins' })
        });

        await equipmentController.updateEquipmentById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Equipment.findByIdAndUpdate rejects', () => {
      test('Then res.send must be called', async () => {
        Equipment.findByIdAndUpdate.mockRejectedValue({});

        await equipmentController.updateEquipmentById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteEquipmentById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        params: {
          equipmentId: {}
        },
        body: {
          userId: '345'
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Equipment.findByIdAndDelete resolves', () => {
      test('Then res.json must be called', async () => {
        Equipment.findByIdAndRemove.mockResolvedValue({});

        await equipmentController.deleteEquipmentById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Equipment.findByIdAndDelete rejects', () => {
      test('Then res.send must be called', async () => {
        Equipment.findByIdAndRemove.mockRejectedValue({});

        await equipmentController.deleteEquipmentById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And no userId is included on body', () => {
      test('Then res.send must be called', async () => {
        req = {
          body: {
            userId: undefined
          }
        };

        Equipment.findByIdAndRemove.mockResolvedValue({});

        await equipmentController.deleteEquipmentById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});
