import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { 
    actions, 
    store 
} from '../stores/store';
import axios from 'axios';
import ProductList from '../components/productList';
import '../styles/css/main.css'

class Products extends Component {
    componentDidMount = async () => {
		const req = {
			method: 'get',
			url: store.getState().baseUrl,
			headers: {
				"Content-Type": "application/json"
			}
        };
		await axios(req)
			.then((response) => {
				store.setState({
					productList: response.data
                })
			})
			.catch((error) => {
				return false;
			});
    };
    
    render() {
        return (
        <div>
            <div className='container-fluid background-header'>
                <div className='row'>
                    <div className='col-md-6'>
                        <input 
                            className='search-feature' 
                            type="text" 
                            placeholder='Search Furniture'
                            onChange={(e)=>this.props.searchProduct(e)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>               
                        <div className="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Filter by Style
                            </button>
                            { this.props.productList.length !== 0?
                            <div className="dropdown-menu">
                                {this.props.productList.furniture_styles.map(( style, index )=>
                                    <a className="dropdown-item">
                                        <div className='row'>
                                            <div className='col-md-11'>
                                                {style}
                                            </div>
                                            <div className='col-md-1 checkbox-control'>
                                                <div className="checkbox">
                                                    <label>
                                                        <input onChange={(e)=>this.props.filterByStyle(e, `${style}`)} type="checkbox"/>
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
                {/* <div class="dropdown">
                    <button class="mainmenubtn">Main menu</button>
                    <div class="dropdown-child">
                        <a href="">Child menu 1</a>
                        <a href="">Child menu 2</a>
                        <a href="">Child menu 3</a>
                        <a href="">Child menu 4</a>
                        <a href="">Child menu 5</a>
                    </div>
                </div> */}
            </div>
            <ProductList/>
        </div>
        );
    }
}

export default connect("baseUrl, productList",actions)(withRouter(Products));