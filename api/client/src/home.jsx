import { Component } from 'react';
import Navbar from './components/navbar';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from './actions/itemActions';
import { addToCart } from './actions/cartActions';

// ... (imports)

class Home extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
    };

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert('Item added to Cart');
    };

    render() {
        const { items } = this.props.item;
        const user = this.props.user;

        return (
            <div>
                <Navbar />
                <p>Home page</p>
                <Container style={{ marginTop: '20px', padding: '20px' }}>
                    <div className="row">
                        {items.map((item) => (
                            <div className="col-md-4" key={item._id}>
                                <Card className="mb-4">
                                    <CardBody>
                                        <CardTitle tag="h5">{item.title}</CardTitle>
                                        <CardSubtitle tag="h6">Ksh {item.price}</CardSubtitle>
                                        <CardText>{item.category}</CardText>
                                        {item.image && <img src={item.image} alt={item.title} style={{ width: '100%' }} />}
                                        {this.props.isAuthenticated ? (
                                            <Button
                                                color="success"
                                                size="sm"
                                                onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                            >
                                                Add To Cart
                                            </Button>
                                        ) : null}
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, addToCart })(Home);
