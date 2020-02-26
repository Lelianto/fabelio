import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    baseUrl: "http://www.mocky.io/v2/5c9105cb330000112b649af8",
    productList:[],
    keyword:'',
    searchResult:[],
    searching:false,
    choosenStyleFilter: []
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

        const choosenStyle = state.choosenStyleFilter
        if ( choosenStyle.length === 0 ) {
            const userStyleFiltering = {
                checked : userFilterStatus,
                style : userStyle
            }
            state.choosenStyleFilter.push(userStyleFiltering)
        } else {
            for (let i = 0; i < state.choosenStyleFilter.length; i++) {
                if ( state.choosenStyleFilter[i].style === userStyle ) {
                    console.log('style sama',state.choosenStyleFilter[i])
                    if ( state.choosenStyleFilter[i].checked ) {
                        state.choosenStyleFilter[i].checked = false
                    } else {
                        state.choosenStyleFilter[i].checked = true
                    }
                } else {
                    const userStyleFiltering = {
                        checked : userFilterStatus,
                        style : userStyle
                    }
                    console.log('style beda',userStyleFiltering)
                    state.choosenStyleFilter.push(userStyleFiltering)
                }
            }
        }
        console.log('choosen style', state.choosenStyleFilter)
        // console.log('choosen style', userStyle)
    }
});
