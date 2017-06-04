var apiSettings = require('./eventapi.config.json');
var request = require("request")
class EventApi{
    constructor(){
        this.url = apiSettings.url;
        this.port = apiSettings.port
        this.resource = apiSettings.resource
    }

    post(events,source, next){
        let endpoint =  this.port ?   this.url+`:${this.port}${this.resource}`:this.url+`${this.resource}` 
        var options = {
            method: 'POST',
            url: endpoint,
            headers:{
                'content-type':'application/json'
            },
            body:{"events": events.events,
                  "metadata":events.metadata,
                  "source": source
            },
            json:true
        };

        request(options,(err, response, body)=>{
            console.log(err);
            if(err){
                return next(err);
            }
            return next(null, response)            
        })
    }
}

module.exports = EventApi;