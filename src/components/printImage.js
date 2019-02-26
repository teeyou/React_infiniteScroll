import React, { Component } from 'react'

export default class PrintImage extends Component {
    state = {
        show: [],
        total: [],
        index: 0,
        n : 3 // n개의 데이터씩 로딩
    }

    onScrollHandler = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;

        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        // 스크롤링 했을때, 브라우저의 가장 밑에서 실행
        if (scrollHeight - innerHeight - scrollTop <= 0) {

            //출력 할 이미지가 남아있을 경우에 실행
            if (this.state.total.length - 1 >= this.state.index) {
                const remains = this.state.total.length - this.state.index
              
                if (remains > 3) {
                    const show = [...this.state.show, ...this.state.total.slice(this.state.index, this.state.index + this.state.n)]
                    this.setState({
                        show,
                        index: this.state.index + this.state.n
                    })
                } else {
                   const show = [...this.state.show, ...this.state.total.slice(this.state.index, this.state.index + remains)]
                    this.setState({
                        show,
                        index: this.state.index + remains
                    })
                }

            } else {
                console.log("모두 출력")
            }

        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScrollHandler)
        const total = [...this.state.total]

        /* DB에서 모든 데이터 가져오기 */
        total.push({name : "이상해씨" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/5/57/%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404232618&path-prefix=ko"})
        total.push({name : "이상해풀" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/4/46/%EC%9D%B4%EC%83%81%ED%95%B4%ED%92%80_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404232716&path-prefix=ko"})
        total.push({name : "이상해꽃" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/3/34/%EC%9D%B4%EC%83%81%ED%95%B4%EA%BD%83_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404232813&path-prefix=ko"})

        total.push({name : "파이리" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/5/5e/%ED%8C%8C%EC%9D%B4%EB%A6%AC_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404233005&path-prefix=ko"})
        total.push({name : "리자드" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/8/82/%EB%A6%AC%EC%9E%90%EB%93%9C_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404233126&path-prefix=ko"})
        total.push({name : "리자몽" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/c/c8/%EB%A6%AC%EC%9E%90%EB%AA%BD_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404233220&path-prefix=ko"})

        total.push({name : "꼬부기" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/a/aa/%EA%BC%AC%EB%B6%80%EA%B8%B0_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/250?cb=20170404233452&path-prefix=ko"})
        total.push({name : "어니부기" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/f/f3/%EC%96%B4%EB%8B%88%EB%B6%80%EA%B8%B0_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/200?cb=20170404233542&path-prefix=ko"})
        total.push({name : "거북왕" , imageURL : "https://vignette.wikia.nocookie.net/pokemon/images/e/e9/%EA%B1%B0%EB%B6%81%EC%99%95_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/200?cb=20170404233631&path-prefix=ko"})


        /* 화면에 출력할 데이터 갯수 설정 */
        if(total.length < (this.state.n + 1) ) {
            const show = [...total]

            this.setState({
                show,
                total,
                index : total.length
            })
        } else {
            const show = total.filter( (imageURL, index) => index < this.state.n)

            this.setState({
                show,
                total,
                index : this.state.n
            })
        }
    }


    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollHandler)
    }

    render() {
        const display = this.state.show.map( (image , index) => {
            return (
                <div key={index} style={{margin:"30px 0"}}>
                    <img src={image.imageURL}/>
                    <p style={{textAlign:"center"}}>{image.name}</p>
                </div>
            )   
        })
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {display}
            </div>
        )
    }
}

