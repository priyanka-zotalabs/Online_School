const getTimezone = (timezone) => {
    if(timezone && timezone.includes("Pacific")) {
        return 'PST';
    }
    else if(timezone && timezone.includes("Central")) {
        return 'CST';
    }
    else if(timezone &&  timezone.includes("Eastern")) {
        return 'EST';
    }
    // switch(timezone) {
    //     case 'Pacific Standard Time': return 'PST';
    //     case 'Central Standard Time': return 'CST';
    //     case 'Eastern Standard Time': return 'EST';

    // }
}

module.exports = {
    getTimezone
}
