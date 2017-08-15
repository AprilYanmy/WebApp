import React, {Component} from 'react';
import './index.less'
export default class LoadMore extends Component {

    render() {
        return (
            <div className="has-more">
                {
                    this.props.hasMore ? <div ref="more" onClick={this.loadMore.bind(this)}>加载更多</div> :
                        <div>我是有底线的</div>
                }
            </div>
        )
    }

    componentDidMount() {//绑定滚动事件
        this.fn = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                console.log('滚动');
                if (this.props.isLoad) {
                    return
                }
                let screen = window.screen.height;
                //getBoundingClientRect() 获取当前元素上左下右的属性
                let top = this.refs.more.getBoundingClientRect().top;
                if (top < screen) {
                    this.props.loadMore();
                }
            }, 50)
        }
        window.addEventListener('scroll', this.fn)
    }

    componentWillUnmount() {//移除滚动事件
        window.removeEventListener('scroll', this.fn)
    }

    loadMore() {//调用父级传递的加载更多
        if (this.props.isLoad) {
            return
        }
        this.props.loadMore()
    }
}