import { Router } from 'express';
const router = Router();

router.post('/registration', (req, res) => {
  const formData = req.body;
  
  if (!formData || Object.keys(formData).length === 0) {
    return res.status(400).json({ error: 'No form data submitted' });
  }
  
  for (const key in formData) {
    if (!formData[key] && formData[key] !== 0) {
      return res.status(400).json({ 
        error: 'All fields must be filled', 
        field: key 
      });
    }
  }
  
  res.status(200).json({ 
    message: 'Registration successful', 
    success: true 
  });
});

export default router;