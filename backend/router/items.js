const express = require('express');
const router = express.Router();
const apiItems = require('../api/items.json');

router.get('/api/items', (req, res) => {
  try{
    res.json(apiItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post('/api/items', (req, res) => {
//   const { name, description } = req.body;

//   if (!name || !description) {
//     return res.status(400).json({ error: "Thiếu name hoặc description" });
//   }

//   // Tìm id lớn nhất hiện tại
//   const lastItem = apiItems.items[apiItems.items.length - 1];
//   const newId = lastItem ? lastItem.id + 1 : 1;

//   const newItem = {
//     id: newId,
//     name,
//     description
//   };

//   apiItems.items.push(newItem);

//   res.status(201).json({ message: "Thêm thành công", item: newItem });
// });

// fetch('http://localhost:3007/api/items')
//   .then(res => res.json())
//   .then(items => {
//     const lastId = items.length > 0 ? items[items.length - 1].id : 0;
//     const newId = lastId + 1;

//     return fetch('http://localhost:3007/api/items', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         id: newId,
//         name: "Item mới",
//         description: "Mô tả cho item mới"
//       })
//     });
//   })
//   .then(res => res.json())
//   .then(data => console.log("Đã thêm:", data))
//   .catch(error => console.error("Lỗi:", error));

router.post('/api/items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Thiếu name hoặc description" });
  }

  // Tìm id lớn nhất hiện tại
  const lastItem = apiItems.items[apiItems.items.length - 1];
  const newId = lastItem ? lastItem.id + 1 : 1;

  const newItem = {
    id: newId,
    name,
    description
  };

  apiItems.items.push(newItem);

  res.status(201).json({ message: "Thêm thành công", item: newItem });
});

module.exports = router;
