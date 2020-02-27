import React from 'react';
import '../styles/css/main.css';
import '../styles/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../stores/store';
import Truncate from 'react-truncate';
import NumberFormat from 'react-number-format';
import Skeleton from 'react-loading-skeleton';

const ProductList = (props) => {
    if ( props.productList === null || props.productList === undefined || props.productList === [] ) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        if ( props.productList.products === undefined || props.productList.products === null || props.productList.products === [] ) {
            return (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Skeleton height={300} count={2}/>
                        </div>
                        <div className='col-md-6'>
                            <Skeleton height={300} count={2}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            const searchProduct = props.searchResult
            if ( props.searching === true ) {
                if ( searchProduct.length === 0 ) {
                    return (
                        <div style={{marginTop:'100px'}}>
                            <h3>
                                No product Found...
                            </h3> 
                        </div>
                    )
                } else {
                    return (
                        <React.Fragment>
                            <div className='container-fluid'>
                                <div className='row'>
                                    { searchProduct.map((product,index)=>
                                        <div className='col-md-6'>
                                            <div className='box-control'>
                                                <div className='row'>
                                                    <div className='col-md-6 product-name'>{product.name}</div> 
                                                    <div className='col-md-6 product-price'>
                                                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                                        </div>
                                                </div>
                                                <div className='product-decription'>
                                                    <Truncate lines={3}>
                                                        <div>{product.description}</div>
                                                    </Truncate>
                                                </div>
                                                <div className='furniture-style'>{product.furniture_style.map((style, index)=>
                                                <div>{style} </div>
                                                )} </div> 
                                                <div className='delivery-time'> Delivery Time : {product.delivery_time} Days</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    )  
                }
            } else {
                const allProducts = props.productList
                return (
                    <React.Fragment>
                        <div className='container-fluid'>
                            <div className='row'>
                                { allProducts.products.map((product,index)=>
                                    <div className='col-md-6'>
                                        <div className='box-control'>
                                            <div className='row'>
                                                <div className='col-md-6 product-name'>{product.name}</div> 
                                                <div className='col-md-6 product-price'>
                                                    <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                                    </div>
                                            </div>
                                            <div className='product-decription'>
                                                <Truncate lines={3}>
                                                    <div>{product.description}</div>
                                                </Truncate>
                                            </div>
                                            <div className='furniture-style'>{product.furniture_style.map((style, index)=>
                                            <div>{style} </div>
                                            )} </div> 
                                            <div className='delivery-time'> Delivery Time : {product.delivery_time} Days</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        }
    }
}

export default connect("productList, searchResult, searching", actions)(withRouter(ProductList));