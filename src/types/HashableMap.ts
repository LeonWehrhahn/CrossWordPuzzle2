export interface Hashable {
  hash(): InnerHashKey;
}

// A correct hashmap since javascript somehow cant hash custom objects
export class HashableMap<K extends Hashable, V> extends Map<K, V> {
  private readonly _innerMap: InnerMap<K, V> = new InnerMap<K, V>();

  // Map<K, V> interface overload.
  public get(key: K): V | undefined {
    return this._innerMap.get(key.hash())?.value;
  }
  public has(key: K): boolean {
    return this._innerMap.has(key.hash());
  }
  public set(key: K, value: V): this {
    this._innerMap.set(key.hash(), { key: key, value: value });
    return this;
  }
  public delete(key: K): boolean {
    return this._innerMap.delete(key.hash());
  }
  public get size(): number {
    return this._innerMap.size;
  }
  public forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    this._innerMap.forEach((value: InnerValue<K, V>): void =>
      callbackfn(value.value, value.key, thisArg)
    );
  }
  public entries(): IterableIterator<[K, V]> {
    return Array.from(this._innerMap.values())
      .map((value: InnerValue<K, V>): [K, V] => [value.key, value.value])
      .values();
  }
  public keys(): IterableIterator<K> {
    return Array.from(this._innerMap.values())
      .map((value: InnerValue<K, V>): K => value.key)
      .values();
  }
  public values(): IterableIterator<V> {
    return Array.from(this._innerMap.values())
      .map((value: InnerValue<K, V>): V => value.value)
      .values();
  }
  public clear(): void {
    this._innerMap.clear();
  }
}

type InnerHashKey = any;
type InnerValue<K, V> = { key: K; value: V };
class InnerMap<K, V> extends Map<InnerHashKey, InnerValue<K, V>> {}
