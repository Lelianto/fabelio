import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { 
    actions, 
    store 
} from '../stores/store';
import axios from 'axios';
import ProductList from '../components/productList';
import '../styles/css/main.css'

class Products extends Component {

    handleAllDatas = async () => {
        const req = {
			method: 'get',
			url: 'https://cors-anywhere.herokuapp.com/' + store.getState().baseUrl,
			headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
			}
        };
		await axios(req)
			.then((response) => {
				store.setState({
                    productList: response.data,
                    filterTimeResult: response.data,
                    searching: false
                })
			})
			.catch((error) => {
				return false;
			});
    }

    componentDidMount = async () => {
        this.handleAllDatas()
    }

    handleTimeFilter = async (e, time) => {
        await this.props.filterByTime(e, time)
        if ( store.getState().searchResult !== null ) {
            await this.props.history.push('/')
        } else if ( store.getState().searchResult.length === 0 ) {
            await this.props.history.push('/')
        }
    }

    handleSeeAllProducts = async () => {
        await this.handleAllDatas()
        await this.props.history.push('/')
    }

    handleStyleFilter = async (e, style) => {
        await this.props.filterByStyle(e, style)
        if ( store.getState().searchResult !== null ) {
            await this.props.history.push('/')
        } else if ( store.getState().searchResult.length === 0 ) {
            await this.props.history.push('/')
        }
    }
    
    render() {
        const deliveryTime = [ '1 week' , '2 weeks' , '1 month', 'more']
        return (
        <div>
            <div className='container-fluid background-header'>
                <div className='row'>
                    <div className='col-md-6'>
                        <input 
                            className='search-feature' 
                            type="text" 
                            placeholder='Search Furniture by Product Brand'
                            onChange={(e)=>this.props.searchProduct(e)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6' style={{paddingBottom:'25px'}}>               
                        <div className="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Filter by Furniture Style
                            </button>
                            { this.props.productList.length !== 0?
                            <div className="dropdown-menu">
                                <a className="dropdown-item">
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            See all Products
                                        </div>
                                        <div className='col-md-1 checkbox-control'>
                                            <div className="radio">
                                                <label>
                                                    <input onClick={()=>this.handleSeeAllProducts()} name="optradio" type="radio"/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                {this.props.productList.furniture_styles.map(( style, index )=>
                                    <a className="dropdown-item">
                                        <div className='row'>
                                            <div className='col-md-11'>
                                                {style}
                                            </div>
                                            <div className='col-md-1 checkbox-control'>
                                                <div className="radio">
                                                    <label>
                                                        <input onClick={(e)=>this.handleStyleFilter(e, `${style}`)} name="optradio" type="radio"/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )}
                            </div> 
                            :
                            null
                            }
                        </div>
                    </div>
                    <div className='col-md-6' style={{paddingBottom:'25px'}}>               
                        <div className="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Filter by Delivery Time
                            </button>
                            { this.props.productList.length !== 0?
                            <div className="dropdown-menu">
                                <a className="dropdown-item">
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            See all Products
                                        </div>
                                        <div className='col-md-1 checkbox-control'>
                                            <div className="radio">
                                                <label>
                                                    <input onClick={()=>this.handleSeeAllProducts()} name="optradio" type="radio"/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                {deliveryTime.map(( time, index )=>
                                    <a className="dropdown-item">
                                        <div className='row'>
                                            <div className='col-md-11'>
                                                {time}
                                            </div>
                                            <div className='col-md-1 checkbox-control'>
                                                <div className="radio">
                                                    <label>
                                                        <input onClick={(e)=>this.handleTimeFilter(e, `${time}`)} name="optradio" type="radio"/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )}
                            </div> 
                            :
                            null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ProductList/>
        </div>
        );
    }
}

export default connect("baseUrl, productList",actions)(withRouter(Products));