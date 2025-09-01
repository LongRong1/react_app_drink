const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../database/db.js');


router.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi server');
    }
    res.json(results);
  });
});


router.post('/api/signin', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).send('Thiếu thông tin đăng nhập');
  }

  connection.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi server');
    }

    if (results.length === 0) {
      return res.status(401).send('Tên đăng nhập không hợp lệ');
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('❌ Lỗi so sánh mật khẩu:', err);
        return res.status(500).send('Lỗi server');
      }

      if (!isMatch) {
        return res.status(401).send('Mật khẩu không đúng');
      }

      res.send('Đăng nhập thành công');
      console.log('ok');
      
    });
  });
});

router.post('/api/signup', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).send('Thiếu thông tin đăng ký');
  }

  connection.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi server');
    }

    if (results.length > 0) {
      return res.status(409).send('Tên đăng nhập đã tồn tại');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('❌ Lỗi mã hóa mật khẩu:', err);
        return res.status(500).send('Lỗi server');
      }

      connection.query(
        'INSERT INTO user (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err) => {
          if (err) {
            console.error('❌ Lỗi truy vấn:', err);
            return res.status(500).send('Lỗi server');
          }

          res.status(201).send('Đăng ký thành công');
        }
      );
    });
  });
});

module.exports = router;
