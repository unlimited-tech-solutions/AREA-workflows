// creating a Hubspot Client 
const hubspot = require('@hubspot/api-client');
const hubSpotClient = new hubspot.Client({ accessToken: process.env.HUBKEY })





//making a graphQl call

async function makeGraphQlCall(){

}





//-----------------------------------------------------------------------------------------------------------------------------------------------
// Creating A Hubspot Contact


//axios based request
async function axiosCreateHSContact(){
  
}



//client based request
async function createHSContactClient(dealId){
    
    //request payload: properties to create record with
    const properties = {
      "firstname": "Bob",
      "lastname": "Thomas",
      "phone": "333-444-5667",
      "address": "405 Apple Dr",
      "address_2": "456 test",
      "city": "New York",
      "state": "NY",
      "zip": "64662",
      "email": "sfad@fsda.com",
      "country": "US"
    }


    //creates association for new contact
    const SimplePublicObjectInputForCreate = { 
      associations: [
      {
        "types": [
        { "associationCategory":"HUBSPOT_DEFINED",
          "associationTypeId": 4
        }
      ],
          "to":{
            "id": dealId 
          }
        }
      ], 
          properties 
        };
  
        //try catch for errors instead of callbacks
    try {
      const apiResponse = await hubSpotClient.crm.contacts.basicApi.create(SimplePublicObjectInputForCreate);
      //results are stringified 
      console.log(JSON.stringify(apiResponse, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
   }
    

//-----------------------------------------------------------------------------------------------------------------------------------------------
//Retrieving a Hubspot Contact



// By Search

//axios based
async function hsContactSearch(){

    //body is properties to search by
    const data =  {
       "filterGroups":[
         {
           "filters":[
             {
               "propertyName": "",
               //list of operators found at url: https://developers.hubspot.com/docs/api/crm/search#filter-search-results
               "operator": "EQ",
               "value": ``
             }
           ]
         }
       ]
     }
     let config = {
       method: 'post',
       maxBodyLength: Infinity,
       url: `https://api.hubapi.com/crm/v3/objects/contacts/search`,
       data: data,
       headers: { 
         "Authorization": `Bearer ${process.env.HUBKEY}`,
         "Accept": 'application/json' 
        }
     };
     axios.request(config)
     .then((response) => {
   
   
       const foundCompany = response.data
       console.log(foundCompany)
       return JSON.stringify(foundCompany)
     })
     .catch((error) => {
       console.log(error);
     });
   }




//-----------------------------------------------------------------------------------------------------------------------------------------------   
// Updating a Hubspot Contact

//axios based


async function updateHsContact(contactId){
   
    //properties to update on record -> must match contact properties on Hubspot
    //unregistered properties are ignored
    //object structure for body must have "properties" wrapper
     const properties = {
      "properties": {
        "planet": "Earth"
      }
      
    };
    
    //PATCH for updates
    const config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      data: properties,
      headers: { 
        "Authorization": `Bearer ${process.env.HUBKEY}`,
        "Accept": 'application/json'  
    }
    }
    
    axios.request(config).then((response) => console.log(response.status, response.statusText, response.data))
    }

//client based




//-----------------------------------------------------------------------------------------------------------------------------------------------


// Creating A Hubspot Deal


//axios based
async function createHSDealAxios(){
    const data = {
      "properties": {
        "amount": "1500.00",
        "dealname": "Star Trek Deep Space Nine",
        "pipeline": "default",
        "closedate": "2019-12-07T16:50:06.678Z",
        "dealstage": "presentationscheduled",
      }
    }
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.hubapi.com/crm/v3/objects/deals`,
      data: data,
      headers: { 
        "Authorization": `Bearer ${process.env.HUBKEY}`,
        "Accept": 'application/json'  
    }
  }
  
    axios.request(config).then((response) => console.log(response.status, response.statusText, response.data))
  
  }

  //client based
  async function createHSDealClient(){

  }

//-----------------------------------------------------------------------------------------------------------------------------------------------
// Retrieving Hubspot Deals

// By Search 

//axios based
async function hubspotDealSearch(propertyValue){
    
    // properties to search by
    // properties must be registered as Deal properties in hubspot
    const data = {
      "filterGroups":[
        {
          "filters":[
            {
              "propertyName": "color",
              "operator": "EQ",
              "value": propertyValue
            }
          ]
        }
      ]
    }


    //POST for search
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.hubapi.com/crm/v3/objects/deals/search`,
      data: data,
      headers: { 
        "Authorization": `Bearer ${process.env.HUBKEY}`,
        "Accept": 'application/json'  }
    };
    axios.request(config)
    .then((response) => {
      
    // records returned as array
      const foundOrder = response.data
      console.log(foundOrder.results[0].properties)
      return JSON.stringify(foundOrder)
    })
    .catch((error) => {
      console.log(error);
    });
  }





//-----------------------------------------------------------------------------------------------------------------------------------------------
// Creating a Hubspot Line Item


//axios based


// client based
async function createHSLineItem(dealId){
    // Properties are taken from Product properties (instead of Line Item Properties) in Hubspot
    // Custom Line Item properties must be registered as Hubspot Product Properties
    const properties = {
      "name": "New Line Item",
      "price": "6000.00",
      "quantity": 2,
      "hs_sku": "test",
    };


    const SimplePublicObjectInputForCreate = {
      properties,
      "associations": [
      {
        "to": {
          "id": dealId, 
        },
        // association types found at url: https://developers.hubspot.com/docs/api/crm/associations#association-type-id-values
        "types": [
          {
            "associationCategory": "HUBSPOT_DEFINED",
            "associationTypeId": 20
          }
        ]
      }
    ]  };
    
    
    
    try {
      console.log(SimplePublicObjectInputForCreate)
      const apiResponse = await hubSpotClient.crm.lineItems.basicApi.create(SimplePublicObjectInputForCreate);
      console.log(apiResponse);
      return apiResponse.id
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
    }

    

//-----------------------------------------------------------------------------------------------------------------------------------------------
    // Reading Line Items from a Hubspot Deal

    async function readLineItemsFromDeal(dealId){
        // get deal id from report input
    const BatchInputPublicFetchAssociationsBatchRequest = { inputs: [{"id":dealId,"after": 0}] };
    const fromObjectType = "deals";
    const toObjectType = "line_items";
    
    try {
      const apiResponse = await hubSpotClient.crm.associations.v4.batchApi.getPage(fromObjectType, toObjectType, BatchInputPublicFetchAssociationsBatchRequest);
      const lineItems = apiResponse.results[0].to
      let itemsIdArray = []
     
    
      //push batch to array
      for(let i=0; i < lineItems.length; i++){
        itemsIdArray.push(lineItems[i].toObjectId)
      }
        
      //read batch 
      itemsIdArray.forEach( async (item) => {
        const lineItemId = item 
        const properties = ["hs_sku", "epicor_line_id", "name", "quantity", "price"]
        const itemObject = await hubSpotClient.crm.lineItems.basicApi.getById(lineItemId, properties);
        console.log(itemObject)
        })
      } catch(e) {
        console.log(e)
      }
    }


//-----------------------------------------------------------------------------------------------------------------------------------------------
    // Associating Records

    // Contact to Deal Association creation
    // Client based
    async function associateContactDeal(contactId, dealId){
        //toObjectType is the target we are associating to
        const objectType = "contacts";
        const objectId = contactId;
        const toObjectType = "deals";
        const toObjectId = dealId;
        const AssociationSpec = [
          {
            "associationCategory": "HUBSPOT_DEFINED",
            //association types found at url: https://developers.hubspot.com/docs/api/crm/associations#association-type-id-values
            "associationTypeId": 4
          }
        ];
      
        try {
          const apiResponse = await hubSpotClient.crm.associations.v4.basicApi.create(objectType, objectId, toObjectType, toObjectId, AssociationSpec);
          console.log(JSON.stringify(apiResponse, null, 2));
        } catch (e) {
          e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
        }
      }



      //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // Calls
      readLineItemsFromDeal(12570291692)