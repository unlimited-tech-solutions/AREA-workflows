export const patchRecord = async (PRIVATE_APP_TOKEN, recordType, recordId, body) => {
  return axios.patch(`https://api.hubapi.com/crm/v3/objects/${recordType}/${recordId}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PRIVATE_APP_TOKEN}`
    }
  });
};

export const patchDeal = async (PRIVATE_APP_TOKEN, dealId, body) => {
  return axios.patch(`https://api.hubapi.com/crm/v3/objects/deals/${dealId}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PRIVATE_APP_TOKEN}`
    }
  });
};
