import client from './client';
import { User, UserModel } from '../models/user';

<<<<<<< HEAD
export const getUser = (): User => ({
  username: '홍사장',
  userId: 'gagesajang@gmail.com',
  password: 'h12341234!',
  store: {
    name: '가게사장',
    address: '부산 강서구 녹산동 11-1',
    cs: '한식전문점',
    quarter: 40000000,
    clerk: 2,
    area: 20.4,
  },
});
=======
export const helloUser = async (name: string) => {
  const { data } = await client.get(`user/hello?name=${name}`);

  return data;
};

export const userSignUp = async (params: UserModel) => {
  const { data } = await client.post('user/signup', params);

  return data;
};

export const userLogin = async (params: UserModel) => {
  const { data } = await client.post('user/login', params);

  return data;
};
>>>>>>> feature/front/user_signup