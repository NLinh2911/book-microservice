exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(() => {
      // Inserts seed entries
      return knex('category').insert([{
        id: 'cat01',
        name: 'Business & Leadership',
        alias: 'business-leadership',
      }, {
        id: 'cat02',
        name: 'Education',
        alias: 'education',
      }, {
        id: 'cat03',
        name: 'History',
        alias: 'History',
      }, {
        id: 'cat04',
        name: 'Science',
        alias: 'science',
      }, {
        id: 'cat05',
        name: 'Cookbook',
        alias: 'cookbook',
      }, {
        id: 'cat06',
        name: 'Biography',
        alias: 'biography',
      }]);
    });
};
