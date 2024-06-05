export default defineEventHandler((event) => {
    const xForwardedFor = getRequestHeader(event, 'x-forwarded-for');
    const xRealIp = getRequestHeader(event, 'x-real-ip');
    const userIp = xForwardedFor || xRealIp || event.node.req.socket.remoteAddress;

     if (event.node.req.url?.includes(`/api/address/house`))
        console.log('IP for address: ', userIp);
})

// poniżej konfiguracja nagłówków w np. nginx: (plik nginx.conf)
// proxy_set_header Host $host;
// proxy_set_header X-Forwarded-Proto $scheme;
// proxy_set_header X-Real-IP $remote_addr;
// proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;