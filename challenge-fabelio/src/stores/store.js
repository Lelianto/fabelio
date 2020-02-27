import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    baseUrl: "http://www.mocky.io/v2/5c9105cb330000112b649af8",
    productList:[],
    keyword:'',
    searchResult:[],
    searching:false,
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

        const choosenStyle = state.choosenStyleFilter
        if ( choosenStyle.length === 0 ) {
            const userStyleFiltering = {
                checked : userFilterStatus,
                style : userStyle
            }
            state.choosenStyleFilter.push(userStyleFiltering)
        } else {
            const userStyleFiltering = {
                checked : userFilterStatus,
                style : userStyle
            }
            state.choosenStyleFilter.push(userStyleFiltering)
        }

        if ( state.uniqueFilter.length === 0 ) {
            const count = 1
            const style = state.choosenStyleFilter[0].style
            const totalInStyle = {
                count: count,
                style: style
            }
            state.uniqueFilter.push(totalInStyle)
        } else {
            for ( let h = 0; h < state.uniqueFilter.length; h++ ) {
                // for ( let i = 1; i < state.choosenStyleFilter.length; i++ ) {
                //     console.log(state.choosenStyleFilter[i].style)
                //     console.log('isi style', userStyle)
                //     if ( state.choosenStyleFilter[i].style === state.uniqueFilter[h].style ) {
                //         // console.log('sama',state.choosenStyleFilter[i].style)
                //         state.uniqueFilter[h].count += 1
                //     } else {
                //         const count = 1
                //         const style = state.choosenStyleFilter[i].style
                //         const totalInStyle = {
                //             count: count,
                //             style: style
                //         }
                //         state.uniqueFilter.push(totalInStyle)
                //     }
                // }
            }
        }


        // // const uniqueFilter = []
        // if ( state.uniqueFilter.length === 0 ) {
        //     state.uniqueFilter.push(state.choosenStyleFilter[0]) 
        // } else {
        //     console.log('masuk')
        //     for ( let i = 1; i < state.choosenStyleFilter.length; i ++ ) {
        //         for ( let j = 0; j < state.uniqueFilter.length; j++ ) {
        //             const style = state.choosenStyleFilter[i].style
        //             const status = state.choosenStyleFilter[i].checked
        //             // console.log('style', style)
        //             if ( state.uniqueFilter[j].style === style ) {
        //                 state.uniqueFilter[j].status = status
        //                 // console.log('status', state.uniqueFilter[j])
        //             } else {
        //                 state.uniqueFilter.push(state.choosenStyleFilter[i]) 
        //             }
        //         }
        //     }
        // }
        console.log('choosen style', state.choosenStyleFilter)
        // console.log('choosen style', userStyle)
    },

    filterByTime: async (state, e, value) => {
        const userFilterStatus = await e.target.checked
        const deliveryTime = await value

        const choosenTime = state.choosenTimeFilter
        if ( choosenTime.length === 0 ) {
            const userTimeFiltering = {
                checked : userFilterStatus,
                time : deliveryTime
            }
            state.choosenTimeFilter.push(userTimeFiltering)
        } else {
            const userTimeFiltering = {
                checked : userFilterStatus,
                time : deliveryTime
            }
            state.choosenTimeFilter.push(userTimeFiltering)
        }

        if ( state.timeFilter.length === 0 ) {
            const count = 1
            const time = state.choosenTimeFilter[0].time
            const totalInTime = {
                count: count,
                time: time
            }
            state.timeFilter.push(totalInTime)
        } else {
            for ( let h = 0; h < state.timeFilter.length; h++ ) {
                // for ( let i = 1; i < state.choosenStyleFilter.length; i++ ) {
                //     console.log(state.choosenStyleFilter[i].style)
                //     console.log('isi style', userStyle)
                //     if ( state.choosenStyleFilter[i].style === state.uniqueFilter[h].style ) {
                //         // console.log('sama',state.choosenStyleFilter[i].style)
                //         state.uniqueFilter[h].count += 1
                //     } else {
                //         const count = 1
                //         const style = state.choosenStyleFilter[i].style
                //         const totalInStyle = {
                //             count: count,
                //             style: style
                //         }
                //         state.uniqueFilter.push(totalInStyle)
                //     }
                // }
            }
        }


        // // const uniqueFilter = []
        // if ( state.uniqueFilter.length === 0 ) {
        //     state.uniqueFilter.push(state.choosenStyleFilter[0]) 
        // } else {
        //     console.log('masuk')
        //     for ( let i = 1; i < state.choosenStyleFilter.length; i ++ ) {
        //         for ( let j = 0; j < state.uniqueFilter.length; j++ ) {
        //             const style = state.choosenStyleFilter[i].style
        //             const status = state.choosenStyleFilter[i].checked
        //             // console.log('style', style)
        //             if ( state.uniqueFilter[j].style === style ) {
        //                 state.uniqueFilter[j].status = status
        //                 // console.log('status', state.uniqueFilter[j])
        //             } else {
        //                 state.uniqueFilter.push(state.choosenStyleFilter[i]) 
        //             }
        //         }
        //     }
        // }
        console.log('choosen style', state.choosenTimeFilter)
        // console.log('choosen style', userStyle)
    }
});
