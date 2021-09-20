
exports.seed = function(knex) {
  return knex('product').del()
    .then(function () {
      return knex('product').insert([
        {
          id: 1,
          name: 'Cthulhu Shirt',
          category: 'shirt',
          details: "Black shirt with Trust in God on it",
          cost: 0,
          stock: 0,
          product_pic_id: '../product_examples/shirt-1.jpg'
        },
        {
          id: 2,
          name: 'Grim Reaper Shirt',
          category: 'shirt',
          details: "Grey shirt with Tag you're it on it",
          cost: 0,
          stock: 0,
          product_pic_id: '../product_examples/shirt-2.jpg'
        },
        {
          id: 3,
          name: 'Alien Shirt',
          category: 'shirt',
          details: "White shirt with Don't trust Strangers on it",
          cost: 0,
          stock: 0,
          product_pic_id: '../product_examples/shirt-3.jpg'
        },
        
      ]);
    });
};
