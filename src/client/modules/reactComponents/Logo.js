define([
    'preact',
    'htm'
], (
    preact,
    htm
) => {

    const {h, Component } = preact;
    const html = htm.bind(h);

    class Logo extends Component {
        constructor(props) {
            super(props);

            this.url = this.props.runtime.config('resources.docSite.base.url');
            this.logoURL = '/images/kbase_logo.png';
        }

        componentDidMount() {
        }

        render() {
            return html`
                <a href=${this.url}
                   className="-logo"
                   data-k-b-testhook-component="logo">
                     <img src=${this.logoURL} />
                </a>
            `;
        }
    }

    return Logo;
});