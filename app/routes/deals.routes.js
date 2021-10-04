module.exports = app => {
    const deals = require("../controllers/deal.controller.js");
  
    
    app.post("/deals", deals.create);
  
 
    app.get("/deals", deals.findAll);
  

    app.get("/deal/:dealId", deals.findOne);
  
    
    app.put("/deal/:dealId", deals.update);
  
 
    app.delete("/deal/:dealId", deals.delete);
  
    
    app.delete("/deals", deals.deleteAll);
  };
  