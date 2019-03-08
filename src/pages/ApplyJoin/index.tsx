import React from 'react';
import './index.scss';
import { Header, Toast, Loading, Pagination } from '../../components/index';
import { inject, observer } from 'mobx-react';


interface IProps {
    getMessageCount(): void,
    messageCount: Number

    loading: Boolean,
    setLoading(val: Boolean): void,
    locale: {
        prevText: String,
        nextText: String,
    }
}


interface IState {
    header: IHeader;
}

interface IHeader {
    onOpen?(): void;
    isOpen?: boolean;
    title?: String;
}


interface IPropsPage {
    totalPage: number,
    paging(obj: Object): void
}

@inject(({ messages, status }) => ({
    getMessageCount: messages.getMessageCount,
    messageCount: messages.messageCount,
    loading: status.loading,
    setLoading: status.setLoading
}))

@observer
class ApplyJoin extends React.Component<IProps, IState>{

    componentWillMount() {
        this.props.getMessageCount();
        this.props.setLoading(false);
    }

    private header = {
        isOpen: true,
        onOpen: () => {
            Toast.fail("打开成功", 2, () => {
                this.setState({ header: { title: "sdf" } })
            });
        },
    }

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            header: this.header
        };
    }

    render() {
        const { messageCount, loading } = this.props;
        const pages = {
            totalPage: 21,
            paging: (obj) => {
                // this.props.setLoading(true);
                // setTimeout(() => {
                //     this.props.setLoading(false);
                // }, 3000)
                console.log(obj);
            }
        }

        return (
            <div id="apply-join">

                {/* <Header {...this.state.header} /> */}

                {messageCount}

                {loading ? <Loading /> : ""}

                <Pagination {...pages} />
            </div>
        )
    }
}

export default ApplyJoin;