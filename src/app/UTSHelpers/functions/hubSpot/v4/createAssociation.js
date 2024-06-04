export const associateRecords = async (PRIVATE_APP_TOKEN, body, fromObjectType, fromObjectId, toObjectType, toObjectId) => {
    return axios.patch(`https://api.hubapi.com/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/default/${toObjectType}/${toObjectId}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
      },
    });
  };


// body reqs

const body = [
        {
          "associationCategory": "HUBSPOT_DEFINED",
          "associationTypeId": 0 // association types are defined here: https://developers.hubspot.com/docs/api/crm/associations#association-type-id-values
        }
      ];



