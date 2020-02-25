import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { 
    actions, 
    store 
} from '../stores/store';
import axios from 'axios';
import ProductList from '../components/productList';

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
            <ProductList/>
        </div>
        );
    }
}

export default connect("baseUrl",actions)(withRouter(Products));