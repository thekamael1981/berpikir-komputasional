// Local storage utilities for offline functionality
class Storage {
    static init() {
        // Initialize storage with default values if not present
        if (!this.get('initialized')) {
            this.set('initialized', true);
            this.set('version', '1.0');
            this.set('installDate', Date.now());
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(`ct_app_${key}`, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    static get(key) {
        try {
            const item = localStorage.getItem(`ct_app_${key}`);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return null;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(`ct_app_${key}`);
            return true;
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
            return false;
        }
    }

    static clear() {
        try {
            // Only clear app-specific items
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('ct_app_')) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }

    static getAll() {
        try {
            const result = {};
            const keys = Object.keys(localStorage);
            
            keys.forEach(key => {
                if (key.startsWith('ct_app_')) {
                    const cleanKey = key.replace('ct_app_', '');
                    result[cleanKey] = JSON.parse(localStorage.getItem(key));
                }
            });
            
            return result;
        } catch (error) {
            console.error('Failed to get all from localStorage:', error);
            return {};
        }
    }

    static getSize() {
        try {
            let totalSize = 0;
            const keys = Object.keys(localStorage);
            
            keys.forEach(key => {
                if (key.startsWith('ct_app_')) {
                    totalSize += localStorage.getItem(key).length;
                }
            });
            
            return totalSize;
        } catch (error) {
            console.error('Failed to calculate storage size:', error);
            return 0;
        }
    }

    static isAvailable() {
        try {
            const test = 'localStorage_test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    static backup() {
        const data = this.getAll();
        return {
            data: data,
            timestamp: Date.now(),
            version: data.version || '1.0'
        };
    }

    static restore(backup) {
        try {
            if (backup && backup.data) {
                // Clear existing data
                this.clear();
                
                // Restore backup data
                Object.keys(backup.data).forEach(key => {
                    this.set(key, backup.data[key]);
                });
                
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to restore backup:', error);
            return false;
        }
    }
}
