import { useIpStore } from '@/stores/ipStore';
export default defineNuxtRouteMiddleware((to, from) => {
    const headers = useRequestHeaders();
    const ipStore = useIpStore();
    let ip;
    if (process.server) {
        // Po stronie serwera użyj nagłówków HTTP do uzyskania adresu IP
        ip = headers['x-forwarded-for'] || headers['remote-host'] || 'Unknown';
        console.log(`Server-side IP: ${ip}`);
    } else {
        // Po stronie klienta możesz użyć czegoś bardziej zaawansowanego
        ip = ipStore.ip;
        console.log(`Client-side IP: ${ip}`);
    }

    ipStore.setIp(ip);
});


// poniżej konfiguracja nagłówków w np. nginx: (plik nginx.conf)
// proxy_set_header Host $host;
// proxy_set_header X-Forwarded-Proto $scheme;
// proxy_set_header X-Real-IP $remote_addr;
// proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;