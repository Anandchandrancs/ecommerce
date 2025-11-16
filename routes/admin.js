var express = require('express');
var router = express.Router();

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

module.exports = router;
