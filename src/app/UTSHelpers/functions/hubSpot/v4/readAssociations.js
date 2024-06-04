export const getRecordAssociations = async (PRIVATE_APP_TOKEN, objectType, objectId, toObjectType) => {
    return axios.get(`https://api.hubapi.com/crm/v4/objects/${objectType}/${objectId}/associations/default/${toObjectType}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
      },
    });
  };


