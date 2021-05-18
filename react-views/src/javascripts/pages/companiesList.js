import React from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import '../../css/companiesList.css';


class CompaniesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { companyInformations: [] }
    }
    componentDidMount() {
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        axios.get('http://localhost:5000/admin/companyinfo', {
            headers: headers
        })
            .then((response) => {
                const companyInfos = response.data.companies;
                this.setState({ companyInformations: companyInfos });
            })
            .catch((error) => console.error(error))
    }
    render() {

        let slideInformations = this.state.companyInformations.map((item, index) => {
            return (
                <SplideSlide key={item.companyId}>
                    <div className='slide'>
                        <div className='title_holder'>
                            <div className="slide_title">Calendar.Io</div>
                            <div className="separator"></div>
                        </div>
                        <img src={item.companyLogo} alt="" />
                        <div className='cmp_name'>{item.companyName}</div>
                        <div className='cmp_cntry'>{item.companyCountry}</div>
                        <div className='description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A expedita repellat consequuntur voluptas quam sit magni placeat culpa. Earum laudantium fugit iure modi totam laborum beatae sed magni pariatur ullam!</div>
                    </div>
                </SplideSlide>
            )
        })

        return (
            <div className='frame'>
                <div className="splide_holder">
                    <Splide className="colors"
                        options={{
                            type : 'loop',
                            height: 600,
                            gap: '2rem'
                        }}
                    >
                        {slideInformations}
                    </Splide>
                </div>

            </div>

        )
    }

}



export default CompaniesList;