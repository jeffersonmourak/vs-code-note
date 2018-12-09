class Context {
    private events : Map< string , Array <Function> > = new Map();

    subscribe(name : string, listener : Function) {
        let listeners : Array <Function> | undefined = this.events.get(name);

        if (!listeners) {
            listeners = [];
            
        } 

        listeners = [ ...listeners, listener ];
        
        this.events.set(name, listeners);

        return () => {
            this.unsubscribe(name, listener);
        };
    }

    unsubscribe(name : string, listener : Function) {
        let listeners : Array <Function> | undefined = this.events.get(name);

        if (!listeners) {
            return;
        }

        this.events.set(name, listeners.filter( l => l !== listener ));
    }

    publish(name : string, options? : any) {
        let listeners : Array <Function> = this.events.get(name) || [];

        for (let listener of listeners) {
            listener(options);
        }
    }
}


export default new Context();