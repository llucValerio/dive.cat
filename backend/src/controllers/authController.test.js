const authController = require('./authController');

// describe('Given a registerUser function', () => {
//   describe('When is invoked', () => {
//     let req = {};
//     let res = {};
//     beforeEach(() => {
//       res = {
//         send: jest.fn()
//       };
//     });
//     describe('And user.message is NOT undefined', () => {
//   test('Then res.send must be called with a message distinct of "Register done"', async () => {
//         req = {
//           user: {
//             message: 'error message from cheking user'
//           }
//         };
//         const sendObject = {
//           user: req.user,
//           message: 'Register done'
//         };
//         await authController.registerUser(req, res);

//         expect(res.send).toHaveBeenCalledWith(sendObject);
//       });
//     });
//   });
// });

describe('Given a logoutUser function', () => {
  describe('When is invoked', () => {
    test('It Returns "Logout Succesful"', () => {
      const req = {
        body: {}
      };
      const res = {
        send: jest.fn()
      };
      authController.refreshTokens = [];
      authController.logoutUser(req, res);

      // expect(res.send).toHaveBeenCalled[0][0].message('Logout successful');
      expect(res.send).toHaveBeenCalledWith('Logout successful');
    });
  });
});

describe('Given a refTok funciton', () => {
  const req = {
    body: {
      refreshToken: false
    }
  };
  const res = {
    sendStatus: jest.fn()
  };
  describe('When is invoked without refreshToken', () => {
    test('Then it should return 401', () => {
      authController.refTok(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });
  });
  describe('When is invoked with refreshToken but does not exist', () => {
    test('Then it should return 403', () => {
      req.body.refreshToken = '12345';

      authController.refTok(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });
  });
  // describe('When is invoked with refreshToken and it exists', () => {
  //   describe('And it is the correct one', () => {
  //     test('Then it should call jwt.verify', () => {
  //       req.body.refreshToken = '12345';
  //       const refreshTokens = {
  //         includes: jest.fn()
  //       };

  //       refreshTokens.includes.mockReturnValueOnce(true);

  //       const jwt = {
  //         verify: jest.fn()
  //       };
  //       // jwt.verify.mockReturnValueOnce({});
  //       // authController.refTok(req, res);

  //       expect(jwt.verify).toHaveBeenCalled();
  //     });
  // });
  // });
});
