import api from '../api';
import { AnyObject } from '../../types';

export const listCallback = async (path: string, params = {}) => {
  const response = await api.get(path, { params });

  return response.data;
};

export const singleCallback = async (path: string, params: AnyObject) => {
  const response = await api.get(`${path}/${params.userId}`);

  return response.data;
};

export const updateCallback = async (path: string, payload: FormData | Record<string, any>) => {
  const response = await api.put(path, payload);

  return response.data;
};

export const upgradeCallback = async <Module extends { id?: string }>(
  path: string,
  payload: Module
) => {
  const response = await api.patch(`${path}/${payload.id}`, payload);

  return response.data;
};

export const createCallback = async <Module>(path: string, payload: Module) => {
  const response = await api.post(`${path}`, payload);

  return response.data;
};

export const copyCallback = async (path: string, { id }: { id: string | number }) => {
  const response = await api.post(`${path}/${id}`);

  return response.data;
};

export const deleteCallback = async (
  path: string,
  { id, params }: { id: string | number; params?: AnyObject }
) => {
  const response = await api.delete(`${path}/${id}`, { params });

  return response.data;
};
