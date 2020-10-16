define([
    'preact',
    'htm',
    '../reactComponents/OpenNarrative',
    '../narrativeManager',
    '../reactComponents/Loading',
    '../reactComponents/ErrorAlert',

    'bootstrap'
], (
    preact,
    htm,
    OpenNarrative,
    NarrativeManagerService,
    Loading,
    ErrorAlert
) => {

    const { h, Component } = preact;
    const html = htm.bind(h);


    // app: params.app,
    // method: params.method,
    // copydata: params.copydata,
    // appparam: params.appparam,
    // markdown: params.markdown

    class NewNarrativeMain extends Component {
        constructor(props) {
            super(props);
            this.state = {
                status: null,
                data: null,
                error: null
            };
        }

        componentDidMount() {
            this.props.runtime.send('ui', 'setTitle', 'Creating and Opening New Narrative...');
            this.setState({
                status: 'creating'
            });
            this.createNewNarrative()
                .then((result) => {
                    this.setState({
                        status: 'success',
                        data: result
                    });
                })
                .catch((ex) => {
                    this.setState({
                        status: 'error',
                        error: {
                            message: ex.message
                        }
                    });
                });
        }

        makeNarrativePath(workspaceID) {
            return `https://${window.location.host}/narrative/${workspaceID}`;
        }

        createNewNarrative() {
            return Promise.resolve()
                .then(() => {
                    if (this.props.params.app && this.props.params.method) {
                        throw new Error('Must provide no more than one of the app or method params');
                    }
                    let appData, tmp, i;
                    const newNarrativeParams = {};
                    if (this.props.params.copydata) {
                        newNarrativeParams.importData = this.props.params.copydata.split(';');
                    }

                    // Note that these are exclusive cell creation options.
                    if (this.props.params.app || this.props.params.method) {
                        newNarrativeParams.method = this.props.params.app || this.props.params.method;
                        if (this.props.params.appparam) {
                            /* TODO: convert to forEach */
                            tmp = this.props.params.appparam.split(';');
                            appData = [];
                            for (i = 0; i < tmp.length; i += 1) {
                                appData[i] = tmp[i].split(',');
                                if (appData[i].length !== 3) {
                                    throw new Error(
                                        'Illegal app parameter set, expected 3 parameters separated by commas: ' + tmp[i]
                                    );
                                }
                                /* TODO: use standard lib for math and string->number conversions) */
                                appData[i][0] = parseInt(appData[i][0], 10);
                                if (isNaN(appData[i][0]) || appData[i][0] < 1) {
                                    throw new Error(
                                        'Illegal app parameter set, first item in set must be an integer > 0: ' + tmp[i]
                                    );
                                }
                            }
                            newNarrativeParams.appData = appData;
                        }
                    } else if (this.props.params.markdown) {
                        newNarrativeParams.markdown = this.props.params.markdown;
                    }

                    const narrativeManager = new NarrativeManagerService({ runtime: this.props.runtime });

                    return narrativeManager.createTempNarrative(newNarrativeParams)
                        .then((info) => {
                            return {
                                url: this.makeNarrativePath(info.narrativeInfo.wsid)
                            };
                        });
                });
        }

        render() {
            switch (this.state.status) {
                case 'creating':
                    return html`
                    <${Loading} message="Creating and opening a new narrative..." detectSlow=${true} />
                `;
                case 'error':
                    return html`
                    <${ErrorAlert} title="Error">
                        <p>
                            Sorry, there was an error creating or opening a new narrative:
                        </p>
                        <p>
                            ${this.state.error.message}
                        </p>
                    <//>
                `;
                case 'success':
                    var props = {
                        runtime: this.props.runtime,
                        url: this.state.data.url
                    };
                    return html`<${OpenNarrative} ...${props} />`;
                default:
                    return html`
                <${ErrorAlert}>
                    Unexpected status: ${this.state.status}
                <//>`;
            }
        }
    }

    return NewNarrativeMain;
});
