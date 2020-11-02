const roleModel = require('../models/database/role');
const config = require('../config/index');

const roleDetails = [{
  code: config.role.STUDENT,
  displayName: 'Student',
  description: 'This is student role',
},
{
  code: config.role.ADMIN,
  displayName: 'Admin',
  description: 'This is Admin role',
},
{
  code: config.role.TEACHER,
  displayName: 'Teacher',
  description: 'This is Teacher role',
}
];

exports.up = db => new Promise((resolve, reject) => {
  roleModel.addMultiple(roleDetails)
    .then(res => {
      console.log(`Roles Added!`);
      resolve();
    })
    .catch(err => {
      console.log(`Roles adding failed: ${err}`);
      reject(err);

    });
});

exports.down = db => null;

exports._meta = {
  version: 1,
};
