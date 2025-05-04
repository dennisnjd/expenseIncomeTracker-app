// MMKVStorage.js
import { MMKV } from 'react-native-mmkv';

// Only create ONE instance and reuse it everywhere
const storage = new MMKV();

// Save a single item
export const mmkvSetItem = (key: string, value: any) => {
    storage.set(key, value);
};

// Get a single item
export const mmkvGetItem = (key: string, type: 'string' | 'number' | 'boolean' = 'string') => {
    if (type === 'number') return storage.getNumber(key);
    if (type === 'boolean') return storage.getBoolean(key);
    return storage.getString(key); // default is string
};

// Delete a single item
export const mmkvDeleteItem = (key: string) => {
    storage.delete(key);
};

// Clear all storage
export const mmkvClearAll = () => {
    storage.clearAll();
};

// Save multiple items at once (like AsyncStorage.multiSet)
export const mmkvMultiSet = (items: [string, any][] = []) => {
    items.forEach(([key, value]) => {
        storage.set(key, value);
    });
};
