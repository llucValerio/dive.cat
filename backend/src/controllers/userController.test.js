const User = require('../models/userModel');
const userController = require('./userController');

jest.mock('../models/userModel');

describe('Given a getUsers function', () => {
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
      describe('And User.find resolves', () => {
        test('Then res.json must be called', async () => {
          User.find.mockReturnValue({
            populate: jest.fn().mockReturnValue({
              populate: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ date: '2020-09-01' })
              })
            })
          });

          await userController.getUsers(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And the query function is NOT empty', () => {
      describe('And User.find resolves', () => {
        test('Then res.json must be called', async () => {
          User.find.mockReturnValue({
            populate: jest.fn().mockReturnValue({
              populate: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ date: '2020-09-01' })
              })
            })
          });
          req = {
            query: { name: 'Luke' }
          };

          await userController.getUsers(req, res);

          expect(res.json).toHaveBeenCalled();
        });
      });
    });
    describe('And User.find rejects', () => {
      test('Then res.send must be called', async () => {
        User.find.mockRejectedValue({});

        await userController.getUsers(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getUserById function', () => {
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
    describe('And User.findById resolves', () => {
      test('Then res.json must be called', async () => {
        User.findById.mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue({ date: '2020-09-01' })
            })
          })
        });

        await userController.getUserById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And User.findById rejects', () => {
      test('Then res.send must be called', async () => {
        User.findById.mockRejectedValue({});

        await userController.getUserById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateUserById function', () => {
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
    describe('And User.findByIdAndUpdate resolves', () => {
      test('Then res.json must be called', async () => {
        User.findByIdAndUpdate.mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue({ date: '2020-09-01' })
            })
          })
        });

        await userController.updateUserById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And User.findByIdAndUpdate rejects', () => {
      test('Then res.send must be called', async () => {
        User.findByIdAndUpdate.mockRejectedValue({});

        await userController.updateUserById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteUserById function', () => {
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
    describe('And User.findByIdAndDelete resolves', () => {
      test('Then res.json must be called', async () => {
        User.findByIdAndRemove.mockResolvedValue({});

        await userController.deleteUserById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And User.findByIdAndDelete rejects', () => {
      test('Then res.send must be called', async () => {
        User.findByIdAndRemove.mockRejectedValue({});

        await userController.deleteUserById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});
