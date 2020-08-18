import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {withAuthRedirect} from '../../hoc/with-auth-redirect';
import {changePage, getLastRolls} from '../../redux/provably-fair-reducer';
import ProvablyFair from './provably-fair';

class ProvablyFairContainer extends React.Component {

    componentDidMount(){
        this.props.getLastRolls(this.props.page_size, this.props.current_page);
    };

    onChangePage = (id) => {
        this.props.changePage(this.props.page_size, id);
    }

    render () {
        return (
            <ProvablyFair
                    last_rolls={this.props.last_rolls}
                    current_page={this.props.current_page}
                    total_count={this.props.total_count}
                    page_size={this.props.page_size}
                    onChangePage={this.onChangePage} 
                    is_fetching={this.props.is_fetching}  
            />
        )
    }
};

let mapStateToProps = (state) => {
	return {
		last_rolls: state.provably_fair.last_rolls,
		total_count: state.provably_fair.total_count,
		page_size: state.provably_fair.page_size,
		current_page: state.provably_fair.current_page,
        is_fetching: state.provably_fair.is_fetching
	};
}

export default compose(
    connect(mapStateToProps, {
        changePage,
        getLastRolls
    }),
    withAuthRedirect
)(ProvablyFairContainer);