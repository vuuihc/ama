/**
 * Created by zsh on 2016/3/11.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

class StoreList extends Component{
    componentDidMount(){
        console.log("storeList==="+this.props.storeList)
    }
    render() {
        const { storeList } = this.props
        return (
            <div className="rest-list index">
                {storeList.map((store,index) =>{
                    if(store.state==1){
                        return(
                            <Link to={"/storeIndex/"+store.id} >
                                <div className="rest-li" key = {index} >
                                    <div className="rest-img">
                                        <img src={store.icon} className="restImg" />
                                    </div>
                                    <div className="rest-des">
                                        <h4>{store.name}</h4>
                                        <p>销量{store.sales}</p>
                                        <p>
                                            <span>起送价<span className="des-strong">￥{convertPrice(store.base_price)}</span></span>
                                            <span className="pack-fee">配送费<span className="des-strong">￥{convertPrice(store.pack_fee)}</span></span>
                                            <span>配送时间<span className="des-strong">{store.cost_time}</span>分钟</span>
                                        </p>
                                        {/*<RateStar grade={store.grades} />*/}
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                }
                )}
            </div>
        )
    }
}

StoreList.propTypes = {
    storeList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        grades: PropTypes.number.isRequired
    })).isRequired,
}

function mapStateToProps(state) {
    return {
        storeList: state.storeList
    }
}

export default connect(
    mapStateToProps
)(StoreList)
