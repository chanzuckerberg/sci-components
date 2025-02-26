import { RenderableObject } from "./renderable_object";

export type LayerState = "initialized" | "loading" | "ready";

type StateChangeCallback = (
  newState: LayerState,
  prevState?: LayerState
) => void;

export abstract class Layer {
  private objects_: RenderableObject[] = [];
  private state_: LayerState = "initialized";
  private callbacks_: StateChangeCallback[] = [];

  public abstract update(): void;

  public get objects() {
    return this.objects_;
  }

  public get state() {
    return this.state_;
  }

  public addStateChangeCallback(callback: StateChangeCallback) {
    this.callbacks_.push(callback);
  }

  public removeStateChangeCallback(callback: StateChangeCallback) {
    const index = this.callbacks_.indexOf(callback);
    if (index === undefined) {
      throw new Error(`Callback to remove could not be found: ${callback}`);
    }
    this.callbacks_.splice(index, 1);
  }

  protected setState(newState: LayerState) {
    const prevState = this.state_;
    this.state_ = newState;
    console.debug(`${this.constructor.name} state change: ${newState}`);
    this.callbacks_.forEach((callback) => callback(newState, prevState));
  }

  protected addObject(object: RenderableObject) {
    this.objects_.push(object);
  }

  protected clearObjects() {
    this.objects_ = [];
  }
}
