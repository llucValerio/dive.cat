const authController = require('./authController');

describe('Given a registerUser function', () => {
  describe('When is invoked', () => {
    let req = {};
    let res = {};
    beforeEach(() => {
      res = {
        send: jest.fn()
      };
    });
    describe('And user.message is NOT undefined', () => {
      test('Then res.send must be called with a message distinct of "Register done"', async () => {
        req = {
          user: {
            message: 'error message from cheking user'
          }
        };
        const sendObject = {
          user: req.user,
          message: 'Register done'
        };
        await authController.registerUser(req, res);

        expect(res.send).toHaveBeenCalledWith(sendObject);
      });
    });
  });
});
