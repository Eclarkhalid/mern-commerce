import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_51NzjS3ADxjAlTAA0mPYVHpbuYcT6owaPkg7Q4H8N9HIg0jnchMfwvz545iAZnu6ndk0XAhAu0IYp0IEe5UAbAvDe00cwiztyAR';

const onToken = (user, checkout) => token =>
    checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) =>
    <StripeCheckout
        amount={0.5 * 100} // 0.5 dollars (50 cents)
        token={onToken(user, checkout)}
        currency='USD'
        stripeKey={STRIPE_PUBLISHABLE}
    />


export default Checkout;