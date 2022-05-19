import React, { Component } from 'react';

export class ScrollToTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }
    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener('scroll', function (e) {
            scrollComponent.toggleVisibility();
        });
    }
    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({ is_visible: true });
        } else {
            this.setState({ is_visible: false });
        }
    }
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    render() {
        const { is_visible } = this.state;
        return (
            <div className="scroll-to-top" style={{ position: 'fixed', right: 30, bottom: 30 }}>
                {is_visible && (
                    <div
                        onClick={() => this.scrollToTop()}
                        className="bg-primary text-white rounded p-2"
                        style={{ cursor: 'pointer', zIndex: 10 }}
                    >
                        <i className="feather icon-arrow-up" style={{ fontSize: 30 }}></i>
                    </div>
                )}
            </div>
        );
    }
}

export default ScrollToTop;
