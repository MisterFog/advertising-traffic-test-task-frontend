import { AnyObject } from '../../types';
import * as callbacks from './callbacks';

export class EffectCallbacks {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public list = (params: AnyObject) => callbacks.listCallback(this.path, params);

  public single = (params: AnyObject) => callbacks.singleCallback(this.path, params);

  public update = (payload: FormData | Record<string, any>) =>
    callbacks.updateCallback(this.path, payload);

  public upgrade = <Module extends { id?: string }>(payload: Module) =>
    callbacks.upgradeCallback(this.path, payload);

  public create = <Module>(payload: Module) => callbacks.createCallback(this.path, payload);

  public copy = ({ id }: { id: string | number }) => callbacks.copyCallback(this.path, { id });

  public delete = ({ id, params }: { id: string | number; params: AnyObject }) =>
    callbacks.deleteCallback(this.path, { id, params });
}
