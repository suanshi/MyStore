import React, { Component } from 'react';
import ReactPullLoad, { STATS } from "react-pullload";
import Unit from 'rsfl-axios';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            hasMore: true,
            action: STATS.init,
            index: 1,
            page:1
        }
    }
    
    componentDidMount(){
        
    }
    init(){
        Unit.getApi2("/home/mediareports",{
            page_number: "1",
            page_size: "10",
        }).then(res=>{
            console.log(res)
        })
    }
    handleAction = (action) => {
        if (action === this.state.action) {
          return false;
        }
        if (action === STATS.refreshing) {
          //刷新
          this.handRefreshing();
        } else if (action === STATS.loading) {
          //加载更多
          this.handLoadMore();
        } else {
          //DO NOT modify below code
          this.setState({
            action: action,
          });
        }
    };
    handRefreshing = () => {
        if (STATS.refreshing === this.state.action) {
          return false;
        }
    
        setTimeout(() => {
          //refreshing complete
          this.setState({
            // data: cData,
            hasMore: true,
            action: STATS.refreshed,
            index: 1,
          });
          this.init();
        }, 3000);
    
        this.setState({
          action: STATS.refreshing,
        });
    };
    handLoadMore = () => {
        // console.log(this.props)
        const { apiTxt } = this.props.load;
        if (STATS.loading === this.state.action) {
          return false;
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) return;
    
        setTimeout(() => {
          if (this.state.index === 0) {
            this.setState({
              action: STATS.reset,
              hasMore: false,
            });
          } else {
            this.setState({
              action: STATS.reset,
              index: this.state.index - 1,
            });
          }
          console.log("加载更多");
          this.setState((state, props) => {
            page: state.page++;
          });
          this.getAjax(this.state.page,apiTxt);
        }, 3000);
    
        this.setState({
          action: STATS.loading,
        });
    };
    render() {
        const { load } = this.props
        const { hasMore } = this.state;
        return (
            <>
                <ol>
                    <ReactPullLoad
                        downEnough={150}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={hasMore}
                        style={{ paddingTop: 20 }}
                        distanceBottom={1000}
                    >
                        <div>1111111</div>
                        <div>1111111</div>
                        <div>1111111</div>
                        <div>1111111</div>
                        <div>1111111</div>
                        <div>1111111</div>
                        <div>1111111</div>
                        <div>1111111</div>
                        {/* {load.apiTxt && this.mapList()} */}
                    </ReactPullLoad>
                </ol>
            </>
        )
    }
}

export default Index
