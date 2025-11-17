var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');
var path = require('path');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [
    {
      name:"Iphone 17",
      category:"Mobile",
      description:"This is iphone 17 new model",
      image:"https://images.macrumors.com/article-new/2025/02/iPhone-17-Roundup-Feature-2.jpg"
    },
    {
      name:"Realme",
      category:"Mobile",
      description:"Real me mew model",
      image:"https://waltonbd.com/image/catalog/home-page/half-block/nexg-n6-block.jpg"
    },
    {
      name:"One Plus",
      category:"Mobile",
      description:"1+ new one",
      image:"https://www.bez-kabli.pl/news/wp-content/uploads/2025/11/OnePlus-15-1-1024x683.jpg"
    },
    {
      name:"Pixel",
      category:"Mobile",
      description:"Pixel with no pix",
      image:"https://tse3.mm.bing.net/th/id/OIP.la77yBFXRFpAPBft3VqvOAHaEK?pid=Api&P=0&h=180"
    }
  ];
  res.render('admin/view-products', {admin:true, products})
});

router.get('/add-product', function(req,res){
  res.render('admin/add-product', {admin:true})
})

router.post('/add-product', (req, res) => {
  const product = req.body;
  const uploadedImage = req.files && req.files.image;

  console.log('add-product body:', product);
  console.log('req.files:', !!req.files, req.files ? Object.keys(req.files) : null);

  productHelpers.addProduct(product, (id) => {
    if (!id) {
      console.error('addProduct failed, id is null');
      return res.status(500).send('Failed to add product');
    }

    const uploadDir = path.join(__dirname, '..', 'public', 'product-images');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    if (uploadedImage) {
      // preserve original extension if available
      const ext = path.extname(uploadedImage.name) || '.jpg';
      const uploadPath = path.join(uploadDir, id + ext);

      uploadedImage.mv(uploadPath, (err) => {
        if (err) {
          console.error('image.mv error', err);
          return res.status(500).send('Image upload failed');
        }
        console.log('Image saved to', uploadPath);
        res.redirect('/admin');
      });
    } else {
      console.log('No image uploaded for product id', id);
      res.redirect('/admin');
    }
  });
});

module.exports = router;
