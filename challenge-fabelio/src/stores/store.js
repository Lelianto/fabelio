import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    baseUrl: "http://www.mocky.io/v2/5c9105cb330000112b649af8",
    productList:[],
    keyword:'',
    searchResult:[],
    searching:false
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

        if ( allKeywords[0] === null || allKeywords[0] === undefined || allKeywords[0] === "" ) {
            store.setState({
                searching: false
            })
            result = []
        } else {
            store.setState({
                searchResult: result,
                searching: true
            })
        }
	},
});
