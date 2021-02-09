import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader()
  // MODES.MULTI_PROCESS = ACCESSIBLE BY APP GROUP (iOS)
  .setProcessingMode(MMKVStorage.MODES.MULTI_PROCESS)
  .withEncryption()
  .initialize();

class UserPreferences {
  private readonly mmkv: MMKVStorage.API;

  constructor() {
    this.mmkv = MMKV;
  }

  async getStringAsync(key: string): Promise<string | null> {
    try {
      const value = await this.mmkv.getStringAsync(key);
      return value;
    } catch {
      return null;
    }
  }

  setStringAsync(key: string, value: string): Promise<boolean> {
    return this.mmkv.setStringAsync(key, value);
  }

  async getBoolAsync(key: string): Promise<boolean> {
    try {
      const value = await this.mmkv.getBoolAsync(key);
      return value;
    } catch {
      return false;
    }
  }

  setBoolAsync(key: string, value: boolean): Promise<boolean> {
    return this.mmkv.setBoolAsync(key, value);
  }

  async getMapAsync(key: string): Promise<any | null> {
    try {
      const value = await this.mmkv.getMapAsync(key);
      return value;
    } catch {
      return null;
    }
  }

  setMapAsync(key: string, value: any): Promise<boolean> {
    return this.mmkv.setMapAsync(key, value);
  }

  removeItem(key: string) {
    return this.mmkv.removeItem(key);
  }
}

const userPreferences = new UserPreferences();
export default userPreferences;
