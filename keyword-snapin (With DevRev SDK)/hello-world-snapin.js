// hello-world-snapin.js

const DevRev = require('devrev');

module.exports = async function (event, context) {
    const keyword = context.inputs.keyword;
    const timelineEntry = event.timeline_entry_created;
    
    if (timelineEntry && timelineEntry.content.includes(keyword)) {
        const ownerId = timelineEntry.owner_id;
        const notificationMessage = `Keyword "${keyword}" detected in your timeline entry.`;

        await DevRev.notifications.create({
            owner_id: ownerId,
            message: notificationMessage,
        });

        return {
            status: 'success',
            message: 'Notification sent successfully.'
        };
    }

    return {
        status: 'ignored',
        message: 'Keyword not found in timeline entry.'
    };
};
