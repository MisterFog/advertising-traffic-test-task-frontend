import { EffectCallbacks } from '../actions';

export const usersEffectCallbacks = new EffectCallbacks('api/people');

export const profileEffectCallbacks = new EffectCallbacks('api/user/profile');

export const loginEffectCallbacks = new EffectCallbacks('api/auth/login');

export const registerEffectCallbacks = new EffectCallbacks('api/auth/register');

// Экземпляр класса для работы с другими данными
// export const otherEffectCallbacks = new EffectCallbacks('/otherPath');
