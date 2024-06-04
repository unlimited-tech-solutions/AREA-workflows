export const postRecord = async (PRIVATE_APP_TOKEN, recordType, body) => {
    return axios.patch(`https://api.hubapi.com/crm/v3/objects/${recordType}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
      },
    });
  };

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// create deal + body reqs

const dealBody = {
    "properties": {
        "dealname": "",
        "dealstage": "", // <- must use internal ID's for deal stages (found in account settings/objects/deals.pipeline tab on hubspot)
        "amount": ""
    },
    "associations": [
        {
            "to": {
                "id": Number
            },
            "types": [
                {
                    "associationCategory": "HUBSPOT_DEFINED",
                    "associationTypeId": 5
                }
            ]
        }
    ]
}



export const createDeal = async (PRIVATE_APP_TOKEN, body) => {
    return axios.post(`https://api.hubapi.com/crm/v3/objects/deals`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
      },
    });
  };


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // create customer + body reqs

  const contactBody = {
    "properties": {
        "firstname": "Bob",
        "lastname": "Thomas",
        "phone": "333-444-5667",
        "email": "sfad@fsda.com",
    },
    "associations": [
        {
            "to": {
                "id": Number
            },
            "types": [
                {
                    "associationCategory": "HUBSPOT_DEFINED",
                    "associationTypeId": 5
                }
            ]
        }
    ]
  }

  export const createContact = async (PRIVATE_APP_TOKEN, contactBody) => {
    return axios.post(`https://api.hubapi.com/crm/v3/objects/contacts`, JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRIVATE_APP_TOKEN}`
        },
    });
  };


