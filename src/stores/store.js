import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    baseUrl: "http://www.mocky.io/v2/5c9105cb330000112b649af8",
    productList:[],
    keyword:'',
    searchResult:[],
    searching:false,
    filterTimeResult: [],
    choosenStyleFilter: [],
    uniqueFilter: [],
    choosenTimeFilter: [],
    timeFilter: []
}

export const store = createStore(initialState);

export const actions = (store) => ({
	searchProduct: async (state, e) => {
		const userKeyword = await e.target.value
        await store.setState({ keyword: userKeyword });

        const products = state.productList.products
        const productName = [] 
        const productDetail = []
        products.map((product, index)=>
            productName.push(product.name.split(' '))
        )
        products.map((product, index)=>
            productDetail.push(product)
        )
        const allKeywords = userKeyword.split(' ')

        let result = []
        for (let i = 0; i < productName.length; i++) {
            const contentWord = productName[i]
            const joinedName = productName[i].join(' ')
            if ( userKeyword.toLowerCase() === joinedName.toLowerCase()) {
                result.push(products[i])
                break
            } else {
                for (let j = 0; j < contentWord.length; j++) {
                    for (let k = 0; k < allKeywords.length; k++) {
                        if ( allKeywords[k].toLowerCase() === contentWord[j].toLowerCase() ) {
                            result.push(products[i])
                        }
                    }
                }
            }
        }

        let uniqueResult = []
        if ( result.length !== 0 ) {
            for (let x = 0; x < result.length; x++) {
                if ( uniqueResult.length === 0 ) {
                    uniqueResult.push(result[x])
                } 
                else {
                    for (let y = 0; y < uniqueResult.length; y++) {
                        if ( uniqueResult.includes(result[x]) === false ) {
                            uniqueResult.push(result[x])
                        }
                    }
                }
            }
        }

        if ( allKeywords[0] === null || allKeywords[0] === undefined || allKeywords[0] === "" ) {
            store.setState({
                searching: false
            })
            uniqueResult = []
        } else {
            store.setState({
                searchResult: uniqueResult,
                searching: true
            })
        }
    },
    
    filterByStyle: async (state, e, value) => {
        const userFilterStatus = await e.target.checked
        const userStyle = await value

        const choosenStyle = []
        if ( state.choosenStyleFilter.length === 0 ) {
            const userStyleFiltering = {
                checked : userFilterStatus,
                style : userStyle
            }
            choosenStyle.push(userStyleFiltering)
        } else {
            const userStyleFiltering = {
                checked : userFilterStatus,
                style : userStyle
            }
            choosenStyle.push(userStyleFiltering)
        }
        const products = []
        for ( let i = 0; i < state.productList.products.length; i++) {
            for ( let j = 0; j < choosenStyle.length; j++) {
                for ( let k = 0; k < state.productList.products[i].furniture_style.length; k++) {
                    console.log()
                    if ( choosenStyle[j].style === state.productList.products[i].furniture_style[k]) {
                        products.push(state.productList.products[i])
                    }
                }
            }
        }

        console.log('choosen style', products)
        if ( products.length === 0 ) {
            store.setState({
                searchResult: [],
                searching: true
            })
        } else {
            store.setState({
                searchResult: products,
                searching: true
            })
        }
        // console.log('choosen style', userStyle)
        // if ( state.choosenStyleFilter.length === 0 ) {
        //     store.setState({
        //         searchResult: [],
        //         searching: true
        //     })
        // } else {
        //     store.setState({
        //         searchResult: state.choosenStyleFilter,
        //         searching: true
        //     })
        // }
    },

    filterByTime: async (state, e, value) => {
        const filterResult = []
        if ( value === '1 week' && e.target.checked === true) {
            for ( let i = 0; i < state.productList.products.length; i++ ) {
                if ( state.productList.products[i].delivery_time <= 7 ) {
                    if ( store.getState().searchResult !== [] ) {
                        if ( store.getState().searchResult.length !== 0 ) {
                            filterResult.push(state.productList.products[i])
                        } else {
                            filterResult.push(state.productList.products[i])
                        }
                    } else {
                        filterResult.push(state.productList.products[i])
                    }
                }
            }
        } else if ( value === '2 weeks' && e.target.checked === true) {
            for ( let i = 0; i < state.productList.products.length; i++ ) {
                if ( state.productList.products[i].delivery_time > 7 && state.productList.products[i].delivery_time <= 14) {
                    if ( store.getState().searchResult !== [] ) {
                        if ( store.getState().searchResult.length !== 0 ) {
                            filterResult.push(state.productList.products[i])
                        } else {
                            filterResult.push(state.productList.products[i])
                        }
                    } else {
                        filterResult.push(state.productList.products[i])
                    } 
                }
            }
        } else if ( value === '1 month' && e.target.checked === true) {
            for ( let i = 0; i < state.productList.products.length; i++ ) {
                if ( state.productList.products[i].delivery_time > 14 && state.productList.products[i].delivery_time <= 30 ) {
                    if ( store.getState().searchResult !== [] ) {
                        if ( store.getState().searchResult.length !== 0 ) {
                            filterResult.push(state.productList.products[i])
                        } else {
                            filterResult.push(state.productList.products[i])
                        }
                    } else {
                        filterResult.push(state.productList.products[i])
                    }
                }
            }
        } else {
            for ( let i = 0; i < state.productList.products.length; i++ ) {
                if ( state.productList.products[i].delivery_time > 30 ) {
                    if ( store.getState().searchResult !== [] ) {
                        if ( store.getState().searchResult.length !== 0 ) {
                            filterResult.push(state.productList.products[i])
                        } else {
                            filterResult.push(state.productList.products[i])
                        }
                    } else {
                        filterResult.push(state.productList.products[i])
                    }
                }
            }
        }
        if ( filterResult.length === 0 ) {
            store.setState({
                searchResult: [],
                searching: true
            })
        } else {
            store.setState({
                searchResult: filterResult,
                searching: true
            })
        }
    }
});
