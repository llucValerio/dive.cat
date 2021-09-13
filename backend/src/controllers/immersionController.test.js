const Immersion = require('../models/immersionModel');
const immersionController = require('./immersionController');

jest.mock('../models/immersionModel');

describe('Given a getImmersions function', () => {
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
      describe('And Immersion.find resolves', () => {
        test('Then res.json must be called', async () => {
          Immersion.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue({ name: 'Luke' })
          });

          await immersionController.getImmersions(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And the query function is NOT empty', () => {
      describe('And Immersion.find resolves', () => {
        test('Then res.json must be called', async () => {
          Immersion.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue({ name: 'Luke' })
          });
          req = {
            query: { date: '2020-09-01' }
          };

          await immersionController.getImmersions(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And Immersion.find rejects', () => {
      test('Then res.send must be called', async () => {
        Immersion.find.mockRejectedValue({});

        await immersionController.getImmersions(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a setImmersion function', () => {
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
    describe('And Immersion.create resolves', () => {
      test('Then res.json must be called', async () => {
        Immersion.create.mockResolvedValue({});

        await immersionController.setImmersion(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Immersion.create rejects', () => {
      test('Then res.send must be called', async () => {
        Immersion.create.mockRejectedValue({});

        await immersionController.setImmersion(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    // describe('And the immersion could not been pushed into user', () => {
    //   test('Then res.status must be 404', async () => {
    //     Immersion.create.mockRejectedValue({});

    //     await immersionController.setImmersion(req, res);

    //     expect(res.json).toHaveBeenCalledWith(404);
    //   });
    // });
    describe('And there is no user on this function', () => {
      test('Then res.send must be called', async () => {
        req = {
          query: {
          }
        };

        Immersion.create.mockRejectedValue({});

        await immersionController.setImmersion(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getImmersionById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        params: {
          immersionId: {}
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Immersion.findById resolves', () => {
      test('Then res.json must be called', async () => {
        Immersion.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue({ name: 'Fins' })
        });

        await immersionController.getImmersionById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Immersion.findById rejects', () => {
      test('Then res.send must be called', async () => {
        Immersion.findById.mockRejectedValue({});

        await immersionController.getImmersionById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateImmersionById function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      req = {
        body: {},
        params: {
          immersionId: {}
        }
      };
      res = {
        status: jest.fn(),
        json: jest.fn(),
        send: jest.fn()
      };
    });
    describe('And Immersion.findByIdAndUpdate resolves', () => {
      test('Then res.json must be called', async () => {
        Immersion.findByIdAndUpdate.mockReturnValue({
          populate: jest.fn().mockResolvedValue({ name: 'Luke' })
        });

        await immersionController.updateImmersionById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Immersion.findByIdAndUpdate rejects', () => {
      test('Then res.send must be called', async () => {
        Immersion.findByIdAndUpdate.mockRejectedValue({});

        await immersionController.updateImmersionById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteImmersionById function', () => {
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
    describe('And Immersion.findByIdAndDelete resolves', () => {
      test('Then res.json must be called', async () => {
        Immersion.findByIdAndRemove.mockResolvedValue({});

        await immersionController.deleteImmersionById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And Immersion.findByIdAndDelete rejects', () => {
      test('Then res.send must be called', async () => {
        Immersion.findByIdAndRemove.mockRejectedValue({});

        await immersionController.deleteImmersionById(req, res);

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

        Immersion.findByIdAndRemove.mockResolvedValue({});

        await immersionController.deleteImmersionById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});
