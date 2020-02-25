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
                <div class="dropdown">
                    <button class="mainmenubtn">Main menu</button>
                    <div class="dropdown-child">
                        <a href="http://wwww.yourdonain.com/page1.html">Child menu 1</a>
                        <a href="http://wwww.yourdonain.com/page2.html">Child menu 2</a>
                        <a href="http://wwww.yourdonain.com/page3.html">Child menu 3</a>
                        <a href="http://wwww.yourdonain.com/page4.html">Child menu 4</a>
                        <a href="http://wwww.yourdonain.com/page5.html">Child menu 5</a>
                    </div>
                </div>
            </div>
            <ProductList/>
        </div>
        );
    }
}

export default connect("baseUrl",actions)(withRouter(Products));