export const getPersonnelDetail = async (id) => {
  try {
    const response = await axios.get(`/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error('获取人员详情失败:', error);
    throw error;
  }
};
export const getPersonnelBasic = async () => {
  try {
    const response = await axios.get(`/basic`);
    return response.data;
  } catch (error) {
    console.error('获取人员基本信息失败:', error);
    throw error;
  }
};
export const getPersonnelList = async (query) => {
  try {
    const response = await axios.get(`/basic`, {
      params: query
    });
    return response.data;
  } catch (error) {
    console.error('获取人员列表失败:', error);
    throw error;
  }
};