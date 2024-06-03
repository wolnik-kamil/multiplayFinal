export default defineEventHandler((event) => {
    const ip = getRequestHeader(event, 'x-forwarded-for') || event.node.req.connection.remoteAddress;
    console.log('ip address: ' + ip);
})