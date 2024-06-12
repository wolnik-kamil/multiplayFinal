import { defineStore } from 'pinia'

export const useIpStore = defineStore('ip', {
    state: () => ({
        ip: {} as string,
    }),
    actions: {
        setIp(newIp: string) {
            this.ip = newIp;
        }
    }
});