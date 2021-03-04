/*

    import DataController from "./DataController"



    DataController.subscribe(elem, "varname")
    DataController.subscribe(elemArray, "varname")

    how does the aes alogirhtm work


    3 Blockgräßen: 128, 192, 256
    variable Schlüssellänge (128, 192, 256)


    //

    name: [elements] => name: data

    name: [data]
*/


const TEST_STATE = {
    gridData: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
}

class DataController{
    constructor(){
        this.state = {
            ...TEST_STATE
        }

        this.subscriptions = {}
    }


    updateState = (name, value) => {
        this.state = {...this.state, [name]:value}

        // call suscribed

        this.getSubscriptions(name).forEach(subscribedElement => {
            // update elements
            this.setSubscriberData(name, subscribedElement)
        })

    }


    setSubscriberData = (name, subscribers) => {
        if(Array.isArray(subscribers)){
            subscribers.forEach((elem, idx) => {
                const subscribedData = this.getSubscriptionData(name)

                const data = Array.isArray(subscribedData) && typeof subscribedData[idx] !== 'undefined' ?
                    subscribedData[idx] : subscribedData;

               
               elem.innerHTML = data
            })
        }
    }

    subscribe = (name, elements) => {
        const oldSubscriptions = name in this.subscriptions ? this.subscriptions.name : []

        this.subscriptions = {
            ...this.subscriptions,
            [name]: [...oldSubscriptions, elements]
        }

        // set data for new subscriptions
        this.setSubscriberData(name, elements)
    }

    getSubscriptionData(name){
        if(typeof this.state[name] === 'undefined') return null;
        return this.state[name]
    }

    getSubscriptions(name){
        if(!name in this.subscriptions) return []
        return this.subscriptions[name]
    }
}

export default new DataController();