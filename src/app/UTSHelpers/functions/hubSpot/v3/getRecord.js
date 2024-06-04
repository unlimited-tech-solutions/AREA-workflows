export const getRecord = async (PRIVATE_APP_TOKEN, recordType) => {
    return axios.get(`https://api.hubapi.com/crm/v3/objects/${recordType}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
      },
    });
  };