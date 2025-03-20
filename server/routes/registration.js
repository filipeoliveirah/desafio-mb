const express = require('express');
const router = express.Router();

router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});


router.post('/registration', (req, res) => {
  const formData = req.body;
  
  if (!formData || Object.keys(formData).length === 0) {
    return res.status(400).json({ error: 'Nenhum dado recebido' });
  }
  

  for (const key in formData) {
    if (!formData[key] && formData[key] !== 0) {
      return res.status(400).json({ 
        error: 'Os campos não podem estar vazios',
        field: key 
      });
    }
  }

  res.status(200).json({ 
    message: 'Registrado com sucesso!', 
    success: true 
  });
});

module.exports = router;