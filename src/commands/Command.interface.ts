interface Command {
    name: string;
    init?: Function;
    callback: Function;
}

export default Command;