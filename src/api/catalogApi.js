import apiClient from './apiClient';

function getErrorMessage(error) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'Ocurrio un error inesperado';
}

export async function listByPath(path) {
  try {
    const { data } = await apiClient.get(path);
    return data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createByPath(path, payload) {
  try {
    const { data } = await apiClient.post(path, payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateByPath(path, id, payload) {
  try {
    const { data } = await apiClient.put(`${path}/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function removeByPath(path, id) {
  try {
    const { data } = await apiClient.delete(`${path}/${id}`);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
