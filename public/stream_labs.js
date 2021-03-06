// Stream Labs
var streamlabsSocket = null;

const initLabs = (authToken) => {
    streamlabsSocket = io(`https://sockets.streamlabs.com?token=${authToken}`, { transports: ['websocket'] });
    streamlabsSocket.on('event', (eventData) => {
        console.log(eventData)
        if (eventData.type === 'donation') {
            var currency = eventData.message[0]?.formatted_amount?.charAt(0);
            if (currency == '$' || currency == '€' || currency == '£') {
                countDownDate = new Date(
                    countDownDate.getTime() + eventData.message[0].amount * timeMultiplier * 60000
                );

                var now = new Date().getTime();

                var distance = countDownDate.getTime() - now;
                $.post('http://localhost:3000/setTimer', { time: Math.floor(distance / 1000) });
            }
        } else if (eventData.type === 'stars' ) {
            countDownDate = new Date(
                countDownDate.getTime() + eventData.message[0].amount * timeMultiplier * 600
            );

            var now = new Date().getTime();

            var distance = countDownDate.getTime() - now;
            $.post('http://localhost:3000/setTimer', { time: Math.floor(distance / 1000) });
        }
    });
};

closeLabs = () => {
    streamlabsSocket?.close();
    streamlabsSocket = null;
};
