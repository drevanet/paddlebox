import PolicyPage from '@/components/policy-page';
export default function RefundPolicy(){return <PolicyPage title="Refund Policy" intro="We want you to understand how payments and refund requests work before you subscribe to Betty Box Maker." sections={[
{heading:'Digital subscription service',body:'Betty provides immediate access to digital design tools and subscription features. Unless required by applicable law or stated otherwise at checkout, subscription fees are generally not refundable for partial billing periods or unused downloads.'},
{heading:'When to contact us',body:'If you were charged in error, believe a payment was duplicated, cannot access a paid plan, or think a charge was unauthorized, contact support promptly with the account email, transaction date and relevant Paddle receipt details. Do not send full payment card information.'},
{heading:'How requests are reviewed',body:'We review requests individually and may coordinate with Paddle, our payment provider. Approved refunds are returned through the original payment method where possible. Processing time depends on your bank or payment provider.'},
{heading:'Statutory rights',body:'Nothing in this policy limits mandatory consumer rights that apply in your jurisdiction. If local law gives you a right to cancel or obtain a refund, those rights take precedence.'},
{heading:'Contact',body:'Use the Contact page to submit a request. Replace the generic contact details and have this policy reviewed against your intended markets before launch.'}
]}/>}
