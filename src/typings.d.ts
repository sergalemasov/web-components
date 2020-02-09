declare module '*';

/* SystemJS module definition */
declare var module: NodeModule;

// tslint:disable:interface-name
interface NodeModule {
    id: string;
}

declare module '*.component.less' {
    const content: any;

    export default content;
}
